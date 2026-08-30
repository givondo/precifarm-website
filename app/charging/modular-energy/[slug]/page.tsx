import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import SiteImage from "@/components/SiteImage";
import SpecTable from "@/components/modular-energy/SpecTable";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  modularEnergyNav,
  modularEnergyPage,
  modularEnergyProducts,
  type ModularEnergyProductSlug,
} from "@/lib/modular-energy-page";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

const slugs = ["p1-go", "p2-home", "pod"] as const satisfies ModularEnergyProductSlug[];

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!slugs.includes(slug as ModularEnergyProductSlug)) return {};
  return pageMetadata(`/charging/modular-energy/${slug}`);
}

export default async function ModularEnergyProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slugs.includes(slug as ModularEnergyProductSlug)) notFound();
  const product = modularEnergyProducts[slug as ModularEnergyProductSlug];

  return (
    <>
      <JsonLd data={pageJsonLd(`/charging/modular-energy/${slug}`)} />
      <PageHero
        eyebrow={product.tag}
        title={product.title}
        description={product.description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Modular energy", href: "/charging/modular-energy" },
          { name: product.name, href: `/charging/modular-energy/${slug}` },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-charge-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-charge-500"
          >
            Talk to us
          </Link>
          <Link
            href={modularEnergyNav.overview.href}
            className="inline-flex items-center justify-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-forest-900 transition-colors hover:bg-muted"
          >
            Platform overview
          </Link>
        </div>
      </PageHero>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <figure className="overflow-hidden rounded-[1.75rem] border border-border bg-[#f5f5f7]">
            <SiteImage
              src={product.image}
              alt={product.imageAlt}
              width={900}
              height={675}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/3] w-full object-contain p-6"
            />
          </figure>
          <div>
            <SectionHeader eyebrow="Targets" title={`${product.name} at a glance`} className="mb-6" />
            <SpecTable columns={product.specColumns} rows={product.specs} />
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container">
          <SectionHeader eyebrow="Use" title="Where it fits" className="mb-8" />
          <SpecTable columns={product.useColumns} rows={product.uses} />
          <p className="mt-6 text-sm text-forest-500">
            Also see{" "}
            {modularEnergyNav.products
              .filter((item) => item.slug !== slug)
              .map((item, i, arr) => (
                <span key={item.href}>
                  <Link href={item.href} className="font-medium text-forest-900 hover:text-charge-700">
                    {item.label}
                  </Link>
                  {i < arr.length - 1 ? " · " : ""}
                </span>
              ))}
            .
          </p>
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
