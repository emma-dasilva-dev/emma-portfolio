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
  const x = direction === "left" ? -44 : direction === "right" ? 44 : 0;
  const y = direction === "up" ? 54 : 24;

  return (
    <motion.div
      className="section-transition"
      initial={{ opacity: 0.5, x, y, scale: 0.99 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
