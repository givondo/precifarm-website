import type { AisoContentBlock, FaqItem } from "@/lib/seo/types";

/** GEO patterns — structured sections LLMs extract easily */
export function buildGeoFaqSet(topic: string, items: FaqItem[]): AisoContentBlock {
  return { id: "faq", type: "faq", title: `Frequently asked questions about ${topic}`, items };
}

export function buildKeyFacts(title: string, facts: string[]): AisoContentBlock {
  return { id: "key-facts", type: "key_facts", title, items: facts };
}

export function buildExecutiveSummary(text: string): AisoContentBlock {
  return { id: "summary", type: "executive_summary", title: "Summary", content: text };
}

/** Default homepage AISO blocks */
export const homepageAisoBlocks: AisoContentBlock[] = [
  buildExecutiveSummary(
    "Precifarm builds route charging hubs and runs the booking network for scheduled electric coaches in Kenya. Licensed operators run the coaches; we provide reserved hub energy, timetables, M-Pesa tickets and passenger data — live today on Nairobi–Kisumu.",
  ),
  buildKeyFacts("Key facts", [
    "Live route: Nairobi – Kisumu · ~345 km · about 4h 45m",
    "Fare: KSh 1,550 per seat · M-Pesa checkout",
    "Vehicle: Yutong U18 electric intercity coach",
    "Ticket: SMS confirmation with PF booking reference",
    "Energy: hub charging reserved before every departure",
  ]),
  buildGeoFaqSet("booking and travel", [
    {
      question: "What is Precifarm?",
      answer:
        "Precifarm is electric transport infrastructure — charging hubs plus the operating software that keeps intercity coaches on timetable. We are not a bus company; licensed partners operate the vehicles while we provide energy, booking and passenger data.",
    },
    {
      question: "How do I book Nairobi–Kisumu?",
      answer:
        "Open precifarm.com, pick your date and departure, choose a seat, enter passenger details and pay with M-Pesa. Your SMS ticket includes a PF booking reference for boarding.",
    },
    {
      question: "How much does the fare cost?",
      answer:
        "KSh 1,550 per seat on the Yutong U18 electric coach. The price is fixed at checkout — no surprise fuel surcharges.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "M-Pesa STK push at checkout on the website and Android passenger app. Pay on your phone; the ticket arrives by SMS.",
    },
    {
      question: "Where are Precifarm charging hubs?",
      answer:
        "Kisumu, Nakuru and Nairobi depot are live on the Nairobi–Kisumu corridor today, with partner stops along the route. See the Charge Map at precifarm.com/network.",
    },
  ]),
];

export const bookingHowToBlock: AisoContentBlock = {
  id: "how-to-book",
  type: "how_to",
  title: "How to book a seat",
  items: [
    "Open precifarm.com and go to Book your seat",
    "Pick travel date, departure time and passengers",
    "Choose your seat on the Yutong U18 coach",
    "Enter name, phone and National ID or passport",
    "Pay with M-Pesa STK push on your phone",
    "Save the SMS ticket with your PF reference for boarding",
  ],
};

export const homepageRelatedLinks = [
  { href: "/network", label: "Charge Map", reason: "Live hub locations on Nairobi–Kisumu" },
  { href: "/charging", label: "Charging services", reason: "Route hubs, home and private-site" },
  { href: "/faq", label: "FAQ", reason: "Answers on booking and travel" },
  { href: "/guides/book-nairobi-kisumu-coach", label: "Booking guide", reason: "Full walkthrough" },
] as const;
