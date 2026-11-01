import { absoluteUrl, publicRoutes } from "@/lib/seo/config";
import { homePageImages } from "@/lib/home-page-images";
import { productImages } from "@/lib/product-images";
import { productRenderPaths } from "@/lib/product-renders-catalog";
import type { SitemapEntry } from "@/lib/seo/types";

export function buildStaticSitemapEntries(lastModified = new Date()): SitemapEntry[] {
  const imagesByPath = buildImageSitemapEntries();
  return publicRoutes
    .filter((route) => !("sitemap" in route && route.sitemap === false))
    .map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changefreq,
      priority: route.priority,
      ...(imagesByPath[route.path] ? { images: imagesByPath[route.path] } : {}),
    }));
}

/**
 * Product photography surfaced to Google Images, keyed by the page each image
 * appears on so the surrounding page context is what ranks.
 */
export function buildImageSitemapEntries(): Record<string, string[]> {
  return {
    "/": [homePageImages.featuredPulse.src, productImages.pulsePlus.src, productImages.corridor.src].map(absoluteUrl),
    "/charging/home": [productImages.pulse.src, productImages.financing.src].map(absoluteUrl),
    "/charging": [productImages.pulse.src, productImages.pulsePlus.src, productImages.corridor.src, productImages.boda.src].map(
      absoluteUrl,
    ),
    "/charging/pulse-plus": [productImages.pulsePlus.src].map(absoluteUrl),
    "/charging/corridor": [productImages.corridor.src, productImages.corridorForecourt.src].map(absoluteUrl),
    "/charging/boda-hub": [
      productRenderPaths.bodaHubStudio,
      productRenderPaths.bodaHub,
      productRenderPaths.bodaHubFront,
    ].map(absoluteUrl),
  };
}
