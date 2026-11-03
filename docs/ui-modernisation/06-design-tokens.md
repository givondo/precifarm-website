# 06 Design tokens

Source: `app/globals.css` (`@theme inline`). Decision D1, 3 November 2026: the site moves to the Precifarm document brand.

## Brand

| Token | Value | Use | Contrast |
|---|---|---|---|
| `brand-600` (= `charge-600`, `link`) | #1F6F4A | Buttons, links, eyebrows, active states | 6.1:1 on white; white on it 6.1:1 |
| `brand-500` (= `charge-500`) | #2D8459 | Button hover | white on it 4.6:1 |
| `brand-700` (= `charge-700`, `link-hover`) | #195A3C | Link hover, pressed | 8.0:1 on white |
| `brand-50` to `brand-200` | #EEF7F2, #D6EDE0, #AEDAC2 | Tints, selected rows, focus wash | backgrounds only |
| `brand-300`, `brand-400` | #7EC09D, #4A9E73 | Accents on dark panels | 5.8:1 or more on #0c0f12 |

`charge-*` keeps its name so the 220 existing class names work unchanged; new code should use `brand-*`.

## Ink and greys

| Token | Value | Replaced |
|---|---|---|
| `forest-950/900/800`, `--foreground` | #111827 (Precifarm ink) | #0a0a0a |
| `forest-700` | #1a2230 | #171717 |
| `forest-600` | #1f2937 | #262626 |
| `forest-500` | #374151 | #404040 |
| `forest-400` | #4b5563 | #525252 |
| `forest-300` | #6b7280 (Precifarm muted grey) | #737373 |
| `forest-200` | #d1d5db | #d4d4d4 |
| `forest-100`, `--muted` | #f3f4f6 | #f5f5f5 |
| `forest-50` | #f9fafb | #fafafa |
| `--border` | #e5e7eb | #e5e5e5 |

Each grey was matched by lightness, not by name, so no text lost contrast.

## Unchanged on purpose

- Status tokens (`status-*`): maturity is a claim and keeps its own colours, distinct from the brand.
- Feedback tokens: `positive`, `warning`, `danger`, `info` (blue stays the information colour).
- Technical diagrams (`HubSchematic`, `components/research/diagrams/`): blue and green there are data categories, not branding. Recolouring blue to the brand green would merge two categories.
- Map pin colours (`lib/hub-locations.ts`): availability semantics.

## Logo and icons

The logo keeps its original blue (HD-047, 3 Nov 2026): chevron mark #2563EB on #EFF6FF, "farm" in #2563EB (#93C5FD on dark), favicon, Apple touch icon, structured-data logo and the downloadable mark. `components/Logo.tsx` pins the wordmark colour so it does not follow the green UI palette. A green version was made and reverted the same evening; it is in git history (commit 2ddbc1b).
