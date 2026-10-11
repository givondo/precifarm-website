# Website UI

Design system reference for the Precifarm **charging** website (`website/`).

**Last updated:** 2026-10-11 (cinematic homepage + motion system)

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
| `HomeHero` / `home/*` | Homepage hero, panels, proof, scenarios, final CTA |
| `ChargingHubView` / `hub-map/*` | Charging Hub map, list, site detail |
| `HomeSurveyForm` | Pulse / Pod home survey on `/charging/home` |
| `ModularEnergyView` / `MegaPackView` | Conceptual modular-energy and MegaPack pages |
| `DownloadShowcase` / `download/*` | Precifarm Agent APK and product sheet |
| `ValueProposition` | Problem/solution marketing block |
| `SiteImage` | Optimized image wrapper |

## Homepage (October 2026)

The homepage is a dark, full-bleed, cinematic layout (`hx-*` classes in `globals.css`):
full-viewport hero with word-by-word headline and Ken Burns image, four stacked product
panels (Home, Boda Hub, Corridor, Modular energy) with scroll-linked parallax and
count-up stats, an ecosystem marquee, proof grid, scenario cards and final CTA.
Copy lives in `lib/brand-messaging.ts` (`homePanels`, `homeProofStats`); photography in
`lib/home-page-images.ts`. The header turns dark and transparent over the hero.

## Motion

| Piece | How |
|---|---|
| Scroll reveal | Add `data-reveal` (or `="fade" \| "scale" \| "left" \| "right"`) to any element; `data-reveal-stagger="90"` on a parent staggers its children. One shared IntersectionObserver in `components/motion/MotionProvider.tsx`. |
| Count-up numbers | `components/motion/CountUp.tsx` |
| Parallax, scroll progress bar, hero fade | Pure CSS scroll-driven animations inside `@supports (animation-timeline: …)` |
| Inner-page heroes | CSS `rise-in` on load, no JavaScript |

Content is visible by default and only hidden below the fold once JavaScript runs, so
there is no flash and no SEO cost. `prefers-reduced-motion` disables all of it.
`SectionHeader`, `PageCTA`, `ContentIndexCard` and `ProductShowcaseRow` reveal automatically.

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
