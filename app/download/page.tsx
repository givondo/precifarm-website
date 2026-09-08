import type { Metadata } from "next";
import CopilotView from "@/components/download/CopilotView";
import JsonLd from "@/components/seo/JsonLd";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/download");

export default function DownloadPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/download")} />
      <CopilotView />
    </>
  );
}
