// Grokbot Page export · title: Floors avatar & room quality roadmap · canvas_id: 20185606-f222-454b-9455-9aa6e0b7c902 · last updated 2026-11-14
// Inline base64 images stripped: 0. Private details replaced with [private ...] placeholders.
// Recreate by pasting this source into a new Page (Cursor canvas, React/TSX).
import { Page, Section, Text, Table, Callout, Checklist, Divider, Properties, Status, Diagram, TableOfContents, Grid, Rows, Quote, BackToTop } from 'cursor/pages';

export default function FloorsAvatarRoomQualityRoadmap() {
  return (
    <Page
      title="Floors avatar & room quality roadmap"
      summary="Updated Nov 14, 2026 for 23 seats and 6 floors. G0 baseline freeze is complete. G1 style-guide lock still awaits owner OK. Planning only — no live HQ edits, no new art, no G1+ work from this update alone."
      width="wide"
      sources={[
        'Live HQ Page 6f83abe1-5a09-430d-8ca9-e402345351b1 · roster restamp ~8:04 AM CT Nov 12',
        '/workspace/hq-baseline-2026-11-14/ (G0 freeze · SHA-256 62f59a2e32b916b9929b9fa170f25be27346baa8b68ae20d333dc4a83b66ef61)',
        'HQ candidate 6b8310ee · Nov 8 layout still under the Nov 12 restamp',
        '/workspace/audit/organization-topdown-2026-11-08/after-6b8310ee.tsx',
        '/workspace/audit/floors-modern-rebuild-2026-11-08/',
        '/workspace/audit/floors-uiux-2026-11-08/avatar-integration/',
        '/workspace/clay-avatars/modern-redesign/',
        '/workspace/clay-avatars/clay-full-roster-overview.jpg',
      ]}
    >
      <Callout tone="info" lead="Scope">
        Improve avatar crispness and room backgrounds on the Floors section only. Keep layout, topbar, People, Activity, Organization, roster, status, reporting, history, and the four truthful notices unchanged. New visuals need a separate implementation authorization after this plan is accepted. This is not a resume of any cancelled floors rebuild.
      </Callout>

      <Callout tone="info" lead="Nov 14, 2026 — plan update + G0 only">
        Owner authorized updating this roadmap for 23 seats and 6 floors, and starting gate G0 (baseline freeze). G0 is complete. The live HeadQuarters Page was not edited. No new art was produced. G1 (style guide lock) still awaits a separate owner OK — do not start G1+.
      </Callout>

      <TableOfContents
        items={[
          { label: 'Verified baseline', id: 'baseline' },
          { label: 'Current roster (23 / 6)', id: 'roster' },
          { label: 'Proposal roles', id: 'roles' },
          { label: 'Milestone gates', id: 'gates' },
          { label: 'Ordered steps', id: 'steps' },
          { label: 'Acceptance criteria', id: 'accept' },
          { label: 'Out of scope', id: 'oos' },
          { label: 'Provenance', id: 'prov' },
        ]}
      />

      <Section heading="Verified baseline (inspected)" id="baseline">
        <Text>Facts below were re-verified Nov 14, 2026 from the live HQ Page source (canvas 6f83abe1-5a09-430d-8ca9-e402345351b1, roster stamp ~8:04 AM CT Nov 12) and on-disk assets. The Nov 8 layout is still in place under that restamp. Proposed targets are labelled separately.</Text>
        <Table
          columns={['Item', 'Verified now', 'Notes']}
          rows={[
            ['HQ source freeze (G0)', 'Page 6f83abe1… · SHA-256 62f59a2e32b916b9929b9fa170f25be27346baa8b68ae20d333dc4a83b66ef61', 'Copy + hash + screenshots in /workspace/hq-baseline-2026-11-14/ · live HQ was not edited'],
            ['Roster / floors', '23 seats · 6 floors', 'LinkedIn Department added as level 6 (lidir, liprof, licontent, licareer). Nov 8 plan was 19 seats · 5 floors'],
            ['Scene sprite render', '68×104 px in floorsView <image>', 'Side panel detail uses 84×128 <img> — unchanged'],
            ['CLAY_BODY_HD masters (embedded)', '19 WebP data-URIs · width 60 · height 89–96, upscaled', 'Sheet crops, not native 2× renders. LinkedIn four have no HD entry'],
            ['CLAY_BODY fallback', '19 × 34×52 RGBA WebP', 'Same 19 ids; LinkedIn four have no fallback body either'],
            ['Larger transparent PNGs on disk', '19 native-*.png · ~105–110 × 158–172 RGBA · unwired', 'floors-modern-rebuild-2026-11-08/; not what Floors currently embeds; no LinkedIn native files'],
            ['uiux trial crops', '~62–64 × 95–96 RGBA', 'avatar-integration/crops/; earlier sheet crops'],
            ['ROOM_ART slot', 'empty Record {}', 'Placeholder SVG iso rooms tagged “production room art pending” on all 6 floors'],
            ['Room mock JPGs', '5 × 1280×720 RGB · no LinkedIn mock', 'modern-hq-{floor,finance,youtube,aiops,ground}-mock.jpg — illustrative, people baked in; LinkedIn has no room mock'],
            ['Approved likeness pack', 'clay-full-roster-overview.jpg 1280×720', 'Composite sheet for the original 19; captions/status on sheet are not roster truth'],
            ['Seat anchors', 'FX_SLOTS 1–5 seats', 'Densest live floor is still Finance (5). LinkedIn has 4. 5-seat layout [[360,290],[640,290],[245,435],[500,435],[760,435]]'],
            ['Notices', 'Snapshot · not live · Security not monitored · Live trading off · Sync disabled', 'Must stay truthful'],
          ]}
        />
        <Callout tone="warning" lead="Quality gap">
          Floors currently upscales ~60×90 WebP into a 68×104 scene slot (and 84×128 in the panel) for the original 19 seats. That is stretch territory, not a native high-res master. The four LinkedIn seats have no body sprites at all — G0 screenshots show colored-circle fallbacks. Room scenes on all six floors are purpose-tagged SVG placeholders, not the walnut / warm-white / graphite-sage mock look, and no LinkedIn room mock exists. Do not promise “upscale the sheet crops.”
        </Callout>
      </Section>

      <Section heading="Current roster (from live HQ source)" id="roster">
        <Text>Exact seat list taken from the AGENTS and FLOORS arrays on the live HeadQuarters Page, Nov 14, 2026. Do not treat this as a live feed; it is the ~8:04 AM CT Nov 12 restamp.</Text>
        <Table
          columns={['Floor', 'id', 'Seats (AGENTS id · status)', 'Body sprites']}
          rows={[
            ['1 Executive Suite', 'exec', 'amanda · Working; cos · Closed', 'Yes (19-pack)'],
            ['2 Finance Department', 'finance', 'inv · Working; credit · Pending; goldtemp · Working; hot · Working; pbt · Working', 'Yes (19-pack)'],
            ['3 YouTube Studio', 'yt', 'chiefyt · Waiting; ytan · Waiting; script · Waiting', 'Yes (19-pack)'],
            ['4 AI Operations', 'ai', 'rio · Waiting; lex · Waiting; ostester · Waiting; clay · Waiting', 'Yes (19-pack)'],
            ['5 Ground Floor', 'ground', 'mailroom · Waiting; gmail · Working; wa · Working; storage · Waiting; time · Working', 'Yes (19-pack)'],
            ['6 LinkedIn Department', 'linkedin', 'lidir · Working; liprof · Working; licontent · Working; licareer · Working', 'None — no CLAY_BODY, CLAY_BODY_HD, or native-*.png'],
          ]}
        />
      </Section>

      <Section heading="Proposal roles (not assigned, not started)" id="roles">
        <Text>Names are for planning only. Do not contact anyone or open work from this page.</Text>
        <Rows
          rows={[
            { title: 'Clay Avatar Artist', detail: 'Native soft-clay fullbody masters + empty room backgrounds; style lock; alpha/edges/contact shadows', meta: 'Assets' },
            { title: 'Rio', detail: 'ROOM_ART + CLAY_BODY_HD integration, layering, hit areas, responsive anchors, performance budget', meta: 'Integration' },
            { title: 'OS Tester', detail: 'Desktop host + phone/DPR, keyboard focus/select/Esc, contrast, image failure fallbacks, regression suite', meta: 'QA' },
            { title: 'Amanda', detail: 'Coordinate review windows, keep roster/status/reporting untouched, gate handoffs', meta: 'Coordination' },
            { title: 'Tishan', detail: 'Accept style guide, pilot, full production, and final Floors rollout — or reject with notes', meta: 'Acceptance' },
          ]}
        />
      </Section>

      <Section heading="Milestone gates" id="gates">
        <Diagram
          direction="vertical"
          nodes={[
            { id: 'g0', label: '0 Baseline freeze · DONE Nov 14', detail: 'Source + sha256 + 6-floor shots', kind: 'terminal' },
            { id: 'g1', label: '1 Style guide', detail: 'Soft-clay + room palette lock', kind: 'box' },
            { id: 'g2', label: '2 Asset spec', detail: 'Native masters · empty rooms', kind: 'box' },
            { id: 'g3', label: '3 Finance pilot', detail: 'One floor · 5-seat stress', kind: 'decision' },
            { id: 'g4', label: '4 Owner review', detail: 'Go / revise / stop', kind: 'decision' },
            { id: 'g5', label: '5 Full production', detail: '23 people · 6 empty rooms', kind: 'box' },
            { id: 'g6', label: '6 Layer integrate', detail: 'Anchors · hit · responsive', kind: 'box' },
            { id: 'g7', label: '7 Device QA', detail: 'Host · phone · a11y · perf', kind: 'box' },
            { id: 'g8', label: '8 Staged rollout', detail: 'Compare · rollback ready', kind: 'terminal' },
          ]}
          edges={[
            { from: 'g0', to: 'g1' },
            { from: 'g1', to: 'g2' },
            { from: 'g2', to: 'g3' },
            { from: 'g3', to: 'g4', label: 'pilot build' },
            { from: 'g4', to: 'g5', label: 'accept' },
            { from: 'g4', to: 'g2', label: 'revise', dashed: true },
            { from: 'g5', to: 'g6' },
            { from: 'g6', to: 'g7' },
            { from: 'g7', to: 'g8' },
          ]}
        />
        <Table
          columns={['Gate', 'Deliverable', 'Owner decision']}
          rows={[
            ['G0 · DONE Nov 14', 'Asset-roster map for 23 ids, desktop screenshots of all 6 floors + People/Activity/Org, rollback hash of HQ source at /workspace/hq-baseline-2026-11-14/', 'Freeze captured; owner may still confirm'],
            ['G1', '1-page style guide (face, lighting, perspective, scale, room palette), now including LinkedIn', 'Awaits a separate owner OK — do not start'],
            ['G2', 'Written master specs + sample frame (no full roster yet)', 'Approve production sizes'],
            ['G3', 'Finance floor only: empty room + up to 5 seat sprites wired (LinkedIn stays out of the pilot)', 'Visual review'],
            ['G4', 'Written go / revise / stop', 'Required before remaining rooms & seats'],
            ['G5–G8', 'Full assets for 23 people and 6 empty rooms, integration, QA pack, staged HQ Floors swap', 'Final accept vs rollback'],
          ]}
        />
      </Section>

      <Section heading="Ordered steps" id="steps">
        <Section heading="1 · Freeze baseline" caption="Gate G0" defaultOpen>
          <Checklist
            items={[
              { text: 'Snapshot current HQ Floors: Exec, Finance, YouTube, AI Ops, Ground, and LinkedIn, plus People / Activity / Organization (desktop 1440×900)', done: true },
              { text: 'Write asset↔roster map for all 23 seat ids → current CLAY_BODY_HD / CLAY_BODY / native-*.png paths (LinkedIn four: no sprites)', done: true },
              { text: 'Record ROOM_ART empty + placeholder label on all 6 floors; note FX_SLOTS and 68×104 / 84×128 render sizes; note no LinkedIn room mock', done: true },
              { text: 'Store rollback: sha256 62f59a2e32b916b9929b9fa170f25be27346baa8b68ae20d333dc4a83b66ef61 + full source copy under /workspace/hq-baseline-2026-11-14/ (live HQ not overwritten)', done: true },
            ]}
          />
        </Section>

        <Section heading="2 · Style guide lock" caption="Gate G1" collapsible defaultOpen>
          <Text>Gate G1 — awaits a separate owner OK; not started. One short guide before any production renders. Soft-clay fullbody: consistent face scale, key light, camera height, foot contact, and quiet contact shadow. Rooms: cream / graphite / sage family matching People/Floors chrome — richer than SVG placeholders, calmer than busy mock clutter. Include a LinkedIn room character in the same family (no product UI in the plate).</Text>
          <Table
            columns={['Floor', 'Scene character (proposed)', 'Avoid']}
            rows={[
              ['Executive', 'Quiet office · rug · sofa · HQ mark · warm wood accents', 'Crowded props, nameplates, UI chrome in art'],
              ['Finance', 'Analysis desks · monitors · wall chart · cool task light', 'Live tickers, fake P&L numbers as truth'],
              ['YouTube Studio', 'Camera / ring light / edit desk · muted backdrop', 'On-screen titles, subscriber counts'],
              ['AI Operations', 'Collaboration table · soft abstract wall · shared work surface', 'Server-rack cyber clutter'],
              ['Ground', 'Reception + storage · shelf · parcels · wall clock', 'Pile-up that hides seats'],
              ['LinkedIn', 'Calm professional workplace · brand-adjacent, no product UI in the plate', 'LinkedIn chrome, logos, profile metrics, or connection counts baked into art'],
            ]}
          />
        </Section>

        <Section heading="3 · Native master specs" caption="Gate G2" collapsible defaultOpen>
          <Callout tone="info" lead="Proposed (not current)">
            Person masters: separate transparent fullbody PNG/WebP per seat, clean alpha, no baked names/status/UI, optional soft contact shadow only under feet. Minimum pixel size ≥ 2× the largest intended Floors render before production starts — today that means ≥ 2× 84×128 panel detail ⇒ at least 168×256 (prefer taller ~240px+ as earlier rebuild notes suggested). Confirm exact max render size in code at freeze time; do not stretch smaller sources. Room masters: empty backgrounds only (no people, labels, or controls), consistent isometric/camera match to FX stage, delivered into ROOM_ART by floor id.
          </Callout>
          <Checklist
            items={[
              { text: 'Confirm largest intended render px (scene + panel) before commissioning', done: false },
              { text: 'Publish per-person file naming: seat id = AGENTS id (amanda, hot, …)', done: false },
              { text: 'Publish per-room file naming: exec | finance | yt | ai | ground | linkedin', done: false },
              { text: 'Reject sheet-crop upscales as “done”; require native renders', done: false },
            ]}
          />
        </Section>

        <Section heading="4 · Single-floor pilot — Finance" caption="Gate G3" collapsible defaultOpen>
          <Text>One efficient pilot: Finance (up to five seats still stress the FX_SLOTS 5-seat layout: inv, credit, goldtemp, hot, pbt). Wire empty finance ROOM_ART + Finance seat sprites only. Keep Exec/YouTube/AI/Ground/LinkedIn on placeholders. LinkedIn stays out of this pilot — it has no body sprites and no room mock yet. Do not produce the whole roster yet.</Text>
          <Properties
            items={[
              { label: 'Why Finance', value: 'Five-seat stress + analysis props; representative of densest floor' },
              { label: 'Pilot seats', value: 'From live roster on finance floor only (Working/Waiting); Pending Credit stays out of active chart seating if current Floors rules exclude it' },
              { label: 'Reuse elsewhere', value: 'People / Activity / Org portraits stay as today unless separately approved' },
            ]}
          />
        </Section>

        <Section heading="5 · Owner review" caption="Gate G4 — hard stop" collapsible defaultOpen>
          <Text>Tishan reviews the Finance pilot in the real host. Outcomes: accept → continue; revise → return to style/spec; stop → keep placeholders, no further production. No full roster or remaining rooms without this gate.</Text>
        </Section>

        <Section heading="6 · Full production" caption="Gate G5" collapsible>
          <Checklist
            items={[
              { text: 'All 23 seat masters mapped 1:1 to AGENTS ids (19 likeness remasters + first-time sprites for lidir, liprof, licontent, licareer)', done: false },
              { text: 'All 6 empty room masters into ROOM_ART, including a first LinkedIn plate (no prior mock exists)', done: false },
              { text: 'Likeness check vs approved soft-clay pack (art only; ignore sheet captions)', done: false },
              { text: 'No people/names/controls baked into room art', done: false },
            ]}
          />
        </Section>

        <Section heading="7 · Layering & integration" caption="Gate G6" collapsible>
          <Text>Separate layers: room background → furniture/props (if not in plate) → people sprites → name/selection UI. Feet-anchored to FX_SLOTS; hit areas follow sprite bounds; selection ring and labels above art. Responsive: no unreadable shrink, no seat misassignment when columns collapse. Class names stay unique (remember prior .av 34px root collision).</Text>
        </Section>

        <Section heading="8 · Device & interaction QA" caption="Gate G7" collapsible>
          <Checklist
            items={[
              { text: 'Desktop actual HQ host width (~1150px) — no clip, no 100vw breakout', done: false },
              { text: 'Phone width + DPR 2/3 — sprites remain crisp, not blurry mush', done: false },
              { text: 'Keyboard: Tab/Enter/Space select, Esc clear, focus ring visible', done: false },
              { text: 'Contrast target (proposed, not yet measured): body text and name pills meet readable contrast on cream; selection ring visible on sage', done: false },
              { text: 'Image failure fallback: missing ROOM_ART or sprite → keep layout + initials/placeholder, no broken-image collapse', done: false },
              { text: 'No scroll trap; no false live / sync / security notices', done: false },
            ]}
          />
        </Section>

        <Section heading="9 · Staged rollout + rollback" caption="Gate G8" collapsible>
          <Text>Swap Floors assets only on HQ after G7 pass. Keep People/Activity/Org portrait sources unless a later authorization says otherwise. Final compare screenshots vs G0 baseline. Rollback = restore pre-change HQ source hash. Checkpoint under a dated /workspace/audit/ folder.</Text>
        </Section>
      </Section>

      <Section heading="Measurable acceptance criteria" id="accept">
        <Table
          columns={['Criterion', 'Type', 'Bar']}
          rows={[
            ['Master ≥ 2× largest intended render', 'Proposed gate', 'Confirm px at freeze; example if panel stays 84×128 → ≥168×256'],
            ['No stretching of smaller sources', 'Proposed', 'Reject upscaled sheet crops as production'],
            ['23/23 seat map', 'Proposed', 'Every AGENTS id has a master, including the four new LinkedIn seats'],
            ['6/6 empty rooms', 'Proposed', 'ROOM_ART filled for all floors including LinkedIn; zero baked people'],
            ['Zero seat occlusion / clipping at host width', 'Proposed QA', 'Names + sprites fully visible'],
            ['No scroll trap / no false live notices', 'Hard', 'Same four truthful pills'],
            ['Contrast', 'Target (not measured yet)', 'Readable cream/graphite/sage; measure in G7'],
            ['Roster / status / reporting / history', 'Hard', 'Byte-identical; no refresh'],
          ]}
        />
      </Section>

      <Section heading="Out of scope" id="oos">
        <Rows
          rows={[
            { title: 'No HQ edits from this plan alone', detail: 'Implementation needs a new owner authorization after plan acceptance' },
            { title: 'No art generation or peer pings now', detail: 'Roles are labels only' },
            { title: 'No roster / status / reporting / history changes', detail: 'Snapshot truth stays frozen' },
            { title: 'No portrait swap outside Floors', detail: 'Unless separately approved' },
            { title: 'No time or cost estimates', detail: 'Not inventing schedules' },
            { title: 'Not resuming a cancelled rebuild', detail: 'Fresh authorized track after this roadmap' },
          ]}
        />
      </Section>

      <Section heading="Provenance (bounded inventory)" id="prov">
        <Quote cite="Re-inspected Nov 14, 2026 from the live HQ Page">
          Live HQ source: canvas 6f83abe1-5a09-430d-8ca9-e402345351b1 (roster stamp ~8:04 AM CT Nov 12; 23 seats, 6 floors; ROOM_ART empty; scene 68×104; panel 84×128). G0 freeze: /workspace/hq-baseline-2026-11-14/HeadQuarters.tsx · SHA-256 62f59a2e32b916b9929b9fa170f25be27346baa8b68ae20d333dc4a83b66ef61, plus desktop screenshots of all 6 floors and People/Activity/Org. HD embeds still 19× ~60×89–96 WebP; LinkedIn ids lidir, liprof, licontent, licareer have no body sprites. Larger unwired PNGs: /workspace/audit/floors-modern-rebuild-2026-11-08/native-*.png (~105–110×158–172), 19 files, none for LinkedIn. Room mocks remain 5 floors only — no LinkedIn mock. Prior Nov 8 inventory (6b8310ee / 19 seats / 5 floors) is superseded for counts but still describes the layout and on-disk art pack.
        </Quote>
        <Status tone="neutral">G0 complete Nov 14 · G1 style guide lock awaits owner OK · live HQ Page not edited · no new art · no G1+ started</Status>
      </Section>

      <BackToTop />
    </Page>
  );
}
