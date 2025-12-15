import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaPython,
  FaSwift,
  FaApple,
  FaCar,
  FaLinux,
  FaMicrochip,
  FaAndroid,
  FaAppStore,
} from "react-icons/fa";
import {
  SiFlutter,
  SiDart,
  SiPytorch,
  SiOpencv,
  SiScala,
  SiC,
} from "react-icons/si";

import cavSysImg from "../images/CAVSys_example.png";
import voiceAssistantImg from "../images/voiceassistant.jpg";
import lrfrImg from "../images/lrfr.png";
import mapsImg from "../images/mapsapplication.jpg";
import ReactGA from 'react-ga4';
import "./Projects.css";
import budgieImg from "../images/budgie_light.png";
import lispImg from "../images/lisp.png";
import scaloxImg from "../images/scalox.png";

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleFilterClick = (categoryId) => {
    setFilter(categoryId);
    ReactGA.event({
      category: 'Projects',
      action: 'Filter',
      label: categoryId,
    });
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    ReactGA.event({
      category: 'Projects',
      action: 'View Details',
      label: project.title,
    });
  };

  const handleExternalLinkClick = (e, type, projectTitle) => {
    e.stopPropagation();
    ReactGA.event({
      category: 'External Link',
      action: 'Click',
      label: `${type} - ${projectTitle}`,
    });
  };

  const projects = [
    {
      id: 1,
      title: "EcoCAR CAV System - Autonomous Vehicle Platform",
      category: "automotive",
      description:
        "Leading development of a comprehensive Simulink and RTMaps-based vehicle control system for a Cadillac Lyriq. Features include driver monitoring, lane-keep assist with Model Predictive Control, adaptive cruise control with hybrid DRL/MPC, automatic intersection navigation, V2X connectivity, and multi-sensor fusion (camera, LiDAR, radar). Currently researching Gaussian Processes for intersection navigation efficiency optimization.",
      technologies: [
        "MATLAB",
        "Simulink",
        "RTMaps",
        "Python",
        "C++",
        "Sensor Fusion",
        "CAN Bus Communication",
        "ADAS",
      ],
      icons: [<FaCar />, <FaPython />, <SiC />, <FaLinux />],
      image: cavSysImg,
      imageAlt: "EcoCAR CAV System",
      github: null,
      live: null,
    },
    {
      id: 2,
      title: "Voice Assistant for Vehicle Control",
      category: "ai",
      description:
        "Led a team of 5 students to develop an LLM-based voice assistant running natively on NXP NavQ+ companion computer. Demonstrates early generative AI experience with optimized inference for edge computing.",
      technologies: [
        "Python",
        "LLM",
        "Linux",
        "Edge AI",
        "NXP NavQ+ Mission Computer",
      ],
      icons: [<FaMicrochip />, <FaLinux />, <FaPython />],
      image: voiceAssistantImg,
      imageAlt: "Voice Assistant",
      github: "https://github.com/dszurek/voice_assistant",
      live: null,
    },
    {
      id: 3,
      title: "Low-Resolution Facial Recognition Pipeline",
      category: "ai",
      description:
        "Developed a unique CNN pipeline for facial recognition by feeding DSR (Deep Super-Resolution) upscaled low-resolution images to a fine-tuned and quantized EdgeFace model. Achieved >90% accuracy on low-quality surveillance images. Course project demonstrating computer vision and model optimization skills.",
      technologies: ["Python", "PyTorch", "OpenCV", "CNN", "Deep Learning"],
      icons: [<FaPython />, <SiPytorch />, <SiOpencv />],
      image: lrfrImg,
      imageAlt: "Facial Recognition Pipeline",
      github: "https://www.github.com/dszurek/LRFR-Project",
      live: null,
    },
    {
      id: 4,
      title: "Flutter Maps & Navigation Application",
      category: "mobile",
      description:
        "Singlehandedly developed a complete maps and navigation system for vehicle infotainment using Flutter. Features GPS integration, route generation algorithms, location searching with autocomplete, and accurate route time estimation. Deployed to Android system running in competition vehicle.",
      technologies: [
        "Flutter",
        "Dart",
        "Android",
        "GPS",
        "Google Places API",
        "Docker",
      ],
      icons: [<SiFlutter />, <SiDart />, <FaAndroid />],
      image: mapsImg,
      imageAlt: "Flutter Maps Application",
      github: "https://github.com/dszurek/flutterMapsApp",
      live: null,
    },
    {
      id: 5,
      title: "Budgie: Smart Expense Planning",
      category: "mobile",
      description:
        "Built a budgeting application for iOS with sporadic student income in mind. Features a custom constraint-based scheduling algorithm that predicts the most optimal date to purchase wish list items based on income and expenses. ",
      technologies: [
        "Swift",
        "iOS Development",
        "XCode",
        "Algorithm Design",
        "Constraint-Based Scheduling",
      ],
      icons: [<FaSwift />, <FaApple />],
      image: budgieImg,
      imageAlt: "Budgie: Smart Expense Planning",
      github: "https://github.com/dszurek/Budgie",
      live: null,
      appStore: "https://apps.apple.com/us/app/budgie-smart-expense-planning/id6755897739",
    },
    {
      id: 6,
      title: "Lisp Interpreter",
      category: "foundation",
      description: "A lightweight, feature-rich Lisp interpreter written in C. Implements a functional Lisp interpreter capable of parsing and evaluating S-expressions. It supports core Lisp features including dynamic typing, first-class functions (closures), recursion, and lexical scoping. It is designed to be a clean and understandable implementation of the fundamentals of language interpretation. This project was done for a course taken at the University of Alabama.",
      technologies: ["C", "Lisp", "Interpreter", "Parsing", "Evaluation"],
      icons: [<SiC />],
      image: lispImg,
      imageAlt: "Lisp Interpreter",
      github: "https://github.com/dszurek/lisp",
      live: null,
    },
    {
      id: 7,
      title: "Scalox",
      category: "foundation",
      description: "A Scala implementation of the Lox interpreter from the first 13 chapters of the book Crafting Interpreters by Robert Nystrom, done for a course taken at the University of Alabama. It is a tree-walk interpreter that supports the full Lox language.",
      technologies: ["Scala", "Lox", "Interpreter", "Parsing", "Evaluation"],
      icons: [<SiScala />],
      image: scaloxImg,
      imageAlt: "Scalox: Lox Interpreter",
      github: "https://github.com/dszurek/scalox",
      live: null,
    }
  ];

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "automotive", label: "Autonomous Vehicles" },
    { id: "ai", label: "AI & ML" },
    { id: "mobile", label: "Mobile" },
    { id: "foundation", label: "Foundational" },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="projects-container">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">My Work</span>
          <h2 className="section-title gradient-text">Featured Projects</h2>
          <p className="section-description">
            Autonomous systems, AI research, and enterprise solutions
          </p>
        </motion.div>

        <motion.div
          className="projects-filters"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`filter-button ${
                filter === category.id ? "active" : ""
              }`}
              onClick={() => handleFilterClick(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card glass"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => handleProjectClick(project)}
              >
                <div className="project-image">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="project-img-element"
                  />
                  <div className="project-overlay">
                    <div className="project-icons">
                      {project.icons.map((icon, i) => (
                        <span key={i} className="tech-icon">
                          {icon}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tech">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="project-links">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        className="project-link"
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => handleExternalLinkClick(e, 'GitHub', project.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub />
                      </motion.a>
                    )}
                    {project.live && (
                      <motion.a
                        href={project.live}
                        className="project-link"
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => handleExternalLinkClick(e, 'Live Demo', project.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt />
                      </motion.a>
                    )}
                    {project.appStore && (
                      <motion.a
                        href={project.appStore}
                        className="project-link"
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => handleExternalLinkClick(e, 'App Store', project.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaAppStore />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-modal glass-strong"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedProject(null)}
              >
                ×
              </button>
              <div className="modal-image">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.imageAlt}
                  className="modal-img-element"
                />
              </div>
              <div className="modal-content">
                <h3>{selectedProject.title}</h3>
                <p>{selectedProject.description}</p>
                <div className="modal-tech">
                  {selectedProject.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="modal-actions">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      className="modal-button"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => handleExternalLinkClick(e, 'GitHub', selectedProject.title)}
                    >
                      <FaGithub /> View Code
                    </a>
                  )}
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      className="modal-button primary"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => handleExternalLinkClick(e, 'Live Demo', selectedProject.title)}
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                  {selectedProject.appStore && (
                    <a
                      href={selectedProject.appStore}
                      className="modal-button primary"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => handleExternalLinkClick(e, 'App Store', selectedProject.title)}
                    >
                      <FaAppStore /> App Store
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
