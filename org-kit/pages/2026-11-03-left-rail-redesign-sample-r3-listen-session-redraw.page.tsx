// Grokbot Page export · title: Left rail redesign — SAMPLE r3 listen-session redraw · canvas_id: d7ca1c40-d923-458a-a226-3bb108408afe · last updated 2026-11-03
// Inline base64 images stripped: 0. Private details replaced with [private ...] placeholders.
// Recreate by pasting this source into a new Page (Cursor canvas, React/TSX).
import { Page, Section, Text, Callout, Table, Steps, Rows, Checklist, BulletList } from "grok/canvas";

export default function App() {
  return (
    <Page
      title="Left rail redesign — SAMPLE r3 listen-session redraw"
      width="column"
      summary="Revision r3 of the Live HQ left panel, redrawn from Tishan's listen-session feedback (Nov 3). Sample only: not shipped, and Live HQ has not been edited."
    >
      <Callout lead="Status: SAMPLE r3, not shipped" tone="info">
        This is a sample for review. Live HQ and the floors were not edited. OS Tester tests this sample next; nothing ships until a later own-words build yes and Rio's lock.
      </Callout>

      <Section heading="What Tishan liked and we kept">
        <BulletList
          marker="pro"
          items={[
            "People board in the middle is the hero: Waiting · Needs you on top, then Working",
            "Main tabs People, Floors, Activity drive what the middle shows",
          ]}
        />
      </Section>

      <Section heading="What changed from r2">
        <Table
          columns={["r2", "r3"]}
          rows={[
            ["Rail felt crowded", "Slimmer, calmer rail with far fewer items"],
            ["Needs you block in the left rail", "Removed; Needs you lives on the People board"],
            ["Other / footer (Headquarters, All people, Usage, Settings)", "Removed entirely"],
            ["Floors folded under Needs you", "Floors list parked, always visible, at the bottom of the rail"],
            ["Floor detail cards hard to read", "Higher-contrast text on floor cards"],
            ["Usage in the rail footer", "Usage in the top status bar with Snapshot, Working, Waiting, Closed"],
            ["Square, hard rail edges", "Soft rounded corners matching the HQ glass cards"],
          ]}
        />
      </Section>

      <Section heading="Proposed layout">
        <Steps
          steps={[
            { title: "Top status bar", detail: "Snapshot as of … · Working 12 · Waiting 3 · Closed 3 · Usage. Counts are SAMPLE, not live Floor." },
            { title: "Left rail, top", detail: "Live HQ with 7 floors · 18 people, then Main nav: People (selected), Floors, Activity, then Find people… search." },
            { title: "Left rail, bottom", detail: "Floors list parked bottom-left, always visible. No Needs you block, no Other block. Rounded corners like the rest of HQ." },
            { title: "Middle (hero)", detail: "People board. Waiting · Needs you on top (sample: Chief of Mailroom, Chief of Youtube, Script Writer), then Working below." },
            { title: "Floors view", detail: "Floor detail cards use brighter text on the dark glass so they read easily." },
          ]}
        />
      </Section>

      <Section heading="Residual to check at build">
        <Text>The mock rail may draw a little wider than the target of about 176 px for readability. If Tishan later says build yes, build QA should confirm the real rail sits at about 176 px with nothing wrapping or cut off.</Text>
      </Section>

      <Section heading="Still on hold">
        <Checklist
          items={[
            { text: "Decide-today list (on hold)" },
            { text: "Fresh check-ins (on hold)" },
            { text: "VO banner (on hold)" },
            { text: "Phone layout at 480 px and below (later)" },
            { text: "Any edit to Live HQ or floors (none made)", done: true },
          ]}
        />
      </Section>

      <Section heading="Next">
        <Rows
          rows={[
            { title: "OS Tester", detail: "Tests this SAMPLE r3 against the mock." },
            { title: "Tishan", detail: "Reply to Amanda with yes, no, or what to change, in your own words." },
            { title: "Ship", detail: "Only on a later own-words build yes plus Rio's lock." },
            { title: "Mock", detail: "Drive image: Live HQ — Left rail redesign SAMPLE r3 MacBook Nov 3.png" },
          ]}
        />
      </Section>
    </Page>
  );
}
