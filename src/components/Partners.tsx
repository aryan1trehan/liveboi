"use client";
import { useEffect, useState } from "react";

// 8 front logos + 8 back logos as inline SVG paths
const frontLogos = [
  // Logoipsum University
  <svg key="f1" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="10" width="28" height="28" rx="2" stroke="#111" strokeWidth="2.5" fill="none"/>
    <path d="M14 24 L22 16 L30 24 L22 32Z" fill="#111"/>
    <text x="44" y="26" fontFamily="Arial" fontWeight="700" fontSize="13" fill="#111">Logoipsum</text>
    <text x="44" y="40" fontFamily="Arial" fontWeight="400" fontSize="10" fill="#555">University</text>
  </svg>,
  // Logo dots
  <svg key="f2" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="30" r="12" fill="#111"/>
    <circle cx="58" cy="30" r="12" fill="#111"/>
    <circle cx="84" cy="30" r="12" fill="#111"/>
    <circle cx="110" cy="30" r="6" fill="#111"/>
    <circle cx="124" cy="24" r="4" fill="#111"/>
  </svg>,
  // QC Power XR2 Module
  <svg key="f3" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="16" width="32" height="28" rx="3" stroke="#111" strokeWidth="2.5" fill="none"/>
    <text x="13" y="34" fontFamily="Arial" fontWeight="900" fontSize="14" fill="#111">QC</text>
    <text x="48" y="26" fontFamily="Arial" fontWeight="800" fontSize="12" fill="#111">POWER</text>
    <text x="48" y="40" fontFamily="Arial" fontWeight="900" fontSize="12" fill="#111">XR2 MODULE</text>
  </svg>,
  // Hat silhouette
  <svg key="f4" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="44" rx="52" ry="8" fill="#111"/>
    <path d="M50 44 Q58 14 80 12 Q102 14 110 44Z" fill="#111"/>
  </svg>,
  // Infinity loops
  <svg key="f5" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 30 Q20 12 38 12 Q56 12 56 30 Q56 48 74 48 Q92 48 92 30 Q92 12 110 12 Q128 12 128 30 Q128 48 110 48 Q92 48 92 30 Q92 12 74 12 Q56 12 56 30 Q56 48 38 48 Q20 48 20 30Z" stroke="#111" strokeWidth="3" fill="none"/>
  </svg>,
  // Circular target
  <svg key="f6" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="80" cy="30" r="22" stroke="#111" strokeWidth="2.5" fill="none"/>
    <circle cx="80" cy="30" r="14" stroke="#111" strokeWidth="2" fill="none"/>
    <circle cx="80" cy="30" r="7" stroke="#111" strokeWidth="2" fill="none"/>
    <path d="M64 30 Q72 22 80 30 Q88 38 96 30" stroke="#111" strokeWidth="2" fill="none"/>
  </svg>,
  // Wave logo
  <svg key="f7" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 30 Q35 10 50 30 Q65 50 80 30 Q95 10 110 30 Q125 50 140 30" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M20 38 Q35 18 50 38 Q65 58 80 38 Q95 18 110 38 Q125 58 140 38" stroke="#111" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>
  </svg>,
  // Logoipsum shield variant
  <svg key="f8" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 14 L12 38 Q12 48 22 52 L26 54 Q28 54 30 52 L34 48 Q44 44 44 38 L44 14 Z" stroke="#111" strokeWidth="2.5" fill="none"/>
    <path d="M18 28 L26 20 L34 28 L26 36Z" fill="#111"/>
    <text x="52" y="28" fontFamily="Arial" fontWeight="700" fontSize="13" fill="#111">Logoipsum</text>
    <text x="52" y="44" fontFamily="Arial" fontWeight="400" fontSize="10" fill="#555">University</text>
  </svg>,
];

const backLogos = [
  // Arc
  <svg key="b1" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 48 Q40 12 80 12 Q120 12 120 48" stroke="#111" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    <text x="60" y="44" fontFamily="Arial" fontWeight="900" fontSize="18" fill="#111">ARC</text>
  </svg>,
  // Spiral
  <svg key="b2" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M80 30 Q80 14 94 14 Q108 14 108 30 Q108 46 80 46 Q52 46 52 22 Q52 8 80 8" stroke="#111" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
  </svg>,
  // Hexagon
  <svg key="b3" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="80,8 106,23 106,38 80,52 54,38 54,23" stroke="#111" strokeWidth="2.5" fill="none"/>
    <polygon points="80,18 96,26 96,34 80,42 64,34 64,26" fill="#111"/>
  </svg>,
  // Double ring
  <svg key="b4" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="70" cy="30" r="20" stroke="#111" strokeWidth="2.5" fill="none"/>
    <circle cx="90" cy="30" r="20" stroke="#111" strokeWidth="2.5" fill="none"/>
  </svg>,
  // Prism
  <svg key="b5" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="80,8 118,52 42,52" stroke="#111" strokeWidth="2.5" fill="none"/>
    <line x1="80" y1="8" x2="80" y2="52" stroke="#111" strokeWidth="1.5" opacity="0.4"/>
    <line x1="80" y1="30" x2="118" y2="52" stroke="#111" strokeWidth="1.5" opacity="0.4"/>
  </svg>,
  // Orbit
  <svg key="b6" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="80" cy="30" r="8" fill="#111"/>
    <ellipse cx="80" cy="30" rx="36" ry="16" stroke="#111" strokeWidth="2" fill="none"/>
    <ellipse cx="80" cy="30" rx="36" ry="16" stroke="#111" strokeWidth="2" fill="none" transform="rotate(60 80 30)"/>
    <ellipse cx="80" cy="30" rx="36" ry="16" stroke="#111" strokeWidth="2" fill="none" transform="rotate(120 80 30)"/>
  </svg>,
  // Crown
  <svg key="b7" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 48 L30 22 L55 38 L80 10 L105 38 L130 22 L130 48 Z" stroke="#111" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
    <circle cx="30" cy="22" r="4" fill="#111"/>
    <circle cx="80" cy="10" r="4" fill="#111"/>
    <circle cx="130" cy="22" r="4" fill="#111"/>
  </svg>,
  // Cube
  <svg key="b8" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M80 8 L110 22 L110 44 L80 58 L50 44 L50 22 Z" stroke="#111" strokeWidth="2.5" fill="none"/>
    <path d="M80 8 L80 32" stroke="#111" strokeWidth="1.5" opacity="0.5"/>
    <path d="M80 32 L110 22" stroke="#111" strokeWidth="1.5" opacity="0.5"/>
    <path d="M80 32 L50 22" stroke="#111" strokeWidth="1.5" opacity="0.5"/>
  </svg>,
];

export default function Partners() {
  // flipped[i] = true means that card is showing its back face
  const [flipped, setFlipped] = useState<boolean[]>(Array(8).fill(false));

  useEffect(() => {
    let cardIdx = 0;
    const flip = () => {
      const idx = cardIdx % 8;
      setFlipped((prev) => {
        const next = [...prev];
        next[idx] = !next[idx];
        return next;
      });
      cardIdx++;
    };

    // Flip one card every 800ms, cycling through all 8
    const interval = setInterval(flip, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#f0f0f0] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <p className="text-center text-xs tracking-[0.35em] text-black/40 uppercase mb-14 font-medium">
          Global Partners:
        </p>

        {/* 4×2 grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {Array(8).fill(null).map((_, i) => (
            <div
              key={i}
              className="relative h-[130px]"
              style={{ perspective: "800px" }}
            >
              <div
                className="relative w-full h-full transition-transform duration-700 ease-in-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flipped[i] ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 bg-white rounded-2xl flex items-center justify-center px-6"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                  <div className="w-full">{frontLogos[i]}</div>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 bg-white rounded-2xl flex items-center justify-center px-6"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="w-full">{backLogos[i]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
