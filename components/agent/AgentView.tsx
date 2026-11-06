import Link from "next/link";
import AgentChat from "@/components/agent/AgentChat";
import EngineeringWorkspace from "@/components/agent/EngineeringWorkspace";
import EvidenceChip, { evidenceMeaning } from "@/components/agent/EvidenceChip";
import ToolBench from "@/components/agent/ToolBench";
import { InteriorHero, InteriorSection, StageLabel } from "@/components/interior";
import FaqAccordion from "@/components/seo/FaqAccordion";
import { agentPage, agentPageFaqs, agentPath, agentStatusNote } from "@/lib/agent-page";
import type { EvidenceLabel } from "@/lib/agent/tools/engineering";

const evidenceOrder: EvidenceLabel[] = ["calculated", "estimated", "assumed", "needs site check"];

function LivenessPanel() {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-2">
      <p className="px-3 pb-1 pt-2 font-mono text-[10.5px] uppercase tracking-widest text-white/55">What is live on this page</p>
      <ul className="divide-y divide-white/[0.07]">
        {agentPage.liveness.map((row) => (
          <li key={row.title} className="flex items-start gap-3 px-3 py-3.5">
            <StageLabel kind={row.kind} label={row.label} tone="dark" className="mt-0.5 w-[5.5rem] justify-center" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">{row.title}</p>
              <p className="mt-0.5 text-[13px] leading-snug text-white/65">{row.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="flex items-center gap-2 px-3 pb-2 pt-1 text-xs text-white/55">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-300" />
        {agentStatusNote}
      </p>
    </div>
  );
}

export default function AgentView() {
  const p = agentPage;

  return (
    <>
      <InteriorHero
        tone="graphite"
        eyebrow={p.hero.eyebrow}
        title={p.hero.title}
        lead={p.hero.lead}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Precifarm Agent", href: agentPath },
        ]}
        actions={p.hero.actions}
        media={<LivenessPanel />}
        facts={p.hero.facts}
      />

      <InteriorSection id={p.workspace.id} tone="silver" eyebrow={p.workspace.eyebrow} title={p.workspace.title} lead={p.workspace.lead}>
        <EngineeringWorkspace />
      </InteriorSection>

      <InteriorSection
        id={p.tryIt.id}
        tone="graphite"
        eyebrow={p.tryIt.eyebrow}
        title={p.tryIt.title}
        lead={p.tryIt.lead}
      >
        <AgentChat compact />
      </InteriorSection>

      <InteriorSection id={p.kernel.id} eyebrow={p.kernel.eyebrow} title={p.kernel.title} lead={p.kernel.lead}>
        <ol className="mb-10 grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border sm:grid-cols-3 lg:grid-cols-6">
          {p.kernel.pipeline.map((step, i) => (
            <li key={step.title} className="relative bg-white px-4 py-4">
              <p className="font-mono text-[11px] text-charge-600">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1.5 text-sm font-semibold text-forest-900">{step.title}</p>
              <p className="mt-1 text-[13px] leading-snug text-forest-600">{step.text}</p>
            </li>
          ))}
        </ol>
        <ToolBench />
      </InteriorSection>

      <InteriorSection id={p.modes.id} tone="silver" eyebrow={p.modes.eyebrow} title={p.modes.title} lead={p.modes.lead}>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ol className="overflow-hidden rounded-2xl bg-white ring-1 ring-border">
            {p.modes.items.map((m, i) => (
              <li key={m.mode} className={`flex items-start gap-4 px-5 py-4 ${i ? "border-t border-border" : ""}`}>
                <span className="w-12 shrink-0 font-mono text-sm font-semibold text-forest-900">{m.mode}</span>
                <p className="min-w-0 flex-1 text-sm leading-relaxed text-forest-600">{m.text}</p>
                <StageLabel kind={m.status} label={m.statusLabel} />
              </li>
            ))}
          </ol>
          <div>
            <h3 className="text-base font-semibold text-forest-900">Evidence labels on every result</h3>
            <dl className="mt-4 space-y-3">
              {evidenceOrder.map((l) => (
                <div key={l} className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-4">
                  <dt className="sm:w-36 sm:shrink-0 sm:pt-0.5">
                    <EvidenceChip label={l} tone="light" />
                  </dt>
                  <dd className="text-sm leading-relaxed text-forest-600">{evidenceMeaning[l]}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm leading-relaxed text-forest-600">
              Precifarm Agent speeds up design. It does not replace a qualified professional: safety-critical work is confirmed on site and signed off by
              an engineer.
            </p>
          </div>
        </div>
      </InteriorSection>

      <InteriorSection
        id={p.roadmap.id}
        eyebrow={p.roadmap.eyebrow}
        title={p.roadmap.title}
        aside={
          <Link href={p.roadmap.researchHref} className="inline-flex min-h-11 items-center text-sm font-semibold text-charge-600 hover:text-charge-700">
            {p.roadmap.researchLabel} <span aria-hidden className="ml-1">›</span>
          </Link>
        }
      >
        <div className="grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border lg:grid-cols-3">
          {p.roadmap.columns.map((col) => (
            <div key={col.title} className="bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-forest-900">{col.title}</h3>
                <StageLabel kind={col.kind} />
              </div>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-forest-600">
                    <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-forest-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </InteriorSection>

      <InteriorSection id="faq" tone="silver" width="narrow" eyebrow="FAQ" title="Common questions.">
        <FaqAccordion items={[...agentPageFaqs]} />
      </InteriorSection>
    </>
  );
}
