"""Build the bank reconciliation bridge.

Every loaded line is either cleared, suggested, flagged as a duplicate, or
placed in one reconciling bucket. The unexplained difference then equals the
opening book balance minus the opening bank balance. The engine refuses to
emit a report when that identity fails.

Proposed book adjustments are part of the bridge so the tie-out can be
checked. They are not approvals, and nothing is posted.
"""

from __future__ import annotations

import re
from decimal import Decimal

from close_recon.models import (
    Books,
    MatchResult,
    Reconciliation,
    ReconciliationError,
    ReconcilingItem,
)
from close_recon.money import ZERO, money, plain

_FEE = frozenset({"FEE", "FEES"})
_INTEREST = frozenset({"INTEREST"})


def build_reconciliation(books: Books, match: MatchResult) -> Reconciliation:
    return reconcile_lines(
        bank=books.bank,
        gl=books.gl,
        match=match,
        bank_beginning=books.period.bank_beginning_balance,
        book_beginning=books.period.gl_beginning_balance,
    )


def reconcile_lines(bank, gl, match: MatchResult, bank_beginning: Decimal, book_beginning: Decimal) -> Reconciliation:
    bank_begin = money(bank_beginning)
    book_begin = money(book_beginning)
    bank_balance = money(bank_begin + sum((line.amount for line in bank), ZERO))
    book_balance = money(book_begin + sum((line.amount for line in gl), ZERO))
    ambiguous = {line_id for item in match.ambiguities for line_id in item.bank_ids + item.gl_ids}
    items: list[ReconcilingItem] = []

    def add(**kwargs) -> None:
        items.append(ReconcilingItem(**kwargs))

    cleared_bank = {line_id for link in match.links for line_id in link.bank_ids}
    cleared_gl = {line_id for link in match.links for line_id in link.gl_ids}
    duplicate_bank = {flag.line_id for flag in match.duplicates if flag.side == "bank"}
    duplicate_gl = {flag.line_id for flag in match.duplicates if flag.side == "book"}

    for flag in match.duplicates:
        if flag.side == "bank":
            add(
                item_id="",
                kind="suspected_duplicate",
                statement_side="bank",
                amount=money(-flag.amount),
                source_ids=(flag.line_id, flag.keeper_id),
                requires_approval=True,
                posts_journal_entry=False,
                confidence=Decimal("0.50"),
                provisional=flag.line_id in ambiguous,
                reason=(
                    f"{flag.reason} The bridge adds the bank line back until a reviewer confirms the repeat. "
                    "This is not a ledger posting."
                ),
            )
        else:
            add(
                item_id="",
                kind="suspected_duplicate",
                statement_side="book",
                amount=money(-flag.amount),
                source_ids=(flag.line_id, flag.keeper_id),
                requires_approval=True,
                posts_journal_entry=True,
                confidence=Decimal("0.50"),
                provisional=flag.line_id in ambiguous,
                reason=(
                    f"{flag.reason} The bridge reverses the extra book line until a reviewer confirms it. "
                    "Nothing is posted."
                ),
            )

    for line in sorted(gl, key=lambda item: item.line_id):
        if line.line_id in cleared_gl or line.line_id in duplicate_gl:
            continue
        provisional = line.line_id in ambiguous
        prefix = "Provisional, because the line is also in an unresolved ambiguity. " if provisional else ""
        if line.amount > 0:
            add(
                item_id="",
                kind="deposit_in_transit",
                statement_side="bank",
                amount=line.amount,
                source_ids=(line.line_id,),
                requires_approval=False,
                posts_journal_entry=False,
                confidence=Decimal("0.90"),
                provisional=provisional,
                reason=prefix + f"{line.line_id} is on the books and not on the bank. Treated as a deposit in transit.",
            )
        else:
            add(
                item_id="",
                kind="outstanding_payment",
                statement_side="bank",
                amount=line.amount,
                source_ids=(line.line_id,),
                requires_approval=False,
                posts_journal_entry=False,
                confidence=Decimal("0.90"),
                provisional=provisional,
                reason=prefix + f"{line.line_id} is on the books and not on the bank. Treated as an outstanding payment.",
            )

    for line in sorted(bank, key=lambda item: item.line_id):
        if line.line_id in cleared_bank or line.line_id in duplicate_bank:
            continue
        tokens = _tokens(line.description) | _tokens(line.reference)
        provisional = line.line_id in ambiguous
        prefix = "Provisional, because the line is also in an unresolved ambiguity. " if provisional else ""
        if tokens & _INTEREST and not tokens & _FEE:
            kind = "unrecorded_interest"
            confidence = Decimal("0.80")
            reason = prefix + f"{line.line_id} looks like interest and is not on the books. Proposed, not posted."
        elif tokens & _FEE and not tokens & _INTEREST:
            kind = "unrecorded_bank_charge"
            confidence = Decimal("0.80")
            reason = prefix + f"{line.line_id} looks like a bank fee and is not on the books. Proposed, not posted."
        else:
            kind = "unrecorded_bank_amount"
            confidence = Decimal("0.40")
            reason = prefix + f"{line.line_id} is on the bank and not on the books. The reason is not identified. Not posted."
        add(
            item_id="",
            kind=kind,
            statement_side="book",
            amount=line.amount,
            source_ids=(line.line_id,),
            requires_approval=True,
            posts_journal_entry=True,
            confidence=confidence,
            provisional=provisional,
            reason=reason,
        )

    for link in match.links:
        if link.status != "suggested" or link.amount_delta == 0:
            continue
        add(
            item_id="",
            kind="proposed_amount_correction",
            statement_side="book",
            amount=money(link.amount_delta),
            source_ids=link.bank_ids + link.gl_ids,
            requires_approval=True,
            posts_journal_entry=True,
            confidence=link.confidence,
            provisional=False,
            reason=(
                f"{link.match_id} differs by {plain(link.amount_delta)} "
                f"(bank {plain(link.bank_amount)}, book {plain(link.gl_amount)}). "
                "The bridge includes that difference as a proposed book correction. Not posted."
            ),
        )

    ordered = tuple(
        ReconcilingItem(
            item_id=f"R-{index:02d}",
            kind=item.kind,
            statement_side=item.statement_side,
            amount=item.amount,
            source_ids=item.source_ids,
            requires_approval=item.requires_approval,
            posts_journal_entry=item.posts_journal_entry,
            confidence=item.confidence,
            reason=item.reason,
            provisional=item.provisional,
        )
        for index, item in enumerate(items, start=1)
    )
    bank_adjust = sum((item.amount for item in ordered if item.statement_side == "bank"), ZERO)
    book_adjust = sum((item.amount for item in ordered if item.statement_side == "book"), ZERO)
    adjusted_bank = money(bank_balance + bank_adjust)
    adjusted_book = money(book_balance + book_adjust)
    unexplained = money(adjusted_book - adjusted_bank)
    expected = money(book_begin - bank_begin)
    if unexplained != expected:
        raise ReconciliationError(
            "Tie-out failed. Unexplained "
            f"{plain(unexplained)} does not equal the opening difference {plain(expected)}."
        )
    return Reconciliation(
        bank_beginning=bank_begin,
        book_beginning=book_begin,
        bank_balance=bank_balance,
        book_balance=book_balance,
        adjusted_bank=adjusted_bank,
        adjusted_book=adjusted_book,
        unexplained=unexplained,
        items=ordered,
    )


def _tokens(value: str) -> set[str]:
    return {part for part in re.split(r"[^A-Z0-9]+", value.upper()) if part}
