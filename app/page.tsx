import type { Metadata } from "next";

import HomeAnnouncement from "@/components/home/HomeAnnouncement";

import HomeHero from "@/components/home/HomeHero";

import HomeScenarios from "@/components/home/HomeScenarios";

import HomeFlagships from "@/components/home/HomeFlagships";

import HomeRangeCompact from "@/components/home/HomeRangeCompact";

import HomeSupport from "@/components/home/HomeSupport";

import HomeEnergySection from "@/components/home/HomeEnergySection";

import ValueProposition from "@/components/ValueProposition";

import HomeEvCarsComparison from "@/components/home/HomeEvCarsComparison";

import HomeAppDownload from "@/components/home/HomeAppDownload";

import HomeFaqSection from "@/components/home/HomeFaqSection";

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

      <div className="bg-white">

        <HomeAnnouncement />

        <HomeHero />

        <HomeScenarios />

        <HomeFlagships />

        <HomeRangeCompact />

        <HomeSupport />

        <HomeEnergySection />

        <ValueProposition compact />

        <HomeEvCarsComparison />

        <HomeAppDownload />

        <HomeFaqSection />

        <HomeFinalCta />

      </div>

    </>

  );

}

