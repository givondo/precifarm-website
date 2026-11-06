import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { cookiesPolicySections, legalHubContent, privacyPolicySections, termsOfUseSections } from "@/lib/legal/content";
import { cookiesPolicyPath, legalEffectiveDate, legalEntity, legalHubPath, privacyPolicyPath, sitePolicyDocuments, termsOfUsePath } from "@/lib/legal/paths";
import { contact } from "@/lib/contact";
import { sectionId } from "@/lib/publications";

const sectionsByPath: Record<string, readonly { title: string }[]> = {
  [termsOfUsePath]: termsOfUseSections,
  [privacyPolicyPath]: privacyPolicySections,
  [cookiesPolicyPath]: cookiesPolicySections,
};

/** Index of policy documents with each one's sections, so a reader can jump straight to a clause. */
export default function PoliciesHubView() {
  return (
    <>
      <header className="border-b border-border bg-[linear-gradient(180deg,#f6f7f8_0%,#ffffff_100%)]">
        <div className="interior-container py-8 sm:py-12 lg:py-14">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Legal & policies", href: legalHubPath },
            ]}
          />
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-charge-600">{legalHubContent.hero.eyebrow}</p>
            <h1 className="heading-display mt-4 text-[1.875rem] leading-[1.1] sm:text-4xl">{legalHubContent.hero.title}</h1>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-forest-600 sm:text-lg">{legalHubContent.hero.lead}</p>
            <p className="mt-6 text-sm text-forest-500">Policies effective {legalEffectiveDate}</p>
          </div>
        </div>
      </header>

      <section aria-labelledby="policies-title" className="bg-white">
        <div className="interior-container py-12 sm:py-16">
          <h2 id="policies-title" className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">
            {sitePolicyDocuments.length} documents
          </h2>
          <ol className="mt-5 grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border md:grid-cols-2">
            {sitePolicyDocuments.map((doc, i) => {
              const sections = sectionsByPath[doc.href];
              return (
                <li key={doc.href} className="flex flex-col bg-white p-5 sm:p-7">
                  <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest text-forest-500">
                    <span className="font-mono text-forest-400">{String(i + 1).padStart(2, "0")}</span>
                    {doc.category}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
                    <Link href={doc.href} className="text-forest-950 hover:text-charge-700">
                      {doc.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-forest-600">{doc.description}</p>
                  {sections ? (
                    <ul aria-label={`${doc.title} sections`} className="mt-5 flex flex-wrap gap-1.5">
                      {sections.map((s) => (
                        <li key={s.title}>
                          <Link
                            href={`${doc.href}#${sectionId(s.title)}`}
                            className="inline-flex min-h-8 items-center rounded-full bg-[#f1f3f4] px-3 text-xs text-forest-700 hover:bg-forest-100 hover:text-forest-950"
                          >
                            {s.title.replace(/^\d+\.\s*/, "")}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <Link href={doc.href} className="mt-auto inline-flex min-h-11 items-center pt-5 text-sm font-semibold text-charge-700 hover:underline">
                    Read {doc.title.toLowerCase()} ›
                  </Link>
                </li>
              );
            })}
          </ol>

          <div className="mt-10 grid gap-4 rounded-2xl bg-[#f6f7f8] p-5 text-sm ring-1 ring-border sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-6">
            <p className="text-forest-700">
              Questions about a policy or a privacy request: write to{" "}
              <a href={`mailto:${contact.email}`} className="font-semibold text-forest-950 underline underline-offset-2">
                {contact.email}
              </a>
              . {legalEntity.publicName}, {contact.hq}.
            </p>
            <Link href="/contact?interest=general" className="inline-flex min-h-11 items-center justify-center rounded-full border border-forest-200 bg-white px-5 font-semibold text-forest-900 hover:border-forest-300">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
