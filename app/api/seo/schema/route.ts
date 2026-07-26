import { NextResponse } from "next/server";
import { validateSchema, webPageSchema, globalSchemas } from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/config";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") ?? "/";
  const title = searchParams.get("title") ?? "Precifarm";
  const description = searchParams.get("description") ?? "";

  const schemas = [...globalSchemas(), webPageSchema({ title, description, path })];

  const validation = schemas.map((s) => ({
    type: s["@type"],
    ...validateSchema(s),
  }));

  return NextResponse.json({
    path,
    canonical: absoluteUrl(path),
    schemas,
    validation,
    generatedAt: new Date().toISOString(),
  });
}
