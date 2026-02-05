import Contact from '../models/Contact.js';
import { sendEmailNotification } from '../services/emailService.js';

// Submit contact form
export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log('Received submission:', { name, email, messageLength: message?.length });

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }

    // Basic email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Save to database
    const contact = new Contact({
      name,
      email,
      message,
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    await contact.save();

    // Send email notification (non-blocking for user response, but we await it here to log errors properly)
    // You could make this fire-and-forget if speed is critical, but tracking success is usually better.
    try {
        await sendEmailNotification(name, email, message);
    } catch (emailError) {
        console.error('Email notification failed completely, but contact saved to DB.');
        // We still return success to the user because their data IS saved.
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.'
    });

  } catch (error) {
    console.error('❌ Contact form error:');
    console.error('Full error:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
