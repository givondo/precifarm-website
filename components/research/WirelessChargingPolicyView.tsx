import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqAccordion from "@/components/seo/FaqAccordion";
import PageCTA from "@/components/ui/PageCTA";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  wirelessChargingPolicyEffective,
  wirelessChargingPolicyFaqs,
  wirelessChargingPolicyPage,
  wirelessChargingPolicyPath,
  wirelessIndustryBenchmarks,
} from "@/lib/wireless-charging-policy-page";
import { legalHubPath } from "@/lib/legal/paths";
import { researchNavLabel, researchPath } from "@/lib/research-page";

export default function WirelessChargingPolicyView() {
  const page = wirelessChargingPolicyPage;

  return (
    <>
      <section className="page-hero border-b border-border">
        <div className="page-container max-w-3xl py-8 sm:py-12">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Legal & policies", href: legalHubPath },
              { name: "Wireless charging R&D", href: wirelessChargingPolicyPath },
            ]}
          />
          <p className="text-eyebrow mt-8">{page.hero.eyebrow}</p>
          <h1 className="heading-display mt-4 text-[1.75rem] leading-[1.12] sm:text-3xl lg:text-4xl">
            {page.hero.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-forest-600 sm:text-lg">{page.hero.lead}</p>
          <p className="mt-4 text-sm text-forest-500">Effective {wirelessChargingPolicyEffective}</p>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container max-w-3xl prose-policy space-y-10">
          <div>
            <h2 className="text-lg font-semibold text-forest-900">{page.scope.title}</h2>
            {page.scope.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-3 text-sm leading-relaxed text-forest-600">
                {p}
              </p>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-forest-900">{page.principles.title}</h2>
            <ul className="mt-4 space-y-2">
              {page.principles.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-forest-600 before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-charge-500"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-forest-900">{page.benchmarksIntro.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-forest-600">{page.benchmarksIntro.description}</p>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-border bg-muted/40">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-forest-900">Reference</th>
                    <th className="px-4 py-3 font-semibold text-forest-900">Industry benchmark</th>
                    <th className="px-4 py-3 font-semibold text-forest-900">How Precifarm uses it</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {wirelessIndustryBenchmarks.map((row) => (
                    <tr key={row.source} className="bg-white">
                      <td className="px-4 py-3 align-top font-medium text-forest-900">{row.source}</td>
                      <td className="px-4 py-3 align-top text-forest-700">{row.benchmark}</td>
                      <td className="px-4 py-3 align-top text-forest-600">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-forest-900">{page.targets.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-forest-600">{page.targets.description}</p>
            <ul className="mt-4 space-y-2">
              {page.targets.items.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-forest-600">
                  · {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-forest-900">{page.governance.title}</h2>
            {page.governance.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-3 text-sm leading-relaxed text-forest-600">
                {p}
              </p>
            ))}
            <p className="mt-4 text-sm">
              <Link href={researchPath} className="font-medium text-charge-700 hover:underline">
                View R&D progress →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30 section-pad">
        <div className="page-container max-w-3xl">
          <SectionHeader eyebrow="FAQ" title="Policy FAQ" />
          <div className="mt-8">
            <FaqAccordion items={wirelessChargingPolicyFaqs} />
          </div>
        </div>
      </section>

      <PageCTA
        title={page.cta.title}
        description={page.cta.description}
        primaryHref={page.cta.primaryHref}
        primaryLabel={page.cta.primaryLabel}
        secondaryHref={page.cta.secondaryHref}
        secondaryLabel={page.cta.secondaryLabel}
      />
    </>
  );
}
