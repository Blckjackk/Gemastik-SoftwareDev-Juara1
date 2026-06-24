// ============================================================
// Projectile Motion Engine (Gerak Parabola)
// Semua kalkulasi murni — tidak butuh backend
// ============================================================

export interface ProjectileParams {
  v0: number;    // Initial velocity (m/s), range 5–50
  theta: number; // Launch angle (degrees), range 0–90
  h0: number;    // Initial height (m), range 0–20
  g: number;     // Gravity (m/s²), default 9.81
}

export interface ProjectileResults {
  hMax: number;      // Maximum height (m)
  range: number;     // Horizontal range (m)
  tTotal: number;    // Total flight time (s)
  v0x: number;       // Horizontal velocity component
  v0y: number;       // Vertical velocity component
}

export interface ProjectilePoint {
  t: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  v: number;
}

const DEG2RAD = Math.PI / 180;

/**
 * Compute analytic results for projectile motion
 */
export function computeProjectileResults(params: ProjectileParams): ProjectileResults {
  const { v0, theta, h0, g } = params;
  const rad = theta * DEG2RAD;
  const v0x = v0 * Math.cos(rad);
  const v0y = v0 * Math.sin(rad);

  // Time to reach maximum height
  const tUp = v0y / g;

  // Maximum height: h0 + v0y²/2g
  const hMax = h0 + (v0y * v0y) / (2 * g);

  // Total flight time: solve y(t) = 0 → quadratic
  // h0 + v0y·t - 0.5·g·t² = 0
  const discriminant = v0y * v0y + 2 * g * h0;
  const tTotal = (v0y + Math.sqrt(discriminant)) / g;

  // Horizontal range
  const range = v0x * tTotal;

  return { hMax, range, tTotal, v0x, v0y };
}

/**
 * Generate trajectory points for animation and graph
 * @param params Projectile parameters
 * @param steps Number of time steps
 */
export function generateTrajectory(
  params: ProjectileParams,
  steps = 200
): ProjectilePoint[] {
  const { v0, theta, h0, g } = params;
  const rad = theta * DEG2RAD;
  const v0x = v0 * Math.cos(rad);
  const v0y = v0 * Math.sin(rad);

  const results = computeProjectileResults(params);
  const { tTotal } = results;

  const points: ProjectilePoint[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * tTotal;
    const x = v0x * t;
    const y = h0 + v0y * t - 0.5 * g * t * t;
    const vy = v0y - g * t;
    const vel = Math.sqrt(v0x * v0x + vy * vy);
    points.push({ t, x, y: Math.max(0, y), vx: v0x, vy, v: vel });
    if (y < 0 && i > 0) break; // stop at ground
  }
  return points;
}

/**
 * Get position at specific time t
 */
export function getPositionAt(
  params: ProjectileParams,
  t: number
): { x: number; y: number; vx: number; vy: number } {
  const { v0, theta, h0, g } = params;
  const rad = theta * DEG2RAD;
  const v0x = v0 * Math.cos(rad);
  const v0y = v0 * Math.sin(rad);
  return {
    x: v0x * t,
    y: Math.max(0, h0 + v0y * t - 0.5 * g * t * t),
    vx: v0x,
    vy: v0y - g * t,
  };
}
