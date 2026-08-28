import { useEffect, useRef } from 'react'

const ScrollProgress = () => {
  const progressBarRef = useRef(null)

  useEffect(() => {
    let ticking = false

    const updateScrollProgress = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (progressBarRef.current) {
            const currentScroll = window.scrollY || document.documentElement.scrollTop
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, currentScroll / scrollHeight)) : 0
            progressBarRef.current.style.transform = `scaleX(${progress})`
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    updateScrollProgress()

    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        background: 'rgba(255, 255, 255, 0.05)',
        zIndex: 10001,
        pointerEvents: 'none'
      }}
    >
      <div 
        ref={progressBarRef}
        style={{
          width: '100%',
          height: '100%',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          willChange: 'transform',
          background: 'linear-gradient(90deg, #00f3ff, #bf00ff, #ff00ff)',
          boxShadow: '0 0 12px rgba(0, 243, 255, 0.8)'
        }}
      />
    </div>
  )
}

export default ScrollProgress
