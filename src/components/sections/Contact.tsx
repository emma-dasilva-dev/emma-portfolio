"use client";

import { motion } from "motion/react";

const links = [
  {
    label: "Email",
    href: "mailto:emma.dasilva.dev@gmail.com",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/gmail.svg",
  },
  {
    label: "GitHub",
    href: "https://github.com/emma-dasilva-dev",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/github.svg",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/emmadasilvadev",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/linkedin.svg",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/emmadev.bj",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/instagram.svg",
  },
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

      <div className="contact-links" aria-label="Social links">
        {links.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target={label === "Email" ? undefined : "_blank"}
            rel={label === "Email" ? undefined : "noreferrer"}
            aria-label={label}
            title={label}
          >
            <img src={icon} alt="" aria-hidden="true" />
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
