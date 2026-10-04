import Link from "next/link";
import { homeScenarios, scenarioSection } from "@/lib/brand-messaging";

export default function HomeScenarios() {
  return (
    <section className="home-section border-b border-border bg-muted/30">
      <div className="page-container">
        <div className="home-section-header mx-auto max-w-2xl text-center lg:max-w-3xl">
          <p className="text-eyebrow">{scenarioSection.eyebrow}</p>
          <h2 className="heading-display mt-3 text-2xl text-forest-900 sm:text-3xl lg:text-4xl">
            {scenarioSection.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-forest-600 sm:text-base">{scenarioSection.description}</p>
        </div>

        <div className="home-section-grid mt-10 grid gap-4 lg:grid-cols-3 lg:gap-5">
          {homeScenarios.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="home-scenario-card group flex h-full flex-col rounded-[1.75rem] border border-border bg-white p-6 transition-[box-shadow,border-color] hover:border-forest-200 hover:shadow-md sm:p-7"
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest text-charge-600">{item.audience}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-forest-900 sm:text-2xl">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-forest-600">{item.text}</p>
              <p className="mt-4 text-xs font-medium uppercase tracking-wide text-forest-400">
                {item.products}
              </p>
              <span className="mt-5 inline-flex items-center text-sm font-semibold text-forest-900 group-hover:text-charge-600">
                {item.cta}
                <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">
                  ›
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
