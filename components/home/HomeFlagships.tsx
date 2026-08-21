import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import { productRangeSection } from "@/lib/brand-messaging";
import { flagshipIds, categoryLabels, homeProducts, type HomeProduct } from "@/lib/home-products";
import { productImages } from "@/lib/product-images";

function flagshipImage(product: HomeProduct) {
  const shot = productImages[product.id as keyof typeof productImages];
  return shot ? { src: shot.src, alt: shot.alt } : { src: product.image, alt: product.imageAlt };
}

function FlagshipCard({ product, priority = false }: { product: HomeProduct; priority?: boolean }) {
  const image = flagshipImage(product);

  return (
    <Link
      href={product.href}
      className="home-flagship-card group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-white transition-shadow hover:shadow-lg hover:shadow-black/[0.06]"
    >
      <div className="flex min-h-[200px] items-center justify-center bg-muted/25 px-5 pb-3 pt-7 sm:min-h-[240px] sm:px-6 sm:pt-9">
        <div className="relative mx-auto aspect-[4/3] w-full max-w-[260px] sm:max-w-[280px]">
          <SiteImage
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 45vw, 25vw"
            priority={priority}
            className="object-contain p-1 transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-6 pb-8 pt-4 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-400">
          {categoryLabels[product.category]}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-forest-900">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-500">{product.summary}</p>
        <p className="mt-4 font-mono text-sm font-semibold text-forest-900">{product.priceLabel}</p>
        <span className="mt-3 text-sm font-medium text-forest-900">Learn more ›</span>
      </div>
    </Link>
  );
}

export default function HomeFlagships() {
  const products = flagshipIds
    .map((id) => homeProducts.find((product) => product.id === id))
    .filter((product): product is HomeProduct => Boolean(product));

  return (
    <section id="products" className="home-section scroll-mt-20 bg-white pt-0">
      <div className="page-container">
        <div className="home-section-header">
          <p className="text-xs font-semibold uppercase tracking-widest text-forest-500">
            {productRangeSection.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-forest-900 sm:text-4xl">
            {productRangeSection.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-forest-500">{productRangeSection.description}</p>
        </div>

        <div className="home-section-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {products.map((product, index) => (
            <FlagshipCard key={product.id} product={product} priority={index < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
