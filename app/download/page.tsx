import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import DownloadApkButton from "@/components/DownloadApkButton";
import ProductShowcaseRow from "@/components/ProductShowcaseRow";
import FaqAccordion from "@/components/seo/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import CheckItem from "@/components/ui/CheckItem";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { appDownload } from "@/lib/app-download";
import { downloadPage } from "@/lib/download-page";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/download");

function AndroidIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.6 9.48l1.84-3.18c.16-.27.07-.62-.2-.78a.57.57 0 0 0-.78.2l-1.87 3.24a9.05 9.05 0 0 0-7.22 0L7.4 5.72a.57.57 0 0 0-.78-.2.57.57 0 0 0-.2.78L8.4 9.48A8.9 8.9 0 0 0 4 16v1a1 1 0 0 0 1 1h1v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3h6v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3h1a1 1 0 0 0 1-1v-1a8.9 8.9 0 0 0-4.4-6.52zM6 15.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm12 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
    </svg>
  );
}

function ApkButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <DownloadApkButton
      href={appDownload.apkUrl}
      download={appDownload.fileName}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-full bg-charge-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-charge-500"
      }
    >
      <AndroidIcon className="h-5 w-5" />
      {children}
    </DownloadApkButton>
  );
}

export default function DownloadPage() {
  const page = downloadPage;

  return (
    <>
      <JsonLd data={pageJsonLd("/download")} />
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Modular energy", href: "/charging/modular-energy" },
          { name: "AI companion", href: "/download" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <ApkButton>{page.hero.primaryLabel}</ApkButton>
          <Link
            href={page.hero.secondaryHref}
            className="inline-flex items-center justify-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-forest-900 transition-colors hover:bg-muted"
          >
            {page.hero.secondaryLabel}
          </Link>
        </div>
        <p className="mt-4 text-sm text-forest-500">{page.hero.meta}</p>
      </PageHero>

      <section className="border-b border-border bg-muted/20 section-pad">
        <div className="page-container">
          <div className="grid gap-6 sm:grid-cols-3">
            {page.stats.map((item) => (
              <div key={item.stat} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <p className="font-mono text-2xl font-semibold text-charge-600">{item.stat}</p>
                <p className="mt-2 text-sm leading-relaxed text-forest-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container">
          <SectionHeader
            eyebrow={page.jobs.eyebrow}
            title={page.jobs.title}
            description={page.jobs.description}
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {page.jobs.items.map((job) => (
              <article key={job.step} className="flex flex-col rounded-2xl border border-border bg-muted/20 p-6">
                <p className="font-mono text-xs font-semibold tracking-widest text-charge-600">{job.step}</p>
                <h3 className="mt-3 font-semibold text-forest-900">{job.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-600">{job.text}</p>
                <Link href={job.href} className="mt-4 text-sm font-medium text-charge-700 hover:text-charge-600">
                  {job.label} ›
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container">
          <SectionHeader
            eyebrow={page.features.eyebrow}
            title={page.features.title}
            description={page.features.description}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {page.features.cards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-border bg-muted/20 p-6">
                <h3 className="font-semibold text-forest-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-600">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader eyebrow={page.status.eyebrow} title={page.status.title} />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-charge-600">
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
        <div className="page-container">
          <SectionHeader
            eyebrow={page.products.eyebrow}
            title={page.products.title}
            description={page.products.description}
            className="mb-8"
          />
          <ProductShowcaseRow products={page.products.items} />
        </div>
      </section>

      <section id="install" className="section-pad border-b border-border bg-white">
        <div className="page-container grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeader
              eyebrow={page.install.eyebrow}
              title={page.install.title}
              description={page.install.description}
            />
            <ol className="mt-8 space-y-4">
              {page.install.steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest-700 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-forest-900">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-forest-600">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-border bg-charge-50/40 p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-forest-500">Android APK</p>
            <p className="mt-3 text-xl font-semibold text-forest-900">Precifarm AI companion</p>
            <p className="mt-2 font-mono text-sm text-forest-600">
              v{appDownload.version} · Android {appDownload.minAndroid}+ · {appDownload.packageId}
            </p>
            <div className="mt-6">
              <ApkButton>{page.install.apkLabel}</ApkButton>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-forest-500">
              Sideload from this site only. iOS is not available yet.
            </p>
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
