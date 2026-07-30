import { absoluteUrl, publicRoutes } from "@/lib/seo/config";
import type { SitemapEntry } from "@/lib/seo/types";

export function buildStaticSitemapEntries(lastModified = new Date()): SitemapEntry[] {
  return publicRoutes
    .filter((route) => !("sitemap" in route && route.sitemap === false))
    .map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changefreq,
      priority: route.priority,
    }));
}

export function buildImageSitemapEntries(): { url: string; images: string[] }[] {
  return [
    {
      url: absoluteUrl("/"),
      images: [
        absoluteUrl("/images/precifarm-logo.png"),
        absoluteUrl("/images/yutong-u18-coach.jpg"),
      ],
    },
  ];
}
