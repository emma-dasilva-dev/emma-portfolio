"use client";

import { useRef } from "react";
import ScrambleText from "@/components/ScrambleText";
import { useInView, useReducedMotion } from "@/lib/hooks";
import styles from "./Section.module.css";

/** "(02) — Selected work ———————— (06)" header shared by every section. */
export default function SectionHead({ index, label, aside, id }: { index: string; label: string; aside?: string; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  return (
    <div ref={ref} className={styles.head}>
      <h2 id={id} className={`label ${styles.title}`}>
        <span className={styles.index}>({index})</span>
        <ScrambleText text={label} active={inView} reducedMotion={reduced} />
      </h2>
      <span className={styles.rule} data-reveal="rule" aria-hidden="true" />
      {aside ? <span className={`label ${styles.aside}`} aria-hidden="true">{aside}</span> : null}
    </div>
  );
}
