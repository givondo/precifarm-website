# 17 Change log

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
