import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Trophy, Target, Zap, Activity, Info } from 'lucide-react'

const LeetCode = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchData = async () => {
    const username = 'Priyabrata_Sahoo780'
    const endpoints = [
      `https://leetcode-stats-api.herokuapp.com/${username}`,
      `https://leetcode-stats-api.herokuapp.com/${username.toLowerCase()}`,
      `https://alfa-leetcode-api.onrender.com/${username}`
    ]

    for (const url of endpoints) {
      try {
        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(), 5000) // 5s Timeout

        const res = await fetch(url, { signal: controller.signal })
        clearTimeout(id)
        
        if (!res.ok) continue
        const data = await res.json()
        
        if (data.status === 'success' || data.username) {
          const userAvatar = (data.avatar && !data.avatar.includes('default_avatar')) 
            ? data.avatar 
            : `/assets/myPhoto.png`

          setStats({
            username: data.username || username,
            name: data.name || 'Priyabrata Sahoo',
            avatar: userAvatar,
            totalSolved: data.totalSolved || data.solvedProblem || 105,
            totalQuestions: data.totalQuestions || data.totalProblem || 3873,
            easySolved: data.easySolved || data.easySolved || 90,
            totalEasy: data.totalEasy || data.totalEasy || 932,
            mediumSolved: data.mediumSolved || data.mediumSolved || 13,
            totalMedium: data.totalMedium || data.totalMedium || 2026,
            hardSolved: data.hardSolved || data.hardSolved || 2,
            totalHard: data.totalHard || data.totalHard || 915,
            ranking: data.ranking || data.ranking || 1425034,
            acceptanceRate: data.acceptanceRate || data.acceptanceRate || 78.2,
            contributionPoints: data.contributionPoints || data.reputation || 0,
            totalSubmissions: data.totalSubmissions || (data.submissionStats && data.submissionStats[0].count) || 266
          })
          setError(false)
          setLoading(false)
          return
        }
      } catch (err) {
        console.warn(`Sync attempt failed for ${url}:`, err.name === 'AbortError' ? 'Timeout' : err.message)
      }
    }
    
    setError(true)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 300000)
    return () => clearInterval(interval)
  }, [])

  const fallbackStats = {
    username: 'Priyabrata_Sahoo780',
    name: 'Priyabrata Sahoo',
    avatar: '/assets/myPhoto.png',
    totalSolved: 105,
    totalQuestions: 3873,
    easySolved: 90,
    totalEasy: 932,
    mediumSolved: 13,
    totalMedium: 2026,
    hardSolved: 2,
    totalHard: 915,
    ranking: 1425034,
    acceptanceRate: 78.2,
    contributionPoints: 450,
    totalSubmissions: 266
  }

  const activeStats = stats || fallbackStats
  const solvePercent = Math.round((activeStats.totalSolved / activeStats.totalQuestions) * 100)

  if (loading) return (
    <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
      <div className="neon-loading-pulse">SYNCING ENCRYPTED DATA...</div>
    </div>
  )

  return (
    <section id="leetcode" className="leetcode-premium-section">
      {/* Dynamic Background Elements */}
      <div className="premium-bg-effects">
        <div className="bg-glow-orb purple" />
        <div className="bg-glow-orb cyan" />
        <div className="grid-overlay" />
      </div>

      <div className="premium-container">
        {/* Header Section */}
        <div className="dashboard-header">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
             <span className="premium-eyebrow">Coding Statistics</span>
            <h2 className="premium-title">
              LeetCode <span className="neon-glow-text">Elite</span>
            </h2>
          </motion.div>
        </div>

        <div className="dashboard-layout">
          {/* Main Hero Card: Circular Progress */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hero-stat-card"
          >
            <div className="scanner-line" />
            
            <div className="profile-identity">
              <div className="avatar-wrapper">
                <div 
                  className="user-avatar" 
                  style={{ 
                    backgroundImage: `url(${activeStats.avatar}), url('https://ui-avatars.com/api/?name=Priyabrata+Sahoo&background=00eaff&color=fff&size=128')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="avatar-glow" />
              </div>
              <div className="user-info">
                <h3 className="user-name">{activeStats.name}</h3>
                <p className="user-slug">@{activeStats.username}</p>
                <div className="user-rank-badge">
                  <Trophy size={12} className="rank-icon" />
                  RANK {activeStats.ranking?.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="hero-stat-content">
              <div className="circular-container">
                <svg viewBox="0 0 100 100" className="progress-ring">
                  <circle className="ring-bg" cx="50" cy="50" r="45" />
                  <motion.circle 
                    className="ring-fill" 
                    cx="50" cy="50" r="45" 
                    initial={{ strokeDashoffset: 283 }}
                    whileInView={{ strokeDashoffset: 283 - (283 * (activeStats.totalSolved / activeStats.totalQuestions)) }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                </svg>
                <div className="ring-text">
                  <span className="ring-number">{activeStats.totalSolved}</span>
                  <span className="ring-label">SOLVED</span>
                </div>
              </div>

              <div className="difficulty-bars">
                <DifficultyBar 
                  label="Easy" 
                  solved={activeStats.easySolved} 
                  total={activeStats.totalEasy} 
                  color="#00eaff" 
                  delay={0.2}
                />
                <DifficultyBar 
                  label="Medium" 
                  solved={activeStats.mediumSolved} 
                  total={activeStats.totalMedium} 
                  color="#ffa116" 
                  delay={0.4}
                />
                <DifficultyBar 
                  label="Hard" 
                  solved={activeStats.hardSolved} 
                  total={activeStats.totalHard} 
                  color="#ef4444" 
                  delay={0.6}
                />
              </div>
            </div>

            <div className="card-footer-cta">
              <div className="status-indicator">
                 <div className={`status-dot ${error ? 'error' : 'live'}`} />
                 <span>{error ? 'LOCAL CACHE ACTIVE' : 'REAL-TIME DATA LINKED'}</span>
              </div>
              <a href="https://leetcode.com/u/Priyabrata_Sahoo780/" target="_blank" rel="noopener noreferrer" className="premium-btn">
                GO TO PROFILE <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>

          {/* Side Performance Cards */}
          <div className="metrics-side-panel">
            <MetricCard 
              icon={<Trophy className="metric-icon" />} 
              label="Global Ranking" 
              value={activeStats.ranking ? `#${activeStats.ranking.toLocaleString()}` : 'N/A'}
              accent="#ffd700" 
              delay={0.1}
            />
            <MetricCard 
              icon={<Target className="metric-icon" />} 
              label="Acceptance Rate" 
              value={`${activeStats.acceptanceRate}%`}
              accent="#00eaff" 
              delay={0.2}
            />
            <MetricCard 
              icon={<Zap className="metric-icon" />} 
              label="Contributions" 
              value={activeStats.contributionPoints}
              accent="#ff00ff" 
              delay={0.3}
            />
            <MetricCard 
              icon={<Activity className="metric-icon" />} 
              label="Submissions" 
              value={activeStats.totalSubmissions}
              accent="#22c55e" 
              delay={0.4}
            />
          </div>
        </div>
      </div>

      <style>{`
        .leetcode-premium-section {
          background: #020617;
          min-height: 100vh;
          padding: 120px 0;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          font-family: 'Inter', sans-serif;
        }

        .premium-bg-effects {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .bg-glow-orb {
          position: absolute;
          width: 50vw;
          height: 50vw;
          filter: blur(150px);
          opacity: 0.15;
          border-radius: 50%;
        }
        .bg-glow-orb.purple { top: -10%; left: -10%; background: radial-gradient(circle, #8b5cf6, transparent); }
        .bg-glow-orb.cyan { bottom: -10%; right: -10%; background: radial-gradient(circle, #06b6d4, transparent); }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.03) 1.5px, transparent 1.5px), 
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1.5px, transparent 1.5px);
          background-size: 50px 50px;
          mask-image: radial-gradient(circle at center, black, transparent 80%);
        }

        .premium-container {
          width: 90%;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: 80px;
        }
        .premium-eyebrow {
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          font-weight: 800;
          font-size: 0.75rem;
          display: block;
          margin-bottom: 12px;
        }
        .premium-title {
          font-size: clamp(3rem, 7vw, 6rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.05em;
        }
        .neon-glow-text {
          background: linear-gradient(to right, #00eaff, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 15px rgba(0, 234, 255, 0.4));
        }

        .dashboard-layout {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 40px;
        }

        /* Hero Card Styling */
        .hero-stat-card {
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 40px;
          padding: 60px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          gap: 50px;
        }
        .hero-stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 234, 255, 0.5), transparent);
        }

        /* Profile Identity Styling */
        .profile-identity {
          display: flex;
          align-items: center;
          gap: 25px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .avatar-wrapper {
          position: relative;
          width: 90px;
          height: 90px;
          border-radius: 24px;
          padding: 3px;
          background: linear-gradient(135deg, #00eaff, #8b5cf6);
        }
        .user-avatar {
          width: 100%;
          height: 100%;
          border-radius: 21px;
          object-fit: cover;
          border: 2px solid #020617;
        }
        .avatar-glow {
          position: absolute;
          inset: -5px;
          background: inherit;
          filter: blur(15px);
          opacity: 0.4;
          z-index: -1;
        }
        .user-name {
          color: #fff;
          font-size: 1.8rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .user-slug {
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .user-rank-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(255, 215, 0, 0.1);
          border: 1px solid rgba(255, 215, 0, 0.2);
          color: #ffd700;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.05em;
        }
        .rank-icon { filter: drop-shadow(0 0 5px #ffd700); }

        .scanner-line {
          position: absolute;
          top: 0; left: 0; right: 0; height: 40px;
          background: linear-gradient(to bottom, rgba(0, 234, 255, 0.1), transparent);
          border-top: 2px solid #00eaff;
          opacity: 0.5;
          animation: scan 4s linear infinite;
          pointer-events: none;
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }

        .hero-stat-content {
          display: flex;
          align-items: center;
          gap: 80px;
        }

        /* Circular Progress Styling */
        .circular-container {
          position: relative;
          width: 280px;
          height: 280px;
          flex-shrink: 0;
        }
        .progress-ring {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
        .ring-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.03);
          stroke-width: 8;
        }
        .ring-fill {
          fill: none;
          stroke: url(#neonGradient);
          stroke-width: 8;
          stroke-linecap: round;
          stroke-dasharray: 283;
        }
        .ring-text {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .ring-number {
          font-size: 5rem;
          font-weight: 900;
          color: #fff;
          line-height: 1;
          text-shadow: 0 0 30px rgba(0, 234, 255, 0.5);
        }
        .ring-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #64748b;
          letter-spacing: 0.3em;
          margin-top: 10px;
        }

        /* Difficulty Bars Styling */
        .difficulty-bars {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .diff-item {
          width: 100%;
        }
        .diff-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 0.9rem;
          font-weight: 700;
        }
        .diff-label { color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; }
        .diff-count { color: #fff; }
        .bar-bg {
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          overflow: hidden;
        }
        .bar-fill {
          height: 100%;
          border-radius: 10px;
          box-shadow: 0 0 15px currentColor;
        }

        /* Metrics Grid Styling */
        .metrics-side-panel {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .side-card {
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 35px;
          border-radius: 30px;
          display: flex;
          align-items: center;
          gap: 30px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .side-card:hover {
          background: rgba(30, 41, 59, 0.6);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateX(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .metric-icon-box {
          width: 65px;
          height: 65px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .metric-icon { width: 30px; height: 30px; }
        .metric-label { color: #64748b; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 5px; }
        .metric-value { color: #fff; font-size: 2.2rem; font-weight: 900; }

        /* Footer CTA Styling */
        .card-footer-cta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .status-indicator {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.7rem;
          font-weight: 800;
          color: #475569;
          letter-spacing: 0.1em;
        }
        .status-dot { width: 8px; height: 8px; border-radius: 50%; }
        .status-dot.live { background: #00eaff; box-shadow: 0 0 10px #00eaff; animation: hub-pulse 1.5s infinite; }
        .status-dot.error { background: #ef4444; }
        @keyframes hub-pulse { 0% { opacity: 0.3; } 50% { opacity: 1; } 100% { opacity: 0.3; } }

        .premium-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          text-decoration: none;
          border-radius: 15px;
          font-weight: 700;
          font-size: 0.85rem;
          transition: all 0.3s;
        }
        .premium-btn:hover {
          background: #fff;
          color: #000;
          transform: translateY(-2px);
        }

        .neon-loading-pulse {
          font-size: 1rem;
          font-weight: 900;
          color: #00eaff;
          letter-spacing: 0.5em;
          animation: text-pulse 2s infinite;
        }
        @keyframes text-pulse { 0% { opacity: 0.2; } 50% { opacity: 1; } 100% { opacity: 0.2; } }

        @media (max-width: 1200px) {
          .dashboard-layout { grid-template-columns: 1fr; }
          .hero-stat-content { flex-direction: column; gap: 40px; }
          .side-card:hover { transform: translateY(-5px); }
        }
        @media (max-width: 768px) {
          .hero-stat-card { padding: 30px; }
          .ring-number { font-size: 3.5rem; }
          .circular-container { width: 220px; height: 220px; }
          .dashboard-header { margin-bottom: 40px; }
        }
      `}</style>

      {/* SVG Gradient Definition */}
      <svg style={{ width: 0, height: 0, position: 'absolute' }}>
        <defs>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00eaff" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  )
}

const DifficultyBar = ({ label, solved, total, color, delay }) => {
  const percent = Math.min(100, Math.round((solved / total) * 100))
  return (
    <div className="diff-item">
      <div className="diff-header">
        <span className="diff-label">{label}</span>
        <span className="diff-count">{solved}<span style={{ opacity: 0.3 }}> / {total}</span></span>
      </div>
      <div className="bar-bg">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
          className="bar-fill" 
          style={{ background: color, color }} 
        />
      </div>
    </div>
  )
}

const MetricCard = ({ icon, label, value, accent, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="side-card"
    >
      <div className="metric-icon-box" style={{ borderColor: `${accent}33` }}>
        {React.cloneElement(icon, { style: { color: accent } })}
      </div>
      <div>
        <span className="metric-label">{label}</span>
        <span className="metric-value">{value}</span>
      </div>
    </motion.div>
  )
}

export default LeetCode
