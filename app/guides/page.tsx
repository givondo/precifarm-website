import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import ContentIndexCard from "@/components/ui/ContentIndexCard";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import { guidesPage } from "@/lib/company-pages";
import { absoluteUrl } from "@/lib/seo/config";
import {
  excerptFromMarkdown,
  formatContentDate,
  getPublishedGuides,
  guideTypeLabel,
} from "@/lib/seo/cms-content";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";
import { itemListSchema } from "@/lib/seo/schema";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata("/guides");

export default async function GuidesIndexPage() {
  const guides = await getPublishedGuides();

  const listItems = guides.map((item) => ({
    name: item.title,
    url: absoluteUrl(`/guides/${item.slug}`),
  }));

  const jsonLd = [
    ...pageJsonLd("/guides"),
    ...(listItems.length > 0
      ? [
          itemListSchema({
            name: "Precifarm Guides",
            description: "How-to guides for home charging, public DC and Precifarm Agent.",
            path: "/guides",
            items: listItems,
          }),
        ]
      : []),
  ];

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        eyebrow={guidesPage.eyebrow}
        title={guidesPage.title}
        description={guidesPage.description}
      />
      <section className="section-pad bg-white">
        <div className="page-container max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />
          {guides.length > 0 && (
            <p className="mt-4 text-sm text-forest-500">
              {guides.length} {guides.length === 1 ? "guide" : "guides"} published
            </p>
          )}
          <div className="content-index-grid mt-6">
            {guides.length === 0 && (
              <p className="text-sm text-forest-500">
                Guides will appear here once published from the CMS.
              </p>
            )}
            {guides.map((item) => (
              <ContentIndexCard
                key={item.id}
                href={`/guides/${item.slug}`}
                title={item.title}
                description={item.description || excerptFromMarkdown(item.bodyMd)}
                meta={[
                  guideTypeLabel(item.contentType),
                  formatContentDate(item.publishedAt ?? item.updatedAt),
                ]
                  .filter(Boolean)
                  .join(" · ")}
              />
            ))}
          </div>
        </div>
      </section>
      <PageCTA
        title={guidesPage.cta.title}
        description={guidesPage.cta.description}
        primaryHref={guidesPage.cta.primaryHref}
        primaryLabel={guidesPage.cta.primaryLabel}
        secondaryHref={guidesPage.cta.secondaryHref}
        secondaryLabel={guidesPage.cta.secondaryLabel}
      />
    </>
  );
}
