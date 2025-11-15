import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaGraduationCap,
  FaAward,
  FaCertificate,
  FaBook,
} from "react-icons/fa";
import uaLogo from "../images/ua_logo.png";
import "./Education.css";

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const education = [
    {
      id: 1,
      degree: "Master of Science in Computer Science",
      institution: "The University of Alabama",
      location: "Tuscaloosa, AL",
      period: "Expected December 2026",
      gpa: "3.88/4.0",
      description:
        "Accelerated Master's Program focused on Artificial Intelligence, Machine Learning, and Autonomous Systems. Conducting research on genetic algorithms, model predictive control (MPC), reinforcement learning, and Gaussian Processes for vehicle efficiency optimization. Expected to publish 3 research papers by graduation.",
      achievements: [
        "Honors College member",
        "Active AI and autonomous vehicle research",
        "Expected 3 research paper publications by May 2026",
        "Maintaining 3.88 GPA while leading 15-student team",
      ],
      icon: <img src={uaLogo} alt="UA Logo" className="degree-logo" />,
    },
    {
      id: 2,
      degree: "Bachelor of Science in Computer Science",
      institution: "The University of Alabama",
      location: "Tuscaloosa, AL",
      period: "2022 - 2026",
      gpa: "3.88/4.0",
      description:
        "Mathematics Minor. Comprehensive foundation in software development, algorithms, data structures, artificial intelligence, and system design. Active member of EcoCAR team throughout undergraduate career, progressing from UI developer to team lead.",
      achievements: [
        "Honors College member",
        "Upsilon Pi Epsilon Computer Science Honor Society",
        "Presidential Scholarship recipient",
        "SEMA Memorial Scholarship recipient",
        "Dean's List all semesters",
      ],
      icon: <img src={uaLogo} alt="UA Logo" className="degree-logo" />,
    },
  ];

  const courses = [
    "Artificial Intelligence",
    "Introduction to Robotics",
    "Computer Vision",
    "Programming Languages",
    "Physics Guided Machine Learning",
    "Data Structures & Algorithms",
    "Model Predictive Control",
    "Reinforcement Learning",
    "Sensor Fusion",
    "Advanced Mathematics",
  ];

  return (
    <section id="education" className="education" ref={ref}>
      <div className="education-container">
        <motion.div
          className="education-header"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Academic Background</span>
          <h2 className="section-title gradient-text">Education</h2>
          <p className="section-description">
            My academic journey and continuous learning path
          </p>
        </motion.div>

        <div className="education-content">
          {/* Degrees Section */}
          <motion.div
            className="education-degrees"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                className="degree-card glass"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={
                  inView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
                }
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="degree-icon">{edu.icon}</div>

                <div className="degree-content">
                  <h3 className="degree-title">{edu.degree}</h3>
                  <h4 className="degree-institution">{edu.institution}</h4>

                  <div className="degree-meta">
                    <span className="degree-location">{edu.location}</span>
                    <span className="degree-period">{edu.period}</span>
                    <span className="degree-gpa">GPA: {edu.gpa}</span>
                  </div>

                  <p className="degree-description">{edu.description}</p>

                  <div className="degree-achievements">
                    <h5>
                      <FaAward /> Achievements
                    </h5>
                    <ul>
                      {edu.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Certifications & Courses Grid */}
          <div className="education-extra">
            {/* Certifications */}

            {/* Courses */}
            <motion.div
              className="courses-section glass"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="subsection-title">
                <FaBook /> Key Coursework & Technical Areas
              </h3>
              <div className="courses-grid">
                {courses.map((course, index) => (
                  <motion.div
                    key={index}
                    className="course-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      inView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {course}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
