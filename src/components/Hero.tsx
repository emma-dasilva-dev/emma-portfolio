import type { CSSProperties } from "react";
import RegistrationField from "@/components/RegistrationField";
import { SECTION_IDS, type Copy } from "@/content/site";
import styles from "./Hero.module.css";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

function Letters({ word, start }: { word: string; start: number }) {
  return Array.from(word).map((letter, i) => (
    <span key={i} className={styles.letter} style={delay(start + i * 0.035)}>
      {letter}
    </span>
  ));
}

export default function Hero({ t }: { t: Copy }) {
  return (
    <section id={SECTION_IDS.home} className={styles.hero} aria-labelledby="hero-title">
      <RegistrationField className={styles.field} />

      <div className={styles.inner}>
        <ul className={styles.meta}>
          {t.hero.meta.map((item, i) => (
            <li key={i} className={`label ${styles.enter}`} style={delay(0.15 + i * 0.07)}>
              <span className={styles.metaIndex} aria-hidden="true">{String.fromCharCode(65 + i)}</span>
              {item}
            </li>
          ))}
        </ul>

        <h1 id="hero-title" className={styles.name}>
          <span className={styles.line}>
            <Letters word="Emma" start={0.3} />
          </span>{" "}
          <span className={`${styles.line} ${styles.lineTwo}`}>
            <Letters word="DaSilva" start={0.42} />
            <span className={styles.square} aria-hidden="true" />
          </span>
        </h1>

        <div className={styles.bottom}>
          <p className={`${styles.statement} ${styles.enter}`} style={delay(0.85)}>
            {t.hero.statement[0]} <span>{t.hero.statement[1]}</span>
          </p>
          <div className={`${styles.ctas} ${styles.enter}`} style={delay(0.98)}>
            <a href={`#${SECTION_IDS.work}`} className={styles.cta}>
              <span className={styles.ctaIndex} aria-hidden="true">→</span>
              {t.hero.ctaWork}
            </a>
            <a href={`#${SECTION_IDS.contact}`} className={styles.cta}>
              <span className={styles.ctaIndex} aria-hidden="true">→</span>
              {t.hero.ctaContact}
            </a>
          </div>
          <a href={`#${SECTION_IDS.about}`} className={`label ${styles.scroll} ${styles.enter}`} style={delay(1.1)}>
            {t.hero.scroll}
            <span className={styles.scrollLine} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
