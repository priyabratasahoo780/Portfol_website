import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { X, Play, Pause, RotateCcw, Settings as SettingsIcon, Volume2, TrendingUp } from 'lucide-react';
import VolumetricBackground from './ui/VolumetricBackground';
import './PomodoroTimer.css'; // Import responsive styles

const focusQuotes = [
  "Deep work is rare, valuable, and meaningful.",
  "Focus is the gateway to thinking clearly.",
  "Master your focus, master your life.",
  "The quality of your attention determines the quality of your experience.",
  "Concentrate all your thoughts upon the work at hand.",
  "Focused action beats scattered intention."
];

const PomodoroTimer = ({ isOpen, onClose }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Default 25 minutes
  const [sessionType, setSessionType] = useState('study'); // study, shortBreak, longBreak
  const [showSettings, setShowSettings] = useState(false);
  
  // Settings
  const [studyTime, setStudyTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [autoStart, setAutoStart] = useState(false);
  const [focusMode, setFocusMode] = useState('medium'); // low, medium, deep
  const [soundEffect, setSoundEffect] = useState('none'); // none, rain, forest, ticking
  const [dailyGoal, setDailyGoal] = useState(6);
  
  // Analytics
  const [completedSessions, setCompletedSessions] = useState(0);
  const [focusStreak, setFocusStreak] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(focusQuotes[0]);
  
  const timerRef = useRef(null);
  const cardRef = useRef(null);
  const containerRef = useRef(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pomodoroSettings');
    if (saved) {
      const settings = JSON.parse(saved);
      setStudyTime(settings.studyTime || 25);
      setShortBreakTime(settings.shortBreakTime || 5);
      setLongBreakTime(settings.longBreakTime || 15);
      setAutoStart(settings.autoStart || false);
      setFocusMode(settings.focusMode || 'medium');
      setSoundEffect(settings.soundEffect || 'none');
      setDailyGoal(settings.dailyGoal || 6);
      setCompletedSessions(settings.completedSessions || 0);
      setFocusStreak(settings.focusStreak || 0);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    const settings = {
      studyTime,
      shortBreakTime,
      longBreakTime,
      autoStart,
      focusMode,
      soundEffect,
      dailyGoal,
      completedSessions,
      focusStreak
    };
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
  }, [studyTime, shortBreakTime, longBreakTime, autoStart, focusMode, soundEffect, dailyGoal, completedSessions, focusStreak]);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionComplete();
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft]);

  // Update time when session type or settings change
  useEffect(() => {
    if (!isRunning) {
      if (sessionType === 'study') setTimeLeft(studyTime * 60);
      else if (sessionType === 'shortBreak') setTimeLeft(shortBreakTime * 60);
      else if (sessionType === 'longBreak') setTimeLeft(longBreakTime * 60);
    }
  }, [sessionType, studyTime, shortBreakTime, longBreakTime]);

  // 3D Parallax effect
  useEffect(() => {
    if (!cardRef.current || !isOpen) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 20;
      const yPos = (clientY / innerHeight - 0.5) * 20;

      gsap.to(cardRef.current, {
        rotateY: xPos,
        rotateX: -yPos,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen]);

  // Entry animation
  useEffect(() => {
    if (isOpen && containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [isOpen]);

  const handleSessionComplete = () => {
    setIsRunning(false);
    
    if (sessionType === 'study') {
      setCompletedSessions(prev => prev + 1);
      setFocusStreak(prev => prev + 1);
      
      // Brain boost animation
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          scale: 1.1,
          duration: 0.3,
          yoyo: true,
          repeat: 3,
          ease: 'power2.inOut'
        });
      }
      
      // Random quote
      setCurrentQuote(focusQuotes[Math.floor(Math.random() * focusQuotes.length)]);
      
      // Auto-start break
      if (autoStart) {
        setTimeout(() => {
          setSessionType(completedSessions % 4 === 3 ? 'longBreak' : 'shortBreak');
          setIsRunning(true);
        }, 2000);
      }
    } else {
      // Break complete - auto start study
      if (autoStart) {
        setTimeout(() => {
          setSessionType('study');
          setIsRunning(true);
        }, 2000);
      }
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (sessionType === 'study') setTimeLeft(studyTime * 60);
    else if (sessionType === 'shortBreak') setTimeLeft(shortBreakTime * 60);
    else setTimeLeft(longBreakTime * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = sessionType === 'study'
    ? ((studyTime * 60 - timeLeft) / (studyTime * 60)) * 100
    : sessionType === 'shortBreak'
    ? ((shortBreakTime * 60 - timeLeft) / (shortBreakTime * 60)) * 100
    : ((longBreakTime * 60 - timeLeft) / (longBreakTime * 60)) * 100;

  if (!isOpen) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center pomodoro-overlay  align-center"
      style={{
        background: isDarkMode 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
          : 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)',
        transition: 'background 0.5s ease'
      }}
    >
      <VolumetricBackground isDarkMode={isDarkMode} />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: isDarkMode ? '#fff' : '#1e293b',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2 });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
        }}
      >
        <X size={24} />
      </button>



      {/* Main Timer Card */}
      <motion.div
        ref={cardRef}
        className="pomodoro-card"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          position: 'relative',
          zIndex: 10,
          background: isDarkMode
              ? 'rgba(30, 41, 59, 0.7)'
              : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          boxShadow: isDarkMode
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(99, 102, 241, 0.3)'
              : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(139, 92, 246, 0.3)',
          color: isDarkMode ? '#fff' : '#1e293b',
          transition: 'all 0.5s ease'
        }}
      >
        <div
          style={{
             display: 'flex', flexDirection: 'column'
          }}
        >
          {/* Session Type Tabs */}
          <div className="session-tabs-container" style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['study', 'shortBreak', 'longBreak'].map((type) => (
              <button
                key={type}
                className="session-btn"
                onClick={() => !isRunning && setSessionType(type)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '12px',
                  background: sessionType === type 
                    ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                    : 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#fff',
                  cursor: isRunning ? 'not-allowed' : 'pointer',
                  fontSize: '11px',
                  fontWeight: '600',
                  opacity: isRunning && sessionType !== type ? 0.5 : 1,
                  transition: 'all 0.3s ease',
                  flex: '1 1 auto',
                  whiteSpace: 'nowrap'
                }}
              >
                {type === 'study' ? '🎯 Study' : type === 'shortBreak' ? '☕ Break' : '🌴 Long'}
              </button>
            ))}
          </div>

          {/* Timer Display */}
          <div className="timer-ring-container" style={{ textAlign: 'center', position: 'relative' }}>
            {/* Progress Ring */}
            <svg
              className="timer-ring-svg"
              viewBox="0 0 280 280"
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-90deg)' }}
            >
              <circle
                cx="140"
                cy="140"
                r="130"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="8"
              />
              <circle
                cx="140"
                cy="140"
                r="130"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 130}`}
                strokeDashoffset={`${2 * Math.PI * 130 * (1 - progress / 100)}`}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Centered Content Wrapper */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                zIndex: 10,
                pointerEvents: 'none'
              }}
            >
              {/* Time */}
              <div
                className="timer-text"
                style={{
                  fontWeight: '700',
                  letterSpacing: '-1px',
                  textShadow: '0 2px 10px rgba(99, 102, 241, 0.5)',
                  margin: 0,
                  lineHeight: '1',
                  marginBottom: '10px' /* Increased from 4px to match larger scale */
                }}
              >
                {formatTime(timeLeft)}
              </div>

              {/* Controls */}
              <div className="controls-container" style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                gap: '20px', /* Matches CSS gap */
                margin: 0,
                pointerEvents: 'auto'
              }}
            >
                 <button
                  className="control-btn"
                  onClick={resetTimer}
                  style={{
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: isDarkMode ? '#fff' : '#1e293b',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2 })}
                  onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}
                >
                  <RotateCcw size={20} /> {/* Increased icon size */}
                </button>

                <button
                  className="control-btn"
                  onClick={toggleTimer}
                  style={{
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.5)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2 })}
                  onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}
                >
                  {isRunning ? <Pause size={24} /> : <Play size={24} fill="currentColor" />} {/* Increased icon size */}
                </button>

                <button
                  className="control-btn"
                  onClick={() => setShowSettings(!showSettings)}
                  style={{
                    borderRadius: '50%',
                    background: showSettings ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.1, rotate: 45, duration: 0.2 })}
                  onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, rotate: 0, duration: 0.2 })}
                >
                  <SettingsIcon size={20} /> {/* Increased icon size */}
                </button>
              </div>
            </div>
          </div>



          {/* Quote */}
          <motion.div
            className="quote-container"
            key={currentQuote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center',
              fontSize: '11px', /* Reduced from 14px */
              fontStyle: 'italic',
              opacity: 0.8,
              padding: '0 8px'
            }}
          >
            "{currentQuote}"
          </motion.div>

          {/* Stats */}
          <div className="stats-container" style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#6366f1' }}>{completedSessions}</div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>Sessions</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#8b5cf6' }}>{focusStreak}</div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>Streak 🔥</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6' }}>{Math.floor((completedSessions / dailyGoal) * 100)}%</div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>Daily Goal</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
           className="settings-panel"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          style={{
            position: 'absolute',
           
            top: '50%',
            transform: 'translateY(-50%)',
            background: isDarkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            borderRadius: '24px',
            color: isDarkMode ? '#fff' : '#1e293b',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            zIndex: 20,
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>⚙️ Settings</h3>
          
          {/* Study Time */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>
              Study Session: {studyTime} min
            </label>
            <input
              type="range"
              min="1"
              max="60"
              value={studyTime}
              onChange={(e) => setStudyTime(parseInt(e.target.value))}
              disabled={isRunning}
              style={{ width: '100%', accentColor: '#6366f1' }}
            />
          </div>

          {/* Short Break */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>
              Short Break: {shortBreakTime} min
            </label>
            <input
              type="range"
              min="1"
              max="30"
              value={shortBreakTime}
              onChange={(e) => setShortBreakTime(parseInt(e.target.value))}
              disabled={isRunning}
              style={{ width: '100%', accentColor: '#8b5cf6' }}
            />
          </div>

          {/* Long Break */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>
              Long Break: {longBreakTime} min
            </label>
            <input
              type="range"
              min="1"
              max="60"
              value={longBreakTime}
              onChange={(e) => setLongBreakTime(parseInt(e.target.value))}
              disabled={isRunning}
              style={{ width: '100%', accentColor: '#3b82f6' }}
            />
          </div>

          {/* Focus Mode */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>Focus Intensity</label>
            <select
              value={focusMode}
              onChange={(e) => setFocusMode(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: isDarkMode ? '#fff' : '#1e293b',
                fontSize: '14px'
              }}
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="deep">🔴 Deep Focus</option>
            </select>
          </div>

          {/* Sound Effect */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>
              <Volume2 size={16} style={{ display: 'inline', marginRight: '8px' }} />
              Background Sound
            </label>
            <select
              value={soundEffect}
              onChange={(e) => setSoundEffect(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: isDarkMode ? '#fff' : '#1e293b',
                fontSize: '14px'
              }}
            >
              <option value="none">🔇 None</option>
              <option value="rain">🌧️ Rain</option>
              <option value="forest">🌲 Forest</option>
              <option value="ticking">⏱️ Ticking</option>
            </select>
          </div>

          {/* Daily Goal */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>
              Daily Goal: {dailyGoal} sessions
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(parseInt(e.target.value))}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: isDarkMode ? '#fff' : '#1e293b',
                fontSize: '14px'
              }}
            />
          </div>

          {/* Auto Start */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={autoStart}
                onChange={(e) => setAutoStart(e.target.checked)}
                style={{ marginRight: '12px', width: '20px', height: '20px', accentColor: '#6366f1' }}
              />
              <span style={{ fontSize: '14px' }}>Auto-start next session</span>
            </label>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PomodoroTimer;
