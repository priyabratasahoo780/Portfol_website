import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Download } from 'lucide-react'
import { Helmet } from 'react-helmet'

const certificatesData = [
  {
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'June 2025',
    description: 'Foundation level understanding of AWS Cloud services and infrastructure.',
    category: 'Cloud',
    pdfUrl: '/certificates/Aws certificates.pdf',
    thumbnail: '/certificates/images/aws.png',
    color: '#FF9900'
  },
  {
    title: 'Coding for Data',
    issuer: 'Sololearn',
    date: 'March 2025',
    description: 'Successfully completed the course by demonstrating theoretical and practical understanding of data.',
    category: 'Data Science',
    pdfUrl: '/certificates/Aws certificates.pdf',
    thumbnail: '/certificates/images/html.png',
    color: '#FF9900'
  },
  {
    title: 'Generative AI',
    issuer: 'SheKunj',
    date: 'March 2025',
    description: 'By learning with SheKunj you have enlarged your vision, sharpened your expertise and made yourself ever more empowered.',
    category: 'Technology',
    pdfUrl: '/certificates/Generative Ai.pdf',
    thumbnail: '/certificates/images/generative_ai.png',
    color: '#ec4899'
  },
  {
    title: 'C Language Certification',
    issuer: 'Programming Institute',
    date: 'January 2025',
    description: 'Advanced C programming skills and system-level programming.',
    category: 'Programming',
    pdfUrl: '/certificates/C Language Certificates.pdf',
    thumbnail: '/certificates/images/c_language.png',
    color: '#00599C'
  },
  {
    title: 'CSS Certification',
    issuer: 'Simplilearn SkillUp',
    date: 'August 2024',
    description: 'Successfully completed Introduction to CSS course with verified skills.',
    category: 'Web Development',
    pdfUrl: '/certificates/css certificate.pdf',
    thumbnail: '/certificates/images/css.png',
    color: '#264de4'
  },
  {
    title: 'Frontend Developer Certificate',
    issuer: 'Simplilearn SkillUp',
    date: 'September 2024',
    description: 'Successfully completed Introduction to Front End Development course.',
    category: 'Web Development',
    pdfUrl: '/certificates/Frontend DEveloper Certificate.pdf',
    thumbnail: '/certificates/images/frontend.png',
    color: '#f06529'
  },
  {
    title: 'InnovAItion Hackathon',
    issuer: 'Unstop - DA-IICT',
    date: 'January 2025',
    description: 'Participated in InnovAItion - Shaping Future Innovators at Unstop Holiday Fest 2025.',
    category: 'Technology',
    pdfUrl: '/certificates/Hackathon Certificates.pdf',
    thumbnail: '/certificates/images/innovaition_hackathon.png',
    color: '#00eaff'
  },
  {
    title: 'National Building Hackathon',
    issuer: 'Unstop - NAMO',
    date: 'February 2026',
    description: 'Participated in NationBuilding Case Study Competition 2026 Online Quiz Round.',
    category: 'Technology',
    pdfUrl: '/certificates/National Building Certificates.pdf',
    thumbnail: '/certificates/images/national_building.png',
    color: '#60a5fa'
  }
]

const categories = ['All', 'Data Science', 'Technology', 'Cloud', 'Programming', 'Database', 'Web Development']

const Certificates = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  
  const filteredCertificates = activeCategory === 'All' 
    ? certificatesData 
    : certificatesData.filter(cert => cert.category === activeCategory)

  // Pagination Logic
  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredCertificates.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory])

  return (
    <section id="certificates" className="section-pad" style={{ background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}>
      <Helmet>
        <title>Certificates - Priyabrata Sahoo section</title>
        <meta name="description" content="Certificates Priyabrata Sahoo section" />
      </Helmet>
      <div className="container" style={{ maxWidth: '1600px', position: 'relative', zIndex: 1 }}>
        {/* Neon Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{ 
              fontSize: 'clamp(3.5rem, 8vw, 6rem)', 
              fontWeight: 900,
              marginBottom: '1rem',
              color: '#fff',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.04em',
              textShadow: '0 0 10px rgba(236, 72, 153, 0.5), 0 0 20px rgba(236, 72, 153, 0.3)'
            }}>
              My <span style={{ 
                background: 'linear-gradient(90deg, #06b6d4, #f472b6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 15px rgba(6, 182, 212, 0.6))'
              }}>Certificates</span>
            </h2>
          </motion.div>
        </div>

        {/* Neon Filter Pills */}
        <div className="projects-filter" style={{ marginBottom: '6rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`filter-btn-neon ${activeCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Neon Certificates Grid */}
        <motion.div 
          layout
          className="cert-grid"
        >
          <AnimatePresence mode='popLayout'>
            {currentItems.map((cert, index) => (
              <motion.div
                key={cert.title}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="cert-card-neon"
                style={{
                  border: `1px solid ${cert.color || '#06b6d4'}44`,
                }}
              >
                <div className="cert-img-box-neon" style={{ border: `1px solid ${cert.color || '#06b6d4'}33` }}>
                  <img src={cert.thumbnail} alt={cert.title} loading="lazy" />
                  <div className="overlay-neon" onClick={() => window.open(cert.pdfUrl, '_blank')} style={{ background: `${cert.color || '#06b6d4'}22` }}>
                  </div>
                </div>

                <div className="cert-content-neon">
                  {/* Neon Category Tag */}
                  <div className="tag-neon" style={{
                    borderColor: cert.color || '#ec4899',
                    color: cert.color || '#ec4899',
                    boxShadow: `0 0 10px ${cert.color || '#ec4899'}44`
                  }}>
                    {cert.category}
                  </div>

                  <h3 style={{ 
                    fontFamily: "'Inter', sans-serif", 
                    fontWeight: 800, 
                    fontSize: '1.8rem',
                    color: '#fff',
                    lineHeight: 1.2,
                    textShadow: `0 0 10px ${cert.color || '#06b6d4'}33`
                  }}>
                    {cert.title}
                  </h3>

                  <div className="cert-footer-neon">
                    <span style={{ color: '#fff', opacity: 0.8 }}>{cert.issuer}</span>
                    <span style={{ color: cert.color || '#06b6d4', fontWeight: 600 }}>{cert.date}</span>
                  </div>
                  
                  <button 
                    onClick={() => window.open(cert.pdfUrl, '_blank')}
                    className="btn-neon"
                    style={{
                      background: `linear-gradient(45deg, ${cert.color || '#ec4899'}, #a855f7)`,
                      boxShadow: `0 0 20px ${cert.color || '#ec4899'}66`
                    }}
                  >
                    Launch Certificate
                  </button>
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
      </div>

      <style>{`
        @keyframes float {
          from { transform: translate(0, 0); }
          to { transform: translate(50px, 30px); }
        }

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
          gap: 60px;
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
        }

        .cert-img-box-neon img {
          width: 100%;
          height: auto;
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
          margin-top: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
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

        .cert-footer-neon {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          margin-top: auto;
          padding-top: 1rem;
        }

        .btn-neon {
          width: 100%;
          padding: 20px;
          border-radius: 20px;
          border: none;
          color: #fff;
          font-weight: 900;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.4s ease;
          margin-top: 1rem;
        }

        .btn-neon:hover {
          transform: scale(1.03);
          filter: brightness(1.2);
          box-shadow: 0 0 30px rgba(236, 72, 153, 0.6);
        }

        .pagination-neon-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 25px;
          margin-top: 8rem;
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
          .cert-grid { gap: 40px; }
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

export default Certificates
