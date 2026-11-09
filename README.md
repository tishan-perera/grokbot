# Personal AI Operating System

Private, version-controlled copy of Tishan Perera's Personal AI Operating
System. The live assistants stay in their own tools. This repository is the
org chart, the operating rules, and the shared scaffolding those assistants
change through pull requests.

## What this organization is

A multi-agent organization. The owner sets direction. Amanda runs the
organization day to day. Department chiefs take work from Amanda and hand it
to staff. Staff do the specialist work and write proposals back up the chain.

The repository holds role definitions, operating rules, and shared tooling.
It does not hold live inboxes, brokerage sessions, or anyone's private memory.

## How it works

Authority runs in one direction:

1. **Owner.** Tishan Perera. Sets goals and is the only person who approves a
   merge to `main`.
2. **Chief of Staff / COO.** Amanda. Sits under the owner. Routes work, keeps
   the departments aligned, and speaks for the organization as a whole.
3. **Department chiefs.** Accept work from Amanda and assign it inside their
   department. A chief seat that has no name yet stays empty until a role
   request is approved.
4. **Staff.** Specialists who execute on one desk and report to their chief.

### Departments and seats

**Finance.** Investments, Trading, Playbook / Backtester, Gold research, and
Credit. The finance chief seat is not named yet.

**YouTube.** YouTube Chief, with Script Writer, YouTube Analyst, and YStudio.

**AI Ops.** Rio (architect / developer), Chief Design Engineer, OS Tester, and
Clay Avatar Artist. A separate department-chief seat is not named yet.

**Ground floor.** Mailroom, Storage, and Time Master. Mailroom has two heads:
Gmail and WhatsApp.

## Repository map

- `README.md` — this overview.
- `SECURITY.md` — what must never be committed, and what to do if it is.
- `CONTRIBUTING.md` — how a change is proposed.
- `CHANGELOG.md` — notable changes.
- `LICENSE` — proprietary notice. All rights reserved, Tishan Perera.
- `.env.example` — commented variable names only. Never fill in values here.
- `.github/` — code owners, issue forms, the pull request template, CI, and
  Dependabot.
- `scripts/lint_structured.py` — YAML, JSON, and scaffold checks used by CI.
- `org/` — roster, reporting lines, and roles. Those files are not written yet.
- `departments/` — department desks.
- `hq/` — the owner and Amanda operating layer.
- `os-queue/` — the shared work queue. Validator tests will live in
  `os-queue/tests` when the queue exists.
- `docs/` — runbooks and decisions that are safe to version.
- `design/` — design notes for the operating system and the Clay avatar.

## How changes flow

Nothing reaches `main` without Tishan's approval. Agents propose. Tishan
approves.

1. Open an issue. Use the task, bug, or new-hire / role-request form. Blank
   issues are disabled.
2. Branch from `main`. Name it `type/short-description` (see
   [CONTRIBUTING.md](CONTRIBUTING.md)).
3. Open a pull request. Fill in the template, including the data-safety
   checklist.
4. Wait until CI is green. The check names are `secret-scan`, `lint`, and
   `tests`.
5. Tishan reviews and approves. Only then may the pull request merge.

## What never goes in this repo

- Passwords, tokens, API keys, private keys, or a `.env` file that has values.
- Account numbers, card numbers, or bank, brokerage, mortgage, or credit data.
- Gmail or WhatsApp message content, attachments, or exports.
- Personal contact details, including private phone numbers, home addresses,
  and private email addresses.
- Agent private memory, scratchpads, or conversation exports.
- Raw audit dumps and large media exports.

If any of that lands in git, follow [SECURITY.md](SECURITY.md). Rotate a
leaked credential first, then purge history. A new commit that deletes the
file leaves the secret in the old commits.
