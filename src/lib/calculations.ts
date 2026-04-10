import type { SolarEstimate, Verdict, VerdictInfo } from "./types";

const DERATE_FACTOR = 0.8;

interface CalculationInput {
  systemSizeW: number;
  systemCost: number;
  peakSunHours: number;
  ratePerKwh: number;
}

export function calculateSolarEstimate(input: CalculationInput): SolarEstimate {
  const systemSizeKw = input.systemSizeW / 1000;
  const annualKwh =
    systemSizeKw * input.peakSunHours * 365 * DERATE_FACTOR;
  const annualSavings = annualKwh * input.ratePerKwh;
  const paybackYears =
    annualSavings === 0 ? Infinity : input.systemCost / annualSavings;
  const tenYearSavings = annualSavings * 10 - input.systemCost;
  const twentyYearSavings = annualSavings * 20 - input.systemCost;

  return {
    annualKwh,
    annualSavings,
    paybackYears,
    tenYearSavings,
    twentyYearSavings,
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
