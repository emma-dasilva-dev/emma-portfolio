"use client";

import { motion } from "motion/react";

const story = [
  "I am a developer driven by curiosity, the kind that makes me want to know what is happening behind the screen instead of just accepting that it works.",
  "I started by learning C, Linux and computer fundamentals. They taught me how to slow down, read errors properly and stay with a problem long enough to understand it.",
  "Then web development gave me a way to turn ideas into something real. I like building things, breaking them, improving them and watching an idea slowly become something people can actually use.",
  "I do not mind getting stuck. Most of the time, that is where I learn the most. I test things, question what went wrong and keep digging until the problem finally makes sense.",
  "That same curiosity is what pulled me toward cybersecurity. I want to understand not only how software is built, but how systems fail, how they are protected and how both sides make me a stronger engineer.",
];

function StoryParagraph({
  text,
  index,
}: {
  text: string;
  index: number;
}) {
  const words = text.split(" ");

  return (
    <motion.p
      className="about-story-line"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.55 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.028,
            delayChildren: index * 0.04,
          },
        },
      }}
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={`${word}-${wordIndex}`}
          variants={{
            hidden: { opacity: 0.12, y: 7 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {word}
          {wordIndex < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.p>
  );
}

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
        About
      </motion.p>

      <div className="about-content">
        <div className="about-story">
          {story.map((paragraph, index) => (
            <StoryParagraph key={paragraph} text={paragraph} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
