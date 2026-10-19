/**
 * ops.precifarm.com serves the Precifarm Agent workspace on its own address.
 * The same Cloud Run service answers it; this decides, per request, whether to
 * show the workspace, pass through what it needs, or send visitors to the main site.
 */

export const OPS_HOST = "ops.precifarm.com";
export const MAIN_ORIGIN = "https://precifarm.com";

export type OpsRoute =
  | { kind: "rewrite"; path: string }
  | { kind: "next" }
  | { kind: "redirect"; url: string };

/** Paths the workspace needs on the ops host. Everything else belongs to the main site. */
const PASS_THROUGH = ["/agent/chat", "/api/agent/", "/legal/", "/sw", "/manifest.webmanifest", "/icon", "/apple-icon"];

export function normaliseHost(raw: string | null | undefined): string {
  return (raw ?? "").split(",")[0].trim().split(":")[0].toLowerCase();
}

export function opsRoute(path: string, search = ""): OpsRoute {
  if (path === "/" || path === "") return { kind: "rewrite", path: "/agent/chat" };
  if (PASS_THROUGH.some((p) => path === p || path.startsWith(p.endsWith("/") ? p : `${p}/`) || path === p.replace(/\/$/, ""))) {
    return { kind: "next" };
  }
  if (path === "/agent") return { kind: "redirect", url: `https://${OPS_HOST}/` };
  return { kind: "redirect", url: `${MAIN_ORIGIN}${path}${search}` };
}
