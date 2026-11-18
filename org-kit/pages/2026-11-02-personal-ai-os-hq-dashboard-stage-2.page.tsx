// Grokbot Page export · title: Personal AI OS — HQ Dashboard (Stage 2) · canvas_id: ccdf396b-e5b0-442c-8582-bcda741d3d22 · last updated 2026-11-02
// Inline base64 images stripped: 0. Private details replaced with [private ...] placeholders.
// Recreate by pasting this source into a new Page (Cursor canvas, React/TSX).
import {
  Page,
  Section,
  Text,
  Callout,
  Checklist,
  Table,
  Properties,
  Diagram,
  LinkCards,
  Rows,
  Segmented,
  useState,
} from "grok/canvas";

export default function App() {
  const [view, setView] = useState<
    "overview" | "roster" | "connectors" | "projects"
  >("overview");

  return (
    <Page
      title="Personal AI OS — HQ Dashboard (Stage 2)"
      summary="Functional HQ layer for Tishan’s Personal AI OS: org overview, recorded roster status, connector health, and the Stage 2 project board. Status as of Nov 1, 2026 · America/New_York."
      width="wide"
    >
      <Callout tone="info" lead="Stage 2">
        This Page is the functional dashboard. The Minecraft-inspired NYC Virtual Office stays Stage 4. Reuse the Office Floor Page for the visual floor map — do not invent live activity meters.
      </Callout>

      <Section heading="HQ links">
        <LinkCards
          links={[
            {
              title: "Organization Office Floor",
              site: "Visual HQ v0",
              href: "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/57ec2643-4823-4357-9d6d-048441701b31",
            },
            {
              title: "Later to-dos",
              site: "Queued org work",
              href: "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/a370d2fc-9acc-4867-8586-2ff6eb67150c",
            },
            {
              title: "Architecture Proposal & Roadmap",
              site: "Stage 1",
              href: "https://cursor.com/canvas/store-c3fb94ef-ded5-4cd5-b630-459870a30f07/579912b9-9eff-4457-9d76-191da4284a7c",
            },
          ]}
        />
      </Section>

      <Section heading="Dashboard">
        <Properties
          items={[
            { label: "Stage", value: "2 · Functional Dashboard" },
            { label: "Architect", value: "Rio" },
            { label: "Manager", value: "Amanda" },
            { label: "ADR home", value: "Rio store /adrs (proposed)" },
          ]}
        />
        <Segmented
          options={[
            { value: "overview", label: "Overview" },
            { value: "roster", label: "Roster" },
            { value: "connectors", label: "Connectors" },
            { value: "projects", label: "Projects" },
          ]}
          value={view}
          onChange={setView}
        />

        {view === "overview" ? (
          <>
            <Text>
              Everyone reports up through Amanda. Rio owns AI Systems & Engineering in the Operating System section.
            </Text>
            <Diagram
              direction="vertical"
              nodes={[
                {
                  id: "amanda",
                  label: "Amanda",
                  detail: "Top lead · CoS / HR",
                  kind: "person",
                },
                {
                  id: "time",
                  label: "Time Master",
                  detail: "Calendar & focus",
                  kind: "person",
                },
                {
                  id: "mail",
                  label: "Chief of Mailroom",
                  detail: "Inbound / outbound",
                  kind: "person",
                },
                {
                  id: "yt",
                  label: "Chief of Youtube",
                  detail: "Channel & pipeline",
                  kind: "person",
                },
                {
                  id: "storage",
                  label: "Chief of Storage",
                  detail: "Files & knowledge",
                  kind: "person",
                },
                {
                  id: "invest",
                  label: "Chief on Investments",
                  detail: "Investment dept",
                  kind: "person",
                },
                {
                  id: "rio",
                  label: "Rio",
                  detail: "AI Systems Architect",
                  kind: "person",
                },
                {
                  id: "gmail",
                  label: "Head of Gmail",
                  detail: "Under Mailroom",
                  kind: "person",
                },
                {
                  id: "wa",
                  label: "Head of WhatsApp",
                  detail: "Under Mailroom",
                  kind: "person",
                },
                {
                  id: "analyst",
                  label: "YouTube Analyst",
                  detail: "Under YouTube",
                  kind: "person",
                },
                {
                  id: "script",
                  label: "Script Writer",
                  detail: "Under YouTube",
                  kind: "person",
                },
              ]}
              edges={[
                { from: "amanda", to: "time" },
                { from: "amanda", to: "mail" },
                { from: "amanda", to: "yt" },
                { from: "amanda", to: "storage" },
                { from: "amanda", to: "invest" },
                { from: "amanda", to: "rio" },
                { from: "mail", to: "gmail" },
                { from: "mail", to: "wa" },
                { from: "yt", to: "analyst" },
                { from: "yt", to: "script" },
              ]}
            />
          </>
        ) : null}

        {view === "roster" ? (
          <Rows
            rows={[
              {
                title: "Amanda",
                detail: "Executive Suite · org lead + CoS / HR",
                status: { label: "Active", tone: "success" },
              },
              {
                title: "Time Master",
                detail: "Time Office · calendar and day planning",
                status: { label: "Onboarded", tone: "success" },
              },
              {
                title: "Chief of Mailroom",
                detail: "Mail Room · triage lanes",
                status: { label: "Waiting WhatsApp path", tone: "warning" },
              },
              {
                title: "Head of Gmail",
                detail: "Mail Room · Gmail connector available",
                status: { label: "Ready to triage", tone: "success" },
              },
              {
                title: "Head of WhatsApp",
                detail: "Mail Room · access not connected",
                status: { label: "Blocked", tone: "danger" },
              },
              {
                title: "Chief of Youtube",
                detail: "YouTube Studio",
                status: { label: "Awaiting starter pack", tone: "warning" },
              },
              {
                title: "YouTube Analyst",
                detail: "YouTube Studio · research",
                status: { label: "Onboarded", tone: "success" },
              },
              {
                title: "Script Writer",
                detail: "YouTube Studio · scripts",
                status: { label: "Onboarded", tone: "success" },
              },
              {
                title: "Chief of Storage",
                detail: "Storage Room · layout not confirmed",
                status: { label: "Awaiting layout yes", tone: "warning" },
              },
              {
                title: "Chief on Investments",
                detail: "Investment Department",
                status: { label: "Onboarded", tone: "success" },
              },
              {
                title: "Rio",
                detail: "AI Systems & Engineering · Stage 2 dashboard",
                status: { label: "Building", tone: "success" },
              },
            ]}
          />
        ) : null}

        {view === "connectors" ? (
          <Table
            columns={["System", "State", "Notes"]}
            rows={[
              ["Gmail", { text: "Connected", tone: "success" }, "25 tools"],
              [
                "Google Drive",
                { text: "Connected", tone: "success" },
                "Shared knowledge candidate",
              ],
              [
                "Google Calendar",
                { text: "Connected", tone: "success" },
                "15 tools",
              ],
              [
                "TubeAlfred YouTube",
                { text: "Connected", tone: "success" },
                "34 tools",
              ],
              [
                "Origin",
                { text: "Connected", tone: "success" },
                "Zero namespaces yet",
              ],
              [
                "GitHub",
                { text: "needsAuth", tone: "warning" },
                "Optional until external repos matter",
              ],
              [
                "Finance",
                { text: "needsAuth", tone: "warning" },
                "Not on OS critical path",
              ],
            ]}
          />
        ) : null}

        {view === "projects" ? (
          <Checklist
            items={[
              {
                text: "Stage 1 architecture proposal delivered",
                done: true,
                meta: "Done",
              },
              {
                text: "Stage 2 HQ Dashboard Page (this Page)",
                done: true,
                meta: "Shipped",
              },
              {
                text: "ADR-0001 knowledge home proposed (Rio store /adrs + Drive)",
                done: true,
                meta: "Proposed",
              },
              {
                text: "Stage 3 agent check-in protocol with chiefs",
                done: false,
                meta: "Not started",
              },
              {
                text: "Stage 4 Minecraft-NYC Virtual Office visual",
                done: false,
                meta: "Deferred",
              },
              {
                text: "Stage 5 automation routines + voice foundation",
                done: false,
                meta: "Deferred",
              },
            ]}
          />
        ) : null}
      </Section>

      <Section heading="Notes">
        <Text>
          Roster and connector states are recorded as of this write. Ask Rio or Amanda to refresh the Page when something changes — there is no silent live heartbeat API.
        </Text>
      </Section>
    </Page>
  );
}
