<!-- BEGIN:nextjs-agent-rules -->
# Next.js version warning

Read relevant guides in `node_modules/next/dist/docs/` before changing framework APIs.
<!-- END:nextjs-agent-rules -->

# Website Agent Rules

## Read first

**Business rules:** [`../docs/CANON.md`](../docs/CANON.md) — EV charging + modular energy.

**UI system:** [`docs/UI.md`](docs/UI.md)

**Pivot inventory:** [`docs/PIVOT-CLEANUP.md`](docs/PIVOT-CLEANUP.md)

Passenger-booking agent docs are **archived**. Do not restore `/book`, seat maps or booking APIs as live product.

## Scope

Maintain the public charging site:

- Charging Hub (`/hub`)
- Home / fleet / highway products (`/charging`, `/charging/home`)
- Modular energy conceptual pages
- AI companion (`/download`)
- Training, partners, SEO surfaces

## Source of truth

- Copy: `lib/brand-messaging.ts`, `lib/charging-hub.ts`, `lib/download-page.ts`, `lib/home-charging.ts`
- CMS: SEO, contact, analytics when `CMS_API_URL` is set
- Demo stores are not traction
- Live vs planned hubs stay honest
- Modular energy is not on sale
- AI companion is not a chatbot

## Key files

| Change | File |
|---|---|
| Layout + fonts | `app/layout.tsx` |
| Design tokens | `app/globals.css` |
| Homepage | `app/page.tsx`, `lib/brand-messaging.ts` |
| Charging Hub | `lib/charging-hub.ts`, `lib/hub-locations.ts` |
| AI companion | `app/download/`, `lib/download-page.ts` |
| Home charging | `lib/home-charging.ts` |
| Navigation | `components/Header.tsx` |
| CMS client | `lib/cms.ts` |
| SEO | `lib/seo/` |

## Copy

- From home charging to highway charging
- Full product names (Pulse charger, Pod energy storage, …)
- Open Charging Hub — not Book Now
- Nairobi–Kisumu is the first Corridor, not a live passenger timetable
- Planning assumptions are not traction

## Deploy

Production: **Google Cloud Run** (`europe-west1`). See [`docs/DEPLOY-GCP.md`](docs/DEPLOY-GCP.md).

**Secrets:** copy [`.env.example`](.env.example) → `.env.local`. See [`docs/infrastructure/environment.md`](../docs/infrastructure/environment.md).

## Required checks

Run lint and build. Confirm `/book` still redirects to `/charging`. Confirm `/download` does not claim a chatbot, Play Store or iOS.
