import { chargingHub } from "@/lib/charging-hub";
import type { FaqItem } from "@/lib/seo/types";

/**
 * Public charging FAQs grounded in published consumer copy and the solar-hub
 * design basis. Handbook LCOC / payback figures stay on the engineering page
 * and are labelled planning / illustrative as never as live tariffs.
 *
 * Booking / Nairobi–Kisumu passenger content is retired from the public site:
 * Precifarm does not operate vehicles, so it contradicts the entity description
 * everywhere else. `precifarm-booking-faq` 301s to `/faq` and
 * `book-nairobi-kisumu-coach` 301s to `/guides`.
 */

export const HOMEPAGE_FAQ_SLUG = "ev-charging-economics-faq";
export const BOOKING_FAQ_SLUG = "precifarm-booking-faq";
export const BOOKING_GUIDE_SLUG = "book-nairobi-kisumu-coach";

type ChargingFaq = FaqItem & { id: string };

export const chargingHubFaq: ChargingFaq = {
 id: "charging-hub",
 question: "What is the Charging Hub?",
 answer: `The Charging Hub at precifarm.com/hub is Precifarm's map of DC fast chargers, Boda Hub battery swap stations, partner sites and planned corridor locations across Kenya. Open it on the web or in Precifarm Agent. Live sites are labelled live; planned sites stay labelled planned.`,
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
 "A typical Nairobi driving day of about 60 km as a home charging day as costs roughly KES 140 in electricity at home versus ~KES 1,000 in diesel per day as a typical saving of about KES 860 a day. On a Pulse charger, that day refills in about 90 minutes. Actual cost depends on your Kenya Power tariff, vehicle efficiency and kilometres driven.",
 },
 {
 id: "pulse-price",
 question: "How much is a Pulse charger?",
 answer:
 "The Pulse charger starts from KES 79,000, with Lipa Pole Pole instalments on M-Pesa. A typical 60 km day refills in about 90 minutes at 7 kW. The quoted price follows a private-house survey as consumer-unit upgrades, extra cabling or civil works are priced separately if they are needed.",
 },
 {
 id: "public-dc-price",
 question: "How much is public DC charging?",
 answer:
 "Public DC at Precifarm Depot charging stations and Corridor charging sites is from KES 39/kWh. Corridor charging adds about 60 kWh in 30 minutes at 120 kW DC. The session price is shown in Precifarm Agent and at the charger before you start. Charging on your own home meter is usually cheaper per kWh than public DC.",
 },
 {
 id: "home-vs-public",
 question: "Why is home charging cheaper than public DC?",
 answer:
 "At home you pay your household electricity tariff on your own meter. Public Depot charging stations and Corridor charging sites recover charger hardware, Kenya Power demand, monitoring and uptime as so the published public rate starts from KES 39/kWh, still typically far below diesel for the same kilometres.",
 },
 {
 id: "lipa-pole-pole",
 question: "What is Lipa Pole Pole?",
 answer:
 "Lipa Pole Pole is Precifarm instalment financing on M-Pesa as from KES 3,300/month. Pay a deposit and spread the balance on any phone as no bank account required. It applies to Pulse charger and Pod energy storage installations, not to public charging sessions.",
 },
 {
 id: "get-home-charger",
 question: "How do I get a home charger?",
 answer:
 "Visit precifarm.com/charging/home or open Precifarm Agent, request a Pulse charger or Pod energy storage survey, and pay the deposit via M-Pesa. Certified installation and commissioning typically take one day after survey approval. Three-year aftersale care is included on every home unit.",
 },
 {
 id: "house-installation-includes",
 question: "What is included in a private house installation?",
 answer:
 "Remote intake and property survey, a written quote and single-line diagram, Pulse charger or Pod energy storage supply and installation (Type 2 AC for your vehicle), commissioning, handover, remote monitoring and three-year aftersale support. Optional Pod energy storage with solar and LiFePOâ‚„ storage. Kenya Power service upgrades and unusual civil works are not included unless they appear on the quote.",
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
 "Start the session in Precifarm Agent or at the charger and pay with M-Pesa. The price per kWh is shown before you start. Public DC at Depot charging stations and Corridor charging sites is from KES 39/kWh.",
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
 "M-Pesa for home instalments (Lipa Pole Pole) and public charging sessions. USSD and SMS work on basic phones as no bank account required.",
 },
 {
 id: "public-locations",
 question: "Where are Precifarm public chargers?",
 answer: `See the ${chargingHub.name} at precifarm.com/hub for Precifarm hubs and partner sites including EVChaja and ChargeNet across Kenya.`,
 },
 {
 id: "what-is-precifarm",
 question: "What is Precifarm?",
 answer:
 "Precifarm is Kenya's electric mobility infrastructure company. We design, finance, install and operate charging and energy systems for homes, fleets and highway corridors, with M-Pesa on every product.",
 },
 {
 id: "ai-companion",
 question: "What is Precifarm Agent?",
 answer:
 "Precifarm Agent is the AI electrical and energy engineering workspace for EV charging, solar, batteries and electrical systems. Desktop coming soon — request access at precifarm.com/download.",
 },
 {
 id: "depot",
 question: "What is a Depot charging station?",
 answer:
 "Depot is a 22 kW AC pedestal for fleets that park for hours as vans, shuttles and yard vehicles. It adds 40+ kWh in about 120 minutes. Public DC at Depot and Corridor sites is from KES 39/kWh on M-Pesa. See Partners for fleet electrification.",
 },
 {
 id: "boda-hub",
 question: "What is Boda Hub?",
 answer:
 "Boda Hub is battery swap or kerbside charge for electric motorcycles as typically under five minutes back on the road. Live sites are listed on the Charging Hub. Automated self-service lockers (find → reserve → scan → swap → pay) are on the product roadmap under engineering validation as see precifarm.com/charging/boda-hub. Compatibility depends on validated platforms at each site.",
 },
 {
 id: "modular-energy",
 question: "What is Precifarm modular energy?",
 answer:
 "P1 Go, P2 Home and Mini Stack are a conceptual energy-storage family as portable backup, a home tower and outdoor SME backup. They are not on sale yet and Mini Stack is not Pod energy storage (the home charger + battery on the home charging page). See precifarm.com/charging/modular-energy.",
 },
 {
 id: "training",
 question: "Do you train technicians on Precifarm chargers?",
 answer:
 "Yes. T1 site safety, T2 field technician and T3 commissioning programmes map to Pulse, Pod, Depot, Boda Hub and Corridor. Nairobi classroom plus field modules on live hubs. Enquire at precifarm.com/training.",
 },
];

const chargingFaqPool: ChargingFaq[] = [...consumerChargingFaqs, chargingHubFaq];

export const homepageChargingFaqs: FaqItem[] = pickFaqs(
 ["home-day-cost", "pulse-price", "public-dc-price", "lipa-pole-pole", "ai-companion", "charging-hub"],
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
 "ai-companion",
 "pay-public",
 "charging-hub",
 "depot",
 "boda-hub",
 "modular-energy",
 "training",
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
 "Multi-bay sites for organisations use Depot charging stations as see fleet charging on the Partners page. That is not Pulse charger or Pod energy storage home charging. Those sites are sized to fleet and visitor demand in a written engineering assessment.",
 },
 {
 question: "How long does a house installation take?",
 answer:
 "Most single-house jobs finish in one day on site after survey and quote approval. Complex consumer-unit or cable-route work can take a second day.",
 },
];

export const privateHouseChargingFaqs: FaqItem[] = [
 ...pickFaqs(["pulse-vs-pod", "house-installation-includes"], consumerChargingFaqs),
 ...privateHouseScopeFaqs,
];

export const chargingServicesFaqs: FaqItem[] = pickFaqs(
 ["home-day-cost", "pulse-price", "pay-public", "ai-companion", "lipa-pole-pole"],
 consumerChargingFaqs,
);

export const hubPageFaqs: FaqItem[] = pickFaqs(
 ["charging-hub", "public-locations", "pay-public", "boda-hub", "ai-companion"],
 chargingFaqPool,
);

/** Shared engineering FAQ copy — keep aligned with `engineeringPageFaqs`. */
export const hubEngineeringFaqs: FaqItem[] = [
 {
 question: "Who is the engineering package for?",
 answer:
 "Homeowners sizing Pulse or Pod with solar, fleet and property partners planning Depot or Boda Hub yards, highway hosts scoping Corridor T-canopy DC, and sites exploring modular energy storage. The package covers EV charging and energy systems — not passenger booking or bus timetable products.",
 },
 {
 question: "Does solar replace the Kenya Power connection?",
 answer:
 "No. A 40–80 kWp canopy in Kenya yields roughly 180–440 kWh/day. Against an illustrative 1,500 kWh/day hub, PV covers about 12–30% of daily energy. Use solar for cost, shade and resilience — not as a substitute for the Kenya Power feeder. Planning assumption.",
 },
 {
 question: "Why add batteries at a charging hub?",
 answer:
 "When peak charger demand exceeds the Kenya Power import limit, LiFePO₄ storage covers the gap and smooths demand charges. Example: 120 kWh in 30 minutes at ~240 kW with a 180 kW import limit needs storage for the difference plus reserve. Site-specific — not a bill of quantities.",
 },
 {
 question: "What moves hub payback more than charger efficiency?",
 answer:
 "Utilisation and tariff classification, including demand charges, move payback more than brochure efficiency. Hubs are approved on contracted kWh throughput and session reliability, not on solar yield alone. Handbook worked examples are planning models, not quotations or live consumer tariffs.",
 },
 {
 question: "Are the engineering cost figures a quotation?",
 answer:
 "No. Planning bands in the design doc (chargers, canopy PV, storage, connection) and handbook worked examples are illustrative. Live public DC is from KES 39/kWh at Depot charging stations and Corridor charging sites. The Pulse charger starts from KES 79,000. Request a site-specific cost sheet after survey.",
 },
];
