export type FlowStep = { title: string; text: string; meta?: string };

/** Numbered process: a vertical rail on phones, a horizontal sequence from lg up. */
export default function StepFlow({ steps, tone = "light" }: { steps: readonly FlowStep[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const cols = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-6" } as Record<number, string>;
  return (
    <ol className={`relative grid gap-6 lg:gap-5 ${cols[steps.length] ?? "lg:grid-cols-4"}`}>
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-4 lg:flex-col lg:gap-0">
          <div className="flex flex-col items-center lg:flex-row">
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold ${
                dark ? "bg-brand-400/20 text-brand-300 ring-1 ring-brand-400/40" : "bg-forest-950 text-white"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            {i < steps.length - 1 ? (
              <span aria-hidden className={`mt-2 w-px flex-1 lg:ml-3 lg:mt-0 lg:h-px lg:w-auto ${dark ? "bg-white/15" : "bg-forest-200"}`} />
            ) : null}
          </div>
          <div className="min-w-0 pb-2 lg:mt-4 lg:pr-3">
            {s.meta ? <p className={`font-mono text-[11px] uppercase tracking-widest ${dark ? "text-white/55" : "text-forest-500"}`}>{s.meta}</p> : null}
            <h3 className={`text-base font-semibold ${dark ? "text-white" : "text-forest-900"}`}>{s.title}</h3>
            <p className={`mt-1.5 text-sm leading-relaxed ${dark ? "text-white/70" : "text-forest-600"}`}>{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
