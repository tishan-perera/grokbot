// Grokbot Page export · title: OS Dashboard — Phase 7 Performance & Phase 8 Security/A11y · canvas_id: cd369fce-063e-49ef-9f66-04593ea34524 · last updated 2026-11-04
// Inline base64 images stripped: 0. Private details replaced with [private ...] placeholders.
// Recreate by pasting this source into a new Page (Cursor canvas, React/TSX).
import { Page, Section, Text, Callout, Table, BulletList, LinkCards } from "grok/canvas";

const B = "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/";
const P = { text: "PASS", tone: "success" as const };
const F = { text: "FAIL", tone: "danger" as const };

export default function App() {
  return (
    <Page title="OS Dashboard — Phase 7 Performance & Phase 8 Security/A11y" summary="How fast the three dashboard pages load and respond, and whether they are safe and usable by keyboard and screen reader. Captured Nov 4, 2026 (ET), read-only. Findings only; nothing was changed.">
      <Section heading="Takeaway">
        <Callout tone="warning">All three pages load in under 3 seconds and nothing secret is exposed. The one speed failure is switching to the Floors tab on Live HQ, which takes 3 to 3.4 seconds. Contrast on Working and Waiting cards is still the main accessibility gap.</Callout>
      </Section>
      <Section heading="Phase 7 — Performance" caption="Time from the Loading canvas screen to a usable page, one MacBook browser run each.">
        <Table columns={["Check", "Measured", "Result"]} rows={[
          ["PERF-01 Live HQ load", "1.8 s", P],
          ["PERF-02 Floor load", "2.0 s", P],
          ["PERF-03 Virtual Office load", "2.6 s", P],
          ["PERF-04 People to Activity switch", "0.5 s", P],
          ["PERF-05 Switch to Floors tab", "3.0–3.4 s", F],
          ["PERF-06 Pan and zoom", "Not retested; passed in Phase 3", { text: "PASS (Phase 3)", tone: "success" as const }],
          ["PERF-07 Long session (memory, CPU)", "Not run", "N/A"],
        ]} />
        <Text>The Floors tab is the drawn clay room, so the delay is most likely the room rendering. It feels sluggish next to the half-second People and Activity switch.</Text>
      </Section>
      <Section heading="Phase 8 — Security and accessibility">
        <Table columns={["Check", "Result", "Note"]} rows={[
          ["SEC-01 Page sharing", P, "Sharing left untouched"],
          ["SEC-02 No keys or tokens in page text", P, "None found in visible UI text"],
          ["SEC-03 Find input handling", P, "Filters cleanly; empty message is the known contrast bug"],
          ["A11Y-01 Esc to deselect", P, ""],
          ["A11Y-02 N and ] jump to next waiting", P, ""],
          ["A11Y-03 Tab focus order", "N/A", "Not testable in this setup"],
          ["A11Y-04 Contrast, Working and Waiting", F, "Known: dim next to bright Closed cards (UI-01, UI-02)"],
          ["A11Y-05 Screen-reader labels", P, "aria-labels present on cards, Find and nav"],
        ]} />
      </Section>
      <Section heading="New or confirmed defects">
        <BulletList items={[
          "PERF-05 · Medium: switching to Floors takes 3 to 3.4 seconds.",
          "A11Y-06 · Low: a blur or dim overlay may cover the page when a detail panel is open (same family as MOT-05).",
          "Note, not a defect: Open chat uses `grokbot://` links, which only work in the Grok Bot app. Expected.",
        ]} />
      </Section>
      <Section heading="Not covered">
        <BulletList items={["No long soak, memory or CPU profiling", "No Tab-key walkthrough or visible focus ring check", "No reduced-motion test", "No phone (480 px or less) run"]} />
      </Section>
      <Section heading="Related pages">
        <LinkCards links={[
          { title: "Phase 3 Motion Findings", href: B + "4503e1a5-71ab-44fc-b186-602d6dc01a28" },
          { title: "Phase 2 UI Findings — Live HQ", href: B + "d4f7beda-9f95-49df-bc36-a918dfbc618e" },
          { title: "Phase 1 Test Inventory", href: B + "53eac460-df77-4986-a5a0-62c479d3250d" },
        ]} />
      </Section>
    </Page>
  );
}
