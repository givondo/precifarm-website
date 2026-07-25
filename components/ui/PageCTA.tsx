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
  if (href.includes("#")) {
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
  primaryHref = "/#book",
  primaryLabel = "Book Now",
  secondaryHref = "/contact",
  secondaryLabel = "Contact us",
}: PageCTAProps) {
  return (
    <section className="border-t border-border bg-muted">
      <div className="page-container py-12 sm:py-14">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-white px-6 py-10 text-center shadow-sm sm:px-10 sm:py-12">
          <h2 className="text-xl font-semibold tracking-tight text-forest-900 sm:text-2xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-forest-600/80">
            {description}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <CtaLink
              href={primaryHref}
              className="rounded-full bg-charge-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-charge-500"
            >
              {primaryLabel}
            </CtaLink>
            {secondaryHref && secondaryLabel && (
              <CtaLink
                href={secondaryHref}
                className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-forest-900 transition-colors hover:bg-muted"
              >
                {secondaryLabel}
              </CtaLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
