/** Engineering page — site design basis (web); PDF remains canonical for hold points and task sheet */

import { engineeringDoc } from "@/lib/engineering-doc";
import { productImages } from "@/lib/product-images";
import { siteCtas, sitePricing } from "@/lib/site-copy";

export const engineeringPage = {
  hero: {
    eyebrow: "Engineering",
    title: "One site design — grid, solar, storage and chargers.",
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
        text: "Pulse on your meter, Pod when the grid dips, optional rooftop solar. Sized to daily mileage — not speculative public capacity.",
      },
      {
        title: "Fleet & depots",
        text: "Depot AC where vehicles park for hours, Boda Hub swap for two-wheelers. Yard layout, billing and uptime in one engineering pack.",
      },
      {
        title: "Highway & route",
        text: "Corridor T-canopy DC where the route needs it. Import limits, dwell and M-Pesa sessions — reserved bus windows are design-stage only.",
      },
    ],
  },
  siteTypes: {
    eyebrow: "By setting",
    title: "What we engineer on each site type.",
    caption: "Planning assumptions — every job starts with survey and a written quote.",
    columns: ["Setting", "Typical hardware", "Engineering focus"] as const,
    rows: [
      ["Urban home", "Pulse · Pod · Spark", "Consumer unit, cable route, meter, optional PV"],
      ["Fleet yard", "Depot · Boda Hub", "Duty cycle, bay count, import limit, M-Pesa billing"],
      ["Highway stop", "Corridor T-canopy", "Dwell layout, dual CCS2, public DC tariff, CSMS"],
      ["Partner retail", "Depot or host AC", "Footfall, landlord meter, session settlement"],
    ],
  },
  energyStack: {
    eyebrow: "Energy stack",
    title: "What sits behind the charger.",
    description:
      "Solar does not replace Kenya Power — it cuts cost and adds resilience. Storage holds a reserved window when the feeder cannot deliver peak kW.",
    columns: ["Layer", "Role", "Status"] as const,
    rows: [
      ["Grid", "Kenya Power connection and e-mobility tariff first", "Available"],
      ["Solar", "Canopy or rooftop PV — cost, shade, daytime yield", "Available"],
      ["Storage", "LiFePO₄ to peak-shave and hold a reserved bus window", "Available"],
      ["Charging", "Corridor DC, Depot AC, Pulse wallbox — sized to duty cycle", "Available"],
      ["Software", "OCPP monitoring, status, session records, M-Pesa", "In service"],
    ],
  },
  productFit: {
    eyebrow: "Product fit",
    title: "Which charger for which job.",
    products: [
      { id: "pulse", ...productImages.pulse, href: "/charging/private-house" },
      { id: "corridor", ...productImages.corridor, href: "/charging" },
      { id: "depot", ...productImages.depot, href: "/partners" },
      { id: "boda", ...productImages.boda, href: "/partners#boda-operators" },
    ] as const,
    columns: ["Product", "Best for", "Engineering note"] as const,
    rows: [
      ["Pulse · 7 kW", "Home daily charging", "Type 2 AC on customer meter · from KES 79,000"],
      ["Pod + solar", "Weak-grid evenings", "Hybrid sub-board · optional rooftop PV"],
      ["Depot · 22 kW", "Fleet yards", "AC overnight · ~120 min for 40+ kWh"],
      ["Corridor · 120 kW+", "Highway DC", "T-canopy · ~60 kWh in 30 min · from KES 39/kWh"],
      ["Boda Hub", "E-motorbike swap", "Kerbside or depot · under 5 minutes"],
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
      "Concept imagery for route hub, system architecture, typical two-bay plan and home hybrid. Not construction drawings — the PDF includes the full annex.",
    items: engineeringDoc.figures,
  },
  faqs: {
    eyebrow: "Planning questions",
    title: "Common engineering questions.",
    description: `Illustrative planning only — not quotations. Public DC from ${sitePricing.publicDcFrom}.`,
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
      "Homeowners sizing Pulse or Pod with solar, fleet partners planning Depot or Boda Hub yards, and highway hosts scoping Corridor T-canopy DC. Reserved bus windows on Nairobi–Kisumu are design-stage reference only — not live commercial product yet.",
  },
  {
    id: "solar-window",
    question: "Does solar power a reserved bus window in real time?",
    answer:
      "No. A 40–80 kWp canopy in Kenya yields roughly 180–440 kWh/day. Against an illustrative 1,500 kWh/day hub, PV covers about 12–30% of daily energy. Use solar for cost, shade and resilience — not as a substitute for the Kenya Power feeder. Planning assumption.",
  },
  {
    id: "batteries-hub",
    question: "Why add batteries at a route hub?",
    answer:
      "When peak charger demand exceeds the Kenya Power import limit during a reserved window, LiFePO₄ storage covers the gap. Example: 120 kWh in 30 minutes at ~240 kW with a 180 kW import limit needs storage for the difference plus reserve. Site-specific — not a bill of quantities.",
  },
  {
    id: "cost-quote",
    question: "Are the engineering cost figures a quotation?",
    answer:
      "No. Planning bands and worked examples in the PDF are illustrative. Live public DC is from KES 39/kWh. Pulse starts from KES 79,000. Request a site-specific cost sheet after survey.",
  },
] as const;
