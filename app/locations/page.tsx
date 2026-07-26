import Link from "next/link";
import { createPageSeo } from "@/lib/seo/metadata";
import { cmsListSeoEntities, cmsListLocalContent } from "@/lib/seo/cms-client";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = createPageSeo({
  title: "Locations — EV charging & electric travel in Kenya",
  description:
    "Precifarm hub locations across Kenyan cities. EV charging infrastructure and intercity electric coach connections.",
  path: "/locations",
  breadcrumbs: [
    { name: "Home", href: "/" },
    { name: "Locations", href: "/locations" },
  ],
}).metadata;

export default async function LocationsIndexPage() {
  const [locations, localPages] = await Promise.all([
    cmsListSeoEntities("location"),
    cmsListLocalContent(),
  ]);

  const localBySlug = new Map(localPages.map((p) => [p.slug, p]));

  return (
    <div className="bg-white">
      <header className="border-b border-border section-pad">
        <div className="page-container max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-forest-500">Locations</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-forest-900 sm:text-4xl">
            EV hubs & cities we serve
          </h1>
          <p className="mt-4 text-base leading-relaxed text-forest-600">
            Local pages for Precifarm charging infrastructure and electric intercity travel across Kenya.
          </p>
        </div>
      </header>

      <div className="section-pad">
        <div className="page-container max-w-3xl">
          <ul className="divide-y divide-border">
            {locations.map((loc) => {
              const localSlug = `ev-charging-${loc.slug}`;
              const href = localBySlug.has(localSlug)
                ? `/locations/${localSlug}`
                : `/locations/${loc.slug}`;
              const county = String(loc.metadata.county ?? loc.metadata.region ?? "");

              return (
                <li key={loc.slug} className="py-5">
                  <Link href={href} className="group block">
                    <h2 className="text-lg font-semibold text-forest-900 group-hover:text-charge-600">
                      {loc.name}
                    </h2>
                    {county && <p className="mt-1 text-sm text-forest-500">{county}</p>}
                    <p className="mt-2 text-sm text-forest-600">{loc.description}</p>
                  </Link>
                </li>
              );
            })}
          </ul>

          {locations.length === 0 && (
            <p className="text-sm text-forest-600">
              Location data will appear when the CMS is connected and seeded.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
