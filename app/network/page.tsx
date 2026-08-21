import type { Metadata } from "next";
import Link from "next/link";
import {
  ChargingHubAnatomy,
  ChargingHubCorridors,
  ChargingHubHowItWorks,
  ChargingHubLocations,
  ChargingHubSiteSelection,
  ChargingHubSiteTypes,
} from "@/components/charging-hub/ChargingHubSections";
import JsonLd from "@/components/seo/JsonLd";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import { chargingHub, chargingHubPage } from "@/lib/charging-hub";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/network");

export default function HubGridPage() {
  const { hero, cta } = chargingHubPage;

  return (
    <>
      <JsonLd data={pageJsonLd("/network")} />
      <PageHero eyebrow={chargingHub.name} title={hero.title} description={hero.description}>
        <div className="flex flex-wrap gap-3">
          <Link
            href={hero.primaryHref}
            className="inline-flex rounded-full bg-charge-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-charge-500"
          >
            {hero.primaryLabel}
          </Link>
          <Link
            href={hero.secondaryHref}
            className="inline-flex rounded-full border border-border px-6 py-3 text-sm font-semibold text-forest-900 transition-colors hover:bg-muted"
          >
            {hero.secondaryLabel}
          </Link>
        </div>
        <p className="mt-4">
          <Link href={hero.tertiaryHref} className="text-sm font-medium text-forest-600 hover:text-forest-900">
            {hero.tertiaryLabel} ›
          </Link>
        </p>
      </PageHero>

      <ChargingHubSiteTypes />
      <ChargingHubHowItWorks />
      <ChargingHubCorridors />
      <ChargingHubLocations />
      <ChargingHubAnatomy />
      <ChargingHubSiteSelection />

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
