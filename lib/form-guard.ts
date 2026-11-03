import { clientIp, createRateLimiter } from "@/lib/rate-limit";

/** Name of the hidden field real visitors never see or fill. Keep in sync with components/forms/HoneypotField.tsx. */
export const HONEYPOT_FIELD = "website";

/** Public form posts: 5 per 10 minutes per address is ample for a person, low for a script. */
const formLimiter = createRateLimiter({ requests: 5, windowMs: 10 * 60 * 1000 });

export type GuardResult =
  | { ok: true; body: Record<string, unknown> }
  | { ok: false; kind: "rate-limited" | "bot" | "invalid" };

/**
 * Screens a parsed form body before it is forwarded to the CMS.
 * The honeypot field is always removed so the CMS never receives it.
 */
export function guardFormSubmission(
  request: Request,
  body: unknown,
  limited: (key: string) => boolean = formLimiter,
): GuardResult {
  if (limited(clientIp(request))) return { ok: false, kind: "rate-limited" };
  if (!body || typeof body !== "object" || Array.isArray(body)) return { ok: false, kind: "invalid" };
  const { [HONEYPOT_FIELD]: trap, ...rest } = body as Record<string, unknown>;
  if (typeof trap === "string" && trap.trim() !== "") return { ok: false, kind: "bot" };
  return { ok: true, body: rest };
}
