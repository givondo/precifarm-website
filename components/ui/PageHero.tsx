import Breadcrumbs from "@/components/seo/Breadcrumbs";

type BreadcrumbItem = { name: string; href: string };

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
};

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-container page-hero-container">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-5">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-charge-600">
          {eyebrow}
        </p>
        <h1 className="heading-display page-hero-title">{title}</h1>
        {description && <p className="page-hero-description">{description}</p>}
        {children && <div className="mt-7">{children}</div>}
      </div>
    </section>
  );
}
