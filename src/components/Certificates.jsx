import { useEffect, useRef, useState } from 'react'
import { Eye, Download } from 'lucide-react'
import gsap from 'gsap'

const certificatesData = [
  {
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    description: 'Foundation level understanding of AWS Cloud services and infrastructure.',
    category: 'Cloud',
    pdfUrl: '/certificates/Aws certificates.pdf',
    thumbnail: '/certificates/images/aws.png'
  },
  {
    title: 'C Language Certification',
    issuer: 'Programming Institute',
    description: 'Advanced C programming skills and system-level programming.',
    category: 'Programming',
    pdfUrl: '/certificates/C Language Certificates.pdf',
    thumbnail: '/certificates/images/c_language.png'
  },
  {
    title: 'CSS Certification',
    issuer: 'Simplilearn SkillUp',
    description: 'Successfully completed Introduction to CSS course with verified skills.',
    category: 'Web Development',
    pdfUrl: '/certificates/css certificate.pdf',
    thumbnail: '/certificates/images/css.png'
  },
  {
    title: 'Frontend Developer Certificate',
    issuer: 'Simplilearn SkillUp',
    description: 'Successfully completed Introduction to Front End Development course.',
    category: 'Web Development',
    pdfUrl: '/certificates/Frontend DEveloper Certificate.pdf',
    thumbnail: '/certificates/images/frontend.png'
  },
  {
    title: 'InnovAItion Hackathon',
    issuer: 'Unstop - DA-IICT Gandhinagar',
    description: 'Participated in InnovAItion - Shaping Future Innovators at Unstop Holiday Fest 2025.',
    category: 'Technology',
    pdfUrl: '/certificates/Hackathon Certificates.pdf',
    thumbnail: '/certificates/images/innovaition_hackathon.png'
  },
  {
    title: 'National Building Hackathon',
    issuer: 'Unstop - NAMO',
    description: 'Participated in NationBuilding Case Study Competition 2026 Online Quiz Round.',
    category: 'Technology',
    pdfUrl: '/certificates/National Building Certificates.pdf',
    thumbnail: '/certificates/images/national_building.png'
  },
  {
    title: 'Web Development with ChatGPT',
    issuer: 'Simplilearn SkillUp',
    description: 'Successfully completed Introduction to Web Development with ChatGPT course.',
    category: 'Web Development',
    pdfUrl: '/certificates/Web Development with Chatgpt Certificate.pdf',
    thumbnail: '/certificates/images/chatgpt_webdev.png'
  },
  {
    title: 'IIT Madras Hackathon',
    issuer: 'Unstop - IIT Madras',
    description: 'Participated in Appian AI Application Challenge 2026 Shaastra 2026 organized by IIT Madras.',
    category: 'Technology',
    pdfUrl: '/certificates/iit madras certificate.pdf',
    thumbnail: '/certificates/images/iit_madras.png'
  },
  {
    title: 'Generative AI Certificate',
    issuer: 'Simplilearn SkillUp',
    description: 'Successfully completed Generative AI for Beginners course.',
    category: 'Technology',
    pdfUrl: '/certificates/Generative Ai.pdf',
    thumbnail: '/certificates/images/generative_ai.png'
  },
  {
    title: 'GitHub Copilot Fundamentals',
    issuer: 'Microsoft & Simplilearn SkillUp',
    description: 'Successfully completed GitHub Copilot Fundamentals course.',
    category: 'Technology',
    pdfUrl: '/certificates/Github Copilot Fundamentals.pdf',
    thumbnail: '/certificates/images/github_copilot.png'
  },
  {
    title: 'JavaScript for Beginners',
    issuer: 'Simplilearn SkillUp',
    description: 'Successfully completed JavaScript for Beginners course.',
    category: 'Programming',
    pdfUrl: '/certificates/Javascript Cetificate.pdf',
    thumbnail: '/certificates/images/javascript.png'
  },
  {
    title: 'Introduction to HTML',
    issuer: 'Sololearn',
    description: 'Successfully completed Introduction to HTML course by demonstrating theoretical and practical understanding.',
    category: 'Web Development',
    pdfUrl: '/certificates/Html Certificates.pdf',
    thumbnail: '/certificates/images/html.png'
  }
]

const categories = ['All', 'Cloud', 'Programming', 'Web Development', 'Technology']

const Certificates = () => {
  const sectionRef = useRef(null)
  const starsRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('All')

  // Galaxy Twinkling Stars Animation
  useEffect(() => {
    if (!starsRef.current) return

    const starsContainer = starsRef.current
    const numStars = 150

    // Create stars
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div')
      star.className = 'galaxy-star'
      star.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: ${i % 3 === 0 ? '#60a5fa' : i % 3 === 1 ? '#a78bfa' : '#fbbf24'};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        box-shadow: 0 0 ${Math.random() * 10 + 5}px currentColor;
      `
      starsContainer.appendChild(star)

      // GSAP Twinkling Animation
      gsap.to(star, {
        opacity: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: Math.random() * 2
      })

      // Subtle movement
      gsap.to(star, {
        x: `+=${Math.random() * 20 - 10}`,
        y: `+=${Math.random() * 20 - 10}`,
        duration: Math.random() * 10 + 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }

    return () => {
      starsContainer.innerHTML = ''
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
          }
        })
      },
      { threshold: 0.15 }
    )

    const elements = sectionRef.current.querySelectorAll('.hidden')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const filteredCertificates = activeCategory === 'All' 
    ? certificatesData 
    : certificatesData.filter(cert => cert.category === activeCategory)

  const handleViewCertificate = (pdfUrl) => {
    window.open(pdfUrl, '_blank')
  }

  const handleDownloadCertificate = (pdfUrl, title) => {
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = `${title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="certificates" className="section-pad" ref={sectionRef} style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px', position: 'relative', overflow: 'hidden' }}>
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
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-heading hidden text-center" style={{ 
          fontSize: '3rem', 
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Certifications & Awards
        </h2>
        
        {/* Category Filter Buttons */}
        <div className="projects-filter hidden text-center" style={{ marginBottom: '3rem' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              style={{
                margin: '0.5rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: activeCategory === category ? '2px solid #60a5fa' : '2px solid transparent',
                background: activeCategory === category ? 'rgba(96, 165, 250, 0.1)' : 'rgba(30, 41, 59, 0.5)',
                color: activeCategory === category ? '#60a5fa' : '#fff',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: '600'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="cert-grid hidden" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          {filteredCertificates.map((cert, index) => (
            <div 
              className="cert-card" 
              key={index}
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(96, 165, 250, 0.2)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(96, 165, 250, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden' }}>
                <img 
                  src={cert.thumbnail} 
                  alt={cert.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              
              <div style={{ padding: '1.5rem' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  background: 'rgba(96, 165, 250, 0.1)',
                  border: '1px solid rgba(96, 165, 250, 0.3)',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  color: '#60a5fa',
                  marginBottom: '1rem'
                }}>
                  {cert.category}
                </span>

                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  color: '#fff'
                }}>
                  {cert.title}
                </h3>

                <p style={{
                  fontSize: '0.9rem',
                  color: 'rgba(147, 197, 253, 0.8)',
                  marginBottom: '0.75rem'
                }}>
                  {cert.issuer}
                </p>

                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  {cert.description}
                </p>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => handleViewCertificate(cert.pdfUrl)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(96, 165, 250, 0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <Eye size={18} />
                    View PDF
                  </button>

                  <button
                    onClick={() => handleDownloadCertificate(cert.pdfUrl, cert.title)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(139, 92, 246, 0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <Download size={18} />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certificates
