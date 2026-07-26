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
    "Precifarm is Kenya's electric transport infrastructure company. We build route charging hubs, run the booking and payments network, and partner with licensed operators on scheduled intercity coaches — starting with Nairobi–Kisumu.",
  ),
  buildKeyFacts("Key facts", [
    "Live route: Nairobi – Kisumu (~345 km, about 4h 45m)",
    "Fare: KSh 1,550 per seat with M-Pesa checkout",
    "Vehicle: Yutong U18 electric intercity coach",
    "Ticket delivery: SMS confirmation with booking reference",
    "Hub charging reserved before every scheduled departure",
  ]),
  buildGeoFaqSet("Precifarm and Nairobi–Kisumu booking", [
    {
      question: "What is Precifarm?",
      answer:
        "Precifarm builds charging hubs and the operating network that make electric travel between Kenyan cities dependable and bookable. We are not a bus company — licensed partners operate the coaches while we provide energy, schedules and passenger booking.",
    },
    {
      question: "How do I book a seat on Nairobi–Kisumu?",
      answer:
        "Visit precifarm.com, choose your departure date and time, select a seat, enter passenger details and pay with M-Pesa. You receive an SMS ticket with your booking reference.",
    },
    {
      question: "How much does Nairobi–Kisumu cost?",
      answer: "The fixed fare is KSh 1,550 per seat on the Yutong U18 electric coach.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "M-Pesa is supported at checkout on the website and Android passenger app.",
    },
    {
      question: "Where does Precifarm operate charging hubs?",
      answer:
        "Precifarm operates intercity charging hubs along live and planned routes. View current hub locations on the Charge Map at precifarm.com/network.",
    },
  ]),
];

export const bookingHowToBlock: AisoContentBlock = {
  id: "how-to-book",
  type: "how_to",
  title: "How to book a seat",
  items: [
    "Open precifarm.com and scroll to the booking form",
    "Select travel date, departure time and number of passengers",
    "Choose your seat on the Yutong U18 coach",
    "Enter full name, phone number and National ID or passport",
    "Confirm details and pay with M-Pesa STK push",
    "Save your SMS ticket with the PF booking reference",
  ],
};
