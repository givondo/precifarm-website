import type { Metadata } from "next";
import Link from "next/link";
import HomeSurveyForm from "@/components/HomeSurveyForm";
import HomeChargeCalculator from "@/components/charging/HomeChargeCalculator";
import InstallationDiagram from "@/components/charging/InstallationDiagram";
import PriceStack from "@/components/charging/PriceStack";
import WallboxDrawing from "@/components/charging/WallboxDrawing";
import { CalloutNote, InPageNav, InteriorHero, InteriorSection, MediaFrame, SpecSheet, StepFlow } from "@/components/interior";
import FaqAccordion from "@/components/seo/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import { contact } from "@/lib/contact";
import {
  privateHouseChargingFaqs,
  privateHouseChargingPage,
  privateHouseChargingProcess,
  pulseDetail,
  pulseFinancing,
  pulsePriceStack,
} from "@/lib/home-charging";
import { kenyaEvCarModels } from "@/lib/kenya-ev-compatibility";
import { firstNumber } from "@/lib/pages/format";
import { claimText, registerSource, registerSpecGroups } from "@/lib/pages/register";
import { siteCtas, sitePricing } from "@/lib/site-copy";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/charging/home");

const power = claimText("pulse", "PUL-03"); // "32 A single phase: up to 7.4 kW"
const pulseKw = firstNumber(power, /up to ([\d.]+) kW/);
const pulseA = firstNumber(power, /([\d.]+) A/);
const carObc = claimText("pulse", "PUL-20"); // "... many accept 6.6 to 7.4 kW"
const obcOptions = [firstNumber(carObc, /accept ([\d.]+) to/), firstNumber(carObc, /to ([\d.]+) kW/)];
const [sizeH, sizeW, sizeD] = (claimText("pulse", "PUL-13").match(/\d+/g) ?? []).map(Number);

const installLegend = [
  { title: "Kenya Power meter", text: `Your existing supply. The survey checks the load already on it. ${claimText("pulse", "PUL-09")}.` },
  { title: "Consumer unit", text: "A new dedicated way: an MCB rated at the survey and a Type A RCD upstream of the charger." },
  { title: "Cable route", text: "Along the wall or underground to the parking spot. Route, length and size are fixed on your quote." },
  { title: "Pulse charger", text: `${claimText("pulse", "PUL-05")}.` },
  { title: "Earthing", text: "The earthing arrangement and electrode are checked at the survey, before anything is installed." },
  { title: "Your car", text: `${claimText("pulse", "PUL-04")}.` },
] as const;

export default function HomeChargingPage() {
  const { hero } = privateHouseChargingPage;
  return (
    <>
      <JsonLd data={pageJsonLd("/charging/home")} />
      <InteriorHero
        eyebrow={`${hero.eyebrow} · Pulse charger`}
        title={hero.title}
        lead={hero.description}
        stage="available"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Charging", href: "/charging" },
          { name: "Home charging", href: "/charging/home" },
        ]}
        actions={[
          { href: "#survey", label: siteCtas.homeSurvey.label },
          { href: "#pricing", label: "See pricing", variant: "secondary" },
        ]}
        media={{
          src: "/images/renders/pulse-7kw-hero-rc3.png",
          alt: "Precifarm Pulse 7 kW home wallbox in white with a graphite display strip, Type 2 plug docked in its holster",
          fit: "contain",
        }}
        facts={[
          { label: "Charging power", value: `Up to ${pulseKw} kW` },
          { label: "Connector", value: "Type 2, tethered" },
          { label: "Charger and install", value: `From ${sitePricing.pulseFrom}` },
          { label: "Lipa Pole Pole", value: `From ${sitePricing.lipaFrom}` },
        ]}
      />
      <InPageNav links={pulseDetail.inPage} />

      <InteriorSection id="on-the-wall" eyebrow={pulseDetail.wall.eyebrow} title={pulseDetail.wall.title} lead={pulseDetail.wall.lead}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start">
          <MediaFrame
            src="/images/renders/pulse-7kw-installed-4x3.jpg"
            alt={pulseDetail.wall.imageAlt}
            aspect="aspect-[4/3]"
            stage="illustrative"
            caption="Design render of a wall installation. Your position is agreed at the survey."
          />
          <WallboxDrawing height={sizeH} width={sizeW} depth={sizeD} />
        </div>
        <dl className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {pulseDetail.wall.details.map((d) => (
            <div key={d.title}>
              <dt className="text-sm font-semibold text-forest-900">{d.title}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-forest-600">{d.text}</dd>
            </div>
          ))}
        </dl>
      </InteriorSection>

      <InteriorSection id="installation" tone="silver" eyebrow={pulseDetail.installation.eyebrow} title={pulseDetail.installation.title} lead={pulseDetail.installation.lead}>
        <InstallationDiagram currentA={pulseA} legend={installLegend} cableNote={pulseDetail.installation.cableNote} />
      </InteriorSection>

      <InteriorSection id="charge-time" eyebrow={pulseDetail.calculator.eyebrow} title={pulseDetail.calculator.title} lead={pulseDetail.calculator.lead}>
        <HomeChargeCalculator
          pulseKw={pulseKw}
          obcOptions={obcOptions}
          cars={kenyaEvCarModels.map((c) => ({ id: c.id, model: c.model, battery: c.battery }))}
          obcNote={pulseDetail.calculator.obcNote}
        />
        <p className="mt-4 text-sm text-forest-600">
          Battery sizes come from the{" "}
          <Link href="/evs" className="font-semibold">
            Kenya EV guide
          </Link>
          , and vary by trim and import batch.
        </p>
      </InteriorSection>

      <InteriorSection id="specification" tone="graphite" eyebrow="Specification" title="Pulse charger, in figures." lead={privateHouseChargingPage.lead}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
          <SpecSheet groups={registerSpecGroups("pulse", "Pulse charger")} tone="dark" source={registerSource("pulse")} />
          <div className="grid content-start gap-8">
            <div>
              <h3 className="text-base font-semibold text-white">Safety inside the unit</h3>
              <ul className="mt-3 space-y-2.5">
                {pulseDetail.safety.map((s) => (
                  <li key={s} className="flex gap-3 text-sm leading-relaxed text-white/75">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-300" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Included with every install</h3>
              <ul className="mt-3 space-y-2.5">
                {privateHouseChargingPage.included.map((s) => (
                  <li key={s} className="flex gap-3 text-sm leading-relaxed text-white/75">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-300" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </InteriorSection>

      <InteriorSection id="pricing" eyebrow={pulseDetail.pricing.eyebrow} title={pulseDetail.pricing.title} lead={pulseDetail.pricing.lead}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
          <PriceStack
            lines={pulsePriceStack}
            bundle={["hardware", "install"]}
            bundleLabel="Charger and standard installation, together"
            bundlePrice={`From ${sitePricing.pulseFrom}`}
            bundleNote="Paid on survey approval. Precifarm does not publish separate hardware and installation prices; your quote shows the full scope for your house."
          />
          <aside className="rounded-[1.75rem] bg-forest-950 p-6 text-white sm:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-300">Financing</p>
            <h3 className="mt-3 text-lg font-semibold">{pulseFinancing.title}</h3>
            <p className="mt-4 font-display text-3xl font-semibold tracking-tight">
              <span className="text-base font-medium text-white/65">From </span>
              {pulseFinancing.from}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/72">{pulseFinancing.text}</p>
            <a href="#survey" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-forest-950 hover:bg-brand-50">
              Ask for Lipa Pole Pole
            </a>
          </aside>
        </div>
      </InteriorSection>

      <InteriorSection id="process" tone="silver" eyebrow="Process" title="Survey to switch-on, in five steps." lead="One team from the first call to the three-year aftersale.">
        <StepFlow steps={privateHouseChargingProcess.map((p) => ({ title: p.stage, text: p.detail, meta: p.timing }))} />
        <div className="mt-12 grid gap-8 border-t border-forest-200 pt-10 md:grid-cols-2">
          <div>
            <h3 className="text-base font-semibold text-forest-900">Where we install</h3>
            <ul className="mt-3 space-y-2">
              {privateHouseChargingPage.propertyTypes.map((p) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed text-forest-700">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-charge-600" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-forest-600">{privateHouseChargingPage.notThisPage}</p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-forest-900">Where we survey</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {privateHouseChargingPage.serviceAreas.map((city) => (
                <li key={city} className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-forest-800 ring-1 ring-border">
                  {city}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-forest-600">Call us if your town is not listed.</p>
          </div>
        </div>
      </InteriorSection>

      <InteriorSection id="survey" eyebrow={pulseDetail.survey.eyebrow} title={pulseDetail.survey.title} lead={pulseDetail.survey.lead}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-12">
          <div className="grid content-start gap-6 lg:sticky lg:top-32 lg:self-start">
            <CalloutNote title="Have these ready">
              Photos of your consumer unit and parking spot, your house location and your car&apos;s make and model. We call within one business day to set a visit.
            </CalloutNote>
            <div>
              <p className="text-sm font-semibold text-forest-900">Prefer to talk first?</p>
              <p className="mt-1 text-sm text-forest-600">Call or WhatsApp the installation team.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={contact.phoneHref} className="btn-secondary min-h-12">
                  Call {contact.phone}
                </a>
                <a href={contact.whatsapp} className="btn-secondary min-h-12" target="_blank" rel="noopener noreferrer">
                  WhatsApp us
                </a>
              </div>
            </div>
          </div>
          <HomeSurveyForm />
        </div>
      </InteriorSection>

      <InteriorSection
        id="questions"
        tone="silver"
        width="narrow"
        eyebrow="Questions"
        title="Install questions"
        aside={
          <Link href={siteCtas.allFaq.href} className="inline-flex min-h-11 items-center text-sm font-semibold">
            {siteCtas.allFaq.label} <span aria-hidden className="ml-1">›</span>
          </Link>
        }
      >
        <FaqAccordion items={privateHouseChargingFaqs} />
      </InteriorSection>
    </>
  );
}
