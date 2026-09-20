"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const nameY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 42]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  return (
    <section className="hero" ref={heroRef} id="home">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Emma Da Silva home">
          EDS
        </a>

        <nav className="nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <motion.div className="hero-main" style={{ opacity }}>
        <motion.div className="hero-name-wrap" style={{ y: nameY }}>
          <p className="eyebrow">Portfolio · Cotonou, Benin</p>
          <h1 className="hero-name">
            <span>Emma</span>
            <span>Da Silva</span>
          </h1>
        </motion.div>

        <motion.div className="hero-copy" style={{ y: copyY }}>
          <p>
            Junior full-stack software engineer building clean digital
            experiences, with a growing focus on cybersecurity.
          </p>
        </motion.div>
      </motion.div>

      <a className="scroll-mark" href="#about" aria-label="Scroll to about">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <defs>
            <path
              id="scroll-circle"
              d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
            />
          </defs>
          <text>
            <textPath href="#scroll-circle">
              SCROLL · DISCOVER · SCROLL · DISCOVER ·
            </textPath>
          </text>
        </svg>
        <span>↓</span>
      </a>

      <div className="hero-bottom-line" />
    </section>
  );
}
