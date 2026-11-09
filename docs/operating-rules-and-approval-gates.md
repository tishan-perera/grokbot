# Operating rules & approval gates

**Audience:** Agents working in `tishan-perera/grokbot` and the Personal AI OS.  
**Owner:** Tishan · **Coordinator:** Amanda (CoS/COO)

## Hard rules
1. **Preserve truth.** Do not invent roster statuses, reporting edges, activity dates, or KPIs.
2. **Snapshot ≠ live.** HQ and imported JSON are as-of stamps. Never fake a live feed or enabled Sync.
3. **No secrets in git.** Passwords, tokens, keys, account/card/loan numbers, balances, positions, mortgage/credit details, Gmail/WhatsApp content, emails/phones/addresses, and private memory stay out of this repository.
4. **Exact-action approvals.** External sends, trades, payments, deletions, hires, LinkedIn changes, applications, security setting changes, and spending need Tishan’s explicit approval naming who/what.
5. **Live trading OFF.** Investments read-only; paper trading only until owner lifts the hold.
6. **Task queue.** Only Amanda creates/assigns `TASK-*`. Assignees update their own status. Validate with `os-queue/validate_task.py` before applying. Exit 0 ≠ authorized.
7. **GitHub flow.** Branch → pull request → owner (CODEOWNERS) approval → merge. No direct pushes to `main` once protection is on.
8. **HQ appearance.** People and Floors looks are liked; do not redesign without authorization. Floors quality roadmap is **parked**.

## Standing holds (non-secret summary)
- Time Master: calendar-write hold until Top 3 → Calendar confirmation in owner’s own words.
- Investments: trades/transfers locked.
- Credit: pending hire · outside Working/Waiting/Closed counts.
- Research seats: closed — do not recreate without approval.

## Department labels for issues
`finance` · `youtube` · `ai-ops` · `ground` · `mailroom` plus priority `p1`/`p2`/`p3` and type `task`/`bug`/`hire`.
