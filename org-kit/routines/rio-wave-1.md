# Rio's Wave 1 routines

Created by Rio on the night of Nov 1, 2026 after Tishan enabled all five (relayed by Amanda). Each passed two manual dry-runs first, as ADR-0003 requires. Times are Eastern and flexible by about 15 minutes. Format is text, not voice. Reminders are in-app messages, not calendar events.

| Routine id | Schedule | What it does | Recipient |
|---|---|---|---|
| `os-status-digest` | Weekdays about 8:15 AM ET | Read-only digest of the Floor roster, today's calendar and open blockers | Tishan and Amanda |
| `calendar-look-ahead` | Weekdays about 7:45 AM ET | Read-only look at upcoming events, conflicts and prep. No event writes | Tishan and Amanda |
| `weekly-connector-health` | Mondays about 9:30 AM ET | Read-only check of every connector; updates the Floor Connectors table with an as-of note | Floor plus summary |
| `weekly-chief-check-in` | Mondays about 10:00 AM ET | Sends the ADR-0002 check-in to each department chief and updates the Floor roster from replies | Chiefs; summary to Tishan and Amanda |
| `weekly-blocker-summary` | Fridays about 4:00 PM ET | Weekly summary of items waiting on Tishan, with no chasing beyond that | Amanda, for Tishan |

## Check-in message used by the chief check-in

```text
Weekly check-in. Reply with four lines:
status: Active | Onboarded | Blocked | On hold | Waiting on Tishan/Amanda | Other (name it)
blocker: none | one-line blocker
next: one-line next action
as_of: date and time (label the timezone)
Report only what is actually true. No invented updates.
```

## Notes for a rebuild

- Time Master was deleted on Nov 17, 2026. Remove it from the check-in list. Current chiefs: Mailroom, YouTube, Storage, Investments, plus the LinkedIn Director if Tishan wants.
- A missing reply leaves the prior status with "check-in pending". Never invent a status.
