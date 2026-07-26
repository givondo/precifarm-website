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
          className={`text-xs font-semibold uppercase tracking-widest ${inverted ? "text-white/70" : "text-forest-500"}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`heading-display ${eyebrow ? "mt-3" : ""} text-xl sm:text-2xl ${inverted ? "text-white" : ""}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed ${inverted ? "text-white/70" : "text-forest-600"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
