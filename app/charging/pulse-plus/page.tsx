import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import ProgrammeView from "@/components/programmes/ProgrammeView";
import { pulsePlusPage } from "@/lib/programme-pages";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/charging/pulse-plus");

export default function PulsePlusPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/charging/pulse-plus")} />
      <ProgrammeView content={pulsePlusPage} />
    </>
  );
}
