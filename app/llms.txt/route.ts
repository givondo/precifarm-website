import { siteConfig } from "@/lib/seo/config";
import { contact } from "@/lib/contact";

export async function GET() {
  const body = `# ${siteConfig.name}

> ${siteConfig.defaultDescription}

## Canonical site
- ${siteConfig.url}

## Primary pages
- Home & booking: ${siteConfig.url}/
- Charge map: ${siteConfig.url}/network
- Charging services: ${siteConfig.url}/charging
- Private house charging: ${siteConfig.url}/charging/private-house
- Partners: ${siteConfig.url}/partners
- EV charging training (T1, T2, T3): ${siteConfig.url}/training
- About: ${siteConfig.url}/about
- Careers: ${siteConfig.url}/careers
- Download app: ${siteConfig.url}/download
- Contact: ${siteConfig.url}/contact

## Content hubs
- FAQ index: ${siteConfig.url}/faq
- Guides index: ${siteConfig.url}/guides
- Locations index: ${siteConfig.url}/locations

## Machine-readable APIs (JSON)
- Knowledge graph: ${siteConfig.url}/api/knowledge?path=/
- Agent tools (MCP-compatible): ${siteConfig.url}/api/knowledge/tools
- Entities: ${siteConfig.url}/api/entities
- Search: ${siteConfig.url}/api/search
- Schema generator: ${siteConfig.url}/api/seo/schema
- SEO health audit: ${siteConfig.url}/api/seo/health
- RSS feed: ${siteConfig.url}/feed.xml
- Sitemap: ${siteConfig.url}/sitemap.xml

## Languages
- English: ${siteConfig.url}/
- Kiswahili: ${siteConfig.url}/sw

## Mobile app
- Android App Links: ${siteConfig.url}/.well-known/assetlinks.json
- Web booking deep link: ${siteConfig.url}/book
- App deep link scheme: precifarm://book

## Topics we publish authoritative content on
- Electric intercity transport in Kenya
- EV charging hubs and fleet charging
- Nairobi–Kisumu bus booking (M-Pesa, SMS tickets)
- Yutong U18 electric buses
- Renewable energy infrastructure for transport
- Partner operator networks

## Contact
- ${contact.email}
- ${contact.phone}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
