import type { CSSProperties } from "react";
import SectionHead from "@/components/SectionHead";
import { SECTION_IDS, type Copy } from "@/content/site";
import section from "./Section.module.css";
import styles from "./About.module.css";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

export default function About({ t }: { t: Copy }) {
  const a = t.about;
  return (
    <section id={SECTION_IDS.about} className={section.section} aria-labelledby="about-title">
      <div className={section.inner}>
        <SectionHead index="01" label={a.label} aside="Cotonou — 2026" id="about-title" />

        <div className={styles.grid}>
          <p className={styles.lead}>
            <span className={styles.leadLine} data-reveal="mask">
              <span>{a.lead[0]}</span>
            </span>{" "}
            <span className={styles.leadLine} data-reveal="mask" style={delay(0.12)}>
              <em>{a.lead[1]}</em>
            </span>
          </p>

          <div className={styles.body}>
            {a.body.map((paragraph, i) => (
              <p key={i} data-reveal style={delay(0.1 + i * 0.1)}>
                {paragraph}
              </p>
            ))}
          </div>

          <dl className={styles.facts}>
            {a.facts.map((fact, i) => (
              <div key={fact.k} data-reveal style={delay(i * 0.06)}>
                <dt className="label">{fact.k}</dt>
                <dd>{fact.v}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.method}>
            <p className="label" data-reveal>{a.principlesLabel}</p>
            <ol>
              {a.principles.map((p, i) => (
                <li key={p.t} data-reveal style={delay(0.08 + i * 0.08)}>
                  <span className={styles.methodIndex} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
