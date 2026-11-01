import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import ProgrammeView from "@/components/programmes/ProgrammeView";
import { corridorPage } from "@/lib/programme-pages";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/charging/corridor");

export default function CorridorPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/charging/corridor")} />
      <ProgrammeView content={corridorPage} />
    </>
  );
}
