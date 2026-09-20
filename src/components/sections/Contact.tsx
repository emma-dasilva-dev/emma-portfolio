"use client";

import { motion } from "motion/react";

const links = [
  ["Email", "mailto:emma.dasilva.dev@gmail.com"],
  ["GitHub", "https://github.com/emma-dasilva-dev"],
  ["LinkedIn", "https://www.linkedin.com/in/emmadasilvadev"],
  ["Instagram", "https://www.instagram.com/emmadev.bj"],
] as const;

export default function Contact() {
  return (
    <footer className="contact-section" id="contact">
      <motion.div
        className="contact-top"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="section-kicker">06 · Contact</p>
        <div className="contact-message">
          <h2>Let&apos;s build something worth remembering.</h2>
        </div>
      </motion.div>

      <div className="contact-links">
        {links.map(([label, href]) => (
          <a
            key={label}
            href={href}
            target={label === "Email" ? undefined : "_blank"}
            rel={label === "Email" ? undefined : "noreferrer"}
          >
            <span>{label}</span>
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>

      <div className="contact-footer">
        <span>Emma Da Silva</span>
        <span>Cotonou, Benin</span>
        <span>© 2026</span>
      </div>
    </footer>
  );
}
