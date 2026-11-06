/**
 * Read-only access to the approved engineering register export (lib/generated/product-specs.ts)
 * for the charging product pages. Every rating on /charging, /charging/home and
 * /charging/pulse-plus is looked up here by spec id, never typed by hand.
 */
import specs from "@/lib/generated/product-specs";
import { evidenceNote, programme, programmeSpecsGenerated, type ProgrammeId, type SpecClaim } from "@/lib/programmes";
import type { SpecGroup } from "@/components/interior/SpecSheet";

export function registerClaim(id: ProgrammeId, specId: string): SpecClaim {
  const c = programme(id).claims.find((x) => x.spec_id === specId);
  if (!c) throw new Error(`Register claim ${specId} missing for ${id}`);
  return c;
}

/** The claim text only, for facts and comparison cells. */
export const claimText = (id: ProgrammeId, specId: string) => registerClaim(id, specId).text;

/** Every published claim for a programme as one SpecSheet group, with how each figure is known. */
export function registerSpecGroups(id: ProgrammeId, title = "Specification"): SpecGroup[] {
  const p = programme(id);
  return [
    {
      title,
      rows: p.claims.map((c) => ({ label: c.label, value: c.text, note: `${evidenceNote(c)} (${c.spec_id})` })),
    },
  ];
}

/** One line naming the register document a spec sheet comes from. */
export function registerSource(id: ProgrammeId): string {
  const p = programme(id);
  const doc = (specs.products as readonly { code: string; spec_doc: string }[]).find((x) => x.code === p.code)?.spec_doc;
  return `From the Precifarm engineering register${doc ? `, ${doc}` : ""}, exported ${programmeSpecsGenerated}. Figures are design targets until they carry a test record.`;
}
