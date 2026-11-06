import { formatLongDate } from "@/lib/publications";

type Source = { title: string; url: string; accessedAt?: string };

/** Author, review, date and reading time under an article title. */
export function ArticleByline({
  authorName,
  reviewerName,
  reviewedAt,
  publishedAt,
  updatedAt,
  minutes,
}: {
  authorName?: string | null;
  reviewerName?: string | null;
  reviewedAt?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  minutes?: number;
}) {
  const updated = formatLongDate(updatedAt);
  const published = formatLongDate(publishedAt);
  const reviewed = formatLongDate(reviewedAt);
  const items: { label: string; value: string }[] = [];
  if (authorName) items.push({ label: "Written by", value: authorName });
  if (reviewerName) items.push({ label: "Reviewed by", value: reviewed ? `${reviewerName}, ${reviewed}` : reviewerName });
  if (updated) items.push({ label: published && published !== updated ? "Updated" : "Published", value: updated });
  if (minutes) items.push({ label: "Reading time", value: `${minutes} min` });
  if (!items.length) return null;
  return (
    <dl className="grid gap-x-8 gap-y-3 border-t border-border pt-5 text-sm sm:flex sm:flex-wrap">
      {items.map((i) => (
        <div key={i.label} className="min-w-0">
          <dt className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">{i.label}</dt>
          <dd className="mt-1 text-forest-800">{i.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Numbered source list for the foot of an article. */
export function SourcesList({ sources, id = "sources" }: { sources?: readonly Source[] | null; id?: string }) {
  if (!sources?.length) return null;
  return (
    <section aria-labelledby={`${id}-title`} id={id} className="scroll-mt-28 border-t border-border pt-8">
      <h2 id={`${id}-title`} className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">
        Sources
      </h2>
      <ol className="mt-4 space-y-3">
        {sources.map((s, i) => (
          <li key={s.url} className="grid grid-cols-[1.75rem_minmax(0,1fr)] text-sm leading-relaxed">
            <span className="font-mono text-xs text-forest-400">{String(i + 1).padStart(2, "0")}</span>
            <span className="min-w-0">
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="break-words font-medium text-forest-900 underline decoration-forest-200 underline-offset-4 hover:decoration-charge-600">
                {s.title}
              </a>
              {s.accessedAt ? <span className="block text-xs text-forest-500">Accessed {formatLongDate(s.accessedAt) ?? s.accessedAt}</span> : null}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
