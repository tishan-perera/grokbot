"""Reconciliation totals, population coverage, and the opening-balance identity."""

from __future__ import annotations

import random
import sys
import unittest
from decimal import Decimal
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from close_recon.match import match_lines
from close_recon.money import ZERO, money
from close_recon.reconcile import reconcile_lines
from support import bank, gl, primary_ids


class ReconcileTests(unittest.TestCase):
    def test_empty_books_tie_to_the_opening_difference(self) -> None:
        result = match_lines([], [])
        recon = reconcile_lines([], [], result, Decimal("100.00"), Decimal("125.00"))
        self.assertEqual(recon.bank_balance, Decimal("100.00"))
        self.assertEqual(recon.book_balance, Decimal("125.00"))
        self.assertEqual(recon.unexplained, Decimal("25.00"))
        self.assertEqual(recon.items, ())

    def test_opening_gap_remains_when_every_line_matches(self) -> None:
        bank_lines = [bank("B-01", 3, "40.00", "AR-1")]
        gl_lines = [gl("G-01", 3, "40.00", "AR-1", source="AR")]
        result = match_lines(bank_lines, gl_lines)
        recon = reconcile_lines(bank_lines, gl_lines, result, Decimal("20000.00"), Decimal("20100.00"))
        self.assertEqual(len(result.links), 1)
        self.assertEqual(recon.unexplained, Decimal("100.00"))
        self.assertEqual(recon.adjusted_book - recon.adjusted_bank, Decimal("100.00"))

    def test_random_populations_tie_and_cover_every_line(self) -> None:
        rng = random.Random(0)
        for _ in range(30):
            bank_lines = [_random_line(rng, "B", index) for index in range(1, rng.randint(1, 12))]
            gl_lines = [_random_line(rng, "G", index, ledger=True) for index in range(1, rng.randint(1, 12))]
            bank_begin = _cents(rng, 50000)
            book_begin = _cents(rng, 50000)
            result = match_lines(bank_lines, gl_lines)
            recon = reconcile_lines(bank_lines, gl_lines, result, bank_begin, book_begin)
            self.assertEqual(recon.unexplained, money(book_begin - bank_begin))
            self.assertEqual(recon.adjusted_book - recon.adjusted_bank, recon.unexplained)
            self.assertEqual(
                recon.bank_balance,
                money(bank_begin + sum((line.amount for line in bank_lines), ZERO)),
            )
            self.assertEqual(
                recon.book_balance,
                money(book_begin + sum((line.amount for line in gl_lines), ZERO)),
            )
            bank_found = primary_ids(bank_lines, result.links, result.duplicates, recon.items, "bank")
            gl_found = primary_ids(gl_lines, result.links, result.duplicates, recon.items, "book")
            self.assertCountEqual(bank_found, [line.line_id for line in bank_lines])
            self.assertCountEqual(gl_found, [line.line_id for line in gl_lines])


def _random_line(rng: random.Random, prefix: str, index: int, ledger: bool = False):
    amount = _cents(rng, 20000)
    if amount == 0:
        amount = Decimal("1.00")
    reference = "" if rng.random() < 0.3 else f"R-{rng.randint(1, 4):02d}"
    description = rng.choice(
        ["Sample line", "Monthly service fee", "Interest credit", "Pos debit sample"]
    )
    if ledger:
        return gl(f"{prefix}-{index:02d}", rng.randint(1, 28), str(amount), reference, description)
    return bank(f"{prefix}-{index:02d}", rng.randint(1, 28), str(amount), reference, description)


def _cents(rng: random.Random, limit: int) -> Decimal:
    return Decimal(rng.randrange(-limit, limit)) / Decimal(100)


if __name__ == "__main__":
    unittest.main()
