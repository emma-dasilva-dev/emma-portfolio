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
      ? { x: -120, y: 28 }
      : direction === "right"
        ? { x: 120, y: 28 }
        : { x: 0, y: 90 };

  return (
    <motion.div
      className="section-transition"
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        scale: 0.94,
        filter: "blur(8px)",
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.5,
        margin: "0px",
      }}
      transition={{
        duration: 0.95,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
