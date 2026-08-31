import { headerCta } from "@/lib/brand-messaging";
import type { ComponentProps } from "react";

type HubCtaLinkProps = Omit<ComponentProps<"a">, "href">;

/** Primary header CTA — Charging Hub. */
export default function BookNowLink({
  className,
  children,
  ...rest
}: HubCtaLinkProps) {
  return (
    <a href={headerCta.href} className={className} {...rest}>
      {children}
    </a>
  );
}
