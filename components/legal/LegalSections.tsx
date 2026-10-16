import type { LegalSection } from "@/lib/legal/content";

export function LegalSections({ sections }: { sections: readonly LegalSection[] }) {
  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <div key={section.title}>
          <h2 className="text-lg font-semibold text-forest-900">{section.title}</h2>
          {section.paragraphs?.map((p) => (
            <p key={p.slice(0, 32)} className="mt-3 text-sm leading-relaxed text-forest-600">
              {p}
            </p>
          ))}
          {section.bullets ? (
            <ul className="mt-4 space-y-2">
              {section.bullets.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-forest-600">
                  · {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  );
}
