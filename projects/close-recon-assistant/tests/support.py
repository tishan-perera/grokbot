"""Line builders for the unit tests. Not used by the sample close."""

from __future__ import annotations

from datetime import date
from decimal import Decimal

from close_recon.models import BankLine, Expense, GlLine

DAY = date(2026, 3, 1)


def on(day: int) -> date:
    return date(2026, 3, day)


def bank(line_id: str, day: int, amount: str, reference: str = "", description: str = "Sample line") -> BankLine:
    return BankLine(line_id, "SYNTHETIC", on(day), description, reference, Decimal(amount))


def gl(
    line_id: str,
    day: int,
    amount: str,
    reference: str = "",
    description: str = "Sample line",
    source: str = "AP",
) -> GlLine:
    return GlLine(line_id, "SYNTHETIC", on(day), description, reference, Decimal(amount), source)


def expense(
    expense_id: str,
    vendor: str,
    description: str,
    amount: str = "10.00",
    day: int = 5,
    reference: str = "INV-1",
    payment_reference: str = "CHK-1001",
) -> Expense:
    return Expense(
        expense_id,
        "SYNTHETIC",
        on(day),
        vendor,
        description,
        reference,
        Decimal(amount),
        payment_reference,
    )


def primary_ids(lines, links, duplicates, items, side: str) -> list[str]:
    """Ids in exactly one primary bucket: a link, a duplicate, or an unmatched class."""
    ids = {line.line_id for line in lines}
    found: list[str] = []
    for link in links:
        found.extend(link.bank_ids if side == "bank" else link.gl_ids)
    for flag in duplicates:
        if flag.side == side:
            found.append(flag.line_id)
    if side == "bank":
        kinds = {"unrecorded_interest", "unrecorded_bank_charge", "unrecorded_bank_amount"}
    else:
        kinds = {"deposit_in_transit", "outstanding_payment"}
    for item in items:
        if item.kind in kinds:
            found.extend(source for source in item.source_ids if source in ids)
    return found
