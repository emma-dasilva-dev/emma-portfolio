"use client";

import { motion } from "motion/react";

const technologies = [
  ["HTML5", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"],
  ["CSS3", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"],
  ["JavaScript", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"],
  ["TypeScript", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"],
  ["React", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"],
  ["Next.js", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"],
  ["Tailwind CSS", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"],
  ["Node.js", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"],
  ["Express.js", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg"],
  ["REST API", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openapi/openapi-original.svg"],
  ["MySQL", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"],
  ["SQL", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg"],
  ["C", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg"],
  ["Linux", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg"],
  ["Ubuntu", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg"],
  ["Bash", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg"],
  ["Git", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"],
  ["GitHub", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"],
  ["Vite", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg"],
  ["Vercel", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg"],
  ["Railway", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/railway/railway-original.svg"],
] as const;

export default function Stack() {
  return (
    <section className="stack-section" id="stack">
      <motion.div
        className="stack-heading"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.65 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="section-kicker">03 · Technological stack</p>
        <p className="stack-counter">21 tools</p>
      </motion.div>

      <motion.div
        className="stack-shell"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="stack-grid" aria-label="Technologies I work with">
          {technologies.map(([name, src], index) => (
            <motion.div
              className="stack-logo"
              key={name}
              title={name}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.55,
                delay: index * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <img src={src} alt={name} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
