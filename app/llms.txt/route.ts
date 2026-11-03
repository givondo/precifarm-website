import { siteConfig } from "@/lib/seo/config";
import { contact } from "@/lib/contact";
import { programmes } from "@/lib/programmes";
import { staticGuides } from "@/lib/seo/static-guides";

const programmeLines = programmes
 .filter((p) => p.code !== "AGENTH")
 .map((p) => `- ${p.name}: ${p.headline}. ${p.summary} ${siteConfig.url}${p.href}`)
 .join("\n");

export async function GET() {
 const body = `# ${siteConfig.name}

> ${siteConfig.defaultDescription}

## Canonical site
- ${siteConfig.url}

## What Precifarm is
Precifarm AI (Precifarm for short) is a Nairobi company founded in August 2025 building energy infrastructure for electric transport (EV charging and electric boda battery swapping, paid with M-Pesa) and Precifarm Agent, an AI engineering assistant for EV charging and energy design. Tagline: Precifarm: powering the shift to electric transport. Lead engineer: Sayia David Givondo, B.Eng.

## Quick answers
- Home EV charger in Kenya: Pulse 7 kW wallbox from KES 79,000, or from KES 3,300/month with Lipa Pole Pole on M-Pesa: ${siteConfig.url}/charging/home
- Where to charge in Kenya: ${siteConfig.url}/guides/ev-charging-stations-kenya
- Kenya Power e-mobility tariff: KES 16/kWh, KES 8/kWh off-peak, before levies and VAT (Gazette Notice 15188, 18 September 2026): ${siteConfig.url}/guides/kenya-power-ev-charging-tariff
- Electric boda battery swap: ${siteConfig.url}/guides/electric-boda-battery-swap-kenya
- Where things stand: the Pulse charger is sold and installed today. Pulse+, Corridor and the Automated Boda Hub take site registrations; the first Corridor site, on the Nairobi to Kisumu route, is being prepared. Boda Hub swap sites are run with partners. Wireless charging is Precifarm R&D for light-duty cars.
- Free EV charging survey for homes, fuel stations, offices, workplaces and depots: ${siteConfig.url}/contact

## Programmes
${programmeLines}

Lipa Pole Pole is M-Pesa instalment financing for the Pulse charger, not a charger.
Spark, Pod energy storage, the Depot charging station and the modular energy family are no longer offered.
Ratings on product pages come from Precifarm's engineering register.

## Published cost figures
- A home charging day (about 60 km) costs about KES 140 versus about KES 1,000 of diesel
- Corridor DC price per kWh set per site and shown before you start
- Session price is shown before you charge

## Primary pages
- Home: ${siteConfig.url}/
- Charging Hub: ${siteConfig.url}/hub
- Charging: ${siteConfig.url}/charging
- Pulse charger (home charging): ${siteConfig.url}/charging/home
- Pulse+ charger: ${siteConfig.url}/charging/pulse-plus
- Corridor charging: ${siteConfig.url}/charging/corridor
- Boda Hub: ${siteConfig.url}/charging/boda-hub
- Kenya EV guide: ${siteConfig.url}/evs
- Engineering package: ${siteConfig.url}/charging/engineering
- Sustainability: ${siteConfig.url}/sustainability
- Partners: ${siteConfig.url}/partners
- EV charging training (T1, T2, T3): ${siteConfig.url}/training
- About: ${siteConfig.url}/about
- Careers: ${siteConfig.url}/careers
- Precifarm Agent: ${siteConfig.url}/agent
- Research & development: ${siteConfig.url}/research
- Legal & policies: ${siteConfig.url}/legal
- Desktop download: ${siteConfig.url}/download
- Contact: ${siteConfig.url}/contact

## Guides
${staticGuides.map((g) => `- ${g.title}: ${siteConfig.url}/guides/${g.slug}`).join("\n")}

## Content hubs
- FAQ index: ${siteConfig.url}/faq
- Guides index: ${siteConfig.url}/guides
- Legacy learn URLs redirect to FAQ: ${siteConfig.url}/faq
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

## Precifarm Agent
- Precifarm Agent: ${siteConfig.url}/agent
- Web workspace: ${siteConfig.url}/agent/chat
- OpenCode local setup: ${siteConfig.url}/download
- Request access: ${siteConfig.url}/contact?interest=agent-desktop
- Precifarm Agent runs on hosted AI models.

## Topics we publish authoritative content on
- From home charging to highway charging in Kenya
- Pulse and Pulse+ AC chargers, Corridor DC fast charging
- Wireless EV charging R&D
- Precifarm Agent: AI engineering for EV charging and energy design
- Sustainability commitments and impact reporting
- A home charging day costs about KES 140; Corridor DC is priced per site
- M-Pesa and Lipa Pole Pole financing
- Charging Hub and partner networks
- Fleet charging and Boda Hub battery swapping
- Partner operator and site-host networks

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
