/**
 * Small UI illustrations built in code.
 * EVERYTHING here is fake on purpose: invented names ("Sample Person A"),
 * invented counts, no pay amounts. Never paste real data or screenshots in.
 */

type Kind =
  | "payroll" | "review" | "pipeline" | "report" | "playbook" | "sourcing"
  | "candidates" | "boolean" | "outreach" | "handover" | "orgchart" | "onboarding";

const labels: Record<Kind, string> = {
  payroll: "Illustration of a payroll tracker with sample rows and status flags",
  review: "Illustration of an appraisal form with a rating scale",
  pipeline: "Illustration of a hiring board with candidate cards in stages",
  report: "Illustration of an automated morning screening message",
  playbook: "Illustration of a generated hiring playbook document",
  sourcing: "Illustration of a sourcing search box and a calculator slider",
  candidates: "Illustration of a live candidate board with stages and next steps",
  boolean: "Illustration of a search-string builder turning a role into a search",
  outreach: "Illustration of a personal outreach note with a follow-up reminder",
  handover: "Illustration of a handover checklist",
  orgchart: "Illustration of a small org chart",
  onboarding: "Illustration of a welcome message and onboarding check-ins",
};

function Frame({ kind, children }: { kind: Kind; children: React.ReactNode }) {
  return (
    <div
      role="img"
      aria-label={labels[kind]}
      className="relative h-48 overflow-hidden rounded-2xl border border-line bg-paper p-4 text-[11px] leading-tight"
    >
      <div className="mb-3 flex gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
      </div>
      <div aria-hidden="true">{children}</div>
    </div>
  );
}

const Pill = ({ tone, children }: { tone: "ok" | "warn" | "muted"; children: React.ReactNode }) => (
  <span
    className={`rounded-full px-2 py-0.5 font-medium ${
      tone === "ok"
        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
        : tone === "warn"
          ? "bg-accent-soft text-accent"
          : "bg-paper-2 text-muted"
    }`}
  >
    {children}
  </span>
);

function Payroll() {
  const rows = [
    ["Sample Person A", "Contract ✓", "ok"],
    ["Sample Person B", "Invoice missing", "warn"],
    ["Sample Person C", "Ready", "ok"],
    ["Sample Person D", "Check change", "warn"],
  ] as const;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-muted">
        <span>Before payday</span>
        <span>2 flags</span>
      </div>
      {rows.map(([n, s, t]) => (
        <div key={n} className="flex items-center justify-between rounded-lg bg-card px-2.5 py-1.5">
          <span>{n}</span>
          <Pill tone={t}>{s}</Pill>
        </div>
      ))}
    </div>
  );
}

function Review() {
  return (
    <div className="space-y-2.5">
      <div className="rounded-lg bg-card px-2.5 py-2">
        <span className="text-muted">Team member</span>
        <p className="mt-0.5 font-medium">Sample Person E</p>
      </div>
      <div className="rounded-lg bg-card px-2.5 py-2">
        <span className="text-muted">Rating</span>
        <div className="mt-1.5 flex gap-1">
          {["Below", "Meets", "Exceeds", "Outstanding"].map((r, i) => (
            <span key={r} className={`flex-1 rounded-md py-1 text-center ${i === 2 ? "bg-accent text-paper" : "bg-paper-2 text-muted"}`}>
              {r}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <span className="rounded-full bg-ink px-3 py-1 text-paper">Save</span>
      </div>
    </div>
  );
}

function Pipeline() {
  const cols = [
    ["Sourced", ["Sample A", "Sample B"]],
    ["Interview", ["Sample C"]],
    ["Final", ["Sample D"]],
  ] as const;
  return (
    <div className="grid grid-cols-3 gap-2">
      {cols.map(([title, cards]) => (
        <div key={title} className="rounded-lg bg-paper-2 p-1.5">
          <p className="mb-1.5 px-1 text-muted">{title}</p>
          <div className="space-y-1.5">
            {cards.map((c) => (
              <div key={c} className="whitespace-nowrap rounded-md bg-card px-2 py-1.5 shadow-sm">
                {c}
                <p className="mt-0.5 text-[10px] text-muted">Next: reply</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Report() {
  return (
    <div className="flex gap-2">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent text-[10px] font-bold text-paper">
        AI
      </span>
      <div className="flex-1 space-y-1.5">
        <p>
          <span className="font-semibold">Screening bot</span> <span className="text-muted">· 9:00 AM</span>
        </p>
        <div className="rounded-lg bg-card px-2.5 py-2">
          <p>Good morning! Yesterday across sample roles:</p>
          <p className="mt-1 text-muted">• 42 screened · 3 shortlisted</p>
          <p className="text-muted">• 5 replies waiting on you</p>
        </div>
      </div>
    </div>
  );
}

function Playbook() {
  return (
    <div className="space-y-2">
      <p className="font-serif text-sm font-medium">Sample Role: Hiring Playbook</p>
      {["Who we need", "Where to look", "Interview stages", "Scorecard"].map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <span className="text-accent">{i + 1}.</span>
          <span>{s}</span>
          <span className="h-1 flex-1 rounded-full bg-paper-2" />
        </div>
      ))}
    </div>
  );
}

function Sourcing() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 rounded-lg bg-card px-2.5 py-2">
        <span className="text-muted">⌕</span>
        <span>Senior engineer · remote · sample stack</span>
      </div>
      <div className="rounded-lg bg-card px-2.5 py-2">
        <div className="flex justify-between text-muted">
          <span>Calculator</span>
          <span>Level 3</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-paper-2">
          <div className="h-1.5 w-3/5 rounded-full bg-accent" />
        </div>
      </div>
    </div>
  );
}

function Candidates() {
  const rows = [
    ["Sample Engineer A", "Tech round", "Tomorrow", "ok"],
    ["Sample Engineer B", "Assignment", "Due Fri", "warn"],
    ["Sample Engineer C", "Final chat", "Booked", "ok"],
  ] as const;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-muted">
        <span>Engineering · live</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> updated now
        </span>
      </div>
      {rows.map(([n, s, d, t]) => (
        <div key={n} className="grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-lg bg-card px-2.5 py-1.5">
          <span className="truncate">{n}</span>
          <span className="text-muted">{s}</span>
          <Pill tone={t}>{d}</Pill>
        </div>
      ))}
    </div>
  );
}

function BooleanBuilder() {
  return (
    <div className="space-y-2">
      <div className="rounded-lg bg-card px-2.5 py-2">
        <span className="text-muted">Role</span>
        <p className="mt-0.5 font-medium">Senior Backend Engineer · remote</p>
      </div>
      <div className="rounded-lg bg-ink px-2.5 py-2 font-mono text-[10px] leading-snug text-paper">
        (&quot;backend&quot; OR &quot;platform&quot;) AND (Go OR Rust) AND remote -recruiter
      </div>
      <div className="flex gap-1">
        {["Network A", "Network B", "Network C"].map((n) => (
          <span key={n} className="rounded-full bg-accent-2-soft px-2 py-0.5 text-accent-2">{n}</span>
        ))}
      </div>
    </div>
  );
}

function Outreach() {
  return (
    <div className="space-y-2">
      <div className="rounded-lg bg-card px-2.5 py-2">
        <p className="text-muted">To: Sample Candidate</p>
        <p className="mt-1">Loved your talk on sample topic. We&apos;re building something you might enjoy…</p>
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-dashed border-line px-2.5 py-1.5">
        <span className="text-gold">⏰</span>
        <span>No reply in 4 days · reminder queued</span>
      </div>
    </div>
  );
}

function Handover() {
  const items = [
    ["Open roles and next steps", true],
    ["Payroll run owner", true],
    ["Candidate follow-ups", true],
    ["Who to call for what", false],
  ] as const;
  return (
    <div className="space-y-1.5">
      <p className="font-serif text-sm font-medium">Handover · sample week</p>
      {items.map(([t, done]) => (
        <div key={t} className="flex items-center gap-2">
          <span className={`flex h-3.5 w-3.5 items-center justify-center rounded ${done ? "bg-accent-2 text-white" : "border border-line"}`}>
            {done ? "✓" : ""}
          </span>
          <span className={done ? "" : "text-muted"}>{t}</span>
        </div>
      ))}
    </div>
  );
}

function OrgChart() {
  const Node = ({ label, tone }: { label: string; tone: string }) => (
    <span className={`rounded-md px-2 py-1 text-center text-[10px] font-medium ${tone}`}>{label}</span>
  );
  return (
    <div className="flex flex-col items-center gap-2">
      <Node label="Lead A" tone="bg-accent text-white" />
      <span className="h-3 w-px bg-line" />
      <div className="flex gap-2">
        <Node label="Lead B" tone="bg-card" />
        <Node label="Lead C" tone="bg-card" />
        <Node label="Lead D" tone="bg-card" />
      </div>
      <div className="flex gap-1.5">
        <Node label="+ joiner" tone="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" />
        <Node label="synced ✓" tone="bg-accent-2-soft text-accent-2" />
      </div>
    </div>
  );
}

function Onboarding() {
  return (
    <div className="space-y-2">
      <div className="rounded-lg bg-card px-2.5 py-2">
        <p>👋 Welcome, Sample Joiner! Here&apos;s everything for day one…</p>
      </div>
      <div className="flex items-center gap-1">
        {["Day 1", "Week 1", "Month 1", "Graduate"].map((s, i) => (
          <span key={s} className={`flex-1 rounded-md py-1 text-center ${i < 2 ? "bg-accent text-white" : "bg-paper-2 text-muted"}`}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

const map: Record<Kind, () => React.ReactElement> = {
  payroll: Payroll,
  review: Review,
  pipeline: Pipeline,
  report: Report,
  playbook: Playbook,
  sourcing: Sourcing,
  candidates: Candidates,
  boolean: BooleanBuilder,
  outreach: Outreach,
  handover: Handover,
  orgchart: OrgChart,
  onboarding: Onboarding,
};

export function Mockup({ kind }: { kind: Kind }) {
  const Inner = map[kind];
  return (
    <Frame kind={kind}>
      <Inner />
    </Frame>
  );
}
