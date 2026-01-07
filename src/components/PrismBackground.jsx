
import React, { useEffect, useRef } from 'react';

const PrismBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let frameId;

    // Prism colors config
    const colors = [
        [30, 0, 60],    // Deep Purple
        [0, 0, 40],     // Dark Blue
        [60, 0, 80],    // Magenta
        [10, 20, 40],   // Cyan-Dark
    ];
    
    // Gradient blobs
    const blobs = colors.map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.min(window.innerWidth, window.innerHeight) * 0.8
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const draw = () => {
      // Clear with slight fade for trail effect (optional, but here we just redraw)
      ctx.clearRect(0, 0, width, height); // Transparent clear

      // Blobs simulation
      blobs.forEach(blob => {
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Bounce
        if (blob.x < -blob.r || blob.x > width + blob.r) blob.vx *= -1;
        if (blob.y < -blob.r || blob.y > height + blob.r) blob.vy *= -1;
      });

      // Draw composite gradient
      // Use efficient composition
      ctx.globalCompositeOperation = 'screen'; // Use screen for vibrant overlap
      
      blobs.forEach((blob, i) => {
        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
        const [r, g, b] = colors[i % colors.length];
        
        // "Prism" feel comes from overlapping vivid colors
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.8)`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.2)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';
      
      // Noise overlay for texture (optional but adds "material" feel)
      
      frameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ filter: 'blur(80px)' }} // Heavy blur to merge blobs into a fluid gradient
    />
  );
};

export default PrismBackground;
