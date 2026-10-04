"use client";

import dynamic from "next/dynamic";

const HubConnectivityMap = dynamic(() => import("@/components/HubConnectivityMap"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-border bg-muted/30 text-sm text-forest-500">
      Loading map…
    </div>
  ),
});

export default function ChargingHubMap() {
  return (
    <section id="map" className="border-b border-border bg-muted/20 section-pad scroll-mt-20">
      <div className="page-container">
        <p className="text-eyebrow text-center">Live map</p>
        <h2 className="heading-display mt-2 text-center text-2xl text-forest-900 sm:text-3xl">
          Open and coming-soon sites
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-forest-600">
          Filter by highway DC, boda swap or partner stops. Labels reflect what is commissioned today — not a
          nationwide rollout claim.
        </p>
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
          <HubConnectivityMap />
        </div>
      </div>
    </section>
  );
}
