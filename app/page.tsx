import type { Metadata } from "next";
import Link from "next/link";
import BookingCTA from "@/components/BookingCTA";
import BookNowLink from "@/components/BookNowLink";
import AisoPageSections from "@/components/seo/AisoPageSections";
import JsonLd from "@/components/seo/JsonLd";
import { bookingHowToBlock, createPageSeo, homepageAisoBlocks, internalLinksForPath } from "@/lib/seo";
import { getPageSeo } from "@/lib/seo/pages/registry";
import { nairobiKisumuRoute } from "@/lib/route";

const pageSeo = getPageSeo("/")!;
const seo = createPageSeo(pageSeo);

export const metadata: Metadata = seo.metadata;

const pillars = [
  {
    title: "Charging hubs",
    text: "Fast charging, solar and storage placed where intercity routes actually need energy — with reserved windows for every departure.",
  },
  {
    title: "Operating network",
    text: "Schedules, M-Pesa tickets and live route data in one system passengers can book and operators can run to a timetable.",
  },
  {
    title: "Partner mobility",
    text: "Licensed operators run Yutong coaches on the network while Precifarm provides energy, demand and the customer experience.",
  },
];

const whyBook = [
  {
    title: "Reserved seat",
    text: "Pick your seat on the Yutong U18 before you travel.",
  },
  {
    title: "Fixed fare",
    text: `KSh ${nairobiKisumuRoute.fare.toLocaleString()} per seat — no diesel-price surprises.`,
  },
  {
    title: "M-Pesa + SMS ticket",
    text: "Pay on your phone at checkout. Your booking reference arrives by SMS instantly.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <div className="bg-white">
        <BookingCTA hero />

        <section className="border-t border-border section-pad">
          <div className="page-container">
            <p className="text-sm font-semibold uppercase tracking-widest text-forest-500">
              What we build
            </p>
            <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-forest-900 sm:text-3xl">
              Charging hubs and an operating network — as one system
            </h2>
            <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {pillars.map((item) => (
                <div key={item.title}>
                  <h3 className="font-semibold text-forest-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-forest-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border section-pad">
          <div className="page-container">
            <p className="text-sm font-semibold uppercase tracking-widest text-forest-500">
              Why book
            </p>
            <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-forest-900 sm:text-3xl">
              One route, done properly
            </h2>
            <ul className="mt-8 max-w-2xl space-y-5">
              {whyBook.map((item) => (
                <li key={item.title} className="border-l-2 border-border pl-4">
                  <p className="font-medium text-forest-900">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-forest-600">{item.text}</p>
                </li>
              ))}
            </ul>
            <BookNowLink className="btn-primary mt-8 inline-flex rounded-full px-6 py-3 text-sm">
              Book a seat
            </BookNowLink>
          </div>
        </section>

        <section className="border-t border-border section-pad">
          <div className="page-container grid gap-10 sm:grid-cols-2 sm:gap-12">
            <div>
              <h3 className="text-lg font-semibold text-forest-900">Operators &amp; fleets</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-600">
                Reserved hub charging, timetables and passenger demand on the network.
              </p>
              <Link
                href="/partners"
                className="mt-4 inline-flex text-sm font-semibold text-forest-900 underline-offset-4 hover:underline"
              >
                Partner with us
              </Link>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-forest-900">Charging services</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-600">
                Route hubs, home DC charging and private-site stations.
              </p>
              <Link
                href="/charging"
                className="mt-4 inline-flex text-sm font-semibold text-forest-900 underline-offset-4 hover:underline"
              >
                Explore charging
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-border section-pad">
          <div className="page-container text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-forest-900 sm:text-3xl">
              Ready to travel?
            </h2>
            <p className="mt-3 text-sm text-forest-600">
              {nairobiKisumuRoute.duration} · {nairobiKisumuRoute.distance} · from KSh{" "}
              {nairobiKisumuRoute.fare.toLocaleString()} per seat
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <BookNowLink className="btn-primary rounded-full px-6 py-3 text-sm">
                Book Now
              </BookNowLink>
              <Link href="/about" className="btn-secondary rounded-full px-6 py-3 text-sm">
                About Precifarm
              </Link>
            </div>
          </div>
        </section>

        <AisoPageSections
          blocks={[...homepageAisoBlocks, bookingHowToBlock]}
          relatedLinks={internalLinksForPath("/")}
        />
      </div>
    </>
  );
}
