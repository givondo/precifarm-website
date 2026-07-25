import { NextResponse } from "next/server";
import { CmsError, isCmsEnabled } from "@/lib/cms";

const CMS_API_URL = process.env.CMS_API_URL?.replace(/\/$/, "") ?? "";
const INGEST_KEY = process.env.ANALYTICS_INGEST_KEY?.trim();

/** Proxy client error reports to CMS analytics_errors ingest. */
export async function POST(request: Request) {
  if (!isCmsEnabled()) {
    return NextResponse.json({ data: { accepted: 0, skipped: true } });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (INGEST_KEY) headers["X-Analytics-Key"] = INGEST_KEY;

    const res = await fetch(`${CMS_API_URL}/v1/analytics/errors`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const json = await res.json();
    if (!res.ok) {
      const message =
        typeof json.error === "object" && json.error?.message
          ? json.error.message
          : "Error ingest failed.";
      return NextResponse.json({ error: message }, { status: res.status });
    }

    return NextResponse.json(json);
  } catch (err) {
    const message = err instanceof CmsError ? err.message : "Could not reach analytics server.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
