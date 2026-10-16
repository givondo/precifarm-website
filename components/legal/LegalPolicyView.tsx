import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqAccordion from "@/components/seo/FaqAccordion";
import { LegalSections } from "@/components/legal/LegalSections";
import type { LegalSection } from "@/lib/legal/content";
import type { FaqItem } from "@/lib/seo/types";
import { legalEffectiveDate, legalHubPath } from "@/lib/legal/paths";

type Props = {
  title: string;
  lead: string;
  path: string;
  sections: readonly LegalSection[];
  faqs?: FaqItem[];
};

export default function LegalPolicyView({ title, lead, path, sections, faqs }: Props) {
  return (
    <>
      <section className="page-hero border-b border-border">
        <div className="page-container max-w-3xl py-8 sm:py-12">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Legal & policies", href: legalHubPath },
              { name: title, href: path },
            ]}
          />
          <p className="text-eyebrow mt-8">Legal</p>
          <h1 className="heading-display mt-4 text-[1.85rem] leading-[1.08] sm:text-3xl">{title}</h1>
          <p className="mt-5 text-base leading-relaxed text-forest-600">{lead}</p>
          <p className="mt-4 text-sm text-forest-500">Effective {legalEffectiveDate}</p>
          <p className="mt-4 text-sm">
            <Link href={legalHubPath} className="font-medium text-charge-700 hover:underline">
              ← All policies
            </Link>
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container max-w-3xl">
          <LegalSections sections={sections} />
        </div>
      </section>

      {faqs?.length ? (
        <section className="border-b border-border bg-muted/30 section-pad">
          <div className="page-container max-w-3xl">
            <h2 className="text-lg font-semibold text-forest-900">FAQ</h2>
            <div className="mt-8">
              <FaqAccordion items={faqs} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
