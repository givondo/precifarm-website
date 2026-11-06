import type { KenyaEvModel } from "@/lib/kenya-ev-compatibility";
import { kenyaEvCompatibilityPage } from "@/lib/kenya-ev-compatibility";
import { fitLabels, fitTags } from "@/lib/pages/evs";
import { rangeText } from "@/lib/publications";

type KenyaEvComparisonTableProps = {
  models: KenyaEvModel[];
  caption?: string;
};

function times(m: KenyaEvModel) {
  return [
    m.chargingTime.swap ? `Swap ${m.chargingTime.swap.replace("<", "under ")}` : null,
    m.chargingTime.home ? `Home ${m.chargingTime.home}` : null,
    m.chargingTime.dc ? `DC ${m.chargingTime.dc}` : null,
  ].filter(Boolean) as string[];
}

/** Full comparison, all models in one scrollable table. Server-rendered so it reads without JavaScript. */
export default function KenyaEvComparisonTable({ models, caption = kenyaEvCompatibilityPage.caption }: KenyaEvComparisonTableProps) {
  const { columns } = kenyaEvCompatibilityPage;

  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-border">
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={`${caption} (scrolls sideways)`}>
        <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-[#fbfbfc]">
            <tr className="border-b border-border text-[11px] uppercase tracking-widest text-forest-500">
              <th scope="col" className="sticky left-0 z-10 bg-[#fbfbfc] px-4 py-3 font-semibold">
                {columns.model}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                {columns.body}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                {columns.battery}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                {columns.practicalRange}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                {columns.dcCharging}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Daily top-up
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Precifarm fit
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {models.map((m) => (
              <tr key={m.id}>
                <th scope="row" className="sticky left-0 z-10 bg-white px-4 py-3 font-semibold text-forest-950">
                  {m.model}
                </th>
                <td className="px-4 py-3 text-forest-600">{m.body}</td>
                <td className="px-4 py-3 font-mono text-xs text-forest-800">{rangeText(m.battery)}</td>
                <td className="px-4 py-3 font-mono text-xs text-forest-800">{rangeText(m.practicalRange)}</td>
                <td className="px-4 py-3 font-mono text-xs text-forest-800">{rangeText(m.dcCharging)}</td>
                <td className="px-4 py-3 font-mono text-xs text-forest-800">
                  {times(m).map((t) => (
                    <span key={t} className="block whitespace-nowrap">
                      {t}
                    </span>
                  ))}
                </td>
                <td className="px-4 py-3 text-xs text-forest-700">{fitTags(m).map((t) => fitLabels[t]?.product ?? fitLabels[t]?.label ?? t).filter((v, i, a) => a.indexOf(v) === i).join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
