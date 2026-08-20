import Link from "next/link";
import { finalCta } from "@/lib/brand-messaging";

export default function HomeFinalCta() {
  return (
    <section className="home-section bg-white">
      <div className="page-container max-w-xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-forest-900 sm:text-4xl">{finalCta.title}</h2>
        <p className="mt-4 text-base leading-relaxed text-forest-500">{finalCta.description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          <Link href={finalCta.primary.href} className="btn-primary rounded-full px-6 py-3 text-sm">
            {finalCta.primary.label}
          </Link>
          <Link href={finalCta.secondary.href} className="text-sm font-medium">
            {finalCta.secondary.label} ›
          </Link>
        </div>
      </div>
    </section>
  );
}
