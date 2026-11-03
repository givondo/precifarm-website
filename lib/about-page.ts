import { productImages } from "@/lib/product-images";

export const aboutPage = {
 hero: {
 eyebrow: "About Precifarm · Kenya",
 title: "EV charging, battery swapping and AI engineering, built in Kenya.",
 description:
 "We survey, finance, install and operate EV charging for homes, fleets and highways, with M-Pesa on every product. Alongside it we build Precifarm Agent, our AI engineering assistant, and develop wireless charging for cars.",
 primaryHref: "/charging",
 primaryLabel: "Explore charging",
 secondaryHref: "/research",
 secondaryLabel: "Research and development",
 },
 highlights: [
 { stat: "Charge", label: "Pulse at home today; Pulse+ for fleets and Corridor on the highway next" },
 { stat: "Swap", label: "Boda Hub battery swapping for electric motorcycles, run with partners" },
 { stat: "M-Pesa", label: "Lipa Pole Pole instalments on the Pulse charger, and session pay" },
 ],
 pillars: {
 eyebrow: "What Precifarm sells",
 title: "Two pillars: energy infrastructure for electric transport, and AI systems that engineer it.",
 description:
 "We lead with EV charging we can survey, install and operate today, and build the AI that engineers every site.",
 items: [
 {
 eyebrow: "Energy infrastructure",
 title: "EV charging and battery swapping",
 text: "The Pulse charger is installed in homes today. Pulse+ brings three-phase charging to fleet yards and workplaces, Corridor brings DC fast charging to the highway, and Boda Hub swaps batteries for electric motorcycles. Our R&D team is developing wireless charging for cars.",
 href: "/charging",
 cta: "Explore charging",
 image: productImages.pulse,
 },
 {
 eyebrow: "Precifarm Agent",
 title: "An AI engineer for EV charging and energy design",
 text: "Precifarm Agent sizes EV charging, solar, batteries, cables and protection with deterministic engineering tools, labels every number with its source, and leaves the sign-off to a qualified engineer.",
 href: "/agent",
 cta: "Try Precifarm Agent",
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
 "One team owns the site from the first survey to daily settlement.",
 ],
 image: productImages.corridorForecourt,
 imageCaption: "Corridor DC fast charging.",
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
 title: "We engineer one system and lead with charging we can install today.",
 description:
 "The same operating rules apply from a home wallbox to a highway hub.",
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
 title: "We say what is installed",
 text: "We count chargers that are installed and sessions that are paid. Plans are described as plans, and figures come from our engineering register.",
 },
 ],
 scope: {
 eyebrow: "Our range",
 title: "Order a Pulse charger today, and bring us your fleet, highway or boda site.",
 description:
 "Homes order Pulse now. Fleets, highway site hosts and boda operators register a site with us and we plan it with them.",
 today: {
 title: "Order today",
 items: [
 { name: "Pulse charger", href: "/charging/home", note: "Home charging · survey and install" },
 { name: "Lipa Pole Pole", href: "/charging/home", note: "M-Pesa instalments on Pulse" },
 { name: "Precifarm Agent", href: "/agent", note: "AI design for EV charging and energy" },
 ],
 },
 roadmap: {
 title: "Plan your site with us",
 note: "Register your site and we include it in our first installations.",
 items: [
 { name: "Pulse+ charger", href: "/charging/pulse-plus", note: "22 kW three phase · fleet yards and workplaces" },
 { name: "Corridor charging", href: "/charging/corridor", note: "DC fast charging · Nairobi to Kisumu first" },
 { name: "Boda Hub", href: "/charging/boda-hub", note: "Battery swapping · partner sites" },
 { name: "Wireless EV charging", href: "/research", note: "R&D · light-duty cars" },
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
 precifarm: "Design Pulse+ fleet charging and Boda Hub swaps, with M-Pesa billing and remote monitoring.",
 partners: "Fleet and boda operators keep vehicles, riders and dispatch.",
 },
 {
 layer: "Highway hubs",
 precifarm: "Build, own and operate Corridor charging, starting with the first site on the Nairobi to Kisumu route. Sell energy and stand behind uptime.",
 partners: "Site hosts provide land or location rights, and may co-invest where the economics fit.",
 },
 {
 layer: "AI engineering",
 precifarm: "Build Precifarm Agent, with deterministic engineering tools and a person approving every result.",
 partners: "Engineers and companies keep their data and their sign-off.",
 },
 ],
 cta: {
 title: "Tell us which site you want to electrify.",
 description: "Free EV charging survey for homes, fuel stations, offices, workplaces and depots. We respond within one business day.",
 primaryHref: "/contact",
 primaryLabel: "Contact us",
 secondaryHref: "/charging",
 secondaryLabel: "Explore charging",
 },
} as const;
