# 01 Route inventory

Discovered from `app/**/page.tsx`, `app/**/route.ts` and `next.config.ts`, then requested against a local production build. Every page route below returned HTTP 200 at 1440 px.

## Page routes

| Route | Purpose | Render |
|---|---|---|
| `/` | Homepage: two pillars, six programmes | Static, revalidate 1 h |
| `/charging` | Charging overview | Static |
| `/charging/home` | Pulse charger, home survey form, Lipa Pole Pole | Static |
| `/charging/pulse-plus` | Pulse+ 22 kW (in development) | Static |
| `/charging/corridor` | Corridor DC (pilot) | Static |
| `/charging/boda-hub` | Boda Hub battery swap (pilot) | Static |
| `/charging/engineering` | Design package PDF | Static |
| `/research` | R&D index | Static |
| `/research/wireless-ev-charging-policy` | Wireless EV charging research programme | Static |
| `/ai` | Agent Harness | Static |
| `/agent` | Precifarm Agent product page, embedded chat | Static |
| `/agent/chat` | Full Agent workspace | Static shell, client chat |
| `/download` | Precifarm Agent download | Static |
| `/hub` | Charging Hub map (Leaflet) | Static shell, client map |
| `/contact` | Contact form | Dynamic |
| `/partners`, `/about`, `/careers`, `/training`, `/sustainability` | Company and go-to-market | Static |
| `/faq`, `/faq/[slug]` | FAQ | Static and SSG |
| `/guides`, `/guides/[slug]` | Four guides | SSG, revalidate 1 h |
| `/evs` | Electric cars in Kenya | Static |
| `/locations`, `/locations/[slug]` | City pages | SSG |
| `/legal`, `/legal/terms`, `/legal/privacy`, `/legal/cookies` | Legal | Static |

The brief names `/charging/home`, `/charging/corridor`, `/ai` and `/agent`; all exist and keep their URLs. Pulse has no `/charging/pulse` route: its product page is `/charging/home`.

## API routes

`/api/contact` and `/api/survey` (forms to CMS), `/api/agent/chat` (DeepSeek or OpenRouter, optional OpenCode bridge, per-instance rate limit), `/api/agent/opencode-config`, `/api/analytics/events`, `/api/analytics/errors`, `/api/search`, `/api/cms/health`, `/api/entities`, `/api/knowledge`, `/api/knowledge/tools`, `/api/seo/health`, `/api/seo/report`, `/api/seo/schema`, `/.well-known/assetlinks.json`.

## Redirects (all permanent, `next.config.ts`)

Legacy and retired paths: `/book` and `/book/*` to `/charging`; `/charging/modular-energy/*` to `/charging`; `/ai-agent` and `/precifarm-agent` to `/agent`; `/learn/*` to `/faq`; `/ev-charging/*` to the matching charging page; `/sw/*` to the English page; WordPress-era `/products/*`, `/blog/*`, `/financing`, `/terms`, `/privacy`, `/cities/*`. Verified: `/book` returns 308 to `/charging`.

## Title convention

Titles mix two separators: `|` (for example "DC Fast Charging for Kenyan Highways | Precifarm Corridor") and `·` (for example "EV Charging Solutions in Kenya: Home, Fleet & Highway · Precifarm"). Optional tidy-up: pick one in `lib/seo/pages/registry.ts`.
