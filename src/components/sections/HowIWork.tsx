"use client";

import { motion } from "motion/react";

const principles = [
  {
    number: "01",
    title: "Curious by default.",
    text:
      "I like understanding why something works, not just learning the steps needed to make it work once.",
  },
  {
    number: "02",
    title: "Independent, not isolated.",
    text:
      "I try to investigate problems for myself first, test ideas and build context before I ask for help.",
  },
  {
    number: "03",
    title: "Persistent with the details.",
    text:
      "I do not enjoy leaving things half-understood. If something feels wrong, I keep working until I know what caused it and how to improve it.",
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
        <p className="section-kicker">05 · How I work</p>
        <h2>The way I approach problems matters as much as the tools I use.</h2>
      </motion.div>

      <div className="work-list">
        {principles.map((principle, index) => (
          <motion.article
            className="work-item"
            key={principle.number}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.65,
              delay: index * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span>{principle.number}</span>
            <div>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
