import type { Metadata } from "next";
import Link from "next/link";
import FaqExplorer from "@/components/faq/FaqExplorer";
import { InteriorHero, InteriorSection } from "@/components/interior";
import JsonLd from "@/components/seo/JsonLd";
import { faqPage } from "@/lib/company-pages";
import { contact } from "@/lib/contact";
import { faqIndexEntries, faqTopics } from "@/lib/pages/faq";
import { absoluteUrl } from "@/lib/seo/config";
import { formatContentDate, getFaqIndexItems, getPublishedFaqs } from "@/lib/seo/cms-content";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";
import { faqSchema, itemListSchema } from "@/lib/seo/schema";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata("/faq");

export default async function FaqIndexPage() {
  const faqDocuments = await getPublishedFaqs();
  const faqItems = await getFaqIndexItems();
  const listItems = faqDocuments.map((item) => ({ name: item.title, url: absoluteUrl(`/faq/${item.slug}`) }));

  const jsonLd = [
    ...pageJsonLd("/faq"),
    ...(faqItems.length > 0 ? [faqSchema(faqItems)] : []),
    ...(listItems.length > 0
      ? [
          itemListSchema({
            name: "Precifarm FAQ",
            description: "Frequently asked questions about Precifarm home charging, public DC, the Charging Hub and Precifarm Agent in Kenya.",
            path: "/faq",
            items: listItems,
          }),
        ]
      : []),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <InteriorHero
        eyebrow={faqPage.eyebrow}
        title={faqPage.title}
        lead={faqPage.description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "FAQ", href: "/faq" },
        ]}
        actions={[
          { href: "/guides", label: "Read the guides", variant: "secondary" },
          { href: "/contact?interest=general", label: "Ask a question", variant: "link" },
        ]}
      />

      <InteriorSection id="questions" className="!pt-10 sm:!pt-14">
        {faqIndexEntries.length ? (
          <FaqExplorer items={faqIndexEntries} topics={faqTopics} />
        ) : (
          <p className="text-sm text-forest-600">Charging answers will appear here once published.</p>
        )}
      </InteriorSection>

      {faqDocuments.length > 0 ? (
        <InteriorSection id="topics" tone="silver" eyebrow="In depth" title="FAQ collections" lead="Longer question sets on a single subject, with sources.">
          <ul className="divide-y divide-border overflow-hidden rounded-2xl bg-white ring-1 ring-border">
            {faqDocuments.map((item) => (
              <li key={item.id}>
                <Link href={`/faq/${item.slug}`} className="group grid gap-1 px-5 py-4 transition-colors hover:bg-[#f6f7f8] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-6">
                  <span>
                    <span className="block font-semibold text-forest-950 group-hover:text-charge-700">{item.title}</span>
                    {item.description ? <span className="mt-1 block text-sm text-forest-600">{item.description}</span> : null}
                  </span>
                  <span className="text-xs text-forest-500">{formatContentDate(item.publishedAt ?? item.updatedAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </InteriorSection>
      ) : null}

      <section aria-labelledby="faq-help-title" className="border-t border-border bg-[#f6f7f8]">
        <div className="interior-container grid gap-6 py-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <h2 id="faq-help-title" className="font-display text-xl font-semibold tracking-tight text-forest-950">
              Not answered here?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-forest-600">{faqPage.cta.description}</p>
          </div>
          <ul className="flex flex-wrap gap-3 text-sm font-semibold">
            <li>
              <a href={contact.phoneHref} className="inline-flex min-h-11 items-center rounded-full border border-forest-200 bg-white px-5 text-forest-900 hover:border-forest-300">
                Call {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-forest-200 bg-white px-5 text-forest-900 hover:border-forest-300">
                WhatsApp
              </a>
            </li>
            <li>
              <Link href="/contact?interest=general" className="inline-flex min-h-11 items-center rounded-full bg-charge-600 px-5 text-white hover:bg-charge-500">
                Send a message
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
