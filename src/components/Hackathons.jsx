import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Github, ExternalLink, Calendar, Code, X, Image as ImageIcon, ArrowRight, Camera, Users, Monitor, Cpu, Globe } from 'lucide-react'
import { Helmet } from 'react-helmet'

const hackathonsData = [
  {
    id: 'innovaition',
    title: 'InnovAItion Hackathon',
    achievement: 'Participant',
    issuer: 'DA-IICT (Unstop)',
    date: 'Jan 2025',
    project: 'AgriSaar - AI for Farmers',
    description: 'An AI-powered platform helping farmers with crop recommendation and disease detection.',
    fullDescription: 'AgriSaar is a comprehensive agricultural assistant that leverages Machine Learning to empower small-scale farmers. During this 24-hour hackathon, we built a system that analyzes soil data and local weather to recommend the most profitable crops while using Computer Vision to detect plant diseases from leaf photos.',
    tech: ['React', 'Python', 'ML', 'Firebase'],
    detailedTech: [
        { name: 'React', icon: <Monitor size={14} />, color: '#61dafb' },
        { name: 'FastAPI', icon: <Cpu size={14} />, color: '#05998b' },
        { name: 'TensorFlow', icon: <Cpu size={14} />, color: '#ff6f00' },
        { name: 'Firebase', icon: <Globe size={14} />, color: '#ffca28' }
    ],
    team: [
        { name: 'Priyabrata Sahoo', role: 'Full-Stack Developer', github: 'https://github.com/priyabratasahoo780' },
        { name: 'John Doe', role: 'ML Specialist', github: '#' },
        { name: 'Jane Smith', role: 'UI/UX Designer', github: '#' }
    ],
    link: 'https://github.com/priyabratasahoo780/AgriSaar',
    color: '#00f3ff',
    journey: [
        { image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80', label: 'Team Formation & Ideation', desc: 'Brainstorming the AgriSaar concept with the team.' },
        { image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80', label: '24H Code Sprint', desc: 'Powering through midnight to integrate ML models.' },
        { image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80', label: 'Final Polish', desc: 'Refining the UI for a seamless farmer experience.' },
        { image: 'https://images.unsplash.com/photo-1475721027187-4024733924f7?auto=format&fit=crop&q=80', label: 'Pitching Phase', desc: 'Presenting the solution to technical judges.' }
    ]
  },
  {
    id: 'nation-building',
    title: 'Nation Building Hackathon',
    achievement: 'Finalist',
    issuer: 'NAMO (Unstop)',
    date: 'Feb 2026',
    project: 'Smart Governance Portal',
    description: 'A platform designed to bridge the gap between citizens and local government bodies.',
    fullDescription: 'The Smart Governance Portal aims to digitize the interaction between local municipal bodies and citizens. Our solution introduced a real-time tracking system for public grievances, an automated budget transparency dashboard, and a direct communication channel for local leaders to share official updates.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    detailedTech: [
        { name: 'Next.js', icon: <Monitor size={14} />, color: '#ffffff' },
        { name: 'Node.js', icon: <Cpu size={14} />, color: '#68a063' },
        { name: 'PostgreSQL', icon: <Globe size={14} />, color: '#336791' },
        { name: 'Prisma', icon: <Cpu size={14} />, color: '#2d3748' }
    ],
    team: [
        { name: 'Priyabrata Sahoo', role: 'Lead Developer', github: 'https://github.com/priyabratasahoo780' },
        { name: 'Alex Wang', role: 'Backend Engineer', github: '#' },
        { name: 'Sarah Connor', role: 'DevOps', github: '#' }
    ],
    link: '#',
    color: '#60a5fa',
    journey: [
        { image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80', label: 'Initial Planning', desc: 'Defining governance challenges and portal features.' },
        { image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80', label: 'UI Prototyping', desc: 'Designing transparent tracking dashboards.' },
        { image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80', label: 'System Integration', desc: 'Developing the citizen feedback loop.' },
        { image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80', label: 'Final Presentation', desc: 'Discussing impact potential at a national scale.' }
    ]
  },
  {
    id: 'sih-2024',
    title: 'Smart India Hackathon',
    achievement: 'Internal Winner',
    issuer: 'Ministry of Education',
    date: 'Sept 2024',
    project: 'Coal Mine Safety System',
    description: 'IoT-based real-time monitoring and alert system for underground coal mines.',
    fullDescription: 'The Coal Mine Safety System is a hardware-integrated software platform designed for the extreme conditions of underground mines. Using multiple gas sensors and humidity trackers, the system predicts unsafe environments and triggers automatic alerts to both ground workers and remote control centers.',
    tech: ['IoT', 'Arduino', 'C++', 'Dashboard'],
    detailedTech: [
        { name: 'Arduino', icon: <Cpu size={14} />, color: '#00979d' },
        { name: 'C++', icon: <Cpu size={14} />, color: '#00599c' },
        { name: 'MQTT', icon: <Globe size={14} />, color: '#3c5280' },
        { name: 'React', icon: <Monitor size={14} />, color: '#61dafb' }
    ],
    team: [
        { name: 'Priyabrata Sahoo', role: 'IoT & Web Lead', github: 'https://github.com/priyabratasahoo780' },
        { name: 'Michael Brown', role: 'Hardware Design', github: '#' },
        { name: 'Emma Wilson', role: 'Embedded Logic', github: '#' }
    ],
    link: '#',
    color: '#fbbf24',
    journey: [
        { image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80', label: 'Hardware Assembly', desc: 'Prototyping gas sensors and alert systems.' },
        { image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80', label: 'Calibration', desc: 'Testing real-time data transmission from sensors.' },
        { image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80', label: 'Internal Round Win', desc: 'Proud moment with the winning coal safety dashboard.' }
    ]
  }
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
            <Helmet>
        <title>Hackathons - Priyabrata Sahoo section</title>
        <meta name="description" content="Hackathons Priyabrata Sahoo section" />
      </Helmet>
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
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px', marginBottom: '18px', position: 'relative', zIndex: 1 }}>
                  <Calendar size={14} />
                  <span>{h.date}</span>
                  <span style={{ opacity: 0.3 }}>|</span>
                  <span>{h.issuer}</span>
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
                    View Stories <ArrowRight size={14} />
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
