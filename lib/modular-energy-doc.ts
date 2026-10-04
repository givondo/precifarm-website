import { documentBrand } from "@/lib/document-brand";
import { productRenderPaths } from "@/lib/product-renders-catalog";

/** Modular energy platform as PF-MODENERGY-002 product + engineering architecture */
export const modularEnergyDoc = {
 id: "PF-MODENERGY-002",
 version: "2.0",
 date: "30 August 2026",
 title: "Modular Energy Platform",
 subtitle: "Product + engineering architecture as P1 Go, P2 Home, Pod and Energy OS",
 description:
 "One modular energy platform for Kenya: a standardised 2.56 kWh Energy Module, separate Power Core, and Energy OS from portable backup through home and SME storage. Derived sizing math, Kenya design basis, ERNs, 24 figures and 8 conceptual renders. Gated expansion as not a current commercial product.",
 brandCssHref: documentBrand.cssPath,
 logoMarkHref: documentBrand.logoMarkPath,
 downloadHref: "/downloads/precifarm-modular-energy-platform-v2.pdf",
 downloadLabel: "Download PDF",
 downloadHtmlHref: "/downloads/precifarm-modular-energy-platform-v2.html",
 printHint:
 "PDF includes executive summary, platform architecture, sizing charts, PAYGO policy, test matrix and full figure annex.",
 figures: [
 {
 src: productRenderPaths.p1Go,
 alt: "P1 Go portable power station",
 caption: "P1 Go · carried",
 },
 {
 src: productRenderPaths.p2Home,
 alt: "P2 Home towers at two, three and four modules",
 caption: "P2 Home · stacked beside the board",
 },
 {
 src: productRenderPaths.miniStack,
 alt: "Mini Stack outdoor enclosure with service door open",
 caption: "Mini Stack · outdoor plinth for retail sites",
 },
 {
 src: productRenderPaths.p1Go,
 alt: "P1 Go portable power station with foldable solar panel, glass display and Type 2 EV lead",
 caption:
 "P1 Go as compact aluminum body, fold-flat handle, magnetic port bay, wireless pad, foldable solar panel in the box and emergency EV trickle lead.",
 },
 {
 src: productRenderPaths.energyModuleEm256,
 alt: "Precifarm 2.56 kWh Energy Module with recessed handles and glass status strip",
 caption: "Energy Module as 2.56 kWh building block with blind-mate power and comms connectors.",
 },
 {
 src: productRenderPaths.energyModuleEm256,
 alt: "Precifarm Energy Module rack in a test lab with modules extended on sliding rails",
 caption:
 "Service flow as spot the fault, pull the module, swap it in. Same rails in the lab and on site.",
 },
 {
 src: productRenderPaths.p2Home,
 alt: "P2 Home backup tower with Power Core above four module bays as floor-standing, no wheels",
 caption: "P2 Home as Power Core above, four module bays, floor-standing beside the board.",
 },
 {
 src: productRenderPaths.miniStack,
 alt: "Precifarm Pod outdoor SME enclosure with service door and sun-shield canopy",
 caption: "Pod as outdoor SME enclosure with Power Unit, six-module rack and sun-shield canopy.",
 },
 {
 src: productRenderPaths.p2Home,
 alt: "P2 Home installed beside a Kenyan urban residence distribution board",
 caption: "Kenya urban home as P2 beside the consumer board with essential-load sub-board intervention.",
 },
 {
 src: productRenderPaths.miniStack,
 alt: "Precifarm Pod at a Kenyan SME retail site with rooftop solar",
 caption: "Kenya SME as wall-shaded Pod for refrigeration continuity, plinth mount and rooftop PV.",
 },
 {
 src: productRenderPaths.p1GoSolar,
 alt: "Carport EV charging from rooftop solar surplus at a Kenyan home",
 caption: "Solar + EV as Phase A home energy loop, carport charging from customer solar surplus.",
 },
 ],
 highlights: [
 {
 title: "One module, three scales",
 text: "The same 2.56 kWh Energy Module scales from P1 Go portability through P2 Home backup to a six-module Pod as power stays in the Power Core or Pod Power Unit.",
 },
 {
 title: "Kenya design basis",
 text: "Sizing uses Nairobi load profiles, seasonal PV, weak-grid behaviour, M-Pesa PAYGO policy and consumer-protection evidence as not generic Western assumptions.",
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
 { href: "/charging/home", label: "Home charging" },
 { href: "/charging/engineering", label: "Solar hub engineering" },
 { href: "/contact", label: "Partner inquiry" },
 ],
} as const;

/** 3-page industrial design overview as renders only (PF-MODENERGY-DESIGN-001) */
export const modularEnergyDesignDoc = {
 id: "PF-MODENERGY-DESIGN-001",
 version: "1.5",
 date: "30 August 2026",
 title: "Industrial Design Overview",
 subtitle: "5-page design doc as modular energy renders, sizing parameters, EV charging & Tesla/BYD benchmark",
 downloadHref: "/downloads/precifarm-modular-energy-design.pdf",
 downloadLabel: "Download design PDF",
 downloadHtmlHref: "/downloads/precifarm-modular-energy-design.html",
} as const;
