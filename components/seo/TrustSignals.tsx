type Source = { title: string; url: string; accessedAt?: string };

type TrustSignalsProps = {
  authorName?: string | null;
  reviewerName?: string | null;
  reviewedAt?: string | null;
  updatedAt?: string;
  sources?: Source[];
};

export default function TrustSignals({
  authorName,
  reviewerName,
  reviewedAt,
  updatedAt,
  sources = [],
}: TrustSignalsProps) {
  const hasMeta = authorName || reviewerName || reviewedAt || updatedAt;
  if (!hasMeta && sources.length === 0) return null;

  return (
    <aside className="mt-6 rounded-xl border border-border bg-forest-50/50 px-4 py-4 text-sm text-forest-700">
      {hasMeta && (
        <dl className="flex flex-wrap gap-x-6 gap-y-2">
          {authorName && (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-forest-500">Author</dt>
              <dd>{authorName}</dd>
            </div>
          )}
          {reviewerName && (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-forest-500">Reviewed by</dt>
              <dd>{reviewerName}</dd>
            </div>
          )}
          {reviewedAt && (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-forest-500">Reviewed</dt>
              <dd>{new Date(reviewedAt).toLocaleDateString("en-KE")}</dd>
            </div>
          )}
          {updatedAt && (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-forest-500">Updated</dt>
              <dd>{new Date(updatedAt).toLocaleDateString("en-KE")}</dd>
            </div>
          )}
        </dl>
      )}

      {sources.length > 0 && (
        <div className={hasMeta ? "mt-4 border-t border-border pt-4" : ""}>
          <p className="text-xs font-semibold uppercase tracking-wide text-forest-500">Sources</p>
          <ul className="mt-2 space-y-1">
            {sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  className="text-link underline-offset-2"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {source.title}
                </a>
                {source.accessedAt && (
                  <span className="ml-1 text-xs text-forest-500">({source.accessedAt})</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
