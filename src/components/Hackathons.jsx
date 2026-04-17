import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Github, ExternalLink, Calendar, Code, X, Image as ImageIcon, ArrowRight, Camera, Users, Monitor, Cpu, Globe } from 'lucide-react'



const hackathonsData = [
  {
    id: 'artpark-codeforge',
    title: 'ArtPark CodeForge Hackathon',
    achievement: 'Participant',
    issuer: 'ArtPark (IISc)',
    date: 'Apr 2026',
    project: 'CodeForge AI — Intelligent Career Assistant',
    description: 'An AI-powered career assistant that analyzes resumes, detects skill gaps, and generates personalized DAG-powered learning roadmaps with Gemini 2.0 Flash.',
    fullDescription: 'CodeForge AI is a precision instrument for career growth built during a 48-hour ArtPark Hackathon at IISc. It leverages Google Gemini 2.0 Flash for semantic skill extraction from resumes and job descriptions, then computes gaps using fuzzy matching. A DAG engine performs Kahn\'s topological sort to generate logically ordered learning roadmaps — ensuring you learn prerequisites first (e.g., Variables → Functions → APIs). A dynamic Readiness Score updates in real time as skills are mastered. Deployed live on Vercel (frontend) and Render (backend).',
    tech: ['React', 'FastAPI', 'Gemini AI', 'Python'],
    detailedTech: [
        { name: 'React + Vite', icon: <Monitor size={14} />, color: '#61dafb' },
        { name: 'FastAPI', icon: <Cpu size={14} />, color: '#05998b' },
        { name: 'Gemini 2.0 Flash', icon: <Globe size={14} />, color: '#4285f4' },
        { name: 'Python', icon: <Cpu size={14} />, color: '#f7c948' },
        { name: 'Docker', icon: <Cpu size={14} />, color: '#2496ed' },
        { name: 'DAG Algorithm', icon: <Code size={14} />, color: '#a78bfa' }
    ],
    team: [
        { name: 'Priyabrata Sahoo', role: 'Full-Stack & AI Lead', github: 'https://github.com/priyabratasahoo780' }
    ],
    liveLink: 'https://art-park-code-forge-hackathon-nine.vercel.app/',
    link: 'https://github.com/priyabratasahoo780/ArtPark_CodeForge_Hackathon',
    color: '#a78bfa',
    journey: [
        { image: '/assets/iisc.png', label: 'Problem Framing', desc: 'Identifying the resume-to-job gap with Gemini AI semantic analysis.' },
        { image: '/assets/image copy.png', label: 'DAG Engine Build', desc: 'Implementing Kahn\'s topological sort for prerequisite-first roadmaps.' },
        { image: '/assets/image.png', label: 'Neural Roadmap UI', desc: 'Rendering SVG skill graphs with real-time readiness scoring.' },
        // { image: '/assets/image3.png', label: 'Live Deployment', desc: 'Shipping to Vercel & Render within the 48-hour window.' }
    ]
  },
  {
    id: 'gandhinagar-agrisaar',
    title: 'Crafthon Hackathon',
    achievement: 'Participant',
    issuer: 'GandhiNagar University (Unstop)',
    date: 'March 2026',
    project: 'AgriSaar — Smart Farming AI',
    description: 'An AI-powered decision support system helping farmers with crop recommendations, fertilizer plans, soil health scoring, and weather-aware suggestions.',
    fullDescription: 'AgriSaar is a comprehensive agricultural intelligence platform built during the InnovAItion Hackathon at DA-IICT, GandhiNagar. It analyzes soil reports (PDF/image or manual input) to generate a soil health score (0–100), recommend optimal crops with suitability scores, and produce tailored fertilizer advisory with timing. Powered by Google Gemini 2.5 Flash for LLM-based reasoning, it integrates OpenWeather API for real-time weather alerts and includes government scheme eligibility (e.g., PM-Kisan), Hinglish explanations, and a step-by-step farming roadmap.',
    tech: ['React', 'Node.js', 'Gemini AI', 'OpenWeather'],
    detailedTech: [
        { name: 'React.js', icon: <Monitor size={14} />, color: '#61dafb' },
        { name: 'Node.js', icon: <Cpu size={14} />, color: '#68a063' },
        { name: 'Express.js', icon: <Cpu size={14} />, color: '#ffffff' },
        { name: 'Gemini 2.5 Flash', icon: <Globe size={14} />, color: '#4285f4' },
        { name: 'OpenWeather API', icon: <Globe size={14} />, color: '#f97316' },
        { name: 'Tailwind CSS', icon: <Monitor size={14} />, color: '#38bdf8' }
    ],
    team: [
        { name: 'Priyabrata Sahoo', role: 'Full-Stack Developer', github: 'https://github.com/priyabratasahoo780' },
        { name: 'Abdul Haque', role: 'AI & Backend', github: 'https://github.com/abdulhaque2005' }
    ],
    liveLink: 'https://agrisaar-project.vercel.app/',
    link: 'https://github.com/abdulhaque2005/AgriSaar',
    color: '#4ade80',
    journey: [
        { image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80', label: 'Problem Identification', desc: 'Understanding soil analysis gaps faced by small-scale farmers.' },
        { image: 'https://res.cloudinary.com/dtw64z2mf/image/upload/v1776452949/WhatsApp_Image_2026-04-18_at_12.37.23_AM_zma2ba.jpg', label: 'AI Core Logic', desc: 'Developing the soil intelligence engine.' },
        { image: 'https://res.cloudinary.com/dtw64z2mf/image/upload/q_auto/f_auto/v1776452946/WhatsApp_Image_2026-04-17_at_9.38.32_PM_1_qgipu3.jpg', label: 'Team Collaboration', desc: 'Building AgriSaar with Abdul Haque.' },
        { image: 'https://res.cloudinary.com/dtw64z2mf/image/upload/q_auto/f_auto/v1776452947/WhatsApp_Image_2026-04-17_at_9.38.32_PM_zi8zha.jpg', label: 'Live Prototyping', desc: 'Working on the real-time weather integration.' }
    ]
  },
]

const JourneyModal = ({ hackathon, onClose }) => {
    if (!hackathon) return null

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                background: 'rgba(5, 8, 22, 0.98)',
                backdropFilter: 'blur(20px)'
            }}
            onClick={onClose}
        >
            <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                style={{
                    width: '100%',
                    maxWidth: '1400px',
                    height: '92vh',
                    background: 'rgba(15, 23, 42, 0.4)',
                    borderRadius: '40px',
                    border: `1px solid ${hackathon.color}44`,
                    boxShadow: `0 0 50px ${hackathon.color}11`,
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 20000
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div style={{ padding: '25px 40px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                         <div style={{ background: `${hackathon.color}22`, padding: '10px', borderRadius: '12px' }}>
                            <Trophy size={20} color={hackathon.color} />
                         </div>
                         <div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fff', margin: 0, fontFamily: "'Inter', sans-serif" }}>
                                {hackathon.title}
                            </h2>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '2px' }}>{hackathon.issuer} • {hackathon.date}</p>
                         </div>
                    </div>
                    <button 
                        onClick={onClose}
                        style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#fff',
                            cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.3s',
                            zIndex: 10
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'rgba(255,50,50,0.2)'}
                        onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Main Content Area: Split Pane */}
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0, flexDirection: window.innerWidth < 1024 ? 'column' : 'row' }}>
                    
                    {/* Left: Project Specs & Team (Dashboard Sidebar) */}
                    <div style={{ 
                        flex: window.innerWidth < 1024 ? 'none' : '0 0 450px', 
                        borderRight: window.innerWidth < 1024 ? 'none' : '1px solid rgba(255,255,255,0.05)',
                        borderBottom: window.innerWidth < 1024 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                        padding: '40px',
                        overflowY: 'auto',
                        background: 'rgba(0,0,0,0.1)'
                    }}>
                        {/* Project Description */}
                        <div style={{ marginBottom: '40px' }}>
                            <p style={{ color: hackathon.color, fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>Overview</p>
                            <p style={{ color: '#cbd5e1', fontSize: '16px', lineHeight: 1.7, fontWeight: 500 }}>{hackathon.fullDescription}</p>
                        </div>

                        {/* Tech Stacks Area */}
                        <div style={{ marginBottom: '40px' }}>
                            <p style={{ color: hackathon.color, fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '14px' }}>Tech Architecture</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                {hackathon.detailedTech.map((t, ti) => (
                                    <div key={ti} style={{
                                        padding: '10px 14px',
                                        borderRadius: '12px',
                                        background: `${t.color}11`,
                                        border: `1px solid ${t.color}22`,
                                        display: 'flex', alignItems: 'center', gap: '8px'
                                    }}>
                                        <div style={{ color: t.color }}>{t.icon}</div>
                                        <span style={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}>{t.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Team Section */}
                        <div>
                            <p style={{ color: hackathon.color, fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '14px' }}>Teammates & Roles</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {hackathon.team.map((m, mi) => (
                                    <div 
                                        key={mi}
                                        onClick={() => m.github !== '#' && window.open(m.github, '_blank')}
                                        style={{
                                            padding: '14px 18px',
                                            borderRadius: '16px',
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.06)',
                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                            cursor: m.github !== '#' ? 'pointer' : 'default',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                        className="team-card"
                                    >
                                        <div>
                                            <p style={{ color: '#fff', fontSize: '14px', fontWeight: 800, margin: 0 }}>{m.name}</p>
                                            <p style={{ color: '#64748b', fontSize: '12px', margin: '2px 0 0 0' }}>{m.role}</p>
                                        </div>
                                        {m.github !== '#' && (
                                            <Github size={16} style={{ color: hackathon.color, opacity: 0.5 }} className="team-git-icon" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Journey Gallery (Visuals) */}
                    <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                         <p style={{ color: hackathon.color, fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '24px' }}>Photo Journey</p>
                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
                             {hackathon.journey.map((step, si) => (
                                <motion.div 
                                    key={si}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: si * 0.1 }}
                                    style={{ 
                                        background: 'rgba(0,0,0,0.3)', 
                                        borderRadius: '24px', 
                                        overflow: 'hidden', 
                                        border: '1px solid rgba(255,255,255,0.04)' 
                                    }}
                                >
                                    <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', position: 'relative' }}>
                                        <img 
                                            src={step.image} 
                                            alt={step.label} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            top: '12px', right: '12px',
                                            padding: '4px 10px',
                                            borderRadius: '8px',
                                            background: 'rgba(0,0,0,0.8)',
                                            color: '#fff',
                                            fontSize: '10px',
                                            fontWeight: 900,
                                            border: '1px solid rgba(255,255,255,0.1)'
                                        }}>
                                            STEP 0{si+1}
                                        </div>
                                    </div>
                                    <div style={{ padding: '20px' }}>
                                        <h4 style={{ color: '#fff', fontWeight: 800, fontSize: '1rem', marginBottom: '6px' }}>{step.label}</h4>
                                        <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.5 }}>{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                         </div>
                    </div>
                </div>

                <style>{`
                    .team-card:hover {
                        background: ${hackathon.color}11 !important;
                        border-color: ${hackathon.color}44 !important;
                        transform: translateX(8px);
                    }
                    .team-card:hover .team-git-icon {
                        opacity: 1 !important;
                        transform: scale(1.1);
                    }
                `}</style>
            </motion.div>
        </motion.div>
    )
}

const Hackathons = () => {
  const [filter, setFilter] = useState('All')
  const [selectedHackathon, setSelectedHackathon] = useState(null)

  useEffect(() => {
    if (selectedHackathon) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'auto'
    }
  }, [selectedHackathon])

  const filteredHackathons = filter === 'All' 
    ? hackathonsData 
    : hackathonsData.filter(h => h.achievement.includes(filter))

  return (
    <section id="hackathons" className="section-pad" style={{ background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}>
      {/* Background Decorative Elements */}
      <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0, 243, 255, 0.1) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: 0 }} />

      <div className="container" style={{ maxWidth: '1400px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
             <p style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.3em',
                color: 'var(--neon-cyan)', textTransform: 'uppercase', marginBottom: 14,
                fontFamily: "'Inter',sans-serif",
                textShadow: '0 0 10px rgba(0, 243, 255, 0.4)'
              }}>— Competition History</p>
            <h2 style={{ 
              fontSize: 'clamp(3rem, 6vw, 5rem)', 
              fontWeight: 900,
              color: '#fff',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.04em',
              textShadow: '0 0 15px rgba(0, 243, 255, 0.3)'
            }}>
              Hackathon <span style={{ 
                background: 'linear-gradient(90deg, #00f3ff, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Showcase</span>
            </h2>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '4rem', flexWrap: 'wrap' }}>
          {['All', 'Winner', 'Finalist', 'Participant'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                padding: '10px 24px',
                borderRadius: '12px',
                border: filter === tab ? '1px solid #00f3ff' : '1px solid rgba(255,255,255,0.1)',
                background: filter === tab ? 'rgba(0, 243, 255, 0.1)' : 'rgba(15, 23, 42, 0.6)',
                color: filter === tab ? '#00f3ff' : '#94a3b8',
                fontWeight: 700,
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: filter === tab ? '0 0 15px rgba(0, 243, 255, 0.3)' : 'none'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '30px' 
          }}
        >
          <AnimatePresence mode='popLayout'>
            {filteredHackathons.map((h, index) => (
              <motion.div
                key={h.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '24px',
                  border: `1px solid ${h.color}33`,
                  padding: '24px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedHackathon(h)}
              >
                {/* Header with Title and Prize Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                  <div style={{ 
                    background: `${h.color}22`, 
                    padding: '10px', 
                    borderRadius: '14px',
                    border: `1px solid ${h.color}44`
                  }}>
                    <Trophy size={20} color={h.color} />
                  </div>
                  <div style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    background: `${h.color}22`,
                    border: `1px solid ${h.color}44`,
                    fontSize: '11px',
                    fontWeight: 800,
                    color: h.color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    {h.achievement}
                  </div>
                </div>

                <h3 style={{ 
                  color: '#fff', 
                  fontSize: '1.5rem', 
                  fontWeight: 900, 
                  marginBottom: '6px',
                  fontFamily: "'Inter', sans-serif",
                  position: 'relative', zIndex: 1 
                }}>{h.title}</h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                  <Calendar size={14} />
                  <span>{h.date}</span>
                  <span style={{ opacity: 0.3 }}>|</span>
                  <span>{h.issuer}</span>
                </div>

                {/* Continuous Scroll Images */}
                <div style={{
                  width: 'calc(100% + 48px)',
                  marginLeft: '-24px',
                  marginBottom: '20px',
                  overflow: 'hidden',
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                }}>
                  <motion.div 
                    animate={{ x: [0, '-50%'] }}
                    transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                    style={{ flexShrink: 0, display: 'flex', gap: '10px', height: '100px', padding: '0 10px' }}
                  >
                    {[...h.journey, ...h.journey, ...h.journey, ...h.journey].map((step, i) => (
                      <div key={i} style={{ width: '160px', height: '100%', flexShrink: 0, borderRadius: '12px', overflow: 'hidden', border: `1px solid ${h.color}33` }}>
                        <img src={step.image} alt="hackathon moment" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </motion.div>
                </div>

                <div style={{ 
                  background: 'rgba(0,0,0,0.3)', 
                  borderRadius: '16px', 
                  padding: '16px', 
                  marginBottom: '20px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  position: 'relative', zIndex: 1
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Code size={16} color={h.color} />
                    <span style={{ color: h.color, fontWeight: 700, fontSize: '14px' }}>{h.project}</span>
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: 1.6 }}>{h.description}</p>
                </div>

                <div style={{ display: 'flex', gap: '12px', position: 'relative', zIndex: 1 }}>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      if(h.liveLink !== '#') window.open(h.liveLink, '_blank'); 
                    }}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = h.color + '22'
                        e.target.style.borderColor = h.color
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255,255,255,0.05)'
                        e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                    }}
                  >
                    Live Demo <ExternalLink size={14} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); window.open(h.link, '_blank'); }}
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,100,0.2)',
                      color: '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    <Github size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
          {selectedHackathon && (
              <JourneyModal 
                  hackathon={selectedHackathon} 
                  onClose={() => setSelectedHackathon(null)} 
              />
          )}
      </AnimatePresence>
    </section>
  )
}

export default Hackathons
