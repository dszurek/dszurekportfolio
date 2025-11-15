import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaBriefcase, FaCalendar, FaMapMarkerAlt } from "react-icons/fa";
import ecocarLogo from "../images/ecocar_logo.png";
import ssabLogo from "../images/ssab_logo.png";
import bgLogo from "../images/bg_logo.png";
import "./Experience.css";

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      id: 1,
      company: "EcoCAR EV Challenge - The University of Alabama",
      position: "Connected and Automated Vehicle (CAV) Lead",
      location: "Tuscaloosa, AL",
      period: "August 2025 - Present",
      description:
        "Spearheading a team of 15+ undergraduates in the final year of the EcoCAR EV Challenge. Leading development of advanced vehicle technologies including lane-keep assist, driver monitoring, adaptive cruise control, and V2X connectivity. Contributing to research on genetic algorithms, model predictive control (MPC), and reinforcement learning for autonomous systems.",
      achievements: [
        "Leading 15+ student team developing full-stack ADAS for Cadillac Lyriq",
        "Researching hybrid DRL/MPC controllers and Gaussian Processes for optimization",
        "Expected to publish 3 research papers by May 2026",
      ],
      technologies: [
        "Python",
        "MATLAB",
        "Simulink",
        "RTMaps",
        "Sensor Fusion",
        "MPC",
        "Reinforcement Learning",
      ],
      logo: ecocarLogo,
      progression: [
        {
          title: "CAV Lead",
          period: "Aug 2025 - Present",
          note: "Leading overall CAV system architecture, team coordination, and AI research efforts",
        },
        {
          title: "Voice Assistant Project Lead",
          period: "Sep 2024 - Aug 2025",
          note: "Led 5-student team developing LLM-based voice assistant on NXP NavQ+ companion computer",
        },
        {
          title: "User Experience Project Member",
          period: "Aug 2022 - Sep 2024",
          note: "Developed Android infotainment UI with Flutter, built maps/navigation software with GPS and routing",
        },
      ],
    },
    {
      id: 2,
      company: "SSAB Special Steels",
      position: "Data Science Co-Op",
      location: "Mobile, AL",
      period: "May 2025 - August 2025",
      description:
        "Designed and implemented a project portfolio dashboard in Power BI, automating quarterly financial reporting. Built cost-comparison solutions in Tableau and SQL, simplified workflows for datasets exceeding 1,000 rows. Built dashboards tracking metrics and production capacity using large, live datasets to define optimal targets for leadership. Led presentations for senior managers and hosted international meetings with colleagues in Sweden and Finland.",
      achievements: [
        "Automated multi-year backlog project in under one month with Power BI portfolio",
        "Developed Tableau dashboards processing 1,000+ row datasets for cost optimization",
        "Built Grafana real-time dashboards with 10,000+ historical records for production targeting",
        "Led international business meetings across Sweden, Finland, and USA",
      ],
      technologies: [
        "Power BI",
        "Tableau",
        "Grafana",
        "SQL",
        "Azure Data Factory",
        "Tableau Prep",
      ],
      logo: ssabLogo,
    },
    {
      id: 3,
      company: "Brasfield & Gorrie, L.L.C.",
      position: "Process Development Intern",
      location: "Birmingham, AL",
      period: "May 2024 - August 2024; December 2024 - January 2025",
      description:
        "Developed and deployed an insurance claim management database and application, replacing manual Excel workflows. Automated reporting pipelines, reducing manual report generation time and improving data visualization for leadership. Designed a Trello API-integrated ticketing system for internal IT support. Built an audit and reporting tool for an internal contractor watchlist, enhancing compliance tracking.",
      achievements: [
        "Replaced manual Excel workflows with Power Apps database application",
        "Automated reporting pipelines with Azure Databricks and Power BI",
        "Integrated Trello API for IT support ticketing system",
        "Enhanced compliance tracking with contractor watchlist audit tool",
      ],
      technologies: [
        "SQL",
        "Power BI",
        "Azure Databricks",
        "Power Apps",
        "Power Automate",
        "Microsoft Azure",
      ],
      logo: bgLogo,
      progression: [
        {
          title: "Process Development Intern (Winter Return)",
          period: "Dec 2024 - Jan 2025",
          note: "Returned to continue project development and implement new automation ideas",
        },
        {
          title: "Process Development Intern",
          period: "May 2024 - Aug 2024",
          note: "Initial internship developing database applications and automation solutions",
        },
      ],
    },
  ];

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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="experience" className="experience" ref={ref}>
      <div className="experience-container">
        <motion.div
          className="experience-header"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Career Journey</span>
          <h2 className="section-title gradient-text">Work Experience</h2>
          <p className="section-description">
            My professional journey and key accomplishments
          </p>
        </motion.div>

        <motion.div
          className="experience-timeline"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="experience-item"
              variants={itemVariants}
            >
              <div className="experience-marker">
                <div className="marker-dot"></div>
                <div className="marker-line"></div>
              </div>

              <motion.div
                className="experience-card glass"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="experience-header-info">
                  <div className="company-badge">
                    {exp.logo ? (
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="company-logo"
                      />
                    ) : (
                      <FaBriefcase />
                    )}
                  </div>
                  <div className="experience-title-section">
                    <h3 className="experience-position">{exp.position}</h3>
                    <h4 className="experience-company">{exp.company}</h4>
                  </div>
                </div>

                <div className="experience-meta">
                  <span className="meta-item">
                    <FaCalendar />
                    {exp.period}
                  </span>
                  <span className="meta-item">
                    <FaMapMarkerAlt />
                    {exp.location}
                  </span>
                </div>

                <p className="experience-description">{exp.description}</p>

                <div className="experience-achievements">
                  <h5>Key Achievements:</h5>
                  <ul>
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={
                          inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                        }
                        transition={{ delay: 0.5 + index * 0.2 + i * 0.1 }}
                      >
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                {exp.progression && (
                  <div className="experience-progression">
                    <h5>Position Progression</h5>
                    <div className="progression-list">
                      {exp.progression.map((p, idx) => (
                        <div className="progress-item glass-light" key={idx}>
                          <div className="progress-role">{p.title}</div>
                          <div className="progress-meta">
                            {p.period} • {p.note}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="experience-tech">
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
