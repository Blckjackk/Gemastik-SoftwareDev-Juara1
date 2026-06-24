export interface PhotosynthesisParams {
  lightIntensity: number; // Lux (0 to 1000)
  co2Concentration: number; // % (0.01 to 1.00)
  temperature: number; // °C (10 to 50)
}

export interface PhotosynthesisState {
  bubbleRate: number; // bubble speed factor (0 to 10 scale)
  o2Rate: number; // mL O2 per hour
  leafColor: string; // rgba leaf green shade transitioning by activity
}

export function computePhotosynthesis(params: PhotosynthesisParams): PhotosynthesisState {
  const { lightIntensity, co2Concentration, temperature } = params;

  // Michaelis-Menten constants
  const Ki = 200; // Lux constant
  const Kc = 0.12; // % CO2 constant
  const Pmax = 12.0; // max rate

  // Temperature effect (Gaussian distribution peaking at 30°C)
  const tempOptimal = 30.0;
  const tempVariance = 120.0; // width of curve
  const tempMultiplier = Math.exp(-Math.pow(temperature - tempOptimal, 2) / tempVariance);

  // Photosynthetic rate components
  const lightEffect = lightIntensity / (lightIntensity + Ki);
  const co2Effect = co2Concentration / (co2Concentration + Kc);

  // Instantaneous O2 rate
  const o2Rate = Pmax * lightEffect * co2Effect * tempMultiplier; // mL/h
  
  // Map rate to bubble count scaling (0 to 10)
  const bubbleRate = Math.min(10, Math.max(0, o2Rate * 0.8));

  // Shade of green changes from dull green-yellow to deep vibrant green depending on rate
  // Dull background color
  const baseR = 100, baseG = 130, baseB = 70;
  const activeR = 22, activeG = 163, activeB = 74; // #16A34A (Organic green)
  
  const factor = Math.min(1.0, o2Rate / 7.0); // normalize
  const r = Math.round(baseR + (activeR - baseR) * factor);
  const g = Math.round(baseG + (activeG - baseG) * factor);
  const b = Math.round(baseB + (activeB - baseB) * factor);

  return {
    bubbleRate,
    o2Rate,
    leafColor: `rgba(${r}, ${g}, ${b}, 0.95)`,
  };
}

/**
 * Generate curve data
 */
export function generatePhotosynthesisLightCurve(co2: number, temp: number) {
  const points = [];
  for (let light = 0; light <= 1000; light += 50) {
    const state = computePhotosynthesis({ lightIntensity: light, co2Concentration: co2, temperature: temp });
    points.push({ light, o2Rate: Math.round(state.o2Rate * 100) / 100 });
  }
  return points;
}

export function generatePhotosynthesisCO2Curve(light: number, temp: number) {
  const points = [];
  for (let co2 = 0.01; co2 <= 1.00; co2 += 0.05) {
    const state = computePhotosynthesis({ lightIntensity: light, co2Concentration: co2, temperature: temp });
    points.push({ co2: Math.round(co2 * 100) / 100, o2Rate: Math.round(state.o2Rate * 100) / 100 });
  }
  return points;
}
