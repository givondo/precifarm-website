import Link from "next/link";
import CountUp from "@/components/motion/CountUp";
import { homeEcosystemLine, homeProofStats, homeSupportSection } from "@/lib/brand-messaging";

function Marquee() {
  const items = [...homeEcosystemLine, ...homeEcosystemLine];
  return (
    <div className="hx-marquee" aria-hidden>
      <div className="hx-marquee-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="hx-marquee-item">
            {item}
            <span className="hx-marquee-sep">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HomeProof() {
  return (
    <section className="hx-proof" aria-labelledby="home-proof-title">
      <Marquee />
      <div className="hx-container py-24 sm:py-32">
        <div className="max-w-2xl">
          <p className="hx-eyebrow" data-reveal>
            {homeSupportSection.eyebrow}
          </p>
          <h2 id="home-proof-title" className="hx-title mt-4" data-reveal>
            {homeSupportSection.title}
          </h2>
          <p className="hx-lead mt-5" data-reveal>
            {homeSupportSection.description}
          </p>
        </div>

        <dl className="hx-proof-grid" data-reveal-stagger="120">
          {homeProofStats.map((item) => (
            <div key={item.label} className="hx-proof-cell" data-reveal>
              <dt className="hx-proof-label">{item.label}</dt>
              <dd>
                <CountUp
                  value={item.value}
                  prefix={"prefix" in item ? item.prefix : ""}
                  suffix={"suffix" in item ? item.suffix : ""}
                  className="hx-proof-value"
                />
                <span className="hx-proof-note">{item.note}</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3" data-reveal>
          <Link href="/about" className="hx-link">
            About Precifarm <span aria-hidden>→</span>
          </Link>
          <Link href="/partners" className="hx-link">
            Fleet &amp; partners <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
