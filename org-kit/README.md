# Grokbot organization rebuild kit

This folder holds everything needed to recreate Tishan Perera's Grokbot organization, his multi-agent Personal AI Operating System, from scratch.

If you are an AI model that was handed this repository, start with [REBUILD.md](REBUILD.md) and follow it step by step.

## What the organization is

- **Owner:** Tishan Perera (GitHub `tishan-perera`). Sets strategy and holds every approval gate.
- **Org lead:** Amanda · Chief of Staff & COO. Runs the org day to day. Every chief reports to her.
- **Seats:** 20 agent seats in 7 active departments, plus history for 8 former seats.
- **Dashboards:** Live HQ, the Organization Office Floor (source of truth for status) and a Virtual Office.
- **Operating style:** agents draft and prepare; Tishan approves sends, hires, spending, trades, profile edits, security changes and merges, in his own words.

## Contents

| Path | What it holds |
|---|---|
| [REBUILD.md](REBUILD.md) | Step-by-step rebuild guide for an LLM or a person |
| [org.json](org.json) | Machine-readable org: seats, instructions, departments, routines, Pages |
| [org/roster.yaml](org/roster.yaml) | Every seat with role, department, reporting line, state and dates |
| [org/chart.md](org/chart.md) | Org chart (Mermaid) |
| [agents/](agents/) | One file per seat with the instructions to paste, plus [former seats](agents/former-seats.md) |
| [rules/standing-directives.md](rules/standing-directives.md) | Owner rules, quoted as given |
| [rules/approval-gates.md](rules/approval-gates.md) | What needs Tishan's approval and how approval is recognized |
| [operating-model.md](operating-model.md) | How work, status and reporting flow |
| [routines/](routines/) | Scheduled routines with schedules and prompts |
| [skills/](skills/README.md) | Custom skills (none exist yet) and platform skills the org relies on |
| [connectors.md](connectors.md) | Connected services and what each may do. No credentials |
| [pages/](pages/README.md) | Page source (TSX) for HQ, Floor, Virtual Office and OS reports |
| [decisions/](decisions/README.md) | Architecture decision records ADR-0001 to ADR-0004 |
| [history/timeline.md](history/timeline.md) | Dated hires, closures and decisions |
| [glossary.md](glossary.md) | Terms used across the org |
| [gaps.md](gaps.md) | What this kit could not capture and who holds it |

## What is deliberately not here

This repository is public. It holds the organization, not Tishan's private life. These are left out or replaced with `[private ...]` placeholders:

- Passwords, API keys, tokens, cookies, one-time codes, vault contents.
- Account and card numbers, balances, transactions, holdings, loans, credit and trading results.
- Phone numbers, email addresses, home and location details, family names, health details.
- Contents of private emails, chats and conversations.
- Personal career records, pay targets and employer history.

The snapshot date for everything here is **Wednesday, Nov 18, 2026** (America/Chicago).
