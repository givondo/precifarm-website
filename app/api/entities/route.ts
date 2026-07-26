import { NextResponse } from "next/server";
import { cmsListSeoEntities } from "@/lib/seo/cms-client";
import {
  entityRegistry,
  getEntity,
  getEntityBySlug,
  getRelatedEntities,
  listEntities,
} from "@/lib/seo/entities/registry";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const slug = searchParams.get("slug");
  const type = searchParams.get("type");

  try {
    const cmsEntities = await cmsListSeoEntities(type ?? undefined);
    if (cmsEntities.length > 0) {
      if (slug) {
        const entity = cmsEntities.find((e) => e.slug === slug);
        if (!entity) {
          return NextResponse.json({ error: "Entity not found" }, { status: 404 });
        }
        return NextResponse.json({ entity, related: [], source: "cms" });
      }
      return NextResponse.json({
        count: cmsEntities.length,
        entities: cmsEntities,
        source: "cms",
        meta: { format: "precifarm-knowledge-entity-v2" },
      });
    }
  } catch {
    // fallback to local registry
  }

  if (id) {
    const entity = getEntity(id);
    if (!entity) {
      return NextResponse.json({ error: "Entity not found" }, { status: 404 });
    }
    return NextResponse.json({ entity, related: getRelatedEntities(id), source: "local" });
  }

  if (slug) {
    const entity = getEntityBySlug(slug);
    if (!entity) {
      return NextResponse.json({ error: "Entity not found" }, { status: 404 });
    }
    return NextResponse.json({ entity, related: getRelatedEntities(entity.id), source: "local" });
  }

  const entities = listEntities(type as Parameters<typeof listEntities>[0] | undefined);
  return NextResponse.json({
    count: entities.length,
    entities,
    source: "local",
    meta: { format: "precifarm-knowledge-entity-v1" },
  });
}
