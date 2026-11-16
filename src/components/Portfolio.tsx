"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

// ── Project data ────────────────────────────────────────────────────────────
const layer1 = [
  { title: "SPACE",  category: "DESIGN",   wordmark: "LOQO",  bg: "linear-gradient(160deg,#2a2a3a,#0e0e1a)" },
  { title: "MOBILE", category: "IDENTITY", wordmark: "IPSUM", bg: "linear-gradient(160deg,#c8b89a,#906840)" },
];
const layer2 = [
  { title: "REALITY",  category: "STRATEGY",   wordmark: "∞",    bg: "linear-gradient(160deg,#222,#0a0a0a)" },
  { title: "ECOLOGY",  category: "REBRANDING", wordmark: "LUUU", bg: "linear-gradient(160deg,#6a7878,#2a3838)" },
];

// ── Single project card ─────────────────────────────────────────────────────
function Card({ title, category, wordmark, bg }: {
  title: string; category: string; wordmark: string; bg: string;
}) {
  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden">
      {/* Label bar */}
      <div
        className="flex items-center justify-between px-5 py-4 shrink-0"
        style={{
          background: "rgba(14,14,14,0.90)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-black tracking-widest uppercase text-white">{title}</span>
          <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/40">
            • {category}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#fff" }}
          whileTap={{ scale: 0.93 }}
          className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center text-white/70 transition-colors"
          style={{ willChange: "transform" }}
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5"
              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>

      {/* Image area */}
      <div className="relative flex-1" style={{ background: bg }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-white font-black tracking-tighter select-none"
            style={{
              fontSize: "clamp(40px, 8vw, 100px)",
              fontFamily: "var(--font-barlow-condensed), Arial Narrow, Arial, sans-serif",
              opacity: 0.85,
              textShadow: "0 2px 40px rgba(0,0,0,0.5)",
            }}
          >
            {wordmark}
          </span>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
    </div>
  );
}

// ── Main export ─────────────────────────────────────────────────────────────
export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll progress over the 300vh section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Layer 2 slides up from 100% → 0% during the middle of the scroll
  const layer2Y = useTransform(scrollYProgress, [0.25, 0.65], ["100%", "0%"]);
  // Layer 1 scales down very slightly as layer 2 rises
  const layer1Scale = useTransform(scrollYProgress, [0.35, 0.65], [1, 0.96]);

  return (
    <section
      className="enh-glow relative bg-[#0d0d0d] text-white"
      style={{ borderRadius: "40px", marginTop: "-40px", zIndex: 10 }}
    >
      {/* ── Header: label + SELECTED / WORK ── */}
      <div className="pt-16 px-4 md:px-8">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-white/30">✦</span>
          <p className="text-[11px] tracking-[0.28em] text-white/30 uppercase font-medium">
            Our Portfolio — Our Port
          </p>
        </div>

        <div className="overflow-hidden">
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-black leading-none uppercase text-white"
            style={{
              fontFamily: "var(--font-barlow-condensed), Arial Narrow, Arial, sans-serif",
              fontWeight: 900, fontSize: "clamp(72px,18vw,220px)", letterSpacing: "-0.02em",
            }}
          >
            SELECTED
          </motion.div>
        </div>

        <div className="overflow-hidden -mt-3 md:-mt-5 mb-10">
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-black leading-none uppercase text-white/20"
            style={{
              fontFamily: "var(--font-barlow-condensed), Arial Narrow, Arial, sans-serif",
              fontWeight: 900, fontSize: "clamp(72px,18vw,220px)", letterSpacing: "-0.02em",
            }}
          >
            WORK
          </motion.div>
        </div>
      </div>

      {/* ── Scroll-stacked card grid ── */}
      {/* This div is 300vh tall — provides the scroll travel distance */}
      <div ref={sectionRef} style={{ height: "300vh" }}>
        {/* Sticky viewport — stays pinned while you scroll the 300vh */}
        <div
          className="sticky px-3 md:px-6 pb-6"
          style={{ top: "64px", height: "calc(100vh - 64px)", overflow: "hidden" }}
        >
          <div className="relative w-full h-full">

            {/* ── Layer 1: Space + Mobile (base) ── */}
            <motion.div
              className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-3"
              style={{ scale: layer1Scale, zIndex: 10, transformOrigin: "top center" }}
            >
              {layer1.map((p) => <Card key={p.title} {...p} />)}
            </motion.div>

            {/* ── Layer 2: Reality + Ecology (slides up over layer 1) ── */}
            <motion.div
              className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-3"
              style={{ y: layer2Y, zIndex: 20 }}
            >
              {layer2.map((p) => <Card key={p.title} {...p} />)}
            </motion.div>

          </div>
        </div>
      </div>

      {/* ALL PROJECTS button */}
      <div className="px-4 md:px-8 pb-20 pt-10">
        <Link
          href="#"
          className="inline-flex items-center gap-3 bg-white text-black text-sm font-black tracking-widest uppercase px-8 py-4 rounded-full hover:bg-white/90 transition-colors"
        >
          ALL PROJECTS
          <span className="text-base font-black">+</span>
        </Link>
      </div>
    </section>
  );
}
