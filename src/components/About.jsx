import { useEffect, useRef } from 'react'
import { Activity, BookOpen, Cpu } from 'lucide-react'
import gsap from 'gsap'

const About = () => {
  const sectionRef = useRef(null)


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
