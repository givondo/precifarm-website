import { appBrand, appDownload } from "@/lib/app-download";
import { documentBrand } from "@/lib/document-brand";

/** Product sheet for the Precifarm AI companion — HTML + PDF in /downloads. */
export const aiCompanionDoc = {
  id: "PF-AI-COMPANION-001",
  version: "1.0",
  date: "31 August 2026",
  title: appBrand.fullName,
  subtitle: "Your charging companion for Kenya",
  description:
    "Android companion to find a Charging Hub, size Pulse charger or Pod energy storage, and pay with M-Pesa. Not a live chatbot. APK from precifarm.com — not on the Play Store yet.",
  brandCssHref: documentBrand.cssPath,
  logoMarkHref: documentBrand.logoMarkPath,
  downloadHref: "/downloads/precifarm-ai-companion.pdf",
  downloadLabel: "Download product sheet",
  downloadHtmlHref: "/downloads/precifarm-ai-companion.html",
  pageHref: "/download",
  apkHref: appDownload.apkUrl,
  packageId: appDownload.packageId,
  appVersion: appDownload.version,
} as const;
