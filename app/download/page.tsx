import type { Metadata } from "next";
import Link from "next/link";
import ApkButton from "@/components/download/ApkButton";
import CompanionPhone from "@/components/download/CompanionPhone";
import ProductPhoto from "@/components/ProductPhoto";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqAccordion from "@/components/seo/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import CheckItem from "@/components/ui/CheckItem";
import PageCTA from "@/components/ui/PageCTA";
import SectionHeader from "@/components/ui/SectionHeader";
import { appDownload } from "@/lib/app-download";
import { downloadPage } from "@/lib/download-page";
import { productImages } from "@/lib/product-images";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/download");

const siteTypeImage = {
  corridor: productImages.corridor,
  boda: productImages.boda,
  depot: productImages.depot,
} as const;

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Modular energy", href: "/charging/modular-energy" },
  { name: "AI companion", href: "/download" },
];

export default function DownloadPage() {
  const page = downloadPage;

  return (
    <>
      <JsonLd data={pageJsonLd("/download")} />

      <section className="page-hero">
        <div className="page-container relative max-w-6xl py-8 sm:py-12 lg:py-16">
          <Breadcrumbs items={breadcrumbs} />
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-charge-600">
                {page.hero.eyebrow}
              </p>
              <h1 className="heading-display mt-3 text-[1.75rem] leading-[1.12] sm:text-4xl sm:leading-tight lg:text-[2.75rem]">
                {page.hero.title}
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-forest-600 sm:text-base">
                {page.hero.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {page.hero.pills.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-charge-200 bg-charge-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-charge-700"
                  >
                    {pill}
                  </span>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <ApkButton href={appDownload.apkUrl} download={appDownload.fileName}>
                  {page.hero.primaryLabel}
                </ApkButton>
                <Link
                  href={page.hero.secondaryHref}
                  className="inline-flex items-center justify-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-forest-900 transition-colors hover:bg-muted"
                >
                  {page.hero.secondaryLabel}
                </Link>
                <a
                  href={page.hero.pdfHref}
                  className="inline-flex items-center justify-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-forest-900 transition-colors hover:bg-muted"
                >
                  {page.hero.pdfLabel}
                </a>
              </div>
              <p className="mt-4 text-sm text-forest-500">{page.hero.meta}</p>
            </div>
            <CompanionPhone caption={page.hero.phoneCaption} />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-forest-950 text-white">
        <div className="page-container max-w-6xl">
          <div className="grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {page.stats.map((item) => (
              <div key={item.stat} className="px-1 py-8 sm:px-8 sm:py-10">
                <p className="font-mono text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {item.stat}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container max-w-6xl">
          <SectionHeader
            eyebrow={page.jobs.eyebrow}
            title={page.jobs.title}
            description={page.jobs.description}
          />
          <div className="mt-12 space-y-16">
            {page.jobs.items.map((job, index) => (
              <article
                key={job.step}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
              >
                <figure
                  className={`overflow-hidden rounded-[1.75rem] border border-border bg-muted/30 ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <ProductPhoto
                    src={job.image}
                    alt={job.imageAlt}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="mx-auto aspect-[4/3] w-full object-contain p-6 sm:p-10"
                    priority={index === 0}
                  />
                </figure>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="font-mono text-xs font-semibold tracking-widest text-charge-600">
                    {job.step} · {job.kicker}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-forest-900">
                    {job.title}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-forest-600">{job.text}</p>
                  <Link
                    href={job.href}
                    className="mt-5 inline-flex text-sm font-semibold text-charge-700 hover:text-charge-600"
                  >
                    {job.label} ›
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-muted/20">
        <div className="page-container max-w-6xl">
          <SectionHeader
            eyebrow={page.context.eyebrow}
            title={page.context.title}
            description={page.context.lead}
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-forest-500">
                {page.context.typicalTitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-forest-600">{page.context.typicalText}</p>
            </div>
            <div className="rounded-2xl border border-charge-200 bg-charge-50/70 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-charge-700">
                {page.context.oursTitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-forest-700">{page.context.oursText}</p>
            </div>
          </div>
          <div className="training-table-shell mt-8">
            <div className="training-table-wrap">
              <div className="training-table-scroll">
                <table className="training-table w-full text-left text-sm" style={{ minWidth: "640px" }}>
                  <caption className="training-table-caption">
                    <span className="training-table-caption-label">
                      Typical Kenya charging app vs Precifarm companion
                    </span>
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Job</th>
                      <th scope="col">Typical app</th>
                      <th scope="col">Precifarm companion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {page.context.rows.map((row) => (
                      <tr key={row[0]}>
                        <th scope="row">{row[0]}</th>
                        <td className="training-cell-muted">{row[1]}</td>
                        <td className="training-cell-emphasis">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container max-w-6xl">
          <SectionHeader
            eyebrow={page.features.eyebrow}
            title={page.features.title}
            description={page.features.description}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {page.features.cards.map((card, i) => (
              <div key={card.title} className="rounded-2xl border border-border bg-muted/20 p-6">
                <p className="font-mono text-xs font-semibold tracking-widest text-charge-600">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-semibold text-forest-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-600">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container max-w-6xl">
          <SectionHeader
            eyebrow={page.siteTypes.eyebrow}
            title={page.siteTypes.title}
            description={page.siteTypes.description}
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {page.siteTypes.types.map((type) => {
              const image = siteTypeImage[type.imageKey];
              return (
                <Link
                  key={type.id}
                  href={type.href}
                  className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-border bg-muted/20 transition-all hover:border-forest-300 hover:bg-white hover:shadow-lg"
                >
                  <div className="bg-white px-5 pb-2 pt-6">
                    <ProductPhoto
                      src={image.src}
                      alt={image.alt}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="mx-auto aspect-[4/3] w-full max-w-[220px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-6 pb-7 pt-2">
                    <p className="font-mono text-sm font-bold text-charge-600">{type.stat}</p>
                    <h3 className="mt-1 text-xl font-semibold text-forest-900">{type.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-600">{type.detail}</p>
                    <span className="mt-4 text-sm font-medium text-forest-900">Learn more ›</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-muted/20">
        <div className="page-container max-w-6xl">
          <SectionHeader eyebrow={page.status.eyebrow} title={page.status.title} />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-green-200 bg-green-50/60 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-green-800">
                {page.status.liveEyebrow}
              </p>
              <ul className="mt-4 space-y-2.5">
                {page.status.live.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-dashed border-border bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-forest-500">
                {page.status.designedEyebrow}
              </p>
              <ul className="mt-4 space-y-2.5">
                {page.status.designed.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-forest-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container max-w-6xl">
          <SectionHeader
            eyebrow={page.products.eyebrow}
            title={page.products.title}
            description={page.products.description}
            className="mb-10"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.products.items.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-muted/20 transition-all hover:border-forest-300 hover:bg-white hover:shadow-md"
              >
                <div className="bg-white px-4 pt-5">
                  <ProductPhoto
                    src={product.src}
                    alt={product.alt}
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="mx-auto aspect-[4/3] w-full object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
                  <p className="font-mono text-xs font-semibold text-charge-700">{product.priceLabel}</p>
                  <h3 className="mt-1 font-semibold text-forest-900">{product.name}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-forest-600">{product.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="install" className="section-pad border-b border-border bg-white">
        <div className="page-container grid max-w-6xl items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <SectionHeader
              eyebrow={page.install.eyebrow}
              title={page.install.title}
              description={page.install.description}
            />
            <ol className="mt-10 grid gap-4 sm:grid-cols-2">
              {page.install.steps.map((step, i) => (
                <li key={step.title} className="rounded-2xl border border-border bg-muted/20 p-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-950 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="mt-3 text-sm font-semibold text-forest-900">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-forest-600">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-[1.75rem] border border-border bg-charge-50/50 p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-forest-500">Android APK</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-forest-900">
              Precifarm AI companion
            </p>
            <p className="mt-2 font-mono text-sm text-forest-600">{page.install.packageLine}</p>
            <div className="mt-6">
              <ApkButton href={appDownload.apkUrl} download={appDownload.fileName}>
                {page.install.apkLabel}
              </ApkButton>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-forest-500">
              Sideload from this site only. iOS is not available yet.
            </p>
            <a
              href={page.hero.pdfHref}
              className="mt-4 inline-block text-sm font-medium text-charge-700 hover:text-charge-600"
            >
              {page.hero.pdfLabel} ›
            </a>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-muted/20">
        <div className="page-container max-w-3xl">
          <SectionHeader eyebrow={page.faqs.eyebrow} title={page.faqs.title} className="mb-8" />
          <FaqAccordion items={[...page.faqs.items]} />
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
