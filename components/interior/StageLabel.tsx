/**
 * Maturity and evidence labels for interior pages. Use one wherever a page shows a product,
 * site, figure or visual whose status a reader could otherwise mistake for operational.
 */
export type StageKind =
  | "available"
  | "development"
  | "pilot"
  | "proposed"
  | "simulation"
  | "planned"
  | "partner-site"
  | "illustrative";

export const stageCopy: Record<StageKind, { label: string; meaning: string }> = {
  available: { label: "Available", meaning: "Sold today after a site survey, installed and supported by Precifarm." },
  development: { label: "In development", meaning: "Engineered and documented, not yet released for sale. Figures are design targets." },
  pilot: { label: "Pilot development", meaning: "Being prepared for a first site. Not yet a general offer." },
  proposed: { label: "Proposed configuration", meaning: "A planned station layout. Not an installed or certified site." },
  simulation: { label: "Research simulation", meaning: "An illustrative model from Precifarm R&D. Not hardware or measured data." },
  planned: { label: "Planned", meaning: "Shown for planning only. No live service yet." },
  "partner-site": { label: "Partner site", meaning: "Run by a site partner, not by Precifarm." },
  illustrative: { label: "Illustrative", meaning: "A drawing or render to explain the idea, not a photograph of an installation." },
};

const light: Record<StageKind, string> = {
  available: "bg-status-available-bg text-status-available ring-status-available-ring",
  development: "bg-status-development-bg text-status-development ring-status-development-ring",
  pilot: "bg-status-pilot-bg text-status-pilot ring-status-pilot-ring",
  proposed: "bg-white text-forest-700 ring-forest-300",
  simulation: "bg-amber-50 text-amber-900 ring-amber-200",
  planned: "bg-forest-50 text-forest-700 ring-forest-200",
  "partner-site": "bg-white text-forest-700 ring-forest-200",
  illustrative: "bg-white/90 text-forest-700 ring-forest-200",
};

const dark: Record<StageKind, string> = {
  available: "bg-brand-400/15 text-brand-300 ring-brand-400/40",
  development: "bg-sky-300/10 text-sky-200 ring-sky-300/30",
  pilot: "bg-amber-300/10 text-amber-200 ring-amber-300/30",
  proposed: "bg-white/5 text-white/80 ring-white/30",
  simulation: "bg-amber-300/10 text-amber-200 ring-amber-300/40",
  planned: "bg-white/5 text-white/75 ring-white/25",
  "partner-site": "bg-white/5 text-white/80 ring-white/25",
  illustrative: "bg-black/40 text-white/85 ring-white/25",
};

/**
 * Product maturity is carried by the wording and calls to action, not by chips (David, 6 Nov 2026,
 * HD-051): available, development and pilot render nothing. Labels that stop a render, a planned
 * site or a model being mistaken for something installed or measured still show.
 */
const HIDDEN: ReadonlySet<StageKind> = new Set<StageKind>(["available", "development", "pilot"]);

export default function StageLabel({
  kind,
  label,
  tone = "light",
  className = "",
}: {
  kind: StageKind;
  label?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (HIDDEN.has(kind)) return null;
  const meta = stageCopy[kind];
  return (
    <span
      title={meta.meaning}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase leading-none tracking-wide ring-1 ring-inset ${(tone === "dark" ? dark : light)[kind]} ${className}`}
    >
      {label ?? meta.label}
    </span>
  );
}
