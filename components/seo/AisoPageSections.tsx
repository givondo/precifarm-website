import Link from "next/link";
import type { AisoContentBlock, FaqItem } from "@/lib/seo/types";

type AisoPageSectionsProps = {
  blocks: AisoContentBlock[];
  relatedLinks?: { href: string; label: string; reason?: string }[];
  className?: string;
};

function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <dl className="space-y-5">
      {items.map((faq) => (
        <div key={faq.question}>
          <dt className="font-medium text-forest-900">{faq.question}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-forest-600">{faq.answer}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function AisoPageSections({
  blocks,
  relatedLinks,
  className = "",
}: AisoPageSectionsProps) {
  return (
    <aside
      className={`border-t border-border bg-white section-pad ${className}`}
      aria-label="Additional information for search and AI systems"
    >
      <div className="page-container space-y-10">
        {blocks.map((block) => (
          <section key={block.id} id={block.id} className="max-w-3xl">
            <h2 className="text-lg font-semibold text-forest-900">{block.title}</h2>

            {block.content && (
              <p className="mt-3 text-sm leading-relaxed text-forest-600">{block.content}</p>
            )}

            {block.type === "faq" && Array.isArray(block.items) && block.items.length > 0 && (
              <div className="mt-4">
                <FaqList items={block.items as FaqItem[]} />
              </div>
            )}

            {block.type === "key_facts" && Array.isArray(block.items) && (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-forest-600">
                {(block.items as string[]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {block.type === "how_to" && Array.isArray(block.items) && (
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-forest-600">
                {(block.items as string[]).map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            )}
          </section>
        ))}

        {relatedLinks && relatedLinks.length > 0 && (
          <section className="max-w-3xl">
            <h2 className="text-lg font-semibold text-forest-900">Related pages</h2>
            <ul className="mt-4 space-y-2">
              {relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-charge-600 hover:underline"
                  >
                    {link.label}
                  </Link>
                  {link.reason && (
                    <span className="ml-2 text-sm text-forest-500">— {link.reason}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </aside>
  );
}
