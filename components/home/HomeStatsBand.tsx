import { whyItWorksMetrics } from "@/lib/metrics";

export default function HomeStatsBand() {
  return (
    <section className="home-stats-band border-y border-forest-900 section-pad">
      <div className="page-container">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-white/60">
          Nairobi–Kisumu · Route-one proof
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {whyItWorksMetrics.map((item) => (
            <div key={item.label} className="text-center lg:text-left">
              <p className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {item.stat}
              </p>
              <p className="mt-2 text-sm leading-snug text-white/70">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
