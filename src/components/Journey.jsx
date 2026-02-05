import { useEffect, useRef } from 'react'
import GalaxyBackground from './ui/GalaxyBackground'

const journeyData = [
  {
    date: '2022 - 2023',
    title: 'Secondary School (SSC)',
    description: 'Completed 10th grade at Colourtex English Medium School. Built a strong academic foundation with a focus on Mathematics and Science, participating in various school-level competitions.',
    position: 'left',
    isEducation: true
  },
  {
    date: '2023 - 2025',
    title: 'Higher Secondary (HSC)',
    description: 'Completed Class 11 & 12 (Science Stream) at BrightStar Higher Secondary School. Developed analytical skills and deep understanding of core subjects like Physics and Mathematics.',
    position: 'right',
    isEducation: true
  },
  {
    date: '2025 - Present',
    title: 'B.Tech in Computer Engineering',
    description: 'Currently pursuing a Bachelor of Technology at Swaminarayan University. Specializing in Software Engineering, exploring Full-Stack Development, and building scalable applications.',
    position: 'left',
    isEducation: true
  }
]

const Journey = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
          }
        })
      },
      { threshold: 0.15 }
    )

    const elements = sectionRef.current.querySelectorAll('.hidden')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="journey" className="section-pad relative overflow-hidden" ref={sectionRef}>
      {/* Galaxy Stars Background */}
      <GalaxyBackground />

      <div className="container relative z-10">
        <h2 className="section-heading hidden text-center">My Journey & Experience</h2>
        <div className="timeline hidden">
          {journeyData.map((item, index) => (
            <div className={`timeline-item ${item.position}`} key={index}>
              <div className={`timeline-content ${item.isEducation ? 'edu' : ''}`}>
                <span className="date">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Journey
