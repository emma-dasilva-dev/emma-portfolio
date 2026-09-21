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
        <p className="section-kicker">Projects</p>
      </motion.div>

      <motion.article
        className="project-bandit"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="project-bandit-challenge-card">
          <div className="project-bandit-challenge-head">
            <span>ACCESS NODE 01</span>
            <span>STATUS: LOCKED</span>
          </div>

          <div className="project-bandit-challenge-body">
            <p className="project-bandit-eyebrow">MINI CHALLENGE</p>

            <h3>Enter the recovered credential.</h3>

            <p className="project-bandit-challenge-copy">
              Copy the key exactly. One wrong character and the node stays locked.
            </p>

            <div className="project-bandit-key">
              <span>RECOVERED KEY</span>
              <code>{demoPassword}</code>
            </div>

            <form className="project-bandit-form" onSubmit={checkPassword}>
              <label htmlFor="bandit-password">PASSWORD INPUT</label>

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
                  placeholder="paste credential..."
                />
                <button type="submit">UNLOCK</button>
              </div>
            </form>

            <div
              id="bandit-result"
              className={`project-bandit-status ${
                result === "success"
                  ? "project-bandit-result-success"
                  : result === "error"
                    ? "project-bandit-result-error"
                    : ""
              }`}
              aria-live="polite"
            >
              <span className="project-bandit-status-dot" aria-hidden="true" />
              <span>
                {typedResult || "AWAITING INPUT // NODE LOCKED"}
                {result !== "idle" &&
                  typedResult.length < resultMessages[result].length && (
                    <span className="project-bandit-caret" aria-hidden="true" />
                  )}
              </span>
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
