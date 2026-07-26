import { cmsFetch, isCmsEnabled } from "@/lib/cms";

export type CmsSeoContent = {
  id: string;
  slug: string;
  title: string;
  description: string;
  bodyMd: string | null;
  contentType: string;
  entityIds: string[];
  aisoBlocks: {
    id: string;
    type: string;
    title: string;
    content?: string;
    items?: unknown[];
  }[];
  status: string;
  authorName: string | null;
  reviewerName?: string | null;
  reviewStatus?: string | null;
  reviewedAt?: string | null;
  aiGenerated?: boolean;
  sources?: { title: string; url: string; accessedAt?: string }[];
  locale?: string;
  publishedAt: string | null;
  updatedAt: string;
};

export type CmsSeoEntity = {
  id: string;
  slug: string;
  type: string;
  name: string;
  description: string;
  aliases: string[];
  metadata: Record<string, unknown>;
  url: string | null;
  published: boolean;
  updatedAt: string;
};

export async function cmsListSeoContent(filters?: {
  type?: string;
  status?: string;
  locale?: string;
}): Promise<CmsSeoContent[]> {
  if (!isCmsEnabled()) return [];
  try {
    const params = new URLSearchParams();
    if (filters?.type) params.set("type", filters.type);
    if (filters?.status) params.set("status", filters.status);
    if (filters?.locale) params.set("locale", filters.locale);
    const qs = params.toString();
    const data = await cmsFetch<{ items: CmsSeoContent[] }>(`/seo/content${qs ? `?${qs}` : ""}`);
    return data.items ?? [];
  } catch {
    return [];
  }
}

export async function cmsGetSeoContent(slug: string, locale = "en-KE"): Promise<CmsSeoContent | null> {
  if (!isCmsEnabled()) return null;
  try {
    const data = await cmsFetch<{ content: CmsSeoContent }>(
      `/seo/content/${encodeURIComponent(slug)}?locale=${encodeURIComponent(locale)}`,
    );
    return data.content ?? null;
  } catch {
    return null;
  }
}

export async function cmsListSeoEntities(type?: string): Promise<CmsSeoEntity[]> {
  if (!isCmsEnabled()) return [];
  try {
    const qs = type ? `?type=${encodeURIComponent(type)}` : "";
    const data = await cmsFetch<{ entities: CmsSeoEntity[] }>(`/seo/entities${qs}`);
    return data.entities ?? [];
  } catch {
    return [];
  }
}

export async function cmsSearchSeo(query: string, mode: "keyword" | "semantic" = "keyword") {
  if (!isCmsEnabled()) {
    return { query, content: [] as CmsSeoContent[], entities: [] as CmsSeoEntity[] };
  }
  try {
    const params = new URLSearchParams({ q: query });
    if (mode === "semantic") params.set("mode", "semantic");
    return await cmsFetch<{
      query: string;
      content: CmsSeoContent[];
      entities: CmsSeoEntity[];
      meta?: { engine: string; version: string };
    }>(`/seo/search?${params.toString()}`);
  } catch {
    return { query, content: [] as CmsSeoContent[], entities: [] as CmsSeoEntity[] };
  }
}

export async function cmsSeoReport() {
  if (!isCmsEnabled()) return null;
  try {
    return await cmsFetch<{ report: Record<string, unknown> }>("/seo/report");
  } catch {
    return null;
  }
}

export async function cmsGetSeoEntity(slug: string): Promise<(CmsSeoEntity & { related?: CmsSeoEntity[] }) | null> {
  if (!isCmsEnabled()) return null;
  try {
    const data = await cmsFetch<{ entity: CmsSeoEntity; related?: CmsSeoEntity[] }>(
      `/seo/entities/${encodeURIComponent(slug)}`,
    );
    if (!data.entity) return null;
    return { ...data.entity, related: data.related };
  } catch {
    return null;
  }
}

export async function cmsListLocalContent(): Promise<CmsSeoContent[]> {
  const items = await cmsListSeoContent({ status: "published" });
  return items.filter((item) => item.contentType === "local_page");
}

export async function cmsSeoHealth() {
  if (!isCmsEnabled()) return null;
  try {
    return await cmsFetch<{ status: string; counts: Record<string, number> }>("/seo/health");
  } catch {
    return null;
  }
}
