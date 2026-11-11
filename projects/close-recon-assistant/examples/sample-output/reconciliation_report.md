# Reconciliation report

Synthetic demonstration for Sample Harbor LLC (fictional). This is not a real company, bank, or close. Data origin is SYNTHETIC. No journal entry was posted.

## Scope

Positive amounts are cash in. Negative amounts are cash out. Bank label: Synthetic operating account (no account number). Ledger account: 1000-CASH-OPERATING. Period 2026-03 (2026-03-01 to 2026-03-31). Currency USD. Prepared for Portfolio demonstration. Model step: off.

## Summary

| Line | Amount |
| --- | --- |
| Bank beginning balance | 20,000.00 |
| Book beginning balance | 20,000.00 |
| Bank balance | 18,853.94 |
| Book balance | 20,557.67 |
| Adjusted bank balance | 20,468.39 |
| Adjusted book balance | 20,468.39 |
| Unexplained difference | 0.00 |
| Proposed unposted book adjustments | -89.28 |
| Journal entries posted | 0 |

## Reconciling items

| Item | Kind | Side | Adjustment | Approval | Reason |
| --- | --- | --- | --- | --- | --- |
| R-01 | suspected duplicate | bank | 420.00 | required, not posted | B-11 repeats B-10 on the bank side (same amount and reference within 2 days). It was held out of matching. The bridge adds the bank line back until a reviewer confirms the repeat. This is not a ledger posting. |
| R-02 | deposit in transit | bank | 2,150.00 | not required | G-09 is on the books and not on the bank. Treated as a deposit in transit. |
| R-03 | outstanding payment | bank | -640.00 | not required | G-10 is on the books and not on the bank. Treated as an outstanding payment. |
| R-04 | outstanding payment | bank | -315.55 | not required | G-11 is on the books and not on the bank. Treated as an outstanding payment. |
| R-05 | unrecorded bank charge | book | -25.00 | required, not posted | B-12 looks like a bank fee and is not on the books. Proposed, not posted. |
| R-06 | unrecorded interest | book | 4.12 | required, not posted | B-13 looks like interest and is not on the books. Proposed, not posted. |
| R-07 | unrecorded bank amount | book | -63.40 | required, not posted | B-17 is on the bank and not on the books. The reason is not identified. Not posted. |
| R-08 | proposed amount correction | book | -5.00 | required, not posted | M-12 differs by -5.00 (bank -1255.00, book -1250.00). The bridge includes that difference as a proposed book correction. Not posted. |

## Match results

| Match | Status | Rule | Confidence | Bank lines | Book lines | Bank amount | Book amount |
| --- | --- | --- | --- | --- | --- | --- | --- |
| M-01 | matched | exact | 1.00 | B-01 | G-01 | 4,500.00 | 4,500.00 |
| M-02 | matched | exact | 1.00 | B-02 | G-02 | -2,200.00 | -2,200.00 |
| M-03 | matched | exact | 1.00 | B-03 | G-03 | -89.00 | -89.00 |
| M-04 | matched | exact | 1.00 | B-04 | G-04 | -6,400.00 | -6,400.00 |
| M-05 | matched | exact | 1.00 | B-05 | G-05 | 1,275.40 | 1,275.40 |
| M-06 | matched | exact | 1.00 | B-06 | G-06 | -146.18 | -146.18 |
| M-07 | matched | exact | 1.00 | B-10 | G-13 | -420.00 | -420.00 |
| M-08 | matched | exact | 1.00 | B-15 | G-15 | 3,000.00 | 3,000.00 |
| M-09 | matched | amount_ref_date_window | 0.95 | B-07 | G-07 | -875.00 | -875.00 |
| M-10 | matched | amount_ref_date_window | 0.95 | B-08 | G-08 | 980.00 | 980.00 |
| M-11 | suggested | amount_date_missing_ref | 0.70 | B-14 | G-14 | -512.00 | -512.00 |
| M-12 | suggested | amount_tolerance_exact_ref | 0.62 | B-09 | G-12 | -1,255.00 | -1,250.00 |
| M-13 | suggested | group_sum | 0.58 | B-16 | G-16, G-17 | 1,500.00 | 1,500.00 |

## Expense coding

Every category is a suggestion. Low-confidence, conflicting, and duplicate expenses are marked for review. The review file also lists the high-confidence rows, because this tool does not post.

| Expense | Category | Confidence | Source | Needs review | Posted | Status |
| --- | --- | --- | --- | --- | --- | --- |
| E-01 | Rent and occupancy | 0.95 | rules | no | false | suggested |
| E-02 | Software | 0.92 | rules | no | false | suggested |
| E-03 | Professional services | 0.90 | rules | no | false | suggested |
| E-04 | Marketing | 0.84 | rules | no | false | suggested |
| E-05 | Utilities | 0.93 | rules | no | false | suggested |
| E-06 | Delivery | 0.88 | rules | no | false | suggested |
| E-07 | Insurance | 0.93 | rules | no | false | suggested |
| E-08 | Professional services | 0.72 | rules | yes | false | needs_review |
| E-09 | Office supplies | 0.45 | rules | yes | false | needs_review |
| E-10 | Uncategorized | 0.20 | rules | yes | false | needs_review |
| E-11 | Insurance | 0.93 | rules | yes | false | needs_review |
| E-12 | Office supplies | 0.86 | rules | no | false | suggested |

## Unexplained difference

Unexplained difference is 0.00 USD. It equals the opening book balance minus the opening bank balance, because every loaded line is in the bridge. A zero unexplained difference means the openings agree and the lines were classified. It does not mean a reviewer has approved the proposed entries. Items marked as requiring approval are still open until the review file says so.
