// Grokbot Page export · title: Later to-dos · canvas_id: a370d2fc-9acc-4867-8586-2ff6eb67150c · last updated 2026-11-02
// Inline base64 images stripped: 0. Private details replaced with [private ...] placeholders.
// Recreate by pasting this source into a new Page (Cursor canvas, React/TSX).
import { Page, Section, Text, Checklist, Callout } from "grok/canvas";

export default function App() {
  return (
    <Page
      title="Later to-dos"
      summary="Backlog home owned by Time Master — status as of Nov 2, 2026 ~10:28 AM ET."
      width="column"
    >
      <Callout lead="How this works">
        Time Master owns this backlog plus daily Top 3 and timed reminders. Amanda coordinates. Say what to add or do next anytime.
      </Callout>
      <Section heading="Queued" caption="Status as of Nov 2, 2026 ~10:28 AM ET · Eastern · Time Master owns">
        <Checklist
          items={[
            {
              text: "Teach Script Writer how I like to make videos",
              done: false,
              meta: "YouTube · Script Writer",
            },
            {
              text: "Storage: copy OLD method folder + build a better-structured copy (GROKBOT METHOD)",
              done: true,
              meta: "Hold lifted ~10:28 AM ET — videos + [private name] scans / work underway with Storage",
            },
            {
              text: "YouTube unlock: lock premise and/or top up research credits",
              done: false,
              meta: "YouTube floor · Waiting on Tishan",
            },
          ]}
        />
      </Section>
      <Section heading="Notes">
        <Text>
          When you're ready, walk me through your style (hooks, length, language,
          structure) or point me at example videos — I'll brief Script Writer from that.
        </Text>
      </Section>
    </Page>
  );
}
