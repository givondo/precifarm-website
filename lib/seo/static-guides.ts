import type { CmsSeoContent } from "@/lib/seo/cms-client";
import { sitePricing } from "@/lib/site-copy";

/**
 * Guides published from the website itself, answering the questions Kenyans type into Google and ask AI
 * assistants. They sit beside the CMS guides at /guides/<slug>; a CMS guide with the same slug wins.
 *
 * Rules for this file: answer first, one fact per sentence, every outside figure dated and sourced, Precifarm
 * figures only from Canon (lib/site-copy.ts), live and planned sites never blurred. Kenyan English, no dashes.
 */

const AUTHOR = "Sayia David Givondo, B.Eng, Lead Engineer, Precifarm";
const ACCESSED = "2026-10-22";

const src = (title: string, url: string) => ({ title, url, accessedAt: ACCESSED });

const S = {
  techishTariff: src(
    "Tech-ish: EV charging stations in Kenya can now use unlimited power on the KES 16 e-mobility tariff (25 September 2026)",
    "https://tech-ish.com/2026/09/25/ev-charging-stations-in-kenya-can-now-use-unlimited-power-on-the-kes-16-e-mobility-tariff/",
  ),
  citizenTariff: src(
    "Citizen Digital: Kenya rewrites EV charging tariff amid surge in electric mobility (22 September 2026)",
    "https://citizen.digital/article/kenya-rewrites-ev-charging-tariff-amid-surge-in-electric-mobility-n390659",
  ),
  techtrendsTariff: src(
    "TechTrendsKE: Kenya EV charging tariff (22 September 2026)",
    "https://techtrendske.co.ke/2026/09/22/kenya-ev-charging-tariff/",
  ),
  evCount: src(
    "Capital FM: Registered EVs in Kenya reach 24,754",
    "https://capitalfm.africa/registered-evs-in-kenya-reaches-24754/",
  ),
  policy: src(
    "Citizen Digital: Government launches National E-Mobility Policy and green number plates (3 February 2026)",
    "https://www.citizen.digital/business/govt-launches-national-e-mobility-policy-to-cut-fuel-imports-unveils-green-number-plates-n376852",
  ),
  kplc45: src(
    "AllAfrica: Kenya Power to roll out 45 EV charging stations in major counties (May 2025)",
    "https://allafrica.com/stories/202505060023.html",
  ),
  roamFinance: src(
    "The Kenya Times: Boda boda riders to get Roam electric bikes from KSh 25,000 (10 July 2025)",
    "https://thekenyatimes.com/latest-kenya-times-news/boda-boda-riders-to-get-roam-electric-bikes-for-as-low-as-ksh-25000-in-new-deal/",
  ),
};

type StaticGuide = Omit<CmsSeoContent, "id" | "entityIds" | "status" | "aisoBlocks"> & {
  faqs: { question: string; answer: string }[];
};

const guides: StaticGuide[] = [
  {
    slug: "kenya-power-ev-charging-tariff",
    title: "Kenya Power EV Tariff 2026: KES 16/kWh, KES 8 Off-Peak",
    description:
      "The Kenya Power e-mobility tariff is KES 16 per kWh, or KES 8 off-peak, before levies and VAT. Off-peak hours, who qualifies and what changed in September 2026.",
    contentType: "guide",
    authorName: AUTHOR,
    publishedAt: "2026-10-22T06:00:00+03:00",
    updatedAt: "2026-10-22T06:00:00+03:00",
    sources: [S.techishTariff, S.citizenTariff, S.techtrendsTariff],
    bodyMd: `## The short answer
Kenya Power's e-mobility tariff (Method EM) charges **KES 16 per kWh** for energy and **KES 8 per kWh** for energy used in off-peak hours. These are energy charges only. Fuel, forex and inflation pass-through charges, levies and VAT are added on the bill, so the amount you pay per kWh is higher than KES 16.

## Off-peak hours for EV charging
- Weekdays: 10pm to 6am
- Saturdays and public holidays: midnight to 8am, and 2pm to midnight
- Sundays: all day

## Who the e-mobility tariff is for
The tariff covers e-mobility customers supplied at 240 V or 415 V. Reporting on the tariff covers home charging, public charging stations, bus depots and battery swap stations. 331 customers were on the tariff in April 2026. Ask Kenya Power how to register your connection for the tariff and whether your site needs its own meter before you budget on it.

## What changed in September 2026
EPRA's Gazette Notice 15188 of 18 September 2026 removed the old limit of 15,000 kWh a month on the tariff. Each e-mobility customer now has an Energy Consumption Threshold: the average monthly use over the previous six months plus 6%, or the average of the first three months for a new customer. Off-peak discounts apply to units above that threshold. Reports say the change is backdated to 1 July 2025; Kenya Power has not said how past bills will be adjusted.

## What it means if you charge at home
An illustrative figure for a typical 60 km day of home charging on a Pulse charger is about **${sitePricing.homeDay}**, against roughly ${sitePricing.dieselDay} of diesel for the same distance. Charging in off-peak hours, for example after 10pm on a weekday, is when energy on the e-mobility tariff costs least. Read [how to charge an electric car at home in Kenya](/guides/charge-electric-car-at-home-kenya) for the installation side.

## Public charging is priced differently
A public charger sells energy at the operator's own price, which covers the charger, the site, the grid connection and the service as well as Kenya Power's bill. Precifarm public DC charging is from **${sitePricing.publicDcFrom}** at commissioned sites; see [EV charging stations in Kenya](/guides/ev-charging-stations-kenya) for where to charge.`,
    faqs: [
      {
        question: "How much does Kenya Power charge for EV charging?",
        answer:
          "The e-mobility tariff energy charge is KES 16 per kWh, or KES 8 per kWh in off-peak hours. Pass-through charges, levies and VAT are added on the bill (rates as reported in September 2026).",
      },
      {
        question: "What are the off-peak hours for the EV tariff in Kenya?",
        answer:
          "Weekdays 10pm to 6am; Saturdays and public holidays midnight to 8am and 2pm to midnight; all day on Sundays.",
      },
      {
        question: "Is there still a monthly limit on the Kenya Power e-mobility tariff?",
        answer:
          "No. Gazette Notice 15188 of 18 September 2026 replaced the 15,000 kWh monthly limit with an Energy Consumption Threshold based on each customer's own average use.",
      },
      {
        question: "Can I use the e-mobility tariff for charging at home?",
        answer:
          "The tariff applies to e-mobility customers supplied at 240 V or 415 V, which includes homes. Confirm with Kenya Power how to register your connection and whether a separate meter is needed.",
      },
    ],
  },
  {
    slug: "ev-charging-stations-kenya",
    title: "EV Charging Stations in Kenya: Where to Charge in 2026",
    description:
      "Where to charge an electric car in Kenya: how many public chargers there are, CCS2, Type 2 and CHAdeMO plugs, charging times, prices per kWh and the hub map.",
    contentType: "guide",
    authorName: AUTHOR,
    publishedAt: "2026-10-22T06:00:00+03:00",
    updatedAt: "2026-10-22T06:00:00+03:00",
    sources: [S.citizenTariff, S.kplc45, S.evCount, S.policy],
    bodyMd: `## The short answer
Kenya had about 300 public EV charging points in June 2025, according to the Electric Mobility Association of Kenya, with most of them in Nairobi. Kenya Power is rolling out 45 charging stations across six counties, and fuel retailers, malls and bus operators are adding more. For daily driving, charging at home or at work covers most needs; public DC fast charging matters most on long trips.

## How many electric vehicles Kenya has
The Ministry of Roads and Transport put registered EVs at 24,754 at the end of 2025, up from 796 in 2022. The National E-Mobility Policy was launched on 3 February 2026, together with green number plates for EVs.

## Check your plug before you drive
- **Type 2 (AC):** most new EVs sold in Kenya, including BYD and MG models, charge on AC through a Type 2 inlet.
- **CCS2 (DC fast):** the same cars use CCS2 for DC fast charging.
- **Type 1 and CHAdeMO:** Japanese imports such as the used Nissan Leaf use Type 1 for AC and CHAdeMO for DC. Many public DC chargers in Kenya are CCS2 only, so Leaf drivers should confirm a CHAdeMO connector before a trip.

## How long charging takes
- **Home wallbox (7 kW AC):** a typical day of driving in about 90 minutes on a Pulse charger.
- **Fleet AC (22 kW):** 40 kWh or more in about 120 minutes at a Depot charging station.
- **Highway DC (120 kW and above):** about 60 kWh in 30 minutes on Corridor charging, depending on the car.

## What public charging costs
Each operator sets its own price per kWh, which is higher than Kenya Power's tariff because it covers the charger, the site and the service. Precifarm public DC charging is from **${sitePricing.publicDcFrom}** at commissioned sites, paid with M-Pesa. See the [Kenya Power EV tariff](/guides/kenya-power-ev-charging-tariff) for what energy costs at the meter.

## Find a charger on the Charging Hub map
The [Precifarm Charging Hub](/hub) map shows charging and swap sites across Kenya with a status on each. Availability on the map is illustrative, not real-time, so call the site before a long trip.

## Driving Nairobi to Kisumu or Nairobi to Mombasa
Nairobi to Kisumu is Precifarm's first planned Corridor charging route. The road distance is about 350 km, so most EVs need one DC fast charging stop or a full charge at both ends; confirm a working charger on the route before you set off.`,
    faqs: [
      {
        question: "How many EV charging stations are there in Kenya?",
        answer:
          "About 300 public charging points in June 2025, according to the Electric Mobility Association of Kenya, with Kenya Power rolling out 45 more stations across six counties.",
      },
      {
        question: "Where can I charge an electric car in Nairobi?",
        answer:
          "At home or at work on a wallbox, and at public chargers at malls, fuel stations and hubs. Call a public charger before a long trip, because availability changes.",
      },
      {
        question: "How much does it cost to charge at a public charger in Kenya?",
        answer: `Each operator sets its own price per kWh. Precifarm public DC charging is from ${sitePricing.publicDcFrom} at commissioned sites, paid with M-Pesa.`,
      },
      {
        question: "Can a Nissan Leaf use public fast chargers in Kenya?",
        answer:
          "Only DC chargers with a CHAdeMO connector. Many Kenyan DC chargers are CCS2 only, so Leaf drivers should confirm the connector before a trip.",
      },
    ],
  },
  {
    slug: "charge-electric-car-at-home-kenya",
    title: "How to Charge an Electric Car at Home in Kenya",
    description:
      "Charging an EV at home in Kenya: a normal socket against a 7 kW wallbox, what your Kenya Power supply needs, cost per day, solar and the installation steps.",
    contentType: "howto",
    authorName: AUTHOR,
    publishedAt: "2026-10-22T06:00:00+03:00",
    updatedAt: "2026-10-22T06:00:00+03:00",
    sources: [S.techishTariff, S.citizenTariff],
    bodyMd: `## The short answer
You can charge an electric car at home in Kenya from a normal socket, but it is slow. A 7 kW wallbox on its own circuit, such as the Pulse charger, covers a typical 60 km day in about 90 minutes, for an illustrative **${sitePricing.homeDay}** a day in electricity. Pulse is from **${sitePricing.pulseFrom}**, or from **${sitePricing.lipaFrom}** with Lipa Pole Pole on M-Pesa.

## Normal socket, portable charger or wallbox
- **Normal 13 A socket:** the cable that comes with many cars draws about 2.3 kW and adds roughly 10 to 15 km of range an hour. Use a socket in good condition on a circuit with nothing else heavy on it.
- **Portable charger (3.3 kW):** the Spark charger, from KES 25,000, covers a typical day in about 180 minutes.
- **Wallbox (7 kW):** the Pulse charger covers a typical day in about 90 minutes and is the usual choice for a home.

## What your electricity supply needs
A 7 kW wallbox draws about 32 A on a single-phase 240 V supply. An electrician should check four things before installation: that the incoming supply and main breaker have spare capacity, that the earthing is sound, that the charger has its own circuit and breaker, and that the circuit has the residual current protection EV charging needs (IEC 60364-7-722). Precifarm's site survey covers all four, and flags when Kenya Power needs to upgrade the supply.

## What it costs to run
An illustrative figure is about **${sitePricing.homeDay}** for a typical 60 km day, against roughly ${sitePricing.dieselDay} of diesel. Kenya Power's e-mobility tariff is KES 16 per kWh, or KES 8 per kWh off-peak, before levies and VAT; see the [Kenya Power EV tariff guide](/guides/kenya-power-ev-charging-tariff).

## Charging from solar
A typical day of driving uses about 10 kWh. In Nairobi, each kilowatt of solar panels produces very roughly 4 to 5 kWh a day (a planning assumption that varies with roof, season and shading), so about 2.5 kW of panels covers one day of driving on average. The sun shines while most cars are away, so a battery helps: Pod energy storage pairs a home charger with 5 or 10 kWh of storage, from KES 295,000, with Lipa Pole Pole available.

## The installation steps
1. Request a home survey at [precifarm.com/charging/home](/charging/home).
2. An engineer checks your supply, earthing, cable route and parking position.
3. You receive a fixed quote, with Lipa Pole Pole if you want to spread the cost on M-Pesa.
4. Precifarm installs, tests and commissions the charger, and shows you how to use it.`,
    faqs: [
      {
        question: "Can I charge an electric car from a normal socket in Kenya?",
        answer:
          "Yes, with the cable supplied with the car, but it is slow: about 2.3 kW, or roughly 10 to 15 km of range an hour. A 7 kW wallbox is about three times faster.",
      },
      {
        question: "How much does a home EV charger cost in Kenya?",
        answer: `The Pulse 7 kW wallbox is from ${sitePricing.pulseFrom}, or from ${sitePricing.lipaFrom} with Lipa Pole Pole on M-Pesa. The Spark 3.3 kW portable charger is from KES 25,000.`,
      },
      {
        question: "How much does it cost to charge an electric car at home in Kenya?",
        answer: `About ${sitePricing.homeDay} for a typical 60 km day, against roughly ${sitePricing.dieselDay} of diesel for the same distance (illustrative figures; a survey quote gives your own).`,
      },
      {
        question: "Do I need to upgrade my Kenya Power supply for an EV charger?",
        answer:
          "Not always. A 7 kW wallbox draws about 32 A, so the survey checks your incoming supply and main breaker for spare capacity and flags when an upgrade is needed.",
      },
    ],
  },
  {
    slug: "electric-boda-battery-swap-kenya",
    title: "Electric Boda Battery Swap in Kenya: How It Works",
    description:
      "How battery swapping works for electric boda bodas in Kenya: swap stations, deposits and daily payments, swap times, home charging and the Precifarm Boda Hub.",
    contentType: "guide",
    authorName: AUTHOR,
    publishedAt: "2026-10-22T06:00:00+03:00",
    updatedAt: "2026-10-22T06:00:00+03:00",
    sources: [S.techishTariff, S.roamFinance, S.evCount],
    bodyMd: `## The short answer
With battery swapping, a boda rider rides into a swap station, hands over a flat battery and leaves with a charged one in a few minutes. The rider usually owns or finances the motorcycle and pays for the battery and energy per swap or through a subscription, often on M-Pesa. The rider never waits for a charge.

## Who runs battery swapping in Kenya
Several companies run electric boda networks in Kenya, including Spiro, Roam, Ampersand, Arc Ride and Ecobodaa. Spiro alone had about 500 swap stations by September 2026. Each network's batteries usually only fit its own motorcycles, so check which network serves your area before you buy a bike.

## What an electric boda costs
Prices change often and depend on the financing deal. As one example, in July 2025 riders could take a Roam Air through Fortune Credit for a KES 25,000 deposit and then KES 527 a day for 24 months, insurance included. Ask each network for its current bike price, deposit, daily payment and swap price before you decide.

## Swapping against charging at home
- **Swapping:** a few minutes per swap, no charger needed, but you pay the network's energy and battery price.
- **Charging the removable battery at home:** cheaper energy, but several hours per charge, and not every model allows it.
- **Kerbside charging:** charging the bike in place while you wait, for riders near a charger.

## The Precifarm Boda Hub
The [Precifarm Boda Hub](/charging/boda-hub) offers battery swap or kerbside charging in under 5 minutes, paid with M-Pesa. An automated smart-locker version, where riders find a hub, reserve a pack, scan and swap on their own, is in design and testing.`,
    faqs: [
      {
        question: "How does battery swapping work for electric boda bodas?",
        answer:
          "The rider exchanges a flat battery for a charged one at a swap station in a few minutes and pays per swap or through a subscription, usually on M-Pesa.",
      },
      {
        question: "How long does a boda battery swap take?",
        answer: "A few minutes. The Precifarm Boda Hub is designed for a swap in under 5 minutes.",
      },
      {
        question: "How much is an electric boda in Kenya?",
        answer:
          "It depends on the network and the financing deal. In July 2025 one offer was a Roam Air for a KES 25,000 deposit and KES 527 a day for 24 months; ask each network for current prices.",
      },
      {
        question: "Can I charge an electric boda battery at home?",
        answer:
          "Some models have removable batteries that can be charged at home over several hours; others only work with their network's swap stations. Check with the maker before you buy.",
      },
    ],
  },
];

function toContent(g: StaticGuide): CmsSeoContent {
  return {
    id: `static-${g.slug}`,
    entityIds: [],
    status: "published",
    locale: "en-KE",
    reviewerName: null,
    ...g,
    aisoBlocks: [{ id: `${g.slug}-faq`, type: "faq", title: "Common questions", items: g.faqs }],
  };
}

export const staticGuides: CmsSeoContent[] = guides.map(toContent);

export function getStaticGuide(slug: string): CmsSeoContent | undefined {
  return staticGuides.find((g) => g.slug === slug);
}
