import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import PageHero from "@/components/ui/PageHero";
import { HOMEPAGE_FAQ_SLUG } from "@/lib/charging-faqs";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";
import { swahiliUi } from "@/lib/seo/i18n";

export const metadata: Metadata = pageMetadata("/sw");

export default function SwahiliHomePage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/sw")} />
      <PageHero
        eyebrow="Kiswahili"
        title={swahiliUi.homeTagline}
        description="Precifarm inasakinisha, kufadhili na kuendesha kuchaji umeme nchini Kenya — kutoka kuchaji nyumbani hadi kuchaji barabarani, kulipwa na M-Pesa."
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
          <p className="text-base leading-relaxed text-forest-600">
            Angalia vituo vya kuchaji, omba Pulse charger au Pod energy storage nyumbani, na pakua programu ya Android.
            Lipa na M-Pesa kwenye kila bidhaa.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <Link href={`/faq/${HOMEPAGE_FAQ_SLUG}`} className="text-link font-medium">
              {swahiliUi.faq}
            </Link>
            <Link href="/download" className="text-link font-medium">
              Pakua programu
            </Link>
            <Link href="/locations" className="text-link font-medium">
              {swahiliUi.locations}
            </Link>
            <Link href="/" className="text-link font-medium">
              English
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
