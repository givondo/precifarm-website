/**
 * Shared Precifarm branding for downloadable HTML/PDF documents.
 * Keep in sync with public/downloads/precifarm-document-brand.css
 */

import { brand } from "@/lib/brand-messaging";
import { contact } from "@/lib/contact";
import { siteConfig } from "@/lib/seo/config";

export const documentBrand = {
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  tagline: brand.category,
  siteUrl: siteConfig.url,
  email: contact.email,
  phone: contact.phone,
  hq: contact.hq,
  cssPath: "/downloads/precifarm-document-brand.css",
  logoMarkPath: "/downloads/precifarm-logo-mark.svg",
  disclaimer:
    "For engineering planning. Not a substitute for licensed design, Kenya Power studies or statutory approvals.",
} as const;

export type BrandedDocumentMeta = {
  id: string;
  version: string;
  date: string;
  title: string;
  livePagePath?: string;
};

export function brandedDocumentFooter(meta: BrandedDocumentMeta): string {
  const year = new Date().getFullYear();
  const liveUrl = meta.livePagePath ? `${documentBrand.siteUrl}${meta.livePagePath}` : documentBrand.siteUrl;

  return [
    `© ${year} ${documentBrand.legalName} · ${meta.id} v${meta.version} · ${meta.date}`,
    `${documentBrand.email} · ${documentBrand.phone} · ${documentBrand.siteUrl.replace(/^https?:\/\//, "")}`,
    documentBrand.disclaimer,
    liveUrl,
  ].join(" · ");
}
