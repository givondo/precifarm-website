import Link from "next/link";
import FaqAccordion from "@/components/seo/FaqAccordion";
import SiteImage from "@/components/SiteImage";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SpecTable from "@/components/modular-energy/SpecTable";
import PageCTA from "@/components/ui/PageCTA";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  modularEnergyNav,
  modularEnergyPage,
  modularEnergyProducts,
  modularEnergyStatusNote,
  type ModularEnergyProduct,
  type ModularEnergyProductSlug,
} from "@/lib/modular-energy-page";

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-forest-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-forest-600">{text}</p>
    </div>
  );
}

function RelatedProductCard({
  href,
  label,
  description,
  image,
  imageAlt,
}: {
  href: string;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl surface-well">
        <SiteImage src={image} alt={imageAlt} width={128} height={128} className="h-full w-full object-contain p-1" />
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-forest-900 group-hover:text-charge-700">{label}</p>
        <p className="mt-0.5 truncate text-sm text-forest-600">{description}</p>
      </div>
    </Link>
  );
}

const relatedImages: Record<string, { image: string; imageAlt: string; description: string }> = {
  "p1-go": {
    image: modularEnergyProducts["p1-go"].image,
    imageAlt: modularEnergyProducts["p1-go"].imageAlt,
    description: "~1 kWh carried, solar in the box",
  },
  "p2-home": {
    image: modularEnergyProducts["p2-home"].image,
    imageAlt: modularEnergyProducts["p2-home"].imageAlt,
    description: "1–4 modules on a utility-room floor",
  },
  "pod-stack": {
    image: modularEnergyProducts["pod-stack"].image,
    imageAlt: modularEnergyProducts["pod-stack"].imageAlt,
    description: "2–6 modules on an outdoor plinth",
  },
  megapack: {
    image: "/images/megapack-hero-v3.png",
    imageAlt: "Precifarm MegaPack utility-scale battery storage",
    description: "Engineered per site, MWh to GWh",
  },
};

export default function ModularEnergyProductView({ slug }: { slug: ModularEnergyProductSlug }) {
  const product: ModularEnergyProduct = modularEnergyProducts[slug];
  const related = [
    ...modularEnergyNav.products.filter((item) => item.slug !== slug),
    modularEnergyNav.megapack,
  ];

  return (
    <>
      <section className="page-hero border-b border-border">
        <div className="page-hero-split">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Modular energy", href: modularEnergyNav.overview.href },
              { name: product.name, href: `/charging/modular-energy/${slug}` },
            ]}
          />
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1fr_minmax(260px,440px)] lg:gap-14">
            <div>
              <p className="text-eyebrow">{product.tag}</p>
              <h1 className="heading-display mt-3 text-[1.75rem] leading-[1.1] sm:text-3xl lg:text-4xl">
                {product.title}
              </h1>
              <p className="mt-3 text-base font-medium text-forest-700">{product.audience}</p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-forest-600 sm:text-lg">
                {product.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Talk to us
                </Link>
                <Link href={modularEnergyNav.overview.href} className="btn-secondary">
                  Platform overview
                </Link>
              </div>
              <p className="mt-4 text-sm text-forest-500">{modularEnergyStatusNote}</p>
            </div>
            <figure className="visual-frame">
              <SiteImage
                src={product.image}
                alt={product.imageAlt}
                width={1200}
                height={900}
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="aspect-[4/3] w-full object-contain p-4 sm:p-5"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="stats-band">
        <div className="stats-band-inner">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {product.highlights.map((item) => (
              <div key={item.label} className="bg-white px-5 py-4 sm:px-6 sm:py-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-500">{item.label}</p>
                <p className="mt-1 font-mono text-lg font-semibold text-forest-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {product.scene ? (
        <section className="section-pad border-b border-border bg-white">
          <div className="page-container">
            <figure className="visual-frame-sm">
              <SiteImage
                src={product.scene.src}
                alt={product.scene.alt}
                width={1600}
                height={900}
                sizes="100vw"
                className="aspect-[21/9] w-full object-cover"
              />
              <figcaption className="border-t border-border bg-muted/30 px-5 py-4 text-sm leading-relaxed text-forest-600 sm:px-6">
                {product.scene.caption}
              </figcaption>
            </figure>
          </div>
        </section>
      ) : null}

      <section className="section-pad border-b border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader
            eyebrow={product.sections.features.eyebrow}
            title={product.sections.features.title}
            className="mb-10"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {product.features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container max-w-4xl">
          {product.stackTiers && product.sections.stack ? (
            <div className="mb-14">
              <SectionHeader
                eyebrow={product.sections.stack.eyebrow}
                title={product.sections.stack.title}
                className="mb-8"
              />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {product.stackTiers.map((tier) => (
                  <div key={tier.modules} className="rounded-xl border border-border bg-white px-4 py-5 text-center">
                    <p className="font-mono text-xl font-semibold text-forest-900">{tier.label}</p>
                    <p className="mt-1 text-sm text-forest-600">
                      {tier.modules} module{tier.modules > 1 ? "s" : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <SectionHeader
            eyebrow={product.sections.spec.eyebrow}
            title={product.sections.spec.title}
            className="mb-8"
          />
          <SpecTable caption={product.specCaption} columns={product.specColumns} rows={product.specs} />
        </div>
      </section>

      <section className="section-pad border-b border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader
            eyebrow={product.sections.worksWith.eyebrow}
            title={product.sections.worksWith.title}
            description={product.sections.worksWith.description}
            className="mb-10"
          />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {product.worksWith.map((item) => (
              <Link key={item.name} href={item.href} className="group bg-white p-6 sm:p-7">
                <p className="font-semibold text-forest-900 group-hover:text-charge-700">{item.name} ›</p>
                <p className="mt-2 text-sm leading-relaxed text-forest-600">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container max-w-3xl">
          <SectionHeader eyebrow="FAQ" title={product.faqSectionTitle} className="mb-8" />
          <FaqAccordion items={[...product.faqs]} />
        </div>
      </section>

      <section className="section-pad border-b border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader eyebrow="Also in the family" title="Related products" className="mb-8" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => {
              const key = "slug" in item ? item.slug : "megapack";
              const meta = relatedImages[key];
              return (
                <RelatedProductCard
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  description={meta.description}
                  image={meta.image}
                  imageAlt={meta.imageAlt}
                />
              );
            })}
          </div>
        </div>
      </section>

      <PageCTA
        title={modularEnergyPage.cta.title}
        description={modularEnergyPage.cta.description}
        primaryHref={modularEnergyPage.cta.primaryHref}
        primaryLabel={modularEnergyPage.cta.primaryLabel}
        secondaryHref={modularEnergyPage.cta.secondaryHref}
        secondaryLabel={modularEnergyPage.cta.secondaryLabel}
      />
    </>
  );
}
