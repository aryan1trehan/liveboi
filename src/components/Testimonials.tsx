"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const testimonials = [
  {
    name: "Emma Waltz",
    role: "CEO, Nova Labs",
    rating: 5.0,
    text: "Working with Enhanccee transformed our online presence. We saw immediate gains in visibility and brand recognition within the first month. Their strategic approach is unmatched.",
  },
  {
    name: "Emily Carter",
    role: "Marketing Director, Pixel Co",
    rating: 4.9,
    text: "The team brought fresh, innovative ideas that perfectly captured our brand essence. Their creative solutions exceeded our expectations and our customers love the new identity.",
  },
  {
    name: "James Lawson",
    role: "Founder, Arc Digital",
    rating: 5.0,
    text: "Enhanccee delivered an identity system that's both beautiful and functional. They understood our vision from day one and brought it to life with remarkable precision.",
  },
  {
    name: "Sarah Mitchell",
    role: "CMO, Wave Media",
    rating: 5.0,
    text: "From strategy to execution, Enhanccee was a reliable partner at every step. Their professionalism and expertise made the entire rebranding process smooth and enjoyable.",
  },
  {
    name: "Daniel Roberts",
    role: "Director, Orbit Brand",
    rating: 4.9,
    text: "The quality of work is exceptional. Every detail was carefully considered, and the final result is a brand that truly represents who we are and where we're going.",
  },
];

const headingStyle = {
  fontFamily: "var(--font-barlow-condensed), Arial Narrow, Arial, sans-serif",
  fontWeight: 900,
  fontSize: "clamp(72px, 18vw, 220px)" as const,
  letterSpacing: "-0.02em",
};

function HeadingReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <div ref={ref} className="px-4 md:px-8 mb-16">
      {/* WORDS */}
      <div className="flex leading-none mb-0" style={headingStyle}>
        {"WORDS".split("").map((letter, i) => (
          <div key={i} style={{ overflow: "hidden", display: "inline-block", lineHeight: 1 }}>
            <motion.span
              initial={{ y: "105%" }}
              animate={inView ? { y: "0%" } : { y: "105%" }}
              transition={{ duration: 0.75, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ display: "inline-block", color: "#000" }}
            >
              {letter}
            </motion.span>
          </div>
        ))}
      </div>

      {/* SHARED ghost */}
      <div className="flex leading-none -mt-3 md:-mt-5" style={headingStyle}>
        {"SHARED".split("").map((letter, i) => (
          <div key={i} style={{ overflow: "hidden", display: "inline-block", lineHeight: 1 }}>
            <motion.span
              initial={{ y: "105%" }}
              animate={inView ? { y: "0%" } : { y: "105%" }}
              transition={{ duration: 0.75, delay: 0.15 + i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ display: "inline-block", color: "rgba(0,0,0,0.12)" }}
            >
              {letter}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);
  const t = testimonials[active];

  return (
    <section
      className="relative bg-[#f0f0f0] text-black"
      style={{ marginTop: "-40px", paddingTop: "80px", zIndex: 5 }}
    >
      <div className="pb-24">

        {/* Marquee */}
        <div className="overflow-hidden py-4 mb-6">
          <div className="animate-marquee flex whitespace-nowrap" style={{ width: "200%" }}>
            {Array(16).fill(null).map((_, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-black/25 pr-8"
              >
                <span className="text-black/15">✦</span>
                TESTIMONIALS — TESTIMONIALS
              </span>
            ))}
          </div>
        </div>

        {/* WORDS + SHARED — letter-by-letter clip reveal via useInView */}
        <HeadingReveal />

        {/* Testimonial card */}
        <div className="px-4 md:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-12 items-start"
            >
              {/* Quote */}
              <div>
                <div
                  className="font-serif mb-4 leading-none text-black/10"
                  style={{ fontSize: "clamp(60px, 10vw, 120px)" }}
                >
                  "
                </div>
                <p className="text-black/60 text-base md:text-lg leading-relaxed mb-10">
                  {t.text}
                </p>
                {/* Stars */}
                <div className="flex items-center gap-1.5 mb-6">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="text-black/70">
                      <path d="M7 1l1.545 3.09L12 4.635l-2.5 2.41.59 3.41L7 8.77l-3.09 1.685.59-3.41L2 4.635l3.455-.545z"/>
                    </svg>
                  ))}
                  <span className="text-xs text-black/40 ml-1 font-mono">{t.rating}</span>
                </div>
              </div>

              {/* Author + controls */}
              <div className="flex flex-col gap-8">
                <div
                  className="rounded-2xl p-6"
                  style={{ background: "#e4e4e4", border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <div className="w-11 h-11 rounded-full bg-black/10 flex items-center justify-center mb-4 text-base font-black text-black/50">
                    {t.name[0]}
                  </div>
                  <p className="font-bold text-black text-base">{t.name}</p>
                  <p className="text-black/40 text-sm">{t.role}</p>
                </div>

                {/* Nav controls */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center hover:border-black/40 hover:bg-black/5 transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        className="h-1 rounded-full transition-all"
                        style={{
                          width: i === active ? "2rem" : "1rem",
                          background: i === active ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.15)",
                        }}
                      />
                    ))}
                  </div>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center hover:border-black/40 hover:bg-black/5 transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
