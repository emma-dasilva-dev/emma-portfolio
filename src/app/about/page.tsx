"use client";

import Link from "next/link";
import { motion } from "motion/react";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

const paragraphs = [
  "I did not grow up with a perfectly mapped-out plan to work in technology. It started with curiosity, the annoying kind that makes you want to know what is happening behind the screen instead of just accepting that it works.",
  "In 2025, I started learning programming more seriously through C, Linux and computer fundamentals. I liked the logic of it, but I also liked the messier part: getting stuck, testing something, breaking it, checking one more thing, and eventually understanding what I had missed.",
  "By 2026, I had moved into more structured training and started learning web development with HTML, CSS and JavaScript. That was when coding began to feel less like a subject and more like a way to turn ideas into something real. I could build something, look at it, dislike half of it, fix it, and make it mine.",
  "Projects taught me a lot about how I work. I am naturally independent, I like figuring things out for myself, and I tend to keep going until the problem makes sense. I am not interested in collecting technologies just to make a list longer. I would rather understand the tools I use and know why I am using them.",
  "My internship experience pushed that mindset further. Working on real product ideas, interfaces and technical systems made me realise that software is much bigger than writing code that runs. There are users, architecture decisions, reliability, edge cases, security, and all the small details that decide whether something is actually good.",
  "That is also where cybersecurity started making more and more sense to me. I became interested in systems, networking, Linux security and the questions that sit behind every application: what is exposed, what can go wrong, and what would make it stronger.",
  "I still love software development, so I do not see myself choosing one world and abandoning the other. I want to understand how things are built and how they are protected. That combination feels much more like me.",
  "I am still early in the journey, and I am fine with that. There is a lot I do not know yet. That just means there is more to learn, more to build, and probably more things for me to accidentally break before I understand them properly."
];

const visualRows = [
  ["C", "LINUX", "WEB", "BUILD"],
  ["SECURITY", "SSH", "SYSTEMS", "BREAK / FIX"],
] as const;

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
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            A short version of how I got here.
          </motion.h1>
        </section>

        <motion.section
          className="about-motion-gallery"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Moving visual timeline"
        >
          <InfiniteSlider className="about-visual-slider" gap={22} speed={46} speedOnHover={18}>
            {visualRows[0].map((label, index) => (
              <div className={`about-visual-card about-visual-card-${index + 1}`} key={label}>
                <span>{label}</span>
              </div>
            ))}
          </InfiniteSlider>

          <InfiniteSlider
            className="about-visual-slider"
            gap={22}
            speed={42}
            speedOnHover={16}
            reverse
          >
            {visualRows[1].map((label, index) => (
              <div className={`about-visual-card about-visual-card-${index + 5}`} key={label}>
                <span>{label}</span>
              </div>
            ))}
          </InfiniteSlider>
        </motion.section>

        <section className="about-page-story">
          <div className="about-page-copy">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={paragraph}
                initial={{ opacity: 0, x: index % 2 === 0 ? 26 : -26, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.72,
                  delay: index * 0.025,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </section>
      </main>
    </SmoothScroll>
  );
}
