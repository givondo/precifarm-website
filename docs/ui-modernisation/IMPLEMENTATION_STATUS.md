# Implementation status

**Updated:** 3 November 2026 · **Branch:** `ui-modernisation/phase-a-b` (pushed) · **Base:** `main` at `19b90a6`

| Phase | State |
|---|---|
| A: audit and baseline | Done. See 00 to 04 |
| B1: tokens, honest demos, accessibility, JSON-LD, form protection, phone clipping, e2e suite | Done. See 14 and 17 |
| B2: cascade layers per page, Button and Badge on tokens | Worklist ready (`appendix-layer-conflicts.md`); waits on D1 because each conflict is a visual choice |
| C onwards | Waiting on decisions D1 to D4 in 05 |

## To continue

1. Check out the site inside the docs repo: `kenya-ebus-ecosystem/website/`.
2. `npm ci`, then `npm test`, `npm run lint`, `npm run build`, `npm run test:e2e`.
3. Read 05 for the open decisions, then 18 for accepted issues.

Nothing has been deployed. Production stays on `main` through Cloud Build.
