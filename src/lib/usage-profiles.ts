// Hourly load shapes: fraction of daily kWh consumed per hour (sums to 1.0)
// Index 0 = midnight, index 23 = 11pm

/** Base household load — relatively flat with slight evening peak */
export const BASE_LOAD_SHAPE = [
  0.030, 0.025, 0.022, 0.020, 0.020, 0.022, // 12am-5am
  0.030, 0.042, 0.046, 0.043, 0.041, 0.039, // 6am-11am
  0.039, 0.041, 0.044, 0.043, 0.048, 0.058, // 12pm-5pm
  0.067, 0.072, 0.068, 0.058, 0.048, 0.034, // 6pm-11pm
];

/** EV charging — concentrated overnight (10pm-6am smart charging) */
export const EV_LOAD_SHAPE = [
  0.117, 0.122, 0.122, 0.117, 0.106, 0.086, // 12am-5am
  0.010, 0.005, 0.005, 0.005, 0.005, 0.005, // 6am-11am
  0.005, 0.005, 0.005, 0.005, 0.005, 0.005, // 12pm-5pm
  0.005, 0.005, 0.010, 0.019, 0.111, 0.115, // 6pm-11pm
];

/** Heat pump HVAC — bimodal morning/evening with daytime baseline */
export const HEAT_PUMP_LOAD_SHAPE = [
  0.033, 0.028, 0.026, 0.026, 0.028, 0.038, // 12am-5am
  0.058, 0.068, 0.062, 0.042, 0.033, 0.028, // 6am-11am
  0.026, 0.026, 0.028, 0.033, 0.038, 0.052, // 12pm-5pm
  0.062, 0.068, 0.062, 0.052, 0.042, 0.041, // 6pm-11pm
];

/** Solar generation — bell curve centered on solar noon */
export const SOLAR_GENERATION_SHAPE = [
  0.000, 0.000, 0.000, 0.000, 0.000, 0.000, // 12am-5am
  0.010, 0.030, 0.070, 0.105, 0.135, 0.150, // 6am-11am
  0.150, 0.135, 0.105, 0.070, 0.030, 0.010, // 12pm-5pm
  0.000, 0.000, 0.000, 0.000, 0.000, 0.000, // 6pm-11pm
];

// Heat pump monthly kWh by season (for ~2500 sqft, 3-ton system, scaled by sqft)
const HEAT_PUMP_MONTHLY_BASE: Record<number, number> = {
  0: 1200, // Jan
  1: 1100, // Feb
  2: 900, // Mar
  3: 400, // Apr
  4: 400, // May
  5: 600, // Jun
  6: 600, // Jul
  7: 600, // Aug
  8: 400, // Sep
  9: 400, // Oct
  10: 1000, // Nov
  11: 1200, // Dec
};

const BOULDER_PEAK_SUN_HOURS = 5.5;
const SOLAR_DERATE = 0.8;
const EV_KWH_PER_MILE = 0.3;
const BASE_KWH_PER_SQFT = 0.5;
const HEAT_PUMP_BASE_SQFT = 2500;

export interface MonthlyKwhInput {
  homeSqFt: number;
  hasEv: boolean;
  evMilesPerMonth: number;
  hasHeatPump: boolean;
  hasSolar: boolean;
  solarSizeKw: number;
  month: number; // 0-11
}

export interface MonthlyKwhResult {
  baseKwh: number;
  evKwh: number;
  heatPumpKwh: number;
  solarKwh: number;
  totalConsumption: number;
  netKwh: number;
}

export function getMonthlyKwh(input: MonthlyKwhInput): MonthlyKwhResult {
  const baseKwh = input.homeSqFt * BASE_KWH_PER_SQFT;
  const evKwh = input.hasEv ? input.evMilesPerMonth * EV_KWH_PER_MILE : 0;

  const sqftScale = input.homeSqFt / HEAT_PUMP_BASE_SQFT;
  const heatPumpKwh = input.hasHeatPump
    ? (HEAT_PUMP_MONTHLY_BASE[input.month] ?? 600) * sqftScale
    : 0;

  const solarKwh = input.hasSolar
    ? input.solarSizeKw * BOULDER_PEAK_SUN_HOURS * 30 * SOLAR_DERATE
    : 0;

  const totalConsumption = baseKwh + evKwh + heatPumpKwh;
  const netKwh = totalConsumption - solarKwh;

  return { baseKwh, evKwh, heatPumpKwh, solarKwh, totalConsumption, netKwh };
}
