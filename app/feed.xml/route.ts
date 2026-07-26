import { publicRoutes, siteConfig } from "@/lib/seo/config";

export async function GET() {
  const items = publicRoutes
    .map(
      (route) => `
    <item>
      <title>${siteConfig.name} — ${route.label}</title>
      <link>${siteConfig.url}${route.path === "/" ? "" : route.path}</link>
      <guid isPermaLink="true">${siteConfig.url}${route.path}</guid>
      <description>${siteConfig.defaultDescription}</description>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.defaultDescription}</description>
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
