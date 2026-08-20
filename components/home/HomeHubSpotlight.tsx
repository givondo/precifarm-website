import Link from "next/link";
import HubSchematic from "@/components/HubSchematic";

const links = [
  {
    title: "Operators & fleets",
    text: "Depot pedestals, Corridor DC and fleet billing via Lipa Pole Pole.",
    href: "/partners",
    cta: "Partner with us",
  },
  {
    title: "Charging services",
    text: "Route hubs, home DC charging and private-site stations.",
    href: "/charging",
    cta: "Explore charging",
  },
  {
    title: "Charge map",
    text: "See hub locations, live route coverage and expansion targets.",
    href: "/network",
    cta: "View network",
  },
];

export default function HomeHubSpotlight() {
  return (
    <section className="border-b border-border section-pad">
      <div className="page-container">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
          <div className="order-2 lg:order-1">
            <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-forest-500">
              For partners
            </p>
            <h2 className="heading-display mt-3 text-2xl sm:text-3xl">
              Infrastructure for fleets, site hosts and installers
            </h2>
            <p className="mt-4 text-base leading-relaxed text-forest-600">
              Precifarm builds the charging infrastructure and Lipa Pole Pole financing that
              keep EV fleets, site hosts and home installations running — from Pulse charger
              wallboxes to 120 kW Corridor DC.
            </p>
            <ul className="mt-8 space-y-4">
              {links.map((item) => (
                <li
                  key={item.title}
                  className="rounded-xl border border-border bg-white p-4 transition-shadow hover:shadow-md"
                >
                  <h3 className="font-semibold text-forest-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-forest-600">{item.text}</p>
                  <Link
                    href={item.href}
                    className="text-link mt-3 inline-flex text-sm font-semibold"
                  >
                    {item.cta} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-1 overflow-hidden rounded-2xl border border-border bg-white shadow-lg lg:order-2">
            <HubSchematic />
            <p className="border-t border-border px-4 py-2.5 text-center text-[11px] font-medium uppercase tracking-wider text-forest-500">
              Route hub schematic · four integrated layers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
