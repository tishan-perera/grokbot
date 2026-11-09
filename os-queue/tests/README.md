# OS Queue validator tests

## Run (from repo root after unpack)

```bash
python3 -B os-queue/tests/test_validator.py
```

The harness imports `os-queue/validate_task.py` and `os-queue/schema.json` relative to the `os-queue/` directory. It runs **55 synthetic local/CLI cases** (no live tasks, no connectors, no network).

Expected: all cases pass; every successful validation still reports that authorization is not verified and the payload is not safe to execute (see `SECURITY.md`).

## What was excluded
- Live `tasks/*.json` other than `EXAMPLE-001.json` (none were open; still excluded on principle).
- Inbox wake drops and history files that could carry personal/financial notes.
- Probe results / native account metadata dumps from `/workspace/audit/security-*`.

## Reference
`validator-test-results.reference.json` records the Nov 8 2026 remediation run: 55 unique cases, 55 passed.
