# 05 Migration plan

## Principle

The site already runs the target framework (Next.js 16 App Router, React 19, Tailwind v4) and already has an honest claims model. The work is refinement, not migration: keep every route and the generated register, and improve design consistency, interaction quality and the Agent workspace in small, screenshot-verified steps.

## Decisions needed from David

| ID | Decision | Why it matters |
|---|---|---|
| D1 | Brand palette | Decided 3 Nov: Precifarm green #1F6F4A, ink #111827, grey #6B7280. Done, see 06 |
| D2 | Claims R2 to R4 (Pulse availability, Harness local-first wording, Corridor storage) | Copy on live pages is out of step with 1 and 2 Nov decisions; the fix belongs in PRECIFARM_MASTER, then regenerate |
| D3 | Canon R1: update `docs/CANON.md` to the six programmes | `AGENTS.md` sends every agent to a stale rulebook |
| D4 | Dependency additions: shadcn/ui (Radix primitives), Motion, React Flow | Each adds client JavaScript; proposed only where listed below |

## Dependency assessment

| Library | Proposal | Reason |
|---|---|---|
| shadcn/ui | Adopt for Sheet, Dialog, Tabs, Accordion, Tooltip, NavigationMenu as those components are next touched | Accessible focus management for the mobile menu and dialogs. The current hand-built menu passes basic checks, so this is not urgent |
| Motion | Adopt only for the Agent workspace and product media transitions | CSS already covers header and card motion |
| Magic UI | Not now | No current section needs it; revisit for a bento programme grid |
| React Flow (`@xyflow/react`) | Adopt for a read-only workflow viewer in `/agent/chat` once the chat route emits typed step events | There is no workflow event stream yet; a graph without one would be decoration |
| Three.js / R3F | Pilot on one page only, when an approved GLB exists | Pulse Rev C geometry in FreeCAD is the likely first asset |
| Zod | Adopt in `/api/contact` and `/api/survey` | Shared server and client validation |
| Playwright and axe-core | Added as dev dependencies; `npm run test:e2e` | Done |

## Phases

| Phase | Scope | Status |
|---|---|---|
| A | Audit, baseline screenshots, route and functional inventory | Done (this branch) |
| B1 | Semantic status and feedback tokens, honest demo labelling, reduced-motion handling, contrast and JSON-LD fixes, form rate limits and honeypot, phone clipping fixes, e2e suite | Done (this branch) |
| B2 | Decide D1; move component classes into `@layer components` page by page using `appendix-layer-conflicts.md`; Button and Badge on tokens | Next |
| C | Header and footer on shadcn primitives, footer audit | After B2 |
| D | Homepage hierarchy: hero media, programme cards with one status component | After D1 and D2 |
| E | Programme pages on one `ProgrammeView` system with evidence labels per row | `ProgrammeView` already exists; extend it |
| F | Engineering components (QuantityInput, AssumptionPanel, CalculationTrace) for Agent outputs | With G |
| G | Agent workspace: typed step events from `/api/agent/chat`, then React Flow viewer | Needs backend event contract |
| H | Lighthouse CI on a preview revision, release checklist | Before any deploy |

## Rollback

Every change is on `ui-modernisation/phase-a-b`, one commit per concern. Reverting a commit restores the previous behaviour; no data or URL changed in Phase B1; the only dependency change is two dev dependencies for testing.
