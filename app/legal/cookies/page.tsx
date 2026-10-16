import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import LegalPolicyView from "@/components/legal/LegalPolicyView";
import { cookiesFaqs, cookiesPolicySections, legalDocMeta } from "@/lib/legal/content";
import { cookiesPolicyPath } from "@/lib/legal/paths";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata(cookiesPolicyPath);

export default function CookiesPage() {
  const meta = legalDocMeta("cookies");
  return (
    <>
      <JsonLd data={pageJsonLd(cookiesPolicyPath)} />
      <LegalPolicyView
        title={meta.title}
        lead="Cookies, local storage, and analytics on precifarm.com."
        path={cookiesPolicyPath}
        sections={cookiesPolicySections}
        faqs={cookiesFaqs}
      />
    </>
  );
}
