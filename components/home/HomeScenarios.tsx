import Link from "next/link";
import { homeScenarios, scenarioSection } from "@/lib/brand-messaging";

export default function HomeScenarios() {
  return (
    <section className="hx-scenarios" aria-labelledby="home-scenarios-title">
      <div className="hx-container py-24 sm:py-32">
        <div className="max-w-3xl">
          <p className="hx-eyebrow" data-reveal>
            {scenarioSection.eyebrow}
          </p>
          <h2 id="home-scenarios-title" className="hx-title mt-4" data-reveal>
            {scenarioSection.title}
          </h2>
          <p className="hx-lead mt-5 max-w-2xl" data-reveal>
            {scenarioSection.description}
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden bg-white/10 lg:grid-cols-3" data-reveal-stagger="120">
          {homeScenarios.map((item, index) => (
            <Link key={item.id} href={item.href} className="hx-card group" data-reveal>
              <span className="hx-card-index">{String(index + 1).padStart(2, "0")}</span>
              <p className="hx-eyebrow mt-10">{item.audience}</p>
              <h3 className="hx-card-title">{item.title}</h3>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-white/65">{item.text}</p>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">{item.products}</p>
              <span className="hx-card-cta">
                {item.cta}
                <span aria-hidden className="hx-card-arrow">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
