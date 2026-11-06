# Workstream: charging-products

Routes: `/charging`, `/charging/home`, `/charging/pulse-plus`.

Every rating on these pages is read from the approved register export (`lib/generated/product-specs.ts`) by spec id through `lib/pages/register.ts`; prices and times come from existing site copy (`lib/site-copy.ts`, `lib/home-products.ts`, `lib/home-charging.ts`, `lib/charging-faqs.ts`, `lib/programme-pages.ts`). Calculators call the Agent's deterministic tools (`runEngineeringTool` in `lib/agent/tools/engineering.ts`) in the browser, so their numbers are real calculations and each result can show the tool summary it came from.

## /charging

**Before.** `PageHero` with text only, then `ChargingSection`: three alternating rows (Home, Fleet, Highway) with small product thumbnails in bordered cards, a mono product line and a CTA; an "Engineering" box; five FAQs.

**Weaknesses found.**
- Battery swapping had no pillar of its own: Boda Hub was folded into "Fleet" next to Pulse+.
- No stage labels: Pulse+ (in development) and ARC Corridor (pilot development) sat beside the available Pulse with nothing to tell them apart.
- No comparison: a visitor could not see power, plug, time, price and status side by side.
- The Fleet CTA went to `/partners` rather than to the Pulse+ product page.
- Thumbnails were small cut-outs in identical cards; the highway render was letterboxed.

**Now.**
- `InteriorHero` with breadcrumbs, "Find your charger" and "Open Charging Hub", and a four-cell spec strip (Up to 7.4 kW AC, Up to 22 kW AC, 120 to 180 kW DC, 20 bays per cabinet), each value taken from the register.
- `ChargingExplorer` (client): an accessible tablist (click, arrows, Home/End) for Home, Fleet and workplace, Highway and Battery swapping. Each panel has a large render labelled "Render", the product, its `StageLabel`, a headline, three register facts, typical time, price and two direct links (product page plus survey, planner or site-host enquiry). All four panels are in the server HTML; the inactive ones use `hidden`, so the content stays crawlable and keyboard users get proper semantics. The panel fades in with `@starting-style`, only when motion is allowed.
- `ChargingComparison`: a fixed table from lg up and collapsible per-product sheets (two columns on tablets) below that, covering Best where, Power, Plug or pack, Typical time, Price, Your car or bike and status.
- A next-steps strip (free survey, Charging Hub, Engineering) and the FAQ, with JSON-LD and metadata unchanged.
- Stage labels follow David's homepage eyebrows: Pulse available, Pulse+ in development, ARC Corridor pilot development, Boda Hub in development.

**Assets.** `pulse-7kw-installed-4x3.jpg`, `pulse-plus-22kw-depot-rb.jpg`, `arc-dispenser-dusk-r02.jpg` (the ARC product shot; the R03 station renders stay on the ARC page) and `boda-hub-revd-hero.jpg`. Per-image `objectPosition` keeps each product in frame at 16:9.

## /charging/home

**Before.** `PageHero`, a lead and included list beside a product photo, four benefit cards, a process table (720 px minimum, so it scrolled sideways on phones), `ProgrammeSpecTable`, two near-identical package cards, property and coverage lists, FAQ, the survey form, and a `PageCTA`.

**Weaknesses found.**
- No stage label.
- Pricing did not separate hardware, installation, financing and site work. The two packages repeated the same install with different payment, and the FAQ line about extra site work (consumer-unit upgrades, cabling, civil works, Kenya Power upgrades) was not shown next to the price.
- No charging-time calculation (only the "under two hours" claim), no installation diagram and no mounting details.
- Em and en dashes in page copy ("1–2 business days", "Private parking — no public access"), and arrows used as prose ("Fleet depots → Partners").
- The "not this page" note sent fleet depots to Partners, although Pulse+ is the fleet product.

**Now.**
- Hero with the Pulse cut-out, `StageLabel` available, survey and pricing CTAs, and four facts: Up to 7.4 kW, Type 2 tethered, From KES 79,000, Lipa Pole Pole from KES 3,300/month. A sticky `InPageNav` follows.
- **On the wall**: the installed render (labelled illustrative) beside `WallboxDrawing`, a to-scale front and side elevation SVG dimensioned from PUL-13 (384 x 264 x 118 mm). Four mounting details below: position set at survey, cable on holster (5 m or 7 m), own circuit behind a Type A RCD, designed for IP65.
- **Installation**: `InstallationDiagram`, a numbered SVG of meter, consumer unit (new MCB way plus Type A RCD), dashed cable route, Pulse with RDC-DD, Type 2 lead, car and earth electrode. It has a wide layout for md up and a separate vertical layout for phones, plus a legend. A cable-run slider (3 to 40 m) updates the diagram label and shows voltage drop at 32 A (PUL-03) for 6, 10 and 16 mm² copper against 5%, using `calculateVoltageDrop`. It is labelled as a planning check that needs a site check, with the current-carrying-capacity caveat.
- **Charge time**: `HomeChargeCalculator`. Daily-driving mode uses `calculateEvEnergy`, then `calculateChargingTime`. Battery top-up mode lets the visitor pick a car from the Kenya EV guide and its battery is pre-filled from the guide. On-board charger options are 6.6 and 7.4 kW (PUL-20). The result shows the time, energy from the meter, the time without losses and an overnight timeline with plug-in time and finish time; a "How this was calculated" panel lists the tool summaries. Invalid input shows a message, not NaN.
- **Specification** (graphite): `SpecSheet` built from every register claim with its evidence note and spec id, a source line naming PRF-PULSE7K2-SYS-SPEC-001-R00, unit safety points (from the FAQ copy) and the included scope.
- **Pricing**: `PriceStack` lists the free home survey, Pulse hardware and standard installation (bracketed together "From KES 79,000", with a note that separate prices are not published), and optional site work "Quoted after the survey". The Lipa Pole Pole card sits beside it.
- **Process**: `StepFlow` (no sideways scroll), then where we install and where we survey.
- **Survey**: `HomeSurveyForm` unchanged in behaviour (honeypot, `/api/survey`, `channel: web-private-house`, reference on success), with a sticky "have these ready" note and call/WhatsApp. FAQ last.
- Copy fixes in `lib/home-charging.ts`: dashes removed outside `homeChargingHighlight` (homepage; untouched), the select label is now "Pulse charger (home charging)", and the not-this-page note points fleets to Pulse+.

## /charging/pulse-plus

**Before.** The generic `ProgrammeView`: hero with the depot render, three feature cards, the register spec table, "Where it fits", requirements and a closing CTA.

**Weaknesses found.**
- **No status anywhere on the page**, although Pulse+ is in development. A reader could take it as on sale.
- 22 kW was not explained, and nothing showed that the car's on-board charger sets the delivered power.
- No planning tool.
- The two FAQ answers sent in JSON-LD (`lib/seo/pages/registry.ts`) were not visible on the page, so the structured data did not match what the page showed.

**Now** (`components/charging/PulsePlusView.tsx`, `lib/pages/pulse-plus.ts`; `components/programmes/*` and `lib/programme-pages.ts` untouched).
- Hero with the cut-out render, `StageLabel` development, "Plan your site" and "Register your site", and facts: Up to 22 kW, 11 kW (most three-phase cars), 7.4 kW single-phase mode, 10 units on one meter. All are parsed from PP-03 and PP-06.
- **22 kW explained**: a power-path schematic (L1/L2/L3 + N into Pulse+, then Type 2 to the car's on-board charger, which sets the limit), three register points, and `PulsePlusPower`, which compares delivered power as min(charger, car) with charging-time bars for 7.4, 11 and 22 kW cars over a 10 to 80 kWh slider (`calculateChargingTime`). At 40 kWh it reproduces the site copy: about 2 h 1 min at 22 kW and 4 h 2 min at 11 kW. No car make or model is given an on-board charger rating.
- **Load sharing**: three steps built from PP-06 and the programme copy.
- **Site planner** (`PulsePlusPlanner`), labelled as a planning estimate. Inputs are bays (1 to 10, capped by PP-06), supply in kVA, building peak in kW, the vehicles' on-board charger class, km per vehicle per day, consumption and the charging window. Outputs:
  - a verdict: load sharing needed, not needed, or no spare supply;
  - a supply bar showing building load, charging and the amount held back by sharing;
  - the per-bay kW when all bays are busy;
  - energy and time per vehicle;
  - vehicles charged per shift.
  It uses `calculatePeakLoad` (diversity 1 on a measured peak, PF 0.95), `calculateEvEnergy` and `calculateChargingTime`, and shows its working in a "How this was calculated" panel. Empty or impossible inputs show a message.
- **Workplaces**: a full-width depot render (illustrative) with three use cases and the site and vehicle requirements.
- **Status** (graphite): StageLabel development, safety in the unit, a "Not published yet" list (no release date or price; weather rating untested), "Register your site", and the register spec sheet with evidence notes.
- **Questions**: the two registry FAQs are now visible and match the JSON-LD.

## Files

New:
- `components/charging/ChargingExplorer.tsx`
- `components/charging/ChargingComparison.tsx`
- `components/charging/HomeChargeCalculator.tsx`
- `components/charging/InstallationDiagram.tsx`
- `components/charging/WallboxDrawing.tsx`
- `components/charging/PriceStack.tsx`
- `components/charging/PulsePlusView.tsx`
- `components/charging/PulsePlusPower.tsx`
- `components/charging/PulsePlusPlanner.tsx`
- `lib/pages/register.ts`
- `lib/pages/pulse-plus.ts`
- `lib/pages/format.ts`

Changed:
- `app/charging/page.tsx`
- `app/charging/home/page.tsx`
- `app/charging/pulse-plus/page.tsx`
- `components/ChargingSection.tsx`
- `lib/charging.ts` (the old `whereYouCharge` and `chargingOfferings` exports were only used by `ChargingSection` and are replaced)
- `lib/home-charging.ts` (`homeChargingHighlight`, which the homepage uses, is untouched)

Not touched: `components/ProductPhoto.tsx` (still used by partners, about, sustainability and the hub view) and `components/HomeSurveyForm.tsx` (behaviour kept as is).

Dependencies: none added. Interior components are used as they are; anything they lacked is built in `components/charging/`.

## Tests

See the workstream report for the final numbers: typecheck, eslint on owned files, `npm test`, the production build, and Playwright at 390, 768, 1024 and 1440 (HTTP 200, one h1, no horizontal overflow, no console errors, axe with zero serious or critical violations). A functional script also checks:
- explorer tabs, by click and keyboard;
- calculator results against hand calculations;
- the invalid-range message;
- the diagram slider;
- survey validation, the CMS-off error, and a mocked success with reference and payload;
- the Pulse+ power explorer;
- planner verdicts, the bay cap and empty-field handling.

Scripts: `scratchpad/cp-qa.cjs`, `scratchpad/cp-func.cjs`.

## Unresolved claims for David

1. **Pulse price split.** "From KES 79,000" covers the wallbox and a standard installation (package copy; the Agent product library says "KES 79,000 installed"). There is no published hardware-only or installation-only price, so the page says they are not published separately. Confirm whether to publish a split.
2. **Lipa Pole Pole terms.** Only "from KES 3,300/month" is published. Deposit, term and total are not, and the page says they are shown before approval.
3. **Free home survey.** "Free" comes from `lib/contact-interests.ts` ("Free EV charging survey (home, ...)") and the footer CTA. Confirm it applies to every home survey.
4. **Optional site work.** No price ranges exist for consumer-unit upgrades, extra cabling, civil works or Kenya Power service upgrades; they are "quoted after the survey".
5. **Pulse mounting.** Mounting height, fixing method, weight, cable entry position and whether a pedestal is a product option are not in the register. The page says the position is set at the survey. PUL-13 "384 x 264 x 118 mm" is drawn as height x width x depth; confirm the order.
6. **Pulse MCB rating and cable size.** These are not published. The diagram says "rated at survey", and the voltage-drop table is a planning check. The Agent tool's `sizeProtection` (1.25 continuous factor) would suggest 50 A for 32 A, which conflicts with common practice and the charger manual, so it is not shown.
7. **Pulse+ supply voltage.** The register PP-01 says "Kenya Power's 415 V supply"; `lib/programme-pages.ts` and `lib/agent/products.ts` say 400 V, with 32 A per phase in the Agent library only. Pick one.
8. **Pulse+ modes wording.** PP-03 reads "11 kW and 7.4 kW single-phase modes", which suggests 11 kW single-phase. The FAQ says 11 kW on three-phase cars and 7.4 kW single-phase. The page follows the FAQ reading; the register text should be clarified.
9. **Pulse+ load-sharing behaviour.** The site-limit setting, per-phase division and behaviour when cars leave are not specified beyond "divide the available current per phase". The minimum current per car (IEC 61851 6 A) is not modelled by the planner.
10. **Pulse+ release date, price and certification.** None is published. The page says so.
11. **Vehicle on-board charger ratings.** The site data has no per-model AC limits. Pages use only the generic classes in PUL-20, PP-13 and the FAQ (6.6, 7.4, 11 and 22 kW).
12. **Corridor "about 30 minutes"** (`productChargeTimes.corridor`) has no register id. Kept as existing copy, with "depending on the car".
13. **Boda Hub status.** The register says pilot; the homepage and the brief use "in development". The pages show "In development". The swap time "under 5 minutes at partner-run sites" is evidence "illustrative" in BH-12, and no partner site is named.
14. **Battery strings in the Kenya EV guide** (e.g. "~45–60 kWh") contain en dashes and appear in the calculator's car list. That is existing data in `lib/kenya-ev-compatibility.ts` (not owned here).
