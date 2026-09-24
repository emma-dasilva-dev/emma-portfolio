"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/components/ui/LanguageProvider";

const socials = [
  ["Instagram", "https://www.instagram.com/emmadev.bj"],
  ["GitHub", "https://github.com/emma-dasilva-dev"],
  ["Email", "mailto:emma.dasilva.dev@gmail.com"],
  ["LinkedIn", "https://www.linkedin.com/in/emmadasilvadev"],
] as const;

export default function Contact() {
  const { language } = useLanguage();
  const copy = language === "fr"
    ? {
        question: "Envie de travailler ensemble ?",
        email: "Envoyez-moi un e-mail !",
        social: "Liens sociaux",
        emailLabel: "E-mail",
        credit: "Conçu et développé par moi",
        rights: "©2026 – Tous droits réservés",
        subject: "Bonjour%20Emma",
      }
    : {
        question: "Interested in working together?",
        email: "Drop me an email!",
        social: "Social links",
        emailLabel: "Email",
        credit: "Designed and developed by me",
        rights: "©2026 – All Rights Reserved",
        subject: "Hello%20Emma",
      };

  return (
    <footer className="contact-section" id="contact">
      <motion.div
        className="contact-top"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="contact-message">
          <h2>{copy.question}</h2>

          <a
            className="contact-email-button"
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=emma.dasilva.dev@gmail.com&su=${copy.subject}`}
            target="_blank"
            rel="noreferrer"
          >
            <span>{copy.email}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </motion.div>

      <div className="contact-footer-grid">
        <div className="contact-location">
          <span>Cotonou, Benin</span>
        </div>

        <nav className="contact-socials" aria-label={copy.social}>
          {socials.map(([label, href]) => (
            <a
              key={label}
              href={href}
              target={label === "Email" ? undefined : "_blank"}
              rel={label === "Email" ? undefined : "noreferrer"}
            >
              {label === "Email" ? copy.emailLabel : label}
            </a>
          ))}
        </nav>

        <div className="contact-credit">
          <span>{copy.credit}</span>
          <span>{copy.rights}</span>
        </div>
      </div>
    </footer>
  );
}
