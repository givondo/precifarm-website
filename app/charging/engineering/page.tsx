import type { Metadata } from "next";
import Link from "next/link";
import ArchitectureExplorer from "@/components/engineering/ArchitectureExplorer";
import AssessmentRequest from "@/components/engineering/AssessmentRequest";
import DeliverableSheet from "@/components/engineering/DeliverableSheet";
import { InPageNav, InteriorHero, InteriorSection, StageLabel } from "@/components/interior";
import FaqAccordion from "@/components/seo/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import { engineeringDoc } from "@/lib/engineering-doc";
import { architectures, deliverables, engineeringPage, engineeringPageFaqs, holdPoints, workflow } from "@/lib/engineering-page";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/charging/engineering");

const deliverableTitle = Object.fromEntries(deliverables.map((d) => [d.id, d.title]));

/** Hero visual: the layers every Precifarm site is engineered across. */
function SystemStack() {
  const layers = [
    { title: "Back office", text: "OCPP, metering, M-Pesa sessions", tone: "bg-[#eef3fb] ring-[#bcd0f0]" },
    { title: "Charging", text: "Pulse, Pulse+, ARC Corridor, Boda Hub", tone: "bg-forest-950 text-white ring-forest-950" },
    { title: "Solar and storage", text: "Only where the study calls for it", tone: "bg-white ring-forest-200 [border-style:dashed]" },
    { title: "Distribution and protection", text: "Boards, breakers, RCDs, cables, earthing", tone: "bg-white ring-border" },
    { title: "Grid connection", text: "Kenya Power supply and approvals", tone: "bg-[#f1f3f4] ring-border" },
  ];
  return (
    <figure className="rounded-[1.75rem] bg-[linear-gradient(160deg,#f6f7f8,#e9ecef)] p-5 ring-1 ring-border sm:p-7">
      <ol className="relative space-y-2.5">
        <span aria-hidden className="absolute bottom-6 left-6 top-6 w-px bg-forest-300" />
        {layers.map((l, i) => (
          <li key={l.title} className={`relative flex items-center gap-4 rounded-2xl px-4 py-3 ring-1 ${l.tone}`}>
            <span className={`relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] ${i === 1 ? "bg-brand-300 text-forest-950" : "bg-forest-950 text-white"}`}>
              {layers.length - i}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{l.title}</span>
              <span className={`block text-[12.5px] ${i === 1 ? "text-white/70" : "text-forest-600"}`}>{l.text}</span>
            </span>
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 flex items-center justify-between gap-3 text-xs text-forest-500">
        <span>Designed together, documented together.</span>
        <StageLabel kind="illustrative" label="Schematic" />
      </figcaption>
    </figure>
  );
}

export default function ChargingEngineeringPage() {
  const p = engineeringPage;

  return (
    <>
      <JsonLd data={pageJsonLd("/charging/engineering")} />
      <InteriorHero
        eyebrow={p.hero.eyebrow}
        title={p.hero.title}
        lead={p.hero.lead}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Charging", href: "/charging" },
          { name: "Engineering", href: "/charging/engineering" },
        ]}
        actions={[
          { href: `#${p.assessment.id}`, label: "Request an assessment" },
          { href: `#${p.deliverables.id}`, label: "What you receive", variant: "secondary" },
        ]}
        media={<SystemStack />}
        facts={[
          { value: String(architectures.length), label: "Site types" },
          { value: String(workflow.length), label: "Design stages" },
          { value: String(holdPoints.rows.length), label: "Approval hold points" },
          { value: String(deliverables.length), label: "Deliverable types" },
        ]}
      />
      <InPageNav
        links={[
          { href: `#${p.architectures.id}`, label: "Architectures" },
          { href: `#${p.workflow.id}`, label: "Workflow" },
          { href: `#${p.deliverables.id}`, label: "Deliverables" },
          { href: `#${p.document.id}`, label: "Design basis" },
          { href: "#faq", label: "FAQ" },
          { href: `#${p.assessment.id}`, label: "Request an assessment" },
        ]}
      />

      <InteriorSection id={p.architectures.id} eyebrow={p.architectures.eyebrow} title={p.architectures.title} lead={p.architectures.lead}>
        <ArchitectureExplorer />
      </InteriorSection>

      <InteriorSection id={p.workflow.id} tone="graphite" eyebrow={p.workflow.eyebrow} title={p.workflow.title} lead={p.workflow.lead}>
        <ol className="grid gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10 md:grid-cols-2 lg:grid-cols-3">
          {workflow.map((s, i) => (
            <li key={s.title} className="flex flex-col bg-forest-950 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-400/20 font-mono text-xs font-semibold text-brand-300 ring-1 ring-brand-400/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold text-white">{s.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{s.text}</p>
              <div className="mt-auto pt-4">
                {s.hold ? (
                  <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-amber-300/10 px-3 py-1 text-[12px] text-amber-100 ring-1 ring-amber-300/35">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                    Hold point: {s.hold}
                  </p>
                ) : null}
                {s.produces.length ? (
                  <ul className="flex flex-wrap gap-1.5" aria-label="Produces">
                    {s.produces.map((d) => (
                      <li key={d}>
                        <a href={`#${p.deliverables.id}`} className="inline-flex min-h-8 items-center rounded-md bg-white/[0.06] px-2.5 text-[12px] text-white/85 ring-1 ring-white/15 hover:ring-white/40">
                          {deliverableTitle[d]}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <h3 className="text-base font-semibold text-white">Kenya approval hold points</h3>
          <div className="mt-4 overflow-x-auto rounded-2xl ring-1 ring-white/10" tabIndex={0} role="region" aria-label="Kenya approval hold points (scrolls sideways)">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-white/[0.04]">
                <tr>
                  {holdPoints.columns.map((c) => (
                    <th key={c} scope="col" className="px-4 py-3 font-semibold text-white/80">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {holdPoints.rows.map((r) => (
                  <tr key={r[0]} className="border-t border-white/10">
                    <th scope="row" className="px-4 py-3 font-medium text-white">
                      {r[0]}
                    </th>
                    <td className="px-4 py-3 text-white/75">{r[1]}</td>
                    <td className="px-4 py-3 text-white/75">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-white/55">{holdPoints.caption}</p>
        </div>
      </InteriorSection>

      <InteriorSection id={p.deliverables.id} tone="silver" eyebrow={p.deliverables.eyebrow} title={p.deliverables.title} lead={p.deliverables.lead} aside={<StageLabel kind="illustrative" label="Sample layouts" />}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((d, i) => (
            <DeliverableSheet key={d.id} id={d.id} index={i} title={d.title} text={d.text} fields={d.fields} />
          ))}
          <div className="flex flex-col gap-2 self-start rounded-2xl bg-forest-950 p-5 text-white sm:p-6">
            <div>
              <h3 className="text-base font-semibold">Try the sizing steps yourself</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Precifarm Agent runs load, cable and protection calculations with a trace on every figure, so you can check a brief before the survey.
              </p>
            </div>
            <Link href="/agent#workspace" className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-white hover:text-brand-200">
              See the engineering workspace <span aria-hidden className="ml-1">›</span>
            </Link>
          </div>
        </div>
      </InteriorSection>

      <InteriorSection id={p.document.id} eyebrow={p.document.eyebrow} title={p.document.title}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <p className="text-[15px] leading-relaxed text-forest-600">{p.document.lead}</p>
            <p className="mt-4 font-mono text-xs text-forest-500">{p.hero.meta}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={engineeringDoc.downloadHref}
                download="precifarm-solar-charger-stations-engineering.pdf"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-charge-600 px-6 text-sm font-semibold text-white hover:bg-charge-500"
              >
                <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" />
                </svg>
                {engineeringDoc.downloadLabel}
              </a>
              <a href={engineeringDoc.downloadHtmlHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold text-charge-600 hover:text-charge-700">
                Read as HTML <span aria-hidden className="ml-1">↗</span>
              </a>
            </div>
          </div>
          <ol className="overflow-hidden rounded-2xl ring-1 ring-border">
            {engineeringDoc.contents.map((c, i) => (
              <li key={c} className={`flex gap-3 px-4 py-3 text-sm text-forest-700 ${i ? "border-t border-border" : ""}`}>
                <span className="font-mono text-[11px] text-forest-400">{String(i + 1).padStart(2, "0")}</span>
                {c}
              </li>
            ))}
          </ol>
        </div>
      </InteriorSection>

      <InteriorSection id="faq" tone="silver" width="narrow" eyebrow={p.faqs.eyebrow} title={p.faqs.title}>
        <FaqAccordion items={[...engineeringPageFaqs]} />
      </InteriorSection>

      <InteriorSection id={p.assessment.id} eyebrow={p.assessment.eyebrow} title={p.assessment.title} lead={p.assessment.lead}>
        <AssessmentRequest />
      </InteriorSection>
    </>
  );
}
