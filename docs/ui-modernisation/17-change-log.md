# 17 Change log

## Hero headline (4 November 2026, 15:25)

David changed the hero headline to "Powering the shift to electric transport." The supporting line and buttons are unchanged.

## Software and research section, HD-049 (4 November 2026)

| Change | Detail |
|---|---|
| Duplicate removed | The Precifarm Agent panel and Wireless R&D tile under the homepage product cards repeated the dark "Software & research" section further down. The pair under the cards is gone |
| Agent: interactive engineering workspace | `components/home/AgentWorkspaceDemo.tsx`. The visitor picks a daily distance; the Agent's own deterministic tools (`lib/agent/tools/engineering.ts`) work out daily energy, charge time on Pulse, breaker and RCD, and cable voltage drop. Shows the steps, a single line diagram and an expandable calculation trace with evidence labels. No model call, nothing scripted |
| Wireless: interactive R&D simulation | `components/home/WirelessSimulation.tsx`. Top view of a car over a ground pad; a slider moves the car off-centre; coupling falls, power trims inside a ±100 mm window and stops outside it. Labelled "Research simulation" and "Illustrative model, not operational hardware or measured data", as David asked. The coupling curve is illustrative, not bench data |

## Homepage refresh, HD-048 (4 November 2026)

David's instructions of 3 November, 23:43 onwards.

| Change | Detail |
|---|---|
| Hero | "Powering every electric journey." with David's supporting line; buttons "Book a free EV survey" (`/contact?interest=survey`) and "Explore EV charging solutions" (`/charging`) |
| Hero video | v7 pitch film, made from `Precifarm_Pitch_v7_HQ.mp4` (221 MB): web 1080p H.264 CRF 23 capped at 2.5 Mb/s, 18.9 MB; mobile 720p, 7.3 MB; poster from the opening frame. Object names `videos/precifarm-pitch-v7-web.mp4` and `-mobile.mp4`. Upload with `scripts/upload-hero-video.ps1` before deploying |
| Hero stats | "Charge at home" and "7× cheaper than fuel" (KES 140 against KES 1,000 a 60 km day, about KES 860 saved). David's draft said 10× and KES 2,000; the approved figures (HD-037) give 7× |
| Range cards | Category and status eyebrows exactly as David wrote them; titles Pulse 7 kW, Pulse+ 22 kW, ARC Corridor, Boda Hub; "Explore" calls to action |
| ARC naming | Corridor is now ARC Corridor in every product-name use (navigation, footer, programme page, FAQs, SEO). The URL stays `/charging/corridor` |
| Images | ARC: R02 dispenser render at dusk, widened to 16:10 (no canopy scenes, by David's instruction); it also replaces the canopy forecourt on the about page, Charging Hub, share images and sitemap. Pulse+: three units on a depot wall. Boda Hub: Rev D renders |

## Pivot pass, HD-045 and HD-046 (3 November 2026)

David's instruction at 21:54: approve R02, Pulse at up to 7.4 kW, no maturity labels or warnings, Precifarm Agent as the only AI page, pages aligned with the current pivot, improved UI and images.

| Change | Detail |
|---|---|
| Agent Harness removed | `/ai` page deleted and redirected to `/agent`; navigation group is now Precifarm Agent (agent and app); harness removed from programme list, SEO registry, entities, sitemap, about page, contact topics and LLM summary |
| Labels and warnings removed | Status badges on homepage, scenarios, programme pages, Charging Hub and Boda Hub; spec table evidence column and footnote; image captions; Agent example label; disclaimer sentences. Maturity is carried by wording and calls to action ("Book a free survey", "Plan your site", "Host a site", "Partner on a site") |
| Copy aligned with the pivot | Corridor: certified OEM 120 to 180 kW under the Precifarm brand, first site being prepared on Nairobi to Kisumu, no storage at the first site. Boda Hub: built with site partners; payment by energy with a daily cap (HD-039). Hub map: Precifarm sites shown as planned, no live availability. Announcement bar no longer claims public DC charging |
| Calls to action | Free EV charging survey for homes, fuel stations, offices, workplaces and depots is the primary action (hero, final CTA, new contact topic) |
| UI | Homepage range rebuilt as image tiles with a Precifarm Agent feature panel and an R&D tile; hero stats in the display face |
| Images | Pulse+ page uses the Rev B depot scene; the Lipa Pole Pole card shows the installed Pulse (the old image showed a generic charger); structured-data logo in brand green; 24 unreferenced images for retired products removed (13.2 MB) |
| Waiting | Spec tables still carry R01 claims until David records the R02 approval in PRECIFARM_MASTER and `lib/generated/product-specs.ts` is regenerated |

## Brand palette, D1 (3 November 2026)

David chose the Precifarm document brand for the site. Token-level change only: no layout, copy, URL or claim changed. See 06.

| Change | Files | Verified by |
|---|---|---|
| Actions, links and eyebrows from blue #2563EB to Precifarm green #1F6F4A; ink #111827; cool greys matched by lightness | `app/globals.css` | e2e axe colour contrast on 24 routes at 1440 and 390 px: 110 pass |
| Blue glows in hero, page hero, footer and showcase backgrounds now brand green | `app/globals.css` | Before and after captures |
| Training tier T3 header from charge-700 to ink, so T1 (emerald) and T3 stay distinct | `app/globals.css` | Visual |
| Share image background from navy to ink and deep green | `app/opengraph-image.tsx` | Build |
| Logo mark, wordmark underline, favicon and Apple touch icon in brand green (separate commit, revertible on its own) | `components/PrecifarmLogoMark.tsx`, `components/Logo.tsx`, `app/icon.png`, `public/favicon.png`, `app/apple-icon.png` | Pixel check: stroke is exactly #1F6F4A |

## Phase B1, second pass (3 November 2026)

No URL, product claim or calculation changed. Dev dependencies added: `@playwright/test` 1.64.1, `@axe-core/playwright` 4.12.1 (matched to the axe-core already in the lockfile). Installed with npm 11 so the lockfile keeps its `libc` fields, which the Alpine Docker image needs to pick musl binaries.

| Change | Files | Why | Verified by |
|---|---|---|---|
| Contact and survey routes rate-limited (5 per address per 10 min) with a honeypot that is never forwarded | `lib/rate-limit.ts`, `lib/form-guard.ts`, `components/forms/HoneypotField.tsx`, both API routes and forms | Security finding S-2 | `tests/form-guard.test.ts`; e2e contact tests with the API mocked |
| Agent chat route uses the shared limiter | `app/api/agent/chat/route.ts` | One implementation | Same limits as before |
| Form errors announced to screen readers | `ContactForm.tsx`, `HomeSurveyForm.tsx` | Errors were silent for assistive technology | e2e rate-limit test reads the alert |
| Tables no longer cut off on phones | `components/training/TrainingTables.tsx`, `app/charging/engineering/page.tsx` | Grid items with `min-width: auto` let 640 px tables widen the column to 530 to 638 px, clipped by `overflow-x: clip` | Captures at 390 px now 390 wide; 1440 px pixel-identical; e2e clipping check fails on the old build and passes on this one |
| Installation-process table on `/charging/home` keyboard-scrollable | `app/charging/home/page.tsx` | axe scrollable-region-focusable at 390 px | e2e axe |
| Hub sheet availability badge legible | `components/hub-map/HubSiteDetail.tsx` | Pin green as text on a pale tint, about 2:1 | e2e axe |
| Playwright and axe suite, `npm run test:e2e` | `playwright.config.ts`, `tests/e2e/` | Repeatable baseline in the repository | 110 pass |
| Cascade-layer migration attempted and reverted | none kept | Measured 74 genuine conflicts; needs per-page decisions | `appendix-layer-conflicts.md` |

## Phase B1 (3 November 2026, branch `ui-modernisation/phase-a-b`)

No URL, dependency, product claim or calculation changed.

| Change | Files | Why | Verified by |
|---|---|---|---|
| Semantic status tokens (`status-available`, `-pilot`, `-development`, `-research`, each with `-bg` and `-ring`) and feedback tokens (`positive`, `warning`, `danger`, `info`) | `app/globals.css`, `lib/product-status.ts` | Status is a maturity claim; one token per meaning stops hues drifting between components | Computed colours of every badge on `/` match the previous Tailwind values exactly; `tests/design-tokens.test.ts` |
| Hero workspace mock labelled "Illustrative example" ("Example" under 640 px), wrapped in a `figure` whose accessible name says it is scripted, and frozen for reduced motion | `components/agent/AgentWorkspaceMock.tsx` | The panel animates tasks to "done" on a timer; without a label it reads as a live run | Screenshots at 320, 390 and 1440 px; no overflow |
| Worked example shows every step at once for reduced motion | `components/agent/AgentExampleDemo.tsx`, new `lib/use-reduced-motion.ts` | CSS cannot stop JavaScript timers; faded pending steps also failed contrast | axe on `/agent`: 7 contrast nodes to 0, with and without reduced motion |
| Recommendation heading on the dark panel uses `heading-inverted` | `components/agent/AgentExampleDemo.tsx` | Rendered near-black on near-black (1.03:1) for every visitor | Computed colour now white; regression test scans all `.tsx` |
| Map markers named by site (`title` and `alt`) instead of Leaflet's default "Marker" | `components/hub-map/LeafletConnectivityMap.tsx` | Screen readers announced nine identical "Marker" buttons | axe output now names each hub |
| JSON-LD escapes `<` | `lib/seo/serialize-jsonld.ts`, `components/seo/JsonLd.tsx` | CMS text could close the script tag | `tests/jsonld.test.ts`; 36 of 36 JSON-LD blocks on five pages parse |
| Audit documents 00 to 05, 17, 18 and status | `docs/ui-modernisation/` | Baseline and plan | |

## Results after the change

| Check | Before | After |
|---|---|---|
| Unit tests | 23 pass | 28 pass |
| Lint | 0 errors, 8 warnings | 0 errors, the same 8 warnings |
| `tsc --noEmit` | clean | clean |
| Build (font mock) | pass, 56 pages | pass, 56 pages |
| axe on `/agent` | 1 rule, 7 nodes | 0 |
| axe on `/hub` | target-size, 9 nodes | target-size, 9 nodes (accepted, see 18) |
| Overflow on the 9 re-tested routes at 9 widths | 0 | 0 |
| `/book` redirect, `/download` claims | pass | pass |
