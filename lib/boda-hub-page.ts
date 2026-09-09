/**
 * Precifarm Automated Boda Hub as public product page.
 * Brand voice: short, Kenya-first, infrastructure not jargon.
 * Silver lockers · 2.56 kWh Energy Module · partner-hosted.
 * Not live as unattended self-service yet.
 */

import { modularEnergyPaths } from "@/lib/modular-energy-page";

export const bodaHubPath = "/charging/boda-hub" as const;

export const bodaHubPaths = {
 product: bodaHubPath,
 partners: "/partners#boda-operators",
 hub: "/hub",
 agent: "/agent",
 contact: "/contact?interest=boda-hub",
 engineering: "/charging/engineering",
 modularEnergy: modularEnergyPaths.overview,
} as const;

export const bodaHubStatusNote =
 "Self-service lockers are in design and testing. Partner-run Boda Hub sites are already listed on Charging Hub.";

export const bodaHubDisclaimer =
 "Pilots follow Kenyan safety and electrical rules, checked with licensed professionals before unattended public use.";

export const bodaHubPageContent = {
 hero: {
 eyebrow: "Boda Hub",
 title: "Keep your bike moving.",
 description:
 "Automated battery-swap smart lockers for electric motorcycles as find a hub, reserve a pack, scan, swap and pay with M-Pesa.",
 image: {
 src: "/images/products/boda-hub-street-hero.png",
 alt: "Two silver Precifarm Boda Hub smart lockers at a Kenyan petrol station with e-motorcycles",
 caption: "Lockers where riders already stop as petrol stations, stages and shops.",
 },
 primaryCta: { href: bodaHubPaths.contact, label: "Talk to Precifarm" },
 secondaryCta: { href: bodaHubPaths.hub, label: "See live Boda sites" },
 },
 brandLine: {
 headline: "Find a hub, reserve a pack, scan, swap and ride.",
 body: "Riders use one Precifarm account and pay every swap with M-Pesa. Partners host the site; Precifarm builds the lockers, software and care around it.",
 },
 lead:
 "Boda Hub is outdoor energy infrastructure for electric motorcycles: silver smart lockers, one shared 2.56 kWh Energy Module in every door, and remote care from the same Precifarm network that already runs home, fleet and highway charging.",
 highlights: [
 {
 label: "Riders",
 value: "Back on the road in minutes as charged pack out, empty pack in",
 },
 {
 label: "Hosts",
 value: "Turn your forecourt or stage into a swap stop as no shop to staff",
 },
 {
 label: "Network",
 value: "Same Precifarm ops, Agent and M-Pesa as the rest of the range",
 },
 ] as const,
 lockers: {
 eyebrow: "The lockers",
 title: "One machine. Three sizes.",
 description:
 "Quiet streets get a compact cabinet. Busy hubs get a standard. Peak stages get a bank. Same shell, same doors, same software.",
 image: {
 src: "/images/products/boda-hub-locker-family-closed.png",
 alt: "Precifarm Boda Hub locker family with all doors closed as compact 8-door, standard 12-door and 24-door locker bank",
 caption: "Compact · Standard · Locker bank",
 },
 configs: [
 {
 name: "Compact",
 bays: "8 doors",
 modules: "~20 kWh",
 for: "Shops and neighbourhood stages",
 },
 {
 name: "Standard",
 bays: "12 doors",
 modules: "~30 kWh",
 for: "Petrol stations and urban hubs",
 },
 {
 name: "Locker bank",
 bays: "24+ doors",
 modules: "Two+ cabinets",
 for: "Fleet yards and busy corridors",
 },
 ] as const,
 },
 networkSites: {
 eyebrow: "How sites grow",
 title: "Add a cabinet as not a building.",
 description:
 "When rush hour empties the doors, park another locker beside the first. Same look. More capacity.",
 points: [
 "Fits a forecourt, stage edge or shop front",
 "One design language across every site",
 "Partners provide land and power",
 "Precifarm provides lockers, software and monitoring",
 ] as const,
 },
 module: {
 eyebrow: "Energy Module",
 title: "One pack. Every door.",
 description:
 "The 2.56 kWh Energy Module is the battery riders swap as the same block used across Precifarm modular energy. One spare. One training path. One network.",
 facts: [
 { label: "Capacity", value: "2.56 kWh" },
 { label: "Use", value: "Swap pack" },
 { label: "Fit", value: "Slide-in" },
 { label: "Family", value: "Modular energy" },
 ] as const,
 points: [
 "Every Boda Hub door is built for this module",
 "Shared with P1 Go, P2 Home and Mini Stack",
 "Grow a site by adding doors as not new battery types",
 "Service teams learn one pack, not a catalogue of packs",
 ] as const,
 image: {
 src: "/images/products/energy-module-256-v2.png",
 alt: "Precifarm Energy Module 2.56 kWh as matte black pack with silver trim and blue status light",
 caption: "2.56 kWh Energy Module as the pack behind every swap.",
 },
 href: bodaHubPaths.modularEnergy,
 hrefLabel: "Explore modular energy",
 },
 build: {
 eyebrow: "Hardware",
 title: "Simple outside. Smart inside.",
 description:
 "A public-place cabinet riders understand in seconds as screen, doors, status lights.",
 anatomy: [
 {
 name: "Rider screen",
 text: "One next step at a time as scan, open, return, pay.",
 },
 {
 name: "Smart doors",
 text: "Each door locks, charges and watches its own Energy Module.",
 },
 {
 name: "Safety first",
 text: "If a pack fails a check, that door stays out of service.",
 },
 {
 name: "Outdoor shell",
 text: "Silver cabinet for streets and stages as weather rating still under test.",
 },
 ] as const,
 image: {
 src: "/images/products/boda-hub-bay-closed.png",
 alt: "Precifarm Boda Hub standard locker front with all white doors closed",
 caption: "Blue lights show which doors are ready.",
 },
 },
 journey: {
 eyebrow: "The swap",
 title: "Built for riders in a hurry.",
 description: "Four screens. No counter. No guesswork.",
 steps: [
 {
 name: "Find & reserve",
 text: "Precifarm Agent shows nearby hubs with charged packs. Reserve before you arrive.",
 },
 {
 name: "Scan",
 text: "App, QR or tap as the locker knows it is you.",
 },
 {
 name: "Take charged",
 text: "One door opens. Slide out the Energy Module.",
 },
 {
 name: "Return empty",
 text: "Put yours where the screen says. It locks after checks pass.",
 },
 {
 name: "Pay & ride",
 text: "See the price. Pay with M-Pesa. Go.",
 },
 ] as const,
 uiScreens: [
 { title: "Welcome", line: "Scan your Precifarm app" },
 { title: "Bay 04", line: "Take charged module" },
 { title: "Return", line: "Insert empty module" },
 { title: "Done", line: "Have a good ride" },
 ] as const,
 },
 safety: {
 eyebrow: "Trust",
 title: "We do not hand out a pack we have not checked.",
 description:
 "Identity, pack health and payment rules come before the door opens. Failed packs stay with technicians as not the next rider.",
 points: [
 "One door at a time on a normal swap",
 "Safe override when something jams",
 "Heat or faults take a door offline",
 "No release if payment rules fail",
 ] as const,
 },
 reliability: {
 eyebrow: "Kenya",
 title: "Built for weak signal days.",
 description:
 "Doors and safety stay on the locker. Accounts and pricing stay online. If the link drops, safe swaps can still complete and sync later as we never skip payment or safety to keep doors open.",
 },
 system: {
 eyebrow: "The Precifarm system",
 title: "Lockers are only half the product.",
 items: [
 {
 name: "Smart pick",
 text: "The network chooses a healthy charged pack as not only the fullest one.",
 },
 {
 name: "M-Pesa",
 text: "Pay per swap, plans or fleet accounts. Price before you confirm.",
 },
 {
 name: "Remote ops",
 text: "We see stock, faults and uptime as and send field care before riders feel it.",
 },
 {
 name: "Precifarm Agent",
 text: "Points you to a hub before you run out of range.",
 },
 ] as const,
 },
 partners: {
 eyebrow: "Partners",
 title: "You bring the site. We bring Boda Hub.",
 description:
 "Petrol stations, shops, stages, parking and depots. Commercial terms are agreed per deal as lease, revenue share or similar.",
 sites: [
 "Petrol stations & shops",
 "Supermarkets & malls",
 "Boda stages & parking",
 "Fleet depots",
 "Campuses & busy roads",
 ] as const,
 },
 batteries: {
 eyebrow: "Compatibility",
 title: "One module first. Others earn a place.",
 description:
 "Phase 1 is the Precifarm 2.56 kWh Energy Module. Other battery types join only after fit, power, communication, safety and commercial checks. We will not claim every e-boda pack works.",
 },
 roadmap: {
 eyebrow: "Roadmap",
 title: "Prove it. Pilot it. Scale it.",
 phases: [
 {
 name: "1 · Prototype",
 text: "One working locker as doors, charging and safe swaps.",
 },
 {
 name: "2 · Pilot",
 text: "A few controlled sites. Real riders. Real uptime.",
 },
 {
 name: "3 · Partner rollout",
 text: "Host sites, remote ops and M-Pesa at scale.",
 },
 {
 name: "4 · Network",
 text: "More towns as more pack types only when they pass the gate.",
 },
 ] as const,
 },
 note: {
 economics:
 "Tariffs and payback come from pilots as not invented numbers on this page.",
 regulatory:
 "Power, fire, battery handling, payments and data rules must clear Kenyan requirements before unattended public use.",
 },
 faqs: [
 {
 question: "Can I use Automated Boda Hub today?",
 answer:
 "Not as self-service yet. This page is the product we are building. Live Boda Hub listings on Charging Hub still run with staff or partners on site.",
 },
 {
 question: "What battery does it use?",
 answer:
        "Precifarm's 2.56 kWh Energy Module — the same capacity block used in modular energy. Every locker door is built around it.",
 },
 {
 question: "Is this a different brand from Boda Hub?",
 answer:
 "No. Same Precifarm silver cabinet language and blue lights as automated for self-service, not a new brand.",
 },
 {
 question: "Are Compact, Standard and Bank different products?",
 answer:
 "No. One locker design in three footprints. Busy sites add cabinets beside the first.",
 },
 {
 question: "Does Precifarm staff every hub?",
 answer:
 "No. Partners host the site. Precifarm supplies lockers, software, payments and remote support.",
 },
 {
 question: "Will my other motorcycle battery work?",
 answer:
 "Only after that pack type is tested and approved. We start with the 2.56 kWh Energy Module.",
 },
 {
 question: "What if there is no internet?",
 answer:
 "Safety and doors stay on the locker. Swaps can sync when the signal returns. We do not skip payment or safety just to keep doors open.",
 },
 {
 question: "How do I pay?",
 answer:
 "M-Pesa first as per swap, plans or fleet accounts. You always see the price before you confirm.",
 },
 ],
 cta: {
 title: "Let's put Boda Hub on your site.",
 description:
 "Hosts, fleets and partners as tell us where riders need energy. We reply within one business day.",
 primary: { href: bodaHubPaths.contact, label: "Contact Precifarm" },
 secondary: { href: bodaHubPaths.partners, label: "Partner programmes" },
 },
} as const;

export const bodaHubFaqs = bodaHubPageContent.faqs;
