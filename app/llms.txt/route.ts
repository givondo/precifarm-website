import { siteConfig } from "@/lib/seo/config";
import { contact } from "@/lib/contact";
import { modularEnergyPaths } from "@/lib/modular-energy-page";

export async function GET() {
  const body = `# ${siteConfig.name}

> ${siteConfig.defaultDescription}

## Canonical site
- ${siteConfig.url}

## What Precifarm is
Precifarm installs, finances and runs EV charging in Kenya — from home charging to highway charging, paid with M-Pesa.

## Chargers
- Spark charger: portable 3.3 kW · typical 60 km day in about 180 minutes · from KES 25,000
- Pulse charger: 7 kW home wallbox · typical day in about 90 minutes · from KES 79,000 · Lipa Pole Pole
- Pod energy storage: home charger + 5 or 10 kWh storage · from KES 295,000 · Lipa Pole Pole
- Boda Hub: battery swap or kerbside · under 5 minutes
- Depot charging station: 22 kW fleet AC · 40+ kWh in about 120 minutes
- Corridor charging: 120 kW+ highway DC · about 60 kWh in 30 minutes · public DC from KES 39/kWh

Lipa Pole Pole is M-Pesa financing for Pulse charger and Pod energy storage, not a charger.

## Modular energy (conceptual — not on sale)
- Platform overview: ${siteConfig.url}${modularEnergyPaths.overview}
- P1 Go (portable): ${siteConfig.url}${modularEnergyPaths.p1Go}
- P2 Home (home tower): ${siteConfig.url}${modularEnergyPaths.p2Home}
- Pod Stack (outdoor SME): ${siteConfig.url}${modularEnergyPaths.podStack}
- MegaPack (project BESS): ${siteConfig.url}${modularEnergyPaths.megapack}

Pod Stack is modular-energy outdoor backup — not Pod energy storage (the home charger on /charging/home).

## Published cost figures
- A home charging day (~60 km) costs about KES 140 versus ~KES 1,000 diesel per day
- Public DC from KES 39/kWh at Depot charging stations and Corridor charging
- Session price is shown before you charge

## Primary pages
- Home: ${siteConfig.url}/
- Charging Hub: ${siteConfig.url}/hub
- Charging: ${siteConfig.url}/charging
- Home charging: ${siteConfig.url}/charging/home
- Kenya EV guide: ${siteConfig.url}/evs
- Engineering package: ${siteConfig.url}/charging/engineering
- Sustainability: ${siteConfig.url}/sustainability
- Partners: ${siteConfig.url}/partners
- EV charging training (T1, T2, T3): ${siteConfig.url}/training
- About: ${siteConfig.url}/about
- Careers: ${siteConfig.url}/careers
- Precifarm Agent: ${siteConfig.url}/download
- Contact: ${siteConfig.url}/contact

## Content hubs
- FAQ index: ${siteConfig.url}/faq
- Guides index: ${siteConfig.url}/guides (also ${siteConfig.url}/learn)
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

## Precifarm Agent
- Android App Links: ${siteConfig.url}/.well-known/assetlinks.json
- Precifarm Agent (Android APK): ${siteConfig.url}/download
- App deep link scheme: precifarm://charging

## Topics we publish authoritative content on
- From home charging to highway charging in Kenya
- Pulse charger, Pod energy storage and Spark charger
- Modular energy platform (P1 Go, P2 Home, Pod Stack, MegaPack — design intent)
- Sustainability commitments and impact reporting
- Public DC from KES 39/kWh and a home charging day about KES 140
- M-Pesa and Lipa Pole Pole financing
- Charging Hub and partner networks
- Fleet Depot charging and Boda Hub
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
