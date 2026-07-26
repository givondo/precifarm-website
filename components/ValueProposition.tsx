import Link from "next/link";
import CheckItem from "@/components/ui/CheckItem";
import SectionHeader from "@/components/ui/SectionHeader";
import { whyItWorksMetrics } from "@/lib/metrics";

const energyCostMetric = whyItWorksMetrics.find((m) =>
  m.label.includes("energy cost"),
);

const problemPoints = [
  "Electric vehicles are arriving faster than dependable intercity charging",
  "Diesel coaches cost more per kilometre and move with every fuel-price swing",
  "Operators cannot run a timetable on occupied, offline or slow chargers",
  "Passengers have no way to book a dependable electric journey between cities today",
];

const solutionPoints = [
  "Charging hubs placed on routes where scheduled coaches actually need energy",
  "Reserved charging windows aligned to every departure — energy you can plan around",
  "Timetables, M-Pesa tickets and live route data in one operating network",
  "One proof route at a time — Nairobi–Kisumu live before we finance the next",
];

const offering = [
  {
    label: "Charging hubs",
    title: "Dependable energy on intercity routes",
    text: "Fast charging, solar and storage at the sites that matter — with reserved windows for scheduled coaches and fleet partners.",
  },
  {
    label: "Operating network",
    title: "Schedules, tickets and payments",
    text: "The software and service layer that turns charging into journeys passengers can book and operators can run to a timetable.",
  },
];

const whyUs = [
  {
    stat: "Integrated",
    title: "Energy and operations as one system",
    text: "We are not a fleet company, a charger map, or a ticketing app alone — Precifarm connects hubs and the operating network end to end.",
  },
  {
    stat: "Contracted",
    title: "Demand before capital",
    text: "Hubs are sized to binding passenger and fleet commitments — not vanity coverage on a map.",
  },
  {
    stat: energyCostMetric?.stat ?? "~50%",
    title: "Lower measured energy cost",
    text: "On Nairobi–Kisumu we track energy cost per loaded kilometre against diesel — and publish what matters.",
  },
  {
    stat: "One route",
    title: "Proof before scale",
    text: "Nairobi–Kisumu must earn its place through utilisation, uptime and partner returns before the next route is financed.",
  },
];

const revenueStreams = [
  {
    audience: "Passengers",
    title: "Fares on scheduled service",
    text: "You pay for your seat on intercity electric coaches — clear pricing, M-Pesa checkout and SMS tickets. Nairobi–Kisumu is live today.",
    cta: { href: "#book", label: "Book a seat" },
  },
  {
    audience: "Operators & fleets",
    title: "Charging and network services",
    text: "Fleet charging contracts, reserved hub sessions and passenger demand through Precifarm booking and agent channels.",
    cta: { href: "/partners", label: "Partner as an operator" },
  },
  {
    audience: "Site hosts & partners",
    title: "Hub revenue and O&M",
    text: "Revenue share for hub site hosts, energy sales at route hubs, and installation plus O&M for home and private charging.",
    cta: { href: "/charging", label: "Explore charging services" },
  },
];

export default function ValueProposition() {
  return (
    <section
      id="why-precifarm"
      className="scroll-mt-20 border-b border-border bg-white section-pad"
    >
      <div className="page-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-charge-600">
            What Precifarm does
          </p>
          <p className="mt-4 text-balance text-xl font-semibold leading-snug tracking-tight text-forest-900 sm:text-2xl">
            We build the charging hubs and operating network that make electric
            intercity travel in Kenya dependable and bookable — starting on
            Nairobi–Kisumu.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="card p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-forest-500">
              The problem
            </p>
            <h3 className="mt-2 text-lg font-semibold text-forest-900">
              EVs are here — dependable intercity travel is not
            </h3>
            <ul className="mt-5 space-y-3">
              {problemPoints.map((pt) => (
                <CheckItem key={pt}>{pt}</CheckItem>
              ))}
            </ul>
          </div>

          <div className="card border-charge-500/30 bg-charge-500/5 p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-charge-600">
              Our answer
            </p>
            <h3 className="mt-2 text-lg font-semibold text-forest-900">
              Hubs plus an operating network — not chargers alone
            </h3>
            <ul className="mt-5 space-y-3">
              {solutionPoints.map((pt) => (
                <CheckItem key={pt}>{pt}</CheckItem>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14">
          <SectionHeader
            eyebrow="Core offering"
            title="Two layers that only work together"
            description="Charging without schedules leaves operators guessing. Booking without reserved energy breaks the timetable. Precifarm runs both."
            centered
            className="mx-auto"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {offering.map((item) => (
              <div key={item.label} className="card p-6">
                <span className="rounded-full bg-forest-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-forest-500">
                  {item.label}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-forest-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-600/80">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-forest-600/85">
            <span className="font-semibold text-forest-900">
              What only Precifarm does:
            </span>{" "}
            licensed partners run the Yutong coaches — we provide the energy,
            passenger demand and operating standards so intercity electric travel
            works as a connected system, not a pilot project.
          </p>
        </div>

        <div className="mt-14">
          <SectionHeader
            eyebrow="Why Precifarm"
            title="How we win on every route we open"
            description="We measure what matters on Nairobi–Kisumu before financing the network forward."
            centered
            className="mx-auto"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item) => (
              <div key={item.title} className="card p-5">
                <p className="font-mono text-sm font-semibold text-charge-600">
                  {item.stat}
                </p>
                <h3 className="mt-2 font-semibold text-forest-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-600/80">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <SectionHeader
            eyebrow="How the network sustains itself"
            title="Where revenue comes from — honestly"
            description="Precifarm is not a bus company. We earn when dependable energy and bookings keep the route running for passengers, operators and partners."
            centered
            className="mx-auto"
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {revenueStreams.map((stream) => (
              <div key={stream.audience} className="card flex flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-charge-600">
                  {stream.audience}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-forest-900">
                  {stream.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-600/80">
                  {stream.text}
                </p>
                <Link
                  href={stream.cta.href}
                  className="mt-5 inline-flex text-sm font-semibold text-charge-600 hover:text-charge-500"
                >
                  {stream.cta.label} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
