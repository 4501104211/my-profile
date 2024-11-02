"use client";

import { useEffect, useRef } from 'react';
import { useTheme } from '@/providers/ThemeProvider';

export default function GlobeAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);
  const requestRef = useRef<number>();
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 430;
    canvas.height = 430;

    const center = { x: canvas.width / 2, y: canvas.height / 2 - 50 };
    const radius = 200;
    const lines = 32;
    const tilt = -0.4;
    const perspective = 0.8;

    // Colors based on theme
    const colors = {
      globeBackground: theme === 'dark' ? 'rgba(30, 30, 30, 0.3)' : 'rgba(200, 200, 200, 0.3)',
      gridLines: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.1)',
      fadeStart: theme === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
      fadeMid: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
      fadeEnd: theme === 'dark' ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)',
    };

    const satellite = {
      angle: 0,
      orbitRadius: radius * 1.5,
      speed: 0.003
    };

    function drawGlobe() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.rotate(tilt);
      ctx.scale(1, perspective);
      ctx.translate(-center.x, -center.y);

      // Draw globe background
      ctx.beginPath();
      ctx.fillStyle = colors.globeBackground;
      ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw meridians
      for (let i = 0; i < lines; i++) {
        const angle = ((i * Math.PI) / (lines / 2)) + rotationRef.current;
        ctx.beginPath();
        ctx.strokeStyle = colors.gridLines;
        ctx.lineWidth = 0.8;
        
        ctx.ellipse(
          center.x,
          center.y,
          radius * Math.abs(Math.cos(angle)),
          radius * 0.98,
          0,
          0,
          2 * Math.PI
        );
        
        ctx.stroke();
      }

      // Draw parallels
      for (let i = 1; i < lines / 2; i++) {
        const y = center.y - radius + (i * 2 * radius) / lines;
        const currentRadius = Math.sqrt(radius * radius - Math.pow(y - center.y, 2));
        
        ctx.beginPath();
        ctx.strokeStyle = colors.gridLines;
        ctx.lineWidth = 0.8;
        ctx.ellipse(
          center.x, 
          y, 
          currentRadius, 
          currentRadius * 0.6,
          0, 
          0, 
          2 * Math.PI
        );
        ctx.stroke();
      }

      // Draw satellite orbit
      const orbitGradient = ctx.createLinearGradient(
        center.x - satellite.orbitRadius,
        center.y,
        center.x + satellite.orbitRadius,
        center.y
      );
      orbitGradient.addColorStop(0, 'rgba(74, 222, 128, 0)');
      orbitGradient.addColorStop(0.5, 'rgba(74, 222, 128, 0.1)');
      orbitGradient.addColorStop(1, 'rgba(74, 222, 128, 0)');

      ctx.beginPath();
      ctx.strokeStyle = orbitGradient;
      ctx.lineWidth = 1.5;
      ctx.ellipse(
        center.x,
        center.y,
        satellite.orbitRadius,
        satellite.orbitRadius * perspective,
        tilt,
        0,
        2 * Math.PI
      );
      ctx.stroke();

      // Calculate satellite position
      const satelliteX = center.x + satellite.orbitRadius * Math.cos(satellite.angle);
      const satelliteY = center.y + satellite.orbitRadius * perspective * Math.sin(satellite.angle);

      const rotatedX = center.x + (satelliteX - center.x) * Math.cos(tilt) - (satelliteY - center.y) * Math.sin(tilt);
      const rotatedY = center.y + (satelliteX - center.x) * Math.sin(tilt) + (satelliteY - center.y) * Math.cos(tilt);

      // Draw satellite glow
      const gradient = ctx.createRadialGradient(
        rotatedX, rotatedY, 0,
        rotatedX, rotatedY, 20
      );
      gradient.addColorStop(0, 'rgba(74, 222, 128, 0.8)');
      gradient.addColorStop(0.5, 'rgba(74, 222, 128, 0.2)');
      gradient.addColorStop(1, 'rgba(74, 222, 128, 0)');

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(rotatedX, rotatedY, 20, 0, Math.PI * 2);
      ctx.fill();

      // Draw satellite
      ctx.beginPath();
      ctx.fillStyle = '#4ade80';
      ctx.arc(rotatedX, rotatedY, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Apply fade gradient
      const fadeGradient = ctx.createLinearGradient(0, center.y - radius, 0, canvas.height);
      fadeGradient.addColorStop(0, colors.fadeStart);
      fadeGradient.addColorStop(0.5, colors.fadeMid);
      fadeGradient.addColorStop(1, colors.fadeEnd);

      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = fadeGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';

      rotationRef.current += 0.002;
      satellite.angle += satellite.speed;

      requestRef.current = requestAnimationFrame(drawGlobe);
    }

    drawGlobe();

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [theme]); // Add theme as dependency

  return (
    <div className="relative w-full mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-[600px] opacity-50"
      />
    </div>
  );
} 