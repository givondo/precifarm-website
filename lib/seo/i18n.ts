import { absoluteUrl } from "@/lib/seo/config";

export type SiteLocale = {
  code: string;
  hreflang: string;
  pathPrefix: string;
  label: string;
};

export const siteLocales: SiteLocale[] = [
  { code: "en-KE", hreflang: "en-KE", pathPrefix: "", label: "English" },
  { code: "sw-KE", hreflang: "sw-KE", pathPrefix: "/sw", label: "Kiswahili" },
];

export function localeFromPath(path: string): SiteLocale {
  if (path === "/sw" || path.startsWith("/sw/")) {
    return siteLocales.find((l) => l.code === "sw-KE")!;
  }
  return siteLocales.find((l) => l.code === "en-KE")!;
}

export function pathWithoutLocale(path: string): string {
  if (path === "/sw") return "/";
  if (path.startsWith("/sw/")) return path.slice(3) || "/";
  return path;
}

/** Build hreflang alternates for a logical page path (without locale prefix). */
export function hreflangAlternates(logicalPath: string): Record<string, string> {
  const normalized = logicalPath.startsWith("/") ? logicalPath : `/${logicalPath}`;
  const languages: Record<string, string> = {};
  for (const locale of siteLocales) {
    const localized =
      locale.pathPrefix === ""
        ? normalized
        : normalized === "/"
          ? locale.pathPrefix
          : `${locale.pathPrefix}${normalized}`;
    languages[locale.hreflang] = absoluteUrl(localized);
  }
  languages["x-default"] = absoluteUrl(normalized);
  return languages;
}

export const swahiliUi = {
  homeTagline: "Miundombinu ya usafiri wa umeme kwa Kenya.",
  bookCta: "Hifadhi nafasi Nairobi–Kisumu",
  guides: "Miongozo",
  faq: "Maswali",
  locations: "Maeneo",
} as const;
