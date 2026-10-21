"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import SectionHead from "@/components/SectionHead";
import { projects } from "@/content/projects";
import { SECTION_IDS, type Copy, type Lang } from "@/content/site";
import section from "./Section.module.css";
import styles from "./Work.module.css";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/** A small label that trails a fine pointer across the project list. */
function useCursorLabel() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let frame = 0;
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      frame = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.3 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!el.dataset.visible) {
        pos.x = target.x;
        pos.y = target.y;
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return { ref, label, setLabel };
}

export default function Work({ t, lang }: { t: Copy; lang: Lang }) {
  const { ref: cursorRef, label: cursorLabel, setLabel: setCursorLabel } = useCursorLabel();
  const count = String(projects.length).padStart(2, "0");

  return (
    <section id={SECTION_IDS.work} className={section.section} aria-labelledby="work-title">
      <div className={section.inner}>
        <SectionHead index="02" label={t.work.label} aside={`(${count})`} id="work-title" />

        <p className={styles.intro} data-reveal>{t.work.intro}</p>

        <ol className={styles.list}>
          {projects.map((project, i) => {
            const [primary, ...rest] = project.links;
            const cursorText = primary ? `${primary.label[lang]} ↗` : t.work.private;
            return (
              <li
                key={project.slug}
                className={styles.row}
                data-reveal
                data-linked={primary ? "" : undefined}
                style={delay(i * 0.05)}
                onPointerEnter={(event) => event.pointerType === "mouse" && setCursorLabel(cursorText)}
                onPointerLeave={() => setCursorLabel(null)}
              >
                <span className={styles.index} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>

                <div className={styles.heading}>
                  <h3 className={styles.title}>{project.title}</h3>
                  <span className={`label ${styles.kind}`}>{project.kind[lang]}</span>
                </div>

                <p className={styles.description}>{project.description[lang]}</p>

                <div className={styles.details}>
                  <dl>
                    <div>
                      <dt className="label">{t.work.status}</dt>
                      <dd>{project.status[lang]}</dd>
                    </div>
                    <div>
                      <dt className="label">{t.work.stack}</dt>
                      <dd>
                        <ul className={styles.stack}>
                          {project.stack.map((tech) => (
                            <li key={tech}>{tech}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                  <div className={styles.links}>
                    {primary ? (
                      <>
                        <a className={styles.primary} href={primary.href} target="_blank" rel="noopener noreferrer">
                          {primary.label[lang]} <span className="sr-only">— {project.title}</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                        {rest.map((link) => (
                          <a key={link.href} className={styles.secondary} href={link.href} target="_blank" rel="noopener noreferrer">
                            {link.label[lang]} <span className="sr-only">— {project.title}</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        ))}
                      </>
                    ) : (
                      <span className={`label ${styles.private}`}>
                        <span className={styles.lock} aria-hidden="true" />
                        {t.work.private}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div ref={cursorRef} className={styles.cursor} data-visible={cursorLabel ? "" : undefined} aria-hidden="true">
        <span>{cursorLabel}</span>
      </div>
    </section>
  );
}
