"use client";

import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Understand",
    text:
      "I start by figuring out what is actually happening before I try to fix anything.",
  },
  {
    number: "02",
    title: "Test",
    text:
      "I break the problem down, test assumptions, inspect what changes and narrow the cause.",
  },
  {
    number: "03",
    title: "Build",
    text:
      "I turn what I learned into something clear, reliable and easy to explain later.",
  },
];

export default function HowIWork() {
  return (
    <section className="work-section" id="work">
      <motion.div
        className="work-heading"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.65 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="section-kicker">How I work</p>
        <h2>Understand it. Break it. Build it better.</h2>
      </motion.div>

      <div className="work-clean-grid">
        {steps.map((step, index) => (
          <motion.article
            className="work-clean-item"
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.6,
              delay: index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="work-clean-number">{step.number}</div>

            <div className="work-clean-copy">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
