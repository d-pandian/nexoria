"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const CONTACT_INFO = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "hello@nexoria.in",
    sub: "Response within 24 hours",
    href: "mailto:hello@nexoria.in",
    color: "blue",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone / WhatsApp",
    value: "+91 98765 43210",
    sub: "Mon – Sat, 9 AM – 7 PM IST",
    href: "tel:+919876543210",
    color: "emerald",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Office Address",
    value: "Nexoria HQ, JP Nagar",
    sub: "Bangalore, Karnataka 560078, India",
    href: null,
    color: "violet",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Business Hours",
    value: "Mon – Sat: 9:00 AM – 7:00 PM",
    sub: "IST (UTC+5:30) · Serving 40+ countries",
    href: null,
    color: "amber",
  },
];

const COLOR_MAP: Record<string, string> = {
  blue:    "bg-blue-50 text-blue-600",
  emerald: "bg-emerald-50 text-emerald-600",
  violet:  "bg-violet-50 text-violet-600",
  amber:   "bg-amber-50 text-amber-600",
};

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", company: "", subject: "", message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Message sent! We'll reply within 24 hours.");
        setForm({ name: "", email: "", company: "", subject: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Failed to send. Please email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
            Let's Talk About Your Project
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Have a question or want a custom enterprise plan? Reach out — Pandian D personally
            reviews every inquiry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── Left: Contact info ──────────────── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Founder quick contact */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg">
                  PD
                </div>
                <div>
                  <div className="font-bold text-white">Pandian D</div>
                  <div className="text-blue-300 text-sm">Founder & CEO, JP</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-medium">Available for sessions</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                "Every client inquiry is personally reviewed. I'll ensure your project gets the right plan and attention it deserves."
              </p>
            </div>

            {CONTACT_INFO.map((info) => (
              <div key={info.label} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${COLOR_MAP[info.color]}`}>
                  {info.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    {info.label}
                  </div>
                  {info.href ? (
                    <a href={info.href} className="font-semibold text-slate-900 hover:text-blue-600 transition-colors text-sm">
                      {info.value}
                    </a>
                  ) : (
                    <div className="font-semibold text-slate-900 text-sm">{info.value}</div>
                  )}
                  <div className="text-xs text-slate-400 mt-0.5">{info.sub}</div>
                </div>
              </div>
            ))}

            {/* GPay/UPI direct */}
            <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
                  <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" fill="#FFC107"/>
                  <path d="M6.3 14.7l7.1 5.2C15.1 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.6 7.3 6.3 14.7z" fill="#FF3D00"/>
                  <path d="M24 46c5.5 0 10.5-2 14.3-5.4l-6.6-5.6C29.7 36.6 27 37.5 24 37.5c-6.1 0-10.7-3.1-11.8-8.5l-7 5.5C7.9 41.3 15.4 46 24 46z" fill="#4CAF50"/>
                  <path d="M44.5 20H24v8.5h11.8c-.7 2.8-2.4 5.1-4.8 6.6l6.6 5.6C43.1 37.4 46 31.3 46 24c0-1.3-.2-2.7-.5-4z" fill="#1976D2"/>
                </svg>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Ready to book?</div>
                  <div className="text-xs text-slate-500">Pay via GPay / UPI securely</div>
                </div>
              </div>
              <a
                href="/booking"
                className="block text-center py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-95 transition-all text-sm"
              >
                Book & Pay via GPay/UPI →
              </a>
            </div>
          </div>

          {/* ── Right: Contact form ─────────────── */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-slate-100 shadow-card p-8"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6">Send a Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="form-label">Name <span className="text-red-500">*</span></label>
                  <input type="text" className="form-input" placeholder="Alex Thompson"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <label className="form-label">Email <span className="text-red-500">*</span></label>
                  <input type="email" className="form-input" placeholder="alex@company.com"
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="form-label">Company</label>
                  <input type="text" className="form-input" placeholder="StrataLogic Inc."
                    value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">Subject</label>
                  <select className="form-input" value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                    <option value="">Select topic...</option>
                    <option value="pricing">Pricing / Plans</option>
                    <option value="enterprise">Enterprise Package</option>
                    <option value="partnership">Partnership</option>
                    <option value="gpay">GPay / UPI Payment Help</option>
                    <option value="support">Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="form-label">Message <span className="text-red-500">*</span></label>
                <textarea rows={5} className="form-input resize-none"
                  placeholder="Tell us about your project, goals, and how we can help..."
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-400 mt-4">
                🔒 Your information is secure and never shared with third parties.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
