import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import AnimatedBackground from "./components/AnimatedBackground";
import ReactGA from 'react-ga4';
import "./App.css";

ReactGA.initialize('G-ZM8WYZKD3L');

function App() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app">
      <AnimatedBackground scrollY={scrollY} />
      <Navbar scrollY={scrollY} />
      <main>
        <Hero scrollY={scrollY} />
        <About />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
    </div>
  );
}

export default App;
