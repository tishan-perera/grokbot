# ADR-0001: Knowledge & ADR home

Status: Proposed-pending-Tishan
Date: 2026-11-01
Owner: Rio (AI Systems Architect & Lead Developer)
CoS note: Amanda — interim ADRs in Rio store `/adrs` only; do not loop Storage on Drive shared knowledge yet (Tishan hold on Storage work).

## Context

Personal AI OS needs a place for architecture decision records and durable shared knowledge. Google Drive is connected; Origin has no namespaces yet. Tishan has a hold on Storage folder work.

## Interim decision (Amanda CoS, pending Tishan)
- **ADRs / OS engineering notes:** Rio’s persistent store under `adrs/` only.
- **Shared Drive knowledge with Storage:** Deferred — do not start until Tishan lifts the Storage hold.
- **HQ UI:** Organization Office Floor is Stage 2 source of truth; sibling HQ Dashboard is archive reference only.

## Full proposal (awaits Tishan)
- ADRs in Rio store `/adrs`
- Optional later: Drive for shared org knowledge under Chief of Storage after hold lifts
- Origin repo optional when namespaces exist

## Consequences

- No custom database invented.
- No Storage coordination on knowledge layout until Tishan says go.
