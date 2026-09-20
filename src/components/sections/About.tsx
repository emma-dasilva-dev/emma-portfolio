"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function About() {
  const [expanded, setExpanded] = useState(false);

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
          I got into tech through curiosity. I wanted to understand how things
          worked, then I started building them myself. What began with C, Linux
          and web development gradually became a deeper interest in systems,
          security and the way technology behaves underneath the surface.
        </motion.p>

        <motion.button
          className="about-link"
          type="button"
          onClick={() => setExpanded((current) => !current)}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{
            duration: 0.65,
            delay: 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          aria-expanded={expanded}
        >
          <span>{expanded ? "Show less" : "Learn more about me"}</span>
          <motion.span
            aria-hidden="true"
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            ↗
          </motion.span>
        </motion.button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              className="about-expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
                opacity: { duration: 0.35, ease: "easeOut" },
              }}
            >
              <div className="about-expanded-inner">
                <p>
                  My path into technology did not start with a perfect plan. It
                  started with curiosity. I wanted to understand how computers
                  worked, how software was built, and what was happening
                  underneath the interfaces I used every day.
                </p>

                <p>
                  In 2025, I began learning programming more seriously through C,
                  Linux and computer fundamentals. I liked the part that required
                  patience: breaking a problem down, testing things, getting
                  stuck, and eventually understanding why something worked.
                </p>

                <p>
                  In 2026, I moved into more structured training and expanded
                  into web development with HTML, CSS and JavaScript while
                  continuing to strengthen my foundations. Building projects
                  made the learning feel real because I was no longer just
                  studying concepts. I had to make decisions, debug them and
                  finish what I started.
                </p>

                <p>
                  My internship experience pushed that further. I worked on real
                  product ideas, web interfaces and technical systems, and it
                  showed me how much there is beyond simply making something
                  function. Architecture, reliability, users and security all
                  matter.
                </p>

                <p>
                  That is also where my direction became clearer. I still enjoy
                  software engineering and building digital products, but I am
                  increasingly drawn to cybersecurity, systems, networking and
                  understanding how technology can fail, be protected and be
                  made more resilient.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
