"""Month-end checklist derived from the run. It does not mark the close as posted."""

from __future__ import annotations

from close_recon.models import (
    Books,
    CategorySuggestion,
    CheckStep,
    MatchResult,
    Reconciliation,
    ReviewItem,
)
from close_recon.money import display


def build_checklist(
    books: Books,
    match: MatchResult,
    reconciliation: Reconciliation,
    categories: tuple[CategorySuggestion, ...],
    review: tuple[ReviewItem, ...],
    signed_off: bool,
) -> tuple[str, tuple[CheckStep, ...]]:
    matched = sum(1 for link in match.links if link.status == "matched")
    suggested = sum(1 for link in match.links if link.status == "suggested")
    low_categories = sum(1 for item in categories if item.needs_review)
    duplicate_count = len(match.duplicates)
    duplicate_label = "duplicate" if duplicate_count == 1 else "duplicates"
    steps = (
        CheckStep(
            "Load bank statement",
            "Complete",
            f"{len(books.bank)} synthetic lines for {books.period.period}.",
        ),
        CheckStep(
            "Load general ledger cash",
            "Complete",
            f"{len(books.gl)} synthetic lines on {books.period.gl_cash_account}.",
        ),
        CheckStep(
            "Load vendor expenses",
            "Complete",
            f"{len(books.expenses)} synthetic expense lines.",
        ),
        CheckStep(
            "Match bank lines to the ledger",
            "Complete",
            f"{matched} cleared, {suggested} suggested, {duplicate_count} possible {duplicate_label}.",
        ),
        CheckStep(
            "Prepare the reconciliation",
            "Complete" if reconciliation.unexplained == reconciliation.book_beginning - reconciliation.bank_beginning else "Open",
            (
                f"Unexplained difference {display(reconciliation.unexplained)} {books.period.currency}. "
                "That equals the opening difference."
            ),
        ),
        _queue_step(review, "suggested_match", "Review suggested matches"),
        _queue_step(review, "duplicate", "Review duplicate and ambiguity exceptions", also="ambiguity"),
        _queue_step(review, "journal", "Approve proposed book entries"),
        CheckStep(
            "Review expense categories",
            _queue_status(review, "category"),
            (
                f"{_pending(review, 'category')} category rows still pending, "
                f"including {low_categories} rows flagged for review. None are posted."
            ),
        ),
        CheckStep(
            "Confirm the unexplained difference",
            "Complete" if reconciliation.unexplained == 0 else "Open",
            f"{display(reconciliation.unexplained)} {books.period.currency}.",
        ),
        CheckStep(
            "Reviewer sign-off",
            "Complete" if signed_off else "Open",
            "Signed off." if signed_off else "No SIGN-OFF approval is on file.",
        ),
        CheckStep(
            "Post journal entries",
            "Not available",
            "This tool does not post. Approved items stay approved_not_posted.",
        ),
    )
    pending = any(item.status == "pending" for item in review)
    if signed_off and not pending and reconciliation.unexplained == 0:
        overall = "reviewed, not posted"
    else:
        overall = "in progress"
    return overall, steps


def _queue_step(review: tuple[ReviewItem, ...], item_type: str, name: str, also: str | None = None) -> CheckStep:
    types = {item_type, also} if also else {item_type}
    relevant = [item for item in review if item.item_type in types]
    pending = sum(1 for item in relevant if item.status == "pending")
    if not relevant:
        status = "Complete"
        detail = "None on this run."
    elif pending:
        status = "Open"
        detail = f"{pending} of {len(relevant)} still pending."
    else:
        status = "Complete"
        detail = f"All {len(relevant)} decided. Nothing was posted."
    return CheckStep(name, status, detail)


def _queue_status(review: tuple[ReviewItem, ...], item_type: str) -> str:
    relevant = [item for item in review if item.item_type == item_type]
    if relevant and any(item.status == "pending" for item in relevant):
        return "Open"
    return "Complete"


def _pending(review: tuple[ReviewItem, ...], item_type: str) -> int:
    return sum(1 for item in review if item.item_type == item_type and item.status == "pending")
