import { chargingHub } from "@/lib/charging-hub";
import type { FaqItem } from "@/lib/seo/types";

/**
 * Public charging FAQs grounded in published consumer copy and the solar-hub
 * design basis. Handbook LCOC / payback figures stay on the engineering page
 * and are labelled planning / illustrative, never as live tariffs.
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
 "A typical Nairobi driving day of about 60 km (a home charging day) costs roughly KES 140 in electricity at home versus ~KES 1,000 in diesel per day, a typical saving of about KES 860 a day. On a Pulse charger, that day refills in under two hours. Actual cost depends on your Kenya Power tariff, vehicle efficiency and kilometres driven.",
 },
 {
 id: "pulse-price",
 question: "How much is a Pulse charger?",
 answer:
 "The Pulse charger starts from KES 79,000, with Lipa Pole Pole instalments on M-Pesa. A typical 60 km day refills in under two hours at 7 kW. The quoted price follows a private-house survey; consumer-unit upgrades, extra cabling or civil works are priced separately if they are needed.",
 },
 {
 id: "public-dc-price",
 question: "How much is public DC charging?",
 answer:
 "Public DC at commissioned Precifarm Corridor charging sites is from KES 39/kWh, with the session price shown at the charger before you start. The first Corridor sites, starting on Nairobi to Kisumu, are pilots in development. As an illustration, a car that accepts about 120 kW can add around 60 kWh in 30 minutes. Charging on your own home meter is usually cheaper per kWh than public DC.",
 },
 {
 id: "home-vs-public",
 question: "Why is home charging cheaper than public DC?",
 answer:
 "At home you pay your household electricity tariff on your own meter. Public Corridor charging sites recover charger hardware, Kenya Power demand, monitoring and uptime, so the published public rate starts from KES 39/kWh, still typically far below diesel for the same kilometres.",
 },
 {
 id: "lipa-pole-pole",
 question: "What is Lipa Pole Pole?",
 answer:
 "Lipa Pole Pole is Precifarm instalment financing on M-Pesa, from KES 3,300/month. Pay a deposit and spread the balance on any phone. No bank account required. It applies to Pulse charger installations, not to public charging sessions.",
 },
 {
 id: "get-home-charger",
 question: "How do I get a home charger?",
 answer:
 "Visit precifarm.com/charging/home or open Precifarm Agent, request a Pulse charger survey, and pay the deposit via M-Pesa. Certified installation and commissioning typically take one day after survey approval. Three-year aftersale care is included on every home unit.",
 },
 {
 id: "house-installation-includes",
 question: "What is included in a private house installation?",
 answer:
 "Remote intake and property survey, a written quote and single-line diagram, Pulse charger supply and installation (Type 2 AC for your vehicle), commissioning, handover, remote monitoring and three-year aftersale support. Kenya Power service upgrades and unusual civil works are not included unless they appear on the quote.",
 },
 {
 id: "pulse-safety",
 question: "How does the Pulse charger keep a home installation safe?",
 answer:
 "Charging current never runs through a circuit board. An independent safety processor and a hardware watchdog control the contactor, the unit detects 6 mA DC residual current and welded contacts, and it checks earth and supply before every session. It is installed on its own circuit behind a Type A RCD, and load management trims the charging current so your main fuse does not trip.",
 },
 {
 id: "pulse-plus",
 question: "What is the Pulse+ charger?",
 answer:
 "Pulse+ is the 22 kW three-phase member of the Pulse family for fleet yards, workplaces and apartment parking. It adapts to each car: 22 kW where the car accepts it, 11 kW on most three-phase cars, and 7.4 kW in single-phase mode, and up to ten units can share one site meter. Pulse+ is in development; fleets and site hosts can register interest for a site quote.",
 },
 {
 id: "home-charge-time",
 question: "How long does home charging take?",
 answer:
 "A typical Nairobi day of about 60 km is roughly 10 kWh. On a Pulse charger at 7 kW it takes under two hours from the meter. Plug in overnight and most drivers wake up full.",
 },
 {
 id: "pay-public",
 question: "How do I pay at a public charger?",
 answer:
 "Start the session in Precifarm Agent or at the charger and pay with M-Pesa. The price per kWh is shown before you start. Public DC at commissioned Corridor charging sites is from KES 39/kWh.",
 },
 {
 id: "solar-vs-grid",
 question: "Does rooftop solar replace Kenya Power at home?",
 answer:
 "No. Rooftop solar can cut what you pay for charging, but it does not replace a working supply or a site survey. House charging stays on your meter. Solar is sized to your roof and daily mileage, not as a substitute for the grid.",
 },
 {
 id: "payment-methods",
 question: "What payment methods are accepted?",
 answer:
 "M-Pesa for home instalments (Lipa Pole Pole) and public charging sessions. USSD and SMS work on basic phones. No bank account required.",
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
 id: "corridor",
 question: "What is Corridor charging?",
 answer:
 "Corridor is Precifarm's DC fast charging for highways and towns: two CCS2 guns on overhead cable trolleys, with on-site battery storage so the site needs a smaller grid connection. Each site is engineered around a power study with Kenya Power. The first Corridor sites, starting on Nairobi to Kisumu, are pilots in development; public DC will be from KES 39/kWh at commissioned sites.",
 },
 {
 id: "boda-hub",
 question: "What is Boda Hub?",
 answer:
 "Boda Hub is battery swapping for electric motorcycles: at partner-run sites a swap takes under five minutes. The Automated Boda Hub cabinet, with a controller in every bay and charging only when the door is closed and latched, is in development. Each site uses one battery make; mixed brands are not accepted. See precifarm.com/charging/boda-hub.",
 },
 {
 id: "wireless",
 question: "Does Precifarm sell wireless EV charging?",
 answer:
 "No. Wireless charging is a Precifarm research programme. The first research target is stationary charging for light-duty cars at home and in fleet depots, with a later study for e-bodas. No transfer efficiency has been measured yet and nothing is for sale. The Pulse charger is what we install today.",
 },
 {
 id: "training",
 question: "Do you train technicians on Precifarm chargers?",
 answer:
 "Yes. T1 site safety, T2 field technician and T3 commissioning programmes map to Pulse, Pulse+, Boda Hub and Corridor. Nairobi classroom plus field modules. Enquire at precifarm.com/training.",
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
 "pulse-safety",
 "pulse-plus",
 "ai-companion",
 "pay-public",
 "charging-hub",
 "corridor",
 "boda-hub",
 "wireless",
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
 "Yes. House-based private charging is on your property for your vehicle only, billed on your meter. Public Corridor charging sites serve public sessions at the published public DC rate (from KES 39/kWh).",
 },
 {
 question: "Can you install at an apartment?",
 answer:
 "Only where you have a dedicated private parking bay and written approval from the landlord or management. The charger serves your unit, not a shared public bay.",
 },
 {
 question: "What about a whole estate or school?",
 answer:
 "Multi-bay sites for organisations use Pulse+ three-phase chargers (in development) with shared load management. See fleet charging on the Partners page. That is not Pulse home charging. Those sites are sized to fleet and visitor demand in a written engineering assessment.",
 },
 {
 question: "How long does a house installation take?",
 answer:
 "Most single-house jobs finish in one day on site after survey and quote approval. Complex consumer-unit or cable-route work can take a second day.",
 },
];

export const privateHouseChargingFaqs: FaqItem[] = [
 ...pickFaqs(["pulse-safety", "house-installation-includes"], consumerChargingFaqs),
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
 "Homeowners sizing a Pulse charger, fleet and property partners planning Pulse+ or Boda Hub yards, and highway hosts scoping Corridor DC with on-site storage. The package covers EV charging and energy systems — not passenger booking or bus timetable products.",
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
 "No. Planning bands in the design doc (chargers, canopy PV, storage, connection) and handbook worked examples are illustrative. Public DC will be from KES 39/kWh at commissioned Corridor charging sites. The Pulse charger starts from KES 79,000. Request a site-specific cost sheet after survey.",
 },
];
