import { describe, it, expect } from "vitest";
import {
  calculateSolarEstimate,
  getVerdict,
  getVerdictInfo,
} from "./calculations";

describe("calculateSolarEstimate", () => {
  it("calculates correctly with 0% escalator (flat rates)", () => {
    const result = calculateSolarEstimate({
      systemSizeW: 1200,
      systemCost: 2000,
      peakSunHours: 6.5,
      ratePerKwh: 0.13,
      tiltAngle: 30,
      annualEscalator: 0,
    });

    // 1.2 kW * 6.5 * 365 * 0.8 * 1.0 = 2277.6 kWh
    expect(result.annualKwh).toBeCloseTo(2277.6, 0);
    expect(result.annualSavings).toBeCloseTo(296.09, 0);
    expect(result.paybackYears).toBeCloseTo(6.75, 1);
    // With 0% escalator, 10yr savings = 296.09 * 10 - 2000 = 960.88
    expect(result.tenYearSavings).toBeCloseTo(960.88, 0);
    expect(result.capacityFactor).toBeCloseTo(0.2166, 2);
  });

  it("escalator shortens payback period", () => {
    const flat = calculateSolarEstimate({
      systemSizeW: 1200,
      systemCost: 2000,
      peakSunHours: 5.0,
      ratePerKwh: 0.15,
      tiltAngle: 30,
      annualEscalator: 0,
    });
    const escalated = calculateSolarEstimate({
      systemSizeW: 1200,
      systemCost: 2000,
      peakSunHours: 5.0,
      ratePerKwh: 0.15,
      tiltAngle: 30,
      annualEscalator: 0.03,
    });

    // Same year-1 savings
    expect(escalated.annualSavings).toBeCloseTo(flat.annualSavings, 0);
    // Escalator should shorten payback
    expect(escalated.paybackYears).toBeLessThan(flat.paybackYears);
    // And increase long-term savings
    expect(escalated.twentyYearSavings).toBeGreaterThan(flat.twentyYearSavings);
  });

  it("reduces production at 70° balcony tilt", () => {
    const optimal = calculateSolarEstimate({
      systemSizeW: 1200,
      systemCost: 2000,
      peakSunHours: 5.0,
      ratePerKwh: 0.15,
      tiltAngle: 30,
      annualEscalator: 0,
    });
    const balcony = calculateSolarEstimate({
      systemSizeW: 1200,
      systemCost: 2000,
      peakSunHours: 5.0,
      ratePerKwh: 0.15,
      tiltAngle: 70,
      annualEscalator: 0,
    });

    expect(balcony.annualKwh).toBeCloseTo(optimal.annualKwh * 0.75, 0);
    expect(balcony.paybackYears).toBeGreaterThan(optimal.paybackYears);
  });

  it("reduces production most at 90° vertical tilt", () => {
    const result = calculateSolarEstimate({
      systemSizeW: 1200,
      systemCost: 2000,
      peakSunHours: 5.0,
      ratePerKwh: 0.15,
      tiltAngle: 90,
      annualEscalator: 0,
    });

    // 1.2 * 5.0 * 365 * 0.8 * 0.60 = 1051.2 kWh
    expect(result.annualKwh).toBeCloseTo(1051.2, 0);
  });

  it("handles zero rate gracefully", () => {
    const result = calculateSolarEstimate({
      systemSizeW: 1200,
      systemCost: 2000,
      peakSunHours: 5.0,
      ratePerKwh: 0,
      tiltAngle: 30,
      annualEscalator: 0.03,
    });

    expect(result.annualSavings).toBe(0);
    expect(result.paybackYears).toBe(Infinity);
    expect(result.tenYearSavings).toBe(-2000);
  });

  it("includes capacity factor in result", () => {
    const result = calculateSolarEstimate({
      systemSizeW: 1200,
      systemCost: 2000,
      peakSunHours: 5.0,
      ratePerKwh: 0.15,
      tiltAngle: 70,
      annualEscalator: 0,
    });

    expect(result.capacityFactor).toBeGreaterThan(0);
    expect(result.capacityFactor).toBeLessThan(0.25);
  });

  it("5% escalator significantly boosts 20-year savings", () => {
    const result = calculateSolarEstimate({
      systemSizeW: 1200,
      systemCost: 2000,
      peakSunHours: 5.0,
      ratePerKwh: 0.15,
      tiltAngle: 30,
      annualEscalator: 0.05,
    });

    // Year-1 savings = 1752 * 0.15 = 262.80
    // With 5% escalator over 20 years, cumulative should be much more than 262.80 * 20
    expect(result.twentyYearSavings).toBeGreaterThan(262.80 * 20 - 2000);
  });
});

describe("getVerdict", () => {
  it("returns no-brainer for < 4 years", () => {
    expect(getVerdict(3.5)).toBe("no-brainer");
  });

  it("returns great for 4-8 years", () => {
    expect(getVerdict(6)).toBe("great");
  });

  it("returns worth-considering for 8-12 years", () => {
    expect(getVerdict(10)).toBe("worth-considering");
  });

  it("returns tough-roi for > 12 years", () => {
    expect(getVerdict(15)).toBe("tough-roi");
  });

  it("returns tough-roi for Infinity", () => {
    expect(getVerdict(Infinity)).toBe("tough-roi");
  });
});

describe("getVerdictInfo", () => {
  it("returns correct label for no-brainer", () => {
    const info = getVerdictInfo("no-brainer");
    expect(info.label).toBe("No Brainer — Go Solar!");
  });

  it("returns correct label for great", () => {
    const info = getVerdictInfo("great");
    expect(info.label).toBe("Great Investment");
  });
});
