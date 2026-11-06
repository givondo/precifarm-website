# Interior redesign (November 2026)

Branch `interior-redesign`, from `main` at 46e249a. Not deployed.

David's brief: redesign every page except the homepage, rebuild the footer, keep the homepage unchanged above the footer. One homepage change was asked for separately during the work (6 Nov): animated movement in the Software & research section.

| Document | What it holds |
|---|---|
| `00-route-inventory.md` | Every route found in `app/`, its page file, components and owning workstream, plus baseline findings |
| `AGENT-BRIEF.md` | Rules and decisions given to the four page workstreams |
| `routes/charging-products.md` | `/charging`, `/charging/home`, `/charging/pulse-plus` |
| `routes/infrastructure.md` | `/charging/corridor`, `/charging/boda-hub`, `/hub` |
| `routes/software-research-business.md` | `/agent`, `/agent/chat`, `/download`, `/research`, `/research/wireless-ev-charging-policy`, `/partners`, `/charging/engineering` |
| `routes/company-publications.md` | `/about`, `/sustainability`, `/training`, `/careers`, `/contact`, `/guides`, `/guides/[slug]`, `/faq`, `/faq/[slug]`, `/evs`, `/locations`, `/locations/[slug]`, `/legal` and its three policies |
| `QA.md` | Test results, homepage visual regression report, screenshots |
| `CLAIMS.md` | Unresolved engineering, commercial and operational claims for David |

## Decisions taken during the work

- Download page is cloud only (HD-043: hosted models only, no local AI).
- ARC Corridor page uses the R03 station renders (canopies included) for the ARC 120, 240/360 and 600+ proposed configurations, on that page only; every other ARC image is the R02 dispenser. David gave no preference when asked, so the recommended option was taken.
- Stage labels return on interior pages (the brief asks for them), matching the homepage card eyebrows: Pulse available, Pulse+ in development, ARC Corridor pilot development, Boda Hub in development.
- No new npm dependencies. Diagrams are hand-built SVG, motion is CSS and small client components, with `prefers-reduced-motion` respected. Three.js, React Flow, Motion and shadcn/ui were not added: the build box has two CPUs and the pages did not need them.

## Shared design system

`components/interior/`: `InteriorHero` (split hero with media, stage label and fact strip; light or graphite), `InteriorSection` (white, silver, graphite bands), `StageLabel` (available, development, pilot, proposed, simulation, planned, partner-site, illustrative), `SpecSheet`, `StepFlow`, `MediaFrame`, `InPageNav`, `CalloutNote`, `Actions`. Layout width `.interior-container` (72 rem); the homepage keeps `.page-container`.

## Footer

One `components/footer/SiteFooter.tsx` on every page, including the homepage. Links come only from `lib/site-nav.ts` (five groups: Charging, Business, AI and research, Resources, Company; legal links in the bottom bar), each once. The old footer rendered every group twice (a mobile copy and a desktop copy) and listed products in two places; it and its CSS are removed. A call to action changes with the section of the site (`footerCtaFor`); on the homepage it offers fleet and site planning so it does not repeat the homepage's own survey button. Contact details and social links come from `lib/contact.ts` and `lib/social.ts`. Tests: `tests/site-nav.test.ts`.

## Shared fixes made while integrating

- Header phone link named for screen readers where only its icon shows (below 1280 px).
- SEO titles and breadcrumbs say ARC Corridor; Charging Hub structured data says sites are planned; Boda Hub footer CTA no longer links to its own page.
- Sitemap lists the six static city pages, which now render without the CMS.
- Homepage Agent demo: the "queued" step text was too faint (colour contrast); brightened.
- ARC dispenser hotspots spaced for touch.
- Footer and SEO copy no longer say Precifarm operates charging, or that the first ARC site has storage.
- 52 files no longer imported anywhere removed (old programme template, hub map pieces, legacy `ui/*` and `seo/*` components, unused homepage experiments and their data). `components/DownloadApkButton.tsx` kept for a future APK.

## Not done

- `lib/charging-faqs.ts` still says Precifarm "operates" charging, "live sites are labelled live", "around 60 kWh in 30 minutes", USSD and SMS support, and names EVChaja and ChargeNet as partners. Its answers appear on the homepage, which is frozen above the footer, so these wait for David's decision (CLAIMS.md).
- Unused CSS in `app/globals.css` (`.page-hero*`, `.content-index-*`, `.sustainability-*` and others) is left in place; removing it is safe but was not needed for this change.
- `docs/UI.md` still describes the removed `components/ui/*` set.
- The engineering design-basis PDF still shows electric buses and needs regenerating.
- Kenyan site renders for ARC tiers, and an ARC render with the improved upper cable exits, do not exist yet.
