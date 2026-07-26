# Website UI

Design system reference for the PreciFarm booking website (`website/`).

**Last updated:** 2026-07-26 (UI refresh v2.8.0)

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 App Router |
| Styling | Tailwind CSS 4 (`@import "tailwindcss"` in `app/globals.css`) |
| Body font | Geist Sans (`next/font/google`) |
| Display font | **Plus Jakarta Sans** — headings via `.heading-display` |
| Mono | Geist Mono — stats, booking references, step numbers |

No separate `tailwind.config.*` — design tokens live in `@theme inline` inside `globals.css`.

## Color tokens

| Token | Usage |
|---|---|
| `forest-*` | Text, dark sections, navigation |
| `charge-*` | Primary accent, CTAs, success states |
| `solar-*` | Energy/charging accents (hero gradient) |
| `--background`, `--muted`, `--border` | Surfaces |

## Utility classes

| Class | Purpose |
|---|---|
| `.page-container` | Max-width content wrapper (`max-w-5xl`) |
| `.page-container-narrow` | Narrow forms (`max-w-2xl`) |
| `.section-pad` | Vertical section rhythm |
| `.card` | Bordered white card |
| `.card-elevated` | Card with stronger shadow (booking portal) |
| `.heading-display` | Plus Jakarta Sans bold headings |
| `.field-input` | Form input styling |
| `.hero-mesh` | Hero background gradient |
| `.trust-strip` | Inline trust badges row |

## Shared components (`components/ui/`)

| Component | Purpose |
|---|---|
| `Button` | Primary, secondary, ghost, dark variants |
| `Input` | Labeled text fields with optional hint |
| `Badge` | Status chips (live, muted, solar, outline) |
| `StepIndicator` | Booking wizard progress (desktop labels + mobile step text) |
| `SectionHeader` | Eyebrow + title + description for marketing sections |
| `PageHero` | Subpage hero with radial gradient |
| `PageCTA` | Call-to-action blocks |
| `CheckItem` | Bullet with check icon |

## Page-level components

| Component | Role |
|---|---|
| `Header` | Sticky nav, mobile drawer, Book Now CTA |
| `Footer` | Company links and contact |
| `BookingCTA` | Homepage hero + `#book` section; lazy-loads `BookingPortal` |
| `BookingPortal` | 5-step booking wizard (journey → seats → details → pay → done) |
| `SeatMap` | Interactive 2+2 seat layout (12 rows) |
| `ValueProposition` | Problem/solution marketing block |
| `SiteImage` | Optimized image wrapper |

## Booking flow steps

1. **Journey** — date chips, departure times, passenger count
2. **Seats** — `SeatMap` with live occupancy from `/api/seats`
3. **Details** — name, M-Pesa phone, ID, optional email
4. **Confirm** — review + M-Pesa trust copy
5. **Paying / Done** — STK push polling, confirmation with `PF-XXXXXX` reference

## Conventions

- Use `.heading-display` for H1/H2 marketing headings
- Use `Button` and `field-input` / `Input` in new form UI — avoid one-off Tailwind strings
- Booking portal uses `card-elevated` shell; compact mode for embedded use
- CTA copy: **Book Now**; route: **Nairobi–Kisumu** only
- Do not add cargo, multi-route, or gated expansion without explicit instruction

## Related docs

- [Website README](../README.md)
- [Website Channel](../../docs/channels/website.md)
- [Passenger Booking Agent](../../agents/passenger-booking/README.md)
- [Deploy to GCP](./DEPLOY-GCP.md)
