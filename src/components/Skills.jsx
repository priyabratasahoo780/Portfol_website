import { useRef, memo, useCallback } from 'react'
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
      { icon: 'devicon-nextjs-plain colored', name: 'Next.js' },
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
      { icon: 'devicon-jest-plain colored', name: 'Jest' }
      // { icon: 'devicon-cypress-plain colored', name: 'Cypress' },
      // { icon: 'devicon-testinglibrary-plain colored', name: 'Testing Library' }
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
      // { icon: 'devicon-photoshop-plain colored', name: 'Photoshop' }
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
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(15px)',
        borderRadius: '20px',
        padding: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s var(--ease-smooth)',
        cursor: 'pointer'
      }}
      whileHover={{
        borderColor: 'var(--neon-cyan)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 243, 255, 0.2)'
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
            boxShadow: '0 8px 20px ' + category.iconColor + '40'
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
              background: 'rgba(96, 165, 250, 0.05)',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
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
          className="section-heading neon-text text-center"
          style={{
            fontSize: 'clamp(38px, 6vw, 75px)',
            fontWeight: '900',
            display: 'block',
            margin: '0 auto 2.5rem auto'
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
