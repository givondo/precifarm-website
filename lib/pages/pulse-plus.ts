/**
 * /charging/pulse-plus page content. Ratings come from the engineering register by spec id
 * (lib/pages/register.ts); prose follows lib/programme-pages.ts (pulsePlusPage) and the FAQ
 * copy, which this page replaces. Do not type ratings here.
 */
import { pulsePlusPage } from "@/lib/programme-pages";
import { firstNumber } from "@/lib/pages/format";
import { claimText } from "@/lib/pages/register";
import { getPageSeo } from "@/lib/seo/pages/registry";
import { productChargeTimes } from "@/lib/home-products";

const power = claimText("pulsePlus", "PP-03"); // "Up to 22 kW on three phases; 11 kW and 7.4 kW single-phase modes"
const sharing = claimText("pulsePlus", "PP-06"); // "Up to 10 units share one site meter"

export const pulsePlusRatings = {
  maxKw: firstNumber(power, /Up to ([\d.]+) kW/),
  midKw: firstNumber(power, /; ([\d.]+) kW/),
  singlePhaseKw: firstNumber(power, /and ([\d.]+) kW single-phase/),
  maxUnits: firstNumber(sharing, /Up to (\d+) units/),
};

const { maxKw, midKw, singlePhaseKw } = pulsePlusRatings;

/**
 * Car classes by on-board AC charger. Only the three ratings the register and FAQ name
 * (PP-03, PP-13, the pulse-plus FAQ); no make or model is given a rating here.
 */
export const pulsePlusCarClasses = [
  { id: "single", kw: singlePhaseKw, label: `Single-phase car, ${singlePhaseKw} kW`, note: "Charges on one phase in single-phase mode." },
  { id: "three-mid", kw: midKw, label: `Three-phase car, ${midKw} kW`, note: claimText("pulsePlus", "PP-13").split(";")[0] + "." },
  { id: "three-max", kw: maxKw, label: `Three-phase car, ${maxKw} kW`, note: `Needs a car with a ${maxKw} kW on-board charger.` },
] as const;

export const pulsePlusContent = {
  hero: {
    eyebrow: "Fleet and workplace · Pulse+ charger",
    title: pulsePlusPage.title,
    lead: pulsePlusPage.intro,
    imageAlt: "Precifarm Pulse+ 22 kW three-phase wallbox in graphite with its tethered Type 2 cable coiled on the wall dock",
  },
  inPage: [
    { href: "#three-phase", label: "22 kW explained" },
    { href: "#load-sharing", label: "Load sharing" },
    { href: "#planner", label: "Site planner" },
    { href: "#workplaces", label: "Workplaces" },
    { href: "#status", label: "Status and spec" },
    { href: "#questions", label: "Questions" },
  ],
  threePhase: {
    eyebrow: "22 kW, explained",
    title: "The charger offers the power. The car decides how much it takes.",
    lead: `Pulse+ supplies up to ${maxKw} kW across three phases. AC charging always runs at the lower of the charger's limit and the car's on-board charger, so the same unit charges each car at a different rate.`,
    points: [
      { title: "Three phases plus neutral", text: claimText("pulsePlus", "PP-01") + "." },
      { title: "Adapts to each car", text: pulsePlusPage.features[0].text },
      { title: "Same plug as Pulse", text: claimText("pulsePlus", "PP-09") + ", the same plug family as the Pulse home charger." },
    ],
    exampleNote: `Site copy example: ${productChargeTimes.pulsePlus}. The bars are calculated with the same charging-time tool Precifarm Agent uses, at 90% charging efficiency.`,
  },
  loadSharing: {
    eyebrow: "Load sharing",
    title: "One meter, many chargers, no tripped supply.",
    lead: pulsePlusPage.features[1].text,
    steps: [
      { title: "One site meter", text: `${sharing}. The survey sizes what the supply can give the chargers after the building's own load.` },
      { title: "Current divided per phase", text: "When several cars charge at once, the units divide the available current per phase between them instead of each drawing its full rating." },
      { title: "Supply never overloaded", text: "The shared limit holds however many cars are plugged in, so the site's main protection is not tripped by charging." },
    ],
  },
  planner: {
    eyebrow: "Site planner",
    title: "Will your supply carry the bays you want?",
    lead: "Enter your site's figures. The planner checks whether load sharing is needed and roughly how many vehicles you can charge in a shift. It uses the Agent's peak-load, energy and charging-time tools.",
    disclaimer:
      "Planning estimate only. It assumes every bay is busy for the whole window, a 0.95 power factor on the supply and 90% charging efficiency, and that a full car is moved off its bay. Your survey measures the real supply, building load and cable routes.",
  },
  workplaces: {
    eyebrow: "Workplace installations",
    title: "Built for yards, offices and apartment parking.",
    lead: "Wall-mounted in a row above marked bays, on one shared supply. Every site is surveyed before it is quoted.",
    imageAlt: "Three Precifarm Pulse+ chargers mounted in a row on a depot wall, each above its own marked parking bay, with bollards between the bays",
    uses: [
      { title: "Fleet depots", text: pulsePlusPage.useCases[0] },
      { title: "Workplace parking", text: pulsePlusPage.useCases[1] },
      { title: "Apartment blocks", text: pulsePlusPage.useCases[2] },
    ],
    requirementsTitle: pulsePlusPage.requirementsTitle,
    requirements: pulsePlusPage.requirements,
  },
  safety: {
    title: pulsePlusPage.features[2].title,
    text: pulsePlusPage.features[2].text,
  },
  status: {
    eyebrow: "Status",
    title: "In development: engineered, not yet on sale.",
    lead: "Pulse+ is designed and documented in the engineering register. Its figures are design targets, and nothing on this page describes an installed or certified unit.",
    register: "Register your site and we survey it, quote it and include it in the first Pulse+ installations.",
    notYet: [
      "No release date or price is published yet; sites are quoted individually.",
      "The weather rating is a design target until accredited testing confirms it.",
    ],
  },
  cta: {
    primary: { href: pulsePlusPage.cta.href, label: "Register your site" },
    secondary: { href: pulsePlusPage.secondaryCta?.href ?? "/partners", label: pulsePlusPage.secondaryCta?.label ?? "Fleet programmes" },
  },
  faqs: getPageSeo("/charging/pulse-plus")?.faqs ?? [],
} as const;
