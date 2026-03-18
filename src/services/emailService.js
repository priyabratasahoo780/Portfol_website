import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

/**
 * Validates EmailJS configuration
 * @returns {boolean}
 */
const isConfigured = () => {
  return (
    SERVICE_ID && 
    TEMPLATE_ID && 
    PUBLIC_KEY
  )
}

/**
 * Sends a contact form message
 * @param {Object} formData 
 * @returns {Promise<Object>}
 */
export const sendContactMessage = async (formData) => {
  if (!isConfigured()) {
    throw new Error('Email service is not fully configured. Please check your .env file.')
  }

  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_name: 'Priyabrata',
  }

  try {
    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    )
    return result
  } catch (error) {
    console.error('EmailJS Error:', error)
    throw error
  }
}

export default {
  sendContactMessage,
  isConfigured
}
