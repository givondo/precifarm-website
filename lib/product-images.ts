/**
 * Product photography — supplier reference hardware in /public/images/products/
 */

export const productImages = {
  spark: {
    src: "/images/products/spark.png",
    alt: "Precifarm Spark portable EV charger with Type 2 connector, LCD display and five adjustable charge rates from 8A to 32A",
    brand: "spark" as const,
  },
  pulse: {
    src: "/images/products/pulse.png",
    alt: "Precifarm Pulse 7 kW Type 2 home wallbox with holster and Precifarm branding",
    brand: "pulse" as const,
  },
  pod: {
    src: "/images/products/pod.png",
    alt: "Precifarm Pod modular LiFePO₄ energy storage — stackable 5–10 kWh home battery tower with wall control unit",
    brand: "pod" as const,
  },
  boda: {
    src: "/images/products/boda.png",
    alt: "Precifarm Boda Hub battery swap cabinet for electric motorcycles",
    brand: "none" as const,
  },
  depot: {
    src: "/images/products/depot.png",
    alt: "Precifarm Depot 22 kW AC charging pedestals under solar canopy at a fleet yard",
    brand: "none" as const,
  },
  corridor: {
    src: "/images/products/corridor.png",
    alt: "Precifarm Corridor 120 kW integrated DC fast charger with dual CCS2 cables and M-Pesa checkout",
    brand: "corridor" as const,
  },
  corridorSafety: {
    src: "/images/products/corridor-safety.png",
    alt: "Precifarm Corridor DC fast charging — comprehensive safety protection for every session",
    brand: "none" as const,
  },
  financing: {
    src: "/images/products/financing.png",
    alt: "Lipa Pole Pole M-Pesa instalments for Precifarm home charging",
    brand: "none" as const,
  },
} as const;
