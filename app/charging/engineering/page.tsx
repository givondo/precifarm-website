import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import FaqAccordion from "@/components/seo/FaqAccordion";
import ProductShowcaseRow from "@/components/ProductShowcaseRow";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import SpecTable from "@/components/modular-energy/SpecTable";
import { engineeringDoc } from "@/lib/engineering-doc";
import { engineeringPage, engineeringPageFaqs } from "@/lib/engineering-page";
import { productNames } from "@/lib/home-products";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/charging/engineering");

export default function ChargingEngineeringPage() {
  const {
    hero,
    audience,
    siteTypes,
    energyStack,
    productFit,
    holdPoints,
    process,
    figures,
    faqs,
    download,
    cta,
  } = engineeringPage;

  return (
    <>
      <JsonLd data={pageJsonLd("/charging/engineering")} />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Charging", href: "/charging" },
          { name: "Engineering", href: "/charging/engineering" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={hero.primaryHref}
            download="precifarm-solar-charger-stations-engineering.pdf"
            className="inline-flex items-center justify-center rounded-full bg-charge-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-charge-500"
          >
            {hero.primaryLabel}
          </a>
          <Link
            href={hero.secondaryHref}
            className="inline-flex items-center justify-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-forest-900 transition-colors hover:bg-muted"
          >
            {hero.secondaryLabel}
          </Link>
          <a
            href={engineeringDoc.downloadHtmlHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-forest-900 transition-colors hover:bg-muted"
          >
            View HTML
          </a>
        </div>
        <p className="mt-4 text-sm text-forest-500">{hero.meta}</p>
      </PageHero>

      <section className="border-b border-border bg-muted/20 section-pad">
        <div className="page-container">
          <SectionHeader eyebrow={audience.eyebrow} title={audience.title} />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {audience.cards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-forest-900">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-forest-600">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container space-y-14">
          <div>
            <SectionHeader eyebrow={siteTypes.eyebrow} title={siteTypes.title} />
            <div className="mt-8">
              <SpecTable
                caption={siteTypes.caption}
                columns={siteTypes.columns}
                rows={siteTypes.rows}
              />
            </div>
          </div>

          <div>
            <SectionHeader
              eyebrow={energyStack.eyebrow}
              title={energyStack.title}
              description={energyStack.description}
            />
            <div className="mt-8">
              <SpecTable columns={energyStack.columns} rows={energyStack.rows} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 section-pad">
        <div className="page-container">
          <SectionHeader eyebrow={productFit.eyebrow} title={productFit.title} />
          <div className="mt-8">
            <ProductShowcaseRow
              products={productFit.products.map((item) => ({
                src: item.src,
                alt: item.alt,
                label: productNames[item.id as keyof typeof productNames],
              }))}
            />
          </div>
          <div className="mt-10">
            <SpecTable columns={productFit.columns} rows={productFit.rows} />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow={holdPoints.eyebrow} title={holdPoints.title} />
            <div className="mt-8">
              <SpecTable
                caption={holdPoints.caption}
                columns={holdPoints.columns}
                rows={holdPoints.rows}
              />
            </div>
          </div>
          <div>
            <SectionHeader eyebrow={process.eyebrow} title={process.title} />
            <ol className="mt-8 space-y-5">
              {process.steps.map((item) => (
                <li key={item.step} className="flex gap-4 rounded-2xl border border-border bg-muted/30 p-5">
                  <span className="font-mono text-sm font-semibold text-charge-600">{item.step}</span>
                  <div>
                    <h3 className="font-semibold text-forest-900">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-forest-600">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow={figures.eyebrow}
            title={figures.title}
            description={figures.description}
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {figures.items.map((figure) => (
              <figure key={figure.src} className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                <Image
                  src={figure.src}
                  alt={figure.alt}
                  width={1200}
                  height={675}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 440px"
                />
                <figcaption className="border-t border-border px-5 py-3 text-sm leading-relaxed text-forest-600">
                  {figure.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container max-w-3xl">
          <SectionHeader
            eyebrow={faqs.eyebrow}
            title={faqs.title}
            description={faqs.description}
          />
          <div className="mt-8">
            <FaqAccordion items={[...engineeringPageFaqs]} />
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-charge-50/40">
        <div className="page-container max-w-3xl">
          <SectionHeader title={download.title} description={download.description} />
          <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-forest-600">
            {engineeringDoc.contents.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={engineeringDoc.downloadHref}
              download="precifarm-solar-charger-stations-engineering.pdf"
              className="inline-flex items-center justify-center rounded-full bg-charge-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-charge-500"
            >
              {engineeringDoc.downloadLabel}
            </a>
            {download.related.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-forest-900 transition-colors hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title={cta.title}
        description={cta.description}
        primaryHref={cta.primaryHref}
        primaryLabel={cta.primaryLabel}
        secondaryHref={cta.secondaryHref}
        secondaryLabel={cta.secondaryLabel}
      />
    </>
  );
}
