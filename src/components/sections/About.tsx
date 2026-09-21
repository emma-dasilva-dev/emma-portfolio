"use client";

import { motion } from "motion/react";

const expertises = [
  "Software Development",
  "Cybersecurity",
  "Web Development",
  "Linux",
  "Networking",
  "C",
  "JavaScript / TypeScript",
] as const;

export default function About() {
  return (
    <section className="about-section about-emanuele" id="about">
      <motion.div
        className="about-emanuele-main"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2>
          Software developer &amp; cybersecurity student based in Cotonou
        </h2>

        <div className="about-emanuele-copy">
          <p>
            I&apos;m a curious developer interested in how software works both
            on the surface and underneath it. I build for the web, work with C
            and Linux, and keep pushing deeper into systems, networks and
            security.
          </p>

          <p>
            I like turning ideas into things people can actually use, then
            understanding what makes them reliable, secure and worth improving.
            That mix of building and questioning is what keeps me learning.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="about-emanuele-expertises"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="about-emanuele-label">Expertises</p>

        <div className="about-emanuele-list">
          {expertises.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
