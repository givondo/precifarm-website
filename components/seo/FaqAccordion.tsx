import type { FaqItem } from "@/lib/seo/types";

type FaqAccordionProps = {
  items: FaqItem[];
  className?: string;
  variant?: "card" | "plain";
};

export default function FaqAccordion({ items, className = "", variant = "card" }: FaqAccordionProps) {
  if (items.length === 0) return null;

  const listClass =
    variant === "plain"
      ? `aiso-faq-list aiso-faq-list-plain divide-y divide-border ${className}`
      : `aiso-faq-list divide-y divide-border rounded-2xl border border-border bg-white ${className}`;

  return (
    <div className={listClass}>
      {items.map((faq) => (
        <details key={faq.question} className="aiso-faq-item group">
          <summary className="aiso-faq-question">{faq.question}</summary>
          <p className="aiso-faq-answer">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
