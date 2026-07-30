import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import ContentIndexCard from "@/components/ui/ContentIndexCard";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import { absoluteUrl } from "@/lib/seo/config";
import { cmsListSeoContent } from "@/lib/seo/cms-client";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";
import { itemListSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/config";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata("/faq");

export default async function FaqIndexPage() {
  const items = await cmsListSeoContent({ status: "published", locale: siteConfig.locale });
  const faqs = items.filter((item) => item.contentType === "faq");
  const pageSeo = pageJsonLd("/faq");
  const listItems = faqs.map((item) => ({
    name: item.title,
    url: absoluteUrl(`/faq/${item.slug}`),
  }));

  const jsonLd = [
    ...pageSeo,
    ...(listItems.length > 0
      ? [
          itemListSchema({
            name: "Precifarm FAQ",
            description: "Frequently asked questions about Precifarm booking and electric travel in Kenya.",
            path: "/faq",
            items: listItems,
          }),
        ]
      : []),
  ];

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Booking, M-Pesa tickets, charging hubs and travel on the Nairobi–Kisumu route."
      />
      <section className="section-pad bg-white">
        <div className="page-container max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />
          <div className="content-index-grid">
            {faqs.length === 0 && (
              <p className="text-sm text-forest-500">
                FAQs will appear here once published from the CMS.
              </p>
            )}
            {faqs.map((item) => (
              <ContentIndexCard
                key={item.id}
                href={`/faq/${item.slug}`}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>
      <PageCTA
        title="Still have questions?"
        description="Book a seat or reach out — we respond on phone, email and WhatsApp."
        primaryLabel="Book now"
        secondaryHref="/contact"
        secondaryLabel="Contact us"
      />
    </>
  );
}
