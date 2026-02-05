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
    // You can add more selectors here based on your app structure
    const elements = document.querySelectorAll(
      '.section-heading, .p, .about-text p, .hobby-list li, .skill-card, .timeline-content, .project-card, .cert-card, .contact-form, .hero-title, .hero-bio, .btn, .social-connect' 
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
