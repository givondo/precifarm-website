import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  africaSection,
  busSection,
  energyHubSection,
  energySection,
  engineeringJourney,
  engineeringSection,
  financeSection,
  fleetSection,
  paymentsSection,
} from "@/lib/brand-messaging";

function Status({ value }: { value: string }) {
  return (
    <span className="rounded-full border border-border bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-forest-500">
      {value}
    </span>
  );
}

export default function HomePlatform() {
  return (
    <>
      <section id="energy" className="border-b border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow={energySection.eyebrow}
            title={energySection.title}
            description={energySection.description}
            className="max-w-3xl"
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {energySection.layers.map((layer) => (
              <div key={layer.name} className="rounded-2xl border border-border bg-muted/20 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-forest-900">{layer.name}</h3>
                  <Status value={layer.status} />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-forest-600">{layer.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-forest-900 p-6 sm:p-8">
            <p className="text-eyebrow text-xs font-semibold uppercase tracking-widest text-charge-300">
              {energyHubSection.eyebrow}
            </p>
            <h3 className="heading-display mt-3 text-2xl text-white sm:text-3xl">{energyHubSection.title}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              {energyHubSection.description}
            </p>
            <Link
              href={energyHubSection.cta.href}
              className="mt-6 inline-flex rounded-full bg-charge-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-charge-500"
            >
              {energyHubSection.cta.label}
            </Link>
          </div>
        </div>
      </section>

      <section id="fleets" className="border-b border-border bg-muted/20 section-pad">
        <div className="page-container grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-charge-600">
              {busSection.eyebrow}
            </p>
            <h2 className="heading-display mt-3 text-2xl sm:text-3xl">{busSection.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-forest-600">{busSection.description}</p>
            <p className="mt-3 text-xs font-medium uppercase tracking-wider text-forest-500">{busSection.status}</p>
            <ul className="mt-5 space-y-2 text-sm text-forest-700">
              {busSection.points.map((point) => (
                <li key={point}>· {point}</li>
              ))}
            </ul>
            <Link href={busSection.cta.href} className="text-link mt-6 inline-flex text-sm font-semibold">
              {busSection.cta.label} →
            </Link>
          </div>
          <div>
            <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-charge-600">
              {fleetSection.eyebrow}
            </p>
            <h2 className="heading-display mt-3 text-2xl sm:text-3xl">{fleetSection.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-forest-600">{fleetSection.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {fleetSection.segments.map((segment) => (
                <span
                  key={segment}
                  className="rounded-full border border-border bg-white px-3 py-1.5 text-sm font-medium text-forest-800"
                >
                  {segment}
                </span>
              ))}
            </div>
            <Link
              href={fleetSection.cta.href}
              className="mt-6 inline-flex rounded-full bg-charge-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-charge-500"
            >
              {fleetSection.cta.label}
            </Link>
          </div>
        </div>
      </section>

      <section id="finance" className="border-b border-border bg-muted/20 section-pad">
        <div className="page-container grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-charge-600">
              {paymentsSection.eyebrow}
            </p>
            <h2 className="heading-display mt-3 text-2xl sm:text-3xl">{paymentsSection.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-forest-600">{paymentsSection.description}</p>
          </div>
          <div>
            <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-charge-600">
              {financeSection.eyebrow}
            </p>
            <h2 className="heading-display mt-3 text-2xl sm:text-3xl">{financeSection.title}</h2>
            <ul className="mt-5 space-y-3">
              {financeSection.products.map((item) => (
                <li key={item.name} className="rounded-xl border border-border bg-white px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-forest-900">{item.name}</p>
                    <Status value={item.status} />
                  </div>
                  <p className="mt-1 text-sm text-forest-600">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="engineering" className="border-b border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow={engineeringSection.eyebrow}
            title={engineeringSection.title}
            description={engineeringSection.description}
            className="max-w-3xl"
          />
          <ol className="mt-10 flex flex-wrap gap-2">
            {engineeringJourney.map((step, index) => (
              <li
                key={step}
                className="flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1.5 text-sm font-medium text-forest-800"
              >
                <span className="font-mono text-[10px] text-forest-500">{String(index + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
          <Link href={engineeringSection.cta.href} className="text-link mt-6 inline-flex text-sm font-semibold">
            {engineeringSection.cta.label} →
          </Link>
        </div>
      </section>

      <section id="africa" className="border-b border-border bg-forest-900 section-pad">
        <div className="page-container max-w-3xl">
          <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-charge-300">
            {africaSection.eyebrow}
          </p>
          <h2 className="heading-display mt-3 text-2xl text-white sm:text-3xl">{africaSection.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-white/75">{africaSection.description}</p>
        </div>
      </section>
    </>
  );
}
