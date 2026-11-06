import type { Metadata } from "next";
import Link from "next/link";
import ChargingSection from "@/components/ChargingSection";
import { InteriorHero, InteriorSection } from "@/components/interior";
import FaqAccordion from "@/components/seo/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import { chargingHeroFacts, chargingPage } from "@/lib/charging";
import { chargingServicesFaqs } from "@/lib/charging-faqs";
import { siteCtas } from "@/lib/site-copy";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/charging");

export default function ChargingPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/charging")} />
      <InteriorHero
        eyebrow={chargingPage.eyebrow}
        title={chargingPage.title}
        lead={chargingPage.description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Charging", href: "/charging" },
        ]}
        actions={[
          { href: "#explore", label: "Find your charger" },
          { href: siteCtas.chargingHub.href, label: "Open Charging Hub", variant: "secondary" },
        ]}
        facts={chargingHeroFacts}
      />

      <ChargingSection />

      <InteriorSection
        id="questions"
        tone="silver"
        width="narrow"
        eyebrow="Questions"
        title="Common questions"
        lead="Pricing, Lipa Pole Pole and which product fits your day."
        aside={
          <Link href={siteCtas.allFaq.href} className="inline-flex min-h-11 items-center text-sm font-semibold">
            {siteCtas.allFaq.label} <span aria-hidden className="ml-1">›</span>
          </Link>
        }
      >
        <FaqAccordion items={chargingServicesFaqs} />
      </InteriorSection>
    </>
  );
}
