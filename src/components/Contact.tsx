"use client";

import { useEffect, useState, type CSSProperties } from "react";
import SectionHead from "@/components/SectionHead";
import { LINKS, SECTION_IDS, type Copy } from "@/content/site";
import section from "./Section.module.css";
import styles from "./Contact.module.css";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

export default function Contact({ t }: { t: Copy }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
    } catch {
      window.location.href = LINKS.mailto;
    }
  };

  return (
    <section id={SECTION_IDS.contact} className={`${section.section} ${styles.contact}`} aria-labelledby="contact-title">
      <div className={section.inner}>
        <SectionHead index="04" label={t.contact.label} aside="FR / EN" id="contact-title" />

        <p className={`label ${styles.availability}`} data-reveal>
          <span className={styles.pulse} aria-hidden="true" />
          {t.contact.availability}
        </p>

        <p className={styles.lead} data-reveal="mask" style={delay(0.08)}>
          <span>
            {t.contact.lead}
            <span className={styles.dot}>.</span>
          </span>
        </p>

        <div className={styles.grid}>
          <p className={styles.body} data-reveal style={delay(0.12)}>{t.contact.body}</p>

          <div className={styles.actions} data-reveal style={delay(0.2)}>
            <div className={styles.emailRow}>
              <a className={styles.email} href={LINKS.mailto}>
                <span className="sr-only">{t.contact.write} : </span>
                {LINKS.email}
                <span className={styles.arrow} aria-hidden="true">↗</span>
              </a>
              <button type="button" className={styles.copy} onClick={copy} aria-live="polite">
                {copied ? t.contact.copied : t.contact.copy}
              </button>
            </div>

            <ul className={styles.socials}>
              <li>
                <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
                  <span className="label">01</span>GitHub<span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                  <span className="label">02</span>LinkedIn<span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a href={LINKS.mailto}>
                  <span className="label">03</span>
                  {t.footer.email}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
