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
            My path into tech started with curiosity, not a perfect plan. I was
            interested in what was happening behind the screen and why things
            worked the way they did, so I started digging into programming,
            systems and the logic underneath them. The more I understood, the
            more I wanted to keep going.
          </p>

          <p>
            Learning C, Linux and computer fundamentals gave me my first real
            sense of progress. It taught me to slow down, read what the machine
            was telling me and work through problems instead of immediately
            looking for shortcuts. That patience became one of the most
            important parts of how I learn.
          </p>

          <p>
            Web development gave me a different kind of motivation. I could
            take an idea and turn it into something visible, interactive and
            real. Building websites made me care about both the technical side
            and the small details people actually experience, which pushed me
            to keep improving instead of settling for something that merely
            worked.
          </p>

          <p>
            I have learned that getting stuck is not a sign that I should stop.
            Most of the time, it is the point where I understand the most about
            myself and the problem in front of me. I like figuring things out
            independently, testing different approaches and staying with a
            challenge until it finally becomes clear.
          </p>

          <p>
            That mindset is what gradually pulled me toward cybersecurity. I
            still enjoy building software, but now I also want to understand
            what makes systems vulnerable, reliable and resilient. I want to
            keep growing into an engineer who can create useful things, question
            how they work and care deeply about making them stronger and safer.
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
