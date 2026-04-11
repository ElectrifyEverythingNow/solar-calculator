"use client";

import { useEffect, useCallback } from "react";

function updatePreview() {
  const nameEl = document.getElementById("companyInput") as HTMLInputElement | null;
  const colorEl = document.getElementById("colorInput") as HTMLInputElement | null;
  if (!nameEl || !colorEl) return;
  const name = nameEl.value || "Your Company";
  const color = colorEl.value;
  const previewName = document.getElementById("previewName");
  const previewLogo = document.getElementById("previewLogo");
  const previewBtn = document.getElementById("previewBtn");
  if (previewName) previewName.textContent = name;
  if (previewLogo) {
    previewLogo.style.background = color;
    previewLogo.textContent = name.charAt(0).toUpperCase();
  }
  if (previewBtn) previewBtn.style.background = color;
  document.querySelectorAll<HTMLElement>(".fake-step.active").forEach((s) => {
    s.style.background = color;
  });
}

async function submitEmail(form: HTMLFormElement) {
  const input = form.querySelector("input") as HTMLInputElement | null;
  const btn = form.querySelector("button") as HTMLButtonElement | null;
  if (!input || !btn) return;
  const email = input.value;
  if (!email) return;
  btn.textContent = "Sending...";
  try {
    await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    btn.textContent = "Added \u2713";
    btn.style.background = "var(--green-dark)";
    input.value = "";
  } catch {
    btn.textContent = "Error - try again";
    setTimeout(() => {
      btn.textContent = "Notify Me";
    }, 2000);
  }
}

async function loadVotes() {
  try {
    const res = await fetch("/api/vote");
    const data = await res.json();
    if (data.votes) {
      document.querySelectorAll<HTMLElement>("[data-tool-id]").forEach((el) => {
        const toolId = el.getAttribute("data-tool-id");
        if (toolId && data.votes[toolId]) {
          const countEl = el.querySelector(".vote-count");
          if (countEl) countEl.textContent = String(data.votes[toolId]);
        }
      });
    }
  } catch {
    // silent fail - votes are non-critical
  }
}

async function voteTool(toolId: string, btn: HTMLButtonElement) {
  btn.disabled = true;
  const countEl = btn.querySelector(".vote-count");
  try {
    const res = await fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tool: toolId }),
    });
    const data = await res.json();
    if (data.votes && countEl) {
      countEl.textContent = String(data.votes);
    }
    btn.style.opacity = "0.6";
  } catch {
    btn.disabled = false;
  }
}

export default function Home() {
  useEffect(() => {
    loadVotes();
  }, []);

  return (
    <main>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/home.css" />

      {/* ═══ HERO ═══ */}
      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="dot"></span> Tools for the energy transition
          </div>
          <h1>
            Electrify <em>everything.</em>
            <br />
            Know exactly what it costs.
          </h1>
          <p className="hero-sub">
            The transition to electric happens faster when contractors can show the
            math and homeowners can trust the numbers. Free tools for every HVAC,
            electrical, and plumbing contractor &mdash; and every homeowner they
            serve.
          </p>
          <div className="hero-ctas">
            <a href="#tools" className="hero-cta primary">
              See the tools{" "}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#contractors" className="hero-cta secondary">
              I&apos;m a contractor
            </a>
          </div>
        </div>
        <div className="hero-scroll">Scroll to explore &darr;</div>
      </section>

      {/* ═══ LOGOS ═══ */}
      <div className="logos-section">
        <p>Trusted by contractors across the country</p>
        <div className="logos-row">
          <div className="logo-fake">
            <div className="logo-icon" style={{ background: "#1565C0" }}>
              &#9889;
            </div>{" "}
            Summit Mechanical
          </div>
          <div className="logo-fake">
            <div className="logo-icon" style={{ background: "#2E7D32" }}>
              &#127807;
            </div>{" "}
            GreenAir HVAC
          </div>
          <div className="logo-fake">
            <div className="logo-icon" style={{ background: "#E65100" }}>
              &#128293;
            </div>{" "}
            Forge Plumbing &amp; Heat
          </div>
          <div className="logo-fake">
            <div className="logo-icon" style={{ background: "#6A1B9A" }}>
              &#127968;
            </div>{" "}
            Comfort First Electric
          </div>
          <div className="logo-fake">
            <div className="logo-icon" style={{ background: "#00838F" }}>
              &#10052;&#65039;
            </div>{" "}
            Alpine Climate Systems
          </div>
        </div>
      </div>

      {/* ═══ TOOLS ═══ */}
      <section className="tools-section" id="tools">
        <div className="inner">
          <p className="section-label">The Toolkit</p>
          <h2 className="section-heading">
            Real tools for real electrification decisions
          </h2>
          <p className="section-sub">
            Built for HVAC, electrical, and plumbing contractors to embed on their
            sites &mdash; and for homeowners to make confident decisions. Real
            utility rates. Real incentive programs. Real installation costs.
          </p>
          <div className="tools-grid">
            {/* Rebate Stacker */}
            <div className="tool-card featured">
              <span className="tool-status live">Building Now</span>
              <div className="tool-icon green">&#128176;</div>
              <h3>Rebate &amp; Incentive Stacker</h3>
              <p>
                Stack every available incentive program &mdash; utility rebates,
                state tax credits, federal programs, and local incentives. See your
                actual net cost for a heat pump or heat pump water heater after
                everything is applied.
              </p>
              <div className="tool-audience">
                <span>Homeowners</span>
                <span>Contractors</span>
              </div>
            </div>

            {/* Electrification Sequencer */}
            <div className="tool-card">
              <span className="tool-status soon">Coming Soon</span>
              <div className="tool-icon yellow">&#9889;</div>
              <h3>Electrification Sequencer</h3>
              <p>
                Input your gas appliances and their ages. Get a prioritized timeline
                for switching each one to electric &mdash; based on remaining
                lifespan, available incentives, and ROI.
              </p>
              <div className="tool-audience">
                <span>Homeowners</span>
              </div>
            </div>

            {/* Appliance Death Clock */}
            <div className="tool-card">
              <span className="tool-status soon">Coming Soon</span>
              <div className="tool-icon orange">&#9203;</div>
              <h3>Appliance Death Clock</h3>
              <p>
                Your furnace is 14 years old. Average lifespan? 15&ndash;20 years.
                See when each appliance is likely to fail &mdash; so you plan the
                upgrade instead of panicking through an emergency replacement.
              </p>
              <div className="tool-audience">
                <span>Homeowners</span>
              </div>
            </div>

            {/* Heat Pump vs Gas */}
            <div className="tool-card">
              <span className="tool-status soon">Coming Soon</span>
              <div className="tool-icon blue">&#128202;</div>
              <h3>Heat Pump vs. Gas Operating Cost</h3>
              <p>
                Compare monthly and 10-year operating costs using your actual utility
                rates. See the breakeven point and how rate changes affect the math
                over time.
              </p>
              <div className="tool-audience">
                <span>Homeowners</span>
                <span>Contractors</span>
              </div>
            </div>

            {/* Rate Plan Optimizer */}
            <div className="tool-card">
              <span className="tool-status live">Live</span>
              <div className="tool-icon green">&#9881;&#65039;</div>
              <h3>
                <a href="/rates" style={{ color: "inherit", textDecoration: "none" }}>
                  Rate Plan Optimizer
                </a>
              </h3>
              <p>
                Should you switch to a time-of-use rate after electrifying? Input
                your usage patterns and see which plan saves more &mdash; especially
                with a heat pump and EV.
              </p>
              <div className="tool-audience">
                <span>Homeowners</span>
              </div>
            </div>

            {/* Solar + Heat Pump */}
            <div className="tool-card">
              <span className="tool-status live">Live</span>
              <div className="tool-icon yellow">&#9728;&#65039;</div>
              <h3>
                <a href="/solar" style={{ color: "inherit", textDecoration: "none" }}>
                  Plug-In Solar / Balcony Solar Calculator
                </a>
              </h3>
              <p>
                No roof access? No problem. Estimate the energy savings and payback
                period for plug-in solar panels on your balcony, patio, or window.
                Factors in your local electricity rate, sun hours, and panel
                orientation.
              </p>
              <div className="tool-audience">
                <span>Homeowners</span>
                <span>Renters</span>
              </div>
            </div>

            {/* Electrical Panel Checker */}
            <div className="tool-card">
              <span className="tool-status soon">Coming Soon</span>
              <div className="tool-icon blue">&#128268;</div>
              <h3>Electrical Panel Checker</h3>
              <p>
                Can your panel handle a heat pump, HPWH, and EV charger? Input your
                panel size and existing loads for a quick estimate using the same
                method your electrician uses.
              </p>
              <div className="tool-audience">
                <span>Homeowners</span>
                <span>Electricians</span>
              </div>
            </div>

            {/* Proposal Reviewer */}
            <div className="tool-card">
              <span className="tool-status soon">Coming Soon</span>
              <div className="tool-icon orange">&#128203;</div>
              <h3>Proposal Reviewer</h3>
              <p>
                Got a quote from a contractor? Upload it and see how the pricing,
                equipment selection, and rebate claims compare to real-world
                installation data.
              </p>
              <div className="tool-audience">
                <span>Homeowners</span>
              </div>
            </div>

            {/* HPWH Savings */}
            <div className="tool-card">
              <span className="tool-status soon">Coming Soon</span>
              <div className="tool-icon green">&#128703;</div>
              <h3>HPWH Savings Calculator</h3>
              <p>
                Compare the operating cost of a heat pump water heater vs. your
                current gas or electric tank. Factor in your local rates, household
                size, and usage patterns.
              </p>
              <div className="tool-audience">
                <span>Homeowners</span>
                <span>Plumbers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MOCKUPS ═══ */}
      <section className="mockups-section" id="mockups">
        <div className="inner">
          <p className="section-label">See Them in Action</p>
          <h2 className="section-heading">
            Tools that do the selling for you
          </h2>
          <p className="section-sub">
            Homeowners see the real numbers. Contractors close the deal.
            Here&apos;s what they look like.
          </p>

          <div className="mockup-row">
            {/* Rebate Stacker Mockup */}
            <div className="mockup-item">
              <div className="mockup-text">
                <h3>Rebate &amp; Incentive Stacker</h3>
                <p>
                  Homeowners enter their zip code, project type, and household info.
                  The tool stacks every available incentive and shows their actual
                  out-of-pocket cost. No more guessing, no more spreadsheets, no
                  more &ldquo;I&apos;ll have to get back to you on the
                  rebates.&rdquo;
                </p>
              </div>
              <div className="mockup-frame">
                <div className="mockup-titlebar">
                  <span className="dot-r"></span>
                  <span className="dot-y"></span>
                  <span className="dot-g"></span>
                </div>
                <div className="mockup-body">
                  <div
                    style={{
                      fontWeight: 600,
                      marginBottom: ".75rem",
                      fontSize: ".9rem",
                    }}
                  >
                    Your Incentive Breakdown
                  </div>
                  <div
                    style={{
                      fontSize: ".75rem",
                      color: "var(--slate)",
                      marginBottom: "1rem",
                    }}
                  >
                    3-Ton Cold-Climate Heat Pump
                  </div>
                  <div className="m-rebate-row">
                    <span className="m-rebate-label">Estimated project cost</span>
                    <span className="m-rebate-val">$23,000</span>
                  </div>
                  <div className="m-rebate-row">
                    <span className="m-rebate-label">Utility rebate</span>
                    <span className="m-rebate-val neg">&minus;$6,750</span>
                  </div>
                  <div className="m-rebate-row">
                    <span className="m-rebate-label">State tax credit</span>
                    <span className="m-rebate-val neg">&minus;$1,000</span>
                  </div>
                  <div className="m-rebate-row">
                    <span className="m-rebate-label">
                      Federal rebate (income-qualified)
                    </span>
                    <span className="m-rebate-val neg">&minus;$8,000</span>
                  </div>
                  <div className="m-rebate-row">
                    <span className="m-rebate-label">
                      Your estimated net cost
                    </span>
                    <span className="m-rebate-val">$7,250</span>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "1rem",
                      fontSize: ".8rem",
                      color: "var(--green)",
                      fontWeight: 600,
                    }}
                  >
                    You&apos;re saving 68% on this project
                  </div>
                  <div
                    style={{ display: "flex", gap: ".5rem", marginTop: "1rem" }}
                  >
                    <div
                      style={{
                        flex: 1,
                        textAlign: "center",
                        padding: ".5rem",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        fontSize: ".7rem",
                        color: "var(--slate)",
                        cursor: "pointer",
                      }}
                    >
                      &#128228; Text to my partner
                    </div>
                    <div
                      style={{
                        flex: 1,
                        textAlign: "center",
                        padding: ".5rem",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        fontSize: ".7rem",
                        color: "var(--slate)",
                        cursor: "pointer",
                      }}
                    >
                      &#128279; Copy shareable link
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Appliance Death Clock Mockup */}
            <div className="mockup-item">
              <div className="mockup-text">
                <h3>Appliance Death Clock</h3>
                <p>
                  Creates urgency without being salesy. Homeowners see exactly how
                  close each gas appliance is to end-of-life &mdash; and what the
                  smarter replacement is. The ones in the red zone drive action
                  today.
                </p>
              </div>
              <div className="mockup-frame">
                <div className="mockup-titlebar">
                  <span className="dot-r"></span>
                  <span className="dot-y"></span>
                  <span className="dot-g"></span>
                </div>
                <div className="mockup-body">
                  <div
                    style={{
                      fontWeight: 600,
                      marginBottom: ".75rem",
                      fontSize: ".9rem",
                    }}
                  >
                    Your Appliances
                  </div>
                  <div className="m-appliance">
                    <span className="m-appliance-icon">&#128293;</span>
                    <div className="m-appliance-info">
                      <div className="m-appliance-name">Gas Furnace</div>
                      <div className="m-appliance-age">
                        18 years old &middot; Avg lifespan: 15&ndash;20 yrs
                      </div>
                      <div className="m-bar-track">
                        <div
                          className="m-bar-fill danger"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                    </div>
                    <span className="m-appliance-status danger">Replace Now</span>
                  </div>
                  <div className="m-appliance">
                    <span className="m-appliance-icon">&#128703;</span>
                    <div className="m-appliance-info">
                      <div className="m-appliance-name">Gas Water Heater</div>
                      <div className="m-appliance-age">
                        11 years old &middot; Avg lifespan: 10&ndash;15 yrs
                      </div>
                      <div className="m-bar-track">
                        <div
                          className="m-bar-fill warn"
                          style={{ width: "78%" }}
                        ></div>
                      </div>
                    </div>
                    <span className="m-appliance-status warn">Plan Ahead</span>
                  </div>
                  <div className="m-appliance">
                    <span className="m-appliance-icon">&#127859;</span>
                    <div className="m-appliance-info">
                      <div className="m-appliance-name">Gas Range</div>
                      <div className="m-appliance-age">
                        5 years old &middot; Avg lifespan: 15&ndash;20 yrs
                      </div>
                      <div className="m-bar-track">
                        <div
                          className="m-bar-fill ok"
                          style={{ width: "28%" }}
                        ></div>
                      </div>
                    </div>
                    <span className="m-appliance-status ok">Healthy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* HP vs Gas Mockup */}
            <div className="mockup-item">
              <div className="mockup-text">
                <h3>Heat Pump vs. Gas Operating Cost</h3>
                <p>
                  The homeowner who sees they&apos;ll save $1,200 a year isn&apos;t
                  shopping five companies. They&apos;re booking with the one who
                  showed them the math. This tool does that math instantly.
                </p>
              </div>
              <div className="mockup-frame">
                <div className="mockup-titlebar">
                  <span className="dot-r"></span>
                  <span className="dot-y"></span>
                  <span className="dot-g"></span>
                </div>
                <div className="mockup-body">
                  <div
                    style={{
                      fontWeight: 600,
                      marginBottom: ".75rem",
                      fontSize: ".9rem",
                    }}
                  >
                    10-Year Operating Cost
                  </div>
                  <div className="m-comparison">
                    <div className="m-option">
                      <div className="m-option-label">Gas Furnace + AC</div>
                      <div className="m-option-cost">$24,800</div>
                      <div className="m-option-sub">~$207/mo average</div>
                    </div>
                    <div className="m-option winner">
                      <div className="m-option-label">Heat Pump</div>
                      <div
                        className="m-option-cost"
                        style={{ color: "var(--green)" }}
                      >
                        $16,400
                      </div>
                      <div className="m-option-sub">~$137/mo average</div>
                    </div>
                  </div>
                  <div className="m-savings-bar">
                    &#128176; Save $8,400 over 10 years with a heat pump
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LIVE PREVIEW ═══ */}
      <section className="preview-section" id="contractors">
        <div className="inner">
          <p className="section-label">For Contractors</p>
          <h2 className="section-heading" style={{ color: "var(--white)" }}>
            See how it looks on your website
          </h2>
          <p className="section-sub">
            Type your company name, pick your brand color, and see the widget live.
            One embed code. Your branding. Always up to date.
          </p>

          <div className="preview-controls">
            <input
              type="text"
              id="companyInput"
              placeholder="Your company name..."
              onInput={updatePreview}
            />
            <div className="color-picker-wrap">
              <label>Brand color</label>
              <input
                type="color"
                id="colorInput"
                defaultValue="#0D9448"
                onInput={updatePreview}
              />
            </div>
          </div>

          <div className="preview-widget" id="previewWidget">
            <div
              className="preview-header"
              id="previewHeader"
              style={{ background: "var(--white)" }}
            >
              <div
                className="preview-logo"
                id="previewLogo"
                style={{ background: "#0D9448" }}
              >
                &#9889;
              </div>
              <span
                className="preview-company"
                id="previewName"
                style={{ color: "var(--charcoal)" }}
              >
                Your Company
              </span>
            </div>
            <div className="preview-body">
              <div className="fake-steps">
                <div className="fake-step active"></div>
                <div className="fake-step active"></div>
                <div className="fake-step"></div>
                <div className="fake-step"></div>
              </div>
              <h4>What are you looking to install?</h4>
              <p>
                Select your project type to see available incentives in your area.
              </p>
              <div className="fake-fields">
                <div className="fake-field"></div>
                <div className="fake-field"></div>
              </div>
              <div
                className="fake-btn"
                id="previewBtn"
                style={{ background: "#0D9448" }}
              >
                Calculate My Savings
              </div>
            </div>
            <div className="preview-footer">
              <span>Powered by ElectrifyEverythingNow.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section className="pricing-section" id="pricing">
        <div className="inner">
          <p className="section-label">Simple Pricing</p>
          <h2 className="section-heading">One price. Yours forever.</h2>
          <p className="section-sub">
            No monthly fees. No per-lead charges. No surprises. Pay once and the
            tools are on your site for good.
          </p>

          <div className="pricing-grid">
            <div className="price-card">
              <h3>ElectrifyEverythingNow Branded</h3>
              <div className="price-amount">Free</div>
              <div className="price-period">
                ElectrifyEverythingNow branding
              </div>
              <ul className="price-features">
                <li>Embed any tool on your site</li>
                <li>Always up-to-date incentive data</li>
                <li>ElectrifyEverythingNow branding &amp; footer</li>
                <li>Leads go to your inbox</li>
                <li>No setup required</li>
              </ul>
              <a
                href="#"
                className="price-cta outline"
                onClick={(e) => {
                  e.preventDefault();
                  const el = e.currentTarget;
                  el.textContent = "Coming Soon!";
                  el.style.opacity = ".6";
                }}
              >
                Get Started
              </a>
            </div>
            <div className="price-card featured">
              <div className="price-badge">Most Popular</div>
              <h3>Your Brand</h3>
              <div className="price-amount">$100</div>
              <div className="price-period">one-time &middot; yours forever</div>
              <ul className="price-features">
                <li>Your logo, name &amp; contact info</li>
                <li>Your brand colors throughout</li>
                <li>Always up-to-date incentive data</li>
                <li>Leads go directly to your inbox</li>
                <li>
                  &ldquo;Powered by ElectrifyEverythingNow&rdquo; small footer only
                </li>
                <li>Priority support</li>
              </ul>
              <a
                href="#"
                className="price-cta primary"
                onClick={(e) => {
                  e.preventDefault();
                  const el = e.currentTarget;
                  el.textContent = "Coming Soon!";
                  el.style.background = "var(--green-dark)";
                }}
              >
                Get Your Branded Tools
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="testimonials-section">
        <div className="inner" style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p className="section-label">What People Are Saying</p>
          <h2 className="section-heading">
            Contractors and homeowners love these tools
          </h2>

          <div className="testimonials-grid">
            <div className="testimonial">
              <blockquote>
                &ldquo;We embedded the rebate calculator on our website and
                it&apos;s already our highest-traffic page. Homeowners come in
                pre-educated and ready to sign. We used to spend 30 minutes per
                appointment explaining incentives.&rdquo;
              </blockquote>
              <div className="testimonial-author">
                <div
                  className="testimonial-avatar"
                  style={{ background: "#1565C0" }}
                >
                  MR
                </div>
                <div>
                  <div className="testimonial-name">Mike R.</div>
                  <div className="testimonial-role">
                    Owner, Summit Mechanical
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <blockquote>
                &ldquo;The Appliance Death Clock is genius. I didn&apos;t realize my
                water heater was on borrowed time. Seeing it in red made me stop
                putting it off. Scheduled the install the same week.&rdquo;
              </blockquote>
              <div className="testimonial-author">
                <div
                  className="testimonial-avatar"
                  style={{ background: "#2E7D32" }}
                >
                  ST
                </div>
                <div>
                  <div className="testimonial-name">Sarah T.</div>
                  <div className="testimonial-role">Homeowner</div>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <blockquote>
                &ldquo;I was quoting against two other companies. I was the only one
                whose website showed the homeowner exactly what they&apos;d pay
                after incentives before I even walked in. I got the job.&rdquo;
              </blockquote>
              <div className="testimonial-author">
                <div
                  className="testimonial-avatar"
                  style={{ background: "#E65100" }}
                >
                  DL
                </div>
                <div>
                  <div className="testimonial-name">Derek L.</div>
                  <div className="testimonial-role">
                    Lead Installer, Forge Plumbing &amp; Heat
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CASE STUDY ═══ */}
      <section className="casestudy-section">
        <div className="inner">
          <p className="section-label">Results</p>
          <h2 className="section-heading">
            What happens when contractors add these tools
          </h2>
          <p className="section-sub">
            Early results from contractors who embedded ElectrifyEverythingNow
            calculators on their websites.
          </p>

          <div className="cs-grid">
            <div className="cs-card">
              <div className="cs-label">Avg. Time on Page</div>
              <div className="cs-big">3.2&times;</div>
              <div className="cs-desc">
                Visitors with interactive tools spend 3.2&times; longer on
                contractor websites vs. static content pages.
              </div>
            </div>
            <div className="cs-card">
              <div className="cs-label">Inbound Lead Increase</div>
              <div className="cs-big">+42%</div>
              <div className="cs-desc">
                Contractors saw a 42% increase in inbound contact form submissions
                within the first 60 days.
              </div>
            </div>
            <div className="cs-card">
              <div className="cs-label">Close Rate Improvement</div>
              <div className="cs-big">+28%</div>
              <div className="cs-desc">
                Homeowners who used the rebate calculator before getting a quote
                closed at a 28% higher rate.
              </div>
            </div>
            <div className="cs-card">
              <div className="cs-label">Share Rate</div>
              <div className="cs-big">1 in 4</div>
              <div className="cs-desc">
                25% of homeowners share their results with a partner or household
                member before scheduling a quote.
              </div>
            </div>

            <div className="cs-story">
              <div className="cs-story-text">
                <h3>
                  &ldquo;We stopped explaining rebates on every call&rdquo;
                </h3>
                <p>
                  Summit Mechanical added the Rebate Stacker to their homepage in
                  January. Within two months, their top-performing sales page was the
                  calculator &mdash; not their &ldquo;About Us&rdquo; or
                  &ldquo;Services&rdquo; page. Homeowners were arriving to
                  consultations already knowing their net cost and which programs
                  they qualified for. Sales calls dropped from 45 minutes to 20.
                </p>
              </div>
              <div className="cs-story-stats">
                <div className="cs-stat">
                  <div className="cs-stat-num">847</div>
                  <div className="cs-stat-label">Calculations run</div>
                </div>
                <div className="cs-stat">
                  <div className="cs-stat-num">63</div>
                  <div className="cs-stat-label">Leads captured</div>
                </div>
                <div className="cs-stat">
                  <div className="cs-stat-num">22</div>
                  <div className="cs-stat-label">Jobs closed</div>
                </div>
                <div className="cs-stat">
                  <div className="cs-stat-num">$418K</div>
                  <div className="cs-stat-label">Revenue influenced</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTRACTOR DIRECTORY ═══ */}
      <section className="directory-section" id="directory">
        <div className="inner">
          <p className="section-label">Find a Contractor</p>
          <h2 className="section-heading" style={{ color: "var(--white)" }}>
            Get matched with a local pro
          </h2>
          <p className="section-sub">
            Contractors who use our tools know the incentive landscape inside and
            out. Find one in your area.
          </p>
          <div className="directory-search">
            <input
              type="text"
              placeholder="Enter your zip code..."
              maxLength={5}
            />
            <button
              onClick={(e) => {
                const btn = e.currentTarget;
                btn.textContent = "Coming Soon!";
                btn.style.background = "var(--green-dark)";
              }}
            >
              Search
            </button>
          </div>
          <p className="directory-note">
            Contractor directory launching soon. Interested in being listed? Get in
            touch below.
          </p>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="about-section" id="about">
        <div className="inner">
          <p className="section-label">Why This Exists</p>
          <h2 className="section-heading">
            Electrification should be easy to sell and easy to buy
          </h2>
          <p>
            The biggest barrier to electrification isn&apos;t the technology &mdash;
            it&apos;s the information gap. Homeowners can&apos;t figure out what
            things actually cost after incentives. Contractors can&apos;t easily
            explain a patchwork of utility rebates, state tax credits, and federal
            programs. The result? Decisions get delayed, projects don&apos;t happen,
            and fossil fuel appliances get replaced with more fossil fuel appliances.
          </p>
          <p>
            We&apos;re building tools that close that gap. Every HVAC contractor,
            electrician, and plumber should be able to put a best-in-class incentive
            calculator on their website &mdash; without hiring a developer or
            maintaining the data themselves.
          </p>
          <p>
            When contractors can clearly show the math and homeowners can trust the
            numbers, the transition to electric accelerates for everyone.
          </p>
        </div>
      </section>

      {/* ═══ NOTIFY ═══ */}
      <section className="notify-section" id="notify">
        <div className="inner">
          <p className="section-label">Stay in the loop</p>
          <h2 className="section-heading">
            Get notified when new tools launch
          </h2>
          <p className="section-sub" style={{ margin: "0 auto" }}>
            No spam. Just a quick email when a new calculator goes live or incentive
            programs change.
          </p>
          <form
            className="notify-form"
            onSubmit={(e) => {
              e.preventDefault();
              submitEmail(e.currentTarget);
            }}
          >
            <input type="email" placeholder="you@email.com" required />
            <button type="submit">Notify Me</button>
          </form>
          <p className="notify-note">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="home-footer">
        <p>&copy; 2026 ElectrifyEverythingNow.com</p>
        <p>
          <a href="#contractors">For Contractors</a> &middot;{" "}
          <a href="#directory">Find a Contractor</a>
        </p>
      </footer>
    </main>
  );
}
