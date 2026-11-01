import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import ProgrammeView from "@/components/programmes/ProgrammeView";
import { harnessPage } from "@/lib/programme-pages";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/ai");

export default function AgentHarnessPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/ai")} />
      <ProgrammeView content={harnessPage} />
    </>
  );
}
