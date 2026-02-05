import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

// Animated geometric shapes
const FloatingGeometry = ({ position, geometry, color, speed }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed
      meshRef.current.rotation.y += speed * 0.5
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5
    }
  })

  return (
    <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        {geometry === 'box' && <boxGeometry args={[1, 1, 1]} />}
        {geometry === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
        {geometry === 'torus' && <torusGeometry args={[0.5, 0.2, 16, 100]} />}
        {geometry === 'cone' && <coneGeometry args={[0.5, 1, 32]} />}
        {geometry === 'octahedron' && <octahedronGeometry args={[0.6]} />}
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  )
}

// Particle system
const Particles = () => {
  const particlesRef = useRef()
  const particleCount = 200
  
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    
    const color = new THREE.Color()
    color.setHSL(Math.random(), 0.7, 0.6)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.6} />
    </points>
  )
}

// Ambient effect sphere
const AmbientSphere = () => {
  return (
    <Sphere args={[8, 64, 64]} position={[0, 0, -10]}>
      <MeshDistortMaterial
        color="#6366f1"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        opacity={0.1}
        transparent
      />
    </Sphere>
  )
}

// Main 3D Scene
const Scene = () => {
  const geometries = [
    { type: 'box', pos: [-6, 2, -3], color: '#6366f1', speed: 0.01 },
    { type: 'sphere', pos: [6, -2, -2], color: '#8b5cf6', speed: 0.015 },
    { type: 'torus', pos: [-4, -3, -4], color: '#3b82f6', speed: 0.012 },
    { type: 'cone', pos: [5, 3, -3], color: '#a78bfa', speed: 0.008 },
    { type: 'octahedron', pos: [0, 0, -5], color: '#60a5fa', speed: 0.01 },
    { type: 'box', pos: [7, 0, -4], color: '#4f46e5', speed: 0.013 },
    { type: 'sphere', pos: [-7, 1, -3], color: '#7c3aed', speed: 0.011 },
  ]

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#ffffff"
      />

      {/* Geometric shapes */}
      {geometries.map((geo, index) => (
        <FloatingGeometry
          key={index}
          position={geo.pos}
          geometry={geo.type}
          color={geo.color}
          speed={geo.speed}
        />
      ))}

      {/* Particles */}
      <Particles />

      {/* Ambient sphere */}
      <AmbientSphere />
    </>
  )
}

const Realistic3DBackground = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.35, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

export default Realistic3DBackground
