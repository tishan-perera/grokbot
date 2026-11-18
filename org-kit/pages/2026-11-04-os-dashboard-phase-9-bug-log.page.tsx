// Grokbot Page export · title: OS Dashboard — Phase 9 Bug Log · canvas_id: 6590d696-1587-4375-a826-55db2e30b6af · last updated 2026-11-04
// Inline base64 images stripped: 0. Private details replaced with [private ...] placeholders.
// Recreate by pasting this source into a new Page (Cursor canvas, React/TSX).
import { Page, Section, Text, Callout, Table, TableOfContents, Segmented, useState } from "grok/canvas";

const H = { text: "High", tone: "danger" as const };
const M = { text: "Med", tone: "warning" as const };
const L = "Low";

type Row = [string, string, { text: string; tone: "danger" | "warning" } | string, string, string, string, string];

const bugs: Row[] = [
  ["UI-01", "Working card names and tasks washed out", H, "Live HQ", "Lex UX", "P2 HQ, P3, P8", "Contrast"],
  ["UI-02", "Waiting card names and tasks washed out", H, "Live HQ", "Lex UX", "P2 HQ, P3, P8", "Contrast"],
  ["MOT-02", "People card text dark on dark (same root as UI-01/02)", H, "Live HQ", "Lex UX", "P3", "Contrast"],
  ["UI-03", "Pending card (Credit) dim", H, "Live HQ", "Lex UX", "P2 HQ", "Contrast"],
  ["UI-05", "Find \u201cNobody matches\u201d invisible, dark on dark", H, "Live HQ", "Lex UX", "P2 HQ", "Contrast"],
  ["UI-07", "Activity timestamps invisible, out of order, undated", H, "Live HQ", "Lex UX + Rio", "P2 HQ, P3", "Contrast"],
  ["UI-F01", "Lex is Waiting on Floor and VO but Working on Live HQ", H, "Live HQ", "Rio sync-data", "P2 Floor/VO, P4, P5", "Sync"],
  ["SYNC-01", "Live HQ is a hand-copied snapshot; most cards about 46h old", H, "Live HQ", "Rio sync-data", "P5", "Sync"],
  ["UI-V01", "VO banner stale (Nov 2 roster 9/3/1) and contradicts its intro (12/4/3)", H, "VO", "Rio sync-data", "P2 Floor/VO", "Sync"],
  ["INT-01", "Usage 52.5% (Nov 2) vs live 26.6%; metric unlabeled", H, "Live HQ", "Rio sync-data", "P6", "Integrations"],
  ["UI-F04", "Floor numbering reversed: Executive 8 on Live HQ, 1 on Floor/VO", H, "Live HQ", "Tishan decide, then Lex", "P2 Floor/VO, P4, P5", "Floor/VO"],
  ["UI-04", "Header capsule clips Usage; Errors and sync status hidden", H, "Live HQ", "Lex UX", "P2 HQ", "Layout"],
  ["UI-06", "About panel marked open but not visible", H, "Live HQ", "Lex UX", "P2 HQ, P3", "Layout"],
  ["SYNC-02", "Waiting count 3 on Live HQ vs 4 on Floor", M, "Live HQ", "Rio sync-data", "P4, P5", "Sync"],
  ["UI-10", "Lex task text stale on Live HQ", M, "Live HQ", "Rio sync-data", "P2 HQ, P4", "Sync"],
  ["UI-F03", "Floor Connectors data dated Nov 2", M, "Floor", "Amanda Floor", "P2 Floor/VO", "Sync"],
  ["UI-08", "Truncation: Usage, left header, rail task", M, "Live HQ", "Lex UX", "P2 HQ", "Layout"],
  ["UI-F02", "Floor banner holds about 50k characters of history, burying Latest", M, "Floor", "Amanda Floor", "P2 Floor/VO", "Floor/VO"],
  ["MOT-01", "People cards give no hover feedback", M, "Live HQ", "Lex UX", "P3", "Motion"],
  ["MOT-03", "Activity author and timestamp weak contrast", M, "Live HQ", "Lex UX", "P3", "Contrast"],
  ["MOT-05", "Grey dim overlay over rail while Usage or Floors open", M, "Live HQ", "Lex UX", "P3", "Motion"],
  ["PERF-05", "Floors tab switch takes 3 to 3.4 s", M, "Live HQ", "Lex UX", "P7/8", "Perf"],
  ["INT-02", "GitHub needsAuth (shown honestly)", M, "All", "Tishan decide", "P6", "Integrations"],
  ["UI-09", "Usage panel labels dim", L, "Live HQ", "Lex UX", "P2 HQ", "Contrast"],
  ["UI-F06", "Floor tabs and body text low contrast", L, "Floor", "Lex UX", "P2 Floor/VO", "Contrast"],
  ["UI-F05", "Org chart cramped, multi-line history in nodes, lines overlap", L, "Floor", "Amanda Floor", "P2 Floor/VO", "Layout"],
  ["MOT-04", "Floors right-rail details dim", L, "Live HQ", "Lex UX", "P3", "Motion"],
  ["UI-F07", "Credit wording differs: Seat live vs Pending; no roster row", L, "Floor", "Amanda Floor", "P2 Floor/VO, P4", "Floor/VO"],
  ["FLR-01", "Seat names differ across pages (Mail Room Chief vs Chief of Mailroom)", L, "All", "Amanda Floor", "P4", "Floor/VO"],
  ["UI-V02", "VO has no link back to Live HQ", L, "VO", "Rio sync-data", "P2 Floor/VO", "Floor/VO"],
  ["FLR-02", "\u201cClosed 1 of 3\u201d label confusing next to Pending", L, "Live HQ", "Lex UX", "P1", "Floor/VO"],
  ["FLR-03", "Sync icon looks like a refresh button but does nothing", L, "Live HQ", "Lex UX", "P1", "Layout"],
  ["INT-03", "Origin connected with zero namespaces", L, "All", "Tishan decide", "P6", "Integrations"],
  ["A11Y-06", "Possible blur or dim overlay when a detail panel is open", L, "Live HQ", "Lex UX", "P7/8", "A11y"],
  ["V4", "VO banner is a wall of small text; pale chips and footer", L, "VO", "Rio sync-data", "P2 Floor/VO", "Contrast"],
];

const groups = ["All", "Contrast", "Sync", "Layout", "Motion", "Integrations", "Floor/VO", "Perf", "A11y"];

export default function App() {
  const [g, setG] = useState<string>("All");
  const shown = bugs.filter((b: Row) => g === "All" || b[6] === g).map((b: Row) => [b[0], b[1], b[2], b[3], b[4], b[5], "Open"]);
  const count = (s: string) => bugs.filter((b: Row) => typeof b[2] === "object" && b[2].text === s).length;
  return (
    <Page width="full" title="OS Dashboard — Phase 9 Bug Log" summary="Every defect found in Phases 1–8 in one list, with a stable ID, severity, owner suggestion and the phase Page that holds the evidence. All items are Open; nothing has been fixed.">
      <TableOfContents items={[{ label: "Summary" }, { label: "Master bug log" }, { label: "Owner key" }, { label: "Evidence pages" }]} />
      <Section heading="Summary">
        <Callout tone="danger">{`${bugs.length} Open defects: ${count("High")} High, ${count("Med")} Medium, ${bugs.length - count("High") - count("Med")} Low. The High list is mostly two root causes: dim text on Live HQ, and Live HQ being a stale copy of the Floor.`}</Callout>
      </Section>
      <Section heading="Master bug log" caption="Sorted High first. Use the switch to show one group.">
        <Segmented options={groups} value={g} onChange={(v: string) => setG(v)} />
        <Table columns={["ID", "Defect", "Severity", "Surface", "Owner", "Evidence", "Status"]} rows={shown} />
      </Section>
      <Section heading="Owner key">
        <Table columns={["Owner", "Covers"]} rows={[
          ["Lex UX", "Contrast, layout, truncation, hover, overlays, Floors speed"],
          ["Rio sync-data", "Live HQ republish from Floor, as-of stamps, Usage, VO banner"],
          ["Amanda Floor", "Floor statuses, banner history, connectors date, names"],
          ["Tishan decide", "Floor numbering direction, GitHub sign-in, Origin namespaces"],
        ]} />
        <Text>Owners are suggestions only. No agent has been messaged and no fix has been assigned.</Text>
      </Section>
      <Section heading="Evidence pages">
        <Table columns={["Phase", "Link"]} rows={[
          ["P1 Inventory", "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/53eac460-df77-4986-a5a0-62c479d3250d"],
          ["P2 HQ", "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/d4f7beda-9f95-49df-bc36-a918dfbc618e"],
          ["P2 Floor/VO", "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/cbe01755-1a95-4b0e-a70e-d01cae625bd3"],
          ["P3 Motion", "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/4503e1a5-71ab-44fc-b186-602d6dc01a28"],
          ["P4 Agents", "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/75ecce3f-307e-474d-b116-0a6d01e2ec7d"],
          ["P5 Workflows", "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/f3cc2408-829c-4825-83ab-1c8f8a300d5c"],
          ["P6 Integrations", "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/54c879e8-7040-4451-b16a-6188b08d2429"],
          ["P7/8", "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/cd369fce-063e-49ef-9f66-04593ea34524"],
        ]} />
      </Section>
    </Page>
  );
}
