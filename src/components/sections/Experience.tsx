"use client";

import Link from "next/link";
import { motion } from "motion/react";

const experiences = [
  {
    date: "September 2025",
    title: "Self-learning",
    body:
      "This was where things really started for me. I began learning programming on my own through C, Linux and computer fundamentals, mostly because I wanted to understand what was happening behind the screen. It taught me how to search, experiment, get stuck and keep going until something finally made sense.",
  },
  {
    date: "February 2026",
    title: "CJEPE — Professional training",
    href: "https://cjepebenin.site/",
    body:
      "I moved into a more structured learning environment and expanded beyond C into HTML, CSS and JavaScript. I worked on practical exercises and finished with a project built around helping beginners learn programming, which I presented during my final evaluation and received 17/20.",
  },
  {
    date: "July 2026",
    title: "Cashless Africa — Internship",
    href: "https://cashlesshq.com/",
    body:
      "My internship was the point where I had to think beyond exercises and work with real product ideas. I built a hotel-management web application, worked on an event landing page and contributed to the architecture of a Smart Reminders system, which exposed me to product thinking, backend structure, user flows and reliability.",
  },
];

export default function Experience() {
  return (
    <section className="experience-section" id="experience">
      <motion.div
        className="experience-heading"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.65 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="section-kicker">02 · Experience</p>
        <div className="experience-intro">
          <h2>My experience so far.</h2>
          <p>
            A short look at how I moved from learning independently to working
            on real projects, with each stage changing the way I think about
            building software.
          </p>
        </div>
      </motion.div>

      <div className="experience-list">
        {experiences.map((item, index) => (
          <motion.article
            className="experience-item"
            key={item.date}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.75,
              delay: index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <p className="experience-date">{item.date}</p>
            <div className="experience-copy">
              <h3>{item.title}</h3>
              <p>{item.body}</p>

              {"href" in item && item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="experience-button"
                >
                  Visit website
                </a>
              ) : null}
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div
        className="experience-more"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link href="/experience" className="experience-read-more">
          Read more about this
        </Link>
      </motion.div>
    </section>
  );
}
