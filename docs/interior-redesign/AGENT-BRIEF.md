# Interior redesign: shared brief for every page workstream

David's full brief: `/mnt/user-data/attachments/df6534e6-e696-58e5-a232-00db8816de75/bbea414a-attachment.txt`. Read it first. This file adds the decisions already made and the rules that keep parallel work from colliding.

## Decisions already made (do not reopen)

- Homepage `/` is out of scope. Do not edit `app/page.tsx`, `components/home/*`, or any component the homepage imports: `components/SiteImage.tsx`, `components/seo/FaqAccordion.tsx`, `components/HubSchematic.tsx`, `components/evs/ChargingTimeCell.tsx`, `components/Header.tsx`, `components/Logo.tsx`. A pixel regression check runs at the end.
- Footer is done: `components/footer/*`, links in `lib/site-nav.ts`. Do not edit.
- Interior system is done: `components/interior/*` (InteriorHero, InteriorSection, StageLabel, SpecSheet, StepFlow, MediaFrame, InPageNav, CalloutNote, Actions) and `.interior-container`. Use them. Do not edit them; if you need something they lack, build it in your own area folder and say so in your report.
- Do not edit `app/layout.tsx`, `app/globals.css`, `lib/brand-messaging.ts`, `lib/generated/*`, `lib/product-images.ts`, `lib/product-renders-catalog.ts`, `lib/programme-pages.ts`, `components/programmes/*`, `components/ui/*`. Stop using them on your pages if you want, but leave the files; the integrator removes dead code. Put new page data in new files, e.g. `lib/pages/<route>.ts`, and new components in `components/<area>/`.
- No new npm dependencies (2-CPU build box, performance budget). Motion with CSS and small client components; diagrams as hand-built SVG; no Three.js, React Flow, Motion, shadcn. Respect `prefers-reduced-motion` (see `lib/use-reduced-motion.ts`, `lib/use-in-view.ts`).
- Download page: cloud only. Precifarm AI uses hosted APIs only, no local models (HD-043). Show web, Android and desktop exactly as `lib/download-page.ts` and the existing download components say they are available; a download button only where a real file or install path exists today.
- ARC Corridor: the public name is ARC Corridor (URL stays `/charging/corridor`). Use the R03 station renders (`/mnt/user-data/uploads/ARC/09_Renders_Animations/renders_R03/ARC_R03_station_ARC_120_dusk.png`, `_240_`, `_360_`, `_600_Plus_`, `ARC_R03_stationeye_ARC_240_dusk.png`) on the ARC page only, converted to optimised JPEG (about 1920 px wide, quality 82, under 300 KB) in `public/images/arc/`, each labelled `StageLabel kind="proposed"`. The dispenser render `public/images/renders/arc-dispenser-dusk-r02.jpg` (two cables, two holsters) is the product shot. "Improved upper cable exit points" are not in any render: list that as an unresolved visual, do not fake it. ARC tiers 120, 240/360, 600+ are proposed station configurations around a certified OEM power core; nothing is installed or operating.
- Stage labels are wanted on interior pages (David's brief), using `StageLabel`: available, development, pilot, proposed, simulation, planned, partner-site, illustrative. The homepage cards carry David's own eyebrows; match them: Pulse available; Pulse+ in development; ARC Corridor pilot development; Boda Hub in development.
- Boda Hub images: `public/images/renders/boda-hub-revd-*.jpg`; more Rev D renders in `/mnt/user-data/uploads/Boda Hub/Rev D/3 Renders/` (open_bay_rd.png, canopy_rd.png and others) to convert the same way into `public/images/boda-hub/`.

## Content rules

- Figures: product ratings and claims only from `lib/generated/product-specs.ts` (approved register export) and existing site copy (`lib/site-copy.ts`, `lib/home-charging.ts`, etc.). Never type a new rating, price, time, efficiency or count. If the page needs a number that is not there, leave it out and list it in your report as an unresolved claim.
- No invented staff, customers, partners, installations, sites, testimonials, achievements or traction. Map/station data is planned or partner data: never present it as live availability.
- Writing: no em dashes or en dashes anywhere in new copy (use commas, colons, parentheses); British English (organisation, programme, colour); practitioner voice, concise, no clichés; `Precifarm` as the short name; do not write "Precifarm AI Ltd" outside legal content (a test enforces it).
- Keep every working feature: forms (contact, survey, honeypot, rate limit), calculators, the Agent chat API, map, analytics events, JSON-LD, metadata and canonical URLs, redirects. Keep each page's `metadata`/SEO exports unless you improve them.

## Design direction

Premium silver/white hardware, graphite surfaces, restrained green (#1F6F4A brand-600; brand-300 #7EC09D on dark). Each page gets a composition that fits its purpose (product detail, configurator, publication, workspace), not a stack of identical cards. Large real renders, precise spec sheets, diagrams that explain. No glassmorphism, no stock imagery, no decorative animation, no oversized type. Mobile first: 390 px must feel designed, not shrunk.

## Build and test in your worktree

- `ln -s /home/claude/kenya-ebus-ecosystem/website/node_modules node_modules` if `node_modules` is missing.
- Iterate with `npx tsc --noEmit` and `npx eslint <your files>`; `npm test` must pass.
- Production build once you are close (the box has 2 CPUs; avoid repeated builds): `NEXT_FONT_GOOGLE_MOCKED_RESPONSES=/tmp/claude-0/-home-claude/df6534e6-e696-58e5-a232-00db8816de75/scratchpad/font-mock.cjs npm run build`, then `npx next start -p <your port>`.
- Check every route you own at 390, 768, 1024 and 1440 px with Playwright (`require('playwright')`, `chromium.launch({ executablePath: '/usr/bin/google-chrome' })`): HTTP 200, one h1, `document.documentElement.scrollWidth` equals the viewport width, no console errors, and run axe (`@axe-core/playwright` is installed) with zero serious or critical violations. Look at the screenshots yourself and fix what looks wrong.
- Save after screenshots to `/tmp/claude-0/-home-claude/df6534e6-e696-58e5-a232-00db8816de75/scratchpad/qa/after/<route>-<width>.png` (route with `/` replaced by `_`, e.g. `charging_corridor-1440.png`). Before screenshots for comparison are in `.../scratchpad/qa/before/`.
- Commit on your worktree branch with clear messages ending with:
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` and `Claude-Session: https://claude.ai/code/session_01KQmXfKsTvMxmaYNWEHuyyZ`. Do not push, do not deploy.
- Write `docs/interior-redesign/routes/<workstream>.md`: for each route, its previous structure, weaknesses found (duplicates, outdated or inconsistent figures, broken links, misleading status), what you changed, assets used, dependencies, tests run and results, and a list of unresolved engineering, commercial or operational claims for David.
