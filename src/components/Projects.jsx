import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
} from "react-icons/fa";
import cavSysImg from "../images/CAVSys_example.png";
import voiceAssistantImg from "../images/voiceassistant.jpg";
import lrfrImg from "../images/lrfr.png";
import mapsImg from "../images/mapsapplication.jpg";
import claimImg from "../images/claim_management.webp";
import ssabImg from "../images/ssab_project.jpg";
import "./Projects.css";

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("all");

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
      icons: [<FaPython />, <FaDatabase />, <FaNodeJs />],
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
      icons: [<FaPython />, <FaReact />, <FaNodeJs />],
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
      icons: [<FaPython />, <FaDatabase />, <FaReact />],
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
      icons: [<FaReact />, <FaNodeJs />, <FaDatabase />],
      image: mapsImg,
      imageAlt: "Flutter Maps Application",
      github: "https://github.com/dszurek/flutterMapsApp",
      live: null,
    },
    {
      id: 5,
      title: "Insurance Claim Management System",
      category: "enterprise",
      description:
        "Designed and deployed a database-driven application using Microsoft Power Platform (Power Apps, Power Automate) to replace manual Excel workflows at Brasfield & Gorrie. Automated reporting pipelines, improving data visualization for leadership and reducing manual processing time significantly.",
      technologies: [
        "Power Apps",
        "Power Automate",
        "SQL",
        "Azure Databricks",
        "Power BI",
      ],
      icons: [<FaDatabase />, <FaNodeJs />, <FaPython />],
      image: claimImg,
      imageAlt: "Claim Management System",
      github: null,
      live: null,
    },
    {
      id: 6,
      title: "Enterprise Data Analytics Dashboard Portfolio",
      category: "enterprise",
      description:
        "Built comprehensive Power BI portfolio at SSAB consolidating financial project reporting, automating a multi-year backlog in under a month. Developed Tableau cost-comparison dashboards and Grafana real-time monitoring for mill metrics using live datasets with 10,000+ records. Presented insights to senior management and international colleagues.",
      technologies: [
        "Power BI",
        "Tableau",
        "Grafana",
        "SQL",
        "Azure Data Factory",
      ],
      icons: [<FaDatabase />, <FaPython />, <FaReact />],
      image: ssabImg,
      imageAlt: "Enterprise Analytics Dashboard",
      github: null,
      live: null,
    },
  ];

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "automotive", label: "Autonomous Vehicles" },
    { id: "ai", label: "AI & ML" },
    { id: "mobile", label: "Mobile" },
    { id: "enterprise", label: "Enterprise" },
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
              onClick={() => setFilter(category.id)}
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
                onClick={() => setSelectedProject(project)}
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
                        onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt />
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
                    >
                      <FaExternalLinkAlt /> Live Demo
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
