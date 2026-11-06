import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import { productImages } from "@/lib/product-images";

type Tile = {
  href: string;
  name: string;
  line: string;
  cta: string;
  image: { src: string; alt: string };
  /**
   * studio: trimmed cut-out render on a soft studio backdrop (wallboxes, shown as objects).
   * scene: full-bleed site render (stations, shown as places).
   */
  treatment: "studio" | "scene";
};

/** No category or maturity labels on public tiles (site rule, 3 Nov 2026). */
const charging: Tile[] = [
  {
    href: "/charging/home",
    name: "Pulse 7 kW",
    line: "Safe, reliable home charging, professionally installed. From KES 79,000.",
    cta: "Explore Pulse",
    image: { src: "/images/renders/cards/pulse-7kw-studio.png", alt: productImages.pulse.alt },
    treatment: "studio",
  },
  {
    href: "/charging/pulse-plus",
    name: "Pulse+ 22 kW",
    line: "Three-phase charging for offices, businesses and fleet depots. Top up staff and fleet vehicles while they’re parked.",
    cta: "Explore Pulse+",
    image: { src: "/images/renders/cards/pulse-plus-22kw-studio.png", alt: productImages.pulsePlus.alt },
    treatment: "studio",
  },
  {
    href: "/charging/corridor",
    name: "ARC Corridor",
    line: "DC fast charging for highways, towns and fleet hubs. Modular by design, so each site grows with demand.",
    cta: "Explore ARC Corridor",
    image: productImages.corridor,
    treatment: "scene",
  },
  {
    href: "/charging/boda-hub",
    name: "Boda Hub",
    line: "Automated swap lockers. Riders trade a flat battery for a full one and get straight back to earning.",
    cta: "Explore Boda Hub",
    image: productImages.bodaStudio,
    treatment: "scene",
  },
];

const frame = {
  studio:
    "bg-[radial-gradient(120%_95%_at_50%_28%,#ffffff_0%,#f4f5f7_55%,#e8eaed_100%)]",
  scene: "bg-forest-900",
} as const;

const media = {
  studio: "object-contain px-10 pt-8 pb-6 sm:px-14 sm:pt-10 sm:pb-8",
  scene: "object-cover object-center",
} as const;

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

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:gap-6">
          {charging.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-white transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-forest-200 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charge-600 motion-reduce:transform-none"
              >
                <div className={`relative aspect-[4/3] w-full overflow-hidden ${frame[t.treatment]}`}>
                  <SiteImage
                    src={t.image.src}
                    alt={t.image.alt}
                    fill
                    sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) 50vw, 500px"
                    className={`${media[t.treatment]} transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
                  />
                  {t.treatment === "scene" && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col px-6 pt-6 pb-7 sm:px-8 sm:pt-7 sm:pb-8">
                  <h3 className="text-xl font-semibold tracking-tight text-forest-900 sm:text-2xl">{t.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-600 sm:text-[0.95rem]">{t.line}</p>
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
