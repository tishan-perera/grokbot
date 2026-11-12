#!/usr/bin/env python3
# AI-prepared: this checker script was written with AI assistance.
# It independently recomputes identities and expected values from the
# workbook inputs. It is not Tishan's modeling work.
"""Independent checks for the synthetic FP&A workbook and test_cases.md.

Recomputes identities from the workbook values (and 2026 forecast results
from the Drivers tab) with Excel-style half-up rounding. Does not import
expected totals from generate_model.py.

Pass a workbook path as the first CLI argument to check a specific file
(for example the completed built workbook). With no argument, the default
is Fairhaven_Metrics_FP&A_Model_SYNTHETIC.xlsx in this folder (the empty
template name). This script never writes a workbook.
"""

from __future__ import annotations

import re
import sys
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path

from openpyxl import load_workbook

ROOT = Path(__file__).resolve().parent
WORKBOOK = ROOT / "Fairhaven_Metrics_FP&A_Model_SYNTHETIC.xlsx"
TEST_CASES = ROOT / "test_cases.md"


def workbook_path_from_args(argv: list[str]) -> Path:
    """Return the workbook to check. Logic of the checks is unchanged."""
    if len(argv) > 1 and argv[1] in ("-h", "--help"):
        print(
            "Usage: python3 verify_model.py [workbook.xlsx]\n"
            "Default workbook: Fairhaven_Metrics_FP&A_Model_SYNTHETIC.xlsx "
            "(empty template name in this folder).\n"
            'Pass "Fairhaven_Metrics_FP&A_Model_SYNTHETIC_built.xlsx" '
            "(quoted, because of the ampersand) to check the completed "
            "workbook. This script does not write files."
        )
        raise SystemExit(0)
    if len(argv) > 1:
        return Path(argv[1])
    return WORKBOOK

COGS_RATE = Decimal("0.20")
DEPTS = ["Engineering", "Sales", "Customer Success", "G&A"]
MONEY_KEYS = {
    "arpa", "revenue", "cogs", "gross_profit", "people_cost",
    "other_opex", "total_opex", "operating_income",
}


def money(value: Decimal | int | float | str) -> Decimal:
    return Decimal(value).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)


def cell_decimal(value) -> Decimal:
    return money(str(value))


def month_from_cells(
    beginning: int,
    new: int,
    churned: int,
    arpa: Decimal,
    headcount: dict[str, int],
    cost_per_head: dict[str, Decimal],
    other_opex: Decimal,
) -> dict:
    ending = beginning + new - churned
    average = (Decimal(beginning) + Decimal(ending)) / Decimal(2)
    revenue = money(average * arpa)
    cogs = money(revenue * COGS_RATE)
    gross_profit = money(revenue - cogs)
    people_cost = money(sum(Decimal(headcount[d]) * cost_per_head[d] for d in DEPTS))
    total_opex = money(people_cost + other_opex)
    operating_income = money(gross_profit - total_opex)
    return {
        "beginning": beginning,
        "new": new,
        "churned": churned,
        "ending": ending,
        "average": average,
        "arpa": money(arpa),
        "revenue": revenue,
        "cogs": cogs,
        "gross_profit": gross_profit,
        "headcount": headcount,
        "total_hc": sum(headcount.values()),
        "cost_per_head": {d: money(cost_per_head[d]) for d in DEPTS},
        "people_cost": people_cost,
        "other_opex": money(other_opex),
        "total_opex": total_opex,
        "operating_income": operating_income,
    }


ACTUALS_ROWS = {
    "beginning": 7,
    "new": 8,
    "churned": 9,
    "ending": 10,
    "average": 11,
    "arpa": 12,
    "revenue": 13,
    "cogs": 14,
    "gross_profit": 15,
    "hc_Engineering": 16,
    "hc_Sales": 17,
    "hc_Customer Success": 18,
    "hc_G&A": 19,
    "total_hc": 20,
    "cph_Engineering": 21,
    "cph_Sales": 22,
    "cph_Customer Success": 23,
    "cph_G&A": 24,
    "people_cost": 25,
    "other_opex": 26,
    "total_opex": 27,
    "operating_income": 28,
}

DRIVER_FORECAST_ROWS = {
    "new": 14,
    "churned": 15,
    "arpa": 16,
    "hc_Engineering": 17,
    "hc_Sales": 18,
    "hc_Customer Success": 19,
    "hc_G&A": 20,
    "cph_Engineering": 21,
    "cph_Sales": 22,
    "cph_Customer Success": 23,
    "cph_G&A": 24,
    "other_opex": 25,
}

# 2025 budget block on Inputs-Drivers starts at row 29.
BUDGET_ROWS = {
    "new": 29,
    "churned": 30,
    "arpa": 31,
    "hc_Engineering": 32,
    "hc_Sales": 33,
    "hc_Customer Success": 34,
    "hc_G&A": 35,
    "cph_Engineering": 36,
    "cph_Sales": 37,
    "cph_Customer Success": 38,
    "cph_G&A": 39,
    "other_opex": 40,
    "beginning": 41,
    "ending": 42,
    "average": 43,
    "revenue": 44,
    "cogs": 45,
    "gross_profit": 46,
    "people_cost": 47,
    "total_opex": 48,
    "operating_income": 49,
}


def read_month_block(ws, rows: dict, col: int) -> dict:
    def ival(key: str) -> int:
        return int(ws.cell(rows[key], col).value)

    def dval(key: str) -> Decimal:
        return cell_decimal(ws.cell(rows[key], col).value)

    headcount = {d: ival(f"hc_{d}") for d in DEPTS}
    cost_per_head = {d: dval(f"cph_{d}") for d in DEPTS}
    return {
        "beginning": ival("beginning") if "beginning" in rows else None,
        "new": ival("new"),
        "churned": ival("churned"),
        "ending": ival("ending") if "ending" in rows else None,
        "arpa": dval("arpa"),
        "headcount": headcount,
        "cost_per_head": cost_per_head,
        "other_opex": dval("other_opex"),
        "raw": {k: ws.cell(r, col).value for k, r in rows.items()},
    }


def check_series(label: str, stored: list[dict], opening: int) -> list[dict]:
    recomputed = []
    beginning = opening
    for i, month in enumerate(stored):
        rec = month_from_cells(
            beginning,
            month["new"],
            month["churned"],
            month["arpa"],
            month["headcount"],
            month["cost_per_head"],
            month["other_opex"],
        )
        if month["beginning"] is not None and month["beginning"] != beginning:
            raise AssertionError(f"{label} month {i+1} beginning {month['beginning']} != {beginning}")
        if month["ending"] is not None and month["ending"] != rec["ending"]:
            raise AssertionError(f"{label} month {i+1} ending {month['ending']} != {rec['ending']}")
        if "raw" in month:
            raw = month["raw"]
            for key in ("average", "revenue", "cogs", "gross_profit", "people_cost", "total_opex", "operating_income"):
                if key in raw and raw[key] is not None:
                    got = cell_decimal(raw[key]) if key != "average" else Decimal(str(raw[key]))
                    exp = rec[key]
                    if got != exp:
                        raise AssertionError(f"{label} month {i+1} {key}: workbook {got} != recomputed {exp}")
            if "total_hc" in raw and int(raw["total_hc"]) != rec["total_hc"]:
                raise AssertionError(f"{label} month {i+1} total HC mismatch")
        beginning = rec["ending"]
        recomputed.append(rec)
    return recomputed


def parse_test_cases() -> dict[int, str]:
    text = TEST_CASES.read_text(encoding="utf-8")
    found: dict[int, str] = {}
    for line in text.splitlines():
        m = re.match(r"\| (\d+) \| .* \| ([^|]+) \|\s*$", line)
        if m:
            found[int(m.group(1))] = m.group(2).strip()
    if set(found) != set(range(1, 13)):
        raise AssertionError(f"Expected tests 1–12 in test_cases.md, found {sorted(found)}")
    return found


def fmt_money(value: Decimal) -> str:
    return f"${value:,.2f}"


def fmt_int(value: int) -> str:
    return f"{int(value):,}"


def main() -> int:
    errors: list[str] = []
    workbook_path = workbook_path_from_args(sys.argv)
    if not workbook_path.is_file():
        print("VERIFICATION FAILED")
        print(f"- workbook not found: {workbook_path}")
        return 1
    wb = load_workbook(workbook_path, data_only=False)

    expected_sheets = ["Inputs-Drivers", "Actuals", "Forecast", "Budget-vs-Actual", "Summary"]
    if wb.sheetnames != expected_sheets:
        errors.append(f"Unexpected sheets: {wb.sheetnames}")

    formula_cells = []
    for ws in wb.worksheets:
        banner = str(ws["A1"].value or "")
        if not banner.startswith("SYNTHETIC DATA"):
            errors.append(f"{ws.title} A1 is missing the SYNTHETIC DATA banner")
        for row in ws.iter_rows():
            for cell in row:
                if isinstance(cell.value, str) and cell.value.startswith("="):
                    formula_cells.append(f"{ws.title}!{cell.coordinate}")
    # Template-shape checks apply only to the empty template (no formulas).
    # A completed built workbook is expected to have formulas on Forecast,
    # Budget-vs-Actual, and Summary. Identity and test_cases.md checks always run.
    is_completed = bool(formula_cells)
    # Template workbooks must have no formulas and empty yellow cells.
    # Completed workbooks are expected to have formulas on Forecast,
    # Budget-vs-Actual, and Summary, so those emptiness checks are skipped.
    # The original "none should be pre-built" error applies only to the template.

    def assert_empty(ws, rows, cols, label):
        filled = []
        for r in rows:
            for c in cols:
                value = ws.cell(r, c).value
                if value not in (None, ""):
                    filled.append(f"{ws.title}!{ws.cell(r, c).coordinate}={value}")
        if filled:
            errors.append(f"{label} should be empty: " + ", ".join(filled[:8]))

    if not is_completed:
        assert_empty(wb["Forecast"], range(7, 29), range(2, 15), "Forecast values")
        assert_empty(wb["Budget-vs-Actual"], range(8, 18), range(2, 6), "BvA annual values")
        assert_empty(wb["Budget-vs-Actual"], range(21, 33), range(2, 10), "BvA monthly values")
        assert_empty(wb["Summary"], range(7, 21), range(2, 9), "Summary values")
    # Actuals FY total column N should be empty on both the template and the built file.
    assert_empty(wb["Actuals"], range(7, 29), [14], "Actuals FY Total column")

    actuals_ws = wb["Actuals"]
    stored_actuals = [read_month_block(actuals_ws, ACTUALS_ROWS, col) for col in range(2, 14)]
    rec_actuals = check_series("Actuals", stored_actuals, opening=90)

    drivers = wb["Inputs-Drivers"]
    if int(drivers["B8"].value) != 90:
        errors.append(f"Drivers opening 2025 is {drivers['B8'].value}, expected 90")
    if int(drivers["B9"].value) != rec_actuals[-1]["ending"]:
        errors.append(
            f"Drivers 2026 opening {drivers['B9'].value} != Dec 2025 ending {rec_actuals[-1]['ending']}"
        )
    if cell_decimal(drivers["B10"].value) != money(COGS_RATE):
        errors.append(f"COGS rate on Drivers is {drivers['B10'].value}")

    stored_budget = []
    for col in range(2, 14):
        block = read_month_block(drivers, BUDGET_ROWS, col)
        stored_budget.append(block)
    rec_budget = check_series("Budget", stored_budget, opening=90)

    stored_forecast_drivers = []
    for col in range(2, 14):
        block = read_month_block(drivers, DRIVER_FORECAST_ROWS, col)
        stored_forecast_drivers.append(block)
    rec_forecast = check_series(
        "Forecast-drivers",
        stored_forecast_drivers,
        opening=rec_actuals[-1]["ending"],
    )

    expected = {
        1: fmt_int(rec_actuals[0]["ending"]),
        2: fmt_money(rec_actuals[0]["revenue"]),
        3: fmt_int(rec_actuals[-1]["ending"]),
        4: fmt_money(money(sum(r["revenue"] for r in rec_actuals))),
        5: fmt_money(money(sum(r["total_opex"] for r in rec_actuals))),
        6: fmt_money(rec_actuals[0]["people_cost"]),
        7: fmt_money(money(sum(r["revenue"] for r in rec_actuals) - sum(r["revenue"] for r in rec_budget))),
        8: fmt_money(money(rec_actuals[11]["revenue"] - rec_budget[11]["revenue"])),
        9: fmt_int(rec_forecast[0]["ending"]),
        10: fmt_money(rec_forecast[0]["revenue"]),
        11: fmt_int(rec_forecast[-1]["ending"]),
        12: fmt_money(money(sum(r["total_opex"] for r in rec_forecast))),
    }

    # Cross-check a few hand calculations.
    if rec_actuals[0]["revenue"] != money("184000.00"):
        errors.append("Hand check failed: Jan 2025 revenue")
    if rec_forecast[0]["revenue"] != money("335500.00"):
        errors.append("Hand check failed: Jan 2026 revenue")
    if rec_actuals[0]["people_cost"] != money("95500.00"):
        errors.append("Hand check failed: Jan 2025 people cost")
    if rec_forecast[0]["people_cost"] != money("134930.00"):
        errors.append("Hand check failed: Jan 2026 people cost")

    documented = parse_test_cases()
    for i in range(1, 13):
        if documented[i] != expected[i]:
            errors.append(f"test_cases.md #{i} is {documented[i]!r}, recomputed {expected[i]!r}")

    if errors:
        print("VERIFICATION FAILED")
        for e in errors:
            print("-", e)
        return 1

    print("VERIFICATION PASSED")
    if is_completed:
        print(f"Checked completed workbook: {workbook_path}")
        print("Workbook opens, every tab has a SYNTHETIC DATA banner, and formulas are present.")
    else:
        print(f"Checked template workbook: {workbook_path}")
        print("Workbook opens, every tab has a SYNTHETIC DATA banner, and no formulas are pre-built.")
    print("Actuals, the 2025 budget, and the 2026 driver rollforward all reconcile.")
    print("test_cases.md expected values match the independent recomputation.")
    for i in range(1, 13):
        print(f"  {i:2d}. {expected[i]}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
