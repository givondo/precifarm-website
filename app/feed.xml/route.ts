import { absoluteUrl, publicRoutes, siteConfig } from "@/lib/seo/config";
import { getPageSeo } from "@/lib/seo/pages/registry";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function routeDescription(path: string, label: string): string {
  return getPageSeo(path)?.description ?? `${siteConfig.name} — ${label}. ${siteConfig.defaultDescription}`;
}

export async function GET() {
  const items = publicRoutes
    .filter((route) => !("sitemap" in route && route.sitemap === false))
    .map((route) => {
      const link = absoluteUrl(route.path);
      const title = `${siteConfig.name} — ${route.label}`;
      const description = routeDescription(route.path, route.label);

      return `
    <item>
      <title>${escapeXml(title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(description)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.defaultDescription)}</description>
    <language>${siteConfig.language}</language>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
