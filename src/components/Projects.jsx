import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X, Github, Youtube } from 'lucide-react'

// ─── Video Utilities & Modal ──────────────────────────────────────────────────
const getYoutubeId = (url) => {
  if (!url || url === '#') return null
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)
  return match ? match[1] : null
}
const embedUrl = (id) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`

const VideoModal = ({ video, onClose }) => (
  <AnimatePresence>
    {video && (
      <motion.div
        key="modal-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.88)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px',
        }}
      >
        <motion.div
          key="modal-box"
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%', maxWidth: '900px',
            borderRadius: '20px',
            overflow: 'hidden',
            background: '#0d1117',
            border: '1px solid rgba(239,68,68,0.3)',
            boxShadow: '0 0 80px rgba(239,68,68,0.25), 0 40px 80px rgba(0,0,0,0.6)',
          }}
        >
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
            <iframe
              src={embedUrl(video.id)}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            />
          </div>
          <div style={{
            padding: '16px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            <span style={{
              color: '#fff', fontWeight: 700, fontSize: '1rem',
              fontFamily: "'Inter', sans-serif",
            }}>{video.title}</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href={video.url}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 16px', borderRadius: '10px',
                  background: 'rgba(239,68,68,0.15)',
                  border: '1px solid rgba(239,68,68,0.4)',
                  color: '#f87171', fontSize: '13px', fontWeight: 600,
                  textDecoration: 'none', fontFamily: "'Inter', sans-serif",
                  transition: 'background 0.2s',
                }}
              >
                <ExternalLink size={14} /> Open on YouTube
              </a>
              <button
                onClick={onClose}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#94a3b8', cursor: 'pointer',
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

// ─── Project Data ────────────────────────────────────────────────────────────
const projectsData = [
  // {
  //   id: 4,
  //   category: 'Mini Projects',
  //   title: 'Color Guessing Game',
  //   emoji: '🎨',
  //   description: 'A fun interactive color guessing game where you test your skills at identifying the correct RGB color codes. Features multiple difficulty levels.',
  //   features: [
  //     'Randomized RGB color challenge engine',
  //     'Score tracking with multiple difficulty levels',
  //     'Pure vanilla JS with zero dependencies',
  //   ],
  //   liveLink: 'https://color-guesss-game.netlify.app/',
  //   codeLink: 'https://github.com/priyabratasahoo780/ColorGuessingGame',
  //   youtubeLink: 'https://youtu.be/XHeITLqG_Jw',
  //   tech: ['HTML', 'CSS', 'JavaScript'],
  //   image: '/color-guesser-logo.png',
  //   color: '#7b2fff',
  //   gradient: 'linear-gradient(145deg, #7b2fff, #4a00cc)',
  // },
  {
    id: 1,
    category: 'Clones',
    title: 'E-Commerce JioMart Clone',
    emoji: '🛒',
    description: 'A full-featured e-commerce platform clone with product listings, cart functionality, and seamless user experience mirroring the real JioMart website.',
    features: [
      'Dynamic product listings with search & filter functionality',
      'Shopping cart with real-time price calculation',
      'Fully responsive layout for all screen sizes',
    ],
    liveLink: 'https://jiomartcloneweb1.netlify.app',
    codeLink: 'https://github.com/priyabratasahoo780/WEBSITE-1.git',
    youtubeLink: 'https://youtu.be/f1LgMfOf48k?si=vrnRb94LG4cymF01',
    tech: ['React', 'CSS'],
    image: '/jiomart-clone.png',
    color: '#e63946',
    gradient: 'linear-gradient(145deg, #e63946, #9b1b30)',
  },
  // {
  //   id: 2,
  //   category: 'APIs',
  //   title: 'CryptoSlate Clone',
  //   emoji: '₿',
  //   description: 'A cryptocurrency news and data platform clone featuring real-time crypto information, market insights, and a sleek dashboard built with React.',
  //   features: [
  //     'Live crypto market data via API integration',
  //     'News feed with categorized crypto articles',
  //     'Responsive grid layout for market tracking',
  //   ],
  //   liveLink: 'https://cryptoslateclone.netlify.app/',
  //   codeLink: 'https://github.com/priyabratasahoo780/CryptoSlate',
  //   youtubeLink: 'https://youtu.be/XHeITLqG_Jw',
  //   tech: ['React', 'CSS', 'API'],
  //   image: '/cryptoslate-clone.png',
  //   color: '#f4813f',
  //   gradient: 'linear-gradient(145deg, #f4813f, #c45000)',
  // },
  // {
  //   id: 3,
  //   category: 'Clones',
  //   title: 'Namakwali Clone',
  //   emoji: '🏔️',
  //   description: 'A pixel-perfect clone of the Namakwali website, showcasing authentic Himalayan products with rich imagery and smooth CSS animations.',
  //   features: [
  //     'Authentic Himalayan product showcase with rich imagery',
  //     'Pixel-perfect UI replication with CSS mastery',
  //     'Smooth animations & hover interaction effects',
  //   ],
  //   liveLink: 'https://namakwali.vercel.app/',
  //   codeLink: 'https://github.com/priyabratasahoo780/namakwali',
  //   youtubeLink: 'https://youtu.be/XHeITLqG_Jw',
  //   tech: ['HTML', 'CSS'],
  //   image: '/namakwali-clone.png',
  //   color: '#2ec4b6',
  //   gradient: 'linear-gradient(145deg, #2ec4b6, #0e8a80)',
  // },
  // {
  //   id: 3,
  //   category: 'Clones',
  //   title: 'Bata Clone',
  //   emoji: '👟',
  //   description: 'A complete footwear e-commerce solution featuring a wide collection of shoes, sandals, and chappals for men and women using Bootstrap.',
  //   features: [
  //     'Product catalog with smart category filtering',
  //     'Bootstrap-powered responsive grid layout',
  //     'Detailed product pages with full sizing guide',
  //   ],
  //   liveLink: 'https://bataclone.netlify.app/',
  //   codeLink: 'https://github.com/priyabratasahoo780/bata-clone-website',
  //   youtubeLink: 'https://youtu.be/XHeITLqG_Jw',
  //   tech: ['HTML', 'CSS', 'Bootstrap'],
  //   image: '/bata-clone.png',
  //   color: '#f7b731',
  //   gradient: 'linear-gradient(145deg, #f7b731, #b88200)',
  // },
  {
    id: 6,
    category: 'Featured',
    title: 'Solinas Clone',
    emoji: '✨',
    description: 'A modern and responsive business website clone with stunning animated hero sections, scroll-based reveals, and elegant UI design.',
    features: [
      'Stunning hero section with entrance animations',
      'Smooth scroll-based content reveal effects',
      'Modern business card-style visual layout',
    ],
    liveLink: 'https://solinas-clone.vercel.app/',
    codeLink: 'https://github.com/priyabratasahoo780/solinas-Clone',
    youtubeLink: 'https://youtu.be/XHeITLqG_Jw?si=UZZokK4-xmmlnDgG',
    tech: ['HTML', 'CSS'],
    image: '/solinas-project.png',
    color: '#26c6da',
    gradient: 'linear-gradient(145deg, #26c6da, #006d77)',
  },
  {
    id: 7,
    category: 'Full-Stack Projects',
    title: 'PatilKaki Clone',
    emoji: '🍱',
    description: 'A brand-accurate clone of the PatilKaki e-commerce website featuring food product showcases, rich imagery, and a mobile-first design.',
    features: [
      'Food product showcase with rich brand imagery',
      'Brand-accurate UI with custom design elements',
      'Mobile-first fully responsive design approach',
    ],
    liveLink: 'https://patilkaki-waoy.vercel.app/',
    codeLink: 'https://github.com/priyabratasahoo780/PATILKAKI',
    youtubeLink: 'https://youtu.be/vY5vS69lDuI?si=QXiaWAYSes6EJn0h',
    tech: ['React', 'CSS'],
    image: '/patilkaki-clone.jpg',
    color: '#ff6b9d',
    gradient: 'linear-gradient(145deg, #ff6b9d, #a01050)',
  },
]

const FILTERS = ['All', 'Featured', 'Full-Stack Projects', 'APIs', 'Clones', 'Mini Projects']

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [activeVideo, setActiveVideo] = useState(null)
  const itemsPerPage = 6
  
  const filteredProjects = activeFilter === 'All' 
    ? projectsData 
    : projectsData.filter(proj => proj.category === activeFilter)

  // Pagination Logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilter])

  return (
    <section id="projects" className="section-pad" style={{ background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1600px', position: 'relative', zIndex: 1 }}>
        {/* Neon Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.3em',
              color: 'var(--neon-cyan)', textTransform: 'uppercase', marginBottom: 14,
              fontFamily: "'Inter',sans-serif",
              textShadow: '0 0 10px rgba(0, 243, 255, 0.4)'
            }}>— My Work</p>
            <h2 style={{ 
              fontSize: 'clamp(3.5rem, 8vw, 6rem)', 
              fontWeight: 900,
              marginBottom: '1rem',
              color: '#fff',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.04em',
              textShadow: '0 0 10px rgba(0, 243, 255, 0.5), 0 0 20px rgba(0, 243, 255, 0.3)'
            }}>
              Featured <span style={{ 
                background: 'linear-gradient(90deg, #06b6d4, #f472b6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 15px rgba(6, 182, 212, 0.6))'
              }}>Projects</span>
            </h2>
            <p style={{
              marginTop: 18, fontSize: 16, color: '#94a3b8',
              lineHeight: 1.75, fontFamily: "'Inter',sans-serif", maxWidth: '600px', margin: '0 auto'
            }}>
              A curated collection of my best work — explore each project in detail.
            </p>
          </motion.div>
        </div>

        {/* Neon Filter Pills */}
        <div className="projects-filter" style={{ marginBottom: '6rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {FILTERS.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`filter-btn-neon ${activeFilter === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Neon Projects Grid */}
        <motion.div 
          layout
          className="cert-grid"
        >
          <AnimatePresence mode='popLayout'>
            {currentItems.map((proj, index) => (
              <motion.div
                key={proj.title}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="cert-card-neon"
                style={{
                  border: `1px solid ${proj.color || '#06b6d4'}44`,
                }}
              >
                <div className="cert-img-box-neon" style={{ border: `1px solid ${proj.color || '#06b6d4'}33` }}>
                  <img src={proj.image} alt={proj.title} loading="lazy" />
                </div>

                <div className="cert-content-neon">
                  {/* Neon Category Tag */}
                  <div className="tag-neon" style={{
                    borderColor: proj.color || '#ec4899',
                    color: proj.color || '#ec4899',
                    boxShadow: `0 0 10px ${proj.color || '#ec4899'}44`
                  }}>
                    {proj.category}
                  </div>

                  <h3 style={{ 
                    fontFamily: "'Inter', sans-serif", 
                    fontWeight: 800, 
                    fontSize: '1.8rem',
                    color: '#fff',
                    lineHeight: 1.2,
                    textShadow: `0 0 10px ${proj.color || '#06b6d4'}33`
                  }}>
                    {proj.title}
                  </h3>

                  <p style={{
                    fontSize: 15,
                    color: '#94a3b8',
                    lineHeight: 1.6,
                    fontFamily: "'Inter', sans-serif",
                    marginBottom: '0.5rem',
                  }}>
                    {proj.description}
                  </p>

                  <div className="tech-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1rem' }}>
                    {proj.tech.map((t, i) => (
                      <span key={i} style={{
                        fontSize: '12px',
                        padding: '6px 12px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '20px',
                        color: '#bae6fd',
                        border: `1px solid ${proj.color}44`,
                        fontWeight: 600
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="cert-footer-icons" style={{ display: 'flex', gap: '18px', marginTop: 'auto', paddingTop: '1.2rem', justifyContent: 'flex-start', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    {proj.codeLink && proj.codeLink !== '#' && (
                      <button 
                        onClick={() => window.open(proj.codeLink, '_blank')}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8', transition: 'color 0.2s', padding: 0 }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                        title="GitHub"
                      >
                        <Github size={21} />
                      </button>
                    )}
                    {proj.youtubeLink && proj.youtubeLink !== '#' && (
                      <button 
                        onClick={() => {
                          const id = getYoutubeId(proj.youtubeLink);
                          if (id) {
                            setActiveVideo({ id, title: proj.title, url: proj.youtubeLink });
                          } else {
                            window.open(proj.youtubeLink, '_blank');
                          }
                        }}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8', transition: 'color 0.2s', padding: 0 }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                        title="YouTube"
                      >
                        <Youtube size={24} />
                      </button>
                    )}
                    {proj.liveLink && proj.liveLink !== '#' && (
                      <button 
                        onClick={() => window.open(proj.liveLink, '_blank')}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8', transition: 'color 0.2s', padding: 0 }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#a855f7'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                        title="Live Demo"
                      >
                        <ExternalLink size={21} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Neon Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination-neon-container">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="pagination-btn-neon"
            >
              ←
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`pagination-btn-neon ${currentPage === i + 1 ? 'active' : ''}`}
                style={{
                  boxShadow: currentPage === i + 1 ? '0 0 20px rgba(6, 182, 212, 0.5)' : 'none',
                  borderColor: currentPage === i + 1 ? '#06b6d4' : 'rgba(255,255,255,0.1)'
                }}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="pagination-btn-neon"
            >
              →
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div style={{
          padding: '80px 0 0 0',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
        }}>
          <motion.a
            href="https://github.com/priyabratasahoo780"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -4 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '15px 38px', borderRadius: 50,
              background: 'linear-gradient(135deg,#6366f1,#a855f7)',
              color: '#fff', fontSize: 14, fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(99,102,241,0.6), 0 0 20px rgba(168, 85, 247, 0.4)',
              fontFamily: "'Inter',sans-serif",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            View All Projects on GitHub
          </motion.a>
        </div>
      </div>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />

      <style>{`
        .filter-btn-neon {
          background: rgba(15, 23, 42, 0.6);
          color: #94a3b8;
          padding: 14px 32px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.4s ease;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .filter-btn-neon:hover {
          border-color: #06b6d4;
          color: #fff;
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.3);
        }

        .filter-btn-neon.active {
          background: #06b6d411;
          color: #06b6d4;
          border-color: #06b6d4;
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.4), inset 0 0 10px rgba(6, 182, 212, 0.2);
        }

        .cert-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .cert-card-neon {
          background: rgba(10, 15, 30, 0.7);
          backdrop-filter: blur(12px);
          border-radius: 36px;
          padding: 32px;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
        }

        .cert-card-neon:hover {
          transform: translateY(-20px) scale(1.02);
          box-shadow: 0 0 40px rgba(6, 182, 212, 0.3);
          background: rgba(15, 25, 50, 0.8);
        }

        .cert-img-box-neon {
          border-radius: 26px;
          overflow: hidden;
          position: relative;
          height: 200px;
        }

        .cert-img-box-neon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .cert-card-neon:hover .cert-img-box-neon img {
          transform: scale(1.1);
        }

        .overlay-neon {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.4s ease;
          cursor: pointer;
        }

        .cert-card-neon:hover .overlay-neon {
          opacity: 1;
        }

        .cert-content-neon {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          flex: 1;
        }

        .tag-neon {
          align-self: flex-start;
          padding: 8px 22px;
          border-radius: 30px;
          border: 1px solid;
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .btn-neon {
          padding: 12px;
          border-radius: 12px;
          border: none;
          color: #fff;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.4s ease;
        }

        .btn-neon:hover {
          transform: scale(1.05);
          filter: brightness(1.2);
        }

        .pagination-neon-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 25px;
          margin-top: 6rem;
        }

        .pagination-btn-neon {
          background: rgba(15, 23, 42, 0.4);
          color: #fff;
          width: 55px;
          height: 55px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
          font-size: 1.5rem;
          font-weight: 800;
        }

        .pagination-btn-neon:hover:not(:disabled) {
          border-color: #06b6d4;
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.3);
        }

        .pagination-btn-neon.active {
          background: #06b6d411;
          color: #06b6d4;
          border-color: #06b6d4;
        }

        .pagination-btn-neon:disabled {
          opacity: 0.2;
          cursor: not-allowed;
        }

        @media (max-width: 1400px) {
          .cert-grid { gap: 30px; }
        }

        @media (max-width: 1200px) {
          .cert-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .cert-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}

export default Projects
