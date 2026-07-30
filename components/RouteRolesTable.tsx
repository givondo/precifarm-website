import SectionHeader from "@/components/ui/SectionHeader";

export const routeRoles = [
  {
    layer: "Charging hubs",
    precifarm:
      "Precifarm builds, owns and operates charging hubs on key routes, sells energy and guarantees uptime.",
    partners:
      "Site hosts provide land or location rights, and may co-invest where the economics fit.",
  },
  {
    layer: "Operating network",
    precifarm:
      "Precifarm manages the brand, timetable, tickets, booking, payments and passenger service data.",
    partners:
      "Coach operators provide vehicles, drivers, PSV licences and passenger insurance on the published schedule.",
  },
  {
    layer: "Partner mobility",
    precifarm:
      "Precifarm aggregates passenger demand, coordinates charging windows and sets the service standards passengers book against.",
    partners:
      "Licensed operators own and maintain Yutong U12 city buses and U18 intercity coaches, delivering the in-cabin experience on each departure.",
  },
  {
    layer: "Fleet and cargo",
    precifarm:
      "Precifarm coordinates ET01 fleet charging, daytime hub access and fleet invoicing on the same network as passenger routes.",
    partners:
      "Logistics partners operate ET01 electric cargo vans and retain dispatch and cargo operations while Precifarm provides dependable hub energy.",
  },
  {
    layer: "EV home charging",
    precifarm:
      "Precifarm surveys, designs and installs residential DC fast chargers, integrated with Neura Pod solar and storage where required, and services every system through our regional engineering teams.",
    partners:
      "Homeowners and estates provide site access and approve the installation scope; Precifarm delivers hardware, commissioning and ongoing O&M.",
  },
] as const;

export default function RouteRolesTable() {
  return (
    <div>
      <SectionHeader
        eyebrow="Roles"
        title="Who does what on the route"
        description="Clear responsibilities help passengers get a dependable journey and help partners earn on the route."
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
