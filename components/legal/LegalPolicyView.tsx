import Link from "next/link";
import FaqList from "@/components/faq/FaqList";
import { LegalSections } from "@/components/legal/LegalSections";
import ArticleToc from "@/components/publications/ArticleToc";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import type { LegalSection } from "@/lib/legal/content";
import { legalEffectiveDate, legalEntity, legalHubPath, sitePolicyDocuments } from "@/lib/legal/paths";
import { sectionId, slugify, type TocItem } from "@/lib/publications";
import type { FaqItem } from "@/lib/seo/types";

type Props = {
  title: string;
  lead: string;
  path: string;
  sections: readonly LegalSection[];
  faqs?: FaqItem[];
};

/** One policy: section index beside the text on wide screens, a collapsed index above it on phones. */
export default function LegalPolicyView({ title, lead, path, sections, faqs }: Props) {
  const toc: TocItem[] = [
    ...sections.map((s) => ({ id: sectionId(s.title), label: s.title.replace(/^\d+\.\s*/, ""), level: 2 as const })),
    ...(faqs?.length ? [{ id: "policy-questions", label: "Questions", level: 2 as const }] : []),
  ];
  const others = sitePolicyDocuments.filter((d) => d.href !== path);

  return (
    <>
      <header className="border-b border-border bg-[linear-gradient(180deg,#f6f7f8_0%,#ffffff_100%)]">
        <div className="interior-container py-8 sm:py-12">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Legal & policies", href: legalHubPath },
              { name: title, href: path },
            ]}
          />
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-charge-600">Legal · {legalEntity.publicName}</p>
            <h1 className="heading-display mt-4 text-[1.875rem] leading-[1.1] sm:text-4xl">{title}</h1>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-forest-600">{lead}</p>
            <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5 text-sm">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Effective</dt>
                <dd className="mt-1 text-forest-800">{legalEffectiveDate}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Sections</dt>
                <dd className="mt-1 text-forest-800">{sections.length}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Applies to</dt>
                <dd className="mt-1 text-forest-800">{legalEntity.siteUrl.replace("https://", "")}</dd>
              </div>
            </dl>
          </div>
        </div>
      </header>

      <div className="interior-container grid gap-10 py-10 sm:py-14 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[16rem_minmax(0,44rem)_1fr]">
        <aside className="lg:sticky lg:top-[calc(var(--site-header-height)+1.5rem)] lg:self-start">
          <ArticleToc items={toc} variant="rail" label="Sections" />
          <p className="mt-6 hidden text-sm lg:block">
            <Link href={legalHubPath} className="font-semibold text-charge-700 hover:underline">
              ‹ All policies
            </Link>
          </p>
        </aside>
        <div className="min-w-0">
          <ArticleToc items={toc} variant="inline" label="Sections" />
          <div className="mt-6 lg:mt-0">
            <LegalSections sections={sections} />
          </div>

          {faqs?.length ? (
            <section id="policy-questions" aria-labelledby="policy-questions-h" className="mt-12 scroll-mt-28">
              <h2 id="policy-questions-h" className="font-display text-lg font-semibold tracking-tight text-forest-950 sm:text-xl">
                Questions
              </h2>
              <div className="mt-4">
                <FaqList items={faqs.map((f) => ({ id: `q-${slugify(f.question)}`, question: f.question, answer: f.answer }))} />
              </div>
            </section>
          ) : null}

          <p className="mt-10 rounded-xl bg-[#f6f7f8] px-4 py-3 text-sm text-forest-600 ring-1 ring-border">
            {title} effective {legalEffectiveDate}. Operated by {legalEntity.legalName}, {legalEntity.country}.
          </p>

          <nav aria-label="Other policies" className="mt-10">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Other policies</p>
            <ul className="mt-3 divide-y divide-border border-y border-border">
              {others.map((d) => (
                <li key={d.href}>
                  <Link href={d.href} className="group flex min-h-14 items-center justify-between gap-4 py-3">
                    <span>
                      <span className="block font-semibold text-forest-950 group-hover:text-charge-700">{d.title}</span>
                      <span className="block text-sm text-forest-600">{d.description}</span>
                    </span>
                    <span aria-hidden className="text-forest-300 group-hover:text-charge-600">
                      ›
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
