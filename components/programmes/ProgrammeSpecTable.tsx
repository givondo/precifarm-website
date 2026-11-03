import type { Programme } from "@/lib/programmes";

/** Specification table generated from the PRECIFARM_MASTER engineering register (approved public claims only). */
export default function ProgrammeSpecTable({ programme, title = "Specification" }: { programme: Programme; title?: string }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-forest-900">{title}</h2>
      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">{programme.name} specification</caption>
          <thead className="bg-muted/40 text-[11px] uppercase tracking-widest text-forest-500">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold sm:px-6">Item</th>
              <th scope="col" className="px-4 py-3 font-semibold sm:px-6">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {programme.claims.map((c) => (
              <tr key={c.spec_id} className="align-top">
                <th scope="row" className="px-4 py-3 font-medium text-forest-900 sm:px-6">{c.label}</th>
                <td className="px-4 py-3 text-forest-700 sm:px-6">{c.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
