import { modularEnergyPage, modularEnergyPaths, modularEnergyStatusNote } from "@/lib/modular-energy-page";
import { productImages } from "@/lib/product-images";

export const aboutPage = {
  hero: {
    eyebrow: "About Precifarm · Kenya",
    title: "EV charging and modular energy storage for Kenya.",
    description:
      "We survey, finance, install and operate charging for homes, fleets and the Nairobi–Kisumu corridor. Modular energy sits on the same platform — conceptual, not on sale. M-Pesa on every product.",
    primaryHref: "/charging",
    primaryLabel: "Explore charging",
    secondaryHref: "/charging/modular-energy",
    secondaryLabel: "Modular energy",
  },
  highlights: [
    { stat: "Charge", label: "Home, fleet and highway products from Spark through Corridor" },
    { stat: "Store", label: "Pod energy storage at home today; P1, P2, Pod Stack and MegaPack still in design" },
    { stat: "M-Pesa", label: "Lipa Pole Pole instalments, public sessions and fleet billing" },
  ],
  pillars: {
    eyebrow: "What Precifarm sells",
    title: "We commission charging today and keep modular energy on the same platform until it is ready to sell.",
    description:
      "The commercial beachhead is EV charging we can survey, install and operate. Modular energy is the gated second family — designed with the same engineering language, not sold as a catalogue SKU yet.",
    items: [
      {
        eyebrow: "In market",
        title: "EV charging",
        text: "Spark charger, Pulse charger, Pod energy storage, Depot, Boda Hub and Corridor DC cover the driveway through Nairobi–Kisumu. Charging Hub labels every site live or planned. Precifarm Agent runs on Android.",
        href: "/charging",
        cta: "Explore charging",
        image: productImages.pulse,
      },
      {
        eyebrow: "",
        title: "Modular energy",
        text: "One Energy Module at three scales — P1 Go, P2 Home and Pod Stack — plus MegaPack for site-scale battery storage. The architecture matches the chargers. It is not certified for sale.",
        href: modularEnergyPaths.overview,
        cta: "Read the platform",
        image: productImages.p1Go,
        familyImages: modularEnergyPage.hero.familyImages,
      },
    ],
  },
  intro: {
    eyebrow: "Who we are",
    title: "Electric vehicles arrived in Kenya before charging and storage could keep up.",
    lead: "Public charging is still fragmented, home installs are often left to the owner, and a weak-grid evening can undo a charge that looked fine at noon.",
    body: "Precifarm connects grid, solar, storage, charging and M-Pesa so drivers and operators plan around one system instead of guessing at each stop. We do not manufacture vehicles and we do not run fleets.",
    points: [
      "Site survey, grid, solar, storage and charging are engineered as one site, not a charger bolted on afterwards.",
      "Lipa Pole Pole and session pay run on M-Pesa, without a bank account.",
      "Remote monitoring and three-year aftersale care cover home units we commission.",
      "Modular energy is conceptual and not on sale yet.",
    ],
    image: productImages.chargingEcosystemHero,
    imageCaption: "Pulse, Spark, Pod, Corridor, Depot, Boda Hub and modular storage.",
  },
  operatingModel: {
    eyebrow: "How a site gets built",
    title: "We survey, finance, install and operate every site we commission.",
    description:
      "Power, charging, storage, software and Lipa Pole Pole stay with one team from the first visit through daily settlement.",
    steps: [
      {
        step: "01",
        title: "Survey",
        text: "We size the site to the EV, the roof, the feeder and Kenya Power before hardware is quoted.",
      },
      {
        step: "02",
        title: "Finance",
        text: "Buy outright, pay Lipa Pole Pole on M-Pesa, or sign a site contract. Deposit, monthly amount and total are shown up front.",
      },
      {
        step: "03",
        title: "Install",
        text: "Licensed wiring, protection, commissioning and paperwork. A typical Pulse charger installation takes one day.",
      },
      {
        step: "04",
        title: "Operate",
        text: "Remote monitoring, session metering and settlement. A charger that is down is a missed morning.",
      },
    ],
  },
  principlesSection: {
    eyebrow: "How we work",
    title: "We engineer one system, label what is live, and lead with charging we can actually install.",
    description:
      "The same operating rules apply from a home wallbox to a highway hub, including a clear line between what is sold and what is still in design.",
  },
  principles: [
    {
      title: "The system around the charger",
      text: "Grid, solar, storage, software and M-Pesa are designed with the charger — not added after it is on the wall.",
    },
    {
      title: "We don't run the vehicles",
      text: "Precifarm surveys, installs, monitors and settles energy. Operators keep vehicles, riders and dispatch.",
    },
    {
      title: "Uptime is the product",
      text: "A charger that is down is a missed morning. Field response and remote monitoring sit behind every unit we commission.",
    },
    {
      title: "Live versus planned stays honest",
      text: "Charging Hub labels every site. Modular energy is conceptual. Capacity, prototypes and uncommissioned hubs are not traction.",
    },
  ],
  scope: {
    eyebrow: "What is on sale",
    title: "EV charging is what we sell today, and modular energy stays on the roadmap until it is certified.",
    description:
      "Home, fleet and highway products are marketed now. P1 Go, P2 Home, Pod Stack and MegaPack are conceptual and not on sale.",
    today: {
      title: "EV charging — marketed",
      items: [
        { name: "Pulse, Pod and Spark", href: "/charging/home", note: "Home charging" },
        { name: "Depot and Boda Hub", href: "/partners", note: "Fleet and two-wheelers" },
        { name: "Corridor DC", href: "/hub", note: "Nairobi–Kisumu first" },
        { name: "Charging Hub", href: "/hub", note: "Live vs planned map" },
        { name: "Precifarm Agent", href: "/download", note: "Android APK · iOS not yet" },
      ],
    },
    roadmap: {
      title: "Modular energy — not on sale",
      note: modularEnergyStatusNote,
      items: [
        { name: "P1 Go, P2 Home, Pod Stack", href: modularEnergyPaths.overview, note: "One module, three scales" },
        { name: "MegaPack", href: modularEnergyPaths.megapack, note: "Project-engineered BESS" },
      ],
    },
  },
  rolesSection: {
    eyebrow: "Roles",
    title: "What Precifarm does, and what partners keep.",
    description:
      "From the home wallbox to the highway hub, and from Pod energy storage to modular energy still in design, partners run vehicles and Precifarm runs charging.",
  },
  roles: [
    {
      layer: "Home charging",
      precifarm: "Survey, install and support Pulse charger, Pod energy storage and Spark charger. Lipa Pole Pole on M-Pesa and three-year aftersale care.",
      partners: "Homeowners provide site access and approve the installation scope.",
    },
    {
      layer: "Fleet charging",
      precifarm: "Design Depot charging stations and Boda Hub swaps, with M-Pesa billing and remote monitoring.",
      partners: "Fleet and boda operators keep vehicles, riders and dispatch.",
    },
    {
      layer: "Highway hubs",
      precifarm: "Build, own and operate Corridor charging on commissioned sites. Sell energy and stand behind uptime.",
      partners: "Site hosts provide land or location rights, and may co-invest where the economics fit.",
    },
    {
      layer: "Modular energy",
      precifarm: "Design P1 Go, P2 Home, Pod Stack and MegaPack on one architecture. These products are not on sale yet.",
      partners: "Homes, shops and industrial sites that need backup — scoped as projects, not a catalogue checkout.",
    },
  ],
  cta: {
    title: "Tell us which site you want to electrify.",
    description: "Home survey, fleet depot, highway hub or energy-storage conversation — we respond within one business day.",
    primaryHref: "/contact",
    primaryLabel: "Contact us",
    secondaryHref: "/hub",
    secondaryLabel: "Open Charging Hub",
  },
} as const;
