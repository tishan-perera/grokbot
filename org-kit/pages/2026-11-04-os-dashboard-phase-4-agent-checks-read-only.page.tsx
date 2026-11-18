// Grokbot Page export · title: OS Dashboard — Phase 4 Agent Checks (read-only) · canvas_id: 75ecce3f-307e-474d-b116-0a6d01e2ec7d · last updated 2026-11-04
// Inline base64 images stripped: 0. Private details replaced with [private ...] placeholders.
// Recreate by pasting this source into a new Page (Cursor canvas, React/TSX).
import { Page, Section, Text, Callout, Table, BulletList, Steps } from "grok/canvas";

const rows = [
  ["Amanda", "Executive · Working · org lead + CoS/HR", "Working · Running Floor sync + chief check-ins", "Working", "PASS", "Task line dated Nov 2"],
  ["Prior CoS/HR", "Closed · seat closed, no open seat", "Closed · Seat closed · no chat link", "Closed", "PASS", "Only Closed seat on Live HQ"],
  ["Time Master", "Floor 3 · Working · Top 3 + reminders", "Working · Top 3 live · calendar-write HOLD", "Working", "PASS", "Live HQ level 6, not 3"],
  ["Mail Room Chief", "Floor 4 · Waiting on Tishan", "Waiting · [private: kept off public repo] due Thu Nov 5", "Waiting on Tishan", "PASS", "Name differs: Chief of Mailroom"],
  ["Gmail", "Floor 4 · Working", "Working · ~50.7k promo trashed", "Working", "PASS", ""],
  ["WhatsApp", "Floor 4 · Working · 3 groups", "Working · Watching 3 groups", "Working", "PASS", ""],
  ["YouTube Chief", "Floor 5 · Waiting · TubeAlfred credits + series picks", "Waiting · TubeAlfred credits + series picks", "Waiting on Tishan", "PASS", ""],
  ["YT Analyst", "Floor 5 · Working · holding for credits", "Working · comment reading stopped · holding", "Working", "PASS", ""],
  ["Script Writer", "Floor 5 · Waiting on Tishan · needs premise", "Waiting · Needs a premise", "Waiting on Tishan", "PASS", ""],
  ["Storage", "Floor 6 · Working · copy 2,629/2,629 done", "Working · Media copy COMPLETE · idle", "Working", "PASS", ""],
  ["Investments", "Floor 7 · Working · Robinhood read-only", "Working · trades locked", "Working", "PASS", ""],
  ["Credit", "Org chart only: Seat live · roster pending confirm", "Pending · Seat pending Floor confirm", "Mentioned", "PARTIAL", "Not in Floor roster; wording differs (live vs pending)"],
  ["Gold Fundamentals · Temp", "Floor 8 · Working · Temp through EOD Tue Nov 17", "Working · temp through EOD Tue Nov 17", "Working", "PASS", "Present on all three"],
  ["Head of Trading", "Floor 8 · Working · paper week", "Working · paper week · no live orders", "Working", "PASS", ""],
  ["Playbook · Backtester", "Floor 8 · Working · one strategy + scorecard", "Working · same", "Working", "PASS", ""],
  ["Rio", "Floor 2 · Working · sync standby", "Working · Floor sync standby", "Working", "PASS", ""],
  ["Lex", "Floor 2 · Waiting on Tishan · Pass 3 shipped, parked", "Working · Closed contrast pass 3 (Tester Pass 1 FAIL)", "Waiting on Tishan", "FAIL", "Status and task both stale on Live HQ"],
  ["OS Tester", "Floor 2 · Working · A–Z audit read-only", "Working · read-only assessment", "Working", "PASS", ""],
  ["Markets · Research", "Closed (fired ~7:53 AM ET Nov 3)", "Not on board (by design)", "Closed (fired)", "PASS", "Live HQ explains 1 of 3 Closed"],
  ["Grokbot Research", "Closed (fired ~7:53 AM ET Nov 3)", "Not on board (by design)", "Closed (fired)", "PASS", ""],
];

export default function App() {
  return (
    <Page width="full" title="OS Dashboard — Phase 4 Agent Checks (read-only)" summary="Seat-by-seat check of Live HQ and Virtual Office against the Floor Page (source of truth), from page source read Nov 4 ~8:55 AM ET. Nothing was sent or changed.">
      <Section heading="Takeaway">
        <Callout tone="warning">20 seats checked: 18 PASS, 1 PARTIAL (Credit), 1 seat FAIL (Lex). One more FAIL is board-wide: Live HQ numbers its floors upside down compared with Floor. Virtual Office matches Floor on every seat.</Callout>
      </Section>
      <Section heading="Seat matrix">
        <Table columns={["Name", "Floor", "Live HQ", "VO", "Match", "Notes"]} rows={rows} />
      </Section>
      <Section heading="Mismatches by severity">
        <BulletList items={[
          "FAIL · High: Lex is Waiting on Tishan on Floor and VO but Working on Live HQ, with an old task line (Pass 1 FAIL). Anyone using Live HQ misses that Lex needs you.",
          "FAIL · Medium: Floor numbers are inverted. Live HQ has Executive 8, OS 7, Time 6, Mail 5, YouTube 4, Storage 3, Investments 2, Trading 1. Floor has OS 2, Time 3, Mail 4, YouTube 5, Storage 6, Investments 7, Trading 8.",
          "PARTIAL · Low: Credit is Pending on Live HQ but described as Seat live, roster pending on the Floor org chart, and it has no Floor roster row.",
          "Low: Live HQ waiting count shows 3 Waiting while Floor says 4 (it follows from the Lex mismatch).",
          "Low: Names differ between pages (Mail Room Chief vs Chief of Mailroom, Storage vs Chief of Storage). Not wrong, but makes search harder.",
        ]} />
      </Section>
      <Section heading="Checks that passed">
        <BulletList items={[
          "Waiting set on Floor is Lex, Mailroom Chief, YouTube Chief, Script Writer, and VO matches it.",
          "Prior CoS/HR is Closed on all three, with Open chat unavailable on Live HQ.",
          "Research seats are off Live HQ on purpose, and the Closed pill says so.",
          "Gold Fundamentals Temp is present and Working through EOD Tue Nov 17 everywhere.",
          "Open chat links use `grokbot://app/v1/agent?id=<chat id>`; Closed seats get no link.",
          "Live HQ code has View on Floor and Next waiting links in the agent card.",
          "There is no task-create UI on any of the three pages, as expected.",
        ]} />
      </Section>
      <Section heading="Blocked until Tishan or Amanda says OK">
        <BulletList items={[
          "Sending an instruction to any agent (for example, asking Lex or Rio to fix the Live HQ sync).",
          "Replying in an agent chat or testing Open chat end to end.",
          "Delegating work or editing Live HQ, Floor or VO.",
        ]} />
      </Section>
      <Section heading="Next: Phase 5 sync workflows">
        <Steps steps={[
          { title: "Trace the sync path", detail: "Check how a Floor change reaches Live HQ and VO, and why Lex lagged." },
          { title: "Diff counts", detail: "Compare Working, Waiting and Closed totals and as-of times across the three pages." },
          { title: "Floor numbering", detail: "Decide which numbering is right and log it as a fix for approval." },
          { title: "Credit wording", detail: "Get one agreed status for Credit from Amanda." },
          { title: "Propose fixes only", detail: "Write fixes as a list for Tishan; no edits until approved." },
        ]} />
      </Section>
    </Page>
  );
}
