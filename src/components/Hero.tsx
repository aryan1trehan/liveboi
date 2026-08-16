"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

const services = ["BRAND STRATEGY", "VISUAL IDENTITY", "WEBSITE DESIGN", "BRAND CONSULTING"];

// 3 placeholder image styles cycling — swap for real <img> srcs when available
const IMG_STYLES = [
  {
    background: "linear-gradient(160deg, #d9b89c 0%, #b07355 50%, #7a4a35 100%)",
    label: "Floral portrait",
  },
  {
    background: "linear-gradient(160deg, #9eaab8 0%, #6a7a8a 50%, #3a4a5a 100%)",
    label: "Studio portrait",
  },
  {
    background: "linear-gradient(160deg, #c8bda8 0%, #a09080 50%, #706050 100%)",
    label: "Object study",
  },
];

interface CursorCard {
  id: number;
  x: number;
  y: number;
  imgIdx: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
}

export default function Hero() {
  // ── Services ticker ──────────────────────────────────────────────
  const [serviceIdx, setServiceIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setServiceIdx((i) => (i + 1) % services.length), 2000);
    return () => clearInterval(t);
  }, []);

  // ── Cursor image cards ────────────────────────────────────────────
  const [cards, setCards] = useState<CursorCard[]>([]);
  const cardIdRef = useRef(0);
  const imgIdxRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastSpawnRef.current < 120) return; // throttle
    lastSpawnRef.current = now;

    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const imgIdx = imgIdxRef.current % 3;
    imgIdxRef.current++;

    const id = cardIdRef.current++;
    const rotation = (Math.random() - 0.5) * 18;
    const offsetX = (Math.random() - 0.5) * 60;
    const offsetY = (Math.random() - 0.5) * 60;

    setCards((prev) => [...prev.slice(-6), { id, x, y, imgIdx, rotation, offsetX, offsetY }]);

    // Remove card after 1.2s
    setTimeout(() => {
      setCards((prev) => prev.filter((c) => c.id !== id));
    }, 1200);
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col overflow-hidden bg-[#080808] cursor-none"
      style={{ minHeight: "calc(100vh - 12px)", borderRadius: "20px" }}
    >
      {/* ── Angular moving background ──────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Panel 1 — large left slab */}
        <div className="hero-panel hero-panel-1" />
        {/* Panel 2 — right tall slab */}
        <div className="hero-panel hero-panel-2" />
        {/* Panel 3 — center wedge */}
        <div className="hero-panel hero-panel-3" />
        {/* Panel 4 — top-right corner accent */}
        <div className="hero-panel hero-panel-4" />
        {/* Panel 5 — bottom slab */}
        <div className="hero-panel hero-panel-5" />
        {/* Subtle edge vignette to blend panels */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 110% 80% at 50% 50%, transparent 30%, rgba(8,8,8,0.7) 80%)",
          }}
        />
      </div>

      {/* ── Radial vignette ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 20%, rgba(8,8,8,0.55) 70%, rgba(8,8,8,0.95) 100%)",
        }}
      />

      {/* ── Cursor image cards ───────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute w-[140px] h-[190px] rounded-xl overflow-hidden shadow-2xl shadow-black/60"
              style={{
                left: card.x + card.offsetX - 70,
                top: card.y + card.offsetY - 95,
                rotate: card.rotation,
                background: IMG_STYLES[card.imgIdx].background,
              }}
            >
              {/* Inner texture */}
              <div className="absolute inset-0 bg-white/5" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── ® badge ─────────────────────────────────────────────── */}
      <div className="absolute left-1/2 top-[28%] -translate-x-1/2 z-20 pointer-events-none">
        <span className="text-white/35 text-2xl font-light select-none">®</span>
      </div>

      {/* ── Main ENHANCCEE wordmark ──────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-black leading-none text-white uppercase select-none whitespace-nowrap"
          style={{
            fontSize: "clamp(60px, 13.5vw, 180px)",
            letterSpacing: "-0.02em",
          }}
        >
          ENHANCCEE
        </motion.h1>
      </div>

      {/* ── Bottom overlay: subtitle + services ticker ───────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-40 pb-8 flex items-end">
        {/* Left: social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col gap-3 px-6"
        >
          {["IG", "in", "Be"].map((s) => (
            <Link
              key={s}
              href="#"
              className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center text-[10px] font-bold text-white/50 hover:border-white/50 hover:text-white/80 transition-all"
            >
              {s}
            </Link>
          ))}
        </motion.div>

        {/* Center: subtitle + service ticker */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-white/55 text-sm tracking-widest text-center"
          >
            Designing Your Digital World
          </motion.p>

          {/* Services one-at-a-time vertical ticker */}
          <div className="h-6 overflow-hidden relative w-64 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={serviceIdx}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute text-xs tracking-[0.35em] text-white/40 uppercase font-medium"
              >
                {services[serviceIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Right: dribbble + extra icon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col gap-3 px-6"
        >
          {["Dr", "◎"].map((s) => (
            <Link
              key={s}
              href="#"
              className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center text-[10px] font-bold text-white/50 hover:border-white/50 hover:text-white/80 transition-all"
            >
              {s}
            </Link>
          ))}
        </motion.div>
      </div>

      <style>{`
        .hero-panel {
          position: absolute;
          will-change: transform;
        }
        /* Large left angular slab */
        .hero-panel-1 {
          width: 55%;
          height: 140%;
          top: -20%;
          left: -10%;
          background: linear-gradient(160deg, #1e1e1e 0%, #141414 50%, #222 100%);
          transform: rotate(-12deg);
          animation: panel-drift-1 8s ease-in-out infinite alternate;
          box-shadow: inset -2px 0 0 rgba(255,255,255,0.07), 2px 0 20px rgba(0,0,0,0.8);
        }
        /* Right tall slab */
        .hero-panel-2 {
          width: 45%;
          height: 130%;
          top: -15%;
          right: -5%;
          background: linear-gradient(200deg, #1a1a1a 0%, #202020 50%, #181818 100%);
          transform: rotate(-8deg);
          animation: panel-drift-2 11s ease-in-out infinite alternate;
          box-shadow: inset 2px 0 0 rgba(255,255,255,0.06), -2px 0 20px rgba(0,0,0,0.8);
        }
        /* Center wedge */
        .hero-panel-3 {
          width: 30%;
          height: 120%;
          top: -10%;
          left: 35%;
          background: linear-gradient(180deg, #161616 0%, #1c1c1c 100%);
          transform: rotate(-15deg);
          animation: panel-drift-3 13s ease-in-out infinite alternate;
          box-shadow: 0 0 30px rgba(0,0,0,0.9);
        }
        /* Top-right accent */
        .hero-panel-4 {
          width: 28%;
          height: 65%;
          top: -5%;
          right: 12%;
          background: linear-gradient(145deg, #242424 0%, #181818 60%, #111 100%);
          transform: rotate(-20deg);
          animation: panel-drift-4 9s ease-in-out infinite alternate;
          box-shadow: inset 0 -2px 0 rgba(255,255,255,0.08), 0 4px 30px rgba(0,0,0,0.7);
        }
        /* Bottom accent slab */
        .hero-panel-5 {
          width: 70%;
          height: 55%;
          bottom: -15%;
          left: 20%;
          background: linear-gradient(120deg, #1a1a1a 0%, #141414 100%);
          transform: rotate(-6deg);
          animation: panel-drift-5 12s ease-in-out infinite alternate;
          box-shadow: 0 -4px 30px rgba(0,0,0,0.8);
        }
        @keyframes panel-drift-1 {
          0%   { transform: rotate(-12deg) translate(0px, 0px) scale(1); }
          100% { transform: rotate(-9deg) translate(80px, -55px) scale(1.09); }
        }
        @keyframes panel-drift-2 {
          0%   { transform: rotate(-8deg) translate(0px, 0px) scale(1); }
          100% { transform: rotate(-12deg) translate(-70px, 60px) scale(1.07); }
        }
        @keyframes panel-drift-3 {
          0%   { transform: rotate(-15deg) translate(0px, 0px) scale(1); }
          100% { transform: rotate(-12deg) translate(60px, 70px) scale(1.1); }
        }
        @keyframes panel-drift-4 {
          0%   { transform: rotate(-20deg) translate(0px, 0px) scale(1); }
          100% { transform: rotate(-24deg) translate(-55px, -65px) scale(1.08); }
        }
        @keyframes panel-drift-5 {
          0%   { transform: rotate(-6deg) translate(0px, 0px) scale(1); }
          100% { transform: rotate(-3deg) translate(85px, 40px) scale(1.06); }
        }
      `}</style>
    </section>
  );
}
