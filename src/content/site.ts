export type Lang = "fr" | "en";

export const SECTION_IDS = {
  home: "accueil",
  about: "apropos",
  work: "projets",
  expertise: "competences",
  contact: "contact",
} as const;

export const LINKS = {
  github: "https://github.com/emma-dasilva-dev",
  linkedin: "https://www.linkedin.com/in/emmadasilvadev",
  email: "emma.dasilva.dev@gmail.com",
  mailto: "mailto:emma.dasilva.dev@gmail.com",
} as const;

export const copy = {
  fr: {
    meta: { title: "Emma DaSilva | Développeuse web & cybersécurité" },
    a11y: {
      skip: "Aller au contenu",
      mainNav: "Navigation principale",
      menuOpen: "Ouvrir le menu",
      menuClose: "Fermer le menu",
      language: "Langue",
      home: "Emma DaSilva — accueil",
    },
    nav: { about: "À propos", work: "Projets", expertise: "Compétences", contact: "Contact" },
    clock: "Cotonou",
    hero: {
      meta: ["Portfolio ©2026", "Développeuse web junior", "Cybersécurité — en apprentissage", "6.37° N  2.39° E"],
      statement: ["Développeuse web junior, attirée par la cybersécurité.", "Je construis pour le web tout en apprenant comment les systèmes sont attaqués — et défendus."],
      ctaWork: "Voir les projets",
      ctaContact: "Me contacter",
      scroll: "Défiler",
    },
    about: {
      label: "À propos",
      lead: ["Comprendre", "avant d’agir."],
      body: [
        "Je suis Emma DaSilva, développeuse web junior basée à Cotonou. Le développement m’a appris à construire des applications ; aujourd’hui, je veux aussi comprendre comment elles fonctionnent, communiquent et se protègent.",
        "J’apprends par la pratique — Linux, réseaux, analyse technique — et je documente ce que j’apprends. Mon objectif : continuer à progresser et construire une carrière dans la cybersécurité.",
      ],
      facts: [
        { k: "Basée à", v: "Cotonou, Bénin" },
        { k: "Rôle", v: "Développeuse web junior" },
        { k: "Direction", v: "Cybersécurité" },
        { k: "Langues", v: "Français, anglais" },
      ],
      principlesLabel: "Méthode",
      principles: [
        { t: "Comprendre d’abord", d: "Lire le système avant de le modifier." },
        { t: "Apprendre en faisant", d: "Des projets réels plutôt que des tutoriels." },
        { t: "Construire fiable", d: "Simple, lisible, vérifiable." },
      ],
    },
    work: {
      label: "Projets sélectionnés",
      intro: "Une sélection de projets personnels — terminés, en cours ou à peine commencés. Statuts indiqués tels quels.",
      private: "Dépôt privé",
      stack: "Stack",
      status: "Statut",
      cursor: "Ouvrir",
    },
    expertise: {
      label: "Compétences",
      lead: "Une boîte à outils junior, construite par la pratique.",
      note: "Niveau : junior. Chaque outil ci-dessous a été utilisé dans un projet réel ou en pratique — et j’apprends encore chacun d’eux.",
      usedIn: "Utilisé dans",
    },
    contact: {
      label: "Contact",
      lead: "Parlons",
      body: "Ouverte aux stages, aux collaborations techniques et aux échanges autour de la cybersécurité et du développement web.",
      availability: "Disponible pour un stage",
      write: "Écrire un e-mail",
      copy: "Copier",
      copied: "Copié",
    },
    footer: {
      wordmark: "Signature visuelle interactive",
      location: "©2026 · Cotonou / Bénin",
      explore: "Explorer",
      connect: "Réseaux",
      contact: "Contact",
      home: "Accueil",
      email: "E-mail",
      top: "Retour en haut",
      replay: "Animer la signature emma.",
      hint: "Touchez pour animer",
      footerNav: "Navigation du pied de page",
    },
  },
  en: {
    meta: { title: "Emma DaSilva | Web developer & cybersecurity" },
    a11y: {
      skip: "Skip to content",
      mainNav: "Main navigation",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      language: "Language",
      home: "Emma DaSilva — home",
    },
    nav: { about: "About", work: "Work", expertise: "Expertise", contact: "Contact" },
    clock: "Cotonou",
    hero: {
      meta: ["Portfolio ©2026", "Junior web developer", "Cybersecurity — in progress", "6.37° N  2.39° E"],
      statement: ["Junior web developer drawn to cybersecurity.", "I build for the web while learning how systems are attacked — and defended."],
      ctaWork: "Selected work",
      ctaContact: "Get in touch",
      scroll: "Scroll",
    },
    about: {
      label: "About",
      lead: ["Understand", "before acting."],
      body: [
        "I’m Emma DaSilva, a junior web developer based in Cotonou. Development taught me how to build applications; now I also want to understand how they work, communicate, and stay protected.",
        "I learn hands-on — Linux, networking, technical analysis — and I document what I learn. My goal is to keep growing and build a career in cybersecurity.",
      ],
      facts: [
        { k: "Based in", v: "Cotonou, Benin" },
        { k: "Role", v: "Junior web developer" },
        { k: "Direction", v: "Cybersecurity" },
        { k: "Languages", v: "French, English" },
      ],
      principlesLabel: "Method",
      principles: [
        { t: "Understand first", d: "Read the system before changing it." },
        { t: "Learn by doing", d: "Real projects over tutorials." },
        { t: "Build reliably", d: "Simple, readable, verifiable." },
      ],
    },
    work: {
      label: "Selected work",
      intro: "A selection of personal projects — finished, in progress, or barely started. Statuses are stated as they are.",
      private: "Private repository",
      stack: "Stack",
      status: "Status",
      cursor: "Open",
    },
    expertise: {
      label: "Expertise",
      lead: "A junior toolkit, built through practice.",
      note: "Level: junior. Every tool below has been used in a real project or hands-on practice — and I’m still learning all of them.",
      usedIn: "Used in",
    },
    contact: {
      label: "Contact",
      lead: "Let’s talk",
      body: "Open to internships, technical collaborations, and conversations about cybersecurity and web development.",
      availability: "Available for an internship",
      write: "Send an email",
      copy: "Copy",
      copied: "Copied",
    },
    footer: {
      wordmark: "Interactive visual signature",
      location: "©2026 · Cotonou / Benin",
      explore: "Explore",
      connect: "Connect",
      contact: "Contact",
      home: "Home",
      email: "Email",
      top: "Back to top",
      replay: "Animate the emma. signature",
      hint: "Tap to animate",
      footerNav: "Footer navigation",
    },
  },
} as const;

export type Copy = (typeof copy)[Lang];
