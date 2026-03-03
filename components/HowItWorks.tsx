"use client";

const STEPS = [
  {
    number: "01",
    title: "Book a Session",
    description:
      "Select the plan that fits your needs and complete secure payment via Stripe. Instantly receive your booking confirmation.",
    icon: "📅",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    number: "02",
    title: "Submit Requirements",
    description:
      "Fill out the detailed project requirement form. The more detail you provide, the more precisely we can tailor your service.",
    icon: "📋",
    color: "from-indigo-500 to-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
  },
  {
    number: "03",
    title: "Service Delivery",
    description:
      "Our team gets to work. Receive structured deliverables, strategies, and systems built specifically for your project goals.",
    icon: "⚡",
    color: "from-violet-500 to-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    number: "04",
    title: "Review & Rate",
    description:
      "Share your feedback, star rating, and testimonial. Your input shapes our approach and helps future clients make decisions.",
    icon: "⭐",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    number: "05",
    title: "Portfolio Update",
    description:
      "Your project is added to our dynamic portfolio (with permission), showcasing real results and building social proof.",
    icon: "🏆",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
];

export default function HowItWorks() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
            A Clear, Proven Process
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            From first contact to portfolio showcase — our 5-step workflow is
            designed to deliver measurable results for every client.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[calc(10%+2rem)] right-[calc(10%+2rem)] h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 via-violet-200 via-amber-200 to-emerald-200" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center"
              >
                {/* Number circle */}
                <div
                  className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl shadow-lg mb-5`}
                >
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center">
                    {step.number}
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`${step.bg} ${step.border} border rounded-2xl p-5 w-full flex-1`}
                >
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (between steps on mobile) */}
                {i < STEPS.length - 1 && (
                  <div className="md:hidden mt-4 text-slate-300 text-2xl">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="relative z-10">
            <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Ready to Begin?
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Your transformation starts with one session
            </h3>
            <p className="text-slate-400 mb-6">
              No commitments. No overhead. Just results.
            </p>
            <a
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 active:scale-95 transition-all"
            >
              Start Your Session
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
