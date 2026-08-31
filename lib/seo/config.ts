/**
 * Central SEO / AISO configuration for precifarm.com
 * Align with GCP production: website on Cloud Run, CMS at api.precifarm.com
 */

import { contact } from "@/lib/contact";
import { chargingHub } from "@/lib/charging-hub";
import { socialHandles, socialProfileUrls } from "@/lib/social";

/** Browser tab title for the homepage — keep in sync with layout metadata */
export const defaultSiteTitle = "Precifarm | EV Charging Infrastructure in Kenya" as const;

export const siteConfig = {
  name: "Precifarm",
  legalName: "Precifarm",
  /** Shown in the browser tab on the homepage */
  defaultTitle: defaultSiteTitle,
  tagline: "Electric mobility infrastructure for Africa",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://precifarm.com",
  locale: "en-KE",
  language: "en",
  region: "KE",
  timezone: "Africa/Nairobi",
  defaultDescription:
    "Precifarm designs, finances, installs and operates EV charging infrastructure in Kenya — from home charging to fleet and high-power corridor stations, with M-Pesa payments.",
  defaultKeywords: [
    "EV charging Kenya",
    "home charging Kenya",
    "Pulse charger",
    "Pod energy storage",
    "highway charging Kenya",
    "Corridor charging",
    "Lipa na M-Pesa EV",
    "Lipa Pole Pole",
    "public DC KES 39 kWh",
    "Precifarm Charging Hub",
  ] as const,
  contact: {
    email: contact.email,
    phone: contact.phoneHref.replace(/^tel:/, ""),
  },
  social: {
    twitter: socialHandles.x,
    linkedin: socialProfileUrls.find((url) => url.includes("linkedin")),
    profiles: socialProfileUrls,
  },
  androidApp: {
    packageName: "com.precifarm.mobile",
    name: "Precifarm AI companion",
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
  { path: chargingHub.path, label: chargingHub.label, changefreq: "weekly" as const, priority: 0.9 },
  { path: "/charging", label: "Charging", changefreq: "monthly" as const, priority: 0.95 },
  { path: "/charging/private-house", label: "Home charging", changefreq: "monthly" as const, priority: 0.82 },
  { path: "/charging/modular-energy", label: "Modular energy", changefreq: "monthly" as const, priority: 0.8 },
  { path: "/charging/modular-energy/p1-go", label: "P1 Go", changefreq: "monthly" as const, priority: 0.72 },
  { path: "/charging/modular-energy/p2-home", label: "P2 Home", changefreq: "monthly" as const, priority: 0.72 },
  { path: "/charging/modular-energy/pod", label: "Pod", changefreq: "monthly" as const, priority: 0.72 },
  { path: "/evs", label: "Kenya EV guide", changefreq: "weekly" as const, priority: 0.84 },
  { path: "/charging/engineering", label: "Engineering Design Package", changefreq: "monthly" as const, priority: 0.8 },
  { path: "/partners", label: "Partners", changefreq: "monthly" as const, priority: 0.8 },
  { path: "/training", label: "Training", changefreq: "monthly" as const, priority: 0.76 },
  { path: "/about", label: "About", changefreq: "monthly" as const, priority: 0.75 },
  { path: "/careers", label: "Careers", changefreq: "monthly" as const, priority: 0.7 },
  { path: "/download", label: "AI companion", changefreq: "monthly" as const, priority: 0.7 },
  { path: "/contact", label: "Contact", changefreq: "yearly" as const, priority: 0.65 },
  { path: "/guides", label: "Guides", changefreq: "weekly" as const, priority: 0.8 },
  { path: "/faq", label: "FAQ", changefreq: "weekly" as const, priority: 0.75 },
  { path: "/locations", label: "Locations", changefreq: "weekly" as const, priority: 0.78 },
  { path: "/sw", label: "Kiswahili", changefreq: "weekly" as const, priority: 0.6 },
] as const;

export type PublicRoute = (typeof publicRoutes)[number];

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}
