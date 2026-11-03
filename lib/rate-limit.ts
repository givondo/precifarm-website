/**
 * Best-effort, per-instance sliding-window limiter. Each Cloud Run instance keeps its own
 * counts, so the real ceiling scales with instance count; it stops a single client from
 * flooding a route, not a distributed attack.
 */
export function createRateLimiter({ requests, windowMs }: { requests: number; windowMs: number }) {
  const hits = new Map<string, number[]>();
  return function limited(key: string, now = Date.now()): boolean {
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
    }
    return recent.length > requests;
  };
}

/** First address in X-Forwarded-For (set by the Cloud Run front end), else "unknown". */
export function clientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}
