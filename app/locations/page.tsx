import type { Metadata } from "next";
import { LocationsDirectory } from "@/components/locations/LocationsPageSections";
import RouteSchematic from "@/components/locations/RouteSchematic";
import { InteriorHero, InteriorSection } from "@/components/interior";
import JsonLd from "@/components/seo/JsonLd";
import { enrichLocationsFromCms, fallbackLocations, locationsPage } from "@/lib/locations-page";
import { absoluteUrl } from "@/lib/seo/config";
import { cmsListLocalContent, cmsListSeoEntities } from "@/lib/seo/cms-client";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";
import { itemListSchema } from "@/lib/seo/schema";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata("/locations");

export default async function LocationsIndexPage() {
  const [cmsLocations, localPages] = await Promise.all([cmsListSeoEntities("location"), cmsListLocalContent()]);
  const localPageSlugs = new Set(localPages.map((p) => p.slug));
  const locations = cmsLocations.length > 0 ? enrichLocationsFromCms(cmsLocations, localPageSlugs) : fallbackLocations(localPageSlugs);

  const listItems = locations.map((loc) => ({ name: loc.name, url: absoluteUrl(loc.href) }));
  const jsonLd = [
    ...pageJsonLd("/locations"),
    ...(listItems.length > 0
      ? [
          itemListSchema({
            name: "Precifarm Locations",
            description: "City guides for Precifarm EV charging across Kenya: home charging today, with Corridor DC and Boda Hub planned.",
            path: "/locations",
            items: listItems,
          }),
        ]
      : []),
  ];

  const { hero, directory } = locationsPage;

  return (
    <>
      <JsonLd data={jsonLd} />
      <InteriorHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Locations", href: "/locations" },
        ]}
        actions={[
          { href: "/charging/home", label: "Request a home survey" },
          { href: "/hub", label: "Open Charging Hub", variant: "secondary" },
        ]}
        media={<RouteSchematic />}
      />

      <InteriorSection id="cities" eyebrow={directory.eyebrow} title={directory.title} lead={directory.description}>
        <LocationsDirectory locations={locations} />
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-forest-600">
          The Charging Hub map also lists partner charging sites run by others. Their status is shown there, not here.
        </p>
      </InteriorSection>
    </>
  );
}
