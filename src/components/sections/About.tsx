"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function About() {
  return (
    <section className="about-section" id="about">
      <motion.p
        className="section-kicker"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        01 · About
      </motion.p>

      <div className="about-content">
        <motion.p
          className="about-story"
          initial={{ opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          I got into tech because I kept wanting to know what was happening
          underneath everything. One question turned into another, then into
          code, Linux, broken things, fixed things, and the kind of curiosity
          that does not really switch off. I like building, but I also like
          understanding why something works, where it can fail, and how to make
          it better.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{
            duration: 0.65,
            delay: 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Link className="about-link" href="/about">
            <span>Learn more about me</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
