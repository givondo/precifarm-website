/**
 * Homepage-only product shots — keep stable when inner pages move to new renders.
 * Do not import this outside components/home/* or home-charging highlight.
 */

export const homePageImages = {
  featuredPulse: {
    src: "/images/renders/pulse-7kw-hero.png",
    alt: "Precifarm Pulse 7 kW home wallbox with holstered Type 2 cable and green Precifarm branding",
  },
  podHomeHero: {
    src: "/images/products/pod-home-hero-v3-garage-4x3.png",
    alt: "Precifarm Pod and Pulse charger in a Kenyan home garage with solar and grid backup",
  },
} as const;
