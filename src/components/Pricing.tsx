"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const features = [
  "Custom Web Design",
  "Identity Development",
  "SEO Optimization",
  "Social Media Strategy",
  "Content Creation",
  "Ongoing Support",
];

const highlights = [
  { val: "4.9/5", label: "Client Rating" },
  { val: "1K+", label: "Companies Helped" },
  { val: "7-Day", label: "Satisfaction Guarantee" },
];

const benefits = [
  { title: "Time Savings", desc: "We handle everything so you can focus on growing your business." },
  { title: "Expert Access", desc: "Direct line to senior strategists and designers throughout." },
  { title: "Scalable Solutions", desc: "Built to grow with your brand from day one." },
];

export default function Pricing() {
  return (
    <section className="py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-white/30 mb-3">All-In Package</p>
          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            Brand<br />
            <span className="italic font-light">Suite</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Pricing Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#111] border border-white/10 rounded-2xl p-8"
          >
            <div className="flex items-end gap-2 mb-2">
              <span className="text-5xl font-black">$4,999</span>
              <span className="text-white/40 text-sm mb-1">/project</span>
            </div>
            <p className="text-white/40 text-sm mb-8">Timeline: 1–2 weeks</p>

            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="#contact"
              className="block text-center bg-white text-black text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
            >
              Get Started
            </Link>
          </motion.div>

          {/* Right side */}
          <div className="flex flex-col gap-6">
            {/* Highlights */}
            <div className="grid grid-cols-3 gap-4">
              {highlights.map((h) => (
                <div key={h.val} className="bg-[#111] border border-white/10 rounded-xl p-4 text-center">
                  <p className="text-2xl font-black mb-1">{h.val}</p>
                  <p className="text-white/40 text-xs">{h.label}</p>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#111] border border-white/10 rounded-xl p-5"
                >
                  <h4 className="font-semibold mb-1">{b.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
