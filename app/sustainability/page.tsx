import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import SustainabilityView from "@/components/sustainability/SustainabilityView";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/sustainability");

export default function SustainabilityPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/sustainability")} />
      <SustainabilityView />
    </>
  );
}
