# QA results (6 November 2026)

Build of branch `interior-redesign` (after commit 2310507), run with `next start` on port 3100. Before = `main` at 46e249a, built in a separate worktree on port 3101.

| Check | Result |
|---|---|
| `npx tsc --noEmit` / `npm run typecheck` | Pass |
| `npx eslint .` | 0 errors, 6 warnings (unused variables in old PDF scripts, unchanged) |
| `npm test` | 51 of 51 pass (36 before the redesign; new: footer links and CTAs, company-publications, software-research-business) |
| `npm run build` (mocked Google Fonts) | Pass |
| Playwright e2e (`tests/e2e`, desktop and mobile projects) | 106 pass, 2 skipped (skips are existing conditional tests) |
| axe WCAG 2.2 AA on 23 public routes, desktop and mobile | 48 of 48 pass |
| Route screenshots, 30 routes at 390, 768, 1024, 1440 px | 120 of 120 return 200, one h1, page width equals viewport (no sideways scroll) |
| `/book` redirect to `/charging`, `/ai` to `/agent` | Pass |
| `/download` makes no chatbot, Play Store or iOS claim | Pass |

Workstream interaction scripts (in their reports): charging products 27 checks, infrastructure 40, software-research-business 32, company-publications covered contact states, FAQ search and filters, EV explorer and legal anchors. All passed on their final builds.

Not testable here: the live Agent chat end to end (no model key in this environment; the "not connected" state and the new retry were tested) and map tiles (the tile host is blocked in this sandbox; markers, route line and list view were tested).

## Homepage visual regression

Method: `scripts/qa/home-sections.cjs` takes an element screenshot of the header and every homepage block above the footer, at 390, 768, 1024 and 1440 px, with reduced motion, from the before build and the after build. `scripts/qa/home-compare.py` compares them pixel by pixel, allowing a one-row shift (a taller block above moves later blocks by a sub-pixel amount). The sticky header is hidden after its own capture so it does not overlap later blocks.

Result: **pass**. Header, announcement bar, hero, product range, scenarios, charging call to action, why Precifarm and final call to action are identical at all four widths. The Software & research section is excluded because David asked for its animation on 6 November; its change is intentional. The footer is new on every page, as briefed.

Run it again:

```bash
node scripts/qa/home-sections.cjs 3101 /tmp/home-before
node scripts/qa/home-sections.cjs 3100 /tmp/home-after
python3 scripts/qa/home-compare.py /tmp/home-before /tmp/home-after home-innovation-title
```

## Screenshots

Before and after captures of every route at 390, 768, 1024 and 1440 px were taken with `scripts/qa/route-screenshots.cjs`. A before/after review page with desktop and phone views of all 30 routes was published for David; the full-page PNGs are kept outside the repository because of their size.

## Fixed during integration

- axe `link-name` on the header phone link below 1280 px (all routes).
- axe colour contrast on the homepage Agent demo's queued steps.
- axe `target-size` on the ARC dispenser hotspots on phones.
