export const vehicles = {
  city: {
    model: "Yutong U12",
    role: "Within-city travel",
    summary:
      "Premium electric city service for dependable daily movement across Nairobi and other urban networks.",
    image: "/images/yutong-u12.png",
    imageAlt: "Yutong U12 electric city bus for within-city travel",
  },
  intercity: {
    model: "Yutong U18",
    role: "City-to-city travel",
    summary:
      "Long-distance electric coach for scheduled intercity routes such as Nairobi–Kisumu, with reserved charging and premium cabin comfort.",
    image: "/images/yutong-u18.png",
    imageAlt:
      "Yutong U18 electric coach on the Nairobi–Kisumu route",
  },
  cargo: {
    model: "ET01 electric cargo van",
    role: "Fleet and logistics",
    summary:
      "Electric cargo van for last-mile and hub-linked freight — low-floor loading, 200 km range and contracted daytime charging at Precifarm hubs.",
    image: "/images/et01.jpg",
    imageAlt:
      "ET01 electric cargo van for fleet and logistics on the Precifarm network",
  },
} as const;

/** Vehicle images for mobility and intercity storytelling pages */
export const siteImages = {
  bookingHero: vehicles.intercity,
  about: vehicles.intercity,
  networkHub: vehicles.intercity,
} as const;
