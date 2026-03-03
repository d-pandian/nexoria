"use client";

import { useState } from "react";
import Link from "next/link";

const TAGS = ["All", "Strategy", "Revenue", "Positioning", "Clients", "Systems"];

const POSTS = [
  {
    id: 1,
    title: "The Premium Pricing Paradox: Why Charging More Gets You Better Clients",
    excerpt:
      "Counter-intuitive but proven: businesses that raise prices strategically attract higher-quality clients, get faster decisions, and experience fewer support issues. Here's the framework.",
    tag: "Revenue",
    readTime: "8 min read",
    date: "Jan 15, 2025",
    author: { name: "Nexoria Team", initials: "NT", color: "from-blue-500 to-indigo-600" },
    featured: true,
  },
  {
    id: 2,
    title: "5 Portfolio Mistakes That Are Killing Your High-Ticket Client Conversions",
    excerpt:
      "Your portfolio should convert — not just showcase. Most portfolios commit the same five critical errors that signal 'small player' to premium clients before they even read a word.",
    tag: "Positioning",
    readTime: "6 min read",
    date: "Jan 28, 2025",
    author: { name: "Nexoria Team", initials: "NT", color: "from-violet-500 to-purple-600" },
    featured: false,
  },
  {
    id: 3,
    title: "How to Build a Client Feedback System That Generates Referrals",
    excerpt:
      "Referrals aren't luck — they're systems. A well-designed client feedback loop does three things simultaneously: captures testimonials, identifies upsell opportunities, and triggers referrals.",
    tag: "Clients",
    readTime: "7 min read",
    date: "Feb 5, 2025",
    author: { name: "Nexoria Team", initials: "NT", color: "from-emerald-500 to-teal-600" },
    featured: false,
  },
  {
    id: 4,
    title: "The Revenue System Blueprint: From Single Services to Scalable Products",
    excerpt:
      "Trading time for money has a ceiling. This guide shows the exact transition path from service-based consulting to scalable product revenue — without losing your premium positioning.",
    tag: "Systems",
    readTime: "12 min read",
    date: "Feb 12, 2025",
    author: { name: "Nexoria Team", initials: "NT", color: "from-amber-500 to-orange-600" },
    featured: false,
  },
  {
    id: 5,
    title: "Global Client Acquisition: How to Win International Projects from Day One",
    excerpt:
      "Working with international clients requires a different positioning strategy, pricing approach, and communication style. This guide covers the full playbook.",
    tag: "Strategy",
    readTime: "9 min read",
    date: "Feb 18, 2025",
    author: { name: "Nexoria Team", initials: "NT", color: "from-rose-500 to-pink-600" },
    featured: false,
  },
  {
    id: 6,
    title: "Case Study: How a 2-Hour Consultation Generated $180K for a Startup",
    excerpt:
      "The details of how a NorthBridge Ventures engagement — one Core Plan session — identified three untapped revenue streams and directly led to a $180K funding raise.",
    tag: "Revenue",
    readTime: "5 min read",
    date: "Feb 24, 2025",
    author: { name: "Nexoria Team", initials: "NT", color: "from-cyan-500 to-blue-600" },
    featured: false,
  },
];

const TAG_COLORS: Record<string, string> = {
  Strategy: "bg-blue-50 text-blue-700",
  Revenue: "bg-emerald-50 text-emerald-700",
  Positioning: "bg-violet-50 text-violet-700",
  Clients: "bg-amber-50 text-amber-700",
  Systems: "bg-rose-50 text-rose-700",
};

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All" ? POSTS : POSTS.filter((p) => p.tag === activeTag);

  const featured = POSTS.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured || activeTag !== "All");

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Insights & Thought Leadership
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            The Nexoria Insights Blog
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Strategies, frameworks, and case studies for professionals who
            demand premium results.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTag === tag
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {activeTag === "All" && featured && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 mb-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-500/20 text-blue-300">
                    Featured
                  </span>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${TAG_COLORS[featured.tag] || "bg-slate-700 text-slate-300"}`}>
                    {featured.tag}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black mb-4 leading-tight">
                  {featured.title}
                </h2>
                <p className="text-slate-300 leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${featured.author.color} flex items-center justify-center text-white text-xs font-bold`}>
                      {featured.author.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{featured.author.name}</div>
                      <div className="text-slate-400 text-xs">{featured.date} · {featured.readTime}</div>
                    </div>
                  </div>
                  <button className="px-5 py-2.5 bg-white text-slate-900 font-bold text-sm rounded-xl hover:bg-slate-100 active:scale-95 transition-all">
                    Read Article →
                  </button>
                </div>
              </div>

              {/* Visual placeholder */}
              <div className="hidden lg:block">
                <div className="rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-white/10 p-8 h-56 flex items-center justify-center">
                  <div className="text-6xl">📈</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {rest.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              {/* Colored top bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${post.author.color}`} />

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${TAG_COLORS[post.tag] || "bg-slate-100 text-slate-600"}`}>
                    {post.tag}
                  </span>
                  <span className="text-xs text-slate-400">{post.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors flex-1">
                  {post.title}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${post.author.color} flex items-center justify-center text-white text-xs font-bold`}>
                      {post.author.initials}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-700">{post.author.name}</div>
                      <div className="text-[11px] text-slate-400">{post.date}</div>
                    </div>
                  </div>
                  <button className="text-sm font-semibold text-blue-600 hover:underline">
                    Read →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Get Premium Insights Weekly</h3>
          <p className="text-blue-100 mb-6">
            Join 2,000+ professionals receiving our strategy newsletter.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 active:scale-95 transition-all">
              Subscribe
            </button>
          </div>
          <p className="text-blue-200 text-xs mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}
