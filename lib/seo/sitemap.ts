import { absoluteUrl, publicRoutes } from "@/lib/seo/config";
import { modularEnergyPaths } from "@/lib/modular-energy-page";
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
    "/": [
      homePageImages.featuredPulse.src,
      homePageImages.podHomeHero.src,
      productImages.corridor.src,
      productImages.spark.src,
    ].map(absoluteUrl),
    "/charging/home": [productImages.pulse.src, productImages.financing.src].map(absoluteUrl),
    "/charging": [productImages.corridor.src, productImages.depot.src, productImages.boda.src].map(
      absoluteUrl,
    ),
    "/charging/boda-hub": [
      productRenderPaths.bodaHubStudio,
      productRenderPaths.bodaHub,
      productRenderPaths.energyModuleEm256,
      productRenderPaths.bodaHubFront,
    ].map(absoluteUrl),
    [modularEnergyPaths.overview]: [
      productImages.familyHero.src,
      productImages.p1Go.src,
      productImages.podCharging.src,
    ].map(absoluteUrl),
  };
}
