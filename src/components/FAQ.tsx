"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What services do you offer?",
    a: "We offer a full spectrum of branding services including SEO, Meta Ads, Social Media Marketing, Web Development, Branding, and UI/UX Design. Our team handles everything from initial strategy to final execution.",
  },
  {
    q: "How long does a project take?",
    a: "Project timelines vary depending on scope, but most branding projects are completed within 4–6 weeks from concept to delivery.",
  },
  {
    q: "Do you work with all industries?",
    a: "Absolutely. We've worked with clients across tech, fashion, hospitality, wellness, finance, and more. Our process adapts to any industry and business size.",
  },
  {
    q: "Can you customize my package?",
    a: "Yes — every project is tailored to your specific needs and goals. We start with a discovery session to understand your brand before crafting a custom solution.",
  },
  {
    q: "How do we get started?",
    a: "Click 'Contact Us' and fill out our brief form. We'll schedule an introductory call within 24 hours to discuss your project and the best path forward.",
  },
];

function FAQItem({ faq, i, open, setOpen }: {
  faq: typeof faqs[0];
  i: number;
  open: number | null;
  setOpen: (n: number | null) => void;
}) {
  const isOpen = open === i;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="border-b border-white/10"
    >
      <button
        onClick={() => setOpen(isOpen ? null : i)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full text-left py-6 flex items-center justify-between gap-4 group"
      >
        {/* Number + question — shift toward + on hover */}
        <motion.div
          className="flex items-baseline gap-3 flex-1 min-w-0"
          animate={{ x: hovered ? 8 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          <span
            className="shrink-0 tabular-nums font-mono"
            style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}
          >
            ({String(i + 1).padStart(2, "0")})
          </span>
          <span
            className="font-medium leading-snug"
            style={{
              fontSize: "clamp(16px, 2.2vw, 22px)",
              color: isOpen ? "#fff" : "rgba(255,255,255,0.65)",
              transition: "color 0.2s ease",
            }}
          >
            <span className="text-white/30 mr-1">/</span> {faq.q}
          </span>
        </motion.div>

        {/* +/− button — slides left toward text on hover */}
        <motion.div
          animate={{
            rotate: isOpen ? 45 : 0,
            x: hovered ? -8 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "#111" }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <line x1="6.5" y1="0" x2="6.5" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="0" y1="6.5" x2="13" y2="6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </motion.div>
      </button>

      {/* Answer — expands on click */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p
              className="pb-6 leading-relaxed"
              style={{
                fontSize: "clamp(13px, 1.4vw, 15px)",
                color: "rgba(255,255,255,0.4)",
                paddingLeft: "calc(11px + 0.75rem + 1ch)",
              }}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      className="relative bg-[#0d0d0d] text-white"
      style={{ borderRadius: "40px", marginTop: "-40px", zIndex: 9 }}
    >
      <div className="pt-16 pb-24">

        {/* Marquee */}
        <div className="overflow-hidden py-4 mb-8">
          <div className="animate-marquee flex whitespace-nowrap" style={{ width: "200%" }}>
            {Array(16).fill(null).map((_, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-white/25 pr-8"
              >
                <span className="text-white/15">✦</span>
                COMMON QUESTIONS — COMMON QUESTIONS
              </span>
            ))}
          </div>
        </div>

        {/* QUICK HELP heading */}
        <div className="px-4 md:px-8 mb-14">
          <h2
            className="font-black leading-none uppercase"
            style={{
              fontFamily: "var(--font-barlow-condensed), Arial Narrow, Arial, sans-serif",
              fontSize: "clamp(64px, 14vw, 180px)",
              letterSpacing: "-0.02em",
            }}
          >
            <span className="text-white">QUICK </span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>HELP</span>
          </h2>
        </div>

        {/* Two-column layout: image left, accordion right */}
        <div className="px-4 md:px-8 grid md:grid-cols-2 gap-8 items-start">

          {/* Left — sticky image placeholder */}
          <div
            className="rounded-2xl overflow-hidden md:sticky"
            style={{
              top: "100px",
              aspectRatio: "3/4",
              background: "linear-gradient(160deg, #1a1a1a 0%, #2a2a2a 100%)",
            }}
          >
            <div className="w-full h-full flex items-end p-6">
              <p className="text-white/15 text-xs uppercase tracking-widest">Your photo here</p>
            </div>
          </div>

          {/* Right — FAQ accordion + CTA */}
          <div>
            <div className="border-t border-white/10">
              {faqs.map((faq, i) => (
                <FAQItem key={i} faq={faq} i={i} open={open} setOpen={setOpen} />
              ))}
            </div>

            {/* Ask a question button */}
            <div className="mt-8">
              <p className="text-white/35 text-sm mb-3">Any questions?</p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center w-full px-8 py-5 rounded-full text-black font-black tracking-widest uppercase text-sm"
                style={{ background: "#ffffff" }}
              >
                ASK A QUESTION
              </motion.a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
