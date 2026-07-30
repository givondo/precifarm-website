export type AvailabilityStatus = "available" | "limited" | "busy";
export type HubOperator = "precifarm" | "partner";
export type HubPhase = "live" | "next" | "planned";

export type ChargingHub = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  operator: HubOperator;
  /** Partner brand or venue name when operator is partner */
  partnerName?: string;
  availability: AvailabilityStatus;
  freeBays: number;
  totalChargers: number;
  route?: string;
  phase?: HubPhase;
  role: string;
};

export type RoutePhase = {
  id: string;
  label: string;
  phase: HubPhase;
  path: { lat: number; lng: number }[];
};

/** Illustrative live-demo availability — not real-time telemetry */
export const chargingHubs: ChargingHub[] = [
  {
    id: "kisumu",
    name: "Kisumu Hub",
    lat: -0.1022,
    lng: 34.7617,
    operator: "precifarm",
    availability: "available",
    freeBays: 3,
    totalChargers: 4,
    route: "Nairobi – Kisumu",
    phase: "live",
    role: "Western terminus hub",
  },
  {
    id: "nakuru",
    name: "Nakuru Hub",
    lat: -0.3031,
    lng: 36.08,
    operator: "precifarm",
    availability: "limited",
    freeBays: 1,
    totalChargers: 3,
    route: "Nairobi – Kisumu",
    phase: "live",
    role: "En-route charging",
  },
  {
    id: "nairobi",
    name: "Nairobi Depot",
    lat: -1.2921,
    lng: 36.8219,
    operator: "precifarm",
    availability: "busy",
    freeBays: 0,
    totalChargers: 6,
    route: "All routes",
    phase: "live",
    role: "Depot & hub access",
  },
  {
    id: "mtito-andei",
    name: "Mtito Andei Hub",
    lat: -2.6922,
    lng: 38.1667,
    operator: "precifarm",
    availability: "available",
    freeBays: 2,
    totalChargers: 2,
    route: "Nairobi – Mombasa",
    phase: "next",
    role: "En-route hub",
  },
  {
    id: "voi",
    name: "Voi Hub",
    lat: -3.3963,
    lng: 38.5565,
    operator: "precifarm",
    availability: "limited",
    freeBays: 1,
    totalChargers: 2,
    route: "Nairobi – Mombasa",
    phase: "next",
    role: "En-route hub",
  },
  {
    id: "mombasa",
    name: "Mombasa Hub",
    lat: -4.0435,
    lng: 39.6682,
    operator: "precifarm",
    availability: "available",
    freeBays: 2,
    totalChargers: 4,
    route: "Nairobi – Mombasa",
    phase: "next",
    role: "Coast terminus hub",
  },
  {
    id: "garissa",
    name: "Garissa Hub",
    lat: -0.4536,
    lng: 39.6461,
    operator: "precifarm",
    availability: "limited",
    freeBays: 1,
    totalChargers: 2,
    route: "Nairobi – Garissa",
    phase: "planned",
    role: "Eastern terminus hub",
  },
  {
    id: "eldoret",
    name: "Eldoret Engineering",
    lat: 0.5143,
    lng: 35.2698,
    operator: "precifarm",
    availability: "available",
    freeBays: 1,
    totalChargers: 1,
    phase: "planned",
    role: "Regional engineering",
  },
  {
    id: "kitui",
    name: "Kitui Engineering",
    lat: -1.3744,
    lng: 38.0106,
    operator: "precifarm",
    availability: "available",
    freeBays: 1,
    totalChargers: 1,
    phase: "planned",
    role: "Regional engineering",
  },
  {
    id: "partner-shell-langata",
    name: "Shell Langata",
    lat: -1.3456,
    lng: 36.7892,
    operator: "partner",
    partnerName: "Shell",
    availability: "available",
    freeBays: 2,
    totalChargers: 2,
    route: "Nairobi – Mombasa",
    role: "Fuel station partner site",
  },
  {
    id: "partner-total-westlands",
    name: "Total Energies Westlands",
    lat: -1.2678,
    lng: 36.8074,
    operator: "partner",
    partnerName: "Total Energies",
    availability: "busy",
    freeBays: 0,
    totalChargers: 2,
    role: "Urban fast-charge partner",
  },
  {
    id: "partner-two-rivers",
    name: "Two Rivers Mall",
    lat: -1.2112,
    lng: 36.8567,
    operator: "partner",
    partnerName: "Two Rivers",
    availability: "limited",
    freeBays: 1,
    totalChargers: 3,
    role: "Mall parking partner hub",
  },
  {
    id: "partner-naivas-nakuru",
    name: "Naivas Nakuru",
    lat: -0.2891,
    lng: 36.0654,
    operator: "partner",
    partnerName: "Naivas",
    availability: "available",
    freeBays: 2,
    totalChargers: 2,
    route: "Nairobi – Kisumu",
    role: "Retail partner en-route stop",
  },
  {
    id: "partner-tuskys-kisumu",
    name: "Tuskys Kisumu",
    lat: -0.0912,
    lng: 34.7689,
    operator: "partner",
    partnerName: "Tuskys",
    availability: "busy",
    freeBays: 0,
    totalChargers: 2,
    route: "Nairobi – Kisumu",
    role: "Retail partner terminus area",
  },
  {
    id: "partner-bamburi-mombasa",
    name: "Bamburi Fuel Mombasa",
    lat: -4.0156,
    lng: 39.7123,
    operator: "partner",
    partnerName: "Bamburi",
    availability: "available",
    freeBays: 1,
    totalChargers: 2,
    route: "Nairobi – Mombasa",
    role: "Coast fuel partner site",
  },
  {
    id: "partner-ku",
    name: "Kenyatta University",
    lat: -1.1805,
    lng: 36.9267,
    operator: "partner",
    partnerName: "Kenyatta University",
    availability: "limited",
    freeBays: 1,
    totalChargers: 2,
    role: "Campus partner charging",
  },
  {
    id: "partner-thika-road",
    name: "Thika Road Mall",
    lat: -1.2198,
    lng: 36.8891,
    operator: "partner",
    partnerName: "Thika Road Mall",
    availability: "available",
    freeBays: 2,
    totalChargers: 3,
    role: "Mall partner hub",
  },
  {
    id: "partner-gilgil",
    name: "Gilgil Service Stop",
    lat: -0.5045,
    lng: 36.3212,
    operator: "partner",
    partnerName: "Kenol Kobil",
    availability: "available",
    freeBays: 1,
    totalChargers: 2,
    route: "Nairobi – Kisumu",
    role: "Highway partner en-route",
  },
];

export const routePhases: RoutePhase[] = [
  {
    id: "phase-a",
    label: "Phase A · Nairobi – Kisumu",
    phase: "live",
    path: [
      { lat: -0.1022, lng: 34.7617 },
      { lat: -0.3031, lng: 36.08 },
      { lat: -1.2921, lng: 36.8219 },
    ],
  },
  {
    id: "phase-b",
    label: "Phase B · Nairobi – Mombasa",
    phase: "next",
    path: [
      { lat: -1.2921, lng: 36.8219 },
      { lat: -2.6922, lng: 38.1667 },
      { lat: -3.3963, lng: 38.5565 },
      { lat: -4.0435, lng: 39.6682 },
    ],
  },
  {
    id: "phase-c",
    label: "Phase C · Nairobi – Garissa",
    phase: "planned",
    path: [
      { lat: -1.2921, lng: 36.8219 },
      { lat: -0.9234, lng: 37.8123 },
      { lat: -0.4536, lng: 39.6461 },
    ],
  },
];

export const KENYA_CENTER = { lat: -0.5, lng: 37.5 };
export const DEFAULT_ZOOM = 6;

/** Canon live route — Nairobi–Kisumu only on Charge Map */
export const LIVE_ROUTE_LABEL = "Nairobi – Kisumu";

export const LIVE_ROUTE_CENTER = { lat: -0.72, lng: 35.75 };
export const LIVE_ROUTE_ZOOM = 7;

export function isLiveRouteHub(hub: ChargingHub): boolean {
  return hub.phase === "live" || hub.route === LIVE_ROUTE_LABEL;
}

export const liveRouteHubs = chargingHubs.filter(isLiveRouteHub);

export const liveRoutePhases = routePhases.filter((route) => route.phase === "live");

export type HubFilter = "all" | "precifarm" | "partners" | "available";

export function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

export function googleDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function filterHubs(
  hubs: ChargingHub[],
  filter: HubFilter,
): ChargingHub[] {
  switch (filter) {
    case "precifarm":
      return hubs.filter((h) => h.operator === "precifarm");
    case "partners":
      return hubs.filter((h) => h.operator === "partner");
    case "available":
      return hubs.filter((h) => h.availability === "available");
    default:
      return hubs;
  }
}

export function sortHubsByDistance(
  hubs: ChargingHub[],
  userLat: number,
  userLng: number,
): (ChargingHub & { distanceKm: number })[] {
  return hubs
    .map((hub) => ({
      ...hub,
      distanceKm: haversineKm(userLat, userLng, hub.lat, hub.lng),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

export const availabilityConfig: Record<
  AvailabilityStatus,
  { label: string; color: string; bgClass: string; textClass: string }
> = {
  available: {
    label: "Free",
    color: "#22c55e",
    bgClass: "bg-forest-100 border-forest-200 text-forest-700",
    textClass: "text-forest-700",
  },
  limited: {
    label: "Limited",
    color: "#f59e0b",
    bgClass: "bg-amber-500/15 border-amber-500/30 text-amber-400",
    textClass: "text-amber-400",
  },
  busy: {
    label: "Busy",
    color: "#ef4444",
    bgClass: "bg-red-500/15 border-red-500/30 text-red-400",
    textClass: "text-red-400",
  },
};

export const phaseRouteColors: Record<HubPhase, string> = {
  live: "#22c55e",
  next: "#fbbf24",
  planned: "#94a3b8",
};
