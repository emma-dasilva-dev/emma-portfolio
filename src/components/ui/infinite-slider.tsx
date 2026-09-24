"use client";

import { animate, motion, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  mobileSpeed?: number;
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 24,
  speed = 48,
  speedOnHover = 18,
  mobileSpeed,
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [canHover, setCanHover] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [ref, { width }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const hoverMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
    const mobileMedia = window.matchMedia("(max-width: 700px)");

    const updateMedia = () => {
      setCanHover(hoverMedia.matches);
      setIsMobile(mobileMedia.matches);
    };

    updateMedia();
    hoverMedia.addEventListener("change", updateMedia);
    mobileMedia.addEventListener("change", updateMedia);

    return () => {
      hoverMedia.removeEventListener("change", updateMedia);
      mobileMedia.removeEventListener("change", updateMedia);
    };
  }, []);

  useEffect(() => {
    if (!width) return;

    const contentSize = width + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;
    const distance = Math.abs(to - from);

    const activeSpeed = isMobile && mobileSpeed ? mobileSpeed : currentSpeed;
    let controls;

    if (isTransitioning) {
      const remaining = Math.abs(translation.get() - to);
      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration: Math.max(remaining / activeSpeed, 0.01),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((value) => value + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration: distance / activeSpeed,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onRepeat: () => translation.set(from),
      });
    }

    return () => controls?.stop();
  }, [key, translation, currentSpeed, mobileSpeed, isMobile, width, gap, isTransitioning, reverse]);

  if (isMobile) {
    return (
      <div className={className}>
        <div
          className={`infinite-slider-track infinite-slider-track-mobile${reverse ? " infinite-slider-track-mobile-reverse" : ""}`}
          style={{ gap, "--slider-gap": `${gap}px` } as React.CSSProperties}
        >
          {children}
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <motion.div
        ref={ref}
        className="infinite-slider-track"
        style={{ x: translation, gap }}
        onHoverStart={() => {
          if (!canHover) return;
          setIsTransitioning(true);
          setCurrentSpeed(speedOnHover);
        }}
        onHoverEnd={() => {
          if (!canHover) return;
          setIsTransitioning(true);
          setCurrentSpeed(speed);
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
