"use client";

import { useEffect, useState } from "react";
import { agentPage } from "@/lib/agent-page";

/** Hero workspace mock — Agent actively working a residential EV brief */
export default function AgentWorkspaceMock() {
  const mock = agentPage.heroMock;
  const [activeTask, setActiveTask] = useState(4);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveTask((t) => {
        const next = t >= mock.tasks.length - 1 ? 3 : t + 1;
        return next;
      });
    }, 2200);
    return () => window.clearInterval(id);
  }, [mock.tasks.length]);

  return (
    <div className="agent-workspace overflow-hidden rounded-2xl border border-border bg-[#0c0f12] text-left shadow-[0_24px_80px_-24px_rgba(15,23,42,0.45)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-charge-500" aria-hidden />
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
            Precifarm Agent
          </p>
        </div>
        <p className="truncate font-mono text-[11px] text-white/45 sm:text-xs">
          Project · {mock.project}
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="border-b border-white/10 p-4 sm:p-5 lg:border-b-0 lg:border-r">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">User</p>
          <div className="mt-3 space-y-1 font-mono text-[13px] leading-relaxed text-white/85">
            {mock.user.map((line, i) =>
              line === "" ? (
                <div key={`sp-${i}`} className="h-2" />
              ) : (
                <p key={i}>{line}</p>
              ),
            )}
          </div>

          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-charge-400">Agent</p>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{mock.agentLead}</p>
            <ul className="mt-4 space-y-2">
              {mock.tasks.map((task, i) => {
                const done = i < activeTask;
                const current = i === activeTask;
                return (
                  <li
                    key={task.label}
                    className={`flex items-start gap-2.5 font-mono text-[12px] sm:text-[13px] ${
                      done || current ? "text-white/90" : "text-white/35"
                    }`}
                  >
                    <span
                      className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border text-[10px] ${
                        done
                          ? "border-link/40 bg-link/20 text-link"
                          : current
                            ? "border-charge-400/50 bg-charge-500/20 text-charge-300 agent-task-pulse"
                            : "border-white/15 text-transparent"
                      }`}
                      aria-hidden
                    >
                      {done ? "✓" : current ? "→" : ""}
                    </span>
                    <span>{task.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="bg-white/[0.03] p-4 sm:p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Current analysis
          </p>
          <dl className="mt-4 space-y-2.5">
            {mock.analysis.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-2 font-mono text-[12px] sm:text-[13px]"
              >
                <dt className="text-white/45">{row.label}</dt>
                <dd className="text-right text-white/90">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex flex-wrap gap-2">
            {mock.tabs.map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => setTab(i)}
                className={`rounded-md px-3 py-1.5 font-mono text-[11px] transition-colors ${
                  tab === i
                    ? "bg-white text-forest-900"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="mt-4 font-mono text-[11px] leading-relaxed text-white/40">
            {tab === 0 && "EV energy and charge-time calcs · inputs you can check"}
            {tab === 1 && "System sketch — still needs supply check on site"}
            {tab === 2 && "Draft parts list: Pulse 7 kW · Pod 10 kWh · protection TBD"}
          </p>
        </div>
      </div>
    </div>
  );
}
