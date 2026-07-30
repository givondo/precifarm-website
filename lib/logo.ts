/** Standard logo dimensions — mark ≈ 60% of 60px header bar; footer slightly smaller */
export const logoSizes = {
  header: {
    mark: 36,
    word: 17,
    gap: 6,
    curveGap: 2,
    curveStroke: 1.6,
  },
  footer: {
    mark: 32,
    word: 15,
    gap: 5,
    curveGap: 2,
    curveStroke: 1.5,
  },
} as const;

export type LogoSize = keyof typeof logoSizes;

export function resolveLogoMetrics(size: LogoSize | number) {
  if (typeof size === "number") {
    const mark = Math.round(size);
    const word = Math.round(mark * 0.47);
    return {
      mark,
      word,
      gap: Math.round(mark * 0.17),
      curveGap: 2,
      curveStroke: mark >= 34 ? 1.6 : 1.5,
    };
  }

  return logoSizes[size];
}
