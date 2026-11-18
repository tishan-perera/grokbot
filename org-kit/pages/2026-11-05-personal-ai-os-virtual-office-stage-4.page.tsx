// Grokbot Page export · title: Personal AI OS — Virtual Office (Stage 4) · canvas_id: 18bcdf53-178c-44f8-8d6c-6440dc2acf3e · last updated 2026-11-05
// Inline base64 images stripped: 0. Private details replaced with [private ...] placeholders.
// Recreate by pasting this source into a new Page (Cursor canvas, React/TSX).
import {
  Page,
  Section,
  Text,
  Callout,
  Rows,
  LinkCards,
  Segmented,
  BulletList,
  useState,
  useGrokTheme,
} from "grok/canvas";

type RoomKey =
  | "exterior"
  | "entrance"
  | "reception"
  | "open"
  | "private"
  | "conference"
  | "lounge"
  | "pantry"
  | "focus"
  | "hallway"
  | "research"
  | "map";

const CREEPER = "#3FAE3F";
const CREEPER_DARK = "#2C7A2C";
const WOOD = "#B07A45";

const ROOM_INFO: Record<RoomKey, { label: string; who: string; line: string }> = {
  exterior: { label: "Exterior", who: "Whole HQ", line: "Glass NYC tower at dusk, glowing floors, green block brand mark on the crown." },
  entrance: { label: "Entrance", who: "Everyone", line: "Revolving glass doors, block planters, the green pixel logo over the door." },
  reception: { label: "Reception", who: "Amanda · Executive", line: "Amanda's front desk (Working): every request and every chief report comes through here." },
  open: { label: "Open Workspace", who: "Floor 3 YouTube Studio · Floor 5 Ground Floor (Mail Room + Time + Storage)", line: "Department desks, 5-floor reorg (Tishan confirm ~11:19 AM ET Nov 4): Floor 3 YouTube Studio (Chief of Youtube, YouTube Analyst, Script Writer) · Floor 5 Ground Floor (Mail Room: Chief of Mailroom, Head of Gmail, Head of WhatsApp · Time Master · Chief of Storage). Working: Gmail, WhatsApp, Time Master. Waiting: Mailroom chief, YouTube chief, Script Writer, YouTube Analyst (comment-read paused · idle), Storage chief (media copy COMPLETE 2,629 / 2,629 · idle), Clay Avatar Artist (no Live HQ build order · soft-clay lock held). Phase 1 idle cleanup ~12:05 PM ET Nov 5." },
  private: { label: "Private Office", who: "Floor 4 AI Operations · Rio + Lex · Chief Design Engineer + OS Tester + Clay Avatar Artist", line: "Floor 4 · AI Operations. Update ~3:32 PM ET Nov 5: Stage 3 Pass 1 → Pass 2 (Amanda order ~3:31 · Lex visual PASS) · OS Tester Waiting → Working · Lex + Rio stay Working · soft-clay lock held · Shared task queue stays live · roster 11 Working · 6 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Prior ~3:05 PM ET Nov 5: Stage 3 BUILD start (Amanda order ~3:02 · Tishan chose must-fix + should-fix) · Lex + Rio Waiting → Working · OS Tester stays Waiting until ship · soft-clay lock held · Shared task queue stays live · roster 10 Working · 7 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Prior ~2:46 PM ET Nov 5: Floor section test PARKED (Amanda park-confirm ~2:45 · read-only findings only) · OS Tester Working → Waiting · Lex / Rio stay Waiting · Stage 2 parked held · roster 8 Working · 9 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Prior ~2:44 PM ET Nov 5: OS Tester Working refresh · Floor section test (read-only Floor walk on 57ec2643 · Tishan-ordered via Amanda) · not a Stage Pass · Lex / Rio stay Waiting · Stage 2 parked held · roster 9 Working · 8 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Prior ~2:18 PM ET Nov 5: OS Tester Waiting → Working · independent read-only Agent OS UX walk (Tishan-ordered via Amanda) · not a Stage Pass · Lex / Rio stay Waiting · Stage 2 parked held · roster 9 Working · 8 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Prior ~1:45 PM ET Nov 5: Stage 2 PARKED (Amanda park-confirm ~1:42 · OS Tester Pass 1+2 PASS) · Lex / OS Tester / Rio → Waiting · Stage 2 parked · roster 8 Working · 9 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Prior ~1:15 PM ET Nov 5: Stage 2 Pass 1+2 · OS Tester Waiting → Working · Lex stays Working (visual done, awaiting park) · Rio stays Working · roster 11 Working · 6 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Prior ~1:10 PM ET Nov 5: Stage 2 dashboard build · Lex + Rio → Working · OS Tester stays Waiting until Pass · roster 10 Working · 7 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Prior ~12:05 PM ET Nov 5: Phase 1 idle cleanup (Tishan Fix all via Amanda ~12:03) · Clay Avatar Artist Working → Waiting · Lex, OS Tester, Rio stay Waiting · soft-clay lock held · roster 8 Working · 9 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Prior ~9:54 AM ET Nov 5: walk soft bugs parked (Pass 1+2 PASS · Amanda confirm) · Lex, OS Tester, Rio → Waiting · Clay Avatar Artist stays Working · roster 11 Working · 6 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Prior ~9:42 AM ET Nov 5: Lex shipped walk soft bugs (~9:36) · OS Tester Waiting → Working (Pass 1+2 on walk soft bugs ship · Floor 5/FLOOR 3 · AI Ops bubbles · desk name trunc on Live HQ 6f83abe1) · Lex stays Working · Rio Waiting (park-pending) · Clay Avatar Artist stays Working · soft leftover beep stays deferred · soft-clay lock held · Research not recreated · Live HQ untouched · roster 13 Working · 4 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Prior ~9:35 AM ET Nov 5: Amanda walk soft bugs wave — Lex Working (Floor 5 panel FLOOR 3 · AI Ops bubble overlap · desk name truncation on Live HQ 6f83abe1) · OS Tester Waiting (gate armed · Pass 1+2 after Lex ship) · Rio Waiting (park-pending) · Clay Avatar Artist stays Working · soft leftover beep stays deferred · soft-clay lock held · Research not recreated · roster 12 Working · 5 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Prior ~9:16 AM ET Nov 5: Amanda park-confirm — soft leftovers clear Pass 1+2 PASS · Lex, OS Tester, Rio Waiting · Clay Avatar Artist stays Working · soft leftover beep (audio) deferred · roster 11 Working · 6 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Prior ~9:13 AM ET Nov 5: Lex shipped soft leftovers on Live HQ (~9:12 · sync click / Floor 4 camera re-frame / Skip–Usage) · OS Tester Working (Pass 1+2) · Lex stays Working · Rio Waiting · Clay Avatar Artist stays Working · roster 13 Working · 4 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Prior ~9:10 AM ET Nov 5: Amanda soft leftovers clear wave — Lex Working (sync click feedback · Floor 4 camera framing · Skip/Usage overlap on Live HQ) · OS Tester Waiting (gate armed · Pass 1+2 after Lex ship) · Rio Waiting (park stamp after PASS + Amanda confirm) · Clay Avatar Artist stays Working · roster 12 Working · 5 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Prior ~8:52 AM ET Nov 5: Amanda park-confirmed finish-HQ polish Pass 1+2 PASS — Lex Waiting (finish-HQ polish parked · soft leftovers deferred) · OS Tester Waiting (Pass 1+2 PASS parked) · Rio Waiting (Floor→VO→Live HQ finish-HQ polish park stamp complete) · Clay Avatar Artist stays Working · roster 11 Working · 6 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Prior ~8:40 AM ET Nov 5: OS Tester Waiting → Working · Pass 1+2 on finish-HQ polish (Lex shipped ~8:35) · park only on PASS + Amanda confirm · Lex stays Working · Clay stays Working · Rio stays Waiting · roster 13 Working · 4 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Update ~8:28 AM ET Nov 5: Lex Working · finish-HQ polish wave on Live HQ · OS Tester stays Waiting until Pass · Rio Waiting · Clay Working · roster 12 Working · 5 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Update ~7:47 AM ET Nov 5: Clay Avatar Artist hired by Amanda per Tishan — Working · soft-clay mini desk people avatars for Live HQ (Lex + OS Tester collab) · Lex, OS Tester, Rio stay Waiting. Update ~8:07 AM ET Nov 5: Lex Working · soft-clay Live HQ trial integrate (Clay assets /workspace/clay-avatars/) · OS Tester Pass 1+2 before park · OS Tester, Rio stay Waiting. Update ~8:22 AM ET Nov 5: Amanda park-confirmed soft-clay Live HQ trial Pass 1+2 PASS — Lex Waiting (soft-clay trial parked · soft notes deferred) · OS Tester Waiting (Pass 1+2 PASS parked) · Rio Waiting (Floor→VO→Live HQ soft-clay park stamp complete) · Clay Avatar Artist stays Working · roster 11 Working · 6 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Prior ~8:17 AM ET Nov 5: OS Tester Working · Pass 1+2 on soft-clay Live HQ trial (Lex shipped) · park only on PASS + Amanda confirm · Lex stays Working · Rio stays Waiting · roster 13 Working · 4 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Prior ~11:24 AM ET Nov 4: 5-floor reorg parked (Amanda park-confirm after OS Tester Pass 1+2 PASS) — Lex Waiting (5-floor reorg parked · soft leftovers deferred) · OS Tester Waiting (5-floor Pass 1+2 done) · Rio Waiting (Floor→VO 5-floor sync parked) · roster 10 Working · 6 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Prior ~11:20 AM ET Nov 4: 5-floor reorg (Tishan confirm via Amanda) — Lex Working (Live HQ 5-floor reorg UI) · Rio Working (Floor→VO 5-floor reorg sync) · OS Tester Working (Pass 1+2 standby for 5-floor reorg) · roster 13 Working · 3 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Update ~9:20 AM ET Nov 4: Highs wave parked (Amanda park-confirm after OS Tester Pass 1+2 PASS) — Lex, OS Tester, Rio Working → Waiting · roster 10 Working · 6 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Update ~9:08 AM ET Nov 4: Highs fix wave — Lex Waiting → Working (UI-F04 numbering + UI-07 timestamps) · Rio Working (SYNC-01 · UI-V01 · INT-01 · UI-07 data) · OS Tester Working (Highs re-check standby) · roster 13 Working · 3 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Update ~8:42 AM ET Nov 4: OS Tester confirmed Working · A–Z OS dashboard audit (read-only findings; no builds until Tishan reviews) · Lex stays Waiting · roster 12 Working · 4 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Update ~7:50 AM ET Nov 4: Lex Working → Waiting (parked per Amanda) · Closed/empty-state contrast REDO shipped (Lex Pass 3) + OS Tester Pass 1+2 PASS · awaiting Amanda park confirm · soft: Working/Waiting People row contrast later. Roster 12 Working · 4 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Prior ~7:41 AM ET Nov 4: Lex Waiting → Working · Live HQ Closed/empty-state contrast REDO (Tishan still cannot see Closed / empty-state on floor cards after first pass; harder contrast for Closed + No agent selected helper; no org invent; Research Closed; Credit Pending leave-as-is). Roster 13 Working · 3 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Prior ~7:40 AM ET Nov 4: Lex Working → Waiting · Live HQ Closed/inactive floor-card contrast shipped 6f83abe1 + MacBook soft QA a–f PASS (SC.Closed #D4D4D8; People .pc.c; scene muted 0.82/0.92; Working/Waiting unchanged; Research Closed off board; Credit Pending leave-as-is). Prior ~7:37 AM ET Nov 4: Lex Waiting → Working · Live HQ Closed/inactive contrast fix on floor cards (Tishan: cannot read Closed seat text e.g. Executive Prior CoS/HR; raise Closed/inactive contrast across floor cards on Live HQ 6f83abe1; no org invent; Research stays Closed). Prior ~5:21 PM ET Nov 3: Lex Working → Waiting · Live HQ Floors list + tower shipped + MacBook soft QA a–f PASS (floors-by-rank; SOURCE stack matched Floor SoT). Rio's glass office (Working): Floor sync standby · side-by-side with Lex. OS Tester (Working · hired ~1:51 PM ET Nov 3 · reports to Amanda): solutions architect / QA / devops · current (~8:42 AM ET Nov 4): A–Z OS dashboard audit (Live HQ / Floor / VO + related OS Pages) — read-only findings; no builds until Tishan reviews · prior: read-only Live HQ + Floor/VO assessment + UI/UX suggestions; no build Older stamps in Prior · history." },
  conference: { label: "Conference", who: "Chiefs + Amanda", line: "Check-in table for Stage 3 chief reports and Friday blocker reviews." },
  lounge: { label: "Lounge", who: "Shared", line: "Sofas, block plants, skyline window. Shared space — no department seated here (Time = Floor 5 Ground Floor, Investments = Floor 2 Finance)." },
  pantry: { label: "Pantry", who: "Shared", line: "Coffee bar and counter: where the morning digest is read with coffee." },
  focus: { label: "Focus Booths", who: "Floor 2 Finance (Trading + Finance seats)", line: "Booths for Floor 2 Finance (5-floor reorg ~11:20 AM ET Nov 4): Chief on Investments · Chief of Credit (Pending) · Head of Trading · Playbook · Backtester · Gold Fundamentals · Temp. Time Master moved to Floor 5 Ground Floor. Time Office Working — owns reminders, Top 3, timed nudges, Later to-dos (calendar writes still hold); Investments Working on Robinhood (read-only until further policy); Gold Fundamentals · Temp Working (Finance, MGC gold via Metals Daily; temp extended 2 weeks through EOD Tue Nov 17 2026 ET per Tishan own-words via Amanda ~4:04 PM ET Nov 3; prior: Closed EOD ~4:00 PM ET, superseded). Trading Department Phase 0 (Finance, reports Amanda, ~10:14 AM ET Nov 3): Head of Trading Working (day-trade lead, paper week, no live orders) and Playbook · Backtester Working (one stock strategy + paper scorecard) — stocks only, 3% daily max loss, 1% risk/trade, max 1 position." },
  hallway: { label: "Hallway", who: "Everyone", line: "Glass corridor linking every room; reports flow up to Amanda." },
  research: { label: "Research Room · Closed (fired)", who: "Closed · Research department fired by Tishan ~7:53 AM ET Nov 3 · seats gone", line: "Update ~7:53 AM ET Nov 3: Research department FIRED by Tishan via Amanda — Markets · Research and Grokbot Research Closed/fired, seats gone, room empty, not to be recreated; morning brief routine deleted by Amanda. History: Research department (hired ~7:42 AM ET Nov 3 per Tishan via Amanda; both report to Amanda). Update ~7:46 AM ET Nov 3: Research halted per Tishan via Amanda. Markets · Research (Waiting): build halted · morning brief paused · U.S. equities only. Grokbot Research (Waiting): standby · no X research until reopen." },
  map: { label: "Dept map", who: "All departments", line: "Which department sits in which room." },
};

function Scene({ room }: { room: RoomKey }) {
  const theme = useGrokTheme();
  const ink = theme.text.primary;
  const muted = theme.text.secondary;
  const faint = theme.text.tertiary;
  const paper = theme.bg.base;
  const panel = theme.bg.subtle;
  const line = theme.border.default;
  const glass = theme.dataviz.categorical[2];
  const blue = theme.dataviz.categorical[0];
  const yellow = theme.dataviz.categorical[1];
  const f = theme.font.family;
  const W = 1200;
  const H = 520;
  const floorY = 400;

  const plant = (x: number, y: number, s: number, k: string) => (
    <g key={k}>
      <rect x={x} y={y + s * 2} width={s * 2} height={s * 1.4} fill={WOOD} stroke={line} />
      <rect x={x - s * 0.5} y={y} width={s} height={s} fill={CREEPER} />
      <rect x={x + s * 0.5} y={y - s} width={s} height={s} fill={CREEPER_DARK} />
      <rect x={x + s * 1.5} y={y} width={s} height={s} fill={CREEPER} />
      <rect x={x + s * 0.5} y={y} width={s} height={s * 2} fill={CREEPER} />
    </g>
  );

  const person = (x: number, y: number, shirt: string, name: string, k: string) => (
    <g key={k}>
      <rect x={x - 2} y={y - 4} width={26} height={26} fill={WOOD} stroke={line} />
      <rect x={x - 2} y={y - 4} width={26} height={7} fill={muted} />
      <rect x={x + 3} y={y + 8} width={5} height={4} fill={ink} />
      <rect x={x + 14} y={y + 8} width={5} height={4} fill={ink} />
      <rect x={x - 1} y={y + 22} width={24} height={28} fill={shirt} stroke={line} />
      <rect x={x + 8} y={y + 22} width={6} height={10} fill={paper} />
      <rect x={x - 7} y={y + 24} width={6} height={22} fill={shirt} />
      <rect x={x + 23} y={y + 24} width={6} height={22} fill={shirt} />
      <rect x={x + 1} y={y + 50} width={9} height={22} fill={ink} opacity={0.7} />
      <rect x={x + 12} y={y + 50} width={9} height={22} fill={ink} opacity={0.7} />
      {name ? (
        <text x={x + 11} y={y - 8} textAnchor="middle" fill={ink} fontSize={13} fontFamily={f} fontWeight={600}>
          {name}
        </text>
      ) : null}
    </g>
  );

  const creeperMark = (x: number, y: number, s: number) => (
    <g>
      <rect x={x} y={y} width={s * 8} height={s * 8} fill={CREEPER} />
      <rect x={x + s} y={y + s * 2} width={s * 2} height={s * 2} fill={CREEPER_DARK} />
      <rect x={x + s * 5} y={y + s * 2} width={s * 2} height={s * 2} fill={CREEPER_DARK} />
      <rect x={x + s * 3} y={y + s * 4} width={s * 2} height={s * 3} fill={CREEPER_DARK} />
      <rect x={x + s * 2} y={y + s * 5} width={s} height={s * 3} fill={CREEPER_DARK} />
      <rect x={x + s * 5} y={y + s * 5} width={s} height={s * 3} fill={CREEPER_DARK} />
    </g>
  );

  const skyline = (y0: number, h0: number) =>
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
      const h = h0 * (0.4 + ((i * 37) % 60) / 100);
      return (
        <g key={`sky-${i}`}>
          <rect x={60 + i * 92} y={y0 + h0 - h} width={70} height={h} fill={panel} stroke={line} />
          {[0, 1, 2].map((j) => (
            <rect key={j} x={70 + i * 92 + j * 20} y={y0 + h0 - h + 12} width={10} height={10} fill={yellow} opacity={0.5} />
          ))}
        </g>
      );
    });

  const glassWall = (x: number, y: number, w: number, h: number, panes: number) => (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={glass} opacity={0.12} stroke={line} />
      {Array.from({ length: panes - 1 }).map((_, i) => (
        <line key={i} x1={x + ((i + 1) * w) / panes} y1={y} x2={x + ((i + 1) * w) / panes} y2={y + h} stroke={line} />
      ))}
    </g>
  );

  const desk = (x: number, y: number, w: number, k: string, tag?: string) => (
    <g key={k}>
      <rect x={x} y={y} width={w} height={14} fill={WOOD} stroke={line} />
      <rect x={x + 6} y={y + 14} width={8} height={40} fill={WOOD} />
      <rect x={x + w - 14} y={y + 14} width={8} height={40} fill={WOOD} />
      <rect x={x + w / 2 - 24} y={y - 36} width={48} height={32} fill={paper} stroke={line} />
      <rect x={x + w / 2 - 20} y={y - 32} width={40} height={24} fill={blue} opacity={0.35} />
      {tag ? (
        <text x={x + w / 2} y={y + 72} textAnchor="middle" fill={muted} fontSize={13} fontFamily={f}>
          {tag}
        </text>
      ) : null}
    </g>
  );

  const frame = (children: JSX.Element) => (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`${ROOM_INFO[room].label} scene`}>
      <rect x={0} y={0} width={W} height={H} fill={paper} stroke={line} rx={16} />
      {room !== "exterior" && room !== "map" ? (
        <g>
          <rect x={0} y={floorY} width={W} height={H - floorY} fill={panel} />
          {Array.from({ length: 30 }).map((_, i) => (
            <line key={i} x1={i * 40} y1={floorY} x2={i * 40} y2={H} stroke={theme.border.subtle} />
          ))}
          <line x1={0} y1={floorY} x2={W} y2={floorY} stroke={line} />
        </g>
      ) : null}
      {children}
      <text x={24} y={H - 16} fill={faint} fontSize={12} fontFamily={f}>
        {`${ROOM_INFO[room].label} · ${ROOM_INFO[room].who}`}
      </text>
      {creeperMark(W - 56, H - 52, 4)}
    </svg>
  );

  if (room === "exterior") {
    return frame(
      <g>
        <rect x={0} y={0} width={W} height={H} fill={blue} opacity={0.08} rx={16} />
        {skyline(230, 170)}
        <rect x={440} y={60} width={320} height={340} fill={glass} opacity={0.22} stroke={line} />
        {Array.from({ length: 10 }).map((_, r) =>
          Array.from({ length: 6 }).map((__, c) => (
            <rect key={`${r}-${c}`} x={452 + c * 51} y={72 + r * 32} width={44} height={24} fill={(r + c) % 3 === 0 ? yellow : glass} opacity={(r + c) % 3 === 0 ? 0.6 : 0.3} />
          ))
        )}
        {creeperMark(568, 20, 8)}
        <rect x={300} y={180} width={600} height={220} fill={glass} opacity={0.25} stroke={line} />
        {[0, 1, 2].map((r) => (
          <g key={`fl${r}`}>
            <rect x={300} y={180 + r * 73} width={600} height={6} fill={line} />
            <rect x={300} y={186 + r * 73} width={600} height={67} fill={yellow} opacity={0.22} />
            {Array.from({ length: 10 }).map((_, c) => (
              <line key={c} x1={300 + c * 60} y1={186 + r * 73} x2={300 + c * 60} y2={253 + r * 73} stroke={line} />
            ))}
          </g>
        ))}
        <rect x={300} y={168} width={600} height={12} fill={CREEPER} />
        <rect x={660} y={128} width={120} height={36} fill={ink} />
        <text x={720} y={153} textAnchor="middle" fill={paper} fontSize={20} fontFamily={f} fontWeight={700}>OFFICE</text>
        <rect x={0} y={400} width={W} height={120} fill={panel} />
        <rect x={0} y={448} width={W} height={50} fill={faint} opacity={0.35} />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <rect key={`ln${i}`} x={20 + i * 100} y={471} width={50} height={4} fill={paper} />
        ))}
        {[120, 520, 940].map((tx, i) => (
          <g key={`taxi${i}`}>
            <rect x={tx} y={452} width={90} height={22} fill={yellow} stroke={line} />
            <rect x={tx + 18} y={438} width={50} height={16} fill={yellow} stroke={line} />
            <rect x={tx + 24} y={441} width={16} height={10} fill={glass} opacity={0.6} />
            <rect x={tx + 46} y={441} width={16} height={10} fill={glass} opacity={0.6} />
            <rect x={tx + 10} y={472} width={16} height={10} fill={ink} />
            <rect x={tx + 64} y={472} width={16} height={10} fill={ink} />
          </g>
        ))}
        <rect x={560} y={340} width={80} height={60} fill={glass} opacity={0.4} stroke={line} />
        {plant(260, 360, 12, "p1")}
        {plant(900, 360, 12, "p2")}
        <text x={600} y={432} textAnchor="middle" fill={ink} fontSize={20} fontFamily={f} fontWeight={600}>
          Personal AI Office HQ · NYC
        </text>
      </g>
    );
  }

  if (room === "entrance") {
    return frame(
      <g>
        {glassWall(140, 60, 920, 340, 8)}
        <rect x={500} y={160} width={200} height={240} fill={glass} opacity={0.25} stroke={line} />
        <line x1={600} y1={160} x2={600} y2={400} stroke={line} />
        <rect x={470} y={66} width={260} height={50} fill={ink} />
        <text x={600} y={102} textAnchor="middle" fill={paper} fontSize={30} fontFamily={f} fontWeight={700}>OFFICE</text>
        <rect x={540} y={36} width={0} height={0} />
        {creeperMark(424, 62, 7)}
        {creeperMark(568, 166, 8)}
        {plant(260, 320, 14, "a")}
        {plant(900, 320, 14, "b")}
        {person(760, 330, blue, "", "v")}
        <text x={600} y={145} textAnchor="middle" fill={ink} fontSize={16} fontFamily={f} fontWeight={600}>
          Welcome, Tishan
        </text>
      </g>
    );
  }

  if (room === "reception") {
    return frame(
      <g>
        {glassWall(40, 40, 1120, 200, 10)}
        {creeperMark(440, 80, 10)}
        <text x={540} y={140} fill={ink} fontSize={34} fontFamily={f} fontWeight={700}>RECEPTION</text>
        <rect x={380} y={300} width={440} height={100} fill={paper} stroke={line} />
        <path d="M400 330 L470 360 L520 340 M600 320 L680 370 L760 350" stroke={faint} fill="none" opacity={0.5} />
        <rect x={380} y={392} width={440} height={8} fill={yellow} opacity={0.7} />
        <rect x={372} y={292} width={456} height={12} fill={paper} stroke={line} />
        {person(588, 228, blue, "Amanda", "amanda")}
        <rect x={640} y={270} width={48} height={30} fill={paper} stroke={line} />
        {plant(160, 320, 14, "r1")}
        {plant(1000, 320, 14, "r2")}
        <text x={600} y={440} textAnchor="middle" fill={muted} fontSize={14} fontFamily={f}>
          Executive · Working · all chiefs report here
        </text>
      </g>
    );
  }

  if (room === "open") {
    return frame(
      <g>
        {glassWall(40, 30, 1120, 150, 12)}
        {skyline(60, 110)}
        {desk(90, 330, 220, "d1", "Floor 5 · Mail Room")}
        {desk(370, 330, 220, "d2", "Floor 3 · YouTube Studio")}
        {desk(650, 330, 220, "d3", "Floor 5 · Storage")}
        {person(140, 250, blue, "Mailroom", "m")}
        {person(230, 250, blue, "", "m2")}
        {person(420, 250, yellow, "YT", "y")}
        {person(510, 250, yellow, "", "y2")}
        {person(750, 250, glass, "Storage", "s")}
        {plant(960, 330, 14, "o1")}
        {plant(1060, 330, 14, "o2")}
      </g>
    );
  }

  if (room === "private") {
    return frame(
      <g>
        {glassWall(40, 40, 1120, 360, 6)}
        {skyline(80, 160)}
        <rect x={820} y={110} width={44} height={130} fill={muted} stroke={line} />
        <rect x={830} y={80} width={24} height={30} fill={muted} stroke={line} />
        <rect x={837} y={50} width={10} height={30} fill={muted} />
        <line x1={842} y1={20} x2={842} y2={50} stroke={muted} strokeWidth={3} />
        {[0, 1, 2, 3, 4].map((j) => (<rect key={`es${j}`} x={828} y={120 + j * 22} width={28} height={8} fill={yellow} opacity={0.7} />))}
        <text x={842} y={260} textAnchor="middle" fill={faint} fontSize={12} fontFamily={f}>Empire-style tower</text>
        {person(590, 250, CREEPER, "Rio", "rio")}
        {desk(440, 330, 320, "rd", "AI Systems · Stage 5 · Wave 1")}
        {[480, 680].map((cx, i) => (
          <g key={`gc${i}`}>
            <rect x={cx} y={392} width={44} height={10} fill={paper} stroke={line} />
            <rect x={cx} y={402} width={44} height={40} fill={paper} stroke={line} />
            <rect x={cx + 4} y={442} width={6} height={20} fill={muted} />
            <rect x={cx + 34} y={442} width={6} height={20} fill={muted} />
          </g>
        ))}
        <text x={600} y={478} textAnchor="middle" fill={faint} fontSize={12} fontFamily={f}>Guest chairs facing Rio's desk</text>
        {plant(140, 320, 14, "pp")}
        {creeperMark(960, 300, 8)}
      </g>
    );
  }

  if (room === "conference") {
    return frame(
      <g>
        {glassWall(40, 40, 1120, 200, 8)}
        <rect x={300} y={56} width={600} height={170} fill={ink} stroke={line} rx={6} />
        <rect x={312} y={68} width={576} height={146} fill={paper} />
        <text x={330} y={94} fill={ink} fontSize={15} fontFamily={f} fontWeight={600}>
          Chief check-in · Friday blockers
        </text>
        <text x={330} y={114} fill={muted} fontSize={12} fontFamily={f}>
          5 items waiting on Tishan
        </text>
        <line x1={560} y1={200} x2={870} y2={200} stroke={line} />
        {[40, 60, 52, 84, 110].map((h, i) => (
          <rect key={`bar${i}`} x={580 + i * 58} y={200 - h} width={36} height={h} fill={blue} opacity={i === 4 ? 1 : 0.6} />
        ))}
        <polyline points="598,150 656,132 714,140 772,108 830,82" fill="none" stroke={yellow} strokeWidth={3} />
        <rect x={260} y={330} width={680} height={20} fill={WOOD} stroke={line} />
        {["Amanda", "Time", "Mail", "YT", "Storage", "Invest"].map((n, i) =>
          person(300 + i * 110, 252, [blue, glass, blue, yellow, glass, yellow][i], n, `c${i}`)
        )}
      </g>
    );
  }

  if (room === "lounge") {
    return frame(
      <g>
        {glassWall(40, 40, 1120, 280, 10)}
        {skyline(130, 190)}
        <rect x={200} y={340} width={340} height={60} fill={glass} opacity={0.5} stroke={line} />
        <rect x={200} y={310} width={340} height={30} fill={glass} opacity={0.35} stroke={line} />
        <rect x={640} y={360} width={160} height={40} fill={WOOD} stroke={line} />
        
        {plant(900, 320, 16, "l1")}
        {plant(80, 320, 14, "l2")}
      </g>
    );
  }

  if (room === "pantry") {
    return frame(
      <g>
        <rect x={80} y={60} width={1040} height={90} fill={WOOD} stroke={line} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect key={i} x={100 + i * 128} y={72} width={110} height={66} fill={paper} stroke={line} />
        ))}
        <rect x={80} y={240} width={1040} height={60} fill={paper} stroke={line} />
        <rect x={200} y={190} width={50} height={50} fill={muted} />
        <rect x={300} y={216} width={22} height={24} fill={paper} stroke={line} />
        <rect x={340} y={216} width={22} height={24} fill={paper} stroke={line} />
        {person(440, 196, blue, "", "pa")}
        <rect x={560} y={320} width={460} height={70} fill={paper} stroke={line} />
        <rect x={552} y={312} width={476} height={12} fill={paper} stroke={line} />
        <rect x={560} y={384} width={460} height={6} fill={yellow} opacity={0.7} />
        {[600, 690, 780, 870, 960].map((sx, i) => (
          <g key={`st${i}`}>
            <rect x={sx} y={410} width={34} height={10} fill={WOOD} stroke={line} />
            <rect x={sx + 14} y={420} width={6} height={50} fill={muted} />
            <rect x={sx + 4} y={462} width={26} height={4} fill={muted} />
          </g>
        ))}
        <text x={790} y={500} textAnchor="middle" fill={faint} fontSize={12} fontFamily={f}>Island + bar stools</text>
        {plant(900, 250, 14, "pt")}
        <text x={600} y={200} textAnchor="middle" fill={muted} fontSize={14} fontFamily={f}>
          Weekday morning digest, read over coffee
        </text>
      </g>
    );
  }

  if (room === "focus") {
    return frame(
      <g>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            {glassWall(80 + i * 270, 90, 230, 310, 2)}
            <rect x={120 + i * 270} y={330} width={150} height={12} fill={WOOD} stroke={line} />
            {person(180 + i * 270, 250, [glass, yellow, blue][i], ["Fl 2 Credit", "Fl 2 Investments", "Fl 2 Trading"][i], `f${i}`)}
            {true ? (
              <g>
                <path d={`M${175 + i * 270} 262 Q${191 + i * 270} 236 ${207 + i * 270} 262`} fill="none" stroke={ink} strokeWidth={4} />
                <rect x={172 + i * 270} y={258} width={8} height={12} fill={ink} />
                <rect x={202 + i * 270} y={258} width={8} height={12} fill={ink} />
              </g>
            ) : null}
            <rect x={80 + i * 270} y={80} width={230} height={10} fill={CREEPER} />
          </g>
        ))}
      </g>
    );
  }

  if (room === "research") {
    return frame(
      <g>
        {glassWall(40, 40, 1120, 200, 8)}
        {skyline(70, 140)}
        {desk(260, 330, 260, "rs1", "Closed · fired ~7:53 AM ET")}
        {desk(680, 330, 260, "rs2", "Closed · fired ~7:53 AM ET")}
        {plant(100, 320, 14, "rp1")}
        {plant(1040, 320, 14, "rp2")}
      </g>
    );
  }

  if (room === "hallway") {
    return frame(
      <g>
        <polygon points="0,40 480,180 720,180 1200,40" fill={panel} stroke={line} />
        <polygon points="0,40 480,180 480,330 0,500" fill={glass} opacity={0.15} stroke={line} />
        <polygon points="1200,40 720,180 720,330 1200,500" fill={glass} opacity={0.15} stroke={line} />
        <rect x={480} y={180} width={240} height={150} fill={paper} stroke={line} />
        <polygon points="0,60 200,118 200,420 0,480" fill={CREEPER_DARK} />
        {Array.from({ length: 40 }).map((_, i) => (
          <rect key={`moss${i}`} x={8 + (i % 5) * 38} y={110 + Math.floor(i / 5) * 42 + (i % 5) * 4} width={22} height={22} fill={i % 3 === 0 ? CREEPER_DARK : CREEPER} opacity={0.9} />
        ))}
        <rect x={50} y={200} width={100} height={100} fill={paper} stroke={line} />
        {creeperMark(68, 218, 8)}
        {creeperMark(576, 220, 6)}
        {["Reception", "Open Workspace", "Conference"].map((n, i) => (
          <text key={n} x={60 + i * 140} y={160 + i * 40} fill={muted} fontSize={13} fontFamily={f}>{n}</text>
        ))}
        {["Private Office", "Lounge", "Focus Booths"].map((n, i) => (
          <text key={n} x={1140 - i * 140} y={160 + i * 40} textAnchor="end" fill={muted} fontSize={13} fontFamily={f}>{n}</text>
        ))}
        {person(560, 360, blue, "", "h1")}
        {person(640, 380, CREEPER, "", "h2")}
        {plant(200, 420, 12, "h3")}
        {plant(960, 420, 12, "h4")}
      </g>
    );
  }

  const cells: { x: number; y: number; w: number; h: number; t: string; d: string; c: string }[] = [
    { x: 30, y: 30, w: 270, h: 130, t: "Fl 1 · Executive Suite", d: "Amanda (Reception)", c: blue },
    { x: 320, y: 30, w: 560, h: 130, t: "Open Workspace · Fl 3 / 5", d: "YouTube Studio · Ground Floor (Mail + Time + Storage)", c: yellow },
    { x: 900, y: 30, w: 270, h: 130, t: "Fl 4 · AI Operations", d: "Rio · Lex · OS Tester · Clay Avatar Artist", c: CREEPER },
    { x: 30, y: 180, w: 270, h: 130, t: "Conference", d: "Chief check-ins", c: glass },
    { x: 320, y: 180, w: 270, h: 130, t: "Focus Booths · Fl 2 Finance", d: "Investments · Credit · Trading", c: glass },
    { x: 610, y: 180, w: 270, h: 130, t: "Lounge", d: "Shared", c: glass },
    { x: 900, y: 180, w: 270, h: 130, t: "Pantry", d: "Shared", c: glass },
    { x: 610, y: 330, w: 560, h: 70, t: "Research Room · Closed", d: "Research department fired ~7:53 AM ET Nov 3 · seats gone", c: yellow },
    { x: 30, y: 330, w: 560, h: 70, t: "Hallway · Entrance", d: "Glass corridor · reports flow to Amanda", c: CREEPER },
  ];
  return frame(
    <g>
      {cells.map((r) => (
        <g key={r.t}>
          <rect x={r.x} y={r.y} width={r.w} height={r.h} fill={panel} stroke={line} rx={12} />
          <rect x={r.x} y={r.y} width={10} height={r.h} fill={r.c} rx={4} />
          <text x={r.x + 26} y={r.y + 34} fill={ink} fontSize={16} fontFamily={f} fontWeight={600}>{r.t}</text>
          <text x={r.x + 26} y={r.y + 58} fill={muted} fontSize={13} fontFamily={f}>{r.d}</text>
        </g>
      ))}
    </g>
  );
}

export default function App() {
  const [room, setRoom] = useState<RoomKey>("exterior");
  const keys: RoomKey[] = ["exterior", "entrance", "reception", "open", "private", "conference", "lounge", "pantry", "focus", "research", "hallway", "map"];

  return (
    <Page
      title="Personal AI OS — Virtual Office (Stage 4)"
      summary="Working HQ mirror: room-by-room tour of the Minecraft-block NYC HQ, each room tied to a real department. Statuses mirror the Floor Page. Roster as of ~3:32 PM ET Nov 5 · Stage 3 Pass 1→2 · Lex + Rio Working · OS Tester Working · Shared task queue stays live · soft-clay lock held · 11 Working · 6 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts."
      width="wide"
    >
      <Callout tone="success" lead="Current roster · Floor mirror">
        Roster as of ~3:32 PM ET Nov 5 — Stage 3 Pass 1 → Pass 2 (Amanda order ~3:31 · Lex visual PASS). Lex + Rio Working · OS Tester Waiting → Working. Soft-clay lock held · Shared task queue stays live · mid-width / phone deferred. Counts: 11 Working · 6 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts. Floor Page stays the source of truth.
      </Callout>

      <Section heading="Roster" caption="Roster as of ~3:32 PM ET Nov 5 · Floor mirror · Lex + Rio Working (Stage 3) · OS Tester Working (Stage 3 Pass 1→2) · 11 Working · 6 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts · Last report dates in row details are separate from this roster stamp · not live">
        <Rows
          rows={[
            { title: "Amanda", detail: "Floor 1 · Executive Suite · Reception · top lead + CoS / HR · Stage 2 PARKED ~1:45 PM ET Nov 5 · prior: Stage 1 parked ~12:52 PM ET Nov 5", status: { label: "Working", tone: "success" } },
            { title: "Chief of Staff / HR (prior)", detail: "Floor 1 · Executive Suite · People Ops · seat closed", status: { label: "Closed", tone: "danger" } },
            { title: "Time Master", detail: "Floor 5 · Ground Floor · Time Master · owns Top 3 + timed reminders + Later to-dos · audit done · write-hold pending Amanda confirm · Last report Nov 2 ~10:17 AM ET", status: { label: "Working", tone: "success" } },
            { title: "Chief of Mailroom", detail: "Floor 5 · Ground Floor · Mail Room · money/security parked", status: { label: "Waiting", tone: "warning" } },
            { title: "Head of Gmail", detail: "Floor 5 · Ground Floor · Mail Room · connected, first pass done", status: { label: "Working", tone: "success" } },
            { title: "Head of WhatsApp", detail: "Floor 5 · Ground Floor · Mail Room · 3 groups", status: { label: "Working", tone: "success" } },
            { title: "Chief of Youtube", detail: "Floor 3 · YouTube Studio · credits 0, no premise", status: { label: "Waiting", tone: "warning" } },
            { title: "YouTube Analyst", detail: "Floor 3 · YouTube Studio · Pages live, holding TubeAlfred · comment-read paused per Tishan (YA chat ~2:28 PM ET) · Waiting · no active scrape · Phase 1 idle cleanup ~12:05 PM ET Nov 5", status: { label: "Waiting", tone: "warning" } },
            { title: "Script Writer", detail: "Floor 3 · YouTube Studio · idle until premise locked", status: { label: "Waiting", tone: "warning" } },
            { title: "Chief of Storage", detail: "Floor 5 · Ground Floor · Storage · media-copy job COMPLETE 2,629 / 2,629 (videos + [private name] scans → GROKBOT METHOD), 0 pending, 0 failures · idle · Waiting · Phase 1 idle cleanup ~12:05 PM ET Nov 5 · hold lift confirmed ~10:28 AM ET", status: { label: "Waiting", tone: "warning" } },
            { title: "Chief on Investments", detail: "Floor 2 · Finance · Investments · Robinhood connected · read-only until further policy", status: { label: "Working", tone: "success" } },
            { title: "Gold Fundamentals · Temp", detail: "Floor 2 · Finance · Trading (separate from Investments) · reports to Amanda · MGC day-trading gold fundamentals · Metals Daily (metalsdaily.com) · prior: Temp hire Nov 3 AM ET (Working) · prior: Closed EOD ~4:00 PM ET Nov 3 (superseded) · Working · Temp · extended 2 weeks through EOD Tue Nov 17 2026 ET (Tishan own-words via Amanda ~4:04 PM ET Nov 3) · Last report ~4:05 PM ET Nov 3", status: { label: "Working · Temp", tone: "success" } },
            { title: "Head of Trading", detail: "Floor 2 · Finance · Trading · Trading Department (Phase 0) · reports to Amanda · id 70f5d336-db14-40c4-aea5-cb4238dbbaef · day-trade lead · paper week · no live orders yet · stocks only · 3% daily max loss · 1% risk/trade · max 1 position · MCP Robinhood for later live (not now) · Investments + Gold Temp stay separate · Risk / Fundamentals / Technicals not hired yet · Last report ~10:14 AM ET Nov 3", status: { label: "Working", tone: "success" } },
            { title: "Playbook · Backtester", detail: "Floor 2 · Finance · Trading · Trading Department (Phase 0) · reports to Amanda · id 4b198059-57c9-4f84-94a8-cfe767c814fe · one stock strategy + paper scorecard · stocks only · 3% daily max loss · 1% risk/trade · max 1 position · no live orders · Last report ~10:14 AM ET Nov 3", status: { label: "Working", tone: "success" } },
            { title: "Rio", detail: "Floor 4 · AI Operations · Working · Stage 3 tech lead · must+should ~3:05 PM ET Nov 5 · prior: Waiting · Stage 2 parked ~1:45 PM ET Nov 5 · prior: Working · Stage 2 dashboard build ~1:10 PM ET Nov 5 · prior: Stage 1 parked ~12:52 PM ET Nov 5 · prior: Stage 1 dashboard repair in progress ~12:30 PM ET Nov 5 · prior: walk soft bugs parked ~9:54 AM ET Nov 5 · prior: Waiting · Floor→VO→Live HQ soft leftovers clear park stamp complete ~9:16 AM ET Nov 5 · prior: Waiting · soft leftovers clear park-pending ~9:10 AM ET Nov 5 · prior: Waiting · Floor→VO→Live HQ finish-HQ polish park stamp complete ~8:52 AM ET Nov 5 · prior: Waiting · Floor→VO→Live HQ soft-clay park stamp complete ~8:22 AM ET Nov 5 · prior: Waiting · Floor→VO 5-floor sync parked · Amanda park-confirm (~11:24 AM ET Nov 4) · prior: Working · Floor→VO 5-floor reorg sync (Lex owns Live HQ UI) · ~11:20 AM ET Nov 4 · prior: Waiting · Highs sync-data parked · SYNC-01/INT-01/UI-07 done · Amanda park-confirm (~9:20 AM ET Nov 4) · prior: Working · Highs sync-data — SYNC-01 Live HQ republish · UI-V01 VO banner · INT-01 Usage live refresh · UI-07 data side (~9:08 AM ET Nov 4) · prior: Stage 5 Wave 1 all five live · VO concept-matched · ADR-0004 sync standby", status: { label: "Working", tone: "success" } },
            { title: "OS Tester", detail: "Floor 4 · AI Operations · reports to Amanda · id f3cb468a-22de-425f-94a6-84edf2887bab · solutions architect / QA / devops · Working · Stage 3 Pass 1→2 · Amanda order ~3:31 · Lex visual PASS · prior: Waiting · Floor section test parked ~2:46 PM ET Nov 5 (Amanda park-confirm ~2:45 · read-only findings only) · prior: Working · Floor section test · ~2:44 PM ET Nov 5 · prior: Working · independent read-only Agent OS UX walk · ~2:18 PM ET Nov 5 · prior: Waiting · Stage 2 parked ~1:45 PM ET Nov 5 · prior: Working · Stage 2 Pass 1+2 ~1:15 PM ET Nov 5 · prior: Stage 1 parked ~12:52 PM ET Nov 5 (Pass 1+2 PASS · Amanda park-confirm) · prior: walk soft bugs Pass 1+2 PASS · parked ~9:54 AM ET Nov 5 · prior: Pass 1+2 on walk soft bugs ship (Floor 5/FLOOR 3 · AI Ops bubbles · desk name trunc) on Live HQ 6f83abe1 ~9:42 AM ET Nov 5 · park only on PASS + Amanda confirm · soft leftover beep stays deferred · prior: gate armed · Pass 1+2 after Lex walk soft bugs ship ~9:35 AM ET Nov 5 · prior: soft leftovers clear Pass 1+2 PASS; parked after Amanda confirm ~9:16 AM ET Nov 5 · beep (audio) not verified — deferred · prior: Working · Pass 1+2 on soft leftovers clear ship (sync click / Floor 4 camera / Skip–Usage) on Live HQ 6f83abe1 ~9:13 AM ET Nov 5 · park only on PASS + Amanda confirm · prior: gate armed · Pass 1+2 after Lex soft leftovers ship ~9:10 AM ET Nov 5 · prior: finish-HQ polish Pass 1+2 PASS; parked after Amanda confirm ~8:52 AM ET Nov 5 · prior: Working · Pass 1+2 on finish-HQ polish (Lex shipped ~8:35 AM ET Nov 5) · park only on PASS + Amanda confirm · prior: Waiting · soft-clay Pass 1+2 PASS; parked after Amanda confirm ~8:22 AM ET Nov 5 · prior: Working · Pass 1+2 on soft-clay Live HQ trial (Lex shipped ~8:17 AM ET Nov 5) · park only on PASS + Amanda confirm · prior: Waiting · 5-floor Pass 1+2 done · soft leftovers deferred (~11:24 AM ET Nov 4) · prior: Working · Pass 1+2 standby for 5-floor reorg (after Lex Live HQ ship) · ~11:20 AM ET Nov 4 · prior: Waiting · A–Z audit + Highs re-check done · soft leftovers deferred (~9:20 AM ET Nov 4) · prior: Working · A–Z Highs re-check standby (Pass 1+2 after Highs fix wave, ~9:08 AM ET Nov 4) · prior: A–Z OS dashboard audit (Live HQ / Floor / VO + related OS Pages) — discovery through final QA report; read-only findings; no builds until Tishan reviews (Tishan assigned via Amanda ~8:42 AM ET Nov 4; already Working, confirmed) · prior first job: read-only Live HQ + Floor/VO assessment + UI/UX suggestions; no build until Tishan hears them and approves · collaborators Lex + Rio · phone ≤480 still deferred · Open chat: grokbot://app/v1/agent?id=f3cb468a-22de-425f-94a6-84edf2887bab · hired ~1:51 PM ET Nov 3", status: { label: "Working", tone: "success" } },
            { title: "Lex · Chief Design Engineer", detail: "Floor 4 · AI Operations · reports to Amanda · Working · Stage 3 visual/nav/Find/Credit ~3:05 PM ET Nov 5 · prior: Waiting · Stage 2 parked ~1:45 PM ET Nov 5 · prior: Working · Stage 2 visual review ~1:10 PM ET Nov 5 · prior: Stage 1 parked ~12:52 PM ET Nov 5 (OS Tester Pass 1+2 PASS · Amanda park-confirm) · prior: walk soft bugs parked ~9:54 AM ET Nov 5 (Pass 1+2 PASS) · prior: walk soft bugs shipped ~9:36 AM ET Nov 5 (Floor 5/FLOOR 3 · AI Ops bubbles · desk name trunc on Live HQ 6f83abe1) · awaiting OS Tester Pass 1+2 · soft leftover beep stays deferred · soft-clay lock held · prior: Working · walk soft bugs (Floor 5 panel FLOOR 3 · AI Ops bubble overlap · desk name truncation on Live HQ 6f83abe1) ~9:35 AM ET Nov 5 · prior: Waiting · soft leftovers clear parked after Pass 1+2 PASS + Amanda park-confirm ~9:16 AM ET Nov 5; soft leftover beep (audio) deferred · prior: Working · soft leftovers clear (sync click feedback · Floor 4 camera framing · Skip/Usage overlap on Live HQ 6f83abe1) ~9:10 AM ET Nov 5 · prior: Waiting · finish-HQ polish parked after Pass 1+2 PASS + Amanda park-confirm ~8:52 AM ET Nov 5; soft leftovers deferred · prior: Working · finish-HQ polish wave on Live HQ 6f83abe1 (Find typed / sync icon / soft-clay soft notes · sharper faces · Exec/YouTube thumbs · Rio bubble) · soft-clay roomy-gold look lock held · ~8:28 AM ET Nov 5 · prior: Waiting · soft-clay Live HQ trial parked after Pass 1+2 PASS + Amanda park-confirm ~8:22 AM ET Nov 5; soft notes deferred · prior: Working · soft-clay Live HQ trial integrate (Tishan green-lit via Amanda ~8:07 AM ET Nov 5) · Clay assets /workspace/clay-avatars/ · collab Clay Avatar Artist · OS Tester Pass 1+2 before park · prior: Waiting · 5-floor reorg parked · Pass 1+2 PASS · Amanda park-confirm ~11:24 AM ET Nov 4 · soft leftovers deferred · prior: Working · Live HQ 5-floor reorg UI (Tishan confirm) · Floor SoT syncing · ~11:20 AM ET Nov 4 · prior: Waiting · Highs wave parked · Pass 1+2 PASS · Amanda park-confirm ~9:20 AM ET Nov 4 · soft leftovers deferred · prior: Working · Highs fix wave — UI-F04 Live HQ floor numbering match Floor (Exec=1…Trading=8) + UI-07 activity timestamps with Rio (Tishan own words via Amanda ~9:08 AM ET Nov 4) · prior: Waiting · Closed/empty-state contrast REDO shipped (Lex Pass 3) + OS Tester Pass 1+2 PASS · parked per Amanda, awaiting park confirm · soft: Working/Waiting People row contrast later (~7:50 AM ET Nov 4) · prior: Working · Live HQ Closed/empty-state contrast REDO (Tishan still cannot see Closed / empty-state on floor cards after first pass; harder contrast for Closed + No agent selected helper; no org invent; Research Closed; Credit Pending leave-as-is) (~7:41 AM ET Nov 4) · prior: Waiting · Live HQ Closed/inactive floor-card contrast shipped 6f83abe1 + MacBook soft QA a–f PASS (SC.Closed #D4D4D8; People .pc.c; scene muted 0.82/0.92; Working/Waiting unchanged; Research Closed off board; Credit Pending leave-as-is) (~7:40 AM ET Nov 4) · prior: Working · Live HQ Closed/inactive contrast fix on floor cards (Tishan: cannot read Closed seat text e.g. Executive Prior CoS/HR; raise Closed/inactive contrast across floor cards on Live HQ 6f83abe1; no org invent; Research stays Closed) (~7:37 AM ET Nov 4) · prior: Waiting · Live HQ Floors list + tower shipped + MacBook soft QA a–f PASS (floors-by-rank; SOURCE stack matched Floor SoT) (~5:21 PM ET Nov 3) · prior: Working · floors-by-rank reorganize (Tishan own-words via Amanda; Floor SoT first, then Live HQ floors list + tower) (~5:18 PM ET Nov 3) · prior: Waiting · SAMPLE r3 left panel shipped into Live HQ 6f83abe1 + MacBook QA a–f PASS parked (SOURCE-APPROVED lock; soft ~176px / real names / no Research on Floors) (~5:06 PM ET Nov 3) · prior: Working · shipping SAMPLE r3 left panel into Live HQ (Tishan own-words YES; SOURCE-APPROVED lock 1–7 for Live HQ 6f83abe1; soft QA ~176px / real names / no Research on Floors) (~5:04 PM ET Nov 3) · prior: Waiting · left-panel SAMPLE r3 delivered (listen-feedback redraw) (~4:53 PM ET Nov 3) — awaiting Tishan own-words build yes + OS Tester on SAMPLE before ship; Live HQ untouched · prior: Working · left-panel SAMPLE redraw from listen-session feedback (~4:51 PM ET Nov 3) — Tishan own-words YES via Amanda; SAMPLE only (brief Page + Drive mock); no Live HQ edit until later own-words build yes · prior: Waiting · left-rail v2 SAMPLE r2 delivered (~4:16 PM ET Nov 3) — awaiting Tishan own-words + Tester recheck before ship; Live HQ untouched · prior: Working · left-rail v2 SAMPLE revision (~4:14 PM ET Nov 3) — OS Tester×2 done; revise MacBook-width + Floors folded + Needs-you cleanup; no Live HQ edit until Tishan own-words yes on revised sample · prior: Waiting · v2 SAMPLE delivered (~4:12 PM ET Nov 3) · prior: Working · v2 SAMPLE (~4:08 PM ET Nov 3 · sample first — no Live HQ edit until sample + Tester×2 + Tishan approve) · prior: Waiting · left panel redesign + clearer labels MacBook QA a–f PASS parked ~2:55 PM ET Nov 3 · await next ask · not a full polish reopen · holds unchanged (decide-today / check-ins / VO banner / ≤480) · soft residuals: Phase 0 Hot/Playbook role text / Needs-you lines cramped / header truncate narrow / Errors pill clip / About covers board / ≤480 deferred · prior: Working ~2:09 on sample · Open chat: grokbot://app/v1/agent?id=8c422837-7598-43ec-9d51-edf55b88f027 · prior: Waiting · Phase T People board MacBook QA a–f PASS parked ~12:56 PM ET Nov 3 · People board default main view on Live HQ · not a full polish reopen · ≤480 still deferred · soft residuals non-blocking (Closed undercount vs Floor 3 intentional; N/P no scroll-into-view; drawer footer/faint labels; People floor bleed; Skip overlap on Floors; left-rail softs unchanged) · await next ask · prior: People board into Live HQ · Tishan approved sample (~12:49 PM ET Nov 3) · prior: sidebar letter contrast MacBook QA a–f PASS (soft) parked (Live HQ left-rail labels; lrail-only CSS; .ab confirmed = accordion header buttons) · one-slice only; not full polish reopen · standing by for next Tishan/Amanda ask · soft residuals: activity after-dash dim; Waiting task lines slightly dim; Helpers accordion count gap; activity name weight contrast; prior unchanged (≤480 deferred; drawer-scroll; sun/avatar; theme-var) · Last report ~7:50 AM ET Nov 4", status: { label: "Working", tone: "success" } },
            { title: "Clay Avatar Artist", detail: "Floor 4 · AI Operations · reports to Amanda · id ab16d55e-95da-487e-a7e9-825fc7fd689a · Hired ~7:47 AM ET Nov 5 — soft-clay mini desk people avatars for Live HQ (Lex + OS Tester collab). Waiting · no Live HQ build order · soft-clay lock held · Phase 1 idle cleanup ~12:05 PM ET Nov 5.", status: { label: "Waiting", tone: "warning" } },
            { title: "Markets · Research", detail: "Research Room · reports to Amanda · U.S. equities only · watch stocks / bring money opportunities · no trades without Tishan OK · coordinates with Investments · fired by Tishan ~7:53 AM ET Nov 3 · seat gone · morning brief routine deleted · Last report Nov 3 ~7:53 AM ET", status: { label: "Closed (fired)", tone: "danger" } },
            { title: "Grokbot Research", detail: "Research Room · reports to Amanda · improve org via Grok Bot · research mainly on X · fired by Tishan ~7:53 AM ET Nov 3 · seat gone · Last report Nov 3 ~7:53 AM ET", status: { label: "Closed (fired)", tone: "danger" } },
          ]}
        />
      </Section>

      <Section heading="Floors by rank" caption="Mirrors Floor SoT · Roster as of ~3:32 PM ET Nov 5 · Lex + Rio Working (Stage 3) · OS Tester Working (Stage 3 Pass 1→2) · Clay, Storage, YT Analyst Waiting · 11 Working · 6 Waiting · 3 Closed · Credit Pending · not hired · not in Working/Waiting/Closed counts">
        <Rows
          rows={[
            { title: "Floor 1 · Executive Suite", detail: "Amanda · Prior CoS / HR (Closed)" },
            { title: "Floor 2 · Finance", detail: "Chief on Investments · Credit Pending · not hired · not in Working/Waiting/Closed counts · Head of Trading · Playbook · Backtester · Gold Fundamentals · Temp" },
            { title: "Floor 3 · YouTube Studio", detail: "Chief of Youtube · YouTube Analyst · Script Writer" },
            { title: "Floor 4 · AI Operations", detail: "Rio · Lex · Chief Design Engineer · OS Tester · Clay Avatar Artist" },
            { title: "Floor 5 · Ground Floor", detail: "Mail Room (Chief of Mailroom · Head of Gmail · Head of WhatsApp) · Time Master · Chief of Storage" },
            { title: "Research · Closed (archived)", detail: "Closed · off live floors · not in Working/Waiting", status: { label: "Closed", tone: "danger" } },
          ]}
        />
      </Section>

      <Section heading="HQ tour">
        <Segmented
          options={keys.map((k) => ({ value: k, label: ROOM_INFO[k].label }))}
          value={room}
          onChange={setRoom}
        />
        <Scene room={room} />
        <Text>{ROOM_INFO[room].line}</Text>
      </Section>

      <Section heading="HQ links">
        <LinkCards
          links={[
            { title: "Live HQ", site: "Command dashboard", href: "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/6f83abe1-5a09-430d-8ca9-e402345351b1" },
            { title: "Organization Office Floor", site: "Source of truth", href: "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/57ec2643-4823-4357-9d6d-048441701b31" },
            { title: "Stage 5 Automation Plan", site: "ACTIVE · Wave 1 · all five live", href: "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/db830245-4904-488e-8023-9fdede1f0256" },
            { title: "Architecture Proposal", site: "Stage 1 · archive", href: "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/579912b9-9eff-4457-9d76-191da4284a7c" },
          ]}
        />
      </Section>

      <Section heading="Prior · history (old)">
        <BulletList
          items={[
            "One floor plan became a tour of 10 rooms plus a department map, following Tishan's collage.",
            "Added glass walls, an NYC skyline, block plants, blocky people, and the green creeper mark.",
            "Each department now has a room: Amanda at Reception, Rio in the Private Office. Since ~5:21 PM ET Nov 3 every department has its own ranked floor (1 Executive → 8 Trading / Finance).",
            "Nothing about the org changed; statuses are copied from the Floor Page.",
            "Polish pass: OFFICE sign over the doors, white RECEPTION desk, guest chairs + Empire-style tower, bar-chart screen, moss creeper wall, taxis + 3-story glowing exterior, pantry island + stools, headphones in focus booths, softer block people.",
            "The collage image is not embedded (pages can't show box files); it stays on disk for Amanda and Tishan.",
          ]}
        />
      </Section>
    </Page>
  );
}
