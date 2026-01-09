import React, { useEffect, useRef } from 'react';

const PrismBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let frameId;
    let lastTime = 0;
    const FPS = 30; // Limit to 30fps for performance
    const frameInterval = 1000 / FPS;

    // Vibrant prism colors - much brighter!
    const colors = [
      [139, 92, 246],   // Violet-500
      [59, 130, 246],   // Blue-500
      [168, 85, 247],   // Purple-500
      [6, 182, 212],    // Cyan-500
      [236, 72, 153],   // Pink-500
    ];
    
    // Gradient blobs with varied sizes
    const blobs = colors.map((_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.min(window.innerWidth, window.innerHeight) * (0.4 + i * 0.1)
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const draw = (currentTime) => {
      frameId = requestAnimationFrame(draw);
      
      // Throttle to target FPS
      const elapsed = currentTime - lastTime;
      if (elapsed < frameInterval) return;
      lastTime = currentTime - (elapsed % frameInterval);

      // Fill with base dark color first
      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.fillRect(0, 0, width, height);

      // Update blob positions
      blobs.forEach(blob => {
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Bounce off edges
        if (blob.x < -blob.r * 0.5 || blob.x > width + blob.r * 0.5) blob.vx *= -1;
        if (blob.y < -blob.r * 0.5 || blob.y > height + blob.r * 0.5) blob.vy *= -1;
      });

      // Draw blobs with additive blending for vibrant overlap
      ctx.globalCompositeOperation = 'screen';
      
      blobs.forEach((blob, i) => {
        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
        const [r, g, b] = colors[i % colors.length];
        
        // Higher opacity for more visible colors
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.6)`);
        gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, 0.3)`);
        gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, 0.1)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';
    };

    window.addEventListener('resize', resize);
    resize();
    frameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ filter: 'blur(60px)' }} // Reduced blur for better visibility
    />
  );
};

export default PrismBackground;
