import { useState, useRef, useCallback, memo } from 'react'
import { Send } from 'lucide-react'
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

// API URL - compute once
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/contact'

// Memoized ContactForm for performance
const ContactForm = memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' })

  // Memoized handlers to prevent unnecessary re-renders
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
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatusMessage({ type: 'success', text: data.message || 'Message sent successfully!' })
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error(data.message || 'Failed to send message')
      }
    } catch (error) {
      setStatusMessage({ type: 'error', text: error.message || 'Something went wrong. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }, [formData])

  return (
    <motion.form variants={itemVariants} className="contact-form" onSubmit={handleSubmit}>
      <div className={`input-group ${formData.name ? 'has-value' : ''}`}>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          autoComplete="name"
        />
        <label>Name</label>
      </div>
      
      <div className={`input-group ${formData.email ? 'has-value' : ''}`}>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
          autoComplete="email"
        />
        <label>Email</label>
      </div>
      
      <div className={`input-group ${formData.message ? 'has-value' : ''}`}>
        <textarea 
          name="message" 
          rows="5" 
          value={formData.message} 
          onChange={handleChange} 
          required
        ></textarea>
        <label>Message</label>
      </div>

      {statusMessage.text && (
        <div className={`text-center p-3 rounded-lg mb-4 ${
          statusMessage.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {statusMessage.text}
        </div>
      )}

      <button type="submit" className="btn send-btn" disabled={isLoading}>
        {isLoading ? 'Sending...' : (
          <>
            Send Message <Send className="ml-2 w-5 h-5" />
          </>
        )}
      </button>
    </motion.form>
  )
})

ContactForm.displayName = 'ContactForm'

const Contact = () => {
  const sectionRef = useRef(null)

  return (
    <section id="contact" className="section-pad relative overflow-hidden" ref={sectionRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <GalaxyBackground />
      
      <motion.div 
        className="container relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.h2 variants={itemVariants} className="section-heading text-center mb-12">
          Let's Connect
        </motion.h2>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-center contact-sub mb-8 text-slate-400">
            Have a project in mind or just want to say hi? <br />
            Feel free to send me a message.
          </p>

          <ContactForm />
        </div>
      </motion.div>
    </section>
  )
}

export default Contact

