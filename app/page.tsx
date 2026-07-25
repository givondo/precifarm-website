import Link from "next/link";
import BookingCTA from "@/components/BookingCTA";
import SiteImage from "@/components/SiteImage";
import ValueProposition from "@/components/ValueProposition";
import CheckItem from "@/components/ui/CheckItem";
import RouteRolesTable from "@/components/RouteRolesTable";
import SectionHeader from "@/components/ui/SectionHeader";
import VehicleMobilityCard from "@/components/VehicleMobilityCard";
import { chargingCategories } from "@/lib/charging";
import { whyItWorksMetrics } from "@/lib/metrics";
import { vehicles } from "@/lib/vehicles";

const pillars = [
  {
    n: "01",
    label: "Charging hubs",
    title: "Dependable energy for intercity routes",
    text: "We place fast charging, solar and storage where intercity routes actually need them.",
    icon: <path d="M13 2 4.5 13.5H11L9.5 22 19 9.5h-6.5L13 2Z" />,
  },
  {
    n: "02",
    label: "Operating network",
    title: "Schedules, tickets and live route data",
    text: "Our software and service layer turns charging into a journey passengers can book and operators can run to a timetable.",
    icon: <path d="M4 7h16M4 12h10M4 17h7" strokeLinecap="round" />,
  },
  {
    n: "03",
    label: "Partner mobility",
    title: "Yutong U12 and U18 on the network",
    text: "Licensed operators run Yutong U12 city buses and U18 intercity coaches while Precifarm provides the energy, demand and customer experience.",
    icon: <path d="M8 6v12M16 6v12M4 10h16M6 14h12M6 18h12" strokeLinecap="round" />,
  },
];

const valueFor = [
  {
    audience: "Passengers",
    title: "Travel you can plan on",
    points: [
      "Reserved seats on scheduled departures between major cities",
      "Clear fares that do not move every time diesel prices change",
      "Quiet Yutong U18 coaches on intercity routes and SMS updates when plans change",
    ],
  },
  {
    audience: "Operators",
    title: "Energy you can build a timetable around",
    points: [
      "Reserved charging windows before every scheduled departure",
      "Lower measured energy cost per loaded kilometre on electric routes",
      "Ticket demand through Precifarm booking and agent channels",
    ],
  },
  {
    audience: "Partners",
    title: "Infrastructure that earns its place",
    points: [
      "Hubs sized to contracted demand rather than vanity coverage",
      "Revenue share for site hosts and fleet charging for logistics partners",
      "Operating data that shows when the next route is ready to finance",
    ],
  },
];

const plannedRoutes = [
  {
    phase: "Current route",
    route: "Nairobi – Kisumu",
    status: "Current",
    description:
      "Our live intercity route — charging hubs, scheduled partner service and booking for Nairobi–Kisumu.",
    active: true,
  },
  {
    phase: "Phase B",
    route: "Nairobi – Mombasa",
    status: "Next",
    description:
      "The coast route — charging hubs at Mtito Andei, Voi and Mombasa — added once Nairobi–Kisumu passes its utilisation, uptime and partner economics gates.",
    active: false,
  },
  {
    phase: "Phase C",
    route: "Nairobi – Garissa",
    status: "Planned",
    description:
      "An eastern route to northeastern Kenya — scoped only after Nairobi–Kisumu and the coast route are proven repeatable.",
    active: false,
  },
];

const steps = [
  {
    n: "01",
    title: "Place the hub",
    text: "Build charging where demand, power, site control and approvals all check out.",
  },
  {
    n: "02",
    title: "Run the network",
    text: "Publish timetables, sell tickets, take M-Pesa payments and monitor every session.",
  },
  {
    n: "03",
    title: "Partner on mobility",
    text: "Licensed operators run Yutong U12 and U18 coaches plus cargo fleets on energy they can plan around.",
  },
  {
    n: "04",
    title: "Finance the next road",
    text: "Contracted utilisation on one route unlocks the capital and confidence for the next.",
  },
];

export default function Home() {
  return (
    <>
      <BookingCTA hero className="bg-white" />

      <ValueProposition />

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow="How it fits together"
            title="Charging hubs, operating network and partner mobility work as one system"
            description="Precifarm connects dependable energy, scheduled operations and partner-run vehicles so intercity electric travel works end to end."
            className="mb-10"
          />
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-4">
            {pillars.map((p) => (
              <div
                key={p.n}
                className="group card p-5 transition-all hover:-translate-y-0.5 hover:border-charge-500/30 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-charge-600">{p.n}</span>
                  <span className="rounded-full bg-forest-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-forest-500">
                    {p.label}
                  </span>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-900 transition-colors group-hover:bg-charge-600">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="var(--color-charge-300)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {p.icon}
                  </svg>
                </span>
                <h2 className="mt-4 text-lg font-semibold text-forest-900">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-forest-600/80">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-border pt-12">
            <RouteRolesTable />
          </div>
        </div>
      </section>

      <section id="hubs" className="scroll-mt-20 border-b border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow="Charging"
            title="Route hubs, EV home charging and in-house stations for private entities"
            description="Precifarm builds and operates intercity charging hubs, installs residential DC fast charging and designs in-house charging stations for private sites — all through the same engineering and O&M teams."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {chargingCategories.map((item) => (
              <div key={item.title} className="card overflow-hidden">
                <div className="overflow-hidden">
                  <SiteImage
                    src={item.image}
                    alt={item.imageAlt}
                    width={800}
                    height={600}
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-forest-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-forest-600/80">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/charging"
            className="mt-8 inline-flex rounded-full border border-forest-200 px-6 py-2.5 text-sm font-semibold text-forest-900 transition-colors hover:bg-forest-50"
          >
            Explore all charging services
          </Link>
        </div>
      </section>

      <section className="border-b border-border bg-muted section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow="Who benefits"
            title="A single proven route creates value for passengers, operators and partners alike"
            description="Charging hubs provide dependable energy, the operating network turns that into dependable journeys, and everyone on the route shares in the economics."
            className="mb-10"
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {valueFor.map((v) => (
              <div key={v.audience} className="card p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-charge-600">{v.audience}</p>
                <h3 className="mt-2 text-lg font-semibold text-forest-900">{v.title}</h3>
                <ul className="mt-5 space-y-3">
                  {v.points.map((pt) => (
                    <CheckItem key={pt}>{pt}</CheckItem>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-forest-900 section-pad text-white">
        <div className="page-container">
          <SectionHeader
            eyebrow="Why it works"
            title="Electric intercity routes work when energy costs less, diesel stays off the road, and each proven route unlocks the next"
            description="On Nairobi–Kisumu we measure what matters — route scale, energy economics, diesel displacement and contracted hub demand — before financing the network forward."
            inverted
            className="mb-10 max-w-3xl"
          />
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-5">
            {whyItWorksMetrics.map(({ stat, label }) => (
              <div key={label}>
                <dt className="text-2xl font-semibold tracking-tight text-charge-400 sm:text-3xl">
                  {stat}
                </dt>
                <dd className="mt-2 text-sm leading-snug text-white/65">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-pad page-container">
        <SectionHeader
          eyebrow="Partner mobility"
          title="Yutong U12 for within-city travel and Yutong U18 for city-to-city routes"
          description="Partner operators run the right vehicle for each journey — U12 electric buses across urban networks, U18 premium coaches on scheduled intercity routes such as Nairobi–Kisumu, and ET01 electric cargo vans for fleet and logistics on the same hub network."
          className="mb-10"
        />
        <div className="grid gap-5 lg:grid-cols-3">
          <VehicleMobilityCard
            role={vehicles.city.role}
            model={vehicles.city.model}
            summary={vehicles.city.summary}
            image={vehicles.city.image}
            imageAlt={vehicles.city.imageAlt}
          />
          <VehicleMobilityCard
            role={vehicles.intercity.role}
            model={vehicles.intercity.model}
            summary={vehicles.intercity.summary}
            image={vehicles.intercity.image}
            imageAlt={vehicles.intercity.imageAlt}
            featured
          />
          <VehicleMobilityCard
            role={vehicles.cargo.role}
            model={vehicles.cargo.model}
            summary={vehicles.cargo.summary}
            image={vehicles.cargo.image}
            imageAlt={vehicles.cargo.imageAlt}
            imagePosition="object-right"
          />
        </div>
        <Link
          href="/partners"
          className="mt-8 inline-flex rounded-full border border-forest-200 px-6 py-2.5 text-sm font-semibold text-forest-900 hover:bg-forest-50"
        >
          Partner on mobility or fleet charging
        </Link>
      </section>

      <section className="border-t border-border bg-muted section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow="How we scale"
            title="We prove one route fully before we finance and build the next"
            description="Precifarm runs the charging hubs and operating network; partners run the vehicles. Demand from passengers and fleets is what makes the next hub bankable."
            className="mb-10"
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="card p-5">
                <span className="font-mono text-sm font-semibold text-charge-600">{s.n}</span>
                <h3 className="mt-3 font-semibold text-forest-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-600/80">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad page-container">
        <SectionHeader
          eyebrow="Roadmap"
          title="We are starting with Nairobi–Kisumu, then extending to Kenya&rsquo;s highest-value intercity routes"
          className="mb-10"
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {plannedRoutes.map((c) => (
            <div
              key={c.route}
              className={`rounded-2xl border bg-white p-6 ${c.active ? "border-charge-500/30" : "border-border"}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-forest-500">{c.phase}</span>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${
                    c.active
                      ? "border-charge-500/25 bg-charge-500/10 text-charge-600"
                      : "border-border bg-muted text-forest-500"
                  }`}
                >
                  {c.status}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-forest-900">{c.route}</h3>
              <p className="mt-3 text-sm leading-relaxed text-forest-600/80">{c.description}</p>
              {c.active && (
                <a href="#book" className="mt-5 inline-block text-sm font-semibold text-charge-600 hover:text-charge-500">
                  Book Now →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
