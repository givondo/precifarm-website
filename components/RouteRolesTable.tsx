import { StageLabel, type StageKind } from "@/components/interior";
import { aboutPage } from "@/lib/about-page";

export const routeRoles = aboutPage.roles;

/** Responsibility matrix: what Precifarm does and what partners keep, per programme. A table from md up. */
export default function RouteRolesTable() {
  const { roles } = aboutPage;
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-border">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">Responsibilities of Precifarm and of partners for each programme</caption>
        <thead className="hidden bg-[#fbfbfc] md:table-header-group">
          <tr className="border-b border-border text-[11px] font-semibold uppercase tracking-widest text-forest-500">
            <th scope="col" className="w-[24%] px-5 py-3 font-semibold">
              Programme
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              Precifarm
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              Partners keep
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {roles.map((row) => (
            <tr key={row.layer} className="block px-5 py-5 md:table-row md:p-0">
              <th scope="row" className="block align-top font-normal md:table-cell md:px-5 md:py-5">
                <span className="block font-display text-base font-semibold text-forest-950">{row.layer}</span>
                {row.stage ? <StageLabel kind={row.stage as StageKind} className="mt-2" /> : null}
              </th>
              <td className="mt-4 block align-top leading-relaxed text-forest-700 md:table-cell md:px-5 md:py-5">
                <span className="mb-1 block text-[11px] font-semibold uppercase tracking-widest text-forest-500 md:hidden">Precifarm</span>
                {row.precifarm}
              </td>
              <td className="mt-4 block align-top leading-relaxed text-forest-700 md:table-cell md:border-l md:border-border md:bg-[#fbfbfc] md:px-5 md:py-5">
                <span className="mb-1 block text-[11px] font-semibold uppercase tracking-widest text-forest-500 md:hidden">Partners keep</span>
                {row.partners}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
