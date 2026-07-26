/** Simple markdown subset renderer for CMS guide bodies — no external deps */

type MarkdownContentProps = { md: string };

export default function MarkdownContent({ md }: MarkdownContentProps) {
  const lines = md.split("\n");
  const nodes: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listOrdered = false;
  let key = 0;

  const flushList = () => {
    if (listItems.length === 0) return;
    const ListTag = listOrdered ? "ol" : "ul";
    nodes.push(
      <ListTag key={`list-${key++}`} className="my-4 list-inside space-y-2 text-sm text-forest-600">
        {listItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ListTag>,
    );
    listItems = [];
    listOrdered = false;
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      nodes.push(
        <h2 key={`h2-${key++}`} className="mt-8 text-xl font-semibold text-forest-900">
          {trimmed.slice(3)}
        </h2>,
      );
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      nodes.push(
        <h3 key={`h3-${key++}`} className="mt-6 text-lg font-semibold text-forest-900">
          {trimmed.slice(4)}
        </h3>,
      );
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      listOrdered = true;
      listItems.push(trimmed.replace(/^\d+\.\s/, ""));
      continue;
    }

    if (trimmed.startsWith("- ")) {
      listItems.push(trimmed.slice(2));
      continue;
    }

    flushList();
    nodes.push(
      <p
        key={`p-${key++}`}
        className="mt-4 text-sm leading-relaxed text-forest-600"
        dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
      />,
    );
  }

  flushList();
  return <>{nodes}</>;
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}
