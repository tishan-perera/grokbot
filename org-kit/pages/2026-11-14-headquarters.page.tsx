// Grokbot Page export · title: HeadQuarters · canvas_id: 6f83abe1-5a09-430d-8ca9-e402345351b1 · last updated 2026-11-14
// Inline base64 images stripped: 59. Private details replaced with [private ...] placeholders.
// Recreate by pasting this source into a new Page (Cursor canvas, React/TSX).
import { Page, Fragment, useState, useEffect, useRef, useGrokTheme } from "grok/canvas";
import type { ReactNode, PointerEvent, ChangeEvent } from "grok/canvas";

type St = "Working" | "Waiting" | "Closed" | "Pending";
type ViewMode = "people" | "floors" | "activity" | "org";
// Reporting metadata only. HQ roster restamped ~8:04 AM CT Nov 12 (owner refresh HQ).
// The separate Floor page was not restamped (still its Nov 5 stamp).
// Gold Fundamentals (permanent since Nov 11) reports directly to Amanda, not Investments/Trading. Backtester profile
// explicitly names Head of Trading (older Floor direct-to-Amanda edge superseded).
// LinkedIn Department Director reports to Amanda; Profile, Content, and Career specialists report to the Director.
const ORG_PARENT: Record<string, string> = {
  amanda: "owner", mailroom: "amanda", gmail: "mailroom", wa: "mailroom",
  chiefyt: "amanda", ytan: "chiefyt", script: "chiefyt", storage: "amanda",
  time: "amanda", inv: "amanda", goldtemp: "amanda", hot: "amanda", pbt: "hot",
  rio: "amanda", lex: "amanda", ostester: "amanda", clay: "amanda",
  lidir: "amanda", liprof: "lidir", licontent: "lidir", licareer: "lidir"
};
type Shape = "square" | "squircle" | "circle" | "pill" | "tri" | "diamond" | "hex" | "star" | "cloud";
type Agent = { id: string; name: string; floor: string; role: string; status: St; task: string; asOf: string; last: string | null; chat: string | null; color: string; shape: Shape };
type Floor = { id: string; level: string; name: string };
type Nav = "none" | "hq" | "all" | "waiting" | "usage" | "settings";

const FLOORS: Floor[] = [
  { id: "exec", level: "1", name: "Executive Suite" },
  { id: "finance", level: "2", name: "Finance Department" },
  { id: "yt", level: "3", name: "YouTube Studio" },
  { id: "ai", level: "4", name: "AI Operations" },
  { id: "ground", level: "5", name: "Ground Floor" },
  { id: "linkedin", level: "6", name: "LinkedIn Department" },
];

const AGENTS: Agent[] = [
  { id: "amanda", name: "Amanda", floor: "exec", role: "Org lead · CoS/COO", status: "Working", task: "CoS/COO · org coordination · HQ roster restamp", asOf: "~8:04 AM CT Nov 12", last: "2026-11-12T08:04:00-06:00", chat: "dcdb4dfa-d430-4f65-90fd-830e68f28253", color: "#F472B6", shape: "star" },
  { id: "cos", name: "Prior CoS/HR", floor: "exec", role: "Prior CoS/HR", status: "Closed", task: "Seat closed", asOf: "Unknown", last: null, chat: null, color: "#A1A1AA", shape: "circle" },
  { id: "mailroom", name: "Mail Room Chief", floor: "ground", role: "Mail Room chief", status: "Waiting", task: "Waiting · Parked · held", asOf: "10:17 AM ET Nov 2", last: "2026-11-02T10:17:00-05:00", chat: "e0892364-18a7-4d7a-8325-9138c42ca2f5", color: "#3B82F6", shape: "square" },
  { id: "gmail", name: "Gmail", floor: "ground", role: "Inbox cleanup", status: "Working", task: "~50.7k promo trashed", asOf: "10:18 AM ET Nov 2", last: "2026-11-02T10:18:00-05:00", chat: "f05ca5e2-f9e7-45eb-8bae-336f14728e4a", color: "#EF4444", shape: "pill" },
  { id: "wa", name: "WhatsApp", floor: "ground", role: "Group watcher", status: "Working", task: "Watching 3 groups", asOf: "10:17 AM ET Nov 2", last: "2026-11-02T10:17:00-05:00", chat: "35bcba89-2e56-4df7-93b4-ebc9425c3a10", color: "#22C55E", shape: "squircle" },
  { id: "chiefyt", name: "YouTube Chief", floor: "yt", role: "YouTube Studio chief", status: "Waiting", task: "Waiting · Parked · TubeAlfred credits empty", asOf: "10:17 AM ET Nov 2", last: "2026-11-02T10:17:00-05:00", chat: "578c4583-b01c-4851-897e-020ae5f7d3ab", color: "#F97316", shape: "tri" },
  { id: "ytan", name: "YT Analyst", floor: "yt", role: "Audience analysis", status: "Waiting", task: "Waiting · Parked · Phase 1 idle · comment-read paused", asOf: "~12:05 PM ET Nov 5", last: "2026-11-05T12:05:00-05:00", chat: "cd58c9b7-71cc-4460-a757-7cdf5c6c3f5d", color: "#06B6D4", shape: "hex" },
  { id: "script", name: "Script Writer", floor: "yt", role: "Scripts", status: "Waiting", task: "Waiting · Parked · held · needs a premise", asOf: "10:17 AM ET Nov 2", last: "2026-11-02T10:17:00-05:00", chat: "929dd92f-72de-4938-99ea-f4e7704e2dfb", color: "#A855F7", shape: "diamond" },
  { id: "storage", name: "Storage", floor: "ground", role: "Media storage", status: "Waiting", task: "Waiting · Parked · media copy complete · Phase 1 idle", asOf: "~12:05 PM ET Nov 5", last: "2026-11-05T12:05:00-05:00", chat: "71859307-38f8-4f79-9003-50ec86f0033f", color: "#EAB308", shape: "cloud" },
  { id: "time", name: "Time Master", floor: "ground", role: "Time + calendar", status: "Working", task: "Top 3 live · calendar-write HOLD", asOf: "10:17 AM ET Nov 2", last: "2026-11-02T10:17:00-05:00", chat: "6592c246-dda2-4ef4-a10e-6f01bdc67f18", color: "#14B8A6", shape: "circle" },
  { id: "inv", name: "Investments", floor: "finance", role: "Portfolio (read-only)", status: "Working", task: "Read-only Robinhood · trades locked", asOf: "10:17 AM ET Nov 2", last: "2026-11-02T10:17:00-05:00", chat: "5e32418f-0bb4-43bf-9779-2b78d0275b4b", color: "#84CC16", shape: "square" },
  { id: "credit", name: "Credit", floor: "finance", role: "Credit (seat pending)", status: "Pending", task: "Credit Pending · not hired · not in Working/Waiting/Closed counts.", asOf: "Unknown", last: null, chat: "70b39ea2-3d3b-4dcc-af7b-bec523e32887", color: "#8B5CF6", shape: "tri" },
  { id: "goldtemp", name: "Gold Fundamentals", floor: "finance", role: "Gold fundamentals (permanent)", status: "Working", task: "Permanent gold fundamentals research · reports to Amanda · no Nov 17 end date", asOf: "Nov 11 2026", last: null, chat: "7e5a7224-8b0f-4e53-988b-9f09fce0928e", color: "#D97706", shape: "circle" },
  { id: "hot", name: "Head of Trading", floor: "finance", role: "Day-trade lead · paper count", status: "Working", task: "Paper count active · Day 1 of rolling 20-day count · Thu Nov 12 · live trading off", asOf: "~8:04 AM CT Nov 12", last: "2026-11-12T08:04:00-06:00", chat: "70f5d336-db14-40c4-aea5-cb4238dbbaef", color: "#10B981", shape: "square" },
  { id: "pbt", name: "Playbook · Backtester", floor: "finance", role: "Playbook & backtest · paper count", status: "Working", task: "Playbook and paper scorecard · Day 1 of rolling 20-day count · live trading off", asOf: "~8:04 AM CT Nov 12", last: "2026-11-12T08:04:00-06:00", chat: "4b198059-57c9-4f84-94a8-cfe767c814fe", color: "#6366F1", shape: "diamond" },
  { id: "rio", name: "Rio", floor: "ai", role: "AI Systems Architect & Lead Developer", status: "Waiting", task: "Waiting · Parked · HQ parked Nov 9", asOf: "Nov 9 2026", last: null, chat: "d1718e80-96c8-41c5-b01d-5db0fef8b603", color: "#0EA5E9", shape: "star" },
  { id: "lex", name: "Lex", floor: "ai", role: "Chief Design Engineer · reports to Amanda", status: "Waiting", task: "Waiting · Parked · HQ parked Nov 9", asOf: "Nov 9 2026", last: null, chat: "8c422837-7598-43ec-9d51-edf55b88f027", color: "#F43F5E", shape: "hex" },
  { id: "ostester", name: "OS Tester", floor: "ai", role: "Solutions architect · QA · devops", status: "Waiting", task: "Waiting · Parked · HQ parked Nov 9", asOf: "Nov 9 2026", last: null, chat: "f3cb468a-22de-425f-94a6-84edf2887bab", color: "#64748B", shape: "square" },
  { id: "clay", name: "Clay Avatar Artist", floor: "ai", role: "Soft-clay avatar production", status: "Waiting", task: "Waiting · Parked · no Live HQ build order · Phase 1 idle", asOf: "~12:05 PM ET Nov 5", last: "2026-11-05T12:05:00-05:00", chat: "ab16d55e-95da-487e-a7e9-825fc7fd689a", color: "#E07A5F", shape: "cloud" },
  { id: "lidir", name: "LinkedIn Department Director", floor: "linkedin", role: "LinkedIn Growth & Career Acquisition lead", status: "Working", task: "Leads LinkedIn department · no unapproved sends or profile changes", asOf: "Nov 10 2026", last: null, chat: "e650b14d-47f5-4759-a5d0-9a557357530e", color: "#DB2777", shape: "star" },
  { id: "liprof", name: "LinkedIn Profile & Branding Specialist", floor: "linkedin", role: "Profile & branding", status: "Working", task: "Profile and branding drafts · no unapproved profile edits", asOf: "Nov 10 2026", last: null, chat: "d602e913-0074-4514-9ff8-121d970ff457", color: "#EC4899", shape: "squircle" },
  { id: "licontent", name: "AI & Finance Content Specialist", floor: "linkedin", role: "AI & finance content", status: "Working", task: "AI and finance content drafts · nothing published without authorization", asOf: "Nov 10 2026", last: null, chat: "85bbceeb-d8d7-4849-9dfa-983218d728a0", color: "#C026D3", shape: "pill" },
  { id: "licareer", name: "Career Acquisition & Networking Specialist", floor: "linkedin", role: "Career acquisition & networking", status: "Working", task: "Job pipeline · no unapproved outreach or applications", asOf: "Nov 10 2026", last: null, chat: "fcd33327-7511-4aa1-af5a-af8d637fc010", color: "#7C3AED", shape: "diamond" },
];

const CLAY_FACE: Record<St, string> = {
  Working: "data:removed;note=base64-image-2KB-stripped",
  Waiting: "data:removed;note=base64-image-2KB-stripped",
  Closed: "data:removed;note=base64-image-2KB-stripped",
  Pending: "data:removed;note=base64-image-2KB-stripped",
};
// Full-body soft-clay desk people: background-isolated crops of the owner-approved pack sheet clay-full-roster-overview.jpg (Nov 5). Artwork only; pack captions/status are not roster truth.
const CLAY_BODY: Record<string, string> = {
  amanda: "data:removed;note=base64-image-1KB-stripped",
  chiefyt: "data:removed;note=base64-image-1KB-stripped",
  clay: "data:removed;note=base64-image-1KB-stripped",
  cos: "data:removed;note=base64-image-1KB-stripped",
  credit: "data:removed;note=base64-image-1KB-stripped",
  gmail: "data:removed;note=base64-image-1KB-stripped",
  goldtemp: "data:removed;note=base64-image-1KB-stripped",
  hot: "data:removed;note=base64-image-1KB-stripped",
  inv: "data:removed;note=base64-image-1KB-stripped",
  lex: "data:removed;note=base64-image-1KB-stripped",
  mailroom: "data:removed;note=base64-image-1KB-stripped",
  ostester: "data:removed;note=base64-image-1KB-stripped",
  pbt: "data:removed;note=base64-image-1KB-stripped",
  rio: "data:removed;note=base64-image-1KB-stripped",
  script: "data:removed;note=base64-image-1KB-stripped",
  storage: "data:removed;note=base64-image-1KB-stripped",
  time: "data:removed;note=base64-image-1KB-stripped",
  wa: "data:removed;note=base64-image-1KB-stripped",
  ytan: "data:removed;note=base64-image-1KB-stripped",
};
// Sharper floor figures (60px-wide WebP crops of clay-full-roster-overview.jpg, transparent bg). One entry per seat; missing ids fall back to CLAY_BODY.
const CLAY_BODY_HD: Record<string, string> = {
  amanda: "data:removed;note=base64-image-3KB-stripped",
  cos: "data:removed;note=base64-image-3KB-stripped",
  credit: "data:removed;note=base64-image-3KB-stripped",
  hot: "data:removed;note=base64-image-3KB-stripped",
  inv: "data:removed;note=base64-image-3KB-stripped",
  pbt: "data:removed;note=base64-image-3KB-stripped",
  goldtemp: "data:removed;note=base64-image-3KB-stripped",
  rio: "data:removed;note=base64-image-3KB-stripped",
  lex: "data:removed;note=base64-image-3KB-stripped",
  ostester: "data:removed;note=base64-image-3KB-stripped",
  clay: "data:removed;note=base64-image-3KB-stripped",
  chiefyt: "data:removed;note=base64-image-3KB-stripped",
  script: "data:removed;note=base64-image-3KB-stripped",
  ytan: "data:removed;note=base64-image-3KB-stripped",
  gmail: "data:removed;note=base64-image-3KB-stripped",
  mailroom: "data:removed;note=base64-image-3KB-stripped",
  storage: "data:removed;note=base64-image-3KB-stripped",
  time: "data:removed;note=base64-image-3KB-stripped",
  wa: "data:removed;note=base64-image-3KB-stripped",
  // HD_END
};
const CLAY_FACE_PREV: Record<string, string> = {
  Working: "data:removed;note=base64-image-0KB-stripped",
  Waiting: "data:removed;note=base64-image-0KB-stripped",
  Closed: "data:removed;note=base64-image-0KB-stripped",
  Pending: "data:removed;note=base64-image-0KB-stripped",
};
const CLAY_THUMB: Record<string, string> = {
  people: "data:removed;note=base64-image-3KB-stripped",
  finance: "data:removed;note=base64-image-3KB-stripped",
  aiops: "data:removed;note=base64-image-2KB-stripped",
  ground: "data:removed;note=base64-image-2KB-stripped",
};
CLAY_THUMB.exec = "data:removed;note=base64-image-4KB-stripped";
CLAY_THUMB.youtube = "data:removed;note=base64-image-4KB-stripped";
const CLAY_THUMB_GROUND_CLEAN = "data:removed;note=base64-image-1KB-stripped";
const clayThumbFor = (f: string): string => f === "finance" ? CLAY_THUMB.finance : f === "ai" ? CLAY_THUMB.aiops : f === "ground" ? CLAY_THUMB_GROUND_CLEAN : f === "exec" ? CLAY_THUMB.exec : f === "yt" ? CLAY_THUMB.youtube : CLAY_THUMB.people;
const ACTIVITY_RAW: [string, string, string][] = [
  ["~9:04 AM", "Amanda", "HQ roster restamp (owner refresh HQ · 8:04 AM CT Nov 12) · Gold Fundamentals permanent since Nov 11 · LinkedIn Growth & Career Acquisition Department added (4 Working seats, created Nov 10; Director → Amanda; specialists → Director) · Lex / Rio / OS Tester Waiting · Parked (HQ parked Nov 9) · paper count Day 1 of rolling 20-day count · live trading off · Credit Pending not hired · Research stays closed and off board · roster 12 Working · 9 Waiting · 3 Closed · Credit Pending not counted"],
  ["~3:32 PM", "Rio", "OS Tester Waiting → Working · Stage 3 Pass 1→2 (Amanda order ~3:31 · Lex visual PASS) · Lex + Rio stay Working · soft-clay lock held · Option A queue live · Sync mute held · roster 11 Working · 6 Waiting · 3 Closed · Credit Pending not counted"],
  ["~3:27 PM", "Rio", "MF-01 stamp provenance re-ship · Floor→VO→HQ Roster as of ~3:27 PM ET Nov 5 (one verified stamp) · Lex visual FAIL fix · pending Lex re-check · roster 10 Working · 7 Waiting · 3 Closed · Credit Pending not counted"],
  ["~3:22 PM", "Rio", "Stage 3 Floor-truth HQ merge · Floor+VO structure shipped ~3:20 PM ET Nov 5 · Lex HQ slice ~3:08 PM ET · roster 10 Working · 7 Waiting · 3 Closed + Credit Pending · Lex + Rio Working; OS Tester Waiting · pending Lex full visual check; no Tester PASS or park"],
  ["~3:40 PM", "Lex", "Stage 3 Pass 2 FAIL re-ship · ← People Back contrast (dark glass + #FAFAFA) beside floor pill · soft-clay lock · contrast only"],
  ["~3:08 PM", "Lex", "Stage 3 HQ visual slice · People Back / name-first Find / Credit Pending / labeled dates / Shared task queue / secondary contrast · soft-clay and Manual sync mute held · awaiting visual check + Tester"],
  ["~3:05 PM", "Rio", "Stage 3 BUILD start (Amanda order ~3:02 · Tishan chose must-fix + should-fix) · Lex + Rio Waiting → Working · OS Tester stays Waiting until ship · soft-clay lock held · Option A queue live · roster 10 Working · 7 Waiting · 3 Closed + Credit Pending"],
  ["~2:46 PM", "Rio", "Floor section test PARKED (Amanda park-confirm ~2:45 · read-only findings only) · OS Tester Working → Waiting · Lex / Rio stay Waiting · Stage 2 parked held · soft-clay lock held · Option A queue live · roster 8 Working · 9 Waiting · 3 Closed + Credit Pending"],
  ["~2:44 PM", "Rio", "OS Tester Working refresh · Floor section test (read-only Floor walk on 57ec2643 · Tishan-ordered via Amanda) · not a Stage Pass · Lex / Rio stay Waiting · Stage 2 parked held · soft-clay lock held · Option A queue live · roster 9 Working · 8 Waiting · 3 Closed + Credit Pending"],
  ["~2:18 PM", "Rio", "OS Tester Waiting → Working · independent read-only Agent OS UX walk (Tishan-ordered via Amanda) · not a Stage Pass · Lex / Rio stay Waiting · Stage 2 parked held · soft-clay lock held · Option A queue live · roster 9 Working · 8 Waiting · 3 Closed + Credit Pending"],
  ["~1:45 PM", "Rio", "Stage 2 PARKED (Amanda park-confirm ~1:42 · OS Tester Pass 1+2 PASS) · Lex / OS Tester / Rio → Waiting · Floor map AI Systems cleanup · soft-clay lock held · Option A queue live · roster 8 Working · 9 Waiting · 3 Closed + Credit Pending"],
  ["~1:15 PM", "Rio", "Stage 2 Pass 1+2 stamp · OS Tester Waiting → Working · Lex stays Working (visual done, awaiting park) · Rio stays Working · soft-clay lock held · roster 11 Working · 6 Waiting · 3 Closed + Credit Pending"],
  ["~1:10 PM", "Rio", "Stage 2 dashboard build stamp · Lex + Rio → Working · OS Tester Waiting until Pass · soft-clay lock held · roster 10 Working · 7 Waiting · 3 Closed + Credit Pending"],
  ["~12:05 PM", "Rio", "Phase 1 idle cleanup stamp · Clay/Storage/YT Analyst → Waiting · soft-clay lock held · roster 8 Working · 9 Waiting · 3 Closed"],
  ["~9:54 AM", "Rio", "Floor→VO→Live HQ walk soft bugs park stamp · Lex/OS Tester/Rio → Waiting · roster 11 Working · 6 Waiting · 3 Closed"],
  ["~9:54 AM", "Amanda", "Walk soft bugs park-confirm · Pass 1+2 PASS · Lex/OS Tester → Waiting · Clay stays Working · soft beep deferred"],
  ["~9:54 AM", "OS Tester", "Pass 1+2 PASS walk soft bugs · Gold… ellipsis · Floor 5 header · AI Ops Waiting bubbles"],
  ["~9:50 AM", "Lex", "Walk soft bugs re-ship 2 · Gold plate short word cut Gold… + wider px (Re-Pass 1 FAIL hard-clip fix)"],
  ["~9:45 AM", "Lex", "Walk soft bugs re-ship · Gold Fundamentals desk plate word-aware (Pass 1 FAIL fix) · ·-suffix then space cut"],
  ["~9:36 AM", "Lex", "Walk soft bugs SHIPPED on Live HQ · Floor 5 panel = scene label · AI Ops Waiting bubbles name-first + fan · desk names fuller truncate"],
  ["~9:33 AM", "Amanda", "Tishan: fix walk soft bugs · Lex Working · soft-clay lock held · soft leftovers parked stay"],
  ["~9:16 AM", "Amanda", "Soft leftovers park-confirm · Pass 1+2 PASS · Lex/OS Tester/Rio → Waiting · Clay stays Working · soft beep audio deferred"],
  ["~9:16 AM", "Rio", "Floor→VO→Live HQ soft leftovers park stamp · roster 11 Working · 6 Waiting · 3 Closed"],
  ["~9:16 AM", "OS Tester", "Pass 1+2 PASS soft leftovers · Sync ✓+clock · Floor 4 re-frame · Skip/Usage"],
  ["~9:12 AM", "Lex", "Soft leftovers SHIPPED on Live HQ · sync click feedback · Floor 4 sidebar camera always re-frame · Skip clear of Usage pill"],
  ["~9:09 AM", "Amanda", "Tishan: clear 3 soft leftovers · Lex Working · soft-clay lock held"],
  ["~8:52 AM", "Amanda", "Finish-HQ polish park-confirm · Pass 1+2 PASS · Lex/OS Tester/Rio → Waiting · Clay stays Working · soft leftovers deferred"],
  ["~8:52 AM", "Rio", "Floor→VO→Live HQ finish-HQ polish park stamp · roster 11 Working · 6 Waiting · 3 Closed"],
  ["~8:47 AM", "Lex", "Find typed hard fix · inline #FAFAFA + caret · Pass 1 FAIL re-ship 2"],
  ["~8:45 AM", "Lex", "Find typed contrast fix · #FAFAFA + -webkit-text-fill · Pass 1 FAIL re-ship"],
  ["~8:32 AM", "Lex", "Live HQ polish wave ship · Clay sharp faces · Exec/YT lean thumbs · Floor4 bubble · Find/sync"],
  ["~8:28 AM", "Amanda", "Tishan: finish building HQ · Lex Working · finish-HQ polish wave (Find typed / sync icon / soft notes) · roster 12 Working · 5 Waiting · 3 Closed"],
  ["~8:22 AM", "Amanda", "Soft-clay Live HQ trial park-confirm · Pass 1+2 PASS · Lex/OS Tester/Rio → Waiting · Clay stays Working"],
  ["~8:22 AM", "Rio", "Floor→VO→Live HQ soft-clay park stamp · roster 11 Working · 6 Waiting · 3 Closed"],
  ["~8:14 AM", "Lex", "Soft-clay Live HQ trial ship · People avatars + floor seats + roomy-gold lean heroes · Clay Avatar Artist seat → OS Tester"],
  ["~11:24 AM", "Amanda", "5-floor reorg park-confirm · Lex/OS Tester/Rio → Waiting"],
  ["~11:24 AM", "Rio", "Floor→VO→Live HQ park stamp · roster 10 Working · 6 Waiting · 3 Closed"],
  ["~11:24 AM", "OS Tester", "Pass 1+2 PASS on Live HQ 5-floor · Amanda park asked"],
  ["~11:23 AM", "Rio", "Floor→VO 5-floor SoT verified · roster 13 Working · 3 Waiting · 3 Closed"],
  ["~11:22 AM", "OS Tester", "Pass 1 PASS on Live HQ 5-floor · soft Suite vs Suit · Pass 2 starting"],
  ["~11:20 AM", "Lex", "Live HQ 5-floor SHIPPED · Executive Suite / Finance / YouTube / AI Ops / Ground · soft QA PASS"],
  ["~11:19 AM", "Amanda", "Tishan floor reorg · 5 floors Live HQ · Lex Working"],
  ["~9:20 AM", "Rio", "Floor→VO→Live HQ park stamp · roster 10 Working · 6 Waiting · 3 Closed"],
  ["~9:20 AM", "Amanda", "Highs wave park-confirm · Lex/OS Tester/Rio → Waiting"],
  ["~9:12 AM", "Rio", "SYNC-01 Live HQ republish from Floor · INT-01 Usage stamp (plan-level Super) · UI-07 dated Activity"],
  ["~9:10 AM", "Lex", "Highs soft-QA a–j PASS · UI-F04 Exec=1…Trading=8 + People contrast Highs shipped"],
  ["~9:08 AM", "Amanda/Rio", "Highs fix wave Floor→VO · Lex/Rio/OS Tester Working · roster 13·3·3"],
  ["~8:43 AM", "OS Tester", "A–Z audit complete · final report + bug log"],
  ["~7:51 AM", "Amanda", "Closed/empty contrast Pass 3 park-confirmed · Lex Waiting (historical)"],
  ["~7:46 AM", "Lex", "Closed contrast pass 3 — People dark Closed cards + brighter empty-state (Tester Pass 1 FAIL)"],
  ["~7:42 AM", "Lex", "Closed + empty-state contrast pass 2 (near Working brightness · MacBook)"],
  ["~7:40 AM", "Lex", "Closed/inactive seat contrast raised on Live HQ floor cards (MacBook)"],
  ["~5:05 PM", "Lex", "SAMPLE r3 left panel shipped (slim rail · Floors parked · Usage in top bar)"],
  ["~2:55 PM", "Lex", "Left panel redesign + clearer labels MacBook QA a–f PASS · parked"],
  ["~2:52 PM", "Lex", "Left panel redesign + clearer labels shipped (Tishan yes · Rio lock)"],
  ["~12:56 PM", "Lex", "Live HQ Phase T People board MacBook QA a–f PASS · parked"],
  ["~12:51 PM", "Lex", "Live HQ Phase T People board shipped"],
  ["~8:58 AM", "Lex", "Live HQ left-rail label contrast PASS · parked (MacBook a–f soft)"],
  ["~8:56 AM", "Lex", "Live HQ left-rail label contrast shipped (MacBook-first)"],
  ["~8:55 AM", "Amanda", "Tishan reopen · left sidebar hard-to-read letters"],
  ["~8:55 PM", "Lex", "Live HQ polish standby · E–S PASS parked (await next desktop ask)"],
  ["~8:54 PM", "Lex", "Live HQ Phase S Near-tie Waiting PASS · parked (MacBook a–f)"],
  ["~8:53 PM", "Lex", "Live HQ Phase S Near-tie Waiting shipped"],
  ["~8:51 PM", "Lex", "Live HQ Phase R Limits shell-height PASS · parked (MacBook a–f)"],
  ["~8:49 PM", "Lex", "Live HQ Phase R Limits shell-height shipped"],
  ["~8:48 PM", "Lex", "Live HQ Phase Q Secondary CTA contrast PASS · parked (MacBook a–f)"],
  ["~8:47 PM", "Lex", "Live HQ Phase Q Secondary CTA contrast shipped"],
  ["~8:46 PM", "Lex", "Live HQ Phase P Skip resting visible PASS · parked (MacBook a–f)"],
  ["~8:45 PM", "Lex", "Live HQ Phase P Skip resting visible shipped"],
  ["~8:44 PM", "Lex", "Live HQ Phase O Next waiting readable PASS · parked (MacBook a–f)"],
  ["~8:42 PM", "Lex", "Live HQ Phase O Next waiting readable shipped"],
  ["~8:41 PM", "Lex", "Live HQ Phase N Limits contained PASS · parked (MacBook a–f)"],
  ["~8:39 PM", "Lex", "Live HQ Phase N Limits height hotfix (100%→100vh)"],
  ["~8:55 PM", "Lex", "Live HQ Phase N Limits contained shipped"],
  ["~8:52 PM", "Lex", "Live HQ Phase M Stable Waiting order PASS · parked (MacBook a–f)"],
  ["~8:50 PM", "Lex", "Live HQ Phase M Stable Waiting order shipped"],
  ["~8:48 PM", "Lex", "Live HQ Phase L Skip to plates PASS · parked (MacBook a–f)"],
  ["~8:45 PM", "Lex", "Live HQ Phase L Skip to plates shipped"],
  ["~8:42 PM", "Lex", "Live HQ Phase K Visible focus PASS · parked (MacBook a–f)"],
  ["~8:40 PM", "Lex", "Live HQ Phase K Visible focus shipped"],
  ["~8:30–8:35 PM", "Lex", "Live HQ Phase J Keyboard triage PASS · parked (MacBook a–f soft c/e)"],
  ["~8:30 PM", "Lex", "Live HQ Phase J Keyboard triage shipped"],
  ["~8:28 PM", "Lex", "Live HQ Phase I Oldest first PASS · parked (MacBook a–f)"],
  ["~8:25 PM", "Lex", "Live HQ Phase I Oldest first shipped"],
  ["~8:20 PM", "Lex", "Live HQ Phase H Honest bubbles PASS · parked (MacBook a–f)"],
  ["~8:15 PM", "Lex", "Live HQ Phase H Honest bubbles shipped"],
  ["~8:10 PM", "Lex", "Live HQ Phase G Readable nameplates PASS · parked (MacBook a–f)"],
  ["~8:05 PM", "Lex", "Live HQ Phase G Readable nameplates shipped"],
  ["~8:00 PM", "Lex", "Phase F Who's who MacBook PASS; parked"],
  ["~8:00 PM", "Lex", "Live HQ Phase F Who's who shipped"],
  ["~7:55 PM", "Lex", "Phase E Act on Waiting MacBook PASS; parked"],
  ["~7:55 PM", "Lex", "Live HQ Phase E Act on Waiting shipped"],
  ["~3:14 PM", "Lex", "A⁵′ Limits drawer MacBook PASS; parked"],
  ["~3:12 PM", "Lex", "Live HQ A⁵′ Limits drawer opaque + lift above zoom"],
  ["~3:08 PM", "Lex", "Live HQ A⁵ Limits drawer stacking + Esc/outside"],
  ["~3:06 PM", "Lex", "A⁴′ Limits pin MacBook PASS; left-rail parked"],
  ["~3:05 PM", "Lex", "Live HQ A⁴′ Limits footer forced dark solid, light ink, 40px tap target"],
  ["~2:59 PM", "Lex", "Live HQ left rail A⁴ (Views nav, Waiting first, pinned Limits footer)"],
  ["~2:55 PM", "Lex", "Codila A‴ (overlays kept ≥481px, forced dark glass, z-index fix, in-frame width)"],
  ["~2:49 PM", "Lex", "Codila A″ edge-to-edge (full-bleed shell, slim dark rail, dark glass, zoom 1.15)"],
  ["~2:47 PM", "Lex", "Codila Phase C inspector (denser card, pick cue, Waiting task lines)"],
  ["~2:46 PM", "Lex", "Codila A′ viewport (taller shell, slim rails, single-line capsule, softer zoom)"],
  ["~2:44 PM", "Lex", "Codila Phase B motion (elevator/camera ease, wheel zoom, Waiting task bubbles)"],
  ["~2:42 PM", "Lex", "Codila Phase A shell (full-bleed stage, dark glass overlays, status capsule)"],
  ["~2:30 PM", "Lex", "MacBook Live HQ fixes 1–5 (stage/grid, camera, CTA, top bar, status ink)"],
  ["~2:28 PM", "YT Analyst", "Comment reading stopped (Tishan · YA chat)"],
  ["~1:40 PM", "Lex", "Phone verify notes + Open chat device-tap clarity"],
  ["~1:35 PM", "Lex", "Chair draw-order fix on Live HQ"],
  ["~1:33 PM", "Rio", "Side-by-side build with Lex · Joint Sprint 2"],
  ["~1:30 PM", "Lex", "First-ship top 5 complete (theme, mobile, density, tokens, Floor/VO status language)"],
  ["~1:18 PM", "Lex", "Hired · Chief Design Engineer (approved by Tishan via Amanda) · starting design audit"],
  ["~1:05 PM", "Rio", "Rebuilding Live HQ from scratch"],
  ["11:25 AM", "Storage", "Media copy COMPLETE 2,629/2,629"],
  ["10:28 AM", "Storage", "Moved to Working"],
  ["10:18 AM", "Chiefs", "5 of 5 replied to check-in"],
  ["10:17 AM", "Amanda", "Sent Monday chief check-in"],
  ["9:40 AM", "Connector health", "8 connected · GitHub needsAuth"],
  ["8:19 AM", "OS digest", "Posted"],
  ["7:44 AM", "Time Master", "Calendar look-ahead"],
  ["7:11 AM", "Rio", "Wave 1 helpers all live"],
];
/** I01: verified ET calendar day keyed by exact raw tuple identity JSON.stringify([time,actor,body]). No parallel index array. Unsupported → Unknown. Provenance inventory lives outside HQ source (retest/writer-activity-provenance.json). */
const ACTIVITY_VERIFIED_BY_TUPLE: Record<string, string> = {
  "[\"~9:04 AM\",\"Amanda\",\"HQ roster restamp (owner refresh HQ · 8:04 AM CT Nov 12) · Gold Fundamentals permanent since Nov 11 · LinkedIn Growth & Career Acquisition Department added (4 Working seats, created Nov 10; Director → Amanda; specialists → Director) · Lex / Rio / OS Tester Waiting · Parked (HQ parked Nov 9) · paper count Day 1 of rolling 20-day count · live trading off · Credit Pending not hired · Research stays closed and off board · roster 12 Working · 9 Waiting · 3 Closed · Credit Pending not counted\"]": "2026-11-12",
  "[\"~9:16 AM\",\"Rio\",\"Floor→VO→Live HQ soft leftovers park stamp · roster 11 Working · 6 Waiting · 3 Closed\"]": "2026-11-05",
};
function activityTupleKey(x: [string, string, string]): string { return JSON.stringify([x[0], x[1], x[2]]); }
function activityDayFor(x: [string, string, string]): string | null { return ACTIVITY_VERIFIED_BY_TUPLE[activityTupleKey(x)] ?? null; }
function activityDayLabel(day: string | null, clock: string): string {
  if (!day) return `Unknown date · ${clock} ET`;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const parts = day.split("-"); const y = parseInt(parts[0], 10), m = parseInt(parts[1], 10), d = parseInt(parts[2], 10);
  return `${months[m - 1]} ${d}, ${y} · ${clock} ET`;
}
type ActView = { label: string; who: string; body: string; day: string | null; t: string };
/** Bound records in ACTIVITY_RAW order (raw audit order). Day/label attached before any later reorder; identical tuples share one identity key honestly. Visible History consumes this same array — no parallel index lookup. */
const ACTIVITY_VIEW: ActView[] = ACTIVITY_RAW.map((x: [string, string, string]) => { const day = activityDayFor(x); return { t: x[0], who: x[1], body: x[2], day, label: activityDayLabel(day, x[0]) }; });
const ACTIVITY_SUMMARY: [string, string][] = [
  ["Snapshot", "Roster/task Activity is an HQ restamp as of ~8:04 AM CT / 9:04 AM ET Nov 12, 2026 — not live and not polled. The separate Floor and Virtual Office pages were not restamped."],
  ["Roster", "12 Working · 9 Waiting · 3 Closed (Prior CoS/HR + Research ×2 off board) + Credit Pending excluded. LinkedIn department (4 seats) is Working. Lex, Rio, and OS Tester are Waiting · Parked with the other parked seats. Gold Fundamentals is permanent and reports to Amanda."],
  ["Trading", "Paper count is active (Day 1 of the rolling 20-day count is Thu Nov 12). Live trading remains off. Manual sync stays disabled."],
  ["History", "Full raw audit strings are preserved verbatim below — summary does not replace them."],
];
function parseReportMs(last: string | null): number | null {
  if (last == null) return null;
  const s = last.trim();
  if (!s) return null;
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(Z|[+-]\d{2}:\d{2})$/);
  if (!m) return null;
  const y = parseInt(m[1], 10), mo = parseInt(m[2], 10), d = parseInt(m[3], 10), hh = parseInt(m[4], 10), mm = parseInt(m[5], 10), ss = parseInt(m[6], 10);
  if (mo < 1 || mo > 12 || d < 1 || hh > 23 || mm > 59 || ss > 59) return null;
  const leap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  const dim = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (d > dim[mo - 1]) return null;
  const t = Date.parse(s);
  return Number.isFinite(t) ? t : null;
}
function freshFromStamp(last: string | null, stampMs: number, staleMs: number): string {
  if (last == null || !String(last).trim()) return "Unknown";
  const t = parseReportMs(last);
  if (t === null) return "Invalid report";
  if (t > stampMs) return "Invalid report · future vs snapshot";
  return stampMs - t > staleMs ? "Stale (>4h) · stamped" : "Stamped";
}
function reportAgeMs(last: string | null, stampMs: number): number | null {
  const t = parseReportMs(last);
  if (t === null || t > stampMs) return null;
  return stampMs - t;
}
function cmpWaitingByReport(a: { last: string | null; name: string }, b: { last: string | null; name: string }, stampMs: number): number {
  const ax = reportAgeMs(a.last, stampMs), bx = reportAgeMs(b.last, stampMs);
  if (ax !== null && bx !== null) { const d = bx - ax; return d !== 0 ? d : a.name.localeCompare(b.name); }
  if (ax !== null && bx === null) return -1;
  if (ax === null && bx !== null) return 1;
  return a.name.localeCompare(b.name);
}
function waitingTiedByReport(agent: { last: string | null }, waiting: { last: string | null }[], stampMs: number): boolean {
  const t = parseReportMs(agent.last);
  if (t === null || t > stampMs) return false;
  return waiting.filter((x: { last: string | null }) => parseReportMs(x.last) === t).length > 1;
}
const HOLDS: [string, string][] = [
  ["Time Master", "Calendar-write hold until Tishan confirms Top 3 → Calendar in own words"],
  ["Investments", "Trades and transfers locked (read-only)"],
  ["Credit", "Credit Pending · not hired · not in Working/Waiting/Closed counts."],
];
const CONNECTORS: [string, boolean][] = [["Gmail", true], ["Drive", true], ["Calendar", true], ["TubeAlfred", true], ["Origin", true], ["Robinhood", true], ["Finance", true], ["X", true], ["GitHub", true]];
const HELPERS = ["Calendar look-ahead", "OS digest", "Connector health", "Weekly chief check-in", "Weekly blocker summary (Fri)"];
const FINISHED = ["Wave 1 helpers live", "Chief check-in 5/5", "Gmail cleanup ~50.7k", "Audience → Video Playbook", "Storage media-copy 2,629/2,629"];
const FLOOR_CONN: Record<string, string[]> = { exec: ["Drive", "Calendar"], finance: ["Robinhood", "Finance"], yt: ["TubeAlfred", "Drive"], ai: ["Origin", "X", "GitHub"], ground: ["Gmail", "Calendar", "Drive"] };
const STALE_MS = 4 * 3600 * 1000;
const FLOOR_STAMP = "~8:04 AM CT Nov 12";
const FLOOR_STAMP_SHORT = "8:04 AM CT";
const FLOOR_STAMP_MS = Date.parse("2026-11-12T08:04:00-06:00");
const USAGE_PCT = "21.4";
const USAGE_ASOF = "~8:10 AM CT Nov 12";
const VBW = 1000;
const SC: Record<St, string> = { Working: "#A3E635", Waiting: "#F59E0B", Closed: "#F4F4F5", Pending: "#A78BFA" };
const ST: Record<St, string> = { Working: "#3F6212", Waiting: "#B45309", Closed: "#3F3F46", Pending: "#6D28D9" };

const K = 34, OX = 470, OY = 120;
function pt(x: number, y: number, z: number): [number, number] { return [OX + (x - y) * K * 0.866, OY + (x + y) * K * 0.5 - z * K]; }
function ps(arr: [number, number, number][]): string { return arr.map((a: [number, number, number]) => pt(a[0], a[1], a[2]).join(",")).join(" "); }
function box(key: string, x: number, y: number, z: number, w: number, d: number, h: number, top: string, left: string, right: string, op?: number): ReactNode {
  return (
    <g key={key} opacity={op ?? 1}>
      <polygon points={ps([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={left} />
      <polygon points={ps([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]])} fill={right} />
      <polygon points={ps([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={top} />
    </g>
  );
}
function shadow(key: string, x: number, y: number, rx: number): ReactNode {
  const p = pt(x, y, 0);
  return <ellipse key={key} cx={p[0]} cy={p[1]} rx={rx} ry={rx * 0.45} fill="#000" opacity={0.12} />;
}
function blob(shape: Shape, c: string): ReactNode {
  const s = 15;
  switch (shape) {
    case "square": return <rect x={-s} y={-s} width={2 * s} height={2 * s} rx={4} fill={c} />;
    case "squircle": return <rect x={-s} y={-s} width={2 * s} height={2 * s} rx={11} fill={c} />;
    case "circle": return <circle r={s + 1} fill={c} />;
    case "pill": return <rect x={-11} y={-s - 5} width={22} height={2 * s + 10} rx={11} fill={c} />;
    case "tri": return <polygon points={`0,${-s - 4} ${s + 3},${s} ${-s - 3},${s}`} fill={c} strokeLinejoin="round" stroke={c} strokeWidth={5} />;
    case "diamond": return <polygon points={`0,${-s - 4} ${s + 2},0 0,${s + 4} ${-s - 2},0`} fill={c} stroke={c} strokeWidth={4} strokeLinejoin="round" />;
    case "hex": return <polygon points={[0, 1, 2, 3, 4, 5].map((i: number) => `${Math.cos(Math.PI / 3 * i) * (s + 2)},${Math.sin(Math.PI / 3 * i) * (s + 2)}`).join(" ")} fill={c} stroke={c} strokeWidth={3} strokeLinejoin="round" />;
    case "star": return <polygon points={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i: number) => { const r = i % 2 ? 9 : s + 4; const a = -Math.PI / 2 + Math.PI / 5 * i; return `${Math.cos(a) * r},${Math.sin(a) * r}`; }).join(" ")} fill={c} stroke={c} strokeWidth={4} strokeLinejoin="round" />;
    case "cloud": return <g fill={c}><circle cx={-8} cy={3} r={10} /><circle cx={8} cy={3} r={10} /><circle cx={0} cy={-6} r={12} /></g>;
  }
}
const SEATS: [number, number][] = [[2.2, 3.3], [4.6, 3.3], [7, 3.3], [3.4, 5.8], [5.8, 5.8]];

const CSS = `
.hq{background:var(--hq-frame);border:1px solid var(--hq-glass-border);border-radius:24px;padding:14px;font-family:inherit;color:var(--hq-ink)}
.glass{background:var(--hq-glass);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid var(--hq-glass-border);border-radius:20px;padding:12px 14px;color:var(--hq-ink)}
.top{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;margin-bottom:12px}
.pills{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.pill{display:inline-flex;align-items:center;gap:6px;padding:5px 10px;border-radius:999px;background:var(--hq-fill);font-size:12px}
.dot{width:8px;height:8px;border-radius:50%;display:inline-block}
.grid{display:grid;grid-template-columns:240px minmax(0,1fr) 320px;gap:12px;align-items:start}
.mid{display:flex;flex-direction:column;gap:8px;min-width:0}
.col{display:flex;flex-direction:column;gap:12px;min-width:0}
.mut{color:var(--hq-muted);font-size:12px}
.h{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--hq-muted);margin:2px 0 8px}
.btn{background:var(--hq-fill);color:var(--hq-ink);border:1px solid var(--hq-glass-border);border-radius:12px;padding:6px 10px;font-size:12px;cursor:pointer;text-align:left;transition:background .15s ease}
.btn:hover{background:var(--hq-fill-hover)}
.btn:focus-visible,.circ:focus-visible{outline:2px solid var(--hq-focus);outline-offset:2px}
.on{background:var(--hq-on);border-color:var(--hq-glass-border-strong)}
.chips{display:flex;flex-wrap:wrap;gap:6px}
.row{display:flex;justify-content:space-between;gap:8px;align-items:center;padding:5px 0;border-bottom:1px solid var(--hq-rule);font-size:13px}
.stage{position:relative;border-radius:24px;overflow:hidden;background:var(--hq-stage);border:1px solid var(--hq-glass-border);touch-action:none;min-height:440px}
.stage svg{width:100%;min-height:440px;height:auto;display:block}
.zoom{display:flex;gap:6px;justify-content:flex-end;align-items:center}
.circ{width:38px;height:38px;border-radius:50%;background:var(--hq-glass);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);color:var(--hq-ink);border:1px solid var(--hq-glass-border);font-size:18px;cursor:pointer}
.circ:hover{background:var(--hq-fill-hover)}
.rst{border-radius:999px;width:auto;padding:0 14px;font-size:12px}
.flab{position:absolute;left:12px;top:12px}
.a{color:var(--hq-link);text-decoration:none;font-size:13px}
.a:hover{text-decoration:underline}
.track{height:8px;background:var(--hq-fill);border-radius:8px;margin:6px 0}
.bob{animation:bob 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
.cab{animation:cab 6s ease-in-out infinite}
.cabgo{animation:cabgo 1.1s cubic-bezier(.65,0,.3,1)}
@keyframes cab{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes cabgo{0%{transform:translateY(70px)}80%{transform:translateY(-3px)}100%{transform:translateY(0)}}
.wbub{animation:wb 3.2s ease-in-out infinite}
.wbub.old{animation:none}
@keyframes wb{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
.slideU{animation:sU 1.05s cubic-bezier(.65,0,.25,1) both}
.slideD{animation:sD 1.05s cubic-bezier(.65,0,.25,1) both}
@keyframes sU{0%{transform:translateY(240px);opacity:0}35%{opacity:1}85%{transform:translateY(-4px)}100%{transform:none;opacity:1}}
@keyframes sD{0%{transform:translateY(-240px);opacity:0}35%{opacity:1}85%{transform:translateY(4px)}100%{transform:none;opacity:1}}
.hq,.hq *{box-sizing:border-box}
.hq{max-width:100%;overflow-x:hidden}
.row>span{min-width:0;overflow-wrap:anywhere}
.glass{min-width:0;overflow-wrap:anywhere}
.ins{display:flex;flex-direction:column;gap:9px;padding:14px 14px 12px}
.ins .h{margin:0 0 4px;font-size:10.5px;font-weight:600}
.ins .kv{gap:4px 10px;font-size:12px;padding:8px 10px;border:1px solid var(--hq-rule);border-radius:12px}
.ins .acts{flex-direction:column;gap:6px;margin-top:2px}
.ins .acts .cta{width:100%}
.wit{display:flex;flex-direction:column;gap:1px;padding:5px 0 6px;border-bottom:1px solid var(--hq-rule)}
.wit .wt{font-size:11.5px;color:var(--hq-ink);line-height:1.3;padding-left:20px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.wit .wa{font-size:10.5px;color:var(--hq-muted);padding-left:20px}
.wit.old{border-left:2px dashed #B45309;padding-left:8px}.wit.old .wa{color:#B45309}
.pick{display:flex;align-items:center;gap:8px;margin:8px 0 4px;padding:7px 10px;border-radius:12px;border:1px dashed var(--hq-glass-border);font-size:12px;color:var(--hq-muted)}
.insh{display:flex;align-items:center;gap:10px;padding-bottom:9px;border-bottom:1px solid var(--hq-rule)}
.av{width:34px;height:34px;border-radius:12px;flex:none;box-shadow:inset 0 -3px 0 rgba(0,0,0,.12)}
.nm{font-size:18px;font-weight:700;line-height:1.15;letter-spacing:-.01em}
.stp{display:inline-flex;align-items:center;gap:6px;align-self:flex-start;padding:4px 10px;border-radius:999px;background:var(--hq-fill);border:1px solid var(--hq-glass-border);font-size:12px;font-weight:600;color:var(--hq-ink)}
.task{background:var(--hq-fill);border-radius:12px;padding:8px 10px;font-size:12.5px;line-height:1.4;font-weight:500}
.kv{display:grid;grid-template-columns:auto minmax(0,1fr);gap:6px 12px;font-size:12.5px}
.kv>span:nth-child(odd){color:var(--hq-muted)}
.kv>span:nth-child(even){text-align:right;overflow-wrap:anywhere}
.acts{display:flex;flex-wrap:wrap;gap:8px}
.khint{font-size:11px;color:var(--hq-muted);align-self:center}
g.np:focus{outline:none}
g.np .fr{display:none}
g.np:focus-visible .fr{display:inline}
@media(max-width:480px){.khint{display:none}}
.skip{position:absolute;z-index:5;left:190px;top:80px;background:rgba(12,13,17,.45);border:1px solid rgba(255,255,255,.10);color:#ECEDEF;font-size:11.5px;cursor:pointer;padding:4px 8px;border-radius:8px;font-family:inherit}
.skip:hover{color:#ECEDEF;background:rgba(12,13,17,.6)}
.skip:focus{outline:none}
.skip:focus-visible{outline:2px solid #93C5FD;outline-offset:2px;color:#ECEDEF;background:rgba(12,13,17,.55)}
@media (max-width:820px) and (min-width:481px){.skip{left:174px}}
@media (max-width:480px){.skip{display:none}}
.cta{display:inline-flex;align-items:center;padding:7px 12px;border-radius:12px;background:var(--hq-fill);border:1px solid var(--hq-glass-border);color:var(--hq-ink);text-decoration:none;font-size:13px;font-weight:600}
.cta:hover{background:var(--hq-fill-hover)}
.cta.pri{background:var(--hq-ink);color:var(--hq-frame);border-color:var(--hq-ink)}
.cta.pri:hover{background:var(--hq-ink);opacity:.88}
.cta:not(.pri){font-weight:500;color:var(--hq-muted);background:transparent}
.cta:not(.pri):hover{color:var(--hq-ink);background:var(--hq-fill)}
.shell .rrail .cta:not(.pri),.shell .ov .cta:not(.pri){font-weight:600;color:#ECEDEF!important;background:rgba(255,255,255,.14)!important;border:1px solid rgba(255,255,255,.18)!important}
.shell .rrail .cta:not(.pri):hover,.shell .ov .cta:not(.pri):hover{background:rgba(255,255,255,.20)!important;color:#ECEDEF!important}
.cta{cursor:pointer;justify-content:center;gap:6px}
.cta:focus-visible{outline:2px solid var(--hq-ink);outline-offset:2px}
.note{font-size:11.5px;color:var(--hq-muted);line-height:1.45;border-top:1px solid var(--hq-rule);padding-top:8px}
.item{display:flex;flex-direction:column;gap:3px;padding:8px 0;border-bottom:1px solid var(--hq-rule)}
.item .mut{line-height:1.4}
@media (max-width:720px){
.hq{padding:10px;border-radius:20px}
.kv{font-size:13.5px}
.cta{min-height:44px}
.top{flex-direction:column;align-items:stretch;gap:8px}
.top>.glass{width:100%}
.pill{white-space:normal}
.grid{grid-template-columns:minmax(0,1fr);gap:10px}
.mid{order:-1}
.col{width:100%}
.stage{border-radius:18px;touch-action:pan-y}
.stage{min-height:320px}
.stage svg{width:100%;height:auto;min-height:320px}
.flab{left:8px;top:8px;right:8px;padding:6px 10px;font-size:12px;max-width:calc(100% - 16px)}
.zoom{gap:8px;justify-content:center}
.circ{width:44px;height:44px}
.rst{padding:0 12px;font-size:13px}
.btn{min-height:40px;font-size:13px}
.h{font-size:12px}
.mut{font-size:13px}
.row{font-size:14px;flex-wrap:wrap}
}
.hq{padding:0}
.shell{position:relative;isolation:isolate;height:clamp(460px,calc(100vh - 140px),1100px);width:100%;margin-left:0;border-radius:0;overflow:hidden;background:var(--hq-stage);border:0}
.shell .mid{display:contents}
.shell .stage{position:absolute;inset:0;z-index:0;border:0;border-radius:0;min-height:0}
.shell .stage svg{width:100%;height:100%;min-height:0}
.ov .glass{backdrop-filter:blur(18px) saturate(1.2);-webkit-backdrop-filter:blur(18px) saturate(1.2);box-shadow:0 10px 30px rgba(0,0,0,.22)}
.lrail{position:absolute;z-index:3;left:0;top:0;bottom:0;width:176px;overflow-y:auto;display:flex;flex-direction:column;gap:0;padding:8px 0 52px;scrollbar-width:thin;font-size:12px;background:var(--hq-glass);backdrop-filter:blur(20px) saturate(1.3);-webkit-backdrop-filter:blur(20px) saturate(1.3);border-right:1px solid var(--hq-glass-border)}
.shell .lrail .glass{background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;padding:8px 10px;border-bottom:1px solid var(--hq-rule)!important}
.lrail .h,.lrail button,.lrail b{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lrail .chips{flex-wrap:wrap}
.shell .rrail .glass{background:var(--hq-glass)}
.shell .lrail{background:rgba(12,13,17,.74)!important;color:#ECEDEF!important;border-right:1px solid rgba(255,255,255,.08)!important}
.shell .ov .glass,.shell .rrail .glass,.shell .cap>.glass,.shell .zoom .glass,.shell .circ,.shell .limb>.btn{background:rgba(12,13,17,.74)!important;color:#ECEDEF!important;border-color:rgba(255,255,255,.10)!important;backdrop-filter:blur(18px) saturate(1.2);-webkit-backdrop-filter:blur(18px) saturate(1.2)}.shell .ov.zoom > button.btn{background:rgba(12,13,17,.92)!important;color:#FAFAFA!important;border:1px solid rgba(255,255,255,.28)!important;backdrop-filter:blur(18px) saturate(1.2);-webkit-backdrop-filter:blur(18px) saturate(1.2);font-weight:700!important;opacity:1!important;padding:6px 12px!important;border-radius:999px!important;white-space:nowrap}.shell .ov.zoom > button.btn:hover{background:rgba(12,13,17,.98)!important;color:#FFFFFF!important;border-color:rgba(255,255,255,.40)!important}.shell .cap>.glass .pill,.shell .cap>.glass .btn{color:#FAFAFA!important;font-weight:600!important;opacity:1!important}.shell .cap>.glass .pill.mut{color:#ECEDEF!important}.shell .cap>.glass .pill.mut:disabled,.cap .pill.mut:disabled{color:#A1A1AA!important;opacity:0.55!important;border:1px solid transparent!important;border-color:transparent!important;background:transparent!important;cursor:not-allowed!important;box-shadow:none!important}
.shell .lrail .mut{color:rgba(236,237,239,.86)!important}.shell .rrail .mut,.shell .cap .mut,.shell .zoom .mut{color:#E8E8EA!important}.shell .limd .mut{color:#E8E8EA!important}
.shell .lrail .btn,.shell .rrail .btn{color:#ECEDEF!important;background:rgba(255,255,255,.06)!important;border-color:rgba(255,255,255,.10)!important}
.shell .lrail .on,.shell .rrail .on{background:rgba(255,255,255,.16)!important}
.lrail{opacity:.94;transition:opacity .2s}.lrail:hover{opacity:1}.shell .rrail{opacity:1!important}
.rrail{position:absolute;z-index:3;right:10px;top:10px;bottom:56px;width:270px;overflow-y:auto;scrollbar-width:thin}
.cap{position:absolute;z-index:4;top:10px;left:190px;right:290px;display:flex;justify-content:center;pointer-events:none}
.cap>.glass{pointer-events:auto;border-radius:18px;padding:4px 6px;display:flex;flex-wrap:wrap;white-space:normal;overflow:visible;max-width:100%;scrollbar-width:none;gap:4px;align-items:center}
.cap .pill,.cap .btn.pill{font-size:12px;padding:3px 9px;flex:0 0 auto;color:#FAFAFA!important;font-weight:600!important;opacity:1!important}.cap .pill .dot{opacity:1!important}.cap .pill.mut{color:#ECEDEF!important;font-weight:600!important}.cap .pill.mut:disabled{color:#A1A1AA!important;opacity:0.55!important;border:1px solid transparent!important;border-color:transparent!important;background:transparent!important;cursor:not-allowed!important;box-shadow:none!important}
.shell .zoom{position:absolute;z-index:4;bottom:10px;left:190px;right:290px;justify-content:center;flex-wrap:wrap}
.zl{padding:8px 14px;border-radius:999px;font-size:12px}
.limb{position:absolute;z-index:5;left:8px;bottom:10px;width:160px}
.limb>.btn{white-space:nowrap;width:100%}
.limd{font-size:12.5px;line-height:1.5}
.limd .row{font-size:12.5px}
@media (max-width:820px) and (min-width:481px){.lrail{width:164px}.rrail{width:224px}.cap{left:174px;right:242px}.shell .zoom{left:174px;right:242px}.limb{width:148px}.zl .mut{display:none}}
@media (max-width:480px){
.shell{height:auto;overflow:visible;display:flex;flex-direction:column;gap:10px;background:transparent;border:0;border-radius:0}
.shell .stage{position:relative;height:360px;border-radius:18px;background:var(--hq-stage);border:1px solid var(--hq-glass-border)}
.lrail,.rrail,.cap,.shell .zoom,.limb{position:static;width:auto;overflow:visible}
.cap{order:0}.shell .stage{order:1}.shell .zoom{order:2}.rrail{order:3}.lrail{order:4}.limb{order:5}.shell .limd{order:6}
.cap>.glass{border-radius:18px;flex-wrap:wrap;white-space:normal}
}
@media (max-width:400px){.rst{font-size:0;width:44px;padding:0}.rst::after{content:'⟲';font-size:18px}.flab .mut{display:none}}
.shell .lrail{overflow:visible;padding:0;display:flex;flex-direction:column}
.lhd{flex:none;padding:8px 10px;border-bottom:1px solid rgba(255,255,255,.08);font-size:12px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lhd .mut{font-weight:400;font-size:11.5px;color:rgba(236,237,239,.86)!important}
.lmid{flex:1 1 auto;min-height:0;overflow-y:auto;scrollbar-width:thin;padding:2px 0 6px}
.lsec{padding:6px 8px;border-bottom:1px solid rgba(255,255,255,.07)}
.lrail .h{font-size:11px;margin:0 0 5px 2px;letter-spacing:.08em;font-weight:600;color:rgba(236,237,239,.92)!important}
.vnav{display:flex;flex-direction:column;gap:1px}
.shell .lrail .vb{display:flex;justify-content:space-between;align-items:center;width:100%;background:transparent!important;border:0!important;border-radius:8px;padding:4px 8px;font-size:12px;box-shadow:none}
.shell .lrail .vb:hover{background:rgba(255,255,255,.08)!important}
.shell .lrail .vb.on{background:rgba(255,255,255,.14)!important;box-shadow:inset 2px 0 0 #93C5FD}
.vbg{background:#F59E0B;color:#111;border-radius:999px;padding:0 6px;font-size:10.5px;font-weight:700;flex:none}
.shell .lrail .ab{display:flex;justify-content:space-between;align-items:center;width:100%;background:transparent!important;border:0!important;padding:4px 4px;font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;font-weight:600;color:rgba(236,237,239,.92)!important}
.lrail .fb{width:100%;display:flex;justify-content:space-between;margin-bottom:2px;padding:3px 8px;font-size:11.5px}
.lrail .wit{padding:3px 0 4px}.lrail .wit .row{padding:0;border:0}.lrail .wit .btn{padding:2px 6px;font-size:11.5px}
.lrail .wit .wt{padding-left:8px;font-size:11.5px}.lrail .wit .wa{padding-left:8px;font-size:11px;color:rgba(236,237,239,.86)!important}
.lrail .wit .row{flex-wrap:wrap;gap:2px}.lrail .wit .row>.btn{flex:1 1 100%;max-width:100%;min-width:0;text-align:left}.lrail .wit .row>span{padding-left:8px}
.lact{font-size:11.5px;padding:2px 2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:rgba(236,237,239,.92)}
.lnk{background:none!important;border:0!important;color:#93C5FD!important;font-size:12px;padding:2px;cursor:pointer;font-weight:600}
.shell .lrail .limb{position:relative;left:auto;bottom:auto;width:auto;z-index:6;flex:none;padding:6px 8px;background:rgba(12,13,17,.96);border-top:1px solid rgba(255,255,255,.10)}
.shell .lrail .limb>.btn{font-size:11.5px;padding:5px 8px}
@media (max-width:480px){.shell .lrail .limb{position:static}.lmid{overflow:visible}}
.shell .lrail .limb,.shell .lrail .limb>.btn,.shell .lrail .limb .btn,.shell .lrail .limb>button{background:rgba(12,13,17,.96)!important;color:#ECEDEF!important;border-color:rgba(255,255,255,.10)!important;opacity:1!important;-webkit-mask-image:none!important;mask-image:none!important;box-shadow:none!important}
.shell .lrail .limb{background-image:none!important;border-top:1px solid rgba(255,255,255,.10)!important}
.shell .lrail .limb>.btn{min-height:40px!important;display:flex!important;align-items:center;gap:6px;font-size:12px!important;font-weight:600;border:1px solid rgba(255,255,255,.10)!important;border-radius:10px;background-image:none!important;overflow:hidden;text-overflow:ellipsis}
.shell .lrail .limb>.btn:hover{background:rgba(32,34,40,.98)!important}
.shell .lrail.limo{z-index:7;opacity:1}
.age{font-size:10.5px;color:var(--hq-muted);margin-left:4px;font-weight:500}.age.old{color:#F59E0B!important;font-weight:600}
.woc{font-size:10.5px;padding-left:8px}.woc .a{font-size:10.5px}
.fwt{color:#F59E0B;font-weight:700;margin-right:4px}
@media (min-width:481px){.shell .lrail.limo .limb{position:static}}
.pboard{position:absolute;z-index:2;left:186px;right:290px;top:56px;bottom:10px;overflow-y:auto;scrollbar-width:thin;background:rgba(12,13,17,.88);border:1px solid rgba(255,255,255,.10);border-radius:18px;padding:14px 16px;color:#ECEDEF;backdrop-filter:blur(18px) saturate(1.2);-webkit-backdrop-filter:blur(18px) saturate(1.2)}
.pbh{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:6px;margin-bottom:10px}
.pbh b{font-size:16px}.pbh .pm2{font-size:11.5px;color:#C4C4CC}
.pgrp{font-size:11px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;color:rgba(236,237,239,.78);margin:12px 0 6px}
.pc{display:flex;align-items:center;gap:12px;width:100%;text-align:left;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-left:3px solid transparent;border-radius:12px;padding:9px 12px;margin-bottom:6px;color:#ECEDEF;cursor:pointer;font-family:inherit}
.pc:hover{background:rgba(255,255,255,.10)}.pc.on{background:rgba(255,255,255,.16);border-color:rgba(147,197,253,.5)}
.pc:focus-visible{outline:2px solid #93C5FD;outline-offset:2px}
.pc.w{border-left-color:#F59E0B;background:rgba(245,158,11,.08)}
.pc.w,.pc.wk,.pc.p{background:rgb(24,24,27)!important;border:1px solid rgba(255,255,255,.22)!important;color:#FAFAFA!important;opacity:1!important}.pc.w{border-left:3px solid #F59E0B!important;background:rgb(38,30,16)!important}.pc.wk{border-left:3px solid #A3E635!important}.pc.p{border-left:3px solid #A78BFA!important}.pc.w .pn,.pc.w .ptk,.pc.w .pr,.pc.w .pup,.pc.wk .pn,.pc.wk .ptk,.pc.wk .pr,.pc.wk .pup,.pc.p .pn,.pc.p .ptk,.pc.p .pr,.pc.p .pup{color:#FAFAFA!important;opacity:1!important}.pc.w .pup.old,.pc.wk .pup.old,.pc.p .pup.old{color:#FBBF24!important}.pc.w .chip,.pc.wk .chip,.pc.p .chip{color:#FAFAFA!important;border-color:rgba(255,255,255,.40)!important;background:rgba(0,0,0,.55)!important;font-weight:700}.pc.w .av,.pc.wk .av,.pc.p .av{opacity:1!important}.pc.w .nyou{opacity:1!important}.pboard .pgrp,.pboard .pgrp *{color:#FAFAFA!important;opacity:1!important}
.pempty{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.45);color:#FFFFFF!important;font-weight:600;padding:10px 12px;border-radius:12px;font-size:13px;margin-top:8px}
.shell .lrail.limo{overflow:visible!important}.shell .limd{position:absolute;z-index:40;left:196px;bottom:16px;width:360px;max-width:calc(100% - 220px);max-height:min(560px,calc(100% - 32px));overflow-y:auto!important;overscroll-behavior:contain;background:rgb(12,13,17)!important;border:1px solid rgba(255,255,255,.18)!important;border-radius:14px!important;padding:14px!important;color:#FAFAFA!important;box-shadow:0 12px 36px rgba(0,0,0,.45);backdrop-filter:blur(18px) saturate(1.2);-webkit-backdrop-filter:blur(18px) saturate(1.2)}.shell .limd .h,.shell .limd .mut,.shell .limd .a,.shell .limd .row{color:#FAFAFA!important}.shell .limd .mut{color:#E8E8EA!important}.shell .limd .a{color:#93C5FD!important;font-weight:600}@media (max-width:820px) and (min-width:481px){.shell .limd{left:180px;width:320px}}@media (max-width:480px){.shell .limd{position:static;max-width:none;max-height:none;width:auto;margin:8px 0}}
.pc.c{background:rgb(24,24,27)!important;border:1px solid rgba(255,255,255,.22)!important;border-left:3px solid #E4E4E7!important;color:#FAFAFA!important}.pc.c .pn,.pc.c .ptk,.pc.c .pr,.pc.c .pup{color:#FAFAFA!important}.pc.c .chip{color:#FAFAFA!important;border-color:rgba(255,255,255,.40)!important;background:rgba(0,0,0,.55)!important;font-weight:700}.pc.c .av{opacity:1!important}.pboard{background:rgb(12,13,17)!important;color:#FAFAFA!important}
.pc .av{width:32px;height:32px;border-radius:10px}
.av{box-sizing:border-box}.av img{display:block;max-width:100%;max-height:100%}
.clayimg{image-rendering:auto}
.clayhero{margin:0 0 12px;position:relative;border-radius:12px;overflow:hidden;box-shadow:0 0 0 1px rgba(245,230,200,.18)}
.clayhero img{display:block;width:100%;height:132px;object-fit:cover;filter:saturate(1.04) sepia(.06)}
.clayhero figcaption{position:absolute;left:10px;bottom:8px;font-size:11px;color:rgba(255,248,235,.92);background:rgba(24,24,27,.55);padding:2px 8px;border-radius:999px}
.clayflr{display:block;width:100%;height:88px;object-fit:cover;border-radius:12px;margin:8px 0 6px;box-shadow:0 0 0 1px rgba(245,230,200,.16)}
.stage::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:0;background:radial-gradient(120% 90% at 85% 0%,rgba(245,230,200,.20),transparent 60%),linear-gradient(180deg,rgba(255,190,110,.06),transparent 55%)}
.pmn{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:2px}
.pn{font-size:13.5px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pn .pr{font-weight:400;color:#C4C4CC;font-size:12px}
.ptk{font-size:12.5px;color:rgba(236,237,239,.92);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.psd{flex:none;display:flex;flex-direction:column;align-items:flex-end;gap:3px}
.chip{display:inline-flex;align-items:center;gap:5px;padding:2px 9px;border-radius:999px;font-size:11.5px;font-weight:600;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12)}
.nyou{font-size:10.5px;font-weight:500;color:#C4C4CC;background:rgba(255,255,255,.06);border-radius:999px;padding:1px 7px}
.pup{font-size:10.5px;color:#C4C4CC}.pup.old{color:#F59E0B;font-weight:600}
.arow{display:flex;gap:10px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.07);font-size:12.5px}.arow .mut{flex:none;width:136px}.pboard .arow .mut,.shell .pboard .arow .mut{color:#FAFAFA!important;font-weight:600;opacity:1!important}.shell .rrail .row>.mut{color:#FAFAFA!important;font-weight:600}
.lin{width:100%;background:rgba(255,255,255,.12)!important;border:1px solid rgba(255,255,255,.28)!important;color:#FAFAFA!important;-webkit-text-fill-color:#FAFAFA!important;caret-color:#FAFAFA!important;border-radius:8px;padding:4px 8px;font-size:12px;font-family:inherit;margin-top:4px;opacity:1!important;color-scheme:dark}
.lin:focus,.lin:active,.lin:hover,.lin:not(:placeholder-shown){color:#FAFAFA!important;-webkit-text-fill-color:#FAFAFA!important;caret-color:#FAFAFA!important;background:rgba(255,255,255,.16)!important;border-color:rgba(255,255,255,.36)!important;outline:none}
.lin::placeholder{color:rgba(250,250,250,.78)!important;-webkit-text-fill-color:rgba(250,250,250,.78)!important;opacity:1!important}
.shell .lrail .lin,.shell .lrail .lin:focus,.shell .lrail .lin:active,.shell .lrail .lin:not(:placeholder-shown){color:#FAFAFA!important;-webkit-text-fill-color:#FAFAFA!important;caret-color:#FAFAFA!important}
input.lin[type=search],input.lin[type=search]:focus,input.lin[type=search]:-webkit-autofill{color:#FAFAFA!important;-webkit-text-fill-color:#FAFAFA!important;caret-color:#FAFAFA!important;-webkit-box-shadow:0 0 0 1000px rgba(30,31,36,.95) inset!important;box-shadow:0 0 0 1000px rgba(30,31,36,.95) inset!important;transition:background-color 99999s ease-out 0s}
.lin option{color:#111;-webkit-text-fill-color:#111}
.shell .lrail .pf{padding:2px 8px;font-size:11.5px;border-radius:999px}
@media (max-width:820px) and (min-width:481px){.pboard{left:172px;right:242px}}
@media (max-width:480px){.pboard{position:static;order:1}}
@media (min-width:821px){.shell .lrail{left:10px;top:10px;bottom:10px;width:176px;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.10)!important;box-shadow:0 10px 30px rgba(0,0,0,.22)}.pboard{left:196px}.cap{left:196px}.shell .zoom{left:196px}.skip{left:196px}}
@media (max-width:820px) and (min-width:481px){.shell .lrail{left:8px;top:8px;bottom:8px;border-radius:18px;overflow:hidden;border:1px solid rgba(255,255,255,.10)!important}.pboard{left:180px}.cap{left:180px}.shell .zoom{left:180px}}
.lfl{flex:none;padding:6px 8px;border-top:1px solid rgba(255,255,255,.10)}
.shell .lrail .fb.on{background:rgba(255,255,255,.16)!important;box-shadow:inset 2px 0 0 #93C5FD;font-weight:600}.shell .lrail .fb.cur{box-shadow:inset 2px 0 0 rgba(147,197,253,.45)}.shell .lrail .fb:hover{background:rgba(255,255,255,.10)!important}.lrail .fb>span:first-child{min-width:0;overflow-wrap:anywhere;text-align:left}.lrail .fb>span:last-child{flex:none;margin-left:6px}.fbh{font-size:10.5px;color:rgba(236,237,239,.86);margin:0 0 4px}
.btn:disabled,.circ:disabled{opacity:.45;cursor:not-allowed}.btn:disabled:hover,.circ:disabled:hover{background:var(--hq-fill)}
.insback{margin-bottom:10px;font-weight:600}
.lrail .fb{padding:6px 10px!important;margin-bottom:4px!important;border-radius:10px!important;font-size:12px!important;line-height:1.3;transition:background .15s ease,box-shadow .15s ease}.lfl>.h{margin-bottom:4px;letter-spacing:.06em}.fbh{padding:0 2px;color:rgba(255,232,190,.92)!important;font-weight:600}
.shell .lrail .fb .fwt{color:#FBBF24}
.shell .rrail .glass>.h:first-child{letter-spacing:.06em;text-transform:uppercase;font-size:11px;opacity:.9}.shell .rrail .glass>b{display:block;margin:2px 0 8px;line-height:1.25}.shell .rrail .clayflr{border-radius:14px;margin:4px 0 10px;box-shadow:0 6px 18px rgba(0,0,0,.25)}.shell .rrail .chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}
.shell .rrail .ins>div{margin-bottom:10px}.shell .rrail .ins .kv{row-gap:6px}.shell .rrail .ins .acts{display:flex;flex-wrap:wrap;gap:8px}
.shell .ov.zoom{gap:8px}.zl b{font-weight:700;letter-spacing:.01em}.shell .ov.zoom .circ{transition:background .15s ease,opacity .15s ease}
.shell .rrail .glass{background:rgba(12,13,17,.92)!important}.shell .rrail .mut{color:#E8E8EA!important}.shell .rrail .row,.shell .rrail .row>span{color:#FAFAFA!important}.shell .rrail .h{color:#ECEDEF!important}.shell .rrail .pick{color:#FFFFFF!important;background:rgba(255,255,255,.14)!important;border:1px solid rgba(255,255,255,.45)!important;font-weight:600;font-size:13px}.shell .rrail .pick span{color:#FFFFFF!important;font-weight:600}.shell .rrail .stc{color:#FFFFFF!important;font-weight:700!important}.shell .rrail .btn{color:#F4F4F5!important}.shell .rrail .track{background:rgba(255,255,255,.18)!important}
/* O-02 Waiting + Floors inspector contrast: dark glass rgba(12,13,17,.92) ≈ #121319; ink #FAFAFA/~17.8:1, #E4E4E7/~14.6:1 (WCAG relative luminance, source-derived; rendered confirm pending) */
.shell .rrail .wit .wt{color:#FAFAFA!important;-webkit-text-fill-color:#FAFAFA!important;opacity:1!important}
.shell .rrail .wit .wa,.shell .rrail .wit .wa .age,.shell .rrail .wit .wa .mut,.shell .rrail .wit .mut{color:#E4E4E7!important;-webkit-text-fill-color:#E4E4E7!important;opacity:1!important}
.shell .rrail .wit.old .wa,.shell .rrail .wit.old .wa .age{color:#FBBF24!important;-webkit-text-fill-color:#FBBF24!important;opacity:1!important}
.shell .rrail .ins .kv>span,.shell .rrail .ins .kv>span:nth-child(odd),.shell .rrail .ins .kv>span:nth-child(even){color:#FAFAFA!important;-webkit-text-fill-color:#FAFAFA!important;opacity:1!important}
.shell .rrail .ins .stp,.shell .rrail .ins .stp span,.shell .rrail .ins .nm{color:#FAFAFA!important;-webkit-text-fill-color:#FAFAFA!important;opacity:1!important}
.shell .rrail .ins .note,.shell .rrail .ins .khint,.shell .rrail .ins .mut{color:#E4E4E7!important;-webkit-text-fill-color:#E4E4E7!important;opacity:1!important}
`;

function nyHour(): number { return Number(new Date().toLocaleString("en-US", { timeZone: "America/New_York", hour: "numeric", hour12: false })) % 24; }

export default function App() {
  const theme = useGrokTheme();
  const dark = theme.kind === "dark";
  const VARS = `.hq{--hq-ink:${theme.text.primary};--hq-muted:${theme.text.secondary};--hq-glass:color-mix(in srgb, ${theme.bg.elevated} ${dark ? 86 : 84}%, transparent);--hq-glass-border:${theme.border.default};--hq-glass-border-strong:${theme.border.strong};--hq-fill:${theme.fill.secondary};--hq-fill-hover:${theme.fill.secondaryHover};--hq-on:${theme.fill.pressed};--hq-rule:${theme.border.subtle};--hq-focus:${theme.border.focus};--hq-link:${theme.text.accent};--hq-frame:${theme.bg.subtle};--hq-stage:${dark ? "linear-gradient(#E2E3E6,#C6C8CD)" : "linear-gradient(#F3F4F6,#DCDDE1)"}} .ov{--hq-ink:#F4F4F5;--hq-muted:#C4C4CC;--hq-glass:rgba(12,13,17,.74);--hq-glass-border:rgba(255,255,255,.10);--hq-glass-border-strong:rgba(255,255,255,.28);--hq-fill:rgba(255,255,255,.08);--hq-fill-hover:rgba(255,255,255,.15);--hq-on:rgba(255,255,255,.2);--hq-rule:rgba(255,255,255,.08);--hq-focus:#93C5FD;--hq-link:#93C5FD;--hq-frame:#111318}`;
    const [floor, setFloor] = useState<string>("exec");
  const [dir, setDir] = useState<"U" | "D">("U");
  const [sel, setSel] = useState<string | null>(null);
  const [kf, setKf] = useState<string | null>(null);
  const [nav, setNav] = useState<Nav>("none");
  const svgRef = useRef<SVGSVGElement | null>(null);
  const zoomRef = useRef<number>(1);
  const wheelAt = useRef<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<[number, number]>([500, 300]);
  const [open, setOpen] = useState<Record<string, boolean>>({ floors: false, waiting: true, finished: false, helpers: false });
  const [light, setLight] = useState<boolean>(true);
  const [sound, setSound] = useState<boolean>(false);
  const [tick, setTick] = useState<number>(0);
  const [lim, setLim] = useState<boolean>(false);
  const limRef = useRef<HTMLDivElement | null>(null);
  const limBtn = useRef<HTMLButtonElement | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("people");
  const [orgFilter, setOrgFilter] = useState<"all" | "Working" | "Waiting">("all");
  const [orgCollapsed, setOrgCollapsed] = useState<string[]>([]);
  const orgScrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => { if (viewMode === "org") { const el = orgScrollRef.current; if (el) { el.scrollLeft = Math.max(0, (el.scrollWidth - el.clientWidth) / 2); el.scrollTop = 0; } } }, [viewMode, orgFilter, orgCollapsed]);
  const [pFilter, setPFilter] = useState<"all" | "Working" | "Waiting" | "Closed">("all");
  const [q, setQ] = useState<string>("");
    const drag = useRef<{ x: number; y: number; px: number; py: number; w: number } | null>(null);

  /* Stage 1: no local clock tick — snapshot uses FLOOR_STAMP only */
  useEffect(() => {
    if (!lim) return;
    const onDown = (e: Event) => { const t = e.target as Element | null; if (t && t.closest && t.closest(".limb, .limd")) return; setLim(false); };
    document.addEventListener("pointerdown", onDown);
    const fsOf = (): HTMLElement[] => { const d = limRef.current; return d ? (Array.from(d.querySelectorAll("button, a[href]")) as HTMLElement[]) : []; };
    requestAnimationFrame(() => { const f = fsOf(); if (f[0]) f[0].focus(); });
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return; const d = limRef.current; const f = fsOf(); if (!d || f.length === 0) return;
      const ae = document.activeElement; const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (ae === first || !d.contains(ae))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (ae === last || !d.contains(ae))) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onTab);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onTab); const b = limBtn.current; const ae = document.activeElement; if (b && (!ae || ae === document.body)) requestAnimationFrame(() => b.focus()); };
  }, [lim]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null; const tag = t && t.tagName ? t.tagName.toLowerCase() : "";
      if (tag === "input" || tag === "textarea" || e.metaKey || e.ctrlKey || e.altKey) return;
      const fp = (id: string): void => { requestAnimationFrame(() => { const el = document.querySelector(`g.np[data-id="${id}"], g.fxp[data-id="${id}"], button.ozcard[data-id="${id}"]`) as any; if (el && el.focus) el.focus(); }); };
      if (e.key === "Escape") { if (lim) setLim(false); else if (sel) { const pid = sel; reset(); fp(pid); } else if (nav !== "none") setNav("none"); return; }
      if (lim || e.repeat) return;
      const k = e.key; const nx = k === "n" || k === "N" || k === "]"; const pv = k === "p" || k === "P" || k === "[";
      if (!nx && !pv) return;
      const wl = waitingOldest(); if (wl.length === 0) return;
      const ci = sel ? wl.findIndex((x: Agent) => x.id === sel) : -1;
      const ni = ci < 0 ? 0 : (ci + (nx ? 1 : -1) + wl.length) % wl.length;
      const ae = document.activeElement as Element | null; const onNp = !!(ae && ae.classList && ae.classList.contains("np"));
      e.preventDefault(); focus(wl[ni]); if (onNp) fp(wl[ni].id);
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); };
  }, [lim, sel, nav]);

  const beep = (f: number): void => {
    if (!sound) return;
    try { const c = new AudioContext(); const o = c.createOscillator(); const g = c.createGain(); o.frequency.value = f; g.gain.value = 0.04; o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.08); } catch (e: unknown) { /* audio unavailable */ }
  };
  const fresh = (a: Agent): string => freshFromStamp(a.last, FLOOR_STAMP_MS, STALE_MS);
  const h = nyHour();
  const tod = h < 6 ? "Night" : h < 12 ? "Morning" : h < 17 ? "Afternoon" : h < 21 ? "Evening" : "Night";
  const tint = !light ? "transparent" : tod === "Morning" ? "rgba(255,214,150,.10)" : tod === "Afternoon" ? "rgba(255,232,190,.12)" : tod === "Evening" ? "rgba(255,140,90,.14)" : "rgba(30,40,90,.28)";

  const cnt = (s: St): number => AGENTS.filter((a: Agent) => a.status === s).length;
  const onFloor = AGENTS.filter((a: Agent) => a.floor === floor);
  const fl = FLOORS.find((f: Floor) => f.id === floor) as Floor;
  const agent = AGENTS.find((a: Agent) => a.id === sel) ?? null;

  const seatOf = (a: Agent): [number, number] => { const i = AGENTS.filter((b: Agent) => b.floor === a.floor).findIndex((b: Agent) => b.id === a.id); return SEATS[i % SEATS.length]; };
  const goFloor = (id: string): void => {
    setViewMode("floors");
    if (id !== floor) {
      const a = FLOORS.findIndex((f: Floor) => f.id === floor), b = FLOORS.findIndex((f: Floor) => f.id === id);
      setDir(b > a ? "D" : "U"); setFloor(id); setTick(tick + 1); beep(520);
    } else {
      beep(440);
    }
    // Always re-frame camera on sidebar select (Floor 4 was staying off-center until Reset when already on that floor / residual pan).
    setSel(null); setZoom(1); setPan([500, 300]);
  };
  const focus = (a: Agent): void => {
    setViewMode("floors");
    if (a.floor !== floor) { const x = FLOORS.findIndex((f: Floor) => f.id === floor), y = FLOORS.findIndex((f: Floor) => f.id === a.floor); setDir(y > x ? "D" : "U"); setFloor(a.floor); setTick(tick + 1); }
    const s = seatOf(a); const p = pt(s[0], s[1] - 0.7, 1); setSel(a.id); setNav("none"); setZoom(1.15); setPan([p[0] - 55, p[1]]); beep(760);
  };
  const reset = (): void => { setZoom(1); setPan([500, 300]); setSel(null); beep(400); };
  const skipFloor = (): void => { const id = onFloor[0] ? onFloor[0].id : null; requestAnimationFrame(() => { const el = (id ? document.querySelector(`g.np[data-id="${id}"]`) : document.querySelector("g.np")) as any; if (el && el.focus) el.focus(); }); };
  const toggle = (k: string): void => setOpen(k === "waiting" ? { ...open, waiting: !open.waiting } : { floors: false, finished: false, helpers: false, waiting: open.waiting, [k]: !open[k] });
  zoomRef.current = zoom;
  useEffect(() => {
    const el = svgRef.current; if (!el) return;
    const onWheel = (e: WheelEvent): void => {
      e.preventDefault();
      const z = Math.min(3, Math.max(0.6, zoomRef.current * Math.exp(-e.deltaY * 0.0022)));
      zoomRef.current = z; wheelAt.current = Date.now(); setZoom(z);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);
  const wheeling = Date.now() - wheelAt.current < 250;
  const tf = `translate(${500 - pan[0] * zoom}px, ${300 - pan[1] * zoom}px) scale(${zoom})`;

  const onDown = (e: PointerEvent<SVGSVGElement>): void => { const r = e.currentTarget.getBoundingClientRect(); drag.current = { x: e.clientX, y: e.clientY, px: pan[0], py: pan[1], w: r.width }; };
  const onMove = (e: PointerEvent<SVGSVGElement>): void => { const d = drag.current; if (!d || e.buttons === 0) return; const k = 1000 / d.w / zoom; setPan([d.px - (e.clientX - d.x) * k, d.py - (e.clientY - d.y) * k]); };
  const onUp = (): void => { drag.current = null; };

  const ageMs = (a: Agent): number => reportAgeMs(a.last, FLOOR_STAMP_MS) ?? 0;
  const ageStr = (_a: Agent): string => `as of ${FLOOR_STAMP_SHORT}`;
  const bubTitle = (a: Agent): string => `${a.task} · last Floor update ${a.asOf}` + ((reportAgeMs(a.last, FLOOR_STAMP_MS) ?? 0) > STALE_MS ? " · stale ≠ offline" : "");
  const ageOf = (a: Agent): ReactNode => { if (!a.last) return <span className="age mut"> · Roster as of {FLOOR_STAMP_SHORT}</span>; const ms = reportAgeMs(a.last, FLOOR_STAMP_MS) ?? 0; return <span className={"age mut" + (ms > STALE_MS ? " old" : "")} title={`Roster as of ${FLOOR_STAMP} · not a live age`}> · Roster as of {FLOOR_STAMP_SHORT}</span>; };
  const waitingOldest = (): Agent[] => AGENTS.filter((a: Agent) => a.status === "Waiting").slice().sort((x: Agent, y: Agent) => cmpWaitingByReport(x, y, FLOOR_STAMP_MS));
  const staleW = waitingOldest().filter((a: Agent) => !!a.last && ageMs(a) > STALE_MS).length;
  const witCls = (a: Agent): string => "wit" + (a.last && ageMs(a) > STALE_MS ? " old" : "");
  const chatLink = (a: Agent): ReactNode => a.chat ? <a className="a" href={`grokbot://app/v1/agent?id=${a.chat}`} target="_top">Open chat →</a> : <span className="mut">Open chat unavailable (seat closed)</span>;
  const agentRow = (a: Agent): ReactNode => (
    <div key={a.id} className="row"><button className="btn" title={a.name} aria-label={`Focus ${a.name} · ${a.status}`} onClick={() => focus(a)}><span className="dot" style={{ background: a.color, marginRight: 6 }} />{a.name}</button><span className={a.status === "Closed" ? "stc" : undefined} style={{ color: SC[a.status], fontSize: 12, fontWeight: a.status === "Closed" ? 700 : 600, whiteSpace: "normal", textAlign: "right", maxWidth: "58%", lineHeight: 1.25 }}>{a.status}{ageOf(a)}</span></div>
  );
  const waitOpen = (a: Agent): ReactNode => <span className="woc" onClick={(e: { stopPropagation: () => void }) => e.stopPropagation()} onPointerDown={(e: { stopPropagation: () => void }) => e.stopPropagation()}>{chatLink(a)}</span>;

  // ---------- Scene ----------
  const wall = "#ECEDEF", wallS = "#D9DADD";
  const scene: ReactNode[] = [];
  scene.push(box("b2", 0, 0, -2.6, 12, 9, 0.25, "#D4D5D9", "#C4C5CA", "#CDCED2", 0.45));
  scene.push(box("b1", 0, 0, -1.3, 12, 9, 0.25, "#DCDDE0", "#C9CACE", "#D2D3D7", 0.6));
  scene.push(box("floor", 0, 0, -0.25, 12, 9, 0.25, "#F4F4F5", "#D6D7DA", "#E1E2E5"));
  // back walls
  scene.push(<polygon key="wl" points={ps([[0, 0, 0], [12, 0, 0], [12, 0, 4], [0, 0, 4]])} fill={wall} />);
  scene.push(<polygon key="wr" points={ps([[0, 0, 0], [0, 9, 0], [0, 9, 4], [0, 0, 4]])} fill={wallS} />);
  for (let i = 0; i < 5; i++) { const x = 0.6 + i * 1.6; scene.push(<polygon key={"win" + i} points={ps([[x, 0, 0.5], [x + 1.4, 0, 0.5], [x + 1.4, 0, 3.6], [x, 0, 3.6]])} fill="#CFE3F2" opacity={0.75} stroke="#B9BCC2" strokeWidth={2} />); scene.push(<polyline key={"m" + i} points={ps([[x + 0.7, 0, 0.5], [x + 0.7, 0, 3.6]])} stroke="#B9BCC2" strokeWidth={2} fill="none" />); }
  // whiteboard + green chart screen on left wall
  scene.push(<polygon key="wb" points={ps([[0, 1.2, 1.4], [0, 3.6, 1.4], [0, 3.6, 3], [0, 1.2, 3]])} fill="#FAFAFA" stroke="#C7C8CC" strokeWidth={2} />);
  scene.push(<polyline key="wbl" points={ps([[0, 1.5, 2.6], [0, 3.2, 2.6]])} stroke="#93C5FD" strokeWidth={2} />);
  scene.push(<polygon key="scr" points={ps([[0, 4.6, 1.5], [0, 7, 1.5], [0, 7, 3], [0, 4.6, 3]])} fill="#1F2937" />);
  scene.push(<polyline key="chart" points={ps([[0, 4.9, 1.8], [0, 5.4, 2.1], [0, 5.9, 2], [0, 6.3, 2.5], [0, 6.7, 2.7]])} stroke="#4ADE80" strokeWidth={3} fill="none" />);
  // lounge (back right)
  scene.push(<polygon key="rug" points={ps([[7.7, 0.15, 0.005], [11.6, 0.15, 0.005], [11.6, 4.6, 0.005], [7.7, 4.6, 0.005]])} fill="#E7E2D8" stroke="#DDD6C8" strokeWidth={6} strokeLinejoin="round" />);
  scene.push(shadow("ls", 9.6, 1.9, 70));
  scene.push(box("sofab", 8, 0.2, 0, 3.2, 0.32, 1.15, "#FAFAFA", "#E4E4E7", "#EDEDEF"));
  scene.push(box("sofa", 8, 0.45, 0, 3.2, 0.9, 0.5, "#FFFFFF", "#E4E4E7", "#F0F0F2"));
  scene.push(box("sofaa1", 7.8, 0.2, 0, 0.28, 1.15, 0.8, "#FAFAFA", "#DEDEE2", "#EAEAED"));
  scene.push(box("sofaa2", 11.2, 0.2, 0, 0.28, 1.15, 0.8, "#FAFAFA", "#DEDEE2", "#EAEAED"));
  for (let i = 0; i < 3; i++) scene.push(box("cush" + i, 8.1 + i * 1.05, 0.5, 0.5, 0.95, 0.75, 0.12, "#F7F7F8", "#E4E4E7", "#EDEDEF"));
  scene.push(box("pil", 8.3, 0.52, 0.62, 0.55, 0.18, 0.4, "#C9D6C3", "#AFBFA8", "#BCCBB5"));
  scene.push(shadow("tbls", 9.6, 2.5, 34));
  scene.push(box("tblleg", 9.45, 2.35, 0, 0.3, 0.3, 0.34, "#CDBFA8", "#BBAA8E", "#C4B497"));
  scene.push(box("tbl", 9.0, 1.9, 0.34, 1.2, 1.2, 0.1, "#EFE4D0", "#CDBFA8", "#DACDB6"));
  scene.push(box("mug", 9.3, 2.2, 0.44, 0.18, 0.18, 0.16, "#FFFFFF", "#E4E4E7", "#F0F0F2"));
  const lchair = (k: string, x: number): void => { scene.push(shadow(k + "s", x + 0.5, 3.9, 30)); scene.push(box(k, x, 3.4, 0, 1, 1, 0.42, "#3F3F46", "#27272A", "#323238")); scene.push(box(k + "b", x, 4.2, 0.42, 1, 0.22, 0.5, "#46464E", "#2A2A2E", "#35353B")); scene.push(box(k + "c", x + 0.08, 3.48, 0.42, 0.84, 0.72, 0.08, "#52525B", "#3F3F46", "#46464E")); };
  lchair("ac1", 8.1); lchair("ac2", 10.3);
  // plants
  const plant = (k: string, x: number, y: number): void => { scene.push(shadow(k + "s", x + 0.3, y + 0.3, 16)); scene.push(box(k, x, y, 0, 0.6, 0.6, 0.55, "#E7E5E4", "#D6D3D1", "#E0DDDB")); const p = pt(x + 0.3, y + 0.3, 1.25); scene.push(<g key={k + "l"}><circle cx={p[0]} cy={p[1] + 4} r={16} fill="#4D7C4F" /><circle cx={p[0] - 6} cy={p[1] - 8} r={11} fill="#5F9361" /><circle cx={p[0] + 6} cy={p[1] - 4} r={10} fill="#6BA36D" /></g>); };
  plant("p1", 0.3, 0.3); plant("p2", 0.3, 7.9); plant("p3", 7.2, 0.3);
  // dual communal desks
  const desk = (k: string, y: number): void => {
    scene.push(shadow(k + "sh", 4.7, y + 0.6, 150));
    for (let i = 0; i < 6; i++) { const x = 1.6 + i * 1.2; scene.push(shadow(k + "sts" + i, x + 0.22, y - 0.52, 11)); scene.push(box(k + "st" + i, x, y - 0.75, 0, 0.45, 0.45, 0.46, "#FFFFFF", "#E4E4E7", "#EFEFF1")); scene.push(box(k + "stc" + i, x + 0.04, y - 0.71, 0.46, 0.37, 0.37, 0.05, "#F4F4F5", "#E4E4E7", "#EDEDEF")); }
    scene.push(box(k + "l1", 1.3, y + 0.1, 0, 0.12, 0.9, 0.75, "#CBBBA0", "#BBAA8E", "#C4B497"));
    scene.push(box(k + "l2", 8.0, y + 0.1, 0, 0.12, 0.9, 0.75, "#CBBBA0", "#BBAA8E", "#C4B497"));
    scene.push(box(k, 1.2, y, 0.75, 7, 1.1, 0.12, "#E9DDC7", "#CBBBA0", "#D9CAB0"));
    scene.push(box(k + "rail", 1.4, y + 0.5, 0.87, 6.6, 0.1, 0.05, "#DCCDB2", "#CBBBA0", "#D2C3A8"));
    const pp = pt(8.4 - 0.3, y + 0.55, 1.05); scene.push(<g key={k + "pl"}><circle cx={pp[0]} cy={pp[1]} r={9} fill="#5F9361" /><circle cx={pp[0] + 5} cy={pp[1] - 5} r={6} fill="#6BA36D" /></g>);
    for (let i = 0; i < 6; i++) { const x = 1.6 + i * 1.2; scene.push(box(k + "lp" + i, x, y + 0.2, 0.87, 0.55, 0.38, 0.04, "#FFFFFF", "#D4D4D8", "#E4E4E7")); scene.push(<polygon key={k + "sc" + i} points={ps([[x, y + 0.2, 0.91], [x + 0.55, y + 0.2, 0.91], [x + 0.55, y + 0.2, 1.25], [x, y + 0.2, 1.25]])} fill="#F8FAFC" stroke="#D4D4D8" strokeWidth={1} />); }
    // front chairs drawn last so desk top never covers seats/backs
    for (let i = 0; i < 6; i++) { const x = 1.6 + i * 1.2; scene.push(box(k + "ch" + i, x - 0.02, y + 1.3, 0, 0.5, 0.45, 0.48, "#3F3F46", "#27272A", "#323238")); scene.push(box(k + "chb" + i, x - 0.02, y + 1.62, 0.48, 0.5, 0.13, 0.42, "#46464E", "#2A2A2E", "#35353B")); }
  };
  desk("d1", 3.3); desk("d2", 5.8);
  // agents
  const plates: any[] = []; let selPlate: any = null;
  onFloor.forEach((a: Agent, i: number) => {
    const s = seatOf(a); const p = pt(s[0], s[1] - 0.55, 1.05); const ground = pt(s[0], s[1] - 0.55, 0.5);
    const isSel = sel === a.id; const muted = a.status === "Closed" || a.status === "Pending"; const gy = ground[1] - p[1]; const body = CLAY_BODY[a.id]; const BH = 58, BW = 38;
    scene.push(
      <g key={"ag" + a.id} tabIndex={-1} role="button" aria-label={`Focus ${a.name} · ${a.status}`} onKeyDown={(e: any) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); focus(a); } }} style={{ cursor: "pointer" }} onClick={() => focus(a)} opacity={muted ? 0.82 : 1}>
        <ellipse cx={ground[0]} cy={ground[1]} rx={16} ry={6} fill="#000" opacity={0.15} />
        <g className={a.status === "Working" ? "bob" : ""}>
          <g transform={`translate(${p[0]},${p[1]})`}>
            {body ? <Fragment>
              {isSel && <ellipse cx={0} cy={gy + 2} rx={26} ry={9} fill="rgba(255,214,150,.35)" stroke="#F5E6C8" strokeWidth={2.5} />}
              {kf === a.id && !isSel && <ellipse cx={0} cy={gy + 2} rx={27} ry={10} fill="none" stroke="#2563EB" strokeWidth={2} strokeDasharray="3 3" />}
              <rect x={-BW / 2 - 4} y={gy + 6 - BH - 2} width={BW + 8} height={BH + 6} fill="transparent" />
              <image className="claybody" href={body} x={-BW / 2} y={gy + 6 - BH} width={BW} height={BH} preserveAspectRatio="xMidYMax meet" style={isSel ? { filter: "drop-shadow(0 0 4px rgba(255,220,160,.9))" } : undefined} />
            </Fragment> : <Fragment>
            {isSel && <circle r={26} fill="none" stroke="#3F3F46" strokeWidth={3} opacity={0.75} />}
            {kf === a.id && !isSel && <circle r={27} fill="none" stroke="#2563EB" strokeWidth={2} strokeDasharray="3 3" />}
            <clipPath id={"cf-" + a.id}><circle r={19.5} /></clipPath>
            <circle r={22} fill="#F5E6C8" stroke={a.color} strokeWidth={3} />
            <image className="clayimg" href={CLAY_FACE[a.status]} x={-20} y={-20} width={40} height={40} preserveAspectRatio="xMidYMid slice" clipPath={`url(#cf-${a.id})`} />
            </Fragment>}
            {a.status === "Waiting" && !isSel && (() => { const waiting = AGENTS.filter((b: Agent) => b.floor === a.floor && b.status === "Waiting"); const waitN = waiting.length; const wi = Math.max(0, waiting.findIndex((b: Agent) => b.id === a.id)); const useName = waitN >= 2; const maxT = waitN >= 3 ? 16 : waitN >= 2 ? 20 : 34; const raw = useName ? a.name : a.task; const t = raw.length > maxT ? raw.slice(0, maxT - 1) + "…" : raw; const age = ageStr(a); const old = ageMs(a) > STALE_MS; const bf = old ? "#FEF3C7" : "#FFFBEB"; const w = Math.min(148, (t.length + age.length + 3) * 5.5 + 26); const fanX = waitN >= 2 ? (wi - (waitN - 1) / 2) * 48 : 0; const by = -72 - wi * 30; const ox = Math.max(w / 2 + 8, Math.min(VBW - w / 2 - 8, p[0] + fanX)) - p[0]; const tx = Math.max(-w / 2 + 14, Math.min(w / 2 - 14, -ox)); return <g className={"wbub" + (old ? " old" : "")}><title>{bubTitle(a)}</title><rect x={ox - w / 2} y={by} width={w} height={24} rx={12} fill={bf} stroke="#F59E0B" strokeWidth={1.5} strokeDasharray={old ? "4 3" : undefined} /><polygon points={`${ox + tx - 6},${by + 23.5} ${ox + tx + 6},${by + 23.5} 0,${by + 31}`} fill={bf} stroke="#F59E0B" strokeWidth={1.5} /><rect x={ox + tx - 7} y={by + 22} width={14} height={3} fill={bf} /><circle cx={ox - w / 2 + 11} cy={by + 12} r={4} fill="#F59E0B" /><text x={ox - w / 2 + 20} y={by + 16} fontSize={10.5} fontWeight={600} fill="#3F3F46">{t}<tspan dx={4} fill={old ? "#B45309" : "#A16207"} fontWeight={700}>· {age}</tspan></text></g>; })()}
          </g>
        </g>
      </g>
    );
    {
      const lab = `${a.name} · ${a.status}`; const seatN = AGENTS.filter((b: Agent) => b.floor === a.floor).length; const lim = seatN >= 5 ? 12 : seatN >= 4 ? 14 : 18; let disp = a.name; if (disp.length > lim) { const dot = disp.indexOf(" · "); const core = dot >= 3 ? disp.slice(0, dot) : disp; const cut = core.slice(0, Math.max(4, lim - 1)); const sp = Math.max(cut.lastIndexOf(" · "), cut.lastIndexOf(" ")); disp = (sp >= 3 ? core.slice(0, sp) : cut) + "…"; }
      const w = Math.min(180, Math.max(84, disp.length * 8.2 + 40)); const ov = i >= 5;
      const cx = p[0] + (ov ? 18 : 0); const y = ground[1] + 14 + (i % 2) * 14 + (ov ? 28 : 0);
      const plate = <g key={"np" + a.id} className="np" data-id={a.id} role="button" tabIndex={0} onFocus={() => setKf(a.id)} onBlur={() => setKf(null)} onKeyDown={(e: any) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); focus(a); } }} aria-label={lab} style={{ cursor: "pointer" }} onClick={() => focus(a)} opacity={muted ? 0.92 : 1}><title>{lab}</title><rect className="fr" x={cx - w / 2 - 3} y={y - 12} width={w + 6} height={24} rx={12} fill="none" stroke="#2563EB" strokeWidth={2} /><rect x={cx - w / 2} y={y - 9} width={w} height={18} rx={9} fill="rgba(255,255,255,.88)" stroke={isSel ? "#3F3F46" : "rgba(0,0,0,.08)"} strokeWidth={isSel ? 1.5 : 1} /><circle cx={cx - w / 2 + 9} cy={y} r={3} fill={ST[a.status]} /><text x={cx + 5} y={y + 3.5} textAnchor="middle" fontSize={10.5} fontWeight={600} fill="#3F3F46">{disp}</text></g>;
      if (isSel) selPlate = plate; else plates.push(plate);
    }
  });
  plates.forEach((pl: any) => scene.push(pl)); if (selPlate) scene.push(selPlate);
  // glass elevator (right)
  const eTop = pt(12.4, 6.2, 4.3);
  scene.push(box("eplat", 12.1, 5.5, -0.25, 1.6, 2.2, 0.25, "#E4E4E7", "#C9CACE", "#D4D5D9"));
  [[12.2, 5.6], [13.6, 5.6], [12.2, 7.6], [13.6, 7.6]].forEach((c: number[], i: number) => scene.push(<polyline key={"epost" + i} points={ps([[c[0], c[1], -2.6], [c[0], c[1], 4.5]])} stroke="#A1A1AA" strokeWidth={3} strokeLinecap="round" fill="none" />));
  scene.push(<polygon key="ecap" points={ps([[12.2, 5.6, 4.5], [13.6, 5.6, 4.5], [13.6, 7.6, 4.5], [12.2, 7.6, 4.5]])} fill="#D4D4D8" stroke="#A1A1AA" strokeWidth={1.5} strokeLinejoin="round" />);
  const ep = pt(12.0, 5.35, 1.3); scene.push(<g key="epanel"><rect x={ep[0] - 7} y={ep[1] - 14} width={14} height={24} rx={4} fill="#3F3F46" /><circle cx={ep[0]} cy={ep[1] - 6} r={2.6} fill="#A3E635" /><circle cx={ep[0]} cy={ep[1] + 3} r={2.6} fill="#71717A" /></g>);
  scene.push(<g key="elev"><polygon points={ps([[12.2, 5.6, -2.6], [12.2, 7.6, -2.6], [12.2, 7.6, 4.4], [12.2, 5.6, 4.4]])} fill="#BFDBFE" opacity={0.35} stroke="#94A3B8" strokeWidth={1.5} />
    <polygon points={ps([[12.2, 7.6, -2.6], [13.6, 7.6, -2.6], [13.6, 7.6, 4.4], [12.2, 7.6, 4.4]])} fill="#BFDBFE" opacity={0.28} stroke="#94A3B8" strokeWidth={1.5} />
    <g key={"cab" + tick} className={tick > 0 ? "cabgo" : "cab"}><g className="cab">{box("cabb", 12.35, 5.8, 0, 1.1, 1.6, 1.5, "#E5E7EB", "#CBD5E1", "#D7DEE7", 0.9)}<polyline points={ps([[12.35, 6.6, 0.05], [12.35, 6.6, 1.45]])} stroke="#94A3B8" strokeWidth={1.5} fill="none" /><polygon points={ps([[12.35, 5.85, 1.2], [12.35, 7.35, 1.2], [12.35, 7.35, 1.4], [12.35, 5.85, 1.4]])} fill="#FFFFFF" opacity={0.5} /></g></g>
    <g transform={`translate(${eTop[0]},${eTop[1] - 14})`}><rect x={-16} y={-10} width={32} height={18} rx={9} fill="#27272A" /><text textAnchor="middle" y={3} fontSize={11} fontWeight={700} fill="#FAFAFA">{fl.level}</text></g></g>);
  // speech bubble
  if (agent && agent.floor === floor) {
    const s = seatOf(agent); const p = pt(s[0], s[1] - 0.55, 1.05); const txt = agent.task.length > 38 ? agent.task.slice(0, 37) + "…" : agent.task; const age = ageStr(agent); const old = ageMs(agent) > STALE_MS; const w = (txt.length + age.length + 3) * 5.6 + 18; const bx = Math.max(w / 2 + 8, Math.min(VBW - w / 2 - 8, p[0]));
    scene.push(<g key="bub"><title>{bubTitle(agent)}</title><rect x={bx - w / 2} y={p[1] - 72} width={w} height={26} rx={13} style={{ fill: "var(--hq-glass)", stroke: "var(--hq-glass-border)" }} /><polygon points={(() => { const tx = Math.max(-w / 2 + 14, Math.min(w / 2 - 14, p[0] - bx)); return `${bx + tx - 6},${p[1] - 47} ${bx + tx + 6},${p[1] - 47} ${p[0]},${p[1] - 39}`; })()} style={{ fill: "var(--hq-glass)" }} /><text x={bx} y={p[1] - 55} textAnchor="middle" fontSize={10} style={{ fill: "var(--hq-ink)" }}>{txt}<tspan dx={4} fontWeight={700} style={old ? { fill: "#B45309" } : { fill: "var(--hq-ink)", opacity: 0.6 }}>· {age}</tspan></text></g>);
  }

  // ---------- Right panel ----------
  let right: ReactNode;
  if (nav !== "none") {
    const title: Record<Nav, string> = { none: "", hq: "Headquarters", all: "All agents", waiting: "Waiting & alerts", usage: "Usage", settings: "Settings" };
    let body: ReactNode = null;
    if (nav === "hq") body = <Fragment><div className="mut">Personal AI OS · {FLOORS.length} floors · {AGENTS.length} seats · Roster as of {FLOOR_STAMP}</div><div className="row"><span>Floor truth</span><span style={{ fontWeight: 600 }}>12 Working · 9 Waiting · 3 Closed + Credit Pending</span></div><div className="row"><span>Board chips</span><span className="mut">Working {cnt("Working")} · Waiting {cnt("Waiting")} · Closed 3 (Floor truth · {cnt("Closed")} card on board, Research ×2 off board) · Credit Pending</span></div><div className="mut" style={{ marginTop: 8 }}>Credit Pending · not hired · not in Working/Waiting/Closed counts.</div><div className="row"><span>Security</span><span className="mut">Not monitored · snapshot {FLOOR_STAMP}</span></div><div className="mut" style={{ marginTop: 8 }}>Source of truth: this HQ roster restamp ({FLOOR_STAMP}). The separate Floor page was not restamped (still Nov 5). Manual stamp only. Task creation, messaging, and live polling · Not available in dashboard.</div></Fragment>;
    if (nav === "all") body = <Fragment><div className="mut">Roster as of {FLOOR_STAMP} · not polled</div>{AGENTS.map(agentRow)}</Fragment>;
    if (nav === "waiting") body = <Fragment><div className="h">Waiting · {cnt("Waiting")} <span className="mut" style={{ fontSize: 11 }}>· oldest first</span></div>{waitingOldest().map((a: Agent) => <div key={a.id} className={witCls(a)}><button className="btn" style={{ alignSelf: "flex-start" }} title={a.name} aria-label={`Focus ${a.name} · ${a.status}`} onClick={() => focus(a)}><span className="dot" style={{ background: a.color, marginRight: 6 }} />{a.name}</button><span className="wt" title={a.task}>{a.task}</span><span className="wa">Last report {a.asOf} {ageOf(a)}</span>{waitOpen(a)}</div>)}<div className="h" style={{ marginTop: 12 }}>Holds · {HOLDS.length}</div>{HOLDS.map((x: [string, string]) => <div key={x[0]} className="item"><b style={{ fontSize: 13 }}>{x[0]}</b><span className="mut">{x[1]}</span></div>)}<div className="mut" style={{ marginTop: 8 }}>Historical Floor error report: none. Security is not monitored.</div></Fragment>;
    if (nav === "usage") body = <Fragment><div className="row"><span>Plan</span><span>Super</span></div><div className="row"><span>Weekly allowance used (plan-level · shared across apps on plan)</span><span style={{ whiteSpace: "nowrap" }}>{USAGE_PCT}%</span></div><div className="track"><div style={{ width: USAGE_PCT + "%", height: 8, background: "#A3E635", borderRadius: 8 }} /></div><div className="row"><span>Remaining</span><span style={{ whiteSpace: "nowrap" }}>{String(100 - Number(USAGE_PCT))}%</span></div><div className="row"><span>Resets</span><span style={{ whiteSpace: "nowrap" }}>Sun Nov 15 · 7:40 PM CT</span></div><div className="row"><span>Per-agent usage / trends</span><span className="mut">Unavailable · Not available in dashboard</span></div><div className="mut">As of {USAGE_ASOF} · stamped from CheckSubscriptionUsage · not live-polled · plan-level Super weekly allowance, not Grok-Bot-only.</div></Fragment>;
    if (nav === "settings") body = <Fragment><div className="row"><span>Time-of-day lighting ({tod})</span><button className="btn" aria-pressed={light} aria-label={`Time-of-day lighting ${light ? "on" : "off"}`} onClick={() => setLight(!light)}>{light ? "On" : "Off"}</button></div><div className="row"><span>Sound (beeps)</span><button className="btn" aria-pressed={sound} aria-label={`Sound ${sound ? "on" : "muted"}`} onClick={() => { setSound(!sound); }}>{sound ? "On" : "Muted"}</button></div><div className="mut" style={{ marginTop: 8 }}>Applies to this tab only · not saved · sound is off by default.</div></Fragment>;
    right = <div className="glass"><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><b>{title[nav]}</b><button className="btn" onClick={() => setNav("none")}>Close</button></div><div style={{ marginTop: 8 }}>{body}</div></div>;
  } else if (agent) {
    const af = FLOORS.find((f: Floor) => f.id === agent.floor);
    right = <div className="glass ins">
      {viewMode === "floors" && agent.floor === floor && <button type="button" className="btn insback" aria-label={`Back to ${fl.level} · ${fl.name} floor overview`} onClick={reset}>← Back to {fl.level} · {fl.name}</button>}
      <div className="insh"><span className="av" style={{ background: agent.color, padding: 1.5, overflow: "hidden" }}><img src={CLAY_FACE[agent.status]} alt="" width={31} height={31} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }} /></span><div style={{ minWidth: 0, flex: 1 }}><div className="nm">{agent.name}</div><div className="mut" style={{ fontSize: 11.5 }}>{agent.role}</div></div><span className="stp" style={{ alignSelf: "center" }}><span className="dot" style={{ background: SC[agent.status] }} />{agent.status}</span></div>
      <div><div className="h">Task at last verified snapshot</div><div className="mut" style={{ fontSize: 11.5, marginBottom: 4 }}>As of {FLOOR_STAMP}, 2026 (America/New_York) · not live · snapshot age is relative to this stamp only · Manual sync disabled</div><div className="task">{agent.task}</div></div>
      <div className="kv"><span>Floor</span><span>{af ? af.level + " · " + af.name : ""}</span><span>Last report</span><span>{agent.asOf}</span><span>Freshness</span><span>{fresh(agent)}</span>{agent.status === "Waiting" && (() => { const wl = waitingOldest(); const qi = wl.findIndex((x: Agent) => x.id === agent.id); if (qi < 0) return null; const tied = waitingTiedByReport(agent, wl, FLOOR_STAMP_MS); return <Fragment><span>Waiting order</span><span>{qi + 1} of {wl.length} · oldest first{tied ? " · tied · A–Z" : ""}</span></Fragment>; })()}</div>
      <div className="acts">{agent.chat ? <a className="cta pri" href={`grokbot://app/v1/agent?id=${agent.chat}`} target="_top" aria-label={`Open chat with ${agent.name} in Grok Bot`}>Open chat with {agent.name} →</a> : <span className="mut">Open chat unavailable (seat closed)</span>}{agent.status === "Waiting" && cnt("Waiting") > 1 && (() => { const wl = waitingOldest(); const n = wl[(wl.findIndex((x: Agent) => x.id === agent.id) + 1) % wl.length]; return <button className="cta" aria-label={`Focus next waiting · ${n.name} · ${n.status}`} title="Next waiting (N)" aria-keyshortcuts="n" onClick={() => focus(n)}>Next waiting →</button>; })()}<button className="cta" aria-label={`View ${agent.name} on the floor`} onClick={() => { setViewMode("floors"); focus(agent); }}>View on Floor →</button><a className="cta" href="https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/57ec2643-4823-4357-9d6d-048441701b31" target="_top" aria-label="Open the Floor page">Floor page →</a><span className="khint" title="Skip: first nameplate on this floor · Tab: move between nameplates · Enter/Space: focus agent · N or ]: next waiting · P or [: previous waiting · Esc: close Limits → clear selection (focus returns to plate) → close view">Skip · Tab plates · Enter focus · N/P waiting · Esc back</span></div>
      {agent.chat ? <div className="mut" style={{ fontSize: 10.5, marginTop: -2 }}>Opens in the Grok Bot app. A regular browser can't open this link.</div> : null}
      <div className="note">Status from HQ roster snapshot, not polled. Per-agent usage unavailable. Stale or unknown is not offline.</div></div>;
  } else {
    right = <div className="glass"><div className="h">Floor panel</div><b style={{ fontSize: 16 }}>{fl.level} · {fl.name}</b><img className="clayflr" src={clayThumbFor(floor)} alt={`${fl.level} · ${fl.name} · soft-clay roomy-gold lean`} style={{ objectPosition: floor === "ground" ? "70% 75%" : "50% 45%" }} /><div className="mut">{onFloor.length} seats · {onFloor.filter((a: Agent) => a.status === "Working").length} working · {onFloor.filter((a: Agent) => a.status === "Waiting").length} waiting</div><div className="pick"><span aria-hidden="true">◎</span><span>No agent selected — pick one in the room or below to see their card.</span></div><div style={{ marginTop: 4 }}>{onFloor.map(agentRow)}</div><div className="h" style={{ marginTop: 10 }}>Connectors</div><div className="chips">{(FLOOR_CONN[floor] ?? []).map((c: string) => <span key={c} className="pill">{c}</span>)}</div></div>;
  }

  const acc = (k: string, label: string, badge: ReactNode, body: ReactNode): ReactNode => (
    <div key={k} className="lsec"><button className="btn ab" aria-expanded={!!open[k]} onClick={() => toggle(k)}><span>{open[k] ? "▾" : "▸"} {label}</span>{badge}</button>{open[k] && <div style={{ padding: "4px 0 0" }}>{body}</div>}</div>
  );
  const navs: [Nav, string][] = [["hq", "Headquarters"], ["all", "All agents"], ["waiting", "Waiting & alerts"], ["usage", "Usage"], ["settings", "Settings"]];
  const views: [ViewMode, string][] = [["people", "People"], ["floors", "Floors"], ["activity", "Activity"], ["org", "Organization"]];
  const byName = (s: St): Agent[] => AGENTS.filter((a: Agent) => a.status === s).slice().sort((x: Agent, y: Agent) => x.name.localeCompare(y.name));
  const ql = q.trim().toLowerCase();
  const people: Agent[] = [...waitingOldest(), ...byName("Working"), ...byName("Pending"), ...byName("Closed")].filter((a: Agent) => (pFilter === "all" || a.status === pFilter) && (!ql || a.name.toLowerCase().includes(ql) || a.role.toLowerCase().includes(ql)));
  const pick = (a: Agent): void => { focus(a); };
  const card = (a: Agent): ReactNode => { const w = a.status === "Waiting"; const old = !!a.last && ageMs(a) > STALE_MS; const af = FLOORS.find((f: Floor) => f.id === a.floor); return <button key={a.id} className={"pc" + (w ? " w" : "") + (a.status === "Closed" ? " c" : "") + (a.status === "Working" ? " wk" : "") + (a.status === "Pending" ? " p" : "") + (sel === a.id ? " on" : "")} aria-label={`${a.name} · ${a.status} · ${a.task}`} onClick={() => pick(a)}><span className="av" style={{ background: a.color, padding: 1.5, overflow: "hidden" }}><img src={CLAY_FACE[a.status]} alt="" width={30} height={30} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", borderRadius: 9 }} /></span><span className="pmn"><span className="pn">{a.name} <span className="pr">· {a.role}{af ? " · " + af.name : ""}</span></span><span className="ptk" title={a.task}>{a.task}</span></span><span className="psd"><span className="chip"><span className="dot" style={{ background: SC[a.status] }} />{a.status}</span>{w && <span className="nyou">Waiting</span>}<span className={"pup" + (old ? " old" : "")} title={`Last report ${a.asOf}`}>{a.asOf && a.asOf !== "Unknown" ? `Last report ${a.asOf}` : "Last report unknown"}</span></span></button>; };
  const grp = (label: string, list: Agent[]): ReactNode => list.length === 0 ? null : <Fragment key={label}><div className="pgrp">{label} · {list.length}</div>{list.map(card)}</Fragment>;
  const orgChildren = (id: string): Agent[] => AGENTS.filter((a: Agent) => ORG_PARENT[a.id] === id && a.status !== "Closed" && a.status !== "Pending");
  const orgMatches = (a: Agent): boolean => orgFilter === "all" || a.status === orgFilter;
  const orgVisible = (a: Agent): boolean => orgMatches(a) || orgChildren(a.id).some((c: Agent) => orgVisible(c));
  // Org path/highlights share inspector `sel` only — no remembered orgSelected history.
  const orgActive = sel && AGENTS.some((a: Agent) => a.id === sel) ? sel : null;
  const orgPath: string[] = [];
  let orgCursor: string | null = orgActive;
  while (orgCursor && orgPath.length < 20) { orgPath.unshift(orgCursor); orgCursor = ORG_PARENT[orgCursor] ?? null; }
  const orgLabel = (id: string): string => id === "owner" ? "Tishan" : (AGENTS.find((a: Agent) => a.id === id)?.name ?? id);
  const orgPick = (a: Agent): void => { setSel(a.id); setNav("none"); };
  const orgNode = (a: Agent, context: boolean = false): ReactNode => <button type="button" className={"pc" + (a.status === "Working" ? " wk" : a.status === "Waiting" ? " w" : a.status === "Pending" ? " p" : " c") + (orgActive === a.id ? " on" : "")} aria-pressed={orgActive === a.id} aria-label={`${a.name} · ${a.status === "Pending" ? a.task : a.status} · open inspector${context ? " · ancestor context" : ""}`} onClick={() => orgPick(a)} style={{ width: "100%", outline: orgPath.includes(a.id) ? "2px solid #FAFAFA" : undefined, outlineOffset: -2 }}><span className="av" style={{ background: a.color, padding: 1.5, overflow: "hidden" }}><img src={CLAY_FACE[a.status]} alt="" width={30} height={30} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", borderRadius: 9 }} /></span><span className="pmn"><span className="pn">{a.name}</span><span className="ptk">{a.status === "Pending" ? a.task : a.role}{context ? " · ancestor context (outside filter)" : ""}</span></span><span className="psd"><span className="chip">{a.status === "Pending" ? "Credit Pending" : a.status}</span></span></button>;
  // Deterministic top-down ranks: Owner 0, Amanda 1, direct reports 2,
  // department reports 3. Subtree widths, not inherited flex, set x positions.
  const orgKids = (id: string): Agent[] => orgCollapsed.includes(id) ? [] : orgChildren(id).filter((a: Agent) => orgVisible(a));
  const orgSpan = (id: string): number => Math.max(1, orgKids(id).reduce((n: number, a: Agent) => n + orgSpan(a.id), 0));
  const orgWidth = Math.max(480, orgSpan("amanda") * 252 + 48);
  const orgPositions: { id: string; x: number; y: number; depth: number; parent: string | null }[] = [{ id: "owner", x: orgWidth / 2 - 108, y: 24, depth: 0, parent: null }];
  const orgPlace = (a: Agent, left: number, depth: number, parent: string): void => {
    const span = orgSpan(a.id) * 252;
    orgPositions.push({ id: a.id, x: left + span / 2 - 108, y: 24 + depth * 196, depth, parent });
    let next = left;
    orgKids(a.id).forEach((c: Agent) => { orgPlace(c, next, depth + 1, a.id); next += orgSpan(c.id) * 252; });
  };
  const orgAmanda = AGENTS.find((a: Agent) => a.id === "amanda");
  if (orgAmanda && orgVisible(orgAmanda)) orgPlace(orgAmanda, (orgWidth - orgSpan("amanda") * 252) / 2, 1, "owner");
  const orgHeight = 24 + (Math.max(...orgPositions.map((p: { depth: number }) => p.depth)) + 1) * 196;
  const orgChart = (): ReactNode => <Fragment><p className="mut">Top-down chart · Owner → Org lead → direct reports → department reports. Scroll horizontally for all branches and vertically for lower ranks. Cards stay full-size; no tiny fit-to-screen text.</p><div className="orgscroll" ref={orgScrollRef} tabIndex={0} role="region" aria-label="Scrollable top-down organization chart; scroll horizontally and vertically" style={{ backgroundColor: "#121215", color: "#FAFAFA", WebkitTextFillColor: "#FAFAFA" }}><div className="orgcanvas" style={{ width: orgWidth, height: orgHeight, backgroundColor: "#121215", color: "#FAFAFA", WebkitTextFillColor: "#FAFAFA" }}><svg className="orglines" width={orgWidth} height={orgHeight} viewBox={`0 0 ${orgWidth} ${orgHeight}`} aria-hidden="true"><rect x={0} y={0} width={orgWidth} height={orgHeight} fill="#121215" /><g fill="none" strokeWidth={2}>{orgPositions.filter((p: { parent: string | null }) => p.parent !== null).map((p: { id: string; x: number; y: number; parent: string | null }) => { const par = orgPositions.find((q: { id: string }) => q.id === p.parent); if (!par) return null; const sx = par.x + 108, sy = par.y + 156, tx = p.x + 108, ty = p.y; const mid = sy + 20; return <path key={p.id} d={`M ${sx} ${sy} V ${mid} H ${tx} V ${ty}`} stroke={orgPath.includes(p.id) ? "#FDE68A" : "#D4D4D8"} strokeWidth={orgPath.includes(p.id) ? 3 : 2} />; })}</g></svg>{orgPositions.map((p: { id: string; x: number; y: number; depth: number }) => { const a = AGENTS.find((q: Agent) => q.id === p.id); const kids = a ? orgChildren(a.id).filter((c: Agent) => orgVisible(c)) : []; const collapsed = a ? orgCollapsed.includes(a.id) : false; return <div key={p.id} className="orgseat" style={{ left: p.x, top: p.y, backgroundColor: "#18181B", color: "#FAFAFA", WebkitTextFillColor: "#FAFAFA", border: "1px solid #71717A" }} role="group" aria-label={`${orgLabel(p.id)} · chart level ${p.depth + 1}`}><div className="orgevidence" style={{ color: "#FAFAFA", WebkitTextFillColor: "#FAFAFA" }}>Level {p.depth + 1} · {p.id === "owner" ? "Owner" : p.id === "amanda" ? "Org lead / COO for Tishan" : `Reports to ${orgLabel(ORG_PARENT[p.id])}`}</div>{a ? orgNode(a, !orgMatches(a)) : <div className="orgowner" style={{ backgroundColor: "#18181B", color: "#FAFAFA", WebkitTextFillColor: "#FAFAFA" }}><b style={{ color: "#FAFAFA", WebkitTextFillColor: "#FAFAFA" }}>Tishan</b><span style={{ color: "#FAFAFA", WebkitTextFillColor: "#FAFAFA" }}>Owner · informational root</span></div>}{a && <div className="orgevidence" style={{ color: "#FAFAFA", WebkitTextFillColor: "#FAFAFA" }}>{a.id === "inv" ? "Floor-confirmed reporting line" : "Role-confirmed reporting line"}</div>}{kids.length > 0 && a && <button type="button" className="btn orgtoggle" aria-expanded={!collapsed} aria-label={`${collapsed ? "Expand" : "Collapse"} reports under ${a.name}`} onClick={() => setOrgCollapsed(collapsed ? orgCollapsed.filter((id: string) => id !== a.id) : [...orgCollapsed, a.id])}>{collapsed ? "▸ Expand" : "▾ Collapse"} {kids.length} reports</button>}</div>; })}</div></div></Fragment>;
  const orgRoot = AGENTS.find((a: Agent) => a.id === "amanda");
  const orgPending = AGENTS.find((a: Agent) => a.id === "credit");
  // Simple top-down Organization view (owner-approved mock, UI edit Nov 8 2026). Group headings are floor groupings only, not reporting levels.
  const ORG_GROUPS: [string, string][] = [["finance", "Finance"], ["yt", "YouTube Studio"], ["ai", "AI Operations"], ["ground", "Ground Floor"], ["linkedin", "LinkedIn"]];
  const orgDirect = orgChildren("amanda");
  const orgGroups = ORG_GROUPS.map((g: [string, string]) => ({ f: g[0], label: g[1], m: orgDirect.filter((a: Agent) => a.floor === g[0]) })).filter((g: { m: Agent[] }) => g.m.length > 0);
  const orgOther = orgDirect.filter((a: Agent) => !ORG_GROUPS.some((g: [string, string]) => g[0] === a.floor));
  const ocard = (a: Agent, cls: string, sub?: string): ReactNode => { const lead = orgChildren(a.id).length > 0; const line = sub ?? (a.role + (lead ? " · team lead" : "")); return <button type="button" key={a.id} className={"ocard " + cls + (lead ? " lead" : "")} aria-pressed={sel === a.id} aria-label={`${a.name} · ${line} · open details`} onClick={() => orgPick(a)}><b>{a.name}</b><span>{line}</span></button>; };
  const otree = (a: Agent, depth: number): ReactNode => <li key={a.id}>{ocard(a, depth > 0 ? "sub" : "")}{orgChildren(a.id).length > 0 && <ul className="olist" aria-label={`Reports to ${a.name}`}>{orgChildren(a.id).map((c: Agent) => otree(c, depth + 1))}</ul>}</li>;
  const ORG_CSS = `.orgv{background:#F7F2EA!important;border-color:#E3D8C6!important;color:#2A2520!important;padding:18px 20px!important}.orgv *{-webkit-text-fill-color:currentColor}.orgv .oh{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:6px 12px}.orgv .oh h2{margin:0;font-size:20px;line-height:1.25;color:#2A2520}.orgv .osub{font-size:13px;color:#5F564C;margin-top:2px}.orgv .otop{display:flex;flex-direction:column;align-items:center;margin-top:16px}.orgv .olead{display:block;min-width:220px;max-width:100%;box-sizing:border-box;background:#FFFDF9;border:2px solid #B7862F;border-radius:12px;padding:10px 18px;text-align:center;color:#2A2520;font:inherit}.orgv button.olead{cursor:pointer}.orgv .olead b{display:block;font-size:17px}.orgv .olead span{display:block;font-size:12.5px;color:#5F564C;margin-top:3px}.orgv .ovl{width:2px;height:18px;background:#CDBFA9}.orgv .ogrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:18px 16px;border-top:2px solid #CDBFA9;padding-top:16px}.orgv .ogh{background:#EFE5D5;border-radius:10px;padding:8px 12px;font-weight:700;font-size:14px;color:#2A2520}.orgv .olist{list-style:none;margin:6px 0 0 10px;padding:0 0 0 12px;border-left:2px solid #CDBFA9}.orgv .olist li{position:relative;margin:8px 0}.orgv .olist li::before{content:"";position:absolute;left:-12px;top:22px;width:12px;height:2px;background:#CDBFA9}.orgv .olist .olist{margin-left:14px}.orgv .ocard{display:block;width:100%;box-sizing:border-box;text-align:left;background:#FFFDF9;border:1px solid #E3D8C6;border-left:4px solid #D9CCB8;border-radius:10px;padding:8px 10px;cursor:pointer;color:#2A2520;font:inherit;transition:background .15s ease}.orgv .ocard.lead{border-left-color:#B7862F}.orgv .ocard.sub{background:#FBF8F3}.orgv .ocard:hover,.orgv .olead:hover{background:#FFF6E6}.orgv .ocard[aria-pressed="true"],.orgv .olead[aria-pressed="true"]{outline:2px solid #B7862F;outline-offset:1px;background:#FFF1D6}.orgv .ocard:focus-visible,.orgv .olead:focus-visible{outline:3px solid #2563EB;outline-offset:2px}.orgv .ocard b{display:block;font-size:14px;line-height:1.3;overflow-wrap:anywhere}.orgv .ocard span{display:block;font-size:12px;line-height:1.35;color:#5F564C;margin-top:2px;overflow-wrap:anywhere}.orgv .oout{margin-top:22px}.orgv .ooh{font-size:12px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:#5F564C}.orgv .orow{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px}.orgv .ocard.out{flex:1 1 240px;width:auto;background:#F1ECE4;border-left-color:#A89A86}.orgv .onote{font-size:11.5px;line-height:1.45;color:#6B6157;margin-top:14px}`;

  // ===== Modern floors view (rebuild candidate, Nov 8 2026). Room art = placeholder drawing until production empty-room renders exist; ROOM_ART slot below. =====
  const ROOM_ART: Record<string, string> = {
    exec: `data:removed;note=base64-image-45KB-stripped`
      + "" /* RA_exec_04 */
      + "" /* RA_exec_05 */
      + "" /* RA_exec_06 */,
    finance: `data:removed;note=base64-image-56KB-stripped`
      + "" /* RA_finance_05 */
      + "" /* RA_finance_06 */
      + "" /* RA_finance_07 */
      + "" /* RA_finance_08 */,
    yt: `data:removed;note=base64-image-53KB-stripped`
      + "" /* RA_yt_05 */
      + "" /* RA_yt_06 */
      + "" /* RA_yt_07 */
      + "" /* RA_yt_08 */,
    ai: `data:removed;note=base64-image-56KB-stripped`
      + "" /* RA_ai_05 */
      + "" /* RA_ai_06 */
      + "" /* RA_ai_07 */
      + "" /* RA_ai_08 */,
    ground: `data:removed;note=base64-image-54KB-stripped`
      + "" /* RA_ground_05 */
      + "" /* RA_ground_06 */
      + "" /* RA_ground_07 */
      + "" /* RA_ground_08 */,
    linkedin: `data:removed;note=base64-image-52KB-stripped`
      + "" /* RA_linkedin_05 */
      + "" /* RA_linkedin_06 */
      + "" /* RA_linkedin_07 */,
  };
  const FX_PURPOSE: Record<string, string> = { exec: "Leadership and coordination", finance: "Portfolio, trading research and credit · paper count active, live trading off", yt: "Channel strategy, audience analysis and scripts", ai: "Systems, design, QA and avatar production", ground: "Mail, messages, storage and time", linkedin: "LinkedIn growth and career acquisition" };
  const FX_SLOTS: Record<number, number[][]> = { 1: [[500, 400]], 2: [[380, 330], [620, 330]], 3: [[380, 310], [620, 310], [500, 430]], 4: [[380, 300], [620, 300], [300, 420], [700, 420]], 5: [[360, 290], [640, 290], [245, 435], [500, 435], [760, 435]] };
  const FX_ART_SLOTS: Record<string, Record<string, number[]>> = {
    exec: { amanda: [380.6, 325.6, 100.0, 125.0], cos: [602.5, 419.4, 106.2, 193.8] },
    finance: { inv: [283.8, 435.0, 106.2, 168.8], credit: [308.8, 325.6, 100.0, 137.5], goldtemp: [452.5, 372.5, 68.8, 125.0], hot: [533.8, 453.8, 75.0, 131.2], pbt: [690.0, 325.6, 106.2, 137.5] },
    yt: { chiefyt: [296.2, 344.4, 106.2, 143.8], ytan: [702.5, 338.1, 112.5, 150.0], script: [468.1, 391.2, 75.0, 162.5] },
    ai: { rio: [546.2, 419.4, 106.2, 150.0], lex: [308.8, 338.1, 106.2, 143.8], ostester: [486.9, 322.5, 81.2, 156.2], clay: [702.5, 325.6, 106.2, 137.5] },
    ground: { mailroom: [308.8, 350.6, 106.2, 143.8], gmail: [402.5, 313.1, 100.0, 131.2], wa: [490.0, 278.8, 93.8, 118.8], storage: [596.2, 328.8, 93.8, 143.8], time: [702.5, 344.4, 106.2, 137.5] },
    linkedin: { lidir: [499.4, 269.4, 106.2, 125.0], liprof: [277.5, 419.4, 125.0, 175.0], licontent: [465.0, 447.5, 81.2, 162.5], licareer: [702.5, 325.6, 106.2, 131.2] },
  };
  const FX_DOT: Record<string, string> = { Working: "#5E8C4F", Waiting: "#C98A1B", Pending: "#7C6BC4", Closed: "#8A8580" };
  const fxStatus = (s: St): string => s === "Pending" ? "Pending (not hired)" : s;
  const fxBoss = (a: Agent): string => { const p = ORG_PARENT[a.id]; if (!p) return "Not recorded"; if (p === "owner") return "Tishan"; const b = AGENTS.find((x: Agent) => x.id === p); return b ? b.name : "Not recorded"; };
  const ibox = (k: string, x: number, y: number, a: number, h: number, top: string, l: string, r: string): any => { const b = a / 2; return <g key={k}><polygon points={`${x - a},${y} ${x},${y + b} ${x},${y + b - h} ${x - a},${y - h}`} fill={l} /><polygon points={`${x},${y + b} ${x + a},${y} ${x + a},${y - h} ${x},${y + b - h}`} fill={r} /><polygon points={`${x},${y - b - h} ${x + a},${y - h} ${x},${y + b - h} ${x - a},${y - h}`} fill={top} /></g>; };
  const fxPlant = (k: string, x: number, y: number): any => <g key={k}>{ibox(k + "p", x, y, 14, 22, "#A39789", "#7D736A", "#8C8278")}<circle cx={x - 8} cy={y - 40} r={14} fill="#6F8F6A" /><circle cx={x + 8} cy={y - 46} r={13} fill="#7FA07A" /><circle cx={x} cy={y - 58} r={12} fill="#5F7F5A" /></g>;
  const wp = (t: number, dy: number): string => `${100 + 400 * t},${380 - 200 * t - dy}`;
  const rp = (t: number, dy: number): string => `${500 + 400 * t},${180 + 200 * t - dy}`;
  const fxProps = (id: string): any[] => {
    const o: any[] = [];
    const art = (k: string, kid: any) => <g key={k}><polygon points={`${rp(0.3, 60)} ${rp(0.62, 60)} ${rp(0.62, 140)} ${rp(0.3, 140)}`} fill="#F4EEE6" stroke="#3A2C22" strokeWidth={3} />{kid}</g>;
    if (id === "exec") { o.push(art("a", <text x={684} y={180} textAnchor="middle" fontSize={22} fontWeight={700} fill="#3A342E">HQ</text>)); o.push(<ellipse key="rug" cx={520} cy={500} rx={130} ry={50} fill="#CDBBA3" />); o.push(ibox("sofa", 520, 505, 70, 24, "#9DB098", "#6F8A6A", "#80997B")); }
    if (id === "finance") { o.push(art("a", <polyline points="640,168 660,160 676,176 696,154 716,174 732,166" fill="none" stroke="#5E8C4F" strokeWidth={4} />)); }
    if (id === "yt") { o.push(<g key="cam"><line x1={230} y1={450} x2={240} y2={390} stroke="#3A342E" strokeWidth={3} /><line x1={250} y1={450} x2={240} y2={390} stroke="#3A342E" strokeWidth={3} /><rect x={226} y={372} width={30} height={20} rx={4} fill="#2F2B28" /></g>); o.push(<g key="ring"><line x1={790} y1={440} x2={790} y2={350} stroke="#3A342E" strokeWidth={3} /><circle cx={790} cy={336} r={22} fill="none" stroke="#F2E3C4" strokeWidth={7} /></g>); o.push(art("a", <polygon points="674,158 674,186 698,172" fill="#C0392B" />)); }
    if (id === "ai") { o.push(<ellipse key="tbl" cx={500} cy={470} rx={80} ry={32} fill="#B9895E" stroke="#8A5F3C" strokeWidth={3} />); o.push(art("a", <g><circle cx={670} cy={166} r={14} fill="#9DB598" /><circle cx={700} cy={180} r={11} fill="#E2B979" /></g>)); }
    if (id === "ground") { o.push(ibox("shelf", 830, 360, 34, 110, "#B9895E", "#8A5F3C", "#9E6E47")); o.push(ibox("box1", 180, 420, 18, 20, "#E2C9A4", "#BFA27C", "#CFB28C")); o.push(ibox("box2", 205, 438, 16, 18, "#E2C9A4", "#BFA27C", "#CFB28C")); o.push(<g key="clk"><circle cx={460} cy={110} r={16} fill="#FFFDF9" stroke="#3A342E" strokeWidth={3} /><line x1={460} y1={110} x2={460} y2={100} stroke="#3A342E" strokeWidth={2} /><line x1={460} y1={110} x2={468} y2={113} stroke="#3A342E" strokeWidth={2} /></g>); }
    if (id !== "ground" && id !== "yt") o.push(fxPlant("pl2", 830, 400));
    o.push(fxPlant("pl1", 160, 400));
    return o;
  };
  const FX_CSS = `.fx{background:#F6F2EC;color:#2B2724;border-radius:20px;padding:20px;color-scheme:light;font-size:15px;container-type:inline-size;width:100%;max-width:100%;min-width:0}.fx svg,.fx svg *{forced-color-adjust:none}.fx *{box-sizing:border-box}.fxtop{display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;margin-bottom:16px}.fxbrand{font-weight:700;font-size:18px;margin-right:6px}.fxtabs{display:flex;flex-wrap:wrap;gap:6px}.fxtab{background:transparent;border:1px solid #DDD5CA;border-radius:10px;padding:8px 13px;font:inherit;font-size:14px;color:#3A342E;cursor:pointer}.fxtab:hover{background:#EFE8DE}.fxtab[aria-current="page"]{background:#2F2B28;color:#FAF7F2;border-color:#2F2B28}.fxnote{display:flex;flex-wrap:wrap;gap:6px;margin-left:auto}.fxpill{font:inherit;font-size:12px;padding:4px 10px;border-radius:999px;background:#EDE6DB;color:#4A433C;border:1px solid #DDD3C6}.fxpill:disabled{opacity:.75;cursor:not-allowed}.fxgrid{display:grid;grid-template-columns:210px minmax(0,1fr) 300px;gap:16px;align-items:start}.fxnav{background:#2F2B28;border-radius:16px;padding:12px;display:flex;flex-direction:column;gap:4px}.fxnav h4{margin:4px 6px 8px;font-size:11px;letter-spacing:.1em;color:#BDB3A6;text-transform:uppercase}.fxfl{display:flex;justify-content:space-between;gap:8px;width:100%;text-align:left;background:transparent;border:0;border-radius:10px;padding:11px 12px;color:#EDE7DF;font:inherit;font-size:15px;cursor:pointer}.fxfl:hover{background:rgba(255,255,255,.08)}.fxfl[aria-current="location"]{background:#6F8F6A;color:#fff;font-weight:600}.fxfl span:last-child{opacity:.8;font-size:12px}.fxfl:focus-visible,.fxtab:focus-visible,.fxr2:focus-visible,.fxbtn:focus-visible{outline:3px solid #2563EB;outline-offset:2px}.fxmain{min-width:0}.fxhead h2{margin:0;font-size:28px;color:#2B2724}.fxhead p{margin:4px 0 12px;color:#6B625A;font-size:15px}.fxscene{background:#FBF9F6;border:1px solid #E6DED3;border-radius:18px;overflow:hidden;position:relative}.fxscene svg{display:block;width:100%;height:auto}.fxtag{position:absolute;right:10px;bottom:8px;font-size:11px;color:#8A8178;background:rgba(255,253,249,.85);padding:2px 8px;border-radius:999px}.fxp{cursor:pointer;outline:none}.fxp:focus-visible .fxr{stroke:#2563EB;stroke-width:3;stroke-dasharray:5 4}.fxp:hover .fxr{stroke:#9DB598;stroke-width:2}.fxroster{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px;margin-top:12px}.fxr2{text-align:left;background:#FFFDF9;border:1px solid #E3DCD2;border-left:4px solid #D6CCBF;border-radius:10px;padding:8px 10px;font:inherit;color:#2B2724;cursor:pointer}.fxr2:hover{background:#F7F1E8}.fxr2[aria-pressed="true"]{border-left-color:#6F8F6A;background:#EEF3EC}.fxr2 b{display:block;font-size:15px}.fxr2 span{display:block;font-size:13px;color:#6B625A;margin-top:2px}.fxside{background:#FFFDF9;border:1px solid #E6DED3;border-radius:18px;padding:16px;color:#2B2724}.fxside h3{margin:8px 0 2px;font-size:22px}.fxmut{color:#6B625A;font-size:14px;line-height:1.5}.fxav{display:flex;justify-content:center;background:#F3EDE4;border-radius:14px;padding:12px}.fxkv{display:grid;grid-template-columns:auto 1fr;gap:7px 14px;font-size:14px;margin:14px 0}.fxkv span:nth-child(odd){color:#6B625A}.fxtask{background:#F3EDE4;border-radius:10px;padding:10px 12px;font-size:14px;line-height:1.45}.fxacts{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.fxbtn{display:inline-flex;align-items:center;justify-content:center;padding:9px 14px;border-radius:10px;font:inherit;font-size:14px;cursor:pointer;text-decoration:none;border:1px solid #D9D0C4;background:#fff;color:#2B2724}.fxbtn.pri{background:#6F8F6A;border-color:#6F8F6A;color:#fff}.fxst{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;padding:3px 10px;border-radius:999px;background:#F1ECE4;margin-top:6px}.fxdot{width:8px;height:8px;border-radius:50%;display:inline-block}@container (max-width:1100px){.fxgrid{grid-template-columns:minmax(0,1fr) 280px}.fxnav{grid-column:1/-1;flex-direction:row;flex-wrap:wrap}.fxnav h4{width:100%}.fxfl{width:auto}.fxnote{margin-left:0}}@container (max-width:760px){.fxgrid{grid-template-columns:minmax(0,1fr)}.fxside{grid-column:auto}}@media (max-width:760px){.fx{padding:12px}}`;
  // ===== People view (warm-D floor-grouped layout, Nov 8 2026). Real roster only. =====
  const [pv, setPv] = useState<string>("all");
  const [pq, setPq] = useState<string>("");
  const PV_CSS = `.pv{background:#F6F2EC;color:#2B2724;border-radius:20px;padding:20px;color-scheme:light;font-size:15px;container-type:inline-size;width:100%;max-width:100%;min-width:0}.pv *{box-sizing:border-box}.pvbar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:12px}.pvsearch{flex:1 1 220px;min-width:0;padding:9px 12px;border:1px solid #DDD5CA;border-radius:10px;background:#FFFDF9;font:inherit;font-size:14px;color:#2B2724}.pvsearch:focus-visible,.pvf:focus-visible,.pvrow:focus-visible,.fxbtn:focus-visible{outline:3px solid #2563EB;outline-offset:2px}.pvfs{display:flex;flex-wrap:wrap;gap:6px}.pvf{background:transparent;border:1px solid #DDD5CA;border-radius:999px;padding:6px 12px;font:inherit;font-size:13px;color:#3A342E;cursor:pointer}.pvf[aria-pressed="true"]{background:#6F8F6A;border-color:#6F8F6A;color:#fff}.pvgrid{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:16px;align-items:start}.pvlist{min-width:0}.pvh{margin:14px 0 6px;font-size:15px;font-weight:700;color:#2B2724}.pvh:first-child{margin-top:0}.pvh span{font-weight:400;color:#6B625A;font-size:13px;margin-left:6px}.pvrow{display:grid;grid-template-columns:44px minmax(0,1.1fr) minmax(0,1.6fr) auto;gap:12px;align-items:center;width:100%;text-align:left;background:#FFFDF9;border:1px solid #E6DED3;border-left:4px solid transparent;border-radius:12px;padding:8px 12px;margin-bottom:6px;font:inherit;color:#2B2724;cursor:pointer}.pvrow:hover{background:#F7F1E8}.pvrow[aria-pressed="true"]{background:#EEF3EC;border-left-color:#6F8F6A}.pvav{width:44px;height:44px;border-radius:50%;overflow:hidden;background:#F3EDE4}.pvav img{width:44px;height:68px;display:block;object-fit:cover;object-position:top}.pvnm b{display:block;font-size:15px}.pvnm span{display:block;font-size:13px;color:#6B625A}.pvtask{font-size:13.5px;color:#4A433C;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pvst{font-size:13px;font-weight:600;padding:4px 10px;border-radius:8px;white-space:nowrap}.pvside{background:#FFFDF9;border:1px solid #E6DED3;border-radius:18px;padding:16px}.pvside h3{margin:6px 0 2px;font-size:20px}.pvempty{color:#6B625A;font-size:14px;padding:12px}@container (max-width:900px){.pvgrid{grid-template-columns:minmax(0,1fr)}.pvrow{grid-template-columns:44px minmax(0,1fr) auto}.pvtask{grid-column:2/-1;white-space:normal}}`;
  const PV_ST: Record<string, [string, string]> = { Working: ["#E2EEDD", "#2F5E2A"], Waiting: ["#F8E6C4", "#7A4E06"], Pending: ["#ECE6F7", "#4B3B8A"], Closed: ["#ECEAE7", "#5A5550"] };
  const peopleView = (): any => {
    const tabs: [ViewMode, string][] = [["people", "People"], ["floors", "Floors"], ["activity", "Activity"], ["org", "Organization"]];
    const ql = pq.trim().toLowerCase();
    const match = (a: Agent): boolean => (pv === "all" || a.status === pv) && (!ql || (a.name + " " + a.role + " " + a.task).toLowerCase().includes(ql));
    const pa = AGENTS.find((a: Agent) => a.id === sel) ?? null;
    const pfl = pa ? FLOORS.find((f: Floor) => f.id === pa.floor) : null;
    const filters: string[] = ["all", "Working", "Waiting", "Pending", "Closed"];
    let shown = 0;
    const groups = FLOORS.map((f: Floor) => { const m = AGENTS.filter((a: Agent) => a.floor === f.id && match(a)); shown += m.length; return { f, m }; });
    const stChip = (s: St): any => <span className="pvst" style={{ background: PV_ST[s][0], color: PV_ST[s][1] }}>{s === "Pending" ? "Pending hire" : s}</span>;
    return (
      <div className="pv">
        <style>{FX_CSS}</style><style>{PV_CSS}</style>
        <div className="fxtop">
          <span className="fxbrand">HeadQuarters</span>
          <nav className="fxtabs" aria-label="Views">{tabs.map((t: [ViewMode, string]) => <button key={t[0]} className="fxtab" aria-current={viewMode === t[0] ? "page" : undefined} onClick={() => setViewMode(t[0])}>{t[1]}</button>)}</nav>
          <div className="fxnote"><span className="fxpill">Snapshot {FLOOR_STAMP} · not live</span><span className="fxpill">Security not monitored</span><span className="fxpill">Live trading off</span><button className="fxpill" disabled title="Manual sync is disabled">Sync · disabled</button></div>
        </div>
        <div className="pvbar">
          <input className="pvsearch" type="search" placeholder="Search people, roles or tasks" aria-label="Search people" value={pq} onChange={(e: any) => setPq(e.target.value)} />
          <div className="pvfs" role="group" aria-label="Filter by status">{filters.map((s: string) => <button key={s} className="pvf" aria-pressed={pv === s} onClick={() => setPv(s)}>{s === "all" ? "All" : s} <span style={{ opacity: 0.75 }}>{s === "all" ? AGENTS.length : AGENTS.filter((a: Agent) => a.status === s).length}</span></button>)}</div>
        </div>
        <div className="pvgrid">
          <div className="pvlist" role="region" aria-label="People by floor">
            {groups.filter((g: any) => g.m.length > 0).map((g: any) => <section key={g.f.id} aria-label={g.f.name}>
              <h4 className="pvh">{g.f.name}<span>Floor {g.f.level}</span></h4>
              {g.m.map((a: Agent) => { const img = CLAY_BODY_HD[a.id] ?? CLAY_BODY[a.id]; return <button key={a.id} className="pvrow" aria-pressed={sel === a.id} aria-label={`${a.name}, ${a.role}, ${a.status} at snapshot`} onClick={() => setSel(sel === a.id ? null : a.id)}>
                <span className="pvav" aria-hidden="true">{img ? <img src={img} alt="" style={{ opacity: a.status === "Closed" || a.status === "Pending" ? 0.6 : 1 }} /> : null}</span>
                <span className="pvnm"><b>{a.name}</b><span>{a.role}</span></span>
                <span className="pvtask" title={a.task}>{a.task}</span>
                {stChip(a.status)}
              </button>; })}
            </section>)}
            {shown === 0 && <div className="pvempty">No people match this search or filter.</div>}
          </div>
          <aside className="pvside" aria-label="Selected person">
            {pa ? <div>
              <div className="fxav">{(CLAY_BODY_HD[pa.id] ?? CLAY_BODY[pa.id]) ? <img src={CLAY_BODY_HD[pa.id] ?? CLAY_BODY[pa.id]} alt="" width={56} height={86} /> : null}</div>
              <h3>{pa.name}</h3>
              <div className="fxmut">{pa.role}</div>
              <div style={{ marginTop: 8 }}>{stChip(pa.status)} <span className="fxmut">at snapshot</span></div>
              <div className="fxkv"><span>Floor</span><span>{pfl ? `${pfl.level} · ${pfl.name}` : "Not recorded"}</span><span>Reports to</span><span>{fxBoss(pa)}</span><span>Last report</span><span>{pa.asOf}</span><span>Freshness</span><span>{fresh(pa)}</span></div>
              <div className="fxtask"><b>Task at snapshot</b><br />{pa.task}</div>
              <div className="fxacts">{pa.chat && <a className="fxbtn pri" href={`https://cursor.com/agents/${pa.chat}`} target="_blank" rel="noreferrer">Open chat</a>}<button className="fxbtn" onClick={() => focus(pa)}>View on floor</button><button className="fxbtn" onClick={() => setViewMode("org")}>Organization</button><button className="fxbtn" onClick={() => setSel(null)}>Clear</button></div>
              <p className="fxmut" style={{ marginTop: 12 }}>Status from HQ roster snapshot {FLOOR_STAMP}; not live.</p>
            </div> : <div>
              <h3>Selected person</h3>
              <p className="fxmut">Select a row to see role, reporting line, freshness and the full task at snapshot.</p>
              <p className="fxmut">{AGENTS.length} seats across {FLOORS.length} floors. Snapshot {FLOOR_STAMP} · not live. Security not monitored.</p>
            </div>}
          </aside>
        </div>
      </div>
    );
  };
  // ===== Activity view (time-spine layout, Nov 8 2026). Displays ACTIVITY_VIEW in raw audit order; no reordering, no synthesized dates. =====
  const [aq, setAq] = useState<string>("");
  const [aa, setAa] = useState<string>("all");
  const [ad, setAd] = useState<string>("all");
  const AV_CSS = `.avx{display:block;height:auto;min-height:0;overflow:visible;flex:none;box-shadow:none;background:#F6F2EC;color:#2B2724;border-radius:20px;padding:20px;color-scheme:light;font-size:15px;container-type:inline-size;width:100%;max-width:100%;min-width:0}.avx *{box-sizing:border-box}.avbar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:10px}.avin,.avsel{padding:9px 12px;border:1px solid #DDD5CA;border-radius:10px;background:#FFFDF9;font:inherit;font-size:14px;color:#2B2724}.avin{flex:1 1 220px;min-width:0}.avin:focus-visible,.avsel:focus-visible,.avx summary:focus-visible{outline:3px solid #2563EB;outline-offset:2px}.avnote{font-size:13px;color:#6B625A;margin:4px 0 12px;line-height:1.45}.avsum{background:#FFFDF9;border:1px solid #E6DED3;border-radius:14px;padding:10px 14px;margin-bottom:14px}.avsum summary{cursor:pointer;font-weight:700}.avsum dl{display:grid;grid-template-columns:auto 1fr;gap:6px 14px;margin:10px 0 2px;font-size:14px}.avsum dt{color:#6B625A}.avsum dd{margin:0}.avlist{list-style:none;margin:0;padding:0}.avrow{display:grid;grid-template-columns:150px 24px 40px minmax(0,1fr);gap:12px;align-items:start}.avtime{text-align:right;padding-top:9px;font-size:14px;font-weight:600;color:#2B2724}.avtime span{display:block;font-weight:400;font-size:12px;color:#6B625A}.avspine{position:relative;align-self:stretch;min-height:56px}.avspine:before{content:"";position:absolute;left:11px;top:0;bottom:0;width:2px;background:#C9D6C5}.avspine i{position:absolute;left:6px;top:14px;width:12px;height:12px;border-radius:50%;background:#6F8F6A;border:2px solid #F6F2EC}.avface{width:40px;height:40px;border-radius:50%;overflow:hidden;background:#EDE6DB;margin-top:4px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#5A5550}.avface img{width:40px;height:62px;object-fit:cover;object-position:top;display:block;align-self:flex-start}.avbody{padding:6px 0 14px;min-width:0}.avbody b{font-size:15px}.avbody p{margin:2px 0 0;font-size:14px;line-height:1.45;color:#3A342E;overflow-wrap:anywhere}.avbody details{margin-top:4px;font-size:12.5px;color:#6B625A}.avbody summary{cursor:pointer}.avraw{font-family:ui-monospace,Menlo,monospace;font-size:12px;background:#F1ECE4;border-radius:8px;padding:6px 8px;margin-top:4px;overflow-wrap:anywhere;white-space:pre-wrap}.avempty{display:block;color:#2B2724;background:#FFFDF9;border:1px dashed #CFC4B6;border-radius:12px;padding:16px;margin:12px 0;font-size:15px}@container (max-width:640px){.avrow{grid-template-columns:24px 36px minmax(0,1fr)}.avtime{grid-column:3;grid-row:1;text-align:left;padding-top:0}.avspine{grid-column:1;grid-row:1/3}.avface{grid-column:2;grid-row:1/3}.avbody{grid-column:3;grid-row:2;padding-top:0}}`;
  const ctFrom = (clock: string): string | null => { const m = clock.match(/^~?(\d{1,2}):(\d{2}) (AM|PM)$/); if (!m) return null; let h = parseInt(m[1], 10) % 12 + (m[3] === "PM" ? 12 : 0); h = (h + 23) % 24; const ap = h >= 12 ? "PM" : "AM"; const h12 = h % 12 === 0 ? 12 : h % 12; return `${clock.startsWith("~") ? "~" : ""}${h12}:${m[2]} ${ap} CT`; };
  const activityView = (): any => {
    const tabs: [ViewMode, string][] = [["people", "People"], ["floors", "Floors"], ["activity", "Activity"], ["org", "Organization"]];
    const actors: string[] = Array.from(new Set(ACTIVITY_VIEW.map((e: ActView) => e.who)));
    const ql = aq.trim().toLowerCase();
    const rows = ACTIVITY_VIEW.map((e: ActView, i: number) => ({ e, i })).filter((r: any) => (aa === "all" || r.e.who === aa) && (ad === "all" || (ad === "known" ? !!r.e.day : !r.e.day)) && (!ql || (r.e.who + " " + r.e.body + " " + r.e.t).toLowerCase().includes(ql)));
    const knownN = ACTIVITY_VIEW.filter((e: ActView) => !!e.day).length;
    return (
      <div className="avx">
        <style>{FX_CSS}</style><style>{AV_CSS}</style>
        <div className="fxtop">
          <span className="fxbrand">HeadQuarters</span>
          <nav className="fxtabs" aria-label="Views">{tabs.map((t: [ViewMode, string]) => <button key={t[0]} className="fxtab" aria-current={viewMode === t[0] ? "page" : undefined} onClick={() => setViewMode(t[0])}>{t[1]}</button>)}</nav>
          <div className="fxnote"><span className="fxpill">Snapshot {FLOOR_STAMP} · not live</span><span className="fxpill">Security not monitored</span><span className="fxpill">Live trading off</span><button className="fxpill" disabled title="Manual sync is disabled">Sync · disabled</button></div>
        </div>
        <div className="fxhead"><h2>Activity</h2></div>
        <div className="avbar">
          <input className="avin" type="search" placeholder="Search activity" aria-label="Search activity" value={aq} onChange={(ev: any) => setAq(ev.target.value)} />
          <select className="avsel" aria-label="Filter by actor" value={aa} onChange={(ev: any) => setAa(ev.target.value)}><option value="all">All actors</option>{actors.map((n: string) => <option key={n} value={n}>{n} ({ACTIVITY_VIEW.filter((e: ActView) => e.who === n).length})</option>)}</select>
          <select className="avsel" aria-label="Filter by date" value={ad} onChange={(ev: any) => setAd(ev.target.value)}><option value="all">All dates</option><option value="known">Date verified ({knownN})</option><option value="unknown">Date not recorded ({ACTIVITY_VIEW.length - knownN})</option></select>
        </div>
        <p className="avnote">Raw audit order as recorded (not re-sorted). Times are as recorded in ET with a CT conversion where the clock is exact; most entries have no recorded date, so they are labelled "Date not recorded" rather than guessed. Roster as of {FLOOR_STAMP}, 2026 · not polled.</p>
        <details className="avsum"><summary>Owner summary</summary><dl>{ACTIVITY_SUMMARY.map((row: [string, string], i: number) => <Fragment key={"s" + i}><dt>{row[0]}</dt><dd>{row[1]}</dd></Fragment>)}</dl></details>
        <ol className="avlist" aria-label="Activity timeline">
          {rows.map((r: any) => { const e: ActView = r.e; const ag = AGENTS.find((a: Agent) => a.name === e.who); const img = ag ? (CLAY_BODY_HD[ag.id] ?? CLAY_BODY[ag.id]) : null; const ct = ctFrom(e.t); return (
            <li key={"h" + r.i} className="avrow">
              <div className="avtime">{e.t} ET{ct && <span>{ct}</span>}<span>{e.day ? e.label.split(" · ")[0] : "Date not recorded"}</span></div>
              <div className="avspine" aria-hidden="true"><i /></div>
              <div className="avface" aria-hidden="true">{img ? <img src={img} alt="" /> : e.who.slice(0, 2).toUpperCase()}</div>
              <div className="avbody"><b>{e.who}</b><p>{e.body}</p><details><summary>Raw record #{r.i + 1}</summary><div className="avraw">{`time: ${e.t}\nactor: ${e.who}\nbody: ${e.body}\ndate: ${e.day ?? "not recorded"}\nposition: ${r.i + 1} of ${ACTIVITY_VIEW.length} (raw audit order)`}</div></details></div>
            </li>); })}
        </ol>
        <div role="status" aria-live="polite">{rows.length === 0 && <div className="avempty">No activity matches this search or filter. Clear the search or set the filters back to All.</div>}</div>
      </div>
    );
  };
  // ===== Organization view (owner t556u, option 1 top-down branches). Group headings are floor groupings only, never managers. Edges come only from ORG_PARENT.
  const OZ_CSS = `.ozx{display:block;height:auto;min-height:0;overflow:visible;flex:none;box-shadow:none;background:#F6F2EC;color:#2B2724;border-radius:20px;padding:20px;color-scheme:light;font-size:15px;container-type:inline-size;width:100%;max-width:100%;min-width:0}.ozx *{box-sizing:border-box}.ozsub{font-size:13px;color:#6B625A;margin:2px 0 14px;line-height:1.45}.oztop{display:flex;flex-direction:column;align-items:center}.ozvl{width:2px;height:22px;background:#9DB39A}.ozcard{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:#FFFDF9;border:1px solid #DDD5CA;border-radius:14px;padding:8px 10px;font:inherit;color:#2B2724;cursor:pointer;min-width:0}.ozcard:hover{border-color:#9DB39A}.ozcard[aria-pressed="true"]{border-color:#4F7A4A;box-shadow:0 0 0 2px #4F7A4A inset}.ozcard:focus-visible,.ozx summary:focus-visible,.ozbtn:focus-visible{outline:3px solid #2563EB;outline-offset:2px}.ozlead{width:auto;min-width:230px;max-width:300px}.ozown{cursor:default}.ozface{width:36px;height:36px;flex:none;border-radius:50%;overflow:hidden;background:#EDE6DB;display:flex;align-items:flex-start;justify-content:center;font-weight:700;font-size:14px;color:#5A5550;line-height:36px}.ozface img{width:36px;height:56px;object-fit:cover;object-position:top;display:block}.ozt{display:flex;flex-direction:column;min-width:0}.ozt b{font-size:15px;line-height:1.25}.ozt span{font-size:13px;color:#5A5550;line-height:1.3;overflow-wrap:anywhere}.ozst{font-size:11.5px;font-weight:600;border-radius:999px;padding:1px 8px;margin-top:3px;align-self:flex-start}.ozbus{position:relative;height:22px;margin:0 12.5%;border-top:2px solid #9DB39A}.ozgrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;align-items:start}.ozg{position:relative;background:#FBF8F3;border:1px solid #E6DED3;border-radius:16px;padding:0 10px 12px}.ozg:before{content:"";position:absolute;left:50%;top:-22px;height:22px;width:2px;background:#9DB39A}.ozgh{text-align:center;font-weight:700;font-size:14px;padding:9px 4px 2px}.ozgk{text-align:center;font-size:11.5px;color:#6B625A;margin-bottom:8px}.ozul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}.ozul .ozul{margin:8px 0 0 14px;padding-left:12px;border-left:2px solid #C9D6C5}.ozul .ozul>li{position:relative}.ozul .ozul>li:before{content:"";position:absolute;left:-12px;top:24px;width:12px;height:2px;background:#C9D6C5}.ozrt{font-size:11.5px;color:#4F7A4A;margin:0 0 3px 2px}.ozout{margin-top:16px;background:#F1ECE4;border:1px solid #E3D8C6;border-radius:16px;padding:12px 14px}.ozout h3{font-size:14px;margin:0 0 8px}.ozrow{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}.oznote{font-size:13px;color:#5A5550;margin-top:10px;line-height:1.45}.ozdet{margin-top:16px;background:#FFFDF9;border:1px solid #DDD5CA;border-radius:16px;padding:14px 16px}.ozdet h3{margin:0;font-size:17px}.ozkv{display:grid;grid-template-columns:auto 1fr;gap:4px 14px;font-size:14px;margin:10px 0}.ozkv span:nth-child(odd){color:#6B625A}.ozacts{display:flex;flex-wrap:wrap;gap:8px}.ozbtn{padding:7px 12px;border-radius:10px;border:1px solid #DDD5CA;background:#F6F2EC;font:inherit;font-size:14px;color:#2B2724;cursor:pointer;text-decoration:none}.ozbtn.pri{background:#4F7A4A;border-color:#4F7A4A;color:#fff}@container (max-width:1000px){.ozgrid{grid-template-columns:repeat(2,minmax(0,1fr))}.ozbus{display:none}.ozg:before{display:none}.ozgrid{border-top:2px solid #9DB39A;padding-top:14px}}@container (max-width:560px){.ozgrid{grid-template-columns:minmax(0,1fr)}.ozlead{min-width:0;width:100%}}`;
  const orgView = (): any => {
    const tabs: [ViewMode, string][] = [["people", "People"], ["floors", "Floors"], ["activity", "Activity"], ["org", "Organization"]];
    const kids = (id: string): Agent[] => AGENTS.filter((a: Agent) => ORG_PARENT[a.id] === id && a.status !== "Closed" && a.status !== "Pending");
    const direct = kids("amanda");
    const groups = ORG_GROUPS.map((g: [string, string]) => ({ f: g[0], label: g[1], m: direct.filter((a: Agent) => a.floor === g[0]) })).filter((g: { m: Agent[] }) => g.m.length > 0);
    const other = direct.filter((a: Agent) => !ORG_GROUPS.some((g: [string, string]) => g[0] === a.floor));
    const am = AGENTS.find((a: Agent) => a.id === "amanda");
    const outside = AGENTS.filter((a: Agent) => a.status === "Pending" || a.status === "Closed");
    const cnt = (s: St): number => AGENTS.filter((a: Agent) => a.status === s).length;
    const sa = sel ? AGENTS.find((a: Agent) => a.id === sel) ?? null : null;
    const sfl = sa ? FLOORS.find((f: Floor) => f.id === sa.floor) : undefined;
    const chip = (s: St): any => <span className="ozst" style={{ background: PV_ST[s][0], color: PV_ST[s][1] }}>{s === "Pending" ? "Pending hire" : s}</span>;
    const face = (a: Agent): any => { const img = CLAY_BODY_HD[a.id] ?? CLAY_BODY[a.id]; return <span className="ozface" aria-hidden="true">{img ? <img src={img} alt="" style={{ opacity: a.status === "Closed" || a.status === "Pending" ? 0.6 : 1 }} /> : a.name.slice(0, 1)}</span>; };
    const card = (a: Agent, cls: string = "", sub?: string): any => <button type="button" key={a.id} data-id={a.id} className={"ozcard " + cls} aria-pressed={sel === a.id} aria-label={`${a.name} · ${sub ?? a.role} · ${a.status === "Pending" ? "Pending hire" : a.status} at snapshot · reports to ${fxBoss(a)} · show details`} onClick={() => setSel(sel === a.id ? null : a.id)}>{face(a)}<span className="ozt"><b>{a.name}</b><span>{sub ?? a.role}</span>{chip(a.status)}</span></button>;
    const tree = (a: Agent, top: boolean): any => { const k = kids(a.id); return <li key={a.id}>{top && <div className="ozrt">Reports to Amanda</div>}{card(a)}{k.length > 0 && <ul className="ozul" aria-label={`Reports to ${a.name}`}>{k.map((c: Agent) => tree(c, false))}</ul>}</li>; };
    return (
      <div className="ozx">
        <style>{FX_CSS}</style><style>{OZ_CSS}</style>
        <div className="fxtop">
          <span className="fxbrand">HeadQuarters</span>
          <nav className="fxtabs" aria-label="Views">{tabs.map((t: [ViewMode, string]) => <button key={t[0]} className="fxtab" aria-current={viewMode === t[0] ? "page" : undefined} onClick={() => setViewMode(t[0])}>{t[1]}</button>)}</nav>
          <div className="fxnote"><span className="fxpill">Snapshot {FLOOR_STAMP} · not live</span><span className="fxpill">Security not monitored</span><span className="fxpill">Live trading off</span><button className="fxpill" disabled title="Manual sync is disabled">Sync · disabled</button></div>
        </div>
        <div className="fxhead"><h2>Organization</h2></div>
        <p className="ozsub">Who reports to whom, top to bottom. Lines show reporting only, not authority. Department boxes group Amanda's direct reports by floor; a department heading is not a manager. Select a person for details. Roster at snapshot: {cnt("Working")} Working · {cnt("Waiting")} Waiting · {cnt("Pending")} Pending hire · {cnt("Closed")} Closed seat. No status refresh.</p>
        <div className="oztop">
          <div className="ozcard ozlead ozown" aria-label="Tishan · Owner"><span className="ozface" aria-hidden="true">T</span><span className="ozt"><b>Tishan</b><span>Owner</span></span></div>
          <div className="ozvl" aria-hidden="true" />
          {am && card(am, "ozlead", "Org lead · Chief of Staff / COO")}
          <div className="ozvl" aria-hidden="true" />
        </div>
        <div className="ozbus" aria-hidden="true" />
        <div className="ozgrid">
          {groups.map((g: { f: string; label: string; m: Agent[] }) => <section key={g.f} className="ozg" aria-label={`${g.label} floor group · ${g.m.length} direct report(s) to Amanda`}><div className="ozgh">{g.label}</div><div className="ozgk">Floor group · not a manager</div><ul className="ozul">{g.m.map((a: Agent) => tree(a, true))}</ul></section>)}
          {other.length > 0 && <section className="ozg" aria-label="Other direct reports to Amanda"><div className="ozgh">Other</div><div className="ozgk">Not on a department floor</div><ul className="ozul">{other.map((a: Agent) => tree(a, true))}</ul></section>}
        </div>
        <div className="ozout" role="region" aria-label="Outside the active chart">
          <h3>Outside the active chart</h3>
          <div className="ozrow">{outside.map((a: Agent) => card(a, "", a.status === "Pending" ? "Pending hire · not hired · reporting line unconfirmed" : "Closed seat"))}</div>
          <div className="oznote">Markets · Research and Grokbot Research are closed and off live floors. This HQ roster restamp is ~8:04 AM CT Nov 12: 12 Working · 9 Waiting · 3 Closed + Credit Pending. The separate Floor page still shows its Nov 5 stamp of “11 Working · 6 Waiting · 3 Closed”; that 3 Closed count is Prior CoS/HR plus two historical Research seats off board, and the roster above still lists 1 closed card. Credit Pending is outside Working/Waiting/Closed counts. Reporting lines include the Nov 12 restamp (LinkedIn Director → Amanda; specialists → Director; Backtester → Head of Trading; Gold Fundamentals → Amanda). No live status is shown here.</div>
        </div>
        {sa ? <div className="ozdet" role="region" aria-label="Selected person">
          <h3>{sa.name}</h3>
          <div className="fxmut">{sa.role}</div>
          <div style={{ marginTop: 6 }}>{chip(sa.status)} <span className="fxmut">at snapshot</span></div>
          <div className="ozkv"><span>Reports to</span><span>{sa.status === "Pending" ? "Unconfirmed (pending hire)" : fxBoss(sa)}</span><span>Direct reports</span><span>{kids(sa.id).map((c: Agent) => c.name).join(", ") || "None"}</span><span>Floor</span><span>{sfl ? `${sfl.level} · ${sfl.name}` : "Not recorded"}</span><span>Last report</span><span>{sa.asOf}</span><span>Task at snapshot</span><span>{sa.task}</span></div>
          <div className="ozacts">{sa.chat && <a className="ozbtn pri" href={`https://cursor.com/agents/${sa.chat}`} target="_blank" rel="noreferrer">Open chat</a>}{sfl && <button type="button" className="ozbtn" onClick={() => focus(sa)}>View on floor</button>}<button type="button" className="ozbtn" onClick={() => { const id = sa.id; setSel(null); requestAnimationFrame(() => { const el = document.querySelector(`button.ozcard[data-id="${id}"]`) as any; if (el && el.focus) el.focus(); }); }}>Clear</button></div>
          <p className="fxmut" style={{ marginTop: 10 }}>Status from HQ roster snapshot {FLOOR_STAMP}; not live. Esc also clears.</p>
        </div> : <p className="oznote">Select anyone in the chart for reporting line, floor and task at snapshot.</p>}
      </div>
    );
  };
  const floorsView = (): any => {
    const n = Math.min(onFloor.length, 5) || 1;
    const ROOM_ART_LEN: Record<string, number> = { exec: 45503, finance: 56559, yt: 54191, ai: 56863, ground: 55307, linkedin: 52927 };
    const hasRoomArt = typeof ROOM_ART[floor] === "string" && ROOM_ART[floor].startsWith("data:") && ROOM_ART[floor].length === (ROOM_ART_LEN[floor] ?? -1);
    const artSlots = hasRoomArt ? FX_ART_SLOTS[floor] : undefined;
    const seats = onFloor.slice(0, 5).map((a: Agent, i: number) => { const sp = artSlots && artSlots[a.id] ? artSlots[a.id] : [FX_SLOTS[n][i][0], FX_SLOTS[n][i][1], 80, 120]; return { a, x: sp[0], y: sp[1], hw: sp[2], hh: sp[3] }; });
    const extra = onFloor.slice(5);
    const pa = agent && agent.floor === floor ? agent : null;
    const tabs: [ViewMode, string][] = [["people", "People"], ["floors", "Floors"], ["activity", "Activity"], ["org", "Organization"]];
    const pick = (a: Agent): void => { if (sel === a.id) { setSel(null); } else { focus(a); } };
    const kd = (a: Agent) => (e: any) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(a); } };
    return (
      <div className="fx">
        <style>{FX_CSS}</style>
        <div className="fxtop">
          <span className="fxbrand">HeadQuarters</span>
          <nav className="fxtabs" aria-label="Views">{tabs.map((t: [ViewMode, string]) => <button key={t[0]} className="fxtab" aria-current={viewMode === t[0] ? "page" : undefined} onClick={() => setViewMode(t[0])}>{t[1]}</button>)}</nav>
          <div className="fxnote"><span className="fxpill">Snapshot {FLOOR_STAMP} · not live</span><span className="fxpill">Security not monitored</span><span className="fxpill">Live trading off</span><button className="fxpill" disabled title="Manual sync is disabled">Sync · disabled</button></div>
        </div>
        <div className="fxgrid">
          <nav className="fxnav" aria-label="Floors"><h4>Floors</h4>{FLOORS.map((f: Floor) => <button key={f.id} className="fxfl" aria-current={f.id === floor ? "location" : undefined} onClick={() => goFloor(f.id)}><span>{f.level} · {f.name}</span><span>{AGENTS.filter((a: Agent) => a.floor === f.id).length}</span></button>)}</nav>
          <div className="fxmain">
            <div className="fxhead"><h2>{fl.name}</h2><p>Floor {fl.level} · {FX_PURPOSE[floor] ?? ""}</p></div>
            <div className="fxscene">
              <svg viewBox="80 10 840 540" role="group" aria-label={`${fl.name} room`}>
                {hasRoomArt ? <image href={ROOM_ART[floor]} x={80} y={10} width={840} height={540} preserveAspectRatio="xMidYMid slice" /> : <g aria-hidden="true">
                  <polygon points="100,380 500,180 500,20 100,220" fill="#EFE6DA" />
                  <polygon points={`${wp(0.15, 40)} ${wp(0.85, 40)} ${wp(0.85, 150)} ${wp(0.15, 150)}`} style={{ fill: "#E9D6BD" }} stroke="#3A2C22" strokeWidth={4} />
                  <polyline points={`${wp(0.38, 40)} ${wp(0.38, 150)}`} stroke="#3A2C22" strokeWidth={3} /><polyline points={`${wp(0.62, 40)} ${wp(0.62, 150)}`} stroke="#3A2C22" strokeWidth={3} />
                  <polygon points="500,180 900,380 900,220 500,20" fill="#8E6646" />
                  {[0.08, 0.16, 0.24, 0.32, 0.4, 0.48, 0.56, 0.64, 0.72, 0.8, 0.88].map((t: number) => <polyline key={t} points={`${rp(t, 0)} ${rp(t, 160)}`} stroke="#6E4C32" strokeWidth={2} />)}
                  <polygon points="500,180 900,380 500,580 100,380" fill="#D9BF9E" />
                  {[0.2, 0.4, 0.6, 0.8].map((t: number) => <line key={t} x1={100 + 400 * t} y1={380 + 200 * t} x2={500 + 400 * t} y2={180 + 200 * t} stroke="#CDB08C" strokeWidth={2} />)}
                  {fxProps(floor)}
                </g>}
                {!hasRoomArt && seats.map((s: any) => <g key={"d" + s.a.id} aria-hidden="true">{ibox("dk" + s.a.id, s.x, s.y - 30, 48, 26, "#B9895E", "#8A5F3C", "#9E6E47")}{(floor === "finance" || floor === "ai") && <rect x={s.x + 16} y={s.y - 84} width={26} height={18} rx={3} style={{ fill: "#2F2B28" }} />}</g>)}
                {seats.map((s: any) => { const a: Agent = s.a; const isSel = sel === a.id; const muted = a.status === "Closed" || a.status === "Pending"; const hasArt = hasRoomArt; const body = CLAY_BODY_HD[a.id] ?? CLAY_BODY[a.id]; const label = a.name + (a.status === "Closed" ? " · Closed" : a.status === "Pending" ? " · Pending" : ""); const w = label.length * 8.3 + 36; return (
                  <g key={a.id} data-id={a.id} className="fxp" role="button" tabIndex={0} aria-pressed={isSel} aria-label={`${a.name}, ${a.role}, ${fxStatus(a.status)} at snapshot`} onClick={() => pick(a)} onKeyDown={kd(a)}>
                    {hasArt && <rect x={s.x - s.hw / 2} y={s.y - s.hh} width={s.hw} height={s.hh} fill="transparent" />}
                    <ellipse className="fxr" cx={s.x} cy={s.y} rx={42} ry={14} fill={isSel ? "rgba(111,143,106,.28)" : (hasArt ? "transparent" : "rgba(0,0,0,.08)")} stroke={isSel ? "#6F8F6A" : "transparent"} strokeWidth={3} />
                    {hasArt && muted && <ellipse cx={s.x} cy={s.y - s.hh * 0.45} rx={s.hw * 0.45} ry={s.hh * 0.48} fill="rgba(150,148,144,.42)" />}
                    {!hasArt && (body ? <image href={body} x={s.x - 34} y={s.y - 104} width={68} height={104} opacity={muted ? 0.55 : 1} /> : <circle cx={s.x} cy={s.y - 40} r={24} fill={a.color} opacity={muted ? 0.55 : 1} />)}
                    <rect x={s.x - w / 2} y={s.y + 10} width={w} height={28} rx={14} style={{ fill: isSel ? "#6F8F6A" : "#FFFDF9", stroke: isSel ? "#6F8F6A" : "#D9D0C4" }} />
                    <circle cx={s.x - w / 2 + 15} cy={s.y + 24} r={5} fill={FX_DOT[a.status]} stroke="#fff" strokeWidth={1} />
                    <text x={s.x - w / 2 + 26} y={s.y + 29.5} fontSize={15} fontWeight={600} style={{ fill: isSel ? "#FFFFFF" : "#2B2724" }}>{label}</text>
                  </g>); })}
              </svg>
              {!hasRoomArt && <span className="fxtag">Placeholder room drawing · production room art pending</span>}
            </div>
            <div className="fxroster" role="group" aria-label={`People on ${fl.name}`}>{onFloor.map((a: Agent) => <button key={a.id} className="fxr2" aria-pressed={sel === a.id} onClick={() => pick(a)}><b>{a.name}</b><span><i className="fxdot" style={{ background: FX_DOT[a.status], marginRight: 6 }} />{fxStatus(a.status)} · {a.role}</span></button>)}</div>
            {extra.length > 0 && <p className="fxmut">{extra.length} more seat(s) listed above but not drawn in the room.</p>}
          </div>
          <aside className="fxside" aria-label="Selected person">
            {pa ? <div>
              <div className="fxav">{(CLAY_BODY_HD[pa.id] ?? CLAY_BODY[pa.id]) ? <img src={CLAY_BODY_HD[pa.id] ?? CLAY_BODY[pa.id]} alt="" width={84} height={128} /> : <span className="fxdot" style={{ width: 48, height: 48, background: pa.color }} />}</div>
              <h3>{pa.name}</h3>
              <div className="fxmut">{pa.role}</div>
              <span className="fxst"><i className="fxdot" style={{ background: FX_DOT[pa.status] }} />{fxStatus(pa.status)} · at snapshot</span>
              <div className="fxkv"><span>Floor</span><span>{fl.level} · {fl.name}</span><span>Reports to</span><span>{fxBoss(pa)}</span><span>Last report</span><span>{pa.asOf}</span><span>Freshness</span><span>{fresh(pa)}</span></div>
              <div className="fxtask"><b>Task at snapshot</b><br />{pa.task}</div>
              <div className="fxacts">{pa.chat && <a className="fxbtn pri" href={`https://cursor.com/agents/${pa.chat}`} target="_blank" rel="noreferrer">Open chat</a>}<button className="fxbtn" onClick={() => setViewMode("org")}>View in Organization</button><button className="fxbtn" onClick={() => setSel(null)}>← Back to {fl.name}</button></div>
              <p className="fxmut" style={{ marginTop: 12 }}>Status from HQ roster snapshot {FLOOR_STAMP}; not live.</p>
            </div> : <div>
              <h3>{fl.level} · {fl.name}</h3>
              <p className="fxmut">{FX_PURPOSE[floor] ?? ""}</p>
              <p className="fxmut">{onFloor.length} seat(s) on this floor. Select a person in the room or the list to see role, reporting line and task at snapshot.</p>
              <p className="fxmut">Snapshot {FLOOR_STAMP} · not live. Security not monitored.</p>
            </div>}
          </aside>
        </div>
      </div>
    );
  };

  return (
    <Page title="HeadQuarters" summary="Clay HQ, roster snapshot ~8:04 AM CT Nov 12." width="full">
      <div className={"hq" + ((viewMode as string) === "floors" ? " hqwide" : "")}>
        <style>{VARS + CSS}</style>
        {(viewMode as string) === "floors" ? floorsView() : (viewMode as string) === "people" ? peopleView() : (viewMode as string) === "activity" ? activityView() : (viewMode as string) === "org" ? orgView() : (<div className={"shell" + (viewMode === "org" ? " org-view" : "")}>
        {viewMode === "floors" && <button type="button" className="skip" aria-label="Skip to floor nameplates" onClick={skipFloor}>Skip to floor</button>}
        <div className="ov cap">
          <div className="glass">
            <span className="pill" title={`HQ roster snapshot stamped ${FLOOR_STAMP} · not a live feed · 3 Closed + Credit Pending · Super weekly ${USAGE_PCT}% used (plan-level) as of ${USAGE_ASOF}`}><span className="dot" style={{ background: "#A1A1AA" }} />Snapshot as of {FLOOR_STAMP}</span>
            <button className="pill btn" onClick={() => { setViewMode("people"); setPFilter("Working"); }}><span className="dot" style={{ background: SC.Working }} />Working {cnt("Working")}</button>
            <button className="pill btn" onClick={() => { setViewMode("people"); setPFilter("Waiting"); }}><span className="dot" style={{ background: SC.Waiting }} />Waiting {cnt("Waiting")}{staleW > 0 && <span className="age old" title={`${staleW} over 4h since Floor update · stale ≠ offline`}>· {staleW} stale</span>}</button>
            <button className="pill btn" onClick={() => { setViewMode("people"); setPFilter("Closed"); }} title="Floor truth: 3 Closed (Prior CoS + Research ×2) · Credit Pending · board chips show Prior CoS only; Research seats stay off this board"><span className="dot" style={{ background: SC.Closed }} />3 Closed</button>
            <span className="pill" title="Credit Pending · not hired · not in Working/Waiting/Closed counts."><span className="dot" style={{ background: SC.Pending }} />Credit Pending</span>
            <button className="pill btn" style={{ whiteSpace: "nowrap" }} title={`Plan-level weekly Super allowance used (shared with other apps on plan) · ${USAGE_PCT}% as of ${USAGE_ASOF} · resets Sun Nov 15 7:40 PM CT · stamped, not live`} onClick={() => setNav(nav === "usage" ? "none" : "usage")}><span className="dot" style={{ background: "#A3E635" }} />Usage {USAGE_PCT}%</button>
            <span className="pill" title={`From HQ roster snapshot · stamped ${FLOOR_STAMP} · not polled`}><span className="dot" style={{ background: "#A1A1AA" }} />Security not monitored · {FLOOR_STAMP}</span>
            <button type="button" className="pill mut" disabled style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0, cursor: "not-allowed", whiteSpace: "nowrap" }} title="Manual sync only · agents stamp Floor→VO→HQ · live refresh not available in dashboard" aria-label={`Manual sync — last stamp Nov 5, ${FLOOR_STAMP_SHORT} · live sync not available in dashboard`}>Manual sync · {FLOOR_STAMP_SHORT}</button>
          </div>
        </div>
          <div className={`ov lrail${lim ? " limo" : ""}`}>
            <div className="lhd" title="Personal AI OS · Live HQ">Live HQ <span className="mut">· {FLOORS.length} floors · {AGENTS.length} people</span></div>
            <div className="lmid">
            <div className="lsec"><div className="h">Main</div><nav className="vnav" aria-label="Main views">{views.map((v: [ViewMode, string]) => <button key={v[0]} className={"btn vb" + (viewMode === v[0] ? " on" : "")} aria-current={viewMode === v[0] ? "page" : undefined} onClick={() => { setViewMode(v[0]); if (v[0] === "people") { setPFilter("all"); } }}><span>{v[1]}</span>{v[0] === "people" ? <span className="mut">{AGENTS.length}</span> : null}</button>)}</nav></div>
            <div className="lsec"><input className="lin" type="search" aria-label="Find people" placeholder="Find people…" value={q} onChange={(e: ChangeEvent<HTMLInputElement>) => { setQ(e.target.value); setViewMode("people"); }} style={{ color: "#FAFAFA", WebkitTextFillColor: "#FAFAFA", caretColor: "#FAFAFA", background: "rgba(255,255,255,.12)", borderColor: "rgba(255,255,255,.28)", opacity: 1 }} /></div>
            <div className="lsec"><div className="h">Panels</div><nav className="vnav" aria-label="Panels">{navs.map((v: [Nav, string]) => <button key={v[0]} className={"btn vb" + (nav === v[0] ? " on" : "")} aria-pressed={nav === v[0]} onClick={() => setNav(nav === v[0] ? "none" : v[0])}><span>{v[1]}</span>{v[0] === "waiting" && cnt("Waiting") > 0 ? <span className="mut">{cnt("Waiting")}</span> : null}</button>)}</nav></div>
            </div>
            <div className="lfl"><div className="h">Floors · {FLOORS.length}</div><div className="fbh">{viewMode === "floors" ? `Viewing ${fl.level} · ${fl.name}` : `Last floor: ${fl.level} · ${fl.name}`}</div>{FLOORS.map((f: Floor) => <button key={f.id} className={"btn fb" + (f.id === floor ? (viewMode === "floors" ? " on" : " cur") : "")} aria-current={f.id === floor && viewMode === "floors" ? "location" : undefined} aria-label={`Floor ${f.level} · ${f.name} · ${AGENTS.filter((a: Agent) => a.floor === f.id).length} seats · ${AGENTS.filter((a: Agent) => a.floor === f.id && a.status === "Waiting").length} waiting${f.id === floor && viewMode === "floors" ? " · current floor" : ""}`} onClick={() => goFloor(f.id)}><span>{f.id === floor ? "● " : ""}{f.level} · {f.name}</span><span>{(() => { const w = AGENTS.filter((a: Agent) => a.floor === f.id && a.status === "Waiting").length; return w > 0 ? <span className="fwt" title={`${w} waiting`}>● {w}</span> : null; })()}<span className="mut">{AGENTS.filter((a: Agent) => a.floor === f.id).length}</span></span></button>)}</div>
          <div className="limb">
            <button ref={limBtn} className="btn" aria-expanded={lim} aria-haspopup="dialog" onClick={() => setLim(!lim)}>{lim ? "▸" : "ⓘ"} About this page</button>
          </div>
          </div>
          {lim && <div ref={limRef} className="glass limd" role="dialog" aria-modal="true" aria-labelledby="limh">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><div className="h" id="limh">About this page</div><button className="btn" aria-label="Close About this page" onClick={() => setLim(false)}>Close</button></div>
              <div style={{ marginTop: 4 }}>Headquarters is an HQ roster snapshot — who is working and on what. It is not a live feed and is not polled.</div>
              <div className="mut" style={{ marginTop: 8 }}>This page was restamped ~8:04 AM CT Nov 12 (owner refresh HQ). The separate Floor and Virtual Office pages were not restamped (Floor remains its Nov 5 stamp). Floor truth convention: 3 Closed (Prior CoS + Research ×2) + Credit Pending. Closed reads 3 everywhere (Floor truth). The board lists {cnt("Closed")} Closed card (Prior CoS) because the two Research seats stay off this board on purpose. Credit Pending · not hired · not in Working/Waiting/Closed counts.</div>
              <div className="mut" style={{ marginTop: 8 }}>Open chat needs the Grok Bot app. Stale or unknown never means offline. Usage stamped plan-level Super weekly {USAGE_PCT}% ({USAGE_ASOF}). Task creation, messaging, and live polling · Not available in dashboard.</div>
              <div className="h" style={{ marginTop: 10 }}>Shared task queue</div>
              <div className="mut">Team tasks use the Shared task queue. This dashboard does not create tasks or poll it. Documentation path: /workspace/os-queue/.</div>
              <div className="h" style={{ marginTop: 10 }}>Related</div>
              <div className="row"><a className="a" href="https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/57ec2643-4823-4357-9d6d-048441701b31" target="_top">Floor (source of truth) →</a></div>
              <div className="row"><a className="a" href="https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/18bcdf53-178c-44f8-8d6c-6440dc2acf3e" target="_top">Virtual Office →</a></div>
              <div className="h" style={{ marginTop: 10 }}>Also</div>
              <div className="row"><a className="a" href="https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/579912b9-9eff-4457-9d76-191da4284a7c" target="_top">Architecture Assessment →</a></div>
              <div className="row"><a className="a" href="https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/db830245-4904-488e-8023-9fdede1f0256" target="_top">Stage 5 →</a></div>
              <div className="row"><a className="a" href="https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/a370d2fc-9acc-4867-8586-2ff6eb67150c" target="_top">Later →</a></div>
            </div>}
          <div className="mid">
            <div className="stage">
            <svg ref={svgRef} viewBox="0 0 1000 600" width="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block", cursor: "grab", touchAction: "none" }} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
              <g style={{ transform: tf, transition: drag.current ? "none" : wheeling ? "transform .16s ease-out" : "transform 1.15s cubic-bezier(.65,0,.25,1)" }}>
                <g key={floor + tick} className={tick > 0 ? (dir === "U" ? "slideU" : "slideD") : ""}>{scene}</g>
              </g>
              <rect width={1000} height={600} fill={tint} pointerEvents="none" />
            </svg>
            </div>
            {viewMode === "people" && <div className="pboard" role="region" aria-label="People board"><div className="pbh"><b>People · who’s working &amp; on what</b><span className="pm2">{people.length} shown · Roster as of {FLOOR_STAMP} · not polled</span></div><figure className="clayhero"><img src={CLAY_THUMB.people} alt="Soft-clay mini desk people · roomy-gold lean" /><figcaption>Soft-clay trial · roomy-gold lean</figcaption></figure>{ql ? <Fragment>{grp("Name matches", people.filter((a: Agent) => a.name.toLowerCase().includes(ql)))}{grp("Role matches", people.filter((a: Agent) => !a.name.toLowerCase().includes(ql)))}</Fragment> : <Fragment>{grp("Waiting", people.filter((a: Agent) => a.status === "Waiting"))}{grp("Working", people.filter((a: Agent) => a.status === "Working"))}{grp("Pending", people.filter((a: Agent) => a.status === "Pending"))}{grp("Closed · 3 on Floor · Research ×2 off board · shown", people.filter((a: Agent) => a.status === "Closed"))}</Fragment>}{people.length === 0 && <div className="pempty" role="status">Nobody matches these filters.</div>}</div>}
            {viewMode === "org" && <div className="pboard orgv" role="region" aria-label="Organization chart"><style>{ORG_CSS}</style><style>{`.orgboard,.orgboard .mut,.orgboard p,.orgboard div,.orgboard span,.orgboard b{color:#FAFAFA!important;opacity:1!important;-webkit-text-fill-color:#FAFAFA!important}.orgboard .clayhero figcaption{color:#FAFAFA!important;-webkit-text-fill-color:#FAFAFA!important;background:#18181B!important;background-color:#18181B!important;border:1px solid #A1A1AA!important;opacity:1!important;padding:3px 10px!important}.orgboard .btn{color:#FAFAFA!important;-webkit-text-fill-color:#FAFAFA!important;background:#27272A!important;background-color:#27272A!important;border:1px solid #A1A1AA!important;opacity:1!important;font-weight:600;min-height:32px;white-space:normal}.orgboard .btn:hover{background:#3F3F46!important;background-color:#3F3F46!important}.orgboard .btn[aria-pressed="true"]{background:#3F3F46!important;outline:2px solid #FAFAFA;outline-offset:-2px}.orgboard button:focus-visible,.orgboard .orgscroll:focus-visible{outline:3px solid #FDE68A!important;outline-offset:2px}.orgboard .orgscroll,.orgboard .orgcanvas{display:block!important;background:#121215!important;background-color:#121215!important;color:#FAFAFA!important;-webkit-text-fill-color:#FAFAFA!important}.orgboard .orgscroll{position:relative;height:440px;overflow:auto!important;border:1px solid #71717A;border-radius:12px;scrollbar-width:auto;overscroll-behavior:contain;margin:12px 0}.orgboard .orgcanvas{position:relative!important;margin:0!important;padding:0!important;direction:ltr}.orgboard .orglines{position:absolute!important;display:block!important;left:0;top:0;max-width:none!important;pointer-events:none;overflow:visible;background:transparent!important}.orgboard .orgseat,.orgboard .orgowner{background:#18181B!important;background-color:#18181B!important;color:#FAFAFA!important;-webkit-text-fill-color:#FAFAFA!important;border:1px solid #71717A!important;border-radius:12px}.orgboard .orgseat{position:absolute!important;display:block!important;width:216px;min-height:156px;box-sizing:border-box;margin:0!important;padding:8px!important;z-index:1;text-align:left!important}.orgboard .orgseat .pc{display:grid!important;grid-template-columns:28px minmax(0,1fr);gap:6px!important;align-items:center!important;width:100%!important;min-height:66px;box-sizing:border-box;padding:6px!important;margin:4px 0!important;background:#18181B!important;color:#FAFAFA!important}.orgboard .orgseat .pmn{display:block!important;min-width:0!important}.orgboard .orgseat .pn,.orgboard .orgseat .ptk,.orgboard .orgevidence,.orgboard .orgowner b,.orgboard .orgowner span{display:block!important;white-space:normal!important;overflow:visible!important;text-overflow:clip!important;line-height:1.25!important;color:#FAFAFA!important;-webkit-text-fill-color:#FAFAFA!important}.orgboard .orgseat .pn,.orgboard .orgseat .ptk{font-size:12px!important}.orgboard .orgevidence{font-size:11px!important;margin:2px 0!important}.orgboard .orgseat .psd{display:block!important;grid-column:2;text-align:left!important}.orgboard .orgseat .chip{font-size:10px!important;color:#FAFAFA!important}.orgboard .orgtoggle{display:block!important;width:100%;padding:3px 6px!important;min-height:26px!important;margin-top:4px!important;font-size:11px!important}.orgboard .orgowner{display:block!important;padding:12px 8px!important;min-height:72px}.orgboard .orgowner span{margin-top:6px;font-size:12px!important}.shell.org-view .rrail,.shell.org-view .rrail .glass,.shell.org-view .rrail .ins{color:#FAFAFA!important}.shell.org-view .rrail .mut,.shell.org-view .rrail .note,.shell.org-view .rrail .khint,.shell.org-view .rrail .h,.shell.org-view .rrail .nm,.shell.org-view .rrail .task,.shell.org-view .rrail .stc,.shell.org-view .rrail .stp,.shell.org-view .rrail .pick,.shell.org-view .rrail .pick span,.shell.org-view .rrail .a,.shell.org-view .rrail .row,.shell.org-view .rrail .row>span{color:#FAFAFA!important;-webkit-text-fill-color:#FAFAFA!important;opacity:1!important}.shell.org-view .rrail .kv,.shell.org-view .rrail .kv>span,.shell.org-view .rrail .kv>span:nth-child(odd),.shell.org-view .rrail .kv>span:nth-child(even){color:#FAFAFA!important;-webkit-text-fill-color:#FAFAFA!important;opacity:1!important}.shell.org-view .rrail .wit .mut,.shell.org-view .rrail .wit .row,.shell.org-view .rrail .wit span{color:#FAFAFA!important;-webkit-text-fill-color:#FAFAFA!important}.shell.org-view .rrail .cta:not(.pri),.shell.org-view .rrail .btn{color:#FAFAFA!important;-webkit-text-fill-color:#FAFAFA!important}.shell.org-view .rrail a.cta.pri,.shell.org-view .rrail .cta.pri{background:#18181B!important;background-color:#18181B!important;color:#FAFAFA!important;-webkit-text-fill-color:#FAFAFA!important;border:1px solid #A1A1AA!important;opacity:1!important}.shell.org-view .rrail a.cta.pri:hover,.shell.org-view .rrail .cta.pri:hover{background:#27272A!important;background-color:#27272A!important;color:#FFFFFF!important;-webkit-text-fill-color:#FFFFFF!important}`}</style><div className="oh"><div><h2>Organization</h2><div className="osub">Who reports to whom. Read top to bottom. Select a person for details.</div></div></div><div className="otop"><div className="olead"><b>Tishan</b><span>Owner</span></div><div className="ovl" aria-hidden="true" />{orgRoot && <button type="button" className="olead" aria-pressed={sel === orgRoot.id} aria-label={`${orgRoot.name} · Org lead · Chief of Staff / COO · reports to Tishan · open details`} onClick={() => orgPick(orgRoot)}><b>{orgRoot.name}</b><span>Org lead · Chief of Staff / COO</span></button>}<div className="ovl" aria-hidden="true" /></div><div className="ogrid">{orgGroups.map((g: { f: string; label: string; m: Agent[] }) => <section key={g.f} aria-label={`${g.label} · reports to Amanda`}><div className="ogh">{g.label}</div><ul className="olist">{g.m.map((a: Agent) => otree(a, 0))}</ul></section>)}{orgOther.length > 0 && <section aria-label="Other direct reports to Amanda"><div className="ogh">Other</div><ul className="olist">{orgOther.map((a: Agent) => otree(a, 0))}</ul></section>}</div><div className="oout"><div className="ooh">Outside the active chart</div><div className="orow">{orgPending && ocard(orgPending, "out", "Pending hire · not hired · reporting line unconfirmed")}{AGENTS.filter((a: Agent) => a.status === "Closed").map((a: Agent) => ocard(a, "out", "Closed seat"))}</div><div className="onote">Markets · Research and Grokbot Research are closed and off live floors. Reporting lines include the Nov 12 restamp (LinkedIn Director → Amanda; specialists → Director; Backtester → Head of Trading; Gold Fundamentals → Amanda). No live status is shown here. Lines show reporting only, not authority.</div></div></div>}
            {viewMode === "activity" && <div className="pboard" role="region" aria-label="Activity"><div className="pbh"><b>Activity</b><span className="pm2">America/New_York (ET) · Roster as of {FLOOR_STAMP}, 2026 · not polled</span></div><div className="pgrp">Owner summary</div>{ACTIVITY_SUMMARY.map((row: [string, string], i: number) => <div key={"s" + i} className="arow"><span className="mut">{row[0]}</span><span>{row[1]}</span></div>)}<div className="pgrp">History · raw audit verbatim</div><div className="mut" style={{ marginBottom: 8 }}>Raw audit order (ACTIVITY_RAW sequence — not re-sorted). Original time · actor · body strings unchanged. Display dates are identity-bound verified America/New_York calendar days where independent provenance exists; otherwise Unknown date.</div>{ACTIVITY_VIEW.map((ev: ActView, i: number) => <div key={"h" + i} className="arow"><span className="mut">{ev.label}</span><span><b>{ev.who}</b> — {ev.body}</span></div>)}</div>}
            {viewMode === "floors" && <div className="ov zoom"><button className="btn" aria-label="Return to People" onClick={() => { reset(); setNav("none"); setViewMode("people"); }}>← People</button><span className="glass zl"><b>{fl.level} · {fl.name}</b> <span className="mut">· drag to pan</span></span><button className="circ" aria-label="Zoom out" title="Zoom out" disabled={zoom <= 0.6 + 1e-9} onClick={() => setZoom(Math.max(0.6, zoom - 0.2))}>−</button><button className="circ" aria-label="Zoom in" title="Zoom in" disabled={zoom >= 2.6 - 1e-9} onClick={() => setZoom(Math.min(2.6, zoom + 0.2))}>+</button><button className="circ rst" onClick={reset}>Reset camera</button></div>}
          </div>
          <div className="ov rrail">{right}</div>
        </div>)}
      </div>
    </Page>
  );
}
