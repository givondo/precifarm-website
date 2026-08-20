import Link from "next/link";
import { productRangeSection } from "@/lib/brand-messaging";
import { compactRangeIds, homeProducts, type HomeProduct } from "@/lib/home-products";

function CompactCard({ product }: { product: HomeProduct }) {
  return (
    <Link
      href={product.href}
      className="home-range-compact-card flex h-full flex-col rounded-2xl border border-border bg-muted/30 px-5 py-5 transition-colors hover:border-forest-300 hover:bg-white"
    >
      <h3 className="text-base font-semibold text-forest-900">{product.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-500">{product.summary}</p>
      <p className="mt-3 font-mono text-xs font-semibold text-forest-700">{product.priceLabel}</p>
    </Link>
  );
}

export default function HomeRangeCompact() {
  const products = compactRangeIds
    .map((id) => homeProducts.find((product) => product.id === id))
    .filter((product): product is HomeProduct => Boolean(product));

  return (
    <section className="border-t border-border bg-white pb-10 pt-0 sm:pb-12">
      <div className="page-container">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-xl font-semibold tracking-tight text-forest-900 sm:text-2xl">
            {productRangeSection.compactTitle}
          </h2>
        </div>

        <div className="home-section-grid grid gap-3 sm:grid-cols-2">
          {products.map((product) => (
            <CompactCard key={product.id} product={product} />
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-lg text-center text-sm leading-relaxed text-forest-500">
          {productRangeSection.compactDescription}
        </p>
      </div>
    </section>
  );
}
