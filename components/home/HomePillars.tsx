import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import { productImages } from "@/lib/product-images";

type Tile = {
  href: string;
  /** Product category (status eyebrows removed by David, 6 Nov 2026). */
  eyebrow: string;
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
    eyebrow: "Home charging",
    name: "Pulse 7 kW",
    line: "Reliable home EV charging, professionally installed. From KES 79,000.",
    cta: "Explore Pulse",
    image: productImages.pulse,
  },
  {
    href: "/charging/pulse-plus",
    eyebrow: "Workplace charging",
    name: "Pulse+ 22 kW",
    line: "Three-phase AC charging for workplaces, businesses and fleet parking.",
    cta: "Explore Pulse+",
    image: productImages.pulsePlusDepot,
    fit: "cover",
  },
  {
    href: "/charging/corridor",
    eyebrow: "DC fast charging",
    name: "ARC Corridor",
    line: "Scalable DC fast-charging infrastructure for highways, towns and fleets.",
    cta: "Explore ARC Corridor",
    image: productImages.corridor,
    fit: "cover",
  },
  {
    href: "/charging/boda-hub",
    eyebrow: "Battery swapping",
    name: "Boda Hub",
    line: "Automated battery-swap lockers designed to keep electric motorcycles moving.",
    cta: "Explore Boda Hub",
    image: productImages.boda,
    fit: "cover",
  },
];

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
                    className={`transition-transform duration-500 group-hover:scale-[1.03] ${t.fit === "cover" ? "object-cover object-center" : "object-contain p-6 sm:p-8"}`}
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-charge-600">{t.eyebrow}</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-forest-900">{t.name}</h3>
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
      </div>
    </section>
  );
}
