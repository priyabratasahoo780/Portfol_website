import { useEffect, useRef } from 'react'
import { Activity, BookOpen, Cpu } from 'lucide-react'
import gsap from 'gsap'

const About = () => {
  const sectionRef = useRef(null)
  const starsRef = useRef(null)

  // Galaxy Twinkling Stars Background
  useEffect(() => {
    if (!starsRef.current) return

    const starsContainer = starsRef.current
    const numStars = 100

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div')
        star.className = 'galaxy-star'
        star.style.cssText = `
          position: absolute;
          width: ${Math.random() * 3 + 1}px;
          height: ${Math.random() * 3 + 1}px;
          background: ${i % 3 === 0 ? '#60a5fa' : i % 3 === 1 ? '#a78bfa' : '#ffffff'};
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          box-shadow: 0 0 ${Math.random() * 5 + 2}px currentColor;
          pointer-events: none;
        `
        starsContainer.appendChild(star)
  
        gsap.to(star, {
          opacity: Math.random() * 0.7 + 0.3,
          duration: Math.random() * 2 + 1,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: Math.random() * 2
        })
  
        gsap.to(star, {
          x: `+=${Math.random() * 20 - 10}`,
          y: `+=${Math.random() * 20 - 10}`,
          duration: Math.random() * 10 + 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
    }

    return () => {
      if(starsContainer) starsContainer.innerHTML = ''
    }
  }, [])

  // Existing Reveal Animation
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
    <section id="about" className="section-pad relative overflow-hidden min-h-screen flex items-center justify-center max-[600px]:min-h-0 max-[600px]:flex-col max-[600px]:justify-start max-[600px]:!pt-[200px]" ref={sectionRef}>
      
      {/* Background Layer */}
      <div 
        ref={starsRef} 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      
      <div className="container relative z-10 w-full">
        <h2 className="section-heading hidden">About Me</h2>
        <div className="about-grid hidden">
          <div className="about-text">
            <p>
              My name is <strong>Priyabrata Sahoo</strong>. I'm from Surat, Gujarat, India.
              I completed my schooling from Colourtex English Medium School,
              Surat, and my 12th grade (Science stream, 72.3%) from Brightstar
              Higher Secondary School, Surat.
            </p>
            <br />
            <p>
              I am currently pursuing B.Tech in
              <strong> Computer Science Engineering (C.S.E)</strong> at
              SwamiNarayan University, Kalol, Gandhinagar.
            </p>
            <br />
            <p>
              I'm a passionate computer science student with a knack for
              problem-solving. I'm always eager to learn new technologies and
              build things that matter. I believe in lifelong learning and am
              excited about the ever-evolving world of tech.
            </p>
          </div>
          <div className="hobbies-box">
            <h3>Hobbies & Interests</h3>
            <ul className="hobby-list">
              <li>
                <Activity size={20} />
                <span><strong>Cricket:</strong> Helps in teamwork, communication, focus, concentration, and character building.</span>
              </li>
              <li>
                <BookOpen size={20} />
                <span><strong>Reading books:</strong> A powerful habit for mind, body, and overall well-being.</span>
              </li>
              <li>
                <Cpu size={20} />
                <span><strong>Learning Tech:</strong> Exploring new technologies to break down complex problems and debug issues.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
