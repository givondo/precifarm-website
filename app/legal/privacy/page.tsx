import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import LegalPolicyView from "@/components/legal/LegalPolicyView";
import { legalDocMeta, privacyFaqs, privacyPolicySections } from "@/lib/legal/content";
import { privacyPolicyPath } from "@/lib/legal/paths";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata(privacyPolicyPath);

export default function PrivacyPage() {
  const meta = legalDocMeta("privacy");
  return (
    <>
      <JsonLd data={pageJsonLd(privacyPolicyPath)} />
      <LegalPolicyView
        title={meta.title}
        lead="How Precifarm collects and uses personal data on precifarm.com and Precifarm Agent."
        path={privacyPolicyPath}
        sections={privacyPolicySections}
        faqs={privacyFaqs}
      />
    </>
  );
}
