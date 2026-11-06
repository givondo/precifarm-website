"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import StageLabel, { type StageKind } from "@/components/interior/StageLabel";
import {
  finderConnector,
  finderConnectorLabel,
  finderHubs,
  finderPriceLabel,
  finderProductHref,
  finderRoutes,
  finderStage,
  finderType,
  finderTypeLabel,
  formatDistance,
  googleDirectionsUrl,
  LIVE_ROUTE_CENTER,
  siteKindConfig,
  sortHubsByDistance,
  type ChargingHub,
  type FinderConnector,
  type FinderStage,
  type FinderType,
} from "@/lib/hub-locations";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const mapLoading = () => (
  <div className="flex h-full items-center justify-center bg-[#eef0f2] text-sm text-forest-600" role="status">
    Loading map…
  </div>
);

const LeafletConnectivityMap = dynamic(() => import("./LeafletConnectivityMap"), { ssr: false, loading: mapLoading });
const GoogleConnectivityMap = dynamic(() => import("./GoogleConnectivityMap"), { ssr: false, loading: mapLoading });

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

type Filters = { type: "all" | FinderType; connector: "all" | FinderConnector; stage: "all" | FinderStage };
const defaultFilters: Filters = { type: "all", connector: "all", stage: "all" };

const stageKind: Record<FinderStage, StageKind> = { operating: "available", planned: "planned", partner: "partner-site" };
const stageLabel: Record<FinderStage, string> = { operating: "Operating", planned: "Planned", partner: "Partner site" };

const typeOptions: { value: Filters["type"]; label: string }[] = [
  { value: "all", label: "All" },
  { value: "corridor", label: "ARC Corridor DC" },
  { value: "swap", label: "Boda Hub swap" },
  { value: "partner", label: "Partner stops" },
];
const connectorOptions: { value: Filters["connector"]; label: string }[] = [
  { value: "all", label: "All" },
  { value: "ccs2", label: "CCS2" },
  { value: "swap-pack", label: "Swap pack" },
];
const stageOptions: { value: Filters["stage"]; label: string }[] = [
  { value: "all", label: "All" },
  { value: "operating", label: "Operating" },
  { value: "planned", label: "Planned" },
  { value: "partner", label: "Partner site" },
];

function matches(h: ChargingHub, f: Filters, q: string) {
  if (f.type !== "all" && finderType(h) !== f.type) return false;
  if (f.connector !== "all" && finderConnector(h) !== f.connector) return false;
  if (f.stage !== "all" && finderStage(h) !== f.stage) return false;
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  return [h.name, h.role, h.route ?? "", h.partnerName ?? "", finderTypeLabel[finderType(h)]].some((s) => s.toLowerCase().includes(needle));
}

type WithDistance = ChargingHub & { distanceKm?: number };

function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  count,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  count: (v: T) => number;
}) {
  return (
    <div role="group" aria-label={label} className="flex min-w-0 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
      <span className="w-24 shrink-0 text-[11px] font-semibold uppercase tracking-widest text-forest-500">{label}</span>
      <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 py-0.5 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
        {options.map((o) => {
          const n = count(o.value);
          const on = value === o.value;
          const disabled = n === 0 && !on;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={on}
              disabled={disabled}
              onClick={() => onChange(o.value)}
              className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium ring-1 ring-inset transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charge-600 ${
                on
                  ? "bg-forest-950 text-white ring-forest-950"
                  : disabled
                    ? "cursor-not-allowed bg-white text-forest-400 ring-border"
                    : "bg-white text-forest-800 ring-border hover:ring-forest-300"
              }`}
            >
              {o.label}
              <span className={`font-mono text-xs ${on ? "text-white/70" : "text-forest-500"}`}>{n}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const inNairobi = (h: ChargingHub) => h.lat > -1.45 && h.lat < -1.15 && h.lng > 36.6 && h.lng < 37.05;

function SiteFacts({ hub }: { hub: WithDistance }) {
  const rows = [
    { k: "Type", v: finderTypeLabel[finderType(hub)] },
    { k: "Connector", v: finderConnectorLabel[finderConnector(hub)] },
    ...(hub.route ? [{ k: "Route", v: hub.route }] : inNairobi(hub) ? [{ k: "Area", v: "Nairobi" }] : []),
    { k: "Availability", v: "Not shown. No live data until a site is operating." },
    { k: "Price", v: finderPriceLabel(hub) },
  ];
  if (hub.distanceKm != null) rows.splice(3, 0, { k: "Distance", v: `${formatDistance(hub.distanceKm)} in a straight line` });
  return (
    <dl className="mt-3 divide-y divide-border border-y border-border text-sm">
      {rows.map((r) => (
        <div key={r.k} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 py-2">
          <dt className="text-forest-500">{r.k}</dt>
          <dd className="text-forest-900">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

function SiteDetail({ hub, onClose }: { hub: WithDistance; onClose?: () => void }) {
  const stage = finderStage(hub);
  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_-12px_rgba(17,24,39,0.35)] ring-1 ring-border sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <StageLabel kind={stageKind[stage]} label={stageLabel[stage]} />
          <h3 className="mt-2 text-lg font-semibold leading-snug text-forest-950">{hub.name}</h3>
          <p className="text-sm text-forest-600">{hub.role}</p>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close site details"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-forest-500 hover:bg-[#f1f3f4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-charge-600"
          >
            <span aria-hidden className="text-xl leading-none">×</span>
          </button>
        ) : null}
      </div>
      <SiteFacts hub={hub} />
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={googleDirectionsUrl(hub.lat, hub.lng)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-forest-950 px-4 text-sm font-semibold text-white hover:bg-forest-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charge-600"
        >
          View location in Maps
          <span className="sr-only"> (opens Google Maps in a new tab)</span>
        </a>
        <Link
          href={finderProductHref(hub)}
          className="inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-semibold text-forest-800 ring-1 ring-border hover:ring-forest-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charge-600"
        >
          {hub.siteKind === "swap" ? "About Boda Hub" : "About ARC Corridor"}
        </Link>
      </div>
      {stage === "planned" ? <p className="mt-3 text-xs leading-relaxed text-forest-500">A planned location. There is nothing to charge or swap at here yet.</p> : null}
    </div>
  );
}

/** Station finder: filters, map and list. Every site is labelled by stage; none is shown with live availability. */
export default function HubFinder() {
  const reduced = usePrefersReducedMotion();
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState<"map" | "list">("list");
  const mapRef = useRef<HTMLDivElement | null>(null);
  const showOnMap = () => {
    setView("map");
    window.requestAnimationFrame(() => mapRef.current?.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" }));
  };
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [geo, setGeo] = useState<{ loading: boolean; error: string | null }>({ loading: false, error: null });

  // ?type=swap|corridor|partner preselects a site type (used by the Boda Hub and Corridor pages).
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("type");
    if (t === "swap" || t === "corridor" || t === "partner") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-off read of the URL after hydration
      setFilters((f) => ({ ...f, type: t }));
    }
  }, []);

  const filtered = useMemo(() => finderHubs.filter((h) => matches(h, filters, query)), [filters, query]);
  const withDistance: WithDistance[] = useMemo(
    () => (userLocation ? sortHubsByDistance(filtered, userLocation.lat, userLocation.lng) : filtered),
    [filtered, userLocation],
  );
  const selected = withDistance.find((h) => h.id === selectedId) ?? null;
  const fitKey = filtered.map((h) => h.id).join(",");

  const countFor = useCallback(
    <K extends keyof Filters>(key: K) =>
      (v: Filters[K]) =>
        finderHubs.filter((h) => matches(h, { ...filters, [key]: v }, query)).length,
    [filters, query],
  );

  const operating = finderHubs.filter((h) => finderStage(h) === "operating").length;
  const activeFilters = (Object.keys(filters) as (keyof Filters)[]).filter((k) => filters[k] !== "all").length + (query.trim() ? 1 : 0);

  const clear = () => {
    setFilters(defaultFilters);
    setQuery("");
  };

  const nearMe = () => {
    if (!("geolocation" in navigator)) {
      setGeo({ loading: false, error: "This browser cannot share a location. Search by town instead." });
      return;
    }
    setGeo({ loading: true, error: null });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        setGeo({ loading: false, error: null });
        const nearest = sortHubsByDistance(filtered, loc.lat, loc.lng)[0];
        if (nearest) setSelectedId(nearest.id);
      },
      () => setGeo({ loading: false, error: "Location was not shared. Check the browser permission, or search by town." }),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  };

  const mapProps = {
    hubs: filtered,
    routes: filters.type === "swap" ? [] : finderRoutes,
    mapCenter: LIVE_ROUTE_CENTER,
    mapZoom: 7,
    selectedHubId: selectedId,
    onSelectHub: (id: string) => setSelectedId(id),
    userLocation,
    nearMeActive: Boolean(userLocation),
  };

  return (
    <div>
      {/* controls */}
      <div className="rounded-2xl bg-white p-4 ring-1 ring-border sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block min-w-0 flex-1">
            <span className="sr-only">Search sites by name, town or route</span>
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-forest-400" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, town or route"
              className="min-h-12 w-full rounded-full border border-border bg-[#f6f7f8] pl-10 pr-4 text-[16px] text-forest-900 placeholder:text-forest-400 focus:border-charge-600 focus:bg-white focus:outline-none sm:text-sm"
            />
          </label>
          <button
            type="button"
            onClick={nearMe}
            disabled={geo.loading}
            aria-pressed={Boolean(userLocation)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-forest-800 ring-1 ring-border hover:ring-forest-300 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charge-600"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
            </svg>
            {geo.loading ? "Locating…" : userLocation ? "Sorted by distance" : "Near me"}
          </button>
        </div>

        <div className="mt-4 grid gap-3 border-t border-border pt-4">
          <ChipGroup label="Site type" options={typeOptions} value={filters.type} onChange={(v) => setFilters((f) => ({ ...f, type: v }))} count={countFor("type")} />
          <ChipGroup label="Connector" options={connectorOptions} value={filters.connector} onChange={(v) => setFilters((f) => ({ ...f, connector: v }))} count={countFor("connector")} />
          <ChipGroup label="Stage" options={stageOptions} value={filters.stage} onChange={(v) => setFilters((f) => ({ ...f, stage: v }))} count={countFor("stage")} />
        </div>
        {geo.error ? (
          <p className="mt-3 text-sm text-amber-800" role="alert">
            {geo.error}
          </p>
        ) : null}
      </div>

      {/* results bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-forest-700" aria-live="polite">
          <span className="font-semibold text-forest-950">
            {filtered.length} {filtered.length === 1 ? "site" : "sites"}
          </span>
          {" · "}
          {operating === 0 ? "none operating yet" : `${operating} operating`}
          {activeFilters ? (
            <>
              {" · "}
              <button type="button" onClick={clear} className="font-semibold text-charge-700 underline-offset-2 hover:underline">
                Clear filters
              </button>
            </>
          ) : null}
        </p>
        <div role="group" aria-label="View" className="inline-flex rounded-full bg-[#eef0f2] p-1 lg:hidden">
          {(["list", "map"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`min-h-10 rounded-full px-5 text-sm font-semibold capitalize focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charge-600 ${
                view === v ? "bg-white text-forest-950 shadow-sm" : "text-forest-600"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* list + map */}
      <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-5">
        <div className={`${view === "list" ? "" : "hidden"} lg:block`}>
          {withDistance.length === 0 ? (
            <div className="rounded-2xl bg-[#f6f7f8] p-6 text-sm leading-relaxed text-forest-700 ring-1 ring-border">
              <p className="font-semibold text-forest-950">No sites match these filters.</p>
              <p className="mt-1">
                No site is operating yet, and partner charging stops are added only once a partner agreement is confirmed.
              </p>
              <button type="button" onClick={clear} className="mt-3 font-semibold text-charge-700 underline-offset-2 hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <ul className="max-h-none space-y-2 lg:max-h-[38rem] lg:overflow-y-auto lg:pr-1" aria-label="Sites">
              {withDistance.map((h) => {
                const on = h.id === selectedId;
                const stage = finderStage(h);
                return (
                  <li key={h.id}>
                    <div className={`rounded-2xl bg-white ring-1 transition-shadow ${on ? "ring-2 ring-forest-950" : "ring-border"}`}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(on ? null : h.id)}
                        aria-expanded={on}
                        className="flex w-full items-start gap-3 rounded-2xl p-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charge-600"
                      >
                        <span
                          aria-hidden
                          className={`mt-1 h-3 w-3 shrink-0 ${h.siteKind === "swap" ? "rotate-45 rounded-[2px]" : "rounded-full"}`}
                          style={{ backgroundColor: siteKindConfig[h.siteKind].pinColor }}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="font-semibold text-forest-950">{h.name}</span>
                            <StageLabel kind={stageKind[stage]} label={stageLabel[stage]} />
                          </span>
                          <span className="mt-1 block text-sm text-forest-600">
                            {finderTypeLabel[finderType(h)]} · {finderConnector(h) === "ccs2" ? "CCS2" : "Swap pack"}
                            {h.route ? ` · ${h.route}` : ""}
                            {h.distanceKm != null ? ` · ${formatDistance(h.distanceKm)}` : ""}
                          </span>
                        </span>
                      </button>
                      {on ? (
                        <div className="px-4 pb-4 lg:hidden">
                          <SiteFacts hub={h} />
                          <div className="mt-3 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={showOnMap}
                              className="inline-flex min-h-11 items-center rounded-full bg-forest-950 px-4 text-sm font-semibold text-white"
                            >
                              Show on map
                            </button>
                            <a
                              href={googleDirectionsUrl(h.lat, h.lng)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold text-forest-800 ring-1 ring-border"
                            >
                              View in Maps
                              <span className="sr-only"> (opens Google Maps in a new tab)</span>
                            </a>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div ref={mapRef} className={`scroll-mt-28 ${view === "map" ? "" : "hidden"} lg:block`}>
          <div className="relative h-[62vh] min-h-[22rem] overflow-hidden rounded-2xl bg-[#eef0f2] ring-1 ring-border lg:h-[38rem]">
            {googleMapsApiKey ? (
              <GoogleConnectivityMap apiKey={googleMapsApiKey} {...mapProps} />
            ) : (
              <LeafletConnectivityMap {...mapProps} visibleKey={view} fitKey={fitKey} reducedMotion={reduced} />
            )}
            <div className="pointer-events-none absolute right-3 top-3 z-[500] flex flex-col items-end gap-1.5">
              <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-forest-800 shadow-sm ring-1 ring-border">
                Planned locations, not live availability
              </span>
            </div>
            {selected ? (
              <div className="absolute inset-x-3 bottom-3 z-[500] hidden sm:left-auto sm:w-[22rem] lg:block">
                <SiteDetail hub={selected} onClose={() => setSelectedId(null)} />
              </div>
            ) : null}
          </div>
          {selected ? (
            <div className="mt-3 lg:hidden">
              <SiteDetail hub={selected} onClose={() => setSelectedId(null)} />
            </div>
          ) : (
            <p className="mt-2 text-xs text-forest-500 lg:hidden">Tap a pin to see the site.</p>
          )}
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-forest-600">
            <li className="flex items-center gap-2">
              <span aria-hidden className="h-3 w-3 rounded-full" style={{ backgroundColor: siteKindConfig.dc.pinColor }} />
              ARC Corridor DC
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="h-3 w-3 rotate-45 rounded-[2px]" style={{ backgroundColor: siteKindConfig.swap.pinColor }} />
              Boda Hub swap
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="w-6 border-t-2 border-dashed border-amber-400" />
              Nairobi to Kisumu, the first Corridor route (indicative line)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
