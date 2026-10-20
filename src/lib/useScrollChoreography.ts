"use client";

import { useEffect, useState } from "react";
import { motion } from "./motion";

/** Copy for a section starts entering this far before the object settles on it. */
const REVEAL_LEAD = 0.4;

/**
 * Maps the scroll position to a continuous section index (`motion.progress`)
 * and derives the active section and which sections have been revealed.
 *
 * Section `i` is "settled" when its centre meets the centre of the viewport,
 * so the 3D poses and the copy reveals share one timeline.
 */
export function useScrollChoreography(ids: readonly string[]) {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(1);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let anchors: number[] = [];
    let frame = 0;

    const measure = () => {
      const viewport = window.innerHeight;
      const max = document.documentElement.scrollHeight - viewport;
      let previous = -1;
      anchors = ids.map((id, index) => {
        const element = document.getElementById(id);
        if (!element || index === 0) return (previous = 0);
        const rect = element.getBoundingClientRect();
        const centred = rect.top + window.scrollY + (rect.height - viewport) / 2;
        return (previous = Math.max(previous + 1, Math.min(centred, max)));
      });
    };

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      let progress = anchors.length - 1;
      for (let i = 1; i < anchors.length; i++) {
        if (y < anchors[i]) {
          progress = i - 1 + (y - anchors[i - 1]) / (anchors[i] - anchors[i - 1]);
          break;
        }
      }
      progress = Math.max(0, progress);
      motion.progress = progress;
      setActive(Math.min(Math.round(progress), ids.length - 1));
      setRevealed((count) => Math.max(count, Math.min(Math.floor(progress + REVEAL_LEAD) + 1, ids.length)));
      setScrolled(y > 8);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const remeasure = () => {
      measure();
      schedule();
    };

    remeasure();
    const observer = new ResizeObserver(remeasure);
    observer.observe(document.body);
    document.fonts?.ready.then(remeasure).catch(() => {});
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
    };
  }, [ids]);

  return { active, revealed, scrolled };
}

/** Tracks a fine pointer for the subtle parallax on the headphones. */
export function usePointerParallax() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const onMove = (event: PointerEvent) => {
      if (!fine.matches || event.pointerType !== "mouse") return;
      motion.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      motion.pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    };
    const reset = () => {
      motion.pointerX = 0;
      motion.pointerY = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", reset);
    };
  }, []);
}

/** Follows `prefers-reduced-motion`. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}
