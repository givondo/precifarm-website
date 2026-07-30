import Link from "next/link";
import BookNowLink from "@/components/BookNowLink";
import { homepageAisoBlocks } from "@/lib/seo/aiso/blocks";
import type { FaqItem } from "@/lib/seo/types";

const faqs = (homepageAisoBlocks.find((b) => b.type === "faq")?.items ?? []) as FaqItem[];

const quickLinks = [
  { href: "/faq", label: "All FAQ" },
  { href: "/guides/book-nairobi-kisumu-coach", label: "Booking guide" },
  { href: "/network", label: "Charge map" },
] as const;

export default function HomeFaqSection() {
  return (
    <section className="home-faq border-t border-border bg-white section-pad">
      <div className="page-container">
        <div className="home-faq-layout">
          <div className="home-faq-intro">
            <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-charge-600">
              FAQ
            </p>
            <h2 className="heading-display mt-3 text-2xl sm:text-3xl">
              Answers before you travel
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-forest-600 sm:text-base">
              Booking, M-Pesa payment and what to expect on Nairobi–Kisumu.
            </p>
            <div className="home-faq-actions">
              <BookNowLink className="btn-primary rounded-full px-6 py-2.5 text-sm">
                Book now
              </BookNowLink>
              <div className="home-faq-quick-links">
                {quickLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="home-faq-quick-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <dl className="home-faq-list">
            {faqs.map((item) => (
              <div key={item.question} className="home-faq-item">
                <dt className="home-faq-question">{item.question}</dt>
                <dd className="home-faq-answer">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
