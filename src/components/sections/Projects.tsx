"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "motion/react";

const projectUrl =
  "https://emma-dasilva-dev.github.io/bandit-redline-journal/";

const demoPassword = "cYb3rCur10sity_0v3rTh3W1r3_2026";

const resultMessages = {
  success:
    "AUTHENTICATION ACCEPTED // IDENTITY VERIFIED // ACCESS NODE UNLOCKED // PROCEED, OPERATOR.",
  error:
    "AUTHENTICATION FAILED // INPUT MISMATCH DETECTED // VERIFY CREDENTIAL STRING.",
} as const;

const banditLogo = [
  " _                     _ _ _",
  "| |__   __ _ _ __   __| (_) |_",
  "| '_ \\ / _` | '_ \\ / _` | | __|",
  "| |_) | (_| | | | | (_| | | |_",
  "|_.__/ \\__,_|_| |_|\\__,_|_|\\__|",
].join("\n");

export default function Projects() {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<"idle" | "success" | "error">("idle");
  const [typedResult, setTypedResult] = useState("");

  useEffect(() => {
    if (result === "idle") {
      setTypedResult("");
      return;
    }

    const message = resultMessages[result];
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
  }, [result]);

  function checkPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password === demoPassword) {
      setResult("success");
      return;
    }

    setResult("error");
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
        <p className="section-kicker">Projects</p>
      </motion.div>

      <motion.article
        className="project-bandit"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="project-bandit-terminal">
          <div className="project-bandit-topbar">
            <span className="project-bandit-tab">Command Prompt - ssh bandit</span>
            <span className="project-bandit-window-icons" aria-hidden="true">
              <span>−</span>
              <span>□</span>
              <span>×</span>
            </span>
          </div>

          <div className="project-bandit-screen">
            <p className="project-bandit-line">
              C:\\Users\\emma&gt;ssh bandit0@bandit.labs.overthewire.org -p2220
            </p>

            <pre className="project-bandit-ascii" aria-hidden="true">
              {banditLogo}
            </pre>

            <p className="project-bandit-center">
              This is an OverTheWire-inspired mini challenge.
            </p>

            <p className="project-bandit-center project-bandit-muted">
              A recovered password was found in the previous level.
            </p>

            <div className="project-bandit-challenge">
              <p className="project-bandit-hint">
                recovered_password: <strong>{demoPassword}</strong>
              </p>

              <form className="project-bandit-form" onSubmit={checkPassword}>
                <label htmlFor="bandit-password">
                  bandit1@portfolio&apos;s password:
                </label>

                <div className="project-bandit-input-row">
                  <input
                    id="bandit-password"
                    type="text"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      if (result !== "idle") setResult("idle");
                    }}
                    autoComplete="off"
                    spellCheck={false}
                    aria-describedby="bandit-result"
                  />
                  <button type="submit">enter</button>
                </div>
              </form>

              <p
                id="bandit-result"
                className={`project-bandit-result ${
                  result === "success"
                    ? "project-bandit-result-success"
                    : result === "error"
                      ? "project-bandit-result-error"
                      : ""
                }`}
                aria-live="polite"
              >
                {typedResult}
                {result !== "idle" && typedResult.length < resultMessages[result].length && (
                  <span className="project-bandit-caret" aria-hidden="true" />
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="project-bandit-copy">
          <div className="project-bandit-meta">
            <span>Cybersecurity / Linux / SSH</span>
            <span>2026</span>
          </div>

          <h2>Bandit Redline Journal</h2>

          <p className="project-bandit-description">
            A cybersecurity journal documenting my progress through OverTheWire
            Bandit, including the commands, concepts and reasoning behind each
            challenge.
          </p>

          <div className="project-bandit-tags" aria-label="Technologies and concepts">
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
            View project <span aria-hidden="true">↗</span>
          </a>
        </div>
      </motion.article>
    </section>
  );
}
