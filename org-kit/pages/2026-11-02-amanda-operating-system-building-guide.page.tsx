// Grokbot Page export · title: Amanda Operating System — Building Guide · canvas_id: b248199b-1584-4566-8921-8c29fecac1c3 · last updated 2026-11-02
// Inline base64 images stripped: 0. Private details replaced with [private ...] placeholders.
// Recreate by pasting this source into a new Page (Cursor canvas, React/TSX).
import { Page, Section, Text, Callout, Properties, Diagram, Table, Steps, ProsCons, Checklist, TableOfContents, Grid, useGrokTheme } from "grok/canvas";
import type { GrokTheme } from "grok/canvas";

function bot(t: GrokTheme, x: number, y: number, c: string, k: string, desk: boolean = true) {
  return (
    <g key={k}>
      {desk && <rect x={x - 38} y={y + 30} width={76} height={10} rx={3} fill={t.border.strong} />}
      {desk && <rect x={x - 20} y={y - 2} width={40} height={26} rx={4} fill={t.bg.elevated} stroke={t.border.strong} />}
      {desk && <rect x={x - 15} y={y + 3} width={30} height={3} rx={1} fill={c} />}
      {desk && <rect x={x - 15} y={y + 10} width={20} height={3} rx={1} fill={t.border.default} />}
      <circle cx={x} cy={y - 46} r={4} fill={c} />
      <line x1={x} y1={y - 42} x2={x} y2={y - 34} stroke={t.text.tertiary} strokeWidth={2} />
      <circle cx={x} cy={y - 20} r={15} fill={t.bg.subtle} stroke={c} strokeWidth={3} />
      <circle cx={x - 5} cy={y - 21} r={2.5} fill={t.text.primary} />
      <circle cx={x + 5} cy={y - 21} r={2.5} fill={t.text.primary} />
      <path d={`M ${x - 5} ${y - 14} Q ${x} ${y - 10} ${x + 5} ${y - 14}`} stroke={t.text.primary} strokeWidth={1.5} fill="none" />
      {!desk && <rect x={x - 14} y={y - 4} width={28} height={30} rx={10} fill={c} />}
    </g>
  );
}

function plant(t: GrokTheme, x: number, y: number, k: string) {
  const g = t.dataviz.categorical[2];
  return (
    <g key={k}>
      <ellipse cx={x - 8} cy={y - 18} rx={8} ry={14} fill={g} opacity={0.8} />
      <ellipse cx={x + 8} cy={y - 18} rx={8} ry={14} fill={g} opacity={0.8} />
      <ellipse cx={x} cy={y - 26} rx={8} ry={16} fill={g} />
      <rect x={x - 11} y={y - 8} width={22} height={18} rx={4} fill={t.border.strong} />
    </g>
  );
}

function label(t: GrokTheme, x: number, y: number, s: string, k: string) {
  return <text key={k} x={x} y={y} textAnchor="middle" fontSize={14} fill={t.text.secondary} fontFamily={t.font.family}>{s}</text>;
}

function OfficeFloor(t: GrokTheme) {
  const c = t.dataviz.categorical;
  const desks: [number, number, string, string][] = [
    [470, 250, c[0], "Chief of Mailroom"], [620, 250, c[0], "Head of Gmail"], [770, 250, c[0], "Head of WhatsApp"],
    [470, 400, c[1], "Chief of Youtube"], [620, 400, c[1], "YouTube Analyst"], [770, 400, c[1], "Script Writer"],
  ];
  return (
    <svg width="100%" viewBox="0 0 1280 520" role="img" aria-label="Amanda's office with bot helpers at desks">
      <rect x={10} y={10} width={1260} height={500} rx={16} fill={t.bg.subtle} stroke={t.border.default} />
      {[120, 300, 900, 1080].map((wx, i) => (
        <g key={"w" + i}>
          <rect x={wx} y={28} width={120} height={60} rx={6} fill={t.bg.base} stroke={t.border.strong} />
          <line x1={wx + 60} y1={28} x2={wx + 60} y2={88} stroke={t.border.strong} />
        </g>
      ))}
      <rect x={60} y={300} width={240} height={14} rx={4} fill={t.border.strong} />
      {bot(t, 180, 270, c[2], "rec")}
      {label(t, 180, 350, "Front desk: Amanda HQ", "lr")}
      {label(t, 620, 140, "Mail Room", "fm")}
      {label(t, 620, 470, "YouTube floor", "fy")}
      <rect x={950} y={130} width={260} height={130} rx={8} fill={t.bg.base} stroke={t.border.strong} />
      <rect x={975} y={150} width={150} height={8} rx={2} fill={c[0]} />
      <rect x={975} y={172} width={110} height={8} rx={2} fill={c[1]} />
      <rect x={975} y={194} width={180} height={8} rx={2} fill={c[2]} />
      <text x={975} y={235} fontSize={13} fill={t.text.secondary} fontFamily={t.font.family}>Draft only until Tishan says yes</text>
      {label(t, 1080, 285, "House rules board", "lw")}
      {bot(t, 1000, 420, c[2], "time", false)}
      {bot(t, 1110, 420, c[1], "qa", false)}
      {label(t, 1000, 480, "Time Master", "lt")}
      {label(t, 1110, 480, "Quality / rules", "lq")}
      {desks.map(([x, y, col, n]) => (
        <g key={n}>{bot(t, x, y, col, "b" + n)}{label(t, x, y + 62, n, "l" + n)}</g>
      ))}
      <rect x={40} y={410} width={110} height={70} rx={6} fill={t.bg.base} stroke={t.border.strong} />
      <line x1={40} y1={433} x2={150} y2={433} stroke={t.border.strong} />
      <line x1={40} y1={456} x2={150} y2={456} stroke={t.border.strong} />
      {bot(t, 215, 440, c[0], "stor", false)}
      {label(t, 150, 500, "Storage: Chief of Storage Room", "lf")}
      {plant(t, 360, 495, "p1")}{plant(t, 880, 495, "p2")}{plant(t, 1240, 120, "p3")}
      <path d="M 225 260 C 320 200 380 200 430 220" stroke={t.text.tertiary} strokeWidth={2} strokeDasharray="6 6" fill="none" />
      <path d="M 225 280 C 320 360 380 380 430 380" stroke={t.text.tertiary} strokeWidth={2} strokeDasharray="6 6" fill="none" />
    </svg>
  );
}

function MiniScene(t: GrokTheme, kind: number) {
  const c = t.dataviz.categorical;
  return (
    <svg width="100%" viewBox="0 0 300 170" role="img" aria-label="Department scene">
      <rect x={4} y={4} width={292} height={162} rx={12} fill={t.bg.subtle} stroke={t.border.default} />
      {kind === 0 && <g><rect x={40} y={30} width={60} height={40} rx={4} fill={t.bg.base} stroke={t.border.strong} /><path d="M 40 30 L 70 52 L 100 30" fill="none" stroke={c[0]} strokeWidth={2} />{bot(t, 110, 125, c[0], "g", false)}{bot(t, 200, 125, c[0], "w", false)}</g>}
      {kind === 1 && <g><rect x={30} y={30} width={130} height={80} rx={6} fill={t.bg.base} stroke={t.border.strong} /><path d="M 85 52 L 85 88 L 115 70 Z" fill={c[1]} />{bot(t, 220, 100, c[1], "y")}</g>}
      {kind === 2 && <g>{[40, 100, 160].map((x, i) => (<g key={i}><rect x={x} y={40} width={44} height={110} rx={4} fill={t.bg.base} stroke={t.border.strong} /><line x1={x} y1={77} x2={x + 44} y2={77} stroke={t.border.strong} /><line x1={x} y1={113} x2={x + 44} y2={113} stroke={t.border.strong} /></g>))}{bot(t, 245, 125, c[0], "m", false)}</g>}
      {kind === 3 && <g><circle cx={90} cy={80} r={45} fill={t.bg.base} stroke={t.border.strong} strokeWidth={3} /><line x1={90} y1={80} x2={90} y2={50} stroke={c[2]} strokeWidth={3} /><line x1={90} y1={80} x2={112} y2={90} stroke={c[2]} strokeWidth={3} />{bot(t, 220, 115, c[2], "t", false)}</g>}
    </svg>
  );
}

export default function App() {
  const t = useGrokTheme();
  const toc = ["The big idea", "Amanda's office", "What Amanda's OS does", "How a request flows", "The floors and who sits there", "Step-by-step building guide", "Phased roadmap", "Why this works, and what to watch", "First two weeks", "Your next decision"];
  const ids = ["idea", "office", "does", "flow", "floors", "steps", "roadmap", "proscons", "first", "next"];
  return (
    <Page width="wide" title="Amanda Operating System — Building Guide" summary="Amanda's operating system for Tishan: how her agent office runs today, and a plain-English plan to finish and harden it floor by floor.">
      <TableOfContents items={toc.map((l, i) => ({ label: l, id: ids[i] }))} />
      <Section heading="The big idea" id="idea">
        <Callout lead="In one sentence">Amanda's OS is the headquarters she runs for you: Tishan owns the company and sets direction, Amanda runs the office day to day, and nothing goes out to the world until you approve it.</Callout>
      </Section>
      <Section heading="Amanda's office" id="office">
        {OfficeFloor(t)}
        <Text>Amanda sits at the front desk as Chief of Staff and Head of HR. She takes your requests, hands them to the right chief, hires and enables new agents, and keeps the HR records. The Mail Room, YouTube and Storage floors report to her, and so does the Time Master.</Text>
        <Grid columns={4}>
          <Section heading="Mail Room">{MiniScene(t, 0)}<Text>Chief of Mailroom, with Head of Gmail and Head of WhatsApp.</Text></Section>
          <Section heading="YouTube">{MiniScene(t, 1)}<Text>Chief of Youtube, with a YouTube Analyst and a Script Writer.</Text></Section>
          <Section heading="Storage">{MiniScene(t, 2)}<Text>Chief of Storage Room: files, archives and shared knowledge.</Text></Section>
          <Section heading="Time">{MiniScene(t, 3)}<Text>Time Master: calendar, scheduling and time management.</Text></Section>
        </Grid>
      </Section>
      <Section heading="What Amanda's OS does" id="does">
        <Properties items={[
          { label: "Routes work", value: "Amanda reads every request and sends it to the chief whose floor owns it." },
          { label: "Hires and enables", value: "Amanda adds new agents, writes their job descriptions and keeps HR records." },
          { label: "Remembers", value: "The Storage floor keeps files, past work and facts about you in one place." },
          { label: "Draft-only outbound", value: "Email, WhatsApp and other outward messages stay drafts until you approve them in your own words." },
          { label: "Publish and delete gates", value: "Nothing publishes on YouTube, and Storage never deletes or overwrites, without the same own-words yes from you." },
          { label: "Keeps you in charge", value: "You give direction and approve; you never have to manage each bot yourself." },
        ]} />
      </Section>
      <Section heading="How a request flows" id="flow">
        <Diagram direction="horizontal" nodes={[
          { id: "you", label: "Tishan", detail: "Owner", kind: "person" },
          { id: "amanda", label: "Amanda", detail: "Front desk, Chief of Staff", kind: "person" },
          { id: "chief", label: "Chief", detail: "Mail, YouTube, Storage or Time" },
          { id: "spec", label: "Specialists", detail: "e.g. Head of Gmail, Script Writer" },
          { id: "ext", label: "Goes outside?", kind: "decision" },
          { id: "draft", label: "Draft for Tishan", detail: "Waits for your yes" },
          { id: "done", label: "Result to Tishan", kind: "terminal" },
        ]} edges={[
          { from: "you", to: "amanda", label: "asks" },
          { from: "amanda", to: "chief", label: "assigns" },
          { from: "chief", to: "spec" },
          { from: "spec", to: "ext" },
          { from: "ext", to: "draft", label: "yes" },
          { from: "ext", to: "done", label: "no" },
          { from: "draft", to: "done", label: "approved" },
        ]} />
      </Section>
      <Section heading="The floors and who sits there" id="floors">
        <Table columns={["Floor", "Who sits there", "What happens there"]} rows={[
          ["Front desk / Amanda HQ", "Amanda, Chief of Staff and Head of HR", "Takes your requests, routes work, hires agents, keeps HR records, oversees the floors"],
          ["Mail Room", "Chief of Mailroom, Head of Gmail, Head of WhatsApp", "Sorts into Urgent, Action, Route, FYI and Noise; drafts only; WhatsApp watches [private name], [private name] and [private name], and [private group] unless you expand"],
          ["YouTube", "Chief of Youtube, YouTube Analyst, Script Writer", "Studies the channel and writes scripts; nothing publishes without your own-words approval"],
          ["Storage", "Chief of Storage Room", "Keeps files and knowledge tidy; never deletes or overwrites without your own-words approval"],
          ["Time", "Time Master (reports to Amanda)", "Runs your calendar, scheduling and reminders"],
          ["Architect (unslotted)", "Operating System Architect", "Designing this OS guide; not yet placed on a floor until you say so"],
          ["Closed floors", "[private group] Watch, [private name] Watch, prior Chief of Staff", "Terminated or standing down; permanent delete only if you say so in your own words"],
        ]} />
      </Section>
      <Section heading="Step-by-step building guide" id="steps">
        <Steps steps={[
          { title: "Write your owner rules down once", detail: "One page: draft-only for anything outward, never spend money or delete without asking. Done when Amanda and every chief follow the same page." },
          { title: "Map the reporting lines", detail: "Confirm who reports to whom: chiefs to Amanda, specialists to their chief, Time Master to Amanda. Done when every agent can name its boss and its one job." },
          { title: "Strengthen Amanda's front desk", detail: "Agree how Amanda decides which floor gets a request and when she asks you instead. Done when ten real requests each land on the right floor first time." },
          { title: "Wire the Mail Room", detail: "Gmail and WhatsApp heads sort, summarize and draft replies. Done when you get a daily digest and drafts waiting for your yes, with nothing sent on its own." },
          { title: "Wire the YouTube floor", detail: "The Analyst reports what is working; the Script Writer turns that into drafts. Done when you get one weekly report and one script draft you would actually use." },
          { title: "Wire Storage and Time", detail: "Storage files everything in one known place; Time Master owns your calendar and reminders. Done when any agent can find a past file and your week is planned without gaps." },
          { title: "Enforce the three gates every time", detail: "Amanda checks draft-only outbound, YouTube publish only with your yes, and Storage never deletes without your yes. Done when a test week shows zero unapproved sends, publishes or deletes." },
          { title: "Run two real pilot weeks", detail: "Use the office on your actual work and log every miss. Done when misses are few and each has a fix." },
          { title: "Expand only when floors are reliable", detail: "Amanda hires new agents one at a time, only for a floor that passed its pilot. Done when each new hire passes its own pilot week." },
        ]} />
      </Section>
      <Section heading="Phased roadmap" id="roadmap">
        <Table columns={["Phase", "Focus", "Includes", "Status"]} rows={[
          ["1. Foundation", "Amanda and her chiefs", "Amanda as Chief of Staff, floors staffed, closed floors retired, draft-only rule", "Partly in place"],
          ["2. Daily work", "Mail, YouTube, Time running daily", "Mail digests and drafts, weekly YouTube report and script, calendar planning, pilot weeks", "Proposed"],
          ["3. Scale", "Grow carefully", "New hires on proven floors, scheduled routines, Storage as the single source of truth", "Proposed"],
        ]} />
      </Section>
      <Section heading="Why this works, and what to watch" id="proscons">
        <ProsCons prosHeading="Why Amanda's model helps" consHeading="Risks to watch" pros={[
          "One person to talk to: Amanda routes everything",
          "Each floor has a chief, so problems have an owner",
          "Draft-only keeps your name safe in email and WhatsApp",
          "Storage means you never repeat yourself",
          "Closed floors keep the office lean",
        ]} cons={[
          "Over-hiring before current floors are reliable",
          "Fuzzy lines between Mail Room and Time Master on invites",
          "Drafts piling up if approvals are slow",
          "Storage going stale if nobody files new work",
          "Amanda becoming a bottleneck if every small call goes to her",
        ]} />
      </Section>
      <Section heading="First two weeks" id="first">
        <Checklist items={[
          { text: "Owner rules page agreed: draft-only outbound, YouTube publish gate, Storage delete gate", done: false, meta: "Days 1–2" },
          { text: "Reporting lines confirmed for all active agents", done: false, meta: "Day 2" },
          { text: "Closed floors recorded in HR records as closed", done: false, meta: "Day 3" },
          { text: "Amanda routes ten real requests to the right floor", done: false, meta: "Days 3–4" },
          { text: "Mail Room sends a daily digest and drafts only", done: false, meta: "Days 4–7" },
          { text: "Time Master plans next week's calendar", done: false, meta: "Day 5" },
          { text: "Storage folder layout set and past files filed", done: false, meta: "Days 6–7" },
          { text: "YouTube Analyst report and first script draft delivered", done: false, meta: "Days 8–10" },
          { text: "Pilot review with Amanda: fix, keep, or expand", done: false, meta: "Day 14" },
        ]} />
      </Section>
      <Section heading="Your next decision" id="next">
        <Callout lead="Pick one floor">Which floor should Amanda strengthen first: Mail Room, YouTube, Storage, or Time? Start with the one that saves you the most time each week.</Callout>
      </Section>
    </Page>
  );
}
