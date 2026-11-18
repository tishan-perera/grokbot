// Grokbot Page export · title: CoS/COO Audit & Roadmap · Nov 5 2026 · canvas_id: b4b1fc26-672b-47d2-825f-95883b8bfecc · last updated 2026-11-05
// Inline base64 images stripped: 0. Private details replaced with [private ...] placeholders.
// Recreate by pasting this source into a new Page (Cursor canvas, React/TSX).
import {
  Page,
  Section,
  Text,
  TableOfContents,
  Callout,
  Table,
  Properties,
  Checklist,
  NumberedList,
  Steps,
  Bars,
  Diagram,
  LinkCards,
  Status,
  Divider,
  BackToTop,
} from "grok/canvas";

export default function App() {
  return (
    <Page
      title="CoS/COO Audit & Roadmap · Nov 5 2026"
      summary="Amanda’s self-assessment, Floor-truth org audit, usage reality, and three-phase improvement roadmap. Audit and recommend only — no org changes until Tishan approves."
      width="column"
      sources={[
        "Floor SoT ~9:54–9:57 AM ET Nov 5 2026 (walk soft bugs park)",
        "CheckSubscriptionUsage ~noon ET Nov 5 2026",
        "Owner CoS/COO master directive ~11:58 AM ET Nov 5 2026",
      ]}
    >
      <TableOfContents
        items={[
          { label: "Honest takeaways" },
          { label: "Owner ask & constraints" },
          { label: "Amanda self-assessment" },
          { label: "Org snapshot (Floor SoT)" },
          { label: "Department-by-department audit" },
          { label: "Resource / usage reality" },
          { label: "Outstanding owner decisions" },
          { label: "Phase 1 — Immediate" },
          { label: "Phase 2 — Operational" },
          { label: "Phase 3 — Long-term" },
          { label: "Decisions requested from Tishan" },
          { label: "What Amanda starts without waiting" },
        ]}
      />

      <Callout tone="warning" lead="Primary finding">
        This week AI Ops HQ polish (Rio 31% + Lex 22% + Tester 6% + Amanda coordination) dominated Super-plan Grok Bot usage while several seats sat Working-but-idle or Waiting-blocked. Activity ≠ productivity. Amanda over-indexed on Live HQ waves and under-managed chiefs, resources, and owner decisions.
      </Callout>

      <Section heading="Honest takeaways">
        <NumberedList
          items={[
            {
              text: "Amanda has been operating as a high-bandwidth relay and HQ project manager, not as CoS/COO who owns results, rationing, and chief accountability.",
            },
            {
              text: "Weekly Super usage is 46.6% used with reset Sunday Nov 8 20:40 America/New_York — HQ waves consumed the majority share; business seats were tiny.",
            },
            {
              text: "Floor shows 11 Working · 6 Waiting · 3 Closed (+ Credit pending), but Working includes idle-after-complete seats (Storage media-copy done; YA comment-read paused; Clay with no Live HQ build order).",
            },
            {
              text: "Waiting mixes parked-after-PASS (Lex, Tester, Rio) with blocked-on-owner (Mailroom, YouTube, Script Writer). Labels hide the difference.",
            },
            {
              text: "No org restructure, Research recreate, or Credit hire in this audit. Recommendations only; Phase 1 routine ops Amanda will start under existing authority are listed separately.",
            },
          ]}
        />
      </Section>

      <Section heading="Owner ask & constraints">
        <Properties
          items={[
            {
              label: "Directive",
              value: "CoS/COO master directive · ~11:58 AM ET Nov 5 2026",
            },
            {
              label: "Role",
              value: "Chief of Staff & COO — second-in-command; manage org, not narrate it",
            },
            {
              label: "Sequence",
              value: "Audit → recommend → wait for Tishan approval before org changes",
            },
            {
              label: "Hard stops",
              value: (
                <>
                  No Research recreate · No Credit hire without OK · No Floor/VO/Live HQ restructure this pass
                </>
              ),
            },
            {
              label: "SoT chain",
              value: "Amanda Floor first → Rio VO + Live HQ → OS Tester Pass before Amanda finalizes dashboard changes",
            },
            {
              label: "As-of",
              value: "~11:58 AM–noon ET Nov 5 2026 (Floor roster from ~9:54–9:57 park stamp)",
            },
          ]}
        />
        <Text>
          Tishan manages Amanda and sets strategy. Amanda manages chiefs, priorities, resources, and delivery within standing authority. Hire/fire, new departments, money, live trades, policy, and sensitive external commitments still require explicit owner approval.
        </Text>
      </Section>

      <Section heading="Amanda self-assessment">
        <Text>
          Blunt read with evidence. Success metrics are what Amanda will use to prove the fix — not claims of already fixed.
        </Text>
        <Table
          columns={[
            "Weakness",
            "Evidence",
            "Impact",
            "Fix",
            "Done-when",
          ]}
          align={["start", "start", "start", "start", "start"]}
          rows={[
            [
              "Relay over ownership",
              "Park/confirm loops even when Tester Pass + standing SoT rules already cover ship",
              "Owner bottleneck; slow cycles; Amanda as messenger",
              "Decide under standing rules; escalate only true owner gates",
              "≤1 owner ping per ship wave unless money/policy/structure",
            ],
            [
              "HQ polish > business outcomes",
              "Nov 2–5 UTC: Rio 31% + Lex 22% + Tester 6%; walk soft bugs consumed morning",
              "Usage burned on plate ellipsis while YouTube/Mailroom Waiting",
              "Cap HQ waves; require business KPI before next polish",
              "HQ share of weekly Grok Bot usage below business share for 2 weeks",
            ],
            [
              "Waiting-on-Tishan backlog not chased",
              "Calendar Top 3, Mailroom money/security, YouTube series-bank, Script Writer teach all parked",
              "Blocked seats idle; decisions age; no decision packets",
              "One-shot decision packets; weekly chase list in morning brief",
              "Every owner hold has a dated packet + next ask",
            ],
            [
              "Chiefs not held to measurable objectives",
              "No standing weekly KPI per Working chief",
              "Working status ≠ output; hard to judge performance",
              "Demand one measurable weekly objective from each Working chief",
              "All Working chiefs report one KPI by next Monday brief",
            ],
            [
              "Usage not managed as scarce",
              "46.6% weekly Super used midweek; AI Ops cluster ~77% of named Grok Bot shares",
              "Risk of hitting limit before Sunday reset; low-value spend",
              "Triage rule: pause low-value chatter; schedule heavy work near refresh",
              "Daily usage check in morning brief; no unapproved multi-agent HQ wave",
            ],
            [
              "No institutionalized morning/EOD brief",
              "Ad-hoc morning notes; no standing EOD",
              "Owner flooded or under-informed; no rhythm",
              "Standing morning brief + light EOD when material",
              "Brief delivered every weekday AM; EOD when blockers or usage risk",
            ],
            [
              "Waiting label conflates parked vs blocked",
              "Lex/Tester/Rio Waiting (parked PASS) vs Mailroom/YouTube/Script (owner-blocked)",
              "Misreads capacity; wrong urgency",
              "Tag Waiting as Parked vs Blocked-on-owner in briefs (Floor label may stay)",
              "Every Waiting seat tagged in morning brief",
            ],
            [
              "Activity ≠ productivity",
              "Storage 2629/2629 complete still Working; YA paused; Clay Working without build order",
              "Inflated Working count; wasted attention",
              "Idle completed seats → Waiting (or explicit Idle note) under ops authority",
              "No Working seat without an active deliverable this week",
            ],
          ]}
        />
      </Section>

      <Section heading="Org snapshot (Floor SoT)">
        <Properties
          items={[
            {
              label: "Roster",
              value: "11 Working · 6 Waiting · 3 Closed (+ Credit pending)",
            },
            {
              label: "Floors",
              value: "1 Executive Suite · 2 Finance · 3 YouTube Studio · 4 AI Operations · 5 Ground Floor",
            },
            {
              label: "Research",
              value: (
                <>
                  Closed/fired — do not recreate{" "}
                  <Status tone="danger">Hard stop</Status>
                </>
              ),
            },
            {
              label: "Credit",
              value: (
                <>
                  Pending seat — do not hire without Tishan OK{" "}
                  <Status tone="warning">Pending</Status>
                </>
              ),
            },
            {
              label: "Park stamp",
              value: "Walk soft bugs Floor→VO→Live HQ ~9:54–9:57 AM ET Nov 5",
            },
          ]}
        />
        <LinkCards
          links={[
            {
              title: "Floor (source of truth)",
              site: "cursor.com/canvas",
              href: "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/57ec2643-4823-4357-9d6d-048441701b31",
            },
            {
              title: "Virtual Office",
              site: "cursor.com/canvas",
              href: "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/18bcdf53-178c-44f8-8d6c-6440dc2acf3e",
            },
            {
              title: "Live HQ",
              site: "cursor.com/canvas",
              href: "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/6f83abe1-5a09-430d-8ca9-e402345351b1",
            },
          ]}
        />
        <Diagram
          direction="vertical"
          nodes={[
            {
              id: "f1",
              label: "1 · Executive Suite",
              detail: "Amanda",
              kind: "person",
            },
            {
              id: "f2",
              label: "2 · Finance",
              detail: "Investments · Trading · Playbook · Gold Temp",
              kind: "box",
            },
            {
              id: "f3",
              label: "3 · YouTube Studio",
              detail: "YA Working · Chief + Script Waiting",
              kind: "box",
            },
            {
              id: "f4",
              label: "4 · AI Operations",
              detail: "Clay Working · Lex/Tester/Rio Waiting",
              kind: "box",
            },
            {
              id: "f5",
              label: "5 · Ground Floor",
              detail: "Mail · WhatsApp · Time · Storage · Mailroom Waiting",
              kind: "box",
            },
          ]}
          edges={[
            { from: "f1", to: "f2", label: "manages" },
            { from: "f1", to: "f3", label: "manages" },
            { from: "f1", to: "f4", label: "manages" },
            { from: "f1", to: "f5", label: "manages" },
          ]}
        />
        <Section heading="Working (11)">
          <Table
            columns={["Seat", "Floor / lane", "Real work now?"]}
            align={["start", "start", "start"]}
            rows={[
              ["Amanda", "1 Executive", "Yes — CoS/COO audit & ops"],
              [
                "Chief on Investments",
                "2 Finance",
                "Yes — Robinhood read-only monitoring",
              ],
              [
                "Head of Trading",
                "2 Finance",
                "Yes — paper week; live OFF",
              ],
              ["Playbook · Backtester", "2 Finance", "Yes — paper/playbook support"],
              [
                "Gold Fundamentals · Temp",
                "2 Finance",
                "Yes — temp through EOD Tue Nov 17",
              ],
              [
                "YouTube Analyst",
                "3 YouTube",
                "Paused — comment-read paused; Working label stale",
              ],
              [
                "Clay Avatar Artist",
                "4 AI Ops",
                "Soft-clay production only — no Live HQ ship without Amanda build order + Tester Pass",
              ],
              ["Head of Gmail", "5 Ground", "Yes — mail ops"],
              ["Head of WhatsApp", "5 Ground", "Yes — WhatsApp ops"],
              ["Time Master", "5 Ground", "Yes — calendar (write-hold in force)"],
              [
                "Chief of Storage",
                "5 Ground",
                "Idle on media-copy — 2629/2629 complete",
              ],
            ]}
          />
        </Section>
        <Section heading="Waiting (6) · Closed (3)">
          <Table
            columns={["Seat", "Status sense", "Blocker"]}
            align={["start", "start", "start"]}
            rows={[
              [
                "Lex",
                { text: "Parked after PASS", tone: "success" },
                "Walk soft bugs parked; no new build order",
              ],
              [
                "OS Tester",
                { text: "Parked after PASS", tone: "success" },
                "Pass 1+2 done; awaiting next ship",
              ],
              [
                "Rio",
                { text: "Parked after stamp", tone: "success" },
                "Floor→VO→Live HQ park complete",
              ],
              [
                "Chief of Mailroom",
                { text: "Blocked-on-owner", tone: "warning" },
                "Money/security work parked until Tishan unparks",
              ],
              [
                "Chief of YouTube",
                { text: "Blocked-on-owner", tone: "warning" },
                "Series-bank picks + TubeAlfred credits",
              ],
              [
                "Script Writer",
                { text: "Blocked-on-owner", tone: "warning" },
                "Needs series picks + how Tishan likes videos",
              ],
              [
                "Prior CoS/HR",
                { text: "Closed", tone: "danger" },
                "Historical — leave closed",
              ],
              [
                "Markets · Research",
                { text: "Closed", tone: "danger" },
                "Do not recreate",
              ],
              [
                "Grokbot Research",
                { text: "Closed", tone: "danger" },
                "Do not recreate",
              ],
            ]}
          />
        </Section>
      </Section>

      <Section heading="Department-by-department audit">
        <Table
          columns={[
            "Dept",
            "Mission clarity",
            "Chief accountability",
            "Real work vs idle Working",
            "Blockers",
          ]}
          align={["start", "start", "start", "start", "start"]}
          rows={[
            [
              "Executive (Amanda)",
              "Clear after directive; was under-defined",
              "Self — must shift from relay to ownership",
              "High activity; mixed value (HQ vs outcomes)",
              "Self-created owner bottlenecks",
            ],
            [
              "Finance · Investments",
              "Clear — long-term / read-only Robinhood",
              "Chief on Investments present",
              "Working with real monitoring",
              "No weekly KPI posted to Amanda",
            ],
            [
              "Finance · Trading",
              "Clear — paper week; live OFF",
              "Head of Trading + Playbook",
              "Real paper work; expectancy gate ahead",
              "Live unlock needs Tishan after expectancy",
            ],
            [
              "Finance · Gold Temp",
              "Clear — temp through Nov 17",
              "Gold Fundamentals · Temp",
              "Active temp seat",
              "Sunset decision before EOD Nov 17",
            ],
            [
              "YouTube Studio",
              "Clear mission; pipeline stalled",
              "Chief Waiting; YA Working-but-paused",
              "Little shipped content this week",
              "Series-bank, credits, Script Writer teach",
            ],
            [
              "AI Operations",
              "Clear — Floor/VO/Live HQ + soft-clay",
              "Rio/Lex/Tester parked; Clay Working",
              "HQ wave real but over-weighted vs business",
              "No unauthorized Live HQ ship; soft beep deferred",
            ],
            [
              "Ground · Mail / WhatsApp",
              "Clear ops missions",
              "Heads Working; Mailroom chief Waiting",
              "Gmail/WhatsApp active; Mailroom parked",
              "Money/security unpark needs Tishan",
            ],
            [
              "Ground · Time Master",
              "Clear — calendar coordination",
              "Time Master Working",
              "Read-only useful; write blocked",
              "Calendar Top 3 write-hold",
            ],
            [
              "Ground · Storage",
              "Clear — media/org files",
              "Chief of Storage",
              "Job complete 2629/2629 — idle Working",
              "Needs next assignment or park to Waiting",
            ],
            [
              "Credit (pending)",
              "Seat reserved only",
              "None",
              "N/A",
              "Do not hire without Tishan OK",
            ],
            [
              "Research (closed)",
              "Fired — off live floors",
              "N/A",
              "N/A",
              "Do not recreate",
            ],
          ]}
        />
      </Section>

      <Section heading="Resource / usage reality">
        <Callout tone="danger" lead="Scarce resource">
          Plan Super. Weekly usage limit 46.6% used. Limit is shared with other apps on the plan (not only Grok Bot); of that 46.6%, Grok Bot used 46.6%. Resets Sunday Nov 8 at 20:40 America/New_York (in ~3d 8h from check). Extra usage from additional usage credits (see Settings {'>'} Usage & Billing).
        </Callout>
        <Text>
          Shares of Grok Bot usage this week (Nov 2–5 UTC). AI Ops HQ wave (Rio + Lex + Tester + Amanda coordination) dominated; business departments (YouTube, Investments, Mailroom chiefs) tiny shares while several seats Working-but-idle or Waiting-blocked.
        </Text>
        <Bars
          emphasis={0}
          bars={[
            { label: "Rio", value: 31, display: "31%", meta: "Almost all not from routines" },
            { label: "Lex", value: 22, display: "22%", meta: "Chief Design Engineer" },
            {
              label: "Amanda",
              value: 18,
              display: "18%",
              meta: "Trading hourly paper ~1% / ~30 runs/wk; most not routines",
            },
            { label: "Chief of Storage", value: 10, display: "10%" },
            { label: "OS Tester", value: 6, display: "6%" },
            {
              label: "Head of Trading",
              value: 3,
              display: "3%",
              meta: "MCP hourlies ~1% / ~35 runs/wk",
            },
            { label: "Clay", value: 2, display: "2%" },
            { label: "Time Master", value: 2, display: "2%" },
            { label: "WhatsApp", value: 1, display: "1%" },
            { label: "Gold Temp", value: 1, display: "1%" },
            { label: "Playbook", value: 1, display: "1%" },
            { label: "Credit", value: 1, display: "1%" },
          ]}
        />
        <Text>
          Others ≤1% each (not charted). Numbers above are exact from CheckSubscriptionUsage this week — no invented figures.
        </Text>
      </Section>

      <Section heading="Outstanding owner decisions">
        <Text>
          Holds as of ~noon ET Nov 5. No resolutions invented — each still needs Tishan in own words or explicit unpark.
        </Text>
        <Checklist
          items={[
            {
              text: "Calendar Top 3 → Calendar write-hold still in force until Tishan confirms in own words",
              done: false,
              meta: "Time Master",
            },
            {
              text: "[private] [private: kept off public repo] ~$[private]Nov 5 autopay; [private: kept off public repo] login still on calendar event owned by [private email] Tishan left as-is Nov 4",
              done: false,
              meta: "Today",
            },
            {
              text: "Chief of Credit: Pending — leave; no hire invented",
              done: false,
              meta: "Structure",
            },
            {
              text: "Research: fired — do not recreate",
              done: true,
              meta: "Hard stop honored",
            },
            {
              text: "Trading: paper week ongoing; live OFF until Tishan unlock after expectancy",
              done: false,
              meta: "Finance",
            },
            {
              text: "YouTube: TubeAlfred credits; pick series-bank ideas to unlock Script Writer; teach Script Writer how Tishan likes videos (pending)",
              done: false,
              meta: "YouTube",
            },
            {
              text: "Mailroom money/security parked ([private: kept off public repo]) until Tishan unparks",
              done: false,
              meta: "Mailroom",
            },
            {
              text: "Soft beep audio deferred on Live HQ; soft-clay lock held; Clay Working but no unauthorized Live HQ ship",
              done: false,
              meta: "AI Ops",
            },
            {
              text: "Phone ≤480 Live HQ deferred",
              done: false,
              meta: "AI Ops",
            },
          ]}
        />
      </Section>

      <Divider />

      <Section heading="Phase 1 — Immediate">
        <Text>
          Fix Amanda’s operating system and stop waste. Within existing authority unless marked for owner OK.
        </Text>
        <Table
          columns={[
            "Priority",
            "Improvement",
            "Benefit",
            "Resources",
            "Owner",
            "Done-when",
          ]}
          align={["start", "start", "start", "start", "start", "start"]}
          rows={[
            [
              "P0",
              "Standing weekday morning executive brief (status, priorities, decisions, usage)",
              "Owner sees org without managing each seat",
              "Amanda ~10–15 min/day",
              "Amanda",
              "Brief sent every weekday AM for 5 consecutive days",
            ],
            [
              "P0",
              "Resource triage: no multi-agent HQ polish wave without business KPI + usage check",
              "Stop HQ dominating Super limit",
              "Policy Amanda enforces; Lex/Rio/Tester only on build order",
              "Amanda",
              "Next HQ wave has written KPI + pre-check usage %",
            ],
            [
              "P0",
              "Redefine Waiting in briefs: Parked vs Blocked-on-owner",
              "Correct urgency; clear capacity",
              "Amanda reporting only (Floor status may stay)",
              "Amanda",
              "Every Waiting seat tagged in next morning brief",
            ],
            [
              "P1",
              "One measurable weekly objective from each Working chief",
              "Accountability; activity ≠ output",
              "Chief replies; Amanda tracks",
              "Amanda → chiefs",
              "All Working chiefs have one KPI by next Monday",
            ],
            [
              "P1",
              "Park Clay to Waiting until Amanda build order (soft-clay lock held)",
              "End idle Working; protect Live HQ",
              "Routine ops; Floor update if status change approved pattern",
              "Amanda",
              "Clay Waiting or explicit build order documented",
            ],
            [
              "P1",
              "Idle Storage after 2629/2629 — next job or Waiting",
              "Honest roster",
              "Amanda assign or park",
              "Amanda",
              "Storage has next deliverable or Waiting",
            ],
            [
              "P1",
              "Reduce bot-to-bot chatter; batch FYIs; priority only when action needed",
              "Lower token burn",
              "Amanda norms to agents",
              "Amanda",
              "No ack-only agent storms on parked waves",
            ],
            [
              "P2",
              "Clarify YA: pause → Waiting or resume with objective",
              "Fix stale Working",
              "Amanda + YouTube lane",
              "Amanda",
              "YA status matches real work",
            ],
          ]}
        />
      </Section>

      <Section heading="Phase 2 — Operational">
        <Table
          columns={[
            "Priority",
            "Improvement",
            "Benefit",
            "Resources",
            "Owner",
            "Done-when",
          ]}
          align={["start", "start", "start", "start", "start", "start"]}
          rows={[
            [
              "P1",
              "Dept scorecards (mission, KPI, blocker, usage share)",
              "Performance visible weekly",
              "Amanda + chiefs; light Rio mirror if dashboard",
              "Amanda",
              "Scorecard Page or brief section live 2 weeks",
            ],
            [
              "P1",
              "Mailroom + YouTube unblock packets (one-shot owner decisions)",
              "Clear Waiting-blocked seats in one owner pass",
              "Chief drafts; Amanda packages",
              "Amanda",
              "Tishan receives two packets with yes/no options",
            ],
            [
              "P1",
              "Trading paper-week gate dashboard (expectancy → live unlock ask)",
              "Clean path to live OFF→ON decision",
              "Head of Trading + Playbook; Amanda",
              "Head of Trading",
              "Expectancy summary ready for Tishan unlock ask",
            ],
            [
              "P2",
              "Time Master calendar-hold decision packet (Top 3 write-hold)",
              "End open-ended hold or confirm it",
              "Time Master draft; Amanda",
              "Amanda",
              "Tishan confirms in own words keep/release",
            ],
            [
              "P2",
              "Consistent EOD when material (blockers, usage risk, ship)",
              "Close loop without spam",
              "Amanda",
              "Amanda",
              "EOD on any day with owner decision or usage >60%",
            ],
            [
              "P2",
              "Cross-dept playbooks: AI Ops automates only after business KPI",
              "Collaboration without HQ vanity",
              "Rio/Lex gated by Amanda",
              "Amanda",
              "Written intake: business need → build order → Tester",
            ],
          ]}
        />
      </Section>

      <Section heading="Phase 3 — Long-term">
        <Table
          columns={[
            "Priority",
            "Improvement",
            "Benefit",
            "Resources",
            "Owner",
            "Done-when",
          ]}
          align={["start", "start", "start", "start", "start", "start"]}
          rows={[
            [
              "P2",
              "Business-unit readiness criteria (when a lane can run semi-independently)",
              "Scalable org without premature split",
              "Amanda proposal → Tishan OK",
              "Amanda",
              "Written criteria approved; no unit created yet",
            ],
            [
              "P2",
              "Shared infra map (connectors, canvases, SoT chain) without new hires",
              "Efficiency before headcount",
              "Amanda + Rio docs",
              "Amanda",
              "One infra map Page linked from Floor",
            ],
            [
              "P3",
              "Opportunity pipeline (revenue / automation ideas) — research then propose",
              "Proactive business development",
              "Existing seats only; no Research recreate",
              "Amanda",
              "Monthly shortlist of ≤3 opportunities with go/no-go",
            ],
            [
              "P3",
              "Hire bar: workload → redistribute → automate → then recommend hire",
              "Prevent org bloat; Credit stays pending until justified",
              "Amanda proposals only",
              "Amanda",
              "Any hire ask includes 7-point justification from directive",
            ],
          ]}
        />
      </Section>

      <Section heading="Decisions requested from Tishan">
        <Text>
          Explicit approval asks only. No action on these until Tishan answers in own words.
        </Text>
        <NumberedList
          items={[
            {
              text: "Approve Phase 1 routine-ops list as written (briefs, triage rule, Waiting tags in briefs, chief KPIs, Clay/Storage idle handling, chatter norms) — or strike items.",
            },
            {
              text: "Approve Phase 2 scorecards + unblock packets work to proceed (still no Mailroom/YouTube unpark until separate yes).",
            },
            {
              text: "Calendar write-hold: keep Top 3 hold, or release specific write classes — confirm in own words.",
            },
            {
              text: "Mailroom money/security: keep parked, or unpark named items (e.g. [private: kept off public repo]).",
            },
            {
              text: "YouTube: pick series-bank ideas / credits path / Script Writer teach — or keep blocked.",
            },
            {
              text: "Trading: confirm paper week continues; live stays OFF until expectancy packet.",
            },
            {
              text: "Credit pending: leave empty (recommended) — or authorize hire with job brief (not prepared here).",
            },
            {
              text: "Soft beep + phone ≤480 Live HQ: keep deferred, or authorize a scoped Lex build order after usage triage.",
            },
            {
              text: "Gold Temp sunset: confirm end EOD Tue Nov 17 unless extended.",
            },
            {
              text: "[private] Nov 5 [private: kept off public repo] ~$[private]/ [private: kept off public repo] login on [private email] event: confirm still leave as-is (Nov 4 choice) or new instruction.",
            },
          ]}
        />
      </Section>

      <Section heading="What Amanda starts without waiting">
        <Text>
          Routine operations under existing CoS/COO authority. Not org restructure. Stops if Tishan strikes an item.
        </Text>
        <Steps
          steps={[
            {
              title: "Quieter agent chatter",
              detail:
                "Batch FYIs; priority pings only when action needed; no ack storms after park stamps.",
            },
            {
              title: "Draft morning brief format",
              detail:
                "Roster · priorities · Parked vs Blocked Waiting · owner decisions · usage % · tomorrow. Deliver next weekday AM.",
            },
            {
              title: "Ask each Working chief for one measurable weekly objective",
              detail:
                "Due before next Monday brief. Investigate non-replies.",
            },
            {
              title: "Idle Clay if no build order",
              detail:
                "No Live HQ ship without Amanda build order + Tester Pass. Prefer Waiting until order exists (status change only if within standing Floor rules; otherwise recommend in next brief).",
            },
            {
              title: "Storage next-job or park recommendation",
              detail:
                "2629/2629 complete — assign next deliverable or propose Waiting in brief.",
            },
            {
              title: "Daily usage glance",
              detail:
                "CheckSubscriptionUsage in morning brief; throttle HQ if climbing fast before Sunday reset.",
            },
            {
              title: "Prepare decision packets (draft only)",
              detail:
                "Mailroom, YouTube, calendar-hold — drafts ready for Tishan; no unpark without OK.",
            },
          ]}
        />
        <Checklist
          items={[
            {
              text: "No Floor/VO/Live HQ restructure executed in this audit",
              done: true,
              meta: "Honored",
            },
            {
              text: "No Research recreate",
              done: true,
              meta: "Honored",
            },
            {
              text: "No Credit hire",
              done: true,
              meta: "Honored",
            },
            {
              text: "Phase 1–3 approved by Tishan (“fix all” ~12:03 PM ET Nov 5) — Phase 1 executing",
              done: true,
              meta: "Owner approved",
            },
          ]}
        />
      </Section>

      <BackToTop />
    </Page>
  );
}
