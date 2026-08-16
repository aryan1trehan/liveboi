"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";

// Split into lines so each line rises independently
const lines = [
  ["WE", "DESIGN", "DIGITAL", "EXPERIENCES"],
  ["THAT", "EMPOWER", "▌▌▌▌▌▌▌▌▌", "BRANDS", "TO"],
  ["STAND", "OUT", "AND", "ENGAGE", "THEIR"],
  ["AUDIENCES™."],
];

// Flatten to words with their line index for scroll offset calc
const allWords: { word: string; line: number; idx: number }[] = [];
let globalIdx = 0;
lines.forEach((line, li) => {
  line.forEach((word) => {
    allWords.push({ word, line: li, idx: globalIdx });
    globalIdx++;
  });
});
const totalWords = allWords.length;

function Word({
  word,
  progress,
  globalIdx,
  totalWords,
}: {
  word: string;
  progress: MotionValue<number>;
  globalIdx: number;
  totalWords: number;
}) {
  const start = (globalIdx / totalWords) * 0.9;
  const end = start + 0.12;

  const color = useTransform(
    progress,
    [Math.max(0, start - 0.05), end],
    ["#cccccc", "#111111"]
  );

  const isBarcode = word === "▌▌▌▌▌▌▌▌▌";

  return (
    <motion.span
      style={{ color }}
      className={`inline-block ${isBarcode ? "tracking-[-0.12em] opacity-80 text-[0.65em] align-middle mx-1" : "mr-[0.15em]"}`}
    >
      {word}
      {!isBarcode && " "}
    </motion.span>
  );
}

function Line({
  words,
  lineIdx,
  progress,
  startProgress,
}: {
  words: { word: string; line: number; idx: number }[];
  lineIdx: number;
  progress: MotionValue<number>;
  startProgress: number;
}) {
  // Rise: each line starts 80px below and rises to 0, synced with scroll
  const y = useTransform(
    progress,
    [Math.max(0, startProgress - 0.05), startProgress + 0.18],
    [80, 0]
  );
  const opacity = useTransform(
    progress,
    [Math.max(0, startProgress - 0.02), startProgress + 0.1],
    [0, 1]
  );

  return (
    <div className="overflow-hidden">
      <motion.div style={{ y, opacity }}>
        {words.map((w) => (
          <Word
            key={`${lineIdx}-${w.word}-${w.idx}`}
            word={w.word}
            progress={progress}
            globalIdx={w.idx}
            totalWords={totalWords}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function Mission() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.3"],
  });

  return (
    <section
      ref={containerRef}
      className="bg-[#f0f0f0] py-20 md:py-32 px-6 md:px-10"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Top label row */}
        <div className="flex items-center gap-3 mb-10 md:mb-14">
          <span className="text-black/40 text-base">✦</span>
          <p className="text-[11px] tracking-[0.28em] text-black/35 uppercase font-medium">
            Driven by Design — Drive
          </p>
        </div>

        {/* Two-column layout: empty left gutter + main content */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-8 md:gap-0">
          {/* Left spacer — matches the original's empty left column */}
          <div />

          {/* Right: headline + body + CTAs */}
          <div>
            {/* Scroll-rise + fill headline */}
            <h2
              className="mb-10 md:mb-12 leading-[1.0]"
              style={{
                fontFamily: "var(--font-barlow-condensed), Arial Narrow, Arial, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(40px, 7.5vw, 100px)",
                letterSpacing: "-0.01em",
              }}
            >
              {lines.map((lineWords, li) => {
                const lineStart = (allWords.findIndex((w) => w.line === li) / totalWords) * 0.75;
                const wordsForLine = allWords.filter((w) => w.line === li);
                return (
                  <Line
                    key={li}
                    words={wordsForLine}
                    lineIdx={li}
                    progress={scrollYProgress}
                    startProgress={lineStart}
                  />
                );
              })}
            </h2>

            {/* Body copy */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="text-black/60 text-[15px] leading-relaxed max-w-[380px] mb-10"
            >
              By combining strategy, design, and technology, we transform ideas
              into meaningful digital experiences. Our work blends imagination
              with precision to create bold outcomes that drive growth.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-6 flex-wrap"
            >
              <Link
                href="/our-story"
                className="flex items-center gap-2 bg-black text-white text-[13px] font-bold px-7 py-3.5 rounded-full hover:bg-black/80 transition-colors tracking-wide uppercase"
              >
                Our Story
                <span className="text-base font-black">+</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-1.5 text-[13px] font-bold text-black hover:text-black/50 transition-colors tracking-widest uppercase"
              >
                Contact Us
                <span className="text-base">↗</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
