/**
 * The six Precifarm programmes and their public specifications.
 *
 * Figures come from lib/generated/product-specs.ts, which is written by
 * PRECIFARM_MASTER (`python tools/pfm.py export-web --out <site>/lib/generated/product-specs.ts`)
 * from each product's PUBLIC_CLAIMS.yaml and CURRENT_SPECIFICATION.yaml. Do not type
 * ratings here by hand: change the engineering register and regenerate.
 */
import specs from "@/lib/generated/product-specs";
import type { ProductStatusKind } from "@/lib/product-status";

export type ProgrammeCode = "PULSE7K2" | "PULSEPLUS" | "CORRIDOR" | "BODAHUB" | "WPT" | "AGENTH";
export type ProgrammeId = "pulse" | "pulsePlus" | "corridor" | "boda" | "wireless" | "harness";
export type Pillar = "energy" | "ai";

export type SpecClaim = {
  label: string;
  text: string;
  spec_id: string;
  evidence: string;
  verification: string;
};

export type Programme = {
  id: ProgrammeId;
  code: ProgrammeCode;
  name: string;
  headline: string;
  status: ProductStatusKind;
  pillar: Pillar;
  href: string;
  summary: string;
  claims: readonly SpecClaim[];
  /** "pending" until David approves the claim list in PRECIFARM_MASTER. */
  approval: string;
};

type Generated = {
  generated: string;
  source_commit?: string;
  products: { code: ProgrammeCode; name: string; headline: string; status: ProductStatusKind; approval: string; claims: SpecClaim[] }[];
};

const generated = specs as unknown as Generated;

const meta: Record<ProgrammeCode, { id: ProgrammeId; pillar: Pillar; href: string; summary: string }> = {
  PULSE7K2: {
    id: "pulse",
    pillar: "energy",
    href: "/charging/home",
    summary: "The home wallbox. Surveyed, installed and looked after by one team, with Lipa Pole Pole instalments on M-Pesa.",
  },
  PULSEPLUS: {
    id: "pulsePlus",
    pillar: "energy",
    href: "/charging/pulse-plus",
    summary: "The three-phase member of the Pulse family for fleet yards, workplaces, apartments and partner sites.",
  },
  CORRIDOR: {
    id: "corridor",
    pillar: "energy",
    href: "/charging/corridor",
    summary: "DC fast charging for highways and towns from a certified OEM charger of 120 to 180 kW under the Precifarm brand, engineered around each site's grid.",
  },
  BODAHUB: {
    id: "boda",
    pillar: "energy",
    href: "/charging/boda-hub",
    summary: "Battery swapping for electric motorcycles: tap or pay on M-Pesa, take a charged pack and ride on.",
  },
  WPT: {
    id: "wireless",
    pillar: "energy",
    href: "/research/wireless-ev-charging-policy",
    summary: "Research into stationary inductive charging for cars at home and in fleet depots. Not a product.",
  },
  AGENTH: {
    id: "harness",
    pillar: "ai",
    href: "/ai",
    summary: "The platform Precifarm builds its agents on: agent workflows on the hosted AI model that suits each task, with a person approving every result.",
  },
};

/** Programmes published on precifarm.com. AGENTH stays in the engineering register but is not on the site (HD-046). */
const SITE_CODES: ReadonlySet<ProgrammeCode> = new Set<ProgrammeCode>(["PULSE7K2", "PULSEPLUS", "CORRIDOR", "BODAHUB", "WPT"]);

export const programmes: readonly Programme[] = generated.products.filter((p) => SITE_CODES.has(p.code)).map((p) => ({
  ...meta[p.code],
  code: p.code,
  name: p.name,
  headline: p.headline,
  status: p.status,
  claims: p.claims,
  approval: p.approval,
}));

export function programme(id: ProgrammeId): Programme {
  const p = programmes.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown programme ${id}`);
  return p;
}

export const programmeSpecsGenerated = generated.generated;
export const programmeSpecsSource = generated.source_commit ?? "";

/** Plain-language label for how a figure is known. Simulated or calculated values are never shown as tested. */
export function evidenceNote(c: SpecClaim): string {
  if (c.verification === "tested" || c.verification === "certified") return "Tested";
  if (c.evidence === "illustrative") return "Illustrative";
  if (c.evidence === "unknown") return "Not yet measured";
  if (c.evidence === "actual") return "Recorded";
  if (c.verification === "inspected") return "Design value, checked against design files";
  if (c.verification === "calculated" || c.verification === "simulated") return "Design target, calculated";
  return "Design target";
}
