// Grokbot Page export · title: OS Dashboard — Phase 6 Integrations · canvas_id: 54c879e8-7040-4451-b16a-6188b08d2429 · last updated 2026-11-04
// Inline base64 images stripped: 0. Private details replaced with [private ...] placeholders.
// Recreate by pasting this source into a new Page (Cursor canvas, React/TSX).
import { Page, Section, Text, Table, Callout, Rows } from "grok/canvas";

export default function App() {
  return (
    <Page title="OS Dashboard — Phase 6 Integrations" summary="Findings only, as of Nov 4, 2026 (ET). Connector states match what the dashboard shows; the Usage figure is stale; agent data on Live HQ is a copied snapshot. No destructive tests run." width="wide">
      <Section heading="Connector status">
        <Table columns={["Connector", "Dashboard shows", "Result", "Note"]} rows={[
          ["Google Drive", "Connected", { text: "PASS", tone: "success" }, ""],
          ["Google Calendar", "Connected", { text: "PASS", tone: "success" }, ""],
          ["Gmail", "Connected", { text: "PASS", tone: "success" }, ""],
          ["TubeAlfred (YouTube)", "Connected", { text: "PASS", tone: "success" }, ""],
          ["X", "Connected", { text: "PASS", tone: "success" }, ""],
          ["Robinhood", "Connected, trades locked", { text: "PASS", tone: "success" }, "Read-only by design; no trade attempted."],
          ["Finance", "Connected, trades locked", { text: "PASS", tone: "success" }, "Read-only by design."],
          ["Cursor Origin", "Connected, zero namespaces", { text: "PARTIAL", tone: "warning" }, "Connected but nothing usable configured."],
          ["GitHub", "needsAuth", { text: "FAIL (shown correctly)", tone: "danger" }, "Needs sign-in; the dashboard labels it honestly."]
        ]} />
        <Text>Sources: Floor connectors panel and Live HQ per-floor connectors captured in Phases 1–2.</Text>
      </Section>
      <Section heading="Usage cross-check">
        <Table columns={["Source", "Value", "As of"]} rows={[
          ["Live HQ Usage panel (embedded)", "52.5% plan-level", "about 1:03 PM ET, Nov 2"],
          ["CheckSubscriptionUsage (live)", "26.6% weekly limit, Super plan", "8:54 AM ET, Nov 4"]
        ]} />
        <Callout tone="warning" lead="Stale and not comparable">The panel is about 44 hours old and does not match the live figure. Usage cannot fall within one weekly window (next reset Sun Nov 8, 8:40 PM ET), so the panel likely measured a different metric or window. Label the panel with its metric and as-of time, and refresh it on republish.</Callout>
      </Section>
      <Section heading="Embedded data vs real source">
        <Rows rows={[
          { title: "Live HQ AGENTS array", detail: "Copied snapshot at write time; not polled. Explains the Lex Working vs Waiting gap.", status: { label: "Snapshot", tone: "warning" } },
          { title: "Usage panel", detail: "Embedded number; drifts from the live plan meter.", status: { label: "Stale", tone: "warning" } },
          { title: "Connector states", detail: "Match the real connector list as of this check.", status: { label: "Matches", tone: "success" } }
        ]} />
      </Section>
      <Section heading="Repair implications">
        <Rows rows={[
          { title: "Rio (data/sync)", detail: "Regenerate AGENTS and Usage from live sources on each republish; stamp an as-of time." },
          { title: "Tishan", detail: "Re-authenticate GitHub; decide whether Origin needs namespaces." },
          { title: "Lex (UX)", detail: "Name the Usage metric (weekly vs other) so it is not misread." }
        ]} />
      </Section>
    </Page>
  );
}
