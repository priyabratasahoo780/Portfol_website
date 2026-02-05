import { useRef, useEffect, memo, useCallback } from 'react'
import { Code, Layout, Database, Wrench, Palette, Zap, Cloud, Shield } from 'lucide-react'
import { IconCloud } from './ui/InteractiveIconCloud'
import { motion } from 'framer-motion'
import gsap from 'gsap'

// Modern Software Developer Skills - Categorized for Real-World Development
const skillCategories = [
  {
    id: 1,
    title: 'Languages',
    icon: Code,
    iconColor: '#ff9800',
    subtitle: 'Modern Programming Languages',
    skills: [
      { icon: 'devicon-javascript-plain colored', name: 'JavaScript' },
      { icon: 'devicon-typescript-plain colored', name: 'TypeScript' },
      { icon: 'devicon-c-plain colored', name: 'C' },
      { icon: 'devicon-cplusplus-plain colored', name: 'C++' },
      { icon: 'devicon-python-plain colored', name: 'Python' }
    ]
  },
  {
    id: 2,
    title: 'Frontend Development',
    icon: Layout,
    iconColor: '#2196f3',
    subtitle: 'Modern UI/UX Technologies',
    skills: [
      { icon: 'devicon-react-original colored', name: 'React' },
      { image: 'data:image/png;base64,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', name: 'Next.js' },
      { icon: 'devicon-html5-plain colored', name: 'HTML5' },
      { icon: 'devicon-css3-plain colored', name: 'CSS3' },
      { icon: 'devicon-tailwindcss-plain colored', name: 'Tailwind' }
    ]
  },
  {
    id: 3,
    title: 'Backend Development',
    icon: Database,
    iconColor: '#4caf50',
    subtitle: 'Server & Database',
    skills: [
      { icon: 'devicon-nodejs-plain colored', name: 'Node.js' },
      { icon: 'devicon-express-original', name: 'Express' },
      { icon: 'devicon-mongodb-plain colored', name: 'MongoDB' },
      { icon: 'devicon-postgresql-plain colored', name: 'PostgreSQL' },
      { icon: 'devicon-firebase-plain colored', name: 'Firebase' }
    ]
  },
  {
    id: 4,
    title: 'DevOps & Cloud',
    icon: Cloud,
    iconColor: '#00bcd4',
    subtitle: 'Deployment & Infrastructure',
    skills: [
      { icon: 'devicon-docker-plain colored', name: 'Docker' },
      { icon: 'devicon-amazonwebservices-plain-wordmark colored', name: 'AWS' },
      { icon: 'devicon-vercel-original', name: 'Vercel' },
      { icon: 'devicon-nginx-original colored', name: 'Nginx' }
    ]
  },
  {
    id: 5,
    title: 'Tools & Workflow',
    icon: Wrench,
    iconColor: '#9e9e9e',
    subtitle: 'Development Environment',
    skills: [
      { icon: 'devicon-git-plain colored', name: 'Git' },
      { icon: 'devicon-github-original', name: 'GitHub' },
      { icon: 'devicon-postman-plain colored', name: 'Postman' },
      { icon: 'devicon-vscode-plain colored', name: 'VS Code' },
      { icon: 'devicon-npm-original-wordmark colored', name: 'npm' }
    ]
  },
  {
    id: 6,
    title: 'Testing & Quality',
    icon: Shield,
    iconColor: '#673ab7',
    subtitle: 'Code Quality Assurance',
    skills: [
      { icon: 'devicon-jest-plain colored', name: 'Jest' },
      { image: 'data:image/png;base64,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', name: 'Cypress' },
    ]
  },
  {
    id: 7,
    title: 'Design & UI/UX',
    icon: Palette,
    iconColor: '#e91e63',
    subtitle: 'Visual Design Tools',
    skills: [
      { icon: 'devicon-figma-plain colored', name: 'Figma' },
      { icon: 'devicon-photoshop-plain colored', name: 'Photoshop' }
    ]
  },
  {
    id: 8,
    title: 'State Management',
    icon: Zap,
    iconColor: '#ffc107',
    subtitle: 'Application State',
    skills: [
      { icon: 'devicon-redux-original colored', name: 'Redux' }
    ]
  }
]

const slugs = [
  "typescript",
  "javascript",
  "react",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "awslambda",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "github",
  "gitlab",
  "visualstudio",
  "figma",
  "mongodb",
  "tailwindcss",
  "vite",
  "postman",
  "redux",
  "sass",
  "npm",
  "python"
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  show: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { 
      type: "spring", 
      stiffness: 100,
      damping: 15
    } 
  }
}

const SkillCard = memo(({ category, index, handleCardMouseMove, handleCardMouseLeave }) => {
  const IconComponent = category.icon
  const cardRef = useRef(null)

  return (
    <motion.div 
      className="arsenal-card" 
      variants={itemVariants}
      ref={cardRef}
      onMouseMove={(e) => handleCardMouseMove(e, index, cardRef)}
      onMouseLeave={() => handleCardMouseLeave(index, cardRef)}
      style={{
        transformStyle: 'preserve-3d',
        background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))',
        borderRadius: '20px',
        padding: '1.5rem',
        border: '1px solid rgba(96, 165, 250, 0.2)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s ease',
        cursor: 'pointer'
      }}
      whileHover={{
        boxShadow: '0 20px 40px rgba(96, 165, 250, 0.3), 0 0 60px rgba(167, 139, 250, 0.2)'
      }}
    >
      {/* Glossy overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '50%',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
        pointerEvents: 'none',
        borderRadius: '20px 20px 0 0'
      }} />

      <div className="arsenal-header" style={{ marginBottom: '1.5rem' }}>
        <motion.div 
          className="arsenal-icon" 
          style={{ 
            backgroundColor: category.iconColor,
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
            boxShadow: `0 8px 20px ${category.iconColor}40`
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <IconComponent size={32} color="#fff" />
        </motion.div>
        <div className="arsenal-info">
          <h3 style={{
            fontSize: '1.4rem',
            fontWeight: '700',
            color: '#fff',
            marginBottom: '0.5rem'
          }}>
            {category.title}
          </h3>
          <p style={{
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.6)'
          }}>
            {category.subtitle}
          </p>
        </div>
      </div>
      
      <div 
        className="arsenal-skills" 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))',
          gap: '1rem',
          marginTop: '1.5rem'
        }}
      >
        {category.skills.map((skill, idx) => (
          <motion.div 
            className="arsenal-skill-icon" 
            key={idx} 
            title={skill.name}
            whileHover={{ 
              scale: 1.2, 
              rotate: 360,
              y: -5
            }}
            transition={{ 
              type: 'spring', 
              stiffness: 300,
              damping: 10
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.75rem',
              background: 'rgba(96, 165, 250, 0.1)',
              borderRadius: '10px',
              border: '1px solid rgba(96, 165, 250, 0.2)',
              transition: 'all 0.3s ease'
            }}
          >
            {skill.image ? (
              <img src={skill.image} alt={skill.name} style={{ width: '2rem', height: '2rem', objectFit: 'contain' }} />
            ) : (
              <i className={skill.icon} style={{ fontSize: '2rem' }}></i>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
})

const Skills = () => {
  const starsRef = useRef(null)

  // Galaxy Twinkling Stars Background
  useEffect(() => {
    if (!starsRef.current) return

    const starsContainer = starsRef.current
    const isMobile = window.innerWidth < 768
    const numStars = isMobile ? 50 : 200

    // Create stars
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div')
      star.className = 'galaxy-star'
      star.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: ${i % 4 === 0 ? '#60a5fa' : i % 4 === 1 ? '#a78bfa' : i % 4 === 2 ? '#fbbf24' : '#34d399'};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        box-shadow: 0 0 ${Math.random() * 10 + 5}px currentColor;
      `
      starsContainer.appendChild(star)

      // GSAP Twinkling Animation
      gsap.to(star, {
        opacity: Math.random() * 0.7 + 0.3,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: Math.random() * 2
      })

      // Subtle movement
      gsap.to(star, {
        x: `+=${Math.random() * 30 - 15}`,
        y: `+=${Math.random() * 30 - 15}`,
        duration: Math.random() * 15 + 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }

    return () => {
      starsContainer.innerHTML = ''
    }
  }, [])

  // 3D Card Hover Effect - Logic optimized for stability
  const handleCardMouseMove = useCallback((e, index, cardRef) => {
    if (window.innerWidth < 768) return // Disable on mobile
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.5,
      ease: 'power2.out'
    })
  }, [])

  const handleCardMouseLeave = useCallback((index, cardRef) => {
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
    <section 
      id="skills" 
      className="section-pad bg-alt skills-section" 
      style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}
    >
      {/* Galaxy Twinkling Stars Background */}
      <div 
        ref={starsRef}
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

      {/* Icon Cloud Background - Fully Visible */}
      <div 
        className="skills-bg-animation" 
        style={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '120%',
          height: '120%',
          zIndex: 1,
          opacity: 1,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <IconCloud iconSlugs={slugs} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-heading text-center"
          style={{
            background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #fbbf24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: '3rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}
        >
          Technical Arsenal
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '4rem',
            fontSize: '1.1rem'
          }}
        >
          Modern Full-Stack Development Tools & Technologies
        </motion.p>

        <motion.div 
          className="arsenal-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            perspective: '2000px'
          }}
        >
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.id}
              category={category}
              index={index}
              handleCardMouseMove={handleCardMouseMove}
              handleCardMouseLeave={handleCardMouseLeave}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
