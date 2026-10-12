import Link from "next/link";
import { finalCta } from "@/lib/brand-messaging";
import { siteCtas } from "@/lib/site-copy";

const moreLinks = [siteCtas.exploreCharging, siteCtas.allFaq] as const;

export default function HomeFinalCta() {
  return (
    <section className="hx-final" aria-labelledby="home-final-title">
      <div className="hx-final-glow" aria-hidden />
      <div className="hx-container relative py-28 text-center sm:py-40">
        <h2 id="home-final-title" className="hx-title mx-auto max-w-3xl" data-reveal="scale">
          {finalCta.title}
        </h2>
        <p className="hx-lead mx-auto mt-6 max-w-xl" data-reveal>
          {finalCta.description}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3" data-reveal>
          <Link href={finalCta.primary.href} className="hx-btn hx-btn-solid">
            <span>{finalCta.primary.label}</span>
          </Link>
          <Link href={finalCta.secondary.href} className="hx-btn">
            <span>{finalCta.secondary.label}</span>
          </Link>
        </div>
        <nav aria-label="More on Precifarm" className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3" data-reveal>
          {moreLinks.map((item) => (
            <Link key={item.href} href={item.href} className="hx-link">
              {item.label} <span aria-hidden>→</span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
