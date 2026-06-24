// ============================================================
// Acid-Base Titration Engine (Titrasi Asam-Basa)
// Rule-Based pH Calculator
// ============================================================

export type AcidType = "kuat" | "lemah";
export type BaseType = "kuat" | "lemah";

export interface TitrationSubstance {
  id: string;
  name: string;
  formula: string;
  type: "acid" | "base";
  strength: AcidType | BaseType;
  concentration: number; // mol/L (M)
  pKa?: number;          // for weak acids
  pKb?: number;          // for weak bases
}

export interface TitrationParams {
  analyte: TitrationSubstance;     // Solution being titrated
  titrant: TitrationSubstance;     // Solution being added
  analyteVolume: number;            // mL
  titrantVolume: number;            // mL added so far
}

export interface TitrationResult {
  pH: number;
  equivalentPoint: boolean;
  beyondEquivalentPoint: boolean;
  molesAnalyte: number;
  molesTitrant: number;
  excessMoles: number;
}

export interface TitrationPoint {
  volume: number; // mL titrant added
  pH: number;
}

export const SUBSTANCES: TitrationSubstance[] = [
  { id: "hcl", name: "Asam Klorida", formula: "HCl", type: "acid", strength: "kuat", concentration: 0.1 },
  { id: "h2so4", name: "Asam Sulfat", formula: "H₂SO₄", type: "acid", strength: "kuat", concentration: 0.05 },
  { id: "ch3cooh", name: "Asam Asetat", formula: "CH₃COOH", type: "acid", strength: "lemah", concentration: 0.1, pKa: 4.76 },
  { id: "naoh", name: "Natrium Hidroksida", formula: "NaOH", type: "base", strength: "kuat", concentration: 0.1 },
  { id: "koh", name: "Kalium Hidroksida", formula: "KOH", type: "base", strength: "kuat", concentration: 0.1 },
  { id: "nh3", name: "Amonia", formula: "NH₃", type: "base", strength: "lemah", concentration: 0.1, pKb: 4.74 },
];

function clampPH(pH: number): number {
  return Math.max(0, Math.min(14, pH));
}

export function computeTitrationPH(params: TitrationParams): TitrationResult {
  const { analyte, titrant, analyteVolume, titrantVolume } = params;

  const molesAnalyte = analyte.concentration * (analyteVolume / 1000);
  const molesTitrant = titrant.concentration * (titrantVolume / 1000);
  const totalVolume = (analyteVolume + titrantVolume) / 1000; // in liters

  const equivalentMoles = molesAnalyte;
  const equivalentVolume = (equivalentMoles / titrant.concentration) * 1000; // mL

  const atEP = Math.abs(molesTitrant - molesAnalyte) < 1e-6;
  const beyondEP = molesTitrant > molesAnalyte;

  let pH: number;

  if (analyte.type === "acid" && titrant.type === "base") {
    if (molesTitrant < molesAnalyte) {
      // Before equivalence point
      if (analyte.strength === "kuat") {
        const excessH = (molesAnalyte - molesTitrant) / totalVolume;
        pH = clampPH(-Math.log10(excessH));
      } else {
        // Weak acid buffer region (Henderson-Hasselbalch)
        const pKa = analyte.pKa ?? 4.76;
        if (molesTitrant === 0) {
          const ca = molesAnalyte / totalVolume;
          pH = clampPH(0.5 * (pKa - Math.log10(ca)));
        } else {
          const ratio = molesTitrant / (molesAnalyte - molesTitrant);
          pH = clampPH(pKa + Math.log10(ratio));
        }
      }
    } else if (atEP) {
      // At equivalence point
      if (analyte.strength === "kuat" && titrant.strength === "kuat") {
        pH = 7.0;
      } else if (analyte.strength === "lemah") {
        // Salt of weak acid: pH > 7
        const pKa = analyte.pKa ?? 4.76;
        const cb = molesAnalyte / totalVolume;
        pH = clampPH(7 + 0.5 * (pKa - Math.log10(cb)));
      } else {
        pH = 7.0;
      }
    } else {
      // After equivalence point — excess base
      const excessBase = (molesTitrant - molesAnalyte) / totalVolume;
      const pOH = -Math.log10(excessBase);
      pH = clampPH(14 - pOH);
    }
  } else {
    // Default fallback
    pH = 7.0;
  }

  return {
    pH,
    equivalentPoint: atEP,
    beyondEquivalentPoint: beyondEP,
    molesAnalyte,
    molesTitrant,
    excessMoles: Math.abs(molesTitrant - molesAnalyte),
  };
}

/**
 * Generate full titration curve
 */
export function generateTitrationCurve(
  params: Omit<TitrationParams, "titrantVolume">,
  maxVolume = 50
): TitrationPoint[] {
  const steps = 100;
  const points: TitrationPoint[] = [];

  for (let i = 0; i <= steps; i++) {
    const vol = (i / steps) * maxVolume;
    const result = computeTitrationPH({ ...params, titrantVolume: vol });
    points.push({ volume: vol, pH: result.pH });
  }

  return points;
}

/**
 * Get solution color based on pH and indicator type
 */
export function getIndicatorColor(
  pH: number,
  indicator: "fenolftalein" | "metil_jingga" | "universal"
): string {
  if (indicator === "fenolftalein") {
    if (pH < 8.2) return "rgba(255,255,255,0.6)"; // colorless
    if (pH < 10) return "rgba(255,150,200,0.7)";   // light pink
    return "rgba(255,20,147,0.8)";                  // deep pink
  }
  if (indicator === "metil_jingga") {
    if (pH < 3.1) return "rgba(220,50,50,0.8)";    // red
    if (pH < 4.4) return "rgba(255,140,0,0.8)";    // orange
    return "rgba(255,220,0,0.8)";                   // yellow
  }
  // Universal indicator
  if (pH <= 1) return "rgba(180,0,0,0.85)";
  if (pH <= 3) return "rgba(220,50,50,0.85)";
  if (pH <= 5) return "rgba(255,120,50,0.85)";
  if (pH <= 6) return "rgba(255,200,50,0.85)";
  if (pH <= 7) return "rgba(180,220,80,0.85)";
  if (pH <= 9) return "rgba(80,180,80,0.85)";
  if (pH <= 11) return "rgba(50,130,220,0.85)";
  return "rgba(80,50,200,0.85)";
}
