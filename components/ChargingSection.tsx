import Link from "next/link";
import ProductPhoto from "@/components/ProductPhoto";
import ProductShowcaseRow from "@/components/ProductShowcaseRow";
import SectionHeader from "@/components/ui/SectionHeader";
import { chargingOfferings } from "@/lib/charging";
import { productNames } from "@/lib/home-products";

const homePoints = [
  `${productNames.pulse} — 7 kW wallbox, typical 60 km day in about 90 minutes, from KES 79,000`,
  `${productNames.pod} — home charger plus storage for weak-grid evenings, from KES 295,000`,
  `${productNames.spark} — 3.3 kW portable unit in the boot, typical day in about 180 minutes`,
  "Lipa Pole Pole from KES 3,300/month on M-Pesa for Pulse charger and Pod energy storage · three-year aftersale care",
];

const fleetPoints = [
  `${productNames.depot} — 40+ kWh in about 120 minutes while vehicles are parked`,
  `${productNames.boda} — battery swap or kerbside charge in under 5 minutes`,
  "M-Pesa session pay and fleet billing on every bay",
  "Site survey, solar and storage sized to the duty cycle",
];

const highwayPoints = [
  `${productNames.corridor} — about 60 kWh in 30 minutes at highway hubs`,
  "CCS2 DC, live status and M-Pesa on the Charging Hub",
  "Grid, solar and LiFePO₄ storage behind the charger",
  "Live sites labelled live; planned corridors stay labelled planned",
];

const hubStack = [
  {
    title: "Grid + solar + storage",
    text: "E-mobility grid power, rooftop solar and LiFePO₄ batteries keep energy dependable and costs predictable.",
  },
  {
    title: "Corridor DC",
    text: "CCS2 chargers sized for highway dwell — about 60 kWh in 30 minutes, paid with M-Pesa.",
  },
  {
    title: "Built for the stop",
    text: "Safe circulation, shade and amenities — a hub designed around the journey, not a lone charger.",
  },
  {
    title: "Monitored 24/7",
    text: "Live availability, OCPP monitoring and honest recovery when something fails.",
  },
];

const hubOutcomes = [
  { stat: "30 min", label: "about 60 kWh on Corridor charging" },
  { stat: "KES 39", label: "public DC from, per kWh" },
  { stat: "CCS2", label: "highway DC standard" },
  { stat: "M-Pesa", label: "session pay on every product" },
];

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((point) => (
        <li key={point} className="flex items-start gap-2.5 text-sm text-forest-700">
          <svg
            viewBox="0 0 24 24"
            className="mt-0.5 h-4 w-4 shrink-0 text-forest-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {point}
        </li>
      ))}
    </ul>
  );
}

function OfferingProducts({
  products,
}: {
  products: readonly {
    id: string;
    src: string;
    alt: string;
  }[];
}) {
  return (
    <ProductShowcaseRow
      products={products.map((item) => ({
        src: item.src,
        alt: item.alt,
        label: productNames[item.id as keyof typeof productNames],
      }))}
    />
  );
}

export default function ChargingSection() {
  const { routeHub, home, privateSite } = chargingOfferings;

  return (
    <div className="page-container section-pad">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <OfferingProducts products={home.products} />
        <div>
          <p className="text-eyebrow text-xs font-semibold uppercase tracking-widest text-forest-500">
            {home.eyebrow}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-forest-900 sm:text-2xl">
            Pulse charger, Pod energy storage and Spark charger at home
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-forest-600/85">
            Start with the Pulse charger on your wall, add Pod energy storage when you want
            storage for weak-grid evenings, or keep the Spark charger in the boot. A home
            charging day costs about KES 140 instead of ~KES 1,000 in diesel per day, paid with M-Pesa.
          </p>
          <CheckList items={homePoints} />
          <Link
            href="/charging/private-house"
            className="mt-6 inline-flex rounded-full bg-charge-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-charge-500"
          >
            Explore home charging
          </Link>
        </div>
      </div>

      <div className="mt-16 grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <p className="text-eyebrow text-xs font-semibold uppercase tracking-widest text-forest-500">
            {privateSite.eyebrow}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-forest-900 sm:text-2xl">
            Depot charging and Boda Hub for fleets
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-forest-600/85">
            Yards, campuses and last-mile operators get chargers sized to the duty cycle —
            overnight AC at the depot, battery swap for bodas, M-Pesa billing and remote
            monitoring from one partner.
          </p>
          <CheckList items={fleetPoints} />
          <Link
            href="/partners"
            className="mt-6 inline-flex rounded-full border border-forest-200 px-6 py-2.5 text-sm font-semibold text-forest-900 transition-colors hover:bg-forest-50"
          >
            Explore fleet charging
          </Link>
        </div>
        <OfferingProducts products={privateSite.products} />
      </div>

      <div className="mt-16 grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-xl">
          <ProductPhoto
            src={routeHub.image}
            alt={routeHub.imageAlt}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="mx-auto aspect-[4/3] w-full object-contain"
            priority
          />
        </div>
        <div>
          <p className="text-eyebrow text-xs font-semibold uppercase tracking-widest text-forest-500">
            {routeHub.eyebrow}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-forest-900 sm:text-2xl">
            Corridor charging on the highway
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-forest-600/85">
            Precifarm hubs put fast DC where the route needs it. Grid, solar and storage sit
            behind Corridor charging so a typical highway stop adds about 60 kWh in 30
            minutes — then you pay with M-Pesa.
          </p>
          <CheckList items={highwayPoints} />
          <Link
            href="/network"
            className="mt-6 inline-flex rounded-full bg-charge-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-charge-500"
          >
            Open Charging Hub
          </Link>
        </div>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {hubStack.map((h) => (
          <div key={h.title} className="rounded-2xl border border-border bg-muted p-5">
            <h3 className="font-semibold text-forest-900">{h.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-forest-600/80">{h.text}</p>
          </div>
        ))}
      </div>

      <dl className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-white p-6 sm:grid-cols-4 sm:gap-5 sm:p-7">
        {hubOutcomes.map(({ stat, label }) => (
          <div key={label}>
            <dt className="text-lg font-semibold text-forest-600 sm:text-xl">{stat}</dt>
            <dd className="mt-1 text-sm text-forest-600">{label}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-16 rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
        <p className="text-eyebrow text-xs font-semibold uppercase tracking-widest text-charge-600">
          Engineering package
        </p>
        <h2 className="mt-2 text-xl font-semibold text-forest-900 sm:text-2xl">
          Solar chargers and stations — design basis
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-forest-600">
          Energy model, typical site plan, Kenya Power hold points and a phased task sheet
          for home hybrid, fleet depots and highway hubs. Concept reference — not construction
          drawings.
        </p>
        <Link
          href="/charging/engineering"
          className="mt-6 inline-flex rounded-full bg-charge-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-charge-500"
        >
          Download the engineering package
        </Link>
      </div>
    </div>
  );
}
