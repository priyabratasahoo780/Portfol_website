import { useState, useEffect, Suspense, lazy, memo } from 'react'
import { Helmet } from 'react-helmet'
import { ThemeProvider } from 'next-themes'
import Lenis from 'lenis'
import Loading from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Cursor from './components/Cursor'
import ScrollReveal from './components/ScrollReveal'
import ScrollProgress from './components/ScrollProgress'

// Memoize and Lazy Load Heavy Components
const About = memo(lazy(() => import('./components/About')))
const Skills = memo(lazy(() => import('./components/Skills')))
const Journey = memo(lazy(() => import('./components/Journey')))
const Projects = memo(lazy(() => import('./components/Projects')))
const LeetCode = memo(lazy(() => import('./components/LeetCode')))
const Hackathons = memo(lazy(() => import('./components/Hackathons')))
const YouTube = memo(lazy(() => import('./components/YouTube')))
const Certificates = memo(lazy(() => import('./components/Certificates')))
const Contact = memo(lazy(() => import('./components/Contact')))
const Footer = memo(lazy(() => import('./components/Footer')))

// Memoize Critical UI Components
const MemoHero = memo(Hero)
const MemoNavbar = memo(Navbar)
const MemoCursor = memo(Cursor)
const MemoScrollProgress = memo(ScrollProgress)
const MemoScrollReveal = memo(ScrollReveal)

// Section metadata for scroll-aware dynamic title
const SECTION_META = {
  home:         { title: 'Priyabrata Sahoo | Full-Stack Developer', desc: 'Portfolio of Priyabrata Sahoo — Full-Stack Developer, Software Engineer & Creator.' },
  about:        { title: 'About | Priyabrata Sahoo', desc: 'Learn about Priyabrata Sahoo — a B.Tech CSE student from SwamiNarayan University passionate about building web apps.' },
  skills:       { title: 'Skills | Priyabrata Sahoo', desc: 'Explore the technical skills of Priyabrata Sahoo including React, Node.js, Python, and more.' },
  journey:      { title: 'Journey | Priyabrata Sahoo', desc: 'The academic and professional journey of Priyabrata Sahoo as a developer.' },
  projects:     { title: 'Projects | Priyabrata Sahoo', desc: 'Full-stack and frontend projects built by Priyabrata Sahoo.' },
  activity:     { title: 'Activity | Priyabrata Sahoo', desc: 'Real-time coding activity, LeetCode stats, and programming progress of Priyabrata Sahoo.' },
  hackathons:   { title: 'Hackathons | Priyabrata Sahoo', desc: 'Hackathons and coding competitions participated in by Priyabrata Sahoo.' },
  youtube:      { title: 'YouTube | Priyabrata Sahoo', desc: 'YouTube content and tech videos by Priyabrata Sahoo.' },
  certificates: { title: 'Certificates | Priyabrata Sahoo', desc: 'Certifications and achievements earned by Priyabrata Sahoo.' },
  contact:      { title: 'Contact | Priyabrata Sahoo', desc: 'Get in touch with Priyabrata Sahoo for collaborations, opportunities, or just to say hi.' },
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')

  // Scroll-aware dynamic title update via IntersectionObserver (Enhanced for lazy loading)
  useEffect(() => {
    if (isLoading) return;

    const sectionIds = Object.keys(SECTION_META)
    const observers = []

    const setupObservers = () => {
      // Disconnect existing to avoid duplicates
      observers.forEach((o) => o.disconnect())
      observers.length = 0

      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return
        
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          },
          { 
            // Better 'active point': centered around the top 30% of the viewport
            threshold: 0,
            rootMargin: '-30% 0px -65% 0px' 
          }
        )
        obs.observe(el)
        observers.push(obs)
      })
    }

    // Run observers immediately
    setupObservers()
    
    // Poll for components that might Lazy Load late
    const interval = setInterval(setupObservers, 2000)

    // Also run on scroll to catch any missed updates (rare but helpful)
    window.addEventListener('scroll', setupObservers, { passive: true })

    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', setupObservers)
      observers.forEach((o) => o.disconnect())
    }
  }, [isLoading])

  useEffect(() => {
    // Smoother Scroll Settings - Tuned for "Ultra Premium" Feel
    const lenis = new Lenis({
      duration: 1.2, // Slightly faster for responsiveness but still heavy
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential smoothing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false, // Disable on touch for native feel
      touchMultiplier: 2,
      infinite: false,
    })

    window.lenis = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  const handleSectionChange = (section) => {
    setActiveSection(section)
  }

  if (isLoading) {
    return <Loading onLoadingComplete={handleLoadingComplete} />
  }

  const currentMeta = SECTION_META[activeSection] || SECTION_META.home

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Helmet>
        {/* Primary Meta */}
        <html lang="en" />
        <title>{currentMeta.title}</title>
        <meta name="description" content={currentMeta.desc} />
        <meta name="keywords" content="Priyabrata Sahoo, Full-Stack Developer, React, Node.js, Portfolio, Web Developer, Software Engineer, CSE, SwamiNarayan University" />
        <meta name="author" content="Priyabrata Sahoo" />
        <link rel="canonical" href="https://portfol-website-xn8a.vercel.app/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://portfol-website-xn8a.vercel.app/" />
        <meta property="og:title" content={currentMeta.title} />
        <meta property="og:description" content={currentMeta.desc} />
        <meta property="og:image" content="https://portfol-website-xn8a.vercel.app/assets/myPhoto.png" />
        <meta property="og:site_name" content="Priyabrata Sahoo Portfolio" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://portfol-website-xn8a.vercel.app/" />
        <meta name="twitter:title" content={currentMeta.title} />
        <meta name="twitter:description" content={currentMeta.desc} />
        <meta name="twitter:image" content="https://portfol-website-xn8a.vercel.app/assets/myPhoto.png" />

        {/* Misc */}
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0f1224" />
      </Helmet>
      <div className="app-container relative">
        <MemoCursor />
        <MemoScrollProgress />
        <MemoScrollReveal />
        <MemoNavbar onSectionChange={handleSectionChange} activeSection={activeSection} />
        
        {/* Priority 1 Content: Instant Load */}
        <MemoHero onSectionChange={handleSectionChange} />
        
        {/* Priority 2 Content: Crucial Info */}
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div></div>}>
          <About />
          <Skills />
        </Suspense>

        {/* Priority 3 Content: Heavy Media/Interactive */}
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div></div>}>
          <Journey />
          <Projects />
          <LeetCode />
          <Hackathons />
        </Suspense>

        {/* Priority 4 Content: External/Footer */}
        <Suspense fallback={<div className="h-40 flex items-center justify-center text-slate-500">Loading details...</div>}>
          <YouTube />
          <Certificates />
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </ThemeProvider>
  )
}

export default App
