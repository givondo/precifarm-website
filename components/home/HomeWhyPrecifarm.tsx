import Link from "next/link";
import { homeSupportSection } from "@/lib/brand-messaging";

const proofPoints = [
  {
    stat: "KES 140",
    title: "Typical home day",
    text: "~60 km in Nairobi vs ~KES 1,000 diesel.",
  },
  {
    stat: "1 day",
    title: "Home install",
    text: "Survey, wiring and commissioning for your Pulse charger.",
  },
  {
    stat: "3 years",
    title: "Aftersale care",
    text: "On every home unit we commission.",
  },
  {
    stat: "M-Pesa",
    title: "Pay on any phone",
    text: "Lipa Pole Pole and session pay — no bank account.",
  },
] as const;

export default function HomeWhyPrecifarm() {
  return (
    <section className="home-section border-b border-border bg-white">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow">{homeSupportSection.eyebrow}</p>
          <h2 className="heading-display mt-3 text-2xl text-forest-900 sm:text-3xl">
            {homeSupportSection.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-forest-600 sm:text-base">
            {homeSupportSection.description}
          </p>
        </div>

        <div className="home-section-grid mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {proofPoints.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-muted/20 px-5 py-5 transition-colors hover:border-forest-200 hover:bg-white"
            >
              <p className="font-mono text-lg font-semibold tracking-tight text-charge-700">{item.stat}</p>
              <h3 className="mt-2 font-semibold text-forest-900">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-forest-600">{item.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-forest-600">
          <Link href="/about" className="font-semibold text-forest-900 hover:text-charge-600">
            About Precifarm
          </Link>
          <span className="mx-2 text-forest-300">·</span>
          <Link href="/partners" className="font-semibold text-forest-900 hover:text-charge-600">
            Fleet &amp; partners
          </Link>
        </p>
      </div>
    </section>
  );
}
