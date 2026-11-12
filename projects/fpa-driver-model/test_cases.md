# Test cases — Fairhaven Metrics LLC FP&A model (SYNTHETIC)

All expected values were computed by `generate_model.py` from the same synthetic data and drivers that were written into the workbook, then checked again by `verify_model.py`.

## Conventions

Customer rollforward: Ending customers = Beginning customers + New customers − Churned customers. Beginning customers in month 1 of a year equal ending customers of the prior month (January 2025 beginning is the 1 January 2025 opening balance; January 2026 beginning must equal December 2025 ending customers). Average customers = (Beginning + Ending) / 2. Revenue = Average customers × monthly ARPA (average revenue per account per month, USD). This model uses average customers, not ending customers, for revenue. COGS = Revenue × 20%. People cost = Engineering HC × Eng cost/head + Sales HC × Sales cost/head + CS HC × CS cost/head + G&A HC × G&A cost/head. Total opex = People cost + Other opex. Gross profit = Revenue − COGS. Operating income = Gross profit − Total opex. ARR (if you build it) = Ending customers × monthly ARPA × 12. Budget-vs-Actual variance $ = Actual − Budget (positive means favorable for revenue and operating income, and unfavorable for costs — label the direction in your commentary). Variance % = Variance $ / Budget, when Budget is not zero.

Use these checks after you have built the formulas. If a result does not match, check the convention first (especially average customers vs ending customers, and Actual − Budget).

Do not paste these expected values into the Forecast, Budget-vs-Actual, or Summary tabs. Those tabs should stay formula-driven.

## Checks

| # | Check | How it is computed | Expected value |
| --- | --- | --- | ---: |
| 1 | January 2025 ending customers | Beginning 90 + new 6 − churned 2. | 94 |
| 2 | January 2025 revenue | Average customers = (90 + 94) / 2 = 92. Revenue = 92 × $2,000 ARPA. | $184,000.00 |
| 3 | December 2025 ending customers | Roll the 2025 actuals customer chain through December. Also the opening balance for January 2026. | 150 |
| 4 | FY 2025 actual revenue | Sum of monthly actual revenue for Jan–Dec 2025. | $2,977,650.00 |
| 5 | FY 2025 actual total opex | Sum of monthly actual total opex (people cost + other opex) for Jan–Dec 2025. | $1,431,000.00 |
| 6 | January 2025 people cost | (4 × $10,000) + (3 × $8,500) + (2 × $7,000) + (2 × $8,000). | $95,500.00 |
| 7 | FY 2025 revenue variance (Actual − Budget) | FY 2025 actual revenue minus FY 2025 budget revenue. | $222,650.00 |
| 8 | December 2025 revenue variance (Actual − Budget) | December 2025 actual revenue minus December 2025 budget revenue. | $43,500.00 |
| 9 | January 2026 forecast ending customers | Beginning 150 (Dec 2025 ending) + new 8 − churned 3. | 155 |
| 10 | January 2026 forecast revenue (forecast month 1) | Average customers = (150 + 155) / 2 = 152.5. Revenue = 152.5 × $2,200 ARPA. | $335,500.00 |
| 11 | December 2026 forecast ending customers (forecast month 12) | Roll the 2026 driver customer chain through December. | 217 |
| 12 | FY 2026 forecast total opex | Sum of monthly forecast total opex (people cost + other opex) for Jan–Dec 2026. Use 2026 cost-per-head rates. | $1,917,735.00 |

## Reference totals (not additional pass/fail checks)

These are printed so a reviewer can see the annual picture. They come from the same generator.

- FY 2025 budget revenue: $2,755,000.00
- FY 2025 budget total opex: $1,308,000.00
- FY 2026 forecast revenue: $4,982,925.00
- FY 2026 forecast total opex: $1,917,735.00

SYNTHETIC DATA — fictional company, not for production use.
