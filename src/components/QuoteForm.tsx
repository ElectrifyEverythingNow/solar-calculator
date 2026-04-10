"use client";

import { useState } from "react";

interface QuoteFormProps {
  state: string;
  utility: string;
  systemSizeW: number;
  systemCost: number;
  estimatedPayback: number;
  estimatedAnnualSavings: number;
}

export function QuoteForm({
  state,
  utility,
  systemSizeW,
  systemCost,
  estimatedPayback,
  estimatedAnnualSavings,
}: QuoteFormProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Solar Quote Request from ${name} (${state})`
    );
    const body = encodeURIComponent(
      `Hi Josh,

I'm interested in learning more about balcony/plug-in solar.

Name: ${name}
Email: ${email}
Zip: ${zip}
State: ${state}
Utility: ${utility}
System Size: ${systemSizeW}W
System Cost: $${systemCost}
Estimated Payback: ${estimatedPayback.toFixed(1)} years
Estimated Annual Savings: $${estimatedAnnualSavings.toFixed(0)}

${message ? `Message: ${message}` : ""}
`
    );

    window.open(
      `mailto:jlake1@gmail.com?subject=${subject}&body=${body}`,
      "_blank"
    );
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-lg bg-een-green px-4 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
      >
        Get a Detailed Quote
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label
          htmlFor="quote-name"
          className="block text-sm font-medium text-zinc-700 mb-1"
        >
          Name
        </label>
        <input
          id="quote-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="quote-email"
          className="block text-sm font-medium text-zinc-700 mb-1"
        >
          Email
        </label>
        <input
          id="quote-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="quote-zip"
          className="block text-sm font-medium text-zinc-700 mb-1"
        >
          Zip Code
        </label>
        <input
          id="quote-zip"
          type="text"
          required
          maxLength={5}
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="quote-message"
          className="block text-sm font-medium text-zinc-700 mb-1"
        >
          Message (optional)
        </label>
        <textarea
          id="quote-message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-een-green px-4 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
      >
        Send Quote Request
      </button>
    </form>
  );
}
