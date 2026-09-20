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
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % styles.length);
    }, 360);

    const timer = window.setTimeout(() => {
      window.clearInterval(interval);
      setVisible(false);
    }, 2300);

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
            transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="intro-e-stage" aria-label="Animated letter E">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={activeIndex}
                className="intro-e"
                style={styles[activeIndex]}
                initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.045, filter: "blur(6px)" }}
                transition={{
                  opacity: { duration: 0.3, ease: "easeOut" },
                  scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  filter: { duration: 0.34, ease: "easeOut" },
                }}
              >
                E
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.p
            className="intro-caption"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.35, duration: 0.55 }}
          >
            Portfolio · 2026
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
