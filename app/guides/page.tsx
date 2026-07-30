import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import ContentIndexCard from "@/components/ui/ContentIndexCard";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import { absoluteUrl, siteConfig } from "@/lib/seo/config";
import { cmsListSeoContent } from "@/lib/seo/cms-client";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";
import { itemListSchema } from "@/lib/seo/schema";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata("/guides");

export default async function GuidesIndexPage() {
  const items = await cmsListSeoContent({ status: "published", locale: siteConfig.locale });
  const guides = items.filter((item) =>
    ["guide", "howto", "article"].includes(item.contentType),
  );

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
            description: "How-to guides for booking, charging and operating on the Precifarm network.",
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
        eyebrow="Guides"
        title="How-to guides"
        description="Step-by-step guides for booking, charging and operating on the Precifarm network."
      />
      <section className="section-pad bg-white">
        <div className="page-container max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />
          <div className="content-index-grid">
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
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>
      <PageCTA
        title="Ready to book?"
        description="Choose a departure on Nairobi–Kisumu and pay with M-Pesa."
        primaryLabel="Book now"
      />
    </>
  );
}
