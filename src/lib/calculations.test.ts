import { describe, it, expect } from "vitest";
import {
  calculateSolarEstimate,
  getVerdict,
  getVerdictInfo,
} from "./calculations";

describe("calculateSolarEstimate", () => {
  it("calculates correctly for Arizona with default system", () => {
    const result = calculateSolarEstimate({
      systemSizeW: 1200,
      systemCost: 2000,
      peakSunHours: 6.5,
      ratePerKwh: 0.13,
    });

    expect(result.annualKwh).toBeCloseTo(2277.6, 0);
    expect(result.annualSavings).toBeCloseTo(296.09, 0);
    expect(result.paybackYears).toBeCloseTo(6.75, 1);
    expect(result.tenYearSavings).toBeCloseTo(960.88, 0);
    expect(result.twentyYearSavings).toBeCloseTo(3921.76, 0);
  });

  it("calculates correctly for Washington with expensive power", () => {
    const result = calculateSolarEstimate({
      systemSizeW: 1200,
      systemCost: 2000,
      peakSunHours: 3.7,
      ratePerKwh: 0.22,
    });

    expect(result.annualKwh).toBeCloseTo(1296.48, 0);
    expect(result.annualSavings).toBeCloseTo(285.23, 0);
    expect(result.paybackYears).toBeCloseTo(7.01, 1);
  });

  it("handles custom system size and cost", () => {
    const result = calculateSolarEstimate({
      systemSizeW: 800,
      systemCost: 1500,
      peakSunHours: 5.0,
      ratePerKwh: 0.15,
    });

    expect(result.annualKwh).toBeCloseTo(1168, 0);
    expect(result.annualSavings).toBeCloseTo(175.2, 0);
    expect(result.paybackYears).toBeCloseTo(8.56, 1);
  });

  it("handles zero rate gracefully", () => {
    const result = calculateSolarEstimate({
      systemSizeW: 1200,
      systemCost: 2000,
      peakSunHours: 5.0,
      ratePerKwh: 0,
    });

    expect(result.annualSavings).toBe(0);
    expect(result.paybackYears).toBe(Infinity);
    expect(result.tenYearSavings).toBe(-2000);
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
