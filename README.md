# PreciFarm Website

Public passenger-booking channel for Nairobi–Kisumu.

**Production:** `https://precifarm.com` · `https://precifarm.com/#book`

**Core job:** publish departures, reserve seats, collect passenger details, initiate M-Pesa, and issue `PF-XXXXXX`.

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Plus Jakarta Sans (headings) · Geist Sans (body)

## Start

```bash
npm install
npm run dev
```

Open <http://localhost:3000/#book>.

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

Production: `CMS_API_URL=https://api.precifarm.com/api`

## API routes

| Route | Purpose |
|---|---|
| `GET /api/seats` | Seat availability |
| `POST /api/booking` | Passenger booking |
| `POST /api/payment` | M-Pesa initiation |

These proxy to CMS when `CMS_API_URL` is set.

## Key files

| Concern | Path |
|---|---|
| Layout + fonts | `app/layout.tsx` |
| Global styles / tokens | `app/globals.css` |
| Homepage | `app/page.tsx` |
| Hero + booking section | `components/BookingCTA.tsx` |
| Booking wizard | `components/BookingPortal.tsx` |
| Seat map | `components/SeatMap.tsx` |
| Navigation | `components/Header.tsx` |
| UI library | `components/ui/{Button,Input,Badge,StepIndicator,SectionHeader,...}.tsx` |
| Website API | `app/api/{booking,payment,seats}/route.ts` |
| CMS client | `lib/cms.ts` |
| Validation | `lib/booking.ts` |
| Demo store | `lib/booking-store.ts` |
| Route assumptions | `lib/route.ts` |
| M-Pesa | `lib/mpesa.ts` |

## Environment

| Variable | Purpose |
|---|---|
| `CMS_API_URL` | CMS base URL |
| `DEMO_PAYMENT` | `false` enables live Daraja flow |
| `MPESA_CONSUMER_KEY` / `MPESA_CONSUMER_SECRET` | Daraja credentials |
| `MPESA_PASSKEY` / `MPESA_SHORTCODE` | STK credentials |
| `MPESA_CALLBACK_URL` | Live callback |
| `MPESA_ENVIRONMENT` | `sandbox` or `production` |

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
- [UI design system](./docs/UI.md)
- [Passenger Booking Agent](../agents/passenger-booking/README.md)
- [Website Channel](../docs/channels/website.md)
- [GCP infrastructure](../docs/infrastructure/gcp-deployment.md)
- [Canon](../docs/CANON.md)
- [Product Overview](../docs/product/product-overview.md)
