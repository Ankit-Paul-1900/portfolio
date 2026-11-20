import { useEffect, useRef } from "react";

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: { x: number; y: number; z: number; o: number }[] = [];
    const numStars = 1000;
    
    let animationFrameId: number;
    let w = window.innerWidth;
    let h = window.innerHeight;
    
    // Mouse position gently pans the starfield without changing its speed.
    let mouseX = 0;
    let mouseY = 0;
    const targetSpeed = 0.5;
    let currentSpeed = 0.5;
    
    const handleCanvasMouseMove = (e: MouseEvent) => {
      // Subtle pan effect
      mouseX = (e.clientX - w / 2) * 0.1;
      mouseY = (e.clientY - h / 2) * 0.1;
    };
    
    window.addEventListener("mousemove", handleCanvasMouseMove);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    
    resize();
    window.addEventListener("resize", resize);

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * w * 2 - w,
        y: Math.random() * h * 2 - h,
        z: Math.random() * w,
        o: Math.random(),
      });
    }

    const maxTrailSpeed = 35;

    const draw = () => {
      // Clear with slight opacity for trails (motion blur)
      // When speed is high, lower alpha for longer trails
      const alpha = Math.max(0.1, 1 - currentSpeed / maxTrailSpeed);
      ctx.fillStyle = `rgba(10, 10, 10, ${alpha})`;
      ctx.fillRect(0, 0, w, h);
      
      // Lerp speed
      currentSpeed += (targetSpeed - currentSpeed) * 0.05;
      
      const cx = w / 2 + mouseX;
      const cy = h / 2 + mouseY;

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        
        star.z -= currentSpeed;
        
        if (star.z <= 0) {
          star.x = Math.random() * w * 2 - w;
          star.y = Math.random() * h * 2 - h;
          star.z = w;
          star.o = Math.random();
        }

        const k = 128.0 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= w && py >= 0 && py <= h) {
          // Dynamic size and opacity based on depth and speed
          const size = (1 - star.z / w) * (currentSpeed > 5 ? 2.5 : 1.5);
          const opacity = (1 - star.z / w) * star.o;
          
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          
          if (currentSpeed > 5) {
             // Draw streaks when fast
             const prevK = 128.0 / (star.z + currentSpeed * 2);
             const prevPx = star.x * prevK + cx;
             const prevPy = star.y * prevK + cy;
             
             ctx.moveTo(px, py);
             ctx.lineTo(prevPx, prevPy);
             ctx.lineWidth = size;
             ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
             ctx.stroke();
          } else {
             ctx.arc(px, py, size, 0, Math.PI * 2);
             ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleCanvasMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      {/* Radial Gradient overlay to fade edges */}
      <div className="absolute inset-0 bg-black/20 mask-[radial-gradient(circle_at_center,transparent_20%,black_100%)]"></div>
    </div>
  );
}
