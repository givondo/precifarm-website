# Workstream: company-publications

Routes: `/about`, `/sustainability`, `/training`, `/careers`, `/contact`, `/guides`, `/guides/[slug]`, `/faq`, `/faq/[slug]`, `/evs`, `/locations`, `/locations/[slug]`, `/legal`, `/legal/terms`, `/legal/privacy`, `/legal/cookies`.

Branch `worktree-agent-a5372deb6ffcd15d5`, based on `90597b4` with `f1230a4` merged. No new dependencies. No homepage, header, footer, interior-system, globals or generated files edited.

## Shared pieces added (own area, not `components/interior`)

| File | Purpose |
|---|---|
| `lib/publications.ts` | Markdown block parser with stable heading ids, table of contents, reading time, long dates, `rangeText` (renders data ranges such as `~200–250 km` as `~200 to 250 km`). |
| `components/publications/ArticleBody.tsx` | Article typography (17px body, 1.75 leading, numbered ordered lists, anchor link per heading), places a figure after a named heading. |
| `components/publications/ArticleToc.tsx` | Contents: collapsed disclosure on phones, sticky rail with the current section marked from `lg`. |
| `components/publications/ArticleMeta.tsx` | Byline (author, reviewer, date, reading time) and numbered sources list. |
| `components/publications/RelatedLinks.tsx` | "Read next" band. |
| `components/faq/FaqList.tsx` | Own accessible accordion (button + `aria-expanded` + region; answers stay in the HTML with `hidden`; opens from URL hash; highlights search terms). `components/seo/FaqAccordion.tsx` untouched. |
| `components/faq/FaqExplorer.tsx` | FAQ search and topic filters with a live result count and empty state. |
| `components/guides/GuideFigures.tsx` | Four hand-built figures for the static guides. |
| `lib/pages/{faq,guides,contact,evs}.ts` | Page data: FAQ topics, guide topics and figure placement, contact categories and validation, EV display helpers. |
| `tests/company-publications.test.ts` | 8 unit tests (parser, figure anchors, contact validation, category coverage, FAQ topics, static city pages and status, sustainability goals, no dashes). |

Removed (no longer used): `components/sustainability/StakeholderIcon.tsx`, `components/sustainability/SustainabilitySectionNav.tsx`, `components/training/TrainingTables.tsx`. CSS classes they used in `app/globals.css` are left for the integrator (see follow-ups).

The footer already carries a contextual CTA, so the old `PageCTA` band at the foot of each page was dropped everywhere (it duplicated the footer CTA).

---

## /about

**Before:** PageHero, a dark "what stays true" stat strip with words as stats ("Charge", "Swap", "M-Pesa"), two pillar cards, an intro with the ARC Corridor render captioned as if operating, four step cards, four principle cards, two scope lists, a roles card stack, PageCTA.

**Weaknesses:** generic card stack; hero said Precifarm "operate[s] EV charging for homes, fleets and highways" (nothing is operating; only Pulse is on sale); Corridor render with no stage label; scope and roles shown without status; duplicated CTA.

**Now:** split hero with the installed-Pulse render (labelled Illustrative) and four facts from site copy (Pulse from KES 79,000, Lipa Pole Pole from KES 3,300/month, Nairobi HQ, one business day reply); editorial "why Precifarm exists"; product range rail (snap-scroll on phones, 4 columns on desktop) with renders and stage labels matching the homepage eyebrows (Pulse available, Pulse+ in development, ARC Corridor pilot development, Boda Hub in development) and a "renders, not photographs" note; Agent and wireless research on graphite; operating model as `StepFlow`; principles on graphite; roles as a responsive responsibility table with stage per programme; "Next" links. Copy in `lib/about-page.ts` rewritten to say what is on sale and what is in development. `components/RouteRolesTable.tsx` rebuilt (only used here).

## /sustainability

**Before:** hero with a 2050 lead, "What you can check today" metric strip including "100% Honest Hub labels", stakeholder cards, social cards ("Boda swap in under five minutes" as fact), goals list, circularity cards, a reporting table, SDG note.

**Weaknesses:** targets and facts mixed; "Solar on hubs" shown as "Rolling out" with no site built; "Live today / Rolling out" progress labels implied outcomes; no measurement basis stated for any figure.

**Now:** the page is organised around evidence. Hero panel counts what the page contains: 4 checkable figures, 7 targets (six for 2030, one for 2050), 5 figures waiting on a method, and 0 measured operational results ("No Precifarm charging site is commissioned yet", from `lib/hub-locations.ts`). Three evidence labels (Checkable today, Target, Method pending) explained up front. "Checkable today" gives each figure its basis and limits (home day: 60 km, about 10 kWh, own tariff; diesel comparison: basis not published, flagged). Six 2030 targets in a ledger: target, date, today, status ("In place" for offers and practices, "Estimate only" for cheaper-than-diesel, "Not started" for solar, recycling, carbon study). 2050 ambition shown as Target with "Running total: Not reported". Methods table: what each future figure will measure and what must exist first. Battery lifecycle as a six-step line with Collect and Recycle marked as targets. Sticky section index (`InPageNav`). Data rewritten in `lib/sustainability-page.ts`; goal 4 status changed from "underway" to "planned" because no site exists.

## /training

**Before:** split hero with stats, generic "why" cards, eight wide tables (overview, detail, curriculum, tracks matrix, track detail, progression, delivery), checklist, FAQ, PageCTA.

**Weaknesses:** claims of a "Precifarm training facility", field work "on a live hub", "deployed hubs", "Precifarm NOC" and "Same DC charger models and CSMS used on deployed hubs" (no hub is commissioned); Pulse (AC) track listed "Wallbox / DC unit installation"; no statement of what the certificate is; tables hard to read at 390 px; many em and en dashes.

**Now:** hero with a ladder graphic (T1 to T3 rising with duration) and a "What the certificate is, and is not" note: Precifarm-issued, covers Precifarm equipment, not a government licence or accredited national qualification, does not replace the electrical licence T3 requires. Certification ladder: three stepped tier cards with duration, format, audience, entry requirement, certificate and scope after passing. One section per tier (`#t1`, `#t2`, `#t3`, kept for the ItemList JSON-LD) with an at-a-glance spec sheet, numbered modules (T1.1...) and assessed outcomes. Product tracks on graphite: responsive matrix (Required / Recommended / Not required) with product renders and stage labels. Delivery spec sheet, enrolment checklist with the prefilled mailto, FAQ (new question on accreditation). Corrections in `lib/training.ts` and `lib/training-page.ts` listed under claims below.

## /careers

**Before:** PageHero, highlight strip, role cards, apply steps, perks ("Build on live infrastructure", "charging people use today"), values, general application, PageCTA.

**Weaknesses:** operational claims about restoring Corridor sessions and live infrastructure; em and en dashes throughout.

**Now:** hero with facts; roles as a ruled board (department, title, location, type, summary, "What you bring" disclosure, Apply mailto with role in the accessible name); apply steps as `StepFlow`; perks and values on graphite; general applications. JobPosting JSON-LD unchanged. Copy in `lib/careers.ts` made present-honest (Pulse installed today, first Corridor site being prepared; role "Hub operations lead" renamed "Site operations lead").

## /contact

**Before:** PageHero with one CTA, channel cards, "regional presence" card, form with a flat 10-option select, no client validation, plain error line.

**Now:** hero with Call and WhatsApp actions; form on a silver band beside sticky "Direct lines" (phone, WhatsApp, email, response time, HQ, teams). Form (`components/ContactForm.tsx`):
- Enquiry categories grouped with `optgroup` (Home charging; Fleets, workplaces and sites; Precifarm Agent; Partnerships; Anything else) and a "What happens next" line per group. Option values are exactly the strings in `lib/contact-interests.ts`, so `?interest=` preselection, `HomeSurveyForm` and the CMS are unaffected (unit test checks every topic appears once).
- Client validation (`lib/pages/contact.ts`): name, email format, optional phone (9 to 15 digits), message 10 to 2,000 characters with a counter. Errors show on blur and on submit; submit shows a focused error summary with links to the fields; `aria-invalid` and `aria-describedby` on each field.
- Loading: spinner, "Sending…", `aria-busy`, inputs disabled.
- Error: `role="alert"` with the API message, the message kept, and direct email and phone links.
- Success: `role="status"`, "Message sent", topic and survey reference when the API returns one, "Send another message".
- Honeypot, `/api/contact`, rate limiting unchanged; the payload shape is unchanged.

## /guides and /guides/[slug]

**Before:** PageHero plus a card list; articles rendered small grey text (14px) with `MarkdownContent`, sources in the hero, an "AISO" quick-answers block and PageCTA.

**Now:** index is a publication front: editorial standards (answer first, sourced and dated, plans stay plans), a graphite lead feature for the latest guide, then a numbered list with topic, summary, reading time and date. Article pages: masthead (type and topic, title, standfirst, byline with author, date and reading time), sticky contents rail generated from `##` headings (collapsed disclosure on phones), article typography, a figure where the content supports one, "Common questions" accordion, numbered sources with access dates, "Read next" (the relevant product page plus other guides). Figures:
- Kenya Power tariff: off-peak hours across 24 hours for weekdays, Saturdays and holidays, Sundays.
- EV charging stations: charging power from a 13 A socket to a 120 kW DC example, bars to scale, labelled Illustrative.
- Charging at home: the four supply checks in circuit order, with the Pulse RDC-DD claim pulled from `lib/generated/product-specs.ts` (PUL-05, design target).
- Boda battery swap: the swap in four steps.
Slugs, metadata, `generateStaticParams`, Article JSON-LD and the FAQPage from `createPageSeo` unchanged; CMS guides render through the same template.

## /faq and /faq/[slug]

**Now:** search (all words must match question or answer, accent-insensitive), topic filters with counts (Costs and pricing, Home charging, Public and highway, M-Pesa and payments, Boda Hub, Precifarm Agent, Company and training), live result count, highlighted matches, empty state with "Clear search" and "Ask Precifarm". Topics are assigned by id in `lib/pages/faq.ts` over `lib/charging-faqs.ts` (not edited, the homepage uses it). Answers are server-rendered and stay in the HTML. FAQPage JSON-LD unchanged. A contact strip replaces the PageCTA. `/faq/[slug]` uses the same byline, accordion, article body and sources; JSON-LD logic unchanged. Without a CMS there are no `/faq/[slug]` pages and the index links to none.

## /evs

**Before:** three callout cards, four paragraphs, a requirements SpecTable, two 1,160 px wide tables with en dashes, a centred CTA.

**Weaknesses:** market paragraph in the data said "39,324 cumulative registrations by 2025" and "industry estimates above 35,000 in 2026" (contradictory, and conflicts with the sourced 24,754 in the guides); e-boda callout stated a Boda Hub swap in under 5 minutes as a current service and implied bikes charge on the Pulse car wallbox; fit column labelled "Charging requirement" though it holds product fit.

**Now:** hero with counts (17 models, 15 cars, 2 motorcycles, 2 CHAdeMO). Vehicle explorer: search, body filters, a list with range and battery, and a selected-vehicle panel (inline on phones, sticky on desktop) with specs, daily top-up times with stage labels (Pulse available; ARC Corridor pilot development; Boda Hub in development), a CHAdeMO warning where the data says CHAdeMO (ARC Corridor is CCS2), and where it charges with Precifarm. Needs-to-product grid with renders and stage labels. Market section on graphite with the sourced 24,754 figure and link. One full comparison table (scrolls inside its region, sticky first column). Two fixes in `lib/kenya-ev-compatibility.ts` (documented below); homepage exports unchanged.

## /locations and /locations/[slug]

**Before:** city cards with "Live" badges on Nairobi, Kisumu and Nakuru and copy saying "Nairobi–Kisumu is live"; every city card linked to `/locations/<city>`, which returned 404 without a CMS.

**Fix for the 404:** `/locations/[slug]` now falls back to a static city page from `lib/locations-page.ts` when the CMS has neither a local page nor a location entity for the slug (also for `ev-charging-<city>`, canonical to the bare slug). `generateStaticParams` always includes the six cities from `lib/contact.ts`, so all six pages are prerendered (build output shows `/locations/nairobi`, `/mombasa`, `/kisumu` and 3 more). CMS pages keep precedence and their previous JSON-LD (including LocalBusiness); static pages use WebPage and breadcrumb JSON-LD only, so they do not assert a business address in each city.

**Now:** hero with a route schematic drawn from `lib/hub-locations.ts` coordinates (first route Nairobi to Nakuru to Kisumu solid, Mombasa and Garissa routes dashed, "Schematic only. No site shown is open."). City list with region filters and a status chip per service: Pulse home charging Available; ARC Corridor Pilot development on the first route, Planned elsewhere; Boda Hub Planned with the count of planned swap sites; fleet charging In development. City pages: schematic with the city highlighted, services with status, planned Precifarm sites within 30 km (all labelled Planned), related links. Partner sites are not named on location pages (see claims).

## /legal, /legal/terms, /legal/privacy, /legal/cookies

**Now:** policy index lists each document with a chip per section that deep-links to it, and a contact line. Policy pages: masthead with Effective date (from `legalEffectiveDate`), section count and scope; sticky section index (disclosure on phones) with the current section marked; each section numbered with a stable anchor (`#sharing`, `#your-rights` and so on) and a visible link; questions as an accordion; a closing "effective" line (the cookies text says "the effective date below", which is now true); other policies. Legal wording unchanged except typography: four em dashes in `lib/legal/content.ts` replaced with a semicolon or comma, and one in a policy description in `lib/legal/paths.ts`. Diff is 5 lines.

---

## Tests and results

| Check | Result |
|---|---|
| `npx tsc --noEmit` | pass |
| `npx eslint` on all changed files | pass, no warnings |
| `npm test` | 44 of 44 pass (8 new in `tests/company-publications.test.ts`) |
| `npm run build` (webpack, mocked fonts) | pass; `/guides/[slug]` 4 and `/locations/[slug]` 6 pages prerendered |
| Playwright, 23 routes x 390/768/1024/1440 (92 loads) against `next start -p 3204` | all HTTP 200, one h1 each, `scrollWidth` equals viewport width everywhere, no element extends past the viewport (new check; only the off-screen honeypot), no console errors |
| axe (serious or critical) | zero on all my content. One site-wide finding at 1024 px only: `link-name` on `.site-header-phone` (the shared header's phone link has no accessible name at that width). The header is off-limits; reported for the integrator. |
| Repo e2e suite (`E2E_BASE_URL=http://localhost:3204 npx playwright test`) | 104 passed, 2 skipped, 2 failed. Both failures are `/` (homepage) accessibility: `color-contrast` on `.text-white/45` in a homepage component from the base commit; not touched here. `forms.spec.ts` passes on desktop and mobile without changes. |
| Interaction script | `?interest=corridor` preselects; empty submit focuses the error summary with 3 invalid fields; loading shows "Sending…" with `aria-busy`; a 503 shows the alert and keeps the message; success shows "Message sent" and the reference; FAQ search "lipa" gives 3 of 18; topic Boda Hub gives 1 of 18; accordion expands; empty state shows; EV selection shows the panel; legal contents lists 9 links; `#sharing` anchor exists. |

Screenshots: `/tmp/claude-0/-home-claude/df6534e6-e696-58e5-a232-00db8816de75/scratchpad/qa/after/<route>-<width>.png` for every route and width above, plus `contact-state-{validation,sending,error,success}-390.png`, `faq-state-empty-390.png`, `evs-state-selected-390.png`, and the run log `company-publications-report.txt`. Before screenshots: `.../scratchpad/qa/before/`.

## Unresolved claims for David

Engineering and product
1. Training modules are DC-centred (IEC 61851/CCS2, contactor and cooling faults, 400 V and 800 V validation) but T2 is "Required" for the home (Pulse, AC) and fleet (Pulse+, AC) tracks. Confirm an AC curriculum for Pulse and Pulse+.
2. Daily top-up energy is stated as about 10 kWh in `lib/charging-faqs.ts` and about 12 kWh in `lib/kenya-ev-charging-time.ts`. Pick one.
3. EV fit tags "Hub" and "DC+" in `lib/kenya-ev-compatibility.ts` have no published definition. Displayed as "Public chargers on the Charging Hub map" and "High-power DC fast charging". Confirm.
4. Boda Hub status: the register export says `pilot`, the homepage eyebrow says "In development". Pages follow the homepage. The register gives the under-5-minute swap as `illustrative` evidence.
5. `lib/hub-locations.ts` names Eldoret and Kitui sites "Engineering" but gives them the role "Planned Corridor location"; city pages therefore list ARC Corridor as Planned there.
6. "Improved upper cable exit points" and other ARC visuals are not used on these pages.

Commercial and operational
7. Diesel comparison (KES 1,000 for 60 km): fuel consumption and pump price basis are not published. Shown on /sustainability with that caveat.
8. Training: has any cohort run; does a Nairobi classroom exist; are cohort size 6 to 16, certificate in 5 business days, T1 valid 24 months, annual refresher confirmed? The "Precifarm training facility", "live hub", "deployed hubs" and "NOC" wording was removed.
9. Training certificate wording "not a government licence or an accredited national qualification" is mine, written because no accreditation is stated anywhere. Confirm or supply the accreditation.
10. Careers: are the three openings current? `jobPostingSchema` sets `datePosted` to the build date on every build, which refreshes the post date in search results.
11. "Three-year aftersale care" on every Pulse home unit, "a typical Pulse installation takes one day" and "teams in Mombasa, Kisumu, Eldoret, Kitui, Nakuru" are existing site copy, not verified here.
12. Partner sites in `lib/hub-locations.ts` (Shell Langata, Total Energies Westlands, Two Rivers, Naivas Nakuru, Tuskys Kisumu, Bamburi, Kenyatta University, Thika Road Mall, Kenol Kobil Gilgil) are labelled partners. Confirm agreements exist; they are not named on location pages.
13. "Roam Air and M-KOPA-financed bikes account for a large share of new EV registrations" (`/evs`) has no source.
14. `lib/charging-faqs.ts` (shared with the homepage, not edited) says Precifarm "operate[s]" charging, "USSD and SMS work on basic phones", "certified installation" and names EVChaja and ChargeNet as partner sites. The footer description also says Precifarm "operates" charging. Both read as current operations.
15. SEO registry FAQ for `/sustainability` (not edited) says Corridor site storage uses LFP batteries; the first Corridor site is planned without storage.

## Data changes outside page files (documented fixes)

- `lib/kenya-ev-compatibility.ts`: `marketContext` now uses the sourced 24,754 figure instead of the contradictory 39,324 / 35,000; e-boda callout now says Boda Hub is in development and designed for a swap in under 5 minutes, and no longer implies bikes charge on the Pulse wallbox. Homepage exports untouched.
- `lib/company-pages.ts`: contact title without an em dash.
- `lib/legal/content.ts`, `lib/legal/paths.ts`: dashes only.

## Follow-ups for the integrator

- `app/sitemap.ts` does not list the six static city pages.
- Header phone link has no accessible name at 1024 px (`components/Header.tsx`).
- Homepage contrast failure in the e2e accessibility spec (pre-existing in the base).
- Dead code: `.sustainability-*` and `.content-index-*` CSS, and `components/seo/{MarkdownContent,TrustSignals,AisoPageSections}.tsx` and `components/ui/ContentIndexCard.tsx`, are no longer imported anywhere. `.training-table-*` is still used by `/charging/home`; `.aiso-*` partly by `FaqAccordion` (homepage).
