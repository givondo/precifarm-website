type Step = { id: string; label: string };

export default function StepIndicator({
  steps,
  currentIndex,
}: {
  steps: Step[];
  currentIndex: number;
}) {
  const current = steps[currentIndex];

  return (
    <div>
      <div className="flex items-center gap-1">
        {steps.map((step, i) => (
          <div key={step.id} className="flex flex-1 items-center gap-1">
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors ${
                i < currentIndex
                  ? "bg-charge-600 text-white"
                  : i === currentIndex
                    ? "bg-charge-600 text-white ring-2 ring-charge-500/25 ring-offset-1"
                    : "bg-muted text-forest-400"
              }`}
            >
              {i < currentIndex ? (
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span
              className={`hidden text-[11px] font-medium sm:inline ${
                i === currentIndex ? "text-forest-900" : i < currentIndex ? "text-forest-700" : "text-forest-400"
              }`}
            >
              {step.label}
            </span>
            {i < steps.length - 1 && (
              <div
                className={`mx-0.5 h-0.5 flex-1 rounded-full transition-colors ${
                  i < currentIndex ? "bg-charge-500" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      {current && (
        <p className="mt-2 text-xs font-medium text-forest-500 sm:hidden">
          Step {currentIndex + 1} of {steps.length}: {current.label}
        </p>
      )}
    </div>
  );
}
