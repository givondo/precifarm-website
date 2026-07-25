import type { Metadata } from "next";
import ChargingSection from "@/components/ChargingSection";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Charging",
  description:
    "Precifarm route charging hubs, EV home charging and in-house charging stations for private entities across Kenya.",
};

export default function ChargingPage() {
  return (
    <>
      <PageHero
        eyebrow="Charging"
        title="Route hubs, EV home charging and in-house stations for private entities"
        description="Precifarm delivers dependable DC fast charging on intercity routes, at home and on private sites — designed, installed and operated by the same regional engineering teams."
      />
      <section className="border-b border-border bg-white">
        <ChargingSection />
      </section>
    </>
  );
}
