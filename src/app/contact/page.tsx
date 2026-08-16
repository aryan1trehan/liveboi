"use client";
import Navbar from "@/components/Navbar";

export default function Contact() {
  return (
    <>
      <Navbar />
      <main
        className="relative min-h-screen bg-[#080808] text-white flex items-center justify-center overflow-hidden"
        style={{ paddingTop: "96px", paddingBottom: "48px" }}
      >
        {/* Scrolling marquee background */}
        <div className="absolute inset-0 flex flex-col justify-center gap-0 pointer-events-none select-none overflow-hidden">
          {[0, 1, 2, 3].map((row) => (
            <div key={row} className="overflow-hidden py-2">
              <div
                className="flex whitespace-nowrap"
                style={{
                  animation: `marquee-contact ${row % 2 === 0 ? "18s" : "22s"} linear infinite ${row % 2 !== 0 ? "reverse" : ""}`,
                  width: "200%",
                }}
              >
                {Array(6).fill(null).map((_, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-6 pr-12 font-black uppercase"
                    style={{
                      fontSize: "clamp(60px, 10vw, 130px)",
                      letterSpacing: "-0.02em",
                      fontFamily: "var(--font-barlow-condensed), Arial Narrow, Arial, sans-serif",
                      color: "rgba(255,255,255,0.06)",
                    }}
                  >
                    <span style={{ color: "rgba(255,255,255,0.04)" }}>—</span>
                    GET IN TOUCH
                    <span style={{ color: "rgba(255,255,255,0.04)" }}>—</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div
          className="relative z-10 w-full max-w-[420px] mx-4 rounded-2xl p-8"
          style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6 text-center">
            Start the conversation today
          </p>

          <form className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
                Name
              </label>
              <input
                type="text"
                className="w-full rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-all"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
                Email Address
              </label>
              <input
                type="email"
                className="w-full rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-all"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
                Subject
              </label>
              <input
                type="text"
                className="w-full rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-all"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-all resize-none"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl py-4 text-[11px] font-black tracking-[0.25em] uppercase text-black transition-all hover:opacity-90 active:scale-[0.98] mt-1"
              style={{ background: "#ffffff" }}
            >
              Send Message
            </button>
          </form>
        </div>

        <style>{`
          @keyframes marquee-contact {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </main>
    </>
  );
}
