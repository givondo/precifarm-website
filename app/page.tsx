import type { Metadata } from "next";

import HomeHero from "@/components/home/HomeHero";
import HomePanels from "@/components/home/HomePanels";
import HomeProof from "@/components/home/HomeProof";
import HomeScenarios from "@/components/home/HomeScenarios";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { createPageSeo } from "@/lib/seo";
import { getHomepageFaqsForSchema } from "@/lib/seo/cms-content";
import { getPageSeo } from "@/lib/seo/pages/registry";

export const revalidate = 3600;

const pageSeo = getPageSeo("/")!;

async function homeSeo() {
  const cmsFaqs = await getHomepageFaqsForSchema();
  return createPageSeo({
    ...pageSeo,
    faqs: cmsFaqs.length > 0 ? cmsFaqs : pageSeo.faqs,
  });
}

export async function generateMetadata(): Promise<Metadata> {
  return (await homeSeo()).metadata;
}

export default async function Home() {
  const seo = await homeSeo();

  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <div className="hx-page">
        <HomeHero />
        <HomePanels />
        <HomeProof />
        <HomeScenarios />
        <HomeFinalCta />
      </div>
    </>
  );
}
