"use client";

import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Understand",
    text:
      "I start by figuring out what the problem actually is, what is failing, and what I need to learn before touching the solution.",
  },
  {
    number: "02",
    title: "Test",
    text:
      "I try things, inspect what breaks, compare results, and keep narrowing the problem down instead of guessing.",
  },
  {
    number: "03",
    title: "Build",
    text:
      "Once I understand the cause, I focus on making the solution clear, reliable, and something I can explain later.",
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

      <div className="work-process">
        {steps.map((step, index) => (
          <motion.article
            className="work-process-item"
            key={step.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.65,
              delay: index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="work-process-number">[{step.number}]</div>

            <div className="work-process-copy">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>

            <span className="work-process-symbol" aria-hidden="true">
              &gt;_
            </span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
