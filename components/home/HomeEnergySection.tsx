import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import { homeEnergyPricingDisclaimer, homeEnergySection } from "@/lib/home-energy-section";

type Package = (typeof homeEnergySection.packages)[number];

function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <Link
      href={pkg.href}
      id={`package-${pkg.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-white transition-shadow hover:shadow-lg hover:shadow-black/[0.06]"
    >
      <div className="relative overflow-hidden bg-muted/30">
        <SiteImage
          src={pkg.image}
          alt={pkg.imageAlt}
          width={960}
          height={600}
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/50 via-transparent to-transparent" />
        <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-forest-800 backdrop-blur-sm">
          {pkg.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-5 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-forest-900">{pkg.name}</h3>
          <p className="font-mono text-sm font-semibold text-forest-900">From {pkg.priceFrom}</p>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-forest-500">{pkg.bestFor}</p>
        <ul className="mt-4 flex-1 space-y-1.5">
          {pkg.points.map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm text-forest-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-charge-500" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
        <span className="mt-4 text-sm font-medium text-forest-900 group-hover:text-charge-600">
          {pkg.cta} ›
        </span>
      </div>
    </Link>
  );
}

export default function HomeEnergySection() {
  const { id, eyebrow, title, description, trust, packages, primaryHref, primaryLabel, secondaryHref, secondaryLabel } =
    homeEnergySection;

  return (
    <section id={id} className="home-section scroll-mt-20 border-t border-border bg-muted/30">
      <div className="page-container">
        <div className="home-section-header">
          <p className="text-xs font-semibold uppercase tracking-widest text-forest-500">{eyebrow}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-forest-900 sm:text-4xl">{title}</h2>
          <p className="mt-3 text-base leading-relaxed text-forest-500">{description}</p>
          <p className="mt-2 text-sm text-forest-500">{trust}</p>
          <p className="mt-1 text-xs text-forest-400">{homeEnergyPricingDisclaimer}</p>
        </div>

        <div id="home-energy-packages" className="home-section-grid grid gap-4 lg:grid-cols-3 lg:gap-5">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          <Link href={primaryHref} className="btn-primary rounded-full px-6 py-3 text-sm">
            {primaryLabel}
          </Link>
          <Link href={secondaryHref} className="text-sm font-medium">
            {secondaryLabel} ›
          </Link>
        </div>
      </div>
    </section>
  );
}
