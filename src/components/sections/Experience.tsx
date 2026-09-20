"use client";

import { motion } from "motion/react";

const experiences = [
  {
    role: "Self-taught Developer",
    company: "Independent",
    date: "Sep 2025 - Present",
  },
  {
    role: "Professional Training",
    company: "CJEPE",
    date: "Feb 2026",
    href: "https://cjepebenin.site/",
  },
  {
    role: "Software Development Intern",
    company: "Cashless Africa",
    date: "Jul 2026 - Sep 2026",
    href: "https://cashless.africa/",
  },
];

export default function Experience() {
  return (
    <section className="experience-section" id="experience">
      <motion.div
        className="experience-heading experience-heading-simple"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.65 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2>Experience</h2>
      </motion.div>

      <div className="experience-list experience-list-simple">
        {experiences.map((item, index) => (
          <motion.article
            className="experience-item experience-item-simple"
            key={item.role + item.company}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.65,
              delay: index * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="experience-role-line">
              <span className="experience-role">{item.role}</span>
              {"href" in item && item.href ? (
                <a
                  className="experience-company"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.company}
                </a>
              ) : (
                <span className="experience-company">{item.company}</span>
              )}
            </div>

            <p className="experience-date">{item.date}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
