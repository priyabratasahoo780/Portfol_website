import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import Settings from './Settings'
import AnimatedSPLogo from './ui/AnimatedSPLogo'
import * as THREE from 'three'
import gsap from 'gsap'
import { playLightningStrikeSound } from '../utils/lightningSound'

const Navbar = ({ onSectionChange, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(activeSection || 'home')
  const canvasRef = useRef(null)
  
  // Store refs for cleanup
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const requestRef = useRef(null)
  const boltsRef = useRef([])
  const particlesRef = useRef([])
  const ringsRef = useRef([])

  useEffect(() => {
    // --- Three.js Setup ---
    // PERFORMANCE OP: Disable on mobile
    if (window.innerWidth < 768) return

    const width = window.innerWidth
    const height = window.innerHeight

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.OrthographicCamera(0, width, 0, height, 0.1, 1000)
    camera.position.z = 1
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true 
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer

    // --- Resize Handler ---
    // --- Resize Handler ---
    const handleResize = () => {
      // Guard for mobile (no renderer)
      if (!rendererRef.current || !cameraRef.current) return

      const w = window.innerWidth
      const h = window.innerHeight
      cameraRef.current.right = w
      cameraRef.current.bottom = h
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // --- Animation Loop ---
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate)

      // Update Bolts
      boltsRef.current = boltsRef.current.filter(bolt => {
        bolt.life -= 0.04
        if (bolt.life <= 0) {
          scene.remove(bolt.mesh)
          bolt.geometry.dispose()
          bolt.material.dispose()
          if(bolt.glowMesh) {
              scene.remove(bolt.glowMesh)
              bolt.glowMaterial.dispose()
          }
          return false
        }
        
        // Flicker intensity
        const opacity = Math.random() * bolt.life
        bolt.material.opacity = opacity
        if(bolt.glowMaterial) bolt.glowMaterial.opacity = opacity * 0.6

        // Jitter vertices (Electric Noise)
        const positions = bolt.geometry.attributes.position.array
        for (let i = 3; i < positions.length - 3; i += 3) {
          positions[i] += (Math.random() - 0.5) * 2 // x jitter
          positions[i+1] += (Math.random() - 0.5) * 2 // y jitter
        }
        bolt.geometry.attributes.position.needsUpdate = true
        
        return true
      })

      // Update Particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.life -= 0.02
        if (p.life <= 0) {
          scene.remove(p.mesh)
          p.geometry.dispose()
          p.material.dispose()
          return false
        }
        
        p.mesh.position.add(p.velocity)
        p.material.opacity = p.life
        return true
      })

      // Update Shockwave Rings
      ringsRef.current = ringsRef.current.filter(r => {
          r.life -= 0.02
          if (r.life <= 0) {
              scene.remove(r.mesh)
              r.geometry.dispose()
              r.material.dispose()
              return false
          }
          r.mesh.scale.multiplyScalar(1.08) // Expand smoothly
          r.material.opacity = r.life
          return true
      })

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(requestRef.current)
      renderer.dispose()
    }
  }, [])

  // --- Lightning Generation Logic ---
  const createLightning = (startX, startY, endX, endY, jaggedAmount = 5) => {
    if (!sceneRef.current) return

    const points = []
    const segments = 25
    const dx = endX - startX
    const dy = endY - startY
    
    points.push(new THREE.Vector3(startX, startY, 0))
    
    for (let i = 1; i < segments; i++) {
        const t = i / segments
        let x = startX + dx * t
        let y = startY + dy * t
      
        // Zig-zag noise
        if (i !== 0 && i !== segments) {
            x += (Math.random() - 0.5) * jaggedAmount
            y += (Math.random() - 0.5) * jaggedAmount
        }
        points.push(new THREE.Vector3(x, y, 0))
    }
    
    points.push(new THREE.Vector3(endX, endY, 0))

    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    
    // Core Bolt
    const coreMaterial = new THREE.LineBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      linewidth: 3
    })
    const coreLine = new THREE.Line(geometry, coreMaterial)
    sceneRef.current.add(coreLine)
    
    // Glow Bolt (Simulation of bloom)
    const glowMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00eaff,
      transparent: true,
      opacity: 0.8,
      linewidth: 6
    })
    const glowLine = new THREE.Line(geometry.clone(), glowMaterial)
    glowLine.position.x += 1.5
    sceneRef.current.add(glowLine)
    
    boltsRef.current.push({
      mesh: coreLine,
      glowMesh: glowLine,
      geometry,
      material: coreMaterial,
      glowMaterial: glowMaterial,
      life: 0.4 + Math.random() * 0.2
    })

    // Branching - Smaller arcs
    if (Math.random() > 0.6) {
      const branchIndex = Math.floor(Math.random() * (points.length - 10)) + 5
      const branchStart = points[branchIndex]
      // Short branches
      createBranch(branchStart, 15)
    }
  }
  
  const createBranch = (startContextVector, length) => {
      const points = []
      points.push(startContextVector)
      const endX = startContextVector.x + (Math.random() - 0.5) * length * 2
      const endY = startContextVector.y + (Math.random() - 0.5) * length // Random direction
      points.push(new THREE.Vector3(endX, endY, 0))
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({ color: 0x00eaff, transparent: true })
      const line = new THREE.Line(geometry, material)
      sceneRef.current.add(line)
      boltsRef.current.push({ mesh: line, geometry, material, life: 0.2 })
  }

  const spawnSparks = (x, y) => {
    if (!sceneRef.current) return
    const particleCount = 25
    
    for(let i=0; i<particleCount; i++) {
        const pGeo = new THREE.BufferGeometry()
        pGeo.setAttribute('position', new THREE.Float32BufferAttribute([0,0,0], 3))
        const pMat = new THREE.PointsMaterial({
            color: Math.random() > 0.5 ? 0xffffff : 0x00eaff,
            size: 4 + Math.random() * 4,
            transparent: true,
            blending: THREE.AdditiveBlending
        })
        const point = new THREE.Points(pGeo, pMat)
        point.position.set(x, y, 0)
        
        const angle = Math.random() * Math.PI * 2
        const speed = 2 + Math.random() * 6 // Contained speed
        
        const velocity = new THREE.Vector3(
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
            0
        )
        
        sceneRef.current.add(point)
        particlesRef.current.push({
            mesh: point,
            geometry: pGeo,
            material: pMat,
            velocity,
            life: 1.0
        })
    }
  }

  const spawnShockwave = (x, y) => {
      if (!sceneRef.current) return
      const geometry = new THREE.RingGeometry(1, 2, 32)
      const material = new THREE.MeshBasicMaterial({ 
          color: 0x00eaff, 
          transparent: true, 
          side: THREE.DoubleSide
      })
      const ring = new THREE.Mesh(geometry, material)
      ring.position.set(x, y, 0)
      sceneRef.current.add(ring)
      ringsRef.current.push({
          mesh: ring,
          geometry,
          material,
          life: 0.6
      })
  }

  // --- Interaction Handler ---
  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    setActiveTab(targetId)
    
    const targetElement = e.target
    const rect = targetElement.getBoundingClientRect()
    
    // CORRECTION: Use DOM coordinates directly (Camera is Top-Left 0,0)
    // Do NOT invert Y.
    const topY = rect.top 
    const leftX = rect.left
    const width = rect.width
    const height = rect.height
    
    // Center calculation relative to screen top-left
    const centerX = leftX + width / 2
    const centerY = topY + height / 2
    
    // Timeline
    const tl = gsap.timeline({
        onComplete: () => {
             setTimeout(() => scrollToSection(targetId), 600)
        }
    })

    // 1. Pre-charge (0s - 0.2s)
    tl.to(targetElement, { 
        scale: 1.1, 
        color: '#fff', 
        textShadow: '0 0 10px #00eaff, 0 0 20px #00eaff',
        duration: 0.2,
        ease: 'power2.in'
    })
    
    // 2. Strike (0.2s)
    tl.call(() => {
        // Play the realistic sound via utility
        playLightningStrikeSound()
        
        // STRICT CONFINEMENT to word bounds
        const boltCount = 6
        // Chaos bolts on word
        for(let i=0; i<boltCount; i++) {
             const startX = leftX + (Math.random() * width)
             const startY = topY + (Math.random() * height)
             const endX = leftX + (Math.random() * width)
             const endY = topY + (Math.random() * height)
             
             // 5px max jitter to stay tight
             createLightning(startX, startY, endX, endY, 5) 
        }

        // Horizontal Slash
        createLightning(leftX - 5, centerY, rightX + 5, centerY, 5)
        
        // Diagonal Slash
        if (Math.random() > 0.5) {
             createLightning(leftX, topY, rightX, topY + height, 5)
        } else {
             createLightning(leftX, topY + height, rightX, topY, 5)
        }

        spawnSparks(centerX, centerY)
        // Shockwave - Reduced size to keep it cleaner
        spawnShockwave(centerX, centerY)
    })
    
    // 3. Shock Reaction (0.2s - 0.5s)
    tl.to(targetElement, {
        x: () => (Math.random() - 0.5) * 8, 
        y: () => (Math.random() - 0.5) * 4,
        rotation: () => (Math.random() - 0.5) * 4,
        color: '#e0ffff', 
        textShadow: '0 0 20px #fff, 0 0 40px #00eaff',
        duration: 0.05, 
        yoyo: true, 
        repeat: 6
    })
    
    // 4. Stabilize
    tl.to(targetElement, {
        x: 0,
        y: 0,
        rotation: 0,
        color: '#00eaff',
        textShadow: '0 0 5px #00eaff',
        scale: 1,
        duration: 0.2,
        clearProps: 'x,y,rotation'
    })
  }

  const handleMouseEnter = (e) => {
      gsap.to(e.target, {
          textShadow: '0 0 8px #00eaff',
          color: '#fff', 
          scale: 1.05,
          duration: 0.3
      })
  }

  const handleMouseLeave = (e, id) => {
      if (activeTab === id && id !== 'contact') {
          gsap.to(e.target, {
              textShadow: '0 0 5px #00eaff',
              color: '#00eaff',
              scale: 1,
              duration: 0.3
          })
      } else {
          gsap.to(e.target, {
              textShadow: 'none',
              color: 'inherit', 
              scale: 1,
              duration: 0.3
          })
      }
  }

  const scrollToSection = (id) => {
    // Instead of scrolling, trigger section change
    if (onSectionChange) {
      onSectionChange(id)
    }
    setIsOpen(false)
  }

  return (
    <nav className="navbar" style={{ position: 'fixed', width: '100%', zIndex: 1000 }}>
        {/* Canvas Overlay - Fixed on top for effects */}
        <canvas 
            ref={canvasRef} 
            style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100vh', 
                pointerEvents: 'none', 
                zIndex: 9999 
            }} 
        />
        
      <div className="container nav-container" style={{ position: 'relative', zIndex: 1002 }}>
        <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <AnimatedSPLogo />
        </div>
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          {['home', 'about', 'skills', 'journey', 'certificates', 'projects', 'contact'].map((item) => (
             <li key={item}>
                 <a 
                    onClick={(e) => handleNavClick(e, item)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={(e) => handleMouseLeave(e, item)}
                    className={item === 'contact' ? 'nav-btn' : ''}
                    style={activeTab === item && item !== 'contact' ? { 
                        color: '#00eaff', 
                        textShadow: '0 0 5px #00eaff',
                        borderBottom: '2px solid #00eaff' 
                    } : {}}
                 >
                    {item.charAt(0).toUpperCase() + item.slice(1).replace('Me', ' Me')}
                 </a>
             </li>
          ))}
          <li className="mobile-settings-item">
            <Settings />
          </li>
        </ul>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Settings />
          <button className="hamburger" onClick={() => setIsOpen(!isOpen)} style={{ marginLeft: '10px' }}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
