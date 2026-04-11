import { describe, it, expect } from "vitest";
import {
  BASE_LOAD_SHAPE,
  EV_LOAD_SHAPE,
  HEAT_PUMP_LOAD_SHAPE,
  SOLAR_GENERATION_SHAPE,
  getMonthlyKwh,
} from "./usage-profiles";

describe("load shapes", () => {
  it("BASE_LOAD_SHAPE sums to 1.0", () => {
    const sum = BASE_LOAD_SHAPE.reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1.0, 4);
  });

  it("EV_LOAD_SHAPE sums to 1.0", () => {
    const sum = EV_LOAD_SHAPE.reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1.0, 4);
  });

  it("HEAT_PUMP_LOAD_SHAPE sums to 1.0", () => {
    const sum = HEAT_PUMP_LOAD_SHAPE.reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1.0, 4);
  });

  it("SOLAR_GENERATION_SHAPE sums to 1.0", () => {
    const sum = SOLAR_GENERATION_SHAPE.reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1.0, 4);
  });

  it("all shapes have 24 elements", () => {
    expect(BASE_LOAD_SHAPE).toHaveLength(24);
    expect(EV_LOAD_SHAPE).toHaveLength(24);
    expect(HEAT_PUMP_LOAD_SHAPE).toHaveLength(24);
    expect(SOLAR_GENERATION_SHAPE).toHaveLength(24);
  });

  it("EV charging is concentrated at night (10pm-6am)", () => {
    const nightHours = [22, 23, 0, 1, 2, 3, 4, 5];
    const nightLoad = nightHours.reduce((sum, h) => sum + EV_LOAD_SHAPE[h], 0);
    expect(nightLoad).toBeGreaterThan(0.8);
  });

  it("solar generation peaks midday", () => {
    const middayHours = [10, 11, 12, 13, 14, 15];
    const middayGen = middayHours.reduce((sum, h) => sum + SOLAR_GENERATION_SHAPE[h], 0);
    expect(middayGen).toBeGreaterThan(0.6);
  });
});

describe("getMonthlyKwh", () => {
  it("calculates base load from square footage", () => {
    const result = getMonthlyKwh({
      homeSqFt: 2500,
      hasEv: false,
      evMilesPerMonth: 0,
      hasHeatPump: false,
      hasSolar: false,
      solarSizeKw: 0,
      month: 6, // July
    });
    expect(result.baseKwh).toBeCloseTo(1250, 0);
    expect(result.evKwh).toBe(0);
    expect(result.heatPumpKwh).toBe(0);
    expect(result.solarKwh).toBe(0);
  });

  it("calculates EV usage from miles", () => {
    const result = getMonthlyKwh({
      homeSqFt: 2500,
      hasEv: true,
      evMilesPerMonth: 1000,
      hasHeatPump: false,
      hasSolar: false,
      solarSizeKw: 0,
      month: 6,
    });
    expect(result.evKwh).toBeCloseTo(300, 0);
  });

  it("varies heat pump usage by season", () => {
    const winter = getMonthlyKwh({
      homeSqFt: 2500,
      hasEv: false,
      evMilesPerMonth: 0,
      hasHeatPump: true,
      hasSolar: false,
      solarSizeKw: 0,
      month: 0, // January
    });
    const summer = getMonthlyKwh({
      homeSqFt: 2500,
      hasEv: false,
      evMilesPerMonth: 0,
      hasHeatPump: true,
      hasSolar: false,
      solarSizeKw: 0,
      month: 6, // July
    });
    expect(winter.heatPumpKwh).toBeGreaterThan(summer.heatPumpKwh);
  });

  it("calculates solar generation", () => {
    const result = getMonthlyKwh({
      homeSqFt: 2500,
      hasEv: false,
      evMilesPerMonth: 0,
      hasHeatPump: false,
      hasSolar: true,
      solarSizeKw: 5,
      month: 6,
    });
    // 5kW * 5.5 hours * 30 days * 0.8 derate = 660 kWh
    expect(result.solarKwh).toBeCloseTo(660, -1);
  });
});
