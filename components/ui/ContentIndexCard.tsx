import Link from "next/link";

type ContentIndexCardProps = {
  href: string;
  title: string;
  description?: string;
  meta?: string;
};

export default function ContentIndexCard({
  href,
  title,
  description,
  meta,
}: ContentIndexCardProps) {
  return (
    <Link href={href} className="content-index-card group">
      <div className="min-w-0 flex-1">
        {meta && <p className="content-index-card-meta">{meta}</p>}
        <h2 className="content-index-card-title">{title}</h2>
        {description && <p className="content-index-card-desc">{description}</p>}
      </div>
      <span className="content-index-card-arrow" aria-hidden>
        →
      </span>
    </Link>
  );
}
