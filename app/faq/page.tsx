import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqAccordion from "@/components/seo/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import ContentIndexCard from "@/components/ui/ContentIndexCard";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import { absoluteUrl } from "@/lib/seo/config";
import {
  collectFaqItems,
  formatContentDate,
  getPublishedFaqs,
} from "@/lib/seo/cms-content";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";
import { faqSchema, itemListSchema } from "@/lib/seo/schema";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata("/faq");

export default async function FaqIndexPage() {
  const faqDocuments = await getPublishedFaqs();
  const faqItems = collectFaqItems(faqDocuments);
  const pageSeo = pageJsonLd("/faq");
  const listItems = faqDocuments.map((item) => ({
    name: item.title,
    url: absoluteUrl(`/faq/${item.slug}`),
  }));

  const jsonLd = [
    ...pageSeo,
    ...(faqItems.length > 0 ? [faqSchema(faqItems)] : []),
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
        description="Booking, M-Pesa tickets, charging hubs and travel on the Nairobi–Kisumu route — synced from the CMS."
      />
      <section className="section-pad bg-white">
        <div className="page-container max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />

          {faqItems.length > 0 ? (
            <div className="mt-6">
              <FaqAccordion items={faqItems} />
            </div>
          ) : (
            <p className="mt-6 text-sm text-forest-500">
              FAQs will appear here once published from the CMS.
            </p>
          )}

          {faqDocuments.length > 1 && (
            <div className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-forest-500">
                FAQ topics
              </h2>
              <div className="content-index-grid mt-4">
                {faqDocuments.map((item) => (
                  <ContentIndexCard
                    key={item.id}
                    href={`/faq/${item.slug}`}
                    title={item.title}
                    description={item.description}
                    meta={formatContentDate(item.publishedAt ?? item.updatedAt)}
                  />
                ))}
              </div>
            </div>
          )}

          {faqDocuments.length === 1 && faqItems.length > 0 && (
            <p className="mt-6 text-sm text-forest-500">
              Last updated {formatContentDate(faqDocuments[0].publishedAt ?? faqDocuments[0].updatedAt)}.
              {" "}
              <a href={`/faq/${faqDocuments[0].slug}`} className="text-link font-medium">
                Open full FAQ page
              </a>
            </p>
          )}
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
