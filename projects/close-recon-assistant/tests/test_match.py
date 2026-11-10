"""Matching rules, including the cases the sample month is built to show."""

from __future__ import annotations

import sys
import unittest
from decimal import Decimal
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from close_recon.match import match_lines
from support import bank, gl, primary_ids


class MatchTests(unittest.TestCase):
    def test_exact_pair_clears_and_does_not_cross_a_second_pair(self) -> None:
        result = match_lines(
            [bank("B-01", 3, "10.00", "AR-4401"), bank("B-02", 4, "-5.00", "CHK-1002")],
            [gl("G-01", 3, "10.00", "AR-4401"), gl("G-02", 4, "-5.00", "CHK-1002")],
        )
        self.assertEqual([link.status for link in result.links], ["matched", "matched"])
        self.assertEqual(result.links[0].rule, "exact")
        self.assertEqual(result.links[0].gl_ids, ("G-01",))
        self.assertEqual(result.links[1].bank_ids, ("B-02",))
        self.assertFalse(result.ambiguities)

    def test_reference_punctuation_still_matches(self) -> None:
        result = match_lines(
            [bank("B-01", 3, "-10.00", "chk 1001")],
            [gl("G-01", 3, "-10.00", "CHK-1001")],
        )
        self.assertEqual(result.links[0].status, "matched")
        self.assertIn("punctuation", result.links[0].reason)

    def test_date_window_clears_inside_five_days_and_stops_at_six(self) -> None:
        inside = match_lines(
            [bank("B-01", 6, "-10.00", "CHK-1005")],
            [gl("G-01", 1, "-10.00", "CHK-1005")],
        )
        outside = match_lines(
            [bank("B-01", 7, "-10.00", "CHK-1005")],
            [gl("G-01", 1, "-10.00", "CHK-1005")],
        )
        self.assertEqual(inside.links[0].rule, "amount_ref_date_window")
        self.assertEqual(inside.links[0].status, "matched")
        self.assertEqual(outside.links, ())

    def test_opposite_signs_do_not_match(self) -> None:
        result = match_lines(
            [bank("B-01", 3, "-100.00", "CHK-1001")],
            [gl("G-01", 3, "100.00", "CHK-1001")],
        )
        self.assertEqual(result.links, ())

    def test_missing_reference_is_suggested_not_cleared(self) -> None:
        result = match_lines(
            [bank("B-01", 12, "-512.00", "ACH-9F2")],
            [gl("G-01", 11, "-512.00", "")],
        )
        self.assertEqual(len(result.links), 1)
        self.assertEqual(result.links[0].status, "suggested")
        self.assertEqual(result.links[0].rule, "amount_date_missing_ref")
        self.assertEqual(result.links[0].confidence, Decimal("0.70"))

    def test_different_references_do_not_match_on_amount_alone(self) -> None:
        result = match_lines(
            [bank("B-01", 4, "-89.00", "ACH-1")],
            [gl("G-01", 4, "-89.00", "ACH-2")],
        )
        self.assertEqual(result.links, ())

    def test_amount_typo_is_suggested_and_a_wide_gap_is_not(self) -> None:
        typo = match_lines(
            [bank("B-01", 16, "-1255.00", "CHK-1006")],
            [gl("G-01", 15, "-1250.00", "CHK-1006")],
        )
        wide = match_lines(
            [bank("B-01", 4, "30.00", "AR-1")],
            [gl("G-01", 4, "20.00", "AR-1")],
        )
        self.assertEqual(typo.links[0].status, "suggested")
        self.assertEqual(typo.links[0].rule, "amount_tolerance_exact_ref")
        self.assertEqual(typo.links[0].amount_delta, Decimal("-5.00"))
        self.assertEqual(wide.links, ())

    def test_duplicate_keeps_one_match_and_flags_the_extra(self) -> None:
        result = match_lines(
            [
                bank("B-01", 8, "-420.00", "ACH-INS-9"),
                bank("B-02", 8, "-420.00", "ACH-INS-9"),
            ],
            [gl("G-01", 8, "-420.00", "ACH-INS-9")],
        )
        self.assertEqual(len(result.links), 1)
        self.assertEqual(result.links[0].bank_ids, ("B-01",))
        self.assertEqual(result.duplicates[0].line_id, "B-02")
        self.assertEqual(result.duplicates[0].keeper_id, "B-01")

    def test_repeat_outside_two_days_is_not_a_duplicate(self) -> None:
        result = match_lines(
            [
                bank("B-01", 1, "-420.00", "ACH-INS-9"),
                bank("B-02", 12, "-420.00", "ACH-INS-9"),
            ],
            [gl("G-01", 1, "-420.00", "ACH-INS-9")],
        )
        self.assertEqual(result.duplicates, ())
        self.assertEqual(result.links[0].bank_ids, ("B-01",))
        self.assertNotIn("B-02", result.links[0].bank_ids)

    def test_ambiguous_candidates_clear_nothing(self) -> None:
        result = match_lines(
            [
                bank("B-01", 3, "100.00", "", "North receipt"),
                bank("B-02", 3, "100.00", "", "South receipt"),
            ],
            [gl("G-01", 3, "100.00", "", "Customer receipt")],
        )
        self.assertEqual(result.links, ())
        self.assertEqual(result.ambiguities[0].bank_ids, ("B-01", "B-02"))
        self.assertEqual(result.ambiguities[0].gl_ids, ("G-01",))

    def test_unique_group_of_three_is_only_a_suggestion(self) -> None:
        result = match_lines(
            [bank("B-01", 14, "100.00", "DEP-1")],
            [
                gl("G-01", 14, "20.00", "AR-1"),
                gl("G-02", 14, "30.00", "AR-2"),
                gl("G-03", 14, "50.00", "AR-3"),
            ],
        )
        self.assertEqual(len(result.links), 1)
        self.assertEqual(result.links[0].status, "suggested")
        self.assertEqual(result.links[0].rule, "group_sum")
        self.assertEqual(result.links[0].gl_ids, ("G-01", "G-02", "G-03"))

    def test_two_group_combinations_are_not_cleared(self) -> None:
        result = match_lines(
            [bank("B-01", 14, "100.00", "DEP-1")],
            [
                gl("G-01", 14, "60.00", "AR-1"),
                gl("G-02", 14, "40.00", "AR-2"),
                gl("G-03", 14, "60.00", "AR-3"),
                gl("G-04", 14, "40.00", "AR-4"),
            ],
        )
        self.assertEqual(result.links, ())
        self.assertTrue(result.ambiguities)

    def test_overlapping_groups_follow_bank_line_id_order(self) -> None:
        result = match_lines(
            [bank("B-01", 14, "100.00", "DEP-1"), bank("B-02", 14, "50.00", "DEP-2")],
            [
                gl("G-01", 14, "70.00", "AR-1"),
                gl("G-02", 14, "30.00", "AR-2"),
                gl("G-03", 14, "20.00", "AR-3"),
            ],
        )
        self.assertEqual(len(result.links), 1)
        self.assertEqual(result.links[0].bank_ids, ("B-01",))
        self.assertEqual(result.links[0].gl_ids, ("G-01", "G-02"))

    def test_primary_buckets_do_not_drop_or_double_count_lines(self) -> None:
        bank_lines = [
            bank("B-01", 3, "10.00", "AR-1"),
            bank("B-02", 3, "10.00", "AR-1"),
            bank("B-03", 8, "-25.00", "BANK-FEE", "Monthly service fee"),
        ]
        gl_lines = [gl("G-01", 3, "10.00", "AR-1"), gl("G-02", 20, "-40.00", "CHK-9")]
        result = match_lines(bank_lines, gl_lines)
        from close_recon.money import ZERO
        from close_recon.reconcile import reconcile_lines

        recon = reconcile_lines(bank_lines, gl_lines, result, ZERO, ZERO)
        bank_found = primary_ids(bank_lines, result.links, result.duplicates, recon.items, "bank")
        gl_found = primary_ids(gl_lines, result.links, result.duplicates, recon.items, "book")
        self.assertCountEqual(bank_found, [line.line_id for line in bank_lines])
        self.assertCountEqual(gl_found, [line.line_id for line in gl_lines])
        self.assertEqual(len(bank_found), len(set(bank_found)))


if __name__ == "__main__":
    unittest.main()
