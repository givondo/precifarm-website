import HubConnectivityMap from "@/components/HubConnectivityMap";
import { LIVE_ROUTE_LABEL } from "@/lib/hub-locations";

export default function ConnectivityMapSection() {
  return (
    <section className="border-b border-border bg-white section-pad">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-charge-600">
              Live route
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-800">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" aria-hidden />
              Live
            </span>
          </div>
          <h2 className="heading-display mt-3 text-2xl sm:text-3xl">
            {LIVE_ROUTE_LABEL} charging hubs
          </h2>
          <p className="mt-4 text-base leading-relaxed text-forest-600">
            Kisumu, Nakuru and Nairobi depot — plus partner stops along the corridor. Search,
            filter, or pick a pin to see bay availability and directions.
          </p>
        </div>
        <div className="mt-8">
          <HubConnectivityMap />
        </div>
      </div>
    </section>
  );
}
