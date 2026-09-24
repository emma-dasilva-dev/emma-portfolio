"use client";

import { motion } from "motion/react";

type SectionTransitionProps = {
  children: React.ReactNode;
  direction?: "left" | "right" | "up";
};

export default function SectionTransition({
  children,
  direction = "up",
}: SectionTransitionProps) {
  const x = direction === "left" ? -72 : direction === "right" ? 72 : 0;
  const y = direction === "up" ? 78 : 38;
  const rotateY = direction === "left" ? -3.5 : direction === "right" ? 3.5 : 0;

  return (
    <motion.div
      className="section-transition section-transition-cinematic"
      initial={{
        opacity: 0.24,
        x,
        y,
        scale: 0.965,
        rotateY,
        filter: "blur(10px)",
        clipPath: "inset(7% 0 0 0 round 22px)",
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotateY: 0,
        filter: "blur(0px)",
        clipPath: "inset(0% 0 0 0 round 0px)",
      }}
      viewport={{ once: false, amount: 0.16 }}
      transition={{
        duration: 1.05,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.span
        className="section-transition-sweep"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: [0, 1, 0] }}
        viewport={{ once: false, amount: 0.18 }}
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.5, 1],
        }}
      />
      {children}
    </motion.div>
  );
}
