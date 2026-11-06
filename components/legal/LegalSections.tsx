import type { LegalSection } from "@/lib/legal/content";
import { sectionId } from "@/lib/publications";

/** Policy text exactly as written in lib/legal/content.ts, set for reading, with an anchor per section. */
export function LegalSections({ sections }: { sections: readonly LegalSection[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {sections.map((section) => {
        const id = sectionId(section.title);
        const num = section.title.match(/^(\d+)\.\s*/)?.[1];
        const heading = section.title.replace(/^\d+\.\s*/, "");
        return (
          <section key={section.title} id={id} aria-labelledby={`${id}-h`} className="group scroll-mt-28 py-8 sm:grid sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-4">
            <p aria-hidden className="font-mono text-sm text-forest-400 sm:pt-0.5">
              {num ? num.padStart(2, "0") : ""}
            </p>
            <div className="min-w-0">
              <h2 id={`${id}-h`} className="font-display text-lg font-semibold tracking-tight text-forest-950 sm:text-xl">
                <span className="sr-only">{num ? `${num}. ` : ""}</span>
                {heading}
                <a
                  href={`#${id}`}
                  aria-label={`Link to section: ${heading}`}
                  className="ml-2 inline-block text-base font-normal text-forest-300 opacity-0 transition-opacity hover:text-charge-600 focus-visible:opacity-100 group-hover:opacity-100"
                >
                  #
                </a>
              </h2>
              {section.paragraphs?.map((p) => (
                <p key={p.slice(0, 48)} className="mt-3 text-[15px] leading-[1.75] text-forest-700 sm:text-base">
                  {p}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-4 space-y-2.5">
                  {section.bullets.map((item) => (
                    <li key={item} className="relative pl-5 text-[15px] leading-[1.7] text-forest-700 sm:text-base">
                      <span aria-hidden className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-forest-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        );
      })}
    </div>
  );
}
