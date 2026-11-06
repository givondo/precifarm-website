import Link from "next/link";
import { CalloutNote, InteriorHero, InteriorSection } from "@/components/interior";
import OpenOnHash from "@/components/research/OpenOnHash";
import WptLab from "@/components/research/WptLab";
import FaqAccordion from "@/components/seo/FaqAccordion";
import {
  type GateId,
  type MilestoneStatus,
  researchAreas,
  researchCollaboration,
  researchGates,
  researchGoals,
  researchNavLabel,
  researchPage,
  researchPageFaqs,
  researchPath,
  researchRoadmap,
  wirelessEvidence,
} from "@/lib/research-page";
import { wirelessChargingPolicyPath } from "@/lib/wireless-charging-policy-page";

const gateOrder: GateId[] = ["G0", "G1", "G2", "G3", "G4"];

const milestoneStyle: Record<MilestoneStatus, { dot: string; label: string; text: string }> = {
  done: { dot: "bg-charge-600 border-charge-600", label: "Done", text: "text-forest-700" },
  active: { dot: "bg-white border-charge-600 ring-4 ring-charge-600/15", label: "In progress", text: "text-forest-900 font-medium" },
  next: { dot: "bg-white border-forest-300", label: "Next", text: "text-forest-600" },
  later: { dot: "bg-[#eef0f2] border-forest-200", label: "Later", text: "text-forest-500" },
};

/** Programmes against gates: passed gates filled, the gate being worked towards shows progress. */
function GateBoard() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-border">
      <div className="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[13rem_minmax(0,1fr)]">
        <div className="hidden border-b border-border bg-[#f6f7f8] sm:block" />
        <ol className="grid grid-cols-5 border-b border-border bg-[#f6f7f8]">
          {researchGates.map((g) => (
            <li key={g.id} className="border-l border-border px-2 py-3 first:border-l-0 sm:px-3">
              <p className="font-mono text-xs font-semibold text-charge-600">{g.id}</p>
              <p className="text-[12px] font-semibold text-forest-900 sm:text-sm">{g.name}</p>
              <p className="mt-0.5 hidden text-[12px] leading-snug text-forest-500 lg:block">{g.question}</p>
            </li>
          ))}
        </ol>
        {researchAreas.map((a) => {
          const current = gateOrder.indexOf(a.workingTowards);
          return (
            <div key={a.id} className="contents">
              <a href={`#${a.id}`} className="border-t border-border px-4 pt-3 text-sm font-semibold text-forest-900 hover:text-charge-600 sm:py-3">
                {a.title}
                <span className="mt-0.5 block text-[12px] font-normal text-forest-500">{a.stage}</span>
              </a>
              <ol className="grid grid-cols-5 items-center gap-1 px-2 pb-3 pt-2 sm:border-t sm:border-border sm:py-3" aria-label={`${a.title}: working towards ${a.workingTowards}, ${a.progress}% of the way`}>
                {gateOrder.map((g, i) => {
                  const passed = i < current;
                  const isCurrent = i === current;
                  return (
                    <li key={g} className="px-1">
                      <div className="h-2.5 overflow-hidden rounded-full bg-[#eef0f2]">
                        <div className={`h-full rounded-full ${passed ? "w-full bg-charge-600" : isCurrent ? "bg-charge-600/55" : "w-0"}`} style={isCurrent ? { width: `${a.progress}%` } : undefined} />
                      </div>
                      {isCurrent ? <p className="mt-1 font-mono text-[10.5px] text-forest-700">{a.progress}%</p> : <p className="mt-1 h-[15px]" aria-hidden />}
                      <span className="sr-only">{`${g} ${passed ? "passed" : isCurrent ? `in progress, ${a.progress}%` : "ahead"}`}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </div>
      <p className="border-t border-border px-4 py-3 text-xs text-forest-500">{researchPage.note} Progress is engineering completion toward the next gate, never traction or a launch date.</p>
    </div>
  );
}

export default function ResearchView() {
  const page = researchPage;

  return (
    <>
      <OpenOnHash />
      <InteriorHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        lead={page.hero.lead}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: researchNavLabel, href: researchPath },
        ]}
        actions={page.hero.actions}
        facts={page.hero.stats}
      />

      <InteriorSection id={page.lab.id} tone="graphite" eyebrow={page.lab.eyebrow} title={page.lab.title} lead={page.lab.lead}>
        <WptLab />
      </InteriorSection>

      <InteriorSection
        id={page.evidence.id}
        eyebrow={page.evidence.eyebrow}
        title={page.evidence.title}
        lead={page.evidence.lead}
        aside={
          <Link href={wirelessChargingPolicyPath} className="inline-flex min-h-11 items-center text-sm font-semibold text-charge-600 hover:text-charge-700">
            Wireless R&amp;D policy <span aria-hidden className="ml-1">›</span>
          </Link>
        }
      >
        <ol className="grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border md:grid-cols-2">
          {wirelessEvidence.map((e, i) => (
            <li key={e.item} className="flex gap-4 bg-white p-4 sm:p-5 md:[&:last-child:nth-child(odd)]:col-span-2">
              <span className="font-mono text-[11px] text-forest-400">{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-[15px] font-semibold text-forest-900">{e.item}</h3>
                  <span className="rounded-full bg-forest-950 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-white">{e.gate}</span>
                </div>
                <p className="mt-1 text-[13px] font-medium text-amber-800">{e.status}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-forest-600">{e.needed}</p>
              </div>
            </li>
          ))}
        </ol>
      </InteriorSection>

      <InteriorSection id={page.gates.id} tone="silver" eyebrow={page.gates.eyebrow} title={page.gates.title} lead={page.gates.lead}>
        <GateBoard />
        <ol className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border sm:grid-cols-2 lg:grid-cols-5">
          {researchGates.map((g) => (
            <li key={g.id} className="bg-white p-4 sm:p-5">
              <p className="flex items-baseline gap-2">
                <span className="font-mono text-sm font-bold text-charge-600">{g.id}</span>
                <span className="font-semibold text-forest-900">{g.name}</span>
              </p>
              <p className="mt-1.5 text-sm font-medium text-forest-700">{g.question}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-forest-600">
                <span className="font-semibold text-forest-700">Exit: </span>
                {g.exit}
              </p>
            </li>
          ))}
        </ol>
      </InteriorSection>

      <InteriorSection id={page.programmes.id} eyebrow={page.programmes.eyebrow} title={page.programmes.title}>
        <div className="space-y-3">
          {researchAreas.map((area, idx) => (
            <details key={area.id} id={area.id} open={idx === 0} className="group scroll-mt-28 overflow-hidden rounded-2xl bg-white ring-1 ring-border open:ring-forest-300">
              <summary className="flex cursor-pointer list-none flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 [&::-webkit-details-marker]:hidden">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#f1f3f4] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-forest-600">{area.horizon}</span>
                    <span className="font-mono text-[11px] text-forest-500">
                      towards {area.workingTowards} · {area.progress}%
                    </span>
                  </div>
                  <h3 className="heading-display mt-2 text-lg text-forest-900 sm:text-xl">{area.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-forest-600">{area.question}</p>
                </div>
                <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center self-end rounded-full ring-1 ring-border transition-transform group-open:rotate-45 sm:self-center">
                  +
                </span>
              </summary>
              <div className="grid gap-px border-t border-border bg-border lg:grid-cols-[1.1fr_1fr]">
                <div className="bg-white p-5 sm:p-6">
                  <p className="text-sm leading-relaxed text-forest-600">{area.summary}</p>
                  <div className="mt-5">
                    <CalloutNote title="Goal">{area.goal}</CalloutNote>
                  </div>
                  <dl className="mt-5 divide-y divide-border rounded-xl ring-1 ring-border">
                    {area.targets.map((t) => (
                      <div key={t.label} className="grid gap-1 px-4 py-2.5 sm:grid-cols-2 sm:gap-4">
                        <dt className="text-sm text-forest-600">{t.label}</dt>
                        <dd className="text-sm font-semibold text-forest-900 sm:text-right">{t.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="bg-white p-5 sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Path to the goal</p>
                  <ol className="relative mt-4 space-y-4 border-l border-border pl-5">
                    {area.milestones.map((m) => {
                      const s = milestoneStyle[m.status];
                      return (
                        <li key={`${m.when}-${m.title}`} className="relative">
                          <span className={`absolute -left-[26.5px] top-1 h-3 w-3 rounded-full border-2 ${s.dot}`} aria-hidden />
                          <p className="font-mono text-[11px] text-forest-500">
                            {m.when} · {s.label}
                          </p>
                          <p className={`mt-0.5 text-sm leading-snug ${s.text}`}>{m.title}</p>
                        </li>
                      );
                    })}
                  </ol>
                  <p className="mt-6 text-[11px] font-semibold uppercase tracking-widest text-forest-500">What it needs</p>
                  <ul className="mt-2 space-y-1.5">
                    {area.needs.map((n) => (
                      <li key={n} className="flex gap-2 text-sm leading-snug text-forest-600">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-forest-300" aria-hidden />
                        {n}
                      </li>
                    ))}
                  </ul>
                  {area.href && area.hrefLabel ? (
                    <Link href={area.href} className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-charge-600 hover:text-charge-700">
                      {area.hrefLabel} <span aria-hidden className="ml-1">›</span>
                    </Link>
                  ) : null}
                </div>
              </div>
            </details>
          ))}
        </div>
      </InteriorSection>

      <InteriorSection tone="graphite" eyebrow={page.goals.eyebrow} title={page.goals.title} lead={page.goals.description}>
        <ol className="grid gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {researchGoals.map((g) => (
            <li key={g.title} className="bg-forest-950 p-5 sm:p-6">
              <p className="font-mono text-xs font-semibold text-brand-300">{g.year}</p>
              <h3 className="mt-2 text-base font-semibold text-white">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{g.text}</p>
            </li>
          ))}
        </ol>
      </InteriorSection>

      <InteriorSection id={page.roadmap.id} tone="silver" eyebrow={page.roadmap.eyebrow} title={page.roadmap.title} lead={page.roadmap.description}>
        <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-border" tabIndex={0} role="region" aria-label={`${page.roadmap.title} (scrolls sideways)`}>
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-[#f6f7f8]">
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
      </InteriorSection>

      <InteriorSection
        id={page.collaboration.id}
        eyebrow={page.collaboration.eyebrow}
        title={page.collaboration.title}
        lead={page.collaboration.description}
        aside={
          <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full bg-charge-600 px-6 text-sm font-semibold text-white hover:bg-charge-500">
            Contact R&amp;D
          </Link>
        }
      >
        <ul className="grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border sm:grid-cols-2">
          {researchCollaboration.map((c) => (
            <li key={c.who} className="bg-white p-5 sm:p-6">
              <h3 className="text-base font-semibold text-forest-900">{c.who}</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-600">{c.offer}</p>
            </li>
          ))}
        </ul>
      </InteriorSection>

      <InteriorSection id="faq" tone="silver" width="narrow" eyebrow="FAQ" title="Quick answers.">
        <FaqAccordion items={researchPageFaqs} />
      </InteriorSection>
    </>
  );
}
