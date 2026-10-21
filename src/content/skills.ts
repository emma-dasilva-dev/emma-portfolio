import type { Lang } from "./site";

type Localized = Record<Lang, string>;

export type SkillGroup = {
  title: Localized;
  skills: { name: string | Localized; evidence: Localized; href?: string }[];
};

// Evidence points at real projects or practice, so the toolkit stays honest.
export const skillGroups: SkillGroup[] = [
  {
    title: { fr: "Langages", en: "Languages" },
    skills: [
      { name: "Python", evidence: { fr: "Painthaker, Emma Jarvis", en: "Painthaker, Emma Jarvis" } },
      { name: "JavaScript", evidence: { fr: "Snake navigateur, Neon Escape", en: "Browser Snake, Neon Escape" } },
      { name: "C", evidence: { fr: "Snake terminal, CASE 404", en: "Terminal Snake, CASE 404" } },
      { name: "Bash", evidence: { fr: "Scripts, shell Linux", en: "Scripts, Linux shell" } },
    ],
  },
  {
    title: { fr: "Web", en: "Web" },
    skills: [
      { name: "HTML", evidence: { fr: "Snake, ce portfolio", en: "Snake, this portfolio" } },
      { name: "CSS", evidence: { fr: "Snake, ce portfolio", en: "Snake, this portfolio" } },
      { name: "React", evidence: { fr: "Cotonou / 3D, FOMO, ce site", en: "Cotonou / 3D, FOMO, this site" } },
      { name: "Node.js", evidence: { fr: "Outillage npm & Next.js", en: "npm & Next.js tooling" } },
    ],
  },
  {
    title: { fr: "Systèmes & outils", en: "Systems & tools" },
    skills: [
      { name: "Linux", evidence: { fr: "Ubuntu / WSL au quotidien", en: "Ubuntu / WSL daily" } },
      { name: "Kali Linux", evidence: { fr: "Pratique de la sécurité", en: "Security practice" } },
      { name: "Git", evidence: { fr: "Chaque projet", en: "Every project" } },
      { name: "GitHub", evidence: { fr: "Dépôts, Pages, CI", en: "Repos, Pages, CI" } },
    ],
  },
  {
    title: { fr: "Sécurité — bases", en: "Security — foundations" },
    skills: [
      { name: "OverTheWire Bandit", evidence: { fr: "Niveaux 0 → 14 documentés", en: "Levels 0 → 14 documented" }, href: "https://emma-dasilva-dev.github.io/bandit-redline-journal/" },
      { name: { fr: "Revue de code", en: "Code review" }, evidence: { fr: "Outil inspect_code de Painthaker", en: "Painthaker’s inspect_code tool" } },
      { name: { fr: "Réseaux", en: "Networking" }, evidence: { fr: "Notions fondamentales, en cours", en: "Fundamentals, ongoing" } },
    ],
  },
];
