import HubConnectivityMap from "@/components/HubConnectivityMap";
import { chargingHubPage } from "@/lib/charging-hub";
import { getChargingMapStats } from "@/lib/hub-locations";

export default function ConnectivityMapSection() {
  const { map } = chargingHubPage;
  const stats = getChargingMapStats();

  return (
    <section className="border-b border-border bg-gradient-to-b from-muted/30 to-white section-pad">
      <div className="page-container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-charge-600">
              {map.eyebrow}
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-800">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" aria-hidden />
              {map.liveBadge}
            </span>
          </div>
          <h2 className="heading-display mt-3 text-2xl sm:text-3xl">{map.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-forest-600">{map.description}</p>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
          {map.stats.map((item) => (
            <div
              key={item.key}
              className="rounded-2xl border border-border bg-white px-4 py-4 text-center shadow-sm"
            >
              <p className="font-mono text-2xl font-semibold tabular-nums text-forest-900">
                {stats[item.key as keyof typeof stats]}
                {item.suffix}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-forest-500">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <HubConnectivityMap />
        </div>
      </div>
    </section>
  );
}
