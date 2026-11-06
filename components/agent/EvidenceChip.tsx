import type { EvidenceLabel } from "@/lib/agent/tools/engineering";

/** Evidence labels the engineering kernel attaches to every result. */
export const evidenceMeaning: Record<EvidenceLabel, string> = {
  calculated: "Computed by a deterministic tool from the inputs given.",
  estimated: "Computed, but rests on an engineering estimate such as a diversity factor or a default irradiance.",
  assumed: "A value stated as an assumption because the brief did not give it.",
  "needs site check": "Cannot be settled from the desk: an engineer confirms it on site.",
};

const dark: Record<EvidenceLabel, string> = {
  calculated: "border-emerald-400/35 bg-emerald-400/10 text-emerald-200",
  estimated: "border-amber-300/35 bg-amber-300/10 text-amber-200",
  assumed: "border-white/25 bg-white/5 text-white/75",
  "needs site check": "border-rose-300/40 bg-rose-400/10 text-rose-200",
};

const light: Record<EvidenceLabel, string> = {
  calculated: "border-emerald-700/25 bg-emerald-50 text-emerald-900",
  estimated: "border-amber-700/25 bg-amber-50 text-amber-900",
  assumed: "border-forest-300 bg-white text-forest-700",
  "needs site check": "border-rose-700/25 bg-rose-50 text-rose-900",
};

export default function EvidenceChip({ label, tone = "dark", className = "" }: { label: EvidenceLabel; tone?: "dark" | "light"; className?: string }) {
  return (
    <span
      title={evidenceMeaning[label]}
      className={`inline-flex shrink-0 items-center whitespace-nowrap rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase leading-none tracking-wider ${(tone === "dark" ? dark : light)[label]} ${className}`}
    >
      {label}
    </span>
  );
}
