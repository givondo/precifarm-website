import type { Metadata } from "next";
import Link from "next/link";
import ProductPhoto from "@/components/ProductPhoto";
import JsonLd from "@/components/seo/JsonLd";
import CheckItem from "@/components/ui/CheckItem";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import RouteRolesTable from "@/components/RouteRolesTable";
import SectionHeader from "@/components/ui/SectionHeader";
import { aboutPage } from "@/lib/about-page";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/about");

export default function AboutPage() {
  const page = aboutPage;

  return (
    <>
      <JsonLd data={pageJsonLd("/about")} />
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href={page.hero.primaryHref} className="btn-primary">
            {page.hero.primaryLabel}
          </Link>
          <Link href={page.hero.secondaryHref} className="btn-secondary">
            {page.hero.secondaryLabel}
          </Link>
        </div>
      </PageHero>

      <section className="border-y border-forest-900 bg-forest-900 section-pad">
        <div className="page-container">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-white/60">
            What stays true on every site
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {page.highlights.map((item) => (
              <div key={item.stat} className="text-center lg:text-left">
                <p className="font-mono text-lg font-bold tracking-tight text-white sm:text-xl">
                  {item.stat}
                </p>
                <p className="mt-2 text-sm leading-snug text-white/70">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-container section-pad">
        <SectionHeader
          eyebrow={page.pillars.eyebrow}
          title={page.pillars.title}
          description={page.pillars.description}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {page.pillars.items.map((pillar) => (
            <article key={pillar.title} className="card flex flex-col overflow-hidden">
              <div className="bg-muted/40 px-5 pt-6 pb-4 sm:px-6">
                {"familyImages" in pillar && pillar.familyImages ? (
                  <div className="grid grid-cols-3 items-end gap-2 sm:gap-3">
                    {pillar.familyImages.map((item) => (
                      <div key={item.label} className="flex min-w-0 flex-col items-center">
                        <ProductPhoto
                          src={item.src}
                          alt={item.alt}
                          width={400}
                          height={520}
                          sizes="(max-width: 1024px) 30vw, 16vw"
                          className="h-40 w-full object-contain object-bottom sm:h-48"
                        />
                        <p className="mt-2 text-center text-[10px] font-semibold leading-tight text-forest-600 sm:text-xs">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ProductPhoto
                    src={pillar.image.src}
                    alt={pillar.image.alt}
                    width={900}
                    height={675}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="mx-auto aspect-[4/3] w-full object-contain"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                {pillar.eyebrow ? (
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">
                    {pillar.eyebrow}
                  </p>
                ) : null}
                <h3 className={`text-lg font-semibold text-forest-900 ${pillar.eyebrow ? "mt-2" : ""}`}>{pillar.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-forest-600/85">{pillar.text}</p>
                <Link href={pillar.href} className="btn-secondary mt-6 inline-flex w-fit">
                  {pillar.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 section-pad">
        <div className="page-container">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <figure className="visual-frame bg-white">
              <div className="px-4 pt-4 sm:px-6 sm:pt-6">
                <ProductPhoto
                  src={page.intro.image.src}
                  alt={page.intro.image.alt}
                  width={1600}
                  height={1200}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="mx-auto aspect-[4/3] w-full object-contain"
                />
              </div>
              <figcaption className="border-t border-border bg-muted/40 px-4 py-3 text-sm leading-snug text-forest-600">
                {page.intro.imageCaption}
              </figcaption>
            </figure>
            <div>
              <p className="text-eyebrow">{page.intro.eyebrow}</p>
              <h2 className="heading-display mt-3 text-xl sm:text-2xl">{page.intro.title}</h2>
              <p className="mt-4 leading-relaxed text-forest-600/90">{page.intro.lead}</p>
              <p className="mt-4 leading-relaxed text-forest-600/85">{page.intro.body}</p>
              <ul className="mt-6 space-y-3">
                {page.intro.points.map((point) => (
                  <CheckItem key={point}>{point}</CheckItem>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow={page.operatingModel.eyebrow}
            title={page.operatingModel.title}
            description={page.operatingModel.description}
          />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.operatingModel.steps.map((step) => (
              <li key={step.step} className="card p-5">
                <span className="font-mono text-xs font-semibold text-forest-500">{step.step}</span>
                <h3 className="mt-2 font-semibold text-forest-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-600/80">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad page-container">
        <SectionHeader
          eyebrow={page.principlesSection.eyebrow}
          title={page.principlesSection.title}
          description={page.principlesSection.description}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {page.principles.map((principle) => (
            <div key={principle.title} className="card p-5 sm:p-6">
              <h3 className="font-semibold text-forest-900">{principle.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-600/80">{principle.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow={page.scope.eyebrow}
            title={page.scope.title}
            description={page.scope.description}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="card p-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">
                {page.scope.today.title}
              </p>
              <ul className="mt-4 divide-y divide-border">
                {page.scope.today.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group flex items-baseline justify-between gap-4 py-3 text-sm"
                    >
                      <span className="font-medium text-forest-900 group-hover:text-charge-700">
                        {item.name}
                      </span>
                      <span className="shrink-0 text-xs text-forest-500">{item.note}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">
                {page.scope.roadmap.title}
              </p>
              <ul className="mt-4 divide-y divide-border">
                {page.scope.roadmap.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group flex items-baseline justify-between gap-4 py-3 text-sm"
                    >
                      <span className="font-medium text-forest-900 group-hover:text-charge-700">
                        {item.name}
                      </span>
                      <span className="shrink-0 text-xs text-forest-500">{item.note}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-forest-600/75">
                {page.scope.roadmap.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad page-container">
        <RouteRolesTable />
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
