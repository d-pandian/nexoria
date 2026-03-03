"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = ["All", "SaaS", "E-commerce", "Consulting", "Agency", "Startup"];

const PROJECTS = [
  {
    id: 1,
    title: "StrataLogic Revenue System",
    client: "StrataLogic Inc.",
    category: "Consulting",
    plan: "Pinnacle Plan",
    duration: "4 sessions",
    result: "+43% Revenue per Client",
    description:
      "Full revenue architecture overhaul for a B2B consulting firm. Implemented premium tier packaging, pricing optimization, and a structured upsell framework.",
    tags: ["Revenue Optimization", "Pricing Strategy", "B2B"],
    metrics: [
      { label: "Revenue Increase", value: "43%" },
      { label: "Client Retention", value: "+28%" },
      { label: "Avg. Deal Size", value: "2.1x" },
    ],
    color: "blue",
    year: "2024",
  },
  {
    id: 2,
    title: "Elevate Labs Growth Framework",
    client: "Elevate Labs",
    category: "SaaS",
    plan: "Core Plan",
    duration: "1 session (90 min)",
    result: "Streamlined Operations",
    description:
      "Diagnosed product-market fit gaps and built a structured client engagement workflow for a fast-growing SaaS product team.",
    tags: ["SaaS", "Client Engagement", "Operations"],
    metrics: [
      { label: "Client Satisfaction", value: "+35%" },
      { label: "Onboarding Time", value: "-60%" },
      { label: "Support Tickets", value: "-42%" },
    ],
    color: "indigo",
    year: "2024",
  },
  {
    id: 3,
    title: "Vyntrix Solutions Scale Plan",
    client: "Vyntrix Solutions",
    category: "Agency",
    plan: "Advance Plan",
    duration: "2 sessions",
    result: "8x ROI in First Month",
    description:
      "Premium product guidance and offer repositioning for a digital agency. Redesigned service packages to command 2x higher price points.",
    tags: ["Agency", "Offer Design", "Premium Positioning"],
    metrics: [
      { label: "ROI (Month 1)", value: "8x" },
      { label: "Avg. Project Value", value: "+112%" },
      { label: "New Enterprise Clients", value: "3" },
    ],
    color: "violet",
    year: "2024",
  },
  {
    id: 4,
    title: "Axion Corp Executive Strategy",
    client: "Axion Corp.",
    category: "Consulting",
    plan: "Pinnacle Plan",
    duration: "4 sessions",
    result: "3 New Enterprise Referrals",
    description:
      "VIP strategy engagement covering portfolio positioning, revenue system design, and executive communication frameworks for a corporate services firm.",
    tags: ["Executive Consulting", "Corporate", "Positioning"],
    metrics: [
      { label: "Network Referrals", value: "3" },
      { label: "Revenue Growth", value: "+67%" },
      { label: "Win Rate", value: "+29%" },
    ],
    color: "emerald",
    year: "2024",
  },
  {
    id: 5,
    title: "NorthBridge Venture Toolkit",
    client: "NorthBridge Ventures",
    category: "Startup",
    plan: "Core Plan",
    duration: "1 session (90 min)",
    result: "2 New Enterprise Clients",
    description:
      "Portfolio showcase strategy and investor-ready positioning for an early-stage venture. Resulted in 2 major client acquisitions within 30 days.",
    tags: ["Startup", "Investor Relations", "Portfolio"],
    metrics: [
      { label: "New Clients", value: "2" },
      { label: "Pitch Conversion", value: "+50%" },
      { label: "Funding Secured", value: "$180K" },
    ],
    color: "amber",
    year: "2024",
  },
  {
    id: 6,
    title: "Luminary Digital E-com Audit",
    client: "Luminary Digital",
    category: "E-commerce",
    plan: "Launch Plan",
    duration: "1 session (60 min)",
    result: "Clear 90-Day Roadmap",
    description:
      "E-commerce growth audit for a digital products store. Delivered a 90-day action plan focused on conversion optimization and premium tier introduction.",
    tags: ["E-commerce", "Growth Audit", "Conversion"],
    metrics: [
      { label: "Plan Execution", value: "90 Days" },
      { label: "Revenue Projection", value: "+25%" },
      { label: "Product Tiers", value: "3 New" },
    ],
    color: "rose",
    year: "2025",
  },
];

const COLOR_MAP: Record<string, { badge: string; border: string; metric: string }> = {
  blue:    { badge: "bg-blue-50 text-blue-700",    border: "border-blue-100",    metric: "text-blue-600" },
  indigo:  { badge: "bg-indigo-50 text-indigo-700",  border: "border-indigo-100",  metric: "text-indigo-600" },
  violet:  { badge: "bg-violet-50 text-violet-700",  border: "border-violet-100",  metric: "text-violet-600" },
  emerald: { badge: "bg-emerald-50 text-emerald-700", border: "border-emerald-100", metric: "text-emerald-600" },
  amber:   { badge: "bg-amber-50 text-amber-700",   border: "border-amber-100",   metric: "text-amber-600" },
  rose:    { badge: "bg-rose-50 text-rose-700",     border: "border-rose-100",    metric: "text-rose-600" },
};

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      {/* Page header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Our Work
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Portfolio & Case Studies
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Real projects. Real results. Every case study represents a
            client who trusted Nexoria to transform their revenue system.
          </p>

          {/* Summary stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-10">
            {[
              { value: "500+", label: "Projects" },
              { value: "$2.4M+", label: "Revenue Generated" },
              { value: "98%", label: "Satisfaction" },
              { value: "40+", label: "Countries" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black text-white">{s.value}</div>
                <div className="text-slate-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((project) => {
            const c = COLOR_MAP[project.color] || COLOR_MAP.blue;
            return (
              <div
                key={project.id}
                className={`bg-white rounded-2xl border ${c.border} overflow-hidden hover:shadow-xl transition-all duration-300 group`}
              >
                {/* Card header */}
                <div className="p-6 border-b border-slate-100">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${c.badge}`}>
                      {project.category}
                    </span>
                    <span className="text-xs text-slate-400">{project.year}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-3">{project.client}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 divide-x divide-slate-100 bg-slate-50">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="px-3 py-4 text-center">
                      <div className={`text-lg font-black ${c.metric}`}>{m.value}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[11px] rounded-md font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-slate-400">{project.plan}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 p-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl text-white">
          <h3 className="text-2xl font-bold mb-2">Your project could be here</h3>
          <p className="text-blue-100 mb-6">
            Join our portfolio of successful clients. Book your session today.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 active:scale-95 transition-all"
          >
            Book a Session
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
