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
            I got into tech because I was curious about what was happening
            behind the screen. I did not have a perfect plan, I just kept
            following the questions that interested me and learning a little
            more every time.
          </p>

          <p>
            C, Linux and computer fundamentals gave me my first real sense of
            progress. They taught me to slow down, read errors properly and
            work through a problem instead of giving up the moment it became
            frustrating.
          </p>

          <p>
            Web development made everything feel more real. I could take an
            idea, build it, break parts of it, improve it and eventually end up
            with something I was genuinely proud to call mine.
          </p>

          <p>
            I have learned that being stuck is usually part of the process.
            I like trying things for myself, questioning what went wrong and
            staying with a problem until I understand it instead of only
            finding a quick fix.
          </p>

          <p>
            That same curiosity is what pulled me toward cybersecurity. I still
            love building software, but I also want to understand how systems
            can fail, how they can be protected and how I can keep becoming a
            stronger engineer on both sides.
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
