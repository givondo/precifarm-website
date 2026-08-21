import type { Metadata } from "next";
import Link from "next/link";
import {
  LocationsCorridorsNote,
  LocationsDirectory,
  LocationsServices,
} from "@/components/locations/LocationsPageSections";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import { absoluteUrl } from "@/lib/seo/config";
import { cmsListLocalContent, cmsListSeoEntities } from "@/lib/seo/cms-client";
import {
  enrichLocationsFromCms,
  fallbackLocations,
  locationsPage,
} from "@/lib/locations-page";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";
import { itemListSchema } from "@/lib/seo/schema";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata("/locations");

export default async function LocationsIndexPage() {
  const [cmsLocations, localPages] = await Promise.all([
    cmsListSeoEntities("location"),
    cmsListLocalContent(),
  ]);

  const localPageSlugs = new Set(localPages.map((p) => p.slug));
  const locations =
    cmsLocations.length > 0
      ? enrichLocationsFromCms(cmsLocations, localPageSlugs)
      : fallbackLocations(localPageSlugs);

  const listItems = locations.map((loc) => ({
    name: loc.name,
    url: absoluteUrl(loc.href),
  }));

  const jsonLd = [
    ...pageJsonLd("/locations"),
    ...(listItems.length > 0
      ? [
          itemListSchema({
            name: "Precifarm Locations",
            description:
              "City guides for Precifarm EV charging across Kenya — home, corridor DC and Boda Hub.",
            path: "/locations",
            items: listItems,
          }),
        ]
      : []),
  ];

  const { hero, cta } = locationsPage;

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description}>
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

      <section className="page-container pb-4 pt-6 sm:pb-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Locations", href: "/locations" },
          ]}
        />
      </section>

      <LocationsServices />
      <LocationsDirectory locations={locations} />
      <LocationsCorridorsNote />

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
