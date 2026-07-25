import type { ComponentProps } from "react";

type BookNowLinkProps = Omit<ComponentProps<"a">, "href">;

export default function BookNowLink({
  className,
  children,
  ...rest
}: BookNowLinkProps) {
  return (
    <a href="/#book" className={className} {...rest}>
      {children}
    </a>
  );
}
