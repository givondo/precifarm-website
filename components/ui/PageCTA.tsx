import Link from "next/link";
import type { ReactNode } from "react";

type PageCTAProps = {
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

function CtaLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  if (href.includes("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function PageCTA({
  title,
  description,
  primaryHref = "/charging",
  primaryLabel = "Explore charging",
  secondaryHref = "/contact",
  secondaryLabel = "Contact us",
}: PageCTAProps) {
  return (
    <section className="page-cta">
      <div className="page-container page-cta-container">
        <div className="page-cta-inner">
          <h2 className="page-cta-title">{title}</h2>
          <p className="page-cta-description">{description}</p>
          <div className="page-cta-actions">
            <CtaLink href={primaryHref} className="btn-primary rounded-full px-8 py-3 text-sm">
              {primaryLabel}
            </CtaLink>
            {secondaryHref && secondaryLabel && (
              <CtaLink href={secondaryHref} className="btn-secondary rounded-full px-6 py-3 text-sm">
                {secondaryLabel}
              </CtaLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
