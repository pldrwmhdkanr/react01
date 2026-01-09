import React, { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const TargetCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smoother spring config with less stiffness for performance
  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId = null;
    let lastX = -100;
    let lastY = -100;

    const moveCursor = (e) => {
      lastX = e.clientX - 12;
      lastY = e.clientY - 12;
      
      // Use RAF for throttled updates
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          cursorX.set(lastX);
          cursorY.set(lastY);
          rafId = null;
        });
      }
      
      if (!isVisible && e.clientX > 0) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' ||
        target.closest('.card') ||
        target.closest('.cursor-target') ||
        target.closest('[role="button"]');
      
      setIsHovering(!!isInteractive);
    };
    
    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        mixBlendMode: 'difference',
      }}
    >
      {/* Outer Ring */}
      <motion.div
        animate={{
          scale: isHovering ? 2.2 : 1,
          opacity: isHovering ? 0.9 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center relative"
        style={{
          boxShadow: isHovering ? '0 0 20px rgba(255,255,255,0.3)' : 'none'
        }}
      >
        {/* Inner Dot */}
        <motion.div 
          animate={{
            scale: isHovering ? 0.4 : 1,
            opacity: isHovering ? 0.8 : 1,
          }}
          className="w-1.5 h-1.5 bg-white rounded-full" 
        />
        
        {/* Crosshair lines (appearing on hover) */}
        {isHovering && (
          <>
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: 10 }}
              transition={{ duration: 0.15 }} 
              className="h-[1.5px] bg-white absolute"
              style={{ left: -4 }}
            />
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: 10 }}
              transition={{ duration: 0.15 }} 
              className="h-[1.5px] bg-white absolute"
              style={{ right: -4 }}
            />
            <motion.div 
              initial={{ height: 0 }} 
              animate={{ height: 10 }}
              transition={{ duration: 0.15 }} 
              className="w-[1.5px] bg-white absolute"
              style={{ top: -4 }}
            />
            <motion.div 
              initial={{ height: 0 }} 
              animate={{ height: 10 }}
              transition={{ duration: 0.15 }} 
              className="w-[1.5px] bg-white absolute"
              style={{ bottom: -4 }}
            />
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TargetCursor;
