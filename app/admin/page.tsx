"use client";

import { useState } from "react";

/* ── Types ─────────────────────────────── */
type Tab = "overview" | "bookings" | "projects" | "feedback" | "clients";

/* ── Mock data ─────────────────────────── */
const STATS = [
  { label: "Total Revenue", value: "$12,840", change: "+18%", trend: "up", icon: "💰" },
  { label: "Active Sessions", value: "24", change: "+4 this week", trend: "up", icon: "📅" },
  { label: "Total Clients", value: "156", change: "+12 this month", trend: "up", icon: "👥" },
  { label: "Avg. Rating", value: "4.97", change: "5.0 this week", trend: "up", icon: "⭐" },
];

const BOOKINGS = [
  { id: "NX-A3F7K2", client: "Alex Thompson", plan: "Pinnacle Plan", price: 192, status: "confirmed", date: "Mar 2, 2025", email: "alex@stratalogic.com" },
  { id: "NX-B8M4P1", client: "Monica Reyes", plan: "Core Plan", price: 48, status: "pending", date: "Mar 3, 2025", email: "monica@elevatelabs.com" },
  { id: "NX-C2N9X5", client: "Jordan Kim", plan: "Advance Plan", price: 84, status: "completed", date: "Feb 28, 2025", email: "jordan@vyntrix.com" },
  { id: "NX-D5R1L8", client: "Sophia Patel", plan: "Pinnacle Plan", price: 192, status: "confirmed", date: "Mar 5, 2025", email: "sophia@axioncorp.com" },
  { id: "NX-E7Q3W6", client: "Marcus Hendricks", plan: "Core Plan", price: 48, status: "completed", date: "Feb 25, 2025", email: "marcus@northbridge.vc" },
];

const PROJECTS = [
  { id: 1, title: "StrataLogic Revenue System", client: "Alex Thompson", status: "live", plan: "Pinnacle", date: "Jan 2025" },
  { id: 2, title: "Elevate Labs Growth Framework", client: "Monica Reyes", status: "live", plan: "Core", date: "Jan 2025" },
  { id: 3, title: "Vyntrix Solutions Scale Plan", client: "Jordan Kim", status: "review", plan: "Advance", date: "Feb 2025" },
  { id: 4, title: "Axion Corp Executive Strategy", client: "Sophia Patel", status: "live", plan: "Pinnacle", date: "Feb 2025" },
  { id: 5, title: "NorthBridge Venture Toolkit", client: "Marcus Hendricks", status: "draft", plan: "Core", date: "Mar 2025" },
];

const FEEDBACK = [
  { id: 1, client: "Alex Thompson", rating: 5, plan: "Pinnacle Plan", comment: "Working with Nexoria completely transformed our workflow.", status: "published", date: "Feb 15" },
  { id: 2, client: "Monica Reyes", rating: 5, plan: "Core Plan", comment: "Professional, structured, and results-driven.", status: "published", date: "Feb 20" },
  { id: 3, client: "Jordan Kim", rating: 5, plan: "Advance Plan", comment: "8x ROI in the first month. Incredible.", status: "pending", date: "Feb 28" },
  { id: 4, client: "Priya Nair", rating: 4, plan: "Launch Plan", comment: "Clear roadmap. Will upgrade to Core next.", status: "pending", date: "Mar 1" },
];

/* ── Helper components ─────────────────── */
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    confirmed: "bg-blue-50 text-blue-700",
    pending:   "bg-amber-50 text-amber-700",
    completed: "bg-emerald-50 text-emerald-700",
    cancelled: "bg-red-50 text-red-700",
    live:      "bg-emerald-50 text-emerald-700",
    review:    "bg-amber-50 text-amber-700",
    draft:     "bg-slate-100 text-slate-600",
    published: "bg-emerald-50 text-emerald-700",
  };
  return (
    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize ${styles[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i <= count ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Main component ─────────────────────── */
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: "overview",  label: "Overview",   icon: "📊" },
    { id: "bookings",  label: "Bookings",   icon: "📅" },
    { id: "projects",  label: "Projects",   icon: "🗂️" },
    { id: "feedback",  label: "Feedback",   icon: "⭐" },
    { id: "clients",   label: "Clients",    icon: "👥" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 pt-16 flex">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 bg-slate-900 text-white transition-all duration-300 z-30 flex flex-col ${
          sidebarOpen ? "w-60" : "w-16"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-700">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
            N
          </div>
          {sidebarOpen && (
            <div>
              <div className="text-sm font-bold">Nexoria Admin</div>
              <div className="text-xs text-slate-400">Dashboard</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="text-base flex-shrink-0">{tab.icon}</span>
              {sidebarOpen && <span>{tab.label}</span>}
            </button>
          ))}
        </nav>

        {/* Toggle */}
        <div className="p-3 border-t border-slate-700">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all text-sm"
          >
            <svg
              className={`w-5 h-5 transition-transform ${sidebarOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
            {sidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-60" : "ml-16"}`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-black text-slate-900 capitalize">
                {TABS.find((t) => t.id === activeTab)?.icon}{" "}
                {TABS.find((t) => t.id === activeTab)?.label}
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">
                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-semibold border border-slate-200 bg-white rounded-xl text-slate-700 hover:bg-slate-50 transition-all">
                Export CSV
              </button>
              <button className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all">
                + New Booking
              </button>
            </div>
          </div>

          {/* ── Overview Tab ─────────────────────── */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {STATS.map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{s.icon}</span>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                        {s.change}
                      </span>
                    </div>
                    <div className="text-2xl font-black text-slate-900">{s.value}</div>
                    <div className="text-sm text-slate-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Revenue chart placeholder */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-slate-900">Revenue Overview</h3>
                  <div className="flex gap-2">
                    {["7D", "30D", "90D", "1Y"].map((p) => (
                      <button key={p} className={`px-3 py-1 rounded-lg text-xs font-semibold ${p === "30D" ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Simple bar chart */}
                <div className="h-48 flex items-end gap-3 px-2">
                  {[65, 45, 80, 55, 90, 75, 100, 60, 85, 70, 95, 88].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-indigo-500 transition-all hover:from-blue-500 hover:to-indigo-400 cursor-pointer"
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-[9px] text-slate-400">
                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent bookings */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900">Recent Bookings</h3>
                  <button onClick={() => setActiveTab("bookings")} className="text-sm text-blue-600 font-semibold hover:underline">
                    View all →
                  </button>
                </div>
                <div className="divide-y divide-slate-100">
                  {BOOKINGS.slice(0, 4).map((b) => (
                    <div key={b.id} className="flex items-center justify-between px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                          {b.client.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{b.client}</div>
                          <div className="text-xs text-slate-400">{b.plan} · {b.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm font-bold text-slate-900">${b.price}</div>
                        <StatusBadge status={b.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Bookings Tab ─────────────────────── */}
          {activeTab === "bookings" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">All Bookings ({BOOKINGS.length})</h3>
                <input
                  type="search"
                  placeholder="Search bookings..."
                  className="px-3 py-2 text-sm rounded-xl border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-52"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full admin-table">
                  <thead className="bg-slate-50">
                    <tr>
                      <th>Booking ID</th>
                      <th>Client</th>
                      <th>Plan</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BOOKINGS.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                        <td>
                          <span className="font-mono text-xs text-blue-600 font-bold">{b.id}</span>
                        </td>
                        <td>
                          <div>
                            <div className="font-medium text-slate-900 text-sm">{b.client}</div>
                            <div className="text-xs text-slate-400">{b.email}</div>
                          </div>
                        </td>
                        <td><span className="text-sm">{b.plan}</span></td>
                        <td><span className="font-bold text-slate-900">${b.price}</span></td>
                        <td><span className="text-sm text-slate-500">{b.date}</span></td>
                        <td><StatusBadge status={b.status} /></td>
                        <td>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              View
                            </button>
                            <button className="px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Projects Tab ─────────────────────── */}
          {activeTab === "projects" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Portfolio Projects ({PROJECTS.length})</h3>
                <button className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all">
                  + Add Project
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full admin-table">
                  <thead className="bg-slate-50">
                    <tr>
                      <th>Project</th>
                      <th>Client</th>
                      <th>Plan</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PROJECTS.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                        <td>
                          <span className="font-medium text-slate-900 text-sm">{p.title}</span>
                        </td>
                        <td><span className="text-sm text-slate-600">{p.client}</span></td>
                        <td><span className="text-sm">{p.plan}</span></td>
                        <td><span className="text-sm text-slate-500">{p.date}</span></td>
                        <td><StatusBadge status={p.status} /></td>
                        <td>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">Edit</button>
                            <button className="px-3 py-1 text-xs font-semibold text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">Publish</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Feedback Tab ─────────────────────── */}
          {activeTab === "feedback" && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 mb-2">
                {[
                  { label: "Total Reviews", value: "48" },
                  { label: "Published", value: "44" },
                  { label: "Avg. Rating", value: "4.97" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center">
                    <div className="text-2xl font-black text-slate-900">{s.value}</div>
                    <div className="text-sm text-slate-500">{s.label}</div>
                  </div>
                ))}
              </div>
              {FEEDBACK.map((f) => (
                <div key={f.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {f.client.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-slate-900 text-sm">{f.client}</span>
                          <StarRating count={f.rating} />
                          <span className="text-xs text-slate-400">{f.date}</span>
                        </div>
                        <div className="text-xs text-slate-400 mb-2">{f.plan}</div>
                        <p className="text-sm text-slate-600 italic">"{f.comment}"</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                      <StatusBadge status={f.status} />
                      {f.status === "pending" && (
                        <button className="px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                          Approve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Clients Tab ─────────────────────── */}
          {activeTab === "clients" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <h3 className="font-bold text-slate-900">Client Database</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {BOOKINGS.map((b) => (
                  <div key={b.id} className="flex items-center justify-between px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-xs font-bold">
                        {b.client.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">{b.client}</div>
                        <div className="text-xs text-slate-400">{b.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-slate-900">{b.plan}</div>
                        <div className="text-xs text-slate-400">Last Plan</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-slate-900">${b.price}</div>
                        <div className="text-xs text-slate-400">Spent</div>
                      </div>
                      <StatusBadge status={b.status} />
                      <button className="px-3 py-1.5 text-xs font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
