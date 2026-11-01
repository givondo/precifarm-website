/**
 * Precifarm Automated Boda Hub: public product page.
 * Brand voice: short, Kenya-first, infrastructure not jargon.
 * Silver lockers · one battery make per site · partner-hosted.
 * Not live as unattended self-service yet.
 */

import { productRenderPaths } from "@/lib/product-renders-catalog";

export const bodaHubPath = "/charging/boda-hub" as const;

export const bodaHubPaths = {
 product: bodaHubPath,
 partners: "/partners#boda-operators",
 hub: "/hub",
 agent: "/agent",
 contact: "/contact?interest=boda-hub",
 engineering: "/charging/engineering",
} as const;

export const bodaHubStatusNote =
 "The Automated Boda Hub cabinet is in development. Swaps today run at partner-run sites, which are pilots.";

export const bodaHubDisclaimer =
 "Pilots follow Kenyan safety and electrical rules, checked with licensed professionals before unattended public use.";

export const bodaHubPageContent = {
 hero: {
 eyebrow: "Boda Hub",
 title: "Keep your bike moving.",
 description:
 "Automated battery-swap smart lockers for electric motorcycles: find a hub, reserve a pack, scan, swap and pay with M-Pesa.",
 image: {
 src: productRenderPaths.bodaHubStudio,
 alt: "Boda Hub battery-swap locker on its swap pad, with safety bollards and the rider screen on the side totem",
 },
 primaryCta: { href: bodaHubPaths.contact, label: "Talk to Precifarm" },
 secondaryCta: { href: bodaHubPaths.hub, label: "See live Boda sites" },
 },
 brandLine: {
 headline: "Find a hub, reserve a pack, scan, swap and ride.",
 body: "Riders use one Precifarm account and pay every swap with M-Pesa. Partners host the site; Precifarm builds the lockers, software and care around it.",
 },
 lead:
 "Boda Hub is outdoor energy infrastructure for electric motorcycles: silver smart lockers with a controller in every door, one approved battery make per site, and remote care from the same Precifarm team behind home, fleet and highway charging.",
 highlights: [
 {
 label: "Riders",
 value: "Back on the road in minutes: charged pack out, empty pack in",
 },
 {
 label: "Hosts",
 value: "Turn your forecourt or stage into a swap stop, no shop to staff",
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
 "One cabinet design in two sizes, with a bank of cabinets for peak stages. Same shell, same doors, same software. Sizes are being finalised in development.",
 image: {
 src: productRenderPaths.bodaHub,
 alt: "Boda Hub locker with one door open and a charged pack ready to swap (design render)",
 },
 configs: [
 {
 name: "Standard",
 bays: "12 doors",
 modules: "One pack per door",
 for: "Shops, stages and petrol stations",
 },
 {
 name: "Large",
 bays: "20 doors",
 modules: "One pack per door",
 for: "Busy urban hubs",
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
 title: "Add a cabinet, not a building.",
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
 eyebrow: "Battery packs",
 title: "One battery make per site.",
 description:
 "Each site is built around one approved pack and its matching charger. A door charges a pack only after its battery system is recognised, so mixed brands are never charged by guesswork.",
 facts: [
 { label: "Capacity", value: "Set by the pack maker" },
 { label: "Use", value: "Swap pack" },
 { label: "Fit", value: "Slide-in dock" },
 { label: "Rule", value: "One make per site" },
 ] as const,
 points: [
 "Every door at a site is built for that site's pack",
 "Mixed brands are not accepted",
 "Grow a site by adding doors, not new battery types",
 "Service teams learn one pack per site",
 ] as const,
 image: {
 src: productRenderPaths.bodaHub,
 alt: "Boda Hub locker with an open bay (design render)",
 },
 href: bodaHubPaths.engineering,
 hrefLabel: "Engineering design basis",
 },
 build: {
 eyebrow: "Hardware",
 title: "Simple outside. Smart inside.",
 description:
 "A public-place cabinet riders understand in seconds: screen, doors, status lights.",
 anatomy: [
 {
 name: "Rider screen",
 text: "One next step at a time: scan, open, return, pay.",
 },
 {
 name: "Smart doors",
 text: "Each door locks, charges and watches its own pack, and charges only when it is closed and latched.",
 },
 {
 name: "Safety first",
 text: "If a pack fails a check, that door stays out of service.",
 },
 {
 name: "Outdoor shell",
 text: "Silver cabinet for streets and stages (weather rating still under test).",
 },
 ] as const,
 image: {
 src: productRenderPaths.bodaHubFront,
 alt: "Boda Hub locker front with rider screen and smart doors",
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
 text: "App, QR or tap: the locker knows it is you.",
 },
 {
 name: "Take charged",
 text: "One door opens. Slide out the charged pack.",
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
 { title: "Bay 04", line: "Take charged pack" },
 { title: "Return", line: "Insert empty pack" },
 { title: "Done", line: "Have a good ride" },
 ] as const,
 },
 safety: {
 eyebrow: "Trust",
 title: "We do not hand out a pack we have not checked.",
 description:
 "Identity, pack health and payment rules come before the door opens. Failed packs stay with technicians, not the next rider.",
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
 "Doors and safety stay on the locker. Accounts and pricing stay online. If the link drops, safe swaps can still complete and sync later. We never skip payment or safety to keep doors open.",
 },
 system: {
 eyebrow: "The Precifarm system",
 title: "Lockers are only half the product.",
 items: [
 {
 name: "Smart pick",
 text: "The network chooses a healthy charged pack, not only the fullest one.",
 },
 {
 name: "M-Pesa",
 text: "Pay per swap, plans or fleet accounts. Price before you confirm.",
 },
 {
 name: "Remote ops",
 text: "We see stock, faults and uptime, and send field care before riders feel it.",
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
 "Petrol stations, shops, stages, parking and depots. Commercial terms are agreed per deal: lease, revenue share or similar.",
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
 title: "One make first. Others earn a place.",
 description:
 "Each site starts with one battery make and its charger. Another make joins only after fit, power, communication, safety and commercial checks. We will not claim every e-boda pack works.",
 },
 roadmap: {
 eyebrow: "Roadmap",
 title: "Prove it. Pilot it. Scale it.",
 phases: [
 {
 name: "1 · Prototype",
 text: "One working locker: doors, charging and safe swaps.",
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
 text: "More towns. More pack types only when they pass the gate.",
 },
 ] as const,
 },
 note: {
 economics:
 "Tariffs and payback come from pilots, not invented numbers on this page.",
 regulatory:
 "Power, fire, battery handling, payments and data rules must clear Kenyan requirements before unattended public use.",
 },
 faqs: [
 {
 question: "Can I use Automated Boda Hub today?",
 answer:
 "Not as self-service yet. The Automated Boda Hub cabinet is in development. Swaps today run at partner-run pilot sites with staff or partners on site.",
 },
 {
 question: "What battery does it use?",
 answer:
        "One approved battery make per site, with its matching charger. Every door at that site is built around it.",
 },
 {
 question: "Is this a different brand from Boda Hub?",
 answer:
 "No. Same Precifarm silver cabinet language and blue lights, automated for self-service, not a new brand.",
 },
 {
 question: "Are Standard, Large and Bank different products?",
 answer:
 "No. One locker design in two sizes. Busy sites add cabinets beside the first.",
 },
 {
 question: "Does Precifarm staff every hub?",
 answer:
 "No. Partners host the site. Precifarm supplies lockers, software, payments and remote support.",
 },
 {
 question: "Will my other motorcycle battery work?",
 answer:
 "Only after that pack type is tested and approved for a site. Each site starts with one make.",
 },
 {
 question: "What if there is no internet?",
 answer:
 "Safety and doors stay on the locker. Swaps can sync when the signal returns. We do not skip payment or safety just to keep doors open.",
 },
 {
 question: "How do I pay?",
 answer:
 "M-Pesa first: per swap, plans or fleet accounts. You always see the price before you confirm.",
 },
 ],
 cta: {
 title: "Let's put Boda Hub on your site.",
 description:
 "Hosts, fleets and partners: tell us where riders need energy. We reply within one business day.",
 primary: { href: bodaHubPaths.contact, label: "Contact Precifarm" },
 secondary: { href: bodaHubPaths.partners, label: "Partner programmes" },
 },
} as const;

export const bodaHubFaqs = bodaHubPageContent.faqs;
