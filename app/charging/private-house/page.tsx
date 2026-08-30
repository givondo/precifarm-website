import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqAccordion from "@/components/seo/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import HomeSurveyForm from "@/components/HomeSurveyForm";
import ProductPhoto from "@/components/ProductPhoto";
import CheckItem from "@/components/ui/CheckItem";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { contact } from "@/lib/contact";
import {
  privateHouseChargingFaqs,
  privateHouseChargingPackages,
  privateHouseChargingPage,
  privateHouseChargingProcess,
} from "@/lib/home-charging";
import { siteCtas } from "@/lib/site-copy";
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
          href="#survey"
          className="inline-flex rounded-full bg-charge-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-charge-500"
        >
          {siteCtas.homeSurvey.label}
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
            <div className="bg-muted/30 px-6 pt-6">
              <ProductPhoto
                src={privateHouseChargingPage.image.image}
                alt={privateHouseChargingPage.image.imageAlt}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="mx-auto aspect-[4/3] w-full max-w-lg object-contain"
                priority
              />
            </div>
          </figure>
        </div>
      </section>

      <section className="border-y border-border bg-muted/20 section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow="Why home"
            title="Built for homeowners"
            description="Private install, M-Pesa financing, three-year care."
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
      </section>

      <section className="section-pad bg-white">
        <div className="page-container space-y-14">
          <div>
            <SectionHeader
              eyebrow="Process"
              title="Survey to switch-on"
              description="Five steps on your property."
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
              title="Pulse or Pod"
              description="Wallbox first, or storage when the grid is unreliable."
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {privateHouseChargingPackages.map((pkg) => (
                <article
                  key={pkg.name}
                  className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
                >
                  <div className="bg-muted/30 p-5">
                    <ProductPhoto
                      src={pkg.image}
                      alt={pkg.imageAlt}
                      sizes="(max-width: 640px) 100vw, 40vw"
                      className="mx-auto aspect-[4/3] w-full max-w-xs object-contain"
                    />
                  </div>
                  <div className="border-t border-border px-5 py-4">
                    <h3 className="font-semibold text-forest-900">{pkg.name}</h3>
                    <p className="mt-1 text-sm text-forest-600">{pkg.bestFor}</p>
                    <ul className="mt-4 space-y-1.5 text-sm text-forest-600">
                      {pkg.includes.map((item) => (
                        <li key={item}>· {item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/20 section-pad">
        <div className="page-container grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Property"
              title="Where we install"
              description="Residential parking you control."
            />
            <ul className="mt-6 space-y-2.5">
              {privateHouseChargingPage.propertyTypes.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader eyebrow="Coverage" title="Survey crews" description="Same teams as our route hubs." />
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
          <h2 className="text-2xl font-semibold tracking-tight text-forest-900">Install questions</h2>
          <p className="mt-3 text-sm leading-relaxed text-forest-600">
            Property scope and timing. Pricing and Lipa Pole Pole →{" "}
            <Link href={siteCtas.allFaq.href} className="font-medium text-forest-900 hover:text-charge-600">
              {siteCtas.allFaq.label}
            </Link>
            .
          </p>
          <div className="mt-8">
            <FaqAccordion items={privateHouseChargingFaqs} />
          </div>
        </div>
      </section>

      <section className="section-pad bg-muted/30">
        <div className="page-container max-w-2xl">
          <HomeSurveyForm />
        </div>
      </section>

      <PageCTA
        title="Prefer to talk first?"
        description="Call or WhatsApp our installation team."
        primaryHref={contact.phoneHref}
        primaryLabel={`Call ${contact.phone}`}
        secondaryHref={contact.whatsapp}
        secondaryLabel="WhatsApp us"
      />
    </>
  );
}
