'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const DISPLAY = "var(--font-barlow-condensed), Arial Narrow, Arial, sans-serif"
const BODY = "var(--font-geist-sans), sans-serif"

/* ─── SCROLL REVEAL ─── */
function FadeIn({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect() } }, { threshold: 0.08 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(36px)', transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .9s cubic-bezier(.16,1,.3,1) ${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

const services = [
  {
    num: '01',
    chapter: 'Acceleration',
    title: 'Performance',
    titleEm: 'Marketing',
    description: 'Capital deployed with surgical precision. Every campaign is a signal-driven system, continuously recalibrated against behavioural data — maximising return on every unit of media spend across every channel we activate.',
    disciplines: ['Google Ads', 'Meta Ads', 'Funnel Architecture', 'Creative Strategy', 'ROAS Optimisation', 'Attribution'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85&fit=crop',
    imageSide: 'right' as const,
  },
  {
    num: '02',
    chapter: 'Visibility',
    title: 'Search Engine',
    titleEm: 'Optimization',
    description: 'Visibility is permanent infrastructure. We engineer organic authority that compounds — systematic coverage of every high-intent query, technical foundations that perform, and content that positions your brand as the definitive voice in every market you choose to own.',
    disciplines: ['Technical SEO', 'Content Strategy', 'Link Authority', 'Keyword Intelligence', 'Core Web Vitals', 'Analytics'],
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=85&fit=crop',
    imageSide: 'left' as const,
  },
  {
    num: '03',
    chapter: 'Infrastructure',
    title: 'Web Design',
    titleEm: '& Development',
    description: 'Digital architecture built to perform and persuade. We construct websites where every structural decision serves conversion — technical excellence meeting precise aesthetic vision, assembled with engineering discipline and precision.',
    disciplines: ['Web Design', 'Next.js Engineering', 'CMS Architecture', 'E-Commerce', 'Core Web Vitals', 'Conversion Rate'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85&fit=crop',
    imageSide: 'right' as const,
  },
  {
    num: '04',
    chapter: 'Experience',
    title: 'UI / UX',
    titleEm: 'Design',
    description: 'Interfaces engineered around the precise geometry of human behaviour. We design experiences that feel inevitable — every transition, every gesture, every micro-moment considered against the psychology of the person using it.',
    disciplines: ['UX Research', 'Interface Design', 'Prototyping', 'Motion Design', 'Design Systems', 'Usability Testing'],
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=85&fit=crop',
    imageSide: 'left' as const,
  },
  {
    num: '05',
    chapter: 'Identity',
    title: 'Branding',
    titleEm: '& Identity',
    description: 'Before anything is built, the signal must be precise. We architect brand identities that carry cultural weight — visual languages that outlast trends, narrative systems that hold meaning, and positioning that separates you by design.',
    disciplines: ['Brand Strategy', 'Visual Identity', 'Logotype', 'Brand Voice', 'Positioning', 'Guidelines'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=85&fit=crop',
    imageSide: 'right' as const,
  },
  {
    num: '06',
    chapter: 'Scale',
    title: 'SaaS Growth',
    titleEm: 'Systems',
    description: 'Growth infrastructure designed for software companies. We engineer the full SaaS funnel — from initial acquisition through activation, retention, and expansion — using compounding system logic, not one-off campaigns that spike and fade.',
    disciplines: ['PLG Strategy', 'Onboarding', 'Churn Reduction', 'MRR Growth', 'Product Marketing', 'NRR Optimisation'],
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&q=85&fit=crop',
    imageSide: 'left' as const,
  },
]

export default function ServicesPage() {
  return (
    <>
      <style>{`
        @keyframes svc-fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes marquee-svc { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .svc-tag {
          font-size: 11px;
          font-family: ${BODY};
          padding: .4rem .85rem;
          border: 1px solid rgba(255,255,255,.15);
          color: rgba(255,255,255,.5);
          display: inline-block;
          transition: all .3s;
          line-height: 1.5;
          border-radius: 100px;
        }
        .svc-tag:hover { border-color: rgba(255,255,255,.5); color: #fff; }
        .svc-explore {
          display: inline-flex;
          align-items: center;
          gap: .65rem;
          font-family: ${BODY};
          font-size: 11px;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: rgba(255,255,255,.45);
          text-decoration: none;
          transition: all .35s;
          border-bottom: 1px solid rgba(255,255,255,.12);
          padding-bottom: .35rem;
        }
        .svc-explore:hover { color: #fff; border-color: rgba(255,255,255,.5); gap: 1.2rem; }
        .svc-grid {
          display: grid;
          grid-template-columns: 1fr;
        }
        .svc-img {
          overflow: hidden;
          position: relative;
          min-height: min(52vh, 420px);
        }
        .svc-img img {
          width:100%; height:100%; object-fit:cover; display:block;
          transition: transform 8s ease;
          filter: brightness(.55) saturate(.7);
        }
        .svc-img:hover img { transform: scale(1.04); }
        .svc-content {
          padding: clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        @media (min-width: 768px) {
          .svc-grid { grid-template-columns: 1fr 1fr; min-height: 80vh; }
          .svc-img { min-height: 80vh; }
          .svc-content { min-height: 80vh; }
          .svc-img-mobile-first { order: -1 !important; }
        }
        @media (max-width: 767px) {
          .svc-img { order: 1; }
          .svc-content { order: 2; }
        }
      `}</style>

      <Navbar />

      <main style={{ backgroundColor: '#0d0d0d', overflowX: 'hidden' }}>

        {/* ── HERO ── */}
        <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: '#0d0d0d', padding: 'clamp(7rem, 14vw, 12vh) clamp(1rem, 5vw, 8vw) clamp(4rem, 10vh, 10vh)', position: 'relative', overflow: 'hidden' }}>

          <p style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)', opacity: 0, animation: 'svc-fadeUp 1s ease .3s forwards' }}>
            ✦ Enhanccee — Six Disciplines
          </p>

          <h1 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 'clamp(4rem, 14vw, 14rem)', lineHeight: .92, letterSpacing: '-0.02em', color: '#fff', marginBottom: 'clamp(1.5rem, 4vw, 3rem)', opacity: 0, animation: 'svc-fadeUp 1.1s ease .5s forwards', textTransform: 'uppercase' }}>
            OUR<br />SERVICES
          </h1>

          <p style={{ fontFamily: BODY, fontSize: 'clamp(.85rem, 2.5vw, 1rem)', lineHeight: 1.8, color: 'rgba(255,255,255,.45)', maxWidth: 520, margin: '0 auto clamp(2.5rem, 6vw, 4rem)', fontWeight: 300, opacity: 0, animation: 'svc-fadeUp 1.1s ease .75s forwards' }}>
            Enhanccee does not offer a menu of services. It offers a single, interconnected system — engineered to build, scale, and elevate brands that last.
          </p>

          {/* Chapter pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', justifyContent: 'center', opacity: 0, animation: 'svc-fadeUp 1s ease 1s forwards' }}>
            {services.map((s) => (
              <Link key={s.num} href={`#s${s.num}`}
                style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)', textDecoration: 'none', border: '1px solid rgba(255,255,255,.1)', padding: '.5rem 1rem', borderRadius: '100px', transition: 'all .3s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.4)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.35)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)' }}
              >
                {s.num} {s.title}
              </Link>
            ))}
          </div>
        </section>

        {/* ── Marquee ── */}
        <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,.06)', borderBottom: '1px solid rgba(255,255,255,.06)', padding: '1rem 0', background: '#0d0d0d' }}>
          <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee-svc 20s linear infinite', width: '200%' }}>
            {Array(14).fill(null).map((_, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', fontFamily: BODY, fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,.2)', paddingRight: '2rem' }}>
                <span style={{ color: 'rgba(255,255,255,.1)' }}>✦</span> OUR SERVICES — ENHANCCEE
              </span>
            ))}
          </div>
        </div>

        {/* ── SERVICE SECTIONS ── */}
        {services.map((svc) => {
          const isRight = svc.imageSide === 'right'
          return (
            <section key={svc.num} id={`s${svc.num}`} style={{ background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,.06)' }}>
              <div className="svc-grid">

                {/* Content — left when image is right */}
                {!isRight && (
                  <div className="svc-content">
                    <ContentBlock svc={svc} />
                  </div>
                )}

                {/* Image */}
                <div className={`svc-img${!isRight ? ' svc-img-mobile-first' : ''}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={svc.image} alt={`${svc.title} ${svc.titleEm}`} />
                  <div style={{ position: 'absolute', inset: 0, background: isRight ? 'linear-gradient(to left, transparent 55%, rgba(13,13,13,.8) 100%)' : 'linear-gradient(to right, transparent 55%, rgba(13,13,13,.8) 100%)' }} />
                  <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', fontFamily: BODY, fontSize: 10, letterSpacing: '.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)' }}>{svc.chapter}</div>
                </div>

                {/* Content — right when image is left */}
                {isRight && (
                  <div className="svc-content">
                    <ContentBlock svc={svc} />
                  </div>
                )}
              </div>
            </section>
          )
        })}

        {/* ── FINALE CTA ── */}
        <section style={{ background: '#f0f0f0', padding: 'clamp(5rem, 12vw, 14rem) clamp(1rem, 5vw, 8vw)', textAlign: 'center' }}>
          <FadeIn>
            <p style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,.35)', marginBottom: '2rem' }}>
              ✦ Enhanccee — The Complete System
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 'clamp(3rem, 10vw, 10rem)', lineHeight: .92, letterSpacing: '-0.02em', color: '#0d0d0d', marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)', textTransform: 'uppercase' }}>
              SIX DISCIPLINES.<br /><span style={{ color: 'rgba(0,0,0,.15)' }}>ONE INTELLIGENCE.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p style={{ fontFamily: BODY, fontSize: 'clamp(.85rem, 2.5vw, 1rem)', lineHeight: 1.8, color: 'rgba(0,0,0,.5)', maxWidth: 500, margin: '0 auto clamp(2.5rem, 5vw, 4rem)', fontWeight: 300 }}>
              Not a collection of services. A single, interconnected architecture — engineered to build, scale, and sustain brands that last.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: '#0d0d0d', color: '#fff', fontFamily: BODY, fontSize: 12, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', textDecoration: 'none', padding: '1.1rem 2.5rem', borderRadius: '100px', transition: 'opacity .3s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              START A PROJECT <span style={{ fontSize: '1rem' }}>→</span>
            </Link>
          </FadeIn>
        </section>

      </main>

      <Footer />
    </>
  )
}

function ContentBlock({ svc }: { svc: typeof services[0] }) {
  return (
    <div style={{ width: '100%' }}>
      <FadeIn>
        <p style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: '1.5rem' }}>
          {svc.chapter}
        </p>
      </FadeIn>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(.75rem, 2vw, 1.5rem)', marginBottom: 'clamp(1.25rem, 3vw, 2rem)' }}>
        <span style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'rgba(255,255,255,.08)', lineHeight: 1, userSelect: 'none', flexShrink: 0, letterSpacing: '-0.02em' }}>
          {svc.num}
        </span>
        <FadeIn delay={80} style={{ flex: 1, paddingTop: '.25rem' }}>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 'clamp(2rem, 4.5vw, 4rem)', lineHeight: .95, letterSpacing: '-0.02em', color: '#fff', textTransform: 'uppercase', margin: 0 }}>
            {svc.title}<br />
            <span style={{ color: 'rgba(255,255,255,.4)', fontWeight: 900 }}>{svc.titleEm}</span>
          </h2>
        </FadeIn>
      </div>

      <FadeIn delay={150}>
        <div style={{ width: 48, height: 1, background: 'rgba(255,255,255,.15)', marginBottom: 'clamp(1.25rem, 3vw, 2rem)' }} />
      </FadeIn>

      <FadeIn delay={200}>
        <p style={{ fontFamily: BODY, fontSize: 'clamp(.82rem, 2vw, .95rem)', lineHeight: 1.9, color: 'rgba(255,255,255,.5)', fontWeight: 300, marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          {svc.description}
        </p>
      </FadeIn>

      <FadeIn delay={270}>
        <p style={{ fontFamily: BODY, fontSize: 10, letterSpacing: '.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,.25)', marginBottom: '.75rem' }}>Disciplines</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          {svc.disciplines.map((d, i) => (
            <span key={i} className="svc-tag">{d}</span>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={340}>
        <Link href="/contact" className="svc-explore">
          Explore this discipline <span style={{ fontSize: '1rem' }}>→</span>
        </Link>
      </FadeIn>
    </div>
  )
}
