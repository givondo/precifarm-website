"use client";

import Link from "next/link";
import { Fragment, useEffect, useId, useMemo, useState } from "react";
import EvidenceChip from "@/components/agent/EvidenceChip";
import SystemDiagram from "@/components/agent/SystemDiagram";
import styles from "@/components/agent/workspace.module.css";
import StageLabel from "@/components/interior/StageLabel";
import { agentPublic } from "@/lib/agent/public";
import { workspaceBriefs, type WorkspaceRun, type WorkspaceTask } from "@/lib/agent-workspace";
import { useInView } from "@/lib/use-in-view";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Precifarm Agent workspace demonstration. The plan for each example brief is scripted; every number is
 * computed in the browser by the same engineering tools the live Agent calls. Changing the brief re-runs
 * the tools at once; "Run the plan" replays the sequence.
 */

const STEP_MS = 430;

function fmtArgs(args: Record<string, unknown>) {
  return Object.entries(args)
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? `[${v.join(", ")}]` : typeof v === "string" ? `"${v}"` : String(v)}`)
    .join(", ");
}

function resultText(run: WorkspaceRun) {
  return [
    `Precifarm Agent: ${run.project}`,
    `Brief: ${run.prompt}`,
    "",
    run.result.headline,
    run.result.status.text,
    "",
    ...run.result.figures.map((f) => `${f.label}: ${f.value} (${f.label2})`),
    "",
    "Parts:",
    ...run.parts.map((p) => `- ${p.qty} x ${p.item}: ${p.spec} [${p.label}]`),
    "",
    "Checks before install:",
    ...run.result.checks.map((c) => `- ${c}`),
    "",
    "Calculation trace:",
    ...run.tasks.map((t) => `- ${t.tool}(${fmtArgs(t.args)}) -> ${t.result.summary} [${t.result.label}]`),
    "",
    "Scripted demonstration from precifarm.com/agent. Numbers from the Precifarm engineering tool kernel. Assumptions are example values.",
  ].join("\n");
}

function StatusIcon({ state }: { state: "done" | "running" | "queued" }) {
  if (state === "done")
    return (
      <span aria-hidden className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-400/20 text-brand-300 ring-1 ring-brand-400/40">
        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2.5 6.2 5 8.5l4.5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  if (state === "running") return <span aria-hidden className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1 ring-amber-300/60 ${styles.running}`}><span className="h-1.5 w-1.5 rounded-full bg-amber-200" /></span>;
  return <span aria-hidden className="h-5 w-5 shrink-0 rounded-full ring-1 ring-white/20" />;
}

function Panel({ step, title, meta, state, children }: { step: string; title: string; meta?: React.ReactNode; state: "done" | "queued"; children: React.ReactNode }) {
  return (
    <section className={`rounded-2xl border border-white/10 bg-white/[0.025] ${styles.reveal} ${state === "queued" ? styles.queued : ""}`} aria-label={title}>
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3 sm:px-5">
        <p className="flex items-center gap-2.5">
          <span className="font-mono text-[11px] text-brand-300">{step}</span>
          <span className="text-sm font-semibold text-white">{title}</span>
        </p>
        {meta}
      </header>
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

function CalcRow({ t, state }: { t: WorkspaceTask; state: "done" | "running" | "queued" }) {
  return (
    <li className={`border-t border-white/[0.07] py-3 first:border-t-0 first:pt-0 ${styles.reveal} ${state === "queued" ? styles.queued : ""}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-[13px] text-white/70">{t.task}</p>
        <div className="flex items-center gap-2">
          <p className="font-mono text-[15px] font-semibold text-white">{state === "queued" ? "..." : t.headline}</p>
          {state === "done" ? <EvidenceChip label={t.result.label} /> : null}
        </div>
      </div>
      <details className="group mt-1.5">
        <summary className="inline-flex min-h-8 cursor-pointer list-none items-center gap-1.5 font-mono text-[11px] text-white/55 hover:text-white/85 [&::-webkit-details-marker]:hidden">
          <span aria-hidden className="transition-transform group-open:rotate-90">›</span>
          {t.tool}()
        </summary>
        <div className="mt-2 rounded-lg border border-white/[0.08] bg-black/25 p-3">
          <p className="break-words font-mono text-[11.5px] leading-relaxed text-sky-200/90">
            {t.tool}({fmtArgs(t.args)})
          </p>
          <p className="mt-2 text-[12.5px] leading-snug text-white/80">{t.result.summary}</p>
          {t.result.notes?.length ? (
            <ul className="mt-2 space-y-1">
              {t.result.notes.map((nt) => (
                <li key={nt} className="text-[11.5px] leading-snug text-white/55">
                  · {nt}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </details>
    </li>
  );
}

export default function EngineeringWorkspace() {
  const [briefId, setBriefId] = useState(workspaceBriefs[0].id);
  const [values, setValues] = useState<Record<string, Record<string, number>>>(() =>
    Object.fromEntries(workspaceBriefs.map((b) => [b.id, { ...b.defaults }])),
  );
  const [progress, setProgress] = useState(0);
  const [animating, setAnimating] = useState(true);
  const [replay, setReplay] = useState(0);
  const [copied, setCopied] = useState(false);
  const reduced = usePrefersReducedMotion();
  // Observe the compact workspace bar, not the whole (very tall on phones) workspace.
  const [ref, inView] = useInView<HTMLDivElement>(0.5);
  const uid = useId();

  const brief = workspaceBriefs.find((b) => b.id === briefId)!;
  const run = useMemo(() => brief.run(values[brief.id]), [brief, values]);
  const total = run.tasks.length + 3;

  useEffect(() => {
    if (!inView || !animating || reduced) return;
    const timers = Array.from({ length: total }, (_, i) =>
      window.setTimeout(() => {
        setProgress(i + 1);
        if (i + 1 === total) setAnimating(false);
      }, (i + 1) * STEP_MS),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [inView, animating, reduced, total, replay]);

  const shown = reduced || !animating ? total : progress;
  const taskState = (i: number) => (i < shown ? "done" : i === shown ? "running" : "queued");
  const diagramLive = shown > run.tasks.length;
  const partsShown = shown > run.tasks.length + 1;
  const resultShown = shown >= total;

  const startRun = () => {
    setProgress(0);
    setAnimating(true);
    setReplay((r) => r + 1);
  };

  const chooseBrief = (id: string) => {
    if (id === briefId) return;
    setBriefId(id);
    startRun();
  };

  const setValue = (key: string, v: number) => {
    setValues((all) => ({ ...all, [brief.id]: { ...all[brief.id], [key]: v } }));
    setAnimating(false);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(resultText(run));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  const done = run.tasks.filter((_, i) => taskState(i) === "done").length;

  return (
    <figure aria-label="Precifarm Agent workspace: a worked engineering brief" className="overflow-hidden rounded-[1.5rem] border border-forest-900 bg-[#0c0f12] text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.6)]">
      {/* Workspace bar */}
      <div ref={ref} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-brand-400" />
          <p className="shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">Precifarm Agent</p>
          <p className="min-w-0 truncate font-mono text-[11px] text-white/55">· {run.project}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StageLabel kind="simulation" label="Scripted demonstration" tone="dark" />
          <StageLabel kind="available" label="Live tool kernel" tone="dark" />
        </div>
      </div>

      {/* Brief picker */}
      <div className="border-b border-white/10 px-4 py-3 sm:px-6">
        <div role="group" aria-label="Example brief" className="flex gap-1 overflow-x-auto rounded-full bg-white/[0.05] p-1 [scrollbar-width:none] sm:inline-flex">
          {workspaceBriefs.map((b) => (
            <button
              key={b.id}
              type="button"
              aria-pressed={b.id === briefId}
              onClick={() => chooseBrief(b.id)}
              className={`min-h-10 shrink-0 rounded-full px-4 text-[13px] font-semibold transition-colors ${
                b.id === briefId ? "bg-white text-forest-950" : "text-white/70 hover:text-white"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-px bg-white/10 lg:grid-cols-[minmax(0,21.5rem)_minmax(0,1fr)]">
        {/* Brief and plan */}
        <div className="bg-[#0c0f12] p-4 sm:p-6">
          <div className="lg:sticky lg:top-[calc(var(--site-header-height,4rem)+1rem)]">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/55">01 · Brief</p>
            <blockquote className="mt-2 text-[15px] leading-relaxed text-white/90">“{run.prompt}”</blockquote>

            <div className="mt-5 space-y-4">
              {brief.controls.map((c) => {
                const v = values[brief.id][c.id];
                const inputId = `${uid}-${c.id}`;
                return (
                  <div key={c.id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <label htmlFor={inputId} className="text-[13px] text-white/75">
                        {c.label}
                      </label>
                      <output htmlFor={inputId} className="font-mono text-[13px] text-white">
                        {v} {c.unit}
                      </output>
                    </div>
                    <input
                      id={inputId}
                      type="range"
                      min={c.min}
                      max={c.max}
                      step={c.step}
                      value={v}
                      onChange={(e) => setValue(c.id, Number(e.target.value))}
                      className="mt-1.5 w-full accent-brand-400"
                    />
                  </div>
                );
              })}
            </div>

            <details className="group mt-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-2 px-3 text-[12px] text-white/70 [&::-webkit-details-marker]:hidden">
                <span>Assumptions in this brief ({run.assumptions.length})</span>
                <span aria-hidden className="transition-transform group-open:rotate-90">›</span>
              </summary>
              <ul className="space-y-1.5 border-t border-white/10 px-3 py-3">
                {run.assumptions.map((a) => (
                  <li key={a} className="flex items-start justify-between gap-3 text-[12px] leading-snug text-white/70">
                    <span>{a}</span>
                    <EvidenceChip label="assumed" />
                  </li>
                ))}
              </ul>
            </details>

            <div className="mt-6 flex items-baseline justify-between gap-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/55">02 · Task plan</p>
              <p className="font-mono text-[11px] text-white/55" aria-live="polite">
                {done}/{run.tasks.length} tools run
              </p>
            </div>
            <ol className="mt-3 space-y-1">
              {run.tasks.map((t, i) => {
                const state = taskState(i);
                return (
                  <Fragment key={t.id}>
                    <li className={`flex items-center gap-2.5 rounded-lg px-1 py-1.5 ${state === "queued" ? "opacity-55" : ""}`}>
                      <StatusIcon state={state} />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13px] leading-tight text-white/90">{t.task}</span>
                        <span className="block truncate font-mono text-[10.5px] text-white/50">{t.tool}()</span>
                      </span>
                      <span className="sr-only">{state === "done" ? "done" : state === "running" ? "running" : "queued"}</span>
                    </li>
                    {run.derived?.after === t.id && state === "done" ? (
                      <li className="ml-7 rounded-lg border border-amber-300/25 bg-amber-300/[0.06] px-2.5 py-2 text-[12px] leading-snug text-amber-100/90">
                        {run.derived.text}
                      </li>
                    ) : null}
                  </Fragment>
                );
              })}
            </ol>

            <button
              type="button"
              onClick={startRun}
              className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/20 px-4 text-xs font-semibold text-white/85 transition-colors hover:border-white/45 hover:text-white"
            >
              <span aria-hidden>▶</span> Run the plan again
            </button>
          </div>
        </div>

        {/* Outputs */}
        <div className="space-y-4 bg-[#0c0f12] p-4 sm:space-y-5 sm:p-6">
          <Panel step="03" title="Engineering calculations" state="done" meta={<span className="font-mono text-[11px] text-white/50">open any row for its trace</span>}>
            <ol>
              {run.tasks.map((t, i) => (
                <CalcRow key={t.id} t={t} state={taskState(i)} />
              ))}
            </ol>
          </Panel>

          <Panel step="04" title="System diagram" state={diagramLive ? "done" : "queued"}>
            <SystemDiagram nodes={run.diagram.nodes} edges={run.diagram.edges} live={diagramLive} title={`${run.project}: single line diagram`} caption={run.diagram.caption} />
          </Panel>

          <Panel step="05" title="Parts list" state={partsShown ? "done" : "queued"} meta={<span className="font-mono text-[11px] text-white/50">{run.parts.length} lines</span>}>
            <ul className="divide-y divide-white/[0.07] sm:hidden">
              {run.parts.map((p) => (
                <li key={p.item} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[14px] font-semibold text-white">{p.item}</p>
                    <p className="shrink-0 font-mono text-[13px] text-white">{p.qty}</p>
                  </div>
                  <p className="mt-1 text-[12.5px] leading-snug text-white/70">{p.spec}</p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <span className="font-mono text-[10.5px] text-white/50">{p.source}</span>
                    <EvidenceChip label={p.label} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full text-left text-[13px]">
                <caption className="sr-only">Parts list for {run.project}</caption>
                <thead>
                  <tr className="border-b border-white/10 font-mono text-[10.5px] uppercase tracking-wider text-white/50">
                    <th scope="col" className="py-2 pr-3 font-normal">Item</th>
                    <th scope="col" className="py-2 pr-3 font-normal">Specification</th>
                    <th scope="col" className="py-2 pr-3 text-right font-normal">Qty</th>
                    <th scope="col" className="py-2 pr-3 font-normal">Source</th>
                    <th scope="col" className="py-2 font-normal">Evidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.07]">
                  {run.parts.map((p) => (
                    <tr key={p.item} className="align-top">
                      <th scope="row" className="py-2.5 pr-3 font-semibold text-white">{p.item}</th>
                      <td className="py-2.5 pr-3 leading-snug text-white/72">{p.spec}</td>
                      <td className="whitespace-nowrap py-2.5 pr-3 text-right font-mono text-white">{p.qty}</td>
                      <td className="py-2.5 pr-3 font-mono text-[11px] text-white/50">{p.source}</td>
                      <td className="py-2.5">
                        <EvidenceChip label={p.label} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel step="06" title="Traceable result" state={resultShown ? "done" : "queued"} meta={<span className="font-mono text-[11px] text-white/50">{run.tasks.length} tool calls</span>}>
            <p className="text-[17px] font-semibold leading-snug text-white sm:text-lg">{run.result.headline}</p>
            <p
              className={`mt-3 flex gap-2.5 rounded-xl border px-3.5 py-3 text-[13px] leading-snug ${
                run.result.status.ok ? "border-brand-400/30 bg-brand-400/[0.08] text-brand-100" : "border-amber-300/35 bg-amber-300/[0.08] text-amber-100"
              }`}
            >
              <span aria-hidden className={`mt-1 h-2 w-2 shrink-0 rounded-full ${run.result.status.ok ? "bg-brand-300" : "bg-amber-300"}`} />
              {run.result.status.text}
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-4">
              {run.result.figures.map((f) => (
                <div key={f.label} className="bg-[#10151c] px-3.5 py-3">
                  <dt className="text-[11px] text-white/60">{f.label}</dt>
                  <dd className="mt-1 font-mono text-[15px] font-semibold text-white">{f.value}</dd>
                  <dd className="mt-1.5">
                    <EvidenceChip label={f.label2} />
                  </dd>
                </div>
              ))}
            </dl>
            {run.result.checks.length ? (
              <div className="mt-4">
                <p className="text-[12px] font-semibold text-white/85">Before install, an engineer confirms</p>
                <ul className="mt-2 space-y-1.5">
                  {run.result.checks.map((c) => (
                    <li key={c} className="flex gap-2 text-[12.5px] leading-snug text-white/68">
                      <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-rose-300" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href={`${agentPublic.chatPath}?brief=${encodeURIComponent(run.prompt)}`}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-forest-950 transition-colors hover:bg-brand-50"
              >
                Send this brief to the live Agent
              </Link>
              <button
                type="button"
                onClick={() => void copy()}
                className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-5 text-sm font-semibold text-white/85 hover:border-white/45 hover:text-white"
              >
                {copied ? "Copied" : "Copy result and trace"}
              </button>
            </div>
          </Panel>

          <p className="text-[12px] leading-relaxed text-white/55">
            The plan and its order are scripted for this example. The numbers are not: each one is computed now, in your browser, by the
            same tool functions the live Agent calls on the server. Brief inputs and assumptions are example values, not a quote.
          </p>
        </div>
      </div>
    </figure>
  );
}
