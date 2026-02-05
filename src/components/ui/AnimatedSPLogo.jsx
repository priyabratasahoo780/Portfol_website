import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const AnimatedSPLogo = () => {
  const containerRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Gentle floating animation
    gsap.to(containerRef.current, {
      y: -3,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    })
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '8px 18px',
        background: 'rgba(15, 23, 42, 0.9)',
        borderRadius: '10px',
        border: '2px solid',
        borderImage: 'linear-gradient(135deg, #60a5fa, #a78bfa) 1',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
        boxShadow: isHovered
          ? '0 8px 30px rgba(99, 102, 241, 0.5)'
          : '0 4px 15px rgba(99, 102, 241, 0.25)',
        zIndex: 1000,
        opacity: 1,
        visibility: 'visible'
      }}
    >
      {/* SP Text - Crystal Clear, No Blur */}
      <span
        style={{
          fontSize: '32px',
          fontWeight: '900',
          letterSpacing: '1px',
          background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 60%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: '#ffffff',
          fontFamily: '"Inter", "Montserrat", "Arial Black", sans-serif',
          textTransform: 'uppercase',
          position: 'relative',
          display: 'inline-block',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'geometricPrecision',
          opacity: 1,
          lineHeight: 1
        }}
      >
        SP
      </span>
    </div>
  )
}

export default AnimatedSPLogo
