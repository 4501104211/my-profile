"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/providers/ThemeProvider";


export default function GlobeAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);
  const requestRef = useRef<number>();
  const explosionRef = useRef({
    time: 0,
    x: 215, // Default to canvas.width/2 (430/2)
    y: 0, // Default to (canvas.height/2 - 50) - 100
    active: false,
    radius: 10,
    opacity: 0.8,
  });

  const glowRef = useRef({
    x: 215,
    y: 0,
    active: false,
    radius: 4,
    opacity: 0.5,
  });

  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
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
      globeBackground:
        theme === "dark" ? "rgba(30, 30, 30, 0.3)" : "rgba(200, 200, 200, 0.3)",
      gridLines:
        theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.1)",
      fadeStart:
        theme === "dark" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)",
      fadeMid:
        theme === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
      fadeEnd: theme === "dark" ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)",
    };

    const satellite = {
      angle: 0,
      orbitRadius: radius * 1.5,
      speed: 0.01,
    };

    function drawExplosion(ctx: CanvasRenderingContext2D) {
      if (!explosionRef.current.active) return;

      const { x, y, radius, opacity } = explosionRef.current;

      // Save context state
      ctx.save();

      // Create clipping path for the globe
      ctx.beginPath();
      ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
      ctx.clip();

      // Draw explosion effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(34, 197, 94, ${opacity})`); // Darker green
      gradient.addColorStop(0.3, `rgba(21, 128, 61, ${opacity * 0.8})`); // More opacity
      gradient.addColorStop(0.7, `rgba(20, 83, 45, ${opacity * 0.5})`); // Darker green + more opacity
      gradient.addColorStop(1, "rgba(20, 83, 45, 0)"); // Darker end color

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Restore context state
      ctx.restore();

      // Update explosion parameters
      explosionRef.current.radius += 4;
      explosionRef.current.opacity -= 0.015;

      // Reset effect when finished
      if (explosionRef.current.opacity <= 0) {
        explosionRef.current.active = false;
        explosionRef.current.radius = 0;
        explosionRef.current.opacity = 0.9; // Increased initial opacity
      }
    }

    function drawGlow(ctx: CanvasRenderingContext2D) {
      for (let i = 0; i < 2; i++) {
        if (!glowRef.current.active) {
          glowRef.current.active = true;

          // Random position on globe surface
          const angle = Math.random() * Math.PI * 2;
          const globeRadius = radius; // Store radius value to avoid reference error
          const height = Math.random() * globeRadius * 2 - globeRadius;
          const r = Math.sqrt(globeRadius * globeRadius - height * height);

          glowRef.current.x = center.x + r * Math.cos(angle);
          glowRef.current.y = center.y + height;
          glowRef.current.radius = 4;
          glowRef.current.opacity = 0.5;
        }

        const { x, y, radius: glowRadius, opacity } = glowRef.current;

        // Draw dot glow
        const dotGradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
        dotGradient.addColorStop(0, `rgba(74, 222, 128, ${opacity})`);
        dotGradient.addColorStop(0.5, `rgba(74, 222, 128, ${opacity * 0.4})`);
        dotGradient.addColorStop(1, "rgba(74, 222, 128, 0)");

        ctx.beginPath();
        ctx.fillStyle = dotGradient;
        ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw dot center
        ctx.beginPath();
        ctx.fillStyle = "#4ade80";
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();

        // Update glow parameters
        glowRef.current.radius += 0.2;
        glowRef.current.opacity -= 0.01;

        // Reset effect when finished
        if (glowRef.current.opacity <= 0) {
          glowRef.current.active = false;
        }
      }
    }

    function drawGlobe() {
      if (!ctx || !canvas) return;

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
        const angle = (i * Math.PI) / (lines / 2) + rotationRef.current;
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
        const currentRadius = Math.sqrt(
          radius * radius - Math.pow(y - center.y, 2)
        );

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

      // Draw random glowing dots around the globe
      drawGlow(ctx);

      // Draw satellite orbit
      const orbitGradient = ctx.createLinearGradient(
        center.x - satellite.orbitRadius,
        center.y,
        center.x + satellite.orbitRadius,
        center.y
      );
      orbitGradient.addColorStop(0, "rgba(74, 222, 128, 0)");
      orbitGradient.addColorStop(0.5, "rgba(74, 222, 128, 0.1)");
      orbitGradient.addColorStop(1, "rgba(74, 222, 128, 0)");

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

      // Vẽ hiệu ứng nổ sau khi vẽ vệ tinh
      drawExplosion(ctx);

      // Calculate satellite position
      const satelliteX =
        center.x + satellite.orbitRadius * Math.cos(satellite.angle);
      const satelliteY =
        center.y +
        satellite.orbitRadius * perspective * Math.sin(satellite.angle);

      const rotatedX =
        center.x +
        (satelliteX - center.x) * Math.cos(tilt) -
        (satelliteY - center.y) * Math.sin(tilt);
      const rotatedY =
        center.y +
        (satelliteX - center.x) * Math.sin(tilt) +
        (satelliteY - center.y) * Math.cos(tilt);

      // Draw satellite glow
      const gradient = ctx.createRadialGradient(
        rotatedX,
        rotatedY,
        0,
        rotatedX,
        rotatedY,
        20
      );
      gradient.addColorStop(0, "rgba(74, 222, 128, 0.8)");
      gradient.addColorStop(0.5, "rgba(74, 222, 128, 0.2)");
      gradient.addColorStop(1, "rgba(74, 222, 128, 0)");

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(rotatedX, rotatedY, 20, 0, Math.PI * 2);
      ctx.fill();

      // Draw satellite
      ctx.beginPath();
      ctx.fillStyle = "#4ade80";
      ctx.arc(rotatedX, rotatedY, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Apply fade gradient
      const fadeGradient = ctx.createLinearGradient(
        0,
        center.y - radius,
        0,
        canvas.height
      );
      fadeGradient.addColorStop(0, colors.fadeStart);
      fadeGradient.addColorStop(0.5, colors.fadeMid);
      fadeGradient.addColorStop(1, colors.fadeEnd);

      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = fadeGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";

      rotationRef.current += 0.002;
      satellite.angle += satellite.speed;

      requestRef.current = requestAnimationFrame(drawGlobe);
    }

    const explosionInterval = setInterval(() => {
      if (!explosionRef.current.active) {
        explosionRef.current.active = true;
        explosionRef.current.radius = 0;
        explosionRef.current.opacity = 0.8;

        // Random position on globe surface
        const angle = Math.random() * Math.PI * 2; // Random angle
        const height = Math.random() * radius * 2 - radius; // Random height on globe
        const r = Math.sqrt(radius * radius - height * height); // Radius at this height

        // Calculate x,y coordinates
        explosionRef.current.x = center.x + r * Math.cos(angle);
        explosionRef.current.y = center.y + height;
      }
    }, 4000); // Kích hoạt mỗi 4 giây

    drawGlobe();

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      clearInterval(explosionInterval);
    };
  }, [theme]); // Add theme as dependency

  return (
    <div className="relative w-full mx-auto">
      <canvas ref={canvasRef} className="w-full h-[600px] opacity-50" />
    </div>
  );
}
