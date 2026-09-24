"use client";

import { motion } from "motion/react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { useLanguage } from "@/components/ui/LanguageProvider";

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
  ["MySQL", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"],
  ["C", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg"],
  ["Linux", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg"],
  ["Bash", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg"],
  ["Git", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"],
] as const;

const rows = [technologies.slice(0, 7), technologies.slice(7)];
const mobileRows = [
  technologies.slice(0, 5),
  technologies.slice(5, 10),
  technologies.slice(10),
];

function StackRow({
  items,
  reverse = false,
}: {
  items: readonly (readonly [string, string])[];
  reverse?: boolean;
}) {
  return (
    <InfiniteSlider
      className="stack-slider"
      gap={56}
      speed={52}
      speedOnHover={18}
      mobileSpeed={72}
      reverse={reverse}
    >
      {items.map(([name, src]) => (
        <div
          className={`stack-slider-item ${name === "Express.js" || name === "Bash" ? "stack-logo-light" : ""}`}
          key={name}
        >
          <img src={src} alt={name} />
        </div>
      ))}
    </InfiniteSlider>
  );
}

export default function Stack() {
  const { language } = useLanguage();
  return (
    <section className="stack-section" id="stack">
      <motion.div
        className="stack-heading"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.65 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="section-kicker">{language === "fr" ? "Stack technologique" : "Technological stack"}</p>
        <p className="stack-counter">{language === "fr" ? "14 outils" : "14 tools"}</p>
      </motion.div>

      <motion.div
        className="stack-slider-wrap stack-slider-desktop"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <StackRow items={rows[0]} />
        <StackRow items={rows[1]} reverse />
      </motion.div>

      <div className="stack-slider-wrap stack-slider-mobile">
        <StackRow items={mobileRows[0]} />
        <StackRow items={mobileRows[1]} reverse />
        <StackRow items={mobileRows[2]} />
      </div>
    </section>
  );
}
