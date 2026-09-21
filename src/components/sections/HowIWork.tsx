"use client";

import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Understand",
    text:
      "I start by figuring out what is actually happening before I try to fix anything.",
    symbol: "?",
  },
  {
    number: "02",
    title: "Test",
    text:
      "I break the problem down, test assumptions, inspect what changes and narrow the cause.",
    symbol: ">_",
  },
  {
    number: "03",
    title: "Build",
    text:
      "I turn what I learned into something clear, reliable and easy to explain later.",
    symbol: "{}",
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

      <motion.div
        className="work-display-cards"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        {steps.map((step, index) => (
          <motion.article
            className={`work-display-card work-display-card-${index + 1}`}
            key={step.number}
            whileHover={{ y: -10, x: index === 0 ? -6 : index === 2 ? 6 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <div className="work-display-card-top">
              <span>[{step.number}]</span>
              <span className="work-display-card-symbol" aria-hidden="true">
                {step.symbol}
              </span>
            </div>

            <div className="work-display-card-copy">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>

            <div className="work-display-card-foot">
              <span>PROCESS / 0{index + 1}</span>
              <span aria-hidden="true">↗</span>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
