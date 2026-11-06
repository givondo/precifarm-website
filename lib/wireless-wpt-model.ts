/**
 * Illustrative model for the wireless charging research showcase on /research.
 *
 * NOT Precifarm data. The engineering register records wireless transfer efficiency as "Not yet measured"
 * (WPT-04). Parameters below are chosen to show the shape of the physics, not fitted to any coil:
 *
 *  - Coupling falls with air gap:      k0(g) = K_REF * exp(-(g - G_REF) / GAP_DECAY)
 *  - Coupling falls with misalignment:  k = k0(g) * exp(-(x² + y²) / (2 * SIGMA²))
 *  - Coil-to-coil efficiency upper bound for a two-coil resonant link with equal coil quality factors Q,
 *    the standard result for optimal load matching: eta = U² / (1 + sqrt(1 + U²))², with U = k * Q.
 *
 * The efficiency is for the coils only; power electronics, compensation losses, rectifier and battery are
 * outside it and are labelled "not modelled" on the page.
 */

export const wptModel = {
  K_REF: 0.25,
  G_REF_MM: 100,
  GAP_DECAY_MM: 120,
  SIGMA_MM: 100,
  /** Alignment window used by the simulated controller (illustrative, not a design value) */
  WINDOW_MM: 100,
  /** How far the visitor can move the car from centre, each axis */
  RANGE_MM: 250,
  GAP_MIN_MM: 100,
  GAP_MAX_MM: 250,
  Q_MIN: 50,
  Q_MAX: 500,
  Q_DEFAULT: 200,
  GAP_DEFAULT_MM: 150,
  /** Pad sizes in the drawing only */
  GROUND_PAD_MM: 500,
  RECEIVER_PAD_MM: 400,
} as const;

export function couplingAtGap(gapMm: number) {
  return wptModel.K_REF * Math.exp(-(gapMm - wptModel.G_REF_MM) / wptModel.GAP_DECAY_MM);
}

export function coupling(xMm: number, yMm: number, gapMm: number) {
  return couplingAtGap(gapMm) * Math.exp(-(xMm ** 2 + yMm ** 2) / (2 * wptModel.SIGMA_MM ** 2));
}

/** Maximum coil-to-coil efficiency for coupling k and equal coil quality factor q. */
export function linkEfficiency(k: number, q: number) {
  const u2 = (k * q) ** 2;
  return u2 / (1 + Math.sqrt(1 + u2)) ** 2;
}

export type WptState = "transferring" | "trimmed" | "outside" | "foreign-object";

export function simulate({ x, y, gap, q, foreignObject }: { x: number; y: number; gap: number; q: number; foreignObject: boolean }) {
  const k = coupling(x, y, gap);
  const kCentre = couplingAtGap(gap);
  const relative = k / kCentre;
  const inside = Math.abs(x) <= wptModel.WINDOW_MM && Math.abs(y) <= wptModel.WINDOW_MM;
  const state: WptState = foreignObject ? "foreign-object" : !inside ? "outside" : x === 0 && y === 0 ? "transferring" : "trimmed";
  const transferring = state === "transferring" || state === "trimmed";
  return {
    k,
    kCentre,
    relative,
    efficiency: linkEfficiency(k, q),
    efficiencyCentre: linkEfficiency(kCentre, q),
    state,
    transferring,
    /** Share of rated power the simulated controller allows: follows relative coupling inside the window. */
    power: transferring ? relative : 0,
  };
}

export const wptStateCopy: Record<WptState, string> = {
  transferring: "Centred over the pad. Full transfer in the model.",
  trimmed: "Inside the alignment window. Coupling drops, so the simulated controller trims power.",
  outside: "Outside the alignment window. Transfer stops until the car is repositioned.",
  "foreign-object": "Metal object on the pad. Foreign object detection stops transfer before it heats.",
};
