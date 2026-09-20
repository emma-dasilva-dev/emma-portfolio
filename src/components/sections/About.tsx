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
        <motion.div
          className="about-story"
          initial={{ opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p>
            My path into tech started with curiosity. I wanted to understand
            what was happening behind the screen instead of only using what was
            in front of me.
          </p>

          <p>
            Learning C, Linux and programming fundamentals gave me that first
            feeling of turning confusion into understanding. That feeling made
            me want to keep going.
          </p>

          <p>
            Web development gave me a different kind of satisfaction: taking an
            idea, building it, breaking it, rebuilding it and slowly making it
            feel like something that was actually mine.
          </p>

          <p>
            The harder problems taught me patience. I learned that getting stuck
            is not the end of the process. Most of the time, it is the part
            where the real learning starts.
          </p>

          <p>
            That mindset is what pulled me toward cybersecurity. I want to keep
            building, keep understanding systems more deeply, and become the
            kind of engineer who cares not only that something works, but that
            it is strong, safe and thoughtfully made.
          </p>
        </motion.div>

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
            <span>Read more</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
