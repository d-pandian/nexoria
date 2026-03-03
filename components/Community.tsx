"use client";

import { useState } from "react";
import Link from "next/link";

/* ── Data ─────────────────────────────── */
const SUCCESS_STORIES = [
  {
    id: 1,
    client: "Alex T.",
    company: "StrataLogic Inc.",
    avatar: "AT",
    color: "from-blue-500 to-indigo-600",
    country: "🇺🇸",
    plan: "Pinnacle",
    timeAgo: "2 days ago",
    headline: "43% revenue increase after one engagement",
    body: "Implemented the Nexoria revenue framework across our consulting packages. Client lifetime value increased dramatically within 60 days.",
    metrics: ["+43% Revenue", "2x Deal Size", "98% Retention"],
    likes: 47,
    comments: 12,
  },
  {
    id: 2,
    client: "Monica R.",
    company: "Elevate Labs",
    avatar: "MR",
    color: "from-violet-500 to-purple-600",
    country: "🇨🇦",
    plan: "Core",
    timeAgo: "5 days ago",
    headline: "Operations streamlined in week one",
    body: "The structured requirement framework Pandian gave us cut our onboarding time by 60%. Clients now move faster through our sales process.",
    metrics: ["-60% Onboarding", "+35% CSAT", "3 New Referrals"],
    likes: 31,
    comments: 8,
  },
  {
    id: 3,
    client: "Jordan K.",
    company: "Vyntrix Solutions",
    avatar: "JK",
    color: "from-emerald-500 to-teal-600",
    country: "🇦🇺",
    plan: "Advance",
    timeAgo: "1 week ago",
    headline: "8x ROI in 30 days — highest ever",
    body: "Repositioned our agency services using the premium positioning playbook. We now charge 2x and close 50% faster. Cannot recommend enough.",
    metrics: ["8x ROI", "+112% Avg Value", "3 Enterprise Deals"],
    likes: 89,
    comments: 24,
  },
];

const DISCUSSIONS = [
  {
    id: 1,
    title: "How should I price my consulting services for enterprise clients?",
    author: "Marcus H.",
    avatar: "MH",
    color: "from-amber-500 to-orange-500",
    timeAgo: "3h ago",
    replies: 14,
    views: 230,
    tag: "Pricing Strategy",
    tagColor: "bg-amber-50 text-amber-700",
    pinned: true,
  },
  {
    id: 2,
    title: "Best practices for building a portfolio that converts high-ticket clients",
    author: "Sophia P.",
    avatar: "SP",
    color: "from-rose-500 to-pink-600",
    timeAgo: "6h ago",
    replies: 9,
    views: 178,
    tag: "Portfolio",
    tagColor: "bg-rose-50 text-rose-700",
    pinned: false,
  },
  {
    id: 3,
    title: "How to create a review system that auto-generates referrals",
    author: "Priya N.",
    avatar: "PN",
    color: "from-cyan-500 to-blue-600",
    timeAgo: "1d ago",
    replies: 22,
    views: 415,
    tag: "Client Systems",
    tagColor: "bg-cyan-50 text-cyan-700",
    pinned: false,
  },
  {
    id: 4,
    title: "Revenue from consulting vs. productized services — which scales better?",
    author: "Liam W.",
    avatar: "LW",
    color: "from-indigo-500 to-violet-600",
    timeAgo: "2d ago",
    replies: 31,
    views: 602,
    tag: "Revenue Systems",
    tagColor: "bg-indigo-50 text-indigo-700",
    pinned: false,
  },
];

const SPOTLIGHTS = [
  { title: "StrataLogic Revenue System", category: "Consulting", result: "+43% Revenue", icon: "📈", color: "blue" },
  { title: "Vyntrix Scale Plan", category: "Agency", result: "8x ROI Month 1", icon: "🚀", color: "emerald" },
  { title: "Axion Corp Strategy", category: "Corporate", result: "3 Enterprise Refs", icon: "🏆", color: "amber" },
];

/* ── Sub-components ───────────────────── */
function LikeButton({ count }: { count: number }) {
  const [liked, setLiked] = useState(false);
  const [n, setN] = useState(count);
  return (
    <button
      onClick={() => { setLiked(!liked); setN(liked ? n - 1 : n + 1); }}
      className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${liked ? "text-red-500" : "text-slate-400 hover:text-red-400"}`}
    >
      <svg className="w-4 h-4" fill={liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      {n}
    </button>
  );
}

/* ── Main component ───────────────────── */
export default function Community() {
  const [activeTab, setActiveTab] = useState<"stories" | "discuss">("stories");

  return (
    <section id="community" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-sm font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            Nexoria Community
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
            Connect, Share &{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Grow Together
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            A curated space where Nexoria clients collaborate, celebrate wins,
            and learn from each other.
          </p>

          {/* Live member count */}
          <div className="inline-flex items-center gap-3 mt-5 px-5 py-2.5 rounded-2xl bg-slate-900 text-white text-sm">
            <div className="flex -space-x-2">
              {["AT", "MR", "JK", "SP", "MH"].map((init, i) => (
                <div
                  key={init}
                  className={`w-7 h-7 rounded-full border-2 border-slate-900 flex items-center justify-center text-[9px] font-black ${
                    ["from-blue-500 to-indigo-600", "from-violet-500 to-purple-600", "from-emerald-500 to-teal-600", "from-rose-500 to-pink-600", "from-amber-500 to-orange-500"][i]
                  } bg-gradient-to-br text-white`}
                >
                  {init}
                </div>
              ))}
            </div>
            <span className="text-slate-300">
              <span className="font-bold text-white">156 members</span> · 12 online now
            </span>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>
        </div>

        {/* ── Main Grid ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left: Stories + Discussions ───────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Tab switcher */}
            <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 w-fit">
              <button
                onClick={() => setActiveTab("stories")}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "stories" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                🏆 Success Stories
              </button>
              <button
                onClick={() => setActiveTab("discuss")}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "discuss" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                💬 Discussions
              </button>
            </div>

            {/* Success Stories */}
            {activeTab === "stories" && (
              <div className="space-y-5">
                {SUCCESS_STORIES.map((story) => (
                  <div
                    key={story.id}
                    className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg transition-all duration-300 group"
                  >
                    {/* Author row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${story.color} flex items-center justify-center text-white text-xs font-black`}>
                          {story.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{story.client}</span>
                            <span className="text-slate-400 text-xs">{story.country}</span>
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                              {story.plan} Plan
                            </span>
                          </div>
                          <div className="text-xs text-slate-400">{story.company} · {story.timeAgo}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        {[1,2,3,4,5].map(i => (
                          <svg key={i} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {story.headline}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{story.body}</p>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {story.metrics.map((m) => (
                        <span key={m} className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold">
                          ✓ {m}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-5 pt-4 border-t border-slate-100">
                      <LikeButton count={story.likes} />
                      <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-blue-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {story.comments} Comments
                      </button>
                      <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-violet-500 transition-colors ml-auto">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Share
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Discussions */}
            {activeTab === "discuss" && (
              <div className="space-y-3">
                {DISCUSSIONS.map((d) => (
                  <div
                    key={d.id}
                    className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md transition-all group cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${d.color} flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
                        {d.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          {d.pinned && (
                            <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full">
                              📌 Pinned
                            </span>
                          )}
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${d.tagColor}`}>
                            {d.tag}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                          {d.title}
                        </h3>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span>by <span className="font-semibold text-slate-600">{d.author}</span></span>
                          <span>{d.timeAgo}</span>
                          <span>💬 {d.replies} replies</span>
                          <span>👁 {d.views} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="text-center pt-4">
                  <button className="px-6 py-2.5 text-sm font-semibold text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors">
                    View All Discussions →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Right sidebar ──────────────────── */}
          <div className="space-y-5">

            {/* Project Spotlights */}
            <div className="bg-slate-900 rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-sm">🔦 Project Spotlights</h4>
                <Link href="/portfolio" className="text-xs text-blue-400 hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {SPOTLIGHTS.map((s) => (
                  <div key={s.title} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <div className="text-2xl">{s.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white truncate">{s.title}</div>
                      <div className="text-xs text-slate-400">{s.category}</div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg flex-shrink-0">
                      {s.result}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending topics */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h4 className="font-bold text-slate-900 text-sm mb-4">📊 Trending Topics</h4>
              <div className="space-y-2">
                {[
                  { tag: "#PremiumPricing", count: "48 posts" },
                  { tag: "#RevenueSystem", count: "36 posts" },
                  { tag: "#ClientPortfolio", count: "29 posts" },
                  { tag: "#GPay", count: "22 posts" },
                  { tag: "#ConsultingTips", count: "19 posts" },
                ].map((t) => (
                  <div key={t.tag} className="flex items-center justify-between">
                    <span className="text-sm text-blue-600 font-semibold hover:underline cursor-pointer">{t.tag}</span>
                    <span className="text-xs text-slate-400">{t.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Join CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white text-center">
              <div className="text-3xl mb-3">🤝</div>
              <h4 className="font-bold mb-1">Join the Community</h4>
              <p className="text-blue-100 text-xs mb-4">
                Share your wins, get advice, and connect with 156 professionals.
              </p>
              <Link
                href="/booking"
                className="block w-full py-2.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 active:scale-95 transition-all text-sm"
              >
                Book & Join →
              </Link>
            </div>

            {/* Activity feed */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h4 className="font-bold text-slate-900 text-sm mb-4">⚡ Recent Activity</h4>
              <div className="space-y-3">
                {[
                  { text: "Alex T. shared a success story", time: "2h ago", icon: "🏆" },
                  { text: "Monica R. booked a Core session", time: "4h ago", icon: "📅" },
                  { text: "Jordan K. left a 5-star review", time: "6h ago", icon: "⭐" },
                  { text: "New project added to portfolio", time: "1d ago", icon: "🗂️" },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-base">{a.icon}</span>
                    <div>
                      <p className="text-xs text-slate-600">{a.text}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
