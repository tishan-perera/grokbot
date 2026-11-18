# Rebuild guide

Follow these steps in order to recreate the Grokbot organization on any multi-agent platform. The original runs on Grok Bot (agents, routines, Pages, connectors), but every step is described in platform-neutral terms.

## Ground rules for whoever runs the rebuild

1. Read [rules/standing-directives.md](rules/standing-directives.md) and [rules/approval-gates.md](rules/approval-gates.md) first. They apply to you too.
2. Do not invent facts, numbers, dates, test results or experience. Where this kit says unverified, ask Tishan.
3. Ask Tishan before creating each agent. Hiring and org structure changes need his explicit approval, even during a rebuild.
4. Never ask for, store or paste passwords, tokens or cookies. Tishan connects his own accounts.
5. Do not recreate former seats: Research, Trading, Time Master or the others in [agents/former-seats.md](agents/former-seats.md).

## Step 1. Confirm the owner and scope

- Owner: Tishan Perera. Timezone America/Chicago. Some routines run on Eastern Time.
- He wants plain business English: roles, process, results. No jargon.
- Confirm with him which departments to bring back and whether parked seats should start parked.

## Step 2. Create the org lead

Create **Amanda · Chief of Staff & COO** first, from [agents/amanda.md](agents/amanda.md). Give her this kit and the rules. Every later agent is created by or through Amanda with Tishan's approval.

## Step 3. Create the departments and seats in this order

Each seat file in [agents/](agents/) has an "Instructions to paste" block. Paste it as the agent's description or system instructions, then add its operating notes.

1. Executive: Amanda (done in step 2).
2. AI Operations: Rio, then Lex, OS Tester, Clay Avatar Artist. Rio rebuilds the dashboards in step 6.
3. Mail Room: Chief of Mailroom, then Head of Gmail and Head of WhatsApp.
4. Storage Room: Chief of Storage.
5. YouTube Studio: Chief of Youtube, then YouTube Analyst and Script Writer. Leave YStudio uncreated unless Tishan defines its role.
6. Finance: Chief on Investments (read-only) and Gold Fundamentals (permanent). Do not activate Chief of Credit. It stays unhired.
7. LinkedIn Growth & Career Acquisition: LinkedIn Department Director, then Profile & Branding, AI & Finance Content, and Career Acquisition & Networking specialists.

Reporting lines are in [org/roster.yaml](org/roster.yaml). Set each seat's starting state from the `state` field. Parked seats wait for a named order before working.

## Step 4. Connect services

Tishan connects each service himself from [connectors.md](connectors.md). Give each agent only the access its seat needs. Brokerage and finance connections stay read-only.

## Step 5. Recreate routines

Recreate the routines in [routines/](routines/README.md) with the same schedules and recipients. Follow ADR-0003: run each one by hand twice with correct results before scheduling it. Skip the deleted trading routine.

## Step 6. Rebuild the Pages

1. Rio creates the **Organization Office Floor** from [the exported source](pages/README.md) and restamps it from `org/roster.yaml`, with an as-of time.
2. Rio creates **HeadQuarters** (Live HQ) from its exported source. Its avatar and floor art were inline images and are not included. Regenerate them in the soft-clay desk-people style with walnut-office floors, or ask Clay Avatar Artist.
3. Rio mirrors the Floor into the **Virtual Office**.
4. Other Pages are reference reports. Recreate them only if Tishan asks.

## Step 7. Restore the task queue and repository rules

- The shared task queue lives in the repository's `os-queue/` folder (schema, validator, how-to). Only Tishan assigns tasks. Amanda writes the task file and wakes the assignee.
- GitHub changes go through pull requests that Tishan merges. `main` is protected with the `secret-scan`, `lint` and `tests` checks.

## Step 8. Verify

- Every seat answers a check-in (ADR-0002 format: status, blocker, next, as_of).
- The Floor, Virtual Office and HQ show the same roster.
- The morning brief arrives on a weekday.
- Nothing was sent, posted, bought, traded or deleted during the rebuild without Tishan's approval.

## Step 9. Fill the gaps

Read [gaps.md](gaps.md). Ask each agent, or Tishan, for what this kit could not capture.
