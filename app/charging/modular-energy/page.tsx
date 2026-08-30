import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import SiteImage from "@/components/SiteImage";
import SpecTable from "@/components/modular-energy/SpecTable";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { modularEnergyPage as page } from "@/lib/modular-energy-page";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/charging/modular-energy");

export default function ModularEnergyPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/charging/modular-energy")} />
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Modular energy", href: "/charging/modular-energy" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={page.hero.primaryCta.href}
            className="inline-flex items-center justify-center rounded-full bg-charge-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-charge-500"
          >
            {page.hero.primaryCta.label}
          </Link>
          <Link
            href={page.hero.secondaryCta.href}
            className="inline-flex items-center justify-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-forest-900 transition-colors hover:bg-muted"
          >
            {page.hero.secondaryCta.label}
          </Link>
        </div>
        <p className="mt-4 text-sm text-forest-500">{page.hero.note}</p>
      </PageHero>

      <section className="border-b border-border bg-white pb-12 sm:pb-16">
        <div className="page-container">
          <figure className="overflow-hidden rounded-[1.75rem] border border-border bg-[#f5f5f7]">
            <SiteImage
              src={page.hero.image.src}
              alt={page.hero.image.alt}
              width={1600}
              height={900}
              priority
              sizes="100vw"
              className="h-auto w-full object-contain"
            />
          </figure>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container">
          <SectionHeader
            eyebrow={page.familyTable.eyebrow}
            title={page.familyTable.title}
            className="mb-8"
          />
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <p className="border-b border-border bg-muted/30 px-5 py-3 text-sm text-forest-600 sm:px-6">
              {page.familyTable.caption}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="bg-forest-800 text-white">
                  <tr>
                    {page.familyTable.columns.map((col) => (
                      <th key={col} className="px-5 py-3.5 font-semibold sm:px-6">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-white">
                  {page.familyTable.rows.map((row) => (
                    <tr key={row.name}>
                      <td className="px-5 py-4 font-medium sm:px-6">
                        <Link href={row.href} className="text-forest-900 hover:text-charge-700">
                          {row.name} ›
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-forest-600 sm:px-6">{row.role}</td>
                      <td className="px-5 py-4 font-mono text-forest-900 sm:px-6">{row.scale}</td>
                      <td className="px-5 py-4 text-forest-600 sm:px-6">{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container">
          <SectionHeader
            eyebrow={page.kenyaTable.eyebrow}
            title={page.kenyaTable.title}
            className="mb-8"
          />
          <SpecTable columns={page.kenyaTable.columns} rows={page.kenyaTable.rows} />
        </div>
      </section>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container">
          <SectionHeader
            eyebrow={page.targetsTable.eyebrow}
            title={page.targetsTable.title}
            className="mb-8"
          />
          <SpecTable columns={page.targetsTable.columns} rows={page.targetsTable.rows} />
        </div>
      </section>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container">
          <SectionHeader
            eyebrow={page.chargingTable.eyebrow}
            title={page.chargingTable.title}
            className="mb-8"
          />
          <SpecTable columns={page.chargingTable.columns} rows={page.chargingTable.rows} />
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
