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
    id: "precifarm-android",
    kind: "app" as const,
    title: "Precifarm Android app",
    subtitle: `v${appDownload.version} · ${appDownload.packageId}`,
    version: appDownload.version,
    date: null,
    pdfHref: null,
    htmlHref: null,
    pageHref: "/download",
    apkHref: appDownload.apkUrl,
    fileName: appDownload.fileName,
  },
] as const;
