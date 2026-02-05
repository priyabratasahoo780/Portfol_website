import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Interactive3DBackground = ({ className = '' }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x050816, 0.001);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050816, 1);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 2, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 1.5, 100);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x3b82f6, 1, 100);
    pointLight3.position.set(0, 15, 0);
    scene.add(pointLight3);

    // Create 3D particles with different geometries
    const geometries = [
      new THREE.SphereGeometry(0.3, 16, 16),
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.TorusGeometry(0.3, 0.1, 8, 16),
      new THREE.OctahedronGeometry(0.4),
      new THREE.TetrahedronGeometry(0.4)
    ];

    const materials = [
      new THREE.MeshStandardMaterial({ 
        color: 0x6366f1, 
        metalness: 0.7, 
        roughness: 0.2,
        emissive: 0x6366f1,
        emissiveIntensity: 0.2
      }),
      new THREE.MeshStandardMaterial({ 
        color: 0x8b5cf6, 
        metalness: 0.6, 
        roughness: 0.3,
        emissive: 0x8b5cf6,
        emissiveIntensity: 0.15
      }),
      new THREE.MeshStandardMaterial({ 
        color: 0x3b82f6, 
        metalness: 0.8, 
        roughness: 0.1,
        emissive: 0x3b82f6,
        emissiveIntensity: 0.25
      }),
      new THREE.MeshStandardMaterial({ 
        color: 0x06b6d4, 
        metalness: 0.5, 
        roughness: 0.4,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.1
      })
    ];

    // Create particle system
    const particleCount = 80;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const particle = new THREE.Mesh(geometry, material);

      // Random position
      particle.position.x = (Math.random() - 0.5) * 60;
      particle.position.y = (Math.random() - 0.5) * 60;
      particle.position.z = (Math.random() - 0.5) * 40;

      // Random rotation
      particle.rotation.x = Math.random() * Math.PI;
      particle.rotation.y = Math.random() * Math.PI;

      // Store initial position for animations
      particle.userData.initialPosition = particle.position.clone();
      particle.userData.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      };
      particle.userData.floatSpeed = Math.random() * 0.5 + 0.5;
      particle.userData.floatOffset = Math.random() * Math.PI * 2;

      scene.add(particle);
      particles.push(particle);
    }

    particlesRef.current = particles;

    // Mouse move handler
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // GSAP Animations for lights
    gsap.to(pointLight1.position, {
      x: -10,
      y: -10,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to(pointLight2.position, {
      x: 10,
      z: 10,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to(pointLight3.position, {
      y: -15,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Scroll-based animation
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });

    scrollTimeline.to(camera.position, {
      z: 40,
      ease: 'none'
    });

    particles.forEach((particle, index) => {
      scrollTimeline.to(particle.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        ease: 'none'
      }, 0);
    });

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;

      // Animate particles
      particles.forEach((particle, index) => {
        // Rotation
        particle.rotation.x += particle.userData.rotationSpeed.x;
        particle.rotation.y += particle.userData.rotationSpeed.y;
        particle.rotation.z += particle.userData.rotationSpeed.z;

        // Floating animation
        const floatOffset = particle.userData.floatOffset;
        const floatSpeed = particle.userData.floatSpeed;
        particle.position.y = particle.userData.initialPosition.y + 
                             Math.sin(time * floatSpeed + floatOffset) * 2;

        // Mouse parallax
        const mouseInfluence = 5;
        particle.position.x = particle.userData.initialPosition.x + 
                             mouseRef.current.x * mouseInfluence * (1 + index * 0.01);
        particle.position.z = particle.userData.initialPosition.z + 
                             mouseRef.current.y * mouseInfluence * (1 + index * 0.01);
      });

      // Camera subtle movement
      camera.position.x = Math.sin(time * 0.1) * 2;
      camera.position.y = Math.cos(time * 0.15) * 1.5;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // Dispose Three.js resources
      particles.forEach(particle => {
        if (particle.geometry) particle.geometry.dispose();
        if (particle.material) particle.material.dispose();
        scene.remove(particle);
      });

      geometries.forEach(geo => geo.dispose());
      materials.forEach(mat => mat.dispose());

      if (renderer) {
        renderer.dispose();
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};

export default Interactive3DBackground;
