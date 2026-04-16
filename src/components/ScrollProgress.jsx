import { useEffect, useState } from 'react'

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight) {
        setScrollProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100)
      }
    }

    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: 'rgba(255, 255, 255, 0.05)',
        zIndex: 10001,
        pointerEvents: 'none'
      }}
    >
      <div 
        style={{
          width: `${scrollProgress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #00f3ff, #bf00ff, #ff00ff)',
          boxShadow: '0 0 15px rgba(0, 243, 255, 0.8)',
          transition: 'width 0.2s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
      />
    </div>
  )
}

export default ScrollProgress
