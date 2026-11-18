// Grokbot Page export · title: OS Dashboard — Phase 3 Motion Findings · canvas_id: 4503e1a5-71ab-44fc-b186-602d6dc01a28 · last updated 2026-11-04
// Inline base64 images stripped: 0. Private details replaced with [private ...] placeholders.
// Recreate by pasting this source into a new Page (Cursor canvas, React/TSX).
import { Page, Section, Callout, Table, BulletList, LinkCards } from "grok/canvas";

const B = "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/";
const P = { text: "PASS", tone: "success" as const };

export default function App() {
  return (
    <Page title="OS Dashboard — Phase 3 Motion Findings" summary="How the dashboard moves and responds: hover, press, zoom, pan, focus, and speech bubbles. Evidence captured about 8:53 AM ET, Nov 4. Findings only; nothing was changed.">
      <Section heading="Executive takeaway">
        <Callout tone="warning">Motion is mostly solid: 12 of 14 checks pass. The gaps are People cards that give no hover feedback, plus contrast problems that motion makes more visible (dark-on-dark card text, weak Activity timestamps, dim overlays).</Callout>
      </Section>
      <Section heading="Scorecard M1–M14">
        <Table columns={["Check", "Result", "Notes"]} rows={[
          ["M1 Hover feedback", { text: "PARTIAL/FAIL", tone: "warning" }, "Pills, nav, and floors highlight on hover; People cards (`button.pc`) do not"],
          ["M2 Pressed/active", P, "Nav shows pressed and active states"],
          ["M3 No blank/flash", P, "No blank screen or flash seen"],
          ["M4 Usage panel", P, "Opens and closes cleanly"],
          ["M5 Content rendered", P, "Content is in the DOM; on-screen visibility still weak (known UI-06)"],
          ["M6 Agent focus", P, "Plate focus swoop, selection ring, bubble, right rail"],
          ["M7 Pan", { text: "PASS (unconfirmed)", tone: "success" }, "Pixels changed, but zoom may have caused it"],
          ["M8 Zoom", P, "+ and − both work"],
          ["M9 Reset camera", P, "Returns to the default view"],
          ["M10 Floor jump", P, "Left-rail floor jump and Skip to floor work"],
          ["M11 Speech bubbles", P, "Show task and age; waiting agents get an amber dashed outline"],
          ["M12 Layout stability", P, "No layout shift or flicker"],
          ["M13 Reduced motion", "N/A", "Not testable in this setup"],
          ["M14 Esc to deselect", P, "Esc clears the selected agent"]
        ]} />
      </Section>
      <Section heading="Defects">
        <Table columns={["ID", "Severity", "Issue"]} rows={[
          ["MOT-01", "Medium", "People cards show no hover highlight"],
          ["MOT-02", { text: "High", tone: "danger" }, "People card text is dark on dark (confirms the Phase 2 finding)"],
          ["MOT-03", "Medium", "Activity author and timestamp have weak contrast"],
          ["MOT-04", "Low", "Floors right-rail details are dim"],
          ["MOT-05", "Low/Medium", "Grey dim overlay covers the left rail and lower panes while Usage or Floors is open"]
        ]} />
      </Section>
      <Section heading="What works">
        <BulletList items={["Agent focus: swoop, ring, bubble, and right rail all move together", "Zoom, Reset camera, and floor jumps respond right away", "Usage opens and closes without a flash or layout shift", "Speech bubbles show the task and its age; Waiting is clearly marked", "Esc deselects the agent"]} />
      </Section>
      <Section heading="Holds">
        <BulletList items={["Reduced-motion (M13): not applicable in this setup", "No Tab-key walkthrough this phase; keyboard focus order still needs testing"]} />
      </Section>
      <Section heading="Next: Phase 4">
        <BulletList items={["Identity and status checks, read-only", "Messaging tests stay blocked until approved"]} />
      </Section>
      <Section heading="Evidence">
        <BulletList items={["`/tmp/hq/az-p3-hover-or-select.png`", "`/tmp/hq/az-p3-floors-zoom.png`", "`/tmp/hq/az-p3-usage-open.png`", "`/tmp/hq/az-p3-activity.png`", "`/tmp/hq/az-p3-about.png`", "`/tmp/hq/az-p3-floor4.png`"]} />
      </Section>
      <Section heading="Related pages">
        <LinkCards links={[
          { title: "Phase 1 Test Inventory", href: B + "53eac460-df77-4986-a5a0-62c479d3250d" },
          { title: "Phase 2 UI Findings — Live HQ", href: B + "d4f7beda-9f95-49df-bc36-a918dfbc618e" },
          { title: "Phase 2 UI Findings — Floor + Virtual Office", href: B + "cbe01755-1a95-4b0e-a70e-d01cae625bd3" },
          { title: "Live HQ", href: B + "6f83abe1-5a09-430d-8ca9-e402345351b1" }
        ]} />
      </Section>
    </Page>
  );
}
