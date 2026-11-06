import type { ReactNode } from "react";
import { formatInline } from "@/lib/seo/markdown-inline";
import type { MdBlock } from "@/lib/publications";

/**
 * Long-form article typography for guide, FAQ and city bodies. Headings carry stable ids for the
 * table of contents and a visible anchor link; `after` places a figure after a given heading's section.
 */
export default function ArticleBody({ blocks, after = {} }: { blocks: readonly MdBlock[]; after?: Record<string, ReactNode> }) {
  const out: ReactNode[] = [];
  let pendingFigure: ReactNode = null;

  const pushPending = (key: string) => {
    if (pendingFigure) {
      out.push(<div key={`fig-${key}`} className="my-10">{pendingFigure}</div>);
      pendingFigure = null;
    }
  };

  blocks.forEach((b, i) => {
    if (b.kind === "h2" || b.kind === "h3") {
      pushPending(String(i));
      const Tag = b.kind;
      out.push(
        <Tag
          key={b.id}
          id={b.id}
          className={`group scroll-mt-28 font-display font-semibold tracking-tight text-forest-950 ${
            b.kind === "h2" ? "mt-12 text-[1.375rem] leading-snug first:mt-0 sm:text-2xl" : "mt-8 text-lg"
          }`}
        >
          <span dangerouslySetInnerHTML={{ __html: formatInline(b.text) }} />
          <a
            href={`#${b.id}`}
            aria-label="Link to this section"
            className="ml-2 inline-block align-middle text-base font-normal text-forest-300 opacity-0 transition-opacity hover:text-charge-600 focus-visible:opacity-100 group-hover:opacity-100"
          >
            #
          </a>
        </Tag>,
      );
      if (after[b.id]) pendingFigure = after[b.id];
      return;
    }
    if (b.kind === "p") {
      out.push(
        <p
          key={`p-${i}`}
          className="mt-5 text-[1.0625rem] leading-[1.75] text-forest-700 [&_strong]:font-semibold [&_strong]:text-forest-950"
          dangerouslySetInnerHTML={{ __html: formatInline(b.text) }}
        />,
      );
      return;
    }
    if (b.kind !== "ul" && b.kind !== "ol") return;
    const List = b.kind;
    out.push(
      <List
        key={`l-${i}`}
        className={`mt-5 space-y-3 text-[1.0625rem] leading-[1.7] text-forest-700 [&_strong]:font-semibold [&_strong]:text-forest-950 ${
          b.kind === "ol" ? "list-none [counter-reset:step]" : "list-none"
        }`}
      >
        {b.items.map((item, j) => (
          <li key={`${i}-${j}`} className="relative pl-9">
            {b.kind === "ol" ? (
              <span
                aria-hidden
                className="absolute left-0 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-forest-950 font-mono text-[11px] font-semibold text-white"
              >
                {j + 1}
              </span>
            ) : (
              <span aria-hidden className="absolute left-2 top-[0.7em] h-1.5 w-1.5 rounded-full bg-charge-600" />
            )}
            <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          </li>
        ))}
      </List>,
    );
  });
  pushPending("end");

  return <div className="article-body">{out}</div>;
}
