import Link from "next/link";
import ProductPhoto from "@/components/ProductPhoto";
import SiteImage from "@/components/SiteImage";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqAccordion from "@/components/seo/FaqAccordion";
import PageCTA from "@/components/ui/PageCTA";
import SectionHeader from "@/components/ui/SectionHeader";
import { chargingHub, chargingHubPage } from "@/lib/charging-hub";
import { hubPageFaqs } from "@/lib/charging-faqs";
import { productImages } from "@/lib/product-images";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: chargingHub.label, href: chargingHub.path },
];

const productImageByKey = {
  corridor: productImages.corridor,
  boda: productImages.boda,
  depot: productImages.depot,
} as const;

function HighlightIcon({ id }: { id: string }) {
  const className = "h-5 w-5 text-charge-600";
  if (id === "honest") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    );
  }
  if (id === "pick") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    );
  }
  if (id === "price") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export default function ChargingHubView() {
  const page = chargingHubPage;

  return (
    <>
      {/* Hero */}
      <section className="page-hero border-b border-border">
        <div className="page-hero-split">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1fr_minmax(300px,520px)] lg:gap-14">
            <div>
              <p className="text-eyebrow">{page.hero.eyebrow}</p>
              <h1 className="heading-display mt-3 text-[2rem] leading-[1.08] sm:text-4xl lg:text-[2.75rem]">
                {page.hero.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-forest-600 sm:text-lg">{page.hero.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={page.hero.primaryHref} className="btn-primary">
                  {page.hero.primaryLabel}
                </Link>
                <Link href={page.hero.secondaryHref} className="btn-secondary">
                  {page.hero.secondaryLabel}
                </Link>
              </div>
            </div>
            <figure className="home-hero-visual overflow-hidden" aria-label={page.hero.image.alt}>
              <div className="grid grid-cols-3 gap-1 p-2 sm:gap-2 sm:p-4">
                {page.hero.stopImages.map((item) => (
                  <div key={item.label} className="flex min-w-0 flex-col">
                    <SiteImage
                      src={item.src}
                      alt={item.alt}
                      width={600}
                      height={800}
                      priority
                      sizes="(max-width: 1024px) 33vw, 13vw"
                      className="aspect-[3/4] w-full object-contain"
                    />
                    <p className="mt-2 text-center text-[10px] font-semibold leading-tight text-forest-600 sm:text-xs">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-band">
        <div className="stats-band-inner">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {page.stats.map((stat) => (
              <div key={stat.label} className="bg-white px-6 py-5 text-center sm:py-6">
                <p className="font-mono text-2xl font-bold text-forest-900 sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-forest-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section-pad border-b border-border bg-white">
        <div className="page-container">
          <SectionHeader eyebrow={page.highlights.eyebrow} title={page.highlights.title} centered />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {page.highlights.items.map((item) => (
              <article key={item.id} className="flex gap-4 rounded-2xl border border-border p-5 sm:p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-charge-50">
                  <HighlightIcon id={item.id} />
                </span>
                <div>
                  <h3 className="font-semibold text-forest-900">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-forest-600">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Site types */}
      <section className="section-pad border-b border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader eyebrow={page.siteTypes.eyebrow} title={page.siteTypes.title} centered />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {page.siteTypes.types.map((type) => {
              const image = productImageByKey[type.imageKey];
              return (
                <article
                  key={type.id}
                  className="flex flex-col overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-sm"
                >
                  <div className="bg-muted/20 px-5 pb-2 pt-6">
                    <ProductPhoto
                      src={image.src}
                      alt={image.alt}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="mx-auto aspect-[4/3] w-full max-w-[200px] object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-6 pb-7 pt-3">
                    <p className="text-sm font-semibold text-charge-600">{type.stat}</p>
                    <h3 className="mt-1 text-lg font-semibold text-forest-900">{type.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-600">{type.detail}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-forest-950 section-pad text-white">
        <div className="page-container max-w-4xl text-center">
          <SectionHeader
            eyebrow={page.steps.eyebrow}
            title={page.steps.title}
            description={page.steps.description}
            centered
            inverted
          />
          <ol className="mt-10 grid gap-6 text-left sm:grid-cols-3">
            {page.steps.items.map((step) => (
              <li key={step.step} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-charge-500/20 font-mono text-sm font-bold text-charge-300">
                  {step.step}
                </span>
                <h3 className="mt-4 font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href={page.steps.appHref} className="btn-primary">
              {page.steps.appLabel}
            </Link>
            <Link
              href={page.steps.guideHref}
              className="btn-secondary-inverted"
            >
              {page.steps.guideLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* Status labels */}
      <section className="border-b border-border bg-white section-pad">
        <div className="page-container max-w-3xl text-center">
          <SectionHeader eyebrow={page.statusLabels.eyebrow} title={page.statusLabels.title} centered />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {page.statusLabels.items.map((item) => (
              <div key={item.label} className="rounded-xl border border-border bg-muted/30 px-4 py-5">
                <p className="text-sm font-semibold text-forest-900">{item.label}</p>
                <p className="mt-1.5 text-sm text-forest-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad page-container max-w-3xl">
        <h2 className="heading-display text-2xl text-forest-900">{page.faq.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-forest-600">
          {page.faq.lead}
          <Link href={page.faq.homeHref} className="font-medium text-forest-900 hover:text-charge-600">
            {page.faq.homeLabel}
          </Link>
          .
        </p>
        <div className="mt-8">
          <FaqAccordion items={hubPageFaqs} />
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
