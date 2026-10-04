/** Public product / site status labels — keep aligned with docs/CANON.md */

export type ProductStatusKind = "available" | "pilot" | "concept" | "quotation";

export const productStatusCopy: Record<
  ProductStatusKind,
  { label: string; className: string }
> = {
  available: {
    label: "Available",
    className: "bg-green-50 text-green-900 ring-green-200",
  },
  pilot: {
    label: "Pilot",
    className: "bg-amber-50 text-amber-950 ring-amber-200",
  },
  concept: {
    label: "Concept",
    className: "bg-muted text-forest-700 ring-border",
  },
  quotation: {
    label: "Quotation",
    className: "bg-sky-50 text-sky-950 ring-sky-200",
  },
};
