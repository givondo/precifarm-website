import Link from "next/link";
import FaqAccordion from "@/components/seo/FaqAccordion";
import SiteImage from "@/components/SiteImage";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SpecTable from "@/components/modular-energy/SpecTable";
import PageCTA from "@/components/ui/PageCTA";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  modularEnergyAvailability as availability,
  modularEnergyNav,
  modularEnergyPage as page,
  modularEnergyPrinciples,
} from "@/lib/modular-energy-page";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Modular energy", href: "/charging/modular-energy" },
];

function ProductCard({
  href,
  name,
  role,
  scale,
  summary,
  image,
  imageAlt,
}: {
  href: string;
  name: string;
  role: string;
  scale: string;
  summary: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <Link href={href} className="group product-card">
      <div className="product-card-media">
        <SiteImage
          src={image}
          alt={imageAlt}
          width={800}
          height={600}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="product-card-body">
        <p className="text-eyebrow">{role}</p>
        <h3 className="mt-1 text-lg font-semibold text-forest-900 group-hover:text-charge-700">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-forest-600">{summary}</p>
        <p className="mt-2 font-mono text-xs text-forest-500">{scale}</p>
        <span className="mt-4 text-sm font-semibold text-forest-900 group-hover:text-charge-700">
          Learn more ›
        </span>
      </div>
    </Link>
  );
}

function KenyaCard({
  setting,
  hardware,
  loads,
  image,
  imageAlt,
  href,
}: {
  setting: string;
  hardware: string;
  loads: string;
  image: string;
  imageAlt: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group product-card overflow-hidden transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <SiteImage
          src={image}
          alt={imageAlt}
          width={800}
          height={500}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-forest-950/20 to-transparent" />
        <div className="absolute bottom-0 p-5 text-white sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/80">{setting}</p>
          <p className="mt-1 font-semibold">{hardware}</p>
          <p className="mt-1 text-sm text-white/85">{loads}</p>
        </div>
      </div>
    </Link>
  );
}

export default function ModularEnergyView() {
  return (
    <>
      <section className="page-hero border-b border-border">
        <div className="page-hero-split">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1fr_minmax(300px,540px)] lg:gap-14">
            <div>
              <p className="text-eyebrow">{page.hero.eyebrow}</p>
              <h1 className="heading-display mt-3 text-[1.75rem] leading-[1.1] sm:text-3xl lg:text-4xl">
                {page.hero.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-forest-600 sm:text-lg">
                {page.hero.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={page.hero.primaryCta.href} className="btn-primary">
                  {page.hero.primaryCta.label}
                </Link>
                <Link href={page.hero.secondaryCta.href} className="btn-secondary">
                  {page.hero.secondaryCta.label}
                </Link>
              </div>
              <p className="mt-4 text-sm text-forest-500">{page.hero.note}</p>
            </div>
            <figure className="visual-frame-muted p-4 sm:p-5">
              <div className="grid grid-cols-3 items-end gap-3 sm:gap-4">
                {page.hero.familyImages.map((item) => (
                  <div key={item.label} className="flex min-w-0 flex-col items-center">
                    <SiteImage
                      src={item.src}
                      alt={item.alt}
                      width={600}
                      height={800}
                      priority
                      sizes="(max-width: 1024px) 33vw, 14vw"
                      className="h-44 w-full object-contain object-bottom sm:h-56"
                    />
                    <p className="mt-3 text-center text-[10px] font-semibold leading-tight text-forest-600 sm:text-xs">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section className="stats-band">
        <div className="stats-band-inner">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {page.stats.map((stat) => (
              <div key={stat.label} className="bg-white px-6 py-5 text-center sm:py-6">
                <p className="font-mono text-2xl font-bold text-forest-900 sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm font-semibold text-forest-900">{stat.label}</p>
                <p className="mt-1 text-xs text-forest-500">{stat.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container">
          <SectionHeader
            eyebrow={page.productCards.eyebrow}
            title={page.productCards.title}
            description={page.productCards.caption}
            className="mb-10"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.productCards.items.map((item) => (
              <ProductCard key={item.name} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader
            eyebrow={page.principlesSection.eyebrow}
            title={page.principlesSection.title}
            description={page.principlesSection.description}
            className="mb-10"
          />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {modularEnergyPrinciples.map((principle) => (
              <div key={principle.id} className="bg-white p-6 sm:p-7">
                <p className="text-eyebrow">{principle.label}</p>
                <h3 className="mt-2 text-base font-semibold leading-snug text-forest-900">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-600">{principle.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeader eyebrow={page.moduleSection.eyebrow} title={page.moduleSection.title} className="mb-4" />
            <p className="text-base leading-relaxed text-forest-600">{page.moduleSection.description}</p>
            <ol className="mt-8 space-y-5">
              {page.moduleSection.steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="mt-0.5 font-mono text-sm font-semibold text-forest-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="border-l border-border pl-4">
                    <p className="font-semibold text-forest-900">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-forest-600">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <figure className="visual-frame-muted">
            <SiteImage
              src={page.moduleSection.image.src}
              alt={page.moduleSection.image.alt}
              width={1200}
              height={900}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </figure>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-muted/20">
        <div className="page-container max-w-5xl">
          <SectionHeader eyebrow={page.stackSection.eyebrow} title={page.stackSection.title} className="mb-4" />
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-forest-600">{page.stackSection.description}</p>
          <figure className="overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-lg">
            <SiteImage
              src={page.stackSection.image.src}
              alt={page.stackSection.image.alt}
              width={1600}
              height={900}
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="aspect-[16/9] w-full object-contain p-4 sm:p-6"
            />
          </figure>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center sm:gap-6">
            {page.stackSection.tiers.map((tier) => (
              <div key={tier.modules} className="rounded-xl border border-border bg-white px-3 py-4 sm:px-4">
                <p className="font-mono text-lg font-semibold text-forest-900 sm:text-xl">{tier.label}</p>
                <p className="mt-1 text-sm text-forest-600">{tier.modules} modules</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link href={page.stackSection.cta.href} className="text-sm font-semibold text-forest-900 hover:text-charge-700">
              {page.stackSection.cta.label} ›
            </Link>
          </p>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container">
          <SectionHeader
            eyebrow={page.kenyaSection.eyebrow}
            title={page.kenyaSection.title}
            description={page.kenyaSection.description}
            className="mb-10"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {page.kenyaSection.cards.map((card) => (
              <KenyaCard key={card.setting} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader eyebrow={page.familyTable.eyebrow} title={page.familyTable.title} className="mb-8" />
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
        <div className="page-container grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader eyebrow={page.targetsTable.eyebrow} title={page.targetsTable.title} className="mb-8" />
            <SpecTable
              caption={page.targetsTable.caption}
              columns={page.targetsTable.columns}
              rows={page.targetsTable.rows}
            />
          </div>
          <div>
            <SectionHeader eyebrow={page.chargingTable.eyebrow} title={page.chargingTable.title} className="mb-8" />
            <SpecTable
              caption={page.chargingTable.caption}
              columns={page.chargingTable.columns}
              rows={page.chargingTable.rows}
            />
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader
            eyebrow={availability.eyebrow}
            title={availability.title}
            description={availability.description}
            className="mb-10"
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
              <h3 className="text-base font-semibold text-forest-900">{availability.today.title}</h3>
              <ul className="mt-5 space-y-4">
                {availability.today.items.map((item) => (
                  <li key={item.name} className="border-l border-border pl-4">
                    <Link href={item.href} className="font-semibold text-forest-900 hover:text-charge-700">
                      {item.name} ›
                    </Link>
                    <p className="mt-1 text-sm leading-relaxed text-forest-600">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
              <h3 className="text-base font-semibold text-forest-900">{availability.roadmap.title}</h3>
              <ul className="mt-5 space-y-4">
                {availability.roadmap.items.map((item) => (
                  <li key={item.name} className="border-l border-border pl-4">
                    <p className="font-semibold text-forest-900">{item.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-forest-600">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container max-w-3xl">
          <SectionHeader eyebrow="FAQ" title={page.faqSection.title} className="mb-8" />
          <FaqAccordion items={[...page.faqs]} />
        </div>
      </section>

      <section className="border-b border-border bg-forest-900 py-6 text-white">
        <div className="page-container flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <span className="font-semibold text-white/70">Explore</span>
          {modularEnergyNav.products.map((item) => (
            <Link key={item.href} href={item.href} className="font-medium hover:text-charge-300">
              {item.label}
            </Link>
          ))}
          <Link href={modularEnergyNav.megapack.href} className="font-medium hover:text-charge-300">
            {modularEnergyNav.megapack.label}
          </Link>
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
