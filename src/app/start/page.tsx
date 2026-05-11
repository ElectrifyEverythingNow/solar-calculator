"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import { trackEvent } from "@/lib/analytics";
import {
  checklistCopyText,
  contractorChecklist,
  goalOptions,
  projectOptions,
  recommendation,
  triggerOptions,
  type Goal,
  type Project,
  type Trigger,
} from "@/lib/project-starter";

export default function ProjectStarterPage() {
  const [project, setProject] = useState<Project>("roadmap");
  const [trigger, setTrigger] = useState<Trigger>("curious");
  const [goal, setGoal] = useState<Goal>("avoid-mistake");
  const [checklistCopyStatus, setChecklistCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  const result = useMemo(() => recommendation(project, trigger, goal), [project, trigger, goal]);
  const checklistItems = useMemo(() => contractorChecklist(result.kind, result.title), [result.kind, result.title]);
  const checklistText = useMemo(
    () => checklistCopyText(result.title, checklistItems),
    [checklistItems, result.title],
  );

  useEffect(() => {
    trackEvent("project_starter_viewed", { tool_id: "project_starter" });
  }, []);

  useEffect(() => {
    trackEvent("project_starter_recommendation_changed", {
      tool_id: "project_starter",
      project_type: project,
      trigger,
      goal,
      result_type: result.title,
    });
  }, [goal, project, result.title, trigger]);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <section className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <Link href="/" className="text-sm font-bold text-emerald-300 hover:text-emerald-200">
          ← Back to home
        </Link>
        <div className="mt-6 max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-200">
            Project Starter
          </p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            What should you electrify first?
          </h1>
          <p className="mt-5 text-lg leading-8 text-zinc-300">
            Answer three plain-English questions. We’ll start with a rough roadmap based on likely energy savings and expensive-mistake risk, then point you to the best tool or contractor question.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            ["1", "Heat pump HVAC", "Usually the biggest home energy and comfort lever if you heat with gas, propane, oil, or resistance electric."],
            ["2", "Heat pump water heater", "Often a strong savings project and easier if planned before emergency replacement."],
            ["3", "Panel + EV readiness", "Avoid overspending by checking load management and right-sized charging before upgrades."],
            ["Later", "Rates and balcony solar", "Optimize rates after new loads are clear. Treat balcony solar as a standalone rules-and-sun tool."],
          ].map(([rank, title, text]) => (
            <div key={title} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">{rank}</p>
              <h2 className="mt-2 font-extrabold text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <section id="roadmap-questions" className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
            <div className="space-y-6">
              <label className="block">
                <span className="text-sm font-bold text-zinc-200">1. What are you considering?</span>
                <select
                  value={project}
                  onChange={(event) => {
                    const nextProject = event.target.value as Project;
                    setProject(nextProject);
                    setChecklistCopyStatus("idle");
                    trackEvent("project_starter_step_completed", {
                      tool_id: "project_starter",
                      step_id: "project",
                      project_type: nextProject,
                    });
                  }}
                  className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
                >
                  {projectOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-bold text-zinc-200">2. What triggered this?</span>
                <select
                  value={trigger}
                  onChange={(event) => {
                    const nextTrigger = event.target.value as Trigger;
                    setTrigger(nextTrigger);
                    setChecklistCopyStatus("idle");
                    trackEvent("project_starter_step_completed", {
                      tool_id: "project_starter",
                      step_id: "trigger",
                      trigger: nextTrigger,
                    });
                  }}
                  className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
                >
                  {triggerOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-bold text-zinc-200">3. What are you trying to do?</span>
                <select
                  value={goal}
                  onChange={(event) => {
                    const nextGoal = event.target.value as Goal;
                    setGoal(nextGoal);
                    setChecklistCopyStatus("idle");
                    trackEvent("project_starter_step_completed", {
                      tool_id: "project_starter",
                      step_id: "goal",
                      goal: nextGoal,
                    });
                  }}
                  className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
                >
                  {goalOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>
            </div>
          </section>

          <section className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-6 shadow-xl">
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-200">Recommended next step</p>
            <h2 className="mt-3 text-2xl font-black text-white">{result.title}</h2>
            <p className="mt-4 text-sm leading-6 text-zinc-200">{result.body}</p>
            <Link
              href={result.href}
              onClick={() => {
                trackEvent("project_starter_completed", {
                  tool_id: "project_starter",
                  project_type: project,
                  trigger,
                  goal,
                  result_type: result.title,
                  destination: result.href,
                });
              }}
              className="mt-6 inline-flex rounded-xl bg-emerald-400 px-5 py-3 font-bold text-zinc-950 hover:bg-emerald-300"
            >
              {result.cta}
            </Link>
            <div className="mt-6 rounded-2xl border border-zinc-700 bg-zinc-950/70 p-4">
              <h3 className="font-bold text-white">What to do next</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-300">
                {result.next.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </div>
          </section>
        </div>

        <section
          aria-labelledby="contractor-checklist-heading"
          className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-300">Contractor-ready checklist</p>
              <h2 id="contractor-checklist-heading" className="mt-2 text-2xl font-black text-white">
                Questions to bring to a contractor
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">
                Use this as a no-pressure starting point for the recommendation above. You do not need to share your email or upload photos to use it.
              </p>
            </div>
            <div className="sm:text-right">
              <button
                type="button"
                onClick={async () => {
                  let copied = false;

                  const copyWithFallback = () => {
                    if (typeof document === "undefined") return false;

                    const textarea = document.createElement("textarea");
                    textarea.value = checklistText;
                    textarea.setAttribute("readonly", "");
                    textarea.style.position = "fixed";
                    textarea.style.left = "-9999px";
                    document.body.appendChild(textarea);

                    try {
                      textarea.select();
                      return document.execCommand("copy");
                    } catch {
                      return false;
                    } finally {
                      document.body.removeChild(textarea);
                    }
                  };

                  if (navigator.clipboard?.writeText) {
                    try {
                      await navigator.clipboard.writeText(checklistText);
                      copied = true;
                    } catch {
                      copied = copyWithFallback();
                    }
                  } else {
                    copied = copyWithFallback();
                  }

                  setChecklistCopyStatus(copied ? "copied" : "failed");
                  trackEvent("project_starter_checklist_copied", {
                    tool_id: "project_starter",
                    project_type: project,
                    result_type: result.title,
                    copy_result: copied ? "success" : "failed",
                  });
                }}
                className="inline-flex rounded-xl bg-zinc-50 px-5 py-3 font-bold text-zinc-950 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-zinc-900"
              >
                Copy checklist
              </button>
              <p aria-live="polite" className="mt-2 min-h-5 text-sm text-zinc-400">
                {checklistCopyStatus === "copied"
                  ? "Copied to clipboard."
                  : checklistCopyStatus === "failed"
                    ? "Copy did not work. You can still select the questions below."
                    : ""}
              </p>
            </div>
          </div>

          <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-6 text-zinc-200">
            {checklistItems.map((item) => (
              <li key={item} className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 pl-5">
                {item}
              </li>
            ))}
          </ol>

          <p className="mt-5 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
            EEN caveat: This is planning support, not electrical or legal advice. Verify details with a licensed electrician or contractor, your utility, and your local authority having jurisdiction (AHJ) as relevant.
          </p>
        </section>

        <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <FeedbackWidget
            toolId="project_starter"
            resultType={result.title}
            source="project_starter_page"
          />
        </div>
      </section>
    </main>
  );
}
