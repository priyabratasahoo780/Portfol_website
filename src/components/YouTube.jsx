import React from 'react'
import { motion } from 'framer-motion'
import { Youtube, Play, Globe, Share2, Award } from 'lucide-react'

const youtubeData = [
  {
    title: 'AgriSaar - AI for Sustainable Farming',
    thumbnail: 'https://images.unsplash.com/photo-1523348830342-d01fb614ac01?auto=format&fit=crop&q=80',
    views: '1.2K',
    date: '2 months ago',
    link: 'https://www.youtube.com/watch?v=your_video_id_1',
    category: 'Project Demo'
  },
  {
    title: 'Modern UI/UX Design with React & GSAP',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
    views: '2.5K',
    date: '1 month ago',
    link: 'https://www.youtube.com/watch?v=your_video_id_2',
    category: 'Tutorial'
  },
  {
      title: 'Hackathon Journey: Winning SIH 2024',
      thumbnail: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80',
      views: '5.8K',
      date: '3 weeks ago',
      link: 'https://www.youtube.com/watch?v=your_video_id_3',
      category: 'Vlog'
  }
]

const YouTube = () => {
  return (
    <section id="youtube" className="section-pad" style={{ background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}>
      {/* Cinematic Gradient Background */}
      <div style={{ 
        position: 'absolute', 
        top: 0, left: 0, right: 0, bottom: 0, 
        background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.05) 0%, transparent 50%, rgba(0, 243, 255, 0.05) 100%)',
        zIndex: 0 
      }} />

      <div className="container" style={{ maxWidth: '1400px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.3em',
                color: '#ef4444', textTransform: 'uppercase', marginBottom: 14,
                fontFamily: "'Inter',sans-serif",
                textShadow: '0 0 10px rgba(239, 68, 68, 0.4)'
              }}>— Video Content</p>
            <h2 style={{ 
              fontSize: 'clamp(3rem, 6vw, 5rem)', 
              fontWeight: 900,
              color: '#fff',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.04em',
              textShadow: '0 0 15px rgba(239, 68, 68, 0.3)'
            }}>
              YouTube <span style={{ 
                background: 'linear-gradient(90deg, #ef4444, #f87171)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Creations</span>
            </h2>
          </motion.div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', 
          gap: '40px' 
        }}>
          {youtubeData.map((video, index) => (
            <motion.div
              key={video.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.02 }}
              style={{
                background: 'rgba(15, 23, 42, 0.4)',
                borderRadius: '28px',
                border: '1px solid rgba(255,255,255,0.08)',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}
              onClick={() => window.open(video.link, '_blank')}
            >
              {/* Thumbnail Container */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  className="v-thumb"
                />
                
                {/* Play Button Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 1,
                  transition: 'background 0.3s'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 30px rgba(239, 68, 68, 0.6)',
                    transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }} className="v-play-btn">
                    <Play size={24} fill="#fff" color="#fff" style={{ marginLeft: '4px' }} />
                  </div>
                </div>

                {/* Duration/Category Tag */}
                <div style={{
                  position: 'absolute',
                  bottom: '15px',
                  right: '15px',
                  padding: '6px 12px',
                  background: 'rgba(0,0,0,0.8)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  {video.category}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{
                  color: '#fff',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  marginBottom: '12px',
                  lineHeight: 1.4,
                  fontFamily: "'Inter', sans-serif"
                }}>{video.title}</h3>
                
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '12px', color: '#94a3b8', fontSize: '13px' }}>
                    <span>{video.views} views</span>
                    <span>•</span>
                    <span>{video.date}</span>
                  </div>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ef4444'
                  }}>
                    <Youtube size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5 }}
           style={{ marginTop: '5rem', textAlign: 'center' }}
        >
            <button 
                onClick={() => window.open('https://youtube.com/@your_channel', '_blank')}
                style={{
                    padding: '18px 40px',
                    borderRadius: '20px',
                    background: 'rgba(15, 23, 42, 0.4)',
                    border: '1px solid #ef4444',
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: '16px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)',
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                    e.target.style.background = '#ef4444'
                    e.target.style.boxShadow = '0 0 40px rgba(239, 68, 68, 0.4)'
                }}
                onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(15, 23, 42, 0.4)'
                    e.target.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.2)'
                }}
            >
                Subscribe to Channel <Youtube size={20} />
            </button>
        </motion.div>
      </div>

      <style>{`
        .v-thumb {
            transform: scale(1);
        }
        div:hover .v-thumb {
            transform: scale(1.1);
        }
        div:hover .v-play-btn {
            transform: scale(1.2);
        }
      `}</style>
    </section>
  )
}

export default YouTube
