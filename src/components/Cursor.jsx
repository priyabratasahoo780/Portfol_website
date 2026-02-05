import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Cursor.css'

const Cursor = () => {
    const dotRef = useRef(null)
    const ringRef = useRef(null)
    const canvasRef = useRef(null)
    
    // State memory
    const mouseRef = useRef({ x: 0, y: 0 })
    const delayedMouseRef = useRef({ x: 0, y: 0 })
    const particlesRef = useRef([])
    const hueRef = useRef(0) // Logic for continuous color cycling
    
    useEffect(() => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        if (isMobile) return

        document.body.classList.add('custom-cursor-active')

        // Canvas Setup
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let width = window.innerWidth
        let height = window.innerHeight
        
        const resize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
        }
        window.addEventListener('resize', resize)
        resize()

        // Initial setup
        gsap.set(dotRef.current, { xPercent: -50, yPercent: -50 })
        gsap.set(ringRef.current, { xPercent: -50, yPercent: -50 })

        // Performance: Use quickTo for instant updates without tween overhead
        const xTo = gsap.quickTo(dotRef.current, "x", { duration: 0.15, ease: "power3.out" })
        const yTo = gsap.quickTo(dotRef.current, "y", { duration: 0.15, ease: "power3.out" })

        // Mouse Move
        const onMouseMove = (e) => {
            const { clientX, clientY } = e
            
            // Move Dot instantly (via quickTo for performance)
            xTo(clientX)
            yTo(clientY)

            // Interpolation Logic for Smoothness
            const dist = Math.hypot(clientX - mouseRef.current.x, clientY - mouseRef.current.y)
            
            // Limit particle spawning for performance (throttle)
            if (dist > 2) { 
                const numberOfParticles = Math.min(Math.floor(dist / 4), 5) // Cap particles per frame to avoid lag spikes
                
                if (numberOfParticles > 0) {
                   for(let i=0; i<numberOfParticles; i++) {
                       const t = i / numberOfParticles
                       const x = mouseRef.current.x + (clientX - mouseRef.current.x) * t
                       const y = mouseRef.current.y + (clientY - mouseRef.current.y) * t
                       createFluidParticle(x, y)
                   }
                } else {
                   createFluidParticle(clientX, clientY)
                }
            }

            mouseRef.current = { x: clientX, y: clientY }
        }

        // 1. Ring Update Loop (GSAP Ticker)
        const updateRing = () => {
            const { x, y } = mouseRef.current
            const { x: dx, y: dy } = delayedMouseRef.current
            
            const lerp = 0.1 // Slower, smoother follow
            const nx = dx + (x - dx) * lerp
            const ny = dy + (y - dy) * lerp
            delayedMouseRef.current = { x: nx, y: ny }
            
            const velX = x - nx
            const velY = y - ny
            const velocity = Math.sqrt(velX * velX + velY * velY)
            const scaleAmount = Math.min(velocity * 0.005, 0.5)
            const angle = Math.atan2(velY, velX) * (180 / Math.PI)

            gsap.set(ringRef.current, {
                x: nx,
                y: ny,
                scaleX: 1 + scaleAmount,
                scaleY: 1 - scaleAmount * 0.5,
                rotation: angle,
                overwrite: 'auto'
            })
        }
        gsap.ticker.add(updateRing)

        // 2. Fluid Particle Logic
        const createFluidParticle = (x, y) => {
            // Continuous color cycling
            const hue = hueRef.current
            hueRef.current = (hueRef.current + 2) % 360

            particlesRef.current.push({
                x: x,
                y: y,
                // Tighter spread for "thin line"
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                life: 1.0,
                // Small dots for "dotted form"
                size: Math.random() * 2 + 1, 
                hue: hue
            })
        }

        // Canvas Animation Loop
        const animateCanvas = () => {
            ctx.clearRect(0, 0, width, height)
            
            // "Dotted form" - Removed blur, kept additive for glow
            ctx.globalCompositeOperation = 'lighter'
            // ctx.filter = 'blur(8px)' // REMOVED for dotted look

            particlesRef.current.forEach((p, i) => {
                p.x += p.vx
                p.y += p.vy
                p.life -= 0.2 // Faster decay (Optimization)
                
                if (p.life <= 0) {
                    particlesRef.current.splice(i, 1)
                } else {
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                    ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${p.life})`
                    // Add subtle glow to individual dots
                    ctx.shadowBlur = 5
                    ctx.shadowColor = `hsla(${p.hue}, 100%, 50%, 1)`
                    ctx.fill()
                    ctx.shadowBlur = 0 // Reset
                }
            })
            
            requestAnimationFrame(animateCanvas)
        }
        const rafId = requestAnimationFrame(animateCanvas)

        // Interactions
        const onMouseDown = () => {
            gsap.fromTo(dotRef.current, { scale: 1.5 }, { scale: 1, duration: 0.3, ease: 'back.out' })
            // Burst Removed as per user request ("Color spread nahi honi chahiye")
        }

        const onMouseEnter = () => {
             dotRef.current.classList.add('hovered')
             ringRef.current.classList.add('hovered')
        }
        
        const onMouseLeave = () => {
             dotRef.current.classList.remove('hovered')
             ringRef.current.classList.remove('hovered')
        }

        const addHoverListeners = () => {
            const elements = document.querySelectorAll('a, button, .nav-item, input, textarea, .magnetic')
            elements.forEach(el => {
                el.addEventListener('mouseenter', onMouseEnter)
                el.addEventListener('mouseleave', onMouseLeave)
            })
            return elements
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mousedown', onMouseDown)

        const elements = addHoverListeners()
        const interval = setInterval(addHoverListeners, 2000)

        // Cleanup
        return () => {
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mousedown', onMouseDown)
            cancelAnimationFrame(rafId)
            gsap.ticker.remove(updateRing)
            clearInterval(interval)
            document.body.classList.remove('custom-cursor-active')

            elements.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnter)
                el.removeEventListener('mouseleave', onMouseLeave)
            })
        }
    }, [])

    return (
        <div className="cursor-wrapper">
             {/* Canvas for Fluid Trails */}
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
            
            <div ref={ringRef} className="cursor-ring"></div>
            <div ref={dotRef} className="cursor-dot"></div>
        </div>
    )
}

export default Cursor
