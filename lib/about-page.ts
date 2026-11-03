import { productImages } from "@/lib/product-images";

export const aboutPage = {
 hero: {
 eyebrow: "About Precifarm · Kenya",
 title: "EV charging, battery swapping and private AI, engineered in Kenya.",
 description:
 "We survey, finance, install and operate EV charging for homes, fleets and highways, with M-Pesa on every product. Alongside it we build Precifarm's own AI engineering tools, and run research into wireless charging.",
 primaryHref: "/charging",
 primaryLabel: "Explore charging",
 secondaryHref: "/research",
 secondaryLabel: "Research and development",
 },
 highlights: [
 { stat: "Charge", label: "Pulse at home today; Pulse+ and Corridor in development and pilot" },
 { stat: "Swap", label: "Boda Hub battery swapping for electric motorcycles, piloted with partners" },
 { stat: "M-Pesa", label: "Lipa Pole Pole instalments on the Pulse charger, and session pay" },
 ],
 pillars: {
 eyebrow: "What Precifarm sells",
 title: "Two pillars: energy infrastructure for electric transport, and AI systems that engineer it.",
 description:
 "The commercial beachhead is EV charging we can survey, install and operate. Every product is labelled by what it is today: available, pilot, in development or research.",
 items: [
 {
 eyebrow: "Energy infrastructure",
 title: "EV charging and battery swapping",
 text: "The Pulse charger is available for homes today. Pulse+ for fleet yards is in development; Corridor DC fast charging and Boda Hub battery swapping are pilots. Wireless charging is a research programme, not a product.",
 href: "/charging",
 cta: "Explore charging",
 image: productImages.pulse,
 },
 {
 eyebrow: "AI systems",
 title: "AI agents for engineering",
 text: "The Agent Harness runs agent workflows on the hosted AI model that suits each task, with a person approving every result. It is in development. Precifarm Agent, our hosted engineering assistant, is in early access.",
 href: "/ai",
 cta: "See the AI platform",
 image: {
 src: "/images/engineering/system-architecture.png",
 alt: "Precifarm engineering system architecture diagram produced with Precifarm's engineering tools",
 },
 },
 ],
 },
 intro: {
 eyebrow: "Who we are",
 title: "Electric vehicles arrived in Kenya before charging and storage could keep up.",
 lead: "Public charging is still fragmented, home installs are often left to the owner, and a weak-grid evening can undo a charge that looked fine at noon.",
 body: "Precifarm connects grid, solar, storage, charging and M-Pesa so drivers and operators plan around one system instead of guessing at each stop. We do not manufacture vehicles and we do not run fleets.",
 points: [
 "Site survey, grid, solar, storage and charging are engineered as one site, not a charger bolted on afterwards.",
 "Lipa Pole Pole and session pay run on M-Pesa, without a bank account.",
 "Remote monitoring and three-year aftersale care cover home units we commission.",
 "Products in development or research are labelled that way on every page.",
 ],
 image: productImages.corridorForecourt,
 imageCaption: "Corridor DC fast charging bay (concept render).",
 },
 operatingModel: {
 eyebrow: "How a site gets built",
 title: "We survey, finance, install and operate every site we commission.",
 description:
 "Power, charging, storage, software and Lipa Pole Pole stay with one team from the first visit through daily settlement.",
 steps: [
 {
 step: "01",
 title: "Survey",
 text: "We size the site to the EV, the roof, the feeder and Kenya Power before hardware is quoted.",
 },
 {
 step: "02",
 title: "Finance",
 text: "Buy outright, pay Lipa Pole Pole on M-Pesa, or sign a site contract. Deposit, monthly amount and total are shown up front.",
 },
 {
 step: "03",
 title: "Install",
 text: "Licensed wiring, protection, commissioning and paperwork. A typical Pulse charger installation takes one day.",
 },
 {
 step: "04",
 title: "Operate",
 text: "Remote monitoring, session metering and settlement. A charger that is down is a missed morning.",
 },
 ],
 },
 principlesSection: {
 eyebrow: "How we work",
 title: "We engineer one system, label what is live, and lead with charging we can actually install.",
 description:
 "The same operating rules apply from a home wallbox to a highway hub, including a clear line between what is sold and what is still in design.",
 },
 principles: [
 {
 title: "The system around the charger",
 text: "Grid, solar, storage, software and M-Pesa are designed with the charger, not added after it is on the wall.",
 },
 {
 title: "We don't run the vehicles",
 text: "Precifarm surveys, installs, monitors and settles energy. Operators keep vehicles, riders and dispatch.",
 },
 {
 title: "Uptime is the product",
 text: "A charger that is down is a missed morning. Field response and remote monitoring sit behind every unit we commission.",
 },
 {
 title: "Live versus planned stays honest",
 text: "Every product is labelled available, pilot, in development or research. Capacity, prototypes and uncommissioned sites are not traction.",
 },
 ],
 scope: {
 eyebrow: "What is on sale",
 title: "The Pulse charger is what we sell today. Everything else is labelled by its stage.",
 description:
 "Available means sold and supported now. Pilot means running or being commissioned at named sites. In development means engineered but not released. Research is not a product.",
 today: {
 title: "Available and in pilot",
 items: [
 { name: "Pulse charger", href: "/charging/home", note: "Available · home charging" },
 { name: "Lipa Pole Pole", href: "/charging/home", note: "Available · M-Pesa instalments on Pulse" },
 { name: "Boda Hub", href: "/charging/boda-hub", note: "Pilot · partner-run swap sites" },
 { name: "Corridor DC", href: "/charging/corridor", note: "Pilot in development · Nairobi to Kisumu first" },
 { name: "Precifarm Agent", href: "/agent", note: "Early access · hosted AI design" },
 ],
 },
 roadmap: {
 title: "In development and research: not on sale",
 note: "Figures for these programmes are design targets, not tested ratings.",
 items: [
 { name: "Pulse+ charger", href: "/charging/pulse-plus", note: "In development · 22 kW three phase" },
 { name: "Agent Harness", href: "/ai", note: "In development · private local AI" },
 { name: "Wireless EV charging", href: "/research", note: "Research programme" },
 ],
 },
 },
 rolesSection: {
 eyebrow: "Roles",
 title: "What Precifarm does, and what partners keep.",
 description:
 "From the home wallbox to the highway hub, partners run vehicles and Precifarm runs charging.",
 },
 roles: [
 {
 layer: "Home charging",
 precifarm: "Survey, install and support the Pulse charger. Lipa Pole Pole on M-Pesa and three-year aftersale care.",
 partners: "Homeowners provide site access and approve the installation scope.",
 },
 {
 layer: "Fleet charging",
 precifarm: "Design Pulse+ fleet charging (in development) and Boda Hub swaps, with M-Pesa billing and remote monitoring.",
 partners: "Fleet and boda operators keep vehicles, riders and dispatch.",
 },
 {
 layer: "Highway hubs",
 precifarm: "Build, own and operate Corridor charging once sites are commissioned; the first sites are pilots in development. Sell energy and stand behind uptime.",
 partners: "Site hosts provide land or location rights, and may co-invest where the economics fit.",
 },
 {
 layer: "AI systems",
 precifarm: "Build the Agent Harness and Precifarm Agent, with deterministic engineering tools and a person approving every result.",
 partners: "Engineers and companies keep their data and their sign-off.",
 },
 ],
 cta: {
 title: "Tell us which site you want to electrify.",
 description: "Home survey, fleet yard, highway site, boda swap or private AI: we respond within one business day.",
 primaryHref: "/contact",
 primaryLabel: "Contact us",
 secondaryHref: "/charging",
 secondaryLabel: "Explore charging",
 },
} as const;
