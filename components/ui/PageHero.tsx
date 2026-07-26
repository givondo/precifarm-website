type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_20%_-30%,rgba(37,99,235,0.08),transparent)]" />
      <div className="page-container relative py-10 sm:py-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-charge-600">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-forest-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-forest-600/85">
          {description}
        </p>
        {children && <div className="mt-7">{children}</div>}
      </div>
    </section>
  );
}
