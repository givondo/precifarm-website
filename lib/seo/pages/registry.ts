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
import { bodaHubFaqs, bodaHubPageContent } from "@/lib/boda-hub-page";
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
 title: "EV Charging Stations Map Kenya: DC Fast & Boda Swap | Precifarm",
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
 title: "EV Charging Solutions in Kenya: Home, Fleet & Highway",
 description: "EV charging solutions in Kenya: Pulse home wallbox and Pod storage, Depot fleet charging, Boda Hub battery swap and Corridor DC fast charging, all paid on M-Pesa.",
 keywords: ["EV charging Kenya", "fleet charging", "home AC charger installation", "KES 39 kWh"],
 faqs: chargingServicesFaqs,
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Charging", href: "/charging" },
 ],
 },
 {
 path: "/charging/home",
 title: "Home EV Charger Installation in Kenya from KES 79,000",
 description: "Home EV charger installation in Kenya: Pulse 7 kW wallbox from KES 79,000, Pod energy storage, and Lipa Pole Pole from KES 3,300/month on M-Pesa. Book a home survey.",
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
 title: "EV Charging Station Design & Engineering in Kenya",
 description: "Precifarm's design basis for home, fleet and highway EV charging in Kenya: grid, solar, LiFePO₄ storage, Corridor DC, Kenya Power hold points and commissioning.",
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
 title: "Electric Boda Battery Swap Station in Kenya | Precifarm Boda Hub",
 description: `${bodaHubPageContent.hero.description} Self-service in design and testing.`,
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
 title: "Modular Battery Storage for Kenyan Homes and Shops",
 description: "P1 Go carried, P2 Home stacked, Mini Stack mounted outdoors: three scales of one 2.56 kWh Energy Module for Kenyan homes and shops. Conceptual, not on sale yet.",
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
 title: "P1 Go: Portable Power Station Concept for Kenyan Outages",
 description:
 "About 1 kWh with foldable solar and a Type 2 trickle lead, for a router, laptop and phones in an outage. Conceptual: not a daily EV charger, not on sale yet.",
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
 title: "P2 Home: Stackable Home Battery Backup Concept for Kenya",
 description:
 "One to four 2.56 kWh modules (2.6 to 10.2 kWh) on one Power Core beside the consumer board, feeding essential loads. Conceptual, not certified for sale.",
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
 title: "Mini Stack: Outdoor Shop Battery Backup Concept, Kenya",
 description:
 "Two to six Energy Modules outdoors on a plinth, for fridges, tills and lights at Kenyan shops. Not Pod energy storage. Conceptual, not certified for sale.",
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
 title: "Battery Energy Storage (BESS) in Kenya | Precifarm MegaPack",
 description:
 "Project-engineered battery storage in Kenya for industrial sites, EV charging hubs and grid-connected plants. Sized per site, not sold as a catalogue SKU.",
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
 title: "Electric Cars in Kenya: Models, Range & Charging Guide",
 description: "Electric cars in Kenya compared: Nissan Leaf, BYD Atto 3, BYD Dolphin, MG4, Tesla Model 3 and Roam Air. Range, plug type, charging time and where to charge.",
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
 question: "How many electric vehicles are there in Kenya?",
 answer:
 "Kenya had 24,754 registered electric vehicles at the end of 2025, up from 796 in 2022, according to the Ministry of Roads and Transport. The National E-Mobility Policy and green number plates for EVs were launched on 3 February 2026.",
 },
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
 title: "EV Charger Installation Training in Kenya: T1, T2 & T3",
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
 title: "Fleet EV Charging & Charging Station Partners in Kenya",
 description: "Partner with Precifarm to host a Corridor charging hub, electrify a fleet with Depot or Boda Hub, or sell Pulse and Pod home chargers. M-Pesa on every product.",
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
 title: "About Precifarm AI Ltd: EV Charging Company in Nairobi",
 description: "Precifarm AI Ltd is a Nairobi EV charging company. We design, install and finance home, fleet and highway EV charging in Kenya, with M-Pesa on every product.",
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
 "Five Precifarm R&D programmes in Kenya, gated G0 to G4: wireless e-boda charging, Agent, hub solar and storage, battery health and bidirectional charging.",
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
 "Wireless EV charging research policy: SAE J2954 and IEC 61980 benchmarks, safety gates, Kenya pilot rules. Not a product offer; wired charging stays commercial.",
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
 "Terms of use, privacy, cookies and R&D policies for precifarm.com, operated by Precifarm AI Ltd in Kenya.",
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
 description: "Which cookies and analytics precifarm.com uses, why they are needed, and how to block or delete them in your browser.",
 faqs: cookiesFaqs,
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Legal", href: legalHubPath },
 { name: "Cookies", href: cookiesPolicyPath },
 ],
 },
 {
 path: "/sustainability",
 title: "Sustainability: Clean, Affordable EV Charging in Kenya",
 description:
 "Our 2030 goal: make clean charging the affordable choice for Kenya. By 2050 we aim to help replace 1 billion fossil-fuel kilometres with electric ones.",
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
 title: "EV Charging Jobs & Careers in Kenya",
 description: "Join Precifarm to install Pulse and Pod home chargers, run Boda Hub battery swap and keep Corridor DC charging and M-Pesa checkout running, from Nairobi to Kisumu.",
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
 title: "Precifarm Agent: AI Electrical Engineer for EV & Solar Design",
 description:
 "Precifarm Agent, an AI electrical and energy engineer for Kenya, plans EV charging, solar, battery and cable designs with a calculation trace on every number.",
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
 title: "Precifarm Agent Desktop: Download",
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
 title: "Contact Precifarm: EV Charger Quotes & Site Surveys in Kenya",
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
 title: "EV Charging in Kenya FAQ: Costs, Chargers & M-Pesa",
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
 title: "EV Charging Guides for Kenya: Costs, Tariffs & Installs",
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
 title: "EV Charging in Nairobi, Mombasa, Kisumu & Nakuru",
 description: "City guides for EV charging in Nairobi, Kisumu, Nakuru, Mombasa and beyond: home charger installs, Corridor DC, Boda Hub battery swap and fleet Depot charging.",
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
];

export function getPageSeo(path: string): PageSeoInput | undefined {
 return pageSeoRegistry.find((p) => p.path === path);
}
