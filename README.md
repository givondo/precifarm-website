# PreciFarm Website

Public passenger-booking channel for Nairobi–Kisumu.

**Core job:** publish departures, reserve seats, collect passenger details, initiate M-Pesa, and issue `PF-XXXXXX`.

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4

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
| Booking UI | `components/BookingPortal.tsx` |
| Seat map | `components/SeatMap.tsx` |
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

**Actual:** booking UI, seat inventory, API routes, demo store, CMS proxy, M-Pesa hooks.

**Not proven:** paid production volume, conversion, live SMS delivery, shared production inventory, payment success.

## Commands

```bash
npm run lint
npm run build
npm run start
```

## Documentation

- [Passenger Booking Agent](../agents/passenger-booking/README.md)
- [Website Channel](../docs/channels/website.md)
- [Canon](../docs/CANON.md)
- [Product Overview](../docs/product/product-overview.md)
