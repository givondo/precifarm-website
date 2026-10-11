/**
 * Homepage full-bleed photography — keep stable when inner pages move to new renders.
 * Do not import this outside components/home/*, lib/brand-messaging.ts and the sitemap.
 */

export const homePageImages = {
  hero: {
    src: "/images/home-hero-video-wallpaper.jpg",
    alt: "Electric car charging from a Precifarm Pulse wallbox on a Nairobi driveway at sunset",
  },
  podHomeHero: {
    src: "/images/products/pod-home-hero-v3-garage-4x3.png",
    alt: "Precifarm Pod and Pulse charger in a Kenyan home garage with solar and grid backup",
  },
  bodaHub: {
    src: "/images/products/boda-hub-site-petrol.png",
    alt: "Precifarm Boda Hub battery swap lockers at a Kenyan petrol station forecourt with electric motorcycles",
  },
  corridor: {
    src: "/images/renders/corridor-forecourt-hero.png",
    alt: "Precifarm Corridor DC fast charging forecourt with solar canopy, dispenser and power cabinet",
  },
  energy: {
    src: "/images/megapack-hero-v3.png",
    alt: "Concept render of Precifarm MegaPack battery storage blocks at a Kenyan grid site",
  },
} as const;
