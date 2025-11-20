import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./AnimatedBackground.css";

const AnimatedBackground = ({ scrollY }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;
    const mouse = {
      x: null,
      y: null,
      radius: 150,
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.density = Math.random() * 30 + 1;
      }

      update() {
        // Move particles naturally
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        // Wrap around edges
        if (this.baseX > canvas.width) this.baseX = 0;
        if (this.baseX < 0) this.baseX = canvas.width;
        if (this.baseY > canvas.height) this.baseY = 0;
        if (this.baseY < 0) this.baseY = canvas.height;

        // Mouse interaction
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.baseX;
          const dy = mouse.y - this.baseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = mouse.radius;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * this.density;
          const directionY = forceDirectionY * force * this.density;

          if (distance < mouse.radius) {
            this.x = this.baseX - directionX;
            this.y = this.baseY - directionY;
          } else {
            // Smoothly return to base position
            this.x += (this.baseX - this.x) * 0.05;
            this.y += (this.baseY - this.y) * 0.05;
          }
        } else {
          // Return to base position when mouse is not on canvas
          this.x = this.baseX;
          this.y = this.baseY;
        }
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
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
