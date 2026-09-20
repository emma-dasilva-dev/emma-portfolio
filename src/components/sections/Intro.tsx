"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const styles = [
  { fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 700, fontStyle: "normal" },
  { fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400, fontStyle: "italic" },
  { fontFamily: "'Courier New', Courier, monospace", fontWeight: 700, fontStyle: "normal" },
  { fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 300, fontStyle: "italic" },
  { fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700, fontStyle: "normal" },
];

export default function Intro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-screen"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="intro-e-stage" aria-label="Animated letter E">
            {styles.map((style, index) => (
              <motion.span
                key={index}
                className="intro-e"
                style={style}
                initial={{ opacity: 0, scale: 0.88, y: 18 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.88, 1, 1.03, 1.06],
                  y: [18, 0, 0, -12],
                }}
                transition={{
                  duration: 0.72,
                  delay: index * 0.28,
                  times: [0, 0.18, 0.68, 1],
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                E
              </motion.span>
            ))}
          </div>

          <motion.p
            className="intro-caption"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            transition={{ delay: 0.45, duration: 0.45 }}
          >
            Portfolio · 2026
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
