import ProductPhoto from "@/components/ProductPhoto";

type ProductItem = {
  src: string;
  alt: string;
  label?: string;
};

type Props = {
  products: readonly ProductItem[];
  className?: string;
};

/** Row of product shots — used on charging and partner pages (not homepage). */
export default function ProductShowcaseRow({ products, className = "" }: Props) {
  return (
    <div
      className={`grid gap-3 ${
        products.length === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : products.length === 4
          ? "grid-cols-2 lg:grid-cols-4"
          : products.length === 6
            ? "grid-cols-3 sm:grid-cols-6"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      } ${className}`}
    >
      {products.map((product) => (
        <div
          key={product.src}
          className="overflow-hidden rounded-2xl border border-border bg-white p-3 shadow-sm"
        >
          <ProductPhoto
            src={product.src}
            alt={product.alt}
            sizes="(max-width: 1024px) 33vw, 20vw"
            className="mx-auto aspect-[4/3] w-full object-contain"
          />
          {product.label ? (
            <p className="mt-2 text-center text-xs font-medium text-forest-600">{product.label}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
