import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Youtube, Play, ExternalLink, X } from 'lucide-react'

// ─── Video Data ───────────────────────────────────────────────────────────────
const youtubeData = [
  { id: 'XHeITLqG_Jw', title: 'My Latest YouTube Video',  category: 'Featured' },
  { id: 'wxSghN4KPhQ', title: 'YouTube Video 2',           category: 'Video'    },
  { id: 'rKJG0e5612E', title: 'YouTube Video 3',           category: 'Video'    },
  { id: 'f1LgMfOf48k', title: 'YouTube Video 4',           category: 'Video'    },
  { id: 'vY5vS69lDuI', title: 'YouTube Video 5',           category: 'Video'    },
  { id: 'FddnRYUhsjY', title: 'YouTube Video 6',           category: 'Video'    },
]

const thumbUrl = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
const embedUrl  = (id) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`

// ─── Modal Player ─────────────────────────────────────────────────────────────
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
          animate={{ scale: 1,    opacity: 1, y: 0 }}
          exit={{   scale: 0.85, opacity: 0, y: 40 }}
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
          {/* iframe */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
            <iframe
              src={embedUrl(video.id)}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            />
          </div>
          {/* footer */}
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
                href={`https://youtu.be/${video.id}`}
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

// ─── Main Component ───────────────────────────────────────────────────────────
const YouTube = () => {
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <section
      id="youtube"
      className="section-pad"
      style={{ background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background glows */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(180deg, rgba(239,68,68,0.06) 0%, transparent 40%, rgba(239,68,68,0.04) 100%)',
        zIndex: 0, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '-5%', left: '-15%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)',
        filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '0%', right: '-10%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(239,68,68,0.07) 0%, transparent 70%)',
        filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none',
      }} />

      <div className="container" style={{ maxWidth: '1300px', position: 'relative', zIndex: 1 }}>

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.35em',
            color: '#ef4444', textTransform: 'uppercase', marginBottom: 14,
            fontFamily: "'Inter', sans-serif",
            textShadow: '0 0 12px rgba(239,68,68,0.5)',
          }}>— Video Content</p>

          <h2 style={{
            fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
            fontWeight: 900, margin: 0,
            color: '#fff',
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '-0.04em',
          }}>
            YouTube{' '}
            <span style={{
              background: 'linear-gradient(90deg, #ef4444 0%, #f87171 50%, #fca5a5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Creations</span>
          </h2>

          <p style={{
            marginTop: '1rem', color: '#64748b',
            fontSize: '1rem', fontFamily: "'Inter', sans-serif",
          }}>
            Click any video to watch it right here ↓
          </p>
        </motion.div>

        {/* ── 3-Column Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '28px',
        }}
          className="yt-grid"
        >
          {youtubeData.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              onClick={() => setActiveVideo(video)}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                background: 'rgba(15,23,42,0.55)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                backdropFilter: 'blur(10px)',
                transition: 'box-shadow 0.3s, border-color 0.3s',
              }}
              className="yt-card"
            >
              {/* Thumbnail */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#000' }}>
                <img
                  src={thumbUrl(video.id)}
                  alt={video.title}
                  onError={(e) => { e.target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg` }}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    display: 'block', transition: 'transform 0.5s ease',
                  }}
                  className="yt-thumb"
                />

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
                  transition: 'opacity 0.3s',
                  opacity: 0.8,
                }} className="yt-overlay" />

                {/* Category pill */}
                <div style={{
                  position: 'absolute', top: 12, left: 12,
                  padding: '4px 10px',
                  background: index === 0 ? 'rgba(239,68,68,0.9)' : 'rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(6px)',
                  borderRadius: '8px',
                  fontSize: '10px', fontWeight: 700,
                  color: '#fff', letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: "'Inter', sans-serif",
                  border: index === 0 ? 'none' : '1px solid rgba(255,255,255,0.12)',
                }}>{video.category}</div>

                {/* Play button */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.92 }}
                    style={{
                      width: 54, height: 54, borderRadius: '50%',
                      background: 'rgba(239,68,68,0.9)',
                      backdropFilter: 'blur(4px)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 0 30px rgba(239,68,68,0.5), 0 4px 20px rgba(0,0,0,0.4)',
                      border: '2px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    <Play size={22} fill="#fff" color="#fff" style={{ marginLeft: '3px' }} />
                  </motion.div>
                </div>
              </div>

              {/* Card Footer */}
              <div style={{
                padding: '16px 18px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px',
                borderTop: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{
                    color: '#f1f5f9',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    margin: 0,
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1.4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>{video.title}</h3>
                </div>

                <a
                  href={`https://youtu.be/${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title="Open on YouTube"
                  style={{
                    flexShrink: 0,
                    width: 34, height: 34, borderRadius: '10px',
                    border: '1px solid rgba(239,68,68,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#ef4444', textDecoration: 'none',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(239,68,68,0.15)'
                    e.currentTarget.style.borderColor = '#ef4444'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'
                  }}
                >
                  <ExternalLink size={15} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Subscribe CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: '4rem', textAlign: 'center' }}
        >
          <a
            href="https://www.youtube.com/@priyabratasahoo780?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '16px 36px',
              borderRadius: '16px',
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.5)',
              color: '#fff',
              fontWeight: 800, fontSize: '14px',
              textTransform: 'uppercase', letterSpacing: '0.12em',
              textDecoration: 'none',
              boxShadow: '0 0 24px rgba(239,68,68,0.1)',
              transition: 'all 0.3s ease',
              fontFamily: "'Inter', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ef4444'
              e.currentTarget.style.boxShadow = '0 0 50px rgba(239,68,68,0.45)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.08)'
              e.currentTarget.style.boxShadow = '0 0 24px rgba(239,68,68,0.1)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <Youtube size={20} />
            Subscribe to Channel
          </a>
        </motion.div>
      </div>

      {/* ── Modal ── */}
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />

      {/* ── Scoped Styles ── */}
      <style>{`
        .yt-card:hover {
          border-color: rgba(239,68,68,0.3) !important;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(239,68,68,0.15) !important;
        }
        .yt-card:hover .yt-thumb { transform: scale(1.07); }
        .yt-card:hover .yt-overlay { opacity: 0.95 !important; }

        @media (max-width: 900px) {
          .yt-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .yt-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

export default YouTube
