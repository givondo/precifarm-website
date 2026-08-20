"use client";

import { useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import { homeScenarios, productRangeSection } from "@/lib/brand-messaging";
import { homeProducts, type HomeProduct } from "@/lib/home-products";

type SegmentId = (typeof homeScenarios)[number]["id"];

const segmentIds = homeScenarios.map((item) => item.id);

function ProductCard({ product, className = "" }: { product: HomeProduct; className?: string }) {
  return (
    <Link
      href={product.href}
      className={`home-tile flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-muted px-8 pb-10 pt-8 text-center sm:px-10 sm:pt-10 ${className}`}
    >
      <SiteImage
        src={product.image}
        alt={product.imageAlt}
        width={800}
        height={600}
        sizes="(max-width: 640px) 100vw, 33vw"
        className="mx-auto aspect-[4/3] w-full max-w-sm object-contain"
      />
      <h3 className="mt-6 text-2xl font-semibold tracking-tight text-forest-900">{product.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-500">{product.tagline}</p>
      <p className="mt-4 text-sm text-forest-500">{product.priceLabel}</p>
    </Link>
  );
}

function ProductGrid({ products }: { products: HomeProduct[] }) {
  const gridClass =
    products.length === 1
      ? "mx-auto max-w-md"
      : products.length === 2
        ? "mx-auto grid max-w-3xl gap-4 sm:grid-cols-2 sm:gap-5"
        : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5";

  return (
    <div className={gridClass}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function HomeProductRange() {
  const [segmentId, setSegmentId] = useState<SegmentId>("home");

  const segment = homeScenarios.find((item) => item.id === segmentId) ?? homeScenarios[0];
  const products = useMemo(
    () =>
      segment.productIds
        .map((id) => homeProducts.find((product) => product.id === id))
        .filter((product): product is HomeProduct => Boolean(product)),
    [segment],
  );

  function selectSegment(id: SegmentId) {
    setSegmentId(id);
    document.getElementById(`segment-tab-${id}`)?.focus();
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, id: SegmentId) {
    const index = segmentIds.indexOf(id);
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectSegment(segmentIds[(index + 1) % segmentIds.length]);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectSegment(segmentIds[(index - 1 + segmentIds.length) % segmentIds.length]);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectSegment(segmentIds[0]);
    } else if (event.key === "End") {
      event.preventDefault();
      selectSegment(segmentIds[segmentIds.length - 1]);
    }
  }

  return (
    <section id="products" className="scroll-mt-20 bg-white pb-20 pt-6 sm:pb-28 sm:pt-8">
      <div className="page-container">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-forest-900 sm:text-4xl">
          {productRangeSection.eyebrow}.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-base text-forest-500">
          {productRangeSection.description}
        </p>

        <div
          role="tablist"
          aria-label="Choose a charging segment"
          className="mt-10 flex items-center justify-center gap-8 sm:gap-12"
        >
          {homeScenarios.map((item) => {
            const selected = item.id === segment.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`segment-tab-${item.id}`}
                aria-selected={selected}
                aria-controls={`segment-panel-${item.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setSegmentId(item.id)}
                onKeyDown={(event) => onTabKeyDown(event, item.id)}
                className={`border-b-2 pb-2 text-[15px] font-medium transition-colors ${
                  selected
                    ? "border-forest-900 text-forest-900"
                    : "border-transparent text-forest-400 hover:text-forest-700"
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </div>

        <p
          className="mx-auto mt-8 max-w-xl text-center text-base leading-relaxed text-forest-500"
          aria-live="polite"
        >
          {segment.text}
        </p>

        <div
          key={segment.id}
          id={`segment-panel-${segment.id}`}
          role="tabpanel"
          aria-labelledby={`segment-tab-${segment.id}`}
          className="mt-10"
        >
          <ProductGrid products={products} />
        </div>

        <p className="mt-10 text-center text-sm">
          <Link href={segment.href} className="font-medium">
            {segment.cta} ›
          </Link>
        </p>
      </div>
    </section>
  );
}
