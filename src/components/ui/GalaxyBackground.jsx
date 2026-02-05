import { useRef, useEffect, memo } from 'react'
import gsap from 'gsap'

const GalaxyBackground = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const isMobile = window.innerWidth < 768
    const numStars = isMobile ? 30 : 80 // Significantly reduced for higher FPS headroom

    // Clear any existing stars (cleanup safety)
    container.innerHTML = ''

    // Create stars
    for (let i = 0; i < numStars; i++) {

      const star = document.createElement('div')
      star.className = 'galaxy-star'
      star.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: ${i % 3 === 0 ? '#60a5fa' : i % 3 === 1 ? '#a78bfa' : '#ffffff'};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        box-shadow: 0 0 ${Math.random() * 5 + 2}px currentColor;
        pointer-events: none;
        opacity: ${Math.random() * 0.7 + 0.3};
      `
      container.appendChild(star)

      // GSAP Twinkling Animation
      gsap.to(star, {
        opacity: Math.random() * 0.7 + 0.3,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: Math.random() * 2,
        force3D: true // Force GPU acceleration
      })

      // Subtle movement
      gsap.to(star, {
        x: `+=${Math.random() * 20 - 10}`,
        y: `+=${Math.random() * 20 - 10}`,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }

    // Cleanup
    return () => {
      // We use innerHTML = '' for fast cleanup of many DOM nodes
      if (container) container.innerHTML = ''
      // Kill all GSAP tweens related to these stars to prevent memory leaks
      gsap.killTweensOf('.galaxy-star')
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  )
}

export default memo(GalaxyBackground)
