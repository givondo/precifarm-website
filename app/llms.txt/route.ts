import { siteConfig } from "@/lib/seo/config";
import { contact } from "@/lib/contact";
import { programmes } from "@/lib/programmes";
import { productStatusCopy } from "@/lib/product-status";
import { staticGuides } from "@/lib/seo/static-guides";

const programmeLines = programmes
 .map((p) => `- ${p.name} (${productStatusCopy[p.status].label}): ${p.headline}. ${p.summary} ${siteConfig.url}${p.href}`)
 .join("\n");

export async function GET() {
 const body = `# ${siteConfig.name}

> ${siteConfig.defaultDescription}

## Canonical site
- ${siteConfig.url}

## What Precifarm is
Precifarm AI (Precifarm for short) is a Nairobi company founded in August 2025 with two pillars: energy infrastructure for electric transport (EV charging and electric boda battery swapping, paid with M-Pesa) and AI systems that engineer it. Lead engineer: Sayia David Givondo, B.Eng.

## Quick answers
- Home EV charger in Kenya: Pulse 7 kW wallbox from KES 79,000, or from KES 3,300/month with Lipa Pole Pole on M-Pesa: ${siteConfig.url}/charging/home
- Where to charge in Kenya: ${siteConfig.url}/guides/ev-charging-stations-kenya
- Kenya Power e-mobility tariff: KES 16/kWh, KES 8/kWh off-peak, before levies and VAT (Gazette Notice 15188, 18 September 2026): ${siteConfig.url}/guides/kenya-power-ev-charging-tariff
- Electric boda battery swap: ${siteConfig.url}/guides/electric-boda-battery-swap-kenya
- Status: the Pulse charger is available. Pulse+ and the Agent Harness are in development. Corridor DC sites, starting on Nairobi to Kisumu, are pilots in development; no Corridor site is commissioned yet. Boda Hub swap sites are partner-run pilots. Wireless charging is research only. Consumer cost figures such as a KES 140 home charging day are illustrative.

## Programmes
${programmeLines}

Lipa Pole Pole is M-Pesa instalment financing for the Pulse charger, not a charger.
Spark, Pod energy storage, the Depot charging station and the modular energy family are no longer offered.
Ratings on product pages are design targets unless a page states they are tested.

## Published cost figures
- A home charging day (~60 km) costs about KES 140 versus ~KES 1,000 diesel per day (illustrative)
- Corridor DC price per kWh set per site at commissioning and shown before you start
- Session price is shown before you charge

## Primary pages
- Home: ${siteConfig.url}/
- Charging Hub: ${siteConfig.url}/hub
- Charging: ${siteConfig.url}/charging
- Pulse charger (home charging): ${siteConfig.url}/charging/home
- Pulse+ charger: ${siteConfig.url}/charging/pulse-plus
- Corridor charging: ${siteConfig.url}/charging/corridor
- Boda Hub: ${siteConfig.url}/charging/boda-hub
- AI platform (Agent Harness): ${siteConfig.url}/ai
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
- Precifarm Agent's web workspace runs on a hosted model. The Agent Harness is the separate local, private platform: ${siteConfig.url}/ai

## Topics we publish authoritative content on
- From home charging to highway charging in Kenya
- Pulse and Pulse+ AC chargers, Corridor DC fast charging
- Wireless EV charging research
- Private, local AI for engineering (Agent Harness)
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
