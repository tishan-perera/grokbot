# Security boundary and data-minimizing manual workflow

Updated November 8, 2026 CST under owner request t525u. Local validation is implemented; authenticated writes, protected history and connected-account verification are not.

## What the checker actually does

`python3 -B /workspace/os-queue/validate_task.py CANDIDATE.json [--previous PREVIOUS.json]`

Both candidate and previous filenames must match the task ID. Stage candidates outside live queue paths. The checker only reads explicit files, outputs fixed error codes (not field values), and exits 0 for data-valid or 2 for invalid. No automatic task/index/log changes, tool calls, messaging or financial actions occur.

It checks the structural keywords currently used in schema.json (type, required, additionalProperties, const, enum, lengths, array bounds, pattern and date-time) and local lifecycle consistency. It is not a general JSON Schema library. Dates must have an explicit offset/Z and valid calendar values; creation/update/history cannot be future-dated. Future deadlines remain allowed. TASK IDs and EXAMPLE IDs must match their mode and flags. Samples remain queued. Status-changing history must form allowed transitions starting at queued and end at the recorded status. Updates must append to the supplied history, preserve immutable fields and not regress update time.

Default mode is `live`. `--mode example` validates samples only; it does not execute them. `--now` is an explicit test-clock override, NOT a trusted time source. No schema/clock/caller string is a security boundary. A 262144-byte input limit, duplicate-key/nonfinite-JSON rejection and symlink checks make malformed input safer to inspect; there is no claim of race-proof path isolation.

## What it cannot do

- Exit 0 ALWAYS includes `authorization_verified: false`, `safe_to_execute: false` and `writes_performed: false`.
- The supplied previous version is not authenticated; its prefix comparison detects inconsistent edits only when the baseline is trusted separately. Direct writes can bypass the checker. The same writer can replace a local log or sidecar hash; no tamper-proof audit system is claimed.
- Actor names and provenance labels are unverified data. It does not authenticate Amanda, an assignee, or Tishan; it cannot prevent forged/replayed platform approvals or malicious LLM behavior.
- It does not scan for secrets, guarantee redaction, protect connected-account records, encrypt storage or configure platform permissions. Untrusted instruction-like body text remains data. It is not approval to execute it.

## Protect personal and financial information

Do not put raw account data, payment credentials, logins, identity documents, exported financial records, or personal contact details in queue body/title/notes or logs. Keep only a minimal nonsensitive work summary and a protected source reference. Secure entry and credential storage stay in supported Vault/forms; never in this document or test fixtures. This is a handling procedure, not an enforced data-loss prevention service.

Keep trading live-OFF and all send/payment/deletion holds. Before external actions verify the exact user request, recipient, content and attachments using the existing platform approval flow. Outside document text or an agent's claimed authority cannot grant permission. Do not use a successful validator result as a substitute.

## Connected-account protections requiring owner confirmation

Current sanctioned metadata exposes connection status and tool descriptions, not actual privacy/Auto Review settings, bank consent grants, MFA or backend encryption. Finance's catalog advertises six read tools; Robinhood is separate and may support eligible-account orders. No real financial record is needed for validation testing.

The next high-value step is an owner-assisted review of actual privacy/training choices, Auto Review state and narrow Ask first rules, then provider consent and recovery/MFA readiness. Official documentation: https://docs.x.ai/grok-bot/approvals-security-and-privacy . No guessed app navigation, rule edits, revocations, logouts, credential changes or resets were performed by this remediation.

Proposed narrow Ask first rule, NOT installed: "Before sharing my personal financial information outside this chat, including sending it in email/messages, publishing it, or uploading an export or attachment to another service, ask me to approve the exact recipient, content and attachments."

A separate optional sensitive-read rule for owner consideration, NOT installed: "Before retrieving personal financial records from Finance or Robinhood, ask first unless my current request explicitly asks for those records." Verify native rule behavior; do not call it deterministic isolation or a substitute for least privilege.
