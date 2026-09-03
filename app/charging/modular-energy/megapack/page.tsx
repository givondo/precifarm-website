import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import MegaPackView from "@/components/megapack/MegaPackView";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/charging/modular-energy/megapack");

export default function MegaPackPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/charging/modular-energy/megapack")} />
      <MegaPackView />
    </>
  );
}
