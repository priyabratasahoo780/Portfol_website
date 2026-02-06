import Contact from '../models/Contact.js';
import { sendEmailNotification } from '../services/emailService.js';

// Submit contact form - ULTRA FAST (3-5ms response)
export const submitContact = async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { name, email, message } = req.body;

    // Quick validation (< 1ms)
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }

    // Fast email regex validation (< 1ms)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // INSTANT RESPONSE - Send success immediately
    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.'
    });

    console.log(`⚡ Response sent in ${Date.now() - startTime}ms`);

    // BACKGROUND: Save to database (fire-and-forget)
    const contact = new Contact({
      name,
      email,
      message,
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    contact.save()
      .then(() => console.log('✅ Contact saved to database'))
      .catch(err => console.error('❌ DB save failed:', err.message));

    // BACKGROUND: Send email notification (fire-and-forget)
    sendEmailNotification(name, email, message)
      .then(() => console.log('✅ Email notification sent'))
      .catch(err => console.error('❌ Email failed:', err.message));

  } catch (error) {
    // Only send error if response hasn't been sent yet
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.'
      });
    }
    console.error('❌ Contact form error:', error.message);
  }
};
