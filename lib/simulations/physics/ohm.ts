// ============================================================
// Ohm's Law & Circuit Engine (Hukum Ohm)
// ============================================================

export type CircuitTopology = "seri" | "paralel" | "campuran";

export interface Resistor {
  id: string;
  label: string;
  resistance: number; // Ohm
}

export interface OhmParams {
  voltage: number;       // Volt (1–24)
  resistors: Resistor[]; // Array of resistors
  topology: CircuitTopology;
}

export interface OhmResults {
  rTotal: number;     // Total resistance (Ω)
  current: number;    // Total current (A)
  power: number;      // Total power (W)
  // Per-resistor results
  resistorData: {
    id: string;
    label: string;
    resistance: number;
    current: number;
    voltage: number;
    power: number;
  }[];
}

export function computeOhm(params: OhmParams): OhmResults {
  const { voltage, resistors, topology } = params;

  if (resistors.length === 0) {
    return { rTotal: 0, current: 0, power: 0, resistorData: [] };
  }

  let rTotal: number;

  if (topology === "seri") {
    rTotal = resistors.reduce((sum, r) => sum + r.resistance, 0);
  } else if (topology === "paralel") {
    const invSum = resistors.reduce((sum, r) => sum + 1 / r.resistance, 0);
    rTotal = invSum === 0 ? 0 : 1 / invSum;
  } else {
    // campuran: first half seri, second half paralel (simplified demo)
    const half = Math.ceil(resistors.length / 2);
    const seriPart = resistors.slice(0, half).reduce((s, r) => s + r.resistance, 0);
    const parallelPart = resistors.slice(half);
    const invSum = parallelPart.reduce((s, r) => s + 1 / r.resistance, 0);
    const parallelR = invSum === 0 ? 0 : 1 / invSum;
    rTotal = seriPart + parallelR;
  }

  const current = rTotal === 0 ? 0 : voltage / rTotal;
  const power = voltage * current;

  const resistorData = resistors.map((r) => {
    let rCurrent: number;
    let rVoltage: number;

    if (topology === "seri") {
      rCurrent = current;
      rVoltage = current * r.resistance;
    } else if (topology === "paralel") {
      rVoltage = voltage;
      rCurrent = r.resistance === 0 ? 0 : voltage / r.resistance;
    } else {
      rCurrent = current;
      rVoltage = current * r.resistance;
    }

    return {
      id: r.id,
      label: r.label,
      resistance: r.resistance,
      current: rCurrent,
      voltage: rVoltage,
      power: rCurrent * rVoltage,
    };
  });

  return { rTotal, current, power, resistorData };
}

/**
 * Generate V-I curve data for a given resistance
 */
export function generateVIData(
  resistance: number,
  vMax = 24
): { v: number; i: number }[] {
  const steps = 20;
  return Array.from({ length: steps + 1 }, (_, i) => {
    const v = (i / steps) * vMax;
    return { v, i: resistance === 0 ? 0 : v / resistance };
  });
}
