# Website UI

Design system reference for the Precifarm **charging** website (`website/`).

**Last updated:** 2026-09-08 (Canon v3.3 — EV charging + modular energy)

Passenger booking UI was **removed** 31 August 2026. Do not restore Book Now, seat maps, booking wizards, or `BookingPortal` / `SeatMap` / `StepIndicator` as live product.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 App Router |
| Styling | Tailwind CSS 4 (`@import "tailwindcss"` in `app/globals.css`) |
| Body font | Geist Sans (`next/font/google`) |
| Display font | **Plus Jakarta Sans** — headings via `.heading-display` |
| Mono | Geist Mono — stats, specs, form codes |

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
| `.card-elevated` | Stronger shadow for featured panels |
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
| `SectionHeader` | Eyebrow + title + description for marketing sections |
| `PageHero` | Subpage hero with radial gradient |
| `PageCTA` | Call-to-action blocks |
| `CheckItem` | Bullet with check icon |
| `ContentIndexCard` | Index / directory cards |

## Page-level components

| Component | Role |
|---|---|
| `Header` | Sticky nav, mobile drawer; CTA via `HubCtaLink` → Charging Hub |
| `HubCtaLink` | Primary header CTA (“Open Charging Hub”) — renamed from retired `BookNowLink` |
| `Footer` | Company links and contact |
| `HomeHero` / `home/*` | Homepage charging scenarios, flagships, energy, FAQ, CTAs |
| `ChargingHubView` / `hub-map/*` | Charging Hub map, list, site detail |
| `HomeSurveyForm` | Pulse / Pod home survey on `/charging/home` |
| `ModularEnergyView` / `MegaPackView` | Conceptual modular-energy and MegaPack pages |
| `DownloadShowcase` / `download/*` | Precifarm Agent APK and product sheet |
| `ValueProposition` | Problem/solution marketing block |
| `SiteImage` | Optimized image wrapper |

## Conventions

- Use `.heading-display` for H1/H2 marketing headings
- Use `Button` and `field-input` / `Input` in new form UI — avoid one-off Tailwind strings
- CTA copy: **Open Charging Hub** / **Explore charging**; first corridor: **Nairobi–Kisumu**
- Modular energy pages stay labelled conceptual
- Do not add bus-route booking, seat maps, or reserved bus windows as public product

## Related docs

- [Website README](../README.md)
- [Website Channel](../../docs/channels/website.md)
- [Pivot cleanup](./PIVOT-CLEANUP.md)
- [Deploy to GCP](./DEPLOY-GCP.md)
