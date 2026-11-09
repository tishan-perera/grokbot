# hq

Operating layer for the owner, Tishan Perera, and for Amanda, Chief of Staff
and COO.

Amanda routes work between departments and brings proposals to Tishan.
Decisions that change `main` wait for his approval. This folder holds
operating notes that are safe to version. It is not a place for private
memory, inbox exports, or financial records.

## HQ Page source (snapshot)

**Page id:** `6f83abe1-5a09-430d-8ca9-e402345351b1`  
**URL:** https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/6f83abe1-5a09-430d-8ca9-e402345351b1  
**Source revision captured:** `6b8310ee` (Organization top-down rebuild, Nov 8 2026)  
**Roster / Floor stamp:** ~3:32 PM ET Nov 5, 2026 — **not live**, not restamped.

## What this file is
`HQ.canvas.tsx` is a sanitized export of the HeadQuarters Page source for version control. It includes People, Floors, Activity, and Organization views, clay avatar embeds, and the frozen AGENTS / ORG_PARENT / ACTIVITY_RAW datasets.

## Stale data
Treat all statuses, tasks, activity rows, and counts as a historical snapshot. Do not present this file as a live feed. Manual sync stays disabled in the UI.

## Sanitization applied for this import
- Mail Room Chief task string: payment due notice with card brand and dollar amount **redacted**.
- No passwords, tokens, account numbers, mortgage details, email addresses, phone numbers, or private memory were included.
- Agent chat UUIDs remain as operational deep-link ids (not credentials).

## How to use
- Review diffs in PRs; do not paste secrets into this file.
- Rebuilds of HQ should keep People/Floors appearance unless the owner authorizes a change.
- Floors quality improvements are parked (see `docs/floors-avatar-room-quality-roadmap.md`).
