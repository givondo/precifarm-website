import type { Metadata } from "next";
import DownloadView from "@/components/download/DownloadView";
import JsonLd from "@/components/seo/JsonLd";
import { createPageSeo } from "@/lib/seo/metadata";
import { getPageSeo } from "@/lib/seo/pages/registry";

/**
 * The registry entry still describes a desktop download "on request"; this page now states what exists today,
 * so title and description are corrected here while canonical URL, breadcrumbs and FAQ JSON-LD stay from the registry.
 */
const base = getPageSeo("/download")!;
const seo = createPageSeo({
  ...base,
  title: "Precifarm Agent Platforms: Web, Android and Desktop",
  description:
    "Use Precifarm Agent in the web workspace, in the browser on Android, or in OpenCode on the desktop. Every option runs on hosted models; download the OpenCode configuration here.",
});

export const metadata: Metadata = seo.metadata;

export default function DownloadPage() {
  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <DownloadView />
    </>
  );
}
