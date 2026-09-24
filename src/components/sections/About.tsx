"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/components/ui/LanguageProvider";

export default function About() {
  const { language } = useLanguage();
  const copy = language === "fr"
    ? {
        label: "À propos",
        paragraphs: [
          "Je me suis intéressée à la tech parce que je voulais comprendre ce qui se passait derrière l’écran. Je n’avais pas de plan parfait, j’ai simplement continué à suivre les questions qui m’intriguaient et à apprendre un peu plus à chaque fois.",
          "Le C, Linux et les bases de l’informatique m’ont donné mon premier vrai sentiment de progression. Ils m’ont appris à ralentir, à lire correctement les erreurs et à travailler sur un problème au lieu d’abandonner dès qu’il devenait frustrant.",
          "Le développement web a rendu tout cela plus concret. Je pouvais partir d’une idée, la construire, casser certaines parties, l’améliorer et finir avec quelque chose que j’étais réellement fière d’avoir créé.",
          "J’ai appris qu’être bloquée fait souvent partie du processus. J’aime essayer par moi-même, comprendre ce qui n’a pas fonctionné et rester sur un problème jusqu’à ce qu’il devienne clair, plutôt que de chercher uniquement une solution rapide.",
          "C’est cette même curiosité qui m’a attirée vers la cybersécurité. J’aime toujours construire des logiciels, mais je veux aussi comprendre comment les systèmes peuvent échouer, comment les protéger et comment progresser comme ingénieure des deux côtés.",
        ],
        mobileParagraphs: [
          "Je construis principalement avec C, Linux, JavaScript, TypeScript, React, Next.js, Node.js et MySQL.",
          "Mon intérêt se situe à l’intersection du développement logiciel et de la cybersécurité : comprendre comment les systèmes fonctionnent, où ils peuvent échouer et comment les rendre plus robustes.",
          "J’apprends en construisant, en testant et en déboguant, avec un intérêt particulier pour Linux, le web et les réseaux.",
        ],
      }
    : {
        label: "About",
        paragraphs: [
          "I got into tech because I was curious about what was happening behind the screen. I did not have a perfect plan, I just kept following the questions that interested me and learning a little more every time.",
          "C, Linux and computer fundamentals gave me my first real sense of progress. They taught me to slow down, read errors properly and work through a problem instead of giving up the moment it became frustrating.",
          "Web development made everything feel more real. I could take an idea, build it, break parts of it, improve it and eventually end up with something I was genuinely proud to call mine.",
          "I have learned that being stuck is usually part of the process. I like trying things for myself, questioning what went wrong and staying with a problem until I understand it instead of only finding a quick fix.",
          "That same curiosity is what pulled me toward cybersecurity. I still love building software, but I also want to understand how systems can fail, how they can be protected and how I can keep becoming a stronger engineer on both sides.",
        ],
        mobileParagraphs: [
          "I build mainly with C, Linux, JavaScript, TypeScript, React, Next.js, Node.js and MySQL.",
          "My focus sits between software development and cybersecurity: understanding how systems work, where they can fail and how to make them more resilient.",
          "I learn by building, testing and debugging, with a strong interest in Linux, web security and networking.",
        ],
      };

  return (
    <section className="about-section" id="about">
      <motion.p
        className="section-kicker"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {copy.label}
      </motion.p>

      <div className="about-content">
        <motion.div
          className="about-story about-story-desktop"
          initial={{ opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </motion.div>

        <motion.div
          className="about-story about-story-mobile"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {copy.mobileParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
