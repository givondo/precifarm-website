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
        <p className={inverted ? "text-eyebrow-inverted" : "text-eyebrow"}>{eyebrow}</p>
      )}
      <h2
        className={`heading-display ${eyebrow ? "mt-3" : ""} text-xl sm:text-2xl ${inverted ? "heading-inverted" : ""}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed ${inverted ? "subtitle-inverted" : "text-subtitle text-forest-600"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
