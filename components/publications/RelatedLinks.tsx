import Link from "next/link";

export type RelatedLink = { href: string; label: string; reason?: string; kicker?: string };

/** "Read next" band at the foot of an article: a quiet ruled list, not a wall of cards. */
export default function RelatedLinks({ title = "Read next", links }: { title?: string; links: readonly RelatedLink[] }) {
  if (!links.length) return null;
  return (
    <section aria-labelledby="related-title" className="border-t border-border bg-[#f6f7f8]">
      <div className="interior-container py-12 sm:py-16">
        <h2 id="related-title" className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">
          {title}
        </h2>
        <ul className={`mt-5 grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border sm:grid-cols-2 ${links.length > 2 ? "lg:grid-cols-4" : ""}`}>
          {links.map((l) => (
            <li key={l.href} className="bg-white">
              <Link href={l.href} className="group flex h-full min-h-28 flex-col justify-between gap-4 p-5 transition-colors hover:bg-[#fbfbfc]">
                <span>
                  {l.kicker ? <span className="block text-[11px] font-semibold uppercase tracking-widest text-charge-600">{l.kicker}</span> : null}
                  <span className="mt-1 block font-semibold leading-snug text-forest-950 group-hover:text-charge-700">{l.label}</span>
                  {l.reason ? <span className="mt-1.5 block text-sm leading-relaxed text-forest-600">{l.reason}</span> : null}
                </span>
                <span aria-hidden className="text-sm text-forest-400 transition-transform group-hover:translate-x-0.5 group-hover:text-charge-600">
                  ›
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
