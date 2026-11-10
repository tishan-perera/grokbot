"""Decimal money helpers. Amounts stay in cents and never use binary floats."""

from __future__ import annotations

from decimal import Decimal

CENT = Decimal("0.01")
ZERO = Decimal("0.00")


def money(value: Decimal) -> Decimal:
    """Quantize to cents without accepting a value that is not already exact."""
    quantized = value.quantize(CENT)
    if quantized != value:
        raise ValueError(f"amount is not an exact cent value: {value}")
    return quantized


def parse_amount(raw: str) -> Decimal:
    text = raw.strip()
    if not text or any(ch in text for ch in "eE,"):
        raise ValueError("amount must be a plain decimal with no separators")
    try:
        value = Decimal(text)
    except Exception as exc:  # Decimal raises several subclasses
        raise ValueError("amount is not a decimal") from exc
    if not value.is_finite():
        raise ValueError("amount must be finite")
    return money(value)


def plain(value: Decimal) -> str:
    return f"{money(value):.2f}"


def display(value: Decimal) -> str:
    """Grouped dollars for reports, such as 20,557.67 or -955.55."""
    quantized = money(value)
    sign = "-" if quantized < 0 else ""
    whole, frac = f"{abs(quantized):.2f}".split(".")
    groups: list[str] = []
    while whole:
        groups.append(whole[-3:])
        whole = whole[:-3]
    return sign + ",".join(reversed(groups)) + "." + frac


def cents(value: Decimal) -> int:
    return int((money(value) * 100).to_integral_value())
