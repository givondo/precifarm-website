# 02 Existing design system

## Tokens (`app/globals.css`, `@theme inline`)

| Group | Tokens | Actual use |
|---|---|---|
| Ink | `forest-50` to `forest-950` | Neutral greys and near-black (#0a0a0a). Despite the name, not green |
| Link | `link`, `link-hover`, `link-500` to `link-700` | Green #15803d for text links, chosen for 4.5:1 on white |
| Action | `charge-50` to `charge-700` | Blue #2563eb for buttons and CTAs |
| Accent | `solar-400`, `solar-500` | Amber accents |
| Surfaces | `background`, `foreground`, `muted`, `border`, `surface` | White, #f5f5f5, #e5e5e5 |
| Fonts | `font-sans` Geist, `font-display` Plus Jakarta Sans, `font-mono` Geist Mono | |

The live palette is therefore black ink, green links and blue buttons. The Precifarm document brand (green #1F6F4A, ink #111827, grey #6B7280, Helvetica) is not used on the site. Aligning the two is a brand decision for David and is not made on this branch (see 05, decision D1).

## Patterns

`globals.css` is 2,177 lines of named component classes written with `@apply`, outside any cascade layer (`.site-header-*`, `.mobile-nav-*`, `.home-hero-*`, `.page-hero`, `.card`, `.btn-primary`, `.heading-display` and many page-specific families). Because these rules are unlayered, they beat Tailwind utilities on the same element. Finding D-1 below is a direct result.

## Components (`components/ui/`)

`Button`, `Input`, `Badge`, `StatusBadge`, `SectionHeader`, `PageHero`, `PageCTA`, `CheckItem`, `ContentIndexCard`, `SpecTable`. `StatusBadge` reads `lib/product-status.ts`, the single status model for the site (available, pilot, development, research, concept, quotation), each with a plain-language meaning.

## Motion

CSS transitions only (header dropdowns at 180 to 220 ms, card hovers). A global `prefers-reduced-motion` block shortens all CSS transitions and animations. Two Agent demos used JavaScript timers that the CSS block cannot stop (fixed on this branch).

## Findings

| ID | Finding | Severity | Change | Status |
|---|---|---|---|---|
| D-1 | `.heading-display` sets ink colour unlayered, so `heading-display text-white` renders near-black. On `/agent` the worked-example recommendation "7 kW home charger" was 1.03:1 on its dark panel, effectively invisible | High | Use the existing `.heading-inverted` modifier; regression test added | Fixed |
| D-2 | Status colours were raw hue utilities (`bg-amber-50`, `bg-sky-50`) in `lib/product-status.ts` | Medium | Semantic status and feedback tokens in the theme | Fixed |
| D-3 | Component classes live unlayered in one 2,177-line file | Medium | Move into `@layer components` page by page so utilities can override them. A whole-file move was tried and measured on 3 Nov: 676 computed-style changes across 27 routes, 602 from one cause (`body` line-height losing to `text-base` on `<body>`) and 74 genuine component-versus-utility conflicts, several of them deliberate mobile overrides. Reverted; the 74 are listed in `appendix-layer-conflicts.md` as the worklist | Planned, per page |
| D-4 | Mono font used for large hero statements ("Under 2 hours") | Low | Keep mono for figures and labels; use display or sans for statements | Planned, visual |
