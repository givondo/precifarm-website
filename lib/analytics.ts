/**
 * First-party analytics — UTM capture, session IDs, ingest via website API proxy.
 */

export type AnalyticsEnvironment = "development" | "staging" | "production";

export type BookingAnalyticsPayload = {
  anonymousId?: string;
  sessionId?: string;
  acquisitionSource?: string;
  acquisitionMedium?: string;
  acquisitionCampaign?: string;
  acquisitionTerm?: string;
  acquisitionContent?: string;
};

type EventProps = Record<string, string | number | boolean | null | undefined>;

const COOKIE_ANON = "pf_anon_id";
const COOKIE_SESSION = "pf_session_id";
const STORAGE_FIRST_TOUCH = "pf_first_touch";
const SESSION_MAX_AGE = 30 * 60;
const ANON_MAX_AGE = 365 * 24 * 60 * 60;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getCookie(name: string): string | undefined {
  if (!isBrowser()) return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function setCookie(name: string, value: string, maxAgeSeconds: number): void {
  if (!isBrowser()) return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secure}`;
}

export function getAnalyticsEnvironment(): AnalyticsEnvironment {
  const pub = process.env.NEXT_PUBLIC_ANALYTICS_ENVIRONMENT?.trim();
  if (pub === "production" || pub === "staging" || pub === "development") return pub;
  return process.env.NODE_ENV === "production" ? "production" : "development";
}

export function getAnonymousId(): string {
  if (!isBrowser()) return newId();
  let id = getCookie(COOKIE_ANON);
  if (!id) {
    id = newId();
    setCookie(COOKIE_ANON, id, ANON_MAX_AGE);
  }
  return id;
}

export function getSessionId(): string {
  if (!isBrowser()) return newId();
  let id = getCookie(COOKIE_SESSION);
  if (!id) {
    id = newId();
  }
  setCookie(COOKIE_SESSION, id, SESSION_MAX_AGE);
  return id;
}

type FirstTouch = {
  acquisitionSource?: string;
  acquisitionMedium?: string;
  acquisitionCampaign?: string;
  acquisitionTerm?: string;
  acquisitionContent?: string;
};

function readFirstTouch(): FirstTouch | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_FIRST_TOUCH);
    return raw ? (JSON.parse(raw) as FirstTouch) : null;
  } catch {
    return null;
  }
}

function writeFirstTouch(data: FirstTouch): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_FIRST_TOUCH, JSON.stringify(data));
  } catch {
    /* quota / private mode */
  }
}

/** Capture UTM params from URL — first touch never overwritten. */
export function captureUtmFromUrl(search?: string): void {
  if (!isBrowser()) return;
  const params = new URLSearchParams(search ?? window.location.search);
  const source = params.get("utm_source") ?? undefined;
  const medium = params.get("utm_medium") ?? undefined;
  const campaign = params.get("utm_campaign") ?? undefined;
  if (!source && !medium && !campaign) return;

  const touch: FirstTouch = {
    acquisitionSource: source,
    acquisitionMedium: medium,
    acquisitionCampaign: campaign,
    acquisitionTerm: params.get("utm_term") ?? undefined,
    acquisitionContent: params.get("utm_content") ?? undefined,
  };

  if (!readFirstTouch()) {
    writeFirstTouch(touch);
  }

  trackEvent("website_utm_captured", {
    utm_source: source ?? "",
    utm_medium: medium ?? "",
    utm_campaign: campaign ?? "",
  });
}

export function getBookingAnalyticsPayload(): BookingAnalyticsPayload {
  const first = readFirstTouch();
  return {
    anonymousId: getAnonymousId(),
    sessionId: getSessionId(),
    acquisitionSource: first?.acquisitionSource,
    acquisitionMedium: first?.acquisitionMedium,
    acquisitionCampaign: first?.acquisitionCampaign,
    acquisitionTerm: first?.acquisitionTerm,
    acquisitionContent: first?.acquisitionContent,
  };
}

function buildEvent(name: string, props?: EventProps) {
  return {
    event_id: newId(),
    event_name: name,
    schema_version: 1,
    event_timestamp: new Date().toISOString(),
    anonymous_id: getAnonymousId(),
    session_id: getSessionId(),
    platform: "web" as const,
    environment: getAnalyticsEnvironment(),
    page_url: isBrowser() ? window.location.pathname + window.location.search : undefined,
    event_properties: Object.fromEntries(
      Object.entries(props ?? {}).filter(([, v]) => v !== undefined)
    ) as Record<string, string | number | boolean | null>,
  };
}

/** Send event to website proxy → CMS ingest. Fire-and-forget. */
export function trackEvent(name: string, props?: EventProps): void {
  if (!isBrowser()) return;
  const payload = buildEvent(name, props);
  void fetch("/api/analytics/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    /* silent — analytics must not break UX */
  });
}

export function trackPageView(pathname: string): void {
  trackEvent("website_page_viewed", { page: pathname });
}

export function initWebsiteSession(): void {
  if (!isBrowser()) return;
  captureUtmFromUrl();
  getSessionId();
  trackEvent("website_session_started", {
    referrer: document.referrer ? document.referrer.slice(0, 200) : "",
  });
}

/** Report client-side errors to CMS analytics_errors (no PII). */
export function trackClientError(
  message: string,
  category = "client_error",
  metadata?: EventProps
): void {
  if (!isBrowser()) return;
  void fetch("/api/analytics/errors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: message.slice(0, 500),
      platform: "web",
      environment: getAnalyticsEnvironment(),
      error_category: category,
      severity: "error",
      endpoint: window.location.pathname,
      anonymous_id: getAnonymousId(),
      metadata: metadata ?? {},
    }),
    keepalive: true,
  }).catch(() => {
    /* silent */
  });
}

export function initClientErrorHandlers(): void {
  if (!isBrowser()) return;
  window.addEventListener("error", (event) => {
    trackClientError(event.message || "Unknown error", "uncaught_exception", {
      source: event.filename ? event.filename.slice(-120) : "",
      line: event.lineno ?? 0,
    });
  });
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    const message =
      reason instanceof Error
        ? reason.message
        : typeof reason === "string"
          ? reason
          : "Unhandled promise rejection";
    trackClientError(message, "unhandled_rejection");
  });
}
