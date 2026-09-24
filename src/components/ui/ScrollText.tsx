"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";

type ScrollTextProps = {
  children: string;
  baseVelocity?: number;
  className?: string;
  scrollDependent?: boolean;
  delay?: number;
};

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

export default function ScrollText({
  children,
  baseVelocity = -2,
  className = "",
  scrollDependent = true,
  delay = 0,
}: ScrollTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });
  const directionFactor = useRef(1);
  const startTime = useRef<number | null>(null);

  const x = useTransform(baseX, (value) => `${wrap(-25, 0, value)}%`);

  useAnimationFrame((time, delta) => {
    if (startTime.current === null) startTime.current = time;
    if (time - startTime.current < delay) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (scrollDependent) {
      const factor = velocityFactor.get();
      if (factor < 0) directionFactor.current = -1;
      else if (factor > 0) directionFactor.current = 1;
      moveBy += directionFactor.current * moveBy * Math.abs(factor);
    }

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`scroll-text ${className}`.trim()}>
      <motion.div className="scroll-text-track" style={{ x }}>
        {[0, 1, 2, 3].map((index) => (
          <span className="scroll-text-copy" key={index} aria-hidden={index > 0}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
