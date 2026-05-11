import { describe, expect, it } from "vitest";
import { checklistCopyText, contractorChecklist, recommendation } from "./project-starter";

describe("project starter recommendations", () => {
  it("sends quote and avoid-mistake answers to Panel Checker with breaker and load-capacity checklist language", () => {
    const result = recommendation("hpwh", "quote", "avoid-mistake");
    const checklist = contractorChecklist(result.kind, result.title);

    expect(result.href).toBe("/panel-checker");
    expect(result.kind).toBe("panel");
    expect(result.next.join(" ")).toContain("breaker space");
    expect(result.next.join(" ")).toContain("load capacity");
    expect(checklist.join(" ")).toContain("breaker space");
    expect(checklist.join(" ")).toContain("service/load capacity");
  });

  it("routes not-sure answers to the roadmap questions", () => {
    const result = recommendation("not-sure", "curious", "avoid-mistake");

    expect(result.kind).toBe("roadmap");
    expect(result.href).toBe("#roadmap-questions");
    expect(result.cta).toBe("Refine my roadmap below");
  });

  it("routes explicit roadmap goals to the roadmap questions", () => {
    const result = recommendation("heat-pump", "comfort", "plan-sequence");

    expect(result.kind).toBe("roadmap");
    expect(result.href).toBe("#roadmap-questions");
    expect(result.title).toBe("Start with an electrification roadmap, not rates");
  });

  it("routes heat-pump projects to the Heat Pump Fit Checker", () => {
    const result = recommendation("heat-pump", "comfort", "ask-contractor");

    expect(result.kind).toBe("heat-pump");
    expect(result.href).toBe("/heat-pump-fit");
    expect(result.cta).toBe("Check heat pump fit");
  });

  it("uses optional private photo guidance for HPWH next steps", () => {
    const result = recommendation("hpwh", "curious", "ask-contractor");
    const nextCopy = result.next.join(" ");

    expect(result.kind).toBe("hpwh");
    expect(nextCopy).toContain("If helpful");
    expect(nextCopy).toContain("do not need to upload photos");
  });
});

describe("checklistCopyText", () => {
  it("includes the checklist items and EEN caveat", () => {
    const text = checklistCopyText("Test recommendation", ["First question", "Second question"]);

    expect(text).toContain("Contractor checklist");
    expect(text).toContain("Test recommendation");
    expect(text).toContain("1. First question");
    expect(text).toContain("2. Second question");
    expect(text).toContain("EEN caveat: This is planning support, not electrical or legal advice.");
    expect(text).toContain("authority having jurisdiction (AHJ)");
  });
});
