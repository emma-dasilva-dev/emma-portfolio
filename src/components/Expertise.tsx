import type { CSSProperties } from "react";
import SectionHead from "@/components/SectionHead";
import { skillGroups } from "@/content/skills";
import { SECTION_IDS, type Copy, type Lang } from "@/content/site";
import section from "./Section.module.css";
import styles from "./Expertise.module.css";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

export default function Expertise({ t, lang }: { t: Copy; lang: Lang }) {
  return (
    <section id={SECTION_IDS.expertise} className={section.section} aria-labelledby="expertise-title">
      <div className={section.inner}>
        <SectionHead index="03" label={t.expertise.label} aside="Junior" id="expertise-title" />

        <div className={styles.head}>
          <p className={styles.lead} data-reveal>{t.expertise.lead}</p>
          <p className={styles.note} data-reveal style={delay(0.1)}>
            <span className={styles.noteMark} aria-hidden="true" />
            {t.expertise.note}
          </p>
        </div>

        <div className={styles.grid}>
          {skillGroups.map((group, g) => (
            <section key={group.title.en} className={styles.group} data-reveal style={delay(g * 0.08)} aria-labelledby={`skills-${g}`}>
              <h3 id={`skills-${g}`} className={`label ${styles.groupTitle}`}>
                <span>
                  <span className={styles.groupIndex}>{String(g + 1).padStart(2, "0")}</span> {group.title[lang]}
                </span>
                <span className={styles.count}>({String(group.skills.length).padStart(2, "0")})</span>
              </h3>
              <ul>
                {group.skills.map((skill) => {
                  const name = typeof skill.name === "string" ? skill.name : skill.name[lang];
                  const content = (
                    <>
                      <span className={styles.name}>{name}</span>
                      <span className={styles.evidence}>
                        <span className="sr-only">{t.expertise.usedIn} : </span>
                        <span aria-hidden="true">↳ </span>
                        {skill.evidence[lang]}
                        {skill.href ? <span aria-hidden="true"> ↗</span> : null}
                      </span>
                    </>
                  );
                  return (
                    <li key={name} className={styles.skill}>
                      {skill.href ? (
                        <a href={skill.href} target="_blank" rel="noopener noreferrer" className={styles.skillLink}>
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
