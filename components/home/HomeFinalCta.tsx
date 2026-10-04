import Link from "next/link";
import { finalCta } from "@/lib/brand-messaging";
import { siteCtas } from "@/lib/site-copy";

const moreLinks = [siteCtas.exploreCharging, siteCtas.allFaq] as const;

export default function HomeFinalCta() {
  return (
    <section className="home-section bg-white">
      <div className="page-container max-w-xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-forest-900 sm:text-4xl">{finalCta.title}</h2>
        <p className="mt-4 text-base leading-relaxed text-forest-500">{finalCta.description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          <Link href={finalCta.primary.href} className="btn-primary">
            {finalCta.primary.label}
          </Link>
          <Link href={finalCta.secondary.href} className="link-touch text-sm font-medium">
            {finalCta.secondary.label} ›
          </Link>
        </div>
        <nav
          aria-label="More on Precifarm"
          className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-border pt-8 text-sm text-forest-500"
        >
          {moreLinks.map((item) => (
            <Link key={item.href} href={item.href} className="link-touch font-medium hover:text-forest-900">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
