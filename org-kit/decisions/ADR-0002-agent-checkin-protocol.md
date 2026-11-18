# ADR-0002: Agent check-in protocol (Stage 3)

Status: Accepted (Stage 3 kickoff)
Date: 2026-11-01
Owner: Rio
Oversight: Amanda

## Context

Floor Page statuses are write-time only. There is no verified live heartbeat API. Stage 3 needs honest as-of status from department chiefs without inventing telemetry or restructuring the org.

## Decision

1. **Cadence:** On-demand for now (Rio or Amanda requests a round). Optional routine later (Stage 5).
2. **Who reports:** Department chiefs to Rio (and Amanda as needed):
   - Time Master
   - Chief of Mailroom (rolls up Gmail + WhatsApp)
   - Chief of Youtube (rolls up Analyst + Script Writer)
   - Chief of Storage
   - Chief on Investments
3. **Channel:** `SendToAgent` with a short structured reply.
4. **Reply shape (required fields):**
   - `status`: one of Active | Onboarded | Blocked | On hold | Waiting on Tishan/Amanda | Other (name it)
   - `blocker`: none | one-line blocker
   - `next`: one-line next action
   - `as_of`: date/time or “now”
5. **Source of truth:** Rio updates Organization Office Floor roster from replies (as-of caption). Never fabricate busy/idle meters.
6. **Out of scope:** Silent reads of peer memory; Drive/Storage knowledge layout (Tishan hold); org chart changes.

## Consequences

- Status freshness = last check-in round timestamp on the Floor Page.
- Missing reply → leave prior status and mark “Check-in pending” in detail, do not invent.
