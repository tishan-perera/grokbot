"""Run the close from synthetic books to files a reviewer can read."""

from __future__ import annotations

from dataclasses import replace
from pathlib import Path

from close_recon.audit import build_audit, posted_count
from close_recon.categorize import categorize_expenses
from close_recon.checklist import build_checklist
from close_recon.load import load_books, parse_as_of
from close_recon.match import RULE_TOLERANCE, match_lines, norm_ref
from close_recon.models import CloseReconError, CloseResult, Decision, MatchResult, Settings
from close_recon.reconcile import build_reconciliation
from close_recon.report import write_outputs
from close_recon.review import apply_decisions, build_review_queue


def run_close(
    data_dir: Path,
    output_dir: Path | None = None,
    settings: Settings | None = None,
    as_of: str = "2026-04-02T15:00:00+00:00",
    suggester=None,
    decisions: tuple[Decision, ...] | None = None,
) -> CloseResult:
    settings = settings or Settings()
    as_of_text = parse_as_of(as_of)
    books = load_books(data_dir)
    match = annotate_vendor_notes(match_lines(books.bank, books.gl, settings), books.gl, books.expenses)
    reconciliation = build_reconciliation(books, match)
    categories = categorize_expenses(books.expenses, settings, suggester)
    if posted_count(categories):
        raise CloseReconError("A category suggestion was marked posted. This tool cannot post.")
    review = build_review_queue(match, reconciliation, categories)
    signed_off = False
    applied = decisions or ()
    final_review = review
    final_categories = categories
    if applied:
        final_review, signed_off = apply_decisions(review, applied)
        final_categories = _reflect_categories(categories, final_review)
    audit = build_audit(match, reconciliation, categories, review, as_of_text, applied)
    overall, checklist = build_checklist(
        books,
        match,
        reconciliation,
        final_categories,
        final_review,
        signed_off,
    )
    result = CloseResult(
        books=books,
        match=match,
        reconciliation=reconciliation,
        categories=final_categories,
        review=final_review,
        audit=audit,
        checklist=checklist,
        overall_status=overall,
        as_of=as_of_text,
        llm_enabled=settings.enable_llm,
        signed_off=signed_off,
    )
    if output_dir is not None:
        write_outputs(result, output_dir)
    return result


def annotate_vendor_notes(match: MatchResult, gl, expenses) -> MatchResult:
    """Add a deterministic note when a vendor bill agrees with one side of a typo."""
    gl_by = {line.line_id: line for line in gl}
    updated = []
    for link in match.links:
        if link.rule != RULE_TOLERANCE:
            updated.append(link)
            continue
        notes: list[str] = []
        for gl_id in link.gl_ids:
            gl_line = gl_by[gl_id]
            key = norm_ref(gl_line.reference)
            related = [
                expense
                for expense in expenses
                if key and norm_ref(expense.payment_reference) == key
            ]
            related.sort(key=lambda expense: expense.expense_id)
            book_amount = abs(gl_line.amount)
            bank_amount = abs(link.bank_amount)
            expense_amounts = {abs(expense.amount) for expense in related}
            if not related:
                notes.append("No vendor expense carries this payment reference.")
            elif expense_amounts == {book_amount}:
                notes.append(
                    f"Vendor expense {related[0].expense_id} matches the book amount "
                    f"{gl_line.amount:.2f}, not the bank amount."
                )
            elif bank_amount in expense_amounts:
                notes.append("A vendor expense matches the bank amount rather than the book amount.")
            else:
                notes.append("A vendor expense shares the reference but the amount matches neither side.")
        updated.append(replace(link, reason=f"{link.reason} {' '.join(notes)}"))
    return replace(match, links=tuple(updated))


def _reflect_categories(categories, review):
    by_id = {item.item_id: item for item in review}
    reflected = []
    for suggestion in categories:
        item = by_id[f"CAT-{suggestion.expense_id}"]
        status = suggestion.status
        if item.status == "approved_not_posted":
            status = "approved_not_posted"
        elif item.status == "rejected":
            status = "rejected"
        reflected.append(replace(suggestion, status=status, posted=False))
    return tuple(reflected)
