#!/usr/bin/env python3
# AI-prepared: this generator script was written with AI assistance.
# It creates the fictional company, the synthetic dataset, the empty
# workbook template, and test_cases.md. It does not write model formulas.
"""Generate synthetic actuals, 2025 budget, 2026 drivers, the workbook, and test_cases.md.

All figures are fictional and labelled SYNTHETIC. This script is the source of
truth for the numbers. Re-run it to regenerate the .xlsx and test_cases.md.
It does not write Excel formulas; Tishan builds those himself.
"""

from __future__ import annotations

from decimal import Decimal, ROUND_HALF_UP, localcontext
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.worksheet import Worksheet

ROOT = Path(__file__).resolve().parent
WORKBOOK_PATH = ROOT / "Fairhaven_Metrics_FP&A_Model_SYNTHETIC.xlsx"
TEST_CASES_PATH = ROOT / "test_cases.md"

COMPANY = "Fairhaven Metrics LLC"
CENTS = Decimal("0.01")
PCT = Decimal("0.0001")
COGS_RATE = Decimal("0.20")
MONTHS_2025 = [
    "Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025", "Jun 2025",
    "Jul 2025", "Aug 2025", "Sep 2025", "Oct 2025", "Nov 2025", "Dec 2025",
]
MONTHS_2026 = [
    "Jan 2026", "Feb 2026", "Mar 2026", "Apr 2026", "May 2026", "Jun 2026",
    "Jul 2026", "Aug 2026", "Sep 2026", "Oct 2026", "Nov 2026", "Dec 2026",
]
DEPTS = ["Engineering", "Sales", "Customer Success", "G&A"]

BANNER = (
    "SYNTHETIC DATA — Fictional company (Fairhaven Metrics LLC). "
    "Not real financials. Not a client close or production forecast. "
    "Do not use in production."
)

CONVENTION = (
    "Customer rollforward: Ending customers = Beginning customers + New customers − Churned customers. "
    "Beginning customers in month 1 of a year equal ending customers of the prior month "
    "(January 2025 beginning is the 1 January 2025 opening balance; January 2026 beginning "
    "must equal December 2025 ending customers). "
    "Average customers = (Beginning + Ending) / 2. "
    "Revenue = Average customers × monthly ARPA (average revenue per account per month, USD). "
    "This model uses average customers, not ending customers, for revenue. "
    "COGS = Revenue × 20%. "
    "People cost = Engineering HC × Eng cost/head + Sales HC × Sales cost/head + "
    "CS HC × CS cost/head + G&A HC × G&A cost/head. "
    "Total opex = People cost + Other opex. "
    "Gross profit = Revenue − COGS. "
    "Operating income = Gross profit − Total opex. "
    "ARR (if you build it) = Ending customers × monthly ARPA × 12. "
    "Budget-vs-Actual variance $ = Actual − Budget (positive means favorable for revenue and "
    "operating income, and unfavorable for costs — label the direction in your commentary). "
    "Variance % = Variance $ / Budget, when Budget is not zero."
)


def money(value: Decimal | int | float | str) -> Decimal:
    return Decimal(value).quantize(CENTS, rounding=ROUND_HALF_UP)


def ratio(value: Decimal | int | float | str) -> Decimal:
    return Decimal(value).quantize(PCT, rounding=ROUND_HALF_UP)


def avg_customers(beginning: int, ending: int) -> Decimal:
    return (Decimal(beginning) + Decimal(ending)) / Decimal(2)


def month_financials(
    beginning: int,
    new: int,
    churned: int,
    arpa: Decimal,
    headcount: dict[str, int],
    cost_per_head: dict[str, Decimal],
    other_opex: Decimal,
) -> dict:
    ending = beginning + new - churned
    if ending < 0:
        raise ValueError("ending customers would be negative")
    average = avg_customers(beginning, ending)
    revenue = money(average * arpa)
    cogs = money(revenue * COGS_RATE)
    gross_profit = money(revenue - cogs)
    people_cost = money(
        sum(Decimal(headcount[d]) * cost_per_head[d] for d in DEPTS)
    )
    total_opex = money(people_cost + other_opex)
    operating_income = money(gross_profit - total_opex)
    return {
        "beginning": beginning,
        "new": new,
        "churned": churned,
        "ending": ending,
        "arpa": money(arpa),
        "average": average,
        "revenue": revenue,
        "cogs": cogs,
        "gross_profit": gross_profit,
        "headcount": dict(headcount),
        "total_hc": sum(headcount[d] for d in DEPTS),
        "cost_per_head": {d: money(cost_per_head[d]) for d in DEPTS},
        "people_cost": people_cost,
        "other_opex": money(other_opex),
        "total_opex": total_opex,
        "operating_income": operating_income,
    }


def roll_year(
    opening: int,
    new_list: list[int],
    churned_list: list[int],
    arpa_list: list[Decimal],
    hc_list: list[dict[str, int]],
    cost_list: list[dict[str, Decimal]],
    other_list: list[Decimal],
) -> list[dict]:
    rows = []
    beginning = opening
    for i in range(12):
        row = month_financials(
            beginning,
            new_list[i],
            churned_list[i],
            arpa_list[i],
            hc_list[i],
            cost_list[i],
            other_list[i],
        )
        assert row["ending"] == beginning + new_list[i] - churned_list[i]
        assert row["beginning"] == beginning
        rows.append(row)
        beginning = row["ending"]
    return rows


def annual_sum(rows: list[dict], key: str) -> Decimal:
    if key in {"revenue", "cogs", "gross_profit", "people_cost", "other_opex", "total_opex", "operating_income", "new", "churned"}:
        total = sum((Decimal(row[key]) for row in rows), Decimal("0"))
        if key in {"new", "churned"}:
            return total
        return money(total)
    raise KeyError(key)


COST_2025 = {
    "Engineering": money(10000),
    "Sales": money(8500),
    "Customer Success": money(7000),
    "G&A": money(8000),
}
COST_2026 = {
    "Engineering": money(10300),
    "Sales": money(8755),
    "Customer Success": money(7210),
    "G&A": money(8240),
}


def hc(eng: int, sales: int, cs: int, ga: int) -> dict[str, int]:
    return {"Engineering": eng, "Sales": sales, "Customer Success": cs, "G&A": ga}


def build_dataset() -> dict:
    opening_2025 = 90

    actual_new = [6, 7, 6, 8, 7, 8, 7, 8, 7, 9, 8, 8]
    actual_churned = [2, 2, 2, 2, 3, 2, 3, 2, 3, 3, 2, 3]
    actual_arpa = [Decimal(v) for v in (2000, 2000, 2000, 2050, 2050, 2050, 2100, 2100, 2100, 2150, 2150, 2200)]
    actual_hc = (
        [hc(4, 3, 2, 2)] * 3
        + [hc(5, 3, 2, 2)] * 3
        + [hc(5, 4, 3, 2)] * 3
        + [hc(6, 4, 3, 2)] * 3
    )
    actual_other = [money(v) for v in (5500, 5500, 5500, 5500, 5500, 5500, 6500, 6500, 6500, 6500, 6500, 6500)]
    actuals = roll_year(
        opening_2025, actual_new, actual_churned, actual_arpa,
        actual_hc, [COST_2025] * 12, actual_other,
    )

    budget_new = [5, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7]
    budget_churned = [2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2]
    budget_arpa = [Decimal(2000)] * 12
    budget_hc = [hc(4, 3, 2, 2)] * 6 + [hc(5, 3, 3, 2)] * 6
    budget_other = [money(5000)] * 12
    budget = roll_year(
        opening_2025, budget_new, budget_churned, budget_arpa,
        budget_hc, [COST_2025] * 12, budget_other,
    )

    # 2026 forecast drivers (values Tishan will use in Forecast formulas).
    forecast_new = [8, 8, 9, 9, 9, 10, 9, 9, 10, 10, 9, 8]
    forecast_churned = [3, 3, 3, 3, 4, 3, 4, 3, 4, 4, 3, 4]
    forecast_arpa = [Decimal(v) for v in (2200, 2200, 2200, 2250, 2250, 2250, 2250, 2300, 2300, 2300, 2300, 2300)]
    forecast_hc = (
        [hc(6, 4, 3, 2)] * 3
        + [hc(6, 5, 3, 2)] * 3
        + [hc(7, 5, 4, 2)] * 3
        + [hc(7, 5, 4, 3)] * 3
    )
    forecast_other = [money(v) for v in (7000, 7000, 7000, 7500, 7500, 7500, 8000, 8000, 8000, 8000, 7500, 7000)]
    opening_2026 = actuals[-1]["ending"]
    forecast = roll_year(
        opening_2026, forecast_new, forecast_churned, forecast_arpa,
        forecast_hc, [COST_2026] * 12, forecast_other,
    )

    assert opening_2026 == 150
    assert actuals[0]["revenue"] == money("184000.00")
    assert forecast[0]["beginning"] == 150
    assert forecast[0]["ending"] == 155
    assert forecast[0]["average"] == Decimal("152.5")
    assert forecast[0]["revenue"] == money("335500.00")

    # Independent identity checks on every month of all three series.
    for label, rows, opening in (
        ("actuals", actuals, opening_2025),
        ("budget", budget, opening_2025),
        ("forecast", forecast, opening_2026),
    ):
        assert rows[0]["beginning"] == opening, label
        for i, row in enumerate(rows):
            if i:
                assert row["beginning"] == rows[i - 1]["ending"], (label, i)
            assert row["ending"] == row["beginning"] + row["new"] - row["churned"]
            expected_rev = money(row["average"] * row["arpa"])
            assert row["revenue"] == expected_rev, (label, i, row["revenue"], expected_rev)
            assert row["cogs"] == money(row["revenue"] * COGS_RATE)
            assert row["gross_profit"] == money(row["revenue"] - row["cogs"])
            assert row["total_opex"] == money(row["people_cost"] + row["other_opex"])
            assert row["operating_income"] == money(row["gross_profit"] - row["total_opex"])

    data = {
        "opening_2025": opening_2025,
        "opening_2026": opening_2026,
        "actuals": actuals,
        "budget": budget,
        "forecast": forecast,
        "cost_2025": COST_2025,
        "cost_2026": COST_2026,
    }
    data["tests"] = compute_tests(data)
    return data


def compute_tests(data: dict) -> list[dict]:
    actuals = data["actuals"]
    budget = data["budget"]
    forecast = data["forecast"]

    fy_rev_actual = annual_sum(actuals, "revenue")
    fy_rev_budget = annual_sum(budget, "revenue")
    fy_opex_actual = annual_sum(actuals, "total_opex")
    fy_opex_budget = annual_sum(budget, "total_opex")
    fy_rev_var = money(fy_rev_actual - fy_rev_budget)
    dec_rev_var = money(actuals[11]["revenue"] - budget[11]["revenue"])
    fy_fcst_rev = annual_sum(forecast, "revenue")
    fy_fcst_opex = annual_sum(forecast, "total_opex")

    tests = [
        {
            "id": 1,
            "name": "January 2025 ending customers",
            "how": "Beginning 90 + new 6 − churned 2.",
            "expected": 94,
            "unit": "customers",
            "format": "int",
        },
        {
            "id": 2,
            "name": "January 2025 revenue",
            "how": "Average customers = (90 + 94) / 2 = 92. Revenue = 92 × $2,000 ARPA.",
            "expected": actuals[0]["revenue"],
            "unit": "USD",
            "format": "money",
        },
        {
            "id": 3,
            "name": "December 2025 ending customers",
            "how": "Roll the 2025 actuals customer chain through December. Also the opening balance for January 2026.",
            "expected": 150,
            "unit": "customers",
            "format": "int",
        },
        {
            "id": 4,
            "name": "FY 2025 actual revenue",
            "how": "Sum of monthly actual revenue for Jan–Dec 2025.",
            "expected": fy_rev_actual,
            "unit": "USD",
            "format": "money",
        },
        {
            "id": 5,
            "name": "FY 2025 actual total opex",
            "how": "Sum of monthly actual total opex (people cost + other opex) for Jan–Dec 2025.",
            "expected": fy_opex_actual,
            "unit": "USD",
            "format": "money",
        },
        {
            "id": 6,
            "name": "January 2025 people cost",
            "how": "(4 × $10,000) + (3 × $8,500) + (2 × $7,000) + (2 × $8,000).",
            "expected": money("95500.00"),
            "unit": "USD",
            "format": "money",
        },
        {
            "id": 7,
            "name": "FY 2025 revenue variance (Actual − Budget)",
            "how": "FY 2025 actual revenue minus FY 2025 budget revenue.",
            "expected": fy_rev_var,
            "unit": "USD",
            "format": "money",
        },
        {
            "id": 8,
            "name": "December 2025 revenue variance (Actual − Budget)",
            "how": "December 2025 actual revenue minus December 2025 budget revenue.",
            "expected": dec_rev_var,
            "unit": "USD",
            "format": "money",
        },
        {
            "id": 9,
            "name": "January 2026 forecast ending customers",
            "how": "Beginning 150 (Dec 2025 ending) + new 8 − churned 3.",
            "expected": 155,
            "unit": "customers",
            "format": "int",
        },
        {
            "id": 10,
            "name": "January 2026 forecast revenue (forecast month 1)",
            "how": "Average customers = (150 + 155) / 2 = 152.5. Revenue = 152.5 × $2,200 ARPA.",
            "expected": forecast[0]["revenue"],
            "unit": "USD",
            "format": "money",
        },
        {
            "id": 11,
            "name": "December 2026 forecast ending customers (forecast month 12)",
            "how": "Roll the 2026 driver customer chain through December.",
            "expected": forecast[-1]["ending"],
            "unit": "customers",
            "format": "int",
        },
        {
            "id": 12,
            "name": "FY 2026 forecast total opex",
            "how": "Sum of monthly forecast total opex (people cost + other opex) for Jan–Dec 2026. Use 2026 cost-per-head rates.",
            "expected": fy_fcst_opex,
            "unit": "USD",
            "format": "money",
        },
    ]

    # FY 2026 revenue is a useful 13th? Keep 12. Store extra for README if needed.
    extras = {
        "fy_2025_budget_revenue": fy_rev_budget,
        "fy_2025_budget_opex": fy_opex_budget,
        "fy_2026_forecast_revenue": fy_fcst_rev,
        "fy_2026_forecast_opex": fy_fcst_opex,
        "fy_2025_revenue_variance": fy_rev_var,
        "dec_2025_revenue_variance": dec_rev_var,
    }
    return tests, extras


# compute_tests originally returned only tests; fix build_dataset after I change return type.
# I'll adjust build_dataset below when wiring write functions.

THIN = Border(
    left=Side(style="thin", color="B0B7C3"),
    right=Side(style="thin", color="B0B7C3"),
    top=Side(style="thin", color="B0B7C3"),
    bottom=Side(style="thin", color="B0B7C3"),
)
BANNER_FILL = PatternFill("solid", fgColor="7A1F1F")
BANNER_FONT = Font(name="Calibri", bold=True, color="FFFFFF", size=12)
TITLE_FONT = Font(name="Calibri", bold=True, size=16, color="1B2A4A")
SECTION_FONT = Font(name="Calibri", bold=True, size=12, color="1B2A4A")
HEADER_FILL = PatternFill("solid", fgColor="1B2A4A")
HEADER_FONT = Font(name="Calibri", bold=True, color="FFFFFF", size=10)
INPUT_FONT = Font(name="Calibri", color="0000FF", size=10)  # blue = typed values
LABEL_FONT = Font(name="Calibri", size=10, color="1B2A4A")
NOTE_FONT = Font(name="Calibri", italic=True, size=9, color="4A5568")
BANNER_NOTE_FONT = Font(name="Calibri", italic=True, size=9, color="7A1F1F")
EMPTY_FILL = PatternFill("solid", fgColor="FFF6D8")
SECTION_FILL = PatternFill("solid", fgColor="E8EEF6")
ACTUAL_FILL = PatternFill("solid", fgColor="F4F7FB")
WRAP = Alignment(wrap_text=True, vertical="center")
LEFT = Alignment(horizontal="left", vertical="center", wrap_text=True)
CENTER = Alignment(horizontal="center", vertical="center", wrap_text=True)
RIGHT = Alignment(horizontal="right", vertical="center")


def apply_banner(ws: Worksheet, last_col: int) -> None:
    ws.merge_cells(start_row=1, start_column=1, end_row=2, end_column=last_col)
    cell = ws["A1"]
    cell.value = BANNER
    cell.font = BANNER_FONT
    cell.fill = BANNER_FILL
    cell.alignment = Alignment(horizontal="left", vertical="center", wrap_text=True, indent=1)
    for col in range(1, last_col + 1):
        for row in (1, 2):
            ws.cell(row, col).fill = BANNER_FILL
    ws.row_dimensions[1].height = 22
    ws.row_dimensions[2].height = 22
    ws.sheet_properties.tabColor = "7A1F1F"
    ws.oddHeader.left.text = "SYNTHETIC DATA"
    ws.oddFooter.left.text = BANNER
    ws.oddFooter.left.font = "Calibri"
    ws.oddFooter.left.size = 8
    ws.page_setup.orientation = "landscape"
    ws.page_setup.fitToPage = True
    ws.page_setup.fitToWidth = 1
    ws.page_setup.fitToHeight = 1
    ws.page_setup.paperSize = ws.PAPERSIZE_TABLOID
    ws.print_title_rows = "1:6"
    ws.freeze_panes = "A7"


def style_header_row(ws: Worksheet, row: int, start_col: int, end_col: int) -> None:
    for col in range(start_col, end_col + 1):
        cell = ws.cell(row, col)
        cell.font = HEADER_FONT
        cell.fill = HEADER_FILL
        cell.alignment = CENTER
        cell.border = THIN


def money_format(cell, value=None, empty=False) -> None:
    if not empty and value is not None:
        cell.value = float(value) if not isinstance(value, int) else value
    cell.number_format = '$#,##0.00'
    cell.alignment = RIGHT
    cell.border = THIN


def int_format(cell, value=None, empty=False) -> None:
    if not empty and value is not None:
        cell.value = int(value)
    cell.number_format = '#,##0'
    cell.alignment = RIGHT
    cell.border = THIN


def num_format(cell, value=None, empty=False) -> None:
    if not empty and value is not None:
        cell.value = float(value)
    cell.number_format = '#,##0.00'
    cell.alignment = RIGHT
    cell.border = THIN


def pct_format(cell, empty=True) -> None:
    cell.number_format = '0.0%'
    cell.alignment = RIGHT
    cell.border = THIN
    if empty:
        cell.fill = EMPTY_FILL


def label(cell, text, bold=False, note=False) -> None:
    cell.value = text
    cell.font = NOTE_FONT if note else (Font(name="Calibri", bold=True, size=10, color="1B2A4A") if bold else LABEL_FONT)
    cell.alignment = LEFT
    cell.border = THIN


LINE_ITEMS = [
    ("beginning", "Beginning customers", "int"),
    ("new", "New customers", "int"),
    ("churned", "Churned customers", "int"),
    ("ending", "Ending customers", "int"),
    ("average", "Average customers", "num"),
    ("arpa", "Monthly ARPA (USD)", "money"),
    ("revenue", "Revenue", "money"),
    ("cogs", "COGS (20% of revenue)", "money"),
    ("gross_profit", "Gross profit", "money"),
    ("hc_Engineering", "Headcount — Engineering", "int"),
    ("hc_Sales", "Headcount — Sales", "int"),
    ("hc_Customer Success", "Headcount — Customer Success", "int"),
    ("hc_G&A", "Headcount — G&A", "int"),
    ("total_hc", "Headcount — total", "int"),
    ("cph_Engineering", "Cost per head — Engineering", "money"),
    ("cph_Sales", "Cost per head — Sales", "money"),
    ("cph_Customer Success", "Cost per head — Customer Success", "money"),
    ("cph_G&A", "Cost per head — G&A", "money"),
    ("people_cost", "People cost", "money"),
    ("other_opex", "Other opex", "money"),
    ("total_opex", "Total opex", "money"),
    ("operating_income", "Operating income", "money"),
]


def row_value(row: dict, key: str):
    if key.startswith("hc_"):
        return row["headcount"][key[3:]]
    if key.startswith("cph_"):
        return row["cost_per_head"][key[4:]]
    return row[key]


def write_actuals(ws: Worksheet, data: dict) -> None:
    last_col = 14  # A + 12 months + FY total header
    apply_banner(ws, last_col)
    ws.merge_cells("A3:N3")
    ws["A3"] = f"{COMPANY} — 2025 Actuals (SYNTHETIC)"
    ws["A3"].font = TITLE_FONT
    ws["A3"].alignment = LEFT
    ws.merge_cells("A4:N4")
    ws["A4"] = (
        "Values only. Currency is USD. Customer counts are month-end or month-start as labelled. "
        + CONVENTION
    )
    ws["A4"].font = NOTE_FONT
    ws["A4"].alignment = WRAP
    ws.row_dimensions[4].height = 62

    ws["A6"] = "Line item"
    for i, month in enumerate(MONTHS_2025, start=2):
        ws.cell(6, i, month)
    ws.cell(6, 14, "FY 2025 Total")
    style_header_row(ws, 6, 1, 14)
    ws.freeze_panes = "B7"

    for r, (key, name, kind) in enumerate(LINE_ITEMS, start=7):
        label(ws.cell(r, 1), name, bold=True)
        ws.cell(r, 1).fill = ACTUAL_FILL
        for c, row in enumerate(data["actuals"], start=2):
            cell = ws.cell(r, c)
            value = row_value(row, key)
            if kind == "money":
                money_format(cell, value)
                cell.font = INPUT_FONT
            elif kind == "int":
                int_format(cell, value)
                cell.font = INPUT_FONT
            else:
                num_format(cell, value)
                cell.font = INPUT_FONT
            cell.fill = ACTUAL_FILL
        # FY total left empty so Tishan can practice SUM on a values tab if he wants.
        total_cell = ws.cell(r, 14)
        total_cell.fill = EMPTY_FILL
        total_cell.border = THIN
        if kind == "money":
            total_cell.number_format = '$#,##0.00'
        elif kind == "int":
            total_cell.number_format = '#,##0'
        else:
            total_cell.number_format = '#,##0.00'
        if key in {"beginning", "ending", "average", "arpa"} or key.startswith("hc_") or key.startswith("cph_") or key == "total_hc":
            # These are not simple annual sums (or are rates/point-in-time). Leave a note via no format change.
            pass

    ws.merge_cells("A30:N31")
    ws["A30"] = (
        "Yellow cells in column N are left blank on purpose. Do not treat beginning/ending customers, "
        "average customers, ARPA, headcount, or cost per head as items to SUM for a year total. "
        "Revenue, new customers, churned customers, COGS, gross profit, people cost, other opex, "
        "total opex, and operating income can be summed. SYNTHETIC DATA."
    )
    ws["A30"].font = BANNER_NOTE_FONT
    ws["A30"].alignment = WRAP
    ws.row_dimensions[30].height = 22
    ws.row_dimensions[31].height = 22

    ws.column_dimensions["A"].width = 36
    for col in range(2, 15):
        ws.column_dimensions[get_column_letter(col)].width = 13


def write_drivers(ws: Worksheet, data: dict) -> None:
    last_col = 14
    apply_banner(ws, last_col)
    ws.merge_cells("A3:N3")
    ws["A3"] = f"{COMPANY} — Inputs / Drivers (SYNTHETIC)"
    ws["A3"].font = TITLE_FONT
    ws.merge_cells("A4:N5")
    ws["A4"] = (
        "Blue numbers are typed assumptions (values), not formulas. "
        "Use these values in your Forecast and Budget-vs-Actual formulas; do not overwrite them. "
        + CONVENTION
        + " Opening customers for 2026 must equal December 2025 ending customers on the Actuals tab. "
        "A copy of that opening is stored as a value below so you can check your reference."
    )
    ws["A4"].font = NOTE_FONT
    ws["A4"].alignment = WRAP
    ws.row_dimensions[4].height = 36
    ws.row_dimensions[5].height = 48

    # Opening balances
    ws["A6"] = "Opening balances and rates (values)"
    ws["A6"].font = SECTION_FONT
    ws["A6"].fill = SECTION_FILL
    ws.merge_cells("A6:C6")
    ws["A7"] = "Line item"
    ws["B7"] = "Value"
    ws["C7"] = "Note"
    style_header_row(ws, 7, 1, 3)

    openings = [
        ("January 2025 beginning customers", data["opening_2025"], "Opening balance for 2025 actuals and the 2025 budget."),
        ("January 2026 beginning customers", data["opening_2026"], "Must equal December 2025 ending customers (Actuals). Prefer a formula reference in Forecast, not a retyped number."),
        ("COGS rate", COGS_RATE, "COGS = Revenue × this rate. Display as 20%."),
    ]
    ws["A8"] = openings[0][0]
    int_format(ws["B8"], openings[0][1])
    ws["B8"].font = INPUT_FONT
    ws["C8"] = openings[0][2]
    ws["C8"].font = NOTE_FONT
    ws["A9"] = openings[1][0]
    int_format(ws["B9"], openings[1][1])
    ws["B9"].font = INPUT_FONT
    ws["C9"] = openings[1][2]
    ws["C9"].font = NOTE_FONT
    ws["A10"] = openings[2][0]
    ws["B10"].value = float(COGS_RATE)
    ws["B10"].number_format = "0%"
    ws["B10"].font = INPUT_FONT
    ws["B10"].alignment = RIGHT
    ws["B10"].border = THIN
    ws["C10"] = openings[2][2]
    ws["C10"].font = NOTE_FONT
    for r in range(8, 11):
        ws.cell(r, 1).font = LABEL_FONT
        ws.cell(r, 1).border = THIN

    # 2026 forecast drivers
    ws["A12"] = "2026 forecast drivers (monthly values) — SYNTHETIC"
    ws["A12"].font = SECTION_FONT
    ws["A12"].fill = SECTION_FILL
    ws.merge_cells("A12:N12")
    ws["A13"] = "Driver"
    for i, month in enumerate(MONTHS_2026, start=2):
        ws.cell(13, i, month)
    ws.cell(13, 14, "Notes")
    style_header_row(ws, 13, 1, 14)

    driver_rows = [
        ("New customers", "int", "new", None),
        ("Churned customers", "int", "churned", None),
        ("Monthly ARPA (USD)", "money", "arpa", None),
        ("Headcount — Engineering", "int", "hc_Engineering", None),
        ("Headcount — Sales", "int", "hc_Sales", None),
        ("Headcount — Customer Success", "int", "hc_Customer Success", None),
        ("Headcount — G&A", "int", "hc_G&A", None),
        ("Cost per head — Engineering", "money", "cph_Engineering", "Constant in 2026; 3% above the 2025 rate."),
        ("Cost per head — Sales", "money", "cph_Sales", "Constant in 2026; 3% above the 2025 rate."),
        ("Cost per head — Customer Success", "money", "cph_Customer Success", "Constant in 2026; 3% above the 2025 rate."),
        ("Cost per head — G&A", "money", "cph_G&A", "Constant in 2026; 3% above the 2025 rate."),
        ("Other opex", "money", "other_opex", None),
    ]
    for r, (name, kind, key, note) in enumerate(driver_rows, start=14):
        label(ws.cell(r, 1), name, bold=True)
        for c, row in enumerate(data["forecast"], start=2):
            cell = ws.cell(r, c)
            value = row_value(row, key)
            if kind == "money":
                money_format(cell, value)
            else:
                int_format(cell, value)
            cell.font = INPUT_FONT
        ws.cell(r, 14, note or "Typed assumption. Use in Forecast formulas.")
        ws.cell(r, 14).font = NOTE_FONT
        ws.cell(r, 14).alignment = LEFT
        ws.cell(r, 14).border = THIN

    # 2025 budget (for BvA)
    ws["A27"] = "2025 original budget (monthly values) — SYNTHETIC — use on the Budget-vs-Actual tab"
    ws["A27"].font = SECTION_FONT
    ws["A27"].fill = SECTION_FILL
    ws.merge_cells("A27:N27")
    ws["A28"] = "Budget line item"
    for i, month in enumerate(MONTHS_2025, start=2):
        ws.cell(28, i, month)
    ws.cell(28, 14, "Notes")
    style_header_row(ws, 28, 1, 14)

    budget_lines = [
        ("New customers", "int", "new"),
        ("Churned customers", "int", "churned"),
        ("Monthly ARPA (USD)", "money", "arpa"),
        ("Headcount — Engineering", "int", "hc_Engineering"),
        ("Headcount — Sales", "int", "hc_Sales"),
        ("Headcount — Customer Success", "int", "hc_Customer Success"),
        ("Headcount — G&A", "int", "hc_G&A"),
        ("Cost per head — Engineering", "money", "cph_Engineering"),
        ("Cost per head — Sales", "money", "cph_Sales"),
        ("Cost per head — Customer Success", "money", "cph_Customer Success"),
        ("Cost per head — G&A", "money", "cph_G&A"),
        ("Other opex", "money", "other_opex"),
        ("Beginning customers", "int", "beginning"),
        ("Ending customers", "int", "ending"),
        ("Average customers", "num", "average"),
        ("Revenue", "money", "revenue"),
        ("COGS (20% of revenue)", "money", "cogs"),
        ("Gross profit", "money", "gross_profit"),
        ("People cost", "money", "people_cost"),
        ("Total opex", "money", "total_opex"),
        ("Operating income", "money", "operating_income"),
    ]
    # Only put DRIVER-like budget assumptions as the primary inputs, plus precomputed budget P&L values
    # so Tishan can either rebuild the 2025 budget from the budget drivers or reference the budget
    # P&L values when building BvA. Both are values. I'll include both sections clearly.
    for r, (name, kind, key) in enumerate(budget_lines, start=29):
        label(ws.cell(r, 1), name, bold=True)
        for c, row in enumerate(data["budget"], start=2):
            cell = ws.cell(r, c)
            value = row_value(row, key)
            if kind == "money":
                money_format(cell, value)
            elif kind == "int":
                int_format(cell, value)
            else:
                num_format(cell, value)
            cell.font = INPUT_FONT
        if key in {"revenue", "cogs", "gross_profit", "people_cost", "total_opex", "operating_income", "beginning", "ending", "average"}:
            ws.cell(r, 14, "Budget result stored as a value so you can check a rebuild from the budget drivers above.")
        else:
            ws.cell(r, 14, "2025 budget assumption (value).")
        ws.cell(r, 14).font = NOTE_FONT
        ws.cell(r, 14).border = THIN

    ws.merge_cells("A51:N52")
    ws["A51"] = (
        "The 2025 budget customer path starts from the same 90 opening customers as actuals, "
        "then follows the budget new/churned counts, not the actual counts. "
        "Cost-per-head rates in the 2025 budget equal the 2025 actual rates. SYNTHETIC DATA."
    )
    ws["A51"].font = BANNER_NOTE_FONT
    ws["A51"].alignment = WRAP

    ws.column_dimensions["A"].width = 42
    for col in range(2, 14):
        ws.column_dimensions[get_column_letter(col)].width = 13
    ws.column_dimensions["N"].width = 42
    ws.freeze_panes = "B14"


def write_empty_forecast(ws: Worksheet) -> None:
    last_col = 14
    apply_banner(ws, last_col)
    ws.merge_cells("A3:N3")
    ws["A3"] = f"{COMPANY} — 2026 Forecast (SYNTHETIC) — formulas to be built by Tishan"
    ws["A3"].font = TITLE_FONT
    ws.merge_cells("A4:N4")
    ws["A4"] = (
        "Leave this tab as formulas, not pasted values. January 2026 beginning customers should "
        "reference December 2025 ending customers on the Actuals tab. New customers, churned "
        "customers, ARPA, headcount, cost per head, and other opex should reference Inputs-Drivers. "
        "Yellow cells are empty on purpose. SYNTHETIC DATA."
    )
    ws["A4"].font = NOTE_FONT
    ws["A4"].alignment = WRAP
    ws.row_dimensions[4].height = 48

    ws["A6"] = "Line item"
    for i, month in enumerate(MONTHS_2026, start=2):
        ws.cell(6, i, month)
    ws.cell(6, 14, "FY 2026 Total")
    style_header_row(ws, 6, 1, 14)
    ws.freeze_panes = "B7"

    for r, (key, name, kind) in enumerate(LINE_ITEMS, start=7):
        label(ws.cell(r, 1), name, bold=True)
        for c in range(2, 15):
            cell = ws.cell(r, c)
            cell.fill = EMPTY_FILL
            cell.border = THIN
            if kind == "money":
                cell.number_format = '$#,##0.00'
            elif kind == "int":
                cell.number_format = '#,##0'
            else:
                cell.number_format = '#,##0.00'

    ws.merge_cells("A30:N30")
    ws["A30"] = "No formulas were pre-built in this workbook. Check your results against test_cases.md. SYNTHETIC DATA."
    ws["A30"].font = BANNER_NOTE_FONT
    ws.column_dimensions["A"].width = 36
    for col in range(2, 15):
        ws.column_dimensions[get_column_letter(col)].width = 13


def write_empty_bva(ws: Worksheet) -> None:
    last_col = 13
    apply_banner(ws, last_col)
    ws.merge_cells("A3:M3")
    ws["A3"] = f"{COMPANY} — 2025 Budget vs Actual (SYNTHETIC) — formulas to be built by Tishan"
    ws["A3"].font = TITLE_FONT
    ws.merge_cells("A4:M4")
    ws["A4"] = (
        "Compare the 2025 budget (Inputs-Drivers) with 2025 actuals (Actuals). "
        "Recommended variance $ = Actual − Budget. Yellow cells are empty on purpose. SYNTHETIC DATA."
    )
    ws["A4"].font = NOTE_FONT
    ws["A4"].alignment = WRAP
    ws.row_dimensions[4].height = 36

    ws["A6"] = "Annual summary (FY 2025)"
    ws["A6"].font = SECTION_FONT
    ws["A6"].fill = SECTION_FILL
    ws.merge_cells("A6:E6")
    headers = ["Line item", "2025 Budget", "2025 Actual", "Variance $ (Actual − Budget)", "Variance %"]
    for c, h in enumerate(headers, start=1):
        ws.cell(7, c, h)
    style_header_row(ws, 7, 1, 5)

    annual_items = [
        "New customers",
        "Churned customers",
        "Ending customers (December)",
        "Revenue",
        "COGS (20% of revenue)",
        "Gross profit",
        "People cost",
        "Other opex",
        "Total opex",
        "Operating income",
    ]
    for r, name in enumerate(annual_items, start=8):
        label(ws.cell(r, 1), name, bold=True)
        for c in range(2, 5):
            cell = ws.cell(r, c)
            cell.fill = EMPTY_FILL
            cell.border = THIN
            if name in {"New customers", "Churned customers", "Ending customers (December)"}:
                cell.number_format = '#,##0'
            else:
                cell.number_format = '$#,##0.00'
        pct_format(ws.cell(r, 5), empty=True)

    ws["A19"] = "Monthly revenue and ending customers"
    ws["A19"].font = SECTION_FONT
    ws["A19"].fill = SECTION_FILL
    ws.merge_cells("A19:I19")
    month_headers = [
        "Month",
        "Budget revenue",
        "Actual revenue",
        "Revenue variance $",
        "Revenue variance %",
        "Budget ending customers",
        "Actual ending customers",
        "Ending customers variance",
        "Notes",
    ]
    for c, h in enumerate(month_headers, start=1):
        ws.cell(20, c, h)
    style_header_row(ws, 20, 1, 9)
    for r, month in enumerate(MONTHS_2025, start=21):
        label(ws.cell(r, 1), month, bold=True)
        for c in range(2, 6):
            cell = ws.cell(r, c)
            cell.fill = EMPTY_FILL
            cell.border = THIN
            if c == 5:
                cell.number_format = '0.0%'
            else:
                cell.number_format = '$#,##0.00'
        for c in range(6, 9):
            cell = ws.cell(r, c)
            cell.fill = EMPTY_FILL
            cell.border = THIN
            cell.number_format = '#,##0'
        ws.cell(r, 9).fill = EMPTY_FILL
        ws.cell(r, 9).border = THIN

    ws.merge_cells("A34:I35")
    ws["A34"] = (
        "Optional: add a second monthly block for total opex if you have time. "
        "A positive revenue variance means actuals came in above budget. "
        "Say in your commentary whether a positive opex variance is favorable or not. SYNTHETIC DATA."
    )
    ws["A34"].font = BANNER_NOTE_FONT
    ws["A34"].alignment = WRAP
    ws.column_dimensions["A"].width = 36
    for col in range(2, 10):
        ws.column_dimensions[get_column_letter(col)].width = 16
    for col in range(10, 14):
        ws.column_dimensions[get_column_letter(col)].width = 12
    ws.freeze_panes = "B8"


def write_empty_summary(ws: Worksheet) -> None:
    last_col = 8
    apply_banner(ws, last_col)
    ws.merge_cells("A3:H3")
    ws["A3"] = f"{COMPANY} — Summary (SYNTHETIC) — formulas to be built by Tishan"
    ws["A3"].font = TITLE_FONT
    ws.merge_cells("A4:H4")
    ws["A4"] = (
        "Pull totals from Actuals, Inputs-Drivers (2025 budget), Budget-vs-Actual, and Forecast. "
        "Yellow cells are empty on purpose. SYNTHETIC DATA."
    )
    ws["A4"].font = NOTE_FONT
    ws["A4"].alignment = WRAP
    ws.row_dimensions[4].height = 32

    headers = [
        "KPI",
        "2025 Budget",
        "2025 Actual",
        "2025 Variance $",
        "2025 Variance %",
        "2026 Forecast",
        "2026 vs 2025 Actual $",
        "Notes",
    ]
    for c, h in enumerate(headers, start=1):
        ws.cell(6, c, h)
    style_header_row(ws, 6, 1, 8)

    kpis = [
        ("Ending customers (December)", "int"),
        ("New customers (year total)", "int"),
        ("Churned customers (year total)", "int"),
        ("Monthly ARPA (December)", "money"),
        ("ARR (December ending customers × Dec ARPA × 12)", "money"),
        ("Revenue", "money"),
        ("COGS", "money"),
        ("Gross profit", "money"),
        ("Gross margin %", "pct"),
        ("Headcount (December total)", "int"),
        ("People cost", "money"),
        ("Other opex", "money"),
        ("Total opex", "money"),
        ("Operating income", "money"),
    ]
    for r, (name, kind) in enumerate(kpis, start=7):
        label(ws.cell(r, 1), name, bold=True)
        for c in range(2, 8):
            cell = ws.cell(r, c)
            cell.fill = EMPTY_FILL
            cell.border = THIN
            if kind == "money":
                cell.number_format = '$#,##0.00'
            elif kind == "int":
                cell.number_format = '#,##0'
            elif kind == "pct":
                cell.number_format = '0.0%'
            if c in (5,) and kind != "pct":
                if kind == "money" or kind == "int":
                    pass
            if c == 5 and kind != "pct":
                cell.number_format = '0.0%'
        # column 5 is variance % for most rows; for gross margin % all value cols are %
        if kind == "pct":
            for c in range(2, 8):
                ws.cell(r, c).number_format = '0.0%'
        ws.cell(r, 8).fill = EMPTY_FILL
        ws.cell(r, 8).border = THIN

    ws.merge_cells("A22:H24")
    ws["A22"] = (
        "Write your variance commentary in guide.md (and, if you want, in a text box or Notes column here). "
        "Do not let an AI write the commentary from unchecked numbers. SYNTHETIC DATA."
    )
    ws["A22"].font = BANNER_NOTE_FONT
    ws["A22"].alignment = WRAP
    ws.column_dimensions["A"].width = 52
    for col in range(2, 8):
        ws.column_dimensions[get_column_letter(col)].width = 18
    ws.column_dimensions["H"].width = 28
    ws.freeze_panes = "B7"


def assert_no_formulas(wb: Workbook) -> int:
    count = 0
    for ws in wb.worksheets:
        for row in ws.iter_rows():
            for cell in row:
                value = cell.value
                if isinstance(value, str) and value.startswith("="):
                    raise AssertionError(f"Unexpected formula in {ws.title} {cell.coordinate}: {value}")
                count += 1
    return count


def write_workbook(data: dict) -> None:
    wb = Workbook()
    ws_drivers = wb.active
    ws_drivers.title = "Inputs-Drivers"
    ws_actuals = wb.create_sheet("Actuals")
    ws_forecast = wb.create_sheet("Forecast")
    ws_bva = wb.create_sheet("Budget-vs-Actual")
    ws_summary = wb.create_sheet("Summary")

    write_drivers(ws_drivers, data)
    write_actuals(ws_actuals, data)
    write_empty_forecast(ws_forecast)
    write_empty_bva(ws_bva)
    write_empty_summary(ws_summary)

    for ws in wb.worksheets:
        ws.sheet_view.showGridLines = False
        # Confirm banner text is present in A1.
        assert str(ws["A1"].value).startswith("SYNTHETIC DATA"), ws.title

    assert_no_formulas(wb)
    wb.properties.title = "Fairhaven Metrics FP&A model (SYNTHETIC)"
    wb.properties.creator = "Portfolio generator (AI-assisted structure and data)"
    wb.properties.description = BANNER
    WORKBOOK_PATH.write_bytes(b"")  # ensure path is usable
    wb.save(WORKBOOK_PATH)


def fmt_expected(test: dict) -> str:
    value = test["expected"]
    if test["format"] == "money":
        return f"${value:,.2f}"
    if test["format"] == "int":
        return f"{int(value):,}"
    return str(value)


def write_test_cases(data: dict) -> None:
    tests, extras = data["tests"]
    lines = [
        "# Test cases — Fairhaven Metrics LLC FP&A model (SYNTHETIC)",
        "",
        "All expected values were computed by `generate_model.py` from the same synthetic data and drivers that were written into the workbook, then checked again by `verify_model.py`.",
        "",
        "## Conventions",
        "",
        CONVENTION,
        "",
        "Use these checks after you have built the formulas. If a result does not match, check the convention first (especially average customers vs ending customers, and Actual − Budget).",
        "",
        "Do not paste these expected values into the Forecast, Budget-vs-Actual, or Summary tabs. Those tabs should stay formula-driven.",
        "",
        "## Checks",
        "",
        "| # | Check | How it is computed | Expected value |",
        "| --- | --- | --- | ---: |",
    ]
    for test in tests:
        lines.append(
            f"| {test['id']} | {test['name']} | {test['how']} | {fmt_expected(test)} |"
        )
    lines.extend(
        [
            "",
            "## Reference totals (not additional pass/fail checks)",
            "",
            "These are printed so a reviewer can see the annual picture. They come from the same generator.",
            "",
            f"- FY 2025 budget revenue: ${extras['fy_2025_budget_revenue']:,.2f}",
            f"- FY 2025 budget total opex: ${extras['fy_2025_budget_opex']:,.2f}",
            f"- FY 2026 forecast revenue: ${extras['fy_2026_forecast_revenue']:,.2f}",
            f"- FY 2026 forecast total opex: ${extras['fy_2026_forecast_opex']:,.2f}",
            "",
            "SYNTHETIC DATA — fictional company, not for production use.",
            "",
        ]
    )
    TEST_CASES_PATH.write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    with localcontext() as ctx:
        ctx.rounding = ROUND_HALF_UP
        data = build_dataset()
        # Fix tests return — build_dataset currently assigns compute_tests result
        # which I need to make a tuple consistently.
        write_workbook(data)
        write_test_cases(data)
        tests, extras = data["tests"]
        print(f"Wrote {WORKBOOK_PATH}")
        print(f"Wrote {TEST_CASES_PATH}")
        print(f"Dec 2025 ending customers: {tests[2]['expected']}")
        print(f"Jan 2026 forecast revenue: {tests[9]['expected']}")
        print(f"FY 2026 forecast opex: {extras['fy_2026_forecast_opex']}")
        print(f"FY 2025 revenue variance: {extras['fy_2025_revenue_variance']}")


if __name__ == "__main__":
    main()
