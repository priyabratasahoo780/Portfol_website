import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Youtube, Play, ExternalLink, X, RefreshCw } from 'lucide-react'

// ─── Constants & Fallback Data ────────────────────────────────────────────────
const CHANNEL_ID = 'UCzHiV0-wtTP1MCjGeSbXbSQ'
const RSS_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
const CACHE_KEY = 'youtube_latest_6_videos_v2'
const ONE_DAY_MS = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

const FALLBACK_VIDEOS = [
  { id: 'QDSYctSbrJQ', title: '🔥 I Built a Smart Survey App in React Native 📱 | Camera, GPS & Contacts', category: 'Featured Project' },
  { id: 'XRvtXPIMltQ', title: 'The Easiest LeetCode Problem That Confuses Everyone | 1399 count largest group', category: 'LeetCode' },
  { id: 'ltVFJVyJ4co', title: '99% Beginners Overthink This LeetCode Problem 😱 | LeetCode 2114', category: 'LeetCode' },
  { id: 'GMAzbfjYbtU', title: 'LeetCode 1446 Consecutive Characters | Easy C++ Solution', category: 'LeetCode' },
  { id: 'sHDZYkG_70s', title: 'Google Asked This Stock Problem 😱 | LeetCode 121 Explained in 10 Minutes', category: 'LeetCode' },
  { id: 'EwW21zaCzN0', title: 'Google, Amazon & Microsoft Asked This Question 😱 | LeetCode 485', category: 'LeetCode' },
]

const decodeHtmlEntities = (str) => {
  if (!str) return ''
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
}

const extractVideoId = (item) => {
  if (item.guid && item.guid.includes('yt:video:')) {
    return item.guid.replace('yt:video:', '')
  }
  if (item.link) {
    const match = item.link.match(/(?:v=|\/vi\/|\/v\/|youtu\.be\/|\/embed\/)([a-zA-Z0-9_-]{11})/)
    if (match) return match[1]
  }
  return item.id || ''
}

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
  const [videos, setVideos] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached)
        if (parsed?.data?.length) return parsed.data
      }
    } catch (e) {
      console.warn('Failed to load cached YouTube videos:', e)
    }
    return FALLBACK_VIDEOS
  })

  const [activeVideo, setActiveVideo] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchLatestVideos = async (force = false) => {
    if (!force) {
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const parsed = JSON.parse(cached)
          // Valid if fetched within the last 24 hours (1 day)
          if (parsed?.timestamp && (Date.now() - parsed.timestamp < ONE_DAY_MS) && parsed.data?.length) {
            setVideos(parsed.data)
            return
          }
        }
      } catch (e) {
        console.warn('Cache validation error:', e)
      }
    }

    try {
      setLoading(true)
      let parsedVideos = []

      // 1. Primary Source: rss2json
      try {
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_FEED_URL)}`
        const res = await fetch(apiUrl)
        if (res.ok) {
          const json = await res.json()
          if (json.status === 'ok' && json.items?.length) {
            parsedVideos = json.items.slice(0, 6).map((item, idx) => ({
              id: extractVideoId(item),
              title: decodeHtmlEntities(item.title),
              category: idx === 0 ? 'Featured' : (item.title?.toLowerCase().includes('leetcode') ? 'LeetCode' : 'Project'),
              published: item.pubDate
            })).filter(v => v.id)
          }
        }
      } catch (err) {
        console.warn('rss2json fetch error:', err)
      }

      // 2. Fallback Source: allorigins XML proxy
      if (parsedVideos.length === 0) {
        try {
          const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(RSS_FEED_URL)}`
          const res = await fetch(proxyUrl)
          if (res.ok) {
            const xml = await res.text()
            const entries = xml.split('<entry>')
            for (let i = 1; i < entries.length && parsedVideos.length < 6; i++) {
              const entry = entries[i]
              const idMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)
              const titleMatch = entry.match(/<title>(.*?)<\/title>/)
              if (idMatch) {
                const title = titleMatch ? decodeHtmlEntities(titleMatch[1]) : 'YouTube Video'
                parsedVideos.push({
                  id: idMatch[1],
                  title,
                  category: parsedVideos.length === 0 ? 'Featured' : (title.toLowerCase().includes('leetcode') ? 'LeetCode' : 'Project')
                })
              }
            }
          }
        } catch (err) {
          console.warn('allorigins XML proxy error:', err)
        }
      }

      if (parsedVideos.length > 0) {
        setVideos(parsedVideos)
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: parsedVideos
          }))
        } catch (e) {
          console.warn('LocalStorage save error:', e)
        }
      }
    } catch (error) {
      console.error('YouTube video sync error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLatestVideos()

    // 24-Hour (1 day) automatic re-fetch interval
    const interval = setInterval(() => {
      fetchLatestVideos(true)
    }, ONE_DAY_MS)

    return () => clearInterval(interval)
  }, [])

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
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 14px', borderRadius: '50px',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            marginBottom: '16px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', display: 'inline-block', boxShadow: '0 0 10px #ef4444' }} />
            <span style={{
              fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em',
              color: '#ef4444', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif"
            }}>
              DAILY STREAM • LATEST 6 RELEASES
            </span>
          </div>

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
            Click any video to watch directly or visit the channel ↓
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
          {videos.map((video, index) => (
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
