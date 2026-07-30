import type { FaqItem } from "@/lib/seo/types";

type FaqAccordionProps = {
  items: FaqItem[];
  className?: string;
};

export default function FaqAccordion({ items, className = "" }: FaqAccordionProps) {
  if (items.length === 0) return null;

  return (
    <div className={`aiso-faq-list divide-y divide-border rounded-2xl border border-border bg-white ${className}`}>
      {items.map((faq) => (
        <details key={faq.question} className="aiso-faq-item group">
          <summary className="aiso-faq-question">{faq.question}</summary>
          <p className="aiso-faq-answer">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
