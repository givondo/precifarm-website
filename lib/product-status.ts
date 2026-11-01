/** Public product / site status labels. Keep aligned with docs/CANON.md and the PRECIFARM_MASTER maturity register. */

export type ProductStatusKind = "available" | "pilot" | "development" | "research" | "concept" | "quotation";

export const productStatusCopy: Record<
  ProductStatusKind,
  { label: string; className: string; meaning: string }
> = {
  available: {
    label: "Available",
    className: "bg-green-50 text-green-900 ring-green-200",
    meaning: "Sold today through a site survey, with installation and aftersale care.",
  },
  pilot: {
    label: "Pilot",
    className: "bg-amber-50 text-amber-950 ring-amber-200",
    meaning: "Being commissioned or run at named pilot sites. Not yet a general offer.",
  },
  development: {
    label: "In development",
    className: "bg-sky-50 text-sky-950 ring-sky-200",
    meaning: "Engineered and documented, not yet released for sale. Figures are design targets.",
  },
  research: {
    label: "Research",
    className: "bg-muted text-forest-700 ring-border",
    meaning: "A research programme. Not a product and not for sale.",
  },
  concept: {
    label: "Concept",
    className: "bg-muted text-forest-700 ring-border",
    meaning: "Design intent only.",
  },
  quotation: {
    label: "Quotation",
    className: "bg-sky-50 text-sky-950 ring-sky-200",
    meaning: "Priced per site after a survey.",
  },
};
