"""Sample month tie-out, loader guards, review decisions, and the command line."""

from __future__ import annotations

import csv
import json
import re
import sys
import unittest
from decimal import Decimal
from io import StringIO
from pathlib import Path
from tempfile import TemporaryDirectory
from contextlib import redirect_stderr, redirect_stdout

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from close_recon.cli import main
from close_recon.load import DataError, load_books
from close_recon.models import Decision, ReviewError
from close_recon.pipeline import run_close
from close_recon.report import OUTPUT_FILES
from support import primary_ids

AS_OF = "2026-04-02T15:00:00+00:00"
DIGIT_RUN = re.compile(r"\d{8,}")


class SampleTests(unittest.TestCase):
    def test_sample_month_ties_and_keeps_the_messy_items_open(self) -> None:
        result = run_close(DATA, as_of=AS_OF)
        recon = result.reconciliation
        self.assertEqual(recon.bank_balance, Decimal("18853.94"))
        self.assertEqual(recon.book_balance, Decimal("20557.67"))
        self.assertEqual(recon.adjusted_bank, Decimal("20468.39"))
        self.assertEqual(recon.adjusted_book, Decimal("20468.39"))
        self.assertEqual(recon.unexplained, Decimal("0.00"))
        self.assertEqual(sum(1 for link in result.match.links if link.status == "matched"), 10)
        self.assertEqual(sum(1 for link in result.match.links if link.status == "suggested"), 3)
        amounts = {item.kind: [] for item in recon.items}
        for item in recon.items:
            amounts.setdefault(item.kind, []).append(item.amount)
        self.assertEqual(amounts["deposit_in_transit"], [Decimal("2150.00")])
        self.assertEqual(sum(amounts["outstanding_payment"], Decimal("0")), Decimal("-955.55"))
        self.assertEqual(amounts["suspected_duplicate"], [Decimal("420.00")])
        self.assertEqual(amounts["unrecorded_bank_charge"], [Decimal("-25.00")])
        self.assertEqual(amounts["unrecorded_interest"], [Decimal("4.12")])
        self.assertEqual(amounts["unrecorded_bank_amount"], [Decimal("-63.40")])
        self.assertEqual(amounts["proposed_amount_correction"], [Decimal("-5.00")])
        typo = next(link for link in result.match.links if link.rule == "amount_tolerance_exact_ref")
        self.assertIn("E-04", typo.reason)
        self.assertIn("not the bank amount", typo.reason)
        bank_found = primary_ids(result.books.bank, result.match.links, result.match.duplicates, recon.items, "bank")
        gl_found = primary_ids(result.books.gl, result.match.links, result.match.duplicates, recon.items, "book")
        self.assertCountEqual(bank_found, [line.line_id for line in result.books.bank])
        self.assertCountEqual(gl_found, [line.line_id for line in result.books.gl])

    def test_low_confidence_categories_are_queued_and_nothing_is_posted(self) -> None:
        result = run_close(DATA, as_of=AS_OF)
        self.assertFalse(result.llm_enabled)
        self.assertTrue(all(item.posted is False for item in result.categories))
        queued = {item.item_id: item for item in result.review}
        for suggestion in result.categories:
            item = queued[f"CAT-{suggestion.expense_id}"]
            self.assertEqual(item.status, "pending")
            if suggestion.needs_review:
                self.assertEqual(item.priority, "high")
        self.assertEqual(sum(1 for item in result.review if item.status == "pending"), 19)
        actions = {(event.action, event.object_id) for event in result.audit}
        for link in result.match.links:
            action = "match" if link.status == "matched" else "suggest_match"
            self.assertIn((action, link.match_id), actions)
        self.assertTrue(any(event.action == "flag_duplicate" for event in result.audit))
        self.assertNotIn("llm", {suggestion.source for suggestion in result.categories})

    def test_review_approval_does_not_post_and_unknown_ids_fail(self) -> None:
        approved = run_close(
            DATA,
            as_of=AS_OF,
            decisions=(
                Decision("CAT-E-10", "approve", "A. Reviewer (sample)", "Category accepted for the sample."),
                Decision("SIGN-OFF", "approve", "A. Reviewer (sample)", ""),
            ),
        )
        category = next(item for item in approved.categories if item.expense_id == "E-10")
        self.assertEqual(category.status, "approved_not_posted")
        self.assertFalse(category.posted)
        sign_off = next(step for step in approved.checklist if step.name == "Reviewer sign-off")
        posting = next(step for step in approved.checklist if step.name == "Post journal entries")
        self.assertEqual(sign_off.status, "Complete")
        self.assertEqual(posting.status, "Not available")
        self.assertEqual(approved.overall_status, "in progress")
        human = [event for event in approved.audit if event.action == "human_review"]
        self.assertEqual(human[0].decision, "approved_not_posted")
        self.assertEqual(human[0].actor, "A. Reviewer (sample)")
        engine = next(
            event
            for event in approved.audit
            if event.action == "categorize" and event.object_id == "E-10"
        )
        self.assertEqual(engine.decision, "needs_review")
        with self.assertRaises(ReviewError):
            run_close(
                DATA,
                as_of=AS_OF,
                decisions=(Decision("NO-SUCH", "approve", "A. Reviewer (sample)", ""),),
            )

    def test_two_runs_write_the_same_files(self) -> None:
        with TemporaryDirectory() as first, TemporaryDirectory() as second:
            run_close(DATA, Path(first), as_of=AS_OF)
            run_close(DATA, Path(second), as_of=AS_OF)
            for name in OUTPUT_FILES:
                self.assertEqual(
                    (Path(first) / name).read_text(encoding="utf-8"),
                    (Path(second) / name).read_text(encoding="utf-8"),
                    name,
                )

    def test_checked_in_sample_is_the_engine_output(self) -> None:
        examples = ROOT / "examples" / "sample-output"
        with TemporaryDirectory() as tmp:
            run_close(DATA, Path(tmp), as_of=AS_OF)
            for name in OUTPUT_FILES:
                expected = examples / name
                self.assertTrue(expected.is_file(), name)
                self.assertEqual(
                    expected.read_text(encoding="utf-8"),
                    (Path(tmp) / name).read_text(encoding="utf-8"),
                    name,
                )

    def test_sample_files_are_labelled_and_have_no_long_digit_runs(self) -> None:
        books = load_books(DATA)
        self.assertEqual(books.period.data_origin, "SYNTHETIC")
        for path in DATA.iterdir():
            if path.suffix in {".csv", ".json", ".md"}:
                self.assertIsNone(DIGIT_RUN.search(path.read_text(encoding="utf-8")), path.name)
        self.assertTrue(all(line.data_origin == "SYNTHETIC" for line in books.bank))
        self.assertTrue(all(line.data_origin == "SYNTHETIC" for line in books.gl))
        self.assertTrue(all(line.data_origin == "SYNTHETIC" for line in books.expenses))

    def test_loader_refuses_unlabelled_or_unsafe_fields(self) -> None:
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            _write_min(root)
            self.assertEqual(len(load_books(root).bank), 1)
            bank_path = root / "bank_statement.csv"
            original = bank_path.read_text(encoding="utf-8")
            bank_path.write_text(original.replace("SYNTHETIC", "REAL"), encoding="utf-8")
            with self.assertRaises(DataError):
                load_books(root)
            bank_path.write_text(original.replace("AR-4401", "12345678"), encoding="utf-8")
            with self.assertRaises(DataError):
                load_books(root)
            bank_path.write_text(original.replace("10.00", "10.001"), encoding="utf-8")
            with self.assertRaises(DataError):
                load_books(root)
            bank_path.write_text(original.replace("10.00", "0.00"), encoding="utf-8")
            with self.assertRaises(DataError):
                load_books(root)
            bank_path.write_text(original.replace("2026-03-03", "2026-04-01"), encoding="utf-8")
            with self.assertRaises(DataError):
                load_books(root)

    def test_cli_runs_the_sample_and_refuses_to_enable_a_model(self) -> None:
        with TemporaryDirectory() as tmp:
            stdout = StringIO()
            with redirect_stdout(stdout):
                code = main(["--data", str(DATA), "--output", tmp, "--as-of", AS_OF])
            self.assertEqual(code, 0)
            text = stdout.getvalue()
            self.assertIn("Unexplained difference: 0.00 USD", text)
            self.assertIn("LLM enabled: false", text)
            self.assertIn("Journal entries posted: 0", text)
            report = (Path(tmp) / "reconciliation_report.md").read_text(encoding="utf-8")
            self.assertTrue(report.startswith("# Reconciliation report\n"))
        stderr = StringIO()
        with redirect_stderr(stderr):
            refused = main(["--enable-llm"])
        self.assertEqual(refused, 2)
        self.assertIn("network", stderr.getvalue())

    def test_package_does_not_import_a_network_client(self) -> None:
        banned = ("urllib", "requests", "httpx", "socket", "http.client", "openai")
        for path in (ROOT / "close_recon").glob("*.py"):
            text = path.read_text(encoding="utf-8")
            for name in banned:
                self.assertNotIn(f"import {name}", text, path.name)
                self.assertNotIn(f"from {name}", text, path.name)


def _write_min(root: Path) -> None:
    (root / "period.json").write_text(
        json.dumps(
            {
                "data_origin": "SYNTHETIC",
                "entity_name": "Sample Harbor LLC (fictional)",
                "period": "2026-03",
                "period_start": "2026-03-01",
                "period_end": "2026-03-31",
                "currency": "USD",
                "bank_account_label": "Synthetic operating account (no account number)",
                "gl_cash_account": "1000-CASH-OPERATING",
                "bank_beginning_balance": "0.00",
                "gl_beginning_balance": "0.00",
                "prepared_for": "Portfolio demonstration",
            }
        ),
        encoding="utf-8",
    )
    _csv(
        root / "bank_statement.csv",
        ["line_id", "data_origin", "date", "description", "reference", "amount"],
        [["B-01", "SYNTHETIC", "2026-03-03", "Lockbox sample", "AR-4401", "10.00"]],
    )
    _csv(
        root / "gl_cash.csv",
        ["line_id", "data_origin", "date", "description", "reference", "amount", "source"],
        [["G-01", "SYNTHETIC", "2026-03-03", "Customer receipt sample", "AR-4401", "10.00", "AR"]],
    )
    _csv(
        root / "vendor_expenses.csv",
        [
            "expense_id",
            "data_origin",
            "date",
            "vendor_name",
            "description",
            "reference",
            "amount",
            "payment_reference",
        ],
        [["E-01", "SYNTHETIC", "2026-03-03", "Sample Vendor", "Office rent", "INV-1", "10.00", ""]],
    )


def _csv(path: Path, header: list[str], rows: list[list[str]]) -> None:
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.writer(handle, lineterminator="\n")
        writer.writerow(header)
        writer.writerows(rows)


if __name__ == "__main__":
    unittest.main()
