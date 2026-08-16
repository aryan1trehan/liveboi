export default function MarqueeBar({ text = "Designing Your Digital World", reverse = false }: { text?: string; reverse?: boolean }) {
  const items = Array(8).fill(text);
  const cls = reverse ? "animate-marquee-reverse" : "animate-marquee";

  return (
    <div className="border-y border-white/10 py-3 overflow-hidden bg-[#111]">
      <div className={`flex whitespace-nowrap gap-0 ${cls}`} style={{ width: "200%" }}>
        {[...items, ...items].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/30 pr-8">
            <span className="text-white/20">✦</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
