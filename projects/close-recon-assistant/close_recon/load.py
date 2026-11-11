"""Load the fictional month. The loader refuses anything that is not labelled synthetic."""

from __future__ import annotations

import csv
import json
import re
from datetime import date, datetime
from decimal import Decimal
from pathlib import Path

from close_recon.models import BankLine, Books, DataError, Expense, GlLine, Period
from close_recon.money import parse_amount

ORIGIN = "SYNTHETIC"
MAX_ROWS = 500
MAX_TEXT = 120
SOURCES = frozenset({"AR", "AP", "PAYROLL", "JE", "OTHER"})
DIGIT_RUN = re.compile(r"\d{8,}")
PERIOD_KEYS = frozenset(
    {
        "data_origin",
        "entity_name",
        "period",
        "period_start",
        "period_end",
        "currency",
        "bank_account_label",
        "gl_cash_account",
        "bank_beginning_balance",
        "gl_beginning_balance",
        "prepared_for",
    }
)
BANK_COLUMNS = (
    "line_id",
    "data_origin",
    "date",
    "description",
    "reference",
    "amount",
)
GL_COLUMNS = BANK_COLUMNS + ("source",)
EXPENSE_COLUMNS = (
    "expense_id",
    "data_origin",
    "date",
    "vendor_name",
    "description",
    "reference",
    "amount",
    "payment_reference",
)


def load_books(data_dir: Path) -> Books:
    root = Path(data_dir)
    period = _load_period(root / "period.json")
    bank = _load_bank(root / "bank_statement.csv", period)
    gl = _load_gl(root / "gl_cash.csv", period)
    expenses = _load_expenses(root / "vendor_expenses.csv", period)
    return Books(period=period, bank=tuple(bank), gl=tuple(gl), expenses=tuple(expenses))


def parse_as_of(value: str) -> str:
    text = value.strip()
    try:
        parsed = datetime.fromisoformat(text)
    except ValueError as exc:
        raise DataError("as-of timestamp must be ISO-8601 with a timezone") from exc
    if parsed.tzinfo is None:
        raise DataError("as-of timestamp needs a timezone, for example 2026-04-02T15:00:00+00:00")
    return parsed.isoformat()


def _load_period(path: Path) -> Period:
    payload = _read_json(path)
    if not isinstance(payload, dict):
        raise DataError("period.json must be an object")
    extra = set(payload) - PERIOD_KEYS
    missing = PERIOD_KEYS - set(payload)
    if extra or missing:
        raise DataError("period.json keys do not match the synthetic period contract")
    origin = _origin(payload["data_origin"], "period.json")
    start = _date(str(payload["period_start"]), "period_start")
    end = _date(str(payload["period_end"]), "period_end")
    if end < start:
        raise DataError("period_end is before period_start")
    label = _text(str(payload["bank_account_label"]), "bank_account_label")
    if DIGIT_RUN.search(label):
        raise DataError("bank_account_label must not contain an account number")
    return Period(
        data_origin=origin,
        entity_name=_text(str(payload["entity_name"]), "entity_name"),
        period=_text(str(payload["period"]), "period"),
        period_start=start,
        period_end=end,
        currency=_text(str(payload["currency"]), "currency"),
        bank_account_label=label,
        gl_cash_account=_text(str(payload["gl_cash_account"]), "gl_cash_account"),
        bank_beginning_balance=_amount(str(payload["bank_beginning_balance"]), "bank_beginning_balance"),
        gl_beginning_balance=_amount(str(payload["gl_beginning_balance"]), "gl_beginning_balance"),
        prepared_for=_text(str(payload["prepared_for"]), "prepared_for"),
    )


def _load_bank(path: Path, period: Period) -> list[BankLine]:
    rows = _rows(path, BANK_COLUMNS)
    lines: list[BankLine] = []
    seen: set[str] = set()
    for row in rows:
        line_id = _id(row["line_id"], "line_id")
        _unique(line_id, seen, path.name)
        amount = _nonzero(row["amount"], line_id)
        lines.append(
            BankLine(
                line_id=line_id,
                data_origin=_origin(row["data_origin"], line_id),
                date=_in_period(row["date"], line_id, period),
                description=_text(row["description"], line_id),
                reference=_reference(row["reference"], line_id),
                amount=amount,
            )
        )
    return lines


def _load_gl(path: Path, period: Period) -> list[GlLine]:
    rows = _rows(path, GL_COLUMNS)
    lines: list[GlLine] = []
    seen: set[str] = set()
    for row in rows:
        line_id = _id(row["line_id"], "line_id")
        _unique(line_id, seen, path.name)
        source = row["source"].strip()
        if source not in SOURCES:
            raise DataError(f"{line_id} has a source outside AR, AP, PAYROLL, JE, OTHER")
        lines.append(
            GlLine(
                line_id=line_id,
                data_origin=_origin(row["data_origin"], line_id),
                date=_in_period(row["date"], line_id, period),
                description=_text(row["description"], line_id),
                reference=_reference(row["reference"], line_id),
                amount=_nonzero(row["amount"], line_id),
                source=source,
            )
        )
    return lines


def _load_expenses(path: Path, period: Period) -> list[Expense]:
    rows = _rows(path, EXPENSE_COLUMNS)
    lines: list[Expense] = []
    seen: set[str] = set()
    for row in rows:
        expense_id = _id(row["expense_id"], "expense_id")
        _unique(expense_id, seen, path.name)
        lines.append(
            Expense(
                expense_id=expense_id,
                data_origin=_origin(row["data_origin"], expense_id),
                date=_in_period(row["date"], expense_id, period),
                vendor_name=_text(row["vendor_name"], expense_id),
                description=_text(row["description"], expense_id),
                reference=_reference(row["reference"], expense_id),
                amount=_nonzero(row["amount"], expense_id),
                payment_reference=_reference(row["payment_reference"], expense_id),
            )
        )
    return lines


def _rows(path: Path, columns: tuple[str, ...]) -> list[dict[str, str]]:
    if not path.is_file():
        raise DataError(f"missing {path.name}")
    with path.open(encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames is None or tuple(reader.fieldnames) != columns:
            raise DataError(f"{path.name} columns must be exactly {', '.join(columns)}")
        rows = list(reader)
    if len(rows) > MAX_ROWS:
        raise DataError(f"{path.name} has more than {MAX_ROWS} rows")
    return rows


def _read_json(path: Path) -> object:
    if not path.is_file():
        raise DataError(f"missing {path.name}")
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise DataError(f"{path.name} is not valid JSON") from exc


def _origin(value: object, label: str) -> str:
    if value != ORIGIN:
        raise DataError(f"{label} must set data_origin to SYNTHETIC")
    return ORIGIN


def _date(value: str, label: str) -> date:
    try:
        return date.fromisoformat(value.strip())
    except ValueError as exc:
        raise DataError(f"{label} has a date that is not YYYY-MM-DD") from exc


def _in_period(value: str, label: str, period: Period) -> date:
    parsed = _date(value, label)
    if parsed < period.period_start or parsed > period.period_end:
        raise DataError(f"{label} is outside the period")
    return parsed


def _amount(value: str, label: str) -> Decimal:
    try:
        return parse_amount(value)
    except ValueError as exc:
        raise DataError(f"{label} has an invalid amount") from exc


def _nonzero(value: str, label: str) -> Decimal:
    amount = _amount(value, label)
    if amount == 0:
        raise DataError(f"{label} has a zero amount")
    return amount


def _text(value: str, label: str) -> str:
    text = value.strip()
    if not text or len(text) > MAX_TEXT or any(ord(ch) < 32 for ch in text):
        raise DataError(f"{label} has an empty or invalid description")
    if DIGIT_RUN.search(text):
        raise DataError(f"{label} contains an 8-digit run and was refused")
    return text


def _reference(value: str, label: str) -> str:
    text = value.strip()
    if len(text) > 40 or any(ord(ch) < 32 for ch in text):
        raise DataError(f"{label} has an invalid reference")
    if DIGIT_RUN.search(text):
        raise DataError(f"{label} contains an 8-digit run and was refused")
    return text


def _id(value: str, label: str) -> str:
    text = value.strip()
    if not re.fullmatch(r"[A-Z]{1,4}-[0-9]{2,4}", text):
        raise DataError(f"{label} must look like B-01")
    return text


def _unique(value: str, seen: set[str], filename: str) -> None:
    if value in seen:
        raise DataError(f"{filename} repeats id {value}")
    seen.add(value)
