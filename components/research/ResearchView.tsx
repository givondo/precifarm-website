import Link from "next/link";
import ProductPhoto from "@/components/ProductPhoto";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqAccordion from "@/components/seo/FaqAccordion";
import PageCTA from "@/components/ui/PageCTA";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  researchAreas,
  researchNavLabel,
  researchPage,
  researchPageFaqs,
  researchPath,
} from "@/lib/research-page";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: researchNavLabel, href: researchPath },
];

function ResearchProgressBar({ value, label }: { value: number; label: string }) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className="mt-4">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-sm font-semibold text-forest-900">{clamped}%</span>
        <span className="text-xs text-forest-500">{label}</span>
      </div>
      <div
        className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Research progress ${clamped} percent`}
      >
        <div
          className="h-full rounded-full bg-charge-500 transition-[width] duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

export default function ResearchView() {
  const page = researchPage;

  return (
    <>
      <section className="page-hero border-b border-border">
        <div className="page-hero-split">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1fr_minmax(280px,420px)] lg:gap-14">
            <div>
              <p className="text-eyebrow">{page.hero.eyebrow}</p>
              <h1 className="heading-display mt-3 text-[1.75rem] leading-[1.15] sm:text-3xl lg:text-4xl">
                {page.hero.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-forest-600 sm:text-lg">{page.hero.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={page.hero.primaryCta.href} className="btn-primary">
                  {page.hero.primaryCta.label}
                </Link>
                <a href={page.hero.secondaryCta.href} className="btn-secondary">
                  {page.hero.secondaryCta.label}
                </a>
              </div>
            </div>
            <figure className="visual-frame-muted">
              <ProductPhoto
                src={page.hero.image.src}
                alt={page.hero.image.alt}
                width={1600}
                height={1200}
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="aspect-[4/3] w-full object-contain p-4 sm:p-6"
              />
              <figcaption className="border-t border-border bg-white/80 px-4 py-3 text-sm leading-snug text-forest-600">
                {page.hero.imageCaption}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id={page.programmes.id} className="scroll-mt-24 border-b border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader eyebrow={page.programmes.eyebrow} title={page.programmes.title} />
          <ul className="mt-10 space-y-6">
            {researchAreas.map((area) => (
              <li key={area.id} className="card p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold text-forest-900 sm:text-xl">{area.title}</h2>
                  <span className="rounded-md bg-muted px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-forest-600">
                    {area.stage}
                  </span>
                </div>
                <ResearchProgressBar value={area.progress} label={area.stage} />
                <p className="mt-4 text-sm leading-relaxed text-forest-600">{area.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {area.focus.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-border bg-muted/30 px-2.5 py-1 text-xs text-forest-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                {area.href && area.hrefLabel ? (
                  <Link href={area.href} className="btn-secondary mt-6 inline-flex text-sm">
                    {area.hrefLabel}
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-forest-500">{page.note}</p>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30 section-pad">
        <div className="page-container max-w-3xl">
          <SectionHeader eyebrow="FAQ" title="Quick answers" />
          <div className="mt-8">
            <FaqAccordion items={researchPageFaqs} />
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
