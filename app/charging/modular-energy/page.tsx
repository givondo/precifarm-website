import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import ModularEnergyView from "@/components/modular-energy/ModularEnergyView";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/charging/modular-energy");

export default function ModularEnergyPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/charging/modular-energy")} />
      <ModularEnergyView />
    </>
  );
}
