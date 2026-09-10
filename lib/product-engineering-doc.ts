import { documentBrand } from "@/lib/document-brand";

/** Illustrated product & service reference — every Precifarm product with its engineering numbers. */
export const productEngineeringDoc = {
  id: "PF-PRODUCT-ENG-001",
  version: "1.0",
  date: "11 September 2026",
  title: "Precifarm products & services",
  subtitle: "Engineering design reference for the full range",
  description:
    "Every Precifarm product and service in one illustrated reference — Spark, Pulse, Pod, Depot, Corridor, Boda Hub, modular energy and MegaPack — with ratings, sizing rules, installation requirements, Kenya design basis and approval gates. Planning basis, not construction drawings.",
  brandCssHref: documentBrand.cssPath,
  logoMarkHref: documentBrand.logoMarkPath,
  downloadHref: "/downloads/precifarm-product-engineering-reference.pdf",
  downloadLabel: "Download PDF",
  downloadHtmlHref: "/downloads/precifarm-product-engineering-reference.html",
  printHint: "12 pages — product photography, specification tables, sizing formulas and Kenya hold points.",
  figures: [
    {
      src: "/images/charging-ecosystem-hero-v21.png",
      alt: "Precifarm charging and energy product family",
      caption: "The full range — portable Spark through highway Corridor DC, plus home storage and battery swap.",
    },
    {
      src: "/images/products/pod-home-hero-v3-garage-4x3.png",
      alt: "Pod energy storage installed in a Kenyan home garage",
      caption: "Home charging and storage in one utility corner.",
    },
    {
      src: "/images/engineering/system-architecture.png",
      alt: "Precifarm charging system architecture",
      caption: "Grid, PV, storage, CCS2 dispensers and the charging management system.",
    },
    {
      src: "/images/products/boda-hub-locker-family-v3.png",
      alt: "Precifarm Boda Hub locker family",
      caption: "Battery swap lockers — compact, standard and bank configurations.",
    },
  ],
  highlights: [
    {
      title: "Specs, not slogans",
      text: "Rated power, connector, supply, storage and charge time for every on-sale product, side by side.",
    },
    {
      title: "Sizing you can check",
      text: "Kenya design basis and the core formulas — daily energy, charge time, usable storage, PV yield, BESS gap.",
    },
    {
      title: "Honest status",
      text: "On-sale, in testing and conceptual are labelled throughout. Modular energy is design intent, not a product for sale.",
    },
  ],
  contents: [
    "Portfolio at a glance — hardware, services and evidence labels",
    "Home charging — Spark, Pulse and Pod specifications and packages",
    "Home survey, protection, earthing and commissioning checklist",
    "Depot AC and Corridor DC specifications and site gates",
    "Corridor sizing worked example with storage and canopy PV",
    "Boda Hub swap, locker configurations and testing status",
    "Modular energy targets — Energy Module, P1 Go, P2 Home, Mini Stack",
    "MegaPack scale stages and illustrative project shapes",
    "Kenya design basis and core sizing formulas",
    "Electrical design checklist and Kenya approval hold points",
    "Training tiers, financing and supporting services",
  ],
  related: [
    { href: "/charging", label: "Charging services" },
    { href: "/charging/engineering", label: "Engineering design package" },
    { href: "/charging/modular-energy", label: "Modular energy" },
    { href: "/agent", label: "Precifarm Agent" },
  ],
} as const;
