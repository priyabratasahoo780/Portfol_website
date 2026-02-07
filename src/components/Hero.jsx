import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Download, Linkedin, Github, Twitter } from 'lucide-react'
import profileImg from '/profile.jpg'
import ParticlesComponent from './ui/particles-bg'

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
    // ... code truncated for brevity, same as before ... using a simpler replace to just fix the beginning of the component
      // Content Entry
      gsap.fromTo(contentRef.current.children, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power4.out", delay: 0.5 }
      )
      // Image Entry
      gsap.fromTo(imageRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 0.2 }
      )
    })

    // Mobile Animation
    mm.add("(max-width: 768px)", () => {
       gsap.fromTo(contentRef.current.children, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.2 }
      )
      gsap.fromTo(imageRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power2.out", delay: 0.1 }
      )
    })
  }, { scope: contentRef })



  return (
    <section id="home" className="hero relative overflow-hidden min-h-screen flex items-center">
      <ParticlesComponent 
        id="particles-hero" 
        className="bg-gradient-to-tr from-[#e3f2fd] via-[#90caf9] to-[#64b5f6] dark:from-[#000814] dark:via-[#003566] dark:to-[#0077b6] transition-colors duration-500 absolute inset-0 z-0"
      />
      <div className="image-container relative z-10" ref={imageRef}>
        <img
          src={profileImg}
          alt="Priyabrata"
          className="floating-img rounded-2xl shadow-2xl"
        />
      </div>
      <div className="container hero-content" ref={contentRef}>
        <p className="greeting opacity-0 translate-y-8">Hi, I'm Priyabrata.</p>
        <h1 className="hero-title opacity-0 translate-y-8">
          "<TypingText />"
        </h1>
        <p className="hero-bio opacity-0 translate-y-8">
          I'm a passionate Full-stack developer crafting digital experiences. I
          love building intuitive web apps, exploring new technologies, and
          turning creative ideas into accessible tools.
        </p>
        <div className="hero-btns opacity-0 translate-y-8">
          <button 
            onClick={() => onSectionChange('contact')}
            className="btn btn-primary"
          >
            Contact
          </button>
          <a 
            href="/certificates/resumetemporary_netlify (1).pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            View Resume <Download className="btn-icon" size={18} />
          </a>
        </div>
        <div className="social-connect opacity-0 translate-y-8">
          <span>Connect with me:</span>
          <div className="social-icons">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} className="hover:text-blue-500 transition-colors" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={20} className="hover:text-gray-400 transition-colors" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={20} className="hover:text-blue-400 transition-colors" />
            </a>
          </div>
        </div>
      </div>
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
    </section>
  )
}

export default Hero
