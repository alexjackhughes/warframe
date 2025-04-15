"use client";

import { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  time: number;
  speed: number;
  directionX: number;
  directionY: number;
  strength: number;
}

export function RippleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const prevMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Add a ripple at the mouse position
    const addRipple = (
      x: number,
      y: number,
      dirX: number,
      dirY: number,
      strength = 1
    ) => {
      ripplesRef.current.push({
        x,
        y,
        time: 0,
        speed: 0.5 + Math.random() * 0.5, // Random speed variation
        directionX: dirX,
        directionY: dirY,
        strength: strength,
      });
    };

    // Track mouse movement to create ripples
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate direction vector from previous position
      const dirX = e.clientX - prevMousePosRef.current.x;
      const dirY = e.clientY - prevMousePosRef.current.y;

      // Normalize the direction vector
      const magnitude = Math.sqrt(dirX * dirX + dirY * dirY);

      // Only create ripples if there's significant movement
      if (magnitude > 5 && Math.random() > 0.7) {
        const normalizedDirX = dirX / magnitude;
        const normalizedDirY = dirY / magnitude;
        addRipple(
          e.clientX,
          e.clientY,
          normalizedDirX,
          normalizedDirY,
          magnitude / 20
        );
      }

      // Update previous position
      prevMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    // Create ripple on click
    const handleMouseClick = (e: MouseEvent) => {
      // For clicks, create ripples in multiple directions for a burst effect
      for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 * i) / 5;
        const dirX = Math.cos(angle);
        const dirY = Math.sin(angle);
        addRipple(e.clientX, e.clientY, dirX, dirY, 2);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseClick);

    // Function to draw lines with ripple effect
    const drawRippleLines = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      ripples: Ripple[]
    ) => {
      // Clear canvas with the new background color
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#000800"); // Darker green top
      gradient.addColorStop(1, "#000400"); // Even darker green bottom
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Line properties
      const lineCount = 50;
      const lineSpacing = height / lineCount;

      // Draw each line
      for (let i = 0; i < lineCount; i++) {
        const y = i * lineSpacing;

        ctx.beginPath();
        // Use darker green line color with lower opacity
        ctx.strokeStyle = "rgba(0, 100, 0, 0.15)"; // Darker green with very low opacity
        ctx.lineWidth = 1.5;

        // Draw the line with ripple distortion
        for (let x = 0; x < width; x += 2) {
          // Skip pixels for performance
          let yOffset = 0;

          // Apply all active ripples to this point
          ripples.forEach((ripple) => {
            // Calculate distance from ripple origin
            const dx = x - ripple.x;
            const dy = y - ripple.y;

            // Apply directional influence - stretch the ripple in the direction of movement
            const directionInfluence = 2.5; // How much the direction affects the shape
            const stretchedDx =
              dx - ripple.directionX * directionInfluence * ripple.strength;
            const stretchedDy =
              dy - ripple.directionY * directionInfluence * ripple.strength;

            // Calculate directionally-influenced distance
            const distance = Math.sqrt(
              stretchedDx * stretchedDx + stretchedDy * stretchedDy
            );

            // Ripple wave equation
            const rippleRadius = ripple.time * 300; // Expanding radius
            const rippleWidth = 50; // Width of the ripple wave
            const distanceFromWave = Math.abs(distance - rippleRadius);

            // Only affect points near the wave front
            if (distanceFromWave < rippleWidth) {
              // Calculate amplitude (stronger at wave front, diminishes with time)
              // Make amplitude stronger in the direction of movement
              const directionFactor =
                1 +
                Math.abs(dx * ripple.directionX + dy * ripple.directionY) /
                  (Math.abs(dx) + Math.abs(dy) + 0.001);

              const amplitude =
                25 *
                (1 - ripple.time / 10) *
                (1 - distanceFromWave / rippleWidth) *
                ripple.strength *
                directionFactor;

              // Add this ripple's contribution to the total offset
              yOffset += Math.sin(distance * 0.05) * amplitude;
            }
          });

          // Draw the point
          if (x === 0) {
            ctx.moveTo(x, y + yOffset);
          } else {
            ctx.lineTo(x, y + yOffset);
          }
        }

        ctx.stroke();
      }
    };

    // Animation loop
    const animate = (timestamp: number) => {
      // Calculate delta time
      const deltaTime = timestamp - (lastTimeRef.current || timestamp);
      lastTimeRef.current = timestamp;

      // Update ripples
      ripplesRef.current.forEach((ripple) => {
        ripple.time += deltaTime * ripple.speed * 0.01;
      });

      // Remove ripples that have expanded too much
      ripplesRef.current = ripplesRef.current.filter(
        (ripple) => ripple.time < 10
      );

      // Draw the scene
      drawRippleLines(ctx, canvas.width, canvas.height, ripplesRef.current);

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start the animation
    animationRef.current = requestAnimationFrame(animate);

    // Add random ripples periodically
    const randomRippleInterval = setInterval(() => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const angle = Math.random() * Math.PI * 2;
      addRipple(x, y, Math.cos(angle), Math.sin(angle), 0.5 + Math.random());
    }, 2000);

    // Add an initial ripple in the center
    const randomAngle = Math.random() * Math.PI * 2;
    addRipple(
      canvas.width / 2,
      canvas.height / 2,
      Math.cos(randomAngle),
      Math.sin(randomAngle),
      1
    );

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);
      clearInterval(randomRippleInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-screen z-0 overflow-hidden"
      style={{ pointerEvents: "none" }}
    />
  );
}
