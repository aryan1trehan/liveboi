"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (2000 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { label: "Projects Completed", value: 350, suffix: "+" },
  { label: "Happy Clients",      value: 1000, suffix: "+" },
  { label: "Satisfaction Rate",  value: 98,  suffix: "%" },
  { label: "Years Experience",   value: 5,   suffix: "+" },
];

export default function Stats() {
  return (
    <section className="bg-[#f0f0f0] py-24" style={{ marginTop: "-40px", paddingTop: "80px" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="text-black/30 text-base">✦</span>
          <p className="text-[11px] tracking-[0.3em] text-black/35 uppercase font-medium">
            Why Choose Us — Why Choose Us
          </p>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div
                className="font-black mb-2 text-black leading-none"
                style={{ fontSize: "clamp(40px, 7vw, 80px)" }}
              >
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <p className="text-black/40 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
