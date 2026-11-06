"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { footerCtaFor } from "@/lib/site-nav";

/** The footer's call to action changes with the part of the site the visitor is in. */
export default function FooterCta() {
  const cta = footerCtaFor(usePathname() ?? "/");
  return (
    <section
      aria-labelledby="footer-cta-title"
      className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,#1a2230_0%,#111827_55%,#0f2a1f_100%)] p-6 sm:p-9 lg:p-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(126,192,157,0.22),transparent_65%)]"
      />
      <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-300">{cta.eyebrow}</p>
          <h2 id="footer-cta-title" className="heading-display heading-inverted mt-3 text-2xl sm:text-3xl">
            {cta.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">{cta.text}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link
            href={cta.primary.href}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-forest-950 transition-colors hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {cta.primary.label}
          </Link>
          {cta.secondary ? (
            <Link href={cta.secondary.href} className="inline-flex min-h-11 items-center text-sm font-semibold text-white/85 hover:text-white">
              {cta.secondary.label}
              <span aria-hidden className="ml-1">
                ›
              </span>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
