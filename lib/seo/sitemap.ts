import { absoluteUrl, publicRoutes } from "@/lib/seo/config";
import { modularEnergyPaths } from "@/lib/modular-energy-page";
import { productImages } from "@/lib/product-images";
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
      productImages.chargingEcosystemHero.src,
      productImages.pulse.src,
      productImages.podHomeHero.src,
      productImages.corridor.src,
      productImages.spark.src,
    ].map(absoluteUrl),
    "/charging/home": [productImages.pulse.src, productImages.financing.src].map(absoluteUrl),
    "/charging": [productImages.corridor.src, productImages.depot.src, productImages.boda.src].map(
      absoluteUrl,
    ),
    "/charging/boda-hub": [
      "/images/products/boda-hub-street-hero.png",
      "/images/products/boda-hub-locker-family-closed.png",
      "/images/products/energy-module-256-v2.png",
      "/images/products/boda-hub-bay-closed.png",
    ].map(absoluteUrl),
    [modularEnergyPaths.overview]: [
      productImages.familyHero.src,
      productImages.p1Go.src,
      productImages.podCharging.src,
    ].map(absoluteUrl),
  };
}
