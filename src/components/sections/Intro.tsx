"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const styles = [
  { fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 800, fontStyle: "normal" },
  { fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400, fontStyle: "italic" },
  { fontFamily: "'Courier New', Courier, monospace", fontWeight: 700, fontStyle: "normal" },
  { fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 300, fontStyle: "italic" },
  { fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700, fontStyle: "normal" },
];

export default function Intro() {
  const [visible, setVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let index = 0;

    const interval = window.setInterval(() => {
      index += 1;
      setActiveIndex(index % styles.length);
    }, 170);

    const timer = window.setTimeout(() => {
      window.clearInterval(interval);
      setVisible(false);
    }, 1750);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-screen"
          initial={{ y: 0 }}
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

          <p className="intro-caption">Portfolio · 2026</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
