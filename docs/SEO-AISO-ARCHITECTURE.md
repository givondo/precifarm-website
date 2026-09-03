# SEO + AISO Engine Architecture

Precifarm's SEO and AI Search Optimization (AISO) engine is a modular TypeScript system integrated into the Next.js website, with CMS-backed expansion for content at scale.

**Production stack (actual):** Next.js 16 on Google Cloud Run · PostgreSQL via CMS (Drizzle) · `precifarm.com` + `api.precifarm.com`

---

## 1. System overview

```text
┌─────────────────────────────────────────────────────────────────┐
│                        Crawlers & AI Agents                      │
│  Google · Bing · GPTBot · Perplexity · Claude · Gemini · etc.   │
└────────────────────────────┬────────────────────────────────────┘
                             │
     ┌───────────────────────┼───────────────────────┐
     │                       │                       │
     v                       v                       v
 sitemap.xml            JSON-LD pages           /api/knowledge
 robots.txt             FAQ / AISO blocks       /api/entities
 feed.xml               llms.txt                /api/seo/*
     │                       │                       │
     └───────────────────────┼───────────────────────┘
                             v
              ┌──────────────────────────────┐
              │   website/lib/seo/ (engine)   │
              │  metadata · schema · entities │
              │  audit · aiso · sitemap       │
              └──────────────┬───────────────┘
                             │
              ┌──────────────v───────────────┐
              │  CMS (future content scale)   │
              │  articles · entities · media  │
              │  pgvector · Meilisearch       │
              └──────────────────────────────┘
```

---

## 2. Folder structure

```text
website/
├── app/
│   ├── sitemap.ts              # Dynamic XML sitemap
│   ├── robots.ts               # Crawler rules + AI bots
│   ├── feed.xml/route.ts       # RSS feed
│   ├── llms.txt/route.ts       # LLM discovery file
│   └── api/
│       ├── seo/schema/route.ts # JSON-LD API
│       ├── seo/health/route.ts # Audit endpoint
│       ├── entities/route.ts   # Knowledge graph API
│       └── knowledge/route.ts  # AISO payload API
├── components/seo/
│   ├── JsonLd.tsx
│   ├── Breadcrumbs.tsx
│   └── AisoPageSections.tsx
├── lib/seo/
│   ├── config.ts               # Site + route config
│   ├── metadata.ts             # Title, OG, Twitter, canonical
│   ├── types.ts
│   ├── schema/index.ts         # JSON-LD generators
│   ├── entities/registry.ts    # Seed knowledge graph
│   ├── aiso/blocks.ts          # GEO / AISO content blocks
│   ├── audit/checks.ts         # SEO issue detection
│   ├── sitemap.ts
│   └── pages/
│       ├── registry.ts         # Per-page SEO config
│       └── helpers.ts
└── docs/
    ├── SEO-AISO-ARCHITECTURE.md  (this file)
    └── SEO-AISO-ROADMAP.md
```

---

## 3. Module status

| Module | Phase | Status |
|--------|-------|--------|
| Technical SEO (meta, sitemap, robots, OG) | 1 | **Implemented** |
| JSON-LD schema generators | 1 | **Implemented** |
| AISO page blocks (FAQ, facts, how-to) | 1 | **Implemented** |
| Knowledge graph seed + API | 1 | **Implemented** |
| Internal linking engine | 1 | **Implemented** |
| SEO audit API | 1 | **Implemented** |
| llms.txt + RSS | 1 | **Implemented** |
| CMS content generation | 2 | Planned |
| pgvector / vector search | 2 | Planned |
| Meilisearch full-text | 2 | Planned |
| Local SEO page factory | 3 | Planned |
| Image/video SEO automation | 3 | Planned |
| Analytics dashboard (GSC + GA4) | 2 | Planned |
| Content gap analysis | 3 | Planned |

---

## 4. Database schema (CMS extension)

Phase 2 adds these tables to the CMS PostgreSQL database:

```sql
-- Knowledge entities (graph nodes)
CREATE TABLE seo_entities (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  aliases JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',
  url TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Directed edges between entities
CREATE TABLE seo_entity_relations (
  id UUID PRIMARY KEY,
  from_entity_id UUID REFERENCES seo_entities(id),
  to_entity_id UUID REFERENCES seo_entities(id),
  relation_type TEXT NOT NULL,
  weight REAL DEFAULT 1.0,
  UNIQUE(from_entity_id, to_entity_id, relation_type)
);

-- CMS-managed articles / guides
CREATE TABLE seo_content (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  body_md TEXT,
  content_type TEXT NOT NULL, -- article, howto, faq, guide
  entity_ids JSONB DEFAULT '[]',
  schema_json JSONB,
  aiso_blocks JSONB,
  status TEXT DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- SEO performance snapshots
CREATE TABLE seo_metrics (
  id UUID PRIMARY KEY,
  path TEXT NOT NULL,
  date DATE NOT NULL,
  impressions INT,
  clicks INT,
  avg_position REAL,
  cwv_lcp REAL,
  cwv_inp REAL,
  cwv_cls REAL,
  ai_referrals INT DEFAULT 0,
  UNIQUE(path, date)
);

-- Vector embeddings for semantic search
CREATE TABLE seo_embeddings (
  content_id UUID REFERENCES seo_content(id),
  embedding vector(1536),
  PRIMARY KEY (content_id)
);
```

---

## 5. API specifications

### `GET /api/knowledge?path=/`

Structured page knowledge for AI agents.

### `GET /api/entities?type=equipment`

List or fetch knowledge graph entities.

### `GET /api/seo/schema?path=/about&title=About&description=...`

Generate and validate JSON-LD for a path.

### `GET /api/seo/health`

Run SEO audit across registered pages.

---

## 6. Page integration pattern

```typescript
import { pageMetadata, pageJsonLd } from "@/lib/seo/pages/helpers";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = pageMetadata("/charging");

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLd("/charging")} />
      {/* page content */}
    </>
  );
}
```

Register new pages in `lib/seo/pages/registry.ts`.

---

## 7. Environment variables

All values belong in `website/.env.local` (from `.env.example`). Full reference: [`docs/infrastructure/environment.md`](../../docs/infrastructure/environment.md).

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL (required in production) |
| `CMS_API_URL` | CMS proxy for booking, search, analytics |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Optional maps on `/hub` |
| `ANALYTICS_INGEST_KEY` | Analytics proxy (must match CMS) |

---

## 8. CI/CD integration

Add to Cloud Build after `npm run build`:

```bash
curl -sf "$SITE_URL/api/seo/health" | node -e "
  const d=JSON.parse(require('fs').readFileSync(0,'utf8'));
  if(d.errorCount>0) process.exit(1);
"
```

---

## 9. Success metrics

- All public routes in sitemap with valid canonical URLs
- FAQ schema on homepage and key conversion pages
- `/api/knowledge` returns structured JSON for AI ingestion
- Core Web Vitals targets maintained (SSR/SSG pages)
- Zero SEO audit errors in `/api/seo/health`

See [SEO-AISO-ROADMAP.md](./SEO-AISO-ROADMAP.md) for phased delivery plan.
