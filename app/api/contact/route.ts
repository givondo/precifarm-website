import { NextResponse } from "next/server";
import { CmsError, cmsFetch, isCmsEnabled } from "@/lib/cms";

/** Proxy contact form to CMS. */
export async function POST(request: Request) {
  if (!isCmsEnabled()) {
    return NextResponse.json(
      { error: "Contact form is temporarily unavailable. Please email us directly." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  try {
    const data = await cmsFetch<{
      id: string;
      received: boolean;
      installOrder?: { reference?: string; product?: string; stage?: string; duplicate?: boolean } | null;
    }>("/contact", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    const message = err instanceof CmsError ? err.message : "Could not submit contact form.";
    const status = err instanceof CmsError ? err.status : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
