"use client";

import { motion } from "motion/react";

const projectUrl =
  "https://emma-dasilva-dev.github.io/bandit-redline-journal/";

const banditLogo = [
  " _                     _ _ _",
  "| |__   __ _ _ __   __| (_) |_",
  "| '_ \\ / _` | '_ \\ / _` | | __|",
  "| |_) | (_| | | | | (_| | | |_",
  "|_.__/ \\__,_|_| |_|\\__,_|_|\\__|",
].join("\n");

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
        className="project-bandit"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <a
          className="project-bandit-terminal"
          href={projectUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Open Bandit Redline Journal"
        >
          <div className="project-bandit-topbar">
            <span className="project-bandit-tab">Command Prompt - ssh bandit</span>
            <span className="project-bandit-window-icons" aria-hidden="true">
              <span>−</span>
              <span>□</span>
              <span>×</span>
            </span>
          </div>

          <div className="project-bandit-screen">
            <p className="project-bandit-line">
              C:\\Users\\emma&gt;ssh bandit0@bandit.labs.overthewire.org -p2220
            </p>

            <pre className="project-bandit-ascii" aria-hidden="true">
              {banditLogo}
            </pre>

            <p className="project-bandit-center">
              This is an OverTheWire game server.
            </p>

            <p className="project-bandit-center project-bandit-muted">
              More information on overthewire.org/wargames
            </p>

            <p className="project-bandit-line project-bandit-password">
              bandit0@bandit.labs.overthewire.org&apos;s password:
              <span className="project-bandit-caret" aria-hidden="true" />
            </p>
          </div>
        </a>

        <div className="project-bandit-copy">
          <div className="project-bandit-meta">
            <span>Cybersecurity / Linux / SSH</span>
            <span>2026</span>
          </div>

          <h2>
            <a href={projectUrl} target="_blank" rel="noreferrer">
              Bandit Redline Journal
            </a>
          </h2>

          <p className="project-bandit-description">
            A cybersecurity journal documenting my progress through OverTheWire
            Bandit, including the commands, concepts and reasoning behind each
            challenge.
          </p>

          <div className="project-bandit-tags" aria-label="Technologies and concepts">
            <span>Linux</span>
            <span>SSH</span>
            <span>Bash</span>
            <span>Permissions</span>
            <span>OverTheWire</span>
          </div>

          <a
            className="project-bandit-link"
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
