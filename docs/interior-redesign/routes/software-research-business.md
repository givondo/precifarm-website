# Workstream: software, research and business

Routes: `/agent`, `/agent/chat`, `/download`, `/research`, `/research/wireless-ev-charging-policy`, `/partners`, `/charging/engineering`.
Branch `worktree-agent-a38abf6700cbd3655`, based on `interior-redesign` 90597b4 plus integration commit f1230a4.

Built on `components/interior/*` (InteriorHero, InteriorSection, StageLabel, StepFlow, CalloutNote, InPageNav). No new dependencies. All diagrams are hand-built SVG. Motion is CSS plus small client components, and every animated part respects `prefers-reduced-motion`. Footer CTAs come from `lib/site-nav.ts`, so the old `PageCTA` bands at the foot of each page were removed to avoid a second CTA directly above the footer one.

## /agent

**Before.** Hero with a scripted mock (`AgentWorkspaceMock`) whose figures were typed by hand (14.4 kWh, "~2.1 hrs", "10 kWh battery") and did not match the kernel. Then a progress band, the embedded chat, a north-star quote, an auto-cycling eight-stage strip (`AgentWorkflowStrip`, which ignored reduced motion), modes, roadmap, a nine-step "agent loop", an eight-step "how it works" list (a duplicate of the strip), capabilities cards, a kernel tool list, a second animated example (`AgentExampleDemo`, "7 kW, ~2.6 hours", typed by hand), companion, trust labels (six, of which the kernel produces four), FAQ and a CTA. About 14 stacked sections with three different step sequences that repeated each other.

**Weaknesses.** Hand-typed numbers inconsistent with the tool kernel. Scripted animations not labelled as scripted. Three duplicate process lists. Trust labels "Measured" and "Verified" that the kernel never produces. FAQ said engineers can "run it locally".

**Now.**
- Graphite hero with a "What is live on this page" panel: Live (Agent workspace, tool kernel), Scripted (worked demonstration), Planned (Act and Auto modes), each with a StageLabel.
- **Engineering workspace demonstration** (`components/agent/EngineeringWorkspace.tsx`, `lib/agent-workspace.ts`). Three briefs (home EV charging, workplace fleet charging with load sharing, school solar and backup). Each brief turns into a task plan, engineering calculations, a single line diagram, a parts list and a traceable result. Every number comes from `runEngineeringTool` (the same functions `/api/agent/chat` calls) and product facts from `lookupPrecifarmProduct`. Sliders re-run the kernel instantly. Each calculation row expands to show `tool(args)`, the summary and the engineer notes. The fleet brief shows a real iteration: the peak exceeds supply, a load-sharing cap is derived, the peak is re-checked and charge time recomputed. "Copy result and trace" copies the whole design. "Send this brief to the live Agent" opens `/agent/chat?brief=...` prefilled. Labelled `StageLabel simulation` ("Scripted demonstration") next to `StageLabel available` ("Live tool kernel").
- Mobile: full-width panels, a portrait layout for the diagram, an "Expand diagram" native `<dialog>` with the landscape drawing (scrolls sideways), and collapsible traces and assumptions.
- Live workspace (`#try`, kept for inbound links): the working chat. Changes are limited to a `?brief=` prefill, a "Try again" button after a failure (re-posts the same conversation), an honest model label ("DeepSeek V4 Flash · hosted model" instead of "OpenCode + DeepSeek"), and larger touch targets. The API call, payload, rate limiting and error messages are unchanged.
- **Tool bench** (`components/agent/ToolBench.tsx`): all ten kernel tools. The form is generated from the same JSON schema the model sees; results run live in the browser.
- Permissions (Ask and Plan live, Act and Auto planned) plus the four evidence labels the kernel actually emits, roadmap in three columns with StageLabels, and the FAQ (JSON-LD unchanged in shape).
- Removed: `AgentWorkspaceMock`, `AgentExampleDemo`, `AgentWorkflowStrip` (they used the deleted hand-typed data).

## /agent/chat

**Before.** A plain light page: h1, the chat and a "Download OpenCode setup" button. **Now.** A graphite workspace page with the chat at full height (`min(820px, 100dvh − 9rem)`), the `?brief=` prefill from the demonstration, and a side panel with the evidence-label legend, the ten tools and where the brief goes (the hosted provider; nothing runs on the device). Still `noindex`.

## /download

**Before.** Text hero "Run Precifarm Agent: web, OpenCode, or Android", a stack list, a platform list with status words, OpenCode steps, FAQ and CTA. The SEO description promised a desktop download "on request" and the FAQ said a desktop app was on the roadmap. It did not say that the OpenCode path lacks the calculation kernel.

**Now.** Cloud only (HD-043). Three platform cards with line-drawn device art, StageLabel status, "You get / You need" and the right action:
- Web workspace: Available now. Link to `/agent/chat`.
- Android: "In the browser today". Opens the web workspace. A packaged build is offered "on request" (`/contact?interest=agent-desktop`). **No download button**, because no APK is published in `public/`.
- Desktop terminal (OpenCode): "OpenCode setup". **The only download button** (`/api/agent/opencode-config`, a real JSON file). It states that the calculation tools and trace stay on the web workspace.

The visitor's platform is detected client side and marked "Your device" (never hides an option). A comparison matrix (stacked lists on phones), a "Where your brief goes" note, the OpenCode three-step flow and the FAQ follow. Page metadata title and description are overridden in `app/download/page.tsx` to state what exists (canonical, breadcrumbs and FAQ JSON-LD still come from the registry). Tests confirm no chatbot, Play Store, iOS, APK or local-model wording.

## /research

**Before.** Hero with a blue reference diagram, goals band, five gate cards, five long programme cards each with its own diagram in a blue palette, roadmap table, collaboration cards, FAQ and CTA. It was long and paragraph-heavy, with no interactive showcase.

**Now.**
- Hero facts: 5 programmes, G0 to G4, **Wireless efficiency: Not yet measured** (register WPT-04), next review Q1 2027.
- **Wireless charging lab** (`components/research/WptLab.tsx`, `lib/wireless-wpt-model.ts`). A top view where you drag the receiver pad, or use the sliders for both axes. A side view of the charging pads (coil, ferrite, shield, air gap, field lines). Air gap and coil Q sliders. "Drop a coin on the pad" shows foreign object detection stopping transfer. A misalignment sweep. An efficiency curve across offset. A grid-to-battery power chain where only the coil stage is modelled and every other stage says "not modelled". The model equations and parameters are printed on the page; efficiency is the textbook two-coil upper bound η = U²/(1+√(1+U²))², U = kQ. Labelled `StageLabel simulation`: "Illustrative model, not Precifarm hardware or measured data... measured system efficiency: not yet measured".
- **Evidence requirements:** seven items, each with its status (target or not yet measured), the evidence needed and the gate.
- **Gate board:** programmes against G0 to G4, with progress toward the current gate, plus each gate's question and exit criteria.
- Programmes as collapsible cards. `#precifarm-agent` and the other ids still work, and `OpenOnHash` opens the matching card.
- Goals, roadmap table, collaboration and FAQ follow.
- Removed the unused `components/research/diagrams/*`.

## /research/wireless-ev-charging-policy

Same legal text, unchanged. It is now a publication layout: a hero with the effective date and a "Research" stage label, sticky contents (horizontal on phones), principles as a two-column grid, benchmarks as a readable list under a "not Precifarm performance" note, targets tagged "Target", a gate strip linking to `/research#evidence`, governance and the FAQ.

## /partners

**Before.** A generic hero, a stat band ("24/7 remote monitoring on commissioned sites"), five partner-model cards, a four-step process, a product-fit row, five site tests, commitments and a CTA. It linked `/hub` (which now redirects).

**Weaknesses.** Unsupported claims: "24/7 remote monitoring", "contracted uptime", "three-year aftersale care", "certified crews", "Training tiers T1 to T3", CHAdeMO (Corridor is CCS2 in the register), "Precifarm designs, builds, owns and operates", "revenue share on retail dwell". The page was organised by partner model, not by journey.

**Now.** Five journeys: fleet operators (`#fleet-logistics`, with an electric boda sub-journey at `#boda-operators`), charging-site hosts (`#hub-hosts`), property owners (`#property-owners`, new), installers (`#dealers-installers`) and infrastructure partners (`#finance-oem`). All inbound anchors are kept. Each journey has: who it is for; product chips with StageLabels (Pulse available, Pulse+ in development, Boda Hub in development with partner-run sites, ARC Corridor pilot development); "Precifarm does" and "You provide" ledgers; four steps; a primary CTA to `/contact?interest=<key>`; and a secondary link. The hero is a journey chooser and the in-page nav is sticky. A graphite "What you can rely on" section restates only canon rules. Enquiry keys used: `pulse-plus`, `boda-hub`, `corridor`, `survey`, `dealer`, `finance`, `general`. **No keys were added to `lib/contact-interests.ts`.**

## /charging/engineering

**Before.** PageHero with PDF buttons, audience cards, two spec tables, a product-fit row and table, a hold-points table, a five-step process, four PNG figures, FAQ, a download block and a CTA.

**Weaknesses.** Figures 1 to 3 (`public/images/engineering/*.png`) show **electric buses** and a "reserved window buffer". Bus-route charging is archived (CANON). A related link pointed to `/hub`. "Three-year aftersale on home units" was unsupported. There were no visual architectures and no assessment request on the page.

**Now.**
- Hero with a "system stack" schematic (grid, distribution and protection, optional solar and storage, charging, back office) and facts derived from the data (4 site types, 6 stages, 5 hold points, 5 deliverable types). Sticky in-page nav.
- **System architectures:** WAI-ARIA tabs (arrow keys) for Home (Pulse), Fleet and workplace (Pulse+), Highway (ARC Corridor) and Boda Hub. Each has a hand-built SVG with landscape and portrait layouts, an AC/DC/data legend and dashed "optional or sized per site" boxes, plus what we engineer and three **register claims pulled from `lib/programmes`** (never typed). A test fails if a claim label goes missing.
- **Design workflow:** six stages with hold points and the deliverables each produces, then the Kenya approval hold-points table.
- **Deliverables:** single line diagram, load study, cable schedule, protection settings, commissioning record. Miniature drawing sheets with placeholder content, labelled "Sample layouts", described as deliverable types, not past projects.
- Design basis PDF and HTML links (both real files), FAQ (same text and JSON-LD).
- **Assessment request:** pick a site type, see what to prepare, then the standard `ContactForm` preselected to the matching enquiry. It uses the same `/api/contact`, honeypot and rate limit as `/contact`. The bus PNG figures are no longer shown.

## Assets

No new raster assets. All visuals are SVG in code (`components/agent/SystemDiagram.tsx`, `components/engineering/ArchitectureDiagram.tsx`, `components/engineering/DeliverableSheet.tsx`, `components/download/PlatformArt.tsx`, `components/research/WptLab.tsx`, `components/partners/JourneyIcon.tsx`). Shared routing helper: `lib/diagram-route.ts`. CSS modules: `components/agent/workspace.module.css`, `components/research/wpt.module.css`.

## Dependencies on other areas

- `components/ContactForm.tsx` (owned by the contact workstream) is embedded on `/charging/engineering` with its `defaultInterest` prop. If that prop is renamed, update `components/engineering/AssessmentRequest.tsx`.
- `lib/agent/tools/engineering.ts`, `lib/agent/products.ts`, `app/api/*`: unchanged.
- `lib/home-app-download.ts` is used by the homepage and was left untouched. `components/DownloadApkButton.tsx` is unused anywhere; it was left in place for when an APK is published.

## Tests run

- `npx tsc --noEmit`: clean. `npx eslint` on all owned files: clean. `npm test`: 43/43 pass, including the new `tests/software-research-business.test.ts`. That file checks that every workspace task equals a fresh kernel run, that the briefs work at control extremes, the wireless model's monotonicity and protection, that "Not yet measured" is tied to WPT-04, that /download is cloud only with a single real file, that partner anchors and enquiry keys are valid, and that architecture register claims resolve.
- Production build (`npm run build` with the font mock): passes. All seven routes were checked with `next start -p 3203`.
- Playwright at 390, 768, 1024 and 1440: HTTP 200, one h1, `scrollWidth` equal to the viewport, no clipped elements outside the viewport, no console errors. Axe found zero serious or critical issues on my pages, **except** `link-name` on `.site-header-phone` at 1024 px, which is in `components/Header.tsx` (off-limits; a homepage component).
- Functional (32 checks): plan runs on phones and with reduced motion; sliders re-run the kernel; the fleet brief iterates load sharing; the diagram dialog opens and closes; the brief handoff prefills `/agent/chat`; the chat shows the 503 "not connected" error with "Try again" (no model key in this environment, so a live model reply was not exercised); the tool bench runs; the OpenCode config downloads as JSON; Android user agents get "Your device"; the only `a[download]` is the config; the coin and off-window cases stop transfer; dragging moves the pad; `#precifarm-agent` opens; all partner anchors exist and CTAs preselect `/contact`; the architecture tabs answer to the keyboard; the assessment preselects the enquiry; the honeypot is present; the PDF serves; and `/book` redirects to `/charging`.
- Repo e2e suite (`playwright test` against 3203): 102 passed. Failures: `/` WCAG colour contrast in a homepage component (`.text-white/45` in the homepage Software and research band, not this workstream), and "Agent hero workspace has an accessible name", which is fixed in the final commit by naming the workspace figure.

## Unresolved claims for David

1. **Pulse rating:** the Agent product library (`lib/agent/products.ts`) says "7 kW AC" and "KES 79,000 installed". The register says "32 A single phase: up to 7.4 kW". The workspace uses the library through the tool. Which is canonical for the Agent?
2. **Pulse+ supply:** the library says "Three-phase 400 V, 32 A per phase". The register says Kenya Power's 415 V. The kernel's protection tool also adds a 1.25 factor, giving 40 A per charger, while the library says 32 A per phase. Confirm the breaker per Pulse+ unit.
3. **Battery tool default:** `sizeBattery` defaults to 2.56 kWh, described as "the Precifarm Energy Module", which is a retired product. The demonstration passes a generic 5 kWh module instead. Update the kernel description (in `lib/agent/tools/*`, outside this workstream).
4. **Android build:** CANON says Precifarm Agent is an Android APK; no APK is in `public/`, and `app-download.ts` says "On request". The page says the build is shared on request. Confirm whether a packaged build exists to share.
5. **OpenCode path:** keep it on a cloud-only page? It sends prompts to DeepSeek with the user's key and has no Precifarm calculation kernel.
6. **Web workspace fair-use limit:** the page mentions a fair-use limit (the code limits 20 requests per 10 minutes per IP). Confirm the wording.
7. **Partner commitments removed for lack of evidence:** 24/7 remote monitoring, contracted uptime, three-year aftersale, certified crews, T1 to T3 training tiers, CHAdeMO support, revenue share on retail dwell, and "Precifarm owns and operates". Reinstate any that are approved.
8. **Partner journey steps** (for example "Five-test assessment", "Install to the checklist", "Survey before quote") restate canon and existing site copy. Confirm the installer onboarding process and whether lead referral to installers is active.
9. **Engineering design basis PDF** (`public/downloads/precifarm-solar-charger-stations-engineering.pdf`) and its figures still show electric buses and reserved timetable windows. The page no longer shows the figures, but the PDF needs regenerating.
10. **Engineering FAQ figures** (40 to 80 kWp yields 180 to 440 kWh a day; the 120 kWh and 240 kW storage example) are existing copy, not from the register.
11. **Quote structure:** "hardware, installation and any site work listed separately" follows the brief for Pulse. Confirm it applies to all quotes.
12. **Wireless model parameters** (k = 0.25 at 100 mm, 120 mm gap decay, σ = 100 mm, Q 50 to 500, ±100 mm window) are illustrative and labelled as such. Confirm you are content to publish an illustrative curve before bench data exists.
13. **Wireless evidence statuses:** "Living object protection: Target" and "EMC: Target" are drawn from policy and milestone text; they have no register entries.
14. **Agent roadmap dates** (Q1 to Q3 2027) and the research progress percentages are existing copy; please re-confirm them at the Q1 2027 review.
