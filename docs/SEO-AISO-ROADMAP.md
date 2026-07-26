# SEO + AISO Implementation Roadmap

Phased delivery for the full master specification. **Phases 1–4 implemented.**

---

## Phase 1 — Foundation (complete)

- [x] Central SEO config + types
- [x] Metadata generator (title, description, canonical, OG, Twitter)
- [x] JSON-LD: Organization, WebSite, SearchAction, Service, FAQ, HowTo, Breadcrumb, Article, SoftwareApplication
- [x] `sitemap.ts`, `robots.ts`, RSS, `llms.txt`
- [x] AISO content blocks (summary, key facts, FAQ, how-to)
- [x] Seed knowledge graph + entity API
- [x] Internal linking engine
- [x] SEO audit endpoint
- [x] All public pages wired with `pageMetadata()` + `JsonLd`

---

## Phase 2 — CMS + Search (complete)

- [x] Drizzle schema in CMS + public/admin APIs
- [x] Website ISR routes, search, sitemap, embeddings
- [ ] Meilisearch / Typesense (optional)

---

## Phase 3 — Content at scale (complete)

- [x] Content gap analysis, AI drafts + review workflow
- [x] Local SEO page factory, trust signals, image/video schema
- [x] Engineering topic expansion in seed

---

## Phase 4 — Autonomous optimization (complete)

- [x] **Competitor monitoring** — `seo_competitor_snapshots`, `/seo/competitors`, `npm run seo:competitors`
- [x] **Auto-refresh stale content** — `lib/seo/stale.ts`, `/seo/automation`, `npm run seo:refresh-stale`
- [x] **AI citation tracking** — referrer classification on website, `seo_ai_citations`, `npm run seo:ingest-citations`
- [x] **MCP-compatible agent API** — `GET/POST /api/v1/seo/agent` (CMS), `/api/knowledge/tools` (website)
- [x] **Mobile deep link indexing** — `/book`, `/.well-known/assetlinks.json`, `SoftwareApplication` schema with `precifarm://`
- [x] **Swahili hreflang** — `locale` on `seo_content`, `/sw` routes, hreflang in metadata, Swahili FAQ seed

**Cron setup (recommended):**

```bash
# Daily
npm run seo:ingest-citations
# Weekly
npm run seo:report && npm run seo:competitors && npm run seo:refresh-stale
```

---

## Testing strategy

| Layer | Tool | Scope |
|-------|------|-------|
| Unit | Vitest (add later) | schema validation, metadata, audit rules |
| Integration | Playwright | sitemap, robots, JSON-LD in HTML |
| SEO | `/api/seo/health` | CI gate on deploy |
| Performance | Lighthouse CI | LCP, INP, CLS ≥ targets |

---

## Domain alignment note

Precifarm's live product is electric intercity transport in Kenya. The entity graph seeds transport + EV charging + renewable energy, with schema designed to expand into adjacent engineering verticals without rework.
