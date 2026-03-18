import { useState, useRef, useLayoutEffect, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Project Data ────────────────────────────────────────────────────────────
const projectsData = [
  {
    id: 1,
    title: 'E-Commerce JioMart Clone',
    emoji: '🛒',
    description: 'A full-featured e-commerce platform clone with product listings, cart functionality, and seamless user experience mirroring the real JioMart website.',
    features: [
      'Dynamic product listings with search & filter functionality',
      'Shopping cart with real-time price calculation',
      'Fully responsive layout for all screen sizes',
    ],
    liveLink: 'https://jiomartclonewebsite.netlify.app',
    codeLink: 'https://github.com/priyabratasahoo780/WEBSITE-1',
    tech: ['React', 'CSS', 'JavaScript'],
    image: '/jiomart-clone.png',
    color: '#e63946',
    gradient: 'linear-gradient(145deg, #e63946, #9b1b30)',
  },
  {
    id: 2,
    title: 'CryptoSlate Clone',
    emoji: '₿',
    description: 'A cryptocurrency news and data platform clone featuring real-time crypto information, market insights, and a sleek dashboard built with React.',
    features: [
      'Live crypto market data via API integration',
      'News feed with categorized crypto articles',
      'Responsive grid layout for market tracking',
    ],
    liveLink: 'https://cryptoslateclone.netlify.app/',
    codeLink: 'https://github.com/priyabratasahoo780/CryptoSlate',
    tech: ['React', 'CSS', 'API'],
    image: '/cryptoslate-clone.png',
    color: '#f4813f',
    gradient: 'linear-gradient(145deg, #f4813f, #c45000)',
  },
  {
    id: 3,
    title: 'Namakwali Clone',
    emoji: '🏔️',
    description: 'A pixel-perfect clone of the Namakwali website, showcasing authentic Himalayan products with rich imagery and smooth CSS animations.',
    features: [
      'Authentic Himalayan product showcase with rich imagery',
      'Pixel-perfect UI replication with CSS mastery',
      'Smooth animations & hover interaction effects',
    ],
    liveLink: 'https://namakwaliclone.netlify.app/',
    codeLink: 'https://github.com/priyabratasahoo780/namakwali',
    tech: ['HTML', 'CSS'],
    image: '/namakwali-clone.png',
    color: '#2ec4b6',
    gradient: 'linear-gradient(145deg, #2ec4b6, #0e8a80)',
  },
  {
    id: 4,
    title: 'Color Guessing Game',
    emoji: '🎨',
    description: 'A fun interactive color guessing game where you test your skills at identifying the correct RGB color codes. Features multiple difficulty levels.',
    features: [
      'Randomized RGB color challenge engine',
      'Score tracking with multiple difficulty levels',
      'Pure vanilla JS with zero dependencies',
    ],
    liveLink: 'https://color-guesss-game.netlify.app/',
    codeLink: 'https://github.com/priyabratasahoo780/ColorGuessingGame',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: '/color-guesser-logo.png',
    color: '#7b2fff',
    gradient: 'linear-gradient(145deg, #7b2fff, #4a00cc)',
  },
  {
    id: 5,
    title: 'Bata Clone',
    emoji: '👟',
    description: 'A complete footwear e-commerce solution featuring a wide collection of shoes, sandals, and chappals for men and women using Bootstrap.',
    features: [
      'Product catalog with smart category filtering',
      'Bootstrap-powered responsive grid layout',
      'Detailed product pages with full sizing guide',
    ],
    liveLink: 'https://bataclone.netlify.app/',
    codeLink: 'https://github.com/priyabratasahoo780/bata-clone-website',
    tech: ['HTML', 'CSS', 'Bootstrap'],
    image: '/bata-clone.png',
    color: '#f7b731',
    gradient: 'linear-gradient(145deg, #f7b731, #b88200)',
  },
  {
    id: 6,
    title: 'Solinas Clone',
    emoji: '✨',
    description: 'A modern and responsive business website clone with stunning animated hero sections, scroll-based reveals, and elegant UI design.',
    features: [
      'Stunning hero section with entrance animations',
      'Smooth scroll-based content reveal effects',
      'Modern business card-style visual layout',
    ],
    liveLink: 'https://solinasclone.netlify.app/',
    codeLink: 'https://github.com/priyabratasahoo780/Solinas-clone',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: '/solinas-project.png',
    color: '#26c6da',
    gradient: 'linear-gradient(145deg, #26c6da, #006d77)',
  },
  {
    id: 7,
    title: 'PatilKaki Clone',
    emoji: '🍱',
    description: 'A brand-accurate clone of the PatilKaki e-commerce website featuring food product showcases, rich imagery, and a mobile-first design.',
    features: [
      'Food product showcase with rich brand imagery',
      'Brand-accurate UI with custom design elements',
      'Mobile-first fully responsive design approach',
    ],
    liveLink: 'https://patilkakiclone.netlify.app/',
    codeLink: '#',
    tech: ['React', 'CSS', 'JavaScript'],
    image: '/patilkaki-clone.jpg',
    color: '#ff6b9d',
    gradient: 'linear-gradient(145deg, #ff6b9d, #a01050)',
  },
]

// ─── Tech Tag icons ───────────────────────────────────────────────────────────
const TECH_ICON = {
  React:       { bg: '#20232a44', fg: '#61dafb', icon: '⚛', glow: '0 0 15px rgba(97, 218, 251, 0.3)' },
  JavaScript:  { bg: '#f7df1e22', fg: '#f7df1e', icon: 'JS', glow: '0 0 15px rgba(247, 223, 30, 0.2)' },
  CSS:         { bg: '#264de422', fg: '#38bdf8', icon: 'CS', glow: '0 0 15px rgba(56, 189, 248, 0.2)' },
  HTML:        { bg: '#e34f2622', fg: '#ff7c5c', icon: 'H5', glow: '0 0 15px rgba(227, 79, 38, 0.2)' },
  Bootstrap:   { bg: '#7952b322', fg: '#d1b3ff', icon: 'B',  glow: '0 0 15px rgba(121, 82, 179, 0.2)' },
  API:         { bg: '#10b98122', fg: '#34d399', icon: '⚡', glow: '0 0 15px rgba(16, 185, 129, 0.2)' },
  MongoDB:     { bg: '#00ed6422', fg: '#00ed64', icon: 'M',  glow: '0 0 15px rgba(0, 237, 100, 0.2)' },
  'Node.js':   { bg: '#33993322', fg: '#6ee7b7', icon: 'N',  glow: '0 0 15px rgba(51, 153, 51, 0.2)' },
  'Next.js':   { bg: '#ffffff11', fg: '#fff',    icon: 'N↗', glow: '0 0 15px rgba(255, 255, 255, 0.2)' },
  Tailwind:    { bg: '#06b6d422', fg: '#22d3ee', icon: '~',  glow: '0 0 15px rgba(6, 182, 212, 0.2)' },
}

// ─── Circular Cursor ──────────────────────────────────────────────────────────
const CircularCursor = ({ cursorRef, onClick }) => {
  const [pressed, setPressed] = useState(false)
  const text = 'VISIT PROJECT • VISIT PROJECT • '

  return (
    <motion.div
      ref={cursorRef}
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      animate={{ scale: pressed ? 0.82 : 1 }}
      transition={{ duration: 0.12 }}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        transform: 'translate(-50%, -50%)',
        width: 110, height: 110,
        pointerEvents: 'auto',
        zIndex: 9999,
        cursor: 'none',
        opacity: 0,
        willChange: 'transform',
      }}
    >
      <motion.svg
        width={110} height={110} viewBox="0 0 110 110"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <path id="cpath" d="M 55,55 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <circle cx="55" cy="55" r="50" fill="#000" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.2))' }} />
        <text fill="#fff" fontSize="10.5" fontWeight="700" letterSpacing="0.05em" fontFamily="'Inter',sans-serif" style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.4))' }}>
          <textPath href="#cpath" textLength="238.5" lengthAdjust="spacingAndGlyphs">{text}</textPath>
        </text>
      </motion.svg>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
    </motion.div>
  )
}

// ─── Phone Frame ──────────────────────────────────────────────────────────────
const PhoneFrame = ({ src, alt, color, scrollFrom = 'top' }) => (
  <div style={{
    width: '100%',
    background: '#0a0a0f',
    borderRadius: 30, // more rounded like modern phones
    overflow: 'hidden',
    border: `2px solid #222`, // subtle dark border, not colored glow
    boxShadow: `0 25px 60px rgba(0,0,0,0.6)`, // cleaner shadow
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
  }}>
    {/* iOS Style Status Bar */}
    <div style={{
      height: 28,
      padding: '0 18px',
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
      fontSize: 10,
      fontWeight: 600,
      fontFamily: "'Inter',sans-serif",
      color: '#fff',
      zIndex: 10,
    }}>
      <span>8:26</span>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        {/* Simple wifi/battery symbols using div shapes */}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
        <div style={{ width: 14, height: 8, border: '1px solid #fff', borderRadius: 2, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 1, bottom: 1, left: 1, right: 3, background: '#fff', borderRadius: 1 }} />
          <div style={{ position: 'absolute', top: 2, bottom: 2, right: -2, width: 1, background: '#fff' }} />
        </div>
      </div>
    </div>
    
    <img
      src={src}
      alt={alt}
      style={{
        flex: 1,
        width: '100%',
        height: 0, // important for flex child shrinking
        objectFit: 'cover',
        objectPosition: scrollFrom === 'top' ? 'top' : 'center',
        display: 'block',
      }}
    />
    
    {/* iOS Home bar */}
    <div style={{ height: 16, background: '#0a0a0f', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
      <div style={{ width: '35%', height: 4, background: '#444', borderRadius: 4 }} />
    </div>
  </div>
)

// ─── Tablet Frame ─────────────────────────────────────────────────────────────
const TabletFrame = ({ src, alt, color }) => (
  <div style={{
    width: '100%',
    background: '#0a0a0f',
    borderRadius: 16,
    overflow: 'hidden',
    border: `2px solid #222`,
    boxShadow: `0 30px 60px rgba(0,0,0,0.6)`,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }}>
    {/* Browser chrome */}
    <div style={{
      height: 38,
      padding: '0 16px',
      background: '#111', // darker chrome
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexShrink: 0,
      borderBottom: `1px solid #222`,
    }}>
      {['#ff5f56','#ffbd2e','#27c93f'].map((c, i) => (
        <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
      ))}
      <div style={{
        flex: 1,
        maxWidth: 200,
        margin: '0 auto',
        height: 22,
        background: '#1a1a1a',
        borderRadius: 6,
      }} />
    </div>
    <img
      src={src}
      alt={alt}
      style={{ flex: 1, width: '100%', height: 0, objectFit: 'cover', objectPosition: 'top', display: 'block' }}
    />
  </div>
)

// ─── Main Component ───────────────────────────────────────────────────────────
const Projects = () => {
  const containerRef   = useRef(null)
  const rightPanelsRef = useRef([])
  const leftTextsRef   = useRef([])
  const ballRef        = useRef(null)
  const ballTrackRef   = useRef(null)
  const activeTrackRef = useRef(null)
  const cursorDomRef   = useRef(null)  // Direct DOM ref for zero-lag cursor tracking

  /* cursor state — only activeLiveLink needs state; visibility handled via DOM */
  const [activeLiveLink, setActiveLiveLink] = useState(projectsData[0].liveLink)

  /* ── GSAP ScrollTrigger setup ─────────────────────────────────────────────── */
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      /* Set initial states: all left texts start hidden/lower, except first doesn't need to as we'll set fromTo */
      leftTextsRef.current.forEach((textElement, i) => {
        const panel = rightPanelsRef.current[i]
        if (!panel || !textElement) return

        // We want to scrub the text IN and OUT based on the panel's position in the viewport.
        
        // Animate IN
        gsap.fromTo(textElement,
          { opacity: 0, y: 50, pointerEvents: 'none' },
          {
            opacity: 1, y: 0, pointerEvents: 'auto',
            immediateRender: false, // Critical for preventing GSAP conflicts on same element
            scrollTrigger: {
              trigger: panel,
              start: 'top 75%', // Start fading in when top of panel hits 75% of viewport
              end: 'top 35%',   // Fully visible when it hits 35% of viewport
              scrub: true,
              onEnter: () => setActiveLiveLink(projectsData[i].liveLink),
              onEnterBack: () => setActiveLiveLink(projectsData[i].liveLink),
            }
          }
        )

        // Animate OUT (only if not the last item)
        if (i < leftTextsRef.current.length - 1) {
          gsap.to(textElement, {
            opacity: 0, y: -50, pointerEvents: 'none',
            immediateRender: false, // Critical for preventing GSAP conflicts on same element
            scrollTrigger: {
              trigger: rightPanelsRef.current[i + 1], // Trigger out based on NEXT panel coming in
              start: 'top 85%', // Start fading out as next panel reaches 85%
              end: 'top 45%',   // Fully gone when next panel reaches 45%
              scrub: true,
            }
          })
        }
      })

    /* progress ball scrolling down the track */
    if (containerRef.current && ballRef.current && ballTrackRef.current) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start:   'top top',
        end:     'bottom bottom',
        scrub:   true,
        onUpdate: (self) => {
          const trackH = ballTrackRef.current?.offsetHeight ?? 300
          const ballY = self.progress * (trackH - 32)
          gsap.set(ballRef.current, { y: ballY })
          if (activeTrackRef.current) gsap.set(activeTrackRef.current, { height: ballY + 22 }) // Add half the ball height to fill
        },
      })
    }
    }) // <--- Close gsap.context correctly!

    return () => {
      ctx?.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  /* cursor handlers — only on RIGHT panel, zero-lag via direct DOM */
  const handleMouseMove = useCallback((e) => {
    if (!cursorDomRef.current) return
    cursorDomRef.current.style.left = e.clientX + 'px'
    cursorDomRef.current.style.top  = e.clientY + 'px'
    cursorDomRef.current.style.opacity = '1'
  }, [])
  const handleMouseLeave = useCallback(() => {
    if (cursorDomRef.current) cursorDomRef.current.style.opacity = '0'
  }, [])
  const handleCursorClick = useCallback(() => {
    if (activeLiveLink && activeLiveLink !== '#')
      window.open(activeLiveLink, '_blank', 'noopener,noreferrer')
  }, [activeLiveLink])

  return (
    <div id="projects" style={{ background: '#0a0a0f', position: 'relative' }}>

      {/* ── Section header ─────────────────────────────────────────────────── */}
      <div style={{ padding: '60px 0 30px 80px', position: 'relative' }}>
        {/* Top gradient line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, #6366f1, #a855f7, transparent)',
          boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)',
        }} />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.3em',
            color: '#6366f1', textTransform: 'uppercase', marginBottom: 14,
            fontFamily: "'Inter',sans-serif",
          }}>— My Work</p>
          <h2 style={{
            fontSize: 'clamp(38px,6vw,72px)', fontWeight: 900,
            color: '#fff', margin: 0,
            fontFamily: "'Inter',sans-serif", letterSpacing: '-0.04em', lineHeight: 1,
            textShadow: '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(99, 102, 241, 0.3)',
            position: 'relative',
          }}>
            {/* Soft light beam behind header */}
            <div style={{
              position: 'absolute', top: '50%', left: '30%', width: '40%', height: '100%',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
              transform: 'translate(-50%, -50%)', filter: 'blur(40px)', zIndex: -1
            }} />
            Featured{' '}
            <span style={{
              background: 'linear-gradient(90deg,#6366f1,#a855f7,#ec4899)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.4)) drop-shadow(0 0 30px rgba(99, 102, 241, 0.2))',
            }}>Projects</span>
          </h2>
          <p style={{
            marginTop: 18, fontSize: 15, color: '#475569', maxWidth: 480,
            lineHeight: 1.75, fontFamily: "'Inter',sans-serif",
          }}>
            A curated collection of my best work — scroll to explore each project in detail.
          </p>
        </motion.div>
      </div>

      {/* ── Main scroll container: LEFT sticky + RIGHT sections ───────────── */}
      <div ref={containerRef} style={{ display: 'flex', position: 'relative' }}>

        {/* ── LEFT: Sticky panel ─────────────────────────────────────────── */}
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '42%',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          zIndex: 10,
          background: 'linear-gradient(to right, #0a0a0f 80%, transparent)', // Fade into background
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.05) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
            zIndex: -1,
            opacity: 0.5,
          }} />
          {/* Project text layers */}
          <div style={{ padding: '0 0 0 80px', width: '100%', position: 'relative' }}>
            {/* Background glowing particles for the sticky section */}
            {[...Array(6)].map((_, pi) => (
              <div key={pi} className="particle" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float-particle ${5 + Math.random() * 5}s infinite linear`,
                animationDelay: `${Math.random() * 5}s`,
                background: pi % 2 ? '#6366f1' : '#ec4899',
                boxShadow: `0 0 8px ${pi % 2 ? '#6366f1' : '#ec4899'}`,
              }} />
            ))}
            {projectsData.map((proj, i) => (
              <div
                key={proj.id}
                ref={el => { leftTextsRef.current[i] = el }}
                style={{
                  position: 'absolute',
                  top: '40%', // Moved higher to remove gap
                  left: 80,
                  right: 0,
                  transform: 'translateY(-50%)',
                  opacity: i === 0 ? 1 : 0, 
                  pointerEvents: i === 0 ? 'auto' : 'none',
                }}
              >
                <p style={{
                  fontSize: 16, lineHeight: 1.7, color: '#e2e8f0',
                  margin: '0 0 12px', fontFamily: "'Inter',sans-serif",
                  maxWidth: 440, // Wider text block
                }}>
                  {proj.emoji} {proj.description}
                </p>

                {/* Accent line + title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <div style={{ 
                    width: 32, height: 3, background: proj.color, borderRadius: 2,
                    boxShadow: `0 0 15px ${proj.color}`,
                  }} />
                  <h3 style={{
                    fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 900,
                    color: '#fff', margin: 0,
                    fontFamily: "'Inter',sans-serif", letterSpacing: '-0.02em', lineHeight: 1,
                    textShadow: `0 0 10px ${proj.color}88, 0 0 20px ${proj.color}44, 0 0 40px ${proj.color}22`,
                  }}>
                    {proj.title}
                  </h3>
                </div>

                {/* Feature bullets */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>
                  {proj.features.map((f, fi) => (
                    <li key={fi} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 12,
                      marginBottom: 12,
                    }}>
                      <span style={{
                        color: '#fbbf24', fontWeight: 900, fontSize: 18,
                        lineHeight: 1.4, marginTop: 0, flexShrink: 0,
                      }}>✦</span>
                      <span style={{
                        color: '#f8fafc', fontSize: 14, lineHeight: 1.5,
                        fontFamily: "'Inter',sans-serif",
                      }}>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
                  {proj.tech.map((t, ti) => {
                    const iconStyle = TECH_ICON[t] || { bg: 'rgba(255,255,255,0.05)', fg: '#f1f5f9', glow: 'none' };
                    return (
                      <span key={ti} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: iconStyle.bg,
                        border: `1px solid ${iconStyle.fg}44`,
                        borderRadius: 100, padding: '8px 18px',
                        color: iconStyle.fg, fontSize: 13, fontWeight: 600,
                        fontFamily: "'Inter',sans-serif",
                        boxShadow: iconStyle.glow,
                        letterSpacing: '0.02em',
                      }}>
                        <span style={{ fontSize: 14 }}>{iconStyle.icon}</span>
                        {t}
                      </span>
                    )
                  })}
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 16, pointerEvents: 'auto' }}>
                  {proj.liveLink !== '#' && (
                    <a
                      href={proj.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '12px 28px', borderRadius: 8,
                        background: proj.gradient,
                        color: '#fff', fontSize: 15, fontWeight: 700,
                        textDecoration: 'none',
                        boxShadow: `0 8px 30px ${proj.color}50`,
                        fontFamily: "'Inter',sans-serif",
                        transition: 'transform 0.3s, box-shadow 0.3s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-3px)'
                        e.currentTarget.style.boxShadow = `0 14px 40px ${proj.color}70`
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = `0 8px 30px ${proj.color}50`
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      Live Demo
                    </a>
                  )}
                  {proj.codeLink !== '#' && (
                    <a
                      href={proj.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '12px 26px', borderRadius: 8,
                        background: 'transparent',
                        border: '1.5px solid rgba(255,255,255,0.2)',
                        color: '#f8fafc', fontSize: 15, fontWeight: 700,
                        textDecoration: 'none',
                        fontFamily: "'Inter',sans-serif",
                        transition: 'all 0.3s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = proj.color
                        e.currentTarget.style.color = proj.color
                        e.currentTarget.style.transform = 'translateY(-3px)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                        e.currentTarget.style.color = '#f8fafc'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                      Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Vertical Progress Indicator ── */}
          <div
            ref={ballTrackRef}
            style={{
              position: 'absolute',
              right: -2,
              top: '25%',   // Shorter — starts lower
              bottom: '25%', // Shorter — ends higher
              width: 3,      // Thicker, like a volume slider
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 3,
              boxShadow: '0 0 10px rgba(99, 102, 241, 0.2)',
            }}
          >
            {/* Active Highlight (fills above the ball) */}
            <div
              ref={activeTrackRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: 0,
                background: 'linear-gradient(180deg, #6366f1 0%, #a855f7 100%)',
                borderRadius: '2px 2px 0 0',
                boxShadow: '0 0 15px #6366f1',
              }}
            />
            {/* Profile Ball */}
            <div
              ref={ballRef}
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                marginLeft: -28, // Center the 56px ball
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: '#0a0a0f',
                border: '2px solid #6366f1',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.4), 0 0 0 4px rgba(0,0,0,0.8)',
                overflow: 'hidden',
                zIndex: 2,
              }}
            >
              <img src="/profile.jpg" alt="Progress" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Scrollable mockup sections ──────────────────────────── */}
        <div
          style={{ flex: 1, cursor: 'none' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {projectsData.map((proj, i) => (
            <div
              key={proj.id}
              ref={el => { rightPanelsRef.current[i] = el }}
              style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 40px 0 60px', /* Shift right side padding for centering */
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Separate Device cards layout — 2 top, 1 bottom full width */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr', // 2 equal columns
                gridTemplateRows: '1fr 1fr',     // 2 rows
                gap: 20,                         // card gaps
                width: '100%',
                height: '65vh',                  // slightly smaller height
                maxWidth: 800,                   // making the project images slightly smaller
                margin: '0 auto',
                position: 'relative',
              }}>
                {/* Background neon blooms */}
                <div style={{
                  position: 'absolute', top: '20%', left: '20%', width: '60%', height: '60%',
                  background: proj.color, filter: 'blur(120px)', opacity: 0.15, borderRadius: '50%',
                  zIndex: -1,
                }} />

                {/* Top Left Box */}
                <div className="neon-card" style={{
                  gridColumn: 1, gridRow: 1,
                  background: '#111',
                  borderRadius: 20,
                  overflow: 'hidden',
                  position: 'relative',
                  border: `1px solid ${proj.color}44`,
                  boxShadow: `0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px ${proj.color}22`,
                }}>
                  <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                  <div className="shimmer-sweep" />
                </div>

                {/* Top Right Box */}
                <div className="neon-card" style={{
                  gridColumn: 2, gridRow: 1,
                  background: '#111',
                  borderRadius: 20,
                  overflow: 'hidden',
                  position: 'relative',
                  border: `1px solid ${proj.color}44`,
                  boxShadow: `0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px ${proj.color}22`,
                }}>
                  <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                  <div className="shimmer-sweep" />
                </div>

                {/* Bottom Wide Box */}
                <div className="neon-card" style={{
                  gridColumn: '1 / 3', gridRow: 2,
                  background: '#111',
                  borderRadius: 20,
                  overflow: 'hidden',
                  position: 'relative',
                  border: `1px solid ${proj.color}44`,
                  boxShadow: `0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px ${proj.color}22`,
                }}>
                  <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                  <div className="shimmer-sweep" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ─────────────────────────────────────────────────────── */}
      <div style={{
        padding: '80px 0',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
        background: '#0a0a0f',
      }}>
        <motion.a
          href="https://github.com/priyabratasahoo780"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -4 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '15px 38px', borderRadius: 50,
            background: 'linear-gradient(135deg,#6366f1,#a855f7)',
            color: '#fff', fontSize: 14, fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(99,102,241,0.6), 0 0 20px rgba(168, 85, 247, 0.4)',
            fontFamily: "'Inter',sans-serif",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          View All Projects on GitHub
        </motion.a>
        <p style={{ color: '#1e293b', fontSize: 13, fontFamily: "'Inter',sans-serif" }}>
          {projectsData.length} projects and counting...
        </p>
      </div>

      {/* ── Global cursor ─────────────────────────────────────────────────── */}
      <CircularCursor
        cursorRef={cursorDomRef}
        onClick={handleCursorClick}
      />

      <style>{`
        #projects a, #projects button { user-select: none; }
        
        .shimmer-sweep {
          position: absolute;
          top: -100%;
          left: -100%;
          width: 300%;
          height: 300%;
          background: linear-gradient(
            45deg,
            transparent 45%,
            rgba(255, 255, 255, 0.05) 50%,
            transparent 55%
          );
          transform: rotate(-45deg);
          animation: shimmer 8s infinite linear;
          pointer-events: none;
        }

        @keyframes shimmer {
          0% { transform: translate(-30%, -30%) rotate(-45deg); }
          100% { transform: translate(30%, 30%) rotate(-45deg); }
        }

        .neon-card {
          transition: all 0.5s var(--ease-smooth);
        }
        
        .neon-card:hover {
          filter: brightness(1.25);
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(255,255,255,0.6) !important;
          box-shadow: 0 30px 60px rgba(0,0,0,0.7), 0 0 20px rgba(255,255,255,0.2), inset 0 0 30px rgba(255,255,255,0.1) !important;
          z-index: 10;
        }

        /* Ambient neon particles */
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #6366f1;
          border-radius: 50%;
          pointer-events: none;
          box-shadow: 0 0 10px #6366f1;
        }

        @media (max-width: 900px) {
          #projects > div:nth-child(2) { flex-direction: column !important; }
          #projects > div:nth-child(2) > div:first-child {
            position: relative !important; height: auto !important;
            width: 100% !important; padding: 48px 24px !important;
          }
          #projects > div:nth-child(2) > div:last-child { width: 100% !important; }
        }
      `}</style>
    </div>
  )
}

export default Projects
