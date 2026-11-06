import Link from "next/link";
import { CalloutNote, InPageNav, InteriorHero, InteriorSection } from "@/components/interior";
import {
  checkableFigures,
  circularitySteps,
  evidenceClasses,
  goalProgressLabel,
  pendingMeasures,
  peopleRows,
  reportingPublished,
  sustainabilityGoalsOrdered,
  sustainabilityPage,
  sustainabilitySectionNav,
  type EvidenceClass,
  type GoalProgress,
} from "@/lib/sustainability-page";

const evidenceStyle: Record<EvidenceClass, string> = {
  checkable: "bg-white text-forest-800 ring-forest-300",
  target: "bg-forest-950 text-white ring-forest-950",
  pending: "bg-[repeating-linear-gradient(135deg,#f6f7f8_0_6px,#eceef0_6px_12px)] text-forest-700 ring-forest-200",
};

function EvidenceTag({ kind }: { kind: EvidenceClass }) {
  return (
    <span
      title={evidenceClasses[kind].text}
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase leading-none tracking-wide ring-1 ring-inset ${evidenceStyle[kind]}`}
    >
      {evidenceClasses[kind].label}
    </span>
  );
}

const progressStyle: Record<GoalProgress, string> = {
  done: "text-charge-700",
  estimate: "text-forest-700",
  planned: "text-forest-500",
};

function EvidencePanel() {
  const goals = sustainabilityGoalsOrdered.length;
  const rows = [
    { kind: "checkable" as const, count: String(checkableFigures.length), text: "published figures and labels" },
    { kind: "target" as const, count: String(goals + 1), text: "targets: six for 2030, one for 2050" },
    { kind: "pending" as const, count: String(pendingMeasures.length), text: "impact figures waiting on a method" },
  ];
  return (
    <div className="rounded-[1.75rem] bg-forest-950 p-6 text-white sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-300">Evidence on this page</p>
      <ul className="mt-5 divide-y divide-white/10">
        {rows.map((r) => (
          <li key={r.kind} className="grid grid-cols-[3.5rem_minmax(0,1fr)] items-baseline gap-3 py-4">
            <span className="font-display text-3xl font-semibold tracking-tight">{r.count}</span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{evidenceClasses[r.kind].label}</span>
              <span className="block text-sm text-white/65">{r.text}</span>
            </span>
          </li>
        ))}
        <li className="grid grid-cols-[3.5rem_minmax(0,1fr)] items-baseline gap-3 pt-4">
          <span className="font-display text-3xl font-semibold tracking-tight text-white/45">0</span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold">Measured operational results</span>
            <span className="block text-sm text-white/65">No Precifarm charging site is commissioned yet.</span>
          </span>
        </li>
      </ul>
    </div>
  );
}

export default function SustainabilityView() {
  const page = sustainabilityPage;

  return (
    <>
      <InteriorHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.headline}
        lead={page.hero.lead}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Sustainability", href: "/sustainability" },
        ]}
        actions={[
          { href: page.hero.primaryCta.href, label: page.hero.primaryCta.label, variant: "primary" },
          { href: page.hero.secondaryCta.href, label: page.hero.secondaryCta.label, variant: "secondary" },
        ]}
        media={<EvidencePanel />}
      />

      <InPageNav links={sustainabilitySectionNav} />

      <InteriorSection id="evidence" eyebrow={page.evidenceSection.eyebrow} title={page.evidenceSection.title} lead={page.evidenceSection.lead}>
        <dl className="grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border md:grid-cols-3">
          {(Object.keys(evidenceClasses) as EvidenceClass[]).map((k) => (
            <div key={k} className="bg-white p-5 sm:p-6">
              <dt>
                <EvidenceTag kind={k} />
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-forest-700">{evidenceClasses[k].text}</dd>
            </div>
          ))}
        </dl>
      </InteriorSection>

      <InteriorSection id="today" tone="silver" eyebrow={page.todaySection.eyebrow} title={page.todaySection.title} lead={page.todaySection.lead}>
        <ul className="grid gap-4 sm:grid-cols-2">
          {checkableFigures.map((f) => (
            <li key={f.label} className="flex flex-col rounded-2xl bg-white p-5 ring-1 ring-border sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <p className="font-display text-2xl font-semibold tracking-tight text-forest-950 sm:text-[1.75rem]">{f.value}</p>
                <EvidenceTag kind="checkable" />
              </div>
              <p className="mt-1 text-sm font-semibold text-forest-800">{f.label}</p>
              <dl className="mt-4 space-y-3 border-t border-border pt-4 text-sm">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Basis</dt>
                  <dd className="mt-1 leading-relaxed text-forest-700">{f.basis}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Limits</dt>
                  <dd className="mt-1 leading-relaxed text-forest-700">{f.caveat}</dd>
                </div>
              </dl>
              <Link href={f.href} className="mt-auto inline-flex min-h-11 items-center pt-4 text-sm font-semibold text-charge-700 hover:underline">
                {f.link} ›
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Also published on the site</p>
          <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl bg-white ring-1 ring-border">
            {reportingPublished.map((r) => (
              <li key={r.id}>
                <Link href={r.href} className="group grid gap-1 px-5 py-3.5 sm:grid-cols-[16rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6">
                  <span className="font-semibold text-forest-950 group-hover:text-charge-700">{r.title}</span>
                  <span className="text-sm text-forest-600">{r.detail}</span>
                  <span aria-hidden className="hidden text-forest-300 group-hover:text-charge-600 sm:block">
                    ›
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </InteriorSection>

      <InteriorSection id="goals" eyebrow={page.goalsSection.eyebrow} title={page.goalsSection.title} lead={page.goalsSection.lead}>
        <ol className="divide-y divide-border border-y border-border">
          {sustainabilityGoalsOrdered.map((g) => (
            <li key={g.id} className="grid gap-4 py-6 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1fr)_9rem] md:gap-6">
              <span className="font-mono text-sm text-forest-400">{g.id.padStart(2, "0")}</span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">{g.theme}</p>
                <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-forest-950">{g.shortName}</h3>
                <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-forest-700">
                  <EvidenceTag kind="target" />
                  <span>
                    {g.target}, by {g.by}.
                  </span>
                </p>
              </div>
              <div className="min-w-0 rounded-xl bg-[#f6f7f8] p-4 text-sm ring-1 ring-border md:bg-transparent md:p-0 md:ring-0">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Today</p>
                <p className="mt-1 leading-relaxed text-forest-700">{g.today}</p>
              </div>
              <p className={`text-sm font-semibold md:text-right ${progressStyle[g.progress]}`}>
                <span className="sr-only">Status: </span>
                {goalProgressLabel[g.progress]}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-6 overflow-hidden rounded-[1.75rem] bg-forest-950 p-6 text-white sm:p-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-300">{page.ambition.title}</p>
            <p className="heading-display heading-inverted mt-3 text-4xl sm:text-5xl">{page.ambition.value}</p>
            <p className="mt-2 text-sm text-white/65">Electric kilometres replacing fossil-fuel kilometres, by 2050</p>
          </div>
          <div>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10">
              <div className="bg-forest-950 p-4">
                <dt className="text-[11px] uppercase tracking-widest text-white/55">Status</dt>
                <dd className="mt-1 font-semibold">Target</dd>
              </div>
              <div className="bg-forest-950 p-4">
                <dt className="text-[11px] uppercase tracking-widest text-white/55">Running total</dt>
                <dd className="mt-1 font-semibold">Not reported</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-white/72">{page.ambition.text}</p>
          </div>
        </div>
      </InteriorSection>

      <InteriorSection id="methods" tone="silver" eyebrow={page.methodsSection.eyebrow} title={page.methodsSection.title} lead={page.methodsSection.lead}>
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-border">
          <div className="hidden grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_9rem] gap-6 border-b border-border bg-[#fbfbfc] px-5 py-3 text-[11px] font-semibold uppercase tracking-widest text-forest-500 lg:grid">
            <span>Future figure</span>
            <span>What it will measure</span>
            <span>Needed first</span>
            <span>Status</span>
          </div>
          <ul className="divide-y divide-border">
            {pendingMeasures.map((m) => (
              <li key={m.id} className="grid gap-2 px-5 py-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_9rem] lg:items-start lg:gap-6">
                <p className="font-semibold text-forest-950">{m.title}</p>
                <p className="text-sm leading-relaxed text-forest-700">{m.measure}</p>
                <p className="text-sm leading-relaxed text-forest-700">
                  <span className="font-semibold text-forest-900 lg:hidden">Needed first: </span>
                  {m.prerequisite}
                </p>
                <p>
                  <EvidenceTag kind="pending" />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </InteriorSection>

      <InteriorSection id="batteries" eyebrow={page.batteriesSection.eyebrow} title={page.batteriesSection.title} lead={page.batteriesSection.lead}>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0">
          {circularitySteps.map((s, i) => (
            <li key={s.step} className="relative flex flex-col rounded-2xl bg-[#f6f7f8] p-4 ring-1 ring-border lg:rounded-none lg:bg-transparent lg:p-0 lg:pr-5 lg:ring-0">
              <div aria-hidden className="mb-4 hidden items-center lg:flex">
                <span className={`h-3 w-3 shrink-0 rounded-full ${s.kind === "target" ? "border-2 border-forest-950 bg-white" : "bg-charge-600"}`} />
                {i < circularitySteps.length - 1 ? <span className={`h-px flex-1 ${s.kind === "target" ? "border-t border-dashed border-forest-300" : "bg-forest-300"}`} /> : null}
              </div>
              <p className="font-mono text-[11px] text-forest-500">{s.step}</p>
              <h3 className="mt-1 text-base font-semibold text-forest-950">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-forest-600">{s.text}</p>
              <p className="mt-3">{s.kind === "target" ? <EvidenceTag kind="target" /> : <span className="text-xs font-medium text-forest-500">Service practice</span>}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 max-w-3xl">
          <CalloutNote title="Why the last two steps are targets">
            Collection and recycling need a contracted partner in Kenya. None is signed yet, so these steps are shown as 2030 targets, not as a working service.
          </CalloutNote>
        </div>
      </InteriorSection>

      <InteriorSection id="people" tone="silver" eyebrow={page.peopleSection.eyebrow} title={page.peopleSection.title} lead={page.peopleSection.lead}>
        <ul className="grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border sm:grid-cols-2 lg:grid-cols-3">
          {peopleRows.map((p) => (
            <li key={p.who} className="flex flex-col bg-white p-5 sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">{p.who}</p>
              <h3 className="mt-2 text-base font-semibold text-forest-950">{p.benefit}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-forest-600">{p.text}</p>
              {"href" in p ? (
                <Link href={p.href} className="mt-auto inline-flex min-h-11 items-center pt-3 text-sm font-semibold text-charge-700 hover:underline">
                  {p.link} ›
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-forest-600">{page.sdgNote}</p>
      </InteriorSection>
    </>
  );
}
