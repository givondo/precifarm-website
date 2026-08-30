import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import { productRangeSection } from "@/lib/brand-messaging";
import { flagshipIds, flagshipProductDetails, type FlagshipProductId } from "@/lib/home-products";
import { productImages } from "@/lib/product-images";

function flagshipImage(id: FlagshipProductId) {
  const shot = productImages[id];
  return { src: shot.src, alt: shot.alt };
}

function FlagshipCard({ id, priority = false }: { id: FlagshipProductId; priority?: boolean }) {
  const product = flagshipProductDetails[id];
  const image = flagshipImage(id);

  return (
    <article className="home-flagship-card flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-white">
      <div className="flex min-h-[200px] items-center justify-center bg-[#f5f5f7] px-5 pb-3 pt-7 sm:min-h-[240px] sm:px-6 sm:pt-9">
        <div className="relative mx-auto aspect-[4/3] w-full max-w-[260px] sm:max-w-[280px]">
          <SiteImage
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 45vw, 25vw"
            priority={priority}
            className="object-contain p-1"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-8 pt-5 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-400">{product.shortName}</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-forest-900">{product.headline}</h3>
        <p className="mt-3 text-sm font-semibold leading-snug text-forest-900">{product.hook}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-forest-500">{product.description}</p>
        <p className="mt-5 font-mono text-sm font-semibold text-forest-900">{product.priceLabel}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${product.shortName} highlights`}>
          {product.specs.map((spec) => (
            <li
              key={spec}
              className="rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-forest-600"
            >
              {spec}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-sm text-forest-500">
          <span className="font-medium text-forest-700">Best for:</span> {product.bestFor}
        </p>

        <Link
          href={product.href}
          className="mt-5 inline-flex text-sm font-semibold text-forest-900 transition-colors hover:text-charge-600"
        >
          {product.ctaLabel} →
        </Link>
      </div>
    </article>
  );
}

export default function HomeFlagships() {
  const section = productRangeSection;

  return (
    <section id="products" className="home-section scroll-mt-20 bg-white pt-0">
      <div className="page-container">
        <div className="home-section-header mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-forest-500">{section.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-forest-900 sm:text-4xl">{section.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-forest-600">{section.description}</p>
          <p className="mt-2 text-base font-medium text-forest-900">{section.subline}</p>
        </div>

        <div className="home-section-grid mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {flagshipIds.map((id, index) => (
            <FlagshipCard key={id} id={id} priority={index < 2} />
          ))}
        </div>

        <div className="mt-12 rounded-[1.75rem] border border-border bg-muted/30 px-6 py-8 text-center sm:px-10 sm:py-10">
          <h3 className="text-2xl font-semibold tracking-tight text-forest-900 sm:text-3xl">{section.footer.title}</h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {section.footer.items.map((item) => (
              <li key={item.name} className="text-sm text-forest-600">
                <span className="font-semibold text-forest-900">{item.name}</span> — {item.line}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-medium text-forest-700">{section.footer.accountLine}</p>
          <Link
            href={section.footer.cta.href}
            className="mt-5 inline-flex items-center justify-center rounded-full bg-charge-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-charge-500"
          >
            {section.footer.cta.label} →
          </Link>
        </div>
      </div>
    </section>
  );
}
