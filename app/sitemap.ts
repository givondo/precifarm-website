import type { MetadataRoute } from "next";
import { BOOKING_FAQ_SLUG } from "@/lib/charging-faqs";
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
      // Guides and local pages redirect to /faq and /charging, so only FAQ pages are listed.
      .filter((item) => item.contentType === "faq" && item.slug !== BOOKING_FAQ_SLUG)
      .map((item) => {
        return {
          url: absoluteUrl(`/faq/${item.slug}`),
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
