# Precifarm Website — Pivot Cleanup Inventory

**Scope:** `website/` (precifarm.com)  
**Updated:** 31 August 2026 — after charging-only ship (`6d7b759`) and AI companion rebrand.

This replaces the pre-cleanup audit. Booking UI, APIs and `/book` are **gone**. Redirects remain. Home charging lives at `/charging/home`.

---

## Status key

| Verdict | Meaning |
|---|---|
| **KEEP** | Live, on-pivot |
| **DONE** | Cut or redirected since the last audit |
| **REVIEW** | Live; copy or overlap still worth a pass |
| **LEAVE** | Keep for SEO / i18n / B2B; not a product page |

---

## 1. Public routes (`app/**/page.tsx`)

### Static pages

| Route | File | Purpose | Verdict |
|---|---|---|---|
| `/` | `app/page.tsx` | Homepage — charging scenarios, flagships, energy packages, EV teaser, AI companion, FAQ, CTA | **KEEP** |
| `/about` | `app/about/page.tsx` | Company story, principles, who-does-what (home / hubs / fleets / highway) | **KEEP** — booking copy removed |
| `/book` | — | Page deleted. `next.config` 301 → `/charging` | **DONE** |
| `/careers` | `app/careers/page.tsx` | Charging roles | **KEEP** |
| `/charging` | `app/charging/page.tsx` | Spark / Pulse / Pod / Depot / Boda / Corridor hub | **KEEP** |
| `/charging/engineering` | `app/charging/engineering/page.tsx` | Design basis, Kenya Power hold points, PDF | **KEEP** |
| `/charging/home` | `app/charging/home/page.tsx` | Pulse / Pod home packages, Lipa Pole Pole, survey | **KEEP** |
| `/charging/modular-energy` | `app/charging/modular-energy/page.tsx` | P1 Go / P2 Home / Pod enclosure — conceptual | **KEEP** |
| `/charging/modular-energy/p1-go` | `[slug]` | Portable backup (conceptual) | **KEEP** |
| `/charging/modular-energy/p2-home` | `[slug]` | Home tower (conceptual) | **KEEP** |
| `/charging/modular-energy/pod` | `[slug]` | Outdoor SME enclosure — not home Pod energy storage | **KEEP** — naming still easy to confuse |
| `/charging/private-house` | — | 301 → `/charging/home` | **DONE** |
| `/contact` | `app/contact/page.tsx` | Email, phone, WhatsApp, form | **KEEP** |
| `/download` | `app/download/page.tsx` | **Precifarm AI companion** — jobs, live vs in-design, APK, FAQ | **KEEP** |
| `/evs` | `app/evs/page.tsx` | Kenya EV comparison + charging fit | **LEAVE** (SEO) |
| `/faq` | `app/faq/page.tsx` | Charging FAQ index; booking slug filtered | **KEEP** |
| `/guides` | `app/guides/page.tsx` | CMS how-tos | **LEAVE** (SEO) |
| `/locations` | `app/locations/page.tsx` | City SEO directory | **LEAVE** — overlaps `/hub` |
| `/network` | — | 301 → `/hub` | **DONE** |
| `/hub` | `app/hub/page.tsx` | Charging Hub — site types, how-it-works, directory | **KEEP** |
| `/partners` | `app/partners/page.tsx` | Fleet, hosts, dealers | **KEEP** |
| `/sw` | `app/sw/page.tsx` | Kiswahili landing; off header, still in sitemap | **LEAVE** |
| `/training` | `app/training/page.tsx` | T1 / T2 / T3 certification | **KEEP** |

### Dynamic CMS routes

| Pattern | Notes | Verdict |
|---|---|---|
| `/faq/[slug]` | Published FAQs. `precifarm-booking-faq` → `notFound()` + 301 to `/faq` | **KEEP** |
| `/guides/[slug]` | Guides / howtos / articles | **LEAVE** |
| `/locations/[slug]` | City pages | **LEAVE** |
| `/sw/faq/[slug]` | Kiswahili FAQs; booking slug excluded | **LEAVE** |

### Related public surfaces

| Route | Notes |
|---|---|
| `/sitemap.xml` | Static `publicRoutes` + CMS (booking FAQ slug filtered) |
| `/robots.txt` | Disallows `/api/` |
| `/feed.xml`, `/llms.txt` | Charging-only copy; AI companion listed |
| `/.well-known/assetlinks.json` | Android App Links for the companion |

---

## 2. Navigation (current)

**Charge:** Charging Hub · Charging · Home charging · Engineering · Training  

**Modular energy:** Platform overview · P1 Go · P2 Home · Pod enclosure · **AI companion** (`/download`)

**Company:** About · Kenya EV guide · Guides · FAQ · Careers · Contact  

Kiswahili is **off the header**. Footer still has Charge + Modular energy + Fleets + Company.

**Header CTA:** `headerCta` → `/hub` · “Open Charging Hub” (`BookNowLink` now uses `headerCta.href`).

---

## 3. Legacy surfaces — current verdict

| Surface | Verdict | Notes |
|---|---|---|
| Homepage | **KEEP** | Charging + energy. `HomePlatform` (bus section) is **not** mounted |
| `/charging/*` except legacy `/home` | **KEEP** | |
| `/hub` | **KEEP** | |
| `/partners`, `/contact` | **KEEP** | |
| `/about` | **KEEP** | RouteRolesTable is charging-only |
| `/training` | **KEEP** | Passenger language removed |
| `/download` + homepage band | **KEEP** | Rebranded AI companion; not a chatbot |
| `/evs`, `/guides`, `/faq` | **LEAVE** | Content layer; booking FAQ blocked |
| `/faq/precifarm-booking-faq` | **DONE** | 301 → `/faq`; page `notFound()` |
| `/locations` | **LEAVE** | City SEO vs hub directory — optional later merge |
| `/sw` | **LEAVE** | Thin mirror; keep unless traffic is zero |
| `/careers` | **KEEP** | Passenger / timetable phrasing removed |
| `/book` | **DONE** | Redirects only |
| Booking UI + APIs | **DONE** | Deleted |
| `lib/route.ts`, `lib/booking.ts`, `lib/booking-store.ts`, `lib/mpesa.ts`, `lib/seats.ts` | **DONE** | Deleted |
| `lib/vehicles.ts` | **REVIEW** | Now hub photography, not Yutong — filename is leftover |
| OG image | **DONE** | “EV CHARGING · ENERGY STORAGE” |
| Entity registry Yutong | **DONE** | Pulse / Pod / Spark / Corridor / Depot / Boda / AI companion |
| `BookNowLink` / `IconTicket` | **DONE** | CTA uses `headerCta.href`; ticket icon removed |
| `homeSolarInstallSection`, `busSection`, `HomePlatform.tsx` | **REVIEW** | Unused on live homepage |

---

## 4. Duplicate / overlapping pages (unchanged strategy)

| Overlap | Note |
|---|---|
| `/locations` vs `/hub` | City SEO vs live hub directory — keep both for now |
| `/evs` vs `/guides` | Structured comparison vs CMS how-tos — keep both |
| Pod enclosure vs Pod energy storage | Nav already disambiguates; keep copy explicit |
| Homepage EV teaser vs `/evs` | Teaser links through — acceptable |

---

## 5. SEO registry

Registered static paths match live pages (no `/book`). `/download` title is **Precifarm AI Companion for Android**. `/sw` remains in `publicRoutes`.

---

## 6. Redirects in `next.config.ts`

| Source | Destination |
|---|---|
| `/learn`, `/learn/:path*` | `/guides` |
| `/electric-vehicles/kenya` | `/evs` |
| `/ev-charging` (+ kenya, dc-fast-charging) | `/charging` |
| `/ev-charging/nairobi` | `/locations` |
| `/ev-charging/home`, `/ev-charging/private-house`, `/ev-charging/m-pesa` | `/charging/home` |
| `/ev-charging/fleet` | `/partners` |
| `/book`, `/book/:path*` | `/charging` |
| `/charging/private-house` | `/charging/home` |
| `/faq/precifarm-booking-faq`, `/sw/faq/precifarm-booking-faq` | `/faq` |

Middleware: `www.precifarm.com` → `precifarm.com`.

---

## 7. Footer & announcement

**Announcement:** Pulse from KES 79,000 · public DC &lt;30 min · Lipa Pole Pole → `/charging/home`  
**Product line:** Pulse · Pod · Spark · Corridor · Boda Hub · Depot · P1 Go  

---

## Remaining work (small)

1. Optional later: rename `lib/vehicles.ts` → hub images; delete unused `HomePlatform.tsx` and dead `busSection` / `homeSolarInstallSection` copy.
2. Optional later: `/locations` ↔ `/hub` consolidation.

**Do not cut:** `/download`, modular energy family, `/evs`, `/guides`, `/faq`, `/locations`, `/sw` unless product strategy changes.
