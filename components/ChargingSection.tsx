import Link from "next/link";
import ProductPhoto from "@/components/ProductPhoto";
import ProductShowcaseRow from "@/components/ProductShowcaseRow";
import SectionHeader from "@/components/ui/SectionHeader";
import { chargingOfferings, whereYouCharge } from "@/lib/charging";
import { productNames } from "@/lib/home-products";

type CopyPart = string | { readonly bold: string };

function EmphasizedBody({ parts }: { parts: readonly CopyPart[] }) {
  return (
    <p className="mt-4 text-sm leading-relaxed text-forest-600/85 sm:text-base">
      {parts.map((part, index) =>
        typeof part === "string" ? (
          part
        ) : (
          <strong key={`${part.bold}-${index}`} className="font-semibold text-forest-900">
            {part.bold}
          </strong>
        ),
      )}
    </p>
  );
}

function OfferingProducts({
  products,
}: {
  products: readonly {
    id: string;
    src: string;
    alt: string;
  }[];
}) {
  return (
    <ProductShowcaseRow
      products={products.map((item) => ({
        src: item.src,
        alt: item.alt,
        label: productNames[item.id as keyof typeof productNames],
      }))}
    />
  );
}

function HighwayVisual() {
  const { routeHub } = chargingOfferings;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-xl">
      <ProductPhoto
        src={routeHub.image}
        alt={routeHub.imageAlt}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="mx-auto aspect-[4/3] w-full object-contain"
        priority
      />
    </div>
  );
}

export default function ChargingSection() {
  const { home, privateSite } = chargingOfferings;
  const visuals = {
    home: <OfferingProducts products={home.products} />,
    privateSite: <OfferingProducts products={privateSite.products} />,
    routeHub: <HighwayVisual />,
  } as const;

  return (
    <div className="page-container section-pad">
      <SectionHeader eyebrow={whereYouCharge.eyebrow} title={whereYouCharge.title} />
      <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-forest-800">
        {whereYouCharge.lead}
      </p>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-forest-600">
        {whereYouCharge.description}
      </p>

      <div className="mt-14 space-y-16">
        {whereYouCharge.pillars.map((pillar, index) => {
          const visual = visuals[pillar.offeringsKey];
          const copyFirst = index % 2 === 0;

          return (
            <article
              key={pillar.id}
              className="grid items-center gap-8 border-t border-border pt-16 first:border-t-0 first:pt-0 lg:grid-cols-2 lg:gap-10"
            >
              <div className={copyFirst ? "order-2 lg:order-1" : "order-2"}>{visual}</div>
              <div className={copyFirst ? "order-1 lg:order-2" : "order-1"}>
                <p className="text-eyebrow text-xs font-semibold uppercase tracking-widest text-forest-500">
                  {pillar.eyebrow}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-forest-900 sm:text-2xl">{pillar.title}</h3>
                <EmphasizedBody parts={pillar.body} />
                <p className="mt-4 font-mono text-xs font-medium tracking-wide text-forest-500 sm:text-sm">
                  {pillar.products}
                </p>
                <Link
                  href={pillar.cta.href}
                  className={`mt-6 inline-flex rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                    pillar.id === "fleet"
                      ? "border border-forest-200 text-forest-900 hover:bg-forest-50"
                      : "bg-charge-600 text-white hover:bg-charge-500"
                  }`}
                >
                  {pillar.cta.label} →
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-16 rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
        <p className="text-eyebrow text-xs font-semibold uppercase tracking-widest text-charge-600">
          Engineering
        </p>
        <h2 className="mt-2 text-xl font-semibold text-forest-900 sm:text-2xl">Design basis for sites</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-forest-600">
          Energy model, typical site plan and Kenya Power hold points for home, fleet and highway hubs.
          Concept reference — not construction drawings.
        </p>
        <Link
          href="/charging/engineering"
          className="mt-6 inline-flex rounded-full border border-forest-200 px-6 py-2.5 text-sm font-semibold text-forest-900 transition-colors hover:bg-white"
        >
          Engineering package →
        </Link>
      </div>
    </div>
  );
}
