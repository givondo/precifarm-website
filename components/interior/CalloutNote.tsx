import type { ReactNode } from "react";

/** Quiet note for what a figure, visual or status means. Not a warning banner. */
export default function CalloutNote({ title, children, tone = "light" }: { title?: string; children: ReactNode; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <aside className={`rounded-2xl border-l-2 px-4 py-3.5 text-sm leading-relaxed sm:px-5 ${dark ? "border-brand-400 bg-white/[0.04] text-white/75" : "border-charge-600 bg-[#f6f7f8] text-forest-700"}`}>
      {title ? <p className={`mb-1 font-semibold ${dark ? "text-white" : "text-forest-900"}`}>{title}</p> : null}
      {children}
    </aside>
  );
}
