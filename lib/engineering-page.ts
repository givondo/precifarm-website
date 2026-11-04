/** Engineering page: site design basis (web); the PDF stays canonical for hold points and the task sheet */

import { engineeringDoc } from "@/lib/engineering-doc";
import { productImages } from "@/lib/product-images";
import { siteCtas, sitePricing } from "@/lib/site-copy";

export const engineeringPage = {
  hero: {
    eyebrow: "Engineering",
    title: "One site design: grid, solar, storage and chargers.",
    description:
      "Precifarm engineers home, fleet and highway charging as a single system: Kenya Power import, optional PV and LiFePO₄, duty-cycle chargers and OCPP commissioning. This page is the web summary; the PDF is the full design basis and task sheet.",
    primaryLabel: engineeringDoc.downloadLabel,
    primaryHref: engineeringDoc.downloadHref,
    secondaryLabel: "Request a survey",
    secondaryHref: siteCtas.homeSurvey.href,
    meta: `${engineeringDoc.id} · v${engineeringDoc.version} · ${engineeringDoc.date}`,
  },
  audience: {
    eyebrow: "Who this is for",
    title: "Homeowners, fleet operators and hub hosts.",
    cards: [
      {
        title: "Home & hybrid",
        text: "Pulse on your meter with load management, optional rooftop solar. Sized to daily mileage, not speculative public capacity.",
      },
      {
        title: "Fleet & depots",
        text: "Pulse+ three-phase AC where vehicles park for hours, and Boda Hub swaps for two-wheelers. Register your yard: layout, billing and uptime come in one engineering pack.",
      },
      {
        title: "Highway & route",
        text: "ARC Corridor from a certified OEM charger, with storage only where the power study calls for it. Import limits, dwell and M-Pesa sessions engineered for public and fleet EV traffic.",
      },
    ],
  },
  siteTypes: {
    eyebrow: "By setting",
    title: "What we engineer on each site type.",
    caption: "Every job starts with a survey and a written quote.",
    columns: ["Setting", "Typical hardware", "Engineering focus"] as const,
    rows: [
      ["Urban home", "Pulse", "Consumer unit, cable route, meter, optional PV"],
      ["Fleet yard", "Pulse+ · Boda Hub", "Duty cycle, bay count, import limit, M-Pesa billing"],
      ["Highway stop", "ARC Corridor", "Dwell layout, OEM charger, CCS2, public DC tariff, CSMS"],
      ["Partner retail", "Pulse+ or host AC", "Footfall, landlord meter, session settlement"],
    ],
  },
  energyStack: {
    eyebrow: "Energy stack",
    title: "What sits behind the charger.",
    description:
      "Solar does not replace Kenya Power; it cuts cost and adds resilience. Storage peak-shaves when the feeder cannot deliver the charger's peak kW.",
    columns: ["Layer", "Role"] as const,
    rows: [
      ["Grid", "Kenya Power connection and e-mobility tariff first"],
      ["Solar", "Canopy or rooftop PV for cost, shade and daytime yield"],
      ["Storage", "LiFePO₄ to peak-shave and back up charging loads"],
      ["Charging", "Pulse at home, Pulse+ in yards, ARC Corridor on highways and in towns"],
      ["Software", "OCPP monitoring, session records, M-Pesa"],
    ],
  },
  productFit: {
    eyebrow: "Product fit",
    title: "Which charger for which job.",
    products: [
      { id: "pulse", ...productImages.pulse, href: "/charging/home" },
      { id: "corridor", ...productImages.corridor, href: "/charging/corridor" },
      { id: "pulsePlus", ...productImages.pulsePlus, href: "/charging/pulse-plus" },
      { id: "boda", ...productImages.boda, href: "/charging/boda-hub" },
    ] as const,
    columns: ["Product", "Best for", "Engineering note"] as const,
    rows: [
      ["Pulse · 7 kW", "Home daily charging", "Type 2 AC on customer meter · from KES 79,000"],
      ["Pulse+ · 22 kW", "Fleet yards and workplaces", "Three-phase AC overnight · 11 kW on most cars"],
      ["ARC Corridor", "Highway and town DC", "Certified OEM charger, 120 to 180 kW · priced per site"],
      ["Boda Hub", "Electric motorcycle swap", "Partner-hosted sites · under 5 minutes"],
    ],
  },
  holdPoints: {
    eyebrow: "Kenya approvals",
    title: "Hold points before we build.",
    caption: "Full checklist and acceptance tests are in the PDF task sheet.",
    columns: ["Gate", "Authority / scope", "Typical output"] as const,
    rows: [
      ["Load & connection", "Kenya Power", "Import limit, tariff class, offer letter"],
      ["Electrical install", "Licensed contractor + EPRA", "Signed line diagram, test sheet"],
      ["Environment", "NEMA where triggered", "Screening or licence per site"],
      ["Fire & safety", "County fire / occupier", "Access, extinguishers, signage"],
      ["Commission", "Precifarm CSMS", "OCPP probe, M-Pesa test session, handover"],
    ],
  },
  process: {
    eyebrow: "How it runs",
    title: "Survey to commissioned site.",
    steps: [
      { step: "01", title: "Intake & survey", text: "Property or route visit, photos, single-line sketch." },
      { step: "02", title: "Design basis", text: "Energy model, equipment schedule, Kenya Power application pack." },
      { step: "03", title: "Quote & approve", text: "Written quote, Lipa Pole Pole option on home units where eligible." },
      { step: "04", title: "Install & test", text: "Civil, electrical, charger mount, protection tests." },
      { step: "05", title: "Commission", text: "OCPP, M-Pesa, app listing, three-year aftersale on home units." },
    ],
  },
  figures: {
    eyebrow: "Figures",
    title: "Visual design basis.",
    description:
      "Route hub, system architecture, typical two-bay plan and home hybrid. The PDF includes the full annex.",
    items: engineeringDoc.figures,
  },
  faqs: {
    eyebrow: "Planning questions",
    title: "Common engineering questions.",
    description: `How we size sites. Corridor prices are set per site at commissioning.`,
    ids: ["who-for", "solar-window", "batteries-hub", "cost-quote"] as const,
  },
  download: {
    title: "Full design doc + task sheet",
    description: engineeringDoc.printHint,
    related: engineeringDoc.related,
  },
  cta: {
    title: "Ready for a site-specific pack?",
    description: "Tell us home, fleet or highway. We respond within one business day with next steps.",
    primaryHref: "/contact",
    primaryLabel: "Contact engineering",
    secondaryHref: siteCtas.homeSurvey.href,
    secondaryLabel: "Request a house survey",
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
