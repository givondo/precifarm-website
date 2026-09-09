import { NextResponse } from "next/server";
import { BOOKING_FAQ_SLUG, BOOKING_GUIDE_SLUG } from "@/lib/charging-faqs";
import { cmsSearchSeo } from "@/lib/seo/cms-client";
import { entityRegistry } from "@/lib/seo/entities/registry";

const RETIRED_SLUGS = new Set([BOOKING_GUIDE_SLUG, BOOKING_FAQ_SLUG]);

function isRetiredSlug(slug: string | undefined | null): boolean {
  return Boolean(slug && RETIRED_SLUGS.has(slug));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const mode = searchParams.get("mode") === "semantic" ? "semantic" : "keyword";

  if (!q.trim()) {
    return NextResponse.json({ error: "Query parameter q is required." }, { status: 400 });
  }

  try {
    const cmsResults = await cmsSearchSeo(q, mode);
    const content = (cmsResults.content ?? []).filter((item) => !isRetiredSlug(item.slug));
    const entities = (cmsResults.entities ?? []).filter((item) => !isRetiredSlug(item.slug));

    if (content.length > 0 || entities.length > 0) {
      return NextResponse.json({
        source: "cms",
        mode,
        query: cmsResults.query ?? q,
        content,
        entities,
        meta: cmsResults.meta,
      });
    }

    if (mode === "semantic") {
      return NextResponse.json({
        query: q,
        source: "cms",
        mode,
        content: [],
        entities: [],
        meta: cmsResults.meta ?? { engine: "openai-embeddings", version: "2.0" },
      });
    }
  } catch {
    if (mode === "semantic") {
      return NextResponse.json(
        { error: "Semantic search unavailable. CMS or OPENAI_API_KEY may be misconfigured." },
        { status: 503 },
      );
    }
  }

  const lower = q.toLowerCase();
  const entities = entityRegistry.filter(
    (e) =>
      e.name.toLowerCase().includes(lower) ||
      e.description.toLowerCase().includes(lower) ||
      e.slug.includes(lower),
  );

  return NextResponse.json({
    query: q,
    source: "local",
    mode: "keyword",
    content: [],
    entities,
    meta: { engine: "local-fallback", version: "2.0" },
  });
}
