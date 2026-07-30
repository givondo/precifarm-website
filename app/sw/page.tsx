import Link from "next/link";
import BookingCTA from "@/components/BookingCTA";
import JsonLd from "@/components/seo/JsonLd";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";
import { swahiliUi } from "@/lib/seo/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata("/sw");

export default function SwahiliHomePage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/sw")} />
      <div className="bg-white">
        <section className="section-pad">
          <div className="page-container max-w-3xl">
            <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-forest-500">Kiswahili</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-forest-900 sm:text-4xl">
              {swahiliUi.homeTagline}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-forest-600">
              Hifadhi nafasi ya basi la umeme Nairobi–Kisumu, angalia vituo vya kuchaji, na pakua programu ya
              Android.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/sw/faq/precifarm-booking-faq" className="btn-secondary rounded-full px-5 py-2.5 text-sm">
                {swahiliUi.faq}
              </Link>
              <Link href="/" className="text-link text-sm">
                English
              </Link>
            </div>
          </div>
        </section>
        <BookingCTA />
      </div>
    </>
  );
}
