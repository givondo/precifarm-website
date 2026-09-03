# Precifarm Website

Public EV charging and modular-energy site for Kenya.

**Production:** `https://precifarm.com`

**Core job:** Charging Hub, home/fleet/highway products, Pulse/Pod surveys, AI companion APK, conceptual modular energy, training.

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Plus Jakarta Sans (headings) · Geist Sans (body)

Passenger booking was **removed** (31 August 2026). `/book` redirects to `/charging`.

## Start

```bash
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm install
npm run dev
```

Open <http://localhost:3000>.

**Environment:** copy [`.env.example`](./.env.example) → `.env.local`. Full reference: [`docs/infrastructure/environment.md`](../docs/infrastructure/environment.md).

## Public routes

| Route | Purpose |
|---|---|
| `/` | Home — charging + energy |
| `/hub` | Charging Hub |
| `/charging`, `/charging/home` | Products + home survey |
| `/charging/modular-energy` | P1 Go / P2 Home / Pod enclosure / MegaPack (conceptual) |
| `/charging/modular-energy/megapack` | MegaPack — project-engineered BESS (industrial to utility-scale) |
| `/charging/engineering` | Design package PDF |
| `/download` | AI companion APK + product sheet |
| `/training` | T1–T3 |
| `/evs`, `/guides`, `/faq`, `/locations` | SEO |
| `/partners`, `/about`, `/contact`, `/careers` | Company / GTM |

Full map: [Website channel doc](../docs/channels/website.md) · [Pivot cleanup](./docs/PIVOT-CLEANUP.md).

## API routes

| Route | Purpose |
|---|---|
| `POST /api/contact` | Contact form → CMS |
| `POST /api/analytics/events` | Analytics proxy |
| `GET /api/search` | CMS semantic search |
| `GET /api/cms/health` | CMS connectivity |

## Key files

| Concern | Path |
|---|---|
| Layout + fonts | `app/layout.tsx` |
| Global styles / tokens | `app/globals.css` |
| Homepage | `app/page.tsx` |
| Canonical copy | `lib/brand-messaging.ts` |
| Charging Hub | `lib/charging-hub.ts`, `lib/hub-locations.ts` |
| AI companion | `lib/download-page.ts`, `app/download/` |
| Private house charging | `lib/home-charging.ts` |
| Modular energy | `lib/modular-energy-page.ts` |
| SEO | `lib/seo/`, `components/seo/` |
| Analytics | `lib/analytics.ts` |

## Copy rules

- **From home charging to highway charging.**
- Full product names: Pulse charger, Pod energy storage, Spark charger, Corridor charging.
- AI companion is **not a chatbot**.
- Live vs planned hubs stay honest.
- Modular energy is **conceptual, not on sale**. Pod enclosure ≠ Pod energy storage.
- Do not present booking, seat maps or uncommissioned bus windows as live product.
- Do not mention BYD on homepage or product pages.

## Status

**Actual:** charging site, Charging Hub, AI companion page, Cloud Run at precifarm.com.

**Not proven as traction:** paid installs, public session volume.

## Commands

```bash
npm run lint
npm run build
npm run start
npm run pdf:ai-companion
```

## Deploy

Google Cloud Run (`europe-west1`). See [DEPLOY-GCP.md](./docs/DEPLOY-GCP.md).

```powershell
gcloud builds submit --config cloudbuild.yaml
```

## Documentation

- [Deploy to Google Cloud](./docs/DEPLOY-GCP.md)
- [Website Channel](../docs/channels/website.md)
- [Canon](../docs/CANON.md)
- [SEO architecture](./docs/SEO-AISO-ARCHITECTURE.md)
- [UI design system](./docs/UI.md)
