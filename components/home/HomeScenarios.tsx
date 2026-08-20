import Link from "next/link";
import { homeScenarios, scenarioSection } from "@/lib/brand-messaging";

export default function HomeScenarios() {
  return (
    <section className="home-section border-b border-border bg-muted/30">
      <div className="page-container">
        <div className="home-section-header">
          <p className="text-xs font-semibold uppercase tracking-widest text-forest-500">{scenarioSection.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-forest-900 sm:text-4xl">
            {scenarioSection.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-forest-500">{scenarioSection.description}</p>
        </div>

        <div className="home-section-grid grid gap-4 lg:grid-cols-3 lg:gap-5">
          {homeScenarios.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="home-scenario-card group flex h-full flex-col rounded-[1.75rem] border border-border bg-white p-6 transition-shadow hover:shadow-md sm:p-7"
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest text-charge-600">{item.audience}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-forest-900">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-forest-500">{item.text}</p>
              <p className="mt-4 text-xs font-medium uppercase tracking-wide text-forest-400">{item.products}</p>
              <span className="mt-5 text-sm font-medium text-forest-900 group-hover:text-charge-600">
                {item.cta} ›
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
