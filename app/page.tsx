import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import HomeBookingSteps from "@/components/home/HomeBookingSteps";
import HomeHubSpotlight from "@/components/home/HomeHubSpotlight";
import HomeRouteShowcase from "@/components/home/HomeRouteShowcase";
import HomeStatsBand from "@/components/home/HomeStatsBand";
import HomeChargingCta from "@/components/home/HomeChargingCta";
import HomeFaqSection from "@/components/home/HomeFaqSection";
import JsonLd from "@/components/seo/JsonLd";
import ValueProposition from "@/components/ValueProposition";
import { createPageSeo } from "@/lib/seo";
import { getPageSeo } from "@/lib/seo/pages/registry";

const pageSeo = getPageSeo("/")!;
const seo = createPageSeo(pageSeo);

export const metadata: Metadata = seo.metadata;

export default function Home() {
  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <div className="bg-white">
        <HomeHero />

        <HomeStatsBand />

        <HomeRouteShowcase />

        <HomeBookingSteps />

        <ValueProposition />

        <HomeHubSpotlight />

        <HomeChargingCta />

        <HomeFaqSection />
      </div>
    </>
  );
}
