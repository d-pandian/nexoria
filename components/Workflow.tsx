"use client";

const WORKFLOW_STEPS = [
  {
    phase: "Phase 1",
    title: "Session Booking",
    detail: "Client selects a plan, completes Stripe payment, and receives instant booking confirmation with calendar invite.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: "blue",
    metrics: ["< 2 min booking", "Instant confirmation", "Calendar sync"],
  },
  {
    phase: "Phase 2",
    title: "Requirement Form",
    detail: "Client fills a structured requirement form covering goals, current challenges, target market, and expected outcomes.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    color: "indigo",
    metrics: ["Structured intake", "Goal alignment", "Context capture"],
  },
  {
    phase: "Phase 3",
    title: "Service Delivery",
    detail: "Nexoria team delivers tailored strategies, frameworks, and systems in the session. Follow-up assets delivered within agreed timelines.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "violet",
    metrics: ["Expert delivery", "Documented outputs", "Actionable plan"],
  },
  {
    phase: "Phase 4",
    title: "Review & Rating",
    detail: "Client submits star rating, written feedback, and optional testimonial. All reviews are verified before publication.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    color: "amber",
    metrics: ["Verified reviews", "Star rating", "Testimonial capture"],
  },
  {
    phase: "Phase 5",
    title: "Portfolio Update",
    detail: "Approved client projects are added to the dynamic portfolio with results, case study details, and client credit (if consented).",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    color: "emerald",
    metrics: ["Social proof built", "Public showcase", "Case study live"],
  },
];

const COLOR_MAP: Record<string, { bg: string; text: string; iconBg: string; border: string; dot: string }> = {
  blue:    { bg: "bg-blue-50",    text: "text-blue-700",    iconBg: "bg-blue-100 text-blue-600",    border: "border-blue-200",    dot: "bg-blue-500" },
  indigo:  { bg: "bg-indigo-50",  text: "text-indigo-700",  iconBg: "bg-indigo-100 text-indigo-600",  border: "border-indigo-200",  dot: "bg-indigo-500" },
  violet:  { bg: "bg-violet-50",  text: "text-violet-700",  iconBg: "bg-violet-100 text-violet-600",  border: "border-violet-200",  dot: "bg-violet-500" },
  amber:   { bg: "bg-amber-50",   text: "text-amber-700",   iconBg: "bg-amber-100 text-amber-600",   border: "border-amber-200",   dot: "bg-amber-500" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", iconBg: "bg-emerald-100 text-emerald-600", border: "border-emerald-200", dot: "bg-emerald-500" },
};

export default function Workflow() {
  return (
    <section id="workflow" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-sm font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            Delivery Framework
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
            How We Deliver Results
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            A precise 5-phase delivery framework built for accountability,
            quality, and measurable outcomes every time.
          </p>
        </div>

        {/* Workflow Timeline */}
        <div className="relative">
          {/* Vertical connector */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 via-indigo-300 via-violet-300 via-amber-300 to-emerald-300 -translate-x-1/2 hidden md:block" />

          <div className="space-y-8">
            {WORKFLOW_STEPS.map((step, i) => {
              const c = COLOR_MAP[step.color];
              const isRight = i % 2 === 0;

              return (
                <div key={step.phase} className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center">
                  {/* Left side */}
                  <div className={`${isRight ? "md:text-right md:pr-8" : "md:order-3 md:pl-8"}`}>
                    {isRight ? (
                      <div className={`inline-block p-6 rounded-2xl border ${c.border} ${c.bg}`}>
                        <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${c.text} mb-3`}>
                          <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                          {step.phase}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-4">{step.detail}</p>
                        <div className="flex flex-wrap justify-end gap-2">
                          {step.metrics.map((m) => (
                            <span key={m} className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${c.bg} ${c.text} border ${c.border}`}>
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>

                  {/* Center icon (desktop) */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 hidden md:flex">
                    <div className={`w-12 h-12 rounded-xl ${c.iconBg} border-4 border-white shadow-lg flex items-center justify-center`}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Right side */}
                  <div className={`${isRight ? "md:pl-8 md:order-3" : "md:text-right md:pr-8"}`}>
                    {!isRight ? (
                      <div className={`inline-block p-6 rounded-2xl border ${c.border} ${c.bg}`}>
                        <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${c.text} mb-3`}>
                          <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                          {step.phase}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-4">{step.detail}</p>
                        <div className="flex flex-wrap gap-2">
                          {step.metrics.map((m) => (
                            <span key={m} className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${c.bg} ${c.text} border ${c.border}`}>
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>

                  {/* Mobile card (shown on mobile) */}
                  <div className={`md:hidden p-6 rounded-2xl border ${c.border} ${c.bg} ml-12`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center`}>
                        {step.icon}
                      </div>
                      <div>
                        <div className={`text-xs font-bold uppercase tracking-wider ${c.text}`}>{step.phase}</div>
                        <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3">{step.detail}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.metrics.map((m) => (
                        <span key={m} className={`px-2 py-0.5 rounded text-xs font-semibold ${c.bg} ${c.text} border ${c.border}`}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
