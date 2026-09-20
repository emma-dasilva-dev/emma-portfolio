"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const styles = [
  { fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 800, fontStyle: "normal" },
  { fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400, fontStyle: "italic" },
  { fontFamily: "'Courier New', Courier, monospace", fontWeight: 700, fontStyle: "normal" },
  { fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 300, fontStyle: "italic" },
  { fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700, fontStyle: "normal" },
] as const;

export default function Intro() {
  const [visible, setVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const fontTimers = styles.slice(1).map((_, index) =>
      window.setTimeout(() => {
        setActiveIndex(index + 1);
      }, (index + 1) * 170),
    );

    const resetTimer = window.setTimeout(() => {
      setActiveIndex(0);
    }, 1020);

    const closeTimer = window.setTimeout(() => {
      setVisible(false);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    }, 1750);

    return () => {
      fontTimers.forEach(window.clearTimeout);
      window.clearTimeout(resetTimer);
      window.clearTimeout(closeTimer);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-screen"
          initial={false}
          exit={{
            y: "-100%",
            transition: { duration: 0.82, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="intro-e-stage" aria-label="Animated letter E">
            <span className="intro-e" style={styles[activeIndex]}>
              E
            </span>
          </div>

          <p className="intro-caption">Emma&apos;s Portfolio</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
