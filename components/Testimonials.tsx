"use client";

import { useState, useEffect, useCallback } from "react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "CEO",
    company: "StrataLogic Inc.",
    avatar: "AT",
    avatarColor: "from-blue-500 to-blue-700",
    rating: 5,
    plan: "Pinnacle Plan",
    quote:
      "Working with Nexoria completely transformed our project workflow. Their strategies are precise, professional, and scalable. We saw a 43% increase in client revenue within 60 days of implementing their recommendations.",
    country: "🇺🇸 United States",
  },
  {
    id: 2,
    name: "Monica Reyes",
    role: "Product Manager",
    company: "Elevate Labs",
    avatar: "MR",
    avatarColor: "from-indigo-500 to-purple-600",
    rating: 5,
    plan: "Core Plan",
    quote:
      "The Launch and Core plans helped us streamline operations and improve client engagement significantly. Nexoria's approach is professional, structured, and results-driven. Exactly what we needed at our stage of growth.",
    country: "🇨🇦 Canada",
  },
  {
    id: 3,
    name: "Jordan Kim",
    role: "Founder",
    company: "Vyntrix Solutions",
    avatar: "JK",
    avatarColor: "from-violet-500 to-indigo-600",
    rating: 5,
    plan: "Advance Plan",
    quote:
      "Nexoria's consulting sessions and premium guidance directly increased our revenue per client. Their system feels like having an in-house expert team. The ROI on the Advance Plan was 8x within the first month.",
    country: "🇦🇺 Australia",
  },
  {
    id: 4,
    name: "Sophia Patel",
    role: "Director of Operations",
    company: "Axion Corp.",
    avatar: "SP",
    avatarColor: "from-emerald-500 to-teal-600",
    rating: 5,
    plan: "Pinnacle Plan",
    quote:
      "From portfolio showcase to actionable strategies, Nexoria is a game-changer. The Pinnacle Plan delivers exceptional value. We have recommended Nexoria to three other companies in our network already.",
    country: "🇬🇧 United Kingdom",
  },
  {
    id: 5,
    name: "Marcus Hendricks",
    role: "Co-Founder",
    company: "NorthBridge Ventures",
    avatar: "MH",
    avatarColor: "from-amber-500 to-orange-600",
    rating: 5,
    plan: "Core Plan",
    quote:
      "I was skeptical at first, but the Core Plan session gave us more actionable insight than a full quarter of internal strategy meetings. The portfolio showcase alone brought us two new enterprise clients.",
    country: "🇩🇪 Germany",
  },
  {
    id: 6,
    name: "Priya Nair",
    role: "Head of Growth",
    company: "Luminary Digital",
    avatar: "PN",
    avatarColor: "from-rose-500 to-pink-600",
    rating: 5,
    plan: "Launch Plan",
    quote:
      "Even at the Launch Plan tier, Nexoria delivered a clear, structured roadmap that we have been executing for the past three months. The quality of guidance far exceeded the price point. Will definitely upgrade.",
    country: "🇸🇬 Singapore",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-amber-400" : "text-slate-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const next = useCallback(() => {
    setActive((a) => (a + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [autoplay, next]);

  const activeTestimonial = TESTIMONIALS[active];

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Client Reviews
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Trusted by professionals and creators globally
          </p>

          {/* Aggregate rating */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-2xl font-black text-slate-900">5.0</span>
            <span className="text-slate-500">from 200+ verified reviews</span>
          </div>
        </div>

        {/* Featured testimonial */}
        <div
          className="max-w-3xl mx-auto mb-12"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl" />

            {/* Quote mark */}
            <div className="text-blue-500/20 text-[120px] font-black leading-none absolute top-4 left-8 select-none">
              "
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <StarRating count={activeTestimonial.rating} />
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/20">
                  {activeTestimonial.plan}
                </span>
              </div>

              <blockquote className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 font-medium">
                "{activeTestimonial.quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${activeTestimonial.avatarColor} flex items-center justify-center text-white font-black text-sm`}
                >
                  {activeTestimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-bold">{activeTestimonial.name}</div>
                  <div className="text-slate-400 text-sm">
                    {activeTestimonial.role}, {activeTestimonial.company}
                  </div>
                  <div className="text-slate-500 text-xs mt-0.5">{activeTestimonial.country}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all rounded-full ${
                    i === active
                      ? "w-8 h-2 bg-blue-600"
                      : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mini card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`text-left p-5 rounded-2xl border transition-all duration-200 ${
                active === i
                  ? "border-blue-200 bg-blue-50 shadow-md"
                  : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white text-xs font-black`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.company}</div>
                </div>
              </div>
              <StarRating count={t.rating} />
              <p className="text-slate-600 text-xs mt-2 line-clamp-2">{t.quote}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
