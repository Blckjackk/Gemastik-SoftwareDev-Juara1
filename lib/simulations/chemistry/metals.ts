export interface MetalSubstance {
  id: string;
  name: string;
  symbol: string;
  reactivity: number; // relative reactivity index (Mg = 4, Zn = 2, Fe = 1, Cu = 0)
  molecularWeight: number; // g/mol
  color: string; // Color of the metal solid
  ionColor: string; // Color of the metal chloride solution (e.g. Fe2+ is green)
  reactionText: string;
}

export interface AcidSubstance {
  id: string;
  name: string;
  formula: string;
  concentration: number; // Molar (M)
}

export interface MetalReactionParams {
  metal: MetalSubstance;
  acid: AcidSubstance;
  mass: number; // gram
  surfaceArea: "serbuk" | "lempeng"; // Powders react faster
}

export interface ReactionFrameState {
  time: number; // s
  temperature: number; // °C
  h2Volume: number; // L
  metalMassRemaining: number; // g
  bubbleRate: number; // relative scale (0 to 10)
  solutionColor: string; // rgba color transitioning as reaction proceeds
}

export const METALS: MetalSubstance[] = [
  { id: "mg", name: "Magnesium", symbol: "Mg", reactivity: 4, molecularWeight: 24.3, color: "#D1D5DB", ionColor: "rgba(248, 250, 252, 0.9)", reactionText: "Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)" },
  { id: "zn", name: "Seng", symbol: "Zn", reactivity: 2.2, molecularWeight: 65.4, color: "#9CA3AF", ionColor: "rgba(248, 250, 252, 0.9)", reactionText: "Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)" },
  { id: "fe", name: "Besi", symbol: "Fe", reactivity: 1.0, molecularWeight: 55.8, color: "#4B5563", ionColor: "rgba(187, 247, 208, 0.5)", reactionText: "Fe(s) + 2HCl(aq) → FeCl₂(aq) + H₂(g)" }, // Fe2+ is light green
  { id: "cu", name: "Tembaga", symbol: "Cu", reactivity: 0.0, molecularWeight: 63.5, color: "#B45309", ionColor: "rgba(248, 250, 252, 0.9)", reactionText: "Cu(s) + HCl(aq) → Tidak Bereaksi" },
];

export const ACIDS: AcidSubstance[] = [
  { id: "hcl-low", name: "HCl Encer", formula: "HCl", concentration: 0.5 },
  { id: "hcl-med", name: "HCl Standar", formula: "HCl", concentration: 1.5 },
  { id: "hcl-high", name: "HCl Pekat", formula: "HCl", concentration: 3.0 },
];

/**
 * Calculates the state of the metal-acid reaction at a given time t (in seconds).
 */
export function getMetalReactionState(
  params: MetalReactionParams,
  t: number
): ReactionFrameState {
  const { metal, acid, mass, surfaceArea } = params;
  const t0 = 25.0; // Room temp

  // If copper, no reaction happens
  if (metal.reactivity === 0) {
    return {
      time: t,
      temperature: t0,
      h2Volume: 0,
      metalMassRemaining: mass,
      bubbleRate: 0,
      solutionColor: "rgba(248, 250, 252, 0.8)", // Clear, slightly translucent
    };
  }

  // Calculate rate constant k depending on concentration, surface area, and metal reactivity
  const areaMultiplier = surfaceArea === "serbuk" ? 3.0 : 1.0;
  // rate constant k = reactivity * concentration * areaMultiplier * scaling factor
  const k = metal.reactivity * (acid.concentration / 3.0) * areaMultiplier * 0.08;

  // Max theoretical H2 volume at standard room temp/pressure (24.4 L/mol)
  const theoreticalMoles = mass / metal.molecularWeight;
  const maxH2Volume = theoreticalMoles * 24.4; // in L

  // Max temp rise (dependent on metal's reactivity & mass, scaled)
  const maxTempRise = metal.reactivity * 6.0 * (mass / 2) * (acid.concentration / 2);

  // Time-dependent calculations (exponential progress)
  const progress = 1 - Math.exp(-k * t);

  const h2Volume = maxH2Volume * progress;
  const metalMassRemaining = mass * (1 - progress);
  const temperature = t0 + maxTempRise * progress;
  
  // Bubble rate is proportional to instantaneous reaction rate: r = k * e^(-k * t)
  const rate = k * Math.exp(-k * t) * 80;
  const bubbleRate = Math.min(10, Math.max(0.5, rate));

  // Determine transition color of solution
  // For Fe, solution shifts from clear to light green (metal.ionColor)
  let solutionColor = "rgba(248, 250, 252, 0.8)";
  if (metal.id === "fe" && progress > 0.05) {
    solutionColor = `rgba(187, 247, 208, ${0.1 + progress * 0.45})`;
  }

  return {
    time: t,
    temperature,
    h2Volume,
    metalMassRemaining,
    bubbleRate: progress >= 0.999 ? 0 : bubbleRate,
    solutionColor,
  };
}

/**
 * Generate chart data for the reaction
 */
export function generateReactionTimeline(
  params: MetalReactionParams,
  duration = 60,
  step = 1
) {
  const timeline: ReactionFrameState[] = [];
  for (let t = 0; t <= duration; t += step) {
    timeline.push(getMetalReactionState(params, t));
  }
  return timeline;
}
