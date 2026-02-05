import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const PageWrapper = ({ children }) => {
  const wrapperRef = useRef(null)

  useGSAP(() => {
    const sections = gsap.utils.toArray('.stacked-section')
    
    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top", 
        end: "bottom top", 
        pin: true, 
        pinSpacing: false, 
        scrub: true,
        id: `section-${i}`,
      })
      
      // Optional: Add a subtle scale effect for depth
      gsap.to(section, {
        scale: 0.95,
        opacity: 0.5,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      })
    })
  }, { scope: wrapperRef })

  return (
    <div ref={wrapperRef} className="relative w-full">
      {children}
    </div>
  )
}

export default PageWrapper
