# ADR-0003: Automation principles (Stage 5)

Status: Accepted for Wave 1 (Amanda relay Nov 1 ~9:58 PM ET; live routines pending dry-run + confirm cards). Beyond Wave 1: Proposed.
Date: 2026-11-01 (9:55 PM ET)
Owner: Rio · Oversight: Amanda

## Context

Stage 4 accepted. Stage 5 adds recurring reports, task workflows, PA capabilities, voice and calendar/reminder integrations. Stage 3 check-ins (ADR-0002) show every department chief has a human blocker (Time first-focus; Mailroom money/security; Youtube credits/premise; Storage Phase 0 Drive approve; Investments brokerage). Floor statuses are write-time only; no heartbeat API exists.

## Building blocks verified this pass
- Routines (UpdateRoutine): cron schedule (user-local, min 5 min apart, weekday/daytime default) or event listeners (Slack, GitHub, Origin, Teams, Linear, Sentry, PagerDuty, email-to-bot-inbox, webhook, groups). Not created yet.
- Google Calendar MCP (15 tools): list/search/get events, check_availability, suggest_time, create/update/delete events (single + batch), respond_to_event, per-event email/popup reminders.
- Voice skill: voice memos (SendToUser voice_memo) and live-call relays from a voice agent. No always-on wake word or phone-reminder API found.
- SendToAgent check-ins (ADR-0002); Pages as SoT (EditCanvas).

## Decision

1. Automate only a workflow that is reliable: it has run manually ≥2 times with a correct result and has no open human blocker.
2. External sends (email, WhatsApp, Slack, public posts) are draft-only; a human sends.
3. Organization Office Floor stays SoT; automations write as-of statuses, never fake heartbeats or invented counts.
4. Ask Amanda/Tishan before destructive, public, money, or security-major actions; calendar writes that invite others need explicit OK.
5. Cadence: least frequent useful; weekdays ~8am–7pm ET; quiet hours 10pm–7am.
6. Every routine names its recipient and its "nothing new" behaviour; auth failures pause it after a repeat.

## Wave 1 (recommend after Amanda/Tishan OK)
- Weekday morning OS status digest (read-only: Floor + calendar today + open blockers) to Amanda/Tishan in Grok Bot.
- Weekly chief check-in round per ADR-0002 → Floor roster edit with as-of.
- Weekly connector health check (read-only probes) → Floor Connectors table.
- Daily calendar look-ahead (read-only) with conflicts/prep flags; no event writes.
- Blocker nudge: weekly summary of the 5 Tishan blockers (no chasing beyond that).

## Later waves (gated)
- Time Master focus-block creation (after first-focus pick + calendar-write OK).
- Mailroom triage digests incl. bills/security (after unpark).
- YouTube analytics refresh (after TubeAlfred credits + premise).
- Storage Drive housekeeping (after Phase 0 approve; never loop Storage on Drive).
- Investments monitoring (after brokerage connect; Finance needsAuth).
- Voice: memo-format digests on request; live-call PA after Tishan decides.

## Consequences

No live routines until accepted. Department automation follows blocker clearance, not schedule.
