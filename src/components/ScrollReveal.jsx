import { useEffect } from 'react'

const ScrollReveal = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
          // Optional: Stop observing once shown for better performance
          // observer.unobserve(entry.target) 
        }
      })
    }, observerOptions)

    // Select all major content blocks
    const elements = document.querySelectorAll(
      '.hero-display-title, .hero-description, .hero-action-btns, .section-heading, .about-text p, .hobby-list li, .skill-card, .timeline-content, .project-card, .cert-card-neon, .premium-contact-form, .hero-visual-content, .yt-card' 
    )

    elements.forEach((el) => {
      el.classList.add('hidden')
      observer.observe(el)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return null // This component doesn't render anything itself
}

export default ScrollReveal
