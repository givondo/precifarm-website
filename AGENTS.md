<!-- BEGIN:nextjs-agent-rules -->
# Next.js version warning

Read relevant guides in `node_modules/next/dist/docs/` before changing framework APIs.
<!-- END:nextjs-agent-rules -->

# Website Agent Rules

## Read first

**Passenger booking work:** [`../agents/passenger-booking/AGENTS.md`](../agents/passenger-booking/AGENTS.md)

**Business rules:** [`../docs/CANON.md`](../docs/CANON.md)

**UI system:** [`docs/UI.md`](docs/UI.md)

## Scope

Maintain Nairobi–Kisumu passenger booking:

```text
search → seats → passenger details → M-Pesa → PF confirmation
```

Do not add cargo, financing, home charging, or multiple routes without explicit instruction.

## Source of truth

- CMS mode: shared inventory through `CMS_API_URL`.
- Demo mode: in-memory only; never describe as persistent.
- Do not create a second production seat store.
- Do not bypass CMS reconciliation flows.

## Key files

| Change | File |
|---|---|
| Layout + fonts | `app/layout.tsx` |
| Design tokens | `app/globals.css` |
| Hero + booking section | `components/BookingCTA.tsx` |
| Booking wizard | `components/BookingPortal.tsx` |
| Seats | `components/SeatMap.tsx` |
| Navigation | `components/Header.tsx` |
| UI primitives | `components/ui/{Button,Input,Badge,StepIndicator,...}.tsx` |
| API proxy | `app/api/{booking,payment,seats}/route.ts` |
| CMS client | `lib/cms.ts` |
| Validation | `lib/booking.ts` |
| Demo | `lib/booking-store.ts` |
| Route | `lib/route.ts` |

## UI conventions

- Headings: `.heading-display` (Plus Jakarta Sans)
- Forms: `Input` / `.field-input`, actions: `Button`
- Booking card: `.card-elevated`
- Reuse `components/ui/*` — avoid one-off button/input Tailwind strings

## Copy

- Route, not corridor
- Book Now
- Nairobi–Kisumu only
- Planning assumptions are not traction

## Deploy

Production: **Google Cloud Run** (`europe-west1`). See [`docs/DEPLOY-GCP.md`](docs/DEPLOY-GCP.md). Netlify/Vercel deprecated.

## Required checks

Run lint and build. Test booking in demo and CMS mode when available. Confirm sold seats cannot be selected twice.
