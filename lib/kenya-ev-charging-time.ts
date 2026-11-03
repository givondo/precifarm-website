export type ChargingTime = {
  home?: string;
  dc?: string;
  swap?: string;
};

/** Typical daily top-up (about 60 km, about 12 kWh from the meter) on a Pulse charger at home; DC where applicable */
export function carCharge(dc: string, home = "Under 2 h"): ChargingTime {
  return { home, dc };
}

export function bikeCharge(swap: string, home: string): ChargingTime {
  return { swap, home };
}
