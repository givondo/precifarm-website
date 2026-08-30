import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/seo/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import PageHero from "@/components/ui/PageHero";
import ChargingSection from "@/components/ChargingSection";
import { chargingPage } from "@/lib/charging";
import { chargingServicesFaqs } from "@/lib/charging-faqs";
import { siteCtas } from "@/lib/site-copy";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/charging");

export default function ChargingPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/charging")} />
      <PageHero
        eyebrow={chargingPage.eyebrow}
        title={chargingPage.title}
        description={chargingPage.description}
      />
      <section className="border-b border-border bg-white">
        <ChargingSection />
      </section>
      <section className="section-pad bg-muted/20">
        <div className="page-container max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-forest-900">Common questions</h2>
          <p className="mt-3 text-sm leading-relaxed text-forest-600">
            Pricing, Lipa Pole Pole and which product fits your day.{" "}
            <Link href={siteCtas.allFaq.href} className="font-medium text-forest-900 hover:text-charge-600">
              {siteCtas.allFaq.label} →
            </Link>
          </p>
          <div className="mt-8">
            <FaqAccordion items={chargingServicesFaqs} />
          </div>
        </div>
      </section>
    </>
  );
}
