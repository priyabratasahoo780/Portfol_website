import { useState, useEffect } from 'react'
import './Loader.css'

const Loader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsExiting(true)
            setTimeout(() => {
              onLoadingComplete()
            }, 800)
          }, 500)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  return (
    <div className={`loader-container ${isExiting ? 'exit' : ''}`}>
      <div className="loader-content">
        <div className="loader-logo">
          <span className="logo-text">P</span>
          <div className="logo-ring"></div>
          <div className="logo-ring ring-2"></div>
          <div className="logo-ring ring-3"></div>
        </div>
        <div className="loader-text">
          <span className="loading-name">PRIYABRATA</span>
          <span className="loading-role">Full-Stack Developer</span>
        </div>
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <span className="progress-text">{Math.min(Math.round(progress), 100)}%</span>
        </div>
        <div className="loader-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              '--delay': `${Math.random() * 2}s`,
              '--x': `${Math.random() * 100}%`,
              '--duration': `${2 + Math.random() * 3}s`
            }}></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loader
