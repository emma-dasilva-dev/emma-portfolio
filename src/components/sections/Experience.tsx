"use client";

import { motion } from "motion/react";

const experiences = [
  {
    date: "September 2025",
    title: "Self-learning",
    body:
      "I began learning programming for myself, starting with C, Linux and the foundations of how computers and software actually work.",
  },
  {
    date: "February 2026",
    title: "Professional training",
    body:
      "I started professional training, went deeper into C and learned the fundamentals of web development through HTML, CSS and JavaScript. My final project earned 17/20.",
  },
  {
    date: "July 2026",
    title: "Cashless Africa — Internship",
    body:
      "During my internship at Cashless Africa, I worked on a hotel-management web application, an event landing page and the architecture for a Smart Reminders system.",
  },
];

export default function Experience() {
  return (
    <section className="experience-section" id="experience">
      <motion.div
        className="experience-heading"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.65 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="section-kicker">02 · Experience</p>
        <h2>My experience so far.</h2>
      </motion.div>

      <div className="experience-list">
        {experiences.map((item, index) => (
          <motion.article
            className="experience-item"
            key={item.date}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.75,
              delay: index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <p className="experience-date">{item.date}</p>
            <div className="experience-copy">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
