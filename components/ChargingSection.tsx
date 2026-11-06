import Link from "next/link";
import ChargingComparison from "@/components/charging/ChargingComparison";
import ChargingExplorer from "@/components/charging/ChargingExplorer";
import { InteriorSection } from "@/components/interior";
import { chargingComparison, chargingNextSteps, chargingSegments } from "@/lib/charging";

/** /charging body: the product explorer, the side-by-side comparison and the next steps. */
export default function ChargingSection() {
  return (
    <>
      <InteriorSection
        id="explore"
        tone="silver"
        eyebrow="Where you charge"
        title="Pick the place, then the product."
        lead="Each product is built for how long a vehicle stands still: overnight at home, a shift at the depot, a stop on the highway, or a swap between rides."
      >
        <ChargingExplorer segments={chargingSegments} />
      </InteriorSection>

      <InteriorSection id="compare" eyebrow="Compare" title={chargingComparison.title} lead={chargingComparison.lead}>
        <ChargingComparison segments={chargingSegments} rows={chargingComparison.rows} />
        <p className="mt-4 text-xs leading-relaxed text-forest-500">
          Ratings are from the Precifarm engineering register and are design targets until tested. Status labels: Available is sold today after a survey; In
          development is engineered but not yet released; Pilot development is being prepared for a first site.
        </p>
      </InteriorSection>

      <section aria-labelledby="next-steps-title" className="border-t border-border bg-white py-14 sm:py-16">
        <div className="interior-container">
          <h2 id="next-steps-title" className="sr-only">
            Next steps
          </h2>
          <ul className="grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border md:grid-cols-3">
            {chargingNextSteps.map((n) => (
              <li key={n.title} className="flex flex-col bg-white p-5 sm:p-6">
                <p className="text-base font-semibold text-forest-900">{n.title}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-600">{n.text}</p>
                <Link href={n.href} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold">
                  {n.label} <span aria-hidden className="ml-1">›</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
