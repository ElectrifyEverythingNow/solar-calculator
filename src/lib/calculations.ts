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
  annualEscalator: number; // e.g. 0.03 for 3%
}

/**
 * Sum savings over N years with a rate that escalates annually.
 * Year 1 uses the base rate; year N uses rate * (1 + escalator)^(N-1).
 */
function cumulativeSavings(annualKwh: number, baseRate: number, escalator: number, years: number): number {
  let total = 0;
  for (let y = 0; y < years; y++) {
    total += annualKwh * baseRate * Math.pow(1 + escalator, y);
  }
  return total;
}

/**
 * Find the payback year — the first year where cumulative savings >= system cost.
 * Returns Infinity if it never pays back within 30 years.
 */
function findPaybackYear(annualKwh: number, baseRate: number, escalator: number, systemCost: number): number {
  if (annualKwh <= 0 || baseRate <= 0) return Infinity;
  let cumulative = 0;
  for (let y = 0; y < 30; y++) {
    cumulative += annualKwh * baseRate * Math.pow(1 + escalator, y);
    if (cumulative >= systemCost) {
      // Interpolate within the year for precision
      const prevCumulative = cumulative - annualKwh * baseRate * Math.pow(1 + escalator, y);
      const yearSavings = annualKwh * baseRate * Math.pow(1 + escalator, y);
      const fraction = (systemCost - prevCumulative) / yearSavings;
      return y + fraction;
    }
  }
  return Infinity;
}

export function calculateSolarEstimate(input: CalculationInput): SolarEstimate {
  const systemSizeKw = input.systemSizeW / 1000;
  const tiltFactor = TILT_FACTORS[input.tiltAngle];
  const annualKwh =
    systemSizeKw * input.peakSunHours * 365 * DERATE_FACTOR * tiltFactor;
  const annualSavingsYr1 = annualKwh * input.ratePerKwh;
  const escalator = input.annualEscalator;

  const paybackYears = findPaybackYear(annualKwh, input.ratePerKwh, escalator, input.systemCost);
  const tenYearSavings = cumulativeSavings(annualKwh, input.ratePerKwh, escalator, 10) - input.systemCost;
  const twentyYearSavings = cumulativeSavings(annualKwh, input.ratePerKwh, escalator, 20) - input.systemCost;

  // Capacity factor = actual production / theoretical max (system running 24/7/365)
  const theoreticalMaxKwh = systemSizeKw * 8760;
  const capacityFactor = theoreticalMaxKwh > 0 ? annualKwh / theoreticalMaxKwh : 0;

  return {
    annualKwh,
    annualSavings: annualSavingsYr1,
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
