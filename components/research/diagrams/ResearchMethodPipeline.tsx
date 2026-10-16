import { researchMethod } from "@/lib/research-page";

export default function ResearchMethodPipeline() {
  return (
    <ol className="mt-10 grid gap-0 sm:grid-cols-3 sm:gap-y-8 lg:grid-cols-6">
      {researchMethod.map((stage, i) => (
        <li key={stage.id} className="relative flex gap-3 pb-6 sm:block sm:pb-0 sm:pr-4">
          {i < researchMethod.length - 1 ? (
            <span
              aria-hidden
              className={`absolute left-5 top-10 bottom-0 w-px bg-charge-200 sm:left-12 sm:right-0 sm:top-5 sm:bottom-auto sm:h-px sm:w-auto ${
                i === 2 ? "sm:hidden lg:block" : ""
              }`}
            />
          ) : null}
          <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-charge-600 bg-white font-mono text-xs font-semibold text-charge-700">
            {stage.step}
          </span>
          <div className="sm:mt-3">
            <p className="text-sm font-semibold text-forest-900">{stage.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-forest-600">{stage.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
