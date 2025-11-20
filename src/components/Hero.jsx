import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";

const Hero = ({ scrollY }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section id="hero" className="hero">
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          y: scrollY * 0.5,
        }}
      >
        <motion.div className="hero-badge" variants={itemVariants}>
          <span className="badge-dot"></span>
          <span>Open for Software Engineering & Data Roles</span>
        </motion.div>

        <motion.h1 className="hero-title" variants={itemVariants}>
          <span className="hero-greeting">Hello, I'm</span>
          <span className="hero-name gradient-text">Daniel Szurek</span>
        </motion.h1>

        <motion.p className="hero-subtitle" variants={itemVariants}>
          Software Engineer specializing in
          <span className="highlight"> Autonomous Vehicle Systems</span>,
          <span className="highlight"> Artificial Intelligence</span>, and
          <span className="highlight"> Data-Driven Solutions</span>
        </motion.p>

        <motion.div className="hero-cta" variants={itemVariants}>
          <motion.a
            href="#projects"
            className="cta-button primary"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 40px rgba(139, 90, 60, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            className="cta-button secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        <motion.div className="hero-scroll" variants={itemVariants}>
          <div className="scroll-indicator">
            <span>Scroll to explore</span>
            <motion.div
              className="scroll-line"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      <div className="hero-decoration">
        <motion.div
          className="decoration-circle circle-1"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="decoration-circle circle-2"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
