'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const DISPLAY = "var(--font-barlow-condensed), Arial Narrow, Arial, sans-serif"
const BODY = "var(--font-geist-sans), sans-serif"

function FadeIn({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect() } }, { threshold: 0.06 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(32px)', transition: `opacity .85s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .85s cubic-bezier(.16,1,.3,1) ${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

const projects = [
  {
    id: 'nova-labs',
    title: 'Nova Labs',
    category: 'Brand Identity',
    year: '2026',
    tags: ['Branding', 'Web Design'],
    goal: 'Reposition Nova Labs from a niche tech startup into a recognisable consumer brand with a visual identity that could scale across digital and physical touchpoints.',
    result: 'A complete brand system — logotype, colour palette, typography, and motion language — that increased their Series A raise by 40% and grew organic traffic by 220% within 6 months.',
    image1: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=85&fit=crop',
    image2: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=85&fit=crop',
    featured: true,
  },
  {
    id: 'arc-digital',
    title: 'Arc Digital',
    category: 'Web Development',
    year: '2025',
    tags: ['Web Dev', 'UI/UX'],
    goal: 'Design and build a performance-first website that converts enterprise prospects and communicates technical credibility without sacrificing aesthetic quality.',
    result: 'A Next.js platform achieving 98 Lighthouse scores, 3.2× increase in qualified leads, and a 55% drop in bounce rate compared to their previous site.',
    image1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85&fit=crop',
    image2: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&q=85&fit=crop',
    featured: true,
  },
  {
    id: 'pixel-co',
    title: 'Pixel Co',
    category: 'Performance Marketing',
    year: '2025',
    tags: ['Meta Ads', 'SEO'],
    goal: 'Scale their DTC revenue through paid social and organic search without eroding the premium brand perception they had spent years building.',
    result: '4.8× ROAS on Meta, 310% growth in organic sessions, and a 28% reduction in customer acquisition cost — all within the first quarter of engagement.',
    image1: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85&fit=crop',
    image2: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=900&q=85&fit=crop',
    featured: false,
  },
  {
    id: 'orbit-brand',
    title: 'Orbit Brand',
    category: 'UI/UX Design',
    year: '2024',
    tags: ['UI/UX', 'Branding'],
    goal: 'Redesign their SaaS product interface to reduce churn by improving onboarding clarity and making advanced features discoverable without training.',
    result: 'A design system and interface overhaul that cut time-to-activation by 62%, reduced support tickets by 41%, and lifted NPS from 34 to 71.',
    image1: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=900&q=85&fit=crop',
    image2: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=900&q=85&fit=crop',
    featured: false,
  },
  {
    id: 'wave-media',
    title: 'Wave Media',
    category: 'Brand Strategy',
    year: '2024',
    tags: ['Branding', 'Strategy'],
    goal: 'Audit and reposition Wave Media\'s brand architecture across three sub-brands that had grown incoherently and were confusing their target audience.',
    result: 'A unified brand architecture, new visual language, and positioning framework that simplified their go-to-market and increased inbound inquiries by 190%.',
    image1: 'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=900&q=85&fit=crop',
    image2: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=900&q=85&fit=crop',
    featured: false,
  },
  {
    id: 'zenith-saas',
    title: 'Zenith SaaS',
    category: 'SaaS Growth',
    year: '2023',
    tags: ['SaaS', 'Growth'],
    goal: 'Build a full-funnel growth system for a B2B SaaS product stuck at $400K ARR despite strong product-market fit — the problem was acquisition and activation, not the product.',
    result: 'PLG motion, onboarding redesign, and content engine that took them from $400K to $1.4M ARR in 11 months with churn falling from 9% to 3.2%.',
    image1: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=85&fit=crop',
    image2: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=900&q=85&fit=crop',
    featured: false,
  },
]

const filters = ['All', 'Branding', 'Web Design', 'UI/UX', 'Marketing', 'Strategy']

export default function ProjectsPage() {
  const [active, setActive] = useState('All')
  const featured = projects.filter(p => p.featured)

  return (
    <>
      <style>{`
        @keyframes proj-fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes marquee-proj { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        .proj-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          background: #111;
          border: 1px solid rgba(255,255,255,.06);
          border-radius: 16px;
          transition: border-color .3s;
        }
        .proj-card:hover { border-color: rgba(255,255,255,.18); }
        .proj-card-img {
          width: 100%; aspect-ratio: 4/3; object-fit: cover; display: block;
          filter: brightness(.7) saturate(.8);
          transition: transform .8s cubic-bezier(.16,1,.3,1), filter .4s;
        }
        .proj-card:hover .proj-card-img { transform: scale(1.05); filter: brightness(.85) saturate(.9); }
        .proj-arrow {
          width: 40px; height: 40px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,.2);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,.6);
          font-size: 18px;
          transition: all .3s;
          flex-shrink: 0;
        }
        .proj-card:hover .proj-arrow {
          background: #fff; color: #0d0d0d; border-color: #fff;
        }
        .proj-filter-btn {
          padding: .45rem 1.1rem;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,.12);
          background: transparent;
          color: rgba(255,255,255,.45);
          font-family: ${BODY};
          font-size: 11px;
          letter-spacing: .15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all .25s;
        }
        .proj-filter-btn:hover, .proj-filter-btn.active {
          background: #fff; color: #0d0d0d; border-color: #fff;
        }
        .feat-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          filter: brightness(.6) saturate(.75);
          transition: transform 10s ease;
        }
        .feat-section:hover .feat-img { transform: scale(1.03); }
        .tag-pill {
          display: inline-block;
          padding: .3rem .8rem;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 100px;
          font-family: ${BODY};
          font-size: 10px;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: rgba(255,255,255,.4);
        }
      `}</style>

      <Navbar />

      <main style={{ background: '#0d0d0d', overflowX: 'hidden' }}>

        {/* ── HERO ── */}
        <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(7rem, 14vw, 12vh) clamp(1.5rem, 5vw, 6rem) clamp(3rem, 8vw, 6rem)', position: 'relative', overflow: 'hidden' }}>
          {/* mesh gradient */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 20% 60%, rgba(255,255,255,.03) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 30%, rgba(255,255,255,.02) 0%, transparent 60%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: 1400, width: '100%', margin: '0 auto' }}>
            <p style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: '1.5rem', opacity: 0, animation: 'proj-fadeUp .9s ease .3s forwards' }}>
              ✦ Selected work — 2023–2026
            </p>

            <h1 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 'clamp(4.5rem, 16vw, 16rem)', lineHeight: .88, letterSpacing: '-0.02em', color: '#fff', textTransform: 'uppercase', marginBottom: 'clamp(2rem, 5vw, 4rem)', opacity: 0, animation: 'proj-fadeUp 1.1s ease .5s forwards' }}>
              OUR<br /><span style={{ color: 'rgba(255,255,255,.18)' }}>WORK</span>
            </h1>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', opacity: 0, animation: 'proj-fadeUp .9s ease .75s forwards' }}>
              <p style={{ fontFamily: BODY, fontSize: 'clamp(.85rem, 2vw, 1rem)', lineHeight: 1.8, color: 'rgba(255,255,255,.45)', maxWidth: 480, fontWeight: 300 }}>
                Real-world examples of branding, design, and growth work — shaped by context, strategy, and craft.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)' }}>Accepting new clients</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,.06)', borderBottom: '1px solid rgba(255,255,255,.06)', padding: '.85rem 0' }}>
          <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee-proj 22s linear infinite', width: '200%' }}>
            {Array(14).fill(null).map((_, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', fontFamily: BODY, fontSize: 11, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,.18)', paddingRight: '2rem' }}>
                <span style={{ opacity: .5 }}>✦</span> SELECTED WORK — ENHANCCEE
              </span>
            ))}
          </div>
        </div>

        {/* ── FEATURED PROJECTS ── */}
        {featured.map((p, idx) => (
          <section key={p.id} className="feat-section" style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', minHeight: '85vh' }}>

              {/* Image — alternates side */}
              {idx % 2 === 0 && (
                <div style={{ overflow: 'hidden', position: 'relative', minHeight: 'min(55vh, 500px)' }}>
                  <img src={p.image1} alt={p.title} className="feat-img" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 55%, rgba(13,13,13,.6) 100%)' }} />
                </div>
              )}

              {/* Content */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(3rem, 7vw, 7rem) clamp(2rem, 6vw, 6rem)' }}>
                <FadeIn>
                  <div style={{ display: 'flex', gap: '.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    {p.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
                    <span className="tag-pill">{p.year}</span>
                  </div>
                </FadeIn>

                <FadeIn delay={80}>
                  <h2 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: .9, letterSpacing: '-0.02em', color: '#fff', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                    {p.title}
                  </h2>
                </FadeIn>

                <FadeIn delay={150}>
                  <p style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: '.6rem' }}>Goal</p>
                  <p style={{ fontFamily: BODY, fontSize: 'clamp(.83rem, 1.8vw, .95rem)', lineHeight: 1.85, color: 'rgba(255,255,255,.5)', marginBottom: '2rem', fontWeight: 300 }}>
                    {p.goal}
                  </p>
                </FadeIn>

                <FadeIn delay={220}>
                  <p style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: '.6rem' }}>Results</p>
                  <p style={{ fontFamily: BODY, fontSize: 'clamp(.83rem, 1.8vw, .95rem)', lineHeight: 1.85, color: 'rgba(255,255,255,.5)', marginBottom: '2.5rem', fontWeight: 300 }}>
                    {p.result}
                  </p>
                </FadeIn>

                <FadeIn delay={280}>
                  <Link href="/contact"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '.7rem', fontFamily: BODY, fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,.15)', paddingBottom: '.4rem', transition: 'all .3s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.5)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.15)' }}
                  >
                    Start a similar project <span style={{ fontSize: '1rem' }}>→</span>
                  </Link>
                </FadeIn>
              </div>

              {idx % 2 !== 0 && (
                <div style={{ overflow: 'hidden', position: 'relative', minHeight: 'min(55vh, 500px)' }}>
                  <img src={p.image1} alt={p.title} className="feat-img" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, transparent 55%, rgba(13,13,13,.6) 100%)' }} />
                </div>
              )}
            </div>
          </section>
        ))}

        {/* ── ALL PROJECTS GRID ── */}
        <section style={{ padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 6rem)' }}>

          {/* Section heading */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
            <FadeIn>
              <h2 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 'clamp(2.5rem, 7vw, 6rem)', lineHeight: .9, letterSpacing: '-0.02em', color: '#fff', textTransform: 'uppercase', margin: 0 }}>
                ALL PROJECTS
              </h2>
            </FadeIn>

            {/* Filters */}
            <FadeIn delay={100}>
              <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap' }}>
                {filters.map(f => (
                  <button key={f} className={`proj-filter-btn${active === f ? ' active' : ''}`} onClick={() => setActive(f)}>
                    {f}
                  </button>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '1.25rem' }}>
            {projects.map((p, i) => (
              <FadeIn key={p.id} delay={i * 60}>
                <div className="proj-card">
                  <div style={{ overflow: 'hidden' }}>
                    <img src={p.image1} alt={p.title} className="proj-card-img" />
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap' }}>
                        {p.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
                      </div>
                      <span style={{ fontFamily: BODY, fontSize: 11, color: 'rgba(255,255,255,.25)', letterSpacing: '.1em' }}>{p.year}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem' }}>
                      <h3 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', lineHeight: .95, letterSpacing: '-0.02em', color: '#fff', textTransform: 'uppercase', margin: 0 }}>
                        {p.title}
                      </h3>
                      <Link href="/contact" className="proj-arrow" aria-label={`View ${p.title}`}>→</Link>
                    </div>
                    <p style={{ fontFamily: BODY, fontSize: '.8rem', lineHeight: 1.7, color: 'rgba(255,255,255,.35)', marginTop: '.85rem', fontWeight: 300 }}>
                      {p.category}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: '#f0f0f0', padding: 'clamp(5rem, 12vw, 12rem) clamp(1.5rem, 5vw, 6rem)', textAlign: 'center' }}>
          <FadeIn>
            <p style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,.35)', marginBottom: '1.5rem' }}>✦ Work with us</p>
          </FadeIn>
          <FadeIn delay={100}>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 'clamp(3rem, 10vw, 10rem)', lineHeight: .9, letterSpacing: '-0.02em', color: '#0d0d0d', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              START A<br /><span style={{ color: 'rgba(0,0,0,.15)' }}>PROJECT</span>
            </h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p style={{ fontFamily: BODY, fontSize: 'clamp(.85rem, 2vw, 1rem)', lineHeight: 1.8, color: 'rgba(0,0,0,.5)', maxWidth: 440, margin: '0 auto 2.5rem', fontWeight: 300 }}>
              A confidential conversation to begin with clarity. Let&apos;s build something that lasts.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <Link href="/contact"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.75rem', background: '#0d0d0d', color: '#fff', fontFamily: BODY, fontSize: 12, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', textDecoration: 'none', padding: '1.1rem 2.5rem', borderRadius: '100px', transition: 'opacity .3s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '.8'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Book a consultation <span>→</span>
            </Link>
          </FadeIn>
        </section>

      </main>

      <Footer />
    </>
  )
}
