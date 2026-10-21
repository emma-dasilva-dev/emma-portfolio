import type { Lang } from "./site";

type Localized = Record<Lang, string>;

export type Project = {
  slug: string;
  title: string;
  kind: Localized;
  description: Localized;
  status: Localized;
  stack: string[];
  /** Only destinations that were verified to exist. Private repositories have none. */
  links: { label: Localized; href: string }[];
};

// Descriptions are taken from each repository's README and source, not invented.
export const projects: Project[] = [
  {
    slug: "painthaker",
    title: "Painthaker",
    kind: { fr: "Assistant IA", en: "AI assistant" },
    description: {
      fr: "Compagnon d’apprentissage IA pour développeurs et apprenants en cybersécurité : explique des concepts de sécurité, relit du code et distingue les vulnérabilités confirmées des motifs simplement suspects.",
      en: "AI learning companion for developers and cybersecurity learners: explains security concepts, reviews code, and separates confirmed vulnerabilities from patterns that only look risky.",
    },
    status: {
      fr: "En cours — chat terminal fonctionnel, voix et interface web prévues",
      en: "In progress — terminal chat works, voice and web UI planned",
    },
    stack: ["Python", "LiveKit Agents", "Gemini", "SQLite"],
    links: [{ label: { fr: "Dépôt", en: "Repository" }, href: "https://github.com/emma-dasilva-dev/painthaker" }],
  },
  {
    slug: "cotonou-3d",
    title: "Cotonou / 3D",
    kind: { fr: "Exploration WebGL", en: "WebGL exploration" },
    description: {
      fr: "Étude visuelle interactive de l’architecture et de la vie urbaine de Cotonou : six hôtels modélisés, monuments, transitions de caméra et fiches éditoriales.",
      en: "Interactive visual study of Cotonou’s architecture and urban life: six modelled hotels, landmarks, camera transitions, and editorial panels.",
    },
    status: { fr: "Expérience interactive, en évolution", en: "Interactive experience, evolving" },
    stack: ["Next.js", "Three.js", "React Three Fiber", "GSAP"],
    links: [{ label: { fr: "Dépôt", en: "Repository" }, href: "https://github.com/emma-dasilva-dev/cotonou-3d" }],
  },
  {
    slug: "fomo",
    title: "FOMO",
    kind: { fr: "Concept d’app sociale", en: "Social app concept" },
    description: {
      fr: "Concept d’application de découverte sociale à Cotonou : ce qui monte en ce moment, événements à venir, messagerie et profil.",
      en: "Social discovery app concept set in Cotonou: what’s rising right now, upcoming events, messages, and profiles.",
    },
    status: { fr: "Concept — interface en cours", en: "Concept — interface in progress" },
    stack: ["Next.js", "React", "TypeScript", "Tailwind"],
    links: [],
  },
  {
    slug: "emma-jarvis",
    title: "Emma Jarvis",
    kind: { fr: "Assistant Python", en: "Python assistant" },
    description: {
      fr: "Assistant de bureau déclenché par un double clap : écoute le micro, ouvre l’espace de travail et accueille avec une voix ElevenLabs. Inclut des commandes vocales de vérification de projet.",
      en: "Desktop assistant triggered by a double clap: listens to the microphone, opens the workspace, and greets with an ElevenLabs voice. Includes spoken project-check commands.",
    },
    status: { fr: "Projet personnel, fonctionnel", en: "Personal tool, working" },
    stack: ["Python", "sounddevice", "ElevenLabs API"],
    links: [{ label: { fr: "Dépôt", en: "Repository" }, href: "https://github.com/emma-dasilva-dev/emma-jarvis" }],
  },
  {
    slug: "neon-escape",
    title: "Neon Escape",
    kind: { fr: "Jeu interactif", en: "Interactive game" },
    description: {
      fr: "Jeu de navigateur à ses débuts : le projet est initialisé avec Vite, le gameplay reste à construire.",
      en: "Browser game at its very beginning: the project is set up with Vite, the gameplay is still to be built.",
    },
    status: { fr: "Tout début", en: "Just started" },
    stack: ["JavaScript", "Vite"],
    links: [],
  },
  {
    slug: "snake",
    title: "Snake",
    kind: { fr: "Jeu — C & navigateur", en: "Game — C & browser" },
    description: {
      fr: "Le Snake classique, deux fois : une version terminal en C avec ncurses, et une édition navigateur sans dépendance, au clavier ou au toucher, avec meilleurs scores sauvegardés.",
      en: "Classic Snake, twice: a terminal version in C with ncurses, and a dependency-free browser edition with keyboard and touch controls and saved high scores.",
    },
    status: { fr: "Jouable", en: "Playable" },
    stack: ["C", "ncurses", "JavaScript", "HTML / CSS"],
    links: [
      { label: { fr: "Jouer", en: "Play" }, href: "https://emma-dasilva-dev.github.io/snake/" },
      { label: { fr: "Dépôt", en: "Repository" }, href: "https://github.com/emma-dasilva-dev/snake" },
    ],
  },
];
