"use client";
import { motion, AnimatePresence, useSpring, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";

const services = [
  {
    num: "01",
    title: "SEO",
    desc: "Ranking your business at the top of search results to drive organic traffic and long-term growth.",
    imgBg: "linear-gradient(135deg, #0f3460 0%, #1a5276 50%, #117a8b 100%)",
  },
  {
    num: "02",
    title: "Meta Ads",
    desc: "Data-driven paid campaigns on Facebook and Instagram that convert audiences into paying customers.",
    imgBg: "linear-gradient(135deg, #4a1272 0%, #7d3c98 50%, #9b59b6 100%)",
  },
  {
    num: "03",
    title: "Social Media",
    desc: "Building a consistent brand presence that engages and grows your community across every platform.",
    imgBg: "linear-gradient(135deg, #7b241c 0%, #c0392b 50%, #e74c3c 100%)",
  },
  {
    num: "04",
    title: "Web Dev",
    desc: "Fast, beautiful websites built to perform — from sleek landing pages to full e-commerce experiences.",
    imgBg: "linear-gradient(135deg, #1a5632 0%, #27ae60 50%, #2ecc71 100%)",
  },
  {
    num: "05",
    title: "Branding",
    desc: "Crafting a distinctive identity that captures who you are and resonates deeply with your audience.",
    imgBg: "linear-gradient(135deg, #6e2f0a 0%, #d68910 50%, #f39c12 100%)",
  },
  {
    num: "06",
    title: "UI/UX Design",
    desc: "Designing intuitive digital experiences that delight users and drive meaningful engagement.",
    imgBg: "linear-gradient(135deg, #1a3a5c 0%, #2471a3 50%, #3498db 100%)",
  },
];

function ServiceRow({ s, i }: { s: (typeof services)[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  // Spring-smoothed cursor position for the floating image
  const imgX = useSpring(0, { stiffness: 220, damping: 28 });
  const imgY = useSpring(0, { stiffness: 220, damping: 28 });
  // 3D tilt springs
  const rotX = useSpring(0, { stiffness: 130, damping: 18 });
  const rotY = useSpring(0, { stiffness: 130, damping: 18 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = rowRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Clamp image X so its center never goes past the right edge of the name column
      // Name column spans from ~18% to ~56% of total row width
      const nameBoundary = rect.left + rect.width * 0.56;
      imgX.set(Math.min(e.clientX, nameBoundary));
      imgY.set(e.clientY);

      // Tilt calculated relative to the name column center
      const cx = rect.width * 0.22;
      const cy = rect.height / 2;
      rotX.set(((y - cy) / Math.max(cy, 1)) * -8);
      rotY.set(((x - cx) / Math.max(cx, 1)) * 10);
    },
    [imgX, imgY, rotX, rotY]
  );

  return (
    <>
      {/*
        The row gets position:relative + z-index:30 which creates a stacking context.
        The floating image has z-index:20 (below 30), so the row's text always
        paints on top of the image — keeping letters readable.
      */}
      <motion.div
        ref={rowRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          rotX.set(0);
          rotY.set(0);
        }}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, y: 52 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="grid items-center py-10 gap-6 cursor-pointer border-b border-white/[0.08]"
        style={{
          gridTemplateColumns: "0.18fr 1fr 1fr",
          position: "relative",
          zIndex: 30,
        }}
      >
        {/* Number — faster fade-in, slightly ahead of the row */}
        <motion.span
          className="text-sm text-white/25 font-mono self-start pt-4 tabular-nums"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: i * 0.12 + 0.05, ease: "easeOut" }}
        >
          ({s.num})
        </motion.span>

        {/* Service name — per-letter wheel flip on hover */}
        <div
          className="flex"
          style={{
            fontFamily: "var(--font-barlow-condensed), Arial Narrow, Arial, sans-serif",
            fontSize: "clamp(52px, 8.5vw, 130px)",
            letterSpacing: "-0.02em",
            fontWeight: 900,
            lineHeight: 1,
            userSelect: "none",
            textTransform: "uppercase",
          }}
        >
          {s.title.split("").map((char, li) => (
            <span key={li} style={{ display: "inline-block", perspective: "400px" }}>
              <span style={{ display: "block", overflow: "hidden", height: "0.88em", position: "relative" }}>
                {/* Front */}
                <motion.span
                  animate={{ y: hovered ? "-100%" : "0%", rotateX: hovered ? -55 : 0 }}
                  transition={{
                    duration: 0.4,
                    delay: hovered ? li * 0.035 : (s.title.length - 1 - li) * 0.025,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{
                    display: "block",
                    transformOrigin: "center bottom",
                    backfaceVisibility: "hidden",
                    color: "rgba(255,255,255,0.52)",
                  }}
                >
                  {char === "/" ? "/" : char}
                </motion.span>
                {/* Back */}
                <motion.span
                  animate={{ y: hovered ? "0%" : "100%", rotateX: hovered ? 0 : 55 }}
                  transition={{
                    duration: 0.4,
                    delay: hovered ? li * 0.035 : (s.title.length - 1 - li) * 0.025,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    transformOrigin: "center top",
                    backfaceVisibility: "hidden",
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  {char === "/" ? "/" : char}
                </motion.span>
              </span>
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-white/35 text-sm leading-relaxed max-w-[280px] justify-self-end">
          {s.desc}
        </p>
      </motion.div>

      {/* Floating image — z-index 20 so it paints BELOW the row's text (z-index 30) */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key={`img-${s.num}`}
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.72 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "fixed",
              left: imgX,
              top: imgY,
              x: "-50%",
              y: "-50%",
              width: "260px",
              height: "260px",
              zIndex: 20,
              pointerEvents: "none",
              rotateX: rotX,
              rotateY: rotY,
              transformPerspective: 900,
            }}
          >
            <div
              className="w-full h-full rounded-2xl overflow-hidden"
              style={{
                background: s.imgBg,
                boxShadow:
                  "0 28px 56px rgba(0,0,0,0.65), 0 8px 20px rgba(0,0,0,0.35)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const headingStyle = {
  fontFamily: "var(--font-barlow-condensed), Arial Narrow, Arial, sans-serif",
  fontWeight: 900,
  fontSize: "clamp(72px, 18vw, 220px)" as const,
  letterSpacing: "-0.02em",
  lineHeight: 1,
};

function ServicesHeading() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <div ref={ref} className="px-4 md:px-8 mb-16">
      {/* CREATIVE */}
      <div className="flex leading-none mb-0" style={headingStyle}>
        {"CREATIVE".split("").map((letter, i) => (
          <div key={i} style={{ overflow: "hidden", display: "inline-block", lineHeight: 1 }}>
            <motion.span
              initial={{ y: "105%" }}
              animate={inView ? { y: "0%" } : { y: "105%" }}
              transition={{ duration: 0.75, delay: i * 0.055, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ display: "inline-block", color: "#ffffff" }}
            >
              {letter}
            </motion.span>
          </div>
        ))}
      </div>

      {/* SOLUTIONS ghost */}
      <div className="flex leading-none -mt-3 md:-mt-5" style={headingStyle}>
        {"SOLUTIONS".split("").map((letter, i) => (
          <div key={i} style={{ overflow: "hidden", display: "inline-block", lineHeight: 1 }}>
            <motion.span
              initial={{ y: "105%" }}
              animate={inView ? { y: "0%" } : { y: "105%" }}
              transition={{ duration: 0.75, delay: 0.18 + i * 0.055, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ display: "inline-block", color: "rgba(255,255,255,0.12)" }}
            >
              {letter}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="enh-glow relative bg-[#0d0d0d] text-white"
      style={{ borderRadius: "40px", marginTop: "-40px", zIndex: 10 }}
    >
      <div className="pt-16 pb-24">

        {/* Marquee */}
        <div className="overflow-hidden py-4 mb-6">
          <div
            className="animate-marquee flex whitespace-nowrap"
            style={{ width: "200%" }}
          >
            {Array(16)
              .fill(null)
              .map((_, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-white/25 pr-8"
                >
                  <span className="text-white/15">✦</span>
                  OUR SERVICES — OUR SERVICES
                </span>
              ))}
          </div>
        </div>

        {/* CREATIVE + SOLUTIONS — letter-by-letter clip reveal */}
        <ServicesHeading />

        {/* Service rows */}
        <div className="px-4 md:px-8 border-t border-white/[0.08]">
          {services.map((s, i) => (
            <ServiceRow key={s.num} s={s} i={i} />
          ))}
        </div>

        {/* ALL SERVICES button */}
        <div className="px-4 md:px-8 pt-12">
          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-white text-black text-sm font-black tracking-widest uppercase px-8 py-4 rounded-full hover:bg-white/90 transition-colors"
          >
            ALL SERVICES
            <span className="text-base font-black">+</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
