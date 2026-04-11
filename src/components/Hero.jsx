import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Download, Linkedin, Github, Twitter } from 'lucide-react'
import profileImg from '/assets/myPhoto.png'
import { Helmet } from 'react-helmet'
const PHRASES = ["Full-Stack Developer", "Software Developer", "Creator"]

const TypingText = () => {
  const [typedText, setTypedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % PHRASES.length
      const fullText = PHRASES[i]
      
      setTypedText(prev => isDeleting 
        ? fullText.substring(0, prev.length - 1) 
        : fullText.substring(0, prev.length + 1)
      )

      if (!isDeleting && typedText === fullText) {
        setIsDeleting(true)
        setTypingSpeed(2000)
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false)
        setLoopNum(prev => prev + 1)
        setTypingSpeed(150)
      } else {
        setTypingSpeed(isDeleting ? 50 : 150)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [typedText, isDeleting, loopNum, typingSpeed])

  return <span className="typing-text">{typedText}</span>
}


const Hero = ({ onSectionChange }) => {
  const contentRef = useRef(null)
  const imageRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    
    // Desktop Animation
    mm.add("(min-width: 769px)", () => {
      // Content Entry
      gsap.fromTo(contentRef.current.children, 
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, stagger: 0.2, ease: "power4.out", delay: 0.5 }
      )
      // Image Entry
      gsap.fromTo(imageRef.current,
        { x: 50, opacity: 0, rotate: 5 },
        { x: 0, opacity: 1, rotate: 0, duration: 1.5, ease: "power3.out", delay: 0.2 }
      )
    })

    // Mobile Animation
    mm.add("(max-width: 768px)", () => {
       gsap.fromTo(contentRef.current.children, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.2 }
      )
      gsap.fromTo(imageRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power2.out", delay: 0.1 }
      )
    })
  }, { scope: contentRef })

  return (
    <section id="home" className="hero-section-premium">
      <Helmet>
        <title>Hero - Priyabrata Sahoo section</title>
        <meta name="description" content="Hero Priyabrata Sahoo section" />
      </Helmet>
      {/* Background Particles/Stars */}
      <div className="hero-stars" />
      
      <div className="hero-container-two-col">
        {/* Left Column: Content */}
        <div className="hero-text-content" ref={contentRef}>
          <div className="hero-badge-pill">
            HI, I'M PRIYABRATA.
          </div>

          <h1 className="hero-display-title">
            "<TypingText />"
          </h1>
          
          <p className="hero-description">
            I'm a passionate Full-stack developer crafting digital experiences. I
            love building intuitive web apps, exploring new technologies, and
            turning creative ideas into accessible tools.
          </p>

          <div className="hero-action-btns">
            <button 
              onClick={() => onSectionChange('contact')}
              className="action-btn-primary"
            >
              Contact
            </button>
            <a 
              href="/certificates/resumetemporary_netlify (1).pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-btn-outline"
            >
              View Resume <Download size={18} />
            </a>
          </div>

          <div className="hero-socials-row">
            <span className="social-label">Connect with me:</span>
            <div className="social-pill-container">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-circle-link">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-circle-link">
                <Github size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-circle-link">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Image with Triple Border */}
        <div className="hero-visual-content" ref={imageRef}>
          <div className="image-frame-triple">
            <div className="frame-border frame-1" />
            <div className="frame-border frame-2" />
            <div className="frame-border frame-3" />
            <div className="main-image-wrapper">
              <img src={profileImg} alt="Priyabrata" className="profile-hero-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
