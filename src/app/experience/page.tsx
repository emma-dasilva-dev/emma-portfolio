"use client";

import Link from "next/link";
import { motion } from "motion/react";
import SmoothScroll from "@/components/ui/SmoothScroll";

const chapters = [
  {
    date: "September 2025",
    title: "Starting on my own",
    paragraphs: [
      "My first real step into programming was self-directed. I was not following a perfectly organised roadmap; I was following questions. I started with C, Linux and computer fundamentals because I wanted to understand what a computer was actually doing instead of only learning how to use one.",
      "That period taught me more than syntax. I learned how to search for answers, read errors, test ideas, use the terminal and stay with a problem long enough to understand it. It also made me realise that I genuinely enjoyed the process of figuring things out for myself.",
    ],
  },
  {
    date: "February 2026",
    title: "CJEPE — Professional training",
    href: "https://cjepebenin.site/",
    paragraphs: [
      "Professional training gave structure to what I had been learning independently. I went deeper into C and expanded into web development with HTML, CSS and JavaScript. Having exercises, deadlines and a final project forced me to turn what I knew into things that actually worked.",
      "For my final evaluation, I worked on a beginner-focused programming project and presented it during my soutenance. I received 17/20. More importantly, it was one of the first times I had to explain not only what I had built, but why I had made certain decisions.",
    ],
  },
  {
    date: "July 2026",
    title: "Cashless Africa — Internship",
    href: "https://cashlesshq.com/",
    paragraphs: [
      "My internship at Cashless Africa was a shift from learning projects to work that had a real context. I built a hotel discovery and management application, worked on an event landing page and contributed to the architecture of a Smart Reminders system for a banking product.",
      "The work exposed me to more than interfaces. I had to think about APIs, backend structure, databases, user flows, authentication, notifications and the small decisions that affect whether a product feels reliable. It also made me more aware of security as part of software design rather than something that gets added at the end.",
      "That experience helped clarify the direction I want to keep developing in: building software while going deeper into systems and cybersecurity. I like understanding both sides, how something is created and how it can be made safer and more resilient.",
    ],
  },
];

export default function ExperiencePage() {
  return (
    <SmoothScroll>
      <main className="experience-page">
        <header className="about-page-header">
          <Link className="brand" href="/">
            EDS
          </Link>
          <Link className="about-page-back" href="/">
            Back home
          </Link>
        </header>

        <section className="experience-page-hero">
          <motion.p
            className="section-kicker"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            Experience
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            The longer version of how I learned by doing.
          </motion.h1>
        </section>

        <section className="experience-page-list">
          {chapters.map((chapter, index) => (
            <motion.article
              className="experience-chapter"
              key={chapter.date}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.75,
                delay: index * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="experience-chapter-meta">
                <span>{chapter.date}</span>
                <span>0{index + 1}</span>
              </div>

              <div className="experience-chapter-content">
                <h2>{chapter.title}</h2>
                {chapter.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {"href" in chapter && chapter.href ? (
                  <a
                    href={chapter.href}
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
        </section>
      </main>
    </SmoothScroll>
  );
}
