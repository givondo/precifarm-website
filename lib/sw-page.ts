import { swahiliUi } from "@/lib/seo/i18n";

export const swPage = {
  hero: {
    eyebrow: "Kiswahili",
    title: swahiliUi.homeTagline,
    description:
      "Precifarm inasakinisha, kufadhili na kuendesha kuchaji umeme nchini Kenya — kutoka kuchaji nyumbani hadi kuchaji barabarani, kulipwa na M-Pesa.",
  },
  body: {
    paragraph:
      "Angalia Charging Hub, omba Pulse charger au Pod energy storage nyumbani, na pakua Precifarm Agent. Pulse charger kutoka KES 79,000 · kuchaji ya kawaida nyumbani takriban KES 140 kwa siku · DC ya umma chini ya dakika 30 · Lipa Pole Pole kutoka KES 3,300 kwa mwezi.",
    links: {
      faq: swahiliUi.faq,
      download: "Pakua Precifarm Agent",
      locations: swahiliUi.locations,
      english: "English",
      evGuide: "Mwongozo wa EV Kenya",
    },
  },
} as const;
