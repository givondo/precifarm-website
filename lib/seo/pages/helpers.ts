import type { Metadata } from "next";
import { createPageSeo } from "@/lib/seo/metadata";
import { getPageSeo } from "@/lib/seo/pages/registry";

export function pageMetadata(path: string): Metadata {
  const config = getPageSeo(path);
  if (!config) {
    return {};
  }
  return createPageSeo(config).metadata;
}

export function pageJsonLd(path: string) {
  const config = getPageSeo(path);
  if (!config) {
    return [];
  }
  return createPageSeo(config).jsonLd;
}
