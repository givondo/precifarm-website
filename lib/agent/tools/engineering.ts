/** Deterministic engineering tools — Agent orchestrates; these run the maths. */

export type ToolResult = {
  label: "calculated" | "estimated" | "assumed";
  summary: string;
  data: Record<string, number | string>;
};

export const engineeringToolDefinitions = [
  {
    type: "function" as const,
    function: {
      name: "calculateEvEnergy",
      description: "Daily EV energy from distance and consumption per 100 km.",
      parameters: {
        type: "object",
        properties: {
          dailyKm: { type: "number", description: "Typical daily driving in km" },
          kwhPer100km: { type: "number", description: "Vehicle consumption kWh/100 km" },
        },
        required: ["dailyKm", "kwhPer100km"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "calculateChargingTime",
      description: "Hours to deliver energy at a given charger power (ideal, no losses).",
      parameters: {
        type: "object",
        properties: {
          kwh: { type: "number", description: "Energy to deliver in kWh" },
          chargerKw: { type: "number", description: "Charger power in kW" },
        },
        required: ["kwh", "chargerKw"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "calculatePeakLoad",
      description: "Rough peak load estimate from listed appliance powers in kW.",
      parameters: {
        type: "object",
        properties: {
          loadsKw: {
            type: "array",
            items: { type: "number" },
            description: "Simultaneous load items in kW",
          },
          diversityFactor: {
            type: "number",
            description: "0–1 diversity applied to sum (default 0.7)",
          },
        },
        required: ["loadsKw"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "calculateEnergyCost",
      description: "Daily energy cost from kWh and tariff.",
      parameters: {
        type: "object",
        properties: {
          kwhPerDay: { type: "number" },
          kesPerKwh: { type: "number", description: "Kenya tariff KES/kWh" },
        },
        required: ["kwhPerDay", "kesPerKwh"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "sizeBattery",
      description: "Simple backup size from critical load kW and hours.",
      parameters: {
        type: "object",
        properties: {
          criticalLoadKw: { type: "number" },
          backupHours: { type: "number" },
          roundToKwh: { type: "number", description: "Round up to module size (e.g. 5 or 10)" },
        },
        required: ["criticalLoadKw", "backupHours"],
      },
    },
  },
] as const;

type EvEnergyArgs = { dailyKm: number; kwhPer100km: number };
type ChargingTimeArgs = { kwh: number; chargerKw: number };
type PeakLoadArgs = { loadsKw: number[]; diversityFactor?: number };
type EnergyCostArgs = { kwhPerDay: number; kesPerKwh: number };
type BatteryArgs = { criticalLoadKw: number; backupHours: number; roundToKwh?: number };

export function runEngineeringTool(name: string, args: unknown): ToolResult {
  switch (name) {
    case "calculateEvEnergy": {
      const { dailyKm, kwhPer100km } = args as EvEnergyArgs;
      const kwhPerDay = (dailyKm * kwhPer100km) / 100;
      return {
        label: "calculated",
        summary: `${dailyKm} km/day at ${kwhPer100km} kWh/100 km → ${kwhPerDay.toFixed(2)} kWh/day`,
        data: { dailyKm, kwhPer100km, kwhPerDay: Number(kwhPerDay.toFixed(2)) },
      };
    }
    case "calculateChargingTime": {
      const { kwh, chargerKw } = args as ChargingTimeArgs;
      const hours = kwh / chargerKw;
      return {
        label: "calculated",
        summary: `${kwh} kWh at ${chargerKw} kW → ${hours.toFixed(2)} h (ideal)`,
        data: { kwh, chargerKw, hours: Number(hours.toFixed(2)) },
      };
    }
    case "calculatePeakLoad": {
      const { loadsKw, diversityFactor = 0.7 } = args as PeakLoadArgs;
      const sum = loadsKw.reduce((a, b) => a + b, 0);
      const peakKw = sum * diversityFactor;
      return {
        label: "estimated",
        summary: `Sum ${sum.toFixed(2)} kW × diversity ${diversityFactor} → ~${peakKw.toFixed(2)} kW peak`,
        data: { sumKw: Number(sum.toFixed(2)), diversityFactor, peakKw: Number(peakKw.toFixed(2)) },
      };
    }
    case "calculateEnergyCost": {
      const { kwhPerDay, kesPerKwh } = args as EnergyCostArgs;
      const kesPerDay = kwhPerDay * kesPerKwh;
      return {
        label: "calculated",
        summary: `${kwhPerDay} kWh/day × KES ${kesPerKwh}/kWh → KES ${kesPerDay.toFixed(0)}/day`,
        data: { kwhPerDay, kesPerKwh, kesPerDay: Number(kesPerDay.toFixed(0)) },
      };
    }
    case "sizeBattery": {
      const { criticalLoadKw, backupHours, roundToKwh = 5 } = args as BatteryArgs;
      const rawKwh = criticalLoadKw * backupHours;
      const modules = Math.ceil(rawKwh / roundToKwh);
      const sizedKwh = modules * roundToKwh;
      return {
        label: "calculated",
        summary: `${criticalLoadKw} kW × ${backupHours} h → ${rawKwh.toFixed(1)} kWh raw, size ${sizedKwh} kWh (${modules}×${roundToKwh})`,
        data: {
          criticalLoadKw,
          backupHours,
          rawKwh: Number(rawKwh.toFixed(1)),
          sizedKwh,
          modules,
        },
      };
    }
    default:
      return {
        label: "assumed",
        summary: `Unknown tool: ${name}`,
        data: { error: "unknown_tool" },
      };
  }
}
