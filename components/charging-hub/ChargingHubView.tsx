import Link from "next/link";
import { CalloutNote, InteriorHero, InteriorSection, StageLabel } from "@/components/interior";
import HubFinder from "@/components/hub-map/HubFinder";
import { chargingHub, chargingHubPage } from "@/lib/charging-hub";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: chargingHub.label, href: chargingHub.path },
];

export default function ChargingHubView() {
  const page = chargingHubPage;
  return (
    <>
      <InteriorHero eyebrow={page.hero.eyebrow} title={page.hero.title} lead={page.hero.lead} breadcrumbs={breadcrumbs} stage="planned" />

      <section id="finder" aria-labelledby="finder-title" className="scroll-mt-24 bg-[#f6f7f8] py-8 sm:py-12">
        <div className="interior-container">
          <h2 id="finder-title" className="sr-only">
            {page.finderTitle}
          </h2>
          <HubFinder />
        </div>
      </section>

      <InteriorSection id="legend" eyebrow={page.legend.eyebrow} title={page.legend.title}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <dl className="divide-y divide-border border-y border-border">
            {page.legend.stages.map((s) => (
              <div key={s.label} className="grid gap-2 py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
                <dt>
                  <StageLabel kind={s.kind} label={s.label} />
                </dt>
                <dd className="text-sm leading-relaxed text-forest-700">{s.text}</dd>
              </div>
            ))}
          </dl>
          <CalloutNote title="No live availability">{page.legend.availability}</CalloutNote>
        </div>
      </InteriorSection>

      <InteriorSection id="site-types" tone="silver" eyebrow={page.siteTypes.eyebrow} title={page.siteTypes.title}>
        <div className="grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border md:grid-cols-3">
          {page.siteTypes.rows.map((r) => (
            <div key={r.id} className="flex flex-col bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-semibold text-forest-950">{r.name}</h3>
                {r.id === "partner" ? <StageLabel kind="planned" label="None listed yet" /> : <StageLabel kind={r.stage} />}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-forest-600">{r.what}</p>
              <dl className="mt-4 flex-1 space-y-3 border-t border-border pt-4 text-sm">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Connector</dt>
                  <dd className="mt-0.5 text-forest-900">{r.connector}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Price and payment</dt>
                  <dd className="mt-0.5 text-forest-900">{r.pay}</dd>
                </div>
              </dl>
              <Link href={r.href} className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-charge-700 hover:text-charge-600">
                {r.id === "partner" ? "Partner programmes" : `About ${r.name.replace(" DC", "").replace(" swap", "")}`}
                <span aria-hidden className="ml-1">
                  ›
                </span>
              </Link>
            </div>
          ))}
        </div>
      </InteriorSection>

      <InteriorSection id="host" eyebrow={page.hosts.eyebrow} title={page.hosts.title}>
        <ul className="divide-y divide-border border-y border-border">
          {page.hosts.options.map((o) => (
            <li key={o.href}>
              <Link
                href={o.href}
                className="group grid gap-1 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charge-600 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6"
              >
                <span>
                  <span className="block text-lg font-semibold text-forest-950 group-hover:text-charge-700">{o.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-forest-600">{o.text}</span>
                </span>
                <span className="inline-flex min-h-11 items-center text-sm font-semibold text-charge-700">
                  Start an enquiry
                  <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">
                    ›
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </InteriorSection>

      <InteriorSection id="faq" tone="silver" eyebrow="Questions" title="Common questions" width="narrow">
        <div className="divide-y divide-border border-y border-border">
          {page.faqs.map((f) => (
            <details key={f.question} className="group py-1">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-forest-900 [&::-webkit-details-marker]:hidden">
                {f.question}
                <span aria-hidden className="text-forest-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-4 text-sm leading-relaxed text-forest-600">{f.answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-sm text-forest-600">
          Charging at home instead? See{" "}
          <Link href="/charging/home" className="font-semibold text-charge-700 underline-offset-2 hover:underline">
            home charging
          </Link>
          .
        </p>
      </InteriorSection>
    </>
  );
}
