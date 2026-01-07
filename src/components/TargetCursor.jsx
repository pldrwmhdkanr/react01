
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const TargetCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 10); // Offset to center 20px cursor
      cursorY.set(e.clientY - 10);
      if (!isVisible && e.clientX > 0) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.card') || e.target.closest('.cursor-target')) {
            setIsHovering(true);
        } else {
            setIsHovering(false);
        }
    };
    
    // Add event listeners
    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
        {/* Outer Ring / Target */}
      <motion.div
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-5 h-5 border border-white rounded-full flex items-center justify-center relative"
      >
        {/* Inner Dot */}
        <motion.div 
            animate={{
                scale: isHovering ? 0.5 : 1
            }}
            className="w-1 h-1 bg-white rounded-full" 
        />
        
        {/* Crosshair lines (appearing on hover) */}
        {isHovering && (
            <>
                 <motion.div initial={{ width: 0 }} animate={{ width: 8 }} className="h-[1px] bg-white absolute -left-1" />
                 <motion.div initial={{ width: 0 }} animate={{ width: 8 }} className="h-[1px] bg-white absolute -right-1" />
                 <motion.div initial={{ height: 0 }} animate={{ height: 8 }} className="w-[1px] bg-white absolute -top-1" />
                 <motion.div initial={{ height: 0 }} animate={{ height: 8 }} className="w-[1px] bg-white absolute -bottom-1" />
            </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TargetCursor;
