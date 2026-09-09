"use client";

import { useEffect, useState } from "react";
import { agentPage } from "@/lib/agent-page";

export default function AgentWorkflowStrip() {
  const stages = agentPage.differentiation.stages;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % stages.length);
    }, 1600);
    return () => window.clearInterval(id);
  }, [stages.length]);

  return (
    <ol className="mt-10 grid gap-2 sm:grid-cols-4 lg:grid-cols-8">
      {stages.map((stage, i) => {
        const on = i <= active;
        const current = i === active;
        return (
          <li
            key={stage}
            className={`relative rounded-xl border px-3 py-4 transition-colors duration-500 ${
              current
                ? "border-charge-500/40 bg-charge-50"
                : on
                  ? "border-border bg-white"
                  : "border-border/70 bg-muted/30"
            }`}
          >
            <span className="font-mono text-[10px] text-forest-400">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p
              className={`mt-2 text-sm font-semibold tracking-tight ${
                current ? "text-charge-800" : on ? "text-forest-900" : "text-forest-400"
              }`}
            >
              {stage}
            </p>
            {i < stages.length - 1 && (
              <span
                className="pointer-events-none absolute -right-1 top-1/2 hidden h-px w-2 -translate-y-1/2 bg-border lg:block"
                aria-hidden
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
