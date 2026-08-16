"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const line1 = ["ready", "to", "enhanccee"];
const line2 = ["your", "brand"];

function RevealWord({ word, delay }: { word: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <div ref={ref} style={{ overflow: "hidden", display: "inline-block" }}>
      <motion.span
        initial={{ y: "105%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : { y: "105%", opacity: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ display: "inline-block" }}
      >
        {word}
      </motion.span>
    </div>
  );
}

export default function CTA() {
  return (
    <section
      className="relative bg-[#f0f0f0]"
      style={{ marginTop: "-40px", zIndex: 8, paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="px-4 md:px-8 flex flex-col items-start justify-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-black/35 text-xs uppercase tracking-[0.3em] mb-8 font-medium"
        >
          ✦ Let&apos;s work together
        </motion.p>

        {/* Line 1 */}
        <div
          className="font-black leading-none uppercase"
          style={{
            fontFamily: "var(--font-barlow-condensed), Arial Narrow, Arial, sans-serif",
            fontSize: "clamp(52px, 11vw, 160px)",
            letterSpacing: "-0.02em",
            display: "flex",
            gap: "0.22em",
            flexWrap: "wrap",
            color: "#0d0d0d",
          }}
        >
          {line1.map((word, i) => (
            <RevealWord key={word} word={word} delay={i * 0.1} />
          ))}
        </div>

        {/* Line 2 */}
        <div
          className="font-black leading-none uppercase"
          style={{
            fontFamily: "var(--font-barlow-condensed), Arial Narrow, Arial, sans-serif",
            fontSize: "clamp(52px, 11vw, 160px)",
            letterSpacing: "-0.02em",
            display: "flex",
            gap: "0.22em",
            flexWrap: "wrap",
            marginTop: "-0.05em",
            color: "#0d0d0d",
          }}
        >
          {line2.map((word, i) => (
            <RevealWord key={word} word={word} delay={0.3 + i * 0.1} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-12"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#0d0d0d] text-white text-sm font-black tracking-widest uppercase px-10 py-5 rounded-full hover:bg-black transition-colors"
          >
            START A PROJECT
            <span className="text-base">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
