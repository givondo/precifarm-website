export type ChargingTime = {
  home?: string;
  dc?: string;
  swap?: string;
};

/** Illustrative daily top-up on Pulse charger at home; DC where applicable */
export function carCharge(dc: string, home = "90 min"): ChargingTime {
  return { home, dc };
}

export function bikeCharge(swap: string, home: string): ChargingTime {
  return { swap, home };
}
