import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./AnimatedBackground.css";

const AnimatedBackground = ({ scrollY }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    // CSS-pixel canvas dimensions (keep these in scope before resizeCanvas runs)
    let cw = window.innerWidth;
    let ch = window.innerHeight;
    let rect = canvas.getBoundingClientRect();

    const resizeCanvas = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // keep CSS-pixel sizes in cw/ch so mouse coords and particle positions are in the same space
      cw = w;
      ch = h;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      // set a transform so drawing ops use CSS pixels (1 user unit = 1 CSS pixel)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rect = canvas.getBoundingClientRect();
    };
    resizeCanvas();

    const particles = [];
    const particleCount = 150;
    const mouse = {
      x: null,
      y: null,
      radius: 80, // Smaller, tighter interaction zone
    };

    class Particle {
      constructor() {
        this.x = Math.random() * cw;
        this.y = Math.random() * ch;
        this.size = Math.random() * 2 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        // Update base position with natural drift
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        // Wrap edges
        if (this.baseX > cw) this.baseX = 0;
        if (this.baseX < 0) this.baseX = cw;
        if (this.baseY > ch) this.baseY = 0;
        if (this.baseY < 0) this.baseY = ch;

        // Start from base position each frame
        let targetX = this.baseX;
        let targetY = this.baseY;

        // Apply mouse repulsion directly to ALL particles
        if (mouse.x != null && mouse.y != null) {
          // Check distance from BASE position to mouse
          const dx = this.baseX - mouse.x;
          const dy = this.baseY - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius && distance > 0) {
            // Calculate repulsion - stronger when closer
            const force = (mouse.radius - distance) / mouse.radius;
            const pushStrength = force * force * 40; // Strong quadratic push

            // Push away from mouse
            const angle = Math.atan2(dy, dx);
            targetX = this.baseX + Math.cos(angle) * pushStrength;
            targetY = this.baseY + Math.sin(angle) * pushStrength;
          }
        }

        // Smooth interpolation to target
        const easing = 0.15;
        this.x += (targetX - this.x) * easing;
        this.y += (targetY - this.y) * easing;
      }

      draw() {
        ctx.fillStyle = `rgba(212, 197, 185, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      // clear using CSS pixel dimensions (user-space) so transform doesn't interfere
      ctx.clearRect(0, 0, cw, ch);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(139, 90, 60, ${
              0.1 * (1 - distance / 150)
            })`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      resizeCanvas();
      // update cached dims and rect
      cw = window.innerWidth;
      ch = window.innerHeight;
      rect = canvas.getBoundingClientRect();
    };

    const handleMouseMove = (e) => {
      // Convert to canvas-local CSS pixels
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="animated-background">
      <canvas ref={canvasRef} className="particle-canvas" />

      {/* Gradient orbs */}
      <motion.div
        className="gradient-orb orb-1"
        style={{
          y: scrollY * 0.3,
        }}
      />
      <motion.div
        className="gradient-orb orb-2"
        style={{
          y: scrollY * 0.5,
        }}
      />
      <motion.div
        className="gradient-orb orb-3"
        style={{
          y: scrollY * 0.2,
        }}
      />

      {/* Mesh gradient overlay */}
      <div className="mesh-gradient" />
    </div>
  );
};

export default AnimatedBackground;
