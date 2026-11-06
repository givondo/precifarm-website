import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import { productImages } from "@/lib/product-images";
import { programme, type Programme, type ProgrammeId } from "@/lib/programmes";

/**
 * Homepage "What we build" showroom.
 *
 * The Pulse charger, the product a household can buy today, leads as a featured panel on a light
 * studio stage. Pulse+, ARC Corridor and Boda Hub follow on a darker stage, so the section moves
 * from the driveway (day, at home) to the highway (dusk, on the road).
 *
 * Rules: no category or maturity labels (site rule, 3 Nov 2026); ratings and facts come from
 * lib/generated/product-specs.ts through lib/programmes.ts, never typed here.
 */

/** Approved claim text for a programme, looked up by its register label. */
function claim(p: Programme, label: string): string {
  const c = p.claims.find((x) => x.label === label);
  if (!c) throw new Error(`Missing approved claim "${label}" for ${p.code}`);
  return c.text;
}

const pulse = programme("pulse");

/** Price lines match lib/brand-messaging.ts and lib/home-charging.ts. */
const pulsePanel = {
  href: pulse.href,
  name: pulse.name,
  headline: pulse.headline,
  line: "Charge at home on a wallbox we survey, install and look after for three years.",
  facts: [
    { label: "Charging power", text: claim(pulse, "Charging power") },
    { label: "Load management", text: claim(pulse, "Load management") },
  ],
  price: "From KES 79,000",
  financing: "or Lipa Pole Pole on M-Pesa, from KES 3,300/month",
  cta: { href: "/charging/home#survey", label: "Request a free home survey" },
  image: { src: "/images/renders/cards/pulse-7kw-studio.png", alt: productImages.pulse.alt },
};

type Tile = {
  id: ProgrammeId;
  /** Public display name; the register names Corridor "Corridor charging", the site says ARC Corridor. */
  name?: string;
  line: string;
  fact: string;
  cta: { href: string; label: string };
  image: { src: string; alt: string };
  treatment: "studio" | "scene";
};

const tiles: Tile[] = [
  {
    id: "pulsePlus",
    line: "For offices, businesses and fleet depots. Top up staff and fleet vehicles while they’re parked.",
    fact: "Load sharing",
    cta: { href: "/contact?interest=pulse-plus", label: "Request a site survey" },
    image: { src: "/images/renders/cards/pulse-plus-22kw-studio.png", alt: productImages.pulsePlus.alt },
    treatment: "studio",
  },
  {
    id: "corridor",
    name: "ARC Corridor",
    line: "Fast charging for highways, towns and fleet hubs, with the price per kWh shown before you start.",
    fact: "Connectors",
    cta: { href: "/contact?interest=corridor", label: "Request a site survey" },
    image: productImages.corridor,
    treatment: "scene",
  },
  {
    id: "boda",
    line: "Automated swap lockers. Riders trade a flat battery for a full one and get straight back to earning.",
    fact: "Payment",
    cta: { href: "/contact?interest=boda-hub", label: "Talk to Precifarm" },
    image: productImages.bodaStudio,
    treatment: "scene",
  },
];

const darkStage = {
  studio: "bg-[radial-gradient(85%_80%_at_50%_42%,#4b5563_0%,#1f2937_58%,#111827_100%)]",
  scene: "bg-forest-900",
} as const;

const darkMedia = {
  studio: "object-contain px-10 pt-8 pb-6",
  scene: "object-cover object-center",
} as const;

const zoom =
  "transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100";

export default function HomePillars() {
  return (
    <section className="home-section border-b border-border bg-white" aria-labelledby="home-pillars-title">
      <div className="page-container">
        <div className="home-section-header mx-auto max-w-2xl text-center lg:max-w-3xl">
          <p className="text-eyebrow">What we build</p>
          <h2 id="home-pillars-title" className="heading-display mt-3 text-2xl text-forest-900 sm:text-3xl lg:text-4xl">
            From the driveway to the highway.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-forest-600 sm:text-base">
            Home chargers, workplace charging, highway fast charging and boda battery swaps. Engineered for Kenyan
            grids and paid on M-Pesa.
          </p>
        </div>

        {/* Featured: Pulse charger */}
        <article className="showroom-reveal group mt-10 overflow-hidden rounded-[2rem] border border-border bg-white lg:grid lg:grid-cols-[1.1fr_1fr]">
          <Link
            href={pulsePanel.href}
            tabIndex={-1}
            aria-hidden
            className="relative block aspect-[4/3] w-full overflow-hidden bg-[radial-gradient(120%_95%_at_50%_30%,#ffffff_0%,#f4f5f7_55%,#e8eaed_100%)] lg:aspect-auto lg:min-h-[30rem]"
          >
            <SiteImage
              src={pulsePanel.image.src}
              alt={pulsePanel.image.alt}
              fill
              sizes="(max-width: 1024px) calc(100vw - 2rem), 540px"
              className={`object-contain px-12 pt-10 pb-8 sm:px-20 lg:px-14 lg:py-12 ${zoom}`}
            />
          </Link>
          <div className="flex flex-col justify-center px-6 pt-7 pb-8 sm:px-10 sm:pt-9 sm:pb-10 lg:px-12">
            <h3 className="heading-display text-2xl text-forest-900 sm:text-3xl">
              <Link href={pulsePanel.href} className="rounded-sm text-forest-900 hover:text-charge-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charge-600">
                {pulsePanel.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm font-medium text-forest-300">{pulsePanel.headline}</p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-forest-600">{pulsePanel.line}</p>

            <dl className="mt-6 grid gap-x-6 gap-y-4 border-t border-border pt-5 sm:grid-cols-2">
              {pulsePanel.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-xs font-medium text-forest-300">{f.label}</dt>
                  <dd className="mt-1 text-sm leading-snug text-forest-900">{f.text}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 border-t border-border pt-5">
              <p className="text-xl font-semibold tracking-tight text-forest-900 sm:text-2xl">{pulsePanel.price}</p>
              <p className="mt-1 text-sm text-charge-700">{pulsePanel.financing}</p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
              <Link href={pulsePanel.cta.href} className="btn-primary min-h-12 whitespace-nowrap px-7">
                {pulsePanel.cta.label}
              </Link>
              <Link
                href={pulsePanel.href}
                className="link-touch justify-center whitespace-nowrap text-sm font-semibold text-charge-600 hover:text-charge-700 sm:justify-start"
              >
                Explore Pulse charger
                <span aria-hidden className="ml-1">›</span>
              </Link>
            </div>
          </div>
        </article>

        {/* Workplace, highway, boda */}
        <ul className="showroom-reveal -mx-4 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-5 lg:grid-cols-3 lg:gap-5 [&::-webkit-scrollbar]:hidden">
          {tiles.map((t) => {
            const p = programme(t.id);
            const name = t.name ?? p.name;
            return (
              <li
                key={t.id}
                className="group flex w-[84%] shrink-0 snap-start flex-col overflow-hidden rounded-[1.75rem] bg-forest-900 text-white sm:w-auto"
              >
                <Link
                  href={p.href}
                  className="flex flex-1 flex-col text-white hover:text-white focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
                >
                  <div className={`relative aspect-[4/3] w-full overflow-hidden ${darkStage[t.treatment]}`}>
                    <SiteImage
                      src={t.image.src}
                      alt={t.image.alt}
                      fill
                      sizes="(max-width: 640px) 84vw, (max-width: 1024px) 50vw, 330px"
                      className={`${darkMedia[t.treatment]} ${zoom}`}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest-900 to-transparent"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-6 pt-4 sm:px-7">
                    <h3 className="text-xl font-semibold tracking-tight">{name}</h3>
                    <p className="mt-0.5 text-sm text-white/60">{p.headline}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-white/80">{t.line}</p>
                    <p className="mt-4 border-t border-white/10 pt-3 text-xs leading-snug text-white/60">
                      <span className="text-white/45">{t.fact}: </span>
                      {claim(p, t.fact)}
                    </p>
                  </div>
                </Link>
                <div className="px-6 pt-4 pb-6 sm:px-7 sm:pb-7">
                  <Link
                    href={t.cta.href}
                    className="link-touch text-sm font-semibold text-charge-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {t.cta.label}
                    <span className="sr-only"> for {name}</span>
                    <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">
                      ›
                    </span>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-center text-sm text-forest-600">
          Not sure what your site needs?{" "}
          <a href="tel:+254181893396" className="font-semibold text-charge-600 hover:text-charge-700">
            Call +254 181 893 396
          </a>{" "}
          or{" "}
          <a href="https://wa.me/254181893396" className="font-semibold text-charge-600 hover:text-charge-700">
            WhatsApp us
          </a>
          .
        </p>
      </div>
    </section>
  );
}
