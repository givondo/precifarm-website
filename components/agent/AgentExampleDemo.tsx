"use client";

import { useEffect, useState } from "react";
import { agentPage } from "@/lib/agent-page";

export default function AgentExampleDemo() {
  const ex = agentPage.example;
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    if (step >= ex.steps.length) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), 900);
    return () => window.clearTimeout(id);
  }, [step, running, ex.steps.length]);

  function runAgain() {
    setStep(0);
    setRunning(true);
  }

  const showRec = step >= ex.steps.length;

  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-white">
      <div className="border-b border-border bg-muted/30 px-5 py-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-forest-500">Prompt</p>
        <p className="mt-2 text-base font-medium leading-relaxed text-forest-900 sm:text-lg">
          “{ex.prompt}”
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-2">
        <ol className="divide-y divide-border p-5 sm:p-6">
          {ex.steps.map((item, i) => {
            const visible = i < step;
            return (
              <li
                key={item.label}
                className={`flex items-baseline justify-between gap-4 py-3 transition-opacity duration-300 ${
                  visible ? "opacity-100" : "opacity-25"
                }`}
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-forest-400">
                    Step {i + 1}
                  </p>
                  <p className="mt-1 text-sm text-forest-600">{item.label}</p>
                </div>
                <p className="font-mono text-sm font-semibold text-forest-900">{item.value}</p>
              </li>
            );
          })}
        </ol>

        <div className="border-t border-border bg-[#0c0f12] p-5 text-white sm:p-6 lg:border-l lg:border-t-0">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            {ex.recommendation.title}
          </p>
          <div
            className={`mt-4 transition-opacity duration-500 ${showRec ? "opacity-100" : "opacity-30"}`}
          >
            <p className="heading-display text-2xl text-white">{ex.recommendation.charger}</p>
            <p className="mt-2 font-mono text-sm text-white/60">
              Estimated charging time · {ex.recommendation.time}
            </p>
          </div>

          <div className={`mt-8 transition-opacity duration-700 ${showRec ? "opacity-100" : "opacity-0"}`}>
            <p className="text-sm font-semibold text-white/90">{ex.continueTitle}</p>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {ex.continueChecks.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-white/10 bg-white/5 px-2.5 py-2 font-mono text-[11px] text-white/70"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <button type="button" onClick={runAgain} className="btn-primary">
              Run again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
