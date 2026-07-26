const variantClasses: Record<string, string> = {
  live: "bg-charge-600 text-white border-charge-600",
  muted: "bg-muted text-forest-600 border-border",
  solar: "bg-solar-500/10 text-solar-500 border-solar-500/20",
  outline: "bg-white text-forest-600 border-border",
};

export default function Badge({
  children,
  variant = "outline",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "live" | "muted" | "solar" | "outline";
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
