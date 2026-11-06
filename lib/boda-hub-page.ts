/**
 * Boda Hub product page (/charging/boda-hub).
 *
 * Claims come from the approved engineering register (BODAHUB, read through lib/programmes.ts)
 * and from copy already approved on the site. No dimension, rating, price or count is added here:
 * cabinet dimensions are not in the register, so the page says they are not yet published.
 */
import { evidenceNote, programme, programmeSpecsGenerated } from "@/lib/programmes";
import { productRenderPaths } from "@/lib/product-renders-catalog";

export const bodaHubPath = "/charging/boda-hub" as const;

export const bodaHubPaths = {
  product: bodaHubPath,
  partners: "/partners#boda-operators",
  hub: "/hub?type=swap",
  contact: "/contact?interest=boda-hub",
  engineering: "/charging/engineering",
} as const;

const boda = programme("boda");
const claim = (id: string) => {
  const c = boda.claims.find((x) => x.spec_id === id);
  if (!c) throw new Error(`Boda Hub claim ${id} missing from the register export`);
  return c;
};

export const bodaClaims = {
  swap: claim("BH-12"),
  cabinet: claim("BH-01"),
  latch: claim("BH-07"),
  fire: claim("BH-08"),
  payment: claim("BH-11"),
  batteries: claim("BH-06"),
};

export const bodaImages = {
  golden: {
    src: productRenderPaths.bodaHubStudio,
    alt: "Boda Hub battery-swap locker on its swap pad in golden evening light, between yellow safety bollards, with the rider screen on the side totem",
  },
  front: {
    src: productRenderPaths.bodaHubFront,
    alt: "Boda Hub locker front: twenty numbered doors in five rows of four, one door open with a pack on its tray, and the rider screen, ring light and QR code on the side totem",
  },
  openBay: {
    src: "/images/boda-hub/boda-hub-revd-open-bay.jpg",
    alt: "Close-up of an open Boda Hub door with a battery pack on its slide-out tray, among closed doors with status light bars",
  },
  canopy: {
    src: "/images/boda-hub/boda-hub-revd-canopy.jpg",
    alt: "Boda Hub canopy from below: a lit edge and downlight over the top rows of numbered doors",
  },
  dusk: {
    src: productRenderPaths.bodaHubDusk,
    alt: "Boda Hub locker at dusk with its canopy light on and the swap zone marked on the pad in front",
  },
  hero: {
    src: productRenderPaths.bodaHub,
    alt: "Boda Hub locker with one door open and a charged pack ready to swap, between yellow safety bollards",
  },
} as const;

export const bodaHero = {
  eyebrow: "Boda Hub · Battery swapping",
  title: "Battery swapping for electric bodas",
  lead:
    "Pay on M-Pesa, return your empty pack and ride on with a charged one. Boda Hub sites are built with partners, and the self-service Automated Boda Hub cabinet is designed for the swap stops riders already use.",
  /** kept as `image` for the SEO registry's ogImage */
  image: bodaImages.golden,
  facts: [
    { label: "Cabinet", value: "20 bays, 16 rider doors" },
    { label: "Payment", value: "M-Pesa at the screen" },
    { label: "Charging", value: "Only with the door latched" },
    { label: "Batteries", value: "One make per site" },
  ],
} as const;

/** Kept for lib/seo/pages/registry.ts (ogImage) and any reader of the old shape. */
export const bodaHubPageContent = {
  hero: { image: bodaHero.image },
} as const;

export const bodaNav = [
  { href: "#status", label: "What is real today" },
  { href: "#swap", label: "The swap" },
  { href: "#cabinet", label: "Cabinet and doors" },
  { href: "#batteries", label: "Battery handling" },
  { href: "#safeguards", label: "Safeguards" },
  { href: "#hosts", label: "Site hosts" },
] as const;

export const bodaStatusLedger = [
  {
    stage: "partner-site" as const,
    label: undefined,
    title: "Partner-run swap sites",
    body: "Boda Hub sites are built with partners, who host and run the swap stop. The register gives a swap at a partner-run site as under five minutes; that figure is illustrative, not measured. No site is listed here as open.",
    source: `Engineering register ${bodaClaims.swap.spec_id}, evidence: illustrative`,
  },
  {
    stage: "proposed" as const,
    label: undefined,
    title: "Automated Boda Hub cabinet",
    body: "The self-service locker in the Rev D renders: 20 charging bays, 16 rider doors, M-Pesa at the cabinet screen and a controller in every door. Designed and documented, not yet installed at a site.",
    source: `Engineering register ${bodaClaims.cabinet.spec_id}, ${bodaClaims.payment.spec_id}; renders Rev D`,
  },
  {
    stage: "development" as const,
    label: "Not yet validated",
    title: "Battery compatibility",
    body: "Each site runs one approved battery make with its matching charger, and mixed brands are not accepted. Which pack the first site uses, and whether any other make fits, has not been validated.",
    source: `Engineering register ${bodaClaims.batteries.spec_id}, evidence: planning assumption`,
  },
] as const;

/* ---------- Swap demonstration ---------- */

export type DoorState = "charged" | "charging" | "empty" | "open-empty" | "open-charged" | "open-depleted";
export type InHand = "depleted" | "charged" | "none";

export type SwapStep = {
  id: string;
  title: string;
  rider: string;
  /** what the cabinet does or checks at this step */
  check: string;
  ref?: string;
  screen: readonly string[];
  /** overrides from the base door map */
  doors: Partial<Record<number, DoorState>>;
  inHand: InHand;
  phone?: string;
};

/** Doors 01 to 16 are rider doors; 17 to 20 charge only. Base picture: most lower doors hold charged packs. */
export const baseDoors: Record<number, DoorState> = {
  1: "charged", 2: "charged", 3: "charged", 4: "charging",
  5: "charged", 6: "empty", 7: "charging", 8: "charged",
  9: "charged", 10: "charging", 11: "charged", 12: "charged",
  13: "charged", 14: "charged", 15: "charging", 16: "charged",
  17: "charging", 18: "charging", 19: "charged", 20: "charging",
};

export const RETURN_DOOR = 6;
export const RELEASE_DOOR = 3;

export const swapSteps: readonly SwapStep[] = [
  {
    id: "arrive",
    title: "Arrive",
    rider: "Park in the swap zone in front of the cabinet with your empty pack.",
    check: "The screen wakes and shows one next step at a time.",
    screen: ["Welcome", "Scan your Precifarm app", "or the QR code"],
    doors: {},
    inHand: "depleted",
  },
  {
    id: "pay",
    title: "Identify and pay",
    rider: "Scan the app or QR code. The price shows first; confirm it with M-Pesa on your phone.",
    check: "No door opens until identity and payment rules pass.",
    ref: bodaClaims.payment.spec_id,
    screen: ["Swap ready", "Price shown before", "you confirm", "Pay with M-Pesa"],
    doors: {},
    inHand: "depleted",
    phone: "M-Pesa: confirm",
  },
  {
    id: "open",
    title: "Door opens",
    rider: "One empty door opens for your pack. The screen names the bay.",
    check: "One door at a time on a normal swap.",
    screen: ["Bay 06 is open", "Return your", "empty pack"],
    doors: { [RETURN_DOOR]: "open-empty" },
    inHand: "depleted",
  },
  {
    id: "return",
    title: "Return the empty pack",
    rider: "Slide your empty pack into the dock and close the door.",
    check: "The bay recognises the pack's battery system, latches, and only then starts charging. A pack that fails a check keeps that door out of service.",
    ref: bodaClaims.latch.spec_id,
    screen: ["Pack received", "Bay 06 latched", "Checking pack"],
    doors: { [RETURN_DOOR]: "charging" },
    inHand: "none",
  },
  {
    id: "take",
    title: "Take a charged pack",
    rider: "A second door opens with a charged pack. Slide it out.",
    check: "The network picks a healthy charged pack, not only the fullest one.",
    screen: ["Bay 03 is open", "Take your", "charged pack"],
    doors: { [RETURN_DOOR]: "charging", [RELEASE_DOOR]: "open-charged" },
    inHand: "none",
  },
  {
    id: "close",
    title: "Door closes",
    rider: "Close the door behind you.",
    check: "The empty bay latches and is ready for the next return.",
    screen: ["Bay 03 closed", "Thank you"],
    doors: { [RETURN_DOOR]: "charging", [RELEASE_DOOR]: "empty" },
    inHand: "charged",
  },
  {
    id: "ride",
    title: "Ride",
    rider: "Fit the pack and ride on. The receipt is on your phone.",
    check: "Your old pack keeps charging behind a latched door until it is ready for another rider.",
    screen: ["Done", "Have a good ride"],
    doors: { [RETURN_DOOR]: "charging", [RELEASE_DOOR]: "empty" },
    inHand: "charged",
    phone: "M-Pesa receipt",
  },
] as const;

/* ---------- Cabinet and doors ---------- */

export const bodaCabinet = {
  doors: bodaClaims.cabinet.text,
  arrangement: [
    { rows: "Doors 17 to 20", text: "The top row charges packs that an attendant moves down as the lower doors empty, so nobody lifts a heavy pack above shoulder height." },
    { rows: "Doors 01 to 16", text: "The four lower rows. Riders swap here, one pack per door." },
    { rows: "Side totem", text: "Rider screen, QR code and status ring. Payment is M-Pesa at this screen." },
  ],
  anatomy: [
    { name: "Rider screen", text: "One next step at a time: scan, open, return, pay." },
    { name: "Smart doors", text: "Each door locks, charges and watches its own pack, and charges only when it is closed and latched." },
    { name: "Outdoor shell", text: "Silver cabinet under a lit canopy for streets and stages. Weather rating still under test." },
  ],
  dimensionsNote:
    "Overall cabinet dimensions, door size and weight are not yet published figures. They will be listed here once they are approved in the engineering register.",
  growth: "Busy sites add a second cabinet beside the first: same design, more doors. Two or more cabinets make a locker bank for fleet yards and busy roads.",
} as const;

/* ---------- Battery handling ---------- */

export const bodaHandling = [
  { title: "Returned", text: "A rider slides the empty pack into a free rider door and closes it." },
  { title: "Recognised", text: "The door charges a pack only after its battery system is recognised. Mixed brands are never charged by guesswork." },
  { title: "Charged behind a latched door", text: "Charging runs only with the door closed and latched." },
  { title: "Picked for the next rider", text: "The network releases a healthy charged pack, not only the fullest one." },
] as const;

export const bodaHandlingFault = {
  title: "If a pack fails a check",
  text: "That door stays out of service and the pack stays with technicians, not the next rider. Heat or a fault takes a door offline.",
} as const;

export const bodaHandlingRules = [
  "One approved battery make per site, with its matching charger",
  "Every door at a site is built for that site's pack",
  "Charged packs in the top row are moved down by an attendant, not lifted by riders",
  "Another make joins only after fit, power, communication, safety and commercial checks",
] as const;

/* ---------- Safeguards and monitoring ---------- */

export const bodaSafeguards = [
  { text: bodaClaims.latch.text, ref: bodaClaims.latch.spec_id, note: evidenceNote(bodaClaims.latch) },
  { text: bodaClaims.fire.text, ref: bodaClaims.fire.spec_id, note: evidenceNote(bodaClaims.fire) },
  { text: "Heat or faults take a door offline", ref: undefined, note: undefined },
  { text: "One door at a time on a normal swap, with a safe override when something jams", ref: undefined, note: undefined },
  { text: "No release if payment rules fail", ref: undefined, note: undefined },
] as const;

export const bodaMonitoring = [
  { name: "Remote operations", text: "Precifarm sees stock, faults and uptime, and sends field care before riders feel it." },
  { name: "Weak signal days", text: "Doors and safety stay on the cabinet; accounts and pricing stay online. If the link drops, safe swaps can still complete and sync later. Payment and safety are never skipped to keep doors open." },] as const;

/* ---------- Site hosts ---------- */

export const bodaHost = {
  youProvide: [
    "A forecourt, stage edge, shop front, parking area or depot where riders already stop",
    "The land and the power supply for the cabinet",
    "Safe space in front of the cabinet for the swap zone and bollards",
  ],
  precifarmProvides: [
    "The cabinets, software, payments and monitoring",
    "Remote support and field care",
    "Site planning with you before anything is installed",
  ],
  sites: ["Petrol stations and shops", "Supermarkets and malls", "Boda stages and parking", "Fleet depots", "Campuses and busy roads"],
  terms: "Commercial terms are agreed per deal: lease, revenue share or similar. Tariffs and payback are set from the energy bills and uptime of the first sites.",
  regulatory:
    "Power, fire, battery handling, payments and data rules clear Kenyan requirements, checked with licensed professionals, before a cabinet opens for self-service.",
  steps: [
    { title: "Tell us about the site", text: "Where it is, who stops there and what power supply it has today.", meta: "You" },
    { title: "Plan the site", text: "Swap zone, cabinet position, power and the battery make the site will run.", meta: "Precifarm with you" },
    { title: "Agree terms and approvals", text: "Lease, revenue share or similar, and the safety and electrical approvals.", meta: "Both parties" },
    { title: "Install and open", text: "Install, check and hand over, with remote monitoring from day one.", meta: "Precifarm" },
  ],
} as const;

export const bodaRoadmap = [
  { name: "Prototype", text: "One working locker: doors, charging and safe swaps." },
  { name: "First sites", text: "A few partner sites. Real riders. Real uptime." },
  { name: "Partner rollout", text: "Host sites, remote operations and M-Pesa at scale." },
  { name: "Network", text: "More towns. More pack types only when they pass the checks." },
] as const;

export const bodaSpecSource = `From the approved engineering register (${boda.code}, generated ${programmeSpecsGenerated}).`;
export const bodaSpecRows = boda.claims.map((c) => ({ label: c.label, value: c.text, note: evidenceNote(c) }));

export const bodaHubFaqs = [
  {
    question: "Can I use Automated Boda Hub today?",
    answer:
      "Automated Boda Hub is the self-service cabinet we build with site partners. It is not yet installed at a site. Tell us where you want one and we will plan the site with you.",
  },
  {
    question: "What battery does it use?",
    answer: "One approved battery make per site, with its matching charger. Every door at that site is built around it.",
  },
  {
    question: "Will my other motorcycle battery work?",
    answer: "Only after that pack type is tested and approved for a site. Each site starts with one make.",
  },
  {
    question: "Does Precifarm staff every hub?",
    answer: "No. Partners host the site. Precifarm supplies the cabinets, software, payments and remote support.",
  },
  {
    question: "What if there is no internet?",
    answer: "Safety and doors stay on the cabinet. Swaps can sync when the signal returns. We do not skip payment or safety just to keep doors open.",
  },
  {
    question: "How do I pay?",
    answer:
      "M-Pesa first. Riders pay for the energy in the pack they take, with a daily cap, and fleets can use accounts. You always see the price before you confirm.",
  },
] as const;
