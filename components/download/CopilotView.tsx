import Link from "next/link";
import ApkButton from "@/components/download/ApkButton";
import DownloadShowcase from "@/components/download/DownloadShowcase";
import SiteImage from "@/components/SiteImage";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqAccordion from "@/components/seo/FaqAccordion";
import PageCTA from "@/components/ui/PageCTA";
import { appDownload } from "@/lib/app-download";
import { downloadPage } from "@/lib/download-page";
import { productImages } from "@/lib/product-images";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Precifarm Agent", href: "/download" },
];

function UspIcon({ id }: { id: string }) {
  if (id === "honest") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    );
  }
  if (id === "unified") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function CopilotView() {
  const page = downloadPage;

  return (
    <>
      <section className="page-hero">
        <div className="page-container max-w-6xl py-8 sm:py-12 lg:py-16">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,400px)] lg:gap-14">
            <div className="max-w-xl">
              <p className="text-eyebrow text-xs font-semibold uppercase tracking-widest text-charge-600">
                {page.hero.eyebrow}
              </p>
              <h1 className="heading-display home-hero-title mt-4">
                {page.hero.title}
                <span className="home-hero-title-accent bg-gradient-to-r from-charge-600 to-charge-500 bg-clip-text text-transparent">
                  {page.hero.titleAccent}
                </span>
              </h1>
              <p className="mt-5 text-base leading-relaxed text-forest-600 sm:text-lg">{page.hero.lead}</p>
              <p className="mt-2 text-sm font-medium text-forest-500">{page.hero.tagline}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ApkButton
                  href={appDownload.apkUrl}
                  download={appDownload.fileName}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-charge-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-charge-600/25 transition hover:bg-charge-500"
                >
                  {page.hero.primaryLabel}
                </ApkButton>
                <Link
                  href={page.hero.secondaryHref}
                  className="inline-flex items-center justify-center rounded-full border border-border bg-white px-6 py-3.5 text-sm font-semibold text-forest-900 transition hover:bg-muted"
                >
                  {page.hero.secondaryLabel}
                </Link>
              </div>

              <dl className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
                {page.stats.map((item) => (
                  <div key={item.label}>
                    <dt className="font-mono text-lg font-semibold tracking-tight text-forest-900 sm:text-xl">
                      {item.stat}
                    </dt>
                    <dd className="mt-1 text-xs leading-relaxed text-forest-500 sm:text-sm">{item.label}</dd>
                  </div>
                ))}
              </dl>

              <ul className="home-hero-usp mt-8">
                {page.usps.map((usp) => (
                  <li key={usp.id} className="home-hero-usp-item">
                    <span className="home-hero-usp-icon">
                      <UspIcon id={usp.id} />
                    </span>
                    <div>
                      <span className="home-hero-usp-title">{usp.title}</span>
                      <span className="home-hero-usp-text">{usp.text}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs text-forest-400">{page.hero.meta}</p>
            </div>

            <div className="home-hero-visual lg:justify-self-end">
              <SiteImage
                src={productImages.chargingEcosystemHero.src}
                alt={productImages.chargingEcosystemHero.alt}
                width={1600}
                height={1200}
                priority
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="aspect-[4/3] h-full w-full object-contain p-4 sm:p-6"
              />
            </div>
          </div>
        </div>
      </section>

      <DownloadShowcase />

      <section id="install" className="section-pad border-b border-border bg-white">
        <div className="page-container grid max-w-6xl gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
          <div>
            <h2 className="heading-display text-2xl sm:text-3xl">{page.faqs.title}</h2>
            <div className="mt-8">
              <FaqAccordion items={[...page.faqs.items]} />
            </div>
            <a
              href={page.hero.pdfHref}
              className="mt-6 inline-flex text-sm font-medium text-charge-700 hover:text-charge-600"
            >
              {page.hero.pdfLabel} ›
            </a>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-xl shadow-black/[0.06]">
              <div className="border-b border-border bg-gradient-to-br from-charge-50 to-white px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-charge-700">{page.install.title}</p>
                <p className="mt-2 text-sm text-forest-600">{page.install.description}</p>
              </div>
              <div className="p-6 sm:p-8">
                <p className="font-mono text-xs text-forest-500">{page.install.packageLine}</p>
                <div className="mt-5">
                  <ApkButton href={appDownload.apkUrl} download={appDownload.fileName} className="w-full justify-center">
                    {page.install.apkLabel}
                  </ApkButton>
                </div>
                <ol className="mt-6 space-y-3 border-t border-border pt-5">
                  {page.install.steps.map((step, i) => (
                    <li key={step} className="flex gap-3 text-sm text-forest-600">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-charge-600 text-[11px] font-bold text-white">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </aside>
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
