import { NextResponse } from "next/server";
import { cmsGetHealth, CmsError, isCmsEnabled } from "@/lib/cms";

export async function GET() {
  if (!isCmsEnabled()) {
    return NextResponse.json({
      ok: true,
      paymentMode: "demo" as const,
      cmsEnabled: false,
    });
  }

  try {
    const data = await cmsGetHealth();
    return NextResponse.json({ ...data, cmsEnabled: true });
  } catch (err) {
    const message = err instanceof CmsError ? err.message : "Could not reach booking server.";
    const status = err instanceof CmsError ? err.status : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
