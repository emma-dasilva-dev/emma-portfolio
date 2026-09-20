"use client";

import Link from "next/link";
import { motion } from "motion/react";
import SmoothScroll from "@/components/ui/SmoothScroll";

const paragraphs = [
  "I did not grow up with a fixed plan to work in technology. It started much more simply: I was curious. I liked understanding how things worked, why they behaved the way they did, and what happened when I tried to change them.",
  "That curiosity became more serious in 2025, when I started learning programming and working with C, Linux and the basic ideas behind computers and software. At first, I was mostly learning how to think through problems. The more I learned, the more I wanted to understand.",
  "In 2026, I moved into more structured training and expanded into web development. I learned HTML, CSS and JavaScript, and began turning ideas into actual projects. That shift mattered because programming stopped feeling like something abstract. It became something I could build with, break, improve and make my own.",
  "Projects and professional experience helped me understand that good software is not only about getting something to work. It is also about how it is designed, how people use it, how reliable it is and what happens when something goes wrong.",
  "Over time, that naturally pulled me toward cybersecurity. I became more interested in systems, networking, Linux security and the questions that sit behind every application: how it works, how it can fail, and how it can be protected.",
  "I still enjoy building software, and I do not see development and cybersecurity as separate worlds. For me, they reinforce each other. I want to keep becoming better at both: understanding how systems are created, and understanding how to make them safer, stronger and more thoughtful.",
  "I am still early in that journey, and I like that. There is still a lot to learn, a lot to build and a lot to figure out."
];

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

        <section className="about-page-story">
          <div className="about-page-copy">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={paragraph}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.72,
                  delay: index * 0.035,
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
