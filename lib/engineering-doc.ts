import { documentBrand } from "@/lib/document-brand";

/** Engineering design package — solar chargers & stations */
export const engineeringDoc = {
  id: "PF-ENG-SOLAR-HUB-001",
  version: "1.1",
  date: "16 August 2026",
  title: "Solar chargers & charging stations",
  subtitle: "Engineering design document and delivery task sheet",
  description:
    "Design basis for Precifarm route hubs, campus stations and private house hybrid charging — energy model, solar/storage sizing, Kenya Power hold points, and a phased site task sheet. Concept reference, not construction drawings.",
  brandCssHref: documentBrand.cssPath,
  logoMarkHref: documentBrand.logoMarkPath,
  downloadHref: "/downloads/precifarm-solar-charger-stations-engineering.pdf",
  downloadLabel: "Download PDF",
  downloadHtmlHref: "/downloads/precifarm-solar-charger-stations-engineering.html",
  printHint: "PDF includes the energy model, site plan, Kenya hold points and full engineering task sheet.",
  figures: [
    {
      src: "/images/engineering/route-hub.png",
      alt: "Route charging hub with solar canopy, DC chargers, battery storage and electric bus",
      caption: "Figure 1 — Route hub: solar canopy, CCS2 DC dispensers, LiFePO₄ storage, electric bus.",
    },
    {
      src: "/images/engineering/system-architecture.png",
      alt: "System architecture diagram of Kenya Power, solar canopy, storage, CCS2 charger and CSMS",
      caption: "Figure 2 — System architecture: Kenya Power · canopy PV · LiFePO₄ · CCS2 DC · OCPP / CSMS.",
    },
    {
      src: "/images/engineering/site-plan.png",
      alt: "Typical two-bay route hub site plan with bus circulation, solar canopy and electrical compound",
      caption: "Figure 3 — Typical two-bay site plan: queue, CCS2 bays, electrical compound, dwell, expansion bay.",
    },
    {
      src: "/images/engineering/home-hybrid.png",
      alt: "Private house hybrid EV charging with rooftop solar and wall charger",
      caption: "Figure 4 — Private house hybrid: grid + rooftop solar + wall charger + home storage.",
    },
  ],
  highlights: [
    {
      title: "Route hubs",
      text: "Reserved CCS2 windows for Nairobi–Kisumu buses. Solar and LiFePO₄ cut cost and cover import-limit gaps — they do not replace a Kenya Power study.",
    },
    {
      title: "Campus & house",
      text: "Private stations follow duty cycle: AC where vehicles park for hours; DC only when justified. House charging stays on the customer meter.",
    },
    {
      title: "Task sheet",
      text: "A-01 to E-05: feasibility through operate, with a capital go/no-go before equipment orders.",
    },
  ],
  contents: [
    "Nairobi–Kisumu energy model and reserved-window worked example",
    "Solar canopy and LiFePO₄ sizing methods (planning assumptions)",
    "Concept single-line and typical two-bay site plan",
    "Campus and private-house design bases",
    "Kenya Power, EPRA, NEMA and fire hold points",
    "Phased task sheet with owners, outputs and acceptance tests",
  ],
  related: [
    { href: "/charging", label: "Charging services" },
    { href: "/charging/private-house", label: "Private house charging" },
    { href: "/network", label: "Charging Hub" },
    { href: "/training", label: "EV charging training" },
  ],
} as const;
