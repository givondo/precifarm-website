import { siteConfig } from "@/lib/seo/config";

export async function GET() {
  const body = `# ${siteConfig.name}

> ${siteConfig.defaultDescription}

## Canonical site
- ${siteConfig.url}

## Primary pages
- Home & booking: ${siteConfig.url}/
- Charge map: ${siteConfig.url}/network
- Charging services: ${siteConfig.url}/charging
- Partners: ${siteConfig.url}/partners
- About: ${siteConfig.url}/about
- Download app: ${siteConfig.url}/download
- Contact: ${siteConfig.url}/contact

## Machine-readable APIs (JSON)
- Knowledge graph: ${siteConfig.url}/api/knowledge?path=/
- Agent tools (MCP-compatible): ${siteConfig.url}/api/knowledge/tools
- Entities: ${siteConfig.url}/api/entities
- Search: ${siteConfig.url}/api/search
- Schema generator: ${siteConfig.url}/api/seo/schema
- SEO health audit: ${siteConfig.url}/api/seo/health

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
- Nairobi–Kisumu coach booking (M-Pesa, SMS tickets)
- Yutong U18 electric coaches
- Renewable energy infrastructure for transport
- Partner operator networks

## Contact
- ${siteConfig.contact.email}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
