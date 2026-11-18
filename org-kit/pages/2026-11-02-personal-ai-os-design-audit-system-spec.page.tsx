// Grokbot Page export · title: Personal AI OS — Design Audit & System Spec · canvas_id: f9aaa167-a806-4193-af6f-ef6bcce6169b · last updated 2026-11-02
// Inline base64 images stripped: 0. Private details replaced with [private ...] placeholders.
// Recreate by pasting this source into a new Page (Cursor canvas, React/TSX).
import { Page, Section, Text, Callout, Table, TableOfContents, BulletList, Checklist, Rows, Properties, LinkCards, Steps, useGrokTheme } from "grok/canvas";

function ShapeStrip() {
  const t = useGrokTheme();
  const shapes = ["square", "squircle", "circle", "pill", "tri", "diamond", "hex", "star", "cloud"];
  const W = 1000;
  const step = W / shapes.length;
  const draw = (s: string, cx: number, cy: number) => {
    const st = { fill: "none", stroke: t.text.secondary, strokeWidth: 2 };
    switch (s) {
      case "square": return <rect x={cx - 18} y={cy - 18} width={36} height={36} {...st} />;
      case "squircle": return <rect x={cx - 18} y={cy - 18} width={36} height={36} rx={11} {...st} />;
      case "circle": return <circle cx={cx} cy={cy} r={19} {...st} />;
      case "pill": return <rect x={cx - 26} y={cy - 13} width={52} height={26} rx={13} {...st} />;
      case "tri": return <polygon points={`${cx},${cy - 20} ${cx + 21},${cy + 17} ${cx - 21},${cy + 17}`} {...st} />;
      case "diamond": return <polygon points={`${cx},${cy - 22} ${cx + 22},${cy} ${cx},${cy + 22} ${cx - 22},${cy}`} {...st} />;
      case "hex": return <polygon points={[0, 1, 2, 3, 4, 5].map((i: number) => `${cx + 20 * Math.cos(Math.PI / 3 * i)},${cy + 20 * Math.sin(Math.PI / 3 * i)}`).join(" ")} {...st} />;
      case "star": return <polygon points={Array.from({ length: 10 }, (_: unknown, i: number) => { const r = i % 2 ? 9 : 21; const a = Math.PI / 5 * i - Math.PI / 2; return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`; }).join(" ")} {...st} />;
      default: return <path d={`M${cx - 20},${cy + 10} a10,10 0 0,1 4,-18 a12,12 0 0,1 22,-2 a9,9 0 0,1 14,12 z`} {...st} />;
    }
  };
  return (
    <svg width="100%" viewBox={`0 0 ${W} 100`} role="img" aria-label="Agent shape vocabulary">
      {shapes.map((s: string, i: number) => {
        const cx = step * i + step / 2;
        return (
          <g key={s}>
            {draw(s, cx, 40)}
            <text x={cx} y={88} textAnchor="middle" fill={t.text.tertiary} fontFamily={t.font.family} fontSize={13}>{s}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function App() {
  return (
    <Page width="wide" title="Personal AI OS — Design Audit & System Spec" summary="An audit of Floor, Virtual Office and Live HQ as inspected Nov 2, 2026 around 1:18 PM ET, with the shared design system, motion rules and the order of fixes agreed with Rio.">
      <TableOfContents items={[
        { label: "Executive takeaway" },
        { label: "Surface comparison" },
        { label: "Visual direction" },
        { label: "Design system spec" },
        { label: "Iconography & identity" },
        { label: "Interaction & motion" },
        { label: "Priority roadmap" },
        { label: "First ship with Rio" },
        { label: "Related Pages" },
      ]} />

      <Section heading="Executive takeaway">
        <Callout lead="Ambitious craft, three competing visual languages.">Floor is the strongest kit citizen and the source of truth. Live HQ has the richest interaction, and since fix #1 its HUD chrome follows light and dark mode (theme-safe paper + ink); the clay stage stays light on purpose. Virtual Office owns the brand mark. The fix is one shared token set for status and agent identity, with each surface keeping its own job.</Callout>
        <Text>Lex is hired and landed on Floor, Virtual Office and Live HQ (AI Systems floor, hex #F43F5E, Open chat wired); roster is 9 Working.</Text>
      </Section>

      <Section heading="Surface comparison">
        <Table
          columns={["Surface", "Role", "Visual language", "Theme", "Interaction", "Sync", "Gaps"]}
          rows={[
            ["Floor", "Source of truth, ops HQ", "Kit-native, flat 2D floor plan", { text: "Full", tone: "success" }, "Segmented views, org Diagram, tables", "Manual snapshot 10:28 AM", "Lex seat landed (9 Working); Credit seat pending"],
            ["Virtual Office", "Brand and room tour", "Minecraft-NYC blocks, creeper green", { text: "Mostly", tone: "success" }, "Room tour, roster mirror", "Mirrors Floor", "Some as-of times lag Floor"],
            ["Live HQ", "Premium command layer", "Clay isometric + dark glass HUD", { text: "Full (fix #1)", tone: "success" }, "Pan, zoom, elevator, agent motion", "Manual from Floor, no polling", "Phone layout shipped, not device-tested"],
          ]}
        />
      </Section>

      <Section heading="Visual direction">
        <Text>One OS, three registers. Clay HQ command, a block brand mark, and kit-native ops share the same status and identity tokens, so an agent looks like the same agent everywhere.</Text>
        <Rows rows={[
          { lead: "Floor", title: "Ops-clean", detail: "Stays pure kit: tables, Diagram, Checklist. No decoration beyond status pills and identity tiles." },
          { lead: "VO", title: "Minecraft-NYC brand", detail: "Keeps creeper greens #3FAE3F / #2C7A2C and wood #B07A45. Paper and ink follow the theme." },
          { lead: "Live HQ", title: "Premium command layer", detail: "Clay isometric office (pale floors, beige desks, white stools, charcoal chairs, matte plants, soft shadows) under a dark glass HUD. Title: Personal AI OS · Live HQ." },
        ]} />
      </Section>

      <Section heading="Design system spec">
        <Callout tone="info" lead="Living source of truth.">These tokens are the reference for every surface. Values are copied from what Live HQ ships today (its SC status map and agent roster), not invented. Change a token here first, then on the surfaces.</Callout>
        <Section heading="Status tokens">
          <Table
            columns={["Token", "Value", "Use"]}
            rows={[
              ["status.working", "#A3E635 (alt #4ADE80)", "Lime badge; only Working agents bob. #4ADE80 is the scene's chart line."],
              ["status.waiting", "#F59E0B (Live HQ SC); #FBBF24 lighter variant", "Amber badge; needs Tishan or a dependency"],
              ["status.error", "Red", "Errors only; never decorative"],
              ["status.closed", "#71717A", "Closed seats; gray"],
              ["status.pending", "#A78BFA", "Pending seats (e.g. Credit) awaiting Floor confirm"],
              ["status.stale", "Neutral, labeled", "Stale or Unknown after 4h; never shown as Offline"],
              ["brand.creeper", "#3FAE3F / #2C7A2C", "VO mark and brand accents"],
              ["brand.wood", "#B07A45", "VO surfaces"],
              ["agent.accent", "Stable per agent", "Identity only, never status"],
            ]}
          />
          <Text>Traffic-light semantics: lime means moving, amber means waiting, red means broken, gray means closed, violet means not yet seated. The status word is always printed beside the color.</Text>
        </Section>
        <Section heading="Agent identity tokens">
          <Table
            columns={["Agent", "Shape", "Color", "Floor"]}
            rows={[
              ["Amanda", "star", "#F472B6", "exec"],
              ["Prior CoS/HR", "circle", "#A1A1AA", "exec"],
              ["Mail Room Chief", "square", "#3B82F6", "mail"],
              ["Gmail", "pill", "#EF4444", "mail"],
              ["WhatsApp", "squircle", "#22C55E", "mail"],
              ["YouTube Chief", "tri", "#F97316", "yt"],
              ["YT Analyst", "hex", "#06B6D4", "yt"],
              ["Scriptwriter", "diamond", "#A855F7", "yt"],
              ["Storage", "cloud", "#EAB308", "store"],
              ["Time Master", "circle", "#14B8A6", "ti"],
              ["Investments", "square", "#84CC16", "ti"],
              ["Credit", "tri", "#8B5CF6", "ti"],
              ["Rio", "star", "#0EA5E9", "ai"],
              ["Lex", "hex", "#F43F5E", "ai"],
            ]}
          />
          <BulletList items={[
            "Shape plus color is fixed per agent and never changes on refresh or between surfaces.",
            "Shape vocabulary: square, squircle, circle, pill, tri, diamond, hex, star, cloud.",
            "Identity color is never used to show status; the status badge sits beside it.",
            "Lex: hex, #F43F5E, ai floor, Open chat `grokbot://app/v1/agent?id=8c422837-7598-43ec-9d51-edf55b88f027`.",
          ]} />
        </Section>
        <Section heading="HUD glass tokens">
          <Properties items={[
            { label: "Surface", value: "`--hq-glass`: theme raised background at 84–86% with 14 px blur (shipped in fix #1); original spec dark 0.8–0.88" },
            { label: "Ink", value: "`--hq-ink` theme primary text; `--hq-muted` theme secondary text" },
            { label: "Border", value: "`--hq-glass-border` thin 1 px theme border; `--hq-glass-border-strong` for selected" },
            { label: "Fills", value: "`--hq-fill`, `--hq-fill-hover`, `--hq-on`, `--hq-rule`, `--hq-focus`, `--hq-link`, `--hq-frame`" },
            { label: "Radius", value: "24 px frame and stage, 20 px panels, 12–14 px buttons and cards, pills fully round" },
            { label: "Source", value: "All `--hq-*` vars set from `useGrokTheme()`, so the HUD follows light and dark mode" },
          ]} />
        </Section>
        <Section heading="Clay scene tokens">
          <BulletList items={[
            "Pale floors and walls (#F4F4F5, #ECEDEF), beige communal desks and rug, white stools and sofa.",
            "Charcoal chairs, matte green plants, soft shadows; the clay stage stays light in both themes on purpose.",
            "Codila-inspired, with no Codila branding. Title is always Personal AI OS · Live HQ.",
          ]} />
        </Section>
        <Section heading="Honesty rules">
          <BulletList items={[
            "Floor is the source of truth; other surfaces mirror it and never poll.",
            "Stale or Unknown after 4 hours is not Offline; label it as such.",
            "No fabricated Resting states, heartbeats or per-agent costs.",
            "Open chat links use `grokbot://app/v1/agent?id=<uuid>`.",
            "Sound is muted by default; time-of-day lighting is optional.",
          ]} />
        </Section>
        <Section heading="Rules">
          <BulletList items={[
            "Paper and ink always come from useGrokTheme; brand, status and identity accents may be hardcoded.",
            "Status badges stay separate from an agent's identity color.",
            "Type and spacing: kit scale only; no custom font families.",
          ]} />
        </Section>
        <Section heading="Component patterns">
          <Properties items={[
            { label: "Status pill", value: "Label plus token color; text always says the state" },
            { label: "Agent identity tile", value: "Shape + accent + name, same on all three surfaces" },
            { label: "Floor chrome", value: "Floor label, as-of time, Open chat link (grokbot://app/v1/agent?id=<uuid>)" },
          ]} />
        </Section>
      </Section>

      <Section heading="Iconography & identity">
        <ShapeStrip />
        <BulletList items={[
          "Shape is identity: each agent keeps one shape for life, already started in Live HQ.",
          "Color reinforces identity; status shows as a separate badge.",
          "Name is always present in lists and on focus; shapes alone never carry meaning.",
          "Creeper mark: VO and brand moments only, never as a status signal.",
        ]} />
      </Section>

      <Section heading="Interaction & motion">
        <Rows rows={[
          { lead: "Keep", title: "Elevator, floor slide, focus zoom, bob for Working", detail: "These carry meaning and make Live HQ feel alive." },
          { lead: "Tone down", title: "Constant motion on idle agents", detail: "Only Working agents move; respect reduced-motion settings." },
          { lead: "Access", title: "Sound muted by default", detail: "Beeps are opt-in; every state readable without color." },
          { lead: "Mobile", title: "Stacks under 720 px", detail: "Shipped in fix #2: single column, scene first, pan-y vertical scroll, 44 px zoom targets, wrapping pills with overflow handled, and Reset becomes ⟲ under 400 px. CSS only so far; not yet tested on a real phone or phone browser." },
          { lead: "Sprint 2", title: "Chair draw-order fixed", detail: "Shipped ~1:35 PM ET Nov 2: front charcoal chairs now draw after the desk top, so desk edges no longer clip them." },
        ]} />
      </Section>

      <Section heading="Priority roadmap" caption="Status as of Nov 2, 2026, ~1:40 PM ET.">
        <Checklist items={[
          { text: "Lex seat landed on Floor, VO and Live HQ (ai floor, hex #F43F5E, Open chat wired)", meta: "Done · Rio", done: true },
          { text: "Top 5 Live HQ fixes agreed with Rio (approved Nov 2)", meta: "P0", done: true },
          { text: "#1 Live HQ theme pass shipped (paper and ink from theme)", meta: "P0 · approved by Rio", done: true },
          { text: "#2 Live HQ phone layout under 720 px shipped", meta: "P0 · approved by Rio", done: true },
          { text: "#3 Codila density and inspector clarity shipped", meta: "P0 · approved by Rio", done: true },
          { text: "#4 Shared status and identity tokens living on this Page", meta: "P1 · Design system spec", done: true },
          { text: "#5 Light Floor and VO consistency pass", meta: "P1 · shipped Nov 2", done: true },
          { text: "Sprint 2: chair draw-order fix on Live HQ (front chairs after desk top)", meta: "Shipped ~1:35 PM ET Nov 2", done: true },
          { text: "Sprint 2: phone verify notes recorded on this Page (what shipped, what is untested)", meta: "Notes only · not a device test", done: true },
          { text: "Phone check on a real device, all three surfaces", meta: "P1 · still open, needs a real phone" },
        ]} />
        <Text>Out of scope: org structure, calendar-write hold, Investments trade lock, new repos, Three.js, fake heartbeats or usage, and any status change not synced from Floor.</Text>
      </Section>

      <Section heading="First ship with Rio">
        <Steps steps={[
          { title: "Theme-aware Live HQ chrome", detail: "Glass HUD stays dark; stage and page chrome follow light and dark mode." },
          { title: "Honest status badges", detail: "Shared tokens, separate from identity color, with Stale/Unknown after 4h." },
          { title: "Phone layout under 720 px", detail: "Readable roster, working Open chat, sound off by default." },
        ]} />
        <Text>Rio keeps Floor data, Open chat and honesty rules; Lex proposes and implements only after agreement.</Text>
      </Section>

      <Section heading="Related Pages">
        <LinkCards links={[
          { title: "Floor", href: "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/57ec2643-4823-4357-9d6d-048441701b31" },
          { title: "Virtual Office Stage 4", href: "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/18bcdf53-178c-44f8-8d6c-6440dc2acf3e" },
          { title: "Live HQ Command Dashboard", href: "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/6f83abe1-5a09-430d-8ca9-e402345351b1" },
          { title: "Architecture Assessment & Implementation Plan", href: "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/579912b9-9eff-4457-9d76-191da4284a7c" },
        ]} />
      </Section>
    </Page>
  );
}
