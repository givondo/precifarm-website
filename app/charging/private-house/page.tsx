import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqAccordion from "@/components/seo/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import SiteImage from "@/components/SiteImage";
import CheckItem from "@/components/ui/CheckItem";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { contact } from "@/lib/contact";
import {
  chargingTypeComparison,
  privateHouseChargingFaqs,
  privateHouseChargingPackages,
  privateHouseChargingPage,
  privateHouseChargingProcess,
  privateHouseSurveyMailto,
} from "@/lib/home-charging";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/charging/private-house");

export default function PrivateHouseChargingPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/charging/private-house")} />
      <PageHero
        eyebrow={privateHouseChargingPage.hero.eyebrow}
        title={privateHouseChargingPage.hero.title}
        description={privateHouseChargingPage.hero.description}
      >
        <a
          href={privateHouseSurveyMailto()}
          className="inline-flex rounded-full bg-charge-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-charge-500"
        >
          Request a house survey
        </a>
      </PageHero>

      <section className="page-container pb-12 pt-6 sm:pb-14 sm:pt-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Charging", href: "/charging" },
            { name: "Home charging", href: "/charging/private-house" },
          ]}
        />

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-base leading-relaxed text-forest-600">{privateHouseChargingPage.lead}</p>
            <p className="mt-4 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm leading-relaxed text-forest-600">
              {privateHouseChargingPage.notThisPage}
            </p>
            <ul className="mt-6 space-y-2.5">
              {privateHouseChargingPage.included.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </div>

          <figure className="overflow-hidden rounded-2xl border border-border bg-white shadow-lg">
            <SiteImage
              src={privateHouseChargingPage.image.image}
              alt={privateHouseChargingPage.image.imageAlt}
              width={1200}
              height={900}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/3] w-full object-cover"
              priority
            />
            <figcaption className="border-t border-border px-5 py-3 text-sm text-forest-600">
              Pulse charger or Pod energy storage at your house — same commissioning discipline as Corridor charging on the highway.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-y border-border bg-muted/20 section-pad">
        <div className="page-container space-y-14">
          <div>
            <SectionHeader
              eyebrow="Compare"
              title="Home, fleet or highway charging"
              description="Three uses — Pulse charger and Pod energy storage at home, Depot and Boda Hub for fleets, Corridor charging on the highway."
            />
            <div className="training-table-shell mt-8">
              <div className="training-table-wrap">
                <div className="training-table-scroll">
                  <table className="training-table w-full text-left text-sm" style={{ minWidth: "820px" }}>
                    <caption className="training-table-caption">
                      <span className="training-table-caption-label">
                        Where charging happens, who can use it, and where to read more
                      </span>
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Location</th>
                        <th scope="col">Access</th>
                        <th scope="col">Typical use</th>
                        <th scope="col">More</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chargingTypeComparison.map((row) => (
                        <tr key={row.type}>
                          <th scope="row">{row.type}</th>
                          <td>{row.where}</td>
                          <td className="training-cell-muted">{row.access}</td>
                          <td>{row.typical}</td>
                          <td>
                            <Link href={row.page} className="text-link font-medium whitespace-nowrap">
                              View →
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionHeader
              eyebrow="Why home charging"
              title="Built for homeowners, paid with M-Pesa"
              description="A typical home charging day about KES 140 — Pulse charger from KES 79,000, Lipa Pole Pole on any phone."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {privateHouseChargingPage.benefits.map((item) => (
                <div key={item.title} className="feature-card">
                  <h3 className="font-semibold text-forest-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-forest-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="page-container space-y-14">
          <div>
            <SectionHeader
              eyebrow="Process"
              title="From enquiry to charger at your house"
              description="Five clear steps on your private property."
            />
            <div className="training-table-shell mt-8">
              <div className="training-table-wrap">
                <div className="training-table-scroll">
                  <table className="training-table w-full text-left text-sm" style={{ minWidth: "720px" }}>
                    <caption className="training-table-caption">
                      <span className="training-table-caption-label">Private house installation process</span>
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Step</th>
                        <th scope="col">Stage</th>
                        <th scope="col">What happens at your house</th>
                        <th scope="col">Timing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {privateHouseChargingProcess.map((row) => (
                        <tr key={row.step}>
                          <td className="training-step-num">{row.step}</td>
                          <th scope="row">{row.stage}</th>
                          <td className="training-cell-muted">{row.detail}</td>
                          <td className="training-cell-emphasis whitespace-nowrap">{row.timing}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionHeader
              eyebrow="Packages"
              title="Pulse charger or Pod energy storage"
              description="Pulse charger for a typical one-day installation. Pod energy storage when you want backup for weak-grid evenings."
            />
            <div className="training-table-shell mt-8">
              <div className="training-table-wrap">
                <div className="training-table-scroll">
                  <table className="training-table w-full text-left text-sm" style={{ minWidth: "620px" }}>
                    <caption className="training-table-caption">
                      <span className="training-table-caption-label">House-based private charging options</span>
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Package</th>
                        <th scope="col">Best for</th>
                        <th scope="col">Includes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {privateHouseChargingPackages.map((pkg) => (
                        <tr key={pkg.name}>
                          <th scope="row">{pkg.name}</th>
                          <td>{pkg.bestFor}</td>
                          <td>
                            <ul className="training-module-list">
                              {pkg.includes.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/20 section-pad">
        <div className="page-container grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Property"
              title="Private houses we install at"
              description="Residential property where you control the parking spot."
            />
            <ul className="mt-6 space-y-2.5">
              {privateHouseChargingPage.propertyTypes.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader
              eyebrow="Coverage"
              title="Survey & installation crews"
              description="Regional teams that also service our route hubs."
            />
            <ul className="mt-6 flex flex-wrap gap-2">
              {privateHouseChargingPage.serviceAreas.map((city) => (
                <li
                  key={city}
                  className="rounded-full border border-border bg-white px-3 py-1.5 text-sm font-medium text-forest-800"
                >
                  {city}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="page-container max-w-3xl">
          <SectionHeader
            eyebrow="FAQ"
            title="Home charging costs and install"
            description="Typical home charging day about KES 140 versus petrol, Pulse charger from KES 79,000, and what a house survey includes."
          />
          <div className="mt-8">
            <FaqAccordion items={privateHouseChargingFaqs} />
          </div>
        </div>
      </section>

      <PageCTA
        title="Request a home charging survey"
        description="Tell us your house location, EV and parking setup — we respond within one business day."
        primaryHref={privateHouseSurveyMailto()}
        primaryLabel="Email for a survey"
        secondaryHref={contact.phoneHref}
        secondaryLabel={`Call ${contact.phone}`}
      />
    </>
  );
}
