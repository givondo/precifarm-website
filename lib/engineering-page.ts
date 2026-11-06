/**
 * /charging/engineering: Precifarm's site engineering, presented as a technical consultancy.
 * Product figures come from the approved engineering register through lib/programmes (never typed here).
 * Deliverables are described as types of document a client receives, not past projects.
 */

import { engineeringDoc } from "@/lib/engineering-doc";
import { programme, type ProgrammeId } from "@/lib/programmes";
import type { StageKind } from "@/components/interior/StageLabel";
import type { ContactInterestKey } from "@/lib/contact-interests";

/** Claim text from the register by programme and label; empty when the register has no such claim. */
function claim(id: ProgrammeId, label: string) {
  return programme(id).claims.find((c) => c.label === label)?.text ?? "";
}

export type ArchNode = {
  id: string;
  title: string;
  sub?: string;
  kind: "grid" | "board" | "pv" | "battery" | "charger" | "vehicle" | "control" | "load" | "cabinet";
  /** dashed outline: optional or sized per site */
  optional?: boolean;
  land: [number, number];
  port: [number, number];
};
export type ArchEdge = { from: string; to: string; kind: "ac" | "dc" | "data" };

export type Architecture = {
  id: string;
  tab: string;
  title: string;
  product: string;
  stage: StageKind;
  href: string;
  summary: string;
  engineer: readonly string[];
  register: readonly { label: string; value: string }[];
  nodes: readonly ArchNode[];
  edges: readonly ArchEdge[];
};

export const architectures: readonly Architecture[] = [
  {
    id: "home",
    tab: "Home",
    title: "Home charging on the house supply",
    product: "Pulse charger",
    stage: "available",
    href: "/charging/home",
    summary: "One dedicated circuit from the consumer unit, sized to the house supply, with load management so charging never overloads the main fuse.",
    engineer: ["Consumer unit capacity and spare ways", "Cable route, size and voltage drop", "RCD type and earthing arrangement", "Optional rooftop solar on the same board"],
    register: [
      { label: "Charging power", value: claim("pulse", "Charging power") },
      { label: "DC fault protection", value: claim("pulse", "DC fault protection") },
      { label: "Load management", value: claim("pulse", "Load management") },
    ],
    nodes: [
      { id: "grid", title: "Kenya Power", sub: "Single-phase", kind: "grid", land: [80, 150], port: [180, 50] },
      { id: "meter", title: "Meter and main fuse", kind: "board", land: [250, 150], port: [180, 160] },
      { id: "cu", title: "Consumer unit", sub: "MCB + RCD", kind: "board", land: [420, 150], port: [180, 270] },
      { id: "pv", title: "Rooftop PV", sub: "Optional", kind: "pv", optional: true, land: [420, 40], port: [90, 380] },
      { id: "house", title: "House loads", kind: "load", land: [420, 260], port: [270, 380] },
      { id: "pulse", title: "Pulse charger", sub: "Wall mounted", kind: "charger", land: [590, 150], port: [180, 490] },
      { id: "ev", title: "Car", kind: "vehicle", land: [760, 150], port: [180, 600] },
    ],
    edges: [
      { from: "grid", to: "meter", kind: "ac" },
      { from: "meter", to: "cu", kind: "ac" },
      { from: "pv", to: "cu", kind: "ac" },
      { from: "cu", to: "house", kind: "ac" },
      { from: "cu", to: "pulse", kind: "ac" },
      { from: "pulse", to: "ev", kind: "ac" },
    ],
  },
  {
    id: "fleet",
    tab: "Fleet and workplace",
    title: "Shared AC charging on one site meter",
    product: "Pulse+ charger",
    stage: "development",
    href: "/charging/pulse-plus",
    summary: "A dedicated EV sub-board fed from the main LV board, with chargers sharing the site's capacity so vehicles finish inside their parking window.",
    engineer: ["Depot load study against the duty cycle", "Sub-board, feeders and four-pole protection", "Load sharing limits and charging priority", "Bay layout, cable containment and bollards"],
    register: [
      { label: "Charging power", value: claim("pulsePlus", "Charging power") },
      { label: "Load sharing", value: claim("pulsePlus", "Load sharing") },
      { label: "Supply", value: claim("pulsePlus", "Supply") },
    ],
    nodes: [
      { id: "grid", title: "Kenya Power", sub: "Three-phase", kind: "grid", land: [80, 150], port: [180, 50] },
      { id: "lv", title: "Main LV board", kind: "board", land: [250, 150], port: [180, 160] },
      { id: "bldg", title: "Building loads", kind: "load", land: [250, 270], port: [90, 270] },
      { id: "sub", title: "EV sub-board", sub: "4-pole + RCD per bay", kind: "board", land: [420, 150], port: [270, 270] },
      { id: "ctrl", title: "Load sharing", sub: "OCPP", kind: "control", land: [590, 40], port: [90, 380] },
      { id: "chargers", title: "Pulse+ chargers", sub: "Per bay", kind: "charger", land: [590, 150], port: [270, 380] },
      { id: "ev", title: "Fleet vehicles", kind: "vehicle", land: [760, 150], port: [270, 490] },
    ],
    edges: [
      { from: "grid", to: "lv", kind: "ac" },
      { from: "lv", to: "bldg", kind: "ac" },
      { from: "lv", to: "sub", kind: "ac" },
      { from: "sub", to: "chargers", kind: "ac" },
      { from: "ctrl", to: "chargers", kind: "data" },
      { from: "chargers", to: "ev", kind: "ac" },
    ],
  },
  {
    id: "highway",
    tab: "Highway",
    title: "DC fast charging around a certified power core",
    product: "ARC Corridor",
    stage: "pilot",
    href: "/charging/corridor",
    summary: "A medium-voltage connection and transformer feed a certified OEM DC charger with dispensers at the bays. Storage is added only where the power study calls for it.",
    engineer: ["Power study and Kenya Power connection offer", "Transformer, LV switchgear and earthing", "Bay layout, dwell and circulation", "OCPP back office, metering and M-Pesa sessions"],
    register: [
      { label: "Power equipment", value: claim("corridor", "Power equipment") },
      { label: "Site storage", value: claim("corridor", "Site storage") },
      { label: "Grid", value: claim("corridor", "Grid") },
    ],
    nodes: [
      { id: "mv", title: "Kenya Power MV", kind: "grid", land: [80, 150], port: [180, 50] },
      { id: "tx", title: "Transformer", sub: "MV/LV", kind: "board", land: [250, 150], port: [180, 160] },
      { id: "lv", title: "LV switchgear", sub: "Metering", kind: "board", land: [420, 150], port: [180, 270] },
      { id: "bess", title: "Site storage", sub: "Only if the study needs it", kind: "battery", optional: true, land: [420, 270], port: [90, 380] },
      { id: "core", title: "OEM DC charger", sub: "Certified power core", kind: "charger", land: [590, 150], port: [270, 380] },
      { id: "csms", title: "Back office", sub: "OCPP, M-Pesa", kind: "control", land: [590, 40], port: [90, 490] },
      { id: "ev", title: "Bays and dispensers", kind: "vehicle", land: [760, 150], port: [270, 490] },
    ],
    edges: [
      { from: "mv", to: "tx", kind: "ac" },
      { from: "tx", to: "lv", kind: "ac" },
      { from: "lv", to: "core", kind: "ac" },
      { from: "bess", to: "lv", kind: "ac" },
      { from: "csms", to: "core", kind: "data" },
      { from: "core", to: "ev", kind: "dc" },
    ],
  },
  {
    id: "boda",
    tab: "Boda Hub",
    title: "Battery swapping cabinet on a partner site",
    product: "Boda Hub",
    stage: "development",
    href: "/charging/boda-hub",
    summary: "A swap cabinet on its own protected circuit, charging packs bay by bay behind closed doors, with fire detection on an independent supply.",
    engineer: ["Supply and dedicated cabinet circuit", "Fire detection and independent fire supply", "Plinth, ventilation and weather protection", "M-Pesa payment and remote monitoring"],
    register: [
      { label: "Cabinet", value: claim("boda", "Cabinet") },
      { label: "Safety", value: claim("boda", "Safety") },
      { label: "Fire safety", value: claim("boda", "Fire safety") },
    ],
    nodes: [
      { id: "grid", title: "Site supply", kind: "grid", land: [80, 150], port: [180, 50] },
      { id: "db", title: "Distribution board", sub: "Dedicated circuit", kind: "board", land: [250, 150], port: [180, 160] },
      { id: "fire", title: "Fire supply", sub: "Independent", kind: "board", land: [250, 270], port: [90, 270] },
      { id: "cab", title: "Swap cabinet", sub: "Bay chargers", kind: "cabinet", land: [420, 150], port: [180, 380] },
      { id: "mon", title: "Monitoring", sub: "M-Pesa, alarms", kind: "control", land: [420, 40], port: [270, 270] },
      { id: "rider", title: "Riders", sub: "Swap packs", kind: "vehicle", land: [590, 150], port: [180, 490] },
    ],
    edges: [
      { from: "grid", to: "db", kind: "ac" },
      { from: "db", to: "cab", kind: "ac" },
      { from: "fire", to: "cab", kind: "ac" },
      { from: "mon", to: "cab", kind: "data" },
      { from: "cab", to: "rider", kind: "dc" },
    ],
  },
] as const;

export const holdPoints = {
  caption: "Full checklist and acceptance tests are in the design basis PDF.",
  columns: ["Gate", "Authority or scope", "Typical output"] as const,
  rows: [
    ["Load and connection", "Kenya Power", "Import limit, tariff class, offer letter"],
    ["Electrical install", "Licensed contractor and EPRA", "Signed line diagram, test sheet"],
    ["Environment", "NEMA where triggered", "Screening or licence per site"],
    ["Fire and safety", "County fire, occupier", "Access, extinguishers, signage"],
    ["Commission", "Precifarm back office", "OCPP check, M-Pesa test session, handover"],
  ],
} as const;

export type DeliverableId = "sld" | "load" | "cables" | "protection" | "commissioning";

export const deliverables: readonly { id: DeliverableId; title: string; text: string; fields: readonly string[] }[] = [
  { id: "sld", title: "Single line diagram", text: "Supply, boards, protective devices, cables and chargers on one sheet, signed by the responsible engineer.", fields: ["Supply and earthing system", "Device ratings and types", "Cable references", "Revision and sign-off"] },
  { id: "load", title: "Load study", text: "Existing demand, charger demand and diversity against the supply, with the load management limit that keeps the site inside it.", fields: ["Connected and diversified load", "Charger demand by hour", "Headroom against supply", "Load management setting"] },
  { id: "cables", title: "Cable schedule", text: "Every circuit with its route, size, length, voltage drop and current rating for the installation method.", fields: ["Circuit reference", "From and to", "Size and type", "Length and voltage drop"] },
  { id: "protection", title: "Protection settings", text: "Breaker ratings and curves, RCD types and discrimination, recorded so the site can be maintained safely.", fields: ["Device and rating", "Curve or setting", "RCD type and trip current", "Upstream discrimination"] },
  { id: "commissioning", title: "Commissioning record", text: "Insulation, continuity, earth and RCD test results, charger configuration and a test session, handed over with the site.", fields: ["Test results against limits", "Charger and back office checks", "Test session record", "Handover signatures"] },
] as const;

export const workflow: readonly { title: string; text: string; produces: readonly DeliverableId[]; hold?: string }[] = [
  { title: "Intake and survey", text: "Site visit, photos of the meter and boards, supply details and how vehicles use the site.", produces: [] },
  { title: "Design basis", text: "Load study, charger and cable sizing, protection and the single line diagram.", produces: ["load", "sld", "cables", "protection"] },
  { title: "Approvals", text: "Kenya Power connection, licensed contractor sign-off and any NEMA or fire requirements.", produces: [], hold: "Kenya Power · EPRA · NEMA · County fire" },
  { title: "Quote", text: "A written quote with hardware, installation and any site work listed separately.", produces: [] },
  { title: "Install and test", text: "Civil and electrical works, charger mounting and the full test sequence.", produces: [] },
  { title: "Commission", text: "Charger configuration, back office connection, a test session and handover.", produces: ["commissioning"], hold: "Precifarm back office" },
] as const;

export const assessmentTypes: readonly { id: string; label: string; interest: ContactInterestKey; prepare: readonly string[] }[] = [
  { id: "home", label: "Home", interest: "home", prepare: ["A photo of the meter and consumer unit", "Where the car parks", "Your car model and daily distance"] },
  { id: "fleet", label: "Fleet or workplace", interest: "pulse-plus", prepare: ["Vehicle list and daily distances", "Parking hours", "Supply size or a recent Kenya Power bill"] },
  { id: "highway", label: "Highway site", interest: "corridor", prepare: ["Location and plot plan", "Existing supply and transformer", "Traffic and amenities on site"] },
  { id: "boda", label: "Boda Hub", interest: "boda-hub", prepare: ["Site location and footprint", "Number of riders and battery make", "Available supply"] },
] as const;

export const engineeringPage = {
  hero: {
    eyebrow: "Engineering services",
    title: "Charging sites engineered as one electrical system.",
    lead: "Grid connection, boards, protection, cables, chargers and the back office designed together, then documented so the site can be built, approved and maintained.",
    meta: `${engineeringDoc.id} · v${engineeringDoc.version} · ${engineeringDoc.date}`,
  },
  architectures: {
    id: "architectures",
    eyebrow: "System architectures",
    title: "Four site types, one engineering method.",
    lead: "Pick a site type to see how power and data flow, what we engineer, and the product figures from the approved engineering register.",
  },
  workflow: {
    id: "workflow",
    eyebrow: "Design workflow",
    title: "From survey to a commissioned site.",
    lead: "Six stages, each with an owner and an output. Approval hold points stop work until the authority has signed off.",
  },
  deliverables: {
    id: "deliverables",
    eyebrow: "What you receive",
    title: "Engineering documents, not slides.",
    lead: "The deliverable types a client receives for a site. Sheets below show the layout of each document type, not a past project.",
  },
  document: {
    id: "design-basis",
    eyebrow: "Design basis",
    title: "The full design basis and task sheet.",
    lead: engineeringDoc.description,
  },
  assessment: {
    id: "assessment",
    eyebrow: "Assessment request",
    title: "Request a site assessment.",
    lead: "Tell us the site type and what you know. An engineer replies within one business day with the next step and what to prepare.",
  },
  faqs: {
    eyebrow: "Planning questions",
    title: "Common engineering questions.",
  },
} as const;

export const engineeringPageFaqs = [
  {
    id: "who-for",
    question: "Who is the engineering package for?",
    answer:
      "Homeowners sizing a Pulse charger, fleet and property partners planning Pulse+ or Boda Hub yards, and highway hosts scoping ARC Corridor sites. The package covers EV charging and energy systems, not passenger booking or bus timetable products.",
  },
  {
    id: "solar-window",
    question: "Does solar replace the Kenya Power connection?",
    answer:
      "No. A 40 to 80 kWp canopy in Kenya yields roughly 180 to 440 kWh a day. For a hub using 1,500 kWh a day, PV covers about 12 to 30% of daily energy. Use solar for cost, shade and resilience alongside the Kenya Power feeder.",
  },
  {
    id: "batteries-hub",
    question: "Why add batteries at a charging hub?",
    answer:
      "When peak charger demand exceeds the Kenya Power import limit, LiFePO₄ storage covers the gap and smooths demand charges. For example, 120 kWh in 30 minutes at about 240 kW with a 180 kW import limit needs storage for the difference plus reserve. Every site is sized on its own.",
  },
  {
    id: "cost-quote",
    question: "Are the engineering cost figures a quotation?",
    answer:
      "No. The bands and worked examples in the PDF show how a site is sized; your quote follows a survey. Corridor prices are set per site at commissioning. Pulse starts from KES 79,000.",
  },
] as const;
