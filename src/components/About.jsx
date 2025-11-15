import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaHeart, FaCode, FaPalette, FaRocket } from "react-icons/fa";
import headshotImg from "../images/headshot.jpg";
import "./About.css";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sectionRef = useRef(null);

  // Use scroll progress based on section position for parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Create parallax transform - moves from 0 to -200px as you scroll through the section
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const interests = [
    {
      icon: <FaCode />,
      title: "Autonomous Systems",
      description:
        "Developing advanced vehicle control systems with sensor fusion, ADAS features, and real-time decision-making algorithms.",
    },
    {
      icon: <FaPalette />,
      title: "AI & Machine Learning",
      description:
        "Researching and implementing Model Predictive Control, Reinforcement Learning, and Genetic Algorithms for optimization.",
    },
    {
      icon: <FaHeart />,
      title: "Data Engineering",
      description:
        "Building scalable ETL pipelines, dashboards, and analytics solutions that drive business insights and automation.",
    },
    {
      icon: <FaRocket />,
      title: "Research & Innovation",
      description:
        "Contributing to academic research with expected publications in Gaussian Processes and hybrid DRL/MPC controllers.",
    },
  ];

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about-container" ref={ref}>
        {/* Wrap header and intro in single motion group for unified parallax */}
        <motion.div className="about-header-intro-group" style={{ y }}>
          <motion.div
            className="about-header"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.span className="section-label" variants={itemVariants}>
              Get to know me
            </motion.span>
            <motion.h2
              className="section-title gradient-text"
              variants={itemVariants}
            >
              About Me
            </motion.h2>
            <motion.p className="section-description" variants={itemVariants}>
              A glimpse into my world, passions, and what drives me
            </motion.p>
          </motion.div>

          <motion.div
            className="about-intro glass"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="intro-image">
              <div className="image-placeholder">
                <img
                  src={headshotImg}
                  alt="Daniel Szurek"
                  className="headshot-img"
                />
              </div>
              <div className="image-decoration"></div>
            </div>

            <div className="intro-text">
              <h3>Hello! I'm Daniel</h3>
              <p>
                Accelerated Master's student in Computer Science leading
                cutting-edge autonomous vehicle development at the University of
                Alabama's EcoCAR team. Currently directing a 15-student team in
                developing advanced driver assistance systems (ADAS) including
                lane-keep assist, adaptive cruise control, and V2X
                connectivity—with active research in Model Predictive Control,
                Reinforcement Learning, and Gaussian Processes for efficiency
                optimization.
              </p>
              <p>
                I combine deep technical expertise in AI and autonomous systems
                with proven software and data engineering experience from
                internships at SSAB and Brasfield & Gorrie, where I delivered
                enterprise-scale dashboards, automated reporting pipelines, and
                cloud-based solutions. Passionate about applying machine
                learning and intelligent systems to solve real-world challenges
                in automotive and tech industries.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-interests"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h3 className="interests-title">What I'm Passionate About</h3>
            <div className="interests-grid">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.title}
                  className="interest-card glass-light"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(212, 197, 185, 0.08)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="interest-icon">{interest.icon}</div>
                  <h4>{interest.title}</h4>
                  <p>{interest.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-stats"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="stat-card glass">
              <motion.div
                className="stat-number gradient-text"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
              >
                15+
              </motion.div>
              <div className="stat-label">Team Members Led</div>
            </div>
            <div className="stat-card glass">
              <motion.div
                className="stat-number gradient-text"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.6, delay: 0.9, type: "spring" }}
              >
                3.88
              </motion.div>
              <div className="stat-label">GPA / 4.0</div>
            </div>
            <div className="stat-card glass">
              <motion.div
                className="stat-number gradient-text"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.6, delay: 1.0, type: "spring" }}
              >
                3
              </motion.div>
              <div className="stat-label">Research Papers (Expected)</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
