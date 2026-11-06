# Workstream: infrastructure

Routes: `/charging/corridor` (ARC Corridor), `/charging/boda-hub` (Boda Hub), `/hub` (Charging Hub).

All figures on these pages come from `lib/generated/product-specs.ts` (CORRIDOR and BODAHUB, read through `lib/programmes.ts`) or from existing approved site copy. No rating, price, time, dimension or count was typed in. Where a page needed a number that does not exist, it says the figure is not published and the item is listed under unresolved claims below.

## /charging/corridor: ARC Corridor

### Before

`components/programmes/ProgrammeView` with `corridorPage` from `lib/programme-pages.ts`: split hero with the R02 dispenser render, three feature cards (certified charger, engineered site, storage only where needed), the register spec table, "where it fits" and "for site hosts" lists, and a `PageCTA`.

### Weaknesses found

- No visual or written distinction between the certified OEM charger, the proposed ARC design and the fact that no site exists. A reader could take the dispenser render for an installed product.
- No station configurations, no site layout, no electrical explanation, no host process beyond one sentence.
- The closing `PageCTA` repeated the footer's contextual "Host an ARC Corridor site" call to action (same title, same destination).
- SEO registry (not in this workstream) still names the page "Precifarm Corridor" and the breadcrumb "Corridor" while the public name is ARC Corridor.

### Now

`components/arc/*`, data in `lib/pages/arc-corridor.ts`.

1. Hero: R02 dispenser product shot (two cables, two holders) labelled Illustrative; stage Pilot development; four register facts (CCS2; certified OEM 120 to 180 kW; no storage at the first site; price set at commissioning).
2. Section index (sticky `InPageNav`).
3. Status ledger: certified OEM charger (pilot, COR-15), ARC dispenser and tiers (proposed), installed sites (none; planned, COR-16).
4. Dispenser explorer (graphite): numbered hotspots on the R02 render (crown, screen and emergency stop, both holders, both cables, service base) with a synced list; R02 crown close-up and R02 daylight render (burned-in caption strips cropped off), both labelled Illustrative.
5. Station configurations: tab explorer (ARC 120, ARC 240/360 with a 240/360 switch, ARC 600+; arrow-key navigation). Each shows the R03 render labelled Proposed configuration, what the render shows (islands, bays, pylon sign), a typical host, and a hand-built SVG site plan (equipment yard, cable routes, canopy, islands with two-cable dispensers, numbered bays, drive aisle, sign). A summary table follows, then the R03 eye-level render.
6. Electrical architecture (graphite): single-line SVG, grid connection and utility meter, transformer and switchgear, certified OEM power cabinet, ARC dispensers, vehicles; AC and DC segments; optional storage (none at first site); charge-point management and M-Pesa layer with data links. Horizontal drawing from 768 px, vertical power chain below that. A "who is responsible" list (Kenya Power, Precifarm engineering, OEM certified, Precifarm design proposed, the driver's car).
7. Host a site: five-step flow (tell us, survey and Kenya Power study, layout, agreement and approvals, build and commission), host and Precifarm responsibilities, and an interactive "what to have ready" checklist with a progress count and the `/contact?interest=corridor` CTA.
8. Specification from the register with evidence notes, and four questions (the two in the SEO registry plus two on certification and charging speed).

The page closes into the shared footer, whose contextual CTA for this route is the site-host enquiry.

### Assets

New, converted from `/mnt/user-data/uploads/ARC/09_Renders_Animations/` to `public/images/arc/` (JPEG q82, all under 115 KB):
`arc-120-station-dusk-r03.jpg`, `arc-240-station-dusk-r03.jpg`, `arc-360-station-dusk-r03.jpg`, `arc-600-plus-station-dusk-r03.jpg`, `arc-240-eye-level-dusk-r03.jpg` (1920 x 1080); `arc-dispenser-crown-detail-r02.jpg` (1800 x 1330, caption strip cropped); `arc-dispenser-day-r02.jpg` (1600 x 1940, caption strip cropped). Existing: `public/images/renders/arc-dispenser-dusk-r02.jpg`.

## /charging/boda-hub: Boda Hub

### Before

`components/boda-hub/BodaHubView.tsx` with `lib/boda-hub-page.ts`: text-heavy hero with a contained render, brand line, highlights, lockers, battery packs, hardware anatomy, journey as an inline arrow string plus a numbered list, safety, reliability, system, partners, roadmap, FAQ, `PageCTA`.

### Weaknesses found

- Hero secondary CTA "See live Boda sites" linked to a map where every swap site is planned. Misleading.
- Journey step "Find and reserve: Precifarm Agent shows nearby hubs with charged packs. Reserve before you arrive." Precifarm Agent is an engineering workspace; no rider reservation feature is documented. Removed.
- No separation of partner-run sites, the proposed automated cabinet and battery compatibility; "Under 5 minutes" read as a measured figure (the register marks it illustrative).
- The same render was used for the lockers section and the battery section; the journey was a sentence of arrows.
- The `PageCTA` duplicated the footer's Boda Hub call to action.
- Stage: the register says pilot; the homepage card says in development. The page follows the homepage (brief instruction).

### Now

`components/boda-hub/{BodaHubView,SwapDemo,BodaCabinetSvg}.tsx`, data in `lib/boda-hub-page.ts` (still exports `bodaHubPageContent.hero.image` and `bodaHubFaqs` for the SEO registry).

1. Hero: Rev D golden render labelled Proposed configuration, stage In development, four register facts.
2. Status ledger: partner-run swap sites (Partner site, BH-12 illustrative), automated cabinet (Proposed, BH-01, BH-11), battery compatibility (Not yet validated, BH-06 planning assumption).
3. Swap demonstration: SVG front elevation of the cabinet (doors 01 to 20 as in Rev D, status bars, totem screen and ring) driven by seven steps: arrive, identify and pay, door opens, return the empty pack, take a charged pack, door closes, ride. Each step shows what the rider does, what the cabinet checks (with register reference where one exists) and the screen text. Previous, next, step list and Play (hidden when reduced motion is requested). Labelled Illustrative.
4. Cabinet and doors: annotated elevation (A doors 17 to 20 charge only, B doors 01 to 16 rider doors, C side totem, D swap zone) from BH-01 and existing copy; anatomy; a note that dimensions, door size and weight are not yet published; Rev D front, open bay and canopy renders labelled Proposed.
5. Battery handling (graphite): returned, recognised, charged behind a latched door, picked for the next rider; the fault path; site rules; "Compatibility not yet validated" label.
6. Safeguards (BH-07, BH-08 with evidence notes, plus existing copy) and monitoring (remote operations, weak-signal behaviour).
7. Site hosts: four-step flow, you provide and Precifarm provides, good host sites, the regulatory gate, roadmap.
8. Specification from the register and FAQ; link to `/hub?type=swap`.

### Assets

New, converted from `/mnt/user-data/uploads/Boda Hub/Rev D/3 Renders/` to `public/images/boda-hub/`: `boda-hub-revd-open-bay.jpg` (1800 x 1200, 135 KB), `boda-hub-revd-canopy.jpg` (1920 x 1279, 91 KB). Existing: `public/images/renders/boda-hub-revd-{golden,front,dusk,hero}.jpg` (the other Rev D uploads duplicate these).

## /hub: Charging Hub

### Before

`components/charging-hub/ChargingHubView.tsx`: hero with three product images, a stats band ("Shown before you start" as a price, "Under 5 min" boda swap), "Live map: open and coming-soon sites" (`components/HubConnectivityMap.tsx`), highlights, three site types, three steps, FAQ, `PageCTA` with "Get Precifarm Agent" as the primary action.

### Weaknesses found

- The map toolbar had an "Available" filter driven by `availability` sample data in `lib/hub-locations.ts`: sample data presented as availability.
- "Live map" heading and "Labels reflect what is commissioned today" while nothing is commissioned.
- Partner listings name third-party brands (Shell, TotalEnergies, Two Rivers, Naivas, Tuskys, Bamburi, Kenyatta University, Thika Road Mall, Kenol Kobil) with no confirmed agreement in the repository. Three (Naivas Nakuru, Tuskys Kisumu, Gilgil) appeared on the map as "Partner" with the green live tone.
- Site types: "Highway fast charge ~60 kWh in 30 min" (not a register figure); "Partner chargers" carried status available.
- "Go and pay: start the session and pay with M-Pesa" described a service that does not run yet.
- No stage label per site, no connector information, list hidden in a drawer on mobile.

### Now

`components/charging-hub/ChargingHubView.tsx`, `components/hub-map/HubFinder.tsx`, data helpers appended to `lib/hub-locations.ts`, copy in `lib/charging-hub.ts`.

1. Compact hero: what the finder does and that no site operates, so no availability or prices.
2. Finder: search; filter groups for site type, connector and stage, each chip with a live count, zero-count chips disabled (so "Operating 0" is visible and honest); Near me (distance sort, permission errors handled); result count with "none operating yet" and Clear filters; list and map side by side from 1024 px, a List/Map toggle below that (list first, so a weak connection still gets every site without tiles). Every list item and detail carries a stage label, type, connector, route or area, "Availability: not shown" and "Price: not published". Detail actions: "View location in Maps" and the product page. The map keeps Leaflet (Google Maps if the key is set) with titled, keyboard-focusable markers that now also select on Enter or Space (Leaflet only acts on Enter when a popup is bound, so before this a keyboard user could focus a pin but not open it). It fits to the filtered set, re-measures when shown on mobile, centres on a site chosen with "Show on map" and scrolls the map into view, and draws Nairobi to Kisumu as an indicative dashed line. Pins one or two kilometres apart (Kisumu Hub and Boda Hub Kisumu, the Nairobi Boda Hub sites) overlap at the regional zoom until the visitor zooms in; there is no clustering (no new dependency). A badge on the map reads "Planned locations, not live availability". `?type=swap|corridor|partner` preselects a type.
3. Reading the finder: the three stages and what each means, plus the no-availability note.
4. Three kinds of stop: connector and payment per type, with stage labels; partner stops "None listed yet".
5. Host a site: Corridor and Boda Hub enquiries.
6. Questions written for the finder (no figures).

Partner listings stay in the data (the data test needs them) but the finder lists only ids in `confirmedPartnerIds` (empty).

## Dependencies and files

No new npm dependencies. Interior system components used unchanged. Off-limits files untouched.

Changed: `app/charging/corridor/page.tsx`, `components/boda-hub/BodaHubView.tsx`, `components/charging-hub/ChargingHubView.tsx`, `components/hub-map/LeafletConnectivityMap.tsx` (dashed planned routes, invalidate on show, fit to filtered set or centre on the chosen site, keyboard selection, reduced-motion pan), `components/hub-map/GoogleConnectivityMap.tsx` (marker titles), `lib/boda-hub-page.ts`, `lib/charging-hub.ts` (page copy and meta description; `siteSelection` kept for `/partners`), `lib/hub-locations.ts` (finder helpers appended).
Added: `components/arc/{ArcCorridorView,ArcDispenserExplorer,ArcTierExplorer,ArcSitePlan,ArcElectricalDiagram,ArcHostChecklist}.tsx`, `components/boda-hub/{SwapDemo,BodaCabinetSvg}.tsx`, `components/hub-map/HubFinder.tsx`, `lib/pages/arc-corridor.ts`, the images above.
Removed: `components/charging-hub/ChargingHubMap.tsx` (unused).
Now dead, left for the integrator: `components/HubConnectivityMap.tsx`, `components/HubGridMap.tsx`, `components/hub-map/{HubListDrawer,HubMapFooter,HubMapToolbar,HubSheet,HubSidebar,HubSiteDetail}.tsx`; `corridorPage` in `lib/programme-pages.ts`; `chargingHubFaq`/`hubPageFaqs` in `lib/charging-faqs.ts` if nothing else uses them.

## Tests

See the workstream report for the run log. Typecheck, eslint on the changed files, `npm test` (36/36), production build, Playwright at 390, 768, 1024 and 1440 px (HTTP 200, one h1, no horizontal overflow, axe zero serious or critical) and 40 interaction checks (tabs and keyboard, hotspots, checklist, swap steps and autoplay, filters and counts, search, clear, titled and focusable markers, marker detail, mobile map toggle and invalidate, `?type=swap`, no free/busy text, no unconfirmed partner brands, no KES 39). Map tiles from basemaps.cartocdn.com cannot be reached from the build box, so screenshots show pins and the route line on a grey map and the console logs tile connection errors; this is the sandbox, not the page.

## For the integrator

- `lib/seo/pages/registry.ts`: Corridor title, breadcrumb and description still say "Precifarm Corridor"; the `/hub` JSON-LD FAQ says Charging Hub lists "partner stops" and "Session price is shown in the app"; the Boda Hub breadcrumb says "Automated Boda Hub". The visible page FAQs were rewritten; align the registry FAQ with them.
- `lib/charging-faqs.ts`: the `charging-hub` answer says the map shows "DC fast chargers ... partner sites" and "Live sites are labelled live"; `public-dc-price` carries "a car that accepts about 120 kW can add around 60 kWh in 30 minutes", which is not a register figure.
- Footer (`lib/site-nav.ts`): on `/charging/boda-hub` the secondary CTA "How Boda Hub works" links to the page it sits on.
- Header (`components/Header.tsx`, off-limits): at 1024 px axe reports `link-name` (serious) on `.site-header-phone`, which has no accessible name when the number is hidden. It shows on every route at that width.

## Unresolved claims for David

1. ARC tier ratings: ARC 120, 240, 360, 600+ imply site power in kW. No tier rating is in the register; the page says site power is set per site and not published.
2. ARC tier dispenser and bay counts are taken from the R03 renders (1/2, 2/4, 3/6, 4/8; signs 2, 4, 6, 8 CCS2). Confirm or replace with approved layouts.
3. "Improved upper cable exit points" are not in any render. The R02 dusk render shows one cable from a top gooseneck and one from the side holder; no improved exit design exists to show. Visual outstanding.
4. Whether the first site's certified OEM charger is housed in the ARC dispenser design, or uses the OEM's own dispenser with ARC branding. The page presents ARC as Precifarm's proposed design around the certified power core.
5. ARC per-connector power, whether both cables charge at the same time, cable length, IP rating and the certification route for the ARC enclosure: not published.
6. Per-session energy metering for per-kWh billing: meter location and approval (KEBS or equivalent) not stated.
7. Corridor first site: location, OEM make, date. Price per kWh at commissioning (COR-16).
8. R03 renders are generic dusk forecourts, not Kenyan site visualisations; David's brief asks for Kenyan sites. HD-048 (4 Nov) asked for no canopy scenes on ARC product imagery; the R03 station renders have canopies and are used only in the configurations section, per the interior brief.
9. Boda Hub cabinet dimensions, door size, weight, IP rating, pack capacity and charge time per bay: not in the register.
10. Boda Hub stage: register status pilot, homepage and this page "in development".
11. Partner-run swap sites: is any operating today, and where? The 5-minute swap figure (BH-12) is illustrative.
12. The battery make for the first Boda Hub site and its compatibility validation.
13. Boda Hub pricing "for the energy in the pack, with a daily cap" and fleet accounts (existing copy, HD-039): no figures; confirm the model.
14. Offline swap completion and later sync on weak signal: design intent, confirm.
15. Rider identification by "your Precifarm app": is there a rider app? Existing screen copy says so; the Agent reservation claim was removed.
16. Charging Hub partner listings (nine named brands): confirm agreements or delete the entries.
17. Charging Hub planned locations (Kisumu, Nakuru, seven Boda Hub areas): confirm they are approved planned locations; coordinates are town or district centres, not sites.
18. Corridor "free survey" (existing copy): confirm it stays free for highway hosts.
19. HD-045 (3 Nov) removed maturity labels site-wide; the interior brief brings them back as `StageLabel`. Confirm the reversal applies to these pages.
