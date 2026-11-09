# Security & Information Protection Plan

**Source Page:** [Security & Information Protection Plan](https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/57a0c215-4a0d-4145-98a3-7e7c5b34687d)  
**Export note:** Sanitized markdown for git. No private financial records, credentials, or account contents. Account-control verification remains pending.

## Local fixes implemented — account protection verification pending

Your November 8 instruction to fix the findings authorized the bounded changes recorded here. Local validation and security-status wording are fixed and tested at their stated layers. No account setting, connector permission, Auto Review rule, credential, MFA, or recovery setting was changed. Existing trading live-OFF and exact-action approval holds remain; this is not an all-secure certificate.

## Remediation status — November 8

| Item | State | Evidence | What remains |
|------|-------|----------|--------------|
| Connected personal/financial accounts | Account verification pending | Connection status and Finance's six read-tool descriptions rechecked; published owner controls reviewed. No account-content calls. | Actual provider consent, privacy/training choices, approval rules, MFA/recovery, and encryption are not verified or changed. |
| Task input and lifecycle checks | Fixed and tested locally | A read-only checker and strengthened schema passed 55 synthetic local/CLI cases; the existing sample also validates in example-only mode. | Manual preflight, not automatic write-time enforcement. Direct file edits can bypass it. |
| Approval, provenance, and history | Platform limitation; local consistency improved | Checks reject inconsistent transitions, changed immutable fields, or history rewrites vs a supplied previous version. | Caller/approval labels and previous files are not authenticated. |
| HQ security status | Fixed; source-tested and published | Exactly three labels now say security is not monitored. | No GUI/visual test or incident-detection system was run. |
| Sensitive information handling | Procedure improved; enforcement not claimed | Queue guidance excludes raw personal/financial records; requires minimal summaries and separate verified approvals. | No secret scan, cleanup, export filter, or DLP service claimed. |
| Financial-sharing approval rule | Owner action needed | Official docs support narrow Ask first rules; proposal below. | Not installed. |

### Highest-value next account step
With you, verify current Auto Review and privacy controls, then provider consent and authentication/recovery metadata. Do not retrieve balances, transactions, holdings, payment credentials, or private messages merely to check settings.

### Proposed narrow Ask first rule — not installed
> Before sharing my personal financial information outside this chat, including sending it in email/messages, publishing it, or uploading an export or attachment to another service, ask me to approve the exact recipient, content and attachments.

## Connected accounts — metadata review (summary)

- Finance connector: six read tools (accounts/activity/holdings descriptions). Not proof that readable data cannot be copied.
- Robinhood is separate and may support eligible-account orders — live trading remains OFF.
- Gmail / Drive / X have send or write capabilities — exact-action approval required.
- Agents share one computer/filesystem; separate agent names are not strong isolation.
- Official docs: https://docs.x.ai/grok-bot/approvals-security-and-privacy · https://docs.x.ai/grok-bot/security · https://cursor.com/marketplace/cursor/finance

## Rules for valuable information

1. Secrets belong in approved secure storage (Vault / Secure Forms) — not Pages, source, tasks, memory, or logs.
2. Give agents the minimum useful information; prefer redacted excerpts and synthetic fixtures.
3. Check every outward boundary (recipient, content, attachments) before any approved send.
4. Keep only justified copies; no automatic destruction.
5. Back up carefully with verified access controls.

## Approval and completion gates

- Next verification: actual consent/settings review with the owner — not another queue test.
- Not included without separate approval: builds that change settings/logins, revocations, sharing, deletion, spending, agent reassignment, autonomous sends/purchases/trading.
- Completion requires evidence, not a reassuring label.

## Source basis
November 6 bounded OS assessment · November 7 CST connected-data metadata review · November 8 CST local remediation (55 synthetic validator/CLI cases). HQ changed only in three security-status labels.
