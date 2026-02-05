import { useRef, useEffect, useState } from 'react'
import { DottedSurface } from "./ui/dotted-surface"
import gsap from 'gsap'
import { Linkedin, Github, Twitter, Mail, Heart, Sparkles } from 'lucide-react'

const Footer = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const footerRef = useRef(null)
  const socialRefs = useRef([])
  const particlesRef = useRef([])

  // Social media links with icons and colors
  const socialLinks = [
    { 
      icon: Linkedin, 
      href: 'https://www.linkedin.com/in/priyabratasahoo780/', 
      label: 'LinkedIn',
      color: '#0077b5',
      gradient: 'linear-gradient(135deg, #0077b5, #00a0dc)'
    },
    { 
      icon: Github, 
      href: 'https://github.com/priyabratasahoo780', 
      label: 'GitHub',
      color: '#333',
      gradient: 'linear-gradient(135deg, #24292e, #4a5568)'
    },
    { 
      icon: Twitter, 
      href: 'https://x.com/PRIYABRATA_780', 
      label: 'Twitter',
      color: '#1da1f2',
      gradient: 'linear-gradient(135deg, #1da1f2, #0d8bd9)'
    },
    { 
      icon: Mail, 
      href: 'mailto:priyabrata@example.com', 
      label: 'Email',
      color: '#ea4335',
      gradient: 'linear-gradient(135deg, #ea4335, #d93025)'
    }
  ]

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!footerRef.current) return
      const rect = footerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setMousePos({ x, y })
    }

    const footer = footerRef.current
    if (footer) {
      footer.addEventListener('mousemove', handleMouseMove)
      return () => footer.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Parallax effect on social icons
  useEffect(() => {
    socialRefs.current.forEach((ref, index) => {
      if (ref) {
        const offsetX = (mousePos.x - 0.5) * 30 * (index % 2 === 0 ? 1 : -1)
        const offsetY = (mousePos.y - 0.5) * 20
        gsap.to(ref, {
          x: offsetX,
          y: offsetY,
          duration: 0.5,
          ease: 'power2.out'
        })
      }
    })
  }, [mousePos])

  // Floating animation for social icons
  useEffect(() => {
    socialRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.to(ref, {
          y: '+=15',
          duration: 2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2
        })
      }
    })
  }, [])

  // Create floating particles
  useEffect(() => {
    const particles = []
    for (let i = 0; i < 20; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2
      })
    }
    particlesRef.current = particles

    // Animate particles
    particles.forEach((particle, index) => {
      const element = document.getElementById(`particle-${index}`)
      if (element) {
        gsap.to(element, {
          y: '-=100',
          opacity: 0,
          duration: particle.duration,
          repeat: -1,
          delay: particle.delay,
          ease: 'none'
        })
      }
    })
  }, [])

  const handleSocialHover = (index, isEnter) => {
    const ref = socialRefs.current[index]
    if (ref) {
      gsap.to(ref, {
        scale: isEnter ? 1.2 : 1,
        rotateY: isEnter ? 360 : 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      })
    }
  }

  return (
    <footer 
      ref={footerRef}
      className="relative w-full overflow-hidden min-h-[400px] flex flex-col justify-between pt-20 pb-8"
      style={{
        background: 'linear-gradient(180deg, rgba(5, 8, 22, 0.8) 0%, rgba(15, 18, 36, 1) 100%)',
      }}
    >
      {/* Dotted surface background */}
      <DottedSurface className="absolute inset-0 z-0 opacity-30 w-full h-full" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
        {particlesRef.current.map((particle) => (
          <div
            key={particle.id}
            id={`particle-${particle.id}`}
            style={{
              position: 'absolute',
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.4))',
              boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="container relative z-10" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Brand section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h3 
            style={{ 
              fontSize: '32px', 
              fontWeight: '700',
              background: 'linear-gradient(90deg, #60a5fa, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <Sparkles size={28} style={{ color: '#60a5fa' }} />
            Priyabrata Sahoo
          </h3>
          <p style={{ fontSize: '16px', color: '#94a3b8', fontStyle: 'italic' }}>
            Building future-ready web experiences with passion & precision.
          </p>
        </div>

        {/* 3D Social Icons */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '40px', 
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '40px',
            perspective: '1000px'
          }}
        >
          {socialLinks.map((social, index) => (
            <a
              key={social.label}
              ref={(el) => (socialRefs.current[index] = el)}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => handleSocialHover(index, true)}
              onMouseLeave={() => handleSocialHover(index, false)}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: social.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
                boxShadow: `0 10px 30px ${social.color}40, 0 0 20px ${social.color}30`,
                transition: 'all 0.3s ease',
                transformStyle: 'preserve-3d',
                position: 'relative',
                border: '2px solid rgba(255, 255, 255, 0.1)',
              }}
              aria-label={social.label}
            >
              {/* Icon */}
              <social.icon size={32} strokeWidth={2} />
              
              {/* Glow effect */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-10px',
                  borderRadius: '20px',
                  background: `radial-gradient(circle, ${social.color}20, transparent)`,
                  opacity: 0.5,
                  filter: 'blur(10px)',
                  zIndex: -1,
                  pointerEvents: 'none'
                }}
              />
            </a>
          ))}
        </div>

        {/* Animated divider */}
        <div 
          style={{
            width: '100%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #6366f1, #8b5cf6, transparent)',
            marginBottom: '30px',
            boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)'
          }}
        />
      </div>

      {/* Copyright */}
      <div className="text-center relative z-10" style={{ marginTop: '20px' }}>
        <p 
          style={{ 
            color: '#64748b', 
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          © 2025 Priyabrata Sahoo. Made with 
          <Heart 
            size={16} 
            style={{ 
              color: '#ef4444',
              fill: '#ef4444',
              animation: 'heartbeat 1.5s ease-in-out infinite'
            }} 
          />
          All rights Reserved.
        </p>
      </div>

      {/* CSS for heartbeat animation */}
      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1); }
          75% { transform: scale(1.1); }
        }
      `}</style>
    </footer>
  )
}

export default Footer
