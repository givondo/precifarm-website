import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import ResearchView from "@/components/research/ResearchView";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";
import { researchPath } from "@/lib/research-page";

export const metadata: Metadata = pageMetadata(researchPath);

export default function ResearchPage() {
  return (
    <>
      <JsonLd data={pageJsonLd(researchPath)} />
      <ResearchView />
    </>
  );
}
