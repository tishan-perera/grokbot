// Grokbot Page export · title: OS Dashboard — Phase 1 Test Inventory · canvas_id: 53eac460-df77-4986-a5a0-62c479d3250d · last updated 2026-11-04
// Inline base64 images stripped: 0. Private details replaced with [private ...] placeholders.
// Recreate by pasting this source into a new Page (Cursor canvas, React/TSX).
import { Page, Section, Text, Table, TableOfContents, Checklist, Callout, LinkCards, BulletList } from "grok/canvas";

const B = "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/";

const plan: [string, string[]][] = [
  ["Phase 2 — UI", ["Top bar: Snapshot pill", "Top bar: Working filter pill", "Top bar: Waiting + stale pill", "Top bar: Closed X of 3 pill", "Top bar: Usage pill opens panel", "Top bar: Errors pill", "Top bar: sync note", "Left rail: People / Floors / Activity switch", "Left rail: Find people search", "Left rail: Floors list (8)", "Left rail: About / Limits drawer and links", "People: Waiting group cards", "People: Working group cards", "People: Pending group cards", "People: Closed group cards", "People: status chips and Updated age", "Right rail: empty helper", "Right rail: agent inspector buttons", "Right rail: nav panels (6)", "Settings: lighting toggle", "Settings: sound toggle", "Activity view list", "Floor Page: Segmented tabs (4)", "Floor Page: org chart, connectors table, OS projects", "Floor Page: who is on the floor, open doors, related links", "Virtual Office: room tour (12 rooms)", "Virtual Office: floors, roster, HQ links", "MacBook width layout and truncation", "Phone ≤480 layout", "Light and dark host themes", "Scrolling and overflow on long lists"]],
  ["Phase 3 — Motion", ["Hover feedback on cards and pills", "Button press feedback", "View transitions People/Floors/Activity", "Drawer and panel open/close", "Agent focus swoop on Floors", "Drag pan", "Wheel and button zoom", "Reset camera", "Elevator / skip to floor", "Waiting task bubbles and speech bubble", "Layout shift / flicker check", "Reduced-motion setting respected"]],
  ["Phase 4 — Agents (needs approval to message)", ["Identity and role match Floor for all 18 seats", "Status chip matches Floor for each seat", "Open chat link per agent (Grok Bot app)", "Next waiting / View on Floor links", "Send test instruction (approval needed)", "Agent reply received (approval needed)", "Delegation manager → agent (approval needed)", "Authorized tools only, no unauthorized actions", "Activity log updates after agent report"]],
  ["Phase 5 — End-to-end", ["Workflow A: task creation from dashboard", "Workflow B: delegation hand-off", "Workflow C: Floor → Live HQ → Virtual Office sync", "Workflow D: safe failure display", "Workflow E: refresh / reopen persistence", "Snapshot freshness vs Floor (e.g. Lex status)", "Floor level numbering consistency"]],
  ["Phase 6 — Integrations", ["Drive connector status", "Calendar connector status", "Gmail connector status", "TubeAlfred connector status", "Robinhood connector status (read-only)", "Finance connector status (read-only)", "Origin connector (zero namespaces)", "X connector status", "GitHub needsAuth shown correctly", "Embedded data vs real source check", "Usage figure vs plan usage"]],
  ["Phase 7 — Performance", ["Initial load time Live HQ", "Initial load time Floor and Virtual Office", "View switch response time", "Floors view frame rate", "Memory over a long session", "CPU during pan/zoom", "Repeated interaction stability"]],
  ["Phase 8 — Security and accessibility", ["Page sharing / who can open", "No secrets in page source", "Search input handling", "Keyboard: Esc ladder", "Keyboard: N/P and ]/[", "Keyboard: Tab plates, Enter/Space", "Focus indicators visible", "Contrast: Working/Waiting rows", "Contrast: Closed cards and helper", "Screen-reader labels"]],
  ["Phase 9–10 — Reporting", ["Bug log with IDs and severity", "Evidence screenshots per failure", "Coverage percentage", "Repair order", "Release-readiness assessment"]],
];
const total = plan.reduce((n, p) => n + p[1].length, 0);
const items = [
  { text: "Phase 1: all 7 surfaces mapped", done: true, meta: "Discovery" },
  { text: "Phase 1: architecture limits recorded", done: true, meta: "Discovery" },
  { text: "Phase 1: feature inventory drafted", done: true, meta: "Discovery" },
  ...plan.flatMap(([ph, xs]) => xs.map((t) => ({ text: t, done: false, meta: ph }))),
];

export default function App() {
  return (
    <Page width="wide" title="OS Dashboard — Phase 1 Test Inventory" summary="What exists in the AI Operating System dashboard and what will be tested next. Inventory only; no pass/fail results yet, no builds.">
      <TableOfContents items={[
        { label: "Executive takeaway" }, { label: "System map" }, { label: "Architecture and honest limits" },
        { label: "Live HQ control inventory" }, { label: "Floor and Virtual Office inventory" }, { label: "Agents and departments" },
        { label: "Connectors and integrations" }, { label: "Placeholders, unfinished and holds" }, { label: "Live browser confirmation" },
        { label: "Planned test coverage" }, { label: "Blocked or needs permission" }, { label: "Next step" },
      ]} />
      <Section heading="Executive takeaway">
        <Callout lead="Phase 1 complete" tone="info">{`7 surfaces, 9 feature areas, ${total} planned tests mapped (status as of 8:44 AM ET Nov 4). Phases 2–10 run next. Findings only; nothing is fixed without your approval.`}</Callout>
      </Section>
      <Section heading="System map">
        <Table columns={["Surface", "Role"]} rows={[
          ["Live HQ", "Command dashboard (snapshot of Floor)"], ["Organization Office Floor", "Source of truth for status"],
          ["Virtual Office Stage 4", "Visual mirror"], ["Architecture Assessment", "Design limits"], ["Stage 5 Automation Plan", "Plan"],
          ["Later to-dos", "Backlog"], ["HQ Dashboard archive", "Reference only"],
        ]} />
        <LinkCards links={[
          { title: "Live HQ", href: B + "6f83abe1-5a09-430d-8ca9-e402345351b1" },
          { title: "Organization Office Floor", href: B + "57ec2643-4823-4357-9d6d-048441701b31" },
          { title: "Virtual Office Stage 4", href: B + "18bcdf53-178c-44f8-8d6c-6440dc2acf3e" },
          { title: "Architecture Assessment", href: B + "579912b9-9eff-4457-9d76-191da4284a7c" },
          { title: "Stage 5 Automation Plan", href: B + "db830245-4904-488e-8023-9fdede1f0256" },
          { title: "Later to-dos", href: B + "a370d2fc-9acc-4867-8586-2ff6eb67150c" },
          { title: "HQ Dashboard archive", href: B + "ccdf396b-e5b0-442c-8582-bcda741d3d22" },
        ]} />
      </Section>
      <Section heading="Architecture and honest limits">
        <BulletList items={[
          "The Floor Page decides who is Working, Waiting or Closed.",
          "Amanda updates the Floor; Rio mirrors the Virtual Office; Live HQ holds a copy written into the page.",
          "Pages cannot refresh themselves, so Live HQ is a snapshot, not a live feed.",
          "No separate server or database; Origin is connected with zero namespaces.",
          "Status comes from agent reports and manual Floor updates, not live heartbeats.",
          "Usage is plan-level only (52.5%); per-agent usage is not available.",
          "Open chat links need the Grok Bot app.",
          "The 3D look is drawn clay-style SVG, not a 3D engine.",
        ]} />
      </Section>
      <Section heading="Live HQ control inventory">
        <Table columns={["Area", "Controls"]} rows={[
          ["Main views", "People (default), Floors, Activity"],
          ["Top bar", "Snapshot clock, Working filter, Waiting + stale, Closed X of 3, Usage panel, Errors, sync note"],
          ["Left rail", "Header, view switch, Find people, 8 floors, About / Limits drawer"],
          ["People board", "Waiting, Working, Pending, Closed groups; cards with role, floor, task, chip, Updated"],
          ["Floors view", "Clay room, elevator, nameplates, pan, zoom, Reset camera, Skip to floor, focus swoop, bubbles"],
          ["Right rail", "Empty helper; agent inspector (Open chat, Next waiting, View on Floor, Floor link); 6 nav panels"],
          ["Settings", "Time-of-day lighting, sound beeps"],
          ["Keyboard", "Esc, N/P or ]/[, Tab, Enter/Space, Skip"],
          ["Helpers listed", "Calendar look-ahead, OS digest, Connector health, Weekly chief check-in, Weekly blocker summary"],
        ]} />
      </Section>
      <Section heading="Floor and Virtual Office inventory">
        <Table columns={["Page", "Features"]} rows={[
          ["Floor", "Tabs: Floor plan / Org chart / Connectors / OS projects; org diagram; connectors table; Stage 1–5 checklist; who is on the floor; open doors; related links; history log"],
          ["Virtual Office", "12-room tour (exterior to map, research Closed); floors by rank; roster; HQ links; block-style NYC visual"],
        ]} />
        <Text>Consistency check: the Floor ranks Executive as 1 and Trading as 8; Live HQ numbers them the opposite way.</Text>
      </Section>
      <Section heading="Agents and departments">
        <Table columns={["Floor", "Seats on Live HQ"]} rows={[
          ["Executive", "Amanda, Prior CoS/HR (Closed)"], ["Operating System", "Rio, Lex, OS Tester"],
          ["Time Office", "Time Master"], ["Mail Room", "Mail Room Chief, Gmail, WhatsApp"],
          ["YouTube Studio", "YouTube Chief, YT Analyst, Script Writer"], ["Storage Room", "Storage"],
          ["Investments", "Investments, Credit (Pending), Gold Temp"], ["Trading / Finance", "Head of Trading, Playbook Backtester"],
        ]} />
        <Text>18 seats. Research seats are intentionally off the Live HQ board (Closed on Floor). Seat-to-floor grouping to be verified against the Floor in Phase 4.</Text>
      </Section>
      <Section heading="Connectors and integrations">
        <Table columns={["Connector", "Listed state"]} rows={[
          ["Drive, Calendar, Gmail", "Connected"], ["TubeAlfred, X", "Connected"],
          ["Robinhood, Finance", "Connected; trades locked"], ["Origin", "Connected, zero namespaces"], ["GitHub", { text: "needsAuth", tone: "warning" }],
        ]} />
      </Section>
      <Section heading="Placeholders, unfinished and holds">
        <BulletList items={[
          "Holds: Time Master calendar-write, Investments trades locked, Credit pending, GitHub needsAuth.",
          "Known soft leftovers: dim Working/Waiting rows, phone ≤480 polish, Usage pill clip, rail width.",
          "Holds: decide-today list, check-ins, Virtual Office banner.",
          "Pending: Open chat on-device click, real-phone layout.",
          "No task-create form exists in Live HQ; status is edited on the Floor.",
        ]} />
      </Section>
      <Section heading="Live browser confirmation" caption="Read-only MacBook capture, 8:42 AM ET Nov 4. Issues are Open candidates, not yet severity-rated.">
        <BulletList items={[
          "Views present: People (18), Floors, Activity (about 75 lines).",
          "Top bar read: Snapshot 8:42 AM ET, Working 13, Waiting 3 (3 stale), Closed 1 of 3, Usage 52.5%, Errors 0.",
          "Find people filters live: zzzz shows Nobody matches; rio shows 3.",
          "Rio card: Open chat, View on Floor, Floor link, Freshness Stale (>4h), keyboard hint.",
          "Floors: room, Skip to floor, zoom and Reset, empty helper, per-floor connectors.",
          "About footer present; Floor link opens the Floor Page.",
        ]} />
        <BulletList marker="con" items={[
          "Working/Waiting card names and tasks very dim.",
          "Usage pill, left header and right-rail task chips truncate at MacBook width.",
          "Activity timestamps out of order and undated.",
          "Closed 1 of 3 label is confusing next to Pending.",
          "Most cards updated about 46h ago; Lex shows Working on Live HQ while the Floor may say Waiting.",
          "Open chat not clickable in a regular browser.",
          "Sync symbol looks like a refresh button but does nothing.",
          "Screenshot capture flaky; one image saved this run.",
        ]} />
      </Section>
      <Section heading="Planned test coverage" caption="Status as of 8:44 AM ET Nov 4; only discovery items are done.">
        <Checklist items={items} />
      </Section>
      <Section heading="Blocked or needs permission">
        <BulletList items={[
          "No code changes without your approval via Amanda.",
          "Messaging agents in Phase 4 waits for your or Amanda's OK.",
          "Workflow A likely blocked: no task-create control found in the Pages.",
          "No destructive security tests, live trades or money movement.",
          "Real-time and database tests not applicable: there is no server.",
        ]} />
      </Section>
      <Section heading="Next step">
        <Text>Phase 2 UI testing on Live HQ, then the Floor and Virtual Office, with screenshots for every defect.</Text>
      </Section>
    </Page>
  );
}
