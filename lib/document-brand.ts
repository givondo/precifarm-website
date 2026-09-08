/**
 * Shared Precifarm branding for downloadable HTML/PDF documents.
 * Keep in sync with scripts/lib/document-brand.mjs and public/downloads/precifarm-document-brand.css
 */

import { brand } from "@/lib/brand-messaging";
import { contact } from "@/lib/contact";
import { siteConfig } from "@/lib/seo/config";
import { socialLinks } from "@/lib/social";

export const documentBrand = {
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  tagline: brand.category,
  promise: brand.promise,
  siteUrl: siteConfig.url,
  email: contact.email,
  phone: contact.phone,
  hq: contact.hq,
  whatsapp: contact.whatsapp,
  cssPath: "/downloads/precifarm-document-brand.css",
  logoMarkPath: "/downloads/precifarm-logo-mark.svg",
  disclaimer:
    "For planning and briefing. Not a substitute for licensed design, Kenya Power studies or statutory approvals.",
  socials: socialLinks.map((link) => ({ label: link.label, href: link.href })),
} as const;

export type BrandedDocumentMeta = {
  id: string;
  version: string;
  date: string;
  title?: string;
  livePagePath?: string;
};

export function brandedDocumentFooter(meta: BrandedDocumentMeta): string {
  const year = new Date().getFullYear();
  const liveUrl = meta.livePagePath ? `${documentBrand.siteUrl}${meta.livePagePath}` : documentBrand.siteUrl;
  const socials = documentBrand.socials.map((s) => s.label).join(" · ");

  return [
    `© ${year} ${documentBrand.legalName} · ${meta.id} v${meta.version} · ${meta.date}`,
    meta.title ?? "",
    `${documentBrand.email} · ${documentBrand.phone} · ${documentBrand.hq} · ${documentBrand.siteUrl.replace(/^https?:\/\//, "")}`,
    socials,
    documentBrand.disclaimer,
    liveUrl,
  ]
    .filter(Boolean)
    .join(" · ");
}
