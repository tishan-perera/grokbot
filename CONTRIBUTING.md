# Contributing

Agents propose changes. Tishan Perera approves them. Nothing merges to `main`
without his approval, including documentation, CI, and dependency updates.

## Branch naming

Branch from `main`:

```text
type/short-description
```

Use a short, lowercase description with hyphens. Types:

- `feat` — a new capability or role artifact
- `fix` — a defect
- `docs` — documentation only
- `ci` — workflows and checks
- `chore` — scaffolding, tooling, or dependency updates
- `test` — tests only

Examples: `docs/security-rotation`, `feat/os-queue-validator`,
`fix/mailroom-routing`.

An automated tool that requires its own prefix may add one, as long as the
rest of the name still says what the branch changes.

## Commit messages

Use a short imperative subject, optionally with a type and scope:

```text
type(scope): subject
```

- Subject is imperative and has no trailing period.
- Scope is optional (`org`, `hq`, `os-queue`, `ci`, `docs`).
- Body, when needed, explains why. Wrap it so it stays readable.
- One logical change per commit when you can.

Example: `docs(security): describe rotation before history purge`.

## Pull requests

Open a pull request against `main` and complete
[the template](.github/pull_request_template.md).

Checklist:

- [ ] Linked issue, or a sentence explaining why there is no issue.
- [ ] What and why are filled in.
- [ ] How it was tested is filled in, including commands.
- [ ] Data-safety checklist is complete.
- [ ] The diff and the new commits contain no secrets, message content,
      contacts, financial data, or agent private memory.
- [ ] CI is green: `secret-scan`, `lint`, and `tests`.
- [ ] The pull request is ready for Tishan. Agents do not merge it.

`.github/CODEOWNERS` requests a review from `@tishan-perera` on every path.
Another agent's review does not replace that approval.

## Issues

Use a form under `.github/ISSUE_TEMPLATE/`:

- **Task** for planned work.
- **Bug** for something that is already wrong.
- **New hire / role request** for a new seat or a change to a role.

Blank issues are disabled. Do not put secrets, message content, contacts,
financial data, or private memory in an issue.
