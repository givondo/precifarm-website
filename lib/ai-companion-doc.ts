import { appBrand, appDownload } from "@/lib/app-download";
import { documentBrand } from "@/lib/document-brand";

/** Product sheet for Precifarm Agent — HTML + PDF in /downloads. */
export const aiCompanionDoc = {
  id: "PF-COPILOT-001",
  version: "2.0",
  date: "4 September 2026",
  title: appBrand.fullName,
  subtitle: "AI electrical & energy engineer — desktop",
  description:
    "Precifarm Agent: deterministic engineering for EV charging, solar, batteries and electrical systems. Desktop coming soon — request access at precifarm.com/download.",
  brandCssHref: documentBrand.cssPath,
  logoMarkHref: documentBrand.logoMarkPath,
  downloadHref: "/downloads/precifarm-ai-companion.pdf",
  downloadLabel: "Download product sheet",
  downloadHtmlHref: "/downloads/precifarm-ai-companion.html",
  pageHref: appDownload.pageHref,
  appVersion: appDownload.version,
} as const;
