"use client";

import { motion } from "motion/react";

const experience = [
  ["Independent", "Self-taught developer", "2025 → 2026"],
  ["CJEPE", "Professional training", "2026"],
  ["Cashless Africa", "Software dev intern", "2026"],
  ["University", "Cybersecurity student", "2026 → Present"],
] as const;

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
};

export default function About() {
  return (
    <section className="about-section about-papale" id="about">
      <motion.div className="about-papale-intro" {...reveal}>
        <h2>A little about me</h2>
        <p>
          I&apos;m Emma, a developer based in Cotonou. I like understanding how
          things work beneath the interface, then using that understanding to
          build things that are clear, useful and intentional.
        </p>
      </motion.div>

      <motion.div className="about-papale-block" {...reveal}>
        <h3>What I do</h3>
        <div className="about-papale-copy">
          <p>
            I work across software development and cybersecurity. Web
            development gives me a way to turn ideas into real products, while
            C, Linux and systems work keep me close to the fundamentals behind
            them.
          </p>
          <p>
            I&apos;m curious by default. I like testing things, finding out why
            something failed and staying with a problem until I actually
            understand it. That curiosity is what keeps pulling me deeper into
            security, networks and the systems underneath the software I build.
          </p>
        </div>
      </motion.div>

      <motion.div className="about-papale-block about-papale-experience" {...reveal}>
        <h3>Experience</h3>

        <div className="about-papale-experience-list">
          {experience.map(([company, role, date]) => (
            <div className="about-papale-experience-row" key={company}>
              <div>
                <span className="about-papale-company">{company}</span>
                <span className="about-papale-role">{role}</span>
              </div>
              <span className="about-papale-date">{date}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
