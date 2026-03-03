"use client";

import Link from "next/link";

const SERVICES = [
  {
    icon: "🖼️",
    title: "Portfolio & Past Projects",
    description:
      "Dynamic showcase of completed work, detailed case studies, before/after examples, and quantified results. Impress international clients on first view.",
    features: ["Case study write-ups", "Before/after comparisons", "Client results metrics", "Filterable by category"],
    accent: "blue",
    href: "/portfolio",
    cta: "View Portfolio",
  },
  {
    icon: "⭐",
    title: "Client Feedback System",
    description:
      "Structured review collection with star ratings, written testimonials, and video feedback options. Build trust with authentic social proof.",
    features: ["Star rating system", "Written testimonials", "Verified client badges", "Auto-published on approval"],
    accent: "amber",
    href: "/#testimonials",
    cta: "See Reviews",
  },
  {
    icon: "🤝",
    title: "Consultation Sessions",
    description:
      "Personalized one-on-one sessions tailored to your specific challenges. Get actionable strategies from an expert who understands your market.",
    features: ["1-on-1 strategy sessions", "Personalized roadmaps", "Follow-up support", "Session recording"],
    accent: "indigo",
    href: "/booking",
    cta: "Book Session",
  },
  {
    icon: "💎",
    title: "Premium Product Guidance",
    description:
      "Optimize your product or offer positioning to command premium prices. Learn the systems that top creators use to maximize revenue per client.",
    features: ["Offer architecture audit", "Pricing strategy", "Positioning workshop", "Revenue optimization"],
    accent: "violet",
    href: "/booking",
    cta: "Get Guidance",
  },
  {
    icon: "📊",
    title: "Admin Dashboard",
    description:
      "Full-featured management panel for projects, payments, and client feedback. Real-time visibility into your business performance metrics.",
    features: ["Project management", "Payment tracking", "Client CRM", "Analytics & reports"],
    accent: "emerald",
    href: "/admin",
    cta: "View Dashboard",
  },
];

const ACCENT_STYLES: Record<string, { icon: string; badge: string; cta: string; border: string }> = {
  blue: {
    icon: "bg-blue-50 text-blue-600",
    badge: "bg-blue-50 text-blue-700",
    cta: "text-blue-600 hover:bg-blue-50",
    border: "hover:border-blue-200",
  },
  amber: {
    icon: "bg-amber-50 text-amber-600",
    badge: "bg-amber-50 text-amber-700",
    cta: "text-amber-600 hover:bg-amber-50",
    border: "hover:border-amber-200",
  },
  indigo: {
    icon: "bg-indigo-50 text-indigo-600",
    badge: "bg-indigo-50 text-indigo-700",
    cta: "text-indigo-600 hover:bg-indigo-50",
    border: "hover:border-indigo-200",
  },
  violet: {
    icon: "bg-violet-50 text-violet-600",
    badge: "bg-violet-50 text-violet-700",
    cta: "text-violet-600 hover:bg-violet-50",
    border: "hover:border-violet-200",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-600",
    badge: "bg-emerald-50 text-emerald-700",
    cta: "text-emerald-600 hover:bg-emerald-50",
    border: "hover:border-emerald-200",
  },
};

export default function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Grow & Scale
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Five modular services designed to build credibility, attract
            premium clients, and systematically grow your revenue.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.slice(0, 3).map((service) => {
            const styles = ACCENT_STYLES[service.accent];
            return (
              <div
                key={service.title}
                className={`bg-white rounded-2xl p-7 border border-slate-100 ${styles.border} transition-all duration-300 hover:shadow-xl group`}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl ${styles.icon} flex items-center justify-center text-2xl mb-5`}
                >
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <svg
                        className="w-4 h-4 text-emerald-500 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-slate-600">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.href}
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${styles.cta}`}
                >
                  {service.cta}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom row — 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
          {SERVICES.slice(3).map((service) => {
            const styles = ACCENT_STYLES[service.accent];
            return (
              <div
                key={service.title}
                className={`bg-white rounded-2xl p-7 border border-slate-100 ${styles.border} transition-all duration-300 hover:shadow-xl group`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${styles.icon} flex items-center justify-center text-2xl mb-5`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <svg
                        className="w-4 h-4 text-emerald-500 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-slate-600">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.href}
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${styles.cta}`}
                >
                  {service.cta}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
