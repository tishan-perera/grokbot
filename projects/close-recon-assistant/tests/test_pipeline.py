"""Expense rules, the review threshold, and the disabled model step."""

from __future__ import annotations

import os
import sys
import unittest
from decimal import Decimal
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from close_recon.categorize import LlmCategorySuggester, categorize_expenses
from close_recon.models import CategorySuggestion, LlmNotConfigured, Settings
from support import expense


class Boom:
    def suggest(self, item):
        raise AssertionError(f"model step was called for {item.expense_id}")


class Spy:
    def __init__(self, reply: str) -> None:
        self.reply = reply
        self.calls: list[str] = []

    def suggest(self, item):
        self.calls.append(item.expense_id)
        category, confidence, reason = self.reply.split("|")
        return CategorySuggestion(
            expense_id=item.expense_id,
            category=category,
            confidence=Decimal(confidence),
            reason=reason,
            source="llm",
            needs_review=False,
            posted=True,
            status="suggested",
        )


class CategorizeTests(unittest.TestCase):
    def test_rules_confidence_and_no_posting(self) -> None:
        suggestions = {
            item.expense_id: item
            for item in categorize_expenses(
                [
                    expense("E-01", "Harbor Rent Sample", "March office rent", "2200.00"),
                    expense("E-08", "Sample Advisory Group", "Operations consulting", "512.00"),
                    expense("E-09", "ACME MISC", "Team lunch and office pens", "86.40", reference="", payment_reference=""),
                    expense("E-10", "XQ-44", "Misc", "19.99", reference="", payment_reference=""),
                ]
            )
        }
        self.assertEqual(suggestions["E-01"].category, "Rent and occupancy")
        self.assertEqual(suggestions["E-01"].confidence, Decimal("0.95"))
        self.assertFalse(suggestions["E-01"].needs_review)
        self.assertFalse(suggestions["E-01"].posted)
        self.assertTrue(suggestions["E-08"].needs_review)
        self.assertEqual(suggestions["E-08"].confidence, Decimal("0.72"))
        self.assertEqual(suggestions["E-09"].confidence, Decimal("0.45"))
        self.assertIn("Meals", suggestions["E-09"].reason)
        self.assertIn("Office supplies", suggestions["E-09"].reason)
        self.assertEqual(suggestions["E-10"].category, "Uncategorized")
        self.assertTrue(all(item.posted is False for item in suggestions.values()))

    def test_duplicate_expense_stays_in_review_even_when_the_rule_is_confident(self) -> None:
        suggestions = categorize_expenses(
            [
                expense("E-07", "Sample Insurance Mutual", "Liability policy installment", "420.00", reference="INV-INS-9"),
                expense("E-11", "Sample Insurance Mutual", "Liability policy installment", "420.00", reference="INV-INS-9"),
            ]
        )
        by_id = {item.expense_id: item for item in suggestions}
        self.assertFalse(by_id["E-07"].needs_review)
        self.assertTrue(by_id["E-11"].needs_review)
        self.assertIn("E-07", by_id["E-11"].reason)
        self.assertFalse(by_id["E-11"].posted)

    def test_llm_is_off_by_default_and_an_environment_flag_cannot_turn_it_on(self) -> None:
        self.assertFalse(Settings().enable_llm)
        os.environ["CLOSE_RECON_ENABLE_LLM"] = "1"
        try:
            self.assertFalse(Settings().enable_llm)
            categorize_expenses(
                [expense("E-10", "XQ-44", "Misc", "19.99", reference="", payment_reference="")],
                Settings(),
                Boom(),
            )
        finally:
            os.environ.pop("CLOSE_RECON_ENABLE_LLM", None)

    def test_enabled_llm_requires_an_injected_suggester_and_does_not_construct_a_client(self) -> None:
        with self.assertRaises(LlmNotConfigured):
            categorize_expenses([expense("E-01", "Harbor Rent Sample", "March office rent")], Settings(enable_llm=True))
        with self.assertRaises(LlmNotConfigured):
            LlmCategorySuggester()

    def test_injected_model_runs_only_for_low_confidence_and_still_does_not_post(self) -> None:
        spy = Spy("Software|0.99|Fictional model note")
        suggestions = categorize_expenses(
            [
                expense("E-01", "Harbor Rent Sample", "March office rent", "2200.00"),
                expense("E-10", "XQ-44", "Misc", "19.99", reference="", payment_reference=""),
            ],
            Settings(enable_llm=True),
            spy,
        )
        by_id = {item.expense_id: item for item in suggestions}
        self.assertEqual(spy.calls, ["E-10"])
        self.assertEqual(by_id["E-01"].source, "rules")
        self.assertEqual(by_id["E-10"].source, "llm")
        self.assertEqual(by_id["E-10"].category, "Software")
        self.assertFalse(by_id["E-10"].needs_review)
        self.assertFalse(by_id["E-10"].posted)

    def test_bad_model_reply_keeps_the_rule_and_stays_in_review(self) -> None:
        suggester = LlmCategorySuggester(lambda _prompt: "trust me")
        suggestions = categorize_expenses(
            [expense("E-10", "XQ-44", "Misc", "19.99", reference="", payment_reference="")],
            Settings(enable_llm=True),
            suggester,
        )
        self.assertEqual(suggestions[0].source, "rules")
        self.assertEqual(suggestions[0].category, "Uncategorized")
        self.assertTrue(suggestions[0].needs_review)
        self.assertIn("ignored", suggestions[0].reason)
        self.assertFalse(suggestions[0].posted)

    def test_parsed_model_reply_can_replace_a_weak_rule_without_posting(self) -> None:
        suggester = LlmCategorySuggester(lambda _prompt: "Software|0.40|Short fictional reason")
        suggestions = categorize_expenses(
            [expense("E-10", "XQ-44", "Misc", "19.99", reference="", payment_reference="")],
            Settings(enable_llm=True),
            suggester,
        )
        self.assertEqual(suggestions[0].source, "llm")
        self.assertEqual(suggestions[0].category, "Software")
        self.assertEqual(suggestions[0].confidence, Decimal("0.40"))
        self.assertTrue(suggestions[0].needs_review)
        self.assertFalse(suggestions[0].posted)


if __name__ == "__main__":
    unittest.main()
