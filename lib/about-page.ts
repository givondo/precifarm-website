import type { StageKind } from "@/components/interior/StageLabel";
import { productImages } from "@/lib/product-images";
import { sitePricing } from "@/lib/site-copy";

/**
 * /about. Only facts already on the site: no staff, customers, installations or achievements are
 * claimed. Stages match the homepage product eyebrows (Pulse available, Pulse+ in development,
 * ARC Corridor pilot development, Boda Hub in development).
 */
export const aboutPage = {
  hero: {
    eyebrow: "About Precifarm · Nairobi",
    title: "EV charging, battery swapping and AI engineering, built in Kenya.",
    description:
      "We survey, finance and install the Pulse home charger today, with M-Pesa instalments. Fleet, highway and battery-swap charging are in development, alongside Precifarm Agent, our AI engineering assistant, and wireless charging research.",
    image: {
      src: "/images/renders/pulse-7kw-installed-4x3.jpg",
      alt: "Render of the Precifarm Pulse charger on a wall, its Type 2 cable coiled on the holster",
    },
  },
  facts: [
    { value: sitePricing.pulseFrom, label: "Pulse charger from" },
    { value: sitePricing.lipaFrom, label: "Lipa Pole Pole from" },
    { value: "Nairobi", label: "Headquarters" },
    { value: "1 business day", label: "Enquiry response" },
  ],
  problem: {
    eyebrow: "Why Precifarm exists",
    title: "Electric vehicles arrived in Kenya before charging and storage could keep up.",
    lead: "Public charging is still fragmented, home installs are often left to the owner, and a weak-grid evening can undo a charge that looked fine at noon.",
    body: "Precifarm connects grid, solar, storage, charging and M-Pesa so drivers and operators plan around one system instead of guessing at each stop. We do not manufacture vehicles and we do not run fleets.",
  },
  range: {
    eyebrow: "What we build",
    title: "One range, from the home wallbox to the highway.",
    lead: "Each product is labelled with where it stands today. Only the Pulse charger is on sale.",
    items: [
      {
        name: "Pulse charger",
        role: "7 kW home wallbox",
        stage: "available" as StageKind,
        text: "Surveyed, installed and supported by Precifarm, with Lipa Pole Pole on M-Pesa.",
        href: "/charging/home",
        image: productImages.pulse,
      },
      {
        name: "Pulse+ charger",
        role: "22 kW three-phase wallbox",
        stage: "development" as StageKind,
        text: "For fleet yards, workplaces and apartment parking, with load sharing across a site.",
        href: "/charging/pulse-plus",
        image: productImages.pulsePlus,
      },
      {
        name: "ARC Corridor",
        role: "DC fast charging for highways and towns",
        stage: "pilot" as StageKind,
        text: "A certified OEM DC charger under the Precifarm brand. The first site, on the Nairobi to Kisumu route, is being prepared.",
        href: "/charging/corridor",
        image: productImages.corridor,
      },
      {
        name: "Boda Hub",
        role: "Battery swapping for electric motorcycles",
        stage: "development" as StageKind,
        text: "A swap locker for partner-run sites. Each site uses one battery make.",
        href: "/charging/boda-hub",
        image: productImages.bodaStudio,
      },
    ],
    software: [
      {
        name: "Precifarm Agent",
        text: "Sizes EV charging, solar, batteries, cables and protection with deterministic engineering tools, labels every number with its source, and leaves the sign-off to a qualified engineer.",
        href: "/agent",
        cta: "Try Precifarm Agent",
      },
      {
        name: "Wireless EV charging",
        text: "Research for stationary charging of light-duty cars at home and in fleet depots. Efficiency is reported once it is measured on the bench.",
        href: "/research",
        cta: "Research programmes",
      },
    ],
  },
  operatingModel: {
    eyebrow: "How a site gets built",
    title: "One team from the first survey to daily settlement.",
    description: "Power, charging, storage, software and Lipa Pole Pole stay with one team. This is how every Pulse install runs today, and how fleet and highway sites will run.",
    steps: [
      { title: "Survey", text: "We size the site to the EV, the roof, the feeder and Kenya Power before hardware is quoted." },
      { title: "Finance", text: "Buy outright, pay Lipa Pole Pole on M-Pesa, or sign a site contract. Deposit, monthly amount and total are shown up front." },
      { title: "Install", text: "Licensed wiring, protection, commissioning and paperwork. A typical Pulse charger installation takes one day." },
      { title: "Operate", text: "Remote monitoring, session metering and settlement. A charger that is down is a missed morning." },
    ],
  },
  principlesSection: {
    eyebrow: "How we work",
    title: "Four rules from a home wallbox to a highway hub.",
  },
  principles: [
    { title: "The system around the charger", text: "Grid, solar, storage, software and M-Pesa are designed with the charger, not added after it is on the wall." },
    { title: "We don't run the vehicles", text: "Precifarm surveys, installs, monitors and settles energy. Operators keep vehicles, riders and dispatch." },
    { title: "Uptime is the product", text: "Field response and remote monitoring sit behind every unit we commission." },
    { title: "We say what is installed", text: "We count chargers that are installed and sessions that are paid. Plans are described as plans, and figures come from our engineering register." },
  ],
  rolesSection: {
    eyebrow: "Roles",
    title: "What Precifarm does, and what partners keep.",
    description: "Partners run vehicles and sites; Precifarm runs the charging. Rows other than home charging describe how planned programmes are set up.",
  },
  roles: [
    {
      layer: "Home charging",
      stage: "available" as StageKind,
      precifarm: "Survey, install and support the Pulse charger. Lipa Pole Pole on M-Pesa and three-year aftersale care.",
      partners: "Homeowners provide site access and approve the installation scope.",
    },
    {
      layer: "Fleet charging",
      stage: "development" as StageKind,
      precifarm: "Design Pulse+ fleet charging and Boda Hub swaps, with M-Pesa billing and remote monitoring.",
      partners: "Fleet and boda operators keep vehicles, riders and dispatch.",
    },
    {
      layer: "Highway hubs",
      stage: "pilot" as StageKind,
      precifarm: "Build, own and operate ARC Corridor, starting with the first site on the Nairobi to Kisumu route. Sell energy and stand behind uptime.",
      partners: "Site hosts provide land or location rights, and may co-invest where the economics fit.",
    },
    {
      layer: "AI engineering",
      stage: undefined,
      precifarm: "Build Precifarm Agent, with deterministic engineering tools and a person approving every result.",
      partners: "Engineers and companies keep their data and their sign-off.",
    },
  ],
  next: [
    { href: "/charging/home", label: "Request a home survey", reason: "Pulse charger, from " + sitePricing.pulseFrom },
    { href: "/partners", label: "Partner with us", reason: "Fleets, site hosts and installers" },
    { href: "/sustainability", label: "Sustainability", reason: "Targets, and how we will measure them" },
    { href: "/careers", label: "Careers", reason: "Field, operations and software roles" },
  ],
} as const;
