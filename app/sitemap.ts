import type { MetadataRoute } from "next";
import { BOOKING_FAQ_SLUG, BOOKING_GUIDE_SLUG } from "@/lib/charging-faqs";
import { absoluteUrl } from "@/lib/seo/config";
import { cmsListSeoContent } from "@/lib/seo/cms-client";
import { buildStaticSitemapEntries } from "@/lib/seo/sitemap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = buildStaticSitemapEntries();

  let dynamicEntries: MetadataRoute.Sitemap = [];

  try {
    const [items, swahiliFaqs] = await Promise.all([
      cmsListSeoContent({ status: "published" }),
      cmsListSeoContent({ status: "published", locale: "sw-KE" }),
    ]);

    const swahiliEntries: MetadataRoute.Sitemap = swahiliFaqs
      .filter((item) => item.contentType === "faq" && item.slug !== BOOKING_FAQ_SLUG)
      .map((item) => ({
        url: absoluteUrl(`/sw/faq/${item.slug}`),
        lastModified: item.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.5,
      }));

    const contentEntries: MetadataRoute.Sitemap = items
      .filter((item) => item.slug !== BOOKING_FAQ_SLUG && item.slug !== BOOKING_GUIDE_SLUG)
      .map((item) => {
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

    dynamicEntries = [...contentEntries, ...swahiliEntries];
  } catch {
    // CMS unavailable at build time — static sitemap only
  }

  return [...staticEntries, ...dynamicEntries];
}
