/** Orthogonal routing between two boxes of size w x h centred on a and b. Used by the hand-built SVG diagrams. */

export type Pt = [number, number];

export function routeOrthogonal(a: Pt, b: Pt, w: number, h: number): Pt[] {
  const [ax, ay] = a;
  const [bx, by] = b;
  const dx = bx - ax;
  const dy = by - ay;
  if (Math.abs(dy) < 8) {
    const s = Math.sign(dx);
    return [
      [ax + (s * w) / 2, ay],
      [bx - (s * w) / 2, by],
    ];
  }
  if (Math.abs(dx) < 8) {
    const s = Math.sign(dy);
    return [
      [ax, ay + (s * h) / 2],
      [bx, by - (s * h) / 2],
    ];
  }
  if (Math.abs(dx) > Math.abs(dy)) {
    const s = Math.sign(dx);
    const x1 = ax + (s * w) / 2;
    const x2 = bx - (s * w) / 2;
    const mx = (x1 + x2) / 2;
    return [
      [x1, ay],
      [mx, ay],
      [mx, by],
      [x2, by],
    ];
  }
  const s = Math.sign(dy);
  const y1 = ay + (s * h) / 2;
  const y2 = by - (s * h) / 2;
  const my = (y1 + y2) / 2;
  return [
    [ax, y1],
    [ax, my],
    [bx, my],
    [bx, y2],
  ];
}

export const pathOf = (pts: Pt[]) => pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
