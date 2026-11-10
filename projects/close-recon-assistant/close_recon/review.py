"""Review queue and reviewer decisions. Approving an item never posts it."""

from __future__ import annotations

import csv
from decimal import Decimal
from pathlib import Path

from close_recon.models import (
    CategorySuggestion,
    Decision,
    MatchResult,
    Reconciliation,
    ReviewError,
    ReviewItem,
)
from close_recon.money import plain

SIGN_OFF = "SIGN-OFF"


def build_review_queue(
    match: MatchResult,
    reconciliation: Reconciliation,
    categories: tuple[CategorySuggestion, ...],
) -> tuple[ReviewItem, ...]:
    items: list[ReviewItem] = []
    for link in match.links:
        if link.status != "suggested":
            continue
        if link.amount_delta == 0:
            action = "Confirm or reject this suggested match. No journal entry is proposed."
            priority = "normal"
        else:
            action = (
                f"Confirm the lines are the same item. If the bank amount is right, "
                f"the proposed book correction is {plain(link.amount_delta)}. Nothing is posted."
            )
            priority = "high"
        items.append(
            ReviewItem(
                item_id=f"MATCH-{link.match_id}",
                item_type="suggested_match",
                priority=priority,
                summary=f"{link.match_id} {link.rule} bank {', '.join(link.bank_ids)} to book {', '.join(link.gl_ids)}",
                proposed_action=action,
                confidence=link.confidence,
                reason=link.reason,
            )
        )
    for flag in match.duplicates:
        items.append(
            ReviewItem(
                item_id=f"DUP-{flag.side}-{flag.line_id}",
                item_type="duplicate",
                priority="high",
                summary=f"Possible duplicate {flag.line_id} of {flag.keeper_id} on the {flag.side} side",
                proposed_action=(
                    "Confirm whether this is a repeat. The bridge already shows the proposed treatment. "
                    "Nothing is posted."
                ),
                confidence=Decimal("0.50"),
                reason=flag.reason,
            )
        )
    for index, ambiguity in enumerate(match.ambiguities, start=1):
        items.append(
            ReviewItem(
                item_id=f"AMB-{index:02d}",
                item_type="ambiguity",
                priority="high",
                summary=(
                    f"Ambiguous {ambiguity.rule}: bank {', '.join(ambiguity.bank_ids) or 'none'}, "
                    f"book {', '.join(ambiguity.gl_ids) or 'none'}"
                ),
                proposed_action="Choose the correct pairing. The lines stay unmatched until then.",
                confidence=Decimal("0.30"),
                reason=ambiguity.reason,
            )
        )
    for item in reconciliation.items:
        if item.kind in {"proposed_amount_correction", "suspected_duplicate"}:
            continue
        if not item.requires_approval:
            continue
        items.append(
            ReviewItem(
                item_id=f"JE-{item.item_id}",
                item_type="journal",
                priority="high" if item.confidence < Decimal("0.75") else "normal",
                summary=f"{item.kind} {', '.join(item.source_ids)} {plain(item.amount)}",
                proposed_action="Approve or reject this proposed book entry. Nothing is posted either way.",
                confidence=item.confidence,
                reason=item.reason,
            )
        )
    for suggestion in categories:
        items.append(
            ReviewItem(
                item_id=f"CAT-{suggestion.expense_id}",
                item_type="category",
                priority="high" if suggestion.needs_review else "low",
                summary=f"{suggestion.expense_id} suggested {suggestion.category}",
                proposed_action="Accept the category or recode it. Nothing is posted.",
                confidence=suggestion.confidence,
                reason=suggestion.reason,
            )
        )
    return tuple(items)


def load_decisions(path: Path) -> tuple[Decision, ...]:
    if not path.is_file():
        raise ReviewError(f"missing decisions file {path.name}")
    with path.open(encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames is None or tuple(reader.fieldnames) != ("item_id", "decision", "reviewer", "note"):
            raise ReviewError("decisions columns must be item_id, decision, reviewer, note")
        rows = list(reader)
    decisions: list[Decision] = []
    seen: set[str] = set()
    for row in rows:
        item_id = row["item_id"].strip()
        if item_id in seen:
            raise ReviewError(f"decision file repeats {item_id}")
        seen.add(item_id)
        decisions.append(
            Decision(
                item_id=item_id,
                decision=row["decision"].strip().lower(),
                reviewer=row["reviewer"].strip(),
                note=row["note"].strip(),
            )
        )
    return tuple(decisions)


def apply_decisions(
    review: tuple[ReviewItem, ...],
    decisions: tuple[Decision, ...],
) -> tuple[tuple[ReviewItem, ...], bool]:
    known = {item.item_id: item for item in review}
    seen: set[str] = set()
    for decision in decisions:
        if decision.item_id in seen:
            raise ReviewError(f"decision file repeats {decision.item_id}")
        seen.add(decision.item_id)
        _validate_decision(decision, known)
    chosen = {decision.item_id: decision for decision in decisions}
    updated: list[ReviewItem] = []
    for item in review:
        decision = chosen.get(item.item_id)
        if decision is None:
            updated.append(item)
            continue
        updated.append(
            ReviewItem(
                item_id=item.item_id,
                item_type=item.item_type,
                priority=item.priority,
                summary=item.summary,
                proposed_action=item.proposed_action,
                confidence=item.confidence,
                reason=item.reason,
                status="approved_not_posted" if decision.decision == "approve" else "rejected",
                reviewer_decision=decision.decision,
                reviewer=decision.reviewer,
                note=decision.note,
            )
        )
    sign_off = any(decision.item_id == SIGN_OFF and decision.decision == "approve" for decision in decisions)
    return tuple(updated), sign_off


def _validate_decision(decision: Decision, known: dict[str, ReviewItem]) -> None:
    if decision.decision not in {"approve", "reject"}:
        raise ReviewError(f"{decision.item_id} decision must be approve or reject")
    if not decision.reviewer or len(decision.reviewer) > 80 or any(ord(ch) < 32 for ch in decision.reviewer):
        raise ReviewError(f"{decision.item_id} needs a reviewer name")
    if len(decision.note) > 200 or any(ord(ch) < 32 for ch in decision.note):
        raise ReviewError(f"{decision.item_id} note is invalid")
    if decision.item_id == SIGN_OFF:
        return
    if decision.item_id not in known:
        raise ReviewError(f"unknown review item {decision.item_id}")
