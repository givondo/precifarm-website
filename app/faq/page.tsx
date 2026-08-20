import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqAccordion from "@/components/seo/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import ContentIndexCard from "@/components/ui/ContentIndexCard";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import { BOOKING_FAQ_SLUG, HOMEPAGE_FAQ_SLUG } from "@/lib/charging-faqs";
import { absoluteUrl } from "@/lib/seo/config";
import {
  formatContentDate,
  getFaqIndexItems,
  getPublishedFaqs,
} from "@/lib/seo/cms-content";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";
import { faqSchema, itemListSchema } from "@/lib/seo/schema";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata("/faq");

export default async function FaqIndexPage() {
  const faqDocuments = await getPublishedFaqs();
  const faqItems = await getFaqIndexItems();
  const chargingTopics = faqDocuments.filter((item) => item.slug === HOMEPAGE_FAQ_SLUG);
  const otherTopics = faqDocuments.filter((item) => item.slug !== HOMEPAGE_FAQ_SLUG);
  const pageSeo = pageJsonLd("/faq");
  const listItems = [...chargingTopics, ...otherTopics].map((item) => ({
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
            description: "Frequently asked questions about Precifarm home charging, public DC and the Charging Hub in Kenya.",
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
        description="Answers on home charging — Pulse charger from KES 79,000, a typical day about KES 140, Lipa Pole Pole on M-Pesa, public DC from KES 39/kWh and the Charging Hub."
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
              Charging FAQs will appear here once published.
            </p>
          )}

          {chargingTopics.length > 0 || otherTopics.length > 0 ? (
            <div className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-forest-500">
                FAQ topics
              </h2>
              <div className="content-index-grid mt-4">
                {chargingTopics.map((item) => (
                  <ContentIndexCard
                    key={item.id}
                    href={`/faq/${item.slug}`}
                    title={item.title}
                    description={item.description}
                    meta={formatContentDate(item.publishedAt ?? item.updatedAt)}
                  />
                ))}
                {otherTopics.map((item) => (
                  <ContentIndexCard
                    key={item.id}
                    href={`/faq/${item.slug}`}
                    title={item.slug === BOOKING_FAQ_SLUG ? "Travel booking" : item.title}
                    description={
                      item.slug === BOOKING_FAQ_SLUG
                        ? "Nairobi–Kisumu seats, M-Pesa tickets and boarding — a companion surface, not the charging product."
                        : item.description
                    }
                    meta={formatContentDate(item.publishedAt ?? item.updatedAt)}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
      <PageCTA
        title="Still have questions?"
        description="Request a house survey, check public DC rates or reach us on phone, email and WhatsApp."
        primaryHref="/charging/private-house"
        primaryLabel="Home charging"
        secondaryHref="/contact"
        secondaryLabel="Contact us"
      />
    </>
  );
}
