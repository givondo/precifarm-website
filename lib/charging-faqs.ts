import { chargingHub } from "@/lib/charging-hub";
import type { FaqItem } from "@/lib/seo/types";

/**
 * Public charging FAQs grounded in published consumer copy and the solar-hub
 * design basis. Handbook LCOC / payback figures stay on the engineering page
 * and are labelled planning / illustrative — never as live tariffs.
 *
 * Booking / Nairobi–Kisumu passenger FAQs live on the CMS slug
 * `precifarm-booking-faq` only — they must not appear on `/` or the main `/faq` list.
 */

export const HOMEPAGE_FAQ_SLUG = "ev-charging-economics-faq";
export const BOOKING_FAQ_SLUG = "precifarm-booking-faq";

type ChargingFaq = FaqItem & { id: string };

export const chargingHubFaq: ChargingFaq = {
  id: "charging-hub",
  question: "What is the Charging Hub?",
  answer: `The Charging Hub at precifarm.com/network is Precifarm's map of route charging hubs, partner chargers (including EVChaja and ChargeNet) and planned corridor sites across Kenya. Filter DC fast chargers, check status and navigate to a site. Live sites are labelled live, and planned sites stay labelled planned.`,
};

function pickFaqs(ids: readonly string[], pool: ChargingFaq[]): FaqItem[] {
  return ids.map((id) => {
    const item = pool.find((faq) => faq.id === id);
    if (!item) {
      throw new Error(`Missing charging FAQ: ${id}`);
    }
    return { question: item.question, answer: item.answer };
  });
}

export const consumerChargingFaqs: ChargingFaq[] = [
  {
    id: "home-day-cost",
    question: "How much does home charging cost per day?",
    answer:
      "A typical Nairobi driving day of about 60 km — a home charging day — costs roughly KES 140 in electricity at home versus ~KES 1,000 in diesel per day — a typical saving of about KES 860 a day. On a Pulse charger, that day refills in about 90 minutes. Actual cost depends on your Kenya Power tariff, vehicle efficiency and kilometres driven.",
  },
  {
    id: "pulse-price",
    question: "How much is a Pulse charger?",
    answer:
      "The Pulse charger starts from KES 79,000, with Lipa Pole Pole instalments on M-Pesa. A typical 60 km day refills in about 90 minutes at 7 kW. The quoted price follows a private-house survey — consumer-unit upgrades, extra cabling or civil works are priced separately if they are needed.",
  },
  {
    id: "public-dc-price",
    question: "How much is public DC charging?",
    answer:
      "Public DC at Precifarm Depot charging stations and Corridor charging sites is from KES 39/kWh. Corridor charging adds about 60 kWh in 30 minutes at 120 kW DC. The session price is shown in the app and at the charger before you start. Charging on your own home meter is usually cheaper per kWh than public DC.",
  },
  {
    id: "home-vs-public",
    question: "Why is home charging cheaper than public DC?",
    answer:
      "At home you pay your household electricity tariff on your own meter. Public Depot charging stations and Corridor charging sites recover charger hardware, Kenya Power demand, monitoring and uptime — so the published public rate starts from KES 39/kWh, still typically far below petrol for the same kilometres.",
  },
  {
    id: "lipa-pole-pole",
    question: "What is Lipa Pole Pole?",
    answer:
      "Lipa Pole Pole is Precifarm instalment financing on M-Pesa. Pay a deposit and spread the balance on any phone — no bank account required. It applies to Pulse charger and Pod energy storage installations.",
  },
  {
    id: "get-home-charger",
    question: "How do I get a home charger?",
    answer:
      "Visit precifarm.com/charging/private-house or open the Precifarm app, request a Pulse charger or Pod energy storage survey, and pay the deposit via M-Pesa. Certified installation and commissioning typically take one day after survey approval. Three-year aftersale care is included on every home unit.",
  },
  {
    id: "house-installation-includes",
    question: "What is included in a private house installation?",
    answer:
      "Remote intake and property survey, a written quote and single-line diagram, charger supply and installation (CCS2 or Type 2 for your vehicle), commissioning, handover, remote monitoring and three-year aftersale support. Optional Pod energy storage with solar and LiFePO₄ storage. Kenya Power service upgrades and unusual civil works are not included unless they appear on the quote.",
  },
  {
    id: "pulse-vs-pod",
    question: "What is the difference between the Pulse charger and Pod energy storage?",
    answer:
      "The Pulse charger is a 7 kW wall unit that refills a typical 60 km day in about 90 minutes on your home meter. Pod energy storage adds 5 or 10 kWh of built-in storage, and optional rooftop solar, so you can keep charging when the grid is weak or when the roof is producing.",
  },
  {
    id: "spark",
    question: "What is the Spark charger?",
    answer:
      "The Spark charger is a 3.3 kW portable unit that refills a typical day in about 180 minutes from a normal socket and travels in the boot. Use it where you have a suitable outlet. It is not a public Corridor charging session, and you pay the electricity at that site.",
  },
  {
    id: "home-charge-time",
    question: "How long does home charging take?",
    answer:
      "A typical Nairobi day of about 60 km is roughly 10 kWh. On a Pulse charger at 7 kW, that refills in about 90 minutes. Plug in overnight and most drivers wake up full. A Spark charger from a normal socket takes about 180 minutes for the same day.",
  },
  {
    id: "pay-public",
    question: "How do I pay at a public charger?",
    answer:
      "Start the session in the Precifarm Android app or at the charger and pay with M-Pesa. The price per kWh is shown before you start. Public DC at Depot charging stations and Corridor charging sites is from KES 39/kWh.",
  },
  {
    id: "solar-vs-grid",
    question: "Does rooftop solar replace Kenya Power at home?",
    answer:
      "No. Pod energy storage with solar and home storage cuts grid cost and adds backup; they do not replace a working supply or a site survey. House charging stays on your meter. Solar is sized to your roof and daily mileage, not as a substitute for the grid.",
  },
  {
    id: "payment-methods",
    question: "What payment methods are accepted?",
    answer:
      "M-Pesa for home instalments (Lipa Pole Pole) and public charging sessions. USSD and SMS work on basic phones — no bank account required.",
  },
  {
    id: "public-locations",
    question: "Where are Precifarm public chargers?",
    answer: `See the ${chargingHub.name} at precifarm.com/network for Precifarm hubs and partner networks including EVChaja and ChargeNet across Kenya.`,
  },
  {
    id: "what-is-precifarm",
    question: "What is Precifarm?",
    answer:
      "Precifarm is Kenya's electric mobility infrastructure company. We design, finance, install and operate charging and energy systems for homes, fleets and highway corridors, with M-Pesa on every product.",
  },
];

const chargingFaqPool: ChargingFaq[] = [...consumerChargingFaqs, chargingHubFaq];

export const homepageChargingFaqs: FaqItem[] = pickFaqs(
  ["home-day-cost", "pulse-price", "public-dc-price", "lipa-pole-pole", "get-home-charger", "charging-hub"],
  chargingFaqPool,
);

export const faqIndexChargingFaqs: FaqItem[] = pickFaqs(
  [
    "home-day-cost",
    "home-charge-time",
    "pulse-price",
    "public-dc-price",
    "lipa-pole-pole",
    "get-home-charger",
    "pulse-vs-pod",
    "spark",
    "pay-public",
    "charging-hub",
    "solar-vs-grid",
    "payment-methods",
    "what-is-precifarm",
  ],
  chargingFaqPool,
);

export const privateHouseScopeFaqs: FaqItem[] = [
  {
    question: "Is this different from a public charging hub?",
    answer:
      "Yes. House-based private charging is on your property for your vehicle only, billed on your meter. Public Depot charging stations and Corridor charging sites on the Charging Hub serve public sessions at the published public DC rate (from KES 39/kWh).",
  },
  {
    question: "Can you install at an apartment?",
    answer:
      "Only where you have a dedicated private parking bay and written approval from the landlord or management. The charger serves your unit, not a shared public bay.",
  },
  {
    question: "What about a whole estate or school?",
    answer:
      "Multi-bay sites for organisations use Depot charging stations — see fleet charging on the Partners page. That is not Pulse charger or Pod energy storage home charging. Those sites are sized to fleet and visitor demand in a written engineering assessment.",
  },
  {
    question: "How long does a house installation take?",
    answer:
      "Most single-house jobs finish in one day on site after survey and quote approval. Complex consumer-unit or cable-route work can take a second day.",
  },
];

export const privateHouseChargingFaqs: FaqItem[] = [
  ...pickFaqs(
    [
      "home-day-cost",
      "home-charge-time",
      "pulse-price",
      "pulse-vs-pod",
      "home-vs-public",
      "lipa-pole-pole",
      "house-installation-includes",
      "solar-vs-grid",
    ],
    consumerChargingFaqs,
  ),
  ...privateHouseScopeFaqs,
];

export const reservedWindowFaq: FaqItem = {
  question: "What is a reserved charging window?",
  answer:
    "A contracted slot so a scheduled electric bus receives energy in time to leave. Public sessions do not displace a reserved window. This product is designed, not yet commissioned. Hubs are approved on contracted kWh and window reliability, not on solar yield alone.",
};

export const chargingServicesFaqs: FaqItem[] = [
  ...pickFaqs(
    ["public-dc-price", "home-day-cost", "pulse-price", "spark", "pay-public"],
    consumerChargingFaqs,
  ),
  {
    question: "Who is each charging product for?",
    answer:
      "The Pulse charger and Pod energy storage are private-house units — a typical day in about 90 minutes at home. The Spark charger is the portable unit for the boot — about 180 minutes for a typical day from a normal socket. The Depot charging station adds 40+ kWh in about 120 minutes for fleets. Corridor charging adds about 60 kWh in 30 minutes on the highway (from KES 39/kWh). Boda Hub swaps a fresh battery in under 5 minutes. Lipa Pole Pole finances home installations on M-Pesa.",
  },
];

export const hubEngineeringFaqs: FaqItem[] = [
  {
    question: "Does solar power a reserved bus window in real time?",
    answer:
      "No. Solar does not power the window as it happens. A 40–80 kWp canopy in Kenya yields roughly 180–440 kWh/day. Against an illustrative 1,500 kWh/day hub, PV covers about 12–30% of daily energy. Use it for cost, shade and resilience — not as a substitute for the Kenya Power feeder. Planning assumption.",
  },
  {
    question: "How much energy does Nairobi–Kisumu take?",
    answer:
      "Planning assumption: about 1.2 kWh/km loaded × 345 km ≈ 414 kWh per trip. A worked reserved window of 120 kWh in 30 minutes needs about 240 kW at the vehicle. Replace these figures with OEM pack data, a loaded consumption test and a Kenya Power offer before construction.",
  },
  {
    question: "Why add batteries at a route hub?",
    answer:
      "If the charger needs more power than the Kenya Power import limit during a reserved window, LiFePO₄ storage covers the gap. Example: 120 kWh in 30 minutes at ~240 kW with a 180 kW import limit requires storage for the difference, plus reserve. Illustrative and site-specific — not a bill of quantities.",
  },
  {
    question: "What moves hub payback more than charger efficiency?",
    answer:
      "Utilisation and tariff classification, including demand charges, move payback more than brochure efficiency. Route hubs are approved on contracted kWh and window reliability, not on solar yield alone. Handbook worked examples are planning models, not quotations or live consumer tariffs.",
  },
  {
    question: "Are the engineering cost figures a quotation?",
    answer:
      "No. Planning bands in the design doc (chargers, canopy PV, storage, connection) and the handbook 300 kW worked example are illustrative. Live public DC is from KES 39/kWh at Depot charging stations and Corridor charging sites. The Pulse charger starts from KES 79,000. Request a site-specific cost sheet after survey.",
  },
  reservedWindowFaq,
];
