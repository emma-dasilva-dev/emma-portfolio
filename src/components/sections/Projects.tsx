"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/components/ui/LanguageProvider";

const projectUrl =
  "https://emma-dasilva-dev.github.io/bandit-redline-journal/";

const cashlessUrl = "https://leads.cashless.africa/";

const demoPassword = "cYb3rCur10sity_0v3rTh3W1r3_2026";

const resultMessages = {
  en: {
    success: "AUTHENTICATION ACCEPTED // IDENTITY VERIFIED // ACCESS NODE UNLOCKED // PROCEED, OPERATOR.",
    error: "AUTHENTICATION FAILED // INPUT MISMATCH DETECTED // VERIFY CREDENTIAL STRING.",
  },
  fr: {
    success: "AUTHENTIFICATION ACCEPTÉE // IDENTITÉ VÉRIFIÉE // NŒUD D’ACCÈS DÉVERROUILLÉ // CONTINUEZ, OPÉRATRICE.",
    error: "ÉCHEC DE L’AUTHENTIFICATION // SAISIE INCORRECTE // VÉRIFIEZ LES IDENTIFIANTS.",
  },
} as const;

export default function Projects() {
  const { language } = useLanguage();
  const copy = language === "fr"
    ? {
        label: "Projets",
        recovered: "Identifiant du niveau précédent récupéré.",
        password: "mot de passe :",
        placeholder: "saisir le mot de passe",
        enter: "ENTRER",
        system: "système :",
        waiting: "en attente d’authentification...",
        meta: "Cybersécurité / Linux / SSH",
        description: "Mon carnet de terrain pour OverTheWire Bandit. J’y garde les commandes, les erreurs, les déclics et surtout la logique derrière chaque niveau, pour transformer chaque blocage en quelque chose que je comprends vraiment.",
        concepts: "Technologies et concepts",
        view: "Voir le projet",
        cashlessMeta: "Landing page / Fintech",
        cashlessDescription:
          "Une landing page conçue pour présenter l’application Cashless de façon claire et immédiate. L’idée était de rendre le produit facile à comprendre dès les premières secondes, avec une interface propre, moderne et pensée pour donner envie d’aller plus loin.",
        cashlessConcepts: "Technologies et focus",
        cashlessVisit: "Voir le projet",
      }
    : {
        label: "Projects",
        recovered: "{copy.recovered}",
        password: "password:",
        placeholder: "type password",
        enter: "ENTER",
        system: "system:",
        waiting: "waiting for authentication...",
        meta: "Cybersecurity / Linux / SSH",
        description: "My field journal for OverTheWire Bandit. I use it to keep the commands, mistakes, breakthroughs and, more importantly, the reasoning behind each level so every roadblock turns into something I actually understand.",
        concepts: "Technologies and concepts",
        view: "View project",
        cashlessMeta: "Landing page / Fintech",
        cashlessDescription:
          "A landing page built to introduce the Cashless app clearly and quickly. The goal was to make the product easy to understand within seconds, with a clean, modern interface that gives people a reason to keep exploring.",
        cashlessConcepts: "Technologies and focus",
        cashlessVisit: "View project",
      };

  const [password, setPassword] = useState("");
  const [result, setResult] = useState<"idle" | "success" | "error">("idle");
  const [typedResult, setTypedResult] = useState("");

  useEffect(() => {
    if (result === "idle") {
      setTypedResult("");
      return;
    }

    const message = resultMessages[language][result];
    let index = 0;
    setTypedResult("");

    const timer = window.setInterval(() => {
      index += 1;
      setTypedResult(message.slice(0, index));

      if (index >= message.length) {
        window.clearInterval(timer);
      }
    }, 28);

    return () => window.clearInterval(timer);
  }, [result, language]);

  function checkPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(password === demoPassword ? "success" : "error");
  }

  return (
    <section className="projects-section" id="projects">
      <motion.div
        className="projects-heading"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.65 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="section-kicker">{copy.label}</p>
      </motion.div>

      <article className="project-bandit">
        <div className="project-bandit-terminal-v2">
          <div className="project-bandit-terminal-bar">
            <div className="project-bandit-terminal-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span className="project-bandit-terminal-title">bandit@portfolio:~</span>
            <span className="project-bandit-terminal-mode">SSH</span>
          </div>

          <div className="project-bandit-terminal-body">
            <p className="project-bandit-shell-line">
              <span className="project-bandit-shell-user">emma@portfolio</span>
              <span>:</span>
              <span className="project-bandit-shell-path">~</span>
              <span>$</span>
              <span> ssh bandit1@bandit.labs.overthewire.org -p 2220</span>
            </p>

            <div className="project-bandit-terminal-intro">
              <p>OVER THE WIRE // BANDIT</p>
              <p className="project-bandit-terminal-muted">
                Previous level credential recovered.
              </p>
            </div>

            <div className="project-bandit-terminal-key">
              <span>password.txt</span>
              <code>{demoPassword}</code>
            </div>

            <form className="project-bandit-terminal-form" onSubmit={checkPassword}>
              <label htmlFor="bandit-password-v2">
                bandit1@bandit.labs.overthewire.org&apos;s {copy.password}
              </label>

              <div className="project-bandit-terminal-inputline">
                <span aria-hidden="true">&gt;</span>
                <input
                  id="bandit-password-v2"
                  type="text"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    if (result !== "idle") setResult("idle");
                  }}
                  autoComplete="off"
                  spellCheck={false}
                  aria-describedby="bandit-result-v2"
                  placeholder={copy.placeholder}
                />
                <button type="submit">{copy.enter}</button>
              </div>
            </form>

            <div
              id="bandit-result-v2"
              className={`project-bandit-terminal-result ${
                result === "success"
                  ? "project-bandit-result-success"
                  : result === "error"
                    ? "project-bandit-result-error"
                    : ""
              }`}
              aria-live="polite"
            >
              <span className="project-bandit-terminal-result-prefix">{copy.system}</span>
              <span>
                {typedResult || copy.waiting}
                {result !== "idle" &&
                  typedResult.length < resultMessages[language][result].length && (
                    <span className="project-bandit-caret" aria-hidden="true" />
                  )}
              </span>
            </div>
          </div>
        </div>

        <div className="project-bandit-copy">
          <span className="project-number">01</span>
          <div className="project-bandit-meta">
            <span>{copy.meta}</span>
            <span>2026</span>
          </div>

          <h2>Bandit Redline Journal</h2>

          <p className="project-bandit-description">{copy.description}</p>

          <div className="project-bandit-tags" aria-label={copy.concepts}>
            <span>Linux</span>
            <span>SSH</span>
            <span>Bash</span>
            <span>Permissions</span>
            <span>OverTheWire</span>
          </div>

          <a
            className="project-bandit-link"
            href={projectUrl}
            target="_blank"
            rel="noreferrer"
          >
            {copy.view} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>

      <article className="project-cashless">
        <a
          className="project-cashless-card"
          href={cashlessUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={copy.cashlessVisit}
        >
          <div className="cashless-card-glow" aria-hidden="true" />
          <div className="cashless-card-head">
            <span className="cashless-card-brand">cashless</span>
            <span className="cashless-card-kind">VIRTUAL</span>
          </div>

          <div className="cashless-card-chip" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="cashless-card-number" aria-label="Virtual card ending in 2026">
            <span>••••</span>
            <span>••••</span>
            <span>••••</span>
            <span>2026</span>
          </div>

          <div className="cashless-card-foot">
            <div>
              <span className="cashless-card-label">CARD HOLDER</span>
              <strong>EMMA DA SILVA</strong>
            </div>
            <div className="cashless-card-currency">
              <span className="cashless-card-label">CURRENCY</span>
              <strong>USD</strong>
            </div>
          </div>
        </a>

        <div className="project-cashless-copy">
          <span className="project-number">02</span>
          <div className="project-cashless-meta">
            <span>{copy.cashlessMeta}</span>
            <span>2026</span>
          </div>

          <h2>Cashless Africa Landing Page</h2>

          <p className="project-cashless-description">
            {copy.cashlessDescription}
          </p>

          <div
            className="project-cashless-tags"
            aria-label={copy.cashlessConcepts}
          >
            <span>Next.js</span>
            <span>TypeScript</span>
            <span>Tailwind CSS</span>
            <span>Responsive UI</span>
            <span>Conversion</span>
          </div>

          <a
            className="project-cashless-link"
            href={cashlessUrl}
            target="_blank"
            rel="noreferrer"
          >
            {copy.cashlessVisit} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </section>
  );
}
