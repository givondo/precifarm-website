import Link from "next/link";
import StageLabel from "@/components/interior/StageLabel";
import type { ChargingSegment, ChargingSegmentId } from "@/lib/charging";

type Row = { label: string; cells: Record<ChargingSegmentId, string> };

/** Four products against the same questions: a table from lg up, one sheet per product on phones. */
export default function ChargingComparison({ segments, rows }: { segments: readonly ChargingSegment[]; rows: readonly Row[] }) {
  return (
    <>
      <div className="hidden overflow-hidden rounded-2xl ring-1 ring-border lg:block">
        <table className="w-full table-fixed border-collapse text-left text-sm">
          <caption className="sr-only">Precifarm charging products compared</caption>
          <colgroup>
            <col className="w-[16%]" />
            {segments.map((s) => (
              <col key={s.id} className="w-[21%]" />
            ))}
          </colgroup>
          <thead>
            <tr className="bg-[#f6f7f8] align-top">
              <td className="px-4 py-4" />
              {segments.map((s) => (
                <th key={s.id} scope="col" className="px-4 py-4 font-normal">
                  <span className="block text-[11px] font-semibold uppercase tracking-widest text-charge-600">{s.where}</span>
                  <Link href={s.primary.href} className="mt-1 block text-base font-semibold text-forest-900 hover:underline">
                    {s.product}
                  </Link>
                  <StageLabel kind={s.stage} className="mt-2" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-border align-top">
                <th scope="row" className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-forest-500">
                  {r.label}
                </th>
                {segments.map((s) => (
                  <td key={s.id} className="px-4 py-3.5 leading-relaxed text-forest-800">
                    {r.cells[s.id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid items-start gap-4 sm:grid-cols-2 lg:hidden">
        {segments.map((s, i) => (
          <details key={s.id} open={i === 0} className="group overflow-hidden rounded-2xl ring-1 ring-border">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 bg-[#f6f7f8] px-4 py-3 [&::-webkit-details-marker]:hidden">
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold uppercase tracking-widest text-charge-600">{s.where}</span>
                <span className="block text-base font-semibold text-forest-900">{s.product}</span>
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <StageLabel kind={s.stage} />
                <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4 text-forest-500 transition-transform group-open:rotate-180">
                  <path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </summary>
            <dl className="divide-y divide-border px-4">
              {rows.map((r) => (
                <div key={r.label} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 py-3">
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-forest-500">{r.label}</dt>
                  <dd className="text-sm leading-snug text-forest-800">{r.cells[s.id]}</dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-border px-4 py-2">
              <Link href={s.primary.href} className="inline-flex min-h-11 items-center text-sm font-semibold">
                {s.primary.label} <span aria-hidden className="ml-1">›</span>
              </Link>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
