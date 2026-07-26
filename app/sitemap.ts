import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/config";
import { cmsListSeoContent } from "@/lib/seo/cms-client";
import { buildStaticSitemapEntries } from "@/lib/seo/sitemap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = buildStaticSitemapEntries();
  const indexEntries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/guides"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/faq"), changeFrequency: "weekly", priority: 0.75 },
    { url: absoluteUrl("/locations"), changeFrequency: "weekly", priority: 0.78 },
    { url: absoluteUrl("/sw"), changeFrequency: "weekly", priority: 0.85 },
  ];

  let dynamicEntries: MetadataRoute.Sitemap = [];

  try {
    const items = await cmsListSeoContent({ status: "published" });
    dynamicEntries = items.map((item) => {
      const prefix =
        item.contentType === "faq"
          ? "/faq"
          : item.contentType === "local_page"
            ? "/locations"
            : "/guides";
      return {
        url: absoluteUrl(`${prefix}/${item.slug}`),
        lastModified: item.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    });
  } catch {
    // CMS unavailable at build time — static sitemap only
  }

  return [...staticEntries, ...indexEntries, ...dynamicEntries];
}
