/** Display helpers for the charging calculators. */

export function formatHours(h: number): string {
  if (!Number.isFinite(h) || h <= 0) return "0 min";
  const total = Math.round(h * 60);
  const hh = Math.floor(total / 60);
  const mm = total % 60;
  if (hh === 0) return `${mm} min`;
  return mm === 0 ? `${hh} h` : `${hh} h ${mm} min`;
}

/** 24-hour clock for an hour value that may run past midnight. */
export function clock(hours: number): string {
  const total = Math.round((((hours % 24) + 24) % 24) * 60);
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** First number in a register or guide string, e.g. "32 A single phase: up to 7.4 kW" with /up to ([\d.]+) kW/. */
export function firstNumber(text: string, pattern: RegExp): number {
  const m = text.match(pattern);
  if (!m) throw new Error(`No number matching ${pattern} in "${text}"`);
  return Number(m[1]);
}
