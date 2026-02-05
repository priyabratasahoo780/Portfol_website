import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ScrollSection = ({ children, className }) => {
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"]
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0])

  return (
    <motion.section
      ref={ref}
      style={{
        opacity,
        y,
        scale,
        rotateX,
        perspective: 1000
      }}
      className={`min-h-screen w-full flex flex-col justify-center items-center py-20 bg-background ${className}`}
    >
      {children}
    </motion.section>
  )
}

export default ScrollSection
