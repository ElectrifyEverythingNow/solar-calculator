import { describe, it, expect } from "vitest";
import {
  calculateSolarEstimate,
  getVerdict,
  getVerdictInfo,
} from "./calculations";

describe("calculateSolarEstimate", () => {
  it("calculates correctly for Arizona at 30° optimal tilt", () => {
    const result = calculateSolarEstimate({
      systemSizeW: 1200,
      systemCost: 2000,
      peakSunHours: 6.5,
      ratePerKwh: 0.13,
      tiltAngle: 30,
    });

    // 1.2 kW * 6.5 * 365 * 0.8 * 1.0 = 2277.6 kWh
    expect(result.annualKwh).toBeCloseTo(2277.6, 0);
    expect(result.annualSavings).toBeCloseTo(296.09, 0);
    expect(result.paybackYears).toBeCloseTo(6.75, 1);
    expect(result.tenYearSavings).toBeCloseTo(960.88, 0);
    expect(result.twentyYearSavings).toBeCloseTo(3921.76, 0);
    expect(result.capacityFactor).toBeCloseTo(0.2166, 2);
  });

  it("reduces production at 70° balcony tilt", () => {
    const optimal = calculateSolarEstimate({
      systemSizeW: 1200,
      systemCost: 2000,
      peakSunHours: 5.0,
      ratePerKwh: 0.15,
      tiltAngle: 30,
    });
    const balcony = calculateSolarEstimate({
      systemSizeW: 1200,
      systemCost: 2000,
      peakSunHours: 5.0,
      ratePerKwh: 0.15,
      tiltAngle: 70,
    });

    // 70° should produce 75% of 30° optimal
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
    });

    // CF = annualKwh / (1.2 * 8760)
    expect(result.capacityFactor).toBeGreaterThan(0);
    expect(result.capacityFactor).toBeLessThan(0.25);
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
