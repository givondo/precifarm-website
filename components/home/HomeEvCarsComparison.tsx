import Link from "next/link";
import ChargingTimeCell from "@/components/evs/ChargingTimeCell";
import { kenyaEvFeaturedModels, kenyaEvHomeSection } from "@/lib/kenya-ev-compatibility";

export default function HomeEvCarsComparison() {
  const { id, eyebrow, title, description, footnote, fullGuideCta } = kenyaEvHomeSection;

  return (
    <section id={id} className="home-section scroll-mt-20 border-t border-border bg-white">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-forest-500">{eyebrow}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-forest-900 sm:text-3xl">{title}</h2>
          <p className="mt-3 text-base leading-relaxed text-forest-500">{description}</p>
        </div>

        <div className="home-section-grid mt-8 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th scope="col" className="px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-forest-500">
                  Model
                </th>
                <th scope="col" className="px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-forest-500">
                  Practical range*
                </th>
                <th scope="col" className="px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-forest-500">
                  Charging time
                </th>
                <th scope="col" className="px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-forest-500">
                  Precifarm
                </th>
              </tr>
            </thead>
            <tbody>
              {kenyaEvFeaturedModels.map((car, index) => (
                <tr
                  key={car.id}
                  className={index < kenyaEvFeaturedModels.length - 1 ? "border-b border-border" : undefined}
                >
                  <th scope="row" className="px-4 py-3 font-semibold text-forest-900">
                    {car.model}
                  </th>
                  <td className="px-4 py-3 font-mono text-forest-700">{car.practicalRange}</td>
                  <td className="px-4 py-3 align-top">
                    <ChargingTimeCell time={car.chargingTime} />
                  </td>
                  <td className="px-4 py-3 font-medium text-charge-700">{car.precifarmCharging}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mx-auto mt-3 max-w-2xl text-center text-xs leading-relaxed text-forest-400">{footnote}</p>

        <div className="mt-6 flex justify-center">
          <Link href={fullGuideCta.href} className="text-sm font-medium text-forest-900 hover:text-charge-600">
            {fullGuideCta.label} ›
          </Link>
        </div>
      </div>
    </section>
  );
}
