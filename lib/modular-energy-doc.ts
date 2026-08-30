import { documentBrand } from "@/lib/document-brand";

/** Modular energy platform — PF-MODENERGY-002 product + engineering architecture */
export const modularEnergyDoc = {
  id: "PF-MODENERGY-002",
  version: "2.0",
  date: "30 August 2026",
  title: "Modular Energy Platform",
  subtitle: "Product + engineering architecture — P1 Go, P2 Home, Pod and Energy OS",
  description:
    "One modular energy platform for Kenya: a standardised 2.56 kWh Energy Module, separate Power Core, and Energy OS from portable backup through home and SME storage. Derived sizing math, Kenya design basis, ERNs, 24 figures and 8 conceptual renders. Gated expansion — not a current commercial product.",
  brandCssHref: documentBrand.cssPath,
  logoMarkHref: documentBrand.logoMarkPath,
  downloadHref: "/downloads/precifarm-modular-energy-platform-v2.pdf",
  downloadLabel: "Download PDF",
  downloadHtmlHref: "/downloads/precifarm-modular-energy-platform-v2.html",
  printHint:
    "PDF includes executive summary, platform architecture, sizing charts, PAYGO policy, test matrix and full figure annex.",
  figures: [
    {
      src: "/images/modular-energy/render-family-hero.png",
      alt: "Precifarm modular energy product family: P1 Go portable unit, Energy Module, P2 Home tower and Pod enclosure",
      caption:
        "Product family — seamless aluminum, glass UI strips, Precifarm wordmark and one repeated Energy Module.",
    },
    {
      src: "/images/modular-energy/render-p1-go-v2.png",
      alt: "P1 Go portable energy unit on tilt stand with foldable solar panel, glass display and Type 2 EV lead",
      caption:
        "P1 Go — aluminum unibody, fold-flat top handle, magnetic I/O bay, wireless pad, foldable solar panel in the box and emergency EV trickle lead.",
    },
    {
      src: "/images/modular-energy/render-energy-module.png",
      alt: "Precifarm 2.56 kWh Energy Module with recessed handles and glass status strip",
      caption: "Energy Module — 2.56 kWh building block with blind-mate power and comms connectors.",
    },
    {
      src: "/images/modular-energy/render-p2-home.png",
      alt: "P2 Home backup tower with Power Core above four module bays",
      caption: "P2 Home — Power Core above, four module bays, retractable handle and rear castors.",
    },
    {
      src: "/images/modular-energy/render-pod.png",
      alt: "Precifarm Pod outdoor SME enclosure with service door and sun-shield canopy",
      caption: "Pod — outdoor SME enclosure with Power Unit, six-module rack and sun-shield canopy.",
    },
    {
      src: "/images/modular-energy/render-kenya-home.png",
      alt: "P2 Home installed beside a Kenyan urban residence distribution board",
      caption: "Kenya urban home — P2 beside the consumer board with essential-load sub-board intervention.",
    },
    {
      src: "/images/modular-energy/render-kenya-sme.png",
      alt: "Precifarm Pod at a Kenyan SME retail site with rooftop solar",
      caption: "Kenya SME — wall-shaded Pod for refrigeration continuity, plinth mount and rooftop PV.",
    },
    {
      src: "/images/modular-energy/render-solar-ev.png",
      alt: "Carport EV charging from rooftop solar surplus at a Kenyan home",
      caption: "Solar + EV — Phase A home energy loop, carport charging from customer solar surplus.",
    },
  ],
  highlights: [
    {
      title: "One module, three scales",
      text: "The same 2.56 kWh Energy Module scales from P1 Go portability through P2 Home backup to a six-module Pod — power stays in the Power Core or Pod Power Unit.",
    },
    {
      title: "Kenya design basis",
      text: "Sizing uses Nairobi load profiles, seasonal PV, weak-grid behaviour, M-Pesa PAYGO policy and consumer-protection evidence — not generic Western assumptions.",
    },
    {
      title: "Engineering review ready",
      text: "Nine ERNs from v1.0 are consolidated; dual architecture (LV-48 / HV-S) proposed; prototype, certification and PAYGO gates are explicit.",
    },
  ],
  contents: [
    "Executive summary and platform-at-a-glance table",
    "Energy Module, P1 Go, P2 Home and Pod product architecture",
    "Electrical, thermal, safety and communications stacks",
    "Energy OS capability model and application screens",
    "Backup duration, solar sensitivity and scaling charts",
    "Tesla / BYD / Precifarm architecture synthesis",
    "Manufacturing, service and PAYGO architecture",
    "Prototype roadmap, test matrix, risk register and ERNs",
    "24 engineering figures and 8 conceptual industrial-design renders",
  ],
  related: [
    { href: "/charging", label: "Charging services" },
    { href: "/charging/private-house", label: "Private house charging" },
    { href: "/charging/engineering", label: "Solar hub engineering" },
    { href: "/contact", label: "Partner inquiry" },
  ],
} as const;

/** 3-page industrial design overview — renders only (PF-MODENERGY-DESIGN-001) */
export const modularEnergyDesignDoc = {
  id: "PF-MODENERGY-DESIGN-001",
  version: "1.5",
  date: "30 August 2026",
  title: "Industrial Design Overview",
  subtitle: "5-page design doc — modular energy renders, sizing parameters, EV charging & Tesla/BYD benchmark",
  downloadHref: "/downloads/precifarm-modular-energy-design.pdf",
  downloadLabel: "Download design PDF",
  downloadHtmlHref: "/downloads/precifarm-modular-energy-design.html",
} as const;
