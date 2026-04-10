export interface StateData {
  name: string;
  peakSunHours: number;
}

export type LegislationStatus = "enacted" | "approved" | "introduced" | "failed" | "none";

export interface LegislationInfo {
  status: LegislationStatus;
  label: string;
}

export type TiltAngle = 30 | 45 | 70 | 90;

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
  capacityFactor: number;
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
