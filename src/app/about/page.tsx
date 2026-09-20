"use client";

import Link from "next/link";
import { motion } from "motion/react";
import SmoothScroll from "@/components/ui/SmoothScroll";

export default function AboutPage() {
  return (
    <SmoothScroll>
      <main className="about-page">
        <header className="about-page-header">
          <Link className="brand" href="/">
            EDS
          </Link>
          <Link className="about-page-back" href="/">
            Back home
          </Link>
        </header>

        <section className="about-page-hero">
          <motion.p
            className="section-kicker"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            About me
          </motion.p>

          <motion.h1
            initial={{ y: 60 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Curiosity came first.
          </motion.h1>
        </section>

        <section className="about-page-story">
          <motion.div
            className="about-page-copy"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.16,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <p>
              My path into technology did not start with a perfect plan. It
              started with curiosity. I wanted to understand how computers
              worked, how software was built and what was happening underneath
              the interfaces I used every day.
            </p>

            <p>
              In 2025, I began learning programming more seriously through C,
              Linux and computer fundamentals. I liked the part that required
              patience: breaking a problem down, testing things, getting stuck
              and eventually understanding why something worked.
            </p>

            <p>
              In 2026, I moved into more structured training and expanded into
              web development with HTML, CSS and JavaScript while continuing to
              strengthen my foundations. Building projects made the learning
              feel real, because I was no longer just studying concepts. I had
              to make decisions, debug them and finish what I started.
            </p>

            <p>
              My internship experience pushed that further. I worked on real
              product ideas, web interfaces and technical systems, and it showed
              me how much there is beyond simply making something function.
              Architecture, reliability, users and security all matter.
            </p>

            <p>
              That is also where my direction became clearer. I still enjoy
              software engineering and building digital products, but I am
              increasingly drawn to cybersecurity, systems, networking and
              understanding how technology can fail, be protected and be made
              more resilient.
            </p>

            <p>
              I am still early in that journey, which is exactly why I keep
              learning. I care more about understanding things properly than
              collecting technologies for a list, and I want the work I build
              to reflect that.
            </p>
          </motion.div>
        </section>
      </main>
    </SmoothScroll>
  );
}
