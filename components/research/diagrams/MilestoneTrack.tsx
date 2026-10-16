import type { MilestoneStatus, ResearchMilestone } from "@/lib/research-page";

const statusLabel: Record<MilestoneStatus, string> = {
  demonstrated: "Demonstrated",
  published: "Published",
  early_access: "Early access",
  planned: "Planned",
};

const legendOrder: readonly MilestoneStatus[] = ["demonstrated", "published", "early_access", "planned"];

function isEvidenced(status: MilestoneStatus) {
  return status !== "planned";
}

function nodeClass(status: MilestoneStatus) {
  if (status === "planned") return "border-dashed border-forest-300 bg-white text-forest-400";
  if (status === "early_access") return "border-forest-700 bg-white text-forest-800";
  return "border-charge-600 bg-charge-600 text-white";
}

export default function MilestoneTrack({ milestones }: { milestones: readonly ResearchMilestone[] }) {
  const evidenced = milestones.filter((gate) => isEvidenced(gate.status)).length;
  const present = new Set(milestones.map((gate) => gate.status));

  return (
    <figure className="mt-10 rounded-xl border border-border bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
        <figcaption className="text-sm text-forest-700">
          <span className="font-semibold text-forest-900">
            {evidenced} of {milestones.length}
          </span>{" "}
          gates reached
        </figcaption>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-forest-500">
          {legendOrder
            .filter((status) => present.has(status))
            .map((status) => (
              <span key={status} className="inline-flex items-center gap-1.5">
                <span aria-hidden className={`h-3 w-3 rounded-full border-2 ${nodeClass(status)}`} />
                {statusLabel[status]}
              </span>
            ))}
        </div>
      </div>

      <ol className="grid gap-0 px-4 py-5 sm:grid-cols-5 sm:px-5">
        {milestones.map((gate, i) => {
          const next = milestones[i + 1];
          const lineSolid = isEvidenced(gate.status) && next && isEvidenced(next.status);
          return (
            <li key={gate.id} className="relative flex gap-3 pb-5 sm:block sm:pb-0 sm:pr-4">
              {next ? (
                <span
                  aria-hidden
                  className={`absolute left-4 top-9 bottom-0 w-px sm:left-9 sm:right-0 sm:top-4 sm:bottom-auto sm:h-px sm:w-auto ${
                    lineSolid ? "bg-charge-600" : "border-l border-dashed border-forest-200 sm:border-l-0 sm:border-t"
                  }`}
                />
              ) : null}
              <span
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-mono text-xs font-semibold ${nodeClass(gate.status)}`}
                aria-hidden
              >
                {i + 1}
              </span>
              <div className="sm:mt-3">
                <p className="text-sm font-medium leading-snug text-forest-900">
                  <span className="sr-only">Gate {i + 1}: </span>
                  {gate.title}
                </p>
                <p
                  className={`mt-1 text-[11px] font-semibold uppercase tracking-wide ${
                    isEvidenced(gate.status) ? "text-charge-700" : "text-forest-400"
                  }`}
                >
                  {statusLabel[gate.status]}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-forest-600">{gate.acceptance}</p>
                {gate.evidence ? (
                  <p className="mt-1 text-xs leading-relaxed text-forest-800">
                    <span className="font-medium">Evidence: </span>
                    {gate.evidence}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
