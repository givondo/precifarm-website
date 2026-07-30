import Link from "next/link";
import FaqAccordion from "@/components/seo/FaqAccordion";
import type { AisoContentBlock, FaqItem } from "@/lib/seo/types";

type AisoPageSectionsProps = {
  blocks: AisoContentBlock[];
  relatedLinks?: { href: string; label: string; reason?: string }[];
  className?: string;
};

function KeyFactsGrid({ items }: { items: string[] }) {
  return (
    <ul className="aiso-facts-grid">
      {items.map((item) => (
        <li key={item} className="aiso-fact-card">
          {item}
        </li>
      ))}
    </ul>
  );
}

function HowToSteps({ items }: { items: string[] }) {
  return (
    <ol className="aiso-steps">
      {items.map((step, index) => (
        <li key={step} className="aiso-step">
          <span className="aiso-step-num">{index + 1}</span>
          <span className="aiso-step-text">{step}</span>
        </li>
      ))}
    </ol>
  );
}

function blockByType(blocks: AisoContentBlock[], type: AisoContentBlock["type"]) {
  return blocks.find((b) => b.type === type);
}

export default function AisoPageSections({
  blocks,
  relatedLinks,
  className = "",
}: AisoPageSectionsProps) {
  const summary = blockByType(blocks, "executive_summary");
  const keyFacts = blockByType(blocks, "key_facts");
  const faq = blockByType(blocks, "faq");
  const howTo = blockByType(blocks, "how_to");
  const otherBlocks = blocks.filter(
    (b) => !["executive_summary", "key_facts", "faq", "how_to"].includes(b.type),
  );

  const faqItems = faq?.items as FaqItem[] | undefined;
  const factItems = keyFacts?.items as string[] | undefined;
  const howToItems = howTo?.items as string[] | undefined;

  return (
    <section
      className={`aiso-section border-t border-border bg-muted/30 section-pad ${className}`}
      aria-label="Quick answers about Precifarm"
    >
      <div className="page-container">
        <div className="aiso-section-head">
          <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-charge-600">
            Quick answers
          </p>
          <h2 className="heading-display mt-2 text-2xl sm:text-3xl">
            Plan your trip and find what you need
          </h2>
        </div>

        <div className="aiso-section-grid mt-10">
          {(summary || keyFacts) && (
            <div className="aiso-section-panel">
              {summary?.content && (
                <div className="aiso-summary-card">
                  <h3 className="aiso-panel-title">{summary.title}</h3>
                  <p className="aiso-summary-text">{summary.content}</p>
                </div>
              )}
              {factItems && factItems.length > 0 && (
                <div className={summary?.content ? "mt-6" : ""}>
                  <h3 className="aiso-panel-title">{keyFacts?.title ?? "Key facts"}</h3>
                  <KeyFactsGrid items={factItems} />
                </div>
              )}
            </div>
          )}

          {howToItems && howToItems.length > 0 && (
            <div className="aiso-section-panel">
              <h3 className="aiso-panel-title">{howTo?.title ?? "How to book"}</h3>
              <HowToSteps items={howToItems} />
              <Link href="/#book" className="aiso-book-link">
                Book now →
              </Link>
            </div>
          )}
        </div>

        {faqItems && faqItems.length > 0 && (
          <div className="mt-10">
            <h3 className="aiso-panel-title mb-4">{faq?.title ?? "FAQ"}</h3>
            <FaqAccordion items={faqItems} />
          </div>
        )}

        {otherBlocks.map((block) => (
          <section key={block.id} id={block.id} className="mt-10 max-w-3xl">
            <h3 className="aiso-panel-title">{block.title}</h3>
            {block.content && (
              <p className="mt-3 text-sm leading-relaxed text-forest-600">{block.content}</p>
            )}
          </section>
        ))}

        {relatedLinks && relatedLinks.length > 0 && (
          <div className="mt-10">
            <h3 className="aiso-panel-title mb-4">Related pages</h3>
            <ul className="aiso-related-grid">
              {relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="aiso-related-card group">
                    <span className="aiso-related-label">{link.label}</span>
                    {link.reason && (
                      <span className="aiso-related-reason">{link.reason}</span>
                    )}
                    <span className="aiso-related-arrow" aria-hidden>
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
