import type { Metadata } from "next";
import Link from "next/link";
import EvExplorer from "@/components/evs/EvExplorer";
import KenyaEvComparisonTable from "@/components/evs/KenyaEvComparisonTable";
import { CalloutNote, InteriorHero, InteriorSection, StageLabel } from "@/components/interior";
import JsonLd from "@/components/seo/JsonLd";
import SiteImage from "@/components/SiteImage";
import { kenyaEvBikeModels, kenyaEvCarModels, kenyaEvCompatibilityPage, kenyaEvMarketCallouts, kenyaEvModels } from "@/lib/kenya-ev-compatibility";
import { evMarketFigure, productStage, requirementImages, usesChademo } from "@/lib/pages/evs";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/evs");

export default function KenyaEvCompatibilityPage() {
  const page = kenyaEvCompatibilityPage;
  const { leaf, byd, ebike } = kenyaEvMarketCallouts;
  const chademo = kenyaEvModels.filter(usesChademo).length;

  return (
    <>
      <JsonLd data={pageJsonLd(page.path)} />
      <InteriorHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Kenya EV guide", href: page.path },
        ]}
        actions={[
          { href: "#explorer", label: "Find your vehicle" },
          { href: "/charging/home", label: "Home charging", variant: "secondary" },
        ]}
        facts={[
          { value: String(kenyaEvModels.length), label: "Models compared" },
          { value: String(kenyaEvCarModels.length), label: "Passenger cars" },
          { value: String(kenyaEvBikeModels.length), label: "Electric motorcycles" },
          { value: String(chademo), label: "Use CHAdeMO for DC" },
        ]}
      />

      <InteriorSection id="explorer" tone="silver" eyebrow="Vehicle explorer" title="Pick your EV, see how it charges." lead={page.vehicleAware}>
        <EvExplorer models={kenyaEvModels} />
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-forest-500">{page.variantDisclaimer}</p>
      </InteriorSection>

      <InteriorSection id="needs" eyebrow={page.chargingRequirementsSection.eyebrow} title={page.chargingRequirementsSection.title} lead={page.chargingRequirementsSection.description}>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {page.chargingRequirementsSection.products.map((row) => {
            const img = requirementImages[row.href];
            const stage = productStage[row.product];
            return (
              <li key={row.href}>
                <Link href={row.href} className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-border transition-shadow hover:shadow-md">
                  <div className="relative aspect-[4/3] bg-[#eef0f2]">
                    {img ? (
                      <SiteImage src={img.src} alt={img.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className={img.src.endsWith(".png") ? "object-contain p-5" : "object-cover"} />
                    ) : null}
                    {stage ? <StageLabel kind={stage} className="absolute left-3 top-3" /> : null}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">{row.need}</p>
                    <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-forest-950 group-hover:text-charge-700">{row.product}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-600">{row.requirement.replace(/ · /g, ", ")}</p>
                    <span className="mt-4 text-sm font-semibold text-charge-700">View ›</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-xs text-forest-500">Product images are renders.</p>
      </InteriorSection>

      <InteriorSection id="market" tone="graphite" eyebrow="The Kenyan market" title="Three kinds of EV on Kenyan roads.">
        <div className="grid gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10 lg:grid-cols-3">
          {[leaf, byd, ebike].map((c) => (
            <article key={c.title} className="bg-forest-950 p-6 sm:p-7">
              <h3 className="font-display text-lg font-semibold tracking-tight text-white">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{c.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-10">
          <p className="heading-display heading-inverted text-4xl sm:text-5xl">{evMarketFigure.value}</p>
          <p className="max-w-2xl text-sm leading-relaxed text-white/75">
            {evMarketFigure.text}{" "}
            <a href={evMarketFigure.source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline underline-offset-4">
              Source
            </a>
            . {page.whyTheseModels}
          </p>
        </div>
      </InteriorSection>

      <InteriorSection id="compare" eyebrow="Full comparison" title={`All ${kenyaEvModels.length} models side by side.`} lead={page.dataLayer}>
        <KenyaEvComparisonTable models={kenyaEvModels} />
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <CalloutNote title="How to read the times">
            Daily top-up means about 60 km of driving. Home is the Pulse charger; DC is a public fast charger; Swap is a Boda Hub battery swap. Times are not a full 0 to 100% charge.
          </CalloutNote>
          <CalloutNote title="Practical range">{page.practicalRangeFootnote.replace(/^\*\s*/, "")}</CalloutNote>
        </div>
      </InteriorSection>
    </>
  );
}
