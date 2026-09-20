"use client";

import { motion } from "motion/react";

export default function Projects() {
  return (
    <section className="projects-section" id="projects">
      <motion.div
        className="projects-heading"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.65 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="section-kicker">Projects</p>
      </motion.div>

      <motion.article
        className="project-feature"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="project-main">
          <p className="project-type">Cybersecurity · Linux · SSH</p>

          <h2>Bandit Redline Journal</h2>

          <p className="project-description">
            A personal cybersecurity journal built around my progress through
            OverTheWire Bandit. I document what each level taught me, the
            commands and ideas I used, where I got stuck, and how I worked my
            way through the problem instead of only recording the final answer.
          </p>

          <p className="project-note">
            It is part learning log, part technical reference, and a record of
            how my understanding of Linux, permissions, SSH and problem-solving
            has grown over time.
          </p>

          <div className="project-actions">
            <a
              className="project-button project-button-primary"
              href="https://emma-dasilva-dev.github.io/bandit-redline-journal/"
              target="_blank"
              rel="noreferrer"
            >
              View project
            </a>
          </div>
        </div>

        <a
          className="project-arrow"
          href="https://emma-dasilva-dev.github.io/bandit-redline-journal/"
          target="_blank"
          rel="noreferrer"
          aria-label="Open Bandit Redline Journal"
        >
          ↗
        </a>
      </motion.article>
    </section>
  );
}
