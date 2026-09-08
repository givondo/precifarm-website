import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import ModularEnergyProductView from "@/components/modular-energy/ModularEnergyProductView";
import {
  modularEnergyProductSlugs,
  type ModularEnergyProductSlug,
} from "@/lib/modular-energy-page";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export function generateStaticParams() {
  return modularEnergyProductSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!modularEnergyProductSlugs.includes(slug as ModularEnergyProductSlug)) return {};
  return pageMetadata(`/charging/modular-energy/${slug}`);
}

export default async function ModularEnergyProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!modularEnergyProductSlugs.includes(slug as ModularEnergyProductSlug)) notFound();

  return (
    <>
      <JsonLd data={pageJsonLd(`/charging/modular-energy/${slug}`)} />
      <ModularEnergyProductView slug={slug as ModularEnergyProductSlug} />
    </>
  );
}
