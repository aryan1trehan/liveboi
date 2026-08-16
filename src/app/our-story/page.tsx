import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata = { title: "Our Story — Enhanccee" };

export default function OurStory() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0d0d0d] text-white pt-28 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-6">02 — About Us</p>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-12">
            Our<br />
            <span className="italic font-light">Story</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-12 text-white/60 text-base leading-relaxed">
            <div>
              <p className="mb-6">
                Enhanccee was founded with one belief: that great design is not decoration — it's strategy made visible. We started as a small team of designers and thinkers who were tired of branding that looked beautiful but said nothing.
              </p>
              <p>
                From our first client to our thousandth, that principle has never changed. Every brand we build is rooted in a clear understanding of who our client is, who their audience is, and what gap exists between the two.
              </p>
            </div>
            <div>
              <p className="mb-6">
                We combine brand strategy, visual identity, and digital experience design into one cohesive practice. No siloes, no handoffs — just one team that thinks across the whole picture.
              </p>
              <p>
                Today, Enhanccee works with brands across industries worldwide. We remain small by choice, ambitious by nature, and unusually obsessed with craft.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-white/90 transition-colors"
            >
              Work With Us ↗
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
