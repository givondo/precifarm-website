import type { Metadata } from "next";
import PulsePlusView from "@/components/charging/PulsePlusView";
import JsonLd from "@/components/seo/JsonLd";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/charging/pulse-plus");

export default function PulsePlusPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/charging/pulse-plus")} />
      <PulsePlusView />
    </>
  );
}
