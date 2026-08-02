import { useState, useEffect, useRef } from 'react'
// hooks used by useInView and FAQItem only
import campusMap from '@/imports/image.png'
import appGif from '@/imports/ScreenRecording2026-08-02at11.20.05AM-ezgif.com-video-to-gif-converter.gif'

const NAVY = '#002244'
const NAVY_MID = '#003262'
const NAVY_LIGHT = 'rgba(0,34,68,0.55)'
const NAVY_FAINT = 'rgba(0,34,68,0.08)'
const NAVY_BORDER = 'rgba(0,34,68,0.15)'

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

const faqs = [
  {
    q: 'Is BearTracks free?',
    a: 'Yes, BearTracks is completely free with no account or payment setup.',
  },
  {
    q: 'Who is this app for?',
    a: "BearTracks is perfect for students, faculty, tourists, and anyone who's on the UC Berkeley campus.",
  },
  {
    q: 'Where does the data come from?',
    a: 'Data is pulled directly from official school websites. Information is refreshed on a daily basis so you can know what\'s happening with confidence.',
  },
  {
    q: "Aren't there already apps for this?",
    a: "Yes, OskiEats and Berkeley Mobile to name a few. It's unfortunate these apps are filled with bugs and maintained once in a blue moon.",
  },
  {
    q: 'How do I contact support?',
    a: "Email jacobquion@berkeley.edu for improvement suggestions and bug fixes. I'll get back to you within 1-2 business days.",
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${NAVY_BORDER}` }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '20px 0', textAlign: 'left' }}
      >
        <span style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 18, fontWeight: 600, lineHeight: 1.3,
          color: open ? NAVY : NAVY_MID,
          transition: 'color 0.2s',
        }}>
          {q}
        </span>
        <span style={{
          flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: open ? NAVY : NAVY_FAINT,
          color: open ? '#fff' : NAVY,
          transition: 'all 0.3s',
        }}>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            {open
              ? <path d="M1 7l5-5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              : <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            }
          </svg>
        </span>
      </button>
      <div style={{ overflow: 'hidden', maxHeight: open ? 200 : 0, transition: 'max-height 0.3s ease' }}>
        <p style={{ padding: '0 0 20px', fontSize: 15, lineHeight: 1.75, color: NAVY_LIGHT, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
          {a}
        </p>
      </div>
    </div>
  )
}

const features = [
  {
    label: 'Dining Menus',
    body: "Discover what's being served before you arrive. Browse dining hall menus, find standout dishes, and never miss your favorite meals.",
  },
  {
    label: 'Study Spots',
    body: 'Find the perfect place to focus. Check library hours and availability so you can study smarter.',
  },
  {
    label: 'Gym',
    body: "Work out when it's less crowded. Use real-time crowd meter to find the best time to hit the gym.",
  },
  {
    label: 'Campus Events',
    body: 'Stay connected with campus life. Discover everything happening around Berkeley, from student events and concerts to talks and AI conferences.',
  },
]

function FeatureItem({ label, body, delay }: { label: string; body: string; delay: number }) {
  const { ref, inView } = useInView(0.15)
  return (
    <div ref={ref} style={{ transition: `opacity 0.6s ${delay}ms, transform 0.6s ${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)' }}>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: NAVY_MID, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
        {label}
      </p>
      <p style={{ fontSize: 17, lineHeight: 1.7, color: NAVY, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        {body}
      </p>
    </div>
  )
}

function FeatureList() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      {features.map((f, i) => (
        <FeatureItem key={f.label} label={f.label} body={f.body} delay={i * 100} />
      ))}
    </div>
  )
}

function IPhone() {
  const W = 300
  const H = 610
  const R = 48  // rounded corners
  const FRAME = 6
  return (
    <div style={{ position: 'relative', width: W, flexShrink: 0 }}>

      {/* Phone body — thick titanium frame */}
      <div style={{
        width: W, height: H, borderRadius: R,
        background: 'linear-gradient(145deg, #2a2a2a 0%, #111 40%, #1e1e1e 100%)',
        boxShadow: `0 0 0 0.5px rgba(255,255,255,0.15), 0 40px 90px rgba(0,34,68,0.25), 0 10px 30px rgba(0,0,0,0.2)`,
        position: 'relative',
        padding: FRAME,
      }}>
        {/* Inner bezel — dark inset */}
        <div style={{
          width: '100%', height: '100%', borderRadius: R - 2,
          overflow: 'hidden', background: '#000',
          position: 'relative',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.6)',
        }}>
          {/* Dynamic Island */}
          <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 88, height: 28, background: '#000', borderRadius: 20, zIndex: 4, boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }} />

          {/* App screenshot */}
          <img
            src={appGif}
            alt="BearTracks app demo"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          />

          {/* Home indicator */}
          <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', width: 80, height: 4, background: 'rgba(255,255,255,0.35)', borderRadius: 2, zIndex: 3 }} />
        </div>
      </div>
    </div>
  )
}

export default function App() {

  const featuresInView = useInView(0.05)
  const faqInView = useInView(0.15)
  const heroInView = useInView(0.1)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 700)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <div style={{ background: '#fff', color: NAVY, fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        backdropFilter: 'blur(16px)', background: 'rgba(255,255,255,0.9)',
        borderBottom: `1px solid ${NAVY_BORDER}`,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 22 }}>🐻</span>
            <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em', color: NAVY }}>BearTracks</span>
          </div>
        </div>
      </nav>

      {/* SECTION 1: HERO */}
      <section style={{ position: 'relative', paddingTop: 60, overflow: 'hidden', background: '#fff' }}>
        {/* Centered copy */}
        <div style={{ textAlign: 'center', padding: '100px 32px 64px', position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 'clamp(44px, 6vw, 80px)',
            fontWeight: 700, lineHeight: 1.05,
            letterSpacing: '-0.03em', color: NAVY,
            marginBottom: 24,
          }}>
            Navigate Cal.<br />All in One App.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.75, color: NAVY_LIGHT, maxWidth: 480, margin: '0 auto 40px' }}>
            BearTracks finds the best dining halls, study spots, and campus happenings, all at your fingertips.
          </p>
          <div id="download" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
            <a
              href="#"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: NAVY, color: '#fff',
                padding: '14px 28px', borderRadius: 14, textDecoration: 'none',
                fontWeight: 600, fontSize: 15,
                boxShadow: '0 8px 24px rgba(0,34,68,0.18)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 32px rgba(0,34,68,0.28)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,34,68,0.18)' }}
            >
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                <path d="M21.54 2.5a2.76 2.76 0 00-1.94-1.96C18.0.09 11 .09 11 .09S4 .09 2.4.54A2.76 2.76 0 00.46 2.5C0 4.12 0 7.5 0 7.5s0 3.38.46 5a2.76 2.76 0 001.94 1.96C4 15 11 15 11 15s7 0 8.6-.54a2.76 2.76 0 001.94-1.96C22 10.88 22 7.5 22 7.5s0-3.38-.46-5z" fill="#FF0000"/>
                <path d="M8.75 10.71V4.29L14.5 7.5l-5.75 3.21z" fill="#fff"/>
              </svg>
              {isMobile ? 'Demo' : 'Video Demo'}
            </a>
            <a
              href="#"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: NAVY, color: '#fff',
                padding: '14px 28px', borderRadius: 14, textDecoration: 'none',
                fontWeight: 600, fontSize: 15,
                boxShadow: '0 8px 24px rgba(0,34,68,0.18)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 32px rgba(0,34,68,0.28)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,34,68,0.18)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              {isMobile ? 'Download' : 'iOS Download'}
            </a>
          </div>
        </div>

        {/* Full-width campus map fading to white at bottom */}
        <div style={{ position: 'relative', width: '100%', height: '55vw', maxHeight: 680, minHeight: 360 }}>
          <img
            src={campusMap}
            alt="UC Berkeley campus map showing buildings, pathways, and green spaces"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '60% 35%', display: 'block' }}
          />
          {/* Fade to white at bottom */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, #fff 100%)' }} />
          {/* Subtle side fades */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(255,255,255,0.5) 0%, transparent 8%, transparent 92%, rgba(255,255,255,0.5) 100%)' }} />
        </div>
      </section>

      {/* SECTION 2: FEATURES */}
      <section style={{ padding: isMobile ? '60px 20px' : '120px 32px', background: '#fff' }}>
        <div
          ref={featuresInView.ref}
          style={{
            maxWidth: 1200, margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 48 : 80,
            alignItems: 'start',
            transition: 'opacity 0.7s, transform 0.7s',
            opacity: featuresInView.inView ? 1 : 0,
            transform: featuresInView.inView ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <div style={{ transform: isMobile ? 'none' : 'perspective(1000px) rotateY(10deg) rotate(-2deg)', transformOrigin: 'center center' }}>
              <IPhone />
            </div>
          </div>
          <div>
            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, letterSpacing: '-0.025em', color: NAVY, marginBottom: 48, lineHeight: 1.15 }}>
              Stop using 10 websites.<br /><em style={{ fontStyle: 'italic', color: '#FDB515' }}>Use BearTracks.</em>
            </h2>
            <FeatureList />
          </div>
        </div>
      </section>

      {/* SECTION 3: FAQ */}
      <section style={{ padding: '120px 32px 160px', background: '#f7f9fc' }}>
        <div
          ref={faqInView.ref}
          style={{ maxWidth: 720, margin: '0 auto', transition: 'opacity 0.7s, transform 0.7s', opacity: faqInView.inView ? 1 : 0, transform: faqInView.inView ? 'translateY(0)' : 'translateY(32px)' }}
        >
          <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, letterSpacing: '-0.025em', textAlign: 'center', color: NAVY, marginBottom: 56, lineHeight: 1.15 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ border: `1px solid ${NAVY_BORDER}`, borderRadius: 16, padding: '0 32px', background: '#fff', boxShadow: '0 4px 24px rgba(0,34,68,0.06)' }}>
            {faqs.map((f, i) => (
              <div key={f.q} style={{ borderBottom: i < faqs.length - 1 ? `1px solid ${NAVY_BORDER}` : 'none' }}>
                <FAQItem q={f.q} a={f.a} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${NAVY_BORDER}`, padding: '36px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ fontSize: 13, color: NAVY_LIGHT }}>© 2026 BearTracks. All rights reserved.</p>
        <a href="mailto:jacobquion@berkeley.edu" style={{ fontSize: 13, color: NAVY_LIGHT, textDecoration: 'none' }}>jacobquion@berkeley.edu</a>
      </footer>

      <style>{`
        @media (max-width: 700px) {
          footer { justify-content: center !important; text-align: center; }
        }
      `}</style>
    </div>
  )
}
