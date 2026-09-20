"use client";

import { motion } from "motion/react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const socials = [
  ["Instagram", "https://www.instagram.com/emmadev.bj"],
  ["GitHub", "https://github.com/emma-dasilva-dev"],
  ["Email", "mailto:emma.dasilva.dev@gmail.com"],
  ["LinkedIn", "https://www.linkedin.com/in/emmadasilvadev"],
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
        <p className="section-kicker">Contact</p>

        <div className="contact-message">
          <h2>Interested in working together?</h2>

          <InteractiveHoverButton href="mailto:emma.dasilva.dev@gmail.com?subject=Hello%20there!">\n            Drop me an email!\n          </InteractiveHoverButton>
        </div>
      </motion.div>

      <div className="contact-footer-grid">
        <div className="contact-location">
          <span>Cotonou, Benin</span>
        </div>

        <nav className="contact-socials" aria-label="Social links">
          {socials.map(([label, href]) => (
            <a
              key={label}
              href={href}
              target={label === "Email" ? undefined : "_blank"}
              rel={label === "Email" ? undefined : "noreferrer"}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="contact-credit">
          <span>Designed and developed by me</span>
          <span>©2026 – All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}
