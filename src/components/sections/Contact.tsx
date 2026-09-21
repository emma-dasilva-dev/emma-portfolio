"use client";

import { motion } from "motion/react";

const socials = [
  ["Instagram", "https://www.instagram.com/emmadev.bj"],
  ["GitHub", "https://github.com/emma-dasilva-dev"],
  ["LinkedIn", "https://www.linkedin.com/in/emmadasilvadev"],
] as const;

const email =
  "https://mail.google.com/mail/?view=cm&fs=1&to=emma.dasilva.dev@gmail.com&su=Hello%20Emma";

export default function Contact() {
  return (
    <footer className="contact-section" id="contact">
      <motion.div
        className="contact-editorial"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="section-kicker">Contact</p>

        <div className="contact-editorial-main">
          <h2>LET&apos;S BUILD SOMETHING WORTH REMEMBERING.</h2>
          <p className="contact-editorial-subtitle">
            Available for collaborations, freelance work and interesting ideas.
          </p>

          <a
            className="contact-email-link"
            href={email}
            target="_blank"
            rel="noreferrer"
          >
            <span>emma.dasilva.dev@gmail.com</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </motion.div>

      <div className="contact-editorial-bottom">
        <nav className="contact-editorial-socials" aria-label="Social links">
          {socials.map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer">
              {label}
            </a>
          ))}
        </nav>

        <div className="contact-editorial-meta">
          <span>Cotonou, Benin</span>
          <span>©2026 Emma Da Silva</span>
        </div>
      </div>
    </footer>
  );
}
