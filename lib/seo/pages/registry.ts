import {
 chargingServicesFaqs,
 faqIndexChargingFaqs,
 privateHouseChargingFaqs,
} from "@/lib/charging-faqs";
import { contactPage, faqPage, guidesPage } from "@/lib/company-pages";
import { engineeringPageFaqs } from "@/lib/engineering-page";
import { trainingNavLabel } from "@/lib/training";
import { trainingPage, trainingPageFaqs } from "@/lib/training-page";
import { chargingHub } from "@/lib/charging-hub";
import { agentPageFaqs } from "@/lib/agent-page";
import { researchPageFaqs } from "@/lib/research-page";
import {
  wirelessChargingPolicyFaqs,
  wirelessChargingPolicyPath,
} from "@/lib/wireless-charging-policy-page";
import { cookiesFaqs, privacyFaqs, termsFaqs } from "@/lib/legal/content";
import {
  cookiesPolicyPath,
  legalHubPath,
  privacyPolicyPath,
  termsOfUsePath,
} from "@/lib/legal/paths";
import { downloadPageFaqs } from "@/lib/download-page";
import { megapackFaqs, megapackPageContent } from "@/lib/megapack-page";
import { productImages } from "@/lib/product-images";
import { bodaHubFaqs, bodaHubPageContent, bodaHubStatusNote } from "@/lib/boda-hub-page";
import { homepageAisoBlocks } from "@/lib/seo/aiso/blocks";
import { defaultSiteTitle, siteConfig } from "@/lib/seo/config";
import type { PageSeoInput } from "@/lib/seo/types";

/** Central registry for SEO audit and metadata consistency */
export const pageSeoRegistry: PageSeoInput[] = [
 {
 path: "/",
 title: defaultSiteTitle,
 description: siteConfig.defaultDescription,
 ogImage: "/images/home-hero-video-wallpaper.jpg",
 faqs: (homepageAisoBlocks.find((b) => b.type === "faq")?.items ?? []) as PageSeoInput["faqs"],
 breadcrumbs: [{ name: "Home", href: "/" }],
 },
 {
 path: chargingHub.path,
 title: "Charging Hub — DC Fast, Boda Swap & Map | Precifarm",
 ogImage: productImages.corridorForecourt.src,
 description: chargingHub.description,
 keywords: [
 "Charging Hub Kenya",
 "find EV chargers Kenya",
 "boda battery swap Nairobi",
 "fast EV charging Kenya",
 "M-Pesa EV charging",
 "Precifarm Agent",
 ],
 faqs: [
 {
 question: "What is Charging Hub?",
 answer:
 "Charging Hub lists every Precifarm fast charger, boda swap cabinet and partner stop in Kenya — with honest open and coming-soon labels on each site.",
 },
 {
 question: "How do I use Charging Hub?",
 answer:
 "Open precifarm.com/hub in your browser. Precifarm Agent desktop is coming soon — request access at precifarm.com/download.",
 },
 {
 question: "Can I pay with M-Pesa?",
 answer:
 "Yes. Session price is shown in the app before you confirm. Receipts stay on your phone.",
 },
 ],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: chargingHub.label, href: chargingHub.path },
 ],
 },
 {
 path: "/charging",
 title: "EV Charging Infrastructure in Kenya",
 description:
 "EV charging in Kenya — Pulse and Pod at home, Depot and Boda Hub for fleets, Corridor DC on highways. M-Pesa on every product.",
 keywords: ["EV charging Kenya", "fleet charging", "home AC charger installation", "KES 39 kWh"],
 faqs: chargingServicesFaqs,
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Charging", href: "/charging" },
 ],
 },
 {
 path: "/charging/home",
 title: "Home EV Charging in Kenya",
 description:
 "Home EV charger installation in Kenya. Pulse from KES 79,000, Pod storage, Lipa Pole Pole from KES 3,300/month on M-Pesa. Survey and aftersale support.",
 faqs: privateHouseChargingFaqs,
 keywords: [
 "private house EV charging Kenya",
 "home AC wallbox private property",
 "Pulse charger installation Nairobi",
 "residential private charging install",
 ],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Charging", href: "/charging" },
 { name: "Home charging", href: "/charging/home" },
 ],
 },
 {
 path: "/charging/engineering",
 title: "EV Charging Site Engineering in Kenya",
 description:
 "Precifarm design basis for home, fleet and highway charging — grid, solar, LiFePO4, Corridor DC, Kenya Power hold points and phased commissioning. PDF download.",
 faqs: [...engineeringPageFaqs],
 keywords: [
 "EV charging station design Kenya",
 "solar EV charger engineering",
 "DC fast charging hub task sheet",
 "Precifarm charging station design",
 ],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Charging", href: "/charging" },
 { name: "Engineering", href: "/charging/engineering" },
 ],
 },
 {
 path: "/charging/boda-hub",
 title: "Automated Boda Hub | Keep your bike moving",
 description: `${bodaHubPageContent.hero.description} ${bodaHubStatusNote}`,
 keywords: [
 "boda battery swap Kenya",
 "electric motorcycle smart locker",
 "e-boda Energy Module",
 "Precifarm Boda Hub",
 "2.56 kWh battery swap Kenya",
 ],
 ogImage: bodaHubPageContent.hero.image.src,
 faqs: [...bodaHubFaqs],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Charging", href: "/charging" },
 { name: "Automated Boda Hub", href: "/charging/boda-hub" },
 ],
 },
 {
 path: "/charging/modular-energy",
 title: "Modular Energy — One 2.56 kWh Module, Three Scales",
 description:
 "P1 Go carried, P2 Home stacked beside the board, Mini Stack mounted outdoors as three scales of one 2.56 kWh Energy Module, designed for Kenyan homes and shops. Conceptual, not on sale yet.",
 keywords: [
 "home battery storage Kenya",
 "modular energy platform",
 "LiFePO4 home backup Kenya",
 "Precifarm P1 Go P2 Home Pod",
 ],
 faqs: [
 {
 question: "Is modular energy on sale in Kenya?",
 answer:
 "P1 Go, P2 Home, Mini Stack and MegaPack are conceptual platform products — not certified for sale. Pulse, Pod, Spark, Depot, Boda Hub and Corridor are the commercial charging line.",
 },
 {
 question: "What is the 2.56 kWh Energy Module?",
 answer:
 "One lithium module scales from portable P1 Go to home P2 Home and outdoor Mini Stack — engineered for Kenyan homes, shops and sites on the same platform family.",
 },
 ],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Modular energy", href: "/charging/modular-energy" },
 ],
 },
 {
 path: "/charging/modular-energy/p1-go",
 title: "P1 Go — Portable Backup When the Power Goes Out",
 description:
 "About 1 kWh in an aluminium carry case, with foldable solar and a Type 2 trickle lead in the box. Sized for a router, laptop and phones through an outage. Conceptual, not a daily EV charger and not on sale yet.",
 keywords: ["P1 Go", "portable power station Kenya", "home backup battery Kenya"],
 faqs: [
 {
 question: "Is P1 Go an EV charger?",
 answer:
 "No. P1 Go is conceptual portable backup (~1 kWh) for routers, laptops and phones through an outage — not a daily EV charger and not on sale yet.",
 },
 ],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Modular energy", href: "/charging/modular-energy" },
 { name: "P1 Go", href: "/charging/modular-energy/p1-go" },
 ],
 },
 {
 path: "/charging/modular-energy/p2-home",
 title: "P2 Home — A Tower That Grows With Your Backup Needs",
 description:
 "One to four 2.56 kWh modules on a single Power Core, standing beside the consumer board and feeding an essential-load sub-board. About 2.6 to 10.2 kWh nameplate. Conceptual, not certified for sale.",
 keywords: ["P2 Home", "home battery storage Kenya", "LiFePO4 backup Kenya"],
 faqs: [
 {
 question: "How much backup does P2 Home provide?",
 answer:
 "One to four 2.56 kWh modules on a Power Core — about 2.6 to 10.2 kWh nameplate for essential loads. Conceptual, not certified for sale.",
 },
 ],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Modular energy", href: "/charging/modular-energy" },
 { name: "P2 Home", href: "/charging/modular-energy/p2-home" },
 ],
 },
 {
 path: "/charging/modular-energy/mini-stack",
 title: "Mini Stack — Outdoor Backup for Kenyan Retail Sites",
 description:
 "Two to six Energy Modules in an outdoor enclosure on a plinth, holding up refrigeration, the till and lighting at Kenyan retail sites. Distinct from Pod energy storage for home EV charging. Conceptual, not certified for sale.",
 keywords: ["Precifarm Mini Stack", "SME battery storage Kenya", "outdoor energy storage Kenya"],
 faqs: [
 {
 question: "Is Mini Stack the same as Pod energy storage?",
 answer:
 "No. Mini Stack is outdoor modular backup for retail sites. Pod energy storage is the home EV charger + storage product on /charging/home.",
 },
 ],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Modular energy", href: "/charging/modular-energy" },
 { name: "Mini Stack", href: "/charging/modular-energy/mini-stack" },
 ],
 },
 {
 path: "/charging/modular-energy/megapack",
 title: "MegaPack | Project-Engineered BESS Kenya",
 description:
 "Precifarm MegaPack is project-engineered battery storage in Kenya — from industrial sites and EV charging hubs to grid-connected utility plants. Sized per site, not sold as a catalogue SKU.",
 keywords: [
 "battery energy storage Kenya",
 "BESS Kenya",
 "utility-scale battery storage Kenya",
 "commercial battery storage Kenya",
 "industrial energy storage Kenya",
 "solar battery storage Kenya",
 "EV charging battery storage Kenya",
 "grid-scale BESS Africa",
 "renewable energy storage Kenya",
 "Precifarm MegaPack",
 ],
 ogImage: megapackPageContent.hero.image.src,
 faqs: [...megapackFaqs],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Modular energy", href: "/charging/modular-energy" },
 { name: "MegaPack", href: "/charging/modular-energy/megapack" },
 ],
 },
 {
 path: "/evs",
 title: "Electric Vehicles in Kenya",
 description:
 "Compare EVs in Kenya — Nissan Leaf, BYD Atto 3, MG4, Tesla Model 3, Roam Air and more. Practical range, DC charging speed, daily top-up time and where Precifarm home, hub and corridor charging fit.",
 keywords: [
 "EV Kenya comparison",
 "Kenya EV guide",
 "Nissan Leaf Kenya",
 "BYD Atto 3 Kenya",
 "BYD Dolphin Kenya",
 "Roam Air Kenya",
 "electric motorcycle Kenya",
 "EV practical range Kenya",
 "EV charging time Kenya",
 "CHAdeMO Kenya",
 "Precifarm EV charging",
 ],
 faqs: [
 {
 question: "Which EVs are most common in Kenya?",
 answer:
 "Used Nissan Leaf imports with CHAdeMO fast charging remain widespread. Newer BYD models (Dolphin, Atto 3, Seal), MG, Hyundai, Kia and Tesla imports are growing, alongside Roam Air and M-KOPA electric motorcycles in the e-boda segment.",
 },
 {
 question: "How long does home EV charging take in Kenya?",
 answer:
 "On a Precifarm Pulse charger, a typical daily top-up for most passenger EVs takes about 90 minutes. DC fast charging at a public hub can add the same energy in roughly 5–15 minutes depending on the vehicle and charger power.",
 },
 {
 question: "Does Precifarm support Nissan Leaf CHAdeMO charging?",
 answer:
 "Yes. Precifarm maps home, workplace and destination charging for Leaf drivers in Kenya, including CHAdeMO-capable DC sessions where available without requiring every Leaf to use high-power CCS corridor chargers.",
 },
 ],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Kenya EV guide", href: "/evs" },
 ],
 },
 {
 path: "/training",
 title: `${trainingNavLabel} — T1, T2 and T3 Certification`,
 description: trainingPage.hero.description,
 keywords: [
 "EV charging training Kenya",
 "EV charger installation course",
 "Precifarm certification",
 "Corridor DC commissioning training",
 ],
 faqs: trainingPageFaqs.map(({ question, answer }) => ({ question, answer })),
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: trainingNavLabel, href: "/training" },
 ],
 },
 {
 path: "/partners",
 title: "Fleet EV Charging Solutions in Kenya",
 description:
 "Partner with Precifarm to host Corridor hubs, run Depot and Boda Hub for fleets, or sell Pulse and Pod home installs — M-Pesa on every product.",
 faqs: [
 {
 question: "Who can partner with Precifarm?",
 answer:
 "Fleet operators, fuel retailers, malls, transport yards, property owners and certified installers can partner to host hubs, run depot charging or sell home charging.",
 },
 {
 question: "What fleet charging does Precifarm offer?",
 answer:
 "Depot charging station (22 kW AC pedestals), Boda Hub battery swap and Corridor DC on intercity routes — engineered, commissioned and operated by Precifarm.",
 },
 ],
 keywords: [
 "EV charging partner Kenya",
 "charging hub site host",
 "fleet depot charging",
 "Precifarm dealer install",
 ],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Partners", href: "/partners" },
 ],
 },
 {
 path: "/about",
 title: "About Precifarm — EV Charging & Modular Energy in Kenya",
 description:
 "Precifarm builds EV charging and modular energy storage in Kenya — Pulse, Pod and Corridor today; P1 Go, P2 Home, Mini Stack and MegaPack on the platform roadmap. M-Pesa on every product.",
 faqs: [
 {
 question: "What does Precifarm do?",
 answer:
 "Precifarm designs, finances, installs and operates EV charging in Kenya — from home Pulse and Pod to fleet Depot, Boda Hub and highway Corridor DC and designs a modular energy-storage family (P1 Go, P2 Home, Mini Stack, MegaPack) that is conceptual, not on sale. M-Pesa on every product.",
 },
 {
 question: "Does Precifarm operate vehicles or buses?",
 answer:
 "No. Precifarm is not a fleet or bus company. Operators run the vehicles; Precifarm surveys, installs, monitors and settles charging and energy.",
 },
 {
 question: "Is modular energy on sale?",
 answer:
 "No. P1 Go, P2 Home, Mini Stack and MegaPack are conceptual platform products — not certified for sale. Charging products (Pulse, Pod, Spark, Depot, Boda Hub, Corridor) are the commercial beachhead.",
 },
 ],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "About", href: "/about" },
 ],
 },
 {
 path: "/research",
 title: "R&D: Wireless Charging, Agent & Hub Energy Research | Precifarm",
 description:
 "Precifarm R&D in Kenya: five programmes with goals, G0 to G4 evidence gates and a dated roadmap. Wireless e-boda charging, Precifarm Agent, hub solar and storage, battery health and bidirectional charging.",
 keywords: [
 "wireless EV charging research",
 "wireless power transfer Kenya",
 "EV charging engineering software",
 "solar battery EV charging hub",
 "Precifarm Agent R&D",
 "Precifarm research Kenya",
 "wireless e-boda charging",
 "battery second life Kenya",
 ],
 faqs: researchPageFaqs,
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "R&D", href: "/research" },
 ],
 },
 {
 path: wirelessChargingPolicyPath,
 title: "Wireless EV Charging R&D Policy | Precifarm",
 description:
 "Precifarm company policy for wireless EV charging research — industry benchmarks (SAE J2954, IEC 61980, OEM references), safety gates, and Kenya pilot rules. Not a product offer; wired Pulse and Corridor remain commercial.",
 keywords: [
 "wireless EV charging policy",
 "WPT research Kenya",
 "SAE J2954",
 "Precifarm R&D policy",
 ],
 faqs: wirelessChargingPolicyFaqs,
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "R&D", href: "/research" },
 { name: "Wireless charging policy", href: wirelessChargingPolicyPath },
 ],
 },
 {
 path: legalHubPath,
 title: "Legal & policies | Precifarm",
 description:
 "Terms of use, privacy, cookies, and R&D policies for precifarm.com — operated by PreciFarm AI Ltd in Kenya.",
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Legal & policies", href: legalHubPath },
 ],
 },
 {
 path: termsOfUsePath,
 title: "Terms of use | Precifarm",
 description: "Terms for using precifarm.com, product vs research claims, and Precifarm Agent.",
 faqs: termsFaqs,
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Legal", href: legalHubPath },
 { name: "Terms", href: termsOfUsePath },
 ],
 },
 {
 path: privacyPolicyPath,
 title: "Privacy policy | Precifarm",
 description: "How Precifarm handles personal data on precifarm.com, forms, and Agent chat — Kenya DPA 2019.",
 faqs: privacyFaqs,
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Legal", href: legalHubPath },
 { name: "Privacy", href: privacyPolicyPath },
 ],
 },
 {
 path: cookiesPolicyPath,
 title: "Cookies & analytics | Precifarm",
 description: "Cookies and analytics on precifarm.com.",
 faqs: cookiesFaqs,
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Legal", href: legalHubPath },
 { name: "Cookies", href: cookiesPolicyPath },
 ],
 },
 {
 path: "/sustainability",
 title: "Sustainability — Precifarm Kenya",
 description:
 "Our 2030 goal is to make clean charging the affordable choice for Kenya. By 2050 we aim to help replace 1 billion kilometres of fossil-fuel driving with electric kilometres. A typical 60 km home day is about KES 140 versus about KES 1,000 in diesel.",
 faqs: [
 {
 question: "What is Precifarm's 2050 kilometre target?",
 answer:
 "By 2050, we aim to help replace 1 billion kilometres of fossil-fuel driving with electric kilometres across Kenya. That is a long-term target — not a live running total. We will publish how we count before showing a cumulative figure.",
 },
 {
 question: "What are Precifarm's six 2030 goals?",
 answer:
 "Cheaper than diesel, honest Hub labels, Lipa Pole Pole, solar on hubs, battery recycling, and a carbon study.",
 },
 {
 question: "Does Precifarm recycle batteries?",
 answer:
 "Pod uses LFP batteries. We maintain and repair packs in the field, reuse suitable ones for backup power where we can, and plan a contracted recycling partner in Kenya by 2030.",
 },
 ],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Sustainability", href: "/sustainability" },
 ],
 },
 {
 path: "/careers",
 title: "EV Charging Careers in Kenya",
 description:
 "Join Precifarm to commission Pulse and Pod at home, run Boda Hub swap, restore Corridor sessions and keep M-Pesa checkout online, starting on Nairobi–Kisumu.",
 faqs: [
 {
 question: "Where does Precifarm hire first?",
 answer:
 "Nairobi–Kisumu corridor roles — field commissioning, Boda Hub swap operations, Corridor uptime and M-Pesa checkout support.",
 },
 {
 question: "How do I apply?",
 answer: "Open precifarm.com/careers for current openings and contact details.",
 },
 ],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Careers", href: "/careers" },
 ],
 },
 {
 path: "/agent",
 title: "Precifarm Agent: AI Electrical & Energy Engineer",
 description:
 "Precifarm Agent: an AI electrical and energy engineer for Kenya. It plans EV charging, solar, battery, cable and protection designs and runs ten deterministic engineering tools, with a calculation trace and evidence label on every number. Try it in the browser.",
 keywords: [
 "AI electrical engineer",
 "AI engineering assistant",
 "EV charger sizing",
 "EV charging design",
 "EV charging time calculator",
 "battery backup sizing",
 "electrical design software",
 "energy engineering AI",
 "Precifarm Agent",
 ],
 faqs: agentPageFaqs,
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Precifarm Agent", href: "/agent" },
 ],
 },
 {
 path: "/download",
 title: "Precifarm Agent Desktop — Download",
 description:
 "Request early access to Precifarm Agent for desktop. Coming soon for Windows and macOS — design EV charging, solar and storage from your computer.",
 faqs: downloadPageFaqs,
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Precifarm Agent", href: "/agent" },
 { name: "Download", href: "/download" },
 ],
 },
 {
 path: "/contact",
 title: "Contact Precifarm — EV Charging in Kenya",
 description:
 contactPage.description,
 faqs: [
 {
 question: "How do I request a home EV charger in Kenya?",
 answer:
 "Visit precifarm.com/charging/home, open Precifarm Agent at precifarm.com/agent, or contact Precifarm to request a Pulse charger or Pod energy storage survey. Lipa Pole Pole instalments are available on M-Pesa.",
 },
 ],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Contact", href: "/contact" },
 ],
 },
 {
 path: "/faq",
 title: "FAQ — EV Charging in Kenya",
 description: faqPage.description,
 faqs: faqIndexChargingFaqs,
 keywords: [
 "Precifarm FAQ",
 "EV charging Kenya cost",
 "home charger Kenya price",
 "KES 39 kWh",
 "Lipa Pole Pole financing",
 ],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "FAQ", href: "/faq" },
 ],
 },
 {
 path: "/guides",
 title: "EV Charging Guides for Kenya",
 description: guidesPage.description,
 faqs: [
 {
 question: "Where can I learn about EV charging in Kenya?",
 answer:
 "Precifarm publishes guides on home charging, public DC charging, M-Pesa payment and the Charging Hub, written for Kenyan drivers, homeowners and fleet operators.",
 },
 ],
 keywords: ["Precifarm guides", "home EV charger Kenya", "EV charging guide"],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Guides", href: "/guides" },
 ],
 },
 {
 path: "/locations",
 title: "EV Charging Locations Across Kenya",
 description:
 "City guides for Precifarm charging in Nairobi, Kisumu, Nakuru, Mombasa and beyond — home Pulse installs, Corridor DC, Boda Hub swap and fleet Depot.",
 keywords: ["EV charging Kenya cities", "Precifarm hubs", "electric travel locations"],
 faqs: [
 {
 question: "Which cities have Precifarm EV charging guides?",
 answer:
 "Published location pages cover major Kenyan cities and corridors where Precifarm installs or plans charging — check each page for live, coming-soon and partner-operated labels.",
 },
 ],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Locations", href: "/locations" },
 ],
 },
 {
 path: "/sw",
 title: "Precifarm as Usafiri wa umeme Kenya",
 description:
 "Precifarm inajenga na kuendesha kuchaji umeme nchini Kenya as kutoka Pulse charger nyumbani hadi Corridor DC barabarani, Lipa Pole Pole kutoka KES 3,300 kwa mwezi, kulipwa na M-Pesa.",
 faqs: [
 {
 question: "Precifarm inafanya nini?",
 answer:
 "Inasanifu, kusakinisha na kuendesha miundombinu ya kuchaji EV nchini Kenya — Pulse nyumbani, Boda Hub, Depot na Corridor DC, kulipwa na M-Pesa.",
 },
 ],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Kiswahili", href: "/sw" },
 ],
 },
];

export function getPageSeo(path: string): PageSeoInput | undefined {
 return pageSeoRegistry.find((p) => p.path === path);
}
