function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Bold, code and links. Text is escaped first, and links may only point at site paths or https URLs. */
export function formatInline(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(((?:\/(?!\/)|https:\/\/)[^\s)]*)\)/g, (_m, label: string, href: string) =>
      href.startsWith("/")
        ? `<a href="${href}" class="text-link font-medium">${label}</a>`
        : `<a href="${href}" class="text-link font-medium" rel="noopener">${label}</a>`,
    );
}
