import { useState, useRef, useEffect, memo, useCallback } from 'react'
import { ExternalLink, Code2, Info, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import Realistic3DBackground from './ui/Realistic3DBackground'


const projectsData = [
  {
    id: 1,
    image: '/color-guesser-logo.png',
    title: 'Color Guessing Game',
    description: 'A fun color guessing game where you test your skills at identifying RGB color codes.',
    liveLink: 'https://color-guesss-game.netlify.app/',
    codeLink: 'https://github.com/priyabratasahoo780/ColorGuessingGame',
    videoLink: '#',
    category: 'HTML/CSS/JS',
    tech: ['HTML', 'CSS', 'JavaScript']
  },
  {
    id: 2,
    image: '/jiomart-clone.png',
    title: 'E-Commerce JioMart Clone',
    description: 'A full-featured e-commerce platform clone with product listings, cart functionality, and seamless user experience.',
    liveLink: 'https://jiomartclonewebsite.netlify.app',
    codeLink: 'https://github.com/priyabratasahoo780/WEBSITE-1',
    videoLink: '#',
    category: 'ReactJS',
    tech: ['React', 'CSS', 'JavaScript']
  },
  {
    id: 3,
    image: '/namakwali-clone.png',
    title: 'Namakwali Clone',
    description: 'A clone of the Namakwali website, featuring authentic Himalayan products. Built to demonstrate UI replication skills.',
    liveLink: 'https://namakwaliclone.netlify.app/',
    codeLink: 'https://github.com/priyabratasahoo780/namakwali',
    videoLink: '#',
    category: 'HTML/CSS',
    tech: ['HTML', 'CSS']
  },
  {
    id: 4,
    image: '/patilkaki-clone.jpg',
    title: 'PatilKaki Clone',
    description: 'A clone of the PatilKaki E-commerce website. Features product displays and company information.',
    liveLink: 'https://patilkakiclone.netlify.app/',
    codeLink: '#',
    videoLink: '#',
    category: 'ReactJS',
    tech: ['React', 'CSS', 'JavaScript']
  },
  {
    id: 5,
    image: '/bata-clone.png',
    title: 'Bata Clone',
    description: 'A complete footwear e-commerce solution featuring a wide collection of shoes, sandals, and chappals for men and women.',
    liveLink: 'https://bataclone.netlify.app/',
    codeLink: 'https://github.com/priyabratasahoo780/bata-clone-website',
    videoLink: '#',
    category: 'HTML/CSS',
    tech: ['HTML', 'CSS', 'Bootstrap']
  },
  {
    id: 6,
    image: '/solinas-clone.png',
    title: 'Solinas Clone',
    description: 'A modern and responsive web application with beautiful UI design and smooth animations.',
    liveLink: 'https://solinasclone.netlify.app/',
    codeLink: 'https://github.com/priyabratasahoo780/Solinas-clone',
    videoLink: '#',
    category: 'HTML/CSS',
    tech: ['HTML', 'CSS', 'JavaScript']
  },
  {
    id: 7,
    image: '/cryptoslate-clone.png',
    title: 'CryptoSlate Clone',
    description: 'A cryptocurrency news and data platform clone featuring real-time crypto information and market insights.',
    liveLink: 'https://cryptoslateclone.netlify.app/',
    codeLink: 'https://github.com/priyabratasahoo780/CryptoSlate',
    videoLink: '#',
    category: 'ReactJS',
    tech: ['React', 'CSS', 'API']
  },
  {
    id: 8,
    image: '/bookmyshow-clone.png',
    title: 'Book My Show Clone',
    description: 'A full-stack clone of the popular ticket booking platform featuring seat selection and booking flow.',
    liveLink: '#',
    codeLink: '#',
    videoLink: '#',
    category: 'MERN Stack',
    tech: ['MongoDB', 'Express', 'React', 'Node.js']
  },
  {
    id: 9,
    image: '/codinggita-platform.png',
    title: 'Codinggita Platform',
    description: 'An educational platform built to help students learn coding concepts efficiently.',
    liveLink: '#',
    codeLink: '#',
    videoLink: '#',
    category: 'Next.JS',
    tech: ['Next.js', 'React', 'Tailwind']
  }
]


const ProjectCard = memo(({ project, index, setSelectedProject }) => {
  const cardRef = useRef(null)

  // 3D Card tilt effect - Internalized
  const handleMouseMove = useCallback((e) => {
    if (window.innerWidth < 768) return // Disable on mobile
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -15
    const rotateY = ((x - centerX) / centerX) * 15

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.5,
      ease: 'power2.out'
    })

    // Glow effect
    const glowX = (x / rect.width) * 100
    const glowY = (y / rect.height) * 100
    card.style.setProperty('--glow-x', `${glowX}%`)
    card.style.setProperty('--glow-y', `${glowY}%`)
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out'
    })
  }, [])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card-3d"
      onClick={() => setSelectedProject(project)}
      style={{
        position: 'relative',
        borderRadius: '24px',
        background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.92))',
        backdropFilter: 'blur(20px)',
        border: '2px solid rgba(255, 255, 255, 0.15)',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 60px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        zIndex: 100
      }}
    >
      {/* Edge highlight (3D rim light) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.6), transparent)',
          pointerEvents: 'none',
          zIndex: 3
        }}
      />

      {/* Glow overlay */}
      <div
        style={{
          position: 'absolute',
          top: 'var(--glow-y, 50%)',
          left: 'var(--glow-x, 50%)',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent 60%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          opacity: 0.6,
          transition: 'opacity 0.3s ease',
          filter: 'blur(20px)'
        }}
      />

      {/* Project Image */}
      <div
        style={{
          width: '100%',
          height: '240px',
          overflow: 'hidden',
          position: 'relative',
          transform: 'translateZ(50px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            filter: 'brightness(0.9) contrast(1.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.15)'
            e.currentTarget.style.filter = 'brightness(1) contrast(1.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.filter = 'brightness(0.9) contrast(1.1)'
          }}
        />
        
        {/* Gradient overlay on image */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8), transparent)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Project Info */}
      <div style={{ padding: '24px', transform: 'translateZ(30px)', position: 'relative' }}>
        <h3
          style={{
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '12px',
            color: '#fff',
            background: 'linear-gradient(90deg, #fff, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 10px rgba(167, 139, 250, 0.3)'
          }}
        >
          {project.title}
        </h3>
        
        <p style={{ 
          color: '#94a3b8', 
          fontSize: '14px', 
          lineHeight: '1.7', 
          marginBottom: '16px',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
        }}>
          {project.description}
        </p>

        {/* Technology Stack Tags */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          flexWrap: 'wrap',
          marginBottom: '24px',
          transform: 'translateZ(40px)'
        }}>
          {project.tech.map((tech, idx) => (
            <span
              key={idx}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                background: 'rgba(96, 165, 250, 0.15)',
                border: '1px solid rgba(96, 165, 250, 0.3)',
                color: '#60a5fa',
                fontSize: '12px',
                fontWeight: '600',
                backdropFilter: 'blur(5px)',
                boxShadow: '0 2px 8px rgba(96, 165, 250, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(96, 165, 250, 0.25)'
                e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.5)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(96, 165, 250, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(96, 165, 250, 0.15)'
                e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.3)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(96, 165, 250, 0.2)'
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}>
          {/* Details Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedProject(project)
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              transform: 'translateZ(50px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateZ(50px) translateY(-4px) scale(1.05)'
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(16, 185, 129, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateZ(50px) translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            <Info size={16} /> Details
          </button>

          <div style={{ display: 'flex', gap: '12px' }}>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 16px rgba(99, 102, 241, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                transform: 'translateZ(50px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateZ(50px) translateY(-4px) scale(1.05)'
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(99, 102, 241, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateZ(50px) translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              <ExternalLink size={16} /> Demo
            </a>
            
            <a
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                transform: 'translateZ(50px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                e.currentTarget.style.transform = 'translateZ(50px) translateY(-4px) scale(1.05)'
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'translateZ(50px) translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <Code2 size={16} /> Code
            </a>
          </div>
        </div>
      </div>

      {/* Enhanced depth shadow layer */}
      <div
        style={{
          position: 'absolute',
          bottom: '-30px',
          left: '5%',
          right: '5%',
          height: '30px',
          background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.6), rgba(139, 92, 246, 0.3) 50%, transparent 80%)',
          filter: 'blur(15px)',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />

      {/* Side shadow (left) */}
      <div
        style={{
          position: 'absolute',
          left: '-15px',
          top: '10%',
          bottom: '10%',
          width: '15px',
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0.4), transparent)',
          filter: 'blur(8px)',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />

      {/* Side shadow (right) */}
      <div
        style={{
          position: 'absolute',
          right: '-15px',
          top: '10%',
          bottom: '10%',
          width: '15px',
          background: 'linear-gradient(to left, rgba(0, 0, 0, 0.4), transparent)',
          filter: 'blur(8px)',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />
    </motion.div>
  )
})

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [selectedProject, setSelectedProject] = useState(null)

  const categories = ['ALL', ...new Set(projectsData.map(project => project.category))]

  const filteredProjects = activeCategory === 'ALL'
    ? projectsData
    : projectsData.filter(project => project.category === activeCategory)

  return (
    <section id="projects" className="section-wrapper relative" style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px' }}>
      {/* 3D Background */}
      <Realistic3DBackground />

      <div className="container relative" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px', zIndex: 50 }}>
        <motion.h2
          className="section-title text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: '700',
            marginBottom: '50px',
            background: 'linear-gradient(90deg, #60a5fa, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Featured Projects
        </motion.h2>
        
        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
          {categories.map((category) => (
            <div
              key={category}
              className="category-btn-wrapper"
              style={{
                padding: activeCategory === category ? '3px' : '0',
                borderRadius: '16px',
                background: activeCategory === category 
                  ? 'linear-gradient(135deg, #10b981, #06b6d4, #6366f1, #8b5cf6)'
                  : 'transparent',
                backgroundSize: activeCategory === category ? '300% 300%' : 'auto',
                animation: activeCategory === category ? 'gradientBorder 3s ease infinite' : 'none',
                position: 'relative',
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              <button
                onClick={() => setActiveCategory(category)}
                style={{
                  padding: '14px 28px',
                  borderRadius: '14px',
                  background: activeCategory === category 
                    ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)'
                    : 'linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.9))',
                  border: activeCategory === category 
                    ? '1px solid rgba(255, 255, 255, 0.2)'
                    : '1px solid rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '700',
                  letterSpacing: '0.5px',
                  transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  boxShadow: activeCategory === category 
                    ? `0 8px 16px rgba(99, 102, 241, 0.4),
                       0 16px 32px rgba(139, 92, 246, 0.3),
                       0 0 40px rgba(168, 85, 247, 0.2),
                       inset 0 1px 0 rgba(255, 255, 255, 0.3),
                       inset 0 -2px 8px rgba(0, 0, 0, 0.2)`
                    : `0 4px 12px rgba(0, 0, 0, 0.4),
                       0 2px 4px rgba(0, 0, 0, 0.3),
                       inset 0 1px 0 rgba(255, 255, 255, 0.05),
                       inset 0 -1px 2px rgba(0, 0, 0, 0.3)`,
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: activeCategory === category 
                    ? 'translateY(-4px) scale(1.05)' 
                    : 'translateY(0) scale(1)',
                  transformStyle: 'preserve-3d',
                  textShadow: activeCategory === category 
                    ? '0 2px 8px rgba(0, 0, 0, 0.5)' 
                    : '0 1px 2px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== category) {
                    e.currentTarget.style.background = 'linear-gradient(145deg, rgba(51, 65, 85, 0.95), rgba(30, 41, 59, 0.9))'
                    e.currentTarget.style.transform = 'translateY(-3px) rotateX(8deg) rotateY(2deg)'
                    e.currentTarget.style.boxShadow = `0 6px 20px rgba(99, 102, 241, 0.2),
                                                        0 10px 30px rgba(0, 0, 0, 0.4),
                                                        inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                  } else {
                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.08) rotateX(5deg)'
                    e.currentTarget.style.boxShadow = `0 12px 24px rgba(99, 102, 241, 0.5),
                                                        0 20px 40px rgba(139, 92, 246, 0.4),
                                                        0 0 60px rgba(168, 85, 247, 0.3),
                                                        inset 0 1px 0 rgba(255, 255, 255, 0.4)`
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== category) {
                    e.currentTarget.style.background = 'linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.9))'
                    e.currentTarget.style.transform = 'translateY(0) rotateX(0) rotateY(0)'
                    e.currentTarget.style.boxShadow = `0 4px 12px rgba(0, 0, 0, 0.4),
                                                        0 2px 4px rgba(0, 0, 0, 0.3),
                                                        inset 0 1px 0 rgba(255, 255, 255, 0.05)`
                  } else {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)'
                    e.currentTarget.style.boxShadow = `0 8px 16px rgba(99, 102, 241, 0.4),
                                                        0 16px 32px rgba(139, 92, 246, 0.3),
                                                        0 0 40px rgba(168, 85, 247, 0.2),
                                                        inset 0 1px 0 rgba(255, 255, 255, 0.3)`
                  }
                }}
                onMouseDown={(e) => {
                  // Instant press feedback
                  e.currentTarget.style.transform = 'translateY(1px) scale(0.98)'
                  e.currentTarget.style.transition = 'all 0.1s ease'
                }}
                onMouseUp={(e) => {
                  // Quick release - reset to hover state
                  e.currentTarget.style.transition = 'all 0.2s ease'
                  e.currentTarget.style.transform = 'translateY(-3px) rotateX(8deg) rotateY(2deg)'
                }}
              >
                {/* Glossy overlay effect */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '50%',
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 100%)',
                  borderRadius: '14px 14px 0 0',
                  pointerEvents: 'none'
                }} />
                
                {/* Shine effect on hover */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.6s ease',
                  pointerEvents: 'none'
                }} className="btn-shine" />
                
                <span style={{ position: 'relative', zIndex: 1 }}>
                  {category}
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Project Cards Grid */}
        <motion.div 
          layout
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '40px',
            perspective: '2000px'
          }}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                setSelectedProject={setSelectedProject} 
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              backdropFilter: 'blur(20px)',
              background: 'rgba(0, 0, 0, 0.8)',
              padding: '20px'
            }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, rotateX: -15 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, y: 50, rotateX: 15 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '900px',
                width: '100%',
                maxHeight: '90vh',
                borderRadius: '32px',
                background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.9), 0 0 80px rgba(99, 102, 241, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
                overflow: 'hidden',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '2px solid rgba(239, 68, 68, 0.5)',
                  color: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'
                  e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
                }}
              >
                <X size={24} />
              </button>

              {/* Edge highlight */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.8), transparent)',
                  zIndex: 3
                }}
              />

              {/* Content Container */}
              <div style={{ 
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {/* Project Image */}
                <div
                  style={{
                    width: '100%',
                    height: '260px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>

                {/* Project Title */}
                <h2
                  style={{
                    fontSize: '28px',
                    fontWeight: '800',
                    marginBottom: '0',
                    background: 'linear-gradient(90deg, #fff, #a78bfa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 20px rgba(167, 139, 250, 0.4)'
                  }}
                >
                  {selectedProject.title}
                </h2>

                {/* Project Description */}
                <p
                  style={{
                    color: '#cbd5e1',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    margin: '0',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {selectedProject.description}
                </p>

                {/* Technologies Used */}
                <div>
                  <h3
                    style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#60a5fa',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                  >
                    Technologies Used
                  </h3>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {selectedProject.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '8px',
                          background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(139, 92, 246, 0.2))',
                          border: '1px solid rgba(96, 165, 250, 0.4)',
                          color: '#60a5fa',
                          fontSize: '12px',
                          fontWeight: '700',
                          backdropFilter: 'blur(10px)',
                          boxShadow: '0 2px 8px rgba(96, 165, 250, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: '1',
                      minWidth: '180px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '700',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 6px 20px rgba(99, 102, 241, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
                      e.currentTarget.style.boxShadow = '0 12px 28px rgba(99, 102, 241, 0.7), inset 0 2px 0 rgba(255, 255, 255, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)'
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <ExternalLink size={18} /> Live Demo
                  </a>

                  <a
                    href={selectedProject.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: '1',
                      minWidth: '180px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      color: '#fff',
                      fontSize: '16px',
                      fontWeight: '700',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                      e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)'
                      e.currentTarget.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.2)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                      e.currentTarget.style.transform = 'translateY(0) scale(1)'
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <Code2 size={20} /> View Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .project-card-3d:hover {
          --glow-x: 50%;
          --glow-y: 50%;
        }
        
        @keyframes gradientBorder {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .category-btn-wrapper {
          display: inline-block;
        }
        
        /* Button shine effect on hover */
        .category-btn-wrapper:hover .btn-shine {
          transform: translateX(100%);
        }
        
        button {
          font-family: inherit;
        }
      `}</style>
    </section>
  )
}

export default Projects
