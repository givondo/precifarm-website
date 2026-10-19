import type { ComponentType } from "react";
import Link from "next/link";
import AgentStackDiagram from "@/components/research/diagrams/AgentStackDiagram";
import HubEnergyResearchDiagram from "@/components/research/diagrams/HubEnergyResearchDiagram";
import ResearchHeroVisual from "@/components/research/diagrams/ResearchHeroVisual";
import WirelessWptDiagram from "@/components/research/diagrams/WirelessWptDiagram";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqAccordion from "@/components/seo/FaqAccordion";
import PageCTA from "@/components/ui/PageCTA";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  type GateId,
  type MilestoneStatus,
  type ResearchArea,
  researchAreas,
  researchCollaboration,
  researchGates,
  researchGoals,
  researchNavLabel,
  researchPage,
  researchPageFaqs,
  researchPath,
  researchRoadmap,
} from "@/lib/research-page";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: researchNavLabel, href: researchPath },
];

const gateOrder: GateId[] = ["G0", "G1", "G2", "G3", "G4"];

const statusStyle: Record<MilestoneStatus, { dot: string; label: string; text: string }> = {
  done: { dot: "bg-charge-500 border-charge-500", label: "Done", text: "text-forest-700" },
  active: { dot: "bg-white border-charge-500 ring-4 ring-charge-500/15", label: "In progress", text: "text-forest-900 font-medium" },
  next: { dot: "bg-white border-forest-300", label: "Next", text: "text-forest-600" },
  later: { dot: "bg-muted border-border", label: "Later", text: "text-forest-500" },
};

function ProgressBar({ value, towards }: { value: number; towards: GateId }) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-sm font-semibold text-forest-900">{clamped}%</span>
        <span className="text-xs text-forest-500">toward {towards}</span>
      </div>
      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progress toward gate ${towards}: ${clamped} percent`}
      >
        <div className="h-full rounded-full bg-charge-500" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}

/** Five-step gate tracker. Gates before `towards` are passed; `towards` is current. */
function GateTracker({ towards }: { towards: GateId }) {
  const current = gateOrder.indexOf(towards);
  return (
    <ol className="grid grid-cols-5 gap-1" aria-label={`Working toward gate ${towards}`}>
      {gateOrder.map((g, i) => {
        const passed = i < current;
        const isCurrent = i === current;
        return (
          <li key={g} className="min-w-0">
            <div
              className={`h-1.5 rounded-full ${
                passed ? "bg-charge-500" : isCurrent ? "bg-charge-500/40" : "bg-muted"
              }`}
            />
            <p
              className={`mt-1.5 font-mono text-[10px] uppercase tracking-wider ${
                passed || isCurrent ? "text-forest-800" : "text-forest-400"
              }`}
            >
              {g}
              <span className="sr-only">{passed ? " passed" : isCurrent ? " current" : " ahead"}</span>
            </p>
          </li>
        );
      })}
    </ol>
  );
}

const programmeDiagrams: Partial<Record<string, ComponentType>> = {
  "wireless-ev": WirelessWptDiagram,
  "precifarm-agent": AgentStackDiagram,
  "hub-energy": HubEnergyResearchDiagram,
};

function ProgrammeCard({ area }: { area: ResearchArea }) {
  const Diagram = programmeDiagrams[area.id];
  return (
    <article id={area.id} className="card scroll-mt-24 overflow-hidden">
      <header className="border-b border-border p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-forest-900 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white">
            {area.horizon}
          </span>
          <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-forest-600">
            {area.stage}
          </span>
        </div>
        <h3 className="heading-display mt-3 text-xl text-forest-900 sm:text-2xl">{area.title}</h3>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-forest-700">{area.question}</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <ProgressBar value={area.progress} towards={area.workingTowards} />
          <GateTracker towards={area.workingTowards} />
        </div>
      </header>

      <div className="grid gap-px bg-border lg:grid-cols-[1.1fr_1fr]">
        <div className="bg-white p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-forest-600">{area.summary}</p>

          <div className="mt-6 rounded-xl border border-charge-500/25 bg-charge-500/[0.05] p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-charge-600">Goal</p>
            <p className="mt-1.5 text-sm font-medium leading-relaxed text-forest-900">{area.goal}</p>
          </div>

          <p className="mt-6 font-mono text-[10px] font-semibold uppercase tracking-widest text-forest-500">
            Targets, not results
          </p>
          <dl className="mt-2 divide-y divide-border rounded-xl border border-border">
            {area.targets.map((t) => (
              <div key={t.label} className="flex items-baseline justify-between gap-4 px-4 py-2.5">
                <dt className="text-sm text-forest-600">{t.label}</dt>
                <dd className="text-right font-mono text-sm font-semibold text-forest-900">{t.value}</dd>
              </div>
            ))}
          </dl>

          {Diagram ? (
            <div className="mt-6">
              <Diagram />
            </div>
          ) : null}
        </div>

        <div className="bg-white p-6 sm:p-8">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-forest-500">
            Path to the goal
          </p>
          <ol className="relative mt-4 space-y-4 border-l border-border pl-5">
            {area.milestones.map((m) => {
              const s = statusStyle[m.status];
              return (
                <li key={`${m.when}-${m.title}`} className="relative">
                  <span
                    className={`absolute -left-[26.5px] top-1 h-3 w-3 rounded-full border-2 ${s.dot}`}
                    aria-hidden
                  />
                  <p className="font-mono text-[11px] text-forest-500">
                    {m.when} · <span className="uppercase tracking-wider">{s.label}</span>
                  </p>
                  <p className={`mt-0.5 text-sm leading-snug ${s.text}`}>{m.title}</p>
                </li>
              );
            })}
          </ol>

          <p className="mt-8 font-mono text-[10px] font-semibold uppercase tracking-widest text-forest-500">
            What it needs
          </p>
          <ul className="mt-3 space-y-2">
            {area.needs.map((n) => (
              <li key={n} className="flex gap-2 text-sm leading-snug text-forest-600">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-forest-400" aria-hidden />
                {n}
              </li>
            ))}
          </ul>

          {area.href && area.hrefLabel ? (
            <Link href={area.href} className="btn-secondary mt-6 inline-flex text-sm">
              {area.hrefLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function ResearchView() {
  const page = researchPage;

  return (
    <>
      <section className="page-hero border-b border-border">
        <div className="page-hero-split">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1fr_minmax(280px,420px)] lg:gap-14">
            <div>
              <p className="text-eyebrow">{page.hero.eyebrow}</p>
              <h1 className="heading-display mt-3 text-[1.75rem] leading-[1.15] sm:text-3xl lg:text-4xl">
                {page.hero.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-forest-600 sm:text-lg">{page.hero.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={page.hero.primaryCta.href} className="btn-primary">
                  {page.hero.primaryCta.label}
                </a>
                <Link href={page.hero.secondaryCta.href} className="btn-secondary">
                  {page.hero.secondaryCta.label}
                </Link>
              </div>
              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6">
                {page.hero.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="text-xs leading-snug text-forest-500">{s.label}</dt>
                    <dd className="mt-1 font-mono text-lg font-bold tracking-tight text-forest-900">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ResearchHeroVisual />
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="border-b border-forest-900 bg-forest-900 section-pad text-white">
        <div className="page-container">
          <SectionHeader inverted eyebrow={page.goals.eyebrow} title={page.goals.title} description={page.goals.description} />
          <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {researchGoals.map((g) => (
              <li key={g.title} className="bg-forest-900 p-5 sm:p-6">
                <p className="font-mono text-xs font-semibold text-charge-300">{g.year}</p>
                <h3 className="mt-2 text-base font-semibold text-white">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{g.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Method */}
      <section className="border-b border-border bg-muted/25 section-pad">
        <div className="page-container">
          <SectionHeader eyebrow={page.method.eyebrow} title={page.method.title} description={page.method.description} />
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {researchGates.map((g) => (
              <li key={g.id} className="card p-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-sm font-bold text-charge-600">{g.id}</span>
                  <span className="text-base font-semibold text-forest-900">{g.name}</span>
                </div>
                <p className="mt-2 text-sm font-medium text-forest-700">{g.question}</p>
                <p className="mt-2 text-sm leading-relaxed text-forest-600">{g.exit}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Programmes */}
      <section id={page.programmes.id} className="scroll-mt-24 border-b border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader eyebrow={page.programmes.eyebrow} title={page.programmes.title} />
          <nav aria-label="Jump to programme" className="mt-6 flex flex-wrap gap-2">
            {researchAreas.map((a) => (
              <a
                key={a.id}
                href={`#${a.id}`}
                className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-forest-700 hover:border-charge-500 hover:text-forest-900"
              >
                {a.title}
              </a>
            ))}
          </nav>
          <div className="mt-10 space-y-8">
            {researchAreas.map((area) => (
              <ProgrammeCard key={area.id} area={area} />
            ))}
          </div>
          <p className="mt-8 text-sm text-forest-500">{page.note}</p>
        </div>
      </section>

      {/* Roadmap */}
      <section id={page.roadmap.id} className="scroll-mt-24 border-b border-border bg-muted/25 section-pad">
        <div className="page-container">
          <SectionHeader eyebrow={page.roadmap.eyebrow} title={page.roadmap.title} description={page.roadmap.description} />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th scope="col" className="px-4 py-3 font-semibold text-forest-900">
                    Programme
                  </th>
                  {researchRoadmap.columns.map((c) => (
                    <th key={c.id} scope="col" className="px-4 py-3">
                      <span className="block font-semibold text-forest-900">{c.label}</span>
                      <span className="block font-mono text-[11px] font-normal text-forest-500">{c.window}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {researchRoadmap.rows.map((r) => (
                  <tr key={r.programme} className="align-top">
                    <th scope="row" className="px-4 py-3 font-medium text-forest-900">
                      {r.programme}
                    </th>
                    <td className="px-4 py-3 leading-snug text-forest-700">{r.Now}</td>
                    <td className="px-4 py-3 leading-snug text-forest-600">{r.Next}</td>
                    <td className="px-4 py-3 leading-snug text-forest-500">{r.Later}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Collaboration */}
      <section className="border-b border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow={page.collaboration.eyebrow}
            title={page.collaboration.title}
            description={page.collaboration.description}
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {researchCollaboration.map((c) => (
              <li key={c.who} className="card p-6">
                <h3 className="text-base font-semibold text-forest-900">{c.who}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-600">{c.offer}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30 section-pad">
        <div className="page-container max-w-3xl">
          <SectionHeader eyebrow="FAQ" title="Quick answers" />
          <div className="mt-8">
            <FaqAccordion items={researchPageFaqs} />
          </div>
        </div>
      </section>

      <PageCTA
        title={page.cta.title}
        description={page.cta.description}
        primaryHref={page.cta.primaryHref}
        primaryLabel={page.cta.primaryLabel}
        secondaryHref={page.cta.secondaryHref}
        secondaryLabel={page.cta.secondaryLabel}
      />
    </>
  );
}
