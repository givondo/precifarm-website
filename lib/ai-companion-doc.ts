import { appBrand, appDownload } from "@/lib/app-download";
import { documentBrand } from "@/lib/document-brand";

/** Product sheet for Precifarm Agent — HTML + PDF in /downloads. */
export const aiCompanionDoc = {
  id: "PF-COPILOT-001",
  version: "2.0",
  date: "4 September 2026",
  title: appBrand.fullName,
  subtitle: "EV charging and home energy on Android",
  description:
    "Precifarm Agent: Charging Hub, Pulse and Pod surveys, and M-Pesa pay on Android. For EV drivers and homeowners in Kenya. APK from precifarm.com.",
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
