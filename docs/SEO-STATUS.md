# Precifarm SEO Status — 21 Aug 2026

Internal dashboard for technical SEO, GEO/LLM discoverability and production health.

## Current architecture

| Layer | Implementation |
|---|---|
| Framework | Next.js 16 App Router (React 19), TypeScript |
| Rendering | SSG/ISR — static pages + CMS dynamic routes (`revalidate: 3600`) |
| SEO engine | `website/lib/seo/` — metadata, schema, sitemap, AISO, audit |
| CMS | `api.precifarm.com` — guides, FAQ, locations |
| Hosting | GCP Cloud Run (`precifarm-website`, europe-west1) |
| Build | Cloud Build → Artifact Registry (africa-south1) |
| CDN / DNS | Cloud DNS domain mappings for `precifarm.com`, `www`, `api` |
| Analytics | First-party CMS ingest (`AnalyticsProvider`) — no GA4 |

## Production verification (21 Aug 2026)

| Check | Status |
|---|---|
| `https://precifarm.com/` | HTTP 200 |
| `https://precifarm.com/robots.txt` | OK — allows crawlers + AI bots |
| `https://precifarm.com/sitemap.xml` | OK — static + CMS URLs |
| Homepage visible copy | Unchanged (`lib/brand-messaging.ts` → `HomeHero.tsx`) |
| HTTPS canonical | `https://precifarm.com` |

## Changes made (this pass)

### Metadata
- Homepage title: `Precifarm | EV Charging Infrastructure in Kenya`
- Homepage meta description aligned to business positioning (metadata only)
- Keyword-first titles on commercial pages (`| Precifarm` suffix)
- Unique FAQs added to `/partners`, `/training`, `/about`, `/contact`, `/guides`

### Technical
- `/evs` added to `publicRoutes` and sitemap
- SEO redirects: `/learn` → `/guides`, `/electric-vehicles/kenya` → `/evs`, `/ev-charging/*` cluster → existing pages
- Web app manifest at `/manifest.webmanifest`
- Internal linking graph expanded (`entities/registry.ts`, `aiso/blocks.ts`)
- `llms.txt` updated with `/evs` and `/learn` alias

### Not changed (by design)
- Homepage hero headline, CTAs and visible body copy
- Brand positioning and product names
- GCP infrastructure configuration
- No new thin doorway pages invented

## Sitemap status

- **URL:** https://precifarm.com/sitemap.xml
- **Static routes:** 16 indexable paths via `publicRoutes`
- **Dynamic:** CMS-published `/faq/*`, `/guides/*`, `/locations/*`
- **Excluded:** `/book` (noindex redirect), `/api/*`

## Robots status

- **URL:** https://precifarm.com/robots.txt
- Allows: `/` for all crawlers including GPTBot, Google-Extended, anthropic-ai, PerplexityBot
- Disallows: `/api/`, `/_next/`
- Declares sitemap + host

## Schema implemented

| Page type | Schema |
|---|---|
| Global (layout) | Organization, WebSite, SoftwareApplication |
| All pages | WebPage |
| With breadcrumbs | BreadcrumbList |
| With FAQs | FAQPage |
| Homepage | Service, HowTo, FAQPage |
| CMS guides | Article |
| CMS locations | LocalBusiness |
| Careers | JobPosting |

Validate: `GET /api/seo/health` and Google Rich Results Test.

## Canonical status

- Self-referencing canonical on every indexable page via `createPageSeo()`
- Production URL baked at build: `NEXT_PUBLIC_SITE_URL=https://precifarm.com`
- **Fixed (21 Aug 2026):** `www.precifarm.com` → `https://precifarm.com/` 301 via `website/middleware.ts` (deployed)

## Core Web Vitals / performance

Recent improvements (separate pass):
- Product image compression
- Homepage flagship `fill` layout fix
- Mobile touch targets and overflow clipping

Remaining: hero image WebP conversion, font subsetting audit.

## Accessibility

- Mobile nav backdrop + scroll lock
- 44px touch targets on nav, filters, FAQ rows
- Semantic landmarks (`main`, `nav`, breadcrumbs)

## Internal linking

- Contextual links per path in `internalLinksForPath()`
- Homepage related links: charging, home, hub, EV guide, training, FAQ
- Redirects preserve SEO equity for planned URL clusters

## Remaining issues (priority)

| Priority | Issue | Owner |
|---|---|---|
| P0 | Verify `precifarm.com` in Search Console (DNS TXT or HTML meta) | Marketing |
| P1 | Re-run `npm run seo:search-console` after verification + enable Search Console API | Marketing |
| P1 | Seed production CMS guides: `Ticketing and Payment CMS/scripts/seed-seo-production.ps1` (needs Cloud SQL Auth Proxy) | Dev |
| P2 | Wire image sitemap or remove dead helper | Dev |
| P2 | Extend RSS feed to include CMS guides | Dev |
| P2 | Optional GA4 alongside CMS analytics | Marketing |
| P3 | Expand `/guides` knowledge centre content via CMS | Content |
| P3 | Individual corridor location pages when live | Product |

## Recommended next 30 SEO actions

1. Verify domain property in Google Search Console
2. Submit `sitemap.xml` via `npm run seo:search-console`
3. Fix www/non-www canonical at load balancer
4. Request indexing for `/evs`, `/charging/private-house`, `/network`
5. Publish 3–5 CMS guides targeting home charging cost Kenya
6. Publish Nairobi + Kisumu location pages via CMS
7. Monitor `/api/seo/health` weekly
8. Run Lighthouse mobile on homepage and `/charging`
9. Convert hero and product PNGs to WebP
10. Add FAQ schema to `/careers` and `/download` if FAQs added to page body
11. Build backlinks from verified social profiles (LinkedIn, X)
12. Ensure Google Business Profile matches Organization schema
13. Monitor AI referral traffic in CMS analytics
14. Review Core Web Vitals in Search Console after deploy
15. Audit CMS location pages for LocalBusiness accuracy
16. Add internal links from `/evs` model pages to charging products
17. Keep `llms.txt` synced when new routes launch
18. Document Android asset links SHA256 in production env
19. Review hreflang — expand Swahili pages or narrow alternates
20. Monitor 404s in Cloud Logging
21. Set Cloud Run min instances if cold starts affect crawlers
22. Enable Cloud CDN caching headers for static assets
23. Add charging cost calculator landing when product-ready
24. Partner page case studies (real deployments only)
25. Training page Course schema when curriculum is fixed
26. Quarterly SEO audit via `pageSeoRegistry` + CMS content
27. Monitor duplicate titles in Search Console
28. Track M-Pesa / contact conversion events in analytics
29. Refresh OG image if brand mark updates
30. Re-run this checklist after each major release

## Steps 1–5 execution (21 Aug 2026)

| Step | Action | Status |
|---|---|---|
| 1 | Search Console domain verification | **Pending** — add property at [Search Console](https://search.google.com/search-console/welcome). HTML tag: set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` on Cloud Run and redeploy. DNS: TXT at Hostinger (recommended domain property). |
| 2 | Submit sitemap | **Ready** — run `npm run seo:search-console` after step 1. Script fixed (gcloud auth). Enable `searchconsole.googleapis.com` on GCP. |
| 3 | www → apex 301 | **Done** — `middleware.ts` deployed; `www.precifarm.com` returns 301 → `https://precifarm.com/` |
| 4 | Request indexing for `/evs`, `/charging/private-house`, `/network` | **Script updated** — URL Inspection runs via API; manual “Request indexing” in Search Console UI still required for standard pages |
| 5 | Publish 3–5 CMS guides + weekly health monitor | **Content ready** — 5 guides added to `seed-seo.ts` (local seed OK). Production: run `scripts/seed-seo-production.ps1` after installing Cloud SQL Auth Proxy. Monitor: `npm run seo:health` |

## Deployment status

- **Local build:** `npm run build` passes (middleware + verification meta support)
- **Production deploy:** completed 21 Aug 2026 — www redirect + SEO metadata live
- **CMS guides:** seeded locally (10 items); production API still shows 2 guides until production seed runs

## API endpoints for SEO tooling

- Health audit: `/api/seo/health`
- Schema generator: `/api/seo/schema`
- Knowledge graph: `/api/knowledge`
- LLM manifest: `/llms.txt`
- RSS: `/feed.xml`
