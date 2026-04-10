export interface StateData {
  name: string;
  peakSunHours: number;
}

export interface Utility {
  name: string;
  ratePerKwh: number;
  customers: number;
}

export interface StateUtilities {
  state: string;
  utilities: Utility[];
}

export interface SolarEstimate {
  annualKwh: number;
  annualSavings: number;
  paybackYears: number;
  tenYearSavings: number;
  twentyYearSavings: number;
}

export interface QuoteRequest {
  name: string;
  email: string;
  zip: string;
  message?: string;
  state: string;
  utility: string;
  systemSizeW: number;
  systemCost: number;
  estimatedPayback: number;
  estimatedAnnualSavings: number;
}

export type Verdict =
  | "no-brainer"
  | "great"
  | "worth-considering"
  | "tough-roi";

export interface VerdictInfo {
  verdict: Verdict;
  label: string;
  color: string;
  bgColor: string;
}
