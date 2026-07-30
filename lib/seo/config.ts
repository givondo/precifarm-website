/**
 * Central SEO / AISO configuration for precifarm.com
 * Align with GCP production: website on Cloud Run, CMS at api.precifarm.com
 */

import { contact } from "@/lib/contact";

export const siteConfig = {
  name: "Precifarm",
  legalName: "Precifarm",
  /** Shown in the browser tab on the homepage */
  defaultTitle: "Precifarm · EV charging & electric buses",
  tagline: "Electric transport infrastructure for Kenya",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://precifarm.com",
  locale: "en-KE",
  language: "en",
  region: "KE",
  timezone: "Africa/Nairobi",
  defaultDescription:
    "Precifarm builds charging hubs and the operating network for dependable electric travel between Kenyan cities. Book Nairobi–Kisumu bus seats online with M-Pesa.",
  defaultKeywords: [
    "electric bus Kenya",
    "EV charging hubs Kenya",
    "Nairobi Kisumu electric bus",
    "Precifarm booking",
    "intercity electric transport",
    "M-Pesa bus ticket",
    "Yutong U18 Kenya",
    "renewable energy transport",
  ] as const,
  contact: {
    email: contact.email,
    phone: contact.phoneHref.replace(/^tel:/, ""),
  },
  social: {
    twitter: undefined as string | undefined,
    linkedin: undefined as string | undefined,
  },
  androidApp: {
    packageName: "com.precifarm.mobile",
    name: "Precifarm",
    downloadPath: "/download",
    deepLinkScheme: "precifarm",
  },
  cmsApiUrl: process.env.CMS_API_URL?.replace(/\/$/, ""),
  searchPath: "/network",
} as const;

export type SiteConfig = typeof siteConfig;

/** Static routes included in sitemap and internal linking graph */
export const publicRoutes = [
  { path: "/", label: "Home", changefreq: "weekly" as const, priority: 1.0 },
  { path: "/network", label: "Charge Map", changefreq: "weekly" as const, priority: 0.9 },
  { path: "/charging", label: "Charging Services", changefreq: "monthly" as const, priority: 0.85 },
  { path: "/charging/private-house", label: "Private House Charging", changefreq: "monthly" as const, priority: 0.82 },
  { path: "/partners", label: "Partners", changefreq: "monthly" as const, priority: 0.8 },
  { path: "/training", label: "Training", changefreq: "monthly" as const, priority: 0.76 },
  { path: "/about", label: "About", changefreq: "monthly" as const, priority: 0.75 },
  { path: "/careers", label: "Careers", changefreq: "monthly" as const, priority: 0.7 },
  { path: "/download", label: "Download App", changefreq: "monthly" as const, priority: 0.7 },
  { path: "/contact", label: "Contact", changefreq: "yearly" as const, priority: 0.65 },
  { path: "/guides", label: "Guides", changefreq: "weekly" as const, priority: 0.8 },
  { path: "/faq", label: "FAQ", changefreq: "weekly" as const, priority: 0.75 },
  { path: "/locations", label: "Locations", changefreq: "weekly" as const, priority: 0.78 },
  { path: "/book", label: "Book", changefreq: "weekly" as const, priority: 0.95, sitemap: false as const },
  { path: "/sw", label: "Kiswahili", changefreq: "weekly" as const, priority: 0.85 },
] as const;

export type PublicRoute = (typeof publicRoutes)[number];

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}
