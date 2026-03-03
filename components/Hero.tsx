"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

const STATS = [
  { value: "500+", label: "Projects Delivered" },
  { value: "$2.4M", label: "Revenue Generated" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "40+", label: "Countries Served" },
];

const FOUNDER_BADGES = [
  { icon: "🌍", text: "Global Clients" },
  { icon: "💼", text: "500+ Projects" },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { width, height } = heroRef.current.getBoundingClientRect();
      const x = ((clientX / width - 0.5) * 15).toFixed(2);
      const y = ((clientY / height - 0.5) * 15).toFixed(2);
      heroRef.current.style.setProperty("--mx", `${x}px`);
      heroRef.current.style.setProperty("--my", `${y}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-[#0d1829] to-blue-950"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-indigo-600/12 rounded-full blur-[80px] animate-pulse-slow [animation-delay:2s]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-cyan-600/8 rounded-full blur-[60px] animate-pulse-slow [animation-delay:4s]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Content ──────────────────── */}
          <div>
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Trusted by 500+ professionals across 40+ countries
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-5">
              Transform Your Projects{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Into Premium
              </span>
              <br />
              Revenue Systems
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
              Showcase your work, sell services, and manage clients in one
              powerful platform. Pay securely via{" "}
              <span className="text-blue-300 font-semibold">GPay / UPI</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-900/30 active:scale-95 transition-all text-base"
              >
                Start Your Session
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-bold rounded-2xl border border-white/20 backdrop-blur-sm active:scale-95 transition-all text-base"
              >
                {/* GPay icon */}
                <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
                  <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" fill="#FFC107"/>
                  <path d="M6.3 14.7l7.1 5.2C15.1 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.6 7.3 6.3 14.7z" fill="#FF3D00"/>
                  <path d="M24 46c5.5 0 10.5-2 14.3-5.4l-6.6-5.6C29.7 36.6 27 37.5 24 37.5c-6.1 0-10.7-3.1-11.8-8.5l-7 5.5C7.9 41.3 15.4 46 24 46z" fill="#4CAF50"/>
                  <path d="M44.5 20H24v8.5h11.8c-.7 2.8-2.4 5.1-4.8 6.6l6.6 5.6C43.1 37.4 46 31.3 46 24c0-1.3-.2-2.7-.5-4z" fill="#1976D2"/>
                </svg>
                View Plans & Pay
              </Link>
            </div>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-2">
              {["✓ GPay / UPI Payments", "✓ Instant confirmation", "✓ Results-driven sessions", "✓ 40+ countries"].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/50 text-slate-300 text-xs font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: Founder Card ─────────────── */}
          <div className="flex justify-center lg:justify-end px-4 sm:px-0">
            <div className="relative w-full max-w-sm">
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-3xl blur-2xl scale-105" />

              {/* Main card */}
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">

                {/* Photo area */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    {/* Photo frame */}
                    <div className="w-32 h-40 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5">
                      <div className="relative w-[124px] h-[156px] rounded-2xl overflow-hidden">
                        <Image
                          src="/founder.jpg"
                          alt="Pandian D"
                          fill
                          className="object-cover object-top rounded-2xl"
                          sizes="128px"
                          priority
                        />
                      </div>
                    </div>

                    {/* Online indicator */}
                    <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-green-500 border-2 border-slate-900 animate-pulse" />
                  </div>
                </div>

                {/* Name & title */}
                <div className="text-center mb-5">
                  <h3 className="text-xl font-black text-white mb-1">Joel Precious M</h3>
                  <p className="text-blue-300 font-semibold text-sm">Founder</p>
                  <p className="text-slate-400 text-xs mt-1">CEO: Pandian D</p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-5" />

                {/* Badges */}
                <div className="space-y-2.5 mb-6">
                  {FOUNDER_BADGES.map((b) => (
                    <div key={b.text} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-700/60 flex items-center justify-center text-sm">
                        {b.icon}
                      </div>
                      <span className="text-slate-300 text-sm font-medium">{b.text}</span>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <div className="bg-slate-700/40 rounded-xl p-4 border border-slate-600/30">
                  <p className="text-slate-300 text-xs leading-relaxed italic">
                    "I built Nexoria to help professionals convert their expertise into structured, scalable revenue systems."
                  </p>
                </div>

                {/* Book session CTA */}
                <Link
                  href="/booking"
                  className="mt-5 block w-full text-center py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-indigo-500 active:scale-95 transition-all text-sm"
                >
                  Book a Session with Pandian →
                </Link>
              </div>

              {/* Floating stat cards — hidden on mobile to prevent overflow */}
              <div className="hidden sm:block absolute -left-6 top-12 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-4 py-3 shadow-lg">
                <div className="text-white font-black text-xl">4.97</div>
                <div className="text-slate-300 text-xs">⭐ Avg Rating</div>
              </div>

              <div className="hidden sm:block absolute -right-6 bottom-20 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-4 py-3 shadow-lg">
                <div className="text-white font-black text-xl">500+</div>
                <div className="text-slate-300 text-xs">🌍 Clients</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Row ─────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-slate-400 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
        <div className="w-6 h-10 rounded-full border-2 border-slate-700 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-slate-500 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
