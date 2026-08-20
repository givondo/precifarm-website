import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import FaqAccordion from "@/components/seo/FaqAccordion";
import PageHero from "@/components/ui/PageHero";
import { hubEngineeringFaqs } from "@/lib/charging-faqs";
import { engineeringDoc } from "@/lib/engineering-doc";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/charging/engineering");

export default function ChargingEngineeringPage() {
  const doc = engineeringDoc;

  return (
    <>
      <JsonLd data={pageJsonLd("/charging/engineering")} />
      <PageHero
        eyebrow="Engineering"
        title={doc.title}
        description={doc.description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Charging", href: "/charging" },
          { name: "Engineering package", href: "/charging/engineering" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={doc.downloadHref}
            download="precifarm-solar-charger-stations-engineering.pdf"
            className="inline-flex items-center justify-center rounded-full bg-charge-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-charge-500"
          >
            {doc.downloadLabel}
          </a>
          <a
            href={doc.downloadHtmlHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-forest-900 transition-colors hover:bg-muted"
          >
            View HTML version
          </a>
        </div>
        <p className="mt-4 text-sm text-forest-500">
          {doc.id} · v{doc.version} · {doc.date} · {doc.printHint}
        </p>
      </PageHero>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container">
          <div className="grid gap-5 sm:grid-cols-3">
            {doc.highlights.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-muted/30 p-5">
                <h2 className="font-semibold text-forest-900">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-forest-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border">
        <div className="page-container">
          <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-charge-600">
            Figures
          </p>
          <h2 className="heading-display mt-3 text-2xl sm:text-3xl">Visual design basis</h2>
          <p className="mt-3 max-w-2xl text-base text-forest-600">
            Concept imagery for the route hub, system architecture, typical two-bay site plan and
            private house hybrid. Not construction drawings. The PDF includes the photo annex.
          </p>

          <div className="mt-10 space-y-10">
            {doc.figures.map((figure) => (
              <figure key={figure.src} className="overflow-hidden rounded-2xl border border-border bg-white">
                <Image
                  src={figure.src}
                  alt={figure.alt}
                  width={1200}
                  height={675}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 880px"
                />
                <figcaption className="border-t border-border px-5 py-3 text-sm text-forest-600">
                  {figure.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-muted/20">
        <div className="page-container max-w-3xl">
          <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-charge-600">
            Economics
          </p>
          <h2 className="heading-display mt-3 text-2xl sm:text-3xl">Hub energy and payback questions</h2>
          <p className="mt-3 text-base text-forest-600">
            Planning assumptions from the design basis — not quotations or live consumer tariffs.
            Public DC is from KES 39/kWh; home Pulse charger starts from KES 79,000.
          </p>
          <div className="mt-8">
            <FaqAccordion items={hubEngineeringFaqs} />
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-charge-50/40">
        <div className="page-container max-w-3xl">
          <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-charge-600">
            What&apos;s inside the download
          </p>
          <h2 className="heading-display mt-3 text-2xl sm:text-3xl">Design doc + task sheet</h2>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-forest-600">
            {doc.contents.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={doc.downloadHref}
              download="precifarm-solar-charger-stations-engineering.pdf"
              className="inline-flex items-center justify-center rounded-full bg-charge-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-charge-500"
            >
              {doc.downloadLabel}
            </a>
            {doc.related.map((link) => (
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
    </>
  );
}
