import type { Metadata } from "next";
import Link from "next/link";
import { InPageNav, InteriorHero, InteriorSection, StageLabel } from "@/components/interior";
import JourneyIcon from "@/components/partners/JourneyIcon";
import JsonLd from "@/components/seo/JsonLd";
import { partnerJourneys, partnerPrinciples, partnersPage, type PartnerJourney } from "@/lib/partners";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/partners");

const contactHref = (interest: string) => `/contact?interest=${interest}`;

function Chooser() {
  return (
    <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2" aria-label="Partner journeys">
      {partnerJourneys.map((j, i) => (
        <li key={j.id} className={i === partnerJourneys.length - 1 ? "sm:col-span-2" : undefined}>
          <a
            href={`#${j.id}`}
            className="group flex min-h-16 items-center gap-3.5 rounded-2xl bg-white px-4 py-3 ring-1 ring-border transition-shadow hover:shadow-[0_12px_30px_-18px_rgba(17,24,39,0.35)] hover:ring-forest-300"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest-950 text-white">
              <JourneyIcon kind={j.icon} className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-semibold text-forest-900">{j.who}</span>
              <span className="block truncate text-[12.5px] text-forest-500">{j.title}</span>
            </span>
            <span aria-hidden className="text-forest-400 transition-transform group-hover:translate-x-0.5">
              ›
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}

function Journey({ j, index, tone }: { j: PartnerJourney; index: number; tone: "white" | "silver" }) {
  return (
    <InteriorSection id={j.id} tone={tone}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
        <div className="lg:sticky lg:top-[calc(var(--site-header-height,4rem)+4.5rem)] lg:self-start">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest-950 text-white">
              <JourneyIcon kind={j.icon} />
            </span>
            <p className="font-mono text-xs text-forest-500">
              {String(index + 1).padStart(2, "0")} / {String(partnerJourneys.length).padStart(2, "0")} · {j.who}
            </p>
          </div>
          <h2 id={`${j.id}-title`} className="heading-display mt-5 text-2xl leading-tight text-forest-900 sm:text-3xl">
            {j.title}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-forest-600">{j.forWhom}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Products in this journey">
            {j.products.map((p) => (
              <li key={p.name}>
                <Link href={p.href} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white py-1 pl-3.5 pr-1.5 text-sm font-medium text-forest-900 ring-1 ring-border hover:ring-forest-300">
                  {p.name}
                  <StageLabel kind={p.stage} label={p.stageLabel} />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              href={contactHref(j.cta.interest)}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-charge-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-charge-500"
            >
              {j.cta.label}
            </Link>
            {j.secondary ? (
              <Link href={j.secondary.href} className="inline-flex min-h-11 items-center text-sm font-semibold text-charge-600 hover:text-charge-700">
                {j.secondary.label} <span aria-hidden className="ml-1">›</span>
              </Link>
            ) : null}
          </div>
        </div>

        <div className="min-w-0 space-y-6">
          <div className="grid overflow-hidden rounded-2xl bg-white ring-1 ring-border sm:grid-cols-2">
            <div className="p-5 sm:p-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-charge-600">Precifarm does</h3>
              <ul className="mt-3 space-y-2.5">
                {j.precifarm.map((t) => (
                  <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-forest-700">
                    <svg aria-hidden viewBox="0 0 16 16" className="mt-1 h-3.5 w-3.5 shrink-0 text-charge-600" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m3.5 8.5 3 3 6-7" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-border bg-[#fafbfb] p-5 sm:border-l sm:border-t-0 sm:p-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">You provide</h3>
              <ul className="mt-3 space-y-2.5">
                {j.partner.map((t) => (
                  <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-forest-700">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-300" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ol className="relative grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border sm:grid-cols-2">
            {j.steps.map((s, i) => (
              <li key={s.title} className="flex gap-3.5 bg-white p-4 sm:p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-950 font-mono text-[11px] font-semibold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-forest-900">{s.title}</h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-forest-600">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          {j.sub ? (
            <aside id={j.sub.id} className="scroll-mt-28 rounded-2xl bg-forest-950 p-5 text-white sm:p-6" aria-labelledby={`${j.sub.id}-title`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 id={`${j.sub.id}-title`} className="text-base font-semibold">
                  {j.sub.title}
                </h3>
                <StageLabel kind="partner-site" label="Partner-run sites" tone="dark" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/72">{j.sub.text}</p>
              <Link href={contactHref(j.sub.cta.interest)} className="mt-4 inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-forest-950 hover:bg-brand-50">
                {j.sub.cta.label}
              </Link>
            </aside>
          ) : null}
        </div>
      </div>
    </InteriorSection>
  );
}

export default function PartnersPage() {
  const hero = partnersPage.hero;

  return (
    <>
      <JsonLd data={pageJsonLd("/partners")} />
      <InteriorHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Partners", href: "/partners" },
        ]}
        media={<Chooser />}
      />
      <InPageNav links={partnerJourneys.map((j) => ({ href: `#${j.id}`, label: j.who }))} label="Partner journeys" />

      {partnerJourneys.map((j, i) => (
        <Journey key={j.id} j={j} index={i} tone={i % 2 ? "silver" : "white"} />
      ))}

      <InteriorSection tone="graphite" eyebrow="Every partnership" title="What you can rely on.">
        <ul className="grid gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {partnerPrinciples.map((p) => (
            <li key={p.title} className="bg-forest-950 p-5 sm:p-6">
              <h3 className="text-base font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{p.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-white/60">
          Not sure which journey fits?{" "}
          <Link href="/contact?interest=general" className="font-semibold text-white underline underline-offset-2">
            Send a general enquiry
          </Link>{" "}
          and we will route it.
        </p>
      </InteriorSection>
    </>
  );
}
