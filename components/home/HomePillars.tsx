import Link from "next/link";
import StatusBadge from "@/components/ui/StatusBadge";
import { programmes, type Pillar } from "@/lib/programmes";

const pillars: { id: Pillar; eyebrow: string; title: string; text: string }[] = [
  {
    id: "energy",
    eyebrow: "Precifarm Energy Infrastructure",
    title: "Charging and swapping, from the driveway to the highway.",
    text: "Chargers, swap cabinets and fast-charging sites, engineered for Kenyan grids and paid on M-Pesa.",
  },
  {
    id: "ai",
    eyebrow: "Precifarm AI Systems",
    title: "Private AI agents that do engineering work.",
    text: "Local-first models and agent workflows, with a person approving every result. The same tools that engineer our sites.",
  },
];

export default function HomePillars() {
  return (
    <section className="home-section border-b border-border bg-white" aria-labelledby="home-pillars-title">
      <div className="page-container">
        <div className="home-section-header mx-auto max-w-2xl text-center lg:max-w-3xl">
          <p className="text-eyebrow">What we build</p>
          <h2 id="home-pillars-title" className="heading-display mt-3 text-2xl text-forest-900 sm:text-3xl lg:text-4xl">
            Two pillars. Six programmes.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-forest-600 sm:text-base">
            Every programme carries its real status: available, pilot, in development or research.
          </p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {pillars.map((pl) => (
            <article key={pl.id} className="flex flex-col rounded-[1.75rem] border border-border p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-charge-600">{pl.eyebrow}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-forest-900 sm:text-2xl">{pl.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-forest-600">{pl.text}</p>
              <ul className="mt-6 divide-y divide-border rounded-xl border border-border">
                {programmes
                  .filter((p) => p.pillar === pl.id)
                  .map((p) => (
                    <li key={p.id}>
                      <Link href={p.href} className="group flex items-center justify-between gap-4 px-4 py-3.5">
                        <span>
                          <span className="block text-sm font-semibold text-forest-900 group-hover:text-charge-600">{p.name}</span>
                          <span className="block text-xs text-forest-500">{p.headline}</span>
                        </span>
                        <StatusBadge status={p.status} className="shrink-0" />
                      </Link>
                    </li>
                  ))}
                {pl.id === "ai" ? (
                  <li>
                    <Link href="/agent" className="group flex items-center justify-between gap-4 px-4 py-3.5">
                      <span>
                        <span className="block text-sm font-semibold text-forest-900 group-hover:text-charge-600">Precifarm Agent</span>
                        <span className="block text-xs text-forest-500">Hosted energy engineering assistant</span>
                      </span>
                      <StatusBadge status="available" label="Hosted" className="shrink-0" />
                    </Link>
                  </li>
                ) : null}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
