import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqAccordion from "@/components/seo/FaqAccordion";
import PageCTA from "@/components/ui/PageCTA";
import SectionHeader from "@/components/ui/SectionHeader";
import { appDownload } from "@/lib/app-download";
import { downloadPage } from "@/lib/download-page";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Precifarm Agent", href: appDownload.productHref },
  { name: "Download", href: appDownload.pageHref },
];

export default function DownloadView() {
  const page = downloadPage;

  return (
    <>
      <section className="page-hero border-b border-border">
        <div className="page-container max-w-3xl py-8 sm:py-12 lg:py-16">
          <Breadcrumbs items={breadcrumbs} />
          <p className="text-eyebrow mt-8">{page.hero.eyebrow}</p>
          <h1 className="heading-display mt-4 text-[1.85rem] leading-[1.08] sm:text-4xl lg:text-[2.65rem]">
            {page.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-forest-600 sm:text-lg">
            {page.hero.lead}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={page.hero.primaryHref} className="btn-primary">
              {page.hero.primaryLabel}
            </Link>
            <Link href={page.hero.secondaryHref} className="btn-secondary">
              {page.hero.secondaryLabel}
            </Link>
          </div>
          <p className="mt-5 text-xs text-forest-400 sm:text-sm">{page.hero.meta}</p>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader eyebrow={page.capabilities.eyebrow} title={page.capabilities.title} />
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {page.capabilities.items.map((item) => (
              <li key={item.title}>
                <h3 className="text-base font-semibold text-forest-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-600">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 section-pad">
        <div className="page-container max-w-3xl">
          <SectionHeader
            eyebrow={page.platforms.eyebrow}
            title={page.platforms.title}
            description={page.platforms.description}
          />
          <ul className="mt-8 space-y-3">
            {page.platforms.items.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between border-b border-border py-3 last:border-0"
              >
                <span className="text-sm font-medium text-forest-900">{item.label}</span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-forest-400">
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container max-w-3xl">
          <SectionHeader eyebrow={page.faq.eyebrow} title={page.faq.title} />
          <div className="mt-8">
            <FaqAccordion items={[...page.faq.items]} />
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
