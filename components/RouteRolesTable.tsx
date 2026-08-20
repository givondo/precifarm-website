import SectionHeader from "@/components/ui/SectionHeader";

export const routeRoles = [
  {
    layer: "Home charging",
    precifarm:
      "Precifarm surveys, installs and supports Pulse charger, Pod energy storage and Spark charger at private houses — Lipa Pole Pole on M-Pesa and three-year aftersale care.",
    partners:
      "Homeowners provide site access and approve the installation scope. Precifarm delivers hardware, commissioning and ongoing support.",
  },
  {
    layer: "Charging hubs",
    precifarm:
      "Precifarm builds, owns and operates Corridor charging on key routes, sells energy and guarantees uptime on commissioned sites.",
    partners:
      "Site hosts provide land or location rights, and may co-invest where the economics fit.",
  },
  {
    layer: "Fleet charging",
    precifarm:
      "Precifarm designs Depot charging stations and Boda Hub swaps, with M-Pesa billing and remote monitoring.",
    partners:
      "Fleet and boda operators keep vehicles, riders and dispatch. Precifarm owns the energy layer.",
  },
  {
    layer: "Highway operations",
    precifarm:
      "Precifarm publishes live hub status, session metering and M-Pesa. Passenger booking on Nairobi–Kisumu is a companion surface, not the charging product.",
    partners:
      "Licensed operators own buses, employ drivers and hold PSV licences and passenger insurance.",
  },
] as const;

export default function RouteRolesTable() {
  return (
    <div>
      <SectionHeader
        eyebrow="Roles"
        title="Who does what"
        description="Clear responsibilities from the home wallbox to the highway hub — partners run vehicles, Precifarm runs charging."
        className="mb-8"
      />
      <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-forest-800 text-white">
              <tr>
                <th className="px-5 py-4 font-semibold sm:px-6">Layer</th>
                <th className="px-5 py-4 font-semibold sm:px-6">Precifarm</th>
                <th className="px-5 py-4 font-semibold sm:px-6">Partners</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {routeRoles.map((row) => (
                <tr key={row.layer}>
                  <td className="px-5 py-5 font-medium text-forest-900 sm:px-6">
                    {row.layer}
                  </td>
                  <td className="px-5 py-5 leading-relaxed text-forest-600/85 sm:px-6">
                    {row.precifarm}
                  </td>
                  <td className="px-5 py-5 leading-relaxed text-forest-600/85 sm:px-6">
                    {row.partners}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
