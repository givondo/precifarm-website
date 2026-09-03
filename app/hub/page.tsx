import type { Metadata } from "next";
import Link from "next/link";
import {
  ChargingHubCorridors,
  ChargingHubHonesty,
  ChargingHubHowItWorks,
  ChargingHubLocations,
  ChargingHubMap,
  ChargingHubSiteTypes,
} from "@/components/charging-hub/ChargingHubSections";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqAccordion from "@/components/seo/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import PageCTA from "@/components/ui/PageCTA";
import { chargingHub, chargingHubPage } from "@/lib/charging-hub";
import { hubPageFaqs } from "@/lib/charging-faqs";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata(chargingHub.path);

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: chargingHub.label, href: chargingHub.path },
];

export default function ChargingHubPage() {
  const { hero, cta } = chargingHubPage;

  return (
    <>
      <JsonLd data={pageJsonLd(chargingHub.path)} />

      <section className="page-hero">
        <div className="page-container page-hero-container max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />
          <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-charge-600">
            {hero.eyebrow}
          </p>
          <h1 className="heading-display page-hero-title">{hero.title}</h1>
          <p className="page-hero-description">{hero.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {hero.pills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-charge-200 bg-charge-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-charge-700"
              >
                {pill}
              </span>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={hero.primaryHref}
              className="inline-flex rounded-full bg-charge-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-charge-500"
            >
              {hero.primaryLabel}
            </a>
            <Link
              href={hero.secondaryHref}
              className="inline-flex rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-forest-900 transition-colors hover:bg-muted"
            >
              {hero.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>

      <ChargingHubHonesty />
      <ChargingHubMap />
      <ChargingHubSiteTypes />
      <ChargingHubHowItWorks />
      <ChargingHubLocations />
      <ChargingHubCorridors />

      <section className="border-t border-border bg-white section-pad">
        <div className="page-container max-w-3xl">
          <h2 className="heading-display text-2xl text-forest-900">Charging Hub questions</h2>
          <p className="mt-3 text-sm leading-relaxed text-forest-600">
            Public sessions, swap and the companion. Home Pulse charger and Pod energy storage are on{" "}
            <Link href="/charging/home" className="font-medium text-forest-900 hover:text-charge-600">
              home charging
            </Link>
            .
          </p>
          <div className="mt-8">
            <FaqAccordion items={hubPageFaqs} />
          </div>
        </div>
      </section>

      <PageCTA
        title={cta.title}
        description={cta.description}
        primaryHref={cta.primaryHref}
        primaryLabel={cta.primaryLabel}
        secondaryHref={cta.secondaryHref}
        secondaryLabel={cta.secondaryLabel}
      />
    </>
  );
}
