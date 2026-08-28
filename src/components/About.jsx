import { useRef } from 'react'
import { Activity, BookOpen, Cpu, Award, Globe, Heart } from 'lucide-react'
import { motion, useInView } from 'framer-motion'

const About = () => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const stats = [
    { label: 'Cricket', icon: Activity, desc: 'Teamwork & Focus', color: '#00f3ff' },
    { label: 'Reading', icon: BookOpen, desc: 'Continuous Learning', color: '#bf00ff' },
    { label: 'Technology', icon: Cpu, desc: 'Problem Solving', color: '#ff00ff' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section id="about" className="about-section-premium" ref={containerRef}>
      {/* Dynamic Background Elements */}
      <div className="about-bg-glow top-right" />
      <div className="about-bg-glow bottom-left" />
      
      <div className="container">
        <motion.div 
          className="about-header"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
        >
          <span className="about-subtitle">Get To Know Me</span>
          <h2 className="about-main-title">
            Behind the <span className="text-gradient">Code</span>
          </h2>
        </motion.div>

        <div className="about-content-wrapper">
          {/* Narrative */}
          <motion.div 
            className="about-narrative"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="bio-card-glass">
              <p className="bio-intro">
                Hello! I'm <span className="highlight">Priyabrata Sahoo</span>, a computer science enthusiast 
                from Surat, Gujarat, currently honing my skills in <span className="highlight-alt">Full-Stack Development</span>.
              </p>
              
              <p className="bio-description">
                Currently pursuing my B.Tech at SwamiNarayan University, I've developed a deep passion 
                for solving complex problems through technology. My journey started with a curiosity 
                about how things work, and evolved into a drive to build scalable and efficient 
                digital solutions.
              </p>

              <div className="quick-tags">
                <span className="tag-pill"><Award size={14} className="tag-icon-accent" /> B.Tech Student (S.N University)</span>
                <span className="tag-pill"><Globe size={14} /> Surat, India</span>
                <span className="tag-pill"><Cpu size={14} /> CSE Student</span>
                <span className="tag-pill"><Heart size={14} /> Tech Explorer</span>
              </div>
            </motion.div>

            {/* Stats/Hobby Grid */}
            <div className="stats-grid-about">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="stat-card-glass"
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <div className="stat-icon-box" style={{ '--icon-color': stat.color }}>
                    <stat.icon size={22} />
                  </div>
                  <div className="stat-info">
                    <h4 className="stat-label">{stat.label}</h4>
                    <p className="stat-desc">{stat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .about-section-premium {
          position: relative;
          padding: 120px 0;
          background: var(--bg-main);
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .about-bg-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          filter: blur(150px);
          opacity: 0.05;
          z-index: 0;
          pointer-events: none;
        }

        .top-right {
          top: -10%;
          right: -10%;
          background: var(--neon-cyan);
        }

        .bottom-left {
          bottom: -10%;
          left: -10%;
          background: var(--neon-purple);
        }

        .about-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .about-subtitle {
          color: var(--neon-cyan);
          text-transform: uppercase;
          letter-spacing: 0.3em;
          font-size: 0.75rem;
          font-weight: 800;
          display: block;
          margin-bottom: 12px;
        }

        .about-main-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.02em;
        }

        .text-gradient {
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .about-content-wrapper {
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
        }

        .tag-icon-accent {
          color: var(--neon-cyan);
        }

        .about-narrative {
          display: flex;
          flex-direction: column;
          gap: 30px;
          width: 100%;
        }

        .bio-card-glass {
          padding: 40px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 30px;
          backdrop-filter: blur(20px);
        }

        .bio-intro {
          font-size: 1.4rem;
          color: #f1f5f9;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 20px;
        }

        .bio-description {
          color: #94a3b8;
          line-height: 1.8;
          font-size: 1.05rem;
          margin-bottom: 25px;
        }

        .highlight { color: var(--neon-cyan); }
        .highlight-alt { color: var(--neon-purple); }

        .quick-tags {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .tag-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 50px;
          color: #bae6fd;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .stats-grid-about {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .stat-card-glass {
          padding: 24px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          cursor: pointer;
        }

        .stat-icon-box {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.03);
          color: var(--icon-color);
          box-shadow: 0 0 15px var(--icon-color) opacity 0.2;
        }

        .stat-label {
          color: #fff;
          font-weight: 700;
          font-size: 0.95rem;
          margin-bottom: 4px;
        }

        .stat-desc {
          color: #64748b;
          font-size: 0.8rem;
          line-height: 1.4;
        }

        @media (max-width: 1024px) {
          .about-content-wrapper { gap: 40px; }
          .stats-grid-about { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .stats-grid-about { grid-template-columns: 1fr; }
          .bio-card-glass { padding: 25px; }
        }
      `}</style>
    </section>
  )
}

export default About
