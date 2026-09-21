"use client";

import Image from "next/image";
import { motion } from "motion/react";

const projectUrl =
  "https://emma-dasilva-dev.github.io/bandit-redline-journal/";

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
        className="project-editorial"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <a
          className="project-preview"
          href={projectUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Open Bandit Redline Journal"
        >
          <Image
            src="/bandit-redline-preview.png"
            alt="Preview of the Bandit Redline Journal project"
            fill
            loading="eager"
            sizes="(max-width: 860px) 100vw, 60vw"
            className="project-preview-image"
          />
          <span className="project-preview-arrow" aria-hidden="true">
            ↗
          </span>
        </a>

        <div className="project-editorial-copy">
          <div className="project-editorial-meta">
            <span>Cybersecurity / Linux / SSH</span>
            <span>2026</span>
          </div>

          <h2>
            <a href={projectUrl} target="_blank" rel="noreferrer">
              Bandit Redline Journal
            </a>
          </h2>

          <p className="project-description">
            A cybersecurity journal documenting my progress through OverTheWire
            Bandit, including the commands, concepts and reasoning behind each
            challenge.
          </p>

          <div className="project-tags" aria-label="Technologies and concepts">
            <span>Linux</span>
            <span>SSH</span>
            <span>Bash</span>
            <span>Permissions</span>
            <span>OverTheWire</span>
          </div>

          <a
            className="project-text-link"
            href={projectUrl}
            target="_blank"
            rel="noreferrer"
          >
            View project <span aria-hidden="true">↗</span>
          </a>
        </div>
      </motion.article>
    </section>
  );
}
