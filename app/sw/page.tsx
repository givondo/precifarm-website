import Link from "next/link";
import BookingCTA from "@/components/BookingCTA";
import { createPageSeo } from "@/lib/seo/metadata";
import { swahiliUi } from "@/lib/seo/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = createPageSeo({
  title: "Precifarm — Usafiri wa umeme Kenya",
  description:
    "Precifarm inajenga vituo vya kuchaji na mtandao wa usafiri wa umeme kati ya miji mikuu nchini Kenya. Hifadhi nafasi Nairobi–Kisumu.",
  path: "/sw",
  breadcrumbs: [
    { name: "Home", href: "/sw" },
  ],
}).metadata;

export default function SwahiliHomePage() {
  return (
    <div className="bg-white">
      <section className="section-pad">
        <div className="page-container max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-forest-500">Kiswahili</p>
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
            <Link href="/" className="text-sm text-charge-600 hover:underline">
              English
            </Link>
          </div>
        </div>
      </section>
      <BookingCTA />
    </div>
  );
}
