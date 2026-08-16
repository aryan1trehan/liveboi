"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "HOME",     href: "/",         num: "01" },
  { label: "SERVICES", href: "/services", num: "02" },
  { label: "PROJECTS", href: "/projects",  num: "03" },
  { label: "CONTACT",  href: "/contact",  num: "04" },
];

const topLinks = [
  { label: "HOME",     href: "/" },
  { label: "SERVICES", href: "/services" },
  { label: "PROJECTS", href: "/projects" },
  { label: "CONTACT",  href: "/contact" },
];

// Per-letter wheel flip
function FlipLink({
  label,
  href,
  onClick,
  delay = 0,
}: {
  label: string;
  href: string;
  onClick?: () => void;
  delay?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const letters = label.split("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        href={href}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-baseline gap-4 group"
        style={{ textDecoration: "none" }}
      >
        <div
          className="font-black uppercase leading-none flex"
          style={{
            fontFamily: "var(--font-barlow-condensed), Arial Narrow, Arial, sans-serif",
            fontSize: "clamp(44px, 5vw, 80px)",
            letterSpacing: "-0.02em",
            color: "#0d0d0d",
          }}
        >
          {letters.map((char, i) => (
            <span key={i} style={{ display: "inline-block", perspective: "300px" }}>
              <span
                style={{
                  display: "block",
                  overflow: "hidden",
                  height: "0.88em",
                  position: "relative",
                }}
              >
                {/* Front */}
                <motion.span
                  animate={{
                    y: hovered ? "-100%" : "0%",
                    rotateX: hovered ? -55 : 0,
                  }}
                  transition={{
                    duration: 0.38,
                    delay: hovered ? i * 0.03 : (letters.length - 1 - i) * 0.02,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{
                    display: "block",
                    transformOrigin: "center bottom",
                    backfaceVisibility: "hidden",
                    color: "#0d0d0d",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
                {/* Back */}
                <motion.span
                  animate={{
                    y: hovered ? "0%" : "100%",
                    rotateX: hovered ? 0 : 55,
                  }}
                  transition={{
                    duration: 0.38,
                    delay: hovered ? i * 0.03 : (letters.length - 1 - i) * 0.02,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    transformOrigin: "center top",
                    backfaceVisibility: "hidden",
                    color: "#0d0d0d",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              </span>
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}

// Top-bar nav link with wheel flip
function NavLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="px-5 py-3 rounded-full text-[11px] font-bold tracking-[0.15em]"
      style={{ background: "rgba(255,255,255,0.07)", display: "inline-block" }}
    >
      <span style={{ display: "block", perspective: "400px" }}>
        <span style={{ display: "block", overflow: "hidden", height: "1.15em", position: "relative" }}>
          <motion.span
            animate={{ y: hovered ? "-100%" : "0%", rotateX: hovered ? -55 : 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{
              display: "block",
              transformOrigin: "center bottom",
              backfaceVisibility: "hidden",
              color: "rgba(255,255,255,0.7)",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </motion.span>
          <motion.span
            animate={{ y: hovered ? "0%" : "100%", rotateX: hovered ? 0 : 55 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{
              display: "block",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transformOrigin: "center top",
              backfaceVisibility: "hidden",
              color: "rgba(255,255,255,1)",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </motion.span>
        </span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-3 pt-3">
        <div
          className="flex items-center justify-between h-[80px] px-6"
          style={{
            background: "#0E0E0E",
            borderRadius: "100px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/"
              className="text-white font-black text-[13px] tracking-widest uppercase px-3 py-1.5"
              style={{
                border: "1.5px solid rgba(255,255,255,0.5)",
                borderRadius: "6px",
                lineHeight: 1,
              }}
            >
              ENHANCCEE ®
            </Link>
            <span className="hidden sm:block text-white/35 text-[10px] tracking-[0.28em] uppercase font-medium">
              Branding Studio
            </span>
          </div>

          {/* Top nav links */}
          <nav className="hidden md:flex items-center gap-1.5 ml-auto mr-4">
            {topLinks.map((link) => (
              <NavLink key={link.label} label={link.label} href={link.href} />
            ))}
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors"
            style={{
              background: open ? "#fff" : "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            {open ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2L12 12M12 2L2 12" stroke="#0d0d0d" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <line x1="0" y1="1"  x2="16" y2="1"  stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="0" y1="6"  x2="16" y2="6"  stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="0" y1="11" x2="16" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* ── Fullscreen menu overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed z-40 flex flex-col"
            style={{
              top: "96px",
              right: "12px",
              width: "clamp(300px, 42vw, 580px)",
              maxHeight: "calc(100vh - 108px)",
              background: "#f5f5f5",
              borderRadius: "24px",
              boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
              transformOrigin: "top right",
              overflow: "hidden",
            }}
          >
            {/* Links */}
            <div className="flex-1 flex flex-col justify-center overflow-hidden" style={{ padding: "28px 32px 16px" }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.06 + 0.1, duration: 0.3 }}
                  className="flex items-start justify-between"
                  style={{
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    paddingBottom: "6px",
                    paddingTop: "6px",
                  }}
                >
                  <FlipLink
                    label={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    delay={i * 0.06}
                  />
                  <span className="text-[11px] font-mono text-black/25 pt-2 pl-2 shrink-0">
                    ({link.num})
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="px-8 pb-8"
            >
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-3 w-full py-5 rounded-full text-white font-black tracking-[0.2em] uppercase text-sm"
                style={{ background: "#0d0d0d" }}
              >
                GET IN TOUCH
                <span className="text-base">+</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
