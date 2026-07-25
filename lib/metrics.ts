import { nairobiKisumuRoute } from "@/lib/route";

/**
 * Per-coach annual impact on Nairobi–Kisumu vs a diesel intercity coach:
 * 345 km × 2 × 250 operating days ≈ 172,500 km; ~34 L/100 km loaded ≈ 58,650 L diesel.
 */
const dieselLitresPerCoachYear = 58_000;
const co2TonnesPerCoachYear = 155;

/** Homepage “Why it works” — impact metrics in the style of operational e-mobility leaders */
export const whyItWorksMetrics = [
  {
    stat: nairobiKisumuRoute.distance,
    label: "Nairobi–Kisumu electric intercity route",
  },
  {
    stat: "~50%",
    label: "lower energy cost per km vs diesel coaches",
  },
  {
    stat: `~${co2TonnesPerCoachYear} t`,
    label: "CO₂ avoided per coach per year on route",
  },
  {
    stat: `~${dieselLitresPerCoachYear.toLocaleString("en-KE")} L`,
    label: "diesel not burned per coach per year on route",
  },
  {
    stat: "Contracted",
    label: "hub demand secured before capital is deployed",
  },
] as const;
