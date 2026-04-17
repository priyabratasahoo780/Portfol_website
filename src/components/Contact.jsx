import { useState, useRef, useCallback, memo, useEffect } from 'react'
import { sendContactMessage } from '../services/emailService'
import { Send, Github, Linkedin, Twitter, Youtube } from 'lucide-react'
import { motion } from 'framer-motion'

// Move animation variants outside component to prevent recreation
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
}

// Email service is handled centrally in src/services/emailService.js

// Memoized ContactForm for performance
const ContactForm = memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' })

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setStatusMessage(prev => prev.text ? { type: '', text: '' } : prev)
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setStatusMessage({ type: '', text: '' })

    try {
      await sendContactMessage(formData)
      setStatusMessage({ type: 'success', text: 'Message sent successfully!' })
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Submission Error:', error)
      setStatusMessage({ type: 'error', text: error.message || error.text || 'Something went wrong. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }, [formData])

  return (
    <motion.form variants={itemVariants} className="premium-contact-form" onSubmit={handleSubmit}>
      <div className="premium-input-group">
        <input 
          type="text" 
          name="name" 
          placeholder="Your Name"
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div className="premium-input-group">
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email"
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div className="premium-input-group">
        <textarea 
          name="message" 
          rows="4" 
          placeholder="Your Message"
          value={formData.message} 
          onChange={handleChange} 
          required
        ></textarea>
      </div>

      {statusMessage.text && (
        <div className={`status-mini-alert ${statusMessage.type}`}>
          {statusMessage.text}
        </div>
      )}

      <button type="submit" className="premium-gradient-btn full-width" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Message'}
      </button>
    </motion.form>
  )
})

ContactForm.displayName = 'ContactForm'

const Contact = () => {
  const sectionRef = useRef(null)

  return (
    <section id="contact" className="premium-contact-section" ref={sectionRef}>
      
      <motion.div 
        className="premium-contact-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h2 variants={itemVariants} className="main-section-title">
          Contact Us
        </motion.h2>

        <div className="contact-grid">
          {/* Left Column: Contact Info */}
          <motion.div variants={itemVariants} className="contact-card glass tech-frame">
            <div className="tech-frame-corners">
              <div className="corner top-left"></div>
              <div className="corner top-right"></div>
              <div className="corner bot-left"></div>
              <div className="corner bot-right"></div>
            </div>
            <div className="scanning-bar"></div>
            
            <div className="card-header-telemetry">
              <h3 className="card-title">Link Up</h3>
              <div className="telemetry-badge">SECURE_CHANNEL</div>
            </div>
            
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Comm-Protocol</span>
                <p className="info-value">priyabratasahoo780@gmail.com</p>
              </div>
              
              <div className="info-item">
                <span className="info-label">Uplink-Point</span>
                <p className="info-value">Gujarat, India <span className="coord-text">[22.3094° N, 70.8007° E]</span></p>
              </div>
            </div>
            
            <div className="info-item">
              <span className="info-label">Active Social Streams</span>
              <div className="social-icon-row">
                <a href="https://github.com/priyabratasahoo780" className="social-pill" target="_blank" rel="noopener noreferrer">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com/in/priyabrata-sahoo" className="social-pill" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={20} />
                </a>
                <a href="https://youtube.com/@priyabratasahoo780" className="social-pill" target="_blank" rel="noopener noreferrer">
                  <Youtube size={20} />
                </a>
                <a href="https://leetcode.com/u/Priyabrata_Sahoo780/" className="social-pill" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414 0-1.954l-4.277-4.193a5.938 5.938 0 0 0-1.271-1.818 5.83 5.83 0 0 0-.349-1.017 5.527 5.527 0 0 0-.062-2.362 5.35 5.35 0 0 0 .125-.513 5.266 5.266 0 0 0 1.209-2.104l3.854-4.126 5.406-5.788a1.374 1.374 0 0 0-.961-2.17zM12 13h7.5a1 1 0 0 0 0-2H12a1 1 0 0 0 0 2z" />
                  </svg>
                </a>
              </div>
            </div>

            <a 
              href="/Priyabrata_Sahoo.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="resume-btn-link"
              download="Priyabrata Sahoo"
            >
              <button className="premium-gradient-btn resume-btn mt-auto">
                Retrieve Resume
              </button>
            </a>
          </motion.div>

          {/* Right Column: Message Form */}
          <motion.div variants={itemVariants} className="contact-card glass tech-frame">
            <div className="tech-frame-corners">
              <div className="corner top-left"></div>
              <div className="corner top-right"></div>
              <div className="corner bot-left"></div>
              <div className="corner bot-right"></div>
            </div>
            <div className="scanning-bar slow"></div>
            <div className="card-header-telemetry">
              <h3 className="card-title">Transmit</h3>
              <div className="telemetry-badge pulse">AWAITING_INPUT</div>
            </div>
            <ContactForm />
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        :root {
          --neon-cyan: #00f3ff;
          --neon-purple: #bf00ff;
        }

        .premium-contact-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 100px 0;
          position: relative;
          background: radial-gradient(circle at 50% 50%, #0B0E23 0%, #05070A 100%);
          overflow: hidden;
        }

        .premium-contact-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0, 243, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 243, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(circle at 50% 50%, black, transparent 80%);
          pointer-events: none;
        }

        .premium-contact-container {
          width: 90%;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 50;
        }

        .main-section-title {
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 900;
          text-align: center;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 60px;
          background: linear-gradient(to bottom, #fff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 10px rgba(0, 243, 255, 0.3));
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 40px;
        }

        .contact-card {
          background: rgba(13, 17, 34, 0.6);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(0, 243, 255, 0.1);
          border-radius: 24px;
          padding: 45px;
          display: flex;
          flex-direction: column;
          gap: 25px;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          overflow: hidden;
        }

        .tech-frame-corners .corner {
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: var(--neon-cyan);
          border-style: solid;
          opacity: 0.5;
        }
        .top-left { top: 15px; left: 15px; border-width: 2px 0 0 2px; border-radius: 4px 0 0 0; }
        .top-right { top: 15px; right: 15px; border-width: 2px 2px 0 0; border-radius: 0 4px 0 0; }
        .bot-left { bottom: 15px; left: 15px; border-width: 0 0 2px 2px; border-radius: 0 0 0 4px; }
        .bot-right { bottom: 15px; right: 15px; border-width: 0 2px 2px 0; border-radius: 0 0 4px 0; }

        .scanning-bar {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, var(--neon-cyan), transparent);
          box-shadow: 0 0 15px var(--neon-cyan);
          opacity: 0.2;
          animation: scan-v 4s linear infinite;
        }
        .scanning-bar.slow { animation-duration: 6s; }

        @keyframes scan-v {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }

        .card-header-telemetry {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .card-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
        }

        .telemetry-badge {
          font-family: monospace;
          font-size: 0.65rem;
          color: var(--neon-cyan);
          background: rgba(0, 243, 255, 0.1);
          padding: 4px 8px;
          border-radius: 4px;
          letter-spacing: 0.1em;
          border: 1px solid rgba(0, 243, 255, 0.2);
        }

        .telemetry-badge.pulse {
          animation: badge-pulse 2s infinite;
        }
        @keyframes badge-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .info-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .info-label {
          color: #475569;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .info-value {
          color: #cbd5e1;
          font-size: 1rem;
          font-weight: 600;
        }

        .coord-text {
          color: var(--neon-purple);
          font-family: monospace;
          font-size: 0.8rem;
          margin-left: 8px;
          opacity: 0.7;
        }

        .social-icon-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 12px;
          margin-top: 10px;
        }

        .social-pill {
          width: 46px;
          height: 46px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(0, 243, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .social-pill:hover {
          color: var(--neon-cyan);
          border-color: var(--neon-cyan);
          background: rgba(0, 243, 255, 0.1);
          box-shadow: 0 0 15px rgba(0, 243, 255, 0.2);
          transform: translateY(-5px) scale(1.1);
        }

        .premium-gradient-btn {
          position: relative;
          padding: 16px 32px;
          background: #000;
          border: 1px solid var(--neon-cyan);
          border-radius: 12px;
          color: #fff;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s;
          width: 100%;
          text-align: center;
          box-shadow: 0 0 10px rgba(0, 243, 255, 0.1);
        }

        .premium-gradient-btn:hover {
          background: var(--neon-cyan);
          color: #000;
          box-shadow: 0 0 30px rgba(0, 243, 255, 0.5);
          transform: translateY(-3px);
        }

        .premium-input-group {
          margin-bottom: 20px;
        }

        .premium-input-group input,
        .premium-input-group textarea {
          width: 100%;
          padding: 16px 20px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          color: #fff;
          font-size: 0.95rem;
          transition: all 0.3s;
        }

        .premium-input-group input:focus,
        .premium-input-group textarea:focus {
          border-color: var(--neon-cyan);
          background: rgba(0, 243, 255, 0.02);
          box-shadow: 0 0 15px rgba(0, 243, 255, 0.1);
          outline: none;
        }

        .full-width { width: 100%; }

        .status-mini-alert {
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .status-mini-alert.success { background: rgba(34, 197, 94, 0.1); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.2); }
        .status-mini-alert.error { background: rgba(239, 68, 68, 0.1); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.2); }

        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; }
          .premium-contact-container { max-width: 600px; }
        }
      `}</style>
    </section>
  )
}

export default Contact

