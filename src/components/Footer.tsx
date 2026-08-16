'use client'

import Link from 'next/link'

const DISPLAY = "var(--font-barlow-condensed), Arial Narrow, Arial, sans-serif"
const BODY = "var(--font-geist-sans), sans-serif"

const socials = [
  { label: 'Facebook',  href: '#' },
  { label: 'Twitter',   href: '#' },
  { label: 'Dribbble',  href: '#' },
  { label: 'Instagram', href: '#' },
]

const mainPages = [
  { label: 'Home',        href: '/' },
  { label: 'Services',    href: '/services' },
  { label: 'Projects',    href: '/projects' },
  { label: 'Contact Us',  href: '/contact' },
]

export default function Footer() {
  return (
    <footer>

      {/* ── PROJECT IN MIND — white section ── */}
      <div style={{ background: 'transparent', padding: 'clamp(4rem, 12vw, 10rem) clamp(1.5rem, 5vw, 6rem) clamp(3rem, 8vw, 6rem)', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: DISPLAY,
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 9vw, 9rem)',
            lineHeight: .9,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#0d0d0d',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '.2em',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <span>PR</span>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'clamp(48px, 8vw, 90px)',
              height: 'clamp(48px, 8vw, 90px)',
              borderRadius: '50%',
              background: '#0d0d0d',
              color: '#fff',
              flexShrink: 0,
              transition: 'transform .3s, background .3s',
              transform: 'rotate(-35deg)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(0deg)'; e.currentTarget.style.background = '#333' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'rotate(-35deg)'; e.currentTarget.style.background = '#0d0d0d' }}
            aria-label="Contact us"
          >
            <svg width="40%" height="40%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <span>JECT IN MIND?</span>
        </h2>
        <p style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(0,0,0,.35)', marginTop: '1.5rem' }}>
          Let&apos;s build something extraordinary together
        </p>
      </div>

      {/* ── Black footer body ── */}
      <div style={{ background: '#0d0d0d', padding: '0 clamp(1.5rem, 5vw, 6rem)' }}>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,.08)' }} />

        {/* Social pills */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '.75rem', padding: '2.5rem 0' }}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '.6rem',
                borderRadius: '100px',
                border: '1px solid rgba(255,255,255,.1)',
                padding: '.7rem 1rem',
                color: 'rgba(255,255,255,.6)',
                textDecoration: 'none',
                transition: 'all .25s',
                fontFamily: BODY,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '.15em',
                textTransform: 'uppercase',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#0d0d0d'; e.currentTarget.style.borderColor = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)' }}
            >
              <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, flexShrink: 0 }}>●</span>
              {s.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,.08)' }} />

        {/* Bottom grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', padding: '3rem 0 2.5rem' }}>

          {/* Brand */}
          <div>
            <h3 style={{ fontFamily: BODY, fontWeight: 800, fontSize: '1rem', letterSpacing: '.12em', textTransform: 'uppercase', color: '#fff', marginBottom: '.75rem' }}>
              Enhanccee
            </h3>
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,.2)', marginBottom: '1rem' }} />
            <p style={{ fontFamily: BODY, fontSize: '.83rem', lineHeight: 1.75, color: 'rgba(255,255,255,.45)', fontWeight: 300, marginBottom: '1.75rem', maxWidth: 280 }}>
              A branding studio crafting digital experiences that empower brands to stand out.
            </p>
            <p style={{ fontFamily: BODY, fontSize: 11, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: '.75rem' }}>
              Stay in the loop
            </p>
            <form
              onSubmit={e => e.preventDefault()}
              style={{
                display: 'flex',
                alignItems: 'stretch',
                borderRadius: '100px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,.1)',
                background: 'rgba(255,255,255,.04)',
                maxWidth: 300,
              }}
            >
              <input
                type="email"
                placeholder="Enter your email..."
                style={{
                  flex: 1,
                  padding: '.7rem 1.1rem',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontFamily: BODY,
                  fontSize: '.8rem',
                  color: '#fff',
                }}
              />
              <button
                type="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 38,
                  height: 38,
                  margin: '.25rem',
                  borderRadius: '50%',
                  background: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  flexShrink: 0,
                  fontSize: '1rem',
                  color: '#0d0d0d',
                }}
                aria-label="Subscribe"
              >
                ↑
              </button>
            </form>
          </div>

          {/* Main Pages */}
          <div>
            <h4 style={{ fontFamily: BODY, fontSize: 10, fontWeight: 700, letterSpacing: '.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)', marginBottom: '1.5rem' }}>
              Main Pages
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '.85rem' }}>
              {mainPages.map(l => (
                <li key={l.label}>
                  <Link href={l.href} style={{ fontFamily: BODY, fontSize: '.88rem', color: 'rgba(255,255,255,.6)', textDecoration: 'none', transition: 'color .2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.6)'}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: BODY, fontSize: 10, fontWeight: 700, letterSpacing: '.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)', marginBottom: '1.5rem' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
              <a href="mailto:info@enhanccee.com" style={{ fontFamily: BODY, fontSize: '.88rem', color: 'rgba(255,255,255,.6)', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.6)'}
              >
                info@enhanccee.com
              </a>
              <a href="tel:+917891368868" style={{ fontFamily: BODY, fontSize: '.88rem', color: 'rgba(255,255,255,.6)', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.6)'}
              >
                +91 7891368868
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', padding: '1.5rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontFamily: BODY, fontSize: 11, color: 'rgba(255,255,255,.3)', letterSpacing: '.05em' }}>
            © {new Date().getFullYear()} Enhanccee. All rights reserved.
          </p>
          <Link href="/contact" style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', textDecoration: 'none', transition: 'color .2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.4)'}
          >
            START A PROJECT →
          </Link>
        </div>

      </div>
    </footer>
  )
}
