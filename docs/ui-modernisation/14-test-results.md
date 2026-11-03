# 14 Test results

Latest run: 3 November 2026, branch `ui-modernisation/phase-a-b`, local production build.

| Suite | Command | Result |
|---|---|---|
| Unit | `npm test` | 33 of 33 pass |
| Types | `npx tsc --noEmit` | clean |
| Lint | `npm run lint` | 0 errors, 8 warnings (all pre-existing unused variables) |
| Build | `npm run build` | pass, 56 pages (run here with a local font mock; see 00) |
| End to end | `npm run test:e2e` | 110 pass, 2 skipped by design (each navigation test runs on one form factor) |

## What the end-to-end suite covers

Two projects, desktop at 1440 px and mobile at 390 px, against `next start`:

- All 24 public routes: HTTP 200, exactly one `h1`, no page errors, no sideways scroll, and no content clipped at the right edge (the check that found the `/training` and `/charging/engineering` defects).
- axe-core WCAG 2.2 AA on all 24 routes, with `target-size` excluded on `/hub` only (known issue K1).
- `/book` redirects to `/charging`; `/download` makes no chatbot, Play Store or iOS claim.
- Mobile menu opens, and Escape closes it; desktop navigation is visible.
- Contact form success and rate-limit paths with `/api/contact` mocked, honeypot empty for a real visitor, hidden and out of the tab order.
- The Agent hero workspace is exposed as an illustrative example.

## Running it

```bash
npm run build
npx playwright install chromium   # once per machine
npm run test:e2e
```

Where the Playwright browser download is blocked, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to an installed Chrome. Set `E2E_BASE_URL` to test a deployed preview instead of a local server.
