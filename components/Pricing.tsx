"use client";

import Link from "next/link";
import { useState } from "react";

const PLANS = [
  {
    id: "launch",
    name: "Launch Plan",
    priceUSD: 36,
    priceINR: "₹3,000",
    tagline: "Perfect for your first project",
    description: "Entry-level consulting for professionals taking their first step toward a premium revenue system.",
    features: [
      "1 consultation session (60 min)",
      "Project requirement review",
      "Basic strategy roadmap",
      "Email support (48h response)",
      "Portfolio entry (with consent)",
      "Client feedback collection",
    ],
    notIncluded: ["Priority support", "Advanced diagnostics", "Revenue audit"],
    badge: null,
    featured: false,
  },
  {
    id: "core",
    name: "Core Plan",
    priceUSD: 48,
    priceINR: "₹4,000",
    tagline: "Most popular for growing teams",
    description: "Standard package with essential services — the preferred choice for professionals serious about growth.",
    features: [
      "1 consultation session (90 min)",
      "Detailed requirements analysis",
      "Structured strategy document",
      "Priority email support (24h)",
      "Portfolio showcase entry",
      "Star rating & review system",
      "Follow-up check-in (2 weeks)",
    ],
    notIncluded: ["Advanced revenue audit", "VIP priority access"],
    badge: "Most Popular",
    featured: false,
  },
  {
    id: "advance",
    name: "Advance Plan",
    priceUSD: 84,
    priceINR: "₹7,000",
    tagline: "Advanced services with priority support",
    description: "Deep-dive consulting with advanced diagnostics, priority support, and a comprehensive revenue optimization framework.",
    features: [
      "2 consultation sessions (90 min each)",
      "Advanced project diagnostics",
      "Revenue optimization framework",
      "Priority support (12h response)",
      "Featured portfolio placement",
      "Video testimonial option",
      "30-day follow-up support",
      "Competitor analysis summary",
    ],
    notIncluded: ["VIP dedicated manager"],
    badge: "Best Value",
    featured: true,
  },
  {
    id: "pinnacle",
    name: "Pinnacle Plan",
    priceUSD: 192,
    priceINR: "₹16,000",
    tagline: "Top-tier VIP full-service package",
    description: "The ultimate Nexoria experience. Full-service VIP consulting with dedicated support, complete audits, and premium positioning.",
    features: [
      "4 consultation sessions (unlimited duration)",
      "Full revenue system audit",
      "Premium positioning strategy",
      "Dedicated account manager",
      "VIP priority support (4h response)",
      "Featured case study publication",
      "60-day ongoing support",
      "Monetization blueprint",
      "Executive strategy report",
    ],
    notIncluded: [],
    badge: "VIP",
    featured: false,
  },
];

/* GPay / UPI icon */
function GPayIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 48 48" fill="none">
      <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" fill="#FFC107"/>
      <path d="M6.3 14.7l7.1 5.2C15.1 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.6 7.3 6.3 14.7z" fill="#FF3D00"/>
      <path d="M24 46c5.5 0 10.5-2 14.3-5.4l-6.6-5.6C29.7 36.6 27 37.5 24 37.5c-6.1 0-10.7-3.1-11.8-8.5l-7 5.5C7.9 41.3 15.4 46 24 46z" fill="#4CAF50"/>
      <path d="M44.5 20H24v8.5h11.8c-.7 2.8-2.4 5.1-4.8 6.6l6.6 5.6C43.1 37.4 46 31.3 46 24c0-1.3-.2-2.7-.5-4z" fill="#1976D2"/>
    </svg>
  );
}

export default function Pricing() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold tracking-wider uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Pricing Plans
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Transparent Pricing.{" "}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Real Results.
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-4">
            Every plan is a single session investment. Pay securely via{" "}
            <strong className="text-slate-700">GPay / UPI</strong> through Razorpay. No subscriptions, no lock-ins.
          </p>

          {/* Payment trust badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-slate-900 text-white text-sm">
            <GPayIcon />
            <span>Payments via GPay / UPI · Powered by</span>
            <span className="font-bold text-blue-400">Razorpay</span>
            <span className="text-slate-400">·</span>
            <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-green-400 text-xs">Bank-grade Security</span>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {PLANS.map((plan) => {
            const isFeatured = plan.featured;
            const isHovered = hoveredPlan === plan.id;

            return (
              <div
                key={plan.id}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative flex flex-col rounded-2xl transition-all duration-300 ${
                  isFeatured
                    ? "bg-gradient-to-b from-slate-900 to-[#111827] text-white md:scale-[1.02] ring-1 ring-white/10"
                    : `bg-white border border-slate-150 ${isHovered ? "-translate-y-1.5 border-slate-200" : ""}`
                }`}
                style={isFeatured
                  ? { boxShadow: "0 8px 16px rgba(0,0,0,0.12), 0 32px 64px rgba(0,0,0,0.22)" }
                  : isHovered
                  ? { boxShadow: "0 4px 8px rgba(0,0,0,0.04), 0 20px 44px rgba(0,0,0,0.09)" }
                  : { boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.05)" }
                }
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className={`px-4 py-1 rounded-full text-xs font-bold shadow-lg ${
                      isFeatured ? "bg-indigo-500 text-white" :
                      plan.id === "pinnacle" ? "bg-amber-500 text-white" : "bg-blue-600 text-white"
                    }`}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-7 flex flex-col flex-1">
                  {/* Plan name */}
                  <div className="mb-5">
                    <h3 className={`text-lg font-bold mb-1 ${isFeatured ? "text-white" : "text-slate-900"}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm ${isFeatured ? "text-slate-400" : "text-slate-500"}`}>
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-5">
                    <div className="flex items-end gap-2 mb-1">
                      <span className={`text-4xl font-black ${isFeatured ? "text-white" : "text-slate-900"}`}>
                        ${plan.priceUSD}
                      </span>
                      <span className={`text-sm mb-1.5 ${isFeatured ? "text-slate-400" : "text-slate-400"}`}>
                        / session
                      </span>
                    </div>
                    {/* INR price */}
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
                      isFeatured ? "bg-white/10 text-slate-300" : "bg-slate-100 text-slate-600"
                    }`}>
                      <GPayIcon />
                      {plan.priceINR} via GPay/UPI
                    </div>
                    <p className={`text-xs mt-3 leading-relaxed ${isFeatured ? "text-slate-400" : "text-slate-500"}`}>
                      {plan.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-7 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isFeatured ? "text-indigo-400" : "text-emerald-500"}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={`text-sm ${isFeatured ? "text-slate-300" : "text-slate-600"}`}>{f}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((f) => (
                      <li key={f} className="flex items-start gap-2 opacity-35">
                        <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className={`text-sm line-through ${isFeatured ? "text-slate-500" : "text-slate-400"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Pay CTA */}
                  <Link
                    href={`/booking?plan=${plan.id}`}
                    className={`flex items-center justify-center gap-2 w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                      isFeatured
                        ? "bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-900/30"
                        : plan.id === "pinnacle"
                        ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md"
                        : "bg-slate-900 hover:bg-slate-800 text-white shadow-md"
                    }`}
                  >
                    <GPayIcon />
                    Pay & Book via GPay/UPI
                  </Link>

                  <p className={`text-center text-[11px] mt-2.5 ${isFeatured ? "text-slate-500" : "text-slate-400"}`}>
                    🔒 Razorpay · Instant confirmation
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-500">
            <span>💱 USD shown for reference · Billed in INR via Razorpay</span>
            <span className="text-slate-300">|</span>
            <Link href="/#contact" className="text-blue-600 hover:underline font-medium">
              Custom enterprise pricing →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
