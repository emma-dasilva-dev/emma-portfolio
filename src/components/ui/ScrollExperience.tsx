"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollExperience() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 26,
    mass: 0.22,
  });

  return (
    <div className="scroll-experience" aria-hidden="true">
      <motion.div
        className="scroll-experience-progress"
        style={{ scaleX: progress }}
      />
      <motion.div
        className="scroll-experience-orb"
        style={{ top: progress }}
      />
    </div>
  );
}
