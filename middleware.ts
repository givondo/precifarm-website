import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "precifarm.com";

/** Canonical host: apex only — www → precifarm.com (301) */
export function middleware(request: NextRequest) {
  const rawHost =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    "";
  const host = rawHost.split(":")[0].toLowerCase();

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
