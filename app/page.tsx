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
import { getHomepageFaqsForSchema } from "@/lib/seo/cms-content";
import { getPageSeo } from "@/lib/seo/pages/registry";

export const revalidate = 3600;

const pageSeo = getPageSeo("/")!;

export async function generateMetadata(): Promise<Metadata> {
  const cmsFaqs = await getHomepageFaqsForSchema();
  return createPageSeo({
    ...pageSeo,
    faqs: cmsFaqs.length > 0 ? cmsFaqs : pageSeo.faqs,
  }).metadata;
}

export default async function Home() {
  const cmsFaqs = await getHomepageFaqsForSchema();
  const seo = createPageSeo({
    ...pageSeo,
    faqs: cmsFaqs.length > 0 ? cmsFaqs : pageSeo.faqs,
  });

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
