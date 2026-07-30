import type { Metadata } from "next";
import CheckItem from "@/components/ui/CheckItem";
import JsonLd from "@/components/seo/JsonLd";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/partners");

const partnerTypes = [
  {
    title: "Coach operators",
    summary:
      "Run Yutong U12 within-city service or Yutong U18 intercity coaches on energy and passenger demand you can plan around.",
    points: [
      "Reserved charging windows aligned to your departure schedule",
      "Passenger bookings through Precifarm and agent channels",
      "A path to lower measured energy cost per loaded kilometre",
      "Access to OEM, finance and route operating data",
    ],
    keeps:
      "You retain your U12 and U18 coaches, drivers and PSV licence while Precifarm provides energy and passenger demand.",
  },
  {
    title: "Hub site hosts",
    summary:
      "Turn a strong route location into recurring passenger and fleet traffic.",
    points: [
      "Precifarm builds, owns and operates all charging equipment",
      "Revenue share on charging and on-site retail activity",
      "Passenger and fleet dwell from scheduled intercity service",
      "Co-investment options for locations that meet our site criteria",
    ],
    keeps:
      "You retain ownership of your land; we require durable site rights to operate the hub.",
  },
  {
    title: "Fleet and logistics",
    summary:
      "Use the same dependable hubs that support passenger intercity routes.",
    points: [
      "Contracted daytime charging for ET01 cargo vans and fleet vehicles",
      "Fleet invoicing without per-session payment friction",
      "More stable energy costs compared with volatile diesel prices",
      "Depot design support where overnight and route charging connect",
    ],
    keeps:
      "You retain dispatch and day-to-day operations; Precifarm guarantees the energy supply.",
  },
  {
    title: "Financiers and OEMs",
    summary:
      "Back intercity routes with contracted demand rather than projections alone.",
    points: [
      "Hubs underwritten on binding energy commitments",
      "A vehicle-neutral network open to any CCS2-capable fleet",
      "Shared uptime, kWh, load factor and on-time operating data",
      "Phase-gated expansion with clear decision gates between routes",
    ],
    keeps:
      "No new route opens until the current one has earned its place through proven utilisation and returns.",
  },
];

const promises = [
  {
    title: "Uptime you can schedule against",
    text: "We provide reserved charging slots, field response and honest status updates when a charger fails.",
  },
  {
    title: "Measured economics",
    text: "Sessions are metered, settlement is reconciled and operating metrics are shared with partners.",
  },
  {
    title: "Partner-first returns",
    text: "Network take is negotiated after partners earn on the route, not before.",
  },
  {
    title: "Open to any capable vehicle",
    text: "There is no OEM lock-in — any CCS2-capable vehicle can use the network.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/partners")} />
      <PageHero
        eyebrow="Partners"
        title="An intercity route works when every partner has a clear role"
        description="Precifarm builds and runs charging hubs and the operating network. Partners host sites, operate coaches and move cargo. Financiers and OEMs deploy against contracted route demand. Each organisation does what it does best."
      />

      <section className="section-pad page-container">
        <div className="grid gap-5 lg:grid-cols-2">
          {partnerTypes.map((p) => (
            <div
              key={p.title}
              id={
                p.title === "Hub site hosts"
                  ? "hub-hosts"
                  : p.title === "Fleet and logistics"
                    ? "fleet-logistics"
                    : undefined
              }
              className="card flex scroll-mt-24 flex-col p-6"
            >
              <h2 className="text-lg font-semibold text-forest-900">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-forest-600/85">
                {p.summary}
              </p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {p.points.map((pt) => (
                  <CheckItem key={pt}>{pt}</CheckItem>
                ))}
              </ul>
              <p className="mt-5 rounded-xl bg-muted p-4 text-sm leading-relaxed text-forest-600/80">
                {p.keeps}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow="Our commitments"
            title="What Precifarm commits to every partner on the route"
            description="Partners need more than hardware. They need dependable energy, clear economics and a network that earns its place route by route."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((p) => (
              <div key={p.title} className="card p-5">
                <h3 className="font-semibold text-forest-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-600/80">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title="Ready to partner on Nairobi–Kisumu?"
        description="Tell us whether you operate coaches, host a site, move freight or support route finance — and we will follow up within one business day."
        primaryHref="/contact"
        primaryLabel="Contact the team"
        secondaryHref="/#book"
        secondaryLabel="Book Now"
      />
    </>
  );
}
