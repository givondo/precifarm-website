import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { OPS_HOST, normaliseHost, opsRoute } from "@/lib/agent/ops-host";

const CANONICAL_HOST = "precifarm.com";

/** Canonical host: apex only, www to precifarm.com (301). ops.precifarm.com serves the Agent workspace. */
export function proxy(request: NextRequest) {
  const rawHost =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    "";
  const host = normaliseHost(rawHost);

  if (host === OPS_HOST) {
    const route = opsRoute(request.nextUrl.pathname, request.nextUrl.search);
    if (route.kind === "redirect") return NextResponse.redirect(route.url, 301);
    const res =
      route.kind === "rewrite"
        ? NextResponse.rewrite(new URL(route.path + request.nextUrl.search, request.url))
        : NextResponse.next();
    // The workspace lives at precifarm.com/agent/chat for search engines; keep the ops host out of the index.
    res.headers.set("X-Robots-Tag", "noindex, follow");
    return res;
  }

  if (host === `www.${CANONICAL_HOST}`) {
    const dest = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      `https://${CANONICAL_HOST}`,
    );
    return NextResponse.redirect(dest, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
