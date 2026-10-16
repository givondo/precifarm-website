import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import LegalPolicyView from "@/components/legal/LegalPolicyView";
import { legalDocMeta, termsFaqs, termsOfUseSections } from "@/lib/legal/content";
import { termsOfUsePath } from "@/lib/legal/paths";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata(termsOfUsePath);

export default function TermsPage() {
  const meta = legalDocMeta("terms");
  return (
    <>
      <JsonLd data={pageJsonLd(termsOfUsePath)} />
      <LegalPolicyView
        title={meta.title}
        lead="Rules for using precifarm.com, our content, and Precifarm Agent."
        path={termsOfUsePath}
        sections={termsOfUseSections}
        faqs={termsFaqs}
      />
    </>
  );
}
