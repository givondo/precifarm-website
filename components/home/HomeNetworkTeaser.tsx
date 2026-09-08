import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import { homeNetworkTeaser } from "@/lib/brand-messaging";
import { productImages } from "@/lib/product-images";

export default function HomeNetworkTeaser() {
  const { eyebrow, title, description, stats, primaryHref, primaryLabel, secondaryHref, secondaryLabel } =
    homeNetworkTeaser;

  return (
    <section className="bg-muted/50 py-20 sm:py-28">
      <div className="page-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="overflow-hidden rounded-[1.75rem] bg-white p-6 sm:p-8">
          <SiteImage
            src={productImages.corridor.src}
            alt={productImages.corridor.alt}
            width={1200}
            height={900}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-[4/3] w-full object-contain"
          />
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
            <Link href={primaryHref} className="btn-primary">
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
