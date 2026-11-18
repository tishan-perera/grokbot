# Routines

Scheduled work, last known state as of Nov 18, 2026. Rules for any routine come from ADR-0003: automate only a workflow that has run correctly by hand at least twice, name the recipient, say what happens when there is nothing new, and pause after repeated sign-in failures.

| Routine | Owner | Schedule | Recipient | Last known state |
|---|---|---|---|---|
| [weekday-morning-executive-brief](weekday-morning-executive-brief.md) | Amanda | `CRON_TZ=America/New_York 0 8 * * 1-5` (7:00 AM CT) | Tishan | Active |
| [os-status-digest](rio-wave-1.md) | Rio | Weekdays about 8:15 AM ET | Tishan and Amanda | Created Nov 1–2; verify still enabled |
| [calendar-look-ahead](rio-wave-1.md) | Rio | Weekdays about 7:45 AM ET | Tishan and Amanda | Created Nov 1–2; verify still enabled |
| [weekly-connector-health](rio-wave-1.md) | Rio | Mondays about 9:30 AM ET | Floor Connectors table | Ran Nov 16, 2026 |
| [weekly-chief-check-in](rio-wave-1.md) | Rio | Mondays about 10:00 AM ET | Chiefs, then Floor, Tishan, Amanda | Ran Nov 16, 2026 |
| [weekly-blocker-summary](rio-wave-1.md) | Rio | Fridays about 4:00 PM ET | Amanda, for Tishan | Created Nov 1–2; verify still enabled |
| [weekday-gold-fundamentals](weekday-gold-fundamentals.md) | Gold Fundamentals | Weekdays about 7:00 AM ET | Tishan | Active |

## Deleted routines (do not recreate)

- Amanda's hourly trading routine. Deleted Nov 17, 2026 with the Trading Department.
- Gold Fundamentals' temp-seat end-of-day routine. Deleted Nov 11, 2026 when the seat became permanent.

## Manual cadences that are not routines

- LinkedIn content: a Sunday batch of five ready-to-paste posts for Tishan's approval. He schedules them in LinkedIn.
- LinkedIn Department Director: weekly report to Amanda.
