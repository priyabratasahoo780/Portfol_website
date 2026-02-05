import React, { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const CosmicBackground = ({ className }) => {
  const containerRef = useRef(null);
  const farStarsRef = useRef(null);
  const midStarsRef = useRef(null);
  const nearStarsRef = useRef(null);
  const nebulaRef = useRef(null);

  // Generate star box-shadows for performance
  // Memoized to prevent recalculation
  const generateStars = (count, width, height) => {
    let value = '';
    for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const opacity = Math.random();
        value += `${x}px ${y}px 0 ${opacity < 0.5 ? 1 : 2}px rgba(255, 255, 255, ${opacity}), `;
    }
    return value.slice(0, -2);
  };

  const starLayers = useMemo(() => ({
    far: generateStars(400, 2000, 2000), // Render comfortably larger than screen
    mid: generateStars(200, 2000, 2000),
    near: generateStars(80, 2000, 2000),
  }), []);

  useGSAP(() => {
    const container = containerRef.current;
    
    // 1. Nebula Pulse
    gsap.to(nebulaRef.current, {
        opacity: 0.6,
        scale: 1.2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // 2. Parallax drift loops
    // Far layer - deeply slow
    gsap.to(farStarsRef.current, {
        y: -100,
        duration: 120,
        repeat: -1,
        ease: "none",
    });

    // Mid layer
    gsap.to(midStarsRef.current, {
        y: -200,
        duration: 80,
        repeat: -1,
        ease: "none",
    });

    // Near layer
    gsap.to(nearStarsRef.current, {
        y: -300,
        duration: 60,
        repeat: -1,
        ease: "none",
    });

    // 3. ScrollTrigger Parallax
    gsap.to([farStarsRef.current, midStarsRef.current, nearStarsRef.current], {
      y: (i) => -100 * (i + 1), // Additional shift on scroll
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      }
    });

    // 4. Mouse Interaction - Throttled via ticks
    // We update a tracking object, and gsap handles the interpolation automatically
    const mouse = { x: 0, y: 0 };
    
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        mouse.x = (clientX / window.innerWidth - 0.5);
        mouse.y = (clientY / window.innerHeight - 0.5);
        
        // Directly animate to new position - GSAP handles the smoothing/throttling internally
        // by only updating on RAF. This avoids manual throttle functions.
        gsap.to(farStarsRef.current, {
            x: mouse.x * 20,
            y: mouse.y * 20,
            duration: 2,
            overwrite: "auto", // Ensure we don't stack tweens
            ease: "power2.out"
        });
        
        gsap.to(midStarsRef.current, {
            x: mouse.x * 40,
            y: mouse.y * 40,
            duration: 2,
            overwrite: "auto",
            ease: "power2.out"
        });

        gsap.to(nearStarsRef.current, {
            x: mouse.x * 80,
            y: mouse.y * 80,
            duration: 2,
            overwrite: "auto",
            ease: "power2.out"
        });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 5. Shooting Stars (Disabled)
    /*
    const createShootingStar = () => {
        if (!container) return; // Cleanup check
        const star = document.createElement('div');
        star.classList.add('shooting-star');
        
        // Random start pos
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * (window.innerHeight / 2); // Top half
        
        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;
        container.appendChild(star);

        gsap.to(star, {
            x: -300 + Math.random() * 100, // Move left
            y: 300 + Math.random() * 100,  // Move down
            opacity: 0,
            width: 100 + Math.random() * 100, // Trail length
            duration: 1 + Math.random(),
            ease: "power1.in",
            onComplete: () => {
                if (star.parentNode === container) {
                    container.removeChild(star);
                }
                // Recurse with random delay
                // gsap.delayedCall(Math.random() * 5 + 2, createShootingStar);
            }
        });
    };
    */

    // Start shooting star loop
    // gsap.delayedCall(2, createShootingStar);


    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        // Ensure we kill any lingering tweens/delayedCalls in this context
        // context.revert() is handled by useGSAP, but explicit safety is good
    };

  }, { scope: containerRef });

  return (
    <div 
        ref={containerRef} 
        className={cn("relative w-full h-full bg-[#050816] overflow-hidden", className)}
    >
        {/* Nebula Gradients */}
        <div ref={nebulaRef} className="absolute inset-0 z-0">
             <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-purple-900/20 blur-[100px] rounded-full" />
             <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-blue-900/20 blur-[100px] rounded-full" />
             <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-indigo-900/10 blur-[80px] rounded-full" />
        </div>

        {/* CSS Box-Shadow Star Layers (1px height/width div with huge box-shadow) */}
        {/* will-change: transform promotes to GPU layer */}
        <div 
            ref={farStarsRef}
            className="absolute top-0 left-0 w-[1px] h-[1px] rounded-full z-[1] will-change-transform"
            style={{ boxShadow: starLayers.far }}
        />
        <div 
            ref={midStarsRef}
            className="absolute top-0 left-0 w-[2px] h-[2px] rounded-full z-[2] will-change-transform"
            style={{ boxShadow: starLayers.mid }}
        />
        <div 
            ref={nearStarsRef}
            className="absolute top-0 left-0 w-[3px] h-[3px] rounded-full bg-white shadow-[0_0_10px_white] z-[3] will-change-transform"
            style={{ boxShadow: starLayers.near }}
        />

        {/* Space Dust / Additional particles can go here if needed */}
        
        {/* Shooting Stars Styles via jsx-style or simple class */}
        {/*
        <style>{`
            .shooting-star {
                position: absolute;
                height: 2px;
                background: linear-gradient(90deg, rgba(255,255,255,1), transparent);
                border-radius: 50%;
                z-index: 4;
                transform: rotate(-45deg);
                box-shadow: 0 0 10px rgba(255,255,255,0.8);
            }
        `}</style>
        */}
    </div>
  );
};

export default CosmicBackground;
