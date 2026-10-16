import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SectionHeader from "@/components/ui/SectionHeader";
import { legalHubContent } from "@/lib/legal/content";
import { legalEffectiveDate, legalHubPath, sitePolicyDocuments } from "@/lib/legal/paths";

export default function PoliciesHubView() {
  return (
    <>
      <section className="page-hero border-b border-border">
        <div className="page-container max-w-3xl py-8 sm:py-12">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Legal & policies", href: legalHubPath },
            ]}
          />
          <p className="text-eyebrow mt-8">{legalHubContent.hero.eyebrow}</p>
          <h1 className="heading-display mt-4 text-[1.85rem] leading-[1.08] sm:text-4xl">
            {legalHubContent.hero.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-forest-600 sm:text-lg">
            {legalHubContent.hero.lead}
          </p>
          <p className="mt-4 text-sm text-forest-500">Policies effective {legalEffectiveDate}</p>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container max-w-3xl">
          <SectionHeader eyebrow="Documents" title="All policy pages" />
          <ul className="mt-8 space-y-4">
            {sitePolicyDocuments.map((doc) => (
              <li key={doc.href}>
                <Link href={doc.href} className="card block p-5 transition-colors hover:border-charge-300 sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">
                    {doc.category}
                  </p>
                  <h2 className="mt-2 text-base font-semibold text-forest-900">{doc.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-forest-600">{doc.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
