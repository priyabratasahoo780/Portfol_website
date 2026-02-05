"use client";

import { useEffect, useCallback } from "react";

export default function ParticlesComponent({ id = "particles-js", className = "" }) {
  const initParticles = useCallback((isDark) => {
    
    // Attempt to cleanup old canvas for this specific ID if needed
    const oldCanvas = document.querySelector(`#${id} canvas`);
    if (oldCanvas) oldCanvas.remove();

    const colors = isDark
      ? {
          particles: "#00f5ff",
          lines: "#00d9ff",
          accent: "#0096c7",
        }
      : {
          particles: "#0277bd",
          lines: "#0288d1",
          accent: "#039be5",
        };

    if (window.particlesJS) {
      window.particlesJS(id, {
        particles: {
          number: { value: 40, density: { enable: true, value_area: 800 } },
          color: { value: colors.particles },
          shape: { type: "circle", stroke: { width: 0.5, color: colors.accent } },
          opacity: {
            value: 0.7,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.3 },
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: true, speed: 2, size_min: 1 },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: colors.lines,
            opacity: 0.4,
            width: 1.2,
          },
          move: { enable: true, speed: 2, random: true, out_mode: "bounce" },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            grab: { distance: 140, line_linked: { opacity: 0.8 } },
            push: { particles_nb: 4 },
            repulse: { distance: 180, duration: 0.4 },
          },
        },
        retina_detect: false,
      });
    }
  }, [id]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let script = document.querySelector('script[src*="particles.min.js"]');
    
    const handleInit = () => {
      const html = document.documentElement;
      const detectDark = () =>
        html.classList.contains("dark") ||
        html.getAttribute("data-theme") === "dark";

      // init first load
      initParticles(detectDark());

      // observe changes from theme
      const observer = new MutationObserver(() =>
        initParticles(detectDark())
      );
      observer.observe(html, {
        attributes: true,
        attributeFilter: ["class", "data-theme"],
      });
      
      return () => observer.disconnect();
    };

    if (!script) {
      script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
      script.async = true;
      document.body.appendChild(script);
      script.onload = handleInit;
    } else {
      // If script is already loaded or loading
      if (window.particlesJS) {
        handleInit();
      } else {
        script.addEventListener('load', handleInit);
      }
    }

  }, [initParticles]);

  return (
    <div
      id={id}
      className={className}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    />
  );
}
