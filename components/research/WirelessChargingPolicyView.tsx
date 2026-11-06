import Link from "next/link";
import { CalloutNote, InteriorHero, StageLabel } from "@/components/interior";
import FaqAccordion from "@/components/seo/FaqAccordion";
import { legalHubPath } from "@/lib/legal/paths";
import { researchGates, researchPath } from "@/lib/research-page";
import {
  wirelessChargingPolicyEffective,
  wirelessChargingPolicyFaqs,
  wirelessChargingPolicyPage,
  wirelessChargingPolicyPath,
  wirelessIndustryBenchmarks,
} from "@/lib/wireless-charging-policy-page";

const toc = [
  { id: "scope", label: "Scope" },
  { id: "principles", label: "Principles" },
  { id: "benchmarks", label: "Industry benchmarks" },
  { id: "targets", label: "R&D targets" },
  { id: "governance", label: "Governance" },
  { id: "faq", label: "Policy FAQ" },
];

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="heading-display scroll-mt-28 text-xl text-forest-900 sm:text-2xl">
      {children}
    </h2>
  );
}

export default function WirelessChargingPolicyView() {
  const page = wirelessChargingPolicyPage;

  return (
    <>
      <InteriorHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        lead={page.hero.lead}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Legal & policies", href: legalHubPath },
          { name: "Wireless charging R&D", href: wirelessChargingPolicyPath },
        ]}
      >
        <dl className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Effective</dt>
            <dd className="mt-0.5 font-medium text-forest-900">{wirelessChargingPolicyEffective}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Programme status</dt>
            <dd className="mt-1">
              <StageLabel kind="simulation" label="Research" />
            </dd>
          </div>
        </dl>
      </InteriorHero>

      <div className="bg-white py-12 sm:py-16">
        <div className="interior-container grid grid-cols-1 gap-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14">
          <nav aria-label="Policy sections" className="min-w-0 lg:sticky lg:top-[calc(var(--site-header-height,4rem)+1.5rem)] lg:self-start">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Contents</p>
            <ol className="mt-3 flex gap-1 overflow-x-auto pb-1 [scrollbar-width:none] lg:flex-col lg:overflow-visible">
              {toc.map((t, i) => (
                <li key={t.id} className="shrink-0">
                  <a href={`#${t.id}`} className="flex min-h-10 items-center gap-2 rounded-full px-3 text-sm text-forest-600 hover:bg-[#f1f3f4] hover:text-forest-900 lg:rounded-lg">
                    <span className="font-mono text-[11px] text-forest-400">{i < 5 ? i + 1 : "·"}</span>
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="min-w-0 max-w-3xl space-y-14">
            <section aria-labelledby="scope">
              <H2 id="scope">{page.scope.title}</H2>
              {page.scope.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="mt-4 text-[15px] leading-relaxed text-forest-700">
                  {p}
                </p>
              ))}
            </section>

            <section aria-labelledby="principles">
              <H2 id="principles">{page.principles.title}</H2>
              <ol className="mt-5 grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border sm:grid-cols-2">
                {page.principles.items.map((item) => {
                  const [head, ...rest] = item.split(": ");
                  const body = rest.join(": ");
                  return (
                    <li key={item} className="bg-white p-4 sm:p-5">
                      <p className="text-[15px] font-semibold text-forest-900">{head}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-forest-600">{body.charAt(0).toUpperCase() + body.slice(1)}</p>
                    </li>
                  );
                })}
              </ol>
            </section>

            <section aria-labelledby="benchmarks">
              <H2 id="benchmarks">{page.benchmarksIntro.title}</H2>
              <p className="mt-4 text-[15px] leading-relaxed text-forest-700">{page.benchmarksIntro.description}</p>
              <div className="mt-4">
                <CalloutNote>These are other organisations&apos; published figures and programmes, not Precifarm performance.</CalloutNote>
              </div>
              <ul className="mt-5 divide-y divide-border overflow-hidden rounded-2xl ring-1 ring-border">
                {wirelessIndustryBenchmarks.map((row) => (
                  <li key={row.source} className="grid gap-1.5 bg-white p-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-5 sm:p-5">
                    <p className="text-sm font-semibold text-forest-900">{row.source}</p>
                    <div>
                      <p className="text-sm text-forest-800">{row.benchmark}</p>
                      <p className="mt-1 text-[13px] leading-snug text-forest-500">{row.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="targets">
              <H2 id="targets">{page.targets.title}</H2>
              <p className="mt-4 text-[15px] leading-relaxed text-forest-700">{page.targets.description}</p>
              <ul className="mt-5 space-y-3">
                {page.targets.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-forest-700">
                    <span className="mt-1 shrink-0 rounded bg-amber-50 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-900 ring-1 ring-amber-200">Target</span>
                    {item}
                  </li>
                ))}
              </ul>
              <figure className="mt-8 rounded-2xl bg-[#f6f7f8] p-4 ring-1 ring-border sm:p-5">
                <figcaption className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">The gates every wireless claim passes</figcaption>
                <ol className="mt-3 grid grid-cols-5 gap-1.5">
                  {researchGates.map((g) => (
                    <li key={g.id} className="rounded-xl bg-white px-2 py-2.5 text-center ring-1 ring-border">
                      <p className="font-mono text-xs font-semibold text-charge-600">{g.id}</p>
                      <p className="text-[12px] font-semibold text-forest-900">{g.name}</p>
                    </li>
                  ))}
                </ol>
                <Link href={`${researchPath}#evidence`} className="mt-3 inline-flex min-h-10 items-center text-sm font-semibold text-charge-600 hover:text-charge-700">
                  Evidence each gate needs <span aria-hidden className="ml-1">›</span>
                </Link>
              </figure>
            </section>

            <section aria-labelledby="governance">
              <H2 id="governance">{page.governance.title}</H2>
              {page.governance.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="mt-4 text-[15px] leading-relaxed text-forest-700">
                  {p}
                </p>
              ))}
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                <Link href={researchPath} className="inline-flex min-h-11 items-center text-sm font-semibold text-charge-600 hover:text-charge-700">
                  Precifarm R&amp;D <span aria-hidden className="ml-1">›</span>
                </Link>
                <Link href={page.cta.primaryHref} className="inline-flex min-h-11 items-center text-sm font-semibold text-charge-600 hover:text-charge-700">
                  {page.cta.primaryLabel} <span aria-hidden className="ml-1">›</span>
                </Link>
              </div>
            </section>

            <section aria-labelledby="faq">
              <H2 id="faq">Policy FAQ</H2>
              <div className="mt-5">
                <FaqAccordion items={wirelessChargingPolicyFaqs} />
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
