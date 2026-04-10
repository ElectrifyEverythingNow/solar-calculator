import type { SolarEstimate, Verdict, VerdictInfo, TiltAngle } from "./types";

const DERATE_FACTOR = 0.8;

// Production multiplier relative to optimal tilt (~30-35° for most US latitudes).
// 30° is near-optimal, 90° (vertical wall mount) produces significantly less.
const TILT_FACTORS: Record<TiltAngle, number> = {
  30: 1.0,   // Near optimal
  45: 0.95,  // Slight reduction
  70: 0.75,  // Steep balcony mount
  90: 0.60,  // Vertical / wall mount
};

interface CalculationInput {
  systemSizeW: number;
  systemCost: number;
  peakSunHours: number;
  ratePerKwh: number;
  tiltAngle: TiltAngle;
}

export function calculateSolarEstimate(input: CalculationInput): SolarEstimate {
  const systemSizeKw = input.systemSizeW / 1000;
  const tiltFactor = TILT_FACTORS[input.tiltAngle];
  const annualKwh =
    systemSizeKw * input.peakSunHours * 365 * DERATE_FACTOR * tiltFactor;
  const annualSavings = annualKwh * input.ratePerKwh;
  const paybackYears =
    annualSavings === 0 ? Infinity : input.systemCost / annualSavings;
  const tenYearSavings = annualSavings * 10 - input.systemCost;
  const twentyYearSavings = annualSavings * 20 - input.systemCost;

  // Capacity factor = actual production / theoretical max (system running 24/7/365)
  const theoreticalMaxKwh = systemSizeKw * 8760;
  const capacityFactor = theoreticalMaxKwh > 0 ? annualKwh / theoreticalMaxKwh : 0;

  return {
    annualKwh,
    annualSavings,
    paybackYears,
    tenYearSavings,
    twentyYearSavings,
    capacityFactor,
  };
}

export function getVerdict(paybackYears: number): Verdict {
  if (paybackYears < 4) return "no-brainer";
  if (paybackYears < 8) return "great";
  if (paybackYears < 12) return "worth-considering";
  return "tough-roi";
}

export function getVerdictInfo(verdict: Verdict): VerdictInfo {
  switch (verdict) {
    case "no-brainer":
      return {
        verdict: "no-brainer",
        label: "No Brainer — Go Solar!",
        color: "text-green-500",
        bgColor: "bg-green-100",
      };
    case "great":
      return {
        verdict: "great",
        label: "Great Investment",
        color: "text-green-700",
        bgColor: "bg-green-50",
      };
    case "worth-considering":
      return {
        verdict: "worth-considering",
        label: "Worth Considering",
        color: "text-yellow-700",
        bgColor: "bg-yellow-50",
      };
    case "tough-roi":
      return {
        verdict: "tough-roi",
        label: "Tough ROI at Current Rates",
        color: "text-red-700",
        bgColor: "bg-red-50",
      };
  }
}
