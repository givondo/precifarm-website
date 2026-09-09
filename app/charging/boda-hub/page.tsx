import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import BodaHubView from "@/components/boda-hub/BodaHubView";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/charging/boda-hub");

export default function BodaHubPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/charging/boda-hub")} />
      <BodaHubView />
    </>
  );
}
