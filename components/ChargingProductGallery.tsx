import Link from "next/link";
import ProductPhoto from "@/components/ProductPhoto";
import SiteImage from "@/components/SiteImage";
import SectionHeader from "@/components/ui/SectionHeader";
import { homeProducts } from "@/lib/home-products";
import { productImages } from "@/lib/product-images";

const hardwareIds = ["spark", "pulse", "pod", "boda", "depot", "corridor"] as const;

export default function ChargingProductGallery() {
  const products = hardwareIds
    .map((id) => homeProducts.find((product) => product.id === id))
    .filter(Boolean);

  return (
    <section className="border-b border-border bg-white section-pad">
      <div className="page-container">
        <SectionHeader
          eyebrow="Hardware"
          title="The chargers we install and operate"
          description="Reference hardware for Spark charger through Corridor charging — Precifarm-branded, commissioned and monitored in Kenya."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {products.map((product) => (
            <Link
              key={product!.id}
              href={product!.href}
              className="group flex flex-col rounded-2xl border border-border bg-muted/20 p-4 transition-colors hover:border-forest-300 hover:bg-white"
            >
              <ProductPhoto
                src={product!.image}
                alt={product!.imageAlt}
                sizes="(max-width: 640px) 50vw, 20vw"
                className="mx-auto aspect-[4/3] w-full object-contain"
              />
              <h3 className="mt-4 text-center text-sm font-semibold text-forest-900 group-hover:text-charge-700">
                {product!.name}
              </h3>
              <p className="mt-1 text-center text-xs text-forest-500">{product!.priceLabel}</p>
            </Link>
          ))}
        </div>

        <figure className="mt-12 overflow-hidden rounded-2xl border border-border bg-forest-950 shadow-lg">
          <SiteImage
            src={productImages.corridorSafety.src}
            alt={productImages.corridorSafety.alt}
            width={1600}
            height={900}
            sizes="100vw"
            className="w-full object-cover"
          />
          <figcaption className="border-t border-forest-800 bg-forest-950 px-5 py-3 text-sm text-forest-200">
            Corridor DC includes overcharge, overload, short-circuit, lightning and leakage protection on every session.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
