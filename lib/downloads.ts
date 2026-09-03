import { aiCompanionDoc } from "@/lib/ai-companion-doc";
import { appDownload } from "@/lib/app-download";
import { engineeringDoc } from "@/lib/engineering-doc";

/** Central registry of user-facing downloadable assets on precifarm.com */
export const downloadRegistry = [
  {
    id: engineeringDoc.id,
    kind: "document" as const,
    title: engineeringDoc.title,
    subtitle: engineeringDoc.subtitle,
    version: engineeringDoc.version,
    date: engineeringDoc.date,
    pdfHref: engineeringDoc.downloadHref,
    htmlHref: engineeringDoc.downloadHtmlHref,
    pageHref: "/charging/engineering",
  },
  {
    id: aiCompanionDoc.id,
    kind: "document" as const,
    title: aiCompanionDoc.title,
    subtitle: aiCompanionDoc.subtitle,
    version: aiCompanionDoc.version,
    date: aiCompanionDoc.date,
    pdfHref: aiCompanionDoc.downloadHref,
    htmlHref: aiCompanionDoc.downloadHtmlHref,
    pageHref: aiCompanionDoc.pageHref,
  },
  {
    id: "precifarm-android",
    kind: "app" as const,
    title: "Precifarm AI companion",
    subtitle: `v${appDownload.version} · ${appDownload.packageId}`,
    version: appDownload.version,
    date: null,
    pdfHref: aiCompanionDoc.downloadHref,
    htmlHref: aiCompanionDoc.downloadHtmlHref,
    pageHref: "/download",
    apkHref: appDownload.apkUrl,
    fileName: appDownload.fileName,
  },
] as const;
