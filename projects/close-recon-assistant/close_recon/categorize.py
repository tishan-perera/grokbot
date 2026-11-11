"""Rules-based expense coding, with an optional injected model step.

The model step is off unless Settings.enable_llm is true and the caller passes
a suggester. This package does not ship a network client. Low-confidence
suggestions always need a person. Nothing in this module sets posted to true.
"""

from __future__ import annotations

import re
from collections import defaultdict
from dataclasses import dataclass
from decimal import Decimal
from typing import Protocol

from close_recon.models import (
    CategorySuggestion,
    Expense,
    LlmNotConfigured,
    ModelReplyError,
    Settings,
)

_WORD = re.compile(r"[A-Z0-9]+")


@dataclass(frozen=True)
class CategoryRule:
    category: str
    keywords: tuple[str, ...]
    confidence: Decimal
    reason: str


RULES: tuple[CategoryRule, ...] = (
    CategoryRule(
        "Rent and occupancy",
        ("RENT", "LEASE"),
        Decimal("0.95"),
        "The vendor or description names rent or a lease.",
    ),
    CategoryRule(
        "Software",
        ("SAAS", "SUBSCRIPTION", "SOFTWARE"),
        Decimal("0.92"),
        "The vendor or description names software or a subscription.",
    ),
    CategoryRule(
        "Professional services",
        ("LEGAL", "ATTORNEY", "COUNSEL", "CONTRACT REVIEW"),
        Decimal("0.90"),
        "The vendor or description names legal or contract-review work.",
    ),
    CategoryRule(
        "Professional services",
        ("CONSULTING", "ADVISORY"),
        Decimal("0.72"),
        "Consulting and advisory wording is vague, so confidence stays under the review threshold.",
    ),
    CategoryRule(
        "Utilities",
        ("UTILITY", "UTILITIES", "ELECTRIC", "WATER"),
        Decimal("0.93"),
        "The vendor or description names a utility.",
    ),
    CategoryRule(
        "Delivery",
        ("COURIER", "PARCEL", "FREIGHT", "POSTAGE", "SHIPPING"),
        Decimal("0.88"),
        "The vendor or description names delivery or postage.",
    ),
    CategoryRule(
        "Insurance",
        ("INSURANCE", "PREMIUM", "POLICY"),
        Decimal("0.93"),
        "The vendor or description names an insurance policy or premium.",
    ),
    CategoryRule(
        "Marketing",
        ("BROCHURE", "PRINT", "MARKETING"),
        Decimal("0.84"),
        "The vendor or description names print or marketing material.",
    ),
    CategoryRule(
        "Meals",
        ("LUNCH", "DINNER", "MEAL", "RESTAURANT"),
        Decimal("0.80"),
        "The description names a meal.",
    ),
    CategoryRule(
        "Office supplies",
        ("PENS", "SUPPLIES", "STAPLES"),
        Decimal("0.86"),
        "The description names office supplies.",
    ),
)


class CategorySuggester(Protocol):
    """In-process replacement for a model. Implementations must not post."""

    def suggest(self, expense: Expense) -> CategorySuggestion:
        """Return one suggestion for a single expense."""


class LlmCategorySuggester:
    """Parse a constrained reply from a caller-supplied function.

    There is no default endpoint and no credential lookup. Constructing this
    without ``complete`` raises ``LlmNotConfigured``.
    """

    def __init__(self, complete=None) -> None:
        if complete is None:
            raise LlmNotConfigured(
                "LLM categorizer is disabled. No in-process client was provided, "
                "and this project does not call a network model."
            )
        self._complete = complete

    def suggest(self, expense: Expense) -> CategorySuggestion:
        prompt = (
            "Categorize this fictional expense. Reply with CATEGORY|CONFIDENCE|REASON only. "
            f"Vendor: {expense.vendor_name}. Description: {expense.description}. "
            f"Amount: {expense.amount:.2f}."
        )
        raw = str(self._complete(prompt))
        category, confidence, reason = parse_model_reply(raw)
        return CategorySuggestion(
            expense_id=expense.expense_id,
            category=category,
            confidence=confidence,
            reason=reason,
            source="llm",
            needs_review=True,
            posted=False,
            status="needs_review",
        )


def parse_model_reply(raw: str) -> tuple[str, Decimal, str]:
    parts = raw.strip().split("|")
    if len(parts) != 3:
        raise ModelReplyError("model reply must be CATEGORY|CONFIDENCE|REASON")
    category, confidence_text, reason = (part.strip() for part in parts)
    if not re.fullmatch(r"[A-Za-z][A-Za-z ]{2,39}", category):
        raise ModelReplyError("model category must be short words")
    try:
        confidence = Decimal(confidence_text)
    except Exception as exc:
        raise ModelReplyError("model confidence is not a decimal") from exc
    if confidence != confidence.quantize(Decimal("0.01")) or confidence < 0 or confidence > 1:
        raise ModelReplyError("model confidence must be between 0.00 and 1.00")
    if not reason or len(reason) > 160 or any(ord(ch) < 32 for ch in reason):
        raise ModelReplyError("model reason must be one short line")
    return category, confidence.quantize(Decimal("0.01")), reason


def categorize_expenses(
    expenses: tuple[Expense, ...] | list[Expense],
    settings: Settings | None = None,
    suggester: CategorySuggester | None = None,
) -> tuple[CategorySuggestion, ...]:
    settings = settings or Settings()
    if settings.enable_llm and suggester is None:
        raise LlmNotConfigured(
            "LLM step was enabled but no in-process suggester was injected. No network call was made."
        )
    active = suggester if settings.enable_llm else None
    duplicates = _duplicate_ids(expenses)
    suggestions: list[CategorySuggestion] = []
    for expense in sorted(expenses, key=lambda item: item.expense_id):
        suggestion = _from_rules(expense, settings)
        if active is not None and suggestion.confidence < settings.category_review_threshold:
            suggestion = _with_model(expense, suggestion, active, settings)
        if expense.expense_id in duplicates:
            keeper = duplicates[expense.expense_id]
            suggestion = CategorySuggestion(
                expense_id=suggestion.expense_id,
                category=suggestion.category,
                confidence=suggestion.confidence,
                reason=(
                    f"{suggestion.reason} Possible duplicate of {keeper}: "
                    "same date, vendor, amount, and reference."
                ),
                source=suggestion.source,
                needs_review=True,
                posted=False,
                status="needs_review",
            )
        suggestions.append(suggestion)
    return tuple(suggestions)


def _with_model(
    expense: Expense,
    current: CategorySuggestion,
    suggester: CategorySuggester,
    settings: Settings,
) -> CategorySuggestion:
    try:
        alternative = suggester.suggest(expense)
        confidence = alternative.confidence
        if not isinstance(confidence, Decimal) or confidence != confidence.quantize(Decimal("0.01")):
            raise ModelReplyError("model confidence must be decimal cents")
        if confidence < 0 or confidence > 1 or not alternative.category.strip():
            raise ModelReplyError("model suggestion is out of range")
    except ModelReplyError:
        return CategorySuggestion(
            expense_id=current.expense_id,
            category=current.category,
            confidence=current.confidence,
            reason=(
                current.reason
                + " The injected model reply was ignored because it did not match the expected shape."
            ),
            source=current.source,
            needs_review=True,
            posted=False,
            status="needs_review",
        )
    if confidence <= current.confidence:
        return current
    return _finalize(
        expense.expense_id,
        alternative.category.strip(),
        confidence,
        (
            f"Injected model suggestion ({alternative.reason}). "
            f"Rules had suggested {current.category} at {current.confidence:.2f}."
        ),
        "llm",
        settings.category_review_threshold,
    )


def _finalize(
    expense_id: str,
    category: str,
    confidence: Decimal,
    reason: str,
    source: str,
    threshold: Decimal,
) -> CategorySuggestion:
    needs_review = confidence < threshold
    return CategorySuggestion(
        expense_id=expense_id,
        category=category,
        confidence=confidence,
        reason=reason,
        source=source,
        needs_review=needs_review,
        posted=False,
        status="needs_review" if needs_review else "suggested",
    )


def _from_rules(expense: Expense, settings: Settings) -> CategorySuggestion:
    text = " ".join(_WORD.findall(f"{expense.vendor_name} {expense.description}".upper()))
    tokens = set(text.split())
    best: dict[str, CategoryRule] = {}
    for rule in RULES:
        if _hits(rule, text, tokens) and (
            rule.category not in best or rule.confidence > best[rule.category].confidence
        ):
            best[rule.category] = rule
    if not best:
        return _finalize(
            expense.expense_id,
            "Uncategorized",
            Decimal("0.20"),
            "No keyword rule matched the vendor or description.",
            "rules",
            settings.category_review_threshold,
        )
    ordered = sorted(best.values(), key=lambda rule: (-rule.confidence, rule.category))
    leader = ordered[0]
    if len(ordered) == 1:
        return _finalize(
            expense.expense_id,
            leader.category,
            leader.confidence,
            leader.reason,
            "rules",
            settings.category_review_threshold,
        )
    runner = ordered[1]
    margin = leader.confidence - runner.confidence
    if margin < settings.conflict_margin:
        return CategorySuggestion(
            expense_id=expense.expense_id,
            category=leader.category,
            confidence=min(leader.confidence, Decimal("0.45")),
            reason=(
                f"Rules disagreed: {leader.category} ({leader.confidence:.2f}) and "
                f"{runner.category} ({runner.confidence:.2f}). The margin is under "
                f"{settings.conflict_margin:.2f}, so this stays in review."
            ),
            source="rules",
            needs_review=True,
            posted=False,
            status="needs_review",
        )
    return _finalize(
        expense.expense_id,
        leader.category,
        leader.confidence,
        (
            f"{leader.reason} A weaker {runner.category} signal "
            f"({runner.confidence:.2f}) was not used."
        ),
        "rules",
        settings.category_review_threshold,
    )


def _hits(rule: CategoryRule, text: str, tokens: set[str]) -> bool:
    for keyword in rule.keywords:
        if " " in keyword:
            if keyword in text:
                return True
            continue
        if keyword in tokens:
            return True
        if len(keyword) >= 6 and any(token.startswith(keyword) for token in tokens):
            return True
    return False


def _duplicate_ids(expenses) -> dict[str, str]:
    groups: dict[tuple, list[Expense]] = defaultdict(list)
    for expense in expenses:
        reference = "".join(ch for ch in expense.reference.upper() if ch.isalnum())
        vendor = " ".join(expense.vendor_name.upper().split())
        if reference:
            key = (expense.date, vendor, expense.amount, reference)
        else:
            key = (expense.date, vendor, expense.amount, " ".join(expense.description.upper().split()))
        groups[key].append(expense)
    flagged: dict[str, str] = {}
    for group in groups.values():
        if len(group) < 2:
            continue
        ordered = sorted(group, key=lambda item: item.expense_id)
        keeper = ordered[0].expense_id
        for extra in ordered[1:]:
            flagged[extra.expense_id] = keeper
    return flagged
