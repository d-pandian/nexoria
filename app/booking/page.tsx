"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

/* ── Types ──────────────────────────── */
interface BookingResult {
  bookingRef: string;
  plan: string;
  priceUSD: number;
  priceINR: string;
  firstName: string;
  lastName: string;
  email: string;
  paymentId: string;
}

/* ── Plan data ───────────────────────── */
const PLANS = [
  { id: "launch",   name: "Launch Plan",   priceUSD: 36,  priceINR: "₹3,000",  sessions: "1 × 60 min",  popular: false, color: "blue" },
  { id: "core",     name: "Core Plan",     priceUSD: 48,  priceINR: "₹4,000",  sessions: "1 × 90 min",  popular: true,  color: "indigo" },
  { id: "advance",  name: "Advance Plan",  priceUSD: 84,  priceINR: "₹7,000",  sessions: "2 × 90 min",  popular: false, color: "violet" },
  { id: "pinnacle", name: "Pinnacle Plan", priceUSD: 192, priceINR: "₹16,000", sessions: "4 × unlimited", popular: false, color: "amber" },
];

/* ── Razorpay loader helper ───────────── */
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload  = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/* ── GPay icon ───────────────────────── */
function GPayIcon({ size = 5 }: { size?: number }) {
  return (
    <svg className={`w-${size} h-${size} flex-shrink-0`} viewBox="0 0 48 48" fill="none">
      <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" fill="#FFC107"/>
      <path d="M6.3 14.7l7.1 5.2C15.1 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.6 7.3 6.3 14.7z" fill="#FF3D00"/>
      <path d="M24 46c5.5 0 10.5-2 14.3-5.4l-6.6-5.6C29.7 36.6 27 37.5 24 37.5c-6.1 0-10.7-3.1-11.8-8.5l-7 5.5C7.9 41.3 15.4 46 24 46z" fill="#4CAF50"/>
      <path d="M44.5 20H24v8.5h11.8c-.7 2.8-2.4 5.1-4.8 6.6l6.6 5.6C43.1 37.4 46 31.3 46 24c0-1.3-.2-2.7-.5-4z" fill="#1976D2"/>
    </svg>
  );
}

/* ── Main booking component ──────────── */
function BookingContent() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan") || "core";

  const [step, setStep]               = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(planParam);
  const [loading, setLoading]         = useState(false);
  const [result, setResult]           = useState<BookingResult | null>(null);

  const [form, setForm] = useState({
    firstName:     "",
    lastName:      "",
    email:         "",
    company:       "",
    phone:         "",
    timezone:      "UTC+5:30 (IST)",
    projectType:   "",
    goals:         "",
    challenges:    "",
    preferredDate: "",
    preferredTime: "",
  });

  // Sync plan param
  useEffect(() => {
    if (planParam && PLANS.find((p) => p.id === planParam)) {
      setSelectedPlan(planParam);
    }
  }, [planParam]);

  const selectedPlanData = PLANS.find((p) => p.id === selectedPlan)!;

  /* ── Razorpay payment handler ──────── */
  const handleRazorpayPayment = useCallback(async () => {
    if (!form.firstName || !form.email || !form.goals) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);

    try {
      // 1. Load Razorpay script
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error("Payment system failed to load. Check your connection.");
        setLoading(false);
        return;
      }

      // 2. Create Razorpay order on backend
      const orderRes = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selectedPlan, ...form }),
      });
      const order = await orderRes.json();

      if (!orderRes.ok || !order.orderId) {
        toast.error(order.error || "Failed to create payment order.");
        setLoading(false);
        return;
      }

      // 3. Demo mode — skip Razorpay modal
      if (order.demo) {
        const verifyRes = await fetch("/api/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id:   order.orderId,
            razorpay_payment_id: "demo_pay_" + order.receipt,
            razorpay_signature:  "demo_sig",
            plan:      selectedPlan,
            planLabel: order.planLabel,
            demo:      true,
            ...form,
          }),
        });
        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          setResult(verifyData);
          setStep(4);
        } else {
          toast.error("Booking failed. Please try again.");
        }
        setLoading(false);
        return;
      }

      // 4. Open Razorpay checkout (live mode)
      const razorpayKey = order.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";

      const options: RazorpayOptions = {
        key:         razorpayKey,
        amount:      order.amount,
        currency:    order.currency,
        name:        "Nexoria",
        description: `${order.planLabel} — Consulting Session`,
        order_id:    order.orderId,
        prefill: {
          name:    `${form.firstName} ${form.lastName}`,
          email:   form.email,
          contact: form.phone,
        },
        theme: { color: "#2563eb" },
        config: {
          display: {
            blocks: {
              utib: { name: "Pay via GPay / UPI", instruments: [{ method: "upi" }] },
              other: { name: "Other payment methods", instruments: [{ method: "card" }, { method: "netbanking" }] },
            },
            sequence:    ["block.utib", "block.other"],
            preferences: { show_default_blocks: false },
          },
        },
        modal: {
          ondismiss: () => {
            toast("Payment cancelled. You can try again.", { icon: "ℹ️" });
            setLoading(false);
          },
        },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                plan:      selectedPlan,
                planLabel: order.planLabel,
                ...form,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setResult(verifyData);
              setStep(4);
              toast.success("Payment confirmed! Booking created.");
            } else {
              toast.error(verifyData.error || "Payment verification failed.");
            }
          } catch {
            toast.error("Verification error. Contact support with your payment ID.");
          } finally {
            setLoading(false);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  }, [selectedPlan, form]);

  /* ── Step indicator ──────────────────── */
  const STEPS = [
    { n: 1, label: "Select Plan" },
    { n: 2, label: "Your Details" },
    { n: 3, label: "Pay via GPay/UPI" },
    { n: 4, label: "Confirmed!" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-sm mb-8 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Book Your Session</h1>
          <p className="text-slate-500">
            Secure payment via{" "}
            <span className="font-semibold text-slate-700 inline-flex items-center gap-1">
              <GPayIcon size={4} /> GPay / UPI
            </span>
            {" "}powered by Razorpay
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-1 sm:gap-3 mb-10 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
              <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                step === s.n ? "bg-blue-600 text-white shadow-md" :
                step > s.n  ? "bg-emerald-500 text-white" :
                "bg-slate-200 text-slate-500"
              }`}>
                {step > s.n ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="w-4 h-4 flex items-center justify-center font-black">{s.n}</span>
                )}
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-4 sm:w-8 h-0.5 ${step > s.n ? "bg-emerald-400" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* ══ Step 1 — Plan Selection ══════════ */}
        {step === 1 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
              {PLANS.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                    selectedPlan === plan.id
                      ? "border-blue-600 bg-blue-50 shadow-lg"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full">
                      Popular
                    </span>
                  )}
                  {selectedPlan === plan.id && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  <div className="text-2xl font-black text-slate-900 mb-0.5">${plan.priceUSD}</div>
                  <div className="text-xs text-slate-400 mb-2">{plan.priceINR} via GPay/UPI</div>
                  <div className="text-sm font-bold text-slate-800 mb-1">{plan.name}</div>
                  <div className="text-xs font-medium text-blue-600 bg-blue-50 rounded-lg px-2 py-1 inline-block">
                    {plan.sessions}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-md flex items-center gap-2"
              >
                Continue with {selectedPlanData.name}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ══ Step 2 — Client Details ══════════ */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Your Details & Requirements</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="form-label">First Name <span className="text-red-500">*</span></label>
                  <input className="form-input" placeholder="Alex" value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">Last Name</label>
                  <input className="form-input" placeholder="Thompson" value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="form-label">Email <span className="text-red-500">*</span></label>
                  <input type="email" className="form-input" placeholder="alex@company.com" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">Company</label>
                  <input className="form-input" placeholder="StrataLogic Inc." value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="form-label">Phone / WhatsApp</label>
                  <input type="tel" className="form-input" placeholder="+91 98765 43210" value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">Timezone</label>
                  <select className="form-input" value={form.timezone}
                    onChange={(e) => setForm({ ...form, timezone: e.target.value })}>
                    {["UTC+5:30 (IST)", "UTC-5 (EST)", "UTC-8 (PST)", "UTC+0 (GMT)", "UTC+1 (CET)", "UTC+3 (GST)", "UTC+8 (SGT)", "UTC+9 (JST)", "UTC+10 (AEST)"].map((tz) => (
                      <option key={tz}>{tz}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <label className="form-label">Project Type</label>
                <select className="form-input" value={form.projectType}
                  onChange={(e) => setForm({ ...form, projectType: e.target.value })}>
                  <option value="">Select project type...</option>
                  {["SaaS / Tech Product", "E-commerce / Retail", "Consulting / Agency", "Creative / Media", "Professional Services", "Startup / Early Stage", "Enterprise / Corporate", "Other"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label className="form-label">Primary Goals <span className="text-red-500">*</span></label>
                <textarea rows={3} className="form-input resize-none"
                  placeholder="E.g. Increase revenue per client, launch premium tier, build social proof..."
                  value={form.goals} onChange={(e) => setForm({ ...form, goals: e.target.value })} />
              </div>

              <div className="mb-5">
                <label className="form-label">Current Challenges</label>
                <textarea rows={3} className="form-input resize-none"
                  placeholder="E.g. Low conversion rates, unclear positioning, inconsistent results..."
                  value={form.challenges} onChange={(e) => setForm({ ...form, challenges: e.target.value })} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="form-label">Preferred Date</label>
                  <input type="date" className="form-input" value={form.preferredDate}
                    onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">Preferred Time</label>
                  <select className="form-input" value={form.preferredTime}
                    onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}>
                    <option value="">Select time...</option>
                    {["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)}
                  className="px-6 py-3 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 active:scale-95 transition-all">
                  Back
                </button>
                <button onClick={() => {
                    if (!form.firstName || !form.email || !form.goals) {
                      toast.error("Please fill Name, Email and Goals.");
                      return;
                    }
                    setStep(3);
                  }}
                  className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2">
                  Continue to Payment
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Order summary */}
            <OrderSummary plan={selectedPlanData} />
          </div>
        )}

        {/* ══ Step 3 — Payment ═════════════════ */}
        {step === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">

              {/* Booking details recap */}
              <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-5">Confirm & Pay</h2>
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <div className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1">Name</div>
                    <div className="font-semibold text-slate-900">{form.firstName} {form.lastName}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1">Email</div>
                    <div className="font-semibold text-slate-900">{form.email}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1">Plan</div>
                    <div className="font-semibold text-slate-900">{selectedPlanData.name}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1">Amount</div>
                    <div className="font-bold text-slate-900">
                      ${selectedPlanData.priceUSD}{" "}
                      <span className="text-slate-400 font-normal">/ {selectedPlanData.priceINR}</span>
                    </div>
                  </div>
                </div>

                {/* Payment method display */}
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <GPayIcon size={6} />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">GPay / UPI</div>
                      <div className="text-xs text-slate-500">Powered by Razorpay — Bank-grade encryption</div>
                    </div>
                    <div className="ml-auto px-2.5 py-1 rounded-lg bg-green-50 text-green-700 text-[10px] font-bold border border-green-200">
                      🔒 Secure
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    You'll be redirected to the Razorpay checkout page to pay via GPay, UPI, Debit/Credit card,
                    or Net Banking. Your bank details are never shared with Nexoria.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)}
                    className="px-6 py-3 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 active:scale-95 transition-all">
                    Back
                  </button>
                  <button
                    onClick={handleRazorpayPayment}
                    disabled={loading}
                    className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-indigo-500 active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-3 shadow-lg shadow-blue-200"
                  >
                    {loading ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Opening Razorpay...
                      </>
                    ) : (
                      <>
                        <GPayIcon size={5} />
                        Pay {selectedPlanData.priceINR} via GPay / UPI
                      </>
                    )}
                  </button>
                </div>

                <p className="text-center text-[11px] text-slate-400 mt-3">
                  🔒 Secured by Razorpay · 256-bit SSL · PCI-DSS Level 1 Certified
                </p>
              </div>
            </div>

            <OrderSummary plan={selectedPlanData} />
          </div>
        )}

        {/* ══ Step 4 — Confirmation ════════════ */}
        {step === 4 && result && (
          <div className="max-w-2xl mx-auto">
            {/* Success header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">Booking Confirmed! 🎉</h2>
              <p className="text-slate-500">
                Your payment was successful and your session is booked.
                Check your email for confirmation.
              </p>
            </div>

            {/* Booking card */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl mb-8">

              {/* Header band */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-5 flex items-center justify-between">
                <div>
                  <div className="text-blue-100 text-xs font-semibold uppercase tracking-widest mb-1">Booking Confirmation</div>
                  <div className="text-white text-2xl font-black tracking-wide">{result.bookingRef}</div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full mb-1">✓ Confirmed</div>
                  <div className="text-blue-100 text-xs">
                    {new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-8">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Client Name</div>
                    <div className="font-bold text-slate-900">{result.firstName} {result.lastName}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Email</div>
                    <div className="font-semibold text-slate-900 text-sm break-all">{result.email}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Plan</div>
                    <div className="font-bold text-slate-900">{result.plan}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Amount Paid</div>
                    <div className="font-bold text-slate-900">
                      ${result.priceUSD}
                      <span className="text-slate-400 font-normal ml-1 text-sm">/ {result.priceINR}</span>
                    </div>
                  </div>
                </div>

                {/* Payment method */}
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 mb-6">
                  <GPayIcon size={5} />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Paid via GPay / UPI</div>
                    {result.paymentId && !result.paymentId.startsWith("demo") && (
                      <div className="text-xs text-slate-400 font-mono">{result.paymentId}</div>
                    )}
                  </div>
                  <div className="ml-auto text-emerald-600 font-bold text-sm">✓ Verified</div>
                </div>

                {/* What's next */}
                <div className="border-t border-slate-100 pt-6">
                  <h4 className="font-bold text-slate-900 mb-4">What happens next?</h4>
                  <div className="space-y-3">
                    {[
                      { icon: "📧", text: "Booking confirmation email sent to " + result.email },
                      { icon: "📅", text: "Calendar invite with session link sent 48h before session" },
                      { icon: "👤", text: "Pandian D personally reviews your requirements" },
                      { icon: "🚀", text: "Your session takes place — let's transform your revenue!" },
                    ].map((item) => (
                      <div key={item.icon} className="flex items-start gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <p className="text-sm text-slate-600">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/"
                className="px-6 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 active:scale-95 transition-all text-center">
                Back to Home
              </Link>
              <Link href="/portfolio"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all text-center">
                View Our Portfolio
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Order summary sidebar ───────────── */
function OrderSummary({ plan }: { plan: typeof PLANS[0] }) {
  return (
    <div>
      <div className="bg-slate-900 rounded-2xl p-6 text-white sticky top-24">
        <h3 className="font-bold mb-5 text-slate-200">Order Summary</h3>
        <div className="bg-slate-800 rounded-xl p-4 mb-5">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold">{plan.name}</span>
            <span className="text-xl font-black">${plan.priceUSD}</span>
          </div>
          <div className="text-sm text-slate-400">{plan.sessions}</div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-blue-300 font-semibold">
            <GPayIcon size={3} /> {plan.priceINR} via GPay/UPI
          </div>
        </div>

        <div className="space-y-3 mb-5 text-sm">
          {[
            { label: "Subtotal", value: `$${plan.priceUSD}` },
            { label: "Processing fee", value: "$0.00" },
          ].map((row) => (
            <div key={row.label} className="flex justify-between text-slate-300">
              <span>{row.label}</span><span>{row.value}</span>
            </div>
          ))}
          <div className="border-t border-slate-700 pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-xl">${plan.priceUSD}</span>
          </div>
        </div>

        <div className="space-y-2 text-xs text-slate-400">
          {[
            { icon: "🔒", text: "Bank-grade SSL encryption" },
            { icon: "🔄", text: "Full refund within 24h if unstarted" },
            { icon: "⚡", text: "Instant booking confirmation" },
            { icon: "📅", text: "Calendar invite auto-sent" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Export with Suspense ────────────── */
export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 pt-24 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading booking...
        </div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
