import type { Metadata } from "next";
import ArcCorridorView from "@/components/arc/ArcCorridorView";
import JsonLd from "@/components/seo/JsonLd";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/charging/corridor");

export default function CorridorPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/charging/corridor")} />
      <ArcCorridorView />
    </>
  );
}
