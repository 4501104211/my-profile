"use client";

import { useEffect, useRef } from 'react';

interface Trail {
  x: number;
  y: number;
  age: number;
  opacity: number;
  length: number;
  angle: number;
}

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const trailsRef = useRef<Trail[]>([]);
  const starsRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    originalX: number;
    originalY: number;
    angle: number;
    speed: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStars = () => {
      starsRef.current = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5,
        originalX: 0,
        originalY: 0,
        angle: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.8,
      })).map(star => ({
        ...star,
        originalX: star.x,
        originalY: star.y,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      starsRef.current.forEach(star => {
        // Update star position with random movement
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        // Bounce off edges
        if (star.x < 0 || star.x > canvas.width) {
          star.angle = Math.PI - star.angle;
        }
        if (star.y < 0 || star.y > canvas.height) {
          star.angle = -star.angle;
        }

        // Randomly change angle slightly
        star.angle += (Math.random() - 0.5) * 0.1;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, 0.2)`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Add subtle glow
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 2);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw trails
      const mouseSpeed = Math.sqrt(
        Math.pow(mouseRef.current.x - mouseRef.current.prevX, 2) +
        Math.pow(mouseRef.current.y - mouseRef.current.prevY, 2)
      );

      // Add new trail points if mouse is moving
      if (mouseSpeed > 3) {
        const angle = Math.atan2(
          mouseRef.current.y - mouseRef.current.prevY,
          mouseRef.current.x - mouseRef.current.prevX
        );
        
        trailsRef.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          age: 0,
          opacity: 0.4,
          length: Math.min(mouseSpeed * 2, 40),
          angle: angle
        });
      }

      // Draw trails
      trailsRef.current.forEach((trail) => {
        ctx.save();
        ctx.translate(trail.x, trail.y);
        ctx.rotate(trail.angle);

        // Create gradient for trail
        const gradient = ctx.createLinearGradient(0, 0, -trail.length, 0);
        gradient.addColorStop(0, `rgba(74, 222, 128, ${trail.opacity})`);
        gradient.addColorStop(1, 'rgba(74, 222, 128, 0)');

        // Draw elongated trail
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.moveTo(0, 0);
        ctx.lineTo(-trail.length, 0);
        ctx.stroke();

        // Small glow effect at the head
        const headGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 4);
        headGradient.addColorStop(0, `rgba(74, 222, 128, ${trail.opacity})`);
        headGradient.addColorStop(1, 'rgba(74, 222, 128, 0)');
        
        ctx.beginPath();
        ctx.fillStyle = headGradient;
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Update trail
        trail.age += 1;
        trail.opacity -= 0.025;
        trail.length *= 0.95;
      });

      // Remove old trails
      trailsRef.current = trailsRef.current.filter(trail => trail.opacity > 0);

      // Update previous mouse position
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;

      requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        ...mouseRef.current,
        x: e.clientX,
        y: e.clientY,
      };
    };

    resizeCanvas();
    initStars();
    draw();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initStars();
    });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ opacity: 0.5 }}
    />
  );
} 