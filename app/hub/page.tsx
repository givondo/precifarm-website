import type { Metadata } from "next";
import ChargingHubView from "@/components/charging-hub/ChargingHubView";
import JsonLd from "@/components/seo/JsonLd";
import { chargingHub } from "@/lib/charging-hub";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata(chargingHub.path);

export default function ChargingHubPage() {
  return (
    <>
      <JsonLd data={pageJsonLd(chargingHub.path)} />
      <ChargingHubView />
    </>
  );
}
