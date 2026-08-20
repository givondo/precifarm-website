import type { ComponentProps } from "react";

type BookNowLinkProps = Omit<ComponentProps<"a">, "href">;

/** Primary charging CTA — replaces legacy bus booking anchor. */
export default function BookNowLink({
  className,
  children,
  ...rest
}: BookNowLinkProps) {
  return (
    <a href="/network" className={className} {...rest}>
      {children}
    </a>
  );
}
