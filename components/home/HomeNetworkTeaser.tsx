import Link from "next/link";
import HubImage from "@/components/HubImage";
import { homeNetworkTeaser } from "@/lib/brand-messaging";

export default function HomeNetworkTeaser() {
  const { eyebrow, title, description, stats, primaryHref, primaryLabel, secondaryHref, secondaryLabel } =
    homeNetworkTeaser;

  return (
    <section className="bg-muted/50 py-20 sm:py-28">
      <div className="page-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="overflow-hidden rounded-[1.75rem] bg-white">
          <HubImage variant="intercityWide" aspectClass="aspect-[16/10]" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-forest-500">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-forest-900 sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-forest-500">{description}</p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.stat} className="rounded-xl border border-border bg-white px-4 py-3">
                <dt className="font-mono text-lg font-semibold text-forest-900">{item.stat}</dt>
                <dd className="mt-1 text-xs leading-relaxed text-forest-500">{item.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href={primaryHref} className="btn-primary rounded-full px-6 py-3 text-sm">
              {primaryLabel}
            </Link>
            <Link href={secondaryHref} className="text-sm font-medium">
              {secondaryLabel} ›
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
