# Operating model

## Chain of command

Tishan (owner) sets strategy and approves. Amanda (Chief of Staff & COO) runs the org. Department chiefs take work from Amanda and hand it to their staff. Staff do the specialist work and report up the chain. Seats talk to each other through Amanda unless Tishan opens a seat's chat directly.

## Seat states

| State | Meaning |
|---|---|
| Working | Active on its mandate |
| Waiting | Stood down or idle |
| Waiting · Parked | Stood down until a named order from Amanda or Tishan |
| Blocked-on-owner | Waiting for a specific Tishan decision |
| Pending | On the org picture but not hired (Credit) |
| Closed | Shut down; not current staff |

## Status flow (ADR-0004)

1. A hire, fire, park or teach happens with Tishan's approval.
2. Amanda stamps the Organization Office Floor with an as-of time.
3. Rio mirrors the Virtual Office and Live HQ the same day.
4. Statuses are never shown as live unless someone reported them.

## Weekly rhythm

- Weekdays: Amanda's morning executive brief; Gold Fundamentals' brief; Rio's digest and calendar look-ahead.
- Monday: chief check-in (ADR-0002) and connector health.
- Friday: blocker summary to Tishan through Amanda.
- Sunday: LinkedIn post batch for approval.

## Task queue (Option A)

The shared task queue in the repository's `os-queue/` folder is the source of truth for tasks. Only Tishan creates or assigns tasks. Amanda writes the task file and wakes the assignee. Assignees update status on their own tasks. The validator checks data shape only; it never proves approval.

## Building the OS

Work on Live HQ, Floor or Virtual Office follows: written business need, Amanda build order, Lex or Rio builds, OS Tester Pass 1 and Pass 2, Amanda park-confirm, Rio stamps. Visual style lock: soft-clay mini desk people and walnut-office floors.

## Code

Repository work goes to cloud agents that open pull requests. Tishan reviews and merges. Synthetic data only in public projects.
