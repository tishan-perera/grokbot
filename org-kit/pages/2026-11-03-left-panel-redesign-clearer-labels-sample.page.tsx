// Grokbot Page export · title: Left panel redesign + clearer labels — sample · canvas_id: 3ee32966-905f-43f5-84be-2c36e291005b · last updated 2026-11-03
// Inline base64 images stripped: 0. Private details replaced with [private ...] placeholders.
// Recreate by pasting this source into a new Page (Cursor canvas, React/TSX).
import { Page, Section, Text, Callout, Table, BulletList, Steps, Checklist, ProsCons, Divider } from "grok/canvas";

export default function App() {
  return (
    <Page
      title="Left panel redesign + clearer labels — sample"
      summary="Design sample for Tishan to approve or reject before any Live HQ build. MacBook-first. Phone stays deferred. As of ~2:15 PM ET, Tue Nov 3, 2026."
      width="column"
    >
      <Callout lead="Ask">
        Approve or reject this slice in your own words. Nothing ships on Live HQ until you say yes. Decide-today list, fresh check-ins, and Virtual Office banner stay on hold.
      </Callout>

      <Section heading="What this slice is">
        <Text>
          Two owner-facing fixes on Headquarters (Live HQ): make the slim left panel easier to scan, and make the top counts tell the truth in plain words. People board stays the main view. Floors and Activity stay as they are.
        </Text>
        <BulletList
          items={[
            "Slice name: Left panel redesign + clearer labels",
            "Sample only — Lex does not edit Live HQ until you approve",
            "Later build: Lex + Rio side-by-side after your yes",
            "OS Tester stays read-only",
          ]}
        />
      </Section>

      <Section heading="A · Snapshot wording (top bar)">
        <Table
          columns={["Today", "Proposed"]}
          rows={[
            ["Green Live · clock (reads as live data)", "Snapshot as of 2:09 PM ET (neutral wording)"],
            ["Closed 1 (looks like only one closed seat)", "Closed 1 of 3 on Floor (honest vs Floor)"],
            ["Working / Waiting / Errors pills", "Same counts; plain labels; no Phase / PASS words"],
          ]}
        />
        <Text>
          Goal: you never think the page is a live feed. It is a Floor snapshot with a clear clock.
        </Text>
      </Section>

      <Section heading="B · Honest Closed count">
        <Text>
          Live HQ still lists one Closed seat on purpose (Prior CoS). Floor lists three Closed because Research was fired and those seats stay off this board. Proposed label: Closed 1 of 3 on Floor so the gap is named, not hidden.
        </Text>
      </Section>

      <Section heading="C · Cleaner left panel">
        <ProsCons
          pros={[
            "Keep dark glass look and status colors",
            "Main nav stays People / Floors / Activity",
            "Needs you (Waiting) stays up top with oldest first",
            "Filter chips + department + search stay",
            "Bigger, clearer section names — no design codes",
          ]}
          cons={[
            "Today: crowded rail (Views, Filter, More, Waiting, Floors, Helpers, Finished, Activity, Limits)",
            "Today: Limits drawer dumps Phase / PASS / soft residual jargon for the owner",
            "Today: some tiny grey labels still hard to read",
          ]}
        />
        <Steps
          steps={[
            { title: "Header", detail: "Headquarters · 7 floors · 17 people (plain, no Live HQ jargon)" },
            { title: "Main", detail: "People (selected) · Floors · Activity" },
            { title: "Filter", detail: "All / Working / Waiting / Closed · department · search" },
            { title: "Needs you", detail: "Amber accordion · count · short name + current work lines" },
            { title: "Floors", detail: "Collapsed by default · floor list when opened" },
            { title: "Other", detail: "Headquarters summary, All people, Usage, Settings — one quiet group" },
            { title: "About this page", detail: "Replaces Limits · not polled. Plain English only: what the page is, sync note, links to Floor. Design codes stay in Lex’s log, not here." },
          ]}
        />
      </Section>

      <Section heading="What you would see after ship">
        <Checklist
          items={[
            { text: "Top bar says Snapshot as of … (not Live)", done: false, meta: "Proposed" },
            { text: "Closed reads as 1 of 3 on Floor", done: false, meta: "Proposed" },
            { text: "Left panel groups: Main · Filter · Needs you · Floors · Other · About", done: false, meta: "Proposed" },
            { text: "No Phase / PASS / soft residual wording on the owner surface", done: false, meta: "Proposed" },
            { text: "MacBook-first; phone ≤480 still deferred", done: true, meta: "Unchanged" },
            { text: "People board remains default main view", done: true, meta: "Unchanged" },
          ]}
        />
      </Section>

      <Divider />

      <Section heading="Out of this slice">
        <BulletList
          items={[
            "Decide-today list — not approved yet",
            "Fresh check-ins + Virtual Office banner refresh — hold",
            "Phone layout",
            "New floors, hires, or org changes",
          ]}
        />
      </Section>

      <Section heading="How to answer">
        <Text>
          Tell Amanda yes, no, or what to change. If yes, Lex locks the build list with Rio, ships MacBook-first, then parks Floor → Virtual Office.
        </Text>
      </Section>
    </Page>
  );
}
