import { motion, useScroll, useSpring } from 'framer-motion'

const ProgressBar = () => {
  const { scrollYProgress } = useScroll()
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-50 h-[4px]"
      style={{ scaleX }}
    />
  )
}

export default ProgressBar
