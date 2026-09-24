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
  const offset =
    direction === "left"
      ? { x: -34, y: 18 }
      : direction === "right"
        ? { x: 34, y: 18 }
        : { x: 0, y: 34 };

  return (
    <motion.div
      className="section-transition"
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        scale: 0.985,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.72,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
