# Security

This repository is private. Private is not the same as safe to hold a secret.
Treat every push as a copy you may have to show to someone later.

## Never commit

- Passwords, tokens, API keys, private keys, certificates, or session cookies.
- `.env` files, credential files, or any filled-in copy of `.env.example`.
- Account numbers, card numbers, or bank, brokerage, mortgage, or credit data.
- Gmail or WhatsApp message content, including subjects, bodies, attachments,
  and exports.
- Personal contact details: private phone numbers, home addresses, and private
  email addresses.
- Agent private memory, scratchpads, prompts copied from a live session, or
  conversation exports.

`.env.example` may list variable names, commented out, with no values.

## If something leaks

Rotate first. Then purge history. Deleting the file in a follow-up commit is
not enough, because the value remains in the old commits.

1. **Stop publishing it.** Do not push further commits that still contain the
   material. Do not paste it into an issue, a pull request, chat, or email.
2. **Rotate first** when the leak is a credential. Revoke or replace the
   password, token, key, or session at the provider before cleaning git.
   Assume a pushed secret is already exposed, including on a private
   repository. Rotation comes before history cleanup so a rewrite cannot race
   a still-valid key.
3. **Tell Tishan** what kind of material leaked, which branches contain it,
   and whether rotation has started. Describe the kind of data. Do not repeat
   the secret, message body, account number, or memory contents.
4. **Purge history** after rotation (or immediately, when the leak is not a
   credential but is still prohibited data). Remove it from the working tree
   and rewrite history on every branch that contains it. `git filter-repo`,
   or an equivalent history rewrite, is the tool for that. A delete commit
   leaves the old blob reachable. Force-push the rewritten branch only with
   Tishan's approval, then replace any local clones. Ask Tishan before
   contacting GitHub to drop cached pull-request views.
5. **Confirm the purge.** A fresh gitleaks scan of the rewritten history, and
   a search such as `git log -S` for a non-secret marker you choose, should
   come back clean. Then open a new pull request from the clean branch.

If the leaked material is message content, contact details, financial data,
or agent memory, there may be nothing to rotate. Still tell Tishan, still
remove it from history, and still keep the content out of the incident notes.
