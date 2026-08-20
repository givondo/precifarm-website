import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import ContentIndexCard from "@/components/ui/ContentIndexCard";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import { absoluteUrl } from "@/lib/seo/config";
import { cmsListSeoEntities, cmsListLocalContent } from "@/lib/seo/cms-client";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";
import { itemListSchema } from "@/lib/seo/schema";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata("/locations");

export default async function LocationsIndexPage() {
  const [locations, localPages] = await Promise.all([
    cmsListSeoEntities("location"),
    cmsListLocalContent(),
  ]);

  const localBySlug = new Map(localPages.map((p) => [p.slug, p]));

  const listItems = locations.map((loc) => {
    const localSlug = `ev-charging-${loc.slug}`;
    const path = localBySlug.has(localSlug) ? `/locations/${localSlug}` : `/locations/${loc.slug}`;
    return { name: loc.name, url: absoluteUrl(path) };
  });

  const jsonLd = [
    ...pageJsonLd("/locations"),
    ...(listItems.length > 0
      ? [
          itemListSchema({
            name: "Precifarm Locations",
            description: "EV charging hubs and cities served by Precifarm across Kenya.",
            path: "/locations",
            items: listItems,
          }),
        ]
      : []),
  ];

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Locations", href: "/locations" },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        eyebrow="Locations"
        title="EV hubs and cities we serve"
        description="Local pages for Precifarm charging — Pulse charger and Pod energy storage at home, fleet Depot, and Corridor DC across Kenya."
      />
      <section className="section-pad bg-white">
        <div className="page-container max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />
          <div className="content-index-grid">
            {locations.map((loc) => {
              const localSlug = `ev-charging-${loc.slug}`;
              const href = localBySlug.has(localSlug)
                ? `/locations/${localSlug}`
                : `/locations/${loc.slug}`;
              const county = String(loc.metadata.county ?? loc.metadata.region ?? "");

              return (
                <ContentIndexCard
                  key={loc.slug}
                  href={href}
                  title={loc.name}
                  description={loc.description}
                  meta={county || undefined}
                />
              );
            })}

            {locations.length === 0 && (
              <p className="text-sm text-forest-600">
                Location data will appear when the CMS is connected and seeded.
              </p>
            )}
          </div>
        </div>
      </section>
      <PageCTA
        title="Find charging on your route"
        description="Open the Charging Hub or browse Pulse charger, Pod energy storage and Depot charging."
        primaryHref="/network"
        primaryLabel="View Charging Hub"
        secondaryHref="/charging"
        secondaryLabel="Explore charging"
      />
    </>
  );
}
