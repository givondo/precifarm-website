# PreciFarm Website

Public passenger-booking channel for Nairobi–Kisumu.

**Production:** `https://precifarm.com` · `https://precifarm.com/#book`

**Core job:** publish departures, reserve seats, collect passenger details, initiate M-Pesa, and issue `PF-XXXXXX`.

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Plus Jakarta Sans (headings) · Geist Sans (body)

## Start

```bash
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm install
npm run dev
```

Open <http://localhost:3000/#book>.

**Environment:** copy [`.env.example`](./.env.example) → `.env.local`. Full reference: [`docs/infrastructure/environment.md`](../docs/infrastructure/environment.md).

## Passenger flow

```text
search → seat map → passenger details → M-Pesa → confirmation
```

Required passenger data: name, phone, National ID/passport.

## Source of truth

| Mode | Configuration | Use |
|---|---|---|
| CMS | `CMS_API_URL=http://localhost:3002/api` | Shared inventory with mobile and agent desk |
| Demo | `CMS_API_URL` unset | In-memory store; resets on restart |

CMS mode is required for shared or production-like testing.

Production non-secret URLs are set on Cloud Run; secrets live in Secret Manager — see [environment.md](../docs/infrastructure/environment.md).

## Public routes

| Route | Purpose |
|---|---|
| `/`, `/#book` | Home + booking |
| `/training` | EV charging certification (T1–T3) |
| `/charging`, `/charging/private-house` | Charging services + house-based private charging |
| `/network` | Charge map |
| `/guides`, `/faq`, `/locations` | CMS-backed SEO content (ISR) |
| `/sw` | Kiswahili locale |
| `/partners`, `/about`, `/contact`, `/careers`, `/download` | Marketing |

Full map: [Website channel doc](../docs/channels/website.md).

## API routes

| Route | Purpose |
|---|---|
| `GET /api/seats` | Seat availability |
| `POST /api/booking` | Passenger booking |
| `POST /api/payment` | M-Pesa initiation |
| `POST /api/contact` | Contact form → CMS |
| `POST /api/analytics/events` | Analytics proxy |
| `GET /api/search` | CMS semantic search |
| `GET /api/cms/health` | CMS connectivity |

Booking routes proxy to CMS when `CMS_API_URL` is set.

## Key files

| Concern | Path |
|---|---|
| Layout + fonts | `app/layout.tsx` |
| Global styles / tokens | `app/globals.css` |
| Homepage | `app/page.tsx` |
| Booking | `components/BookingPortal.tsx`, `components/SeatMap.tsx` |
| Training | `app/training/`, `lib/training.ts` |
| Private house charging | `app/charging/private-house/`, `lib/home-charging.ts` |
| SEO | `lib/seo/`, `components/seo/` |
| Analytics | `lib/analytics.ts`, `components/AnalyticsProvider.tsx` |
| CMS client | `lib/cms.ts`, `lib/seo/cms-client.ts` |

## Environment

Copy [`.env.example`](./.env.example) → `.env.local`. **Do not commit `.env.local`.**

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (SEO) |
| `CMS_API_URL` | CMS base URL |
| `DEMO_PAYMENT` | Demo vs live STK (website-only mode) |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Maps on `/network` (optional) |
| `ANALYTICS_INGEST_KEY` | Analytics proxy key (must match CMS) |
| `ANDROID_APP_SHA256` | Android App Links fingerprint |
| `MPESA_*` | Daraja — **only when CMS is unset** |

Full list and GCP Secret Manager mapping: [`docs/infrastructure/environment.md`](../docs/infrastructure/environment.md).

## Copy rules

- Use **route**, not corridor.
- Current route: **Nairobi–Kisumu**.
- CTA: **Book Now**.
- Do not present planning fares or departures as traction.
- Do not expose gated expansion as current product.

## Status

**Actual:** booking UI (2026-07 refresh), seat inventory, API routes, demo store, CMS proxy, M-Pesa hooks, GCP Cloud Run deploy.

**In progress:** custom domain SSL (`precifarm.com`), CMS Cloud SQL migrations.

**Not proven:** paid production volume, conversion, live SMS delivery, shared production inventory, payment success.

## Commands

```bash
npm run lint
npm run build
npm run start
```

## Deploy

Production hosting is **Google Cloud Run** (`europe-west1`). See [DEPLOY-GCP.md](./docs/DEPLOY-GCP.md).

```powershell
gcloud builds submit --config cloudbuild.yaml
```

Netlify and Vercel are **deprecated**.

## Documentation

- [Deploy to Google Cloud](./docs/DEPLOY-GCP.md)
- [Workflows](../docs/infrastructure/workflows.md)
- [Database / Supabase](../docs/infrastructure/database.md)
- [SEO architecture](./docs/SEO-AISO-ARCHITECTURE.md)
- [UI design system](./docs/UI.md)
- [Website Channel](../docs/channels/website.md)
