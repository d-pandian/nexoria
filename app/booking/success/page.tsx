"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-black text-slate-900 mb-3">Payment Successful!</h1>
        <p className="text-slate-500 mb-2">
          Your session has been booked and confirmed. Check your email for details.
        </p>
        {sessionId && (
          <p className="text-xs text-slate-400 mb-8 font-mono">
            Reference: {sessionId.slice(-8).toUpperCase()}
          </p>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 text-left">
          <h3 className="font-bold text-slate-900 mb-4">What happens next?</h3>
          <div className="space-y-3">
            {[
              { step: "1", text: "You'll receive a booking confirmation email within 5 minutes." },
              { step: "2", text: "Our team reviews your requirements and assigns your consultant." },
              { step: "3", text: "A calendar invite with session link is sent 48h before your session." },
              { step: "4", text: "Your session takes place at the scheduled time. Let's grow your revenue!" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {item.step}
                </div>
                <p className="text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="px-6 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all">
            Back to Home
          </Link>
          <Link href="/portfolio" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all">
            Explore Our Work
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
