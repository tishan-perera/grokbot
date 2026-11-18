// Grokbot Page export · title: Personal AI OS — Stage 5 Automation Plan · canvas_id: db830245-4904-488e-8023-9fdede1f0256 · last updated 2026-11-02
// Inline base64 images stripped: 0. Private details replaced with [private ...] placeholders.
// Recreate by pasting this source into a new Page (Cursor canvas, React/TSX).
import { Page, Section, Text, Callout, Rows, Table, Properties, Steps, NumberedList, LinkCards, TableOfContents } from "grok/canvas";

export default function App() {
  return (
    <Page
      title="Personal AI OS — Stage 5 Automation Plan"
      summary="Stage 5 investigation: which HQ workflows are reliable enough to automate, Wave 1 rollout status, and the decisions still open. As of Nov 2, 2026, 7:11 AM ET — all five Wave 1 helpers live."
      width="wide"
    >
      <TableOfContents
        items={[
          { label: "Stage 5 status" },
          { label: "Principles (ADR-0003)" },
          { label: "Reliable enough vs blocked" },
          { label: "Recommended Wave 1" },
          { label: "Later waves (gated)" },
          { label: "Voice + calendar/reminder findings" },
          { label: "Personal-assistant capability map" },
          { label: "Decisions needed" },
          { label: "Links" },
        ]}
      />

      <Callout tone="success" lead="Wave 1 · all five live">
        Tishan enabled all four remaining Wave 1 helpers (own words via Amanda, Nov 2 ~7:11 AM ET). Live now: OS status digest, calendar look-ahead, weekly connector health, weekly chief check-in, weekly blocker summary. Organization Office Floor stays the source of truth.
      </Callout>

      <Section heading="Stage 5 status">
        <Properties
          items={[
            { label: "Stage", value: "5 · Automation + voice foundation" },
            { label: "Phase", value: "Wave 1 rollout" },
            { label: "As of", value: "Nov 2, 2026 · 8:35 AM ET" },
            { label: "Live routines", value: "5 of 5 Wave 1" },
            { label: "Owner", value: "Rio · oversight Amanda" },
            { label: "Stage 4", value: "Accepted · concept-matched · Amanda OK Nov 1 night" },
          ]}
        />
      </Section>

      <Section heading="Principles (ADR-0003)" caption="ADR-0003 Accepted for Wave 1 (Amanda relay) · Rio store /adrs/ADR-0003-automation-principles.md">
        <NumberedList
          items={[
            "Automate only a reliable workflow: run manually at least twice with a correct result, and no open human blocker.",
            "External sends (email, WhatsApp, Slack, posts) are draft-only; a human sends.",
            "Floor stays the source of truth; automations write as-of status, never fake heartbeats or invented counts.",
            "Ask before destructive, public, money, or security-major moves; calendar writes that invite people need explicit OK.",
            "Least frequent useful cadence: weekdays about 8am–7pm ET, quiet 10pm–7am.",
            "Each routine names its recipient and what it does when nothing is new; repeated auth failures pause it.",
          ]}
        />
      </Section>

      <Section heading="Reliable enough vs blocked" caption="From Stage 3 check-ins, as of Nov 1 9:50 PM ET, and connector state on the Floor">
        <Table
          columns={["Workflow", "Readiness", "Why"]}
          rows={[
            ["Floor status edits (Rio)", { text: "Reliable", tone: "success" }, "Done repeatedly through Stages 2–4"],
            ["Chief check-in round (ADR-0002)", { text: "Reliable", tone: "success" }, "Round 1 returned 5/5 chiefs"],
            ["Calendar reads", { text: "Ready to test", tone: "success" }, "Calendar connected · 15 tools · read-only first"],
            ["Gmail read / triage", { text: "Partial", tone: "warning" }, "First pass done; bills/security parked"],
            ["Time Master workflows", { text: "In progress", tone: "success" }, "Owns reminders, Top 3, timed nudges, Later to-dos · calendar writes still hold"],
            ["Mailroom money/security", { text: "Blocked", tone: "danger" }, "Parked until Tishan unparks"],
            ["WhatsApp watching", { text: "Not automated", tone: "warning" }, "Web session on 3 groups; no watcher reports"],
            ["YouTube analytics refresh", { text: "Blocked", tone: "danger" }, "TubeAlfred credits 0; no premise locked"],
            ["Storage / Drive housekeeping", { text: "Blocked", tone: "danger" }, "Phase 0 approve pending; no Storage-on-Drive loop"],
            ["Investments monitoring", { text: "Ready to plan", tone: "success" }, "Robinhood confirmed · Floor Working · read-only until further policy"],
            ["GitHub events", { text: "Not connected", tone: "warning" }, "needsAuth; optional"],
          ]}
        />
      </Section>

      <Section heading="Recommended Wave 1" caption="All read-only or internal; status as of Nov 2, 7:11 AM ET">
        <Table
          columns={["Automation", "Cadence (ET)", "Status", "Routine", "Delivers to"]}
          rows={[
            ["Morning OS status digest", "Weekdays 8:15 AM", { text: "Live", tone: "success" }, "`os-status-digest`", "Amanda + Tishan in Grok Bot"],
            ["Daily calendar look-ahead", "Weekdays 7:45 AM", { text: "Live", tone: "success" }, "`calendar-look-ahead`", "Tishan; conflicts and prep flags"],
            ["Weekly connector health check", "Mon 9:30 AM", { text: "Live", tone: "success" }, "`weekly-connector-health`", "Floor Connectors table"],
            ["Weekly chief check-in round", "Mon 10:00 AM", { text: "Live", tone: "success" }, "`weekly-chief-check-in`", "Floor roster edit, as-of caption"],
            ["Weekly blocker summary", "Fri 4:00 PM", { text: "Live", tone: "success" }, "`weekly-blocker-summary`", "Tishan via Amanda; no repeated chasing"],
          ]}
        />
        <Text>All five Wave 1 helpers live as of Nov 2 ~7:11 AM ET. Times can still change to Tishan&apos;s real hours.</Text>
      </Section>

      <Section heading="Later waves (gated)">
        <Rows
          rows={[
            { title: "Time Master focus blocks", detail: "Reminders + Top 3 owned · calendar writes still need explicit OK", status: { label: "Partial", tone: "warning" } },
            { title: "Mailroom digests incl. bills/security", detail: "After Tishan unparks money/security", status: { label: "Gated", tone: "warning" } },
            { title: "YouTube analytics refresh", detail: "After TubeAlfred credits and a locked premise", status: { label: "Gated", tone: "warning" } },
            { title: "Storage housekeeping", detail: "After Phase 0 approve", status: { label: "Gated", tone: "warning" } },
            { title: "Investments monitoring", detail: "Robinhood connected · read-only until further policy", status: { label: "Unblocked", tone: "success" } },
            { title: "Voice-format digests / live-call PA", detail: "After Tishan decides on voice", status: { label: "Decision", tone: "warning" } },
          ]}
        />
      </Section>

      <Section heading="Voice + calendar/reminder findings">
        <Table
          columns={["Building block", "What exists", "Needs"]}
          rows={[
            ["Routines", "Cron (min 5 min apart) or listeners: Slack, GitHub, Origin, Teams, Linear, Sentry, PagerDuty, bot email inbox, webhook", "Approval per routine"],
            ["Google Calendar MCP", "List/search/get events, availability, suggest time, create/update/delete, RSVP, per-event email or popup reminders", "OK before any write"],
            ["Reminders", "Two paths: a routine message in Grok Bot, or a Calendar event reminder", "Tishan picks a default"],
            ["Voice memos", "Answer sent as a spoken memo in the app", "Tishan asks per message or opts in"],
            ["Live voice calls", "A call Tishan places is relayed to the bot; replies go back on the call", "Tishan-initiated only"],
            ["Not found", "No always-on wake word, phone alarm, or Calendar push listener", "Use cron polling for calendar"],
          ]}
        />
      </Section>

      <Section heading="Personal-assistant capability map">
        <Table
          columns={["Capability", "Agent can own", "Needs a human"]}
          rows={[
            ["Status and reporting", "Rio / Amanda: digests, Floor edits", "Accept stage changes"],
            ["Calendar", "Time Master: read, find slots, draft events", "Invites, deletes, focus-block policy"],
            ["Email", "Gmail head: triage, drafts", "Every send; bills and security"],
            ["WhatsApp", "Head of WhatsApp: read groups, draft", "Every send"],
            ["YouTube", "Analyst: reports when credits exist", "Credits, premise, publishing"],
            ["Files", "Storage chief: plans", "Drive reorg approve, deletes"],
            ["Money", "Investments chief: read-only once connected", "Brokerage, any trade or payment"],
          ]}
        />
      </Section>

      <Section heading="Working HQ sync (ADR-0004)" caption="Accepted interim · Nov 1 ~10:17 PM ET · Rio store /adrs/ADR-0004-working-hq-sync.md">
        <Text>Floor is the source of truth. On each hire, fire, or teach milestone Amanda pings Rio, who edits the Floor the same day, then the Virtual Office mirror. No invented heartbeats, no org restructure without Tishan, no Storage Drive work until greenlit. Wave 1 all five helpers are live (enabled Nov 2 ~7:11 AM ET).</Text>
      </Section>

      <Section heading="Decisions needed">
        <Steps
          steps={[
            { title: "Wave 1 helpers", detail: "Done Nov 2 ~7:11 AM ET · all five live; adjust times if needed" },
            { title: "Virtual Office visual", detail: "Done · concept-matched · Amanda OK Nov 1 night" },
            { title: "Clear department blockers", detail: "Mailroom unpark, YouTube credits, Storage Phase 0 · Time + Investments Working" },
          ]}
        />
      </Section>

      <Section heading="Links">
        <LinkCards
          links={[
            { title: "Organization Office Floor", site: "Source of truth", href: "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/57ec2643-4823-4357-9d6d-048441701b31" },
            { title: "Virtual Office (Stage 4)", site: "Minecraft-NYC HQ visual", href: "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/18bcdf53-178c-44f8-8d6c-6440dc2acf3e" },
            { title: "Overnight log", site: "Plain-words notes for Tishan", href: "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/00d3f374-6efa-4230-b159-a860025cbf12" },
            { title: "Architecture Proposal", site: "Stage 1", href: "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/579912b9-9eff-4457-9d76-191da4284a7c" },
          ]}
        />
      </Section>
    </Page>
  );
}
