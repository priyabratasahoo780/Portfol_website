import { useState, useEffect, useRef } from 'react'
import { Settings as SettingsIcon, X, Timer } from 'lucide-react'
import PomodoroTimer from './PomodoroTimer'

const themes = [
  { name: 'Black', color: '#000000', main: '#050816', alt: '#0d1224' },
  { name: 'Blue', color: '#0000ff', main: '#020617', alt: '#0f172a' },
  { name: 'Green', color: '#008000', main: '#022c22', alt: '#064e3b' },
  { name: 'Violet', color: '#ee82ee', main: '#2e1065', alt: '#4c1d95' },
  { name: 'Pink', color: '#ffc0cb', main: '#831843', alt: '#9d174d' },
  { name: 'Red', color: '#ff0000', main: '#450a0a', alt: '#7f1d1d' },
  { name: 'Orange', color: '#ffa500', main: '#431407', alt: '#7c2d12' },
]

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTheme, setActiveTheme] = useState('Black')
  const [showPomodoro, setShowPomodoro] = useState(false)
  const settingsRef = useRef(null)
  const buttonRef = useRef(null)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolioTheme')
    if (savedTheme) {
      const theme = themes.find(t => t.name === savedTheme)
      if (theme) {
        applyTheme(theme, false)
      }
    }
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  // Generate random color
  const generateRandomColor = () => {
    const randomHex = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
    return `#${randomHex()}${randomHex()}${randomHex()}`
  }

  // Calculate luminance to determine if color is light or dark
  const getLuminance = (hex) => {
    const rgb = parseInt(hex.slice(1), 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff
    
    // Relative luminance formula
    const a = [r, g, b].map(v => {
      v /= 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
  }

  // Generate darker/lighter shade
  const adjustColorBrightness = (hex, percent) => {
    const num = parseInt(hex.slice(1), 16)
    const amt = Math.round(2.55 * percent)
    const R = (num >> 16) + amt
    const G = (num >> 8 & 0x00FF) + amt
    const B = (num & 0x0000FF) + amt
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255))
      .toString(16).slice(1).toUpperCase()
  }

  const applyTheme = (theme, save = true) => {
    setActiveTheme(theme.name)
    document.documentElement.style.setProperty('--bg-main', theme.main)
    document.documentElement.style.setProperty('--bg-alt', theme.alt)
    
    // Calculate luminance and set appropriate text colors
    const luminance = getLuminance(theme.main)
    const isLight = luminance > 0.5
    
    // Adaptive text colors based on background
    if (isLight) {
      document.documentElement.style.setProperty('--text-main', '#0f172a')
      document.documentElement.style.setProperty('--text-muted', '#475569')
    } else {
      document.documentElement.style.setProperty('--text-main', '#f1f5f9')
      document.documentElement.style.setProperty('--text-muted', '#94a3b8')
    }
    
    // Save to localStorage
    if (save) {
      localStorage.setItem('portfolioTheme', theme.name)
    }
  }

  const handleRandomColor = () => {
    const randomColor = generateRandomColor()
    const altColor = adjustColorBrightness(randomColor, 10)
    
    const randomTheme = {
      name: 'Random',
      color: randomColor,
      main: randomColor,
      alt: altColor
    }
    
    applyTheme(randomTheme)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <button 
        ref={buttonRef}
        className="settings-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Settings"
      >
        <SettingsIcon size={24} />
      </button>

      {isOpen && (
        <>
          <div className="settings-overlay" onClick={closeModal}></div>
          <div 
            ref={settingsRef}
            className="settings-modal-popup" 
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
          >
            <div className="settings-header-new">
              <h3>Settings</h3>
              <button 
                className="close-btn-circle"
                onClick={closeModal}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="settings-section">
              <h4 className="section-title">Background Color</h4>
              <div className="theme-grid-new">
                {themes.map((theme, index) => (
                  <button
                    key={theme.name}
                    className={`theme-btn-new ${activeTheme === theme.name ? 'active' : ''} ${
                      index === themes.length - 1 ? 'full-width' : ''
                    }`}
                    style={{ backgroundColor: theme.color }}
                    onClick={() => applyTheme(theme)}
                  >
                    {theme.name}
                  </button>
                ))}
                {/* Random Color Button */}
                <button
                  className="theme-btn-new theme-btn-random"
                  style={{ 
                    background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1, #f7b731)',
                    backgroundSize: '300% 300%',
                    animation: 'gradientShift 3s ease infinite',
                    gridColumn: '1 / -1'
                  }}
                  onClick={handleRandomColor}
                >
                  🎲 Random Color
                </button>
                {/* Default Reset Button */}
                <button
                  className={`theme-btn-new theme-btn-default ${activeTheme === 'Black' ? 'active' : ''}`}
                  style={{ 
                    background: 'linear-gradient(135deg, #1e293b, #334155)',
                    gridColumn: '1 / -1'
                  }}
                  onClick={() => applyTheme(themes[0])}
                >
                  🔄 Reset to Default
                </button>
              </div>
            </div>

            {/* Pomodoro Timer Section */}
            <div className="settings-section" style={{ marginTop: '24px' }}>
              <h4 className="section-title">🎯 Productivity</h4>
              <button
                className="theme-btn-new"
                style={{ 
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  gridColumn: '1 / -1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '16px'
                }}
                onClick={() => {
                  setShowPomodoro(true);
                  setIsOpen(false);
                }}
              >
                <Timer size={20} />
                Pomodoro Timer
              </button>
            </div>

            <div className="info-cards">
              <div className="info-card">
                <h4>✨ Puzzle Challenge</h4>
                <p className="quote">"The one who greets is the sole noble."</p>
                <p className="solution">
                  Solution: Just type <span className="highlight-green">'hello'</span>.
                </p>
              </div>
            </div>

            <p className="settings-footer">
              Your theme preferences will be saved for your next visit.
            </p>
          </div>
        </>
      )}

      {/* Pomodoro Timer Modal */}
      <PomodoroTimer isOpen={showPomodoro} onClose={() => setShowPomodoro(false)} />
    </>
  )
}

export default Settings
