// ============================================================
// Genetics / Punnett Square Engine (Genetika Mendel)
// ============================================================

export type Allele = "A" | "a" | "B" | "b";
export type GenotypeMonohybrid = "AA" | "Aa" | "aa";
export type GenotypeDihybrid = "AABB" | "AABb" | "AAbb" | "AaBB" | "AaBb" | "Aabb" | "aaBB" | "aaBb" | "aabb";

export interface PunnettCell {
  genotype: string;
  phenotype: string;
  isDominant: boolean;
}

export interface PunnettResult {
  cells: PunnettCell[][];   // 2D grid
  gametes1: string[];       // Parent 1 gametes (row headers)
  gametes2: string[];       // Parent 2 gametes (col headers)
  genotypeRatio: Record<string, number>;
  phenotypeRatio: Record<string, number>;
  dominantPercent: number;
  recessivePercent: number;
}

export interface ExperimentRecord {
  id: string;
  parent1: string;
  parent2: string;
  mode: "monohibrid" | "dihibrid";
  result: PunnettResult;
  timestamp: string;
}

/**
 * Get gametes for a monohybrid genotype
 */
function getGametes(genotype: string): string[] {
  if (genotype.length === 2) {
    // Monohybrid
    return [genotype[0], genotype[1]];
  }
  // Dihybrid: 4 gametes
  const [a1, a2, b1, b2] = [genotype[0], genotype[1], genotype[2], genotype[3]];
  return [a1 + b1, a1 + b2, a2 + b1, a2 + b2];
}

/**
 * Sort genotype letters to canonical form (AA, Aa, aa, etc.)
 */
function canonicalize(genotype: string): string {
  if (genotype.length === 2) {
    return genotype[0] <= genotype[1] ? genotype : genotype[1] + genotype[0];
  }
  // Dihybrid: sort each gene pair
  const firstPair = [genotype[0], genotype[2]].sort().join("");
  const secondPair = [genotype[1], genotype[3]].sort().join("");
  return firstPair + secondPair;
}

/**
 * Determine phenotype from genotype
 * Convention: uppercase = dominant
 */
function getPhenotype(genotype: string, traitName = "sifat"): string {
  const hasUpperA = /[A]/.test(genotype);
  const hasUpperB = /[B]/.test(genotype);
  
  if (genotype.length === 2) {
    return hasUpperA ? `${traitName} Dominan` : `${traitName} Resesif`;
  }
  
  // Dihybrid
  if (hasUpperA && hasUpperB) return "Dominan A & B";
  if (hasUpperA && !hasUpperB) return "Dominan A, Resesif B";
  if (!hasUpperA && hasUpperB) return "Resesif A, Dominan B";
  return "Resesif A & B";
}

export function computePunnett(
  parent1: string,
  parent2: string,
  traitName = "Sifat"
): PunnettResult {
  const gametes1 = getGametes(parent1);
  const gametes2 = getGametes(parent2);

  const cells: PunnettCell[][] = gametes1.map((g1) =>
    gametes2.map((g2) => {
      // Combine gametes — interleave for dihybrid
      let raw: string;
      if (g1.length === 1) {
        raw = g1 + g2;
      } else {
        // dihybrid gametes: each is 2 chars (e.g. "AB", "Ab")
        raw = g1[0] + g2[0] + g1[1] + g2[1];
      }
      const genotype = canonicalize(raw);
      const isDominant = /[A-Z]/.test(genotype);
      return {
        genotype,
        phenotype: getPhenotype(genotype, traitName),
        isDominant,
      };
    })
  );

  // Count genotype ratios
  const genotypeRatio: Record<string, number> = {};
  const phenotypeRatio: Record<string, number> = {};
  let dominantCount = 0;
  const totalCells = cells.length * cells[0].length;

  cells.flat().forEach((cell) => {
    genotypeRatio[cell.genotype] = (genotypeRatio[cell.genotype] ?? 0) + 1;
    phenotypeRatio[cell.phenotype] = (phenotypeRatio[cell.phenotype] ?? 0) + 1;
    if (cell.isDominant) dominantCount++;
  });

  return {
    cells,
    gametes1,
    gametes2,
    genotypeRatio,
    phenotypeRatio,
    dominantPercent: (dominantCount / totalCells) * 100,
    recessivePercent: ((totalCells - dominantCount) / totalCells) * 100,
  };
}

export const MONOHYBRID_OPTIONS: GenotypeMonohybrid[] = ["AA", "Aa", "aa"];
export const DIHYBRID_OPTIONS = ["AABB", "AABb", "AAbb", "AaBB", "AaBb", "Aabb", "aaBB", "aaBb", "aabb"];
