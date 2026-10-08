import type { Metadata } from "next";

import HomeAnnouncement from "@/components/home/HomeAnnouncement";
import HomePageGate from "@/components/home/HomePageGate";
import HomeHero from "@/components/home/HomeHero";
import HomeChargingCta from "@/components/home/HomeChargingCta";
import HomeScenarios from "@/components/home/HomeScenarios";
import HomeWhyPrecifarm from "@/components/home/HomeWhyPrecifarm";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import JsonLd from "@/components/seo/JsonLd";
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
      <HomePageGate>
        <div className="bg-white">
          <HomeAnnouncement />
          <HomeHero />
          <HomeScenarios />
          <HomeChargingCta />
          <HomeWhyPrecifarm />
          <HomeFinalCta />
        </div>
      </HomePageGate>
    </>
  );
}
