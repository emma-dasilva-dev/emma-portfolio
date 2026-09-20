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
            My path into tech started with curiosity more than a plan. I wanted
            to understand what was happening behind the screen, so I started
            learning C, Linux and the foundations of programming.
          </p>

          <p>
            That curiosity quickly turned into building websites, experimenting
            with different tools and spending far too long on problems just
            because I wanted to know why they were happening. The more I built,
            the more I realised I liked both creating things and understanding
            how they worked underneath.
          </p>

          <p>
            Over time, that naturally pulled me toward cybersecurity while
            keeping software development as a big part of how I learn and
            create. I want to understand both sides: how systems are built, and
            how they can be made safer and stronger.
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
