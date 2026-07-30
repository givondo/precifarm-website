import type { Metadata } from "next";
import ChargingSection from "@/components/ChargingSection";
import JsonLd from "@/components/seo/JsonLd";
import PageHero from "@/components/ui/PageHero";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/charging");

export default function ChargingPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/charging")} />
      <PageHero
        eyebrow="Charging"
        title="Route hubs, private house charging and in-house stations for private entities"
        description="Precifarm delivers dependable DC fast charging on intercity routes, at private houses and on commercial private sites — designed, installed and operated by the same regional engineering teams."
      />
      <section className="border-b border-border bg-white">
        <ChargingSection />
      </section>
    </>
  );
}
