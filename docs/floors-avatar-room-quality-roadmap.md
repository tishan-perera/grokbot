# Floors avatar & room quality roadmap

**Source Page:** [Floors avatar & room quality roadmap](https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/20185606-f222-454b-9455-9aa6e0b7c902)  
**Status:** Planning only · HQ unchanged · **parked** per owner (Nov 9) pending GitHub org setup.

## Scope
Improve avatar crispness and room backgrounds on the Floors section only. Keep layout, topbar, People, Activity, Organization, roster, status, reporting, history, and the four truthful notices unchanged. Implementation needs a separate owner authorization after plan acceptance.

## Verified baseline (inspected Nov 8 2026)

| Item | Verified now |
|------|----------------|
| HQ revision | 6b8310ee (Org top-down candidate) |
| Scene sprite render | 68×104 px in floorsView |
| Side panel detail | 84×128 |
| CLAY_BODY_HD embeds | 19 WebP · width 60 · height 89–96 (sheet crops) |
| Larger transparent PNGs on disk | ~105–110 × 158–172 RGBA (not currently embedded) |
| ROOM_ART slot | empty |
| Notices | Snapshot · not live · Security not monitored · Live trading off · Sync disabled |

**Quality gap:** Floors currently upscales ~60×90 WebP into 68×104 / 84×128 slots. Do not promise “upscale the sheet crops.” Require native masters.

## Milestone gates
0 Baseline freeze → 1 Style guide → 2 Asset spec → 3 Finance 5-seat pilot → 4 Owner review (hard stop) → 5 Full production (19 people · 5 empty rooms) → 6 Layer integrate → 7 Device QA → 8 Staged rollout + rollback.

## Proposal roles (labels only — not assigned)
- Clay Avatar Artist — native soft-clay fullbodies + empty rooms
- Rio — ROOM_ART + CLAY_BODY_HD integration
- OS Tester — desktop/phone/a11y/regression
- Amanda — coordinate gates
- Tishan — accept / revise / stop

## Out of scope
No HQ edits from this plan alone · no art generation from this page · no roster/status/reporting/history changes · no portrait swap outside Floors without separate approval · not a resume of a cancelled rebuild.
