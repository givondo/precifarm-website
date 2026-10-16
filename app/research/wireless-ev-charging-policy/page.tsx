import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import WirelessChargingPolicyView from "@/components/research/WirelessChargingPolicyView";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";
import { wirelessChargingPolicyPath } from "@/lib/wireless-charging-policy-page";

export const metadata: Metadata = pageMetadata(wirelessChargingPolicyPath);

export default function WirelessChargingPolicyPage() {
  return (
    <>
      <JsonLd data={pageJsonLd(wirelessChargingPolicyPath)} />
      <WirelessChargingPolicyView />
    </>
  );
}
