import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import PageHero from "@/components/ui/PageHero";
import { HOMEPAGE_FAQ_SLUG } from "@/lib/charging-faqs";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";
import { swahiliUi } from "@/lib/seo/i18n";
import { swPage } from "@/lib/sw-page";

export const metadata: Metadata = pageMetadata("/sw");

export default function SwahiliHomePage() {
  const page = swPage;

  return (
    <>
      <JsonLd data={pageJsonLd("/sw")} />
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/charging" className="btn-primary rounded-full px-6 py-2.5 text-sm">
            {swahiliUi.bookCta}
          </Link>
          <Link href="/network" className="btn-secondary rounded-full px-6 py-2.5 text-sm">
            {swahiliUi.chargingHubCta}
          </Link>
          <Link href="/charging/private-house" className="btn-secondary rounded-full px-6 py-2.5 text-sm">
            Kuchaji nyumbani
          </Link>
        </div>
      </PageHero>
      <section className="section-pad bg-white">
        <div className="page-container max-w-3xl">
          <p className="text-base leading-relaxed text-forest-600">{page.body.paragraph}</p>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <Link href={`/faq/${HOMEPAGE_FAQ_SLUG}`} className="text-link font-medium">
              {page.body.links.faq}
            </Link>
            <Link href="/evs" className="text-link font-medium">
              {page.body.links.evGuide}
            </Link>
            <Link href="/download" className="text-link font-medium">
              {page.body.links.download}
            </Link>
            <Link href="/locations" className="text-link font-medium">
              {page.body.links.locations}
            </Link>
            <Link href="/" className="text-link font-medium">
              {page.body.links.english}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
