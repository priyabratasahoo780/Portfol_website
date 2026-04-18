import React, { useState, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Trophy, Zap, Activity, Github, Terminal, Star, GitBranch, Code2, Globe } from 'lucide-react'

// ─── Sub-Components ──────────────────────────────────────────────────────────

const NumberCounter = ({ value }) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const end = parseInt(value)
    if (start === end) return
    let totalDuration = 2000
    let increment = end / (totalDuration / 16)
    let timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [value])
  return <span>{count.toLocaleString()}</span>
}

const DifficultyBar = ({ label, solved, total, color, delay }) => {
  const percentage = (solved / total) * 100
  return (
    <div className="diff-item">
      <div className="diff-header">
        <span className="diff-label">{label}</span>
        <span className="diff-count">{solved}/{total}</span>
      </div>
      <div className="bar-bg">
        <motion.div 
          className="bar-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
          style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}66` }}
        />
      </div>
    </div>
  )
}

const ContributionGrid = ({ username }) => {
  return (
    <div className="github-heatmap">
      <div className="heatmap-header">
        <div className="header-left">
          <Activity size={14} className="pulse-icon" />
          <span className="live-status">UPLINK_STABLE</span>
          <span className="label-dim">Real-time Contribution Pulse</span>
        </div>
        <div className="heatmap-legend">
          <span className="legend-label">Velocity:</span>
          {[0, 1, 2, 3, 4].map(v => <div key={v} className={`heat-cell level-${v}`} />)}
        </div>
      </div>
      <div className="heatmap-image-wrapper">
         <div className="tech-frame-corners">
            <div className="corner top-left" /><div className="corner top-right" />
            <div className="corner bot-left" /><div className="corner bot-right" />
         </div>
         <img 
            src={`https://ghchart.rshah.org/06b6d4/${username}`} 
            alt="GitHub Contributions" 
            className="gh-chart-img"
         />
         <div className="chart-overlay-glow" />
         <div className="scanning-bar" />
      </div>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

const ActivityHub = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(false)
  const [lastSync, setLastSync] = useState(new Date())
  const [telemetry, setTelemetry] = useState([])

  const fetchData = async () => {
    const lcUser = 'Priyabrata_Sahoo780'
    const ghUser = 'priyabratasahoo780'
    
    try {
      const mainRes = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${lcUser}`).then(res => res.ok ? res.json() : null)
      const ghRes = await fetch(`https://api.github.com/users/${ghUser}`).then(res => res.ok ? res.json() : null)
      
      if (mainRes) {
        // Calculate Real Streak from Submission Calendar
        let currentStreak = 0;
        if (mainRes.submissionCalendar) {
          try {
            const calendar = mainRes.submissionCalendar; // { "timestamp": count }
            const submissionDays = Object.keys(calendar)
              .map(ts => {
                const date = new Date(parseInt(ts) * 1000);
                return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
              })
              .sort((a, b) => b - a);

            const uniqueDays = [...new Set(submissionDays)];
            const today = new Date();
            const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
            const dayInMs = 86400000;

            // Check if streak is still active (submitted today or yesterday)
            let checkDay = startOfToday;
            if (uniqueDays[0] < startOfToday - dayInMs) {
              currentStreak = 0;
            } else {
              // If the latest submission was yesterday, start counting from yesterday
              if (uniqueDays[0] === startOfToday - dayInMs) {
                checkDay = startOfToday - dayInMs;
              }
              
              for (let i = 0; i < uniqueDays.length; i++) {
                if (uniqueDays[i] === checkDay) {
                  currentStreak++;
                  checkDay -= dayInMs;
                } else {
                  break;
                }
              }
            }
          } catch (e) {
            console.error("Streak calculation error:", e);
            currentStreak = 0;
          }
        }

        setStats({
          leetcode: {
            username: lcUser,
            ranking: mainRes.ranking,
            totalSolved: mainRes.totalSolved || 107,
            totalQuestions: mainRes.totalQuestions || 3200,
            easy: mainRes.easySolved || 90,
            totalEasy: mainRes.totalEasy || 800,
            medium: mainRes.mediumSolved || 15,
            totalMedium: mainRes.totalMedium || 1500,
            hard: mainRes.hardSolved || 2,
            totalHard: mainRes.totalHard || 900,
            streak: currentStreak || 0,
            recentSubmissions: mainRes.recentSubmissions?.slice(0, 3) || []
          },
          github: {
            username: ghUser,
            repos: ghRes?.public_repos || 45,
            followers: ghRes?.followers || 12,
            following: ghRes?.following || 8,
            avatar: ghRes?.avatar_url || `https://github.com/${ghUser}.png`
          }
        })
        setLastSync(new Date())
        addTelemetry('Uplink synchronized. Data packets verified.')
      }
      setError(false)
    } catch (err) {
      console.error("Activity Sync Error:", err)
      setError(true)
      addTelemetry('Sync error. Initializing fallback cache protocols.')
    } finally {
      setLoading(false)
    }
  }

  const addTelemetry = (msg) => {
    setTelemetry(prev => [{
      time: new Date().toLocaleTimeString(),
      msg
    }, ...prev].slice(0, 4))
  }

  useEffect(() => {
    fetchData()
    // Auto sync every 60 seconds
    const interval = setInterval(fetchData, 60000)
    
    // Telemetry pings
    const pingInterval = setInterval(() => {
       const pings = ['Node bridge active', 'Telemetry streaming...', 'Wait for handoff...', 'Ping successful', 'Syncing heatmaps...']
       addTelemetry(pings[Math.floor(Math.random() * pings.length)])
    }, 8000)

    return () => {
      clearInterval(interval)
      clearInterval(pingInterval)
    }
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    addTelemetry('Force re-sync initiated by user...')
    await fetchData()
    setTimeout(() => setRefreshing(false), 1000)
  }

  if (loading) return (
    <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
      <div className="sync-loader">
        <Activity className="sync-icon" />
        <span className="sync-text">ESTABLISHING DATA UPLINK...</span>
      </div>
    </div>
  )

  const activeStats = stats || {
    leetcode: { totalSolved: 107, totalQuestions: 3874, easy: 90, totalEasy: 932, medium: 15, totalMedium: 2027, hard: 2, totalHard: 915, ranking: 1391446, streak: 0 },
    github: { repos: 48, followers: 24, following: 12, avatar: 'https://github.com/priyabratasahoo780.png' }
  }

  return (
    <section id="activity" className="activity-premium-section">
      <div className="section-overlay-effects">
        <div className="glow-orb purple" />
        <div className="glow-orb cyan" />
        <div className="scanline" />
      </div>

      <div className="activity-container">
        {/* Header Unit */}
        <div className="activity-header">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="header-content"
          >
            <div className="sync-badge">
              <div className="pulse-dot" />
              LIVE DATA STREAM ACTIVE
            </div>
            <h2 className="title-massive">
              CODING <span className="gradient-text">FOOTPRINT</span>
            </h2>

          </motion.div>
        </div>

        <div className="hub-grid">
          {/* LEFT COLUMN: GITHUB ELITE */}
          <div className="hub-column">
             <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card github-card"
             >
                <div className="card-glare" />
                <div className="card-header">
                  <div className="platform-brand">
                    <Github className="platform-icon" />
                    <span>GITHUB PROFILE</span>
                  </div>
                  <a href={`https://github.com/${activeStats.github.username}`} target="_blank" rel="noreferrer" className="ghost-btn">
                    <ExternalLink size={14} />
                  </a>
                </div>

                <div className="profile-hero">
                  <div className="avatar-frame">
                    <img src={activeStats.github.avatar} alt="GitHub Avatar" className="avatar-img" />
                    <div className="avatar-ring" />
                  </div>
                  <div className="hero-data">
                    <h3 className="name-bold">Priyabrata Sahoo</h3>
                    <p className="handle">@{activeStats.github.username}</p>
                    <div className="stats-strip">
                      <div className="stat-unit">
                        <Star size={12} /> <span><b>{activeStats.github.repos}</b> Repos</span>
                      </div>
                      <div className="stat-unit">
                        <GitBranch size={12} /> <span><b>{activeStats.github.followers}</b> Followers</span>
                      </div>
                    </div>
                  </div>
                </div>

                <ContributionGrid username={activeStats.github.username} />

                <div className="github-actions">
                   <div className="tech-pills">
                      {['MERN', 'Next.js', 'Three.js', 'GSAP'].map(t => <span key={t} className="pill">{t}</span>)}
                   </div>
                </div>
             </motion.div>
          </div>

          {/* RIGHT COLUMN: LEETCODE MASTERY */}
          <div className="hub-column">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card leetcode-card"
             >
                <div className="card-glare" />
                <div className="card-header">
                  <div className="platform-brand">
                    <Code2 className="platform-icon" color="#ffa116" />
                    <span>LEETCODE ELITE</span>
                  </div>
                  <div className="streak-badge">
                    <Zap size={14} /> {activeStats.leetcode.streak} DAY STREAK
                  </div>
                </div>

                <div className="lc-main-stats">
                   <div className="circular-wrap">
                      <svg viewBox="0 0 100 100" className="lc-ring">
                        <circle className="ring-track" cx="50" cy="50" r="44" />
                        <motion.circle 
                          className="ring-progress" 
                          cx="50" cy="50" r="44" 
                          initial={{ strokeDashoffset: 276 }}
                          whileInView={{ strokeDashoffset: 276 - (276 * (activeStats.leetcode.totalSolved / 3000)) }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, ease: "circOut" }}
                        />
                      </svg>
                      <div className="ring-inner">
                        <span className="count-big"><NumberCounter value={activeStats.leetcode.totalSolved} /></span>
                        <span className="count-label">SOLVED</span>
                      </div>
                   </div>

                   <div className="lc-diff-breakdown">
                      <DifficultyBar label="Easy" solved={activeStats.leetcode.easy} total={activeStats.leetcode.totalEasy} color="#00f3ff" delay={0.1} />
                      <DifficultyBar label="Medium" solved={activeStats.leetcode.medium} total={activeStats.leetcode.totalMedium} color="#8b5cf6" delay={0.2} />
                      <DifficultyBar label="Hard" solved={activeStats.leetcode.hard} total={activeStats.leetcode.totalHard} color="#ec4899" delay={0.3} />
                   </div>
                </div>

                <div className="lc-footer">
                   <div className="ranking-box">
                      <Trophy size={14} color="#ffd700" />
                      <span>GLOBAL RANKING: <b>#{activeStats.leetcode.ranking?.toLocaleString()}</b></span>
                   </div>
                   <button onClick={handleRefresh} className={`sync-btn ${refreshing ? 'spinning' : ''}`}>
                      <Activity size={16} />
                   </button>
                </div>
             </motion.div>

             <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card terminal-card"
             >
                <div className="terminal-header">
                  <div className="dots">
                    <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
                  </div>
                  <span className="term-title">system_activity_monitor.sh</span>
                </div>
                <div className="terminal-content">
                  <span className="prompt">$</span> <span className="command">tail -f activity_log.txt</span>
                  <div className="log-entries">
                    {telemetry.map((log, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="log-line"
                      >
                        <span className="time">[{log.time}]</span>
                        <span className="event">{log.msg}</span>
                        <span className="status">[OK]</span>
                      </motion.div>
                    ))}
                    <div className="log-line blink">_</div>
                  </div>
                </div>
             </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .gh-chart-img {
          width: 100%;
          filter: invert(1) hue-rotate(180deg) brightness(1.2) contrast(1.1);
          opacity: 0.8;
          transition: 0.3s;
          mix-blend-mode: screen;
        }
        .gh-chart-img:hover { opacity: 1; filter: invert(1) hue-rotate(180deg) brightness(1.6); }
        
        .heatmap-image-wrapper { 
          position: relative; 
          padding: 20px; 
          background: rgba(0,0,0,0.4); 
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.03);
          overflow: hidden;
          margin-bottom: 25px;
          box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.5);
        }

        .tech-frame-corners .corner {
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: var(--neon-cyan);
          border-style: solid;
          opacity: 0.5;
        }
        .top-left { top: 10px; left: 10px; border-width: 2px 0 0 2px; border-radius: 4px 0 0 0; }
        .top-right { top: 10px; right: 10px; border-width: 2px 2px 0 0; border-radius: 0 4px 0 0; }
        .bot-left { bottom: 10px; left: 10px; border-width: 0 0 2px 2px; border-radius: 0 0 0 4px; }
        .bot-right { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; border-radius: 0 0 4px 0; }

        .scanning-bar {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, var(--neon-cyan), transparent);
          box-shadow: 0 0 15px var(--neon-cyan);
          opacity: 0.3;
          animation: scan-horizontal 4s linear infinite;
          pointer-events: none;
        }
        @keyframes scan-horizontal {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }

        .live-status {
          font-size: 0.65rem;
          font-weight: 900;
          color: var(--neon-cyan);
          background: rgba(0, 243, 255, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          letter-spacing: 0.05em;
        }
        .label-dim { font-size: 0.75rem; color: #475569; font-weight: 600; }
        .legend-label { font-size: 0.65rem; color: #475569; font-weight: 800; text-transform: uppercase; margin-right: 8px; }

        .chart-overlay-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(0, 243, 255, 0.05), transparent);
          pointer-events: none;
        }
        .header-left { display: flex; align-items: center; gap: 10px; }
        .pulse-icon { color: var(--neon-cyan); animation: hub-pulse 2s infinite; }
        @keyframes hub-pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }

        .activity-premium-section {
          background: #020617;
          min-height: 100vh;
          padding: 140px 0;
          position: relative;
          color: #fff;
          font-family: 'Outfit', sans-serif;
          overflow: hidden;
        }

        .section-overlay-effects {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .glow-orb {
          position: absolute;
          width: 50vw;
          height: 50vw;
          filter: blur(160px);
          opacity: 0.08;
          border-radius: 50%;
        }
        .glow-orb.purple { top: -10%; left: -10%; background: #8b5cf6; }
        .glow-orb.cyan { bottom: -10%; right: -10%; background: #06b6d4; }

        .scanline {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent, rgba(0, 243, 255, 0.05) 50%, transparent);
          background-size: 100% 4px;
          pointer-events: none;
          z-index: 10;
          opacity: 0.3;
        }

        .activity-container {
          width: 92%;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 5;
        }

        /* Header Unit */
        .activity-header {
          text-align: center;
          margin-bottom: 80px;
        }
        .sync-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: var(--neon-cyan);
          margin-bottom: 24px;
        }
        .pulse-dot {
          width: 8px; height: 8px;
          background: var(--neon-cyan);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--neon-cyan);
          animation: pulse 2s infinite;
        }
        @keyframes pulse { 0% { opacity: 0.4; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.1); } 100% { opacity: 0.4; transform: scale(0.8); } }

        .title-massive {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 950;
          line-height: 0.9;
          letter-spacing: -0.04em;
          margin-bottom: 20px;
        }
        .gradient-text {
          background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 15px rgba(0, 243, 255, 0.4));
        }

        .hub-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 40px;
        }

        /* Card System */
        .glass-card {
          background: rgba(15, 23, 42, 0.3);
          backdrop-filter: blur(20px);
          border: 1.5px solid rgba(255, 255, 255, 0.05);
          border-radius: 40px;
          padding: 40px;
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-card:hover {
          background: rgba(15, 23, 42, 0.5);
          border-color: rgba(0, 243, 255, 0.2);
          transform: translateY(-5px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }

        .card-glare {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, rgba(255,255,255,0.05), transparent 70%);
          pointer-events: none;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        .platform-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 800;
          letter-spacing: 0.1em;
          font-size: 0.85rem;
          color: #94a3b8;
        }
        .platform-icon { width: 24px; height: 24px; }

        /* GitHub Profile Unit */
        .profile-hero {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 40px;
        }
        .avatar-frame {
          position: relative;
          width: 85px; height: 85px;
          padding: 3px;
          background: #334155;
          border-radius: 24px;
        }
        .avatar-img { width: 100%; height: 100%; border-radius: 21px; }
        .avatar-ring { position: absolute; inset: -4px; border: 1.5px solid var(--neon-cyan); border-radius: 28px; opacity: 0.3; }

        .name-bold { font-size: 1.8rem; font-weight: 900; margin-bottom: 4px; }
        .handle { color: #64748b; font-weight: 600; font-size: 0.9rem; margin-bottom: 15px; }
        .stats-strip { display: flex; gap: 20px; }
        .stat-unit { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: #94a3b8; }
        .stat-unit b { color: #fff; }

        /* Heatmap System */
        .github-heatmap {
          background: rgba(0,0,0,0.2);
          padding: 24px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.03);
          margin-bottom: 30px;
        }
        .heatmap-header { display: flex; justify-content: space-between; font-size: 0.75rem; color: #64748b; font-weight: 700; margin-bottom: 15px; }
        .heatmap-legend { display: flex; align-items: center; gap: 6px; }
        .heatmap-grid { display: grid; grid-template-columns: repeat(14, 1fr); gap: 8px; }
        .heat-cell { width: 100%; aspect-ratio: 1; border-radius: 3px; }
        .heat-cell.level-0 { background: #1e293b; }
        .heat-cell.level-1 { background: #0e4429; }
        .heat-cell.level-2 { background: #006d32; }
        .heat-cell.level-3 { background: #26a641; }
        .heat-cell.level-4 { background: #39d353; box-shadow: 0 0 10px rgba(57, 211, 83, 0.4); }

        /* LeetCode Mastery UI */
        .lc-main-stats {
          display: flex;
          align-items: center;
          gap: 40px;
          margin-bottom: 40px;
        }
        .circular-wrap {
          position: relative;
          width: 180px; height: 180px;
          flex-shrink: 0;
        }
        .lc-ring { transform: rotate(-90deg); }
        .ring-track { fill: none; stroke: rgba(255,255,255,0.03); stroke-width: 6; }
        .ring-progress { fill: none; stroke: #ffa116; stroke-width: 6; stroke-linecap: round; stroke-dasharray: 276; }
        .ring-inner { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .count-big { font-size: 3.5rem; font-weight: 950; color: #fff; line-height: 1; }
        .count-label { font-size: 0.7rem; font-weight: 800; color: #64748b; letter-spacing: 0.2em; margin-top: 5px; }

        .tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 20px;
        }

        .pill {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #94a3b8;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }

        .pill:hover {
          background: rgba(0, 243, 255, 0.05);
          border-color: rgba(0, 243, 255, 0.3);
          color: #00f3ff;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 243, 255, 0.1);
        }

        .lc-diff-breakdown { flex-grow: 1; display: flex; flex-direction: column; gap: 20px; }
        .diff-header { display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 800; margin-bottom: 8px; }
        .diff-label { color: #94a3b8; text-transform: uppercase; }
        .bar-bg { height: 6px; background: rgba(255,255,255,0.04); border-radius: 10px; overflow: hidden; }
        .bar-fill { height: 100%; border-radius: 10px; transition: width 1s; }

        /* Terminal Unit */
        .terminal-card { margin-top: 20px; padding: 25px; border-radius: 30px; background: #0a0f1e; border: 1px solid rgba(0, 243, 255, 0.1); }
        .terminal-header { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 10px; }
        .dots { display: flex; gap: 6px; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .dot.red { background: #ff5f56; }
        .dot.yellow { background: #ffbd2e; }
        .dot.green { background: #27c93f; }
        .term-title { font-size: 0.7rem; color: #64748b; font-family: monospace; }
        .terminal-content { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: #94a3b8; }
        .command { color: #00f3ff; }
        .prompt { color: #8b5cf6; }
        .log-entries { margin-top: 15px; display: flex; flex-direction: column; gap: 8px; }
        .log-line { font-size: 0.75rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .time { color: #475569; margin-right: 10px; }
        .status { color: #22c55e; margin-left: 10px; }
        .blink { animation: blink 1s infinite; }
        @keyframes blink { 50% { opacity: 0; } }

        /* Utility Components */
        .sync-loader { display: flex; flex-direction: column; align-items: center; gap: 20px; }
        .sync-icon { width: 40px; height: 40px; color: var(--neon-cyan); animation: spin 2s linear infinite; }
        .sync-text { font-weight: 800; font-size: 0.8rem; letter-spacing: 0.3em; color: var(--neon-cyan); }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .lc-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05); }
        .ranking-box { display: flex; align-items: center; gap: 10px; font-size: 0.75rem; color: #94a3b8; font-weight: 700; }
        .sync-btn { padding: 10px; border-radius: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); color: #64748b; cursor: pointer; transition: 0.3s; }
        .sync-btn:hover { color: #fff; background: rgba(255,255,255,0.08); }
        .sync-btn.spinning { animation: spin 1s linear infinite; }

        /* ── Tablet (≤ 1100px) ── */
        @media (max-width: 1100px) {
          .hub-grid { grid-template-columns: 1fr; gap: 24px; }
          .glass-card { padding: 30px; border-radius: 28px; }
          .activity-premium-section { padding: 100px 0; }
          .activity-header { margin-bottom: 50px; }
          .lc-main-stats { flex-direction: row; align-items: center; gap: 30px; }
          .circular-wrap { width: 160px; height: 160px; }
          .count-big { font-size: 2.8rem; }
        }

        /* ── Mobile (≤ 768px) ── */
        @media (max-width: 768px) {
          .activity-premium-section { padding: 80px 0 60px; }
          .activity-container { width: 95%; }
          .activity-header { margin-bottom: 40px; }

          .title-massive { font-size: clamp(2.2rem, 8vw, 3.5rem); letter-spacing: -0.03em; }
          .sync-badge { font-size: 0.6rem; padding: 6px 12px; }

          .glass-card { padding: 24px; border-radius: 24px; }
          .card-header { margin-bottom: 24px; }

          /* GitHub card */
          .profile-hero { gap: 16px; margin-bottom: 24px; }
          .avatar-frame { width: 65px; height: 65px; border-radius: 18px; }
          .avatar-img { border-radius: 15px; }
          .name-bold { font-size: 1.4rem; }
          .handle { font-size: 0.8rem; margin-bottom: 10px; }
          .stats-strip { gap: 14px; flex-wrap: wrap; }

          /* Heatmap */
          .github-heatmap { padding: 16px; border-radius: 16px; }
          .heatmap-header { flex-direction: column; align-items: flex-start; gap: 10px; }
          .heatmap-legend { display: none; }
          .heatmap-image-wrapper { padding: 12px; border-radius: 14px; }

          /* LeetCode stats — stack vertically */
          .lc-main-stats { flex-direction: column; align-items: center; gap: 24px; margin-bottom: 24px; }
          .circular-wrap { width: 150px; height: 150px; flex-shrink: 0; }
          .count-big { font-size: 2.6rem; }
          .lc-diff-breakdown { width: 100%; }
          .diff-header { font-size: 0.75rem; }

          /* Terminal */
          .terminal-card { padding: 18px; border-radius: 20px; margin-top: 16px; }
          .log-line { font-size: 0.7rem; white-space: normal; word-break: break-all; }

          /* LeetCode footer */
          .lc-footer { flex-direction: column; align-items: flex-start; gap: 12px; margin-top: 20px; padding-top: 16px; }
          .ranking-box { font-size: 0.7rem; }

          /* Tech pills */
          .tech-pills { gap: 8px; margin-top: 14px; }
          .pill { padding: 6px 12px; font-size: 0.7rem; }
        }

        /* ── Mobile Small (≤ 600px) ── */
        @media (max-width: 600px) {
          .activity-premium-section { padding: 70px 0 50px; }
          .activity-container { width: 96%; }

          .title-massive { font-size: clamp(1.9rem, 9vw, 2.8rem); }
          .sync-badge { font-size: 0.55rem; letter-spacing: 0.1em; }

          .glass-card { padding: 18px; border-radius: 20px; }
          .card-header { margin-bottom: 18px; }
          .platform-brand { font-size: 0.75rem; gap: 8px; }
          .platform-icon { width: 18px; height: 18px; }

          /* GitHub */
          .profile-hero { flex-direction: column; align-items: flex-start; gap: 12px; margin-bottom: 18px; }
          .avatar-frame { width: 60px; height: 60px; border-radius: 16px; }
          .name-bold { font-size: 1.2rem; }
          .stats-strip { gap: 10px; }
          .stat-unit { font-size: 0.75rem; }

          /* Heatmap */
          .github-heatmap { padding: 12px; border-radius: 14px; margin-bottom: 18px; }
          .heatmap-image-wrapper { padding: 10px; border-radius: 12px; margin-bottom: 14px; }

          /* LeetCode */
          .circular-wrap { width: 130px; height: 130px; }
          .count-big { font-size: 2.2rem; }
          .count-label { font-size: 0.6rem; }
          .diff-item { margin-bottom: 4px; }

          /* Terminal */
          .terminal-card { padding: 14px; border-radius: 16px; }
          .term-title { font-size: 0.6rem; }
          .terminal-content { font-size: 0.78rem; }
          .log-entries { gap: 6px; }

          /* streak badge */
          .streak-badge { font-size: 0.65rem; padding: 4px 8px; }
        }

        /* ── Tiny (≤ 480px) ── */
        @media (max-width: 480px) {
          .title-massive { font-size: 1.8rem; }
          .glass-card { padding: 14px; border-radius: 18px; }

          .profile-hero { gap: 10px; }
          .avatar-frame { width: 52px; height: 52px; border-radius: 14px; }
          .name-bold { font-size: 1.1rem; }

          .circular-wrap { width: 115px; height: 115px; }
          .count-big { font-size: 1.9rem; }

          .tech-pills { gap: 6px; }
          .pill { padding: 5px 10px; font-size: 0.65rem; border-radius: 8px; }

          .lc-footer { gap: 10px; padding-top: 12px; margin-top: 14px; }
          .ranking-box { font-size: 0.65rem; }
          .sync-btn { padding: 8px; border-radius: 10px; }
        }

        /* ── Ultra Small (≤ 400px) ── */
        @media (max-width: 400px) {
          .activity-premium-section { padding: 60px 0 40px; }
          .title-massive { font-size: 1.6rem; }
          .glass-card { padding: 12px; border-radius: 16px; }
          .circular-wrap { width: 100px; height: 100px; }
          .count-big { font-size: 1.7rem; }
          .heatmap-image-wrapper { padding: 8px; }
          .terminal-card { padding: 12px; }
          .log-line { font-size: 0.65rem; }
        }
      `}</style>
    </section>
  )
}

export default memo(ActivityHub)
