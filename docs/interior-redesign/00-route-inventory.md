# Route inventory (baseline, 6 Nov 2026)

Discovered from `app/**/page.tsx` on branch `interior-redesign` (from `main` at 46e249a). Every route returned 200 with no sideways scroll at 390, 768, 1024 and 1440 px in the baseline (`scripts/qa/route-screenshots.cjs`).

| Route | Page file | Main components | Workstream |
|---|---|---|---|
| `/` | `app/page.tsx` | home/HomeAnnouncement, home/HomeHero, home/HomePillars, home/HomeChargingCta, home/HomeScenarios, home/HomeWhyPrecifarm, home/HomeInnovation, home/HomeFinalCta | out of scope (homepage) |
| `/about` | `app/about/page.tsx` | ProductPhoto, ui/CheckItem, ui/PageCTA, ui/PageHero, RouteRolesTable, ui/SectionHeader | company-publications |
| `/agent` | `app/agent/page.tsx` | agent/AgentView | software-research-business |
| `/agent/chat` | `app/agent/chat/page.tsx` | agent/AgentChat, seo/Breadcrumbs | software-research-business |
| `/careers` | `app/careers/page.tsx` | seo/Breadcrumbs, ui/CheckItem, ui/PageCTA, ui/PageHero, ui/SectionHeader | company-publications |
| `/charging` | `app/charging/page.tsx` | seo/FaqAccordion, ui/PageHero, ChargingSection | charging-products |
| `/charging/home` | `app/charging/home/page.tsx` | seo/Breadcrumbs, seo/FaqAccordion, HomeSurveyForm, ProductPhoto, ui/CheckItem, ui/PageCTA, ui/PageHero, programmes/ProgrammeSpecTable, ui/SectionHeader | charging-products |
| `/charging/pulse-plus` | `app/charging/pulse-plus/page.tsx` | programmes/ProgrammeView | charging-products |
| `/charging/corridor` | `app/charging/corridor/page.tsx` | programmes/ProgrammeView | infrastructure |
| `/charging/boda-hub` | `app/charging/boda-hub/page.tsx` | boda-hub/BodaHubView | infrastructure |
| `/charging/engineering` | `app/charging/engineering/page.tsx` | seo/FaqAccordion, ProductShowcaseRow, ui/PageCTA, ui/PageHero, ui/SectionHeader, ui/SpecTable | software-research-business |
| `/contact` | `app/contact/page.tsx` | ContactForm, ui/PageHero | company-publications |
| `/download` | `app/download/page.tsx` | download/DownloadView | software-research-business |
| `/evs` | `app/evs/page.tsx` | evs/KenyaEvComparisonTable, seo/Breadcrumbs, ui/SpecTable, ui/PageHero, ui/SectionHeader | company-publications |
| `/faq` | `app/faq/page.tsx` | seo/Breadcrumbs, seo/FaqAccordion, ui/ContentIndexCard, ui/PageCTA, ui/PageHero | company-publications |
| `/guides` | `app/guides/page.tsx` | seo/Breadcrumbs, ui/ContentIndexCard, ui/PageCTA, ui/PageHero | company-publications |
| `/guides/charge-electric-car-at-home-kenya` | `app/guides/[slug]/page.tsx` | ui/PageCTA, ui/PageHero, seo/MarkdownContent, seo/TrustSignals, seo/AisoPageSections | company-publications |
| `/hub` | `app/hub/page.tsx` | charging-hub/ChargingHubView | infrastructure |
| `/legal` | `app/legal/page.tsx` | legal/PoliciesHubView | company-publications |
| `/legal/privacy` | `app/legal/privacy/page.tsx` | legal/LegalPolicyView | company-publications |
| `/legal/terms` | `app/legal/terms/page.tsx` | legal/LegalPolicyView | company-publications |
| `/legal/cookies` | `app/legal/cookies/page.tsx` | legal/LegalPolicyView | company-publications |
| `/locations` | `app/locations/page.tsx` | locations/LocationsPageSections, seo/Breadcrumbs, ui/PageCTA, ui/PageHero | company-publications |
| `/partners` | `app/partners/page.tsx` | ProductPhoto, ui/CheckItem, ui/PageCTA, ui/PageHero, ui/SectionHeader | software-research-business |
| `/research` | `app/research/page.tsx` | research/ResearchView | software-research-business |
| `/research/wireless-ev-charging-policy` | `app/research/wireless-ev-charging-policy/page.tsx` | research/WirelessChargingPolicyView | software-research-business |
| `/sustainability` | `app/sustainability/page.tsx` | sustainability/SustainabilityView | company-publications |
| `/training` | `app/training/page.tsx` | training/TrainingView | company-publications |

Dynamic routes: `/guides/[slug]` (static guides plus CMS), `/faq/[slug]` and `/locations/[slug]` (CMS, with fallbacks). API and feed routes are unchanged.

## Findings at baseline

- `/locations` links to city pages (`/locations/nairobi`, `/kisumu`, `/kitui`, `/mombasa`, `/eldoret`) that return 404 when no CMS is configured.
- `/faq` lists no detail pages without the CMS, so `/faq/[slug]` is unreachable from the index locally.
- The old footer rendered every link group twice (a mobile `details` copy and a desktop copy) and repeated products in a chip list and a Programmes group; replaced by one footer (`components/footer/`).
- Pulse+ and ARC Corridor shared one generic programme template (`components/programmes/ProgrammeView.tsx`).
