import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import { programme } from "@/lib/programmes";
import { productImages } from "@/lib/product-images";

type Tile = {
  href: string;
  name: string;
  line: string;
  cta: string;
  image: { src: string; alt: string };
  /** Scenes fill the frame; cut-out products sit on the studio grey. */
  fit?: "cover";
};

const charging: Tile[] = [
  {
    href: "/charging/home",
    name: "Pulse charger",
    line: "7 kW home wallbox, from KES 79,000 or Lipa Pole Pole on M-Pesa.",
    cta: "Get a free survey",
    image: productImages.pulse,
  },
  {
    href: "/charging/pulse-plus",
    name: "Pulse+ charger",
    line: "22 kW three-phase charging for fleet yards and workplaces.",
    cta: "Plan your site",
    image: productImages.pulsePlus,
  },
  {
    href: "/charging/corridor",
    name: "Corridor charging",
    line: "DC fast charging for highways and towns, starting on Nairobi to Kisumu.",
    cta: "Host a site",
    image: productImages.corridor,
    fit: "cover",
  },
  {
    href: "/charging/boda-hub",
    name: "Boda Hub",
    line: "Battery swapping for electric motorcycles, in under five minutes.",
    cta: "Partner on a site",
    image: productImages.boda,
    fit: "cover",
  },
];

export default function HomePillars() {
  const wireless = programme("wireless");
  return (
    <section className="home-section border-b border-border bg-white" aria-labelledby="home-pillars-title">
      <div className="page-container">
        <div className="home-section-header mx-auto max-w-2xl text-center lg:max-w-3xl">
          <p className="text-eyebrow">What we build</p>
          <h2 id="home-pillars-title" className="heading-display mt-3 text-2xl text-forest-900 sm:text-3xl lg:text-4xl">
            From the driveway to the highway.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-forest-600 sm:text-base">
            Chargers, swap stations and fast-charging sites, engineered for Kenyan grids and paid on M-Pesa.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:gap-5">
          {charging.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-white transition-[box-shadow,border-color] hover:border-forest-200 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] w-full bg-[#f5f5f7]">
                  <SiteImage
                    src={t.image.src}
                    alt={t.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className={`transition-transform duration-500 group-hover:scale-[1.03] ${t.fit === "cover" ? "object-cover object-top" : "object-contain p-6 sm:p-8"}`}
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-xl font-semibold tracking-tight text-forest-900">{t.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-600">{t.line}</p>
                  <span className="mt-5 inline-flex items-center text-sm font-semibold text-charge-600">
                    {t.cta}
                    <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">
                      ›
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-4 grid gap-4 lg:mt-5 lg:grid-cols-[2fr_1fr] lg:gap-5">
          <Link
            href="/agent"
            className="group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-forest-950 p-7 text-white sm:p-9"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgba(31,111,74,0.45),transparent)]"
            />
            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-300">Precifarm Agent</p>
              <h3 className="heading-display heading-inverted mt-3 text-2xl sm:text-3xl">Your AI electrical and energy engineer.</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                Size EV charging, solar, batteries, cables and protection in minutes, with every number traced to a calculation you can check.
              </p>
            </div>
            <span className="relative mt-8 inline-flex w-fit items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-forest-950 transition-colors group-hover:bg-brand-50">
              Try Precifarm Agent
            </span>
          </Link>
          <Link
            href={wireless.href}
            className="group flex flex-col justify-between rounded-[1.75rem] border border-border bg-muted/40 p-7 transition-[box-shadow,border-color] hover:border-forest-200 hover:shadow-md sm:p-8"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-charge-600">Precifarm R&amp;D</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-forest-900">Wireless EV charging</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-600">
                Stationary inductive charging for cars at home and in fleet depots.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center text-sm font-semibold text-charge-600">
              See the work
              <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">
                ›
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
