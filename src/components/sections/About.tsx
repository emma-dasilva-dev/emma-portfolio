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
          "Je me suis intéressée à la tech par curiosité, avec l’envie de comprendre ce qui se passe derrière l’écran. En apprenant par moi-même, j’ai découvert que j’aimais autant construire que résoudre les problèmes qui apparaissent en chemin.",
          "Le développement m’a appris à transformer des idées en quelque chose de concret, tandis que la cybersécurité m’attire pour une autre raison : comprendre comment les systèmes fonctionnent, où ils peuvent échouer et comment mieux les protéger.",
          "Je suis encore en train d’apprendre, mais j’aime avancer en expérimentant, en corrigeant mes erreurs et en allant jusqu’au bout d’un problème pour vraiment le comprendre.",
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
          "I got into tech out of curiosity and a need to understand what was happening behind the screen. Learning on my own showed me that I enjoy both building things and solving the problems that come with them.",
          "Development taught me how to turn ideas into something real, while cybersecurity pulled me in for a different reason: understanding how systems work, where they can fail and how they can be better protected.",
          "I’m still learning, but I like progressing by experimenting, fixing my mistakes and staying with a problem until I genuinely understand it.",
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

        <div className="about-story about-story-mobile">
          {copy.mobileParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
