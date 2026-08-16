"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  { title: "Space", category: "Design", year: "2024", color: "#1a1a2e" },
  { title: "Mobile", category: "Identity", year: "2024", color: "#1a1a1a" },
  { title: "Reality", category: "Strategy", year: "2023", color: "#0d1a0d" },
  { title: "Ecology", category: "Rebranding", year: "2023", color: "#1a0d0d" },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/30 mb-3">03 — Selected Work</p>
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              Our<br />
              <span className="italic font-light">Projects</span>
            </h2>
          </div>
          <Link href="#" className="hidden md:flex border border-white/20 text-sm px-5 py-2.5 rounded-full hover:border-white/50 transition-colors">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
              style={{ background: p.color }}
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs border border-white/20 rounded-full px-3 py-1 text-white/60">
                    {p.category}
                  </span>
                  <span className="text-xs text-white/30">{p.year}</span>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                    <span className="text-white/60 text-xl">→</span>
                  </div>
                  <h3 className="text-3xl font-black">{p.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
