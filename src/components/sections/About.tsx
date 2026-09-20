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
            My path into tech started with curiosity, but what kept me going was
            the feeling of finally understanding something that had confused me
            before. Every problem I solved made me want to go further, not
            because it was easy, but because I liked proving to myself that I
            could figure it out.
          </p>

          <p>
            Learning C, Linux and web development taught me to be patient with
            difficult things. I learned to sit with errors, question my own
            assumptions and keep trying until the problem became clear. That
            process shaped the way I work more than any single language or
            framework ever could.
          </p>

          <p>
            Over time, that same mindset pulled me toward cybersecurity. I want
            to keep building, keep understanding systems more deeply and keep
            becoming the kind of engineer who does not stop at making something
            work, but asks how it can be safer, stronger and better.
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
