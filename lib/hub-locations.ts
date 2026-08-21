export type AvailabilityStatus = "available" | "limited" | "busy";
export type HubOperator = "precifarm" | "partner";
export type HubPhase = "live" | "next" | "planned";
export type HubSiteKind = "dc" | "swap";

export type ChargingHub = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  operator: HubOperator;
  /** DC fast charge or Boda Hub battery swap */
  siteKind: HubSiteKind;
  /** Partner brand or venue name when operator is partner */
  partnerName?: string;
  availability: AvailabilityStatus;
  freeBays: number;
  totalChargers: number;
  route?: string;
  phase?: HubPhase;
  role: string;
  /** Typical swap time for Boda Hub sites */
  swapTime?: string;
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
    siteKind: "dc",
    availability: "available",
    freeBays: 3,
    totalChargers: 4,
    route: "Nairobi – Kisumu",
    phase: "live",
    role: "Western terminus · CCS2 & CHAdeMO DC",
  },
  {
    id: "nakuru",
    name: "Nakuru Hub",
    lat: -0.3031,
    lng: 36.08,
    operator: "precifarm",
    siteKind: "dc",
    availability: "limited",
    freeBays: 1,
    totalChargers: 3,
    route: "Nairobi – Kisumu",
    phase: "live",
    role: "En-route Corridor DC",
  },
  {
    id: "nairobi",
    name: "Nairobi Hub",
    lat: -1.2921,
    lng: 36.8219,
    operator: "precifarm",
    siteKind: "dc",
    availability: "busy",
    freeBays: 0,
    totalChargers: 6,
    route: "All routes",
    phase: "live",
    role: "Capital hub · corridor access",
  },
  {
    id: "mtito-andei",
    name: "Mtito Andei Hub",
    lat: -2.6922,
    lng: 38.1667,
    operator: "precifarm",
    siteKind: "dc",
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
    siteKind: "dc",
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
    siteKind: "dc",
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
    siteKind: "dc",
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
    siteKind: "dc",
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
    siteKind: "dc",
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
    siteKind: "dc",
    partnerName: "Shell",
    availability: "available",
    freeBays: 2,
    totalChargers: 2,
    route: "Nairobi – Mombasa",
    role: "Fuel station partner · DC",
  },
  {
    id: "partner-total-westlands",
    name: "Total Energies Westlands",
    lat: -1.2678,
    lng: 36.8074,
    operator: "partner",
    siteKind: "dc",
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
    siteKind: "dc",
    partnerName: "Two Rivers",
    availability: "limited",
    freeBays: 1,
    totalChargers: 3,
    role: "Mall parking partner · DC",
  },
  {
    id: "partner-naivas-nakuru",
    name: "Naivas Nakuru",
    lat: -0.2891,
    lng: 36.0654,
    operator: "partner",
    siteKind: "dc",
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
    siteKind: "dc",
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
    siteKind: "dc",
    partnerName: "Bamburi",
    availability: "available",
    freeBays: 1,
    totalChargers: 2,
    route: "Nairobi – Mombasa",
    role: "Coast fuel partner · DC",
  },
  {
    id: "partner-ku",
    name: "Kenyatta University",
    lat: -1.1805,
    lng: 36.9267,
    operator: "partner",
    siteKind: "dc",
    partnerName: "Kenyatta University",
    availability: "limited",
    freeBays: 1,
    totalChargers: 2,
    role: "Campus partner · DC",
  },
  {
    id: "partner-thika-road",
    name: "Thika Road Mall",
    lat: -1.2198,
    lng: 36.8891,
    operator: "partner",
    siteKind: "dc",
    partnerName: "Thika Road Mall",
    availability: "available",
    freeBays: 2,
    totalChargers: 3,
    role: "Mall partner · DC",
  },
  {
    id: "partner-gilgil",
    name: "Gilgil Service Stop",
    lat: -0.5045,
    lng: 36.3212,
    operator: "partner",
    siteKind: "dc",
    partnerName: "Kenol Kobil",
    availability: "available",
    freeBays: 1,
    totalChargers: 2,
    route: "Nairobi – Kisumu",
    role: "Highway partner en-route",
  },
  {
    id: "boda-westlands",
    name: "Boda Hub Westlands",
    lat: -1.2589,
    lng: 36.8034,
    operator: "precifarm",
    siteKind: "swap",
    availability: "available",
    freeBays: 5,
    totalChargers: 6,
    phase: "live",
    role: "Battery swap · Roam Air & compatible e-bodas",
    swapTime: "<5 min",
  },
  {
    id: "boda-cbd",
    name: "Boda Hub CBD",
    lat: -1.2864,
    lng: 36.8172,
    operator: "precifarm",
    siteKind: "swap",
    availability: "limited",
    freeBays: 2,
    totalChargers: 4,
    phase: "live",
    role: "City-centre swap · M-Pesa",
    swapTime: "<5 min",
  },
  {
    id: "boda-eastlands",
    name: "Boda Hub Eastlands",
    lat: -1.2765,
    lng: 36.8945,
    operator: "precifarm",
    siteKind: "swap",
    availability: "available",
    freeBays: 4,
    totalChargers: 5,
    phase: "live",
    role: "High-traffic boda corridor",
    swapTime: "<5 min",
  },
  {
    id: "boda-south-b",
    name: "Boda Hub South B",
    lat: -1.3135,
    lng: 36.8288,
    operator: "precifarm",
    siteKind: "swap",
    availability: "available",
    freeBays: 3,
    totalChargers: 4,
    phase: "live",
    role: "South Nairobi swap station",
    swapTime: "<5 min",
  },
  {
    id: "boda-karen",
    name: "Boda Hub Karen",
    lat: -1.3197,
    lng: 36.7073,
    operator: "precifarm",
    siteKind: "swap",
    availability: "limited",
    freeBays: 1,
    totalChargers: 3,
    phase: "live",
    role: "Suburban swap · Langata corridor",
    swapTime: "<5 min",
  },
  {
    id: "boda-kisumu",
    name: "Boda Hub Kisumu",
    lat: -0.0988,
    lng: 34.7521,
    operator: "precifarm",
    siteKind: "swap",
    availability: "available",
    freeBays: 3,
    totalChargers: 4,
    route: "Kisumu",
    phase: "live",
    role: "Lake-side e-boda swap",
    swapTime: "<5 min",
  },
  {
    id: "boda-nakuru",
    name: "Boda Hub Nakuru",
    lat: -0.2978,
    lng: 36.0721,
    operator: "precifarm",
    siteKind: "swap",
    availability: "available",
    freeBays: 2,
    totalChargers: 3,
    route: "Nairobi – Kisumu",
    phase: "live",
    role: "En-route boda swap",
    swapTime: "<5 min",
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

/** Canon live route — Nairobi–Kisumu only on Charging Hub */
export const LIVE_ROUTE_LABEL = "Nairobi – Kisumu";

export const LIVE_ROUTE_CENTER = { lat: -0.72, lng: 35.75 };
export const LIVE_ROUTE_ZOOM = 7;

export const NAIROBI_SWAP_CENTER = { lat: -1.2864, lng: 36.82 };
export const NAIROBI_SWAP_ZOOM = 11;

export const siteKindConfig: Record<
  HubSiteKind,
  { label: string; shortLabel: string; pinColor: string }
> = {
  dc: { label: "DC charging", shortLabel: "DC", pinColor: "#347a52" },
  swap: { label: "Boda swap", shortLabel: "Swap", pinColor: "#0ea5e9" },
};

export function hubSiteTypeLabel(hub: ChargingHub): string {
  if (hub.siteKind === "swap") return "Boda Hub · Swap";
  if (hub.operator === "partner") return "Partner · DC";
  return "Precifarm · DC";
}

export function hubCapacityLabel(hub: ChargingHub): string {
  if (hub.siteKind === "swap") {
    return `${hub.freeBays} of ${hub.totalChargers} batteries ready`;
  }
  return `${hub.freeBays} of ${hub.totalChargers} bays free`;
}

export function isLiveRouteHub(hub: ChargingHub): boolean {
  return hub.siteKind === "dc" && (hub.phase === "live" || hub.route === LIVE_ROUTE_LABEL);
}

export function isChargingMapHub(hub: ChargingHub): boolean {
  if (hub.siteKind === "swap") return hub.phase === "live";
  return hub.phase === "live" || hub.route === LIVE_ROUTE_LABEL;
}

export const liveRouteHubs = chargingHubs.filter(isLiveRouteHub);
export const chargingMapHubs = chargingHubs.filter(isChargingMapHub);
export const bodaSwapHubs = chargingHubs.filter((h) => h.siteKind === "swap" && h.phase === "live");

export function getChargingHubDirectory() {
  const precifarmDc = chargingHubs.filter(
    (h) => h.siteKind === "dc" && h.operator === "precifarm",
  );
  const partners = chargingHubs.filter((h) => h.operator === "partner");
  return {
    corridor: precifarmDc,
    boda: bodaSwapHubs,
    partners,
  };
}

export function hubPhaseDisplay(hub: ChargingHub): { label: string; tone: "live" | "next" | "planned" } {
  if (hub.phase === "live") return { label: "Live", tone: "live" };
  if (hub.phase === "next") return { label: "Next corridor", tone: "next" };
  if (hub.phase === "planned") return { label: "Planned", tone: "planned" };
  if (hub.operator === "partner") return { label: "Partner", tone: "live" };
  return { label: "Listed", tone: "planned" };
}

export function getChargingMapStats() {
  const onMap = chargingMapHubs;
  return {
    dcLive: onMap.filter((h) => h.siteKind === "dc").length,
    swapLive: onMap.filter((h) => h.siteKind === "swap").length,
    partners: onMap.filter((h) => h.operator === "partner").length,
    available: onMap.filter((h) => h.availability === "available").length,
  };
}

export const liveRoutePhases = routePhases.filter((route) => route.phase === "live");

export type HubFilter = "all" | "dc" | "swap" | "partners" | "available";

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
    case "dc":
      return hubs.filter((h) => h.siteKind === "dc");
    case "swap":
      return hubs.filter((h) => h.siteKind === "swap");
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
