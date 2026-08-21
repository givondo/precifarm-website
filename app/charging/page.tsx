import type { Metadata } from "next";
import ChargingProductGallery from "@/components/ChargingProductGallery";
import ChargingSection from "@/components/ChargingSection";
import FaqAccordion from "@/components/seo/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { chargingPage } from "@/lib/charging";
import { chargingServicesFaqs } from "@/lib/charging-faqs";
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
      <ChargingProductGallery />
      <section className="section-pad bg-muted/20">
        <div className="page-container max-w-3xl">
          <SectionHeader
            eyebrow="Charging economics"
            title="What home charging and public DC cost"
            description="Pulse charger from KES 79,000, a home charging day about KES 140 vs ~KES 1,000 diesel, public DC in under 30 minutes from KES 39/kWh — session price is always shown before you charge."
          />
          <div className="mt-8">
            <FaqAccordion items={chargingServicesFaqs} />
          </div>
        </div>
      </section>
    </>
  );
}
