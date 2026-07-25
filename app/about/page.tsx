import type { Metadata } from "next";
import SiteImage from "@/components/SiteImage";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import RouteRolesTable from "@/components/RouteRolesTable";
import SectionHeader from "@/components/ui/SectionHeader";
import { siteImages } from "@/lib/vehicles";

export const metadata: Metadata = {
  title: "About",
  description:
    "Precifarm builds charging hubs and the operating network for dependable electric travel between Kenyan cities.",
};

const principles = [
  {
    title: "We build hubs before we scale routes",
    text: "Dependable charging at the right sites is the foundation. Timetables, tickets and passenger confidence only work when the energy layer holds.",
  },
  {
    title: "Partners run the vehicles",
    text: "Precifarm is not a fleet company. Licensed operators own the coaches and employ the drivers, while we provide energy, passenger demand and operating standards.",
  },
  {
    title: "Uptime is what passengers and operators depend on",
    text: "An offline charger breaks a timetable, so we monitor every hub around the clock, recover quickly and communicate honestly when plans change.",
  },
  {
    title: "We prove each route before we finance the next",
    text: "Nairobi–Kisumu must demonstrate utilisation, partner returns and passenger experience before we commit capital to the next intercity route.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Precifarm"
        title="From solar infrastructure to dependable electric intercity travel"
        description="Precifarm is building the charging hubs and operating network that make electric travel between Kenyan cities dependable, affordable and easy to book. Our solar and storage work across Kenya is the engineering foundation behind intercity charging that lasts."
      />

      <section className="section-pad page-container">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
            <SiteImage
              src={siteImages.about.image}
              alt={siteImages.about.imageAlt}
              width={1200}
              height={675}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-video w-full object-cover"
            />
          </div>
          <div className="space-y-5 leading-relaxed text-forest-600/85">
            <h2 className="text-lg font-semibold text-forest-900 sm:text-xl">Why we exist</h2>
            <p>
              Electric vehicles are arriving in Kenya faster than the infrastructure
              needed to connect cities. Without dependable charging and an operator
              who keeps the timetable, intercity electric travel remains a city
              demonstration rather than a national service.
            </p>
            <p>
              Precifarm closes that gap with charging hubs on key routes and the
              operating network around them — schedules, M-Pesa booking, fleet
              charging and live operating data that connect energy to the passenger
              journey.
            </p>
            <p>
              Our work starts on Nairobi–Kisumu. Each route that proves itself
              makes the next one easier to finance and operate.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow="How we work"
            title="We build the system in the right order"
            description="Precifarm connects energy, operations and partner mobility so intercity electric travel works as a whole — not as isolated chargers or vehicles."
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
        title="Join us on the Nairobi–Kisumu route"
        description="Whether you want to travel, operate coaches, host a hub site or support the route as a partner, we would like to hear from you."
      />
    </>
  );
}
