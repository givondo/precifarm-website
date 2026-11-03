/** Public product / site status labels. Keep aligned with docs/CANON.md and the PRECIFARM_MASTER maturity register. */

export type ProductStatusKind = "available" | "pilot" | "development" | "research" | "concept" | "quotation";

export const productStatusCopy: Record<
  ProductStatusKind,
  { label: string; className: string; meaning: string }
> = {
  available: {
    label: "Available",
    className: "bg-status-available-bg text-status-available ring-status-available-ring",
    meaning: "Sold today through a site survey, with installation and aftersale care.",
  },
  pilot: {
    label: "Pilot",
    className: "bg-status-pilot-bg text-status-pilot ring-status-pilot-ring",
    meaning: "Being commissioned or run at named pilot sites. Not yet a general offer.",
  },
  development: {
    label: "In development",
    className: "bg-status-development-bg text-status-development ring-status-development-ring",
    meaning: "Engineered and documented, not yet released for sale. Figures are design targets.",
  },
  research: {
    label: "Research",
    className: "bg-status-research-bg text-status-research ring-status-research-ring",
    meaning: "A research programme. Not a product and not for sale.",
  },
  concept: {
    label: "Concept",
    className: "bg-status-research-bg text-status-research ring-status-research-ring",
    meaning: "Design intent only.",
  },
  quotation: {
    label: "Quotation",
    className: "bg-status-development-bg text-status-development ring-status-development-ring",
    meaning: "Priced per site after a survey.",
  },
};
