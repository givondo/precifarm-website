import type { MetadataRoute } from "next";
import { BOOKING_FAQ_SLUG, BOOKING_GUIDE_SLUG } from "@/lib/charging-faqs";
import { absoluteUrl } from "@/lib/seo/config";
import { cmsListSeoContent, type CmsSeoContent } from "@/lib/seo/cms-client";
import { buildStaticSitemapEntries } from "@/lib/seo/sitemap";
import { staticGuides } from "@/lib/seo/static-guides";

export const revalidate = 3600;

function cmsEntryPath(item: CmsSeoContent): string {
  const prefix =
    item.contentType === "faq"
      ? "/faq"
      : item.contentType === "local_page"
        ? "/locations"
        : "/guides";
  let slug = item.slug;
  if (item.contentType === "local_page" && slug.startsWith("ev-charging-")) {
    slug = slug.replace(/^ev-charging-/, "");
  }
  return `${prefix}/${slug}`;
}

function dedupeSitemap(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = buildStaticSitemapEntries();

  let dynamicEntries: MetadataRoute.Sitemap = [];

  try {
    const items = await cmsListSeoContent({ status: "published", locale: "en-KE" });

    const contentEntries: MetadataRoute.Sitemap = items
      .filter(
        (item) =>
          item.slug !== BOOKING_FAQ_SLUG &&
          item.slug !== BOOKING_GUIDE_SLUG &&
          (!item.locale || item.locale === "en-KE"),
      )
      .map((item) => ({
        url: absoluteUrl(cmsEntryPath(item)),
        lastModified: item.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));

    dynamicEntries = contentEntries;
  } catch {
    // CMS unavailable at build time — static sitemap only
  }

  const guideEntries: MetadataRoute.Sitemap = staticGuides.map((guide) => ({
    url: absoluteUrl(`/guides/${guide.slug}`),
    lastModified: guide.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return dedupeSitemap([...staticEntries, ...dynamicEntries, ...guideEntries]);
}
