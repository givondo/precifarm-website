import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import PoliciesHubView from "@/components/legal/PoliciesHubView";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";
import { legalHubPath } from "@/lib/legal/paths";

export const metadata: Metadata = pageMetadata(legalHubPath);

export default function LegalHubPage() {
  return (
    <>
      <JsonLd data={pageJsonLd(legalHubPath)} />
      <PoliciesHubView />
    </>
  );
}
