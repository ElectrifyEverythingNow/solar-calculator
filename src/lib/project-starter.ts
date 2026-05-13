export type Project =
  | "roadmap"
  | "panel"
  | "heat-pump"
  | "hpwh"
  | "balcony-solar"
  | "ev-charging"
  | "post-install-rates"
  | "not-sure";

export type Trigger = "quote" | "old-equipment" | "bills" | "comfort" | "climate" | "new-ev" | "curious";

export type Goal = "avoid-mistake" | "plan-sequence" | "ask-contractor" | "save-money" | "check-rules";

export const projectOptions: { value: Project; label: string }[] = [
  { value: "roadmap", label: "I want a roadmap for what to electrify first" },
  { value: "heat-pump", label: "I want a heat pump" },
  { value: "hpwh", label: "I want a heat pump water heater" },
  { value: "panel", label: "I was told I need a panel upgrade" },
  { value: "ev-charging", label: "I want EV charging" },
  { value: "balcony-solar", label: "I want balcony or plug-in solar" },
  { value: "post-install-rates", label: "I already electrified something and want to optimize rates" },
  { value: "not-sure", label: "I do not know where to start" },
];

export const triggerOptions: { value: Trigger; label: string }[] = [
  { value: "quote", label: "A contractor quote or recommendation" },
  { value: "old-equipment", label: "Old equipment that may need replacement" },
  { value: "bills", label: "High bills" },
  { value: "comfort", label: "Comfort problems" },
  { value: "climate", label: "Climate or indoor air quality" },
  { value: "new-ev", label: "A new or planned EV" },
  { value: "curious", label: "I am curious and planning ahead" },
];

export const goalOptions: { value: Goal; label: string }[] = [
  { value: "avoid-mistake", label: "Avoid an expensive mistake" },
  { value: "plan-sequence", label: "Figure out the right order" },
  { value: "ask-contractor", label: "Know what to ask a contractor" },
  { value: "save-money", label: "Save money" },
  { value: "check-rules", label: "Check rules, rates, or rebates" },
];

export const defaultProjectStarterSelection = {
  project: "roadmap",
  trigger: "curious",
  goal: "avoid-mistake",
} as const satisfies { project: Project; trigger: Trigger; goal: Goal };

const projectValues = new Set(projectOptions.map((option) => option.value));
const triggerValues = new Set(triggerOptions.map((option) => option.value));
const goalValues = new Set(goalOptions.map((option) => option.value));

export function isProject(value: string | null | undefined): value is Project {
  return typeof value === "string" && projectValues.has(value as Project);
}

export function isTrigger(value: string | null | undefined): value is Trigger {
  return typeof value === "string" && triggerValues.has(value as Trigger);
}

export function isGoal(value: string | null | undefined): value is Goal {
  return typeof value === "string" && goalValues.has(value as Goal);
}

export function projectStarterPrefill(params: Pick<URLSearchParams, "get"> | null | undefined) {
  const projectParam = params?.get("project");
  const triggerParam = params?.get("trigger");
  const goalParam = params?.get("goal");

  return {
    project: isProject(projectParam) ? projectParam : defaultProjectStarterSelection.project,
    trigger: isTrigger(triggerParam) ? triggerParam : defaultProjectStarterSelection.trigger,
    goal: isGoal(goalParam) ? goalParam : defaultProjectStarterSelection.goal,
  };
}

export function recommendation(project: Project, trigger: Trigger, goal: Goal) {
  if (project === "roadmap" || project === "not-sure") {
    return {
      kind: "roadmap" as Project,
      title: "Start with an electrification roadmap, not rates",
      body:
        "The first decision is usually project order. Start with the upgrades most likely to cut fossil-fuel use and bills: heat pump HVAC, heat pump water heater, smart panel/EV planning, then smaller projects. Rate optimization is useful after you know what loads you are adding.",
      href: "#roadmap-questions",
      cta: "Refine my roadmap below",
      next: [
        "Prioritize big fuel-switching loads first: space heating, water heating, and driving.",
        "Check panel risk before approving expensive electrical work.",
        "Use balcony solar as its own separate tool because rules and site conditions matter more than sequencing.",
        "Come back to the Rate Optimizer after a heat pump, EV, battery, or solar install is likely.",
      ],
    };
  }

  if (project === "panel" || (trigger === "quote" && goal === "avoid-mistake")) {
    return {
      kind: "panel" as Project,
      title: "Start with the Panel Upgrade Second Opinion",
      body:
        "Before assuming you need a full service upgrade, separate breaker-space problems from actual electrical capacity problems. The tool will give you questions to ask an electrician.",
      href: "/panel-checker",
      cta: "Open Panel Checker",
      next: [
        "Ask whether the issue is breaker space, load capacity, panel compatibility, or code/AHJ requirement.",
        "If you have a panel photo, use it only if helpful. We do not keep your photos.",
        "Save the result questions and use them before approving expensive electrical work.",
      ],
    };
  }

  if (project === "balcony-solar") {
    return {
      kind: "balcony-solar" as Project,
      title: "Start with the Balcony Solar Calculator",
      body:
        "Rules are changing quickly. Check whether your state, building, outlet setup, and sun exposure make plug-in or balcony solar worth exploring before buying anything.",
      href: "/solar",
      cta: "Open Balcony Solar Calculator",
      next: [
        "Check state legality and building/HOA/landlord constraints first.",
        "Look at shade and orientation before getting excited about wattage.",
        "If the setup is weak, compare community solar or utility green-power options.",
      ],
    };
  }

  if (project === "post-install-rates") {
    return {
      kind: "post-install-rates" as Project,
      title: "Use the Rate Optimizer after the project is defined",
      body:
        "Rates are important, but they are usually a second-step decision. Use this after a heat pump, EV charger, battery, or solar install is likely so you can compare plans against your future load shape.",
      href: "/rates",
      cta: "Open Rate Optimizer",
      next: [
        "First decide what you are installing and roughly when it will run.",
        "Then compare time-of-use windows, EV plans, solar export rules, and battery options.",
        "Use this as planning guidance, then verify with your utility.",
      ],
    };
  }

  if (project === "heat-pump") {
    return {
      kind: "heat-pump" as Project,
      title: "Use the Heat Pump Cold-Weather Fit Checker",
      body:
        "Start by checking whether a quoted heat pump size and model family is likely to keep up in your climate. The tool estimates the cold-weather hours when the system may be challenged, then gives contractor questions about sizing, backup heat, and exact model performance.",
      href: "/heat-pump-fit",
      cta: "Check heat pump fit",
      next: [
        "Use ZIP code, rough square footage, home tightness, quoted tons, and heat pump family.",
        "Ask whether the quote includes a Manual J, exact low-temperature capacity, backup heat, and electrical scope.",
        "Use the Panel Checker if the contractor says electrical capacity is the blocker.",
      ],
    };
  }

  if (project === "hpwh") {
    return {
      kind: "hpwh" as Project,
      title: "Heat Pump Water Heater Fit Checker is the next simple tool",
      body:
        "The tool is coming next. The main early question is whether your water heater location has enough air volume, drainage, electrical path, and noise tolerance.",
      href: "/install-guide",
      cta: "Read current guides",
      next: [
        "If helpful, keep your own photos of the water heater, label, surrounding space, and nearby drain. You do not need to upload photos to use this.",
        "Ask about 120V vs 240V options and whether electrical work is included.",
        "Plan before emergency replacement if you can. Emergency swaps often default back to gas.",
      ],
    };
  }

  if (project === "ev-charging" || trigger === "new-ev") {
    return {
      kind: "ev-charging" as Project,
      title: "Start with panel questions, then EV charger sizing",
      body:
        "Most homeowners need reliable overnight charging, not the maximum charger size. Lower-amp Level 2, Level 1, load sharing, or dynamic load management may avoid bigger electrical work.",
      href: "/panel-checker",
      cta: "Check panel options first",
      next: [
        "Estimate your daily miles and overnight parking time before sizing the charger.",
        "Ask about lower-amp Level 2 and load management before assuming a panel upgrade.",
        "Use the Panel Checker if an electrician says the panel is the blocker.",
      ],
    };
  }

  return {
    kind: "roadmap" as Project,
    title: "Start with the highest-savings roadmap",
    body:
      "If you are not sure where to begin, prioritize the projects most likely to change household energy use first: space heating, water heating, driving, then cooking and smaller loads. Check panel risk before approving expensive electrical work.",
    href: "#roadmap-questions",
    cta: "Refine my roadmap below",
    next: [
      "Start with large fossil-fuel loads: heat pump HVAC and heat pump water heater.",
      "If you drive or plan to, evaluate EV charging without assuming a panel upgrade.",
      "Treat balcony solar as its own rule-and-site-specific tool, not the core roadmap.",
    ],
  };
}

export function contractorChecklist(project: Project, resultTitle: string) {
  const shared = [
    "Confirm what permits, inspections, utility approvals, or AHJ requirements apply before work starts.",
    "Ask for a written scope that separates equipment, electrical work, permits, utility coordination, and optional add-ons.",
  ];

  if (project === "panel") {
    return [
      "Ask whether the problem is breaker space, service/load capacity, panel condition, or a local code/AHJ requirement.",
      "Ask for a load calculation and whether load management, tandem breakers, a subpanel, or circuit sharing could avoid a full service upgrade.",
      "Confirm whether the quote includes utility coordination, meter work, trenching, drywall/patching, and permit fees.",
      "Ask what future loads the design assumes: heat pump HVAC, heat pump water heater, EV charging, induction, solar, or battery.",
      ...shared,
    ];
  }

  if (project === "heat-pump") {
    return [
      "Ask whether the quote is based on a Manual J or other room-by-room sizing method, not just the old furnace size.",
      "Request the exact outdoor and indoor model numbers and their low-temperature heating capacity for your climate.",
      "Ask how backup heat will work, when it turns on, and whether it is included in the electrical scope.",
      "Confirm ductwork, thermostat, condensate, line-set, noise, and warranty details in writing.",
      ...shared,
    ];
  }

  if (project === "hpwh") {
    return [
      "Confirm the water heater location has enough air volume, drainage/condensate handling, clearance, and acceptable noise.",
      "Ask whether a 120V, 240V, shared circuit, or panel work option is being proposed and why.",
      "Ask how the installer will handle mixing valves, seismic strapping, venting/capping old gas lines, and disposal of the old unit.",
      "Plan timing before emergency replacement if possible, so you are not pushed back into a like-for-like gas unit.",
      ...shared,
    ];
  }

  if (project === "ev-charging") {
    return [
      "Share daily miles, overnight parking time, and vehicle charging limits before choosing charger amperage.",
      "Ask whether Level 1, lower-amp Level 2, load sharing, or dynamic load management can meet your needs without a panel upgrade.",
      "Confirm charger location, conduit path, weather rating, GFCI/breaker needs, and whether the charger is hardwired or plug-in.",
      "Ask your utility about EV rates, rebates, and any required charger enrollment before installation.",
      ...shared,
    ];
  }

  if (project === "balcony-solar") {
    return [
      "Verify state, utility, building, HOA, landlord, and local electrical rules before buying equipment.",
      "Ask what outlet type, circuit rating, mounting method, disconnects, and anti-islanding or interconnection requirements apply.",
      "Check sun exposure, shading, wind, railing/wall attachment, and whether the system can be installed without creating a hazard.",
      "Compare balcony solar with community solar or utility green-power options if rules or site conditions are weak.",
      ...shared,
    ];
  }

  if (project === "post-install-rates") {
    return [
      "Gather one year of usage if available and note when the new heat pump, EV, battery, or solar system usually runs.",
      "Ask the utility which rates you are eligible for and how time-of-use windows, minimum bills, demand charges, and export credits work.",
      "Confirm whether EV, solar, battery, or heat pump programs require specific equipment settings or enrollment.",
      "Set a calendar reminder to re-check the rate after you have a few months of real post-install usage.",
      ...shared,
    ];
  }

  return [
    `Start from the current recommendation: ${resultTitle}. Ask the contractor how their proposal supports that sequence.`,
    "List the big future loads you may add: heat pump HVAC, heat pump water heater, EV charging, induction, solar, or battery.",
    "Ask which work should happen now versus later so you do not pay twice for electrical, drywall, or permit work.",
    "Ask for options, not just one quote: right-sized equipment, load management, phased work, and rebate-aware timing.",
    ...shared,
  ];
}

export function checklistCopyText(resultTitle: string, items: string[]) {
  return [
    "Contractor checklist",
    resultTitle,
    "",
    ...items.map((item, index) => `${index + 1}. ${item}`),
    "",
    "EEN caveat: This is planning support, not electrical or legal advice. Verify details with a licensed electrician or contractor, your utility, and your local authority having jurisdiction (AHJ) as relevant.",
  ].join("\n");
}
