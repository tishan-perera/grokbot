// Grokbot Page export · title: Grok Bot System — GitHub Setup & Update Plan · canvas_id: 6f59b3d0-fc10-4248-b33e-ba072bfa274f · last updated 2026-11-06
// Inline base64 images stripped: 0. Private details replaced with [private ...] placeholders.
// Recreate by pasting this source into a new Page (Cursor canvas, React/TSX).
import { Page, Section, Text, TableOfContents, Table, Callout, NumberedList, Steps, Properties } from "grok/canvas";

export default function App() {
  return (
    <Page title="Grok Bot System — GitHub Setup & Update Plan" summary="Approval blueprint: one private operating manual, a verified system register, and a controlled update process. Proposed standards only—not a completed inventory or a live backup." width="column">
      <TableOfContents items={[
        { label: "1. Purpose and starting position", id: "purpose" },
        { label: "2. What belongs—and what stays out", id: "scope" },
        { label: "3. A simple repository structure", id: "structure" },
        { label: "4. Proposed accountability", id: "owners" },
        { label: "5. Setup in approval-gated phases", id: "setup" },
        { label: "6. Regular updates without noise", id: "updates" },
        { label: "7. Review and publishing controls", id: "controls" },
        { label: "8. Practical recovery", id: "recovery" },
        { label: "9. Ready-to-start decisions", id: "decisions" }
      ]} />

      <Section heading="1. Purpose and starting position" id="purpose">
        <Callout lead="Recommendation">Propose a private GitHub repository named `grokbot-system`: the operating manual, current verified snapshot, dated decisions, and recovery instructions for Tishan’s system.</Callout>
        <Text>The live Grok Bot app remains the actual operating state. GitHub records approved facts; editing a document does not change a bot, permission, connector, or routine. This Page is the revisable approval blueprint, not a second ongoing system register.</Text>
        <Properties items={[
          { label: "Planning basis", value: "Conversation context as of Nov 6, 2026 (ET); no fresh system audit." },
          { label: "GitHub", value: "Account tishan-perera was verified connected Nov 2, 2026 (ET). Not reverified today; no destination repository selected." },
          { label: "Known boundaries", value: "Chief of Storage reports to Amanda; Rio handles architecture. OLD METHOD must always remain untouched." },
          { label: "Unverified coverage", value: "Full bot roster, instructions, routines, connector scopes, project links, and permitted export availability still require validation." }
        ]} />
      </Section>

      <Section heading="2. What belongs—and what stays out" id="scope">
        <Table columns={["Include", "Exclude"]} rows={[
          ["Essential non-secret system knowledge: approved roles, procedures, boundaries, dependencies, and permitted exported configuration.", "Hidden/internal platform instructions; raw whole-store exports."],
          ["Sanitized configuration summaries, decisions, safe references, and approved deliverable links.", "Passwords, tokens, cookies, .env files, vault entries, payment details."],
          ["Project purpose, architecture, owner, and approved links to existing code repositories.", "Duplicated project codebases, large Drive media, raw mail/chat dumps."],
          ["Storage policy and access-controlled pointers, only when safe to disclose.", "Personal receipts or sensitive financial, medical, or identity records."]
        ]} />
        <Text>A private repository is not a vault. Keep original records and media in their approved locations; never widen Drive access to make a link work. Public sharing requires separate approval later.</Text>
      </Section>

      <Section heading="3. A simple repository structure" id="structure">
        <Table columns={["Path", "Coverage"]} align={["start", "start"]} rows={[
          ["README.md", "Start here: purpose, map, coverage status, how to request a change, and how to recover."],
          ["system/", "Goals, organization, reporting lines, governance, and manifest.yaml: a small current index of stable record IDs, paths, owners, and verification status."],
          ["bots/<stable-id>/", "One profile per bot: role, reporting line, remit, owner-approved instructions and boundaries, dependencies, and linked approved deliverables."],
          ["workflows/", "Approved operating procedures and user-authored skills; record prerequisites, permitted actions, and expected result."],
          ["routines/", "Saved prompt, schedule or trigger, America/New_York timezone (ET), purpose, intended result, dependencies, and last verified date."],
          ["connectors/", "Connector names, non-secret account aliases, access scope, dependent bots, and verification status; no credentials."],
          ["projects/", "Business/technical project and architecture index: owners, dependencies, and approved links to existing repositories. Code stays there."],
          ["storage/", "Drive location index and filing policy: DROP - New Uploads, GROKBOT METHOD, and OLD METHOD’s permanent do-not-touch rule."],
          ["history/", "Dated sanitized decisions, change log, and pending-change register with approval and publication status."],
          ["runbooks/", "Access checks, validation, troubleshooting, and manual recovery sequence with explicit limits."]
        ]} />
        <Text>Every record carries a stable ID, source reference and source version when available, accountable owner, approval reference, status, and last-verified timestamp in ET. Use “unknown—not yet verified” rather than filling gaps. Distinguish verification time from document edit time.</Text>
        <Text>Retire bots by marking their profile retired, with effective date and decision reference; preserve their history. Keep one canonical record per fact and link to it elsewhere.</Text>
      </Section>

      <Section heading="4. Proposed accountability" id="owners">
        <Table columns={["Role", "Proposed responsibility"]} align={["start", "start"]} rows={[
          ["Tishan", "Approves scope, access, baseline acceptance, and publication/merge decisions."],
          ["Storage", "Maintains the consolidated index, pending register, and sanitized history; assembles batches."],
          ["Amanda", "Validates organization, reporting lines, and governance."],
          ["Rio", "Validates architecture, technical dependencies, and recovery feasibility."],
          ["Relevant bot", "Supplies and validates its own permitted facts and source references."]
        ]} />
        <Text>These are proposals, not assignments made today. Storage must not assume visibility into every agent’s schedules or configuration, or that bots automatically report changes. Collect only from sanctioned permitted sources and approved contributions. Track each area as verified, partial, or unavailable, with the missing source and responsible owner.</Text>
      </Section>

      <Section heading="5. Setup in approval-gated phases" id="setup">
        <Steps steps={[
          { title: "Phase 1 · Approve the boundary", detail: "Tishan approves the repository name, private visibility, initial content, permitted sources, access, and review model. Planning does not authorize GitHub reads or writes." },
          { title: "Phase 2 · Establish the destination", detail: "After explicit approval, Tishan creates an empty private GitHub repository through GitHub’s normal workflow and supplies its URL. The current Cursor path cannot create GitHub repositories. Confirm the exact URL, account access, and intended visibility before any repository work." },
          { title: "Phase 3 · Collect the permitted baseline", detail: "With approved read scope, gather user-approved roles, routines, workflows, connector summaries, storage policies, and project references. Sanitize first; record unknowns and source coverage. Do not export a whole agent store." },
          { title: "Phase 4 · Propose the first records", detail: "With separate authorization for repository-content work, use sanctioned cloud work—not a local clone—to prepare a branch and pull request: a reviewable set of proposed edits before the main record changes." },
          { title: "Phase 5 · Validate and accept", detail: "Proposed validators check their areas; Tishan accepts the baseline and explicitly approves its merge. Verify the published files and commit, and record remaining gaps rather than claiming a complete inventory." },
          { title: "Phase 6 · Enable maintenance", detail: "Only after baseline acceptance and separate cadence approval, enable the chosen update routine. No schedule or automation is enabled by this plan." }
        ]} />
        <Text>Acceptance means the entry point works, approved scope is covered or visibly marked incomplete, sources and verification dates are recorded, sensitive content is excluded, and recovery instructions are understandable.</Text>
      </Section>

      <Section heading="6. Regular updates without noise" id="updates">
        <Properties items={[
          { label: "Proposed cadence", value: "One batched review each weekday around 5 PM ET, using America/New_York so daylight saving changes are handled." },
          { label: "Friday", value: "The same run adds deeper weekly reconciliation of bot/routine coverage, stale records, unresolved gaps, and pending decisions—not a second duplicate run." },
          { label: "Lower-resource start", value: "Optional Friday-only review around 5 PM ET until the volume of real changes warrants weekday reviews." },
          { label: "Existing DROP watch", value: "Reported Monday around 9 AM ET watch remains separate and unchanged; its current settings were not audited today." }
        ]} />
        <NumberedList items={[
          "Gather approved change contributions and check authorized sources. Major owner-approved changes enter the pending register with source, approval, affected records, and effective date.",
          "Recheck current status before publishing; distinguish a proposal from an implemented app change. Flag unavailable sources instead of guessing.",
          "Deduplicate by stable IDs and source versions; compare actual content with the accepted record. Skip no-change writes and routine verification-only churn; retain check results in the run record.",
          "Prepare one consolidated documentation change per material batch, not a commit for every status ping. Under the initial model, draft locally in the review context; publish the branch/pull request only with the required explicit approval.",
          "Send Tishan one concise review request or actionable blocker in this chat. Stay quiet when nothing material changed. Approved publication and merge are separate from operational changes."
        ]} />
        <Text>Possible later enhancement: supported GitHub listeners for repository-side review/merge events. Watching GitHub cannot detect in-app bot changes; approved contributions and permitted source checks are still necessary.</Text>
        <Text>No background posting, writing, or merge authority is inferred. A future narrowly scoped documentation-only standing rule must be explicit in Tishan’s own words, naming the destination, allowed records, exclusions, and review/merge limits. Operational and permission changes never follow automatically from documentation edits.</Text>
      </Section>

      <Section heading="7. Review and publishing controls" id="controls">
        <NumberedList items={[
          "Before publication: scan for secrets and sensitive information, review link/reference safety and access, and compare included bot/routine records against the authorized inventory—not an assumed roster.",
          "Check source provenance, dates, approvals, and the sanitized change log. Escalate conflicting facts to the accountable owner; never invent a resolution.",
          "Confirm the exact destination, branch, changes, review status, and required checks. After an authorized merge, read back the destination and commit status before reporting success.",
          "Recommend protected main with owner review and secret scanning where available; confirm availability and approval before configuration. Neither is configured by this plan.",
          "No force pushes, rewritten history, or deletions. Correct mistakes through a new reviewable change; preserve the decision trail.",
          "On failure, report a concise blocker, affected scope, and last confirmed state. Check whether the prior action succeeded before retrying; avoid blind duplicate writes."
        ]} />
      </Section>

      <Section heading="8. Practical recovery" id="recovery">
        <Steps steps={[
          { title: "Find the last accepted record", detail: "Start with README, the manifest, and the last approved commit. Identify which facts were verified and which are stale or unavailable." },
          { title: "Check access and dependencies", detail: "Use approved account connections and safe storage references; recover protected credentials only through approved credential processes, never from the repository." },
          { title: "Rebuild only with separate approval", detail: "Use the runbooks to guide manual recreation of permitted roles, instructions, connectors, and routines. Verify live behavior and record differences before treating recovery as complete." }
        ]} />
        <Text>Propose a lightweight monthly tabletop: walk through recovering one representative bot and routine on paper, check references, and record gaps. No actual recreation or app changes without separate approval.</Text>
        <Callout tone="info" lead="Documentation, not automatic restore">The repository cannot restore sessions, a vendor’s service, inaccessible configurations, or protected credentials. Permitted exports may help, but full automatic app backup/restore is not promised.</Callout>
      </Section>

      <Section heading="9. Ready-to-start decisions" id="decisions">
        <Table columns={["Decision", "Proposed default"]} align={["start", "start"]} rows={[
          ["Name and visibility", "grokbot-system; private; access limited to explicitly approved people/integrations."],
          ["Initial scope", "All essential non-secret system records in the structure above, collected in stages; no project-code duplication or private source-data archive."],
          ["Update cadence", "Weekday batch around 5 PM ET; Friday reconciliation in that same run. Friday-only is the lower-resource alternative."],
          ["Approval model", "Prepare proposed updates; Tishan approves publication scope and each merge. No automatic write/merge standing authority."],
          ["Starting dependency", "Approve scope first; then create the empty private GitHub destination and confirm its URL/access before baseline work."]
        ]} />
        <Text>Plan only; nothing created/scheduled/changed in GitHub. No GitHub reads, pulls, clones, cloud launches, teammate outreach, app changes, or routine changes were performed. Only this requested planning Page was created.</Text>
      </Section>
    </Page>
  );
}
