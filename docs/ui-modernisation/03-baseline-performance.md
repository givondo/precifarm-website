# 03 Baseline quality and performance

## Method

Local production build (`next build --webpack`, `next start` on port 3100), Chrome for Testing 153 driven by `playwright-core`, axe-core 4 with WCAG 2.0 A, 2.0 AA, 2.1 AA and 2.2 AA rules, reduced motion on. The repeatable part of this audit is now in the repository as `npm run test:e2e` (see 14).

24 routes were each loaded at 320, 360, 390, 430, 768, 1024, 1280, 1440 and 1920 px (216 page loads). Full-page screenshots were taken at 390 and 1440 px for every route, and at all nine widths for the homepage.

## Results

| Measure | Baseline |
|---|---|
| Horizontal overflow | No page scrolls sideways at any of the 216 combinations. **Correction (3 Nov):** that check read `scrollWidth`, which `overflow-x: clip` on html and body hides. A later check for clipped content found `/training` (638 px wide) and `/charging/engineering` (530 px wide) cut off at 390 px; both fixed, and the e2e suite now tests for clipping directly |
| One `h1` per page | Yes, all 24 routes |
| axe violations (1440 px) | 0 on 22 routes. `/agent`: colour-contrast, 7 nodes. `/hub`: target-size, 9 nodes. Running axe at 390 px later found two more: an unfocusable scrolling table on `/charging/home` and a low-contrast badge in the `/hub` mobile sheet (both fixed) |
| Page errors | None |
| Console errors | Only on `/hub`: map tiles blocked by the sandbox network, not a site defect |
| Mobile menu (390 px) | Opens; Escape closes it and sets `aria-expanded="false"` |
| `/book` | Redirects to `/charging` |
| `/download` | No chatbot, Play Store or iOS claim found in the page text |

## Not measured here

Core Web Vitals and Lighthouse were not run: this sandbox cannot reach precifarm.com, Google Fonts or the hero video on Google Cloud Storage, so any figure would describe the sandbox, not the site. Field data (CrUX, 75th percentile) should come from Search Console or PageSpeed Insights on the live site. Recommended next step: run Lighthouse CI against a Cloud Run preview revision.

The live site at precifarm.com was not inspected in this session for the same network reason; the baseline describes the `main` branch build.
