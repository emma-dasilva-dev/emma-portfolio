"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const words = ["EMMA", "DA", "SILVA"];

export default function Intro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2100);
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
          <div className="intro-name" aria-label="Emma Da Silva">
            {words.map((word, wordIndex) => (
              <div className="intro-word" key={word}>
                {word.split("").map((letter, letterIndex) => (
                  <span className="intro-letter-mask" key={`${word}-${letterIndex}`}>
                    <motion.span
                      className="intro-letter"
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: wordIndex * 0.16 + letterIndex * 0.055,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {letter}
                    </motion.span>
                  </span>
                ))}
              </div>
            ))}
          </div>

          <motion.p
            className="intro-caption"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Portfolio · 2026
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
