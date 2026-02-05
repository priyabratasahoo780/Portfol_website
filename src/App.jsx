import { useState, useEffect, Suspense, lazy } from 'react'
import { ThemeProvider } from 'next-themes'
import Lenis from 'lenis'
import Loading from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Cursor from './components/Cursor'
import ScrollReveal from './components/ScrollReveal'

// Lazy Load Heavy Components
const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Journey = lazy(() => import('./components/Journey'))
const Projects = lazy(() => import('./components/Projects'))
const Certificates = lazy(() => import('./components/Certificates'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    // Smoother Scroll Settings - Tuned for "Ultra Premium" Feel
    const lenis = new Lenis({
      duration: 1.5, // Slower, weightier feel (Butter smooth)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential decay
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: true,
      touchMultiplier: 2, // Responsive touch
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

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="app-container relative">
        <Cursor />
        <ScrollReveal />
        <Navbar onSectionChange={handleSectionChange} activeSection={activeSection} />
        
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>}>
          {/* Render only the active section */}
          {activeSection === 'home' && <Hero />}
          {activeSection === 'about' && <About />}
          {activeSection === 'skills' && <Skills />}
          {activeSection === 'journey' && <Journey />}
          {activeSection === 'projects' && <Projects />}
          {activeSection === 'certificates' && <Certificates />}
          {activeSection === 'contact' && <Contact />}
          
          <Footer />
        </Suspense>
      </div>
    </ThemeProvider>
  )
}

export default App
