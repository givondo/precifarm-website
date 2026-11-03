import { NextResponse } from "next/server";
import { CmsError, cmsFetch, isCmsEnabled } from "@/lib/cms";
import { guardFormSubmission } from "@/lib/form-guard";

/** Proxy home survey intake to CMS install pipeline. */
export async function POST(request: Request) {
  if (!isCmsEnabled()) {
    return NextResponse.json(
      { error: "Survey form is temporarily unavailable. Please call or email us." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const guard = guardFormSubmission(request, body);
  if (!guard.ok) {
    if (guard.kind === "rate-limited")
      return NextResponse.json({ error: "Too many requests. Please wait a few minutes or call us." }, { status: 429 });
    // Bots get the same answer a person would, so the trap is not revealed.
    if (guard.kind === "bot") return NextResponse.json({ received: true, installOrder: null }, { status: 201 });
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    const data = await cmsFetch<{
      received: boolean;
      installOrder?: {
        id?: string;
        reference?: string;
        product?: string;
        stage?: string;
        duplicate?: boolean;
      } | null;
    }>("/installs/survey", {
      method: "POST",
      body: JSON.stringify(guard.body),
    });
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    const message = err instanceof CmsError ? err.message : "Could not submit survey request.";
    const status = err instanceof CmsError ? err.status : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
