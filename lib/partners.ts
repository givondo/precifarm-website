/** Partners page content — EV charging partnerships */

import { chargingHub } from "@/lib/charging-hub";
import { productImages } from "@/lib/product-images";

export const partnersPage = {
  hero: {
    eyebrow: "Partners",
    title: "Electrify a fleet, host a hub, or sell home charging",
    description:
      "Precifarm designs, installs and operates chargers from home wallboxes to highway DC. You bring the site, fleet or sales channel — we own the energy layer.",
    primaryHref: "/contact",
    primaryLabel: "Talk to the team",
    secondaryHref: "/charging",
    secondaryLabel: "Explore charging",
  },
} as const;

export const partnerHighlights = [
  { stat: "Spark–Corridor", label: "from home charging to highway charging" },
  { stat: "Home · Fleet · Highway", label: "one partner for every charging scenario" },
  { stat: "24/7", label: "remote monitoring on commissioned sites" },
  { stat: "M-Pesa", label: "session pay, Lipa Pole Pole and fleet billing" },
] as const;

export type PartnerType = {
  id: string;
  title: string;
  summary: string;
  products: string;
  points: string[];
  keeps: string;
};

export const partnerTypes: PartnerType[] = [
  {
    id: "hub-hosts",
    title: "Hub site hosts",
    summary:
      "Turn a strong corridor location — fuel station, yard, mall or roadside stop — into recurring EV traffic and shared revenue.",
    products: "Depot · Corridor",
    points: [
      "Precifarm designs, builds, owns and operates the charging equipment",
      "Revenue share on kWh sold and on-site retail dwell",
      "Solar canopy, storage and grid connection handled by our engineering team",
      "Co-investment options where the site meets our five-test criteria",
    ],
    keeps:
      "You retain land ownership; we require durable site rights to operate and maintain the hub.",
  },
  {
    id: "fleet-logistics",
    title: "Fleet & logistics",
    summary:
      "Contract dependable depot and corridor charging for vans, buses and delivery fleets — without per-session payment friction.",
    products: "Depot · Corridor",
    points: [
      "Reserved charging windows aligned to your dispatch schedule",
      "Fleet invoicing and session reporting on M-Pesa",
      "More stable energy cost compared with volatile diesel prices",
      "Depot design support where overnight and route charging connect",
    ],
    keeps:
      "You retain dispatch and day-to-day operations; Precifarm guarantees the energy layer and uptime.",
  },
  {
    id: "boda-operators",
    title: "Boda & last-mile",
    summary:
      "Deploy kerbside racks and six-bay swap cabinets for electric bodas — same green halo design language as the rest of the range.",
    products: "Boda Hub",
    points: [
      "2 kW pack charging sized for high-turnover swap operations",
      "M-Pesa session pay on every bay — no bank account required",
      "Remote monitoring and field response from the same ops team",
      "Pilot-to-scale rollout with utilisation gates before expansion",
    ],
    keeps:
      "You operate the riders and routes; Precifarm supplies hardware, financing and three-year aftersale care.",
  },
  {
    id: "dealers-installers",
    title: "Dealers & installers",
    summary:
      "Sell and install Pulse charger and Pod energy storage home units under Precifarm engineering standards — certified crews, Lipa Pole Pole finance and three-year aftersale care.",
    products: "Pulse · Pod · Spark",
    points: [
      "Survey-to-commission workflow with Precifarm-approved installation checklists",
      "Lipa Pole Pole M-Pesa instalments for Pulse charger and Pod energy storage — deposit, monthly and total shown upfront",
      "Lead referral from precifarm.com and the AI companion",
      "Training tiers T1–T3 for field and hub operations",
    ],
    keeps:
      "You retain your customer relationship; Precifarm owns product spec, warranty and remote monitoring.",
  },
  {
    id: "finance-oem",
    title: "Financiers & OEMs",
    summary:
      "Back charging infrastructure with contracted kWh demand and shared operating data — not projections alone.",
    products: "Corridor · Depot",
    points: [
      "Projects underwritten on binding energy and utilisation commitments",
      "Vehicle-neutral network — CCS2, CHAdeMO and AC where appropriate",
      "Shared uptime, kWh, load factor and recovery metrics",
      "Phase-gated expansion with clear decision gates between corridors",
    ],
    keeps:
      "No new corridor opens until the current one has earned its place through proven returns.",
  },
];

export const partnerProcess = [
  {
    step: "01",
    title: "Introduce your site or fleet",
    text: "Tell us the location, vehicle types, daily kWh need and timeline. We respond within one business day.",
  },
  {
    step: "02",
    title: "Site or fleet assessment",
    text: "Our engineering team runs the five-test site criteria or depot load study — grid, solar, dwell and financeability.",
  },
  {
    step: "03",
    title: "Commercial terms",
    text: "Revenue share, fleet contract or installation partnership — negotiated so partners earn before network take.",
  },
  {
    step: "04",
    title: "Build, commission and operate",
    text: "Precifarm installs, commissions and monitors 24/7. Home customers can use Lipa Pole Pole on M-Pesa. You focus on customers, riders or fleet dispatch.",
  },
] as const;

export const partnerCommitments = [
  {
    title: "Uptime you can plan around",
    text: "Reserved charging slots, field response and honest status updates when equipment needs recovery.",
  },
  {
    title: "Measured economics",
    text: "Every session is metered, settlement is reconciled and operating metrics are shared with partners.",
  },
  {
    title: "Partner-first returns",
    text: "Network take is negotiated after partners earn on the site — not before.",
  },
  {
    title: "Open to any capable vehicle",
    text: `No OEM lock-in. Any compatible EV can use Depot, Corridor and public AC bays on the ${chargingHub.name}.`,
  },
] as const;

export const partnerProductFit = [
  {
    product: "Pulse & Pod",
    power: "7 kW home · Pod with storage",
    bestFor: "Residential installs, dealer networks",
    image: productImages.pulse.src,
    imageAlt: productImages.pulse.alt,
    brand: productImages.pulse.brand,
  },
  {
    product: "Spark",
    power: "3.3 kW portable",
    bestFor: "Boot top-ups, last-mile and backup charge",
    image: productImages.spark.src,
    imageAlt: productImages.spark.alt,
    brand: productImages.spark.brand,
  },
  {
    product: "Depot",
    power: "22 kW AC pedestal",
    bestFor: "Fleet yards, workplaces, campus car parks",
    image: productImages.depot.src,
    imageAlt: productImages.depot.alt,
    brand: productImages.depot.brand,
  },
  {
    product: "Boda Hub",
    power: "Swap & kerbside",
    bestFor: "Last-mile operators, high-turnover boda fleets",
    image: productImages.boda.src,
    imageAlt: productImages.boda.alt,
    brand: productImages.boda.brand,
  },
  {
    product: "Corridor",
    power: "120 kW+ DC",
    bestFor: "Highway stops, intercity corridors",
    image: productImages.corridor.src,
    imageAlt: productImages.corridor.alt,
    brand: productImages.corridor.brand,
  },
] as const;
