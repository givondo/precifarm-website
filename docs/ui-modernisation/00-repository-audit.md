# 00 Repository audit

**Date:** 3 November 2026 · **Branch:** `ui-modernisation/phase-a-b` from `main` at `19b90a6` ("Pivot precifarm.com to the six programmes (#9)", 1 Nov 2026)

## Layout

Precifarm keeps two repositories in one working tree, as `REPOS.md` in the docs repo describes:

| Path | Repository | Role |
|---|---|---|
| `kenya-ebus-ecosystem/` | `givondo/kenya-ebus-ecosystem` | Canon, product, engineering and channel docs (`main` at `d0b8ef8`, 16 Oct 2026) |
| `kenya-ebus-ecosystem/website/` | `givondo/precifarm-website` | This Next.js site. Gitignored by the docs repo |

`website/AGENTS.md` links `../docs/CANON.md`, so the site must be checked out inside the docs repo for those links to resolve.

## Stack (installed versions, verified from `package-lock.json`)

| Layer | Version | Notes |
|---|---|---|
| Next.js | 16.2.10 | App Router only. `output: "standalone"`. Production build uses `--webpack` |
| React | 19.2.4 | |
| TypeScript | 5.x | `tsc --noEmit` clean |
| Tailwind CSS | 4.x via `@tailwindcss/postcss` | CSS-first: `@import "tailwindcss"` and `@theme inline` in `app/globals.css`. No `tailwind.config.*` |
| Fonts | `next/font/google`: Geist, Geist Mono, Plus Jakarta Sans | |
| Maps | Leaflet 1.9 and `react-leaflet` 5; `@react-google-maps/api` also present | Two map stacks, see finding R4 |
| Node | 20 (`.node-version`); sandbox ran 22.23 | |
| Package manager | npm with lockfile | |

Not present: shadcn/ui (`components.json` absent), Motion, Magic UI, React Flow, React Three Fiber, Zod, React Hook Form, Playwright, Storybook, Vitest. Tests use the Node test runner (`tests/*.test.ts`, loader in `tests/setup/register.mjs`).

## Structure

- `app/`: 33 page routes, 16 API routes, metadata routes (`robots.ts`, `sitemap.ts`, `manifest.ts`, `opengraph-image.tsx`, `llms.txt`, `feed.xml`).
- `components/`: 21 top-level components plus folders per surface (`home/`, `agent/`, `hub-map/`, `programmes/`, `research/`, `seo/`, `ui/` and others).
- `lib/`: content and data modules (one file per page's copy), SEO system (`lib/seo/`), Agent runtime (`lib/agent/`), and the generated engineering register `lib/generated/product-specs.ts`.
- `proxy.ts`: canonical-host redirect (www to apex). Next.js 16 name for middleware.
- Deployment: `Dockerfile`, `cloudbuild.yaml` (Cloud Run, `europe-west1`), plus legacy `vercel.json` and Netlify/Hostinger notes.

## Source of truth for product claims

`lib/generated/product-specs.ts` is written by PRECIFARM_MASTER `tools/pfm.py export-web` (generated 2026-11-01, source commit `9212fb4`, every programme marked approved by David on 1 Nov 2026 08:44 EAT). `lib/programmes.ts` adds routes and summaries; `evidenceNote()` turns each claim's evidence and verification into a visible label ("Design target, calculated", "Not yet measured", "Tested"). This is already the structure the brief asks for, so the modernisation builds on it rather than replacing it.

## Baseline checks (commands run on this branch before any change)

| Check | Command | Result |
|---|---|---|
| Install | `npm ci` | 376 packages, exit 0 |
| Lint | `npm run lint` | exit 0, 0 errors, 8 warnings (unused variables in `lib/charging.ts`, `lib/engineering-page.ts` and PDF scripts) |
| Types | `npx tsc --noEmit` | exit 0 |
| Unit tests | `npm test` | 23 of 23 pass |
| Build | `npm run build` | Fails in this sandbox only: Google Fonts is unreachable. With `NEXT_FONT_GOOGLE_MOCKED_RESPONSES` pointing at the real Geist and Plus Jakarta Sans files from npm, the build passes: 56 static pages, exit 0 |

The font mock lives outside the repository and changes nothing in production. On a machine with internet access, `npm run build` needs no extra step.

## Findings

| ID | File or route | Finding | Severity | Proposed change | Risk | Required |
|---|---|---|---|---|---|---|
| R1 | `../docs/CANON.md` | Canon is v3.3 (8 Sep 2026) and still lists Spark, Pod, Depot, modular energy and Corridor at KES 39/kWh as marketed. The site and its register follow the 1 Nov pivot | High (governance) | Update Canon to the six-programme state, or point `AGENTS.md` at PRECIFARM_MASTER | None to the site | Yes, owner decision |
| R2 | `lib/generated/product-specs.ts` | Pulse is `status: available` with `maturity: DESIGN`, and every Pulse claim is a design target with no test record | Medium (claims) | Confirm in the register whether Pulse is sold today; the page already labels every figure honestly | Copy change | Owner decision |
| R3 | `lib/programmes.ts`, `/ai`, homepage pillars | Agent Harness is described as local-first with Ollama models. A 2 Nov decision moved the AI platform to cloud APIs only | High (claims) | Regenerate the Harness claims from PRECIFARM_MASTER after the register is updated | Copy change | Owner decision |
| R4 | `lib/programmes.ts` summary, homepage Highway card | Corridor is described with "on-site storage". The first Corridor site is a bought-in OEM charger without storage | High (claims) | Change summary and card copy once confirmed | Copy change | Owner decision |
| R5 | `components/home/HomePillars.tsx` | Precifarm Agent uses the Available badge colour with the label "Hosted". The `/agent` page itself says early access | Low | Add an `earlyAccess` status or use the Pilot style | Low | Optional |
| R6 | `package.json` | Two map stacks (Leaflet and Google Maps) | Low | Keep one when `/hub` is next reworked | Medium | Optional |
| R7 | `docs/UI.md`, `README.md` | Still describe modular energy, Spark and Pod pages that the pivot retired | Low | Refresh docs | None | Optional |

Business claims R1 to R4 are not changed on this branch: the brief requires authorisation for material changes to published claims.
