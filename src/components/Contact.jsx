import { useState, useRef, useCallback, memo, useEffect } from 'react'
import { sendContactMessage } from '../services/emailService'
import { Send, Github, Linkedin, Twitter, Youtube } from 'lucide-react'
import { motion } from 'framer-motion'
import GalaxyBackground from './ui/GalaxyBackground'

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
      <GalaxyBackground />
      
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
          <motion.div variants={itemVariants} className="contact-card glass">
            <h3 className="card-title">Contact Information</h3>
            
            <div className="info-item">
              <span className="info-label">Email</span>
              <p className="info-value">priyabratasahoo780@gmail.com</p>
            </div>
            
            <div className="info-item">
              <span className="info-label">Location</span>
              <p className="info-value">Gujarat, India</p>
            </div>
            
            <div className="info-item">
              <span className="info-label">Social Profiles</span>
              <div className="social-icon-row">
                <a href="https://github.com/priyabratasahoo780" className="social-pill" target="_blank" rel="noopener noreferrer">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com/in/priyabrata-sahoo" className="social-pill" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={20} />
                </a>
                <a href="https://twitter.com" className="social-pill" target="_blank" rel="noopener noreferrer">
                  <Twitter size={20} />
                </a>
                <a href="https://youtube.com" className="social-pill" target="_blank" rel="noopener noreferrer">
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            <button className="premium-gradient-btn resume-btn mt-auto">
              View Resume
            </button>
          </motion.div>

          {/* Right Column: Message Form */}
          <motion.div variants={itemVariants} className="contact-card glass">
            <h3 className="card-title">Send a Message</h3>
            <ContactForm />
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        .premium-contact-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 80px 0;
          position: relative;
          background: radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%);
          overflow: hidden;
        }

        .premium-contact-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(circle at 50% 50%, black, transparent 80%);
          pointer-events: none;
        }

        .premium-contact-container {
          width: 90%;
          max-width: 1000px; /* Slimmer layout */
          margin: 0 auto;
          position: relative;
          z-index: 50;
        }

        .main-section-title {
          font-size: 3.2rem; /* More compact title */
          font-weight: 900;
          text-align: center;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 50px;
          text-shadow: 
            0 0 15px rgba(139, 92, 246, 0.7),
            0 0 30px rgba(139, 92, 246, 0.5);
          animation: flicker 4s infinite step-end;
          margin-top: -10px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 35px;
        }

        .contact-card {
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: 30px;
          padding: 40px; /* Reduced padding */
          display: flex;
          flex-direction: column;
          gap: 30px; /* Reduced gap */
          position: relative;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .contact-card:hover {
          transform: translateY(-5px);
          border-color: rgba(139, 92, 246, 0.4);
        }

        .card-title {
          font-size: 2rem;
          font-weight: 800;
          color: #fff;
          text-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
          margin-bottom: 5px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .info-label {
          color: #ec4899;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          opacity: 0.8;
        }

        .info-value {
          color: #f8fafc;
          font-size: 1.15rem;
          font-weight: 600;
        }

        .social-icon-row {
          display: flex;
          flex-direction: row;
          gap: 15px;
          margin-top: 5px;
        }

        .social-pill {
          width: 50px; /* Smaller pills */
          height: 50px;
          border-radius: 14px;
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          transition: all 0.3s ease;
        }

        .social-pill:hover {
          color: #fff;
          background: #8b5cf6;
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
          transform: translateY(-5px) scale(1.1);
        }

        /* Continuous Rainbow Border Button */
        .premium-gradient-btn {
          position: relative;
          padding: 18px 36px;
          background: #020617; /* Dark background as base */
          border: none;
          border-radius: 12px;
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          overflow: hidden;
          z-index: 1;
          transition: transform 0.3s;
        }

        .premium-gradient-btn::before {
          content: '';
          position: absolute;
          top: -150%;
          left: -150%;
          width: 400%;
          height: 400%;
          background: conic-gradient(
            #fd004c, #fe9000, #fff020, #3edf4b, 
            #3363ff, #b102b7, #fd004c
          );
          animation: rainbowRotate 4s linear infinite;
          z-index: -2;
        }

        .premium-gradient-btn::after {
          content: '';
          position: absolute;
          inset: 2px; /* Border thickness */
          background: #020617;
          border-radius: 10px;
          z-index: -1;
          transition: background 0.3s;
        }

        .premium-gradient-btn:hover {
          transform: scale(1.02);
        }

        .premium-gradient-btn:hover::after {
          background: #0f172a; /* Slightly lighter on hover */
        }

        @keyframes rainbowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .resume-btn {
          margin-top: auto;
          background: #020617;
        }

        .premium-input-group input,
        .premium-input-group textarea {
          width: 100%;
          padding: 18px 22px;
          background: rgba(2, 6, 23, 0.7);
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: 15px;
          color: #fff;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s;
        }

        .premium-input-group input:focus,
        .premium-input-group textarea:focus {
          border-color: #ec4899;
          box-shadow: 0 0 15px rgba(236, 72, 153, 0.1);
        }

        @keyframes flicker {
          0%, 18%, 22%, 25%, 53%, 57%, 100% { text-shadow: 0 0 10px rgba(139, 92, 246, 0.6), 0 0 20px rgba(139, 92, 246, 0.4); }
          20%, 24%, 55% { text-shadow: none; }
        }

        @media (max-width: 950px) {
          .contact-grid { grid-template-columns: 1fr; }
          .premium-contact-container { max-width: 600px; }
          .main-section-title { font-size: 2.2rem; }
        }
      `}</style>
    </section>
  )
}

export default Contact

