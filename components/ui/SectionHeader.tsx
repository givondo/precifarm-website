type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
  inverted?: boolean;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  className = "",
  centered = false,
  inverted = false,
}: SectionHeaderProps) {
  return (
    <div
      className={`max-w-2xl ${centered ? "mx-auto text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <p
          className={`text-sm font-semibold uppercase tracking-widest ${inverted ? "text-charge-400" : "text-charge-600"}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`${eyebrow ? "mt-3" : ""} text-xl font-semibold tracking-tight sm:text-2xl ${inverted ? "text-white" : "text-forest-900"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed ${inverted ? "text-white/70" : "text-forest-600/85"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
