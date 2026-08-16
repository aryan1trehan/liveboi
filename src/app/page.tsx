import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Mission from "@/components/Mission";
import Portfolio from "@/components/Portfolio";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0d0d0d]">
      <Navbar />
      {/* White frame around hero card */}
      <div style={{ background: "#fff", padding: "12px 12px 0 12px" }}>
        <Hero />
      </div>
      <Partners />
      <Mission />
      <Portfolio />
      <Stats />
      <Services />
      <Testimonials />
      <FAQ />
      {/* White section curves UP under the black FAQ, making black appear curved at bottom */}
      <div style={{ background: "#f0f0f0", borderRadius: "40px 40px 0 0", marginTop: "-40px", position: "relative", zIndex: 10 }}>
        <Footer />
      </div>
    </main>
  );
}
