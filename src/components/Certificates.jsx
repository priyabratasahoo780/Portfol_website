import { useEffect, useRef, useState } from 'react'
import { Eye, Download, ChevronLeft, ChevronRight } from 'lucide-react'
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
  const trackRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('All')
  
  // Slider State
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  // Filter certificates
  const filteredCertificates = activeCategory === 'All' 
    ? certificatesData 
    : certificatesData.filter(cert => cert.category === activeCategory)

  // Update items per page on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerPage(1)
      else if (window.innerWidth < 1024) setItemsPerPage(2)
      else setItemsPerPage(3)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0)
    if (trackRef.current) {
        gsap.to(trackRef.current, { x: 0, duration: 0.5, ease: 'power2.out' })
    }
  }, [activeCategory])

  // Enhanced Slider Animation (Sequence + Slide)
  useEffect(() => {
    if (!trackRef.current) return
    
    const percent = -(currentIndex * (100 / itemsPerPage))
    
    // 1. Move Track
    gsap.to(trackRef.current, {
      xPercent: percent,
      duration: 0.8,
      ease: 'expo.inOut'
    })

    // 2. Animate VISIBLE items (Staggered Entrance)
    // We calculate which items are currently visible based on currentIndex
    // and animate them to give a "shuffle" feel.
    const visibleCards = trackRef.current.children
    const start = currentIndex
    const end = Math.min(currentIndex + itemsPerPage, filteredCertificates.length)
    
    // Animate ONLY the new cards connecting in
    for (let i = start; i < end; i++) {
        if (visibleCards[i]) {
            const cardInner = visibleCards[i].querySelector('.cert-card-inner')
            gsap.fromTo(cardInner, 
                { scale: 0.9, opacity: 0.5, y: 20, rotationX: 10 },
                { 
                    scale: 1, 
                    opacity: 1, 
                    y: 0, 
                    rotationX: 0,
                    duration: 0.8, 
                    ease: 'elastic.out(1, 0.75)',
                    delay: (i - start) * 0.1 // Stagger
                }
            )
        }
    }

  }, [currentIndex, itemsPerPage, filteredCertificates.length]) // Re-run when index changes

  // Galaxy Background Animation
  useEffect(() => {
    // ... (existing code)
  }, []) // Keeping the previous effect end to help match? No, replace_file_content needs context.
  
  // Pill Animation Effect
  useEffect(() => {
      const activeBtn = document.querySelector('.filter-btn.active')
      const pill = document.querySelector('.active-pill')
      if (activeBtn && pill) {
          gsap.to(pill, {
              width: activeBtn.offsetWidth,
              x: activeBtn.offsetLeft,
              opacity: 1,
              duration: 0.5,
              ease: 'elastic.out(1, 0.75)'
          })
      }
  }, [activeCategory])

  // Galaxy Background Animation (Real)
  useEffect(() => {
    if (!starsRef.current) return
    const starsContainer = starsRef.current
    const numStars = 150
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
        gsap.to(star, {
            opacity: Math.random() * 0.5 + 0.2,
            duration: Math.random() * 2 + 1,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: Math.random() * 2
        })
        gsap.to(star, {
            x: `+=${Math.random() * 20 - 10}`,
            y: `+=${Math.random() * 20 - 10}`,
            duration: Math.random() * 10 + 5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        })
    }
    return () => { starsContainer.innerHTML = '' }
  }, [])

  // Universal Button Click Animation
  const animateButtonClick = (e) => {
      const target = e.currentTarget
      gsap.fromTo(target, 
        { scale: 0.9, boxShadow: '0 0 0 rgba(0,0,0,0)' },
        { 
            scale: 1, 
            boxShadow: '0 0 20px rgba(96, 165, 250, 0.6)', 
            duration: 0.4, 
            ease: 'elastic.out(1, 0.5)',
            onComplete: () => {
                gsap.to(target, { boxShadow: 'none', duration: 0.2 })
            }
        }
      )
  }

  const handleNext = (e) => {
    animateButtonClick(e)
    if (currentIndex + itemsPerPage < filteredCertificates.length) {
      setCurrentIndex(prev => Math.min(prev + itemsPerPage, filteredCertificates.length - itemsPerPage))
    } else if (currentIndex + itemsPerPage >= filteredCertificates.length) {
        setCurrentIndex(0)
    }
  }

  const handlePrev = (e) => {
    animateButtonClick(e)
    if (currentIndex > 0) {
      setCurrentIndex(prev => Math.max(prev - itemsPerPage, 0))
    } else {
        const maxIndex = Math.max(0, filteredCertificates.length - itemsPerPage)
        setCurrentIndex(maxIndex)
    }
  }

  const handleFilterClick = (e, category) => {
      animateButtonClick(e)
      setActiveCategory(category)
  }

  const handleViewCertificate = (e, pdfUrl) => {
    // animateButtonClick(e) // Can't animate nicely if window opens immediately, but we can try
    window.open(pdfUrl, '_blank')
  }

  const handleDownloadCertificate = (e, pdfUrl, title) => {
    e.stopPropagation() 
    animateButtonClick(e)
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = `${title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="certificates" className="section-pad" ref={sectionRef} style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px', position: 'relative', overflow: 'hidden' }}>
      <div ref={starsRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />
      
      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1400px' }}>
        <h2 className="section-heading text-center" style={{ 
          fontSize: '3rem', 
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Certifications & Awards
        </h2>
        
        {/* Filter */}
        {/* Filter */}
        <div className="projects-filter text-center" style={{ marginBottom: '3rem', position: 'relative', display: 'inline-flex', background: 'rgba(15, 23, 42, 0.6)', padding: '0.5rem', borderRadius: '16px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          {/* Animated Background Pill */}
          <div 
             className="active-pill"
             style={{
                 position: 'absolute',
                 height: 'calc(100% - 1rem)',
                 top: '0.5rem',
                 left: 0,
                 background: '#60a5fa', // or gradient
                 borderRadius: '12px',
                 zIndex: 0,
                 transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                 opacity: 0 // hidden initially until measured? actually we can rely on active state logic or DOM rects, but simple CSS left/width logic with state is easier if equal width. 
                 // But these are variable width. We need a Ref-based implementation.
                 // I will inject the Ref logic into the component body in the next step if strictly needed, but let's try a simple map implementation first or just render the pill BEHIND the active button.
                 // Actually, rendering it absolutely based on active index is best.
             }}
          />
          
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={(e) => {
                  handleFilterClick(e, category);
                  // Find the pill and animate it to this target
                  const pill = e.currentTarget.parentElement.querySelector('.active-pill');
                  const target = e.currentTarget;
                  if (pill) {
                      gsap.to(pill, {
                          width: target.offsetWidth,
                          x: target.offsetLeft,
                          opacity: 1, // Make visible
                          duration: 0.5,
                          ease: 'elastic.out(1, 0.75)'
                      })
                  }
              }}
              // Ref to capture initial active state? 
              ref={el => {
                  // If this is the active category on mount, set the pill
                  if (el && activeCategory === category) {
                       // We can't safely animate inside ref callback during render easily without effect.
                       // We'll leave it to the Click or an effect.
                       // Actually, let's use a useEffect to position the pill on mount/change.
                  }
              }}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              style={{
                position: 'relative',
                zIndex: 1,
                margin: '0', // Removing margin to stick together for pill
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                border: 'none', // Removed border, rely on pill
                background: 'transparent',
                color: activeCategory === category ? '#fff' : '#94a3b8',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                fontWeight: '600'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div style={{ position: 'relative', margin: '0 auto', maxWidth: '100%', overflow: 'hidden', padding: '20px 0', perspective: '1000px' }}>
            
            {/* Track */}
            <div 
                ref={trackRef}
                style={{
                    display: 'flex',
                    width: '100%', // Fixed to container width so item % is relative to screen
                    transformStyle: 'preserve-3d'
                }}
            >
                 {filteredCertificates.map((cert, index) => (
                    <div 
                        key={`${cert.title}-${index}`}
                        className="cert-slide-item"
                        style={{
                            flex: `0 0 ${100 / itemsPerPage}%`, // Fixed width based on visible count
                            padding: '0 15px', // Gap
                            boxSizing: 'border-box',
                            opacity: 1 // Managed by GSAP
                        }}
                    >
                         <div 
                            onClick={(e) => handleViewCertificate(e, cert.pdfUrl)}
                            className="cert-card-inner"
                            style={{
                                background: 'rgba(15, 23, 42, 0.8)',
                                borderRadius: '24px', // More rounded for cloud feel
                                overflow: 'hidden',
                                border: '1px solid rgba(96, 165, 250, 0.2)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-10px)'
                                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(96, 165, 250, 0.25)'
                                e.currentTarget.style.borderColor = '#60a5fa'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.2)'
                            }}
                         >
                            <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
                                <img 
                                    src={cert.thumbnail} 
                                    alt={cert.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                    background: 'linear-gradient(to bottom, transparent 60%, rgba(15, 23, 42, 0.9))'
                                }}></div>
                            </div>

                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <span style={{
                                    display: 'inline-block', alignSelf: 'flex-start',
                                    padding: '0.25rem 0.75rem',
                                    background: 'rgba(96, 165, 250, 0.1)',
                                    border: '1px solid rgba(96, 165, 250, 0.3)',
                                    borderRadius: '20px',
                                    fontSize: '0.75rem',
                                    color: '#60a5fa', marginBottom: '1rem',
                                    fontWeight: '700'
                                }}>
                                    {cert.category}
                                </span>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: '#fff' }}>
                                    {cert.title}
                                </h3>
                                <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem', flex: 1 }}>
                                    {cert.description}
                                </p>
                                
                                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                                    <button
                                        // View button handled by card click, but let's keep it interactive
                                        onClick={(e) => { e.stopPropagation(); handleViewCertificate(e, cert.pdfUrl) }} 
                                        style={{
                                            flex: 1, padding: '0.75rem',
                                            background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
                                            border: 'none', borderRadius: '12px',
                                            color: '#fff', fontWeight: '600',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                            cursor: 'pointer'
                                        }}
                                        onMouseDown={(e) => animateButtonClick(e)}
                                    >
                                        <Eye size={18} /> View
                                    </button>
                                    <button
                                        onClick={(e) => handleDownloadCertificate(e, cert.pdfUrl, cert.title)}
                                        style={{
                                            flex: 1, padding: '0.75rem',
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '12px',
                                            color: '#fff', fontWeight: '600',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                                        onMouseDown={(e) => animateButtonClick(e)}
                                    >
                                        <Download size={18} /> DL
                                    </button>
                                </div>
                            </div>
                         </div>
                    </div>
                 ))}
            </div>

            {/* Navigation Buttons */}
            {filteredCertificates.length > itemsPerPage && (
                <>
                    <button 
                        onClick={handlePrev} 
                        style={{
                            position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
                            width: '50px', height: '50px', borderRadius: '50%', border: 'none',
                            background: 'rgba(30, 41, 59, 0.8)', color: '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', backdropFilter: 'blur(4px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                            transition: 'all 0.3s',
                            outline: 'none'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.background = '#60a5fa'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)'; }}
                    >
                        <ChevronLeft size={28} />
                    </button>

                    <button 
                        onClick={handleNext} 
                        style={{
                            position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
                            width: '50px', height: '50px', borderRadius: '50%', border: 'none',
                            background: 'rgba(30, 41, 59, 0.8)', color: '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', backdropFilter: 'blur(4px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                            transition: 'all 0.3s',
                            outline: 'none'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.background = '#60a5fa'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)'; }}
                    >
                        <ChevronRight size={28} />
                    </button>
                </>
            )}

        </div>
        
        {/* Pagination Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginTop: '2rem' }}>
          {Array.from({ length: Math.ceil(filteredCertificates.length / itemsPerPage) }).map((_, index) => (
             <button
                key={index}
                onClick={(e) => { 
                    animateButtonClick(e);
                    setCurrentIndex(index * itemsPerPage);
                }}
                style={{
                    width: Math.ceil(currentIndex / itemsPerPage) === index ? '28px' : '10px',
                    height: '10px',
                    borderRadius: '20px',
                    background: Math.ceil(currentIndex / itemsPerPage) === index ? '#60a5fa' : 'rgba(255,255,255,0.2)',
                    border: 'none', 
                    cursor: 'pointer',
                    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
             />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Certificates
