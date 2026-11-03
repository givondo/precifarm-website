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
 description: "EV charging in Kenya: the Pulse home wallbox (available), Pulse+ fleet AC (in development), Corridor DC fast charging pilots and Boda Hub battery swap, on M-Pesa.",
 keywords: ["EV charging Kenya", "fleet charging", "home AC charger installation",],
 faqs: chargingServicesFaqs,
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Charging", href: "/charging" },
 ],
 },
 {
 path: "/charging/home",
 title: "Home EV Charger Installation in Kenya from KES 79,000",
 description: "Home EV charger installation in Kenya: the Pulse 7 kW wallbox from KES 79,000, with Lipa Pole Pole from KES 3,300/month on M-Pesa. Book a home survey.",
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
 description: "Battery swapping for electric bodas in Kenya, paid with M-Pesa: partner-run pilot sites today, with the self-service Automated Boda Hub cabinet in development.",
 keywords: [
 "boda battery swap Kenya",
 "electric motorcycle smart locker",
 "e-boda battery swap station",
 "Precifarm Boda Hub",
 "boda swap M-Pesa",
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
 path: "/charging/pulse-plus",
 title: "22 kW Three-Phase EV Charger for Fleets in Kenya | Precifarm Pulse+",
 description:
 "Precifarm Pulse+: a 22 kW three-phase AC wallbox for fleet yards, workplaces and apartments in Kenya, with shared load management across up to ten units. In development.",
 keywords: [
 "22 kW EV charger Kenya",
 "three-phase EV charger Kenya",
 "fleet EV charging Kenya",
 "workplace EV charging Nairobi",
 "Precifarm Pulse+",
 ],
 ogImage: productImages.pulsePlus.src,
 faqs: [
 {
 question: "Is Pulse+ on sale?",
 answer:
 "Not yet. Pulse+ is in development. Fleets and site hosts can register interest and receive a site quote once the first units are released.",
 },
 {
 question: "Will my car charge at 22 kW?",
 answer:
 "Only if its on-board charger accepts 22 kW. Many cars accept 11 kW on three phases, and Pulse+ adapts to each car automatically.",
 },
 ],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Charging", href: "/charging" },
 { name: "Pulse+", href: "/charging/pulse-plus" },
 ],
 },
 {
 path: "/charging/corridor",
 title: "DC Fast Charging for Kenyan Highways | Precifarm Corridor",
 description:
 "Precifarm Corridor: DC fast charging from a certified 120 to 180 kW OEM charger, engineered per site. The first site, on Nairobi to Kisumu, is a pilot in development.",
 keywords: [
 "DC fast charging Kenya",
 "highway EV charging Kenya",
 "Nairobi Kisumu EV charging",
 "CCS2 charger Kenya",
 "host an EV charging station Kenya",
 "Precifarm Corridor",
 ],
 ogImage: productImages.corridorForecourt.src,
 faqs: [
 {
 question: "Can I charge at a Corridor site today?",
 answer:
 "Not yet. The first Corridor sites are pilots in development; none is commissioned. The price per kWh will be set for each site at commissioning and paid with M-Pesa.",
 },
 {
 question: "Can I host a Corridor site?",
 answer:
 "Yes. Fuel stations, malls and roadside stops on busy routes can register interest. Each site needs a power study with Kenya Power before anything is built.",
 },
 ],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "Charging", href: "/charging" },
 { name: "Corridor", href: "/charging/corridor" },
 ],
 },
 {
 path: "/ai",
 title: "AI Agent Workflows for Engineering | Precifarm Agent Harness",
 description:
 "Precifarm Agent Harness: agent workflows on the hosted AI model that suits each task, DeepSeek by default, with a person approving every result. In development.",
 keywords: [
 "AI agents Kenya",
 "AI agent workflows",
 "multi-model AI",
 "DeepSeek agent workflows",
 "AI engineering assistant",
 "Precifarm Agent Harness",
 ],
 faqs: [
 {
 question: "Is the Agent Harness the same as Precifarm Agent?",
 answer:
 "No. Precifarm Agent is the engineering assistant you can use at precifarm.com/agent. The Agent Harness is the platform Precifarm builds its agents on: it routes each task to a hosted model and runs the agent workflow.",
 },
 {
 question: "Does it run AI models on my own computer?",
 answer:
 "No. It uses hosted models through their providers' APIs, so no GPU or local install is needed. Prompts and documents go to the chosen provider.",
 },
 {
 question: "Can I use it today?",
 answer: "It is in development. Register interest on the contact page for early access.",
 },
 ],
 breadcrumbs: [
 { name: "Home", href: "/" },
 { name: "AI platform", href: "/ai" },
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
 "On a Precifarm Pulse charger, a typical daily top-up for most passenger EVs takes under two hours. DC fast charging at a public hub can add the same energy in roughly 5 to 15 minutes depending on the vehicle and charger power.",
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
 description: "Partner with Precifarm to host a Corridor charging site, electrify a fleet with Pulse+ or Boda Hub, or sell and install the Pulse home charger. M-Pesa on every product.",
 faqs: [
 {
 question: "Who can partner with Precifarm?",
 answer:
 "Fleet operators, fuel retailers, malls, transport yards, property owners and certified installers can partner to host hubs, run depot charging or sell home charging.",
 },
 {
 question: "What fleet charging does Precifarm offer?",
 answer:
 "Pulse+ 22 kW three-phase AC (in development), Boda Hub battery swap and Corridor DC pilots on intercity routes, engineered, commissioned and operated by Precifarm.",
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
 title: "About Precifarm AI: EV Charging Company in Nairobi",
 description: "Precifarm AI is a Nairobi company building EV charging and battery swapping for Kenya, and private AI systems for engineering, with M-Pesa on every product.",
 faqs: [
 {
 question: "What does Precifarm do?",
 answer:
 "Precifarm builds energy infrastructure for electric transport in Kenya: the Pulse home charger (available), Pulse+ fleet charging (in development), Corridor DC fast charging and Boda Hub battery swapping (pilots), and wireless charging research. Its second pillar is private AI for engineering. M-Pesa on every product.",
 },
 {
 question: "Does Precifarm operate vehicles or buses?",
 answer:
 "No. Precifarm is not a fleet or bus company. Operators run the vehicles; Precifarm surveys, installs, monitors and settles charging and energy.",
 },
 {
 question: "What can I buy today?",
 answer:
 "The Pulse home charger, with Lipa Pole Pole instalments on M-Pesa. Pulse+, Corridor and the Automated Boda Hub are in development or pilot, and wireless charging is research only. Spark, Pod, Depot and the modular energy family are no longer offered.",
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
 "Five Precifarm R&D programmes in Kenya, gated G0 to G4: wireless charging for cars, Agent, hub solar and storage, battery health and bidirectional charging.",
 keywords: [
 "wireless EV charging research",
 "wireless power transfer Kenya",
 "EV charging engineering software",
 "solar battery EV charging hub",
 "Precifarm Agent R&D",
 "Precifarm research Kenya",
 "wireless car charging Kenya",
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
 "Boda swap packs and Corridor site storage use LFP batteries. We maintain and repair packs in the field, reuse suitable ones for backup power where we can, and plan a contracted recycling partner in Kenya by 2030.",
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
 description: "Join Precifarm to install Pulse home chargers, run Boda Hub battery swap pilots and build Corridor DC charging and M-Pesa checkout, from Nairobi to Kisumu.",
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
 "Visit precifarm.com/charging/home, open Precifarm Agent at precifarm.com/agent, or contact Precifarm to request a Pulse charger survey. Lipa Pole Pole instalments are available on M-Pesa.",
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
 description: "City guides for EV charging in Nairobi, Kisumu, Nakuru, Mombasa and beyond: home charger installs, Corridor DC pilots, Boda Hub battery swap and fleet charging.",
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
