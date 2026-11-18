# Connectors

Services the org uses, and what each may do. No credentials, tokens, account names or account numbers appear here. Tishan connects each service himself.

| Service | Used by | Allowed | Not allowed without approval |
|---|---|---|---|
| Gmail | Mail Room, Amanda | Read, search, triage, drafts | Sending, forwarding, deleting |
| WhatsApp (web session) | Head of WhatsApp | Read named chats, drafts | Any send |
| Google Calendar | Amanda, Rio routines | Read, look-ahead | Creating or changing events, invites |
| Google Drive | Storage, Executive, YouTube | Read, organize after approval | Deleting or overwriting |
| TubeAlfred (YouTube research) | YouTube Analyst | Public channel, video, comment and transcript research | Spending credits without a plan |
| GitHub | Amanda, cloud agents | Branches, pull requests, issues | Merging to `main` (Tishan only), new repositories |
| Cursor Origin | Rio, cloud agents | Code hosting for agent work | New repositories without approval |
| Robinhood | Chief on Investments | Read context only | Any order, test order, transfer |
| Finance (read-only aggregator) | Chief on Investments, Amanda | Read-only account context, shared only with Tishan | Anything that moves money |
| X | Amanda, research | Public reads | Posting as Tishan |
| LinkedIn | None (no connector) | Tishan acts natively | Automation, scraping, cookies |

Connector health is checked every Monday by `weekly-connector-health` and recorded on the Floor's Connectors table.
