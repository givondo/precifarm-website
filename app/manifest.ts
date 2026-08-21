import type { MetadataRoute } from "next";
import { defaultSiteTitle, siteConfig } from "@/lib/seo/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: defaultSiteTitle,
    short_name: siteConfig.name,
    description: siteConfig.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: siteConfig.language,
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
