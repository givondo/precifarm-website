import SiteImage from "@/components/SiteImage";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { chargingOfferings } from "@/lib/charging";

const hubStack = [
  {
    title: "Grid + solar + storage",
    text: "E-mobility grid power, rooftop solar and LiFePO₄ batteries keep energy dependable and costs predictable.",
  },
  {
    title: "DC fast charging",
    text: "Modular CCS2 chargers with reserved windows for scheduled coaches and contracted fleet demand.",
  },
  {
    title: "Built for dwell",
    text: "Safe passenger circulation, shade and amenities — a stop designed around a timetable, not a lone charger.",
  },
  {
    title: "Monitored 24/7",
    text: "Live availability, OCPP monitoring and honest recovery when something fails — because uptime is what passengers and operators depend on.",
  },
];

const hubOutcomes = [
  { stat: "≤150 km", label: "planning guide between dependable charges" },
  { stat: "24/7", label: "hub monitoring and status updates" },
  { stat: "CCS2", label: "open fast-charging standard for any capable vehicle" },
  { stat: "1 hub", label: "proves Nairobi–Kisumu before the next route is financed" },
];

const homeChargingPoints = [
  "DC fast charging for homes, apartments and gated estates",
  "Integration with Neura Pod solar and LiFePO₄ storage where the site needs it",
  "Site survey, installation and commissioning by the same regional crew that services our hubs",
  "Five-year engineering support from Nairobi, Mombasa, Kisumu, Eldoret, Kitui and Nakuru",
];

const privateChargingPoints = [
  "Dedicated in-house charging stations for schools, clinics, campuses and industrial sites",
  "Multi-point DC charging sized to fleet, staff and visitor demand on private property",
  "Solar, storage and grid integration designed in a written engineering assessment",
  "O&M contract with monitoring, billing and uptime standards matched to your operation",
];

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((point) => (
        <li key={point} className="flex items-start gap-2.5 text-sm text-forest-700">
          <svg
            viewBox="0 0 24 24"
            className="mt-0.5 h-4 w-4 shrink-0 text-charge-600"
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

function OfferingImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border shadow-xl">
      <SiteImage
        src={src}
        alt={alt}
        width={1200}
        height={900}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="aspect-[4/3] w-full object-cover"
        priority={priority}
      />
    </div>
  );
}

export default function ChargingSection() {
  const { routeHub, home, privateSite } = chargingOfferings;

  return (
    <div className="page-container section-pad">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <SectionHeader
            eyebrow={routeHub.eyebrow}
            title="Precifarm hubs are the petrol stations of the electric age, designed around a reliable timetable"
            description="Every Precifarm hub is an energy stop, not a lone charger. Grid power, solar, battery storage and DC fast charging come together with safe passenger dwell, live monitoring and reserved charging windows for scheduled departures."
          />
          <p className="mt-4 leading-relaxed text-forest-600/85">
            We place hubs where intercity routes need them — sized to contracted
            demand, approved on power and site control, and operated to keep
            coaches, vans and fleets moving on time.
          </p>
          <Link
            href="/network"
            className="mt-8 inline-flex rounded-full border border-forest-200 px-6 py-2.5 text-sm font-semibold text-forest-900 transition-colors hover:bg-forest-50"
          >
            Explore the Charge Map
          </Link>
        </div>
        <OfferingImage
          src={routeHub.image}
          alt={routeHub.imageAlt}
          priority
        />
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {hubStack.map((h) => (
          <div key={h.title} className="rounded-2xl border border-border bg-muted p-5">
            <h3 className="font-semibold text-forest-900">{h.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-forest-600/80">{h.text}</p>
          </div>
        ))}
      </div>

      <dl className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-forest-900 p-6 text-white sm:grid-cols-4 sm:gap-5 sm:p-7">
        {hubOutcomes.map(({ stat, label }) => (
          <div key={label}>
            <dt className="text-lg font-semibold text-charge-400 sm:text-xl">{stat}</dt>
            <dd className="mt-1 text-sm text-white/65">{label}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-16 grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <OfferingImage src={home.image} alt={home.imageAlt} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-charge-600">
            {home.eyebrow}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-forest-900 sm:text-2xl">
            Residential DC fast charging with the same engineering team that builds our route hubs
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-forest-600/85">
            Precifarm installs EV home charging where owners want dependable overnight
            top-up — as a standalone DC charger or integrated with Neura Pod solar and
            storage on the property.
          </p>
          <CheckList items={homeChargingPoints} />
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-charge-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-charge-500"
          >
            Request a home charging survey
          </Link>
        </div>
      </div>

      <div className="mt-16 grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-charge-600">
            {privateSite.eyebrow}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-forest-900 sm:text-2xl">
            In-house charging stations for schools, estates, campuses and industrial sites
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-forest-600/85">
            Private entities that run fleets, staff transport or visitor parking can
            install dedicated in-house charging stations on their own land — sized in a
            written engineering assessment and operated under a Precifarm O&M contract.
          </p>
          <CheckList items={privateChargingPoints} />
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full border border-forest-200 px-6 py-2.5 text-sm font-semibold text-forest-900 transition-colors hover:bg-forest-50"
          >
            Discuss a private charging station
          </Link>
        </div>
        <div className="lg:order-2">
          <OfferingImage src={privateSite.image} alt={privateSite.imageAlt} />
        </div>
      </div>
    </div>
  );
}
