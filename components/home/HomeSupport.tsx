import { homeSupport, homeSupportSection } from "@/lib/brand-messaging";

export default function HomeSupport() {
  return (
    <section className="home-section border-b border-border bg-forest-900">
      <div className="page-container">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-charge-300">
            {homeSupportSection.eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {homeSupportSection.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
            {homeSupportSection.description}
          </p>
        </div>

        <div className="home-section-grid grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {homeSupport.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-charge-400">
                {item.label}
              </p>
              <p className="mt-2 font-mono text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {item.stat}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
