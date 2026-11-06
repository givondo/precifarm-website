import Link from "next/link";

export type Action = {
  href: string;
  label: string;
  /** primary: filled; secondary: outline; link: text with chevron */
  variant?: "primary" | "secondary" | "link";
  external?: boolean;
};

const styles = {
  light: {
    primary:
      "inline-flex min-h-12 items-center justify-center rounded-full bg-charge-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-charge-500",
    secondary:
      "inline-flex min-h-12 items-center justify-center rounded-full border border-forest-200 bg-white px-6 text-sm font-semibold text-forest-900 transition-colors hover:border-forest-300",
    link: "inline-flex min-h-11 items-center text-sm font-semibold text-charge-600 hover:text-charge-700",
  },
  dark: {
    primary:
      "inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-forest-950 transition-colors hover:bg-brand-50",
    secondary:
      "inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:border-white/50",
    link: "inline-flex min-h-11 items-center text-sm font-semibold text-white/85 hover:text-white",
  },
} as const;

export function ActionLink({ action, tone = "light" }: { action: Action; tone?: "light" | "dark" }) {
  const cls = `${styles[tone][action.variant ?? "primary"]} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charge-600`;
  const body = (
    <>
      {action.label}
      {action.variant === "link" ? (
        <span aria-hidden className="ml-1">
          ›
        </span>
      ) : null}
    </>
  );
  if (action.external || action.href.startsWith("tel:") || action.href.startsWith("mailto:")) {
    return (
      <a href={action.href} className={cls} {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {body}
      </a>
    );
  }
  return (
    <Link href={action.href} className={cls}>
      {body}
    </Link>
  );
}

export default function Actions({ actions, tone = "light", className = "" }: { actions: readonly Action[]; tone?: "light" | "dark"; className?: string }) {
  if (!actions.length) return null;
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-3 ${className}`}>
      {actions.map((a) => (
        <ActionLink key={`${a.href}-${a.label}`} action={a} tone={tone} />
      ))}
    </div>
  );
}
