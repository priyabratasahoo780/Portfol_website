import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MysticalIntro = ({ onEnter }) => {
  const [phase, setPhase] = useState('locked'); // phases: locked, inserting, unlocking, opening, flipping
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyClick = () => {
    if (phase !== 'locked') return;
    setPhase('inserting');

    // Sequence Timing
    setTimeout(() => {
        setPhase('unlocking'); // Key turns, gears spin
        setTimeout(() => {
            setPhase('opening'); // Book opens
            setTimeout(() => {
                setPhase('flipping'); // Pages turn
            }, 1000);
        }, 2000);
    }, 1500); // Time for key to fly to lock
  };

  // Page Flipping Logic & Exit
  useEffect(() => {
    if (phase === 'flipping') {
        const flipSequence = async () => {
            await new Promise(r => setTimeout(r, 3500)); // Allow time for pages to flip
            onEnter(); // Transition to loader
        };
        flipSequence();
    }
  }, [phase, onEnter]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background - Slight Zoom Effect for Cinematic Feel */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('/assets/intro/divine_temple_bg.png')" }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear" }}
      >
        <div className="absolute inset-0 bg-black/40" /> {/* Lighter overlay for God Rays visibility */}
      </motion.div>

      {/* Main Container - Single Scene Centered */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center perspective-[2000px]">
        
        {/* Central Composition Wrapper */}
        <div className="relative w-[300px] md:w-[600px] aspect-square flex items-center justify-center">
            
            {/* 1. STANDING Book Closed (Centered) */}
            <AnimatePresence>
                {['locked', 'inserting', 'unlocking'].includes(phase) && (
                    <motion.img 
                        key="book-standing"
                        src="/assets/intro/book-standing.png"
                        alt="Ancient Standing Book"
                        className="w-full h-full object-contain drop-shadow-2xl absolute mix-blend-screen z-10"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "brightness(2) blur(10px)" }} 
                        transition={{ duration: 1.5 }}
                    />
                )}
            </AnimatePresence>

             {/* 2. Unlocking Effects */}
             {phase === 'unlocking' && (
                <motion.div 
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, times: [0, 0.5, 1] }}
                >
                    <div className="w-32 h-32 absolute translate-x-12 -translate-y-4">
                        <div className="w-full h-full border-2 border-yellow-500/30 rounded-full animate-[spin_4s_linear_infinite]" />
                        <div className="absolute inset-2 border border-yellow-400/50 rounded-full animate-[spin_3s_linear_infinite_reverse]" />
                        <div className="absolute inset-0 bg-yellow-500/20 blur-xl animate-pulse" />
                    </div>
                </motion.div>
            )}

            {/* 3. Open Book Base */}
            {['opening', 'flipping'].includes(phase) && (
                <motion.div
                    className="relative w-full h-full flex items-center justify-center z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.2 }} 
                    transition={{ duration: 2, ease: "easeOut" }}
                >
                     <img 
                        src="/assets/intro/book-flat-open.png" 
                        alt="Open Book" 
                        className="w-full h-full object-contain filter brightness-110 saturate-120 mix-blend-screen"
                     />
                     <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-1 bg-white blur-[50px]"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [1, 5, 2], opacity: [0, 1, 0.5] }}
                        transition={{ duration: 2 }}
                     />
                     {/* Flipping Pages */}
                     {phase === 'flipping' && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-[1000px]">
                            {[1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    style={{ 
                                        transformOrigin: "left center", 
                                        backgroundImage: "url('/assets/intro/page.png')",
                                        backgroundSize: '100% 100%' 
                                    }}
                                    className="absolute w-[38%] h-[50%] top-[25%] right-[11%] shadow-lg rounded-r-md bg-[#f4e4bc] border-l border-amber-900/20 mix-blend-multiply" 
                                    initial={{ rotateY: 0, zIndex: 10 - i }}
                                    animate={{ rotateY: -180 }}
                                    transition={{ 
                                        delay: i * 0.6, 
                                        duration: 1.5, 
                                        ease: "easeInOut" 
                                    }}
                                >
                                     <div className="w-full h-full flex items-center justify-center opacity-80 mix-blend-screen p-4">
                                        <div className="w-full h-full flex items-center justify-center border border-yellow-500/10">
                                             <span className="text-yellow-900/40 text-xs font-serif animate-pulse">
                                                {i === 1 ? "॥ ज्ञानम् ॥" : "॥ सत्यम् ॥"}
                                             </span>
                                        </div>
                                     </div>
                                </motion.div>
                            ))}
                        </div>
                     )}
                </motion.div>
            )}

            {/* The Key - Animated - Positioned Relative to Book (Front/Center) */}
            {['locked', 'inserting', 'unlocking'].includes(phase) && (
                    <motion.div
                        onClick={handleKeyClick}
                        className="absolute z-50 cursor-pointer" 
                        initial={{ 
                            bottom: '10%', // Positioned near bottom of book
                            right: '30%', // Slightly offset
                            x: 0, y: 0, scale: 1, rotate: -45 
                        }}
                        animate={
                            phase === 'inserting' || phase === 'unlocking' ? {
                                // Fly UP to Lock Position (Center relative to container)
                                bottom: '50%',
                                right: '50%', // Move to center
                                x: 60, // Align with lock
                                y: -20,
                                scale: 0.6, 
                                rotate: phase === 'unlocking' ? 360 : 0 
                            } : {
                                y: [-5, 5, -5],
                            }
                        }
                        transition={
                            phase === 'inserting' ? { duration: 1.5, ease: "easeInOut" } :
                            phase === 'unlocking' ? { duration: 2, ease: "easeInOut" } :
                            { repeat: Infinity, duration: 4, ease: "easeInOut" }
                        }
                    >
                        <div className="relative group">
                            <img 
                                src="/assets/intro/key.png" 
                                alt="Golden Key" 
                                className="w-24 md:w-40 drop-shadow-[0_0_25px_rgba(255,215,0,0.6)] mix-blend-screen transition-transform duration-300 group-hover:scale-110"
                            />
                            {/* Halo Glow */}
                            {phase === 'locked' && (
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] rounded-full bg-yellow-500/10 blur-xl animate-pulse" />
                            )}
                        </div>
                    </motion.div>
            )}

        </div>
            
      </div>

       {/* Hint Text */}
       <AnimatePresence>
        {phase === 'locked' && showHint && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-16 z-40 text-center"
            >
                <p className="text-yellow-100/90 font-serif text-lg tracking-[0.3em] uppercase drop-shadow-[0_2px_10px_rgba(255,215,0,0.3)]">
                    Click the Key
                </p>
                <p className="text-yellow-500/60 text-xs tracking-widest mt-2">
                    TO UNLOCK THE ARCHIVE
                </p>
            </motion.div>
        )}
       </AnimatePresence>

    </div>
  );
};

export default MysticalIntro;
