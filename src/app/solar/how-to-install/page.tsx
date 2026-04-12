const steps = [
  {
    number: 1,
    title: "Check Your State's Plug-In Solar Legislation",
    description:
      "Before purchasing anything, verify whether your state has enacted or introduced plug-in solar legislation. As of 2026, Utah and Maine have signed plug-in solar into law, and Virginia and Colorado have passed legislation through their legislatures. Over 28 states have introduced bills. Check our legislation tracker to see your state's current status.",
    link: { href: "/solar", label: "Check your state's status" },
  },
  {
    number: 2,
    title: "Assess Your Sun Exposure and Orientation",
    description:
      "Evaluate your balcony, patio, or wall for solar potential. South-facing locations receive the most direct sunlight in the Northern Hemisphere, but east- and west-facing setups still produce meaningful energy. Check for shading from trees, neighboring buildings, or overhangs during peak sun hours (10 AM to 3 PM). Even partial shading can significantly reduce output.",
  },
  {
    number: 3,
    title: "Calculate Your Expected Savings",
    description:
      "Use our free balcony solar calculator to estimate your payback period and annual savings. Enter your state, utility rate, system size, and tilt angle to get an instant estimate based on NREL PVWatts solar irradiance data. No signup required.",
    link: { href: "/solar", label: "Run the free calculator" },
  },
  {
    number: 4,
    title: "Choose a UL 3700-Certified Panel Kit (800W\u20131,200W)",
    description:
      "Select a plug-in solar kit that carries UL 3700 certification. This standard ensures your system includes anti-islanding protection, which automatically shuts panels down during power outages to protect utility workers. Most kits range from 800W to 1,200W and include panels, a microinverter, mounting hardware, and a plug-ready cable.",
    externalLink: {
      href: "https://www.ul.com/resources/ul-3700-standard-plug-solar",
      label: "Learn about UL 3700",
    },
  },
  {
    number: 5,
    title: "Mount Panels on Your Railing, Patio, or Wall",
    description:
      "Follow the manufacturer's instructions to mount your panels. Common options include balcony railing brackets, ground-mount frames for patios, and wall-mount kits. No drilling into structural elements is typically required. Ensure panels are angled to maximize sun exposure \u2014 a 30\u00b0 tilt is a good starting point for most U.S. latitudes.",
  },
  {
    number: 6,
    title: "Plug Into a Standard 120V Outdoor-Rated Outlet",
    description:
      "Connect the microinverter's output cable to a standard 120V outlet. Use an outdoor-rated, GFCI-protected outlet if your panels are outside. The microinverter converts DC power from the panels into AC power that feeds directly into your home's electrical circuit. No electrical panel modifications are needed.",
  },
  {
    number: 7,
    title: "Monitor Production and Verify Lower Meter Usage",
    description:
      "Most plug-in solar kits include a monitoring app or built-in display to track energy production in real time. After a few sunny days, compare your electricity meter readings or utility bill to confirm your usage has decreased. You can also use NREL's PVWatts tool to benchmark expected output for your location.",
    externalLink: {
      href: "https://pvwatts.nrel.gov/",
      label: "NREL PVWatts Calculator",
    },
  },
  {
    number: 8,
    title: "Notify Your Utility If Required",
    description:
      "Some states require a simple notification to your utility company after installing a plug-in solar system. This is not an approval process \u2014 in states with enacted legislation, utilities cannot deny your system. Check the Solar Rights Alliance for the latest on notification requirements in your state.",
    externalLink: {
      href: "https://solarrights.org/plug-in/",
      label: "Solar Rights Alliance",
    },
  },
];

export default function HowToInstallPage() {
  return (
    <main className="flex flex-1 flex-col items-center bg-white">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="w-full max-w-2xl mx-auto px-4 pt-6 pb-2"
      >
        <ol className="flex items-center gap-1.5 text-sm text-zinc-400">
          <li>
            <a
              href="/"
              className="hover:text-green-600 underline underline-offset-2"
            >
              Home
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <a
              href="/solar"
              className="hover:text-green-600 underline underline-offset-2"
            >
              Solar Calculator
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-zinc-600 font-medium">How to Install</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="w-full bg-gradient-to-b from-sky-50 to-white pt-10 pb-6 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
            How to Install Balcony Solar Panels
          </h1>
          <p className="text-lg text-zinc-500 mt-2">
            A complete step-by-step guide to plug-in solar for your balcony,
            patio, or apartment
          </p>
          <p className="text-sm text-zinc-400 mt-3">
            Estimated time: ~2 hours &middot; Cost: $300&ndash;$2,000
          </p>
        </div>
      </section>

      {/* Prerequisites */}
      <section className="w-full max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">
            What You Need Before Starting
          </h2>
          <ul className="space-y-3 text-zinc-600">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
                &#10003;
              </span>
              <span>
                <strong className="text-zinc-800">
                  A balcony, patio, or exterior wall
                </strong>{" "}
                with reasonable sun exposure (ideally south-facing)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
                &#10003;
              </span>
              <span>
                <strong className="text-zinc-800">
                  A standard 120V outdoor-rated outlet
                </strong>{" "}
                (GFCI-protected preferred) within cable reach
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
                &#10003;
              </span>
              <span>
                <strong className="text-zinc-800">
                  A UL 3700-certified plug-in solar kit
                </strong>{" "}
                (800W to 1,200W) with microinverter and mounting hardware
                included
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
                &#10003;
              </span>
              <span>
                <strong className="text-zinc-800">Basic hand tools</strong>{" "}
                (screwdriver, wrench) for mounting &mdash; no electrician needed
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Steps */}
      <section className="w-full max-w-2xl mx-auto px-4 pb-8">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6 text-center">
          8 Steps to Install Plug-In Solar
        </h2>
        <div className="space-y-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6"
            >
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold">
                  {step.number}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-zinc-900">
                    {step.title}
                  </h3>
                  <p className="text-zinc-600 mt-2 leading-relaxed">
                    {step.description}
                  </p>
                  {step.link && (
                    <a
                      href={step.link.href}
                      className="inline-flex items-center gap-1.5 text-green-600 hover:text-green-700 font-medium text-sm mt-3"
                    >
                      {step.link.label}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </a>
                  )}
                  {step.externalLink && (
                    <a
                      href={step.externalLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-green-600 hover:text-green-700 font-medium text-sm mt-3"
                    >
                      {step.externalLink.label}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5-6h6m0 0v6m0-6L9.75 14.25"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety */}
      <section className="w-full max-w-2xl mx-auto px-4 pb-8">
        <div className="bg-amber-50 rounded-2xl border border-amber-200 shadow-sm p-6">
          <h2 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-amber-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
            Safety and UL 3700 Certification
          </h2>
          <div className="space-y-3 text-zinc-700 leading-relaxed">
            <p>
              <strong>Only use UL 3700-certified equipment.</strong> This
              certification is required by all current plug-in solar legislation
              and ensures your system meets critical safety standards:
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-2 text-zinc-600">
              <li>
                <strong>Anti-islanding protection</strong> &mdash; panels
                automatically shut down during grid outages to protect utility
                line workers
              </li>
              <li>
                <strong>Ground fault protection</strong> &mdash; prevents
                electrical shock hazards
              </li>
              <li>
                <strong>Overcurrent protection</strong> &mdash; prevents
                overloading your home circuit
              </li>
              <li>
                <strong>Weatherproofing standards</strong> &mdash; ensures safe
                outdoor operation in rain, snow, and extreme temperatures
              </li>
            </ul>
            <p className="text-sm text-zinc-500 mt-2">
              Never use non-certified panels or modify your electrical panel. If
              your outlet is not GFCI-protected or you have concerns about your
              wiring, consult a licensed electrician before installation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-gradient-to-r from-green-600 to-emerald-500 py-8 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Ready to See Your Savings?
        </h2>
        <p className="text-green-100 max-w-lg mx-auto mb-5">
          Run the free calculator to estimate your payback period, annual
          savings, and 20-year return based on your location and utility rate.
        </p>
        <a
          href="/solar"
          className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-green-50 transition-colors shadow-lg"
        >
          Open the Solar Calculator
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </a>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-sm text-zinc-400 border-t border-zinc-100">
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs">
          <a
            href="/solar"
            className="text-zinc-500 hover:text-green-600 underline underline-offset-2"
          >
            Solar Calculator
          </a>
          <span className="text-zinc-300">|</span>
          <a
            href="/"
            className="text-zinc-500 hover:text-green-600 underline underline-offset-2"
          >
            ElectrifyEverythingNow.com
          </a>
          <span className="text-zinc-300">|</span>
          <a
            href="https://solarrights.org/plug-in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-green-600 underline underline-offset-2"
          >
            Solar Rights Alliance
          </a>
          <span className="text-zinc-300">|</span>
          <a
            href="https://pvwatts.nrel.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-green-600 underline underline-offset-2"
          >
            NREL PVWatts
          </a>
          <span className="text-zinc-300">|</span>
          <a
            href="https://www.ul.com/resources/ul-3700-standard-plug-solar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-green-600 underline underline-offset-2"
          >
            UL 3700 Standard
          </a>
        </nav>
        <p className="mt-2">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="/"
            className="text-zinc-500 hover:text-green-600 underline underline-offset-2"
          >
            ElectrifyEverythingNow.com
          </a>
        </p>
        <p className="mt-1">
          Built by{" "}
          <a
            href="https://joshlake.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-500 hover:text-amber-400 underline underline-offset-2"
          >
            Josh Lake
          </a>
        </p>
      </footer>
    </main>
  );
}
