import type { Metadata } from "next";
import HubImage from "@/components/HubImage";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import RouteRolesTable from "@/components/RouteRolesTable";
import SectionHeader from "@/components/ui/SectionHeader";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/about");

const principles = [
  {
    title: "From home charging to highway charging",
    text: "Pulse charger and Pod energy storage at home, Depot and Boda Hub for fleets, Corridor charging on the highway — one engineering team and M-Pesa on every product.",
  },
  {
    title: "Partners run the vehicles",
    text: "Precifarm is not a fleet company. Licensed operators own the buses and employ the drivers. We own the energy layer: survey, installation, uptime and settlement.",
  },
  {
    title: "Uptime is the product",
    text: "An offline charger breaks a home morning and a highway timetable. We monitor commissioned sites, recover quickly and label live versus planned honestly.",
  },
  {
    title: "Nairobi–Kisumu first",
    text: "The western corridor must demonstrate utilisation, partner returns and driver experience before we commit capital to the next highway hub.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/about")} />
      <PageHero
        eyebrow="About Precifarm"
        title="From home charging to highway charging"
        description="Precifarm installs, finances and runs EV charging in Kenya so a home charging day costs about KES 140 instead of ~KES 1,000 in diesel per day, paid with M-Pesa. Licensed operators run the vehicles. We own the energy layer."
      />

      <section className="page-container pb-12 pt-6 sm:pb-14 sm:pt-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
          ]}
        />
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
            <HubImage variant="homeSolar" aspectClass="aspect-video" />
          </div>
          <div className="space-y-5 leading-relaxed text-forest-600/85">
            <h2 className="text-lg font-semibold text-forest-900 sm:text-xl">Why we exist</h2>
            <p>
              Electric vehicles are arriving in Kenya faster than dependable charging. A
              typical Nairobi day is about ~KES 1,000 in diesel per day versus about KES 140 at home
              on Pulse charger — if the charger is installed, financed and kept online.
            </p>
            <p>
              Precifarm closes that gap with Pulse charger and Pod energy storage at home, Depot and Boda Hub for
              fleets, and Corridor charging on the highway — Lipa Pole Pole on M-Pesa,
              remote monitoring and live status on the Charging Hub.
            </p>
            <p>
              Work starts on Nairobi–Kisumu. Each site that proves itself makes the next
              one easier to finance and operate.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow="How we work"
            title="One partner from the wallbox to the highway"
            description="Precifarm connects power, charging, storage, software and financing so electric travel works as a system — not as isolated chargers."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {principles.map((p) => (
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

      <section className="section-pad page-container">
        <RouteRolesTable />
      </section>

      <PageCTA
        title="Join us in building EV charging in Kenya"
        description="Whether you want a Pulse charger at home, host a highway hub, operate a fleet or support a project as a partner, we would like to hear from you."
        primaryHref="/contact"
        primaryLabel="Contact us"
        secondaryHref="/charging"
        secondaryLabel="Explore charging"
      />
    </>
  );
}
