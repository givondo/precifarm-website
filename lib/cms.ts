/**
 * Optional proxy to the Precifarm CMS (SEO content, contact, survey).
 * When CMS_API_URL is set, Next.js API routes forward to the CMS.
 */

const CMS_API_URL = process.env.CMS_API_URL?.replace(/\/$/, "") ?? "";

export function isCmsEnabled(): boolean {
  return Boolean(CMS_API_URL);
}

type CmsErrorBody = {
  error?: { message?: string; code?: string } | string;
};

export class CmsError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function cmsFetch<T>(
  path: string,
  init?: RequestInit,
  options?: { revalidate?: number },
): Promise<T> {
  if (!CMS_API_URL) {
    throw new CmsError("CMS_API_URL is not configured.", 503);
  }

  const url = `${CMS_API_URL}/v1${path.startsWith("/") ? path : `/${path}`}`;
  const method = init?.method?.toUpperCase() ?? "GET";
  const cacheInit =
    method !== "GET"
      ? { cache: "no-store" as const }
      : options?.revalidate != null
        ? { next: { revalidate: options.revalidate } }
        : { cache: "no-store" as const };

  const res = await fetch(url, {
    ...init,
    ...cacheInit,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  let json: { data?: T } & CmsErrorBody;
  try {
    json = (await res.json()) as { data?: T } & CmsErrorBody;
  } catch {
    throw new CmsError("Invalid response from CMS.", res.status);
  }

  if (!res.ok) {
    const err = json.error;
    const message =
      typeof err === "string"
        ? err
        : err?.message ?? "CMS request failed.";
    throw new CmsError(message, res.status);
  }

  return json.data as T;
}

export async function cmsGetHealth() {
  return cmsFetch<{
    ok: boolean;
    paymentMode: string;
    mpesaEnvironment?: string;
    callbackHost?: string | null;
  }>("/health");
}
